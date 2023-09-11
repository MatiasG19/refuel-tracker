import{h as Xe,e as wt,i as Wt,o as Ut,a as Vt,r as Q,c as q,w as ce,F as xt,g as Ye,b as jt,d as Gt,T as $t,f as Ht}from"./index.dc551ac6.js";/*!
  * shared v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const ie=typeof window!="undefined",Bt=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol",j=e=>Bt?Symbol(e):e,Kt=(e,t,n)=>Xt({l:e,k:t,s:n}),Xt=e=>JSON.stringify(e).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029").replace(/\u0027/g,"\\u0027"),S=e=>typeof e=="number"&&isFinite(e),Yt=e=>Ne(e)==="[object Date]",ae=e=>Ne(e)==="[object RegExp]",re=e=>I(e)&&Object.keys(e).length===0;function zt(e,t){typeof console!="undefined"&&(console.warn("[intlify] "+e),t&&console.warn(t.stack))}const w=Object.assign;function Fe(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}const Jt=Object.prototype.hasOwnProperty;function be(e,t){return Jt.call(e,t)}const A=Array.isArray,k=e=>typeof e=="function",_=e=>typeof e=="string",C=e=>typeof e=="boolean",h=e=>e!==null&&typeof e=="object",ze=Object.prototype.toString,Ne=e=>ze.call(e),I=e=>Ne(e)==="[object Object]",Qt=e=>e==null?"":A(e)||I(e)&&e.toString===ze?JSON.stringify(e,null,2):String(e);/*!
  * message-compiler v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const Je={EXPECTED_TOKEN:1,INVALID_TOKEN_IN_PLACEHOLDER:2,UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER:3,UNKNOWN_ESCAPE_SEQUENCE:4,INVALID_UNICODE_ESCAPE_SEQUENCE:5,UNBALANCED_CLOSING_BRACE:6,UNTERMINATED_CLOSING_BRACE:7,EMPTY_PLACEHOLDER:8,NOT_ALLOW_NEST_PLACEHOLDER:9,INVALID_LINKED_FORMAT:10,MUST_HAVE_MESSAGES_IN_PLURAL:11,UNEXPECTED_EMPTY_LINKED_MODIFIER:12,UNEXPECTED_EMPTY_LINKED_KEY:13,UNEXPECTED_LEXICAL_ANALYSIS:14,__EXTEND_POINT__:15};function Qe(e,t,n={}){const{domain:a,messages:r,args:s}=n,l=e,i=new SyntaxError(String(l));return i.code=e,t&&(i.location=t),i.domain=a,i}/*!
  * devtools-if v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const qt={I18nInit:"i18n:init",FunctionTranslate:"function:translate"};/*!
  * core-base v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const G=[];G[0]={w:[0],i:[3,0],["["]:[4],o:[7]};G[1]={w:[1],["."]:[2],["["]:[4],o:[7]};G[2]={w:[2],i:[3,0],[0]:[3,0]};G[3]={i:[3,0],[0]:[3,0],w:[1,1],["."]:[2,1],["["]:[4,1],o:[7,1]};G[4]={["'"]:[5,0],['"']:[6,0],["["]:[4,2],["]"]:[1,3],o:8,l:[4,0]};G[5]={["'"]:[4,0],o:8,l:[5,0]};G[6]={['"']:[4,0],o:8,l:[6,0]};const Zt=/^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;function en(e){return Zt.test(e)}function tn(e){const t=e.charCodeAt(0),n=e.charCodeAt(e.length-1);return t===n&&(t===34||t===39)?e.slice(1,-1):e}function nn(e){if(e==null)return"o";switch(e.charCodeAt(0)){case 91:case 93:case 46:case 34:case 39:return e;case 95:case 36:case 45:return"i";case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"w"}return"i"}function an(e){const t=e.trim();return e.charAt(0)==="0"&&isNaN(parseInt(e))?!1:en(t)?tn(t):"*"+t}function rn(e){const t=[];let n=-1,a=0,r=0,s,l,i,c,m,d,E;const g=[];g[0]=()=>{l===void 0?l=i:l+=i},g[1]=()=>{l!==void 0&&(t.push(l),l=void 0)},g[2]=()=>{g[0](),r++},g[3]=()=>{if(r>0)r--,a=4,g[0]();else{if(r=0,l===void 0||(l=an(l),l===!1))return!1;g[1]()}};function b(){const T=e[n+1];if(a===5&&T==="'"||a===6&&T==='"')return n++,i="\\"+T,g[0](),!0}for(;a!==null;)if(n++,s=e[n],!(s==="\\"&&b())){if(c=nn(s),E=G[a],m=E[c]||E.l||8,m===8||(a=m[0],m[1]!==void 0&&(d=g[m[1]],d&&(i=s,d()===!1))))return;if(a===7)return t}}const Ce=new Map;function ln(e,t){return h(e)?e[t]:null}function sn(e,t){if(!h(e))return null;let n=Ce.get(t);if(n||(n=rn(t),n&&Ce.set(t,n)),!n)return null;const a=n.length;let r=e,s=0;for(;s<a;){const l=r[n[s]];if(l===void 0)return null;r=l,s++}return r}const on=e=>e,cn=e=>"",un="text",mn=e=>e.length===0?"":e.join(""),fn=Qt;function Ae(e,t){return e=Math.abs(e),t===2?e?e>1?1:0:1:e?Math.min(e,2):0}function _n(e){const t=S(e.pluralIndex)?e.pluralIndex:-1;return e.named&&(S(e.named.count)||S(e.named.n))?S(e.named.count)?e.named.count:S(e.named.n)?e.named.n:t:t}function gn(e,t){t.count||(t.count=e),t.n||(t.n=e)}function dn(e={}){const t=e.locale,n=_n(e),a=h(e.pluralRules)&&_(t)&&k(e.pluralRules[t])?e.pluralRules[t]:Ae,r=h(e.pluralRules)&&_(t)&&k(e.pluralRules[t])?Ae:void 0,s=N=>N[a(n,N.length,r)],l=e.list||[],i=N=>l[N],c=e.named||{};S(e.pluralIndex)&&gn(n,c);const m=N=>c[N];function d(N){const O=k(e.messages)?e.messages(N):h(e.messages)?e.messages[N]:!1;return O||(e.parent?e.parent.message(N):cn)}const E=N=>e.modifiers?e.modifiers[N]:on,g=I(e.processor)&&k(e.processor.normalize)?e.processor.normalize:mn,b=I(e.processor)&&k(e.processor.interpolate)?e.processor.interpolate:fn,T=I(e.processor)&&_(e.processor.type)?e.processor.type:un,y={list:i,named:m,plural:s,linked:(N,...O)=>{const[R,L]=O;let f="text",F="";O.length===1?h(R)?(F=R.modifier||F,f=R.type||f):_(R)&&(F=R||F):O.length===2&&(_(R)&&(F=R||F),_(L)&&(f=L||f));let M=d(N)(y);return f==="vnode"&&A(M)&&F&&(M=M[0]),F?E(F)(M,f):M},message:d,type:T,interpolate:b,normalize:g};return y}let En=null;qt.FunctionTranslate;function bn(e){return t=>En}const Nn={NOT_FOUND_KEY:1,FALLBACK_TO_TRANSLATE:2,CANNOT_FORMAT_NUMBER:3,FALLBACK_TO_NUMBER_FORMAT:4,CANNOT_FORMAT_DATE:5,FALLBACK_TO_DATE_FORMAT:6,__EXTEND_POINT__:7};function Tn(e,t,n){return[...new Set([n,...A(t)?t:h(t)?Object.keys(t):_(t)?[t]:[n]])]}function qe(e,t,n){const a=_(n)?n:Te,r=e;r.__localeChainCache||(r.__localeChainCache=new Map);let s=r.__localeChainCache.get(a);if(!s){s=[];let l=[n];for(;A(l);)l=Re(s,l,t);const i=A(t)||!I(t)?t:t.default?t.default:null;l=_(i)?[i]:i,A(l)&&Re(s,l,!1),r.__localeChainCache.set(a,s)}return s}function Re(e,t,n){let a=!0;for(let r=0;r<t.length&&C(a);r++){const s=t[r];_(s)&&(a=In(e,t[r],n))}return a}function In(e,t,n){let a;const r=t.split("-");do{const s=r.join("-");a=Ln(e,s,n),r.splice(-1,1)}while(r.length&&a===!0);return a}function Ln(e,t,n){let a=!1;if(!e.includes(t)&&(a=!0,t)){a=t[t.length-1]!=="!";const r=t.replace(/!/g,"");e.push(r),(A(n)||I(n))&&n[r]&&(a=n[r])}return a}const pn="9.2.2",le=-1,Te="en-US",De="",Se=e=>`${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;function On(){return{upper:(e,t)=>t==="text"&&_(e)?e.toUpperCase():t==="vnode"&&h(e)&&"__v_isVNode"in e?e.children.toUpperCase():e,lower:(e,t)=>t==="text"&&_(e)?e.toLowerCase():t==="vnode"&&h(e)&&"__v_isVNode"in e?e.children.toLowerCase():e,capitalize:(e,t)=>t==="text"&&_(e)?Se(e):t==="vnode"&&h(e)&&"__v_isVNode"in e?Se(e.children):e}}let hn,Ze;function yn(e){Ze=e}let et;function Fn(e){et=e}let ke=0;function Cn(e={}){const t=_(e.version)?e.version:pn,n=_(e.locale)?e.locale:Te,a=A(e.fallbackLocale)||I(e.fallbackLocale)||_(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:n,r=I(e.messages)?e.messages:{[n]:{}},s=I(e.datetimeFormats)?e.datetimeFormats:{[n]:{}},l=I(e.numberFormats)?e.numberFormats:{[n]:{}},i=w({},e.modifiers||{},On()),c=e.pluralRules||{},m=k(e.missing)?e.missing:null,d=C(e.missingWarn)||ae(e.missingWarn)?e.missingWarn:!0,E=C(e.fallbackWarn)||ae(e.fallbackWarn)?e.fallbackWarn:!0,g=!!e.fallbackFormat,b=!!e.unresolving,T=k(e.postTranslation)?e.postTranslation:null,p=I(e.processor)?e.processor:null,y=C(e.warnHtmlMessage)?e.warnHtmlMessage:!0,N=!!e.escapeParameter,O=k(e.messageCompiler)?e.messageCompiler:hn,R=k(e.messageResolver)?e.messageResolver:Ze||ln,L=k(e.localeFallbacker)?e.localeFallbacker:et||Tn,f=h(e.fallbackContext)?e.fallbackContext:void 0,F=k(e.onWarn)?e.onWarn:zt,M=e,X=h(M.__datetimeFormatters)?M.__datetimeFormatters:new Map,Y=h(M.__numberFormatters)?M.__numberFormatters:new Map,z=h(M.__meta)?M.__meta:{};ke++;const V={version:t,cid:ke,locale:n,fallbackLocale:a,messages:r,modifiers:i,pluralRules:c,missing:m,missingWarn:d,fallbackWarn:E,fallbackFormat:g,unresolving:b,postTranslation:T,processor:p,warnHtmlMessage:y,escapeParameter:N,messageCompiler:O,messageResolver:R,localeFallbacker:L,fallbackContext:f,onWarn:F,__meta:z};return V.datetimeFormats=s,V.numberFormats=l,V.__datetimeFormatters=X,V.__numberFormatters=Y,V}function Ie(e,t,n,a,r){const{missing:s,onWarn:l}=e;if(s!==null){const i=s(e,n,t,r);return _(i)?i:t}else return t}function Z(e,t,n){const a=e;a.__localeChainCache=new Map,e.localeFallbacker(e,n,t)}let tt=Je.__EXTEND_POINT__;const oe=()=>++tt,B={INVALID_ARGUMENT:tt,INVALID_DATE_ARGUMENT:oe(),INVALID_ISO_DATE_ARGUMENT:oe(),__EXTEND_POINT__:oe()};function K(e){return Qe(e,null,void 0)}const Me=()=>"",$=e=>k(e);function ve(e,...t){const{fallbackFormat:n,postTranslation:a,unresolving:r,messageCompiler:s,fallbackLocale:l,messages:i}=e,[c,m]=ue(...t),d=C(m.missingWarn)?m.missingWarn:e.missingWarn,E=C(m.fallbackWarn)?m.fallbackWarn:e.fallbackWarn,g=C(m.escapeParameter)?m.escapeParameter:e.escapeParameter,b=!!m.resolvedMessage,T=_(m.default)||C(m.default)?C(m.default)?s?c:()=>c:m.default:n?s?c:()=>c:"",p=n||T!=="",y=_(m.locale)?m.locale:e.locale;g&&An(m);let[N,O,R]=b?[c,y,i[y]||{}]:nt(e,c,y,l,E,d),L=N,f=c;if(!b&&!(_(L)||$(L))&&p&&(L=T,f=L),!b&&(!(_(L)||$(L))||!_(O)))return r?le:c;let F=!1;const M=()=>{F=!0},X=$(L)?L:at(e,c,O,L,f,M);if(F)return L;const Y=Sn(e,O,R,m),z=dn(Y),V=Rn(e,X,z);return a?a(V,c):V}function An(e){A(e.list)?e.list=e.list.map(t=>_(t)?Fe(t):t):h(e.named)&&Object.keys(e.named).forEach(t=>{_(e.named[t])&&(e.named[t]=Fe(e.named[t]))})}function nt(e,t,n,a,r,s){const{messages:l,onWarn:i,messageResolver:c,localeFallbacker:m}=e,d=m(e,a,n);let E={},g,b=null;const T="translate";for(let p=0;p<d.length&&(g=d[p],E=l[g]||{},(b=c(E,t))===null&&(b=E[t]),!(_(b)||k(b)));p++){const y=Ie(e,t,g,s,T);y!==t&&(b=y)}return[b,g,E]}function at(e,t,n,a,r,s){const{messageCompiler:l,warnHtmlMessage:i}=e;if($(a)){const m=a;return m.locale=m.locale||n,m.key=m.key||t,m}if(l==null){const m=()=>a;return m.locale=n,m.key=t,m}const c=l(a,Dn(e,n,r,a,i,s));return c.locale=n,c.key=t,c.source=a,c}function Rn(e,t,n){return t(n)}function ue(...e){const[t,n,a]=e,r={};if(!_(t)&&!S(t)&&!$(t))throw K(B.INVALID_ARGUMENT);const s=S(t)?String(t):($(t),t);return S(n)?r.plural=n:_(n)?r.default=n:I(n)&&!re(n)?r.named=n:A(n)&&(r.list=n),S(a)?r.plural=a:_(a)?r.default=a:I(a)&&w(r,a),[s,r]}function Dn(e,t,n,a,r,s){return{warnHtmlMessage:r,onError:l=>{throw s&&s(l),l},onCacheKey:l=>Kt(t,n,l)}}function Sn(e,t,n,a){const{modifiers:r,pluralRules:s,messageResolver:l,fallbackLocale:i,fallbackWarn:c,missingWarn:m,fallbackContext:d}=e,g={locale:t,modifiers:r,pluralRules:s,messages:b=>{let T=l(n,b);if(T==null&&d){const[,,p]=nt(d,b,t,i,c,m);T=l(p,b)}if(_(T)){let p=!1;const N=at(e,b,t,T,b,()=>{p=!0});return p?Me:N}else return $(T)?T:Me}};return e.processor&&(g.processor=e.processor),a.list&&(g.list=a.list),a.named&&(g.named=a.named),S(a.plural)&&(g.pluralIndex=a.plural),g}function Pe(e,...t){const{datetimeFormats:n,unresolving:a,fallbackLocale:r,onWarn:s,localeFallbacker:l}=e,{__datetimeFormatters:i}=e,[c,m,d,E]=me(...t),g=C(d.missingWarn)?d.missingWarn:e.missingWarn;C(d.fallbackWarn)?d.fallbackWarn:e.fallbackWarn;const b=!!d.part,T=_(d.locale)?d.locale:e.locale,p=l(e,r,T);if(!_(c)||c==="")return new Intl.DateTimeFormat(T,E).format(m);let y={},N,O=null;const R="datetime format";for(let F=0;F<p.length&&(N=p[F],y=n[N]||{},O=y[c],!I(O));F++)Ie(e,c,N,g,R);if(!I(O)||!_(N))return a?le:c;let L=`${N}__${c}`;re(E)||(L=`${L}__${JSON.stringify(E)}`);let f=i.get(L);return f||(f=new Intl.DateTimeFormat(N,w({},O,E)),i.set(L,f)),b?f.formatToParts(m):f.format(m)}const rt=["localeMatcher","weekday","era","year","month","day","hour","minute","second","timeZoneName","formatMatcher","hour12","timeZone","dateStyle","timeStyle","calendar","dayPeriod","numberingSystem","hourCycle","fractionalSecondDigits"];function me(...e){const[t,n,a,r]=e,s={};let l={},i;if(_(t)){const c=t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);if(!c)throw K(B.INVALID_ISO_DATE_ARGUMENT);const m=c[3]?c[3].trim().startsWith("T")?`${c[1].trim()}${c[3].trim()}`:`${c[1].trim()}T${c[3].trim()}`:c[1].trim();i=new Date(m);try{i.toISOString()}catch{throw K(B.INVALID_ISO_DATE_ARGUMENT)}}else if(Yt(t)){if(isNaN(t.getTime()))throw K(B.INVALID_DATE_ARGUMENT);i=t}else if(S(t))i=t;else throw K(B.INVALID_ARGUMENT);return _(n)?s.key=n:I(n)&&Object.keys(n).forEach(c=>{rt.includes(c)?l[c]=n[c]:s[c]=n[c]}),_(a)?s.locale=a:I(a)&&(l=a),I(r)&&(l=r),[s.key||"",i,s,l]}function we(e,t,n){const a=e;for(const r in n){const s=`${t}__${r}`;!a.__datetimeFormatters.has(s)||a.__datetimeFormatters.delete(s)}}function We(e,...t){const{numberFormats:n,unresolving:a,fallbackLocale:r,onWarn:s,localeFallbacker:l}=e,{__numberFormatters:i}=e,[c,m,d,E]=fe(...t),g=C(d.missingWarn)?d.missingWarn:e.missingWarn;C(d.fallbackWarn)?d.fallbackWarn:e.fallbackWarn;const b=!!d.part,T=_(d.locale)?d.locale:e.locale,p=l(e,r,T);if(!_(c)||c==="")return new Intl.NumberFormat(T,E).format(m);let y={},N,O=null;const R="number format";for(let F=0;F<p.length&&(N=p[F],y=n[N]||{},O=y[c],!I(O));F++)Ie(e,c,N,g,R);if(!I(O)||!_(N))return a?le:c;let L=`${N}__${c}`;re(E)||(L=`${L}__${JSON.stringify(E)}`);let f=i.get(L);return f||(f=new Intl.NumberFormat(N,w({},O,E)),i.set(L,f)),b?f.formatToParts(m):f.format(m)}const lt=["localeMatcher","style","currency","currencyDisplay","currencySign","useGrouping","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","compactDisplay","notation","signDisplay","unit","unitDisplay","roundingMode","roundingPriority","roundingIncrement","trailingZeroDisplay"];function fe(...e){const[t,n,a,r]=e,s={};let l={};if(!S(t))throw K(B.INVALID_ARGUMENT);const i=t;return _(n)?s.key=n:I(n)&&Object.keys(n).forEach(c=>{lt.includes(c)?l[c]=n[c]:s[c]=n[c]}),_(a)?s.locale=a:I(a)&&(l=a),I(r)&&(l=r),[s.key||"",i,s,l]}function Ue(e,t,n){const a=e;for(const r in n){const s=`${t}__${r}`;!a.__numberFormatters.has(s)||a.__numberFormatters.delete(s)}}/*!
  * vue-i18n v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */const kn="9.2.2";Nn.__EXTEND_POINT__;let st=Je.__EXTEND_POINT__;const P=()=>++st,W={UNEXPECTED_RETURN_TYPE:st,INVALID_ARGUMENT:P(),MUST_BE_CALL_SETUP_TOP:P(),NOT_INSLALLED:P(),NOT_AVAILABLE_IN_LEGACY_MODE:P(),REQUIRED_VALUE:P(),INVALID_VALUE:P(),CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN:P(),NOT_INSLALLED_WITH_PROVIDE:P(),UNEXPECTED_ERROR:P(),NOT_COMPATIBLE_LEGACY_VUE_I18N:P(),BRIDGE_SUPPORT_VUE_2_ONLY:P(),MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION:P(),NOT_AVAILABLE_COMPOSITION_IN_LEGACY:P(),__EXTEND_POINT__:P()};function U(e,...t){return Qe(e,null,void 0)}const _e=j("__transrateVNode"),ge=j("__datetimeParts"),de=j("__numberParts"),Mn=j("__setPluralRules");j("__intlifyMeta");const vn=j("__injectWithOption");function Ee(e){if(!h(e))return e;for(const t in e)if(!!be(e,t))if(!t.includes("."))h(e[t])&&Ee(e[t]);else{const n=t.split("."),a=n.length-1;let r=e;for(let s=0;s<a;s++)n[s]in r||(r[n[s]]={}),r=r[n[s]];r[n[a]]=e[t],delete e[t],h(r[n[a]])&&Ee(r[n[a]])}return e}function ot(e,t){const{messages:n,__i18n:a,messageResolver:r,flatJson:s}=t,l=I(n)?n:A(a)?{}:{[e]:{}};if(A(a)&&a.forEach(i=>{if("locale"in i&&"resource"in i){const{locale:c,resource:m}=i;c?(l[c]=l[c]||{},ee(m,l[c])):ee(m,l)}else _(i)&&ee(JSON.parse(i),l)}),r==null&&s)for(const i in l)be(l,i)&&Ee(l[i]);return l}const ne=e=>!h(e)||A(e);function ee(e,t){if(ne(e)||ne(t))throw U(W.INVALID_VALUE);for(const n in e)be(e,n)&&(ne(e[n])||ne(t[n])?t[n]=e[n]:ee(e[n],t[n]))}function Pn(e){return e.type}function wn(e,t,n){let a=h(t.messages)?t.messages:{};"__i18nGlobal"in n&&(a=ot(e.locale.value,{messages:a,__i18n:n.__i18nGlobal}));const r=Object.keys(a);r.length&&r.forEach(s=>{e.mergeLocaleMessage(s,a[s])});{if(h(t.datetimeFormats)){const s=Object.keys(t.datetimeFormats);s.length&&s.forEach(l=>{e.mergeDateTimeFormat(l,t.datetimeFormats[l])})}if(h(t.numberFormats)){const s=Object.keys(t.numberFormats);s.length&&s.forEach(l=>{e.mergeNumberFormat(l,t.numberFormats[l])})}}}function Ve(e){return Gt($t,null,e,0)}let xe=0;function je(e){return(t,n,a,r)=>e(n,a,Ye()||void 0,r)}function ct(e={},t){const{__root:n}=e,a=n===void 0;let r=C(e.inheritLocale)?e.inheritLocale:!0;const s=Q(n&&r?n.locale.value:_(e.locale)?e.locale:Te),l=Q(n&&r?n.fallbackLocale.value:_(e.fallbackLocale)||A(e.fallbackLocale)||I(e.fallbackLocale)||e.fallbackLocale===!1?e.fallbackLocale:s.value),i=Q(ot(s.value,e)),c=Q(I(e.datetimeFormats)?e.datetimeFormats:{[s.value]:{}}),m=Q(I(e.numberFormats)?e.numberFormats:{[s.value]:{}});let d=n?n.missingWarn:C(e.missingWarn)||ae(e.missingWarn)?e.missingWarn:!0,E=n?n.fallbackWarn:C(e.fallbackWarn)||ae(e.fallbackWarn)?e.fallbackWarn:!0,g=n?n.fallbackRoot:C(e.fallbackRoot)?e.fallbackRoot:!0,b=!!e.fallbackFormat,T=k(e.missing)?e.missing:null,p=k(e.missing)?je(e.missing):null,y=k(e.postTranslation)?e.postTranslation:null,N=n?n.warnHtmlMessage:C(e.warnHtmlMessage)?e.warnHtmlMessage:!0,O=!!e.escapeParameter;const R=n?n.modifiers:I(e.modifiers)?e.modifiers:{};let L=e.pluralRules||n&&n.pluralRules,f;f=(()=>{const o={version:kn,locale:s.value,fallbackLocale:l.value,messages:i.value,modifiers:R,pluralRules:L,missing:p===null?void 0:p,missingWarn:d,fallbackWarn:E,fallbackFormat:b,unresolving:!0,postTranslation:y===null?void 0:y,warnHtmlMessage:N,escapeParameter:O,messageResolver:e.messageResolver,__meta:{framework:"vue"}};return o.datetimeFormats=c.value,o.numberFormats=m.value,o.__datetimeFormatters=I(f)?f.__datetimeFormatters:void 0,o.__numberFormatters=I(f)?f.__numberFormatters:void 0,Cn(o)})(),Z(f,s.value,l.value);function M(){return[s.value,l.value,i.value,c.value,m.value]}const X=q({get:()=>s.value,set:o=>{s.value=o,f.locale=s.value}}),Y=q({get:()=>l.value,set:o=>{l.value=o,f.fallbackLocale=l.value,Z(f,s.value,o)}}),z=q(()=>i.value),V=q(()=>c.value),Oe=q(()=>m.value);function mt(){return k(y)?y:null}function ft(o){y=o,f.postTranslation=o}function _t(){return T}function gt(o){o!==null&&(p=je(o)),T=o,f.missing=p}const H=(o,u,x,v,se,te)=>{M();let J;if(J=o(f),S(J)&&J===le){const[Pt,aa]=u();return n&&g?v(n):se(Pt)}else{if(te(J))return J;throw U(W.UNEXPECTED_RETURN_TYPE)}};function he(...o){return H(u=>Reflect.apply(ve,null,[u,...o]),()=>ue(...o),"translate",u=>Reflect.apply(u.t,u,[...o]),u=>u,u=>_(u))}function dt(...o){const[u,x,v]=o;if(v&&!h(v))throw U(W.INVALID_ARGUMENT);return he(u,x,w({resolvedMessage:!0},v||{}))}function Et(...o){return H(u=>Reflect.apply(Pe,null,[u,...o]),()=>me(...o),"datetime format",u=>Reflect.apply(u.d,u,[...o]),()=>De,u=>_(u))}function bt(...o){return H(u=>Reflect.apply(We,null,[u,...o]),()=>fe(...o),"number format",u=>Reflect.apply(u.n,u,[...o]),()=>De,u=>_(u))}function Nt(o){return o.map(u=>_(u)||S(u)||C(u)?Ve(String(u)):u)}const Tt={normalize:Nt,interpolate:o=>o,type:"vnode"};function It(...o){return H(u=>{let x;const v=u;try{v.processor=Tt,x=Reflect.apply(ve,null,[v,...o])}finally{v.processor=null}return x},()=>ue(...o),"translate",u=>u[_e](...o),u=>[Ve(u)],u=>A(u))}function Lt(...o){return H(u=>Reflect.apply(We,null,[u,...o]),()=>fe(...o),"number format",u=>u[de](...o),()=>[],u=>_(u)||A(u))}function pt(...o){return H(u=>Reflect.apply(Pe,null,[u,...o]),()=>me(...o),"datetime format",u=>u[ge](...o),()=>[],u=>_(u)||A(u))}function Ot(o){L=o,f.pluralRules=L}function ht(o,u){const x=_(u)?u:s.value,v=ye(x);return f.messageResolver(v,o)!==null}function yt(o){let u=null;const x=qe(f,l.value,s.value);for(let v=0;v<x.length;v++){const se=i.value[x[v]]||{},te=f.messageResolver(se,o);if(te!=null){u=te;break}}return u}function Ft(o){const u=yt(o);return u!=null?u:n?n.tm(o)||{}:{}}function ye(o){return i.value[o]||{}}function Ct(o,u){i.value[o]=u,f.messages=i.value}function At(o,u){i.value[o]=i.value[o]||{},ee(u,i.value[o]),f.messages=i.value}function Rt(o){return c.value[o]||{}}function Dt(o,u){c.value[o]=u,f.datetimeFormats=c.value,we(f,o,u)}function St(o,u){c.value[o]=w(c.value[o]||{},u),f.datetimeFormats=c.value,we(f,o,u)}function kt(o){return m.value[o]||{}}function Mt(o,u){m.value[o]=u,f.numberFormats=m.value,Ue(f,o,u)}function vt(o,u){m.value[o]=w(m.value[o]||{},u),f.numberFormats=m.value,Ue(f,o,u)}xe++,n&&ie&&(ce(n.locale,o=>{r&&(s.value=o,f.locale=o,Z(f,s.value,l.value))}),ce(n.fallbackLocale,o=>{r&&(l.value=o,f.fallbackLocale=o,Z(f,s.value,l.value))}));const D={id:xe,locale:X,fallbackLocale:Y,get inheritLocale(){return r},set inheritLocale(o){r=o,o&&n&&(s.value=n.locale.value,l.value=n.fallbackLocale.value,Z(f,s.value,l.value))},get availableLocales(){return Object.keys(i.value).sort()},messages:z,get modifiers(){return R},get pluralRules(){return L||{}},get isGlobal(){return a},get missingWarn(){return d},set missingWarn(o){d=o,f.missingWarn=d},get fallbackWarn(){return E},set fallbackWarn(o){E=o,f.fallbackWarn=E},get fallbackRoot(){return g},set fallbackRoot(o){g=o},get fallbackFormat(){return b},set fallbackFormat(o){b=o,f.fallbackFormat=b},get warnHtmlMessage(){return N},set warnHtmlMessage(o){N=o,f.warnHtmlMessage=o},get escapeParameter(){return O},set escapeParameter(o){O=o,f.escapeParameter=o},t:he,getLocaleMessage:ye,setLocaleMessage:Ct,mergeLocaleMessage:At,getPostTranslationHandler:mt,setPostTranslationHandler:ft,getMissingHandler:_t,setMissingHandler:gt,[Mn]:Ot};return D.datetimeFormats=V,D.numberFormats=Oe,D.rt=dt,D.te=ht,D.tm=Ft,D.d=Et,D.n=bt,D.getDateTimeFormat=Rt,D.setDateTimeFormat=Dt,D.mergeDateTimeFormat=St,D.getNumberFormat=kt,D.setNumberFormat=Mt,D.mergeNumberFormat=vt,D[vn]=e.__injectWithOption,D[_e]=It,D[ge]=pt,D[de]=Lt,D}const Le={tag:{type:[String,Object]},locale:{type:String},scope:{type:String,validator:e=>e==="parent"||e==="global",default:"parent"},i18n:{type:Object}};function Wn({slots:e},t){return t.length===1&&t[0]==="default"?(e.default?e.default():[]).reduce((a,r)=>a=[...a,...A(r.children)?r.children:[r]],[]):t.reduce((n,a)=>{const r=e[a];return r&&(n[a]=r()),n},{})}function it(e){return xt}const Ge={name:"i18n-t",props:w({keypath:{type:String,required:!0},plural:{type:[Number,String],validator:e=>S(e)||!isNaN(e)}},Le),setup(e,t){const{slots:n,attrs:a}=t,r=e.i18n||pe({useScope:e.scope,__useComponent:!0});return()=>{const s=Object.keys(n).filter(E=>E!=="_"),l={};e.locale&&(l.locale=e.locale),e.plural!==void 0&&(l.plural=_(e.plural)?+e.plural:e.plural);const i=Wn(t,s),c=r[_e](e.keypath,i,l),m=w({},a),d=_(e.tag)||h(e.tag)?e.tag:it();return Xe(d,m,c)}}};function Un(e){return A(e)&&!_(e[0])}function ut(e,t,n,a){const{slots:r,attrs:s}=t;return()=>{const l={part:!0};let i={};e.locale&&(l.locale=e.locale),_(e.format)?l.key=e.format:h(e.format)&&(_(e.format.key)&&(l.key=e.format.key),i=Object.keys(e.format).reduce((g,b)=>n.includes(b)?w({},g,{[b]:e.format[b]}):g,{}));const c=a(e.value,l,i);let m=[l.key];A(c)?m=c.map((g,b)=>{const T=r[g.type],p=T?T({[g.type]:g.value,index:b,parts:c}):[g.value];return Un(p)&&(p[0].key=`${g.type}-${b}`),p}):_(c)&&(m=[c]);const d=w({},s),E=_(e.tag)||h(e.tag)?e.tag:it();return Xe(E,d,m)}}const $e={name:"i18n-n",props:w({value:{type:Number,required:!0},format:{type:[String,Object]}},Le),setup(e,t){const n=e.i18n||pe({useScope:"parent",__useComponent:!0});return ut(e,t,lt,(...a)=>n[de](...a))}},He={name:"i18n-d",props:w({value:{type:[Number,Date],required:!0},format:{type:[String,Object]}},Le),setup(e,t){const n=e.i18n||pe({useScope:"parent",__useComponent:!0});return ut(e,t,rt,(...a)=>n[ge](...a))}};function Vn(e,t){const n=e;if(e.mode==="composition")return n.__getInstance(t)||e.global;{const a=n.__getInstance(t);return a!=null?a.__composer:e.global.__composer}}function xn(e){const t=l=>{const{instance:i,modifiers:c,value:m}=l;if(!i||!i.$)throw U(W.UNEXPECTED_ERROR);const d=Vn(e,i.$),E=Be(m);return[Reflect.apply(d.t,d,[...Ke(E)]),d]};return{created:(l,i)=>{const[c,m]=t(i);ie&&e.global===m&&(l.__i18nWatcher=ce(m.locale,()=>{i.instance&&i.instance.$forceUpdate()})),l.__composer=m,l.textContent=c},unmounted:l=>{ie&&l.__i18nWatcher&&(l.__i18nWatcher(),l.__i18nWatcher=void 0,delete l.__i18nWatcher),l.__composer&&(l.__composer=void 0,delete l.__composer)},beforeUpdate:(l,{value:i})=>{if(l.__composer){const c=l.__composer,m=Be(i);l.textContent=Reflect.apply(c.t,c,[...Ke(m)])}},getSSRProps:l=>{const[i]=t(l);return{textContent:i}}}}function Be(e){if(_(e))return{path:e};if(I(e)){if(!("path"in e))throw U(W.REQUIRED_VALUE,"path");return e}else throw U(W.INVALID_VALUE)}function Ke(e){const{path:t,locale:n,args:a,choice:r,plural:s}=e,l={},i=a||{};return _(n)&&(l.locale=n),S(r)&&(l.plural=r),S(s)&&(l.plural=s),[t,i,l]}function jn(e,t,...n){const a=I(n[0])?n[0]:{},r=!!a.useI18nComponentName;(C(a.globalInstall)?a.globalInstall:!0)&&(e.component(r?"i18n":Ge.name,Ge),e.component($e.name,$e),e.component(He.name,He)),e.directive("t",xn(t))}const Gn=j("global-vue-i18n");function $n(e={},t){const n=C(e.globalInjection)?e.globalInjection:!0,a=!0,r=new Map,[s,l]=Hn(e),i=j("");function c(E){return r.get(E)||null}function m(E,g){r.set(E,g)}function d(E){r.delete(E)}{const E={get mode(){return"composition"},get allowComposition(){return a},async install(g,...b){g.__VUE_I18N_SYMBOL__=i,g.provide(g.__VUE_I18N_SYMBOL__,E),n&&qn(g,E.global),jn(g,E,...b);const T=g.unmount;g.unmount=()=>{E.dispose(),T()}},get global(){return l},dispose(){s.stop()},__instances:r,__getInstance:c,__setInstance:m,__deleteInstance:d};return E}}function pe(e={}){const t=Ye();if(t==null)throw U(W.MUST_BE_CALL_SETUP_TOP);if(!t.isCE&&t.appContext.app!=null&&!t.appContext.app.__VUE_I18N_SYMBOL__)throw U(W.NOT_INSLALLED);const n=Bn(t),a=Xn(n),r=Pn(t),s=Kn(e,r);if(s==="global")return wn(a,e,r),a;if(s==="parent"){let c=Yn(n,t,e.__useComponent);return c==null&&(c=a),c}const l=n;let i=l.__getInstance(t);if(i==null){const c=w({},e);"__i18n"in r&&(c.__i18n=r.__i18n),a&&(c.__root=a),i=ct(c),zn(l,t),l.__setInstance(t,i)}return i}function Hn(e,t,n){const a=wt();{const r=a.run(()=>ct(e));if(r==null)throw U(W.UNEXPECTED_ERROR);return[a,r]}}function Bn(e){{const t=Wt(e.isCE?Gn:e.appContext.app.__VUE_I18N_SYMBOL__);if(!t)throw U(e.isCE?W.NOT_INSLALLED_WITH_PROVIDE:W.UNEXPECTED_ERROR);return t}}function Kn(e,t){return re(e)?"__i18n"in t?"local":"global":e.useScope?e.useScope:"local"}function Xn(e){return e.mode==="composition"?e.global:e.global.__composer}function Yn(e,t,n=!1){let a=null;const r=t.root;let s=t.parent;for(;s!=null;){const l=e;if(e.mode==="composition"&&(a=l.__getInstance(s)),a!=null||r===s)break;s=s.parent}return a}function zn(e,t,n){Ut(()=>{},t),Vt(()=>{e.__deleteInstance(t)},t)}const Jn=["locale","fallbackLocale","availableLocales"],Qn=["t","rt","d","n","tm"];function qn(e,t){const n=Object.create(null);Jn.forEach(a=>{const r=Object.getOwnPropertyDescriptor(t,a);if(!r)throw U(W.UNEXPECTED_ERROR);const s=jt(r.value)?{get(){return r.value.value},set(l){r.value.value=l}}:{get(){return r.get&&r.get()}};Object.defineProperty(n,a,s)}),e.config.globalProperties.$i18n=n,Qn.forEach(a=>{const r=Object.getOwnPropertyDescriptor(t,a);if(!r||!r.value)throw U(W.UNEXPECTED_ERROR);Object.defineProperty(e.config.globalProperties,`$${a}`,r)})}yn(sn);Fn(qe);var Zn={periods:{week:"Week",threeMonths:"3 Months",sixMonths:"6 Months",year:"Year",max:"Max"},distanceUnits:{kilometersShort:"km",milesShort:"mi"},fuelUnits:{litre:"Litre",gallon:"Gallon",kWh:"kWh",wh:"Wh"},fuelConsumptionsUnits:{litresPer100km:"L/100km",mpgUs:"MPG US",mpgImperial:"MPG Imperial",kWhPer100km:"kWh/100km",whPer100km:"Wh/100km",whPerMile:" Wh/mile"}},ea={"en-US":Zn};const ta=$n({locale:"en-US",messages:ea});var la=Ht(({app:e})=>{e.use(ta)});export{la as default,ta as i18n};
