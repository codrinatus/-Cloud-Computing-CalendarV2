(function(){"use strict";var e={230:function(e,t,n){var o=n(963),a=n(252);const r={id:"app"};function l(e,t,n,o,l,i){const s=(0,a.up)("ResourceCalendar");return(0,a.wg)(),(0,a.iD)("div",r,[(0,a.Wm)(s)])}const i={class:"wrap"},s={class:"left"},d={class:"content"};function c(e,t,n,o,r,l){const c=(0,a.up)("DayPilotNavigator"),u=(0,a.up)("DayPilotCalendar");return(0,a.wg)(),(0,a.iD)("div",i,[(0,a._)("div",s,[(0,a.Wm)(c,{id:"nav",config:o.navigatorConfig,ref:"navigator"},null,8,["config"])]),(0,a._)("div",d,[(0,a.Wm)(u,{id:"dp",config:o.calendarConfig,ref:"calendar"},null,8,["config"])])])}var u=n(262),v=n(151),p=n(154),f={name:"ResourceCalendar",components:{DayPilotCalendar:v.DayPilotCalendar,DayPilotNavigator:v.DayPilotNavigator},setup(){const e=(0,u.iH)(null),t=(0,u.iH)(null),n=(0,u.qj)({selectedDay:"2023-08-01"}),o={showMonths:3,skipMonths:3,selectMode:"Day",startDate:n.selectedDay,selectionDay:n.selectedDay,onTimeRangeSelected:e=>{n.selectedDay=e.day,i(n.selectedDay),r.value.startDate=e.day,r.value.selectionDay=e.day}},r=(0,a.Fl)((()=>({viewType:"Resources",startDate:n.selectedDay,timeRangeSelectedHandling:"Enabled",onTimeRangeSelected:async t=>{await c(t.start,t.end,t.resource),e.value.control.clearSelection()},onEventClick:e=>{const t=new v.DayPilot.Menu({items:[{text:"Edit",onClick:()=>d(e.e)},{text:"Delete",onClick:()=>l(e.e)}]});t.show(e.originalEvent)},eventDeleteHandling:"Enabled",onEventMoved:e=>{d(e.e),console.log("Event moved",e.e)},onEventResized:e=>{console.log("Event resized",e.e)}}))),l=t=>{p.Z.post("https://calendarproj.azurewebsites.net/delete",t.data).then((n=>{200===n.status?(console.log("Event deleted",t),e.value.control.events.remove(t)):console.log("Event delete failed",t)})).catch((e=>{console.log(e)}))},i=n=>{p.Z.get("https://calendarproj.azurewebsites.net/default",{params:{day:n}}).then((n=>{const o=n.data,a=o.map((e=>({id:e.id,start:e.start,end:e.end,resource:e.resource,text:e.text,barColor:"#38761d"})));e.value.control.update({events:a}),t.value.control.update({events:a})})).catch((e=>{console.log(e)}))},s=()=>{const t=[{name:"Room 1",id:"R1"},{name:"Room 2",id:"R2"},{name:"Room 3",id:"R3"}];e.value.control.update({columns:t})},d=async t=>{const n=[{name:"Text",id:"text"},{name:"Start",id:"start",type:"datetime",disabled:!0},{name:"End",id:"end",type:"datetime",disabled:!0},{name:"Room",id:"resource",type:"select",options:e.value.control.columns.list}],o=t.data,a=await v.DayPilot.Modal.form(n,o);a.canceled||p.Z.post("https://calendarproj.azurewebsites.net/update",a.result).then((n=>{200===n.status?(console.log("Event updated",a.result),e.value.control.events.update(a.result),window.alert(n.data)):403===n.status?(console.log("Event was not edited due to profanity",t),window.alert("Event was not edited due to profanity")):console.log("Event update failed",o)})).catch((e=>{console.log(e),window.alert("Event was not edited due to profanity")}))},c=async(t,n,o)=>{const a=[{name:"Text",id:"text"},{name:"Start",id:"start",type:"datetime",disabled:!0},{name:"End",id:"end",type:"datetime",disabled:!0},{name:"Room",id:"resource",type:"select",options:e.value.control.columns.list}],r={start:t,end:n,resource:o,id:v.DayPilot.guid()},l=await v.DayPilot.Modal.form(a,r);if(l.canceled)return;const i=l.result;p.Z.post("https://calendarproj.azurewebsites.net/insert",i).then((t=>{200===t.status?(console.log("Event created",t.data),e.value.control.events.add(i),window.alert(t.data)):403===t.status?(console.log("Event was not created due to profanity",i),window.alert("Event was not created due to profanity")):console.log("Event creation failed",i)})).catch((e=>{window.alert("Event was not created due to profanity"),console.log(e)}))};return(0,a.bv)((()=>{s(),i()})),{navigatorConfig:o,calendarConfig:r,calendar:e,navigator:t,loadEvents:i,loadResources:s,editEvent:d,createEvent:c}}},y=n(744);const g=(0,y.Z)(f,[["render",c]]);var m=g,w={name:"app",components:{ResourceCalendar:m}};const h=(0,y.Z)(w,[["render",l]]);var b=h;(0,o.ri)(b).mount("#app")}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,r){if(!o){var l=1/0;for(c=0;c<e.length;c++){o=e[c][0],a=e[c][1],r=e[c][2];for(var i=!0,s=0;s<o.length;s++)(!1&r||l>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(i=!1,r<l&&(l=r));if(i){e.splice(c--,1);var d=a();void 0!==d&&(t=d)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,a,r]}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,r,l=o[0],i=o[1],s=o[2],d=0;if(l.some((function(t){return 0!==e[t]}))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(s)var c=s(n)}for(t&&t(o);d<l.length;d++)r=l[d],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(c)},o=self["webpackChunkvue_resource_calendar"]=self["webpackChunkvue_resource_calendar"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(230)}));o=n.O(o)})();
//# sourceMappingURL=app.8818c594.js.map