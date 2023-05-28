from flask import Flask, render_template, request, jsonify
import pyodbc
import os
from flask_cors import CORS

app = Flask(__name__)

app.secret_key = "caircocoders-ednalan"

CORS(app, resources={r"/*": {"origins": "http://localhost:8082"}})

conn_str = f"Driver=ODBC Driver 17 for SQL Server;Server=tcp:cloudcalendarserver.database.windows.net,1433;Database=cloudcalendar;Uid=cloudcomp23;" \
           f"Pwd=calendar23!;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"

conn = pyodbc.connect(conn_str)


# speech_config = speechsdk.SpeechConfig(subscription="Azure for Students",endpoint="https://eastus.api.cognitive.microsoft.com/sts/v1.0/issuetoken")

# recognizer = speechsdk.Recognizer(speech_config=speech_config)
@app.route('/speech', methods=['POST'])
def speech_recognition():
    # audio = request.data
    # result = recognizer.recognize_once_async(audio).get()
    return "Ana are mere"


@app.route('/')
def index():
    cur = conn.cursor()
    cur.execute("SELECT * FROM calendar ORDER BY id")
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


@app.route('/default', methods=['GET', 'POST'])
def default():
    cur = conn.cursor()

    if request.method == 'GET':
        day = request.args.get('day')
        print(day)
        cur.execute(
            "SELECT * FROM calendar WHERE CONVERT(date, StartTime) = ? AND CONVERT(date, EndTime) = ? ORDER BY id",
            [day, day])
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

            print(data)
            resource = data['resource']
            # print(resource)
            print("Title: " + title + " Start: " + start + " End: " + end)
            res = cur.execute("INSERT INTO calendar (Id,TopicText,StartTime,EndTime,ResourceText) VALUES (?,?,?,?,?)",
                              [id, title, start, end, resource])

            conn.commit()
            cur.close()
            msg = 'Success'
            status_code = 200
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
        print(data)
        cur.execute("UPDATE calendar SET TopicText = ?, StartTime = ?, EndTime = ?,ResourceText=? WHERE Id = ?",
                    [title, start, end, resource, id])
        conn.commit()
        cur.close()
        msg = 'success'
    return jsonify(msg)


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

app.static_folder = 'static'

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
