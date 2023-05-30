from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import pyodbc
import os
import requests
import json

app = Flask(__name__)

app.secret_key = "caircocoders-ednalan"

CORS(app)

conn_str = f"Driver=ODBC Driver 17 for SQL Server;Server=tcp:cloudcalendarserver.database.windows.net,1433;Database=cloudcalendar;Uid=cloudcomp23;"\
            f"Pwd=calendar23!;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"

conn = pyodbc.connect(conn_str)


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('dist', path)

#@app.route('/')
#def index():
#    cur = conn.cursor()
#    cur.execute("SELECT * FROM calendar ORDER BY id")
#    calendar = cur.fetchall()
#    data = []
#    for row in calendar:
#        data.append({
#        'id': row[0],
#        'text': row[1],
#        'start': row[2].strftime('%Y-%m-%dT%H:%M:%S'),
#        'end': row[3].strftime('%Y-%m-%dT%H:%M:%S'),
#       'resource': row[4]
#    })
#    print(data)
#    return jsonify(data)

@app.route('/')
def index():
    return send_from_directory('dist', 'index.html')
    
def email_trigger(option):


    url = "https://sendeventemail.azurewebsites.net/api/HttpTrigger?code=CCrJcP3gRulI_3UudJAQrJ6yNnmu5ImWRIUQFvTY0JEJAzFuLRgTdg=="
    data = {"name": "App"}

    response = requests.post(url, data=data)

    if response.status_code == 200:
        print("Alert sent!")

def send_text_for_review(text):
    url = "https://stopcursing101.cognitiveservices.azure.com/contentmoderator/moderate/v1.0/ProcessText/Screen?autocorrect=false&PII=false&classify=True"
    headers = {
        "Content-Type": "text/plain",
        "Ocp-Apim-Subscription-Key": "90a2cfa53dd54a47b9f5ae73d6bae178"
    }
    data = text  # Replace with the actual text you want to process

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        result = response.json()

        if result["Classification"]["ReviewRecommended"] == True:
            return 1
        else:
            return 0
    else:
        print("Error:", response.status_code)
        return -1


def create_zoom_meeting(api_key, api_secret, topic, start_time):
    # API endpoint for creating a meeting
    url = 'https://api.zoom.us/v2/users/me/meetings'

    # Prepare request headers and data
    headers = {
        'Authorization': f'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlhlNnU5NjJtUkcyLS1uZUlFV21OeWciLCJleHAiOjE2ODYwNTY3MTQsImlhdCI6MTY4NTQ1MTkxNn0.auNmjDyWRGWXueFteBMQnLQACvbTv_hWp5CRT1gu7Ho',
        'Content-Type': 'application/json'
    }
    data = {
        'topic': topic,
        'type': 1,
        'start_time': start_time
    }

    # Send POST request to create the meeting
    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 201:
        meeting_info = response.json()
        return meeting_info['join_url']
    else:
        print('Failed to create Zoom meeting')
        return None

# Replace with your own API credentials
API_KEY = "Xe6u962mRG2--neIEWmNyg"
API_SECRET = "J6mWZant33cx2jyN0fCfHaO4bvNwzgkG4v0C"




@app.route('/default', methods=['GET', 'POST'])
def default():
    cur = conn.cursor()


    if request.method == 'GET':
        day = request.args.get('day')
        print(day)
        cur.execute("SELECT * FROM calendar WHERE CONVERT(date, StartTime) = ? AND CONVERT(date, EndTime) = ? ORDER BY id", [day, day])
        calendar = cur.fetchall()
        data = []
        for row in calendar:
            data.append({
            'id': row[0],
            'text': row[1],
            'start': row[2].strftime('%Y-%m-%dT%H:%M:%S'),
            'end': row[3].strftime('%Y-%m-%dT%H:%M:%S'),
            'resource': row[4]
        })
        print(data)
    return jsonify(data)

@app.route("/insert", methods=["POST", "GET"])
def insert():
    
    try:
        cur = conn.cursor()
        print(cur)
        print("Inserting")
        if request.method == 'POST':
            print("POST")
            data = request.get_json()
            
            title = data['text']
            start = data['start']
            end = data['end']
            id = data['id']
            checker = send_text_for_review(title)
            if( checker == 1):
                print("Text is inappropriate")
                msg = 'Text is inappropriate'
                status_code = 403
                response = jsonify(msg)
                response.status_code = status_code
                return response
            elif(checker == 0):
                print(data)
                resource = data['resource']
                #print(resource)
                print("Title: " + title + " Start: " + start + " End: " + end)
                res = cur.execute("INSERT INTO calendar (Id,TopicText,StartTime,EndTime,ResourceText) VALUES (?,?,?,?,?)", [id,title, start, end,resource])
                
                # Call the function to create a Zoom meeting
                meeting_link = create_zoom_meeting(API_KEY, API_SECRET, title, start)

                if meeting_link:
                    print('Meeting created successfully.')
                    print('Meeting link:', meeting_link)
                                
                conn.commit()
                cur.close()
                email_trigger(0)
                msg = 'Success! Here is the meeting link: ' +  meeting_link 
                status_code = 200
                response = jsonify(msg)
                response.status_code = status_code
                
                return response
            else:
                print("Error")
                msg = 'Error'
                status_code = 400
                response = jsonify(msg)
                response.status_code = status_code
                return response
    except Exception as e:
            msg = 'failure'
            status_code = 400
            print("Error:", e)

    response = jsonify(msg)
    response.status_code = status_code
    return response


@app.route("/update", methods=["POST", "GET"])
def update():
    cur = conn.cursor()
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        title = data['text']
        start = data['start']
        end = data['end']
        id = data['id']
        resource = data['resource']
        
        checker = send_text_for_review(title)
        if( checker == 1):
            print("Text is inappropriate")
            msg = 'Text is inappropriate'
            status_code = 403
            response = jsonify(msg)
            response.status_code = status_code
            return response
        elif(checker == 0):
            print(data)
            email_trigger(1)
            cur.execute("UPDATE calendar SET TopicText = ?, StartTime = ?, EndTime = ?,ResourceText=? WHERE Id = ?",
                        [title, start, end,resource, id])
            conn.commit()
            cur.close()
            meeting_link = create_zoom_meeting(API_KEY, API_SECRET, title, start)

            if meeting_link:
                print('Meeting created successfully.')
                print('Meeting link:', meeting_link)
                                
            email_trigger(0)
            msg = 'Success! Here is the meeting link: ' +  meeting_link 
            status_code = 200
            response = jsonify(msg)
            response.status_code = status_code
            
            return response
        else:
            print("Error")
            msg = 'Error'
            status_code = 400
            response = jsonify(msg)
            response.status_code = status_code
            return response


@app.route("/delete", methods=["POST", "GET"])
def ajax_delete():
    cur = conn.cursor()
    if request.method == 'POST':
        data = request.get_json()
        getid = data['id']
        print(getid)
        cur.execute('DELETE FROM calendar WHERE id = ?', [getid])
        conn.commit()
        cur.close()
        msg = 'Record deleted successfully'
    return jsonify(msg)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
