(function(){"use strict";var e={6504:function(e,t,n){var o=n(9242),a=n(3396);const l={id:"app"};function r(e,t,n,o,r,c){const i=(0,a.up)("ResourceCalendar");return(0,a.wg)(),(0,a.iD)("div",l,[(0,a.Wm)(i)])}const c={class:"wrap"},i={class:"left"},s={class:"content"};function d(e,t,n,o,l,r){const d=(0,a.up)("DayPilotNavigator"),u=(0,a.up)("DayPilotCalendar");return(0,a.wg)(),(0,a.iD)("div",c,[(0,a._)("div",i,[(0,a.Wm)(d,{id:"nav",config:o.navigatorConfig,ref:"navigator"},null,8,["config"])]),(0,a._)("div",s,[(0,a.Wm)(u,{id:"dp",config:o.calendarConfig,ref:"calendar"},null,8,["config"])])])}var u=n(4870),v=n(5293),f=n(4161),p={name:"ResourceCalendar",components:{DayPilotCalendar:v.DayPilotCalendar,DayPilotNavigator:v.DayPilotNavigator},setup(){const e=(0,u.iH)(null),t=(0,u.iH)(null),n=(0,u.qj)({selectedDay:"2023-08-01"}),o={showMonths:3,skipMonths:3,selectMode:"Day",startDate:n.selectedDay,selectionDay:n.selectedDay,onTimeRangeSelected:e=>{n.selectedDay=e.day,console.log(n.selectedDay),c(n.selectedDay),l.startDate=e.day,l.selectionDay=e.day}},l={viewType:"Resources",startDate:n.selectedDay,timeRangeSelectedHandling:"Enabled",onTimeRangeSelected:async t=>{await d(t.start,t.end,t.resource),e.value.control.clearSelection()},onEventClick:e=>{const t=new v.DayPilot.Menu({items:[{text:"Edit",onClick:()=>s(e.e)},{text:"Delete",onClick:()=>r(e.e)}]});t.show(e.originalEvent)},eventDeleteHandling:"Enabled",onEventMoved:e=>{s(e.e),console.log("Event moved",e.e)},onEventResized:e=>{console.log("Event resized",e.e)}},r=t=>{f.Z.post("http://127.0.0.1:8000/delete",t.data).then((n=>{200===n.status?(console.log("Event deleted",t),e.value.control.events.remove(t)):console.log("Event delete failed",t)})).catch((e=>{console.log(e)}))},c=n=>{console.log(n),f.Z.get("http://127.0.0.1:8000/default",{params:{day:n}}).then((n=>{const o=n.data;console.log(n);const a=o.map((e=>({id:e.id,start:e.start,end:e.end,resource:e.resource,text:e.text,barColor:"#38761d"})));console.log("Events loaded",a),e.value.control.update({events:a}),t.value.control.update({events:a})})).catch((e=>{console.log(e)}))},i=()=>{const t=[{name:"Room 1",id:"R1"},{name:"Room 2",id:"R2"},{name:"Room 3",id:"R3"}];e.value.control.update({columns:t})},s=async t=>{const n=[{name:"Text",id:"text"},{name:"Start",id:"start",type:"datetime",disabled:!0},{name:"End",id:"end",type:"datetime",disabled:!0},{name:"Room",id:"resource",type:"select",options:e.value.control.columns.list}],o=t.data;console.log(t);const a=await v.DayPilot.Modal.form(n,o);a.canceled||f.Z.post("http://127.0.0.1:8000/update",a.result).then((t=>{200===t.status?(console.log("Event updated",a.result),e.value.control.events.update(a.result)):console.log("Event update failed",o)})).catch((e=>{console.log(e)}))},d=async(t,n,o)=>{const a=[{name:"Text",id:"text"},{name:"Start",id:"start",type:"datetime",disabled:!0},{name:"End",id:"end",type:"datetime",disabled:!0},{name:"Room",id:"resource",type:"select",options:e.value.control.columns.list}],l={start:t,end:n,resource:o,id:v.DayPilot.guid()},r=await v.DayPilot.Modal.form(a,l);if(r.canceled)return;const c=r.result;f.Z.post("http://127.0.0.1:8000/insert",c).then((t=>{200===t.status?(console.log("Event created",c),e.value.control.events.add(c)):console.log("Event creation failed",c)})).catch((e=>{console.log(e)}))};return(0,a.bv)((()=>{i(),c()})),{navigatorConfig:o,calendarConfig:l,calendar:e,navigator:t,loadEvents:c,loadResources:i,editEvent:s,createEvent:d}}},g=n(89);const m=(0,g.Z)(p,[["render",d]]);var y=m,h={name:"app",components:{ResourceCalendar:y}};const D=(0,g.Z)(h,[["render",r]]);var b=D;(0,o.ri)(b).mount("#app")}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}n.m=e,function(){var e=[];n.O=function(t,o,a,l){if(!o){var r=1/0;for(d=0;d<e.length;d++){o=e[d][0],a=e[d][1],l=e[d][2];for(var c=!0,i=0;i<o.length;i++)(!1&l||r>=l)&&Object.keys(n.O).every((function(e){return n.O[e](o[i])}))?o.splice(i--,1):(c=!1,l<r&&(r=l));if(c){e.splice(d--,1);var s=a();void 0!==s&&(t=s)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[o,a,l]}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,l,r=o[0],c=o[1],i=o[2],s=0;if(r.some((function(t){return 0!==e[t]}))){for(a in c)n.o(c,a)&&(n.m[a]=c[a]);if(i)var d=i(n)}for(t&&t(o);s<r.length;s++)l=r[s],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(d)},o=self["webpackChunkvue_resource_calendar"]=self["webpackChunkvue_resource_calendar"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(6504)}));o=n.O(o)})();
//# sourceMappingURL=app.113053ef.js.map