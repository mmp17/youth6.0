(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{491:function(e,t,n){"use strict";n.r(t);n(26),n(21),n(25),n(12),n(32),n(22),n(33);var r=n(37),o=n(5),c=n(10),m=(n(38),n(14));function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={props:{},data:function(){return{textarea:"",writeComment:!0,editCommentIdx:null,editCommentValue:null}},computed:l(l(l({},Object(m.e)({freeboard:function(e){return e.freeboardDetail}})),Object(m.c)(["isLoggedIn","getUserInfo","getFreeboardDetail"])),{},{hasFreeboardAnswer:function(){return!!this.getFreeboardDetail.comment}}),methods:l(l({},Object(m.b)(["GET_FREEBOARD_DETAIL"])),{},{handleFreeboard:function(e){var t=e.type;if(console.log("FreeboardDetail",this.getFreeboardDetail.commu_user_idx),console.log("UserInfo",this.getUserInfo.idx),!this.isLoggedIn)return alert("로그인 해주세요.");if(!(this.getUserInfo.user_idx!==this.getFreeboardDetail.commu_user_idx))return alert("게시글의 작성자만 수정 및 삭제를 할 수 있습니다.");if("remove"===t)return this.removeFreeboard();this.$route.query.type;var n="/freeboard-register?idx=".concat(this.$route.query.idx);this.$router.push(n)},handleEditComment:function(e){var t=e.type,n=e.comment;if("cancel"===t)return this.editCommentIdx=null,void(this.editCommentValue=null);this.updateComment({comment:n})},updateComment:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.comment,n.prev=1,n.next=4,t.$axios.$get("/community/community_comment_update.do",{params:{idx:t.editCommentIdx,comment:t.editCommentValue,user_idx:t.getUserInfo.idx}});case 4:return n.sent,t.editCommentIdx=null,t.editCommentValue=null,n.next=9,t.GET_FREEBOARD_DETAIL({idx:t.$route.query.idx});case 9:n.next=13;break;case 11:n.prev=11,n.t0=n.catch(1);case 13:case"end":return n.stop()}}),n,null,[[1,11]])})))()},handleComment:function(e){var t=e.type,n=e.comment;return this.isLoggedIn?n.com_user_idx===this.getUserInfo.idx?"remove"===t?this.removeComment({comment:n}):void this.editComment({comment:n}):alert("댓글의 작성자만 삭제할 수 있습니다."):alert("로그인 해주세요.")},editComment:function(e){var t=e.comment;this.editCommentIdx=t.idx,this.editCommentValue=t.comment},removeComment:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=e.comment,n.prev=1,window.confirm("댓글을 삭제하시겠습니까?")){n.next=4;break}return n.abrupt("return");case 4:return n.next=6,t.$axios.$get("/community/community_comment_delete.do",{params:{idx:r.idx,user_idx:t.getUserInfo.idx}});case 6:return n.next=8,t.GET_FREEBOARD_DETAIL({idx:t.$route.query.idx});case 8:n.next=13;break;case 10:n.prev=10,n.t0=n.catch(1),console.error(n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})))()},removeFreeboard:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!window.confirm("게시글을 삭제하시겠습니까?")){t.next=14;break}if(!(e.getFreeboardDetail.commu_user_idx===e.getUserInfo.user_idx)){t.next=5;break}return t.abrupt("return",alert("게시글의 작성자만 삭제할 수 있습니다."));case 5:return t.next=7,e.$axios.$get("/community/community_delete.do",{params:{idx:e.$route.query.idx,user_idx:e.getUserInfo.idx}});case 7:if(n=t.sent,"/freeboard-list",!Object(r.a)(n)){t.next=14;break}return alert("게시글이 삭제되었습니다."),e.$router.push("/freeboard-list"),t.abrupt("return");case 14:t.next=19;break;case 16:t.prev=16,t.t0=t.catch(0),console.error(t.t0);case 19:case"end":return t.stop()}}),t,null,[[0,16]])})))()},addComment:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.textarea.length){t.next=2;break}return t.abrupt("return",alert("의견을 입력해주세요."));case 2:if(e.isLoggedIn){t.next=4;break}return t.abrupt("return",alert("로그인 해주세요"));case 4:return t.next=6,e.$axios.$get("/community/community_comment_insert.do",{params:{comment:e.textarea,com_name:e.getUserInfo.user_name,user_idx:e.getUserInfo.idx,commu_idx:e.$route.query.idx}});case 6:if(n=t.sent,0,0!==n){t.next=12;break}return t.next=11,e.GET_FREEBOARD_DETAIL({idx:e.$route.query.idx});case 11:e.textarea="";case 12:case"end":return t.stop()}}),t)})))()},goPage:function(path){this.$router.push(path)}})},x=n(17),component=Object(x.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"suggest-comments"},[t("div",{staticClass:"btns"},[t("el-button",{staticClass:"first",on:{click:function(t){return e.handleFreeboard({type:"edit"})}}},[e._v("\n      수정\n    ")]),e._v(" "),t("el-button",{staticClass:"second btn",on:{click:function(t){return e.handleFreeboard({type:"remove"})}}},[e._v("\n      삭제\n    ")])],1),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.hasFreeboardAnswer,expression:"hasFreeboardAnswer"}],staticClass:"suggest-answer"},[t("div",{staticClass:"title"},[e._v("\n      게시글 답변\n    ")])]),e._v(" "),e.writeComment?[t("section",{staticClass:"write-comment"},[t("el-input",{attrs:{type:"textarea",rows:4,placeholder:"의견을 달아주세요!"},model:{value:e.textarea,callback:function(t){e.textarea=t},expression:"textarea"}}),e._v(" "),t("el-button",{staticClass:"comment-btn",on:{click:e.addComment}},[e._v("\n        댓글 작성\n      ")])],1),e._v(" "),t("section",{staticClass:"comment-list"},[t("ul",e._l(e.freeboard.comments,(function(n,r){return t("li",{key:r,staticClass:"comment"},[t("div",{staticClass:"comment-title"},[t("span",[e._v(e._s(n.com_name))]),e._v(" | "+e._s(n.regdate)+"\n          ")]),e._v(" "),e.editCommentIdx==n.idx?[t("el-input",{staticClass:"edit-comment",attrs:{type:"textarea",rows:4,placeholder:"의견을 달아주세요!"},model:{value:e.editCommentValue,callback:function(t){e.editCommentValue=t},expression:"editCommentValue"}})]:[t("div",{staticClass:"comment-text"},[e._v("\n              "+e._s(n.comment)+"\n            ")])],e._v(" "),e.editCommentIdx==n.idx?t("div",{staticClass:"comment-list__btns"},[t("el-button",{on:{click:function(t){return e.handleEditComment({type:"edit",comment:n})}}},[e._v("\n              수정완료\n            ")]),e._v(" "),t("el-button",{on:{click:function(t){return e.handleEditComment({type:"cancel",comment:n})}}},[e._v("\n              취소\n            ")])],1):t("div",{staticClass:"comment-list__btns"},[t("el-button",{on:{click:function(t){return e.handleComment({type:"edit",comment:n})}}},[e._v("\n              수정\n            ")]),e._v(" "),t("el-button",{on:{click:function(t){return e.handleComment({type:"remove",comment:n})}}},[e._v("\n              삭제\n            ")])],1)],2)})),0)])]:e._e()],2)}),[],!1,null,null,null);t.default=component.exports}}]);