var o=Object.defineProperty;var a=(e,t,n)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var c=(e,t,n)=>(a(e,typeof t!="symbol"?t+"":t,n),n);const i=class{static register(t,n){i.fuelConsumptionFunctions.set(t,n)}static get(t){const n=i.fuelConsumptionFunctions.get(t);return n||null}};let r=i;c(r,"fuelConsumptionFunctions",new Map);function p(e,t=null){if(!e.refuels||e.refuels.length===0)return 0;let n=e.refuels.filter(u=>t?u.id===t:!0).map(u=>u.refueledAmount).reduce((u,f)=>u+f);n=n||0;let s=e.refuels.filter(u=>t?u.id===t:!0).map(u=>u.distanceDriven).reduce((u,f)=>u+f);s=s||0;const l=r.get(e.fuelUnitId.toString());return l?l(n,s):0}export{r as F,p as v};
