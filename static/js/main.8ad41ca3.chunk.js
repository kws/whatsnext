(this.webpackJsonpwhatsnext=this.webpackJsonpwhatsnext||[]).push([[0],{43:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t),n.d(t,"msalInstance",(function(){return H}));var a=n(1),c=n(31),r=n.n(c),o=n(56),i=n(36),s=n(14),u=n(2),f=window.navigator.userAgent,l=f.indexOf("MSIE "),d=f.indexOf("Trident/"),m=f.indexOf("Edge/"),h=f.indexOf("Firefox"),b={auth:{clientId:"212b434a-82b7-43bb-b48d-c8921a2e939d",authority:"https://login.microsoftonline.com/common",redirectUri:"/whatsnext/"},cache:{cacheLocation:"sessionStorage",storeAuthStateInCookie:l>0||d>0||m>0||h>0},system:{loggerOptions:{loggerCallback:function(e,t,n){if(!n)switch(e){case u.e.Error:return void console.error(t);case u.e.Info:return void console.info(t);case u.e.Verbose:return void console.debug(t);case u.e.Warning:return void console.warn(t);default:return}}}}},p={scopes:["User.Read","Calendars.Read"]},j=new Date;j.setHours(0),j.setMinutes(0),j.setSeconds(0);var v=j.toISOString();j.setDate(j.getDate()+1);var g=j.toISOString(),O={graphMeEndpoint:"https://graph.microsoft.com/v1.0/me/calendar/calendarView?StartDateTime=".concat(v,"&EndDateTime=").concat(g)},x=(n(43),n(26)),w=n(15),S=n.n(w),M=n(19),D=n(32),I=n(27);function T(){return y.apply(this,arguments)}function y(){return(y=Object(M.a)(S.a.mark((function e(){var t,n,a,c,r;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=H.getActiveAccount()){e.next=3;break}throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");case 3:return e.next=5,H.acquireTokenSilent(Object(I.a)(Object(I.a)({},p),{},{account:t}));case 5:return n=e.sent,a=new Headers,c="Bearer ".concat(n.accessToken),a.append("Authorization",c),r={method:"GET",headers:a},e.abrupt("return",fetch(O.graphMeEndpoint,r).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=n(21),A=n(4),E=function(e){return"".concat(e).padStart(2,"0")},C=function(e){if(e>900|e<-300)return{};var t=Math.min(300,900-e),n=Math.max(0,Math.min(300,e)),a=Math.max(0,Math.min(300,600-e)),c=Object(k.easeInOutCubic)(a,0,128,300),r=Object(k.easeInOutCubic)(n,0,128,300),o=Object(k.easeInOutCubic)(t,0,1,300);return{backgroundColor:"rgba(".concat(c,", ").concat(r,", 0, ").concat(o,")")}},N=function(e){var t=Math.floor(e.timeinfo.timeDiff/1e3),n=Math.abs(t),a=Math.floor(n/3600),c=Math.floor(n/60-60*a),r=Math.floor(n-3600*a-60*c),o="";return e.timeinfo.timeDiff<0&&(o+="T+ "),o+=a>0?"".concat(a,"h ").concat(E(c),"m"):c>9?"".concat(c,"m"):"".concat(c,"m ").concat(E(r),"s")},L=function(e){var t=e.event,n=Math.floor(t.timeinfo.timeDiff/1e3),a=n<60&&n>-300?"flash":"",c=n<-300?"past":"",r=N(t);return Object(A.jsxs)("li",{className:"event ".concat(a," ").concat(c),style:n>60?C(n):{},children:[Object(A.jsx)("span",{className:"time",children:t.timeinfo.startRep}),Object(A.jsx)("span",{className:"title",children:t.subject}),Object(A.jsx)("span",{className:"diff",children:r})]})},R=function(){var e=Object(M.a)(S.a.mark((function e(){var t,n;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:return t=e.sent,(n=t&&t.value?t.value:[]).sort((function(e,t){return e.start.dateTime.localeCompare(t.start.dateTime)})),n.map((function(e){var t=new Date(e.start.dateTime+"Z"),n=new Date(e.end.dateTime+"Z"),a="".concat(t.getHours()).padStart(2,"0")+":"+"".concat(t.getMinutes()).padStart(2,"0");return e.timeinfo={start:t,end:n,startRep:a},e})),console.log("events",n),e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(s.b)().inProgress,t=Object(a.useState)([]),n=Object(x.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)((new Date).getTime()),i=Object(x.a)(o,2),f=i[0],l=i[1];Object(a.useEffect)((function(){e===u.c.None&&R().then((function(e){r(e)}))}),[e]),Object(a.useEffect)((function(){var e=setInterval((function(){l((new Date).getTime())}),1e3);return function(){console.log("Stopping timer"),clearInterval(e)}}),[]),Object(a.useEffect)((function(){var t=setInterval((function(){e===u.c.None&&R().then((function(e){r(e)}))}),6e4);return function(){console.log("Stopping timer"),clearInterval(t)}}),[e]),c.map((function(e){e.timeinfo.timeDiff=e.timeinfo.start-f,e.timeinfo.timeDiffSecs=Math.floor(e.timeinfo.timeDiff/1e3);var t=Math.min(1200,e.timeinfo.timeDiffSecs+300);return e.timeinfo.alertStatus=t>0?1200-t:0,e.timeinfo.started=e.timeinfo.start>=f,e.timeinfo.ended=e.timeinfo.end>=f,e}));var d=c.filter((function(e){return e.timeinfo.ended})),m=c.reduce((function(e,t){return Math.max(e,t.timeinfo.alertStatus)}),0),h=new Date(f).toLocaleTimeString().substring(0,5);Math.floor(f/1e3)%2===0&&(h=h.replace(":"," "));var b=d.length>0?d[0]:null,p="1-favicon.ico";return m>600?p=m%2===0?"3-favicon.ico":"alert-favicon.ico":m>400&&(p="2-favicon.ico"),console.log(m,p),Object(A.jsxs)(A.Fragment,{children:[Object(A.jsxs)(D.a,{children:[Object(A.jsx)("title",{children:b?"".concat(N(b).replaceAll(" ","")," ").concat(b.subject):"WhatsNext"}),Object(A.jsx)("link",{rel:"icon",href:"/whatsnext"+"/".concat(p)})]}),Object(A.jsx)("div",{className:"timeDisplay",children:h}),Object(A.jsx)("ul",{children:d.map((function(e){return Object(A.jsx)(L,{event:e},e.id)}))})]})};var B=function(){var e=Object(s.b)(),t=e.instance,n=e.accounts,a=e.inProgress;return n.length>0?Object(A.jsx)(P,{}):"login"===a?Object(A.jsx)("div",{children:"Login is currently in progress!"}):Object(A.jsxs)("div",{children:[Object(A.jsx)("span",{children:"Please log in to view your upcoming events."}),Object(A.jsx)("button",{onClick:function(){return t.acquireTokenPopup(p)},children:"Login"})]})};o.a({dsn:"https://c42f3190b1094dd4b4dd426834da98c6@o108858.ingest.sentry.io/5662792",integrations:[new i.a.BrowserTracing],tracesSampleRate:1});var H=new u.g(b),U=H.getAllAccounts();U.length>0&&H.setActiveAccount(U[0]),H.addEventCallback((function(e){if(console.log("msalInstance event",e),e.eventType===u.b.LOGIN_SUCCESS&&e.payload.account){var t=e.payload.account;H.setActiveAccount(t)}}));var V=function(){return Object(A.jsx)(s.a,{instance:H,children:Object(A.jsx)(B,{})})};r.a.render(Object(A.jsx)(V,{}),document.getElementById("root"))}},[[49,1,2]]]);
//# sourceMappingURL=main.8ad41ca3.chunk.js.map