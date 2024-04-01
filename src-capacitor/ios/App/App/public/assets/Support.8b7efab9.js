import{u as Z,b9 as ve,aL as me,ba as fe,aM as ge,r as R,c as y,bf as he,h as _,S as ue,a5 as ce,g as W,aN as ye,am as F,an as be,ao as Q,q as _e,ap as xe,aq as G,ar as X,au as ne,av as Y,w as D,z as pe,ae as Ce,bl as Se,v as ee,bm as qe,bn as ke,aB as we,o as te,y as de,bo as oe,G as Pe,I as Ae,N as $e,t as Ie,ab as H,d as Le,a9 as Ve,a1 as Be,a2 as Ne,a3 as z,ag as w,a7 as ae,a8 as U,ah as T,f as V,a6 as Te}from"./index.af9e0f6e.js";import{b as Me}from"./format.c860d4da.js";import{g as ie,s as le}from"./touch.3df10340.js";import{c as He}from"./selection.bf6e3a61.js";import{u as Ee}from"./use-cache.b0833c75.js";import{Q as Fe}from"./QPage.e5be6806.js";import{p as K}from"./package.b9b88699.js";import{o as O}from"./open-url.046bcee8.js";import{emitter as De}from"./mitt.4e333a4b.js";var St=Z({name:"QRating",props:{...ve,...me,modelValue:{type:Number,required:!0},max:{type:[String,Number],default:5},icon:[String,Array],iconHalf:[String,Array],iconSelected:[String,Array],iconAriaLabel:[String,Array],color:[String,Array],colorHalf:[String,Array],colorSelected:[String,Array],noReset:Boolean,noDimming:Boolean,readonly:Boolean,disable:Boolean},emits:["update:modelValue"],setup(e,{slots:l,emit:v}){const{proxy:{$q:d}}=W(),u=fe(e),t=ge(e),i=ye(t),s=R(0);let c={};const f=y(()=>e.readonly!==!0&&e.disable!==!0),m=y(()=>`q-rating row inline items-center q-rating--${f.value===!0?"":"non-"}editable`+(e.noDimming===!0?" q-rating--no-dimming":"")+(e.disable===!0?" disabled":"")+(e.color!==void 0&&Array.isArray(e.color)===!1?` text-${e.color}`:"")),p=y(()=>{const r=Array.isArray(e.icon)===!0?e.icon.length:0,n=Array.isArray(e.iconSelected)===!0?e.iconSelected.length:0,C=Array.isArray(e.iconHalf)===!0?e.iconHalf.length:0,q=Array.isArray(e.color)===!0?e.color.length:0,x=Array.isArray(e.colorSelected)===!0?e.colorSelected.length:0,a=Array.isArray(e.colorHalf)===!0?e.colorHalf.length:0;return{iconLen:r,icon:r>0?e.icon[r-1]:e.icon,selIconLen:n,selIcon:n>0?e.iconSelected[n-1]:e.iconSelected,halfIconLen:C,halfIcon:C>0?e.iconHalf[n-1]:e.iconHalf,colorLen:q,color:q>0?e.color[q-1]:e.color,selColorLen:x,selColor:x>0?e.colorSelected[x-1]:e.colorSelected,halfColorLen:a,halfColor:a>0?e.colorHalf[a-1]:e.colorHalf}}),b=y(()=>{if(typeof e.iconAriaLabel=="string"){const r=e.iconAriaLabel.length!==0?`${e.iconAriaLabel} `:"";return n=>`${r}${n}`}if(Array.isArray(e.iconAriaLabel)===!0){const r=e.iconAriaLabel.length;if(r>0)return n=>e.iconAriaLabel[Math.min(n,r)-1]}return(r,n)=>`${n} ${r}`}),S=y(()=>{const r=[],n=p.value,C=Math.ceil(e.modelValue),q=f.value===!0?0:null,x=e.iconHalf===void 0||C===e.modelValue?-1:C;for(let a=1;a<=e.max;a++){const k=s.value===0&&e.modelValue>=a||s.value>0&&s.value>=a,g=x===a&&s.value<a,I=s.value>0&&(g===!0?C:e.modelValue)>=a&&s.value<a,N=g===!0?a<=n.halfColorLen?e.colorHalf[a-1]:n.halfColor:n.selColor!==void 0&&k===!0?a<=n.selColorLen?e.colorSelected[a-1]:n.selColor:a<=n.colorLen?e.color[a-1]:n.color,o=(g===!0?a<=n.halfIconLen?e.iconHalf[a-1]:n.halfIcon:n.selIcon!==void 0&&(k===!0||I===!0)?a<=n.selIconLen?e.iconSelected[a-1]:n.selIcon:a<=n.iconLen?e.icon[a-1]:n.icon)||d.iconSet.rating.icon;r.push({name:(g===!0?a<=n.halfIconLen?e.iconHalf[a-1]:n.halfIcon:n.selIcon!==void 0&&(k===!0||I===!0)?a<=n.selIconLen?e.iconSelected[a-1]:n.selIcon:a<=n.iconLen?e.icon[a-1]:n.icon)||d.iconSet.rating.icon,attrs:{tabindex:q,role:"radio","aria-checked":e.modelValue===a?"true":"false","aria-label":b.value(a,o)},iconClass:"q-rating__icon"+(k===!0||g===!0?" q-rating__icon--active":"")+(I===!0?" q-rating__icon--exselected":"")+(s.value===a?" q-rating__icon--hovered":"")+(N!==void 0?` text-${N}`:"")})}return r}),$=y(()=>{const r={role:"radiogroup"};return e.disable===!0&&(r["aria-disabled"]="true"),e.readonly===!0&&(r["aria-readonly"]="true"),r});function L(r){if(f.value===!0){const n=Me(parseInt(r,10),1,parseInt(e.max,10)),C=e.noReset!==!0&&e.modelValue===n?0:n;C!==e.modelValue&&v("update:modelValue",C),s.value=0}}function P(r){f.value===!0&&(s.value=r)}function E(r,n){switch(r.keyCode){case 13:case 32:return L(n),F(r);case 37:case 40:return c[`rt${n-1}`]&&c[`rt${n-1}`].focus(),F(r);case 39:case 38:return c[`rt${n+1}`]&&c[`rt${n+1}`].focus(),F(r)}}function B(){s.value=0}return he(()=>{c={}}),()=>{const r=[];return S.value.forEach(({iconClass:n,name:C,attrs:q},x)=>{const a=x+1;r.push(_("div",{key:a,ref:k=>{c[`rt${a}`]=k},class:"q-rating__icon-container flex flex-center",...q,onClick(){L(a)},onMouseover(){P(a)},onMouseout:B,onFocus(){P(a)},onBlur:B,onKeyup(k){E(k,a)}},ue(l[`tip-${a}`],[_(ce,{class:n,name:C})])))}),e.name!==void 0&&e.disable!==!0&&i(r,"push"),_("div",{class:m.value,style:u.value,...$.value},r)}}});function Re(e){const l=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((v,d)=>{const u=parseFloat(v);u&&(l[d]=u)}),l}var Qe=be({name:"touch-swipe",beforeMount(e,{value:l,arg:v,modifiers:d}){if(d.mouse!==!0&&Q.has.touch!==!0)return;const u=d.mouseCapture===!0?"Capture":"",t={handler:l,sensitivity:Re(v),direction:ie(d),noop:_e,mouseStart(i){le(i,t)&&xe(i)&&(G(t,"temp",[[document,"mousemove","move",`notPassive${u}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(i,!0))},touchStart(i){if(le(i,t)){const s=i.target;G(t,"temp",[[s,"touchmove","move","notPassiveCapture"],[s,"touchcancel","end","notPassiveCapture"],[s,"touchend","end","notPassiveCapture"]]),t.start(i)}},start(i,s){Q.is.firefox===!0&&X(e,!0);const c=ne(i);t.event={x:c.left,y:c.top,time:Date.now(),mouse:s===!0,dir:!1}},move(i){if(t.event===void 0)return;if(t.event.dir!==!1){F(i);return}const s=Date.now()-t.event.time;if(s===0)return;const c=ne(i),f=c.left-t.event.x,m=Math.abs(f),p=c.top-t.event.y,b=Math.abs(p);if(t.event.mouse!==!0){if(m<t.sensitivity[1]&&b<t.sensitivity[1]){t.end(i);return}}else if(window.getSelection().toString()!==""){t.end(i);return}else if(m<t.sensitivity[2]&&b<t.sensitivity[2])return;const S=m/s,$=b/s;t.direction.vertical===!0&&m<b&&m<100&&$>t.sensitivity[0]&&(t.event.dir=p<0?"up":"down"),t.direction.horizontal===!0&&m>b&&b<100&&S>t.sensitivity[0]&&(t.event.dir=f<0?"left":"right"),t.direction.up===!0&&m<b&&p<0&&m<100&&$>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&m<b&&p>0&&m<100&&$>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&m>b&&f<0&&b<100&&S>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&m>b&&f>0&&b<100&&S>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(F(i),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),He(),t.styleCleanup=L=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const P=()=>{document.body.classList.remove("no-pointer-events--children")};L===!0?setTimeout(P,50):P()}),t.handler({evt:i,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:s,distance:{x:m,y:b}})):t.end(i)},end(i){t.event!==void 0&&(Y(t,"temp"),Q.is.firefox===!0&&X(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),i!==void 0&&t.event.dir!==!1&&F(i),t.event=void 0)}};if(e.__qtouchswipe=t,d.mouse===!0){const i=d.mouseCapture===!0||d.mousecapture===!0?"Capture":"";G(t,"main",[[e,"mousedown","mouseStart",`passive${i}`]])}Q.has.touch===!0&&G(t,"main",[[e,"touchstart","touchStart",`passive${d.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,l){const v=e.__qtouchswipe;v!==void 0&&(l.oldValue!==l.value&&(typeof l.value!="function"&&v.end(),v.handler=l.value),v.direction=ie(l.modifiers))},beforeUnmount(e){const l=e.__qtouchswipe;l!==void 0&&(Y(l,"main"),Y(l,"temp"),Q.is.firefox===!0&&X(e,!1),l.styleCleanup!==void 0&&l.styleCleanup(),delete e.__qtouchswipe)}});const ze={name:{required:!0},disable:Boolean},re={setup(e,{slots:l}){return()=>_("div",{class:"q-panel scroll",role:"tabpanel"},ee(l.default))}},je={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},Ge=["update:modelValue","beforeTransition","transition"];function Ue(){const{props:e,emit:l,proxy:v}=W(),{getCacheWithFn:d}=Ee();let u,t;const i=R(null),s=R(null);function c(o){const h=e.vertical===!0?"up":"left";x((v.$q.lang.rtl===!0?-1:1)*(o.direction===h?1:-1))}const f=y(()=>[[Qe,c,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),m=y(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),p=y(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),b=y(()=>`--q-transition-duration: ${e.transitionDuration}ms`),S=y(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),$=y(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),L=y(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);D(()=>e.modelValue,(o,h)=>{const A=r(o)===!0?n(o):-1;t!==!0&&q(A===-1?0:A<n(h)?-1:1),i.value!==A&&(i.value=A,l("beforeTransition",o,h),pe(()=>{l("transition",o,h)}))});function P(){x(1)}function E(){x(-1)}function B(o){l("update:modelValue",o)}function r(o){return o!=null&&o!==""}function n(o){return u.findIndex(h=>h.props.name===o&&h.props.disable!==""&&h.props.disable!==!0)}function C(){return u.filter(o=>o.props.disable!==""&&o.props.disable!==!0)}function q(o){const h=o!==0&&e.animated===!0&&i.value!==-1?"q-transition--"+(o===-1?m.value:p.value):null;s.value!==h&&(s.value=h)}function x(o,h=i.value){let A=h+o;for(;A!==-1&&A<u.length;){const M=u[A];if(M!==void 0&&M.props.disable!==""&&M.props.disable!==!0){q(o),t=!0,l("update:modelValue",M.props.name),setTimeout(()=>{t=!1});return}A+=o}e.infinite===!0&&u.length!==0&&h!==-1&&h!==u.length&&x(o,o===-1?u.length:-1)}function a(){const o=n(e.modelValue);return i.value!==o&&(i.value=o),!0}function k(){const o=r(e.modelValue)===!0&&a()&&u[i.value];return e.keepAlive===!0?[_(qe,$.value,[_(L.value===!0?d(S.value,()=>({...re,name:S.value})):re,{key:S.value,style:b.value},()=>o)])]:[_("div",{class:"q-panel scroll",style:b.value,key:S.value,role:"tabpanel"},[o])]}function g(){if(u.length!==0)return e.animated===!0?[_(Ce,{name:s.value},k)]:k()}function I(o){return u=Se(ee(o.default,[])).filter(h=>h.props!==null&&h.props.slot===void 0&&r(h.props.name)===!0),u.length}function N(){return u}return Object.assign(v,{next:P,previous:E,goTo:B}),{panelIndex:i,panelDirectives:f,updatePanelsList:I,updatePanelIndex:a,getPanelContent:g,getEnabledPanels:C,getPanels:N,isValidPanelName:r,keepAliveProps:$,needsUniqueKeepAliveWrapper:L,goToPanelByOffset:x,goToPanel:B,nextPanel:P,previousPanel:E}}var J=Z({name:"QCarouselSlide",props:{...ze,imgSrc:String},setup(e,{slots:l}){const v=y(()=>e.imgSrc?{backgroundImage:`url("${e.imgSrc}")`}:{});return()=>_("div",{class:"q-carousel__slide",style:v.value},ee(l.default))}});let j=0;const Ke={fullscreen:Boolean,noRouteFullscreenExit:Boolean},Oe=["update:fullscreen","fullscreen"];function We(){const e=W(),{props:l,emit:v,proxy:d}=e;let u,t,i;const s=R(!1);ke(e)===!0&&D(()=>d.$route.fullPath,()=>{l.noRouteFullscreenExit!==!0&&m()}),D(()=>l.fullscreen,p=>{s.value!==p&&c()}),D(s,p=>{v("update:fullscreen",p),v("fullscreen",p)});function c(){s.value===!0?m():f()}function f(){s.value!==!0&&(s.value=!0,i=d.$el.parentNode,i.replaceChild(t,d.$el),document.body.appendChild(d.$el),j++,j===1&&document.body.classList.add("q-body--fullscreen-mixin"),u={handler:m},oe.add(u))}function m(){s.value===!0&&(u!==void 0&&(oe.remove(u),u=void 0),i.replaceChild(d.$el,t),s.value=!1,j=Math.max(0,j-1),j===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),d.$el.scrollIntoView!==void 0&&setTimeout(()=>{d.$el.scrollIntoView()})))}return we(()=>{t=document.createElement("span")}),te(()=>{l.fullscreen===!0&&f()}),de(m),Object.assign(d,{toggleFullscreen:c,setFullscreen:f,exitFullscreen:m}),{inFullscreen:s,toggleFullscreen:c}}const Xe=["top","right","bottom","left"],Ye=["regular","flat","outline","push","unelevated"];var Je=Z({name:"QCarousel",props:{...Pe,...je,...Ke,transitionPrev:{type:String,default:"fade"},transitionNext:{type:String,default:"fade"},height:String,padding:Boolean,controlColor:String,controlTextColor:String,controlType:{type:String,validator:e=>Ye.includes(e),default:"flat"},autoplay:[Number,Boolean],arrows:Boolean,prevIcon:String,nextIcon:String,navigation:Boolean,navigationPosition:{type:String,validator:e=>Xe.includes(e)},navigationIcon:String,navigationActiveIcon:String,thumbnails:Boolean},emits:[...Oe,...Ge],setup(e,{slots:l}){const{proxy:{$q:v}}=W(),d=Ae(e,v);let u=null,t;const{updatePanelsList:i,getPanelContent:s,panelDirectives:c,goToPanel:f,previousPanel:m,nextPanel:p,getEnabledPanels:b,panelIndex:S}=Ue(),{inFullscreen:$}=We(),L=y(()=>$.value!==!0&&e.height!==void 0?{height:e.height}:{}),P=y(()=>e.vertical===!0?"vertical":"horizontal"),E=y(()=>`q-carousel q-panel-parent q-carousel--with${e.padding===!0?"":"out"}-padding`+($.value===!0?" fullscreen":"")+(d.value===!0?" q-carousel--dark q-dark":"")+(e.arrows===!0?` q-carousel--arrows-${P.value}`:"")+(e.navigation===!0?` q-carousel--navigation-${C.value}`:"")),B=y(()=>{const g=[e.prevIcon||v.iconSet.carousel[e.vertical===!0?"up":"left"],e.nextIcon||v.iconSet.carousel[e.vertical===!0?"down":"right"]];return e.vertical===!1&&v.lang.rtl===!0?g.reverse():g}),r=y(()=>e.navigationIcon||v.iconSet.carousel.navigationIcon),n=y(()=>e.navigationActiveIcon||r.value),C=y(()=>e.navigationPosition||(e.vertical===!0?"right":"bottom")),q=y(()=>({color:e.controlColor,textColor:e.controlTextColor,round:!0,[e.controlType]:!0,dense:!0}));D(()=>e.modelValue,()=>{e.autoplay&&x()}),D(()=>e.autoplay,g=>{g?x():u!==null&&(clearTimeout(u),u=null)});function x(){const g=Ie(e.autoplay)===!0?Math.abs(e.autoplay):5e3;u!==null&&clearTimeout(u),u=setTimeout(()=>{u=null,g>=0?p():m()},g)}te(()=>{e.autoplay&&x()}),de(()=>{u!==null&&clearTimeout(u)});function a(g,I){return _("div",{class:`q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${g} q-carousel__navigation--${C.value}`+(e.controlColor!==void 0?` text-${e.controlColor}`:"")},[_("div",{class:"q-carousel__navigation-inner flex flex-center no-wrap"},b().map(I))])}function k(){const g=[];if(e.navigation===!0){const I=l["navigation-icon"]!==void 0?l["navigation-icon"]:o=>_(H,{key:"nav"+o.name,class:`q-carousel__navigation-icon q-carousel__navigation-icon--${o.active===!0?"":"in"}active`,...o.btnProps,onClick:o.onClick}),N=t-1;g.push(a("buttons",(o,h)=>{const A=o.props.name,M=S.value===h;return I({index:h,maxIndex:N,name:A,active:M,btnProps:{icon:M===!0?n.value:r.value,size:"sm",...q.value},onClick:()=>{f(A)}})}))}else if(e.thumbnails===!0){const I=e.controlColor!==void 0?` text-${e.controlColor}`:"";g.push(a("thumbnails",N=>{const o=N.props;return _("img",{key:"tmb#"+o.name,class:`q-carousel__thumbnail q-carousel__thumbnail--${o.name===e.modelValue?"":"in"}active`+I,src:o.imgSrc||o["img-src"],onClick:()=>{f(o.name)}})}))}return e.arrows===!0&&S.value>=0&&((e.infinite===!0||S.value>0)&&g.push(_("div",{key:"prev",class:`q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${P.value} absolute flex flex-center`},[_(H,{icon:B.value[0],...q.value,onClick:m})])),(e.infinite===!0||S.value<t-1)&&g.push(_("div",{key:"next",class:`q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${P.value} absolute flex flex-center`},[_(H,{icon:B.value[1],...q.value,onClick:p})]))),ue(l.control,g)}return()=>(t=i(l),_("div",{class:E.value,style:L.value},[$e("div",{class:"q-carousel__slides-container"},s(),"sl-cont",e.swipeable,()=>c.value)].concat(k())))}});const Ze={class:"q-mt-md text-center"},et=w("span",{style:{color:"#ef60cb"}},"Thank you",-1),tt={style:{color:"#60efb3"}};const nt={class:"q-mt-md text-center"},ot={class:"q-mb-md text-center"},at={class:"q-mt-md text-center"},it={class:"column items-center"},lt=w("div",{class:"q-mb-md text-center"}," Having issues or improvement ideas? ",-1),rt={class:"q-mt-md text-center"},st={class:"column items-center"},ut=w("div",{class:"q-mb-md text-center"}," Like the project? Leave a star! ",-1),ct={class:"q-mt-md full-width text-center"},dt={class:"q-mt-md full-width text-center"},se="https://github.com/MatiasG19/refuel-tracker",vt="https://github.com/MatiasG19/refuel-tracker/blob/main/LICENSE",mt="https://github.com/MatiasG19/refuel-tracker/issues/new",qt=Le({__name:"Support",emits:["update:title"],setup(e,{emit:l}){const v=Ve(),d=y(()=>v.currentRoute.value.path),u=R(3),t=R("code"),i=l;return te(()=>{i("update:title",d.value),De.emit("updateTitle","Support")}),(s,c)=>(Be(),Ne(Fe,{class:"q-pa-md"},{default:z(()=>[w("h5",Ze,[et,ae(" for using "),w("span",tt,U(T(K).productName),1),ae("! I hope you have been enjoying the app so far "),V(ce,{name:"rocket_launch",color:"accent"})]),V(Je,{modelValue:t.value,"onUpdate:modelValue":c[4]||(c[4]=f=>t.value=f),"transition-prev":"jump-right","transition-next":"jump-left",swipeable:"",animated:"","control-color":"white","prev-icon":"arrow_left","next-icon":"arrow_right","navigation-icon":"radio_button_unchecked",navigation:"",padding:"",arrows:"",height:"300px",class:"space-station text-white shadow-1 rounded-borders"},{default:z(()=>[Te("",!0),V(J,{name:"code",class:"column no-wrap flex-center"},{default:z(()=>[w("div",nt,[w("div",ot,U(T(K).productName)+"'s code is open source! Check it out! ",1),V(H,{color:"accent","icon-right":"code",label:"GitHub",onClick:c[1]||(c[1]=f=>T(O)(se)),"no-caps":"",outline:""})])]),_:1}),V(J,{name:"issue",class:"column no-wrap flex-center"},{default:z(()=>[w("div",at,[w("div",it,[lt,V(H,{color:"accent","icon-right":"bug_report",label:"GitHub",onClick:c[2]||(c[2]=f=>T(O)(mt)),"no-caps":"",outline:""})])])]),_:1}),V(J,{name:"star",class:"column no-wrap flex-center"},{default:z(()=>[w("div",rt,[w("div",st,[ut,V(H,{color:"accent","icon-right":"star",label:"GitHub",onClick:c[3]||(c[3]=f=>T(O)(se)),"no-caps":"",outline:""})])])]),_:1})]),_:1},8,["modelValue"]),w("div",ct,U(T(K).productName)+" version "+U(T(K).version),1),w("div",dt,[V(H,{size:"sm",color:"accent",label:"View license on GitHub",onClick:c[5]||(c[5]=f=>T(O)(vt)),"no-caps":"",outline:""})])]),_:1}))}});export{qt as default};
