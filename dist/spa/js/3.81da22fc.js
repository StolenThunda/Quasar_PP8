(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{ad8b:function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("q-btn",t._b({attrs:{glossy:"",push:"",ripple:""},on:{click:function(i){return i.preventDefault(),t.login(i)}}},"q-btn",t.authBtnProps,!1),[this.$auth.isAuthenticated?a("q-avatar",{attrs:{size:"42px"}},[a("img",{attrs:{src:this.$auth.user.picture}})]):t._e(),this.$auth.isAuthenticated?a("q-menu",[a("div",{staticClass:"row no-wrap q-pa-md"},[a("div",{staticClass:"column"},[a("div",{staticClass:"text-h6 q-mb-md"},[t._v("Settings")]),a("q-btn",{attrs:{icon:"fa fa-user",label:"Profile",to:"/profile"}}),a("tool-list")],1),a("q-separator",{staticClass:"q-mx-lg",attrs:{vertical:"",inset:""}}),a("div",{staticClass:"column items-center"},[a("q-avatar",{attrs:{size:"72px"}},[a("img",{attrs:{src:this.$auth.user.picture}})]),a("div",{staticClass:"text-center text-subtitle1 q-mt-md q-mb-xs"},[t._v(t._s(this.$auth.user.name))]),a("q-btn",{attrs:{icon:"fa fa-power-off",color:"primary",label:"Logout",push:""},on:{click:function(i){return i.preventDefault(),t.logout(i)}}})],1)],1)]):t._e()],1)},s=[],n=(a("e6cf"),{name:"AuthButton",components:{ToolList:()=>Promise.all([a.e(0),a.e(8)]).then(a.bind(null,"1024"))},computed:{authBtnProps(){const t=this.$auth.isAuthenticated||this.$auth.loading?{round:!0}:{"icon-right":"fas fa-sign-in-alt",label:"Login"};return Object.assign({flat:!0,dense:!0},t)},round(){return this.$auth.isAuthenticated&&!this.$auth.loading},toggleLoginBtn(){return this.$auth.isAuthenticated||this.$auth.loading?"":"Login"},toggleIcon(){return this.$auth.isAuthenticated||this.$auth.loading?"":"mdi-login"},getImg(){var t;return(null===(t=this.$auth.user)||void 0===t?void 0:t.picture)||""}},methods:{login(){this.$auth.isAuthenticated||this.$auth.loading||this.$auth.loginWithRedirect()},logout(){this.$auth.logout({returnTo:window.location.origin})}}}),o=n,u=a("2877"),r=a("9c40"),l=a("cb32"),h=a("4e73"),c=a("eb85"),d=a("eebe"),g=a.n(d),p=Object(u["a"])(o,e,s,!1,null,null,null);i["default"]=p.exports;g()(p,"components",{QBtn:r["a"],QAvatar:l["a"],QMenu:h["a"],QSeparator:c["a"]})}}]);