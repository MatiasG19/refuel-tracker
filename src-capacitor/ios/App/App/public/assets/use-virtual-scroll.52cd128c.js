import{q as ve,r as R,c as $,w as ae,z as me,aK as pe,aB as we,aJ as he,aI as ze,y as ge,h as A,g as ye}from"./index.af9e0f6e.js";let X=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const n=document.createElement("div");Object.assign(n.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(n),e.scrollLeft=-1e3,X=e.scrollLeft>=0,e.remove()}const M=1e3,Me=["start","center","end","start-force","center-force","end-force"],ne=Array.prototype.filter,be=window.getComputedStyle(document.body).overflowAnchor===void 0?ve:function(e,n){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const S=e.children||[];ne.call(S,g=>g.dataset&&g.dataset.qVsAnchor!==void 0).forEach(g=>{delete g.dataset.qVsAnchor});const u=S[n];u&&u.dataset&&(u.dataset.qVsAnchor="")}))};function H(e,n){return e+n}function Z(e,n,S,u,g,s,x,b){const h=e===window?document.scrollingElement||document.documentElement:e,y=g===!0?"offsetWidth":"offsetHeight",o={scrollStart:0,scrollViewSize:-x-b,scrollMaxSize:0,offsetStart:-x,offsetEnd:-b};if(g===!0?(e===window?(o.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,o.scrollViewSize+=document.documentElement.clientWidth):(o.scrollStart=h.scrollLeft,o.scrollViewSize+=h.clientWidth),o.scrollMaxSize=h.scrollWidth,s===!0&&(o.scrollStart=(X===!0?o.scrollMaxSize-o.scrollViewSize:0)-o.scrollStart)):(e===window?(o.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,o.scrollViewSize+=document.documentElement.clientHeight):(o.scrollStart=h.scrollTop,o.scrollViewSize+=h.clientHeight),o.scrollMaxSize=h.scrollHeight),S!==null)for(let v=S.previousElementSibling;v!==null;v=v.previousElementSibling)v.classList.contains("q-virtual-scroll--skip")===!1&&(o.offsetStart+=v[y]);if(u!==null)for(let v=u.nextElementSibling;v!==null;v=v.nextElementSibling)v.classList.contains("q-virtual-scroll--skip")===!1&&(o.offsetEnd+=v[y]);if(n!==e){const v=h.getBoundingClientRect(),p=n.getBoundingClientRect();g===!0?(o.offsetStart+=p.left-v.left,o.offsetEnd-=p.width):(o.offsetStart+=p.top-v.top,o.offsetEnd-=p.height),e!==window&&(o.offsetStart+=o.scrollStart),o.offsetEnd+=o.scrollMaxSize-o.offsetStart}return o}function ce(e,n,S,u){n==="end"&&(n=(e===window?document.body:e)[S===!0?"scrollWidth":"scrollHeight"]),e===window?S===!0?(u===!0&&(n=(X===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-n),window.scrollTo(n,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,n):S===!0?(u===!0&&(n=(X===!0?e.scrollWidth-e.offsetWidth:0)-n),e.scrollLeft=n):e.scrollTop=n}function W(e,n,S,u){if(S>=u)return 0;const g=n.length,s=Math.floor(S/M),x=Math.floor((u-1)/M)+1;let b=e.slice(s,x).reduce(H,0);return S%M!==0&&(b-=n.slice(s*M,S).reduce(H,0)),u%M!==0&&u!==g&&(b-=n.slice(u,x*M).reduce(H,0)),b}const Ee={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},xe={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...Ee};function Ve({virtualScrollLength:e,getVirtualScrollTarget:n,getVirtualScrollEl:S,virtualScrollItemSizeComputed:u}){const g=ye(),{props:s,emit:x,proxy:b}=g,{$q:h}=b;let y,o,v,p=[],f;const V=R(0),O=R(0),F=R({}),T=R(null),_=R(null),k=R(null),m=R({from:0,to:0}),D=$(()=>s.tableColspan!==void 0?s.tableColspan:100);u===void 0&&(u=$(()=>s.virtualScrollItemSize));const I=$(()=>u.value+";"+s.virtualScrollHorizontal),se=$(()=>I.value+";"+s.virtualScrollSliceRatioBefore+";"+s.virtualScrollSliceRatioAfter);ae(se,()=>{B()}),ae(I,Y);function Y(){K(o,!0)}function ee(l){K(l===void 0?o:l)}function C(l,t){const i=n();if(i==null||i.nodeType===8)return;const d=Z(i,S(),T.value,_.value,s.virtualScrollHorizontal,h.lang.rtl,s.virtualScrollStickySizeStart,s.virtualScrollStickySizeEnd);v!==d.scrollViewSize&&B(d.scrollViewSize),N(i,d,Math.min(e.value-1,Math.max(0,parseInt(l,10)||0)),0,Me.indexOf(t)!==-1?t:o!==-1&&l>o?"end":"start")}function ue(){const l=n();if(l==null||l.nodeType===8)return;const t=Z(l,S(),T.value,_.value,s.virtualScrollHorizontal,h.lang.rtl,s.virtualScrollStickySizeStart,s.virtualScrollStickySizeEnd),i=e.value-1,d=t.scrollMaxSize-t.offsetStart-t.offsetEnd-O.value;if(y===t.scrollStart)return;if(t.scrollMaxSize<=0){N(l,t,0,0);return}v!==t.scrollViewSize&&B(t.scrollViewSize),J(m.value.from);const w=Math.floor(t.scrollMaxSize-Math.max(t.scrollViewSize,t.offsetEnd)-Math.min(f[i],t.scrollViewSize/2));if(w>0&&Math.ceil(t.scrollStart)>=w){N(l,t,i,t.scrollMaxSize-t.offsetEnd-p.reduce(H,0));return}let c=0,a=t.scrollStart-t.offsetStart,z=a;if(a<=d&&a+t.scrollViewSize>=V.value)a-=V.value,c=m.value.from,z=a;else for(let r=0;a>=p[r]&&c<i;r++)a-=p[r],c+=M;for(;a>0&&c<i;)a-=f[c],a>-t.scrollViewSize?(c++,z=a):z=f[c]+a;N(l,t,c,z)}function N(l,t,i,d,w){const c=typeof w=="string"&&w.indexOf("-force")!==-1,a=c===!0?w.replace("-force",""):w,z=a!==void 0?a:"start";let r=Math.max(0,i-F.value[z]),E=r+F.value.total;E>e.value&&(E=e.value,r=Math.max(0,E-F.value.total)),y=t.scrollStart;const j=r!==m.value.from||E!==m.value.to;if(j===!1&&a===void 0){te(i);return}const{activeElement:ie}=document,q=k.value;j===!0&&q!==null&&q!==ie&&q.contains(ie)===!0&&(q.addEventListener("focusout",le),setTimeout(()=>{q!==null&&q.removeEventListener("focusout",le)})),be(q,i-r);const de=a!==void 0?f.slice(r,i).reduce(H,0):0;if(j===!0){const L=E>=m.value.from&&r<=m.value.to?m.value.to:E;m.value={from:r,to:L},V.value=W(p,f,0,r),O.value=W(p,f,E,e.value),requestAnimationFrame(()=>{m.value.to!==E&&y===t.scrollStart&&(m.value={from:m.value.from,to:E},O.value=W(p,f,E,e.value))})}requestAnimationFrame(()=>{if(y!==t.scrollStart)return;j===!0&&J(r);const L=f.slice(r,i).reduce(H,0),P=L+t.offsetStart+V.value,re=P+f[i];let G=P+d;if(a!==void 0){const Se=L-de,Q=t.scrollStart+Se;G=c!==!0&&Q<P&&re<Q+t.scrollViewSize?Q:a==="end"?re-t.scrollViewSize:P-(a==="start"?0:Math.round((t.scrollViewSize-f[i])/2))}y=G,ce(l,G,s.virtualScrollHorizontal,h.lang.rtl),te(i)})}function J(l){const t=k.value;if(t){const i=ne.call(t.children,r=>r.classList&&r.classList.contains("q-virtual-scroll--skip")===!1),d=i.length,w=s.virtualScrollHorizontal===!0?r=>r.getBoundingClientRect().width:r=>r.offsetHeight;let c=l,a,z;for(let r=0;r<d;){for(a=w(i[r]),r++;r<d&&i[r].classList.contains("q-virtual-scroll--with-prev")===!0;)a+=w(i[r]),r++;z=a-f[c],z!==0&&(f[c]+=z,p[Math.floor(c/M)]+=z),c++}}}function le(){k.value!==null&&k.value!==void 0&&k.value.focus()}function K(l,t){const i=1*u.value;(t===!0||Array.isArray(f)===!1)&&(f=[]);const d=f.length;f.length=e.value;for(let c=e.value-1;c>=d;c--)f[c]=i;const w=Math.floor((e.value-1)/M);p=[];for(let c=0;c<=w;c++){let a=0;const z=Math.min((c+1)*M,e.value);for(let r=c*M;r<z;r++)a+=f[r];p.push(a)}o=-1,y=void 0,V.value=W(p,f,0,m.value.from),O.value=W(p,f,m.value.to,e.value),l>=0?(J(m.value.from),me(()=>{C(l)})):U()}function B(l){if(l===void 0&&typeof window!="undefined"){const a=n();a!=null&&a.nodeType!==8&&(l=Z(a,S(),T.value,_.value,s.virtualScrollHorizontal,h.lang.rtl,s.virtualScrollStickySizeStart,s.virtualScrollStickySizeEnd).scrollViewSize)}v=l;const t=parseFloat(s.virtualScrollSliceRatioBefore)||0,i=parseFloat(s.virtualScrollSliceRatioAfter)||0,d=1+t+i,w=l===void 0||l<=0?1:Math.ceil(l/u.value),c=Math.max(1,w,Math.ceil((s.virtualScrollSliceSize>0?s.virtualScrollSliceSize:10)/d));F.value={total:Math.ceil(c*d),start:Math.ceil(c*t),center:Math.ceil(c*(.5+t)),end:Math.ceil(c*(1+t)),view:w}}function fe(l,t){const i=s.virtualScrollHorizontal===!0?"width":"height",d={["--q-virtual-scroll-item-"+i]:u.value+"px"};return[l==="tbody"?A(l,{class:"q-virtual-scroll__padding",key:"before",ref:T},[A("tr",[A("td",{style:{[i]:`${V.value}px`,...d},colspan:D.value})])]):A(l,{class:"q-virtual-scroll__padding",key:"before",ref:T,style:{[i]:`${V.value}px`,...d}}),A(l,{class:"q-virtual-scroll__content",key:"content",ref:k,tabindex:-1},t.flat()),l==="tbody"?A(l,{class:"q-virtual-scroll__padding",key:"after",ref:_},[A("tr",[A("td",{style:{[i]:`${O.value}px`,...d},colspan:D.value})])]):A(l,{class:"q-virtual-scroll__padding",key:"after",ref:_,style:{[i]:`${O.value}px`,...d}})]}function te(l){o!==l&&(s.onVirtualScroll!==void 0&&x("virtualScroll",{index:l,from:m.value.from,to:m.value.to-1,direction:l<o?"decrease":"increase",ref:b}),o=l)}B();const U=pe(ue,h.platform.is.ios===!0?120:35);we(()=>{B()});let oe=!1;return he(()=>{oe=!0}),ze(()=>{if(oe!==!0)return;const l=n();y!==void 0&&l!==void 0&&l!==null&&l.nodeType!==8?ce(l,y,s.virtualScrollHorizontal,h.lang.rtl):C(o)}),ge(()=>{U.cancel()}),Object.assign(b,{scrollTo:C,reset:Y,refresh:ee}),{virtualScrollSliceRange:m,virtualScrollSliceSizeComputed:F,setVirtualScrollSize:B,onVirtualScrollEvt:U,localResetVirtualScroll:K,padVirtualScroll:fe,scrollTo:C,reset:Y,refresh:ee}}export{Ve as a,xe as u};