(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{540:function(e,n,r){"use strict";r.r(n);var t=r(37),o=r(5),c=(r(38),r(26),r(99),{data:function(){return{fullscreenLoading:!1}},mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var r,o,c,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=new window.naver_id_login("HKHwkmhqjhOQ5jy4tD3c","http://localhost:3030/login/naver"),o=r.getAccessToken(),n.next=4,e.$axios.$get("user/user_insert_sns.do",{params:{access_token:o}});case 4:if(c=n.sent,!("object"===Object(t.a)(c)&&Object.keys(c).length)){n.next=15;break}return l=c.idx,localStorage.setItem("idx",l),n.next=11,e.$store.commit("SET_USER_INFO",c);case 11:if(!!!e.$route.query.path){n.next=14;break}return n.abrupt("return",e.$router.push(e.$route.query.path));case 14:return n.abrupt("return",e.$router.push("/"));case 15:alert("로그인에 실패했습니다."),e.$router.push("/");case 17:case"end":return n.stop()}}),n)})))()},methods:{openFullScreen1:function(){var e=this;this.fullscreenLoading=!0,setTimeout((function(){e.fullscreenLoading=!1}),2e3)}}}),l=r(17),component=Object(l.a)(c,(function(){var e=this,n=e._self._c;return n("div",[n("h1",[e._v("\n    naver login page\n  ")]),e._v(" "),n("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary"},on:{click:e.openFullScreen1}},[e._v("\n    As a directive\n  ")])],1)}),[],!1,null,null,null);n.default=component.exports}}]);