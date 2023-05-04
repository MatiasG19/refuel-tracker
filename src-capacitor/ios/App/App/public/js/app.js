(()=>{"use strict";var e={9011:(e,t,r)=>{r(5363),r(71);var n=r(8880),i=r(9592),o=r(3673);function s(e,t,r,n,i,s){const l=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(l)}const l=(0,o.aZ)({name:"App"});var u=r(4260);const a=(0,u.Z)(l,[["render",s]]),c=a;var d=r(7083),h=r(9582);const p=[{path:"/index",component:()=>Promise.all([r.e(736),r.e(64),r.e(696)]).then(r.bind(r,5696)),children:[{path:"/",component:()=>Promise.all([r.e(736),r.e(64),r.e(727)]).then(r.bind(r,3727))},{path:"/refuels",component:()=>r.e(150).then(r.bind(r,3150)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(64),r.e(429)]).then(r.bind(r,8574))},{path:"add",component:()=>Promise.all([r.e(736),r.e(64),r.e(870)]).then(r.bind(r,9870))},{path:"edit/:id",component:()=>Promise.all([r.e(736),r.e(64),r.e(870)]).then(r.bind(r,9870)),props:!0},{path:"filter",component:()=>Promise.all([r.e(736),r.e(64),r.e(976)]).then(r.bind(r,976))}]},{path:"/vehicles",component:()=>r.e(256).then(r.bind(r,4256)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(64),r.e(15)]).then(r.bind(r,7851))},{path:"add",component:()=>Promise.all([r.e(736),r.e(64),r.e(937)]).then(r.bind(r,7937))},{path:"edit/:id",component:()=>Promise.all([r.e(736),r.e(64),r.e(937)]).then(r.bind(r,7937)),props:!0}]},{path:"/settings",component:()=>Promise.all([r.e(736),r.e(64),r.e(3)]).then(r.bind(r,5003))},{path:"/support",component:()=>Promise.all([r.e(736),r.e(64),r.e(402)]).then(r.bind(r,8402))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(199)]).then(r.bind(r,9199))}],f=p,v=(0,d.BC)((function(){const e=h.r5,t=(0,h.p7)({scrollBehavior:()=>({left:0,top:0}),routes:f,history:e("")});return t}));r(8416),r(8241);var m=r(4089);const g=(0,o.aZ)({name:"AppWrapper",setup(e){return(0,o.bv)((()=>{m.c.hide()})),()=>(0,o.h)(c,e)}});async function b(e,t){const r="function"===typeof v?await v({}):v,n=e(g);return n.use(i.Z,t),n.config.globalProperties.$q.capacitor=window.Capacitor,{app:n,router:r}}var y=r(2147);const w={config:{},plugins:{Dialog:y.Z}},P="";async function k({app:e,router:t},r){let n=!1;const i=e=>{try{return t.resolve(e).href}catch(r){}return Object(e)===e?null:e},o=e=>{if(n=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=i(e);null!==t&&(window.location.href=t,window.location.reload())},s=window.location.href.replace(window.location.origin,"");for(let u=0;!1===n&&u<r.length;u++)try{await r[u]({app:e,router:t,ssrContext:null,redirect:o,urlPath:s,publicPath:P})}catch(l){return l&&l.url?void o(l.url):void console.error("[Quasar] boot error:",l)}!0!==n&&(e.use(t),e.mount("#q-app"))}b(n.ri,w).then((e=>Promise.all([Promise.resolve().then(r.bind(r,6451)),Promise.resolve().then(r.bind(r,1036)),Promise.resolve().then(r.bind(r,1058)),Promise.resolve().then(r.bind(r,198)),Promise.resolve().then(r.bind(r,968)),Promise.resolve().then(r.bind(r,261))]).then((t=>{const r=t.map((e=>e.default)).filter((e=>"function"===typeof e));k(e,r)}))))},198:(e,t,r)=>{r.r(t),r.d(t,{RefuelTrackerDexie:()=>s,db:()=>l});var n=r(9387);class i{constructor(){this.vehicleId=null}}var o=function(e,t,r,n){function i(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,o){function s(e){try{u(n.next(e))}catch(t){o(t)}}function l(e){try{u(n["throw"](e))}catch(t){o(t)}}function u(e){e.done?r(e.value):i(e.value).then(s,l)}u((n=n.apply(e,t||[])).next())}))};class s extends n.U{constructor(){super("RefuelTrackerDb"),this.version(1).stores({graphSettings:"++id, uid, sequence, periodId, visible",vehicles:"++id, name, plateNumber, fuelUnitId",refuels:"++id, date, refuelAmount, payedAmount, distanceDriven, vehicleId",settings:"++id, colorThemeId, distanceUnitId, vehicleId, plateNumberInTitleActive, refuelFilterActive"}),this.insertGraphSettings(),this.insertSettings()}insertGraphSettings(){const e=[{uid:"1",sequence:1,visible:!0},{uid:"2",sequence:2,visible:!0},{uid:"3",sequence:3,visible:!0},{uid:"4",sequence:4,visible:!0},{uid:"5",sequence:5,visible:!0},{uid:"6",sequence:6,visible:!0}];e.forEach((e=>{(()=>{o(this,void 0,void 0,(function*(){const t=yield this.graphSettings.where("uid").equals(e.uid).toArray();0===t.length&&(yield this.graphSettings.put(e))}))})()}))}insertSettings(){(()=>{o(this,void 0,void 0,(function*(){if(0===(yield this.settings.count())){const e=new i;e.colorThemeId=1,e.distanceUnitId=1,e.plateNumberInTitleActive=!1,e.refuelFilterActive=!1,(()=>{o(this,void 0,void 0,(function*(){return yield this.settings.put(e)}))})()}}))})()}}const l=new s},261:(e,t,r)=>{function n(){}r.r(t),r.d(t,{_:()=>n}),Number.prototype.toFixedIfNotZero=function(e){const t=Number(this),r=Math.trunc(t);return 10*(t-r)*e%2===0?r.toString():t.toFixed(e)}},6451:(e,t,r)=>{r.r(t),r.d(t,{default:()=>u,i18n:()=>l});var n=r(7083),i=r(5948);const o={periods:{week:"Week",threeMonths:"3 Months",sixMonths:"6 Months",year:"Year",max:"Max"},distanceUnits:{kilometersShort:"km",milesShort:"mi"},fuelUnits:{litre:"Litre",gallon:"Gallon",kWh:"kWh",wh:"Wh"},fuelConsumptionsUnits:{litresPer100km:"L/100km",mpgUs:"MPG US",mpgImperial:"MPG Imperial",kWhPer100km:"kWh/100km",whPer100km:"Wh/100km",whPerMile:" Wh/mile"}},s={"en-US":o},l=(0,i.o)({locale:"en-US",messages:s}),u=(0,n.xr)((({app:e})=>{e.use(l)}))},1036:(e,t,r)=>{r.r(t),r.d(t,{emitter:()=>i});var n=r(687);const i=(0,n.Z)()},1058:(e,t,r)=>{r.r(t),r.d(t,{default:()=>s});var n=r(7083),i=r(321);const o=(0,i.WB)(),s=(0,n.xr)((({app:e})=>{e.use(o)}))},968:(e,t,r)=>{r.r(t);var n=r(9256),i=r(721);class o extends i.K6{constructor(e){super(),this.vehicle=e,this.title=this.setTitle(),this.value=this.calculateValue(this.vehicle),this.unit=this.getUnit(this.vehicle)}setTitle(){return""}calculateValue(e){return""}getUnit(e){return""}}class s extends o{constructor(e){super(e),this.vehicle=e}setTitle(){return"Fuel consumption"}calculateValue(e){return(0,n.DS)(e).toFixedIfNotZero(2)}getUnit(e){var t,r;return null!==(r=null===(t=e.fuelUnit)||void 0===t?void 0:t.fuelConsumptionUnit)&&void 0!==r?r:""}}class l extends o{constructor(e){super(e),this.vehicle=e}setTitle(){return"Distance driven"}calculateValue(e){return(0,n.vS)(e).toFixedIfNotZero(1)}getUnit(e){var t,r;return null!==(r=null===(t=e.fuelUnit)||void 0===t?void 0:t.distanceUnit)&&void 0!==r?r:""}}class u extends o{constructor(e){super(e),this.vehicle=e}setTitle(){return"Fuel burnt"}calculateValue(e){return(0,n.Vg)(e).toFixedIfNotZero(1)}getUnit(e){var t,r;return null!==(r=null===(t=e.fuelUnit)||void 0===t?void 0:t.fuelUnit)&&void 0!==r?r:""}}class a extends o{constructor(e){super(e),this.vehicle=e}setTitle(){return"Refuels made"}calculateValue(e){return(0,n.g8)(e).toString()}getUnit(){return""}}class c extends o{constructor(e){super(e),this.vehicle=e}setTitle(){return"Fuel pricing"}calculateValue(e){return(0,n.Uj)(e).toFixedIfNotZero(2)}getUnit(e){var t;return`${e.currencyUnit}/${null===(t=e.fuelUnit)||void 0===t?void 0:t.fuelUnit}`}}class d extends o{constructor(e){super(e),this.vehicle=e}setTitle(){return"Money spent"}calculateValue(e){return(0,n.OG)(e).toFixedIfNotZero(2)}getUnit(e){return e.currencyUnit}}var h=r(4745);function p(){h.d.register("1",s),h.d.register("2",l),h.d.register("3",d),h.d.register("4",c),h.d.register("5",u),h.d.register("6",a)}var f=r(3704);function v(e,t){return 100*e/t}function m(e,t){return t/e}function g(e,t){return t/e}function b(e,t){return 100*e/t}function y(e,t){return 100*e/t}function w(e,t){return e/t}function P(){f.q.register("1",v),f.q.register("2",m),f.q.register("3",g),f.q.register("4",b),f.q.register("5",y),f.q.register("6",w)}p(),P()},4745:(e,t,r)=>{r.d(t,{d:()=>n});class n{constructor(e){this.vehicle=e}static register(e,t){n.graphDataClasses.set(e,t)}getAll(e){const t=[];for(const r of n.graphDataClasses.entries()){const n=r[0],i=r[1];if(!n)continue;const o=e.filter((e=>e.uid===n));o&&t.push(this.createGraphData(i,o[0]))}return t}get(e,t){const r=n.graphDataClasses.get(e);return r?this.createGraphData(r,t):null}createGraphData(e,t){const r=new e(this.vehicle);return r.uid=t.uid,r.sequence=t.sequence,r.visible=t.visible,r}}n.graphDataClasses=new Map},721:(e,t,r)=>{r.d(t,{K6:()=>n});class n{}},3704:(e,t,r)=>{r.d(t,{q:()=>n});class n{static register(e,t){n.fuelConsumptionFunctions.set(e,t)}static get(e){const t=n.fuelConsumptionFunctions.get(e);return t||null}}n.fuelConsumptionFunctions=new Map},9256:(e,t,r)=>{r.d(t,{vS:()=>o,Vg:()=>s,DS:()=>i,Uj:()=>l,OG:()=>u,g8:()=>a});var n=r(3704);function i(e){var t,r;if(!e.refuels||0===e.refuels.length)return 0;let i=null===(t=e.refuels)||void 0===t?void 0:t.map((e=>e.refueledAmount)).reduce(((e,t)=>+e+ +t));i=i?+i:0;let o=null===(r=e.refuels)||void 0===r?void 0:r.map((e=>e.distanceDriven)).reduce(((e,t)=>+e+ +t));o=o?+o:0;const s=n.q.get(e.fuelUnitId.toString());return s?s(i,o):0}function o(e){var t;return e.refuels&&0!==e.refuels.length?+(null===(t=e.refuels)||void 0===t?void 0:t.map((e=>e.distanceDriven)).reduce(((e,t)=>+e+ +t))):0}function s(e){var t;return e.refuels&&0!==e.refuels.length?+(null===(t=e.refuels)||void 0===t?void 0:t.map((e=>e.refueledAmount)).reduce(((e,t)=>+e+ +t))):0}function l(e){var t;if(!e.refuels||0===e.refuels.length)return 0;let r=1,n=null===(t=e.refuels)||void 0===t?void 0:t.map((e=>+e.payedAmount/+e.refueledAmount)).reduce(((e,t,n)=>(r+=n,+e+ +t)));return n=n?+n/r:0,n}function u(e){var t;return e.refuels&&0!==e.refuels.length?+(null===(t=e.refuels)||void 0===t?void 0:t.map((e=>e.payedAmount)).reduce(((e,t)=>+e+ +t)).toString()):0}function a(e){var t;return e.refuels&&0!==e.refuels.length?null===(t=e.refuels)||void 0===t?void 0:t.length:0}}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.m=e,(()=>{var e=[];r.O=(t,n,i,o)=>{if(!n){var s=1/0;for(c=0;c<e.length;c++){for(var[n,i,o]=e[c],l=!0,u=0;u<n.length;u++)(!1&o||s>=o)&&Object.keys(r.O).every((e=>r.O[e](n[u])))?n.splice(u--,1):(l=!1,o<s&&(s=o));if(l){e.splice(c--,1);var a=i();void 0!==a&&(t=a)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[n,i,o]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+(64===e?"chunk-common":e)+".js"})(),(()=>{r.miniCssF=e=>"css/"+({143:"app",736:"vendor"}[e]||e)+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="refuel-tracker:";r.l=(n,i,o,s)=>{if(e[n])e[n].push(i);else{var l,u;if(void 0!==o)for(var a=document.getElementsByTagName("script"),c=0;c<a.length;c++){var d=a[c];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+o){l=d;break}}l||(u=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.setAttribute("data-webpack",t+o),l.src=n),e[n]=[i];var h=(t,r)=>{l.onerror=l.onload=null,clearTimeout(p);var i=e[n];if(delete e[n],l.parentNode&&l.parentNode.removeChild(l),i&&i.forEach((e=>e(r))),t)return t(r)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=h.bind(null,l.onerror),l.onload=h.bind(null,l.onload),u&&document.head.appendChild(l)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p=""})(),(()=>{var e=(e,t,r,n)=>{var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var o=o=>{if(i.onerror=i.onload=null,"load"===o.type)r();else{var s=o&&("load"===o.type?"missing":o.type),l=o&&o.target&&o.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+l+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=s,u.request=l,i.parentNode.removeChild(i),n(u)}};return i.onerror=i.onload=o,i.href=t,document.head.appendChild(i),i},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var i=r[n],o=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===e||o===t))return i}var s=document.getElementsByTagName("style");for(n=0;n<s.length;n++){i=s[n],o=i.getAttribute("data-href");if(o===e||o===t)return i}},n=n=>new Promise(((i,o)=>{var s=r.miniCssF(n),l=r.p+s;if(t(s,l))return i();e(n,l,i,o)})),i={143:0};r.f.miniCss=(e,t)=>{var r={15:1,429:1,870:1,937:1};i[e]?t.push(i[e]):0!==i[e]&&r[e]&&t.push(i[e]=n(e).then((()=>{i[e]=0}),(t=>{throw delete i[e],t})))}})(),(()=>{var e={143:0};r.f.j=(t,n)=>{var i=r.o(e,t)?e[t]:void 0;if(0!==i)if(i)n.push(i[2]);else{var o=new Promise(((r,n)=>i=e[t]=[r,n]));n.push(i[2]=o);var s=r.p+r.u(t),l=new Error,u=n=>{if(r.o(e,t)&&(i=e[t],0!==i&&(e[t]=void 0),i)){var o=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",l.name="ChunkLoadError",l.type=o,l.request=s,i[1](l)}};r.l(s,u,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,n)=>{var i,o,[s,l,u]=n,a=0;if(s.some((t=>0!==e[t]))){for(i in l)r.o(l,i)&&(r.m[i]=l[i]);if(u)var c=u(r)}for(t&&t(n);a<s.length;a++)o=s[a],r.o(e,o)&&e[o]&&e[o][0](),e[s[a]]=0;return r.O(c)},n=self["webpackChunkrefuel_tracker"]=self["webpackChunkrefuel_tracker"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[736],(()=>r(9011)));n=r.O(n)})();