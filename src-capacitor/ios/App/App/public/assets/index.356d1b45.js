import{P as r,Q as p,S as m,U as n,az as u,d as a,ar as d,Z as f,$ as _,as as g,a4 as s,aa as C,aq as D,_ as k,aA as Q}from"./index.dc551ac6.js";import{Q as b}from"./QSpace.09ccd3fc.js";import{u as v}from"./index.8776d51a.js";const x=r({__name:"ConfirmDialog",props:{promptMessage:{type:String,required:!0},action:{type:Function},actionArgument:{}},setup(e){const o=e,{dialogRef:t,onDialogOK:i,onDialogCancel:c}=v();function l(){o.action&&o.action(o.actionArgument),i()}return(S,A)=>(p(),m(u,{ref_key:"dialogRef",ref:t,"no-backdrop-dismiss":"",position:"bottom","full-width":""},{default:n(()=>[a(D,{class:"q-ma-md el-space-station"},{default:n(()=>[a(d,{class:"text-center"},{default:n(()=>[f(_(e.promptMessage),1)]),_:1}),a(g,null,{default:n(()=>[a(s,{onClick:C(c),class:"column btn","no-caps":"",color:"negative",label:"Cancel"},null,8,["onClick"]),a(b),a(s,{onClick:l,class:"column btn","no-caps":"",color:"positive",label:"Confirm"})]),_:1})]),_:1})]),_:1},512))}});var y=k(x,[["__scopeId","data-v-b48d05dc"]]);function P(e,o,t){Q.create({component:y,componentProps:{promptMessage:e,action:o,actionArgument:t}})}export{P as c};
