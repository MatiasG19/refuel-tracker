"use strict";(self["webpackChunkrefuel_tracker"]=self["webpackChunkrefuel_tracker"]||[]).push([[201],{7201:(e,l,t)=>{t.r(l),t.d(l,{default:()=>_});var a=t(3673),u=t(1959),n=t(5616),o=t(9582),d=t(605),s=t(1036),i=t(4603),r=t(1612),c=t(9852),m=function(e,l,t,a){function u(e){return e instanceof t?e:new t((function(l){l(e)}))}return new(t||(t=Promise))((function(t,n){function o(e){try{s(a.next(e))}catch(l){n(l)}}function d(e){try{s(a["throw"](e))}catch(l){n(l)}}function s(e){e.done?t(e.value):u(e.value).then(o,d)}s((a=a.apply(e,l||[])).next())}))};const v={class:"row items-center justify-end"},p={class:"row items-center justify-end"},f={class:"row"},D=(0,a.aZ)({props:{id:{type:Number}},setup(e){const l=e,t=(0,o.tv)(),D=(0,r.h)(),w=(0,r.n)(),b=(0,u.iH)(new c.CD),h=(0,u.iH)(n.ZP.formatDate(Date.now(),"YYYY/MM/DD")),y=(0,u.iH)(n.ZP.formatDate(Date.now(),"HH:mm"));let Z="";function V(e){const l=new Date(e);h.value=n.ZP.formatDate(l,"YYYY/MM/DD"),b.value.date||(b.value.date=l),b.value.date.setFullYear(l.getFullYear()),b.value.date.setMonth(l.getMonth()),b.value.date.setDate(l.getDate())}function M(e){const l=e.split(":"),t=parseInt(l[0]),a=parseInt(l[1]),u=new Date(Date.now());b.value.date||(b.value.date=u),u.setHours(t),u.setMinutes(a),y.value=n.ZP.formatDate(u,"HH:mm"),b.value.date.setHours(t),b.value.date.setMinutes(a)}function W(){return m(this,void 0,void 0,(function*(){Z.includes("/add")?yield w.addRefuel(Object.assign({},b.value)):Z.includes("/edit")&&(yield w.updateRefuel(Object.assign({},b.value))),t.push("/refuels")}))}return(0,a.bv)((()=>m(this,void 0,void 0,(function*(){if(Z=t.currentRoute.value.path.toLocaleLowerCase(),Z.includes("/add")?s.emitter.emit("updateTitle","Add refuel"):Z.includes("/edit")&&s.emitter.emit("updateTitle","Edit refuel"),b.value.vehicleId=D.selectedVehicleId,l.id){const e=yield w.getRefuel(l.id);e?(console.log(e),b.value.id=e.id,b.value.payedAmount=e.payedAmount,b.value.refueledAmount=e.refueledAmount,b.value.distanceDriven=e.distanceDriven,Z.includes("/edit")&&(b.value.date=e.date,h.value=n.ZP.formatDate(e.date,"YYYY/MM/DD"),y.value=n.ZP.formatDate(e.date,"HH:mm"))):console.error("Refuel not found!")}else b.value.date=new Date(Date.now())})))),(e,l)=>{const t=(0,a.up)("q-date"),n=(0,a.up)("q-btn"),o=(0,a.up)("q-popup-proxy"),s=(0,a.up)("q-time"),r=(0,a.up)("q-space"),c=(0,a.up)("q-form"),m=(0,a.Q2)("close-popup");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(c,{onSubmit:W,class:"q-pa-md q-gutter-md"},{default:(0,a.w5)((()=>[(0,a.Wm)(d.Z,{modelValue:b.value.payedAmount,"onUpdate:modelValue":l[0]||(l[0]=e=>b.value.payedAmount=e),label:"Payed amount",rules:[(0,u.SU)(i.M),(0,u.SU)(i.g)],autofocus:""},null,8,["modelValue","rules"]),(0,a.Wm)(d.Z,{modelValue:b.value.distanceDriven,"onUpdate:modelValue":l[1]||(l[1]=e=>b.value.distanceDriven=e),label:"Distance driven",rules:[(0,u.SU)(i.M),(0,u.SU)(i.g)]},null,8,["modelValue","rules"]),(0,a.Wm)(d.Z,{modelValue:b.value.refueledAmount,"onUpdate:modelValue":l[2]||(l[2]=e=>b.value.refueledAmount=e),label:"Refuled amount",rules:[(0,u.SU)(i.M),(0,u.SU)(i.g)]},null,8,["modelValue","rules"]),(0,a.Wm)(d.Z,{value:h.value,label:"Refuel date",rules:[(0,u.SU)(i.M)],mask:"date"},{default:(0,a.w5)((()=>[(0,a.Wm)(o,{"transition-show":"scale","transition-hide":"scale"},{default:(0,a.w5)((()=>[(0,a.Wm)(t,{modelValue:h.value,"onUpdate:modelValue":l[3]||(l[3]=e=>V(e))},null,8,["modelValue"]),(0,a._)("div",v,[(0,a.wy)((0,a.Wm)(n,{label:"Close",color:"primary",flat:""},null,512),[[m]])])])),_:1})])),_:1},8,["value","rules"]),(0,a.Wm)(d.Z,{value:y.value,label:"Refuel time",rules:[(0,u.SU)(i.M)]},{default:(0,a.w5)((()=>[(0,a.Wm)(o,{"transition-show":"scale","transition-hide":"scale"},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{modelValue:y.value,"onUpdate:modelValue":l[4]||(l[4]=e=>M(e)),format24h:""},null,8,["modelValue"]),(0,a._)("div",p,[(0,a.wy)((0,a.Wm)(n,{label:"Close",color:"primary",flat:""},null,512),[[m]])])])),_:1})])),_:1},8,["value","rules"]),(0,a._)("div",f,[(0,a.Wm)(n,{color:"negative",label:"Cancel","no-caps":"",class:"btn",onClick:l[5]||(l[5]=l=>e.$router.go(-1))}),(0,a.Wm)(r),(0,a.Wm)(n,{color:"positive",label:"Confirm",type:"submit","no-caps":"",class:"btn"})])])),_:1})])}}});var w=t(4260),b=t(5269),h=t(3944),y=t(5626),Z=t(8240),V=t(5990),M=t(2025),W=t(677),g=t(7518),Y=t.n(g);const U=(0,w.Z)(D,[["__scopeId","data-v-5cab1889"]]),_=U;Y()(D,"components",{QForm:b.Z,QPopupProxy:h.Z,QDate:y.Z,QBtn:Z.Z,QTime:V.Z,QSpace:M.Z}),Y()(D,"directives",{ClosePopup:W.Z})}}]);