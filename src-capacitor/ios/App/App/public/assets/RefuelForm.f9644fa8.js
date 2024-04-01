import{Q as Ue}from"./QBadge.94d9d111.js";import{u as ze,a as Ee,b as We,g as Ge,Q as be,c as Xe}from"./QPopupProxy.4b8cadc1.js";import{u as Je,G as Ze,aL as et,I as tt,aM as lt,r as S,c as v,w as De,au as ut,v as at,h as d,g as nt,aN as ot,z as it,aO as st,ae as rt,M as he,ab as L,d as dt,a9 as ct,o as vt,a1 as mt,ac as ft,f as h,a3 as Y,a7 as ht,a8 as pt,ah as m,ag as de}from"./index.af9e0f6e.js";import{T as gt}from"./TouchPan.522ea47a.js";import{_ as ee,f as _t,d as I}from"./date.a0df01d2.js";import{p as T}from"./format.c860d4da.js";import{Q as yt}from"./QSpace.2d3c42d6.js";import{Q as kt,_ as K,r as j,n as ce,p as ve,m as me}from"./index.2761fcb4.js";import{C as Ce}from"./ClosePopup.15002a59.js";import{emitter as Me}from"./mitt.4e333a4b.js";import{u as wt}from"./settingsStore.5309004a.js";import{u as bt}from"./refuelStore.e71e446b.js";import{R as Dt}from"./dexie.e9b82229.js";import{r as fe}from"./index.f4699e16.js";import"./use-cache.b0833c75.js";import"./QMenu.8ec9ede0.js";import"./selection.bf6e3a61.js";import"./touch.3df10340.js";import"./i18n.a8414de4.js";import"./fuelConsumption.8f4bd1ed.js";import"./index.9da299ca.js";function Ct(l,C){if(l.hour!==null){if(l.minute===null)return"minute";if(C===!0&&l.second===null)return"second"}return"hour"}function Mt(){const l=new Date;return{hour:l.getHours(),minute:l.getMinutes(),second:l.getSeconds(),millisecond:l.getMilliseconds()}}var qt=Je({name:"QTime",props:{...Ze,...et,...ze,mask:{default:null},format24h:{type:Boolean,default:null},defaultDate:{type:String,validator:l=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(l)},options:Function,hourOptions:Array,minuteOptions:Array,secondOptions:Array,withSeconds:Boolean,nowBtn:Boolean},emits:Ee,setup(l,{slots:C,emit:P}){const M=nt(),{$q:i}=M.proxy,H=tt(l,i),{tabindex:k,headerClass:N,getLocale:q,getCurrentDate:R}=We(l,i),te=lt(l),le=ot(te);let A,O;const p=S(null),o=v(()=>Ae()),b=v(()=>q()),x=v(()=>Oe()),_=ee(l.modelValue,o.value,b.value,l.calendar,x.value),n=S(Ct(_)),u=S(_),f=S(_.hour===null||_.hour<12),qe=v(()=>`q-time q-time--${l.landscape===!0?"landscape":"portrait"}`+(H.value===!0?" q-time--dark q-dark":"")+(l.disable===!0?" disabled":l.readonly===!0?" q-time--readonly":"")+(l.bordered===!0?" q-time--bordered":"")+(l.square===!0?" q-time--square no-border-radius":"")+(l.flat===!0?" q-time--flat no-shadow":"")),ue=v(()=>{const e=u.value;return{hour:e.hour===null?"--":y.value===!0?T(e.hour):String(f.value===!0?e.hour===0?12:e.hour:e.hour>12?e.hour-12:e.hour),minute:e.minute===null?"--":T(e.minute),second:e.second===null?"--":T(e.second)}}),y=v(()=>l.format24h!==null?l.format24h:i.lang.date.format24h),xe=v(()=>{const e=n.value==="hour",t=e===!0?12:60,a=u.value[n.value];let c=`rotate(${Math.round(a*(360/t))-180}deg) translateX(-50%)`;return e===!0&&y.value===!0&&u.value.hour>=12&&(c+=" scale(.7)"),{transform:c}}),pe=v(()=>u.value.hour!==null),Se=v(()=>pe.value===!0&&u.value.minute!==null),F=v(()=>l.hourOptions!==void 0?e=>l.hourOptions.includes(e):l.options!==void 0?e=>l.options(e,null,null):null),U=v(()=>l.minuteOptions!==void 0?e=>l.minuteOptions.includes(e):l.options!==void 0?e=>l.options(u.value.hour,e,null):null),z=v(()=>l.secondOptions!==void 0?e=>l.secondOptions.includes(e):l.options!==void 0?e=>l.options(u.value.hour,u.value.minute,e):null),D=v(()=>{if(F.value===null)return null;const e=W(0,11,F.value),t=W(12,11,F.value);return{am:e,pm:t,values:e.values.concat(t.values)}}),B=v(()=>U.value!==null?W(0,59,U.value):null),Q=v(()=>z.value!==null?W(0,59,z.value):null),E=v(()=>{switch(n.value){case"hour":return D.value;case"minute":return B.value;case"second":return Q.value}}),Ve=v(()=>{let e,t,a=0,r=1;const c=E.value!==null?E.value.values:void 0;n.value==="hour"?y.value===!0?(e=0,t=23):(e=0,t=11,f.value===!1&&(a=12)):(e=0,t=55,r=5);const w=[];for(let s=e,g=e;s<=t;s+=r,g++){const V=s+a,je=c!==void 0&&c.includes(V)===!1,Le=n.value==="hour"&&s===0?y.value===!0?"00":"12":s;w.push({val:V,index:g,disable:je,label:Le})}return w}),He=v(()=>[[gt,Ye,void 0,{stop:!0,prevent:!0,mouse:!0}]]);De(()=>l.modelValue,e=>{const t=ee(e,o.value,b.value,l.calendar,x.value);(t.dateHash!==u.value.dateHash||t.timeHash!==u.value.timeHash)&&(u.value=t,t.hour===null?n.value="hour":f.value=t.hour<12)}),De([o,b],()=>{it(()=>{re()})});function ge(){const e={...R(),...Mt()};re(e),Object.assign(u.value,e),n.value="hour"}function W(e,t,a){const r=Array.apply(null,{length:t+1}).map((c,w)=>{const s=w+e;return{index:s,val:a(s)===!0}}).filter(c=>c.val===!0).map(c=>c.index);return{min:r[0],max:r[r.length-1],values:r,threshold:t+1}}function _e(e,t,a){const r=Math.abs(e-t);return Math.min(r,a-r)}function ae(e,{min:t,max:a,values:r,threshold:c}){if(e===t)return t;if(e<t||e>a)return _e(e,t,c)<=_e(e,a,c)?t:a;const w=r.findIndex(V=>e<=V),s=r[w-1],g=r[w];return e-s<=g-e?s:g}function Ae(){return l.calendar!=="persian"&&l.mask!==null?l.mask:`HH:mm${l.withSeconds===!0?":ss":""}`}function Oe(){if(typeof l.defaultDate!="string"){const e=R(!0);return e.dateHash=Ge(e),e}return ee(l.defaultDate,"YYYY/MM/DD",void 0,l.calendar)}function ne(){return st(M)===!0||E.value!==null&&(E.value.values.length===0||n.value==="hour"&&y.value!==!0&&D.value[f.value===!0?"am":"pm"].values.length===0)}function oe(){const e=p.value,{top:t,left:a,width:r}=e.getBoundingClientRect(),c=r/2;return{top:t+c,left:a+c,dist:c*.7}}function Ye(e){if(ne()!==!0){if(e.isFirst===!0){A=oe(),O=G(e.evt,A);return}O=G(e.evt,A,O),e.isFinal===!0&&(A=!1,O=null,ye())}}function ye(){n.value==="hour"?n.value="minute":l.withSeconds&&n.value==="minute"&&(n.value="second")}function G(e,t,a){const r=ut(e),c=Math.abs(r.top-t.top),w=Math.sqrt(Math.pow(Math.abs(r.top-t.top),2)+Math.pow(Math.abs(r.left-t.left),2));let s,g=Math.asin(c/w)*(180/Math.PI);if(r.top<t.top?g=t.left<r.left?90-g:270+g:g=t.left<r.left?g+90:270-g,n.value==="hour"){if(s=g/30,D.value!==null){const V=y.value!==!0?f.value===!0:D.value.am.values.length!==0&&D.value.pm.values.length!==0?w>=t.dist:D.value.am.values.length!==0;s=ae(s+(V===!0?0:12),D.value[V===!0?"am":"pm"])}else s=Math.round(s),y.value===!0?w<t.dist?s<12&&(s+=12):s===12&&(s=0):f.value===!0&&s===12?s=0:f.value===!1&&s!==12&&(s+=12);y.value===!0&&(f.value=s<12)}else s=Math.round(g/6)%60,n.value==="minute"&&B.value!==null?s=ae(s,B.value):n.value==="second"&&Q.value!==null&&(s=ae(s,Q.value));return a!==s&&Qe[n.value](s),s}const ie={hour(){n.value="hour"},minute(){n.value="minute"},second(){n.value="second"}};function Ie(e){e.keyCode===13&&ke()}function Te(e){e.keyCode===13&&we()}function Pe(e){ne()!==!0&&(i.platform.is.desktop!==!0&&G(e,oe()),ye())}function Ne(e){ne()!==!0&&G(e,oe())}function Re(e){if(e.keyCode===13)n.value="hour";else if([37,39].includes(e.keyCode)){const t=e.keyCode===37?-1:1;if(D.value!==null){const a=y.value===!0?D.value.values:D.value[f.value===!0?"am":"pm"].values;if(a.length===0)return;if(u.value.hour===null)X(a[0]);else{const r=(a.length+a.indexOf(u.value.hour)+t)%a.length;X(a[r])}}else{const a=y.value===!0?24:12,r=y.value!==!0&&f.value===!1?12:0,c=u.value.hour===null?-t:u.value.hour;X(r+(24+c+t)%a)}}}function Fe(e){if(e.keyCode===13)n.value="minute";else if([37,39].includes(e.keyCode)){const t=e.keyCode===37?-1:1;if(B.value!==null){const a=B.value.values;if(a.length===0)return;if(u.value.minute===null)J(a[0]);else{const r=(a.length+a.indexOf(u.value.minute)+t)%a.length;J(a[r])}}else{const a=u.value.minute===null?-t:u.value.minute;J((60+a+t)%60)}}}function Be(e){if(e.keyCode===13)n.value="second";else if([37,39].includes(e.keyCode)){const t=e.keyCode===37?-1:1;if(Q.value!==null){const a=Q.value.values;if(a.length===0)return;if(u.value.seconds===null)Z(a[0]);else{const r=(a.length+a.indexOf(u.value.second)+t)%a.length;Z(a[r])}}else{const a=u.value.second===null?-t:u.value.second;Z((60+a+t)%60)}}}function X(e){u.value.hour!==e&&(u.value.hour=e,$())}function J(e){u.value.minute!==e&&(u.value.minute=e,$())}function Z(e){u.value.second!==e&&(u.value.second=e,$())}const Qe={hour:X,minute:J,second:Z};function ke(){f.value===!1&&(f.value=!0,u.value.hour!==null&&(u.value.hour-=12,$()))}function we(){f.value===!0&&(f.value=!1,u.value.hour!==null&&(u.value.hour+=12,$()))}function se(e){const t=l.modelValue;n.value!==e&&t!==void 0&&t!==null&&t!==""&&typeof t!="string"&&(n.value=e)}function $(){if(F.value!==null&&F.value(u.value.hour)!==!0){u.value=ee(),se("hour");return}if(U.value!==null&&U.value(u.value.minute)!==!0){u.value.minute=null,u.value.second=null,se("minute");return}if(l.withSeconds===!0&&z.value!==null&&z.value(u.value.second)!==!0){u.value.second=null,se("second");return}u.value.hour===null||u.value.minute===null||l.withSeconds===!0&&u.value.second===null||re()}function re(e){const t=Object.assign({...u.value},e),a=l.calendar==="persian"?T(t.hour)+":"+T(t.minute)+(l.withSeconds===!0?":"+T(t.second):""):_t(new Date(t.year,t.month===null?null:t.month-1,t.day,t.hour,t.minute,t.second,t.millisecond),o.value,b.value,t.year,t.timezoneOffset);t.changed=a!==l.modelValue,P("update:modelValue",a,t)}function $e(){const e=[d("div",{class:"q-time__link "+(n.value==="hour"?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onClick:ie.hour,onKeyup:Re},ue.value.hour),d("div",":"),d("div",pe.value===!0?{class:"q-time__link "+(n.value==="minute"?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onKeyup:Fe,onClick:ie.minute}:{class:"q-time__link"},ue.value.minute)];l.withSeconds===!0&&e.push(d("div",":"),d("div",Se.value===!0?{class:"q-time__link "+(n.value==="second"?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onKeyup:Be,onClick:ie.second}:{class:"q-time__link"},ue.value.second));const t=[d("div",{class:"q-time__header-label row items-center no-wrap",dir:"ltr"},e)];return y.value===!1&&t.push(d("div",{class:"q-time__header-ampm column items-between no-wrap"},[d("div",{class:"q-time__link "+(f.value===!0?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onClick:ke,onKeyup:Ie},"AM"),d("div",{class:"q-time__link "+(f.value!==!0?"q-time__link--active":"cursor-pointer"),tabindex:k.value,onClick:we,onKeyup:Te},"PM")])),d("div",{class:"q-time__header flex flex-center no-wrap "+N.value},t)}function Ke(){const e=u.value[n.value];return d("div",{class:"q-time__content col relative-position"},[d(rt,{name:"q-transition--scale"},()=>d("div",{key:"clock"+n.value,class:"q-time__container-parent absolute-full"},[d("div",{ref:p,class:"q-time__container-child fit overflow-hidden"},[he(d("div",{class:"q-time__clock cursor-pointer non-selectable",onClick:Pe,onMousedown:Ne},[d("div",{class:"q-time__clock-circle fit"},[d("div",{class:"q-time__clock-pointer"+(u.value[n.value]===null?" hidden":l.color!==void 0?` text-${l.color}`:""),style:xe.value}),Ve.value.map(t=>d("div",{class:`q-time__clock-position row flex-center q-time__clock-pos-${t.index}`+(t.val===e?" q-time__clock-position--active "+N.value:t.disable===!0?" q-time__clock-position--disable":"")},[d("span",t.label)]))])]),He.value)])])),l.nowBtn===!0?d(L,{class:"q-time__now-button absolute",icon:i.iconSet.datetime.now,unelevated:!0,size:"sm",round:!0,color:l.color,textColor:l.textColor,tabindex:k.value,onClick:ge}):null])}return M.proxy.setNow=ge,()=>{const e=[Ke()],t=at(C.default);return t!==void 0&&e.push(d("div",{class:"q-time__actions"},t)),l.name!==void 0&&l.disable!==!0&&le(e,"push"),d("div",{class:qe.value,tabindex:-1},[$e(),d("div",{class:"q-time__main col overflow-auto"},e)])}}});const xt={class:"row items-center justify-end"},St={class:"row items-center justify-end"},Vt={class:"row"},Xt=dt({__name:"RefuelForm",props:{id:{type:Number}},setup(l){const C=ct(),P=bt(),M=wt(),i=S(new Dt),H=S(I.formatDate(Date.now(),"YYYY/MM/DD")),k=S(I.formatDate(Date.now(),"HH:mm")),N=S("");let q="";const R=l;function te(p){const o=new Date(p);H.value=I.formatDate(o,"YYYY/MM/DD"),i.value.date||(i.value.date=o),i.value.date.setFullYear(o.getFullYear()),i.value.date.setMonth(o.getMonth()),i.value.date.setDate(o.getDate())}function le(p){const o=p.split(":"),b=parseInt(o[0]),x=parseInt(o[1]),_=new Date(Date.now());i.value.date||(i.value.date=_),_.setHours(b),_.setMinutes(x),k.value=I.formatDate(_,"HH:mm"),i.value.date.setHours(b),i.value.date.setMinutes(x)}async function A(){let p=i.value;q.includes("/add")?p.id=await P.addRefuel({...i.value}):q.includes("/edit")&&await P.updateRefuel({...i.value});const o=p&&p.id?p.id:0;C.push({path:`/refuels/${o}`,params:{id:o}})}function O(){i.value.id?C.push({path:`/refuels/${i.value.id}`,params:{id:i.value.id}}):C.go(-1)}return vt(async()=>{var p;if(q=C.currentRoute.value.path.toLocaleLowerCase(),q.includes("/add")?Me.emit("updateTitle","Add refuel"):q.includes("/edit")&&Me.emit("updateTitle","Edit refuel"),N.value=M.plateNumberInTitleActive?M.selectedVehiclePlateNumber:M.selectedVehicleName,i.value.vehicleId=(p=M.selectedVehicleId)!=null?p:0,R.id){const o=await P.getRefuel(R.id);o?(i.value.id=o.id,i.value.payedAmount=o.payedAmount,i.value.refueledAmount=o.refueledAmount,i.value.distanceDriven=o.distanceDriven,q.includes("/edit")&&(i.value.date=o.date,H.value=I.formatDate(o.date,"YYYY/MM/DD"),k.value=I.formatDate(o.date,"HH:mm"))):console.error("Refuel not found!")}else i.value.date=new Date(Date.now())}),(p,o)=>(mt(),ft("div",null,[h(kt,{onSubmit:A,class:"q-px-md q-gutter-md"},{default:Y(()=>{var b,x,_;return[h(Ue,{align:"top"},{default:Y(()=>[ht(pt(N.value),1)]),_:1}),h(K,{type:"tel",value:(b=i.value.payedAmount)==null?void 0:b.toString(),"onUpdate:modelValue":o[0]||(o[0]=n=>i.value.payedAmount=+m(fe)(n)),label:"Payed amount",rules:[m(j),m(ce),m(ve),m(me)],autofocus:""},null,8,["value","rules"]),h(K,{type:"tel",value:(x=i.value.distanceDriven)==null?void 0:x.toString(),"onUpdate:modelValue":o[1]||(o[1]=n=>i.value.distanceDriven=+m(fe)(n)),label:"Distance driven",rules:[m(j),m(ce),m(ve),m(me)]},null,8,["value","rules"]),h(K,{type:"tel",value:(_=i.value.refueledAmount)==null?void 0:_.toString(),"onUpdate:modelValue":o[2]||(o[2]=n=>i.value.refueledAmount=+m(fe)(n)),label:"Refueled amount",rules:[m(j),m(ce),m(ve),m(me)]},null,8,["value","rules"]),h(K,{value:H.value,label:"Refuel date",rules:[m(j)]},{default:Y(()=>[h(be,{"transition-show":"scale","transition-hide":"scale"},{default:Y(()=>[h(Xe,{modelValue:H.value,"onUpdate:modelValue":o[3]||(o[3]=n=>te(n))},null,8,["modelValue"]),de("div",xt,[he(h(L,{label:"Close",color:"primary",flat:""},null,512),[[Ce]])])]),_:1})]),_:1},8,["value","rules"]),h(K,{value:k.value,label:"Refuel time",rules:[m(j)]},{default:Y(()=>[h(be,{"transition-show":"scale","transition-hide":"scale"},{default:Y(()=>[h(qt,{modelValue:k.value,"onUpdate:modelValue":o[4]||(o[4]=n=>le(n)),format24h:""},null,8,["modelValue"]),de("div",St,[he(h(L,{label:"Close",color:"primary",flat:""},null,512),[[Ce]])])]),_:1})]),_:1},8,["value","rules"]),de("div",Vt,[h(L,{color:"negative",label:"Cancel","no-caps":"",class:"form-btn",onClick:O}),h(yt),h(L,{color:"positive",label:"Confirm",type:"submit","no-caps":"",class:"form-btn"})])]}),_:1})]))}});export{Xt as default};