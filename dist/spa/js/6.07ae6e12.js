(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"22f2":function(e,a,l){"use strict";l.r(a);var r=function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("div",{staticClass:"player"},[e.divPlayer?l("plyr-vue",{ref:"mediaPlayer"},[l("div",{staticClass:"plyr__video-embed videoWrapper",attrs:{id:"mediaPlayer"}},["youtube"===e.type?l("iframe",{attrs:{src:e.youtubePlayer,allowfullscreen:"",allowtransparency:""}}):e._e(),"vimeo"===e.type?l("iframe",{attrs:{src:e.vimeoPlayer,allowfullscreen:"",allowtransparency:"",allow:"autoplay"}}):e._e()])]):e._e(),"audio"==this.type?l("video",{ref:"mediaPlayer",attrs:{id:"mediaPlayer",playsinline:e.playsinline,controls:e.controls,"data-poster":e.poster}},e._l(e.sources,(function(a){return l("source",{key:a.src,attrs:{src:e.cdn_url+"/"+e.id,type:a.type}})})),0):e._e(),l("player-controls",{on:{"hook:mounted":e.setEvents,"player-play":e.play,"player-pause":e.pause}})],1)},t=[],o=(l("e6cf"),l("ddb0"),l("2b0e")),s=l("afa7");o["a"].use(s["a"]);const n=[{name:"player-play",callback:()=>{console.log("playing"),(void 0).$refs.mediaPlayer.play()}},{name:"player-pause",callback:()=>{console.log("pause"),(void 0).$refs.mediaPlayer.pause()}}];var i={name:"PlyermediaPlayer",props:{controls:Boolean,poster:String,sources:Array,allowfullscreen:Boolean,color:String,title:String,id:String,to:String,type:String,playsinline:Boolean,"webkit-playsinline":Boolean,preload:[String,Boolean],cdn_url:String},components:{"plyr-vue":s["a"],"player-controls":()=>Promise.all([l.e(0),l.e(15)]).then(l.bind(null,"cea7"))},mounted(){},computed:{},computed:{vimeoPlayer(){return`https://player.vimeo.com/video/${this.sources[0].src}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`},youtubePlayer(){return`https://www.youtube.com/embed/${this.sources[0].src}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}},methods:{setEvents(){for(let e of n)this.$on(e.name,e.callback)},player(){return this.$refs.mediaPlayer.player},divPlayer(){const e=this.titletype in["youtube","vimeo"];return console.log("isDivPlay",e),e}}},p=i,c=(l("c52b"),l("2877")),y=Object(c["a"])(p,r,t,!1,null,"51e0a54e",null);a["default"]=y.exports},"77f9":function(e,a,l){},c52b:function(e,a,l){"use strict";var r=l("77f9"),t=l.n(r);t.a}}]);