function o(){}Number.prototype.toFixedIfNotZero=function(r){const t=Number(this),n=Math.trunc(t);return(t-n)*10*r%2===0?n.toString():t.toFixed(r)};export{o as _};
