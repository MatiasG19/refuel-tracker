import{L as D}from"./index.9da299ca.js";import{o as qe}from"./open-url.046bcee8.js";import{p as P}from"./package.b9b88699.js";import{d as J}from"./dexie.e9b82229.js";import{o as Me,a as ve}from"./index.af9e0f6e.js";function Ee(e,t){return function(){return e.apply(t,arguments)}}const{toString:$e}=Object.prototype,{getPrototypeOf:te}=Object,q=(e=>t=>{const n=$e.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),A=e=>(e=e.toLowerCase(),t=>q(t)===e),M=e=>t=>typeof t===e,{isArray:_}=Array,U=M("undefined");function ze(e){return e!==null&&!U(e)&&e.constructor!==null&&!U(e.constructor)&&R(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const be=A("ArrayBuffer");function Je(e){let t;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&be(e.buffer),t}const Ve=M("string"),R=M("function"),Se=M("number"),v=e=>e!==null&&typeof e=="object",We=e=>e===!0||e===!1,B=e=>{if(q(e)!=="object")return!1;const t=te(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Ke=A("Date"),Ge=A("File"),Xe=A("Blob"),Qe=A("FileList"),Ze=e=>v(e)&&R(e.pipe),Ye=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||R(e.append)&&((t=q(e))==="formdata"||t==="object"&&R(e.toString)&&e.toString()==="[object FormData]"))},et=A("URLSearchParams"),tt=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function L(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e=="undefined")return;let r,s;if(typeof e!="object"&&(e=[e]),_(e))for(r=0,s=e.length;r<s;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let u;for(r=0;r<i;r++)u=o[r],t.call(null,e[u],u,e)}}function Re(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,s;for(;r-- >0;)if(s=n[r],t===s.toLowerCase())return s;return null}const Oe=(()=>typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:global)(),Ae=e=>!U(e)&&e!==Oe;function X(){const{caseless:e}=Ae(this)&&this||{},t={},n=(r,s)=>{const o=e&&Re(t,s)||s;B(t[o])&&B(r)?t[o]=X(t[o],r):B(r)?t[o]=X({},r):_(r)?t[o]=r.slice():t[o]=r};for(let r=0,s=arguments.length;r<s;r++)arguments[r]&&L(arguments[r],n);return t}const nt=(e,t,n,{allOwnKeys:r}={})=>(L(t,(s,o)=>{n&&R(s)?e[o]=Ee(s,n):e[o]=s},{allOwnKeys:r}),e),rt=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),st=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},ot=(e,t,n,r)=>{let s,o,i;const u={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!r||r(i,e,t))&&!u[i]&&(t[i]=e[i],u[i]=!0);e=n!==!1&&te(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},it=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},at=e=>{if(!e)return null;if(_(e))return e;let t=e.length;if(!Se(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},ct=(e=>t=>e&&t instanceof e)(typeof Uint8Array!="undefined"&&te(Uint8Array)),ut=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let s;for(;(s=r.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},lt=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},ft=A("HTMLFormElement"),dt=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,s){return r.toUpperCase()+s}),ae=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),pt=A("RegExp"),ge=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};L(n,(s,o)=>{let i;(i=t(s,o,e))!==!1&&(r[o]=i||s)}),Object.defineProperties(e,r)},ht=e=>{ge(e,(t,n)=>{if(R(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(!!R(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},mt=(e,t)=>{const n={},r=s=>{s.forEach(o=>{n[o]=!0})};return _(e)?r(e):r(String(e).split(t)),n},yt=()=>{},wt=(e,t)=>(e=+e,Number.isFinite(e)?e:t),V="abcdefghijklmnopqrstuvwxyz",ce="0123456789",Te={DIGIT:ce,ALPHA:V,ALPHA_DIGIT:V+V.toUpperCase()+ce},Et=(e=16,t=Te.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function bt(e){return!!(e&&R(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const St=e=>{const t=new Array(10),n=(r,s)=>{if(v(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[s]=r;const o=_(r)?[]:{};return L(r,(i,u)=>{const l=n(i,s+1);!U(l)&&(o[u]=l)}),t[s]=void 0,o}}return r};return n(e,0)},Rt=A("AsyncFunction"),Ot=e=>e&&(v(e)||R(e))&&R(e.then)&&R(e.catch);var a={isArray:_,isArrayBuffer:be,isBuffer:ze,isFormData:Ye,isArrayBufferView:Je,isString:Ve,isNumber:Se,isBoolean:We,isObject:v,isPlainObject:B,isUndefined:U,isDate:Ke,isFile:Ge,isBlob:Xe,isRegExp:pt,isFunction:R,isStream:Ze,isURLSearchParams:et,isTypedArray:ct,isFileList:Qe,forEach:L,merge:X,extend:nt,trim:tt,stripBOM:rt,inherits:st,toFlatObject:ot,kindOf:q,kindOfTest:A,endsWith:it,toArray:at,forEachEntry:ut,matchAll:lt,isHTMLForm:ft,hasOwnProperty:ae,hasOwnProp:ae,reduceDescriptors:ge,freezeMethods:ht,toObjectSet:mt,toCamelCase:dt,noop:yt,toFiniteNumber:wt,findKey:Re,global:Oe,isContextDefined:Ae,ALPHABET:Te,generateString:Et,isSpecCompliantForm:bt,toJSONObject:St,isAsyncFn:Rt,isThenable:Ot};function m(e,t,n,r,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),s&&(this.response=s)}a.inherits(m,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Ne=m.prototype,xe={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{xe[e]={value:e}});Object.defineProperties(m,xe);Object.defineProperty(Ne,"isAxiosError",{value:!0});m.from=(e,t,n,r,s,o)=>{const i=Object.create(Ne);return a.toFlatObject(e,i,function(l){return l!==Error.prototype},u=>u!=="isAxiosError"),m.call(i,e.message,t,n,r,s),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};var At=null;function Q(e){return a.isPlainObject(e)||a.isArray(e)}function Pe(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function ue(e,t,n){return e?e.concat(t).map(function(s,o){return s=Pe(s),!n&&o?"["+s+"]":s}).join(n?".":""):t}function gt(e){return a.isArray(e)&&!e.some(Q)}const Tt=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function $(e,t,n){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=a.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,E){return!a.isUndefined(E[h])});const r=n.metaTokens,s=n.visitor||f,o=n.dots,i=n.indexes,l=(n.Blob||typeof Blob!="undefined"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function d(p){if(p===null)return"";if(a.isDate(p))return p.toISOString();if(!l&&a.isBlob(p))throw new m("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(p)||a.isTypedArray(p)?l&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function f(p,h,E){let b=p;if(p&&!E&&typeof p=="object"){if(a.endsWith(h,"{}"))h=r?h:h.slice(0,-2),p=JSON.stringify(p);else if(a.isArray(p)&&gt(p)||(a.isFileList(p)||a.endsWith(h,"[]"))&&(b=a.toArray(p)))return h=Pe(h),b.forEach(function(N,He){!(a.isUndefined(N)||N===null)&&t.append(i===!0?ue([h],He,o):i===null?h:h+"[]",d(N))}),!1}return Q(p)?!0:(t.append(ue(E,h,o),d(p)),!1)}const c=[],y=Object.assign(Tt,{defaultVisitor:f,convertValue:d,isVisitable:Q});function S(p,h){if(!a.isUndefined(p)){if(c.indexOf(p)!==-1)throw Error("Circular reference detected in "+h.join("."));c.push(p),a.forEach(p,function(b,T){(!(a.isUndefined(b)||b===null)&&s.call(t,b,a.isString(T)?T.trim():T,h,y))===!0&&S(b,h?h.concat(T):[T])}),c.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return S(e),t}function le(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function ne(e,t){this._pairs=[],e&&$(e,this,t)}const Ce=ne.prototype;Ce.append=function(t,n){this._pairs.push([t,n])};Ce.toString=function(t){const n=t?function(r){return t.call(this,r,le)}:le;return this._pairs.map(function(s){return n(s[0])+"="+n(s[1])},"").join("&")};function Nt(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function _e(e,t,n){if(!t)return e;const r=n&&n.encode||Nt,s=n&&n.serialize;let o;if(s?o=s(t,n):o=a.isURLSearchParams(t)?t.toString():new ne(t,n).toString(r),o){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class xt{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(r){r!==null&&t(r)})}}var fe=xt,De={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Pt=typeof URLSearchParams!="undefined"?URLSearchParams:ne,Ct=typeof FormData!="undefined"?FormData:null,_t=typeof Blob!="undefined"?Blob:null,Dt={isBrowser:!0,classes:{URLSearchParams:Pt,FormData:Ct,Blob:_t},protocols:["http","https","file","blob","url","data"]};const Fe=typeof window!="undefined"&&typeof document!="undefined",Ft=(e=>Fe&&["ReactNative","NativeScript","NS"].indexOf(e)<0)(typeof navigator!="undefined"&&navigator.product),Ut=(()=>typeof WorkerGlobalScope!="undefined"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")();var Lt=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Fe,hasStandardBrowserWebWorkerEnv:Ut,hasStandardBrowserEnv:Ft},Symbol.toStringTag,{value:"Module"})),O={...Lt,...Dt};function kt(e,t){return $(e,new O.classes.URLSearchParams,Object.assign({visitor:function(n,r,s,o){return O.isNode&&a.isBuffer(n)?(this.append(r,n.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function Bt(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function jt(e){const t={},n=Object.keys(e);let r;const s=n.length;let o;for(r=0;r<s;r++)o=n[r],t[o]=e[o];return t}function Ue(e){function t(n,r,s,o){let i=n[o++];if(i==="__proto__")return!0;const u=Number.isFinite(+i),l=o>=n.length;return i=!i&&a.isArray(s)?s.length:i,l?(a.hasOwnProp(s,i)?s[i]=[s[i],r]:s[i]=r,!u):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(n,r,s[i],o)&&a.isArray(s[i])&&(s[i]=jt(s[i])),!u)}if(a.isFormData(e)&&a.isFunction(e.entries)){const n={};return a.forEachEntry(e,(r,s)=>{t(Bt(r),s,n,0)}),n}return null}function It(e,t,n){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const re={transitional:De,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",s=r.indexOf("application/json")>-1,o=a.isObject(t);if(o&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s?JSON.stringify(Ue(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let u;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return kt(t,this.formSerializer).toString();if((u=a.isFileList(t))||r.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return $(u?{"files[]":t}:t,l&&new l,this.formSerializer)}}return o||s?(n.setContentType("application/json",!1),It(t)):t}],transformResponse:[function(t){const n=this.transitional||re.transitional,r=n&&n.forcedJSONParsing,s=this.responseType==="json";if(t&&a.isString(t)&&(r&&!this.responseType||s)){const i=!(n&&n.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(u){if(i)throw u.name==="SyntaxError"?m.from(u,m.ERR_BAD_RESPONSE,this,null,this.response):u}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:O.classes.FormData,Blob:O.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};a.forEach(["delete","get","head","post","put","patch"],e=>{re.headers[e]={}});var se=re;const Ht=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);var qt=e=>{const t={};let n,r,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),n=i.substring(0,s).trim().toLowerCase(),r=i.substring(s+1).trim(),!(!n||t[n]&&Ht[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t};const de=Symbol("internals");function F(e){return e&&String(e).trim().toLowerCase()}function j(e){return e===!1||e==null?e:a.isArray(e)?e.map(j):String(e)}function Mt(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const vt=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function W(e,t,n,r,s){if(a.isFunction(r))return r.call(this,t,n);if(s&&(t=n),!!a.isString(t)){if(a.isString(r))return t.indexOf(r)!==-1;if(a.isRegExp(r))return r.test(t)}}function $t(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function zt(e,t){const n=a.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(s,o,i){return this[r].call(this,t,s,o,i)},configurable:!0})})}class z{constructor(t){t&&this.set(t)}set(t,n,r){const s=this;function o(u,l,d){const f=F(l);if(!f)throw new Error("header name must be a non-empty string");const c=a.findKey(s,f);(!c||s[c]===void 0||d===!0||d===void 0&&s[c]!==!1)&&(s[c||l]=j(u))}const i=(u,l)=>a.forEach(u,(d,f)=>o(d,f,l));return a.isPlainObject(t)||t instanceof this.constructor?i(t,n):a.isString(t)&&(t=t.trim())&&!vt(t)?i(qt(t),n):t!=null&&o(n,t,r),this}get(t,n){if(t=F(t),t){const r=a.findKey(this,t);if(r){const s=this[r];if(!n)return s;if(n===!0)return Mt(s);if(a.isFunction(n))return n.call(this,s,r);if(a.isRegExp(n))return n.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=F(t),t){const r=a.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||W(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let s=!1;function o(i){if(i=F(i),i){const u=a.findKey(r,i);u&&(!n||W(r,r[u],u,n))&&(delete r[u],s=!0)}}return a.isArray(t)?t.forEach(o):o(t),s}clear(t){const n=Object.keys(this);let r=n.length,s=!1;for(;r--;){const o=n[r];(!t||W(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const n=this,r={};return a.forEach(this,(s,o)=>{const i=a.findKey(r,o);if(i){n[i]=j(s),delete n[o];return}const u=t?$t(o):String(o).trim();u!==o&&delete n[o],n[u]=j(s),r[u]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return a.forEach(this,(r,s)=>{r!=null&&r!==!1&&(n[s]=t&&a.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(s=>r.set(s)),r}static accessor(t){const r=(this[de]=this[de]={accessors:{}}).accessors,s=this.prototype;function o(i){const u=F(i);r[u]||(zt(s,i),r[u]=!0)}return a.isArray(t)?t.forEach(o):o(t),this}}z.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.reduceDescriptors(z.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});a.freezeMethods(z);var g=z;function K(e,t){const n=this||se,r=t||n,s=g.from(r.headers);let o=r.data;return a.forEach(e,function(u){o=u.call(n,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function Le(e){return!!(e&&e.__CANCEL__)}function k(e,t,n){m.call(this,e==null?"canceled":e,m.ERR_CANCELED,t,n),this.name="CanceledError"}a.inherits(k,m,{__CANCEL__:!0});function Jt(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new m("Request failed with status code "+n.status,[m.ERR_BAD_REQUEST,m.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}var Vt=O.hasStandardBrowserEnv?{write(e,t,n,r,s,o){const i=[e+"="+encodeURIComponent(t)];a.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),a.isString(r)&&i.push("path="+r),a.isString(s)&&i.push("domain="+s),o===!0&&i.push("secure"),document.cookie=i.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Wt(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Kt(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function ke(e,t){return e&&!Wt(t)?Kt(e,t):t}var Gt=O.hasStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function s(o){let i=o;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(i){const u=a.isString(i)?s(i):i;return u.protocol===r.protocol&&u.host===r.host}}():function(){return function(){return!0}}();function Xt(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function Qt(e,t){e=e||10;const n=new Array(e),r=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(l){const d=Date.now(),f=r[o];i||(i=d),n[s]=l,r[s]=d;let c=o,y=0;for(;c!==s;)y+=n[c++],c=c%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),d-i<t)return;const S=f&&d-f;return S?Math.round(y*1e3/S):void 0}}function pe(e,t){let n=0;const r=Qt(50,250);return s=>{const o=s.loaded,i=s.lengthComputable?s.total:void 0,u=o-n,l=r(u),d=o<=i;n=o;const f={loaded:o,total:i,progress:i?o/i:void 0,bytes:u,rate:l||void 0,estimated:l&&i&&d?(i-o)/l:void 0,event:s};f[t?"download":"upload"]=!0,e(f)}}const Zt=typeof XMLHttpRequest!="undefined";var Yt=Zt&&function(e){return new Promise(function(n,r){let s=e.data;const o=g.from(e.headers).normalize();let{responseType:i,withXSRFToken:u}=e,l;function d(){e.cancelToken&&e.cancelToken.unsubscribe(l),e.signal&&e.signal.removeEventListener("abort",l)}let f;if(a.isFormData(s)){if(O.hasStandardBrowserEnv||O.hasStandardBrowserWebWorkerEnv)o.setContentType(!1);else if((f=o.getContentType())!==!1){const[h,...E]=f?f.split(";").map(b=>b.trim()).filter(Boolean):[];o.setContentType([h||"multipart/form-data",...E].join("; "))}}let c=new XMLHttpRequest;if(e.auth){const h=e.auth.username||"",E=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(h+":"+E))}const y=ke(e.baseURL,e.url);c.open(e.method.toUpperCase(),_e(y,e.params,e.paramsSerializer),!0),c.timeout=e.timeout;function S(){if(!c)return;const h=g.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders()),b={data:!i||i==="text"||i==="json"?c.responseText:c.response,status:c.status,statusText:c.statusText,headers:h,config:e,request:c};Jt(function(N){n(N),d()},function(N){r(N),d()},b),c=null}if("onloadend"in c?c.onloadend=S:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(S)},c.onabort=function(){!c||(r(new m("Request aborted",m.ECONNABORTED,e,c)),c=null)},c.onerror=function(){r(new m("Network Error",m.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let E=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const b=e.transitional||De;e.timeoutErrorMessage&&(E=e.timeoutErrorMessage),r(new m(E,b.clarifyTimeoutError?m.ETIMEDOUT:m.ECONNABORTED,e,c)),c=null},O.hasStandardBrowserEnv&&(u&&a.isFunction(u)&&(u=u(e)),u||u!==!1&&Gt(y))){const h=e.xsrfHeaderName&&e.xsrfCookieName&&Vt.read(e.xsrfCookieName);h&&o.set(e.xsrfHeaderName,h)}s===void 0&&o.setContentType(null),"setRequestHeader"in c&&a.forEach(o.toJSON(),function(E,b){c.setRequestHeader(b,E)}),a.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),i&&i!=="json"&&(c.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&c.addEventListener("progress",pe(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",pe(e.onUploadProgress)),(e.cancelToken||e.signal)&&(l=h=>{!c||(r(!h||h.type?new k(null,e,c):h),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(l),e.signal&&(e.signal.aborted?l():e.signal.addEventListener("abort",l)));const p=Xt(y);if(p&&O.protocols.indexOf(p)===-1){r(new m("Unsupported protocol "+p+":",m.ERR_BAD_REQUEST,e));return}c.send(s||null)})};const Z={http:At,xhr:Yt};a.forEach(Z,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const he=e=>`- ${e}`,en=e=>a.isFunction(e)||e===null||e===!1;var Be={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let n,r;const s={};for(let o=0;o<t;o++){n=e[o];let i;if(r=n,!en(n)&&(r=Z[(i=String(n)).toLowerCase()],r===void 0))throw new m(`Unknown adapter '${i}'`);if(r)break;s[i||"#"+o]=r}if(!r){const o=Object.entries(s).map(([u,l])=>`adapter ${u} `+(l===!1?"is not supported by the environment":"is not available in the build"));let i=t?o.length>1?`since :
`+o.map(he).join(`
`):" "+he(o[0]):"as no adapter specified";throw new m("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return r},adapters:Z};function G(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new k(null,e)}function me(e){return G(e),e.headers=g.from(e.headers),e.data=K.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),Be.getAdapter(e.adapter||se.adapter)(e).then(function(r){return G(e),r.data=K.call(e,e.transformResponse,r),r.headers=g.from(r.headers),r},function(r){return Le(r)||(G(e),r&&r.response&&(r.response.data=K.call(e,e.transformResponse,r.response),r.response.headers=g.from(r.response.headers))),Promise.reject(r)})}const ye=e=>e instanceof g?e.toJSON():e;function C(e,t){t=t||{};const n={};function r(d,f,c){return a.isPlainObject(d)&&a.isPlainObject(f)?a.merge.call({caseless:c},d,f):a.isPlainObject(f)?a.merge({},f):a.isArray(f)?f.slice():f}function s(d,f,c){if(a.isUndefined(f)){if(!a.isUndefined(d))return r(void 0,d,c)}else return r(d,f,c)}function o(d,f){if(!a.isUndefined(f))return r(void 0,f)}function i(d,f){if(a.isUndefined(f)){if(!a.isUndefined(d))return r(void 0,d)}else return r(void 0,f)}function u(d,f,c){if(c in t)return r(d,f);if(c in e)return r(void 0,d)}const l={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:u,headers:(d,f)=>s(ye(d),ye(f),!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(f){const c=l[f]||s,y=c(e[f],t[f],f);a.isUndefined(y)&&c!==u||(n[f]=y)}),n}const je="1.6.7",oe={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{oe[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const we={};oe.transitional=function(t,n,r){function s(o,i){return"[Axios v"+je+"] Transitional option '"+o+"'"+i+(r?". "+r:"")}return(o,i,u)=>{if(t===!1)throw new m(s(i," has been removed"+(n?" in "+n:"")),m.ERR_DEPRECATED);return n&&!we[i]&&(we[i]=!0,console.warn(s(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(o,i,u):!0}};function tn(e,t,n){if(typeof e!="object")throw new m("options must be an object",m.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let s=r.length;for(;s-- >0;){const o=r[s],i=t[o];if(i){const u=e[o],l=u===void 0||i(u,o,e);if(l!==!0)throw new m("option "+o+" must be "+l,m.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new m("Unknown option "+o,m.ERR_BAD_OPTION)}}var Y={assertOptions:tn,validators:oe};const x=Y.validators;class H{constructor(t){this.defaults=t,this.interceptors={request:new fe,response:new fe}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let s;Error.captureStackTrace?Error.captureStackTrace(s={}):s=new Error;const o=s.stack?s.stack.replace(/^.+\n/,""):"";r.stack?o&&!String(r.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+o):r.stack=o}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=C(this.defaults,n);const{transitional:r,paramsSerializer:s,headers:o}=n;r!==void 0&&Y.assertOptions(r,{silentJSONParsing:x.transitional(x.boolean),forcedJSONParsing:x.transitional(x.boolean),clarifyTimeoutError:x.transitional(x.boolean)},!1),s!=null&&(a.isFunction(s)?n.paramsSerializer={serialize:s}:Y.assertOptions(s,{encode:x.function,serialize:x.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=o&&a.merge(o.common,o[n.method]);o&&a.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),n.headers=g.concat(i,o);const u=[];let l=!0;this.interceptors.request.forEach(function(h){typeof h.runWhen=="function"&&h.runWhen(n)===!1||(l=l&&h.synchronous,u.unshift(h.fulfilled,h.rejected))});const d=[];this.interceptors.response.forEach(function(h){d.push(h.fulfilled,h.rejected)});let f,c=0,y;if(!l){const p=[me.bind(this),void 0];for(p.unshift.apply(p,u),p.push.apply(p,d),y=p.length,f=Promise.resolve(n);c<y;)f=f.then(p[c++],p[c++]);return f}y=u.length;let S=n;for(c=0;c<y;){const p=u[c++],h=u[c++];try{S=p(S)}catch(E){h.call(this,E);break}}try{f=me.call(this,S)}catch(p){return Promise.reject(p)}for(c=0,y=d.length;c<y;)f=f.then(d[c++],d[c++]);return f}getUri(t){t=C(this.defaults,t);const n=ke(t.baseURL,t.url);return _e(n,t.params,t.paramsSerializer)}}a.forEach(["delete","get","head","options"],function(t){H.prototype[t]=function(n,r){return this.request(C(r||{},{method:t,url:n,data:(r||{}).data}))}});a.forEach(["post","put","patch"],function(t){function n(r){return function(o,i,u){return this.request(C(u||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}H.prototype[t]=n(),H.prototype[t+"Form"]=n(!0)});var I=H;class ie{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(o){n=o});const r=this;this.promise.then(s=>{if(!r._listeners)return;let o=r._listeners.length;for(;o-- >0;)r._listeners[o](s);r._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(u=>{r.subscribe(u),o=u}).then(s);return i.cancel=function(){r.unsubscribe(o)},i},t(function(o,i,u){r.reason||(r.reason=new k(o,i,u),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new ie(function(s){t=s}),cancel:t}}}var nn=ie;function rn(e){return function(n){return e.apply(null,n)}}function sn(e){return a.isObject(e)&&e.isAxiosError===!0}const ee={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ee).forEach(([e,t])=>{ee[t]=e});var on=ee;function Ie(e){const t=new I(e),n=Ee(I.prototype.request,t);return a.extend(n,I.prototype,t,{allOwnKeys:!0}),a.extend(n,t,null,{allOwnKeys:!0}),n.create=function(s){return Ie(C(e,s))},n}const w=Ie(se);w.Axios=I;w.CanceledError=k;w.CancelToken=nn;w.isCancel=Le;w.VERSION=je;w.toFormData=$;w.AxiosError=m;w.Cancel=w.CanceledError;w.all=function(t){return Promise.all(t)};w.spread=rn;w.isAxiosError=sn;w.mergeConfig=C;w.AxiosHeaders=g;w.formToJSON=e=>Ue(a.isHTMLForm(e)?new FormData(e):e);w.getAdapter=Be.getAdapter;w.HttpStatusCode=on;w.default=w;var an=w;function cn(){let e;async function t(){await r()&&an.get(`https://api.github.com/repos/${P.author}/${P.name}/releases`).then(l=>{const d=l.data;d&&d.length&&n(d[0].tag_name,P.version)&&(u(d[0].tag_name),i(d[0].tag_name))}).catch(l=>console.debug("Could not check for updates! Response: ",l)),o()}function n(l,d){const f=l.replace("v","").split("."),c=d.replace("v","").split(".");if(f.length!==c.length)return!1;for(let y=0;y<3;y++)if(Number(f[y])>Number(c[y]))return!0;return!1}async function r(){const l=await s(),d=new Date(Date.now()).getTime()-l.getTime();return Math.ceil(d/(1e3*60*60*24))>=7}async function s(){return(await J.settings.toArray())[0].lastUpdateCheck}async function o(){const l=await J.settings.toArray();l[0].lastUpdateCheck=new Date(Date.now()),await J.settings.put(l[0])}async function i(l){(await D.checkPermissions()).display!=="granted"&&D.requestPermissions(),await D.schedule({notifications:[{title:`New version of ${P.productName} available`,body:`Tap to download version ${l}`,id:1,schedule:{at:new Date(Date.now()+100)},actionTypeId:"NEW_VERSION"}]})}function u(l){e=D.addListener("localNotificationActionPerformed",d=>{d.actionId==="DOWNLOAD_NEW_VERSION"&&qe(`https://github.com/${P.author}/${P.name}/releases/download/${l}/${P.name}-${l}.apk`)})}return Me(()=>{D.registerActionTypes({types:[{id:"NEW_VERSION",actions:[{id:"DOWNLOAD_NEW_VERSION",title:"Download",foreground:!0}]}]})}),ve(()=>{e==null||e.remove()}),t}const un=cn();un();
