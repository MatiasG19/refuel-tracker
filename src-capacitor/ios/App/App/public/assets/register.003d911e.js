import{v as a,F as u}from"./fuelConsumption.d2d2c6e8.js";import{G as f,a as s}from"./GraphDataFactory.a6804de0.js";function g(t){return!t.refuels||t.refuels.length===0?0:t.refuels.map(e=>e.distanceDriven).reduce((e,r)=>e+r)}function p(t){return!t.refuels||t.refuels.length===0?0:t.refuels.map(e=>e.refueledAmount).reduce((e,r)=>e+r)}function d(t){if(!t.refuels||t.refuels.length===0)return 0;const e=t.refuels.map(n=>n.payedAmount).reduce((n,l)=>n+l),r=t.refuels.map(n=>n.refueledAmount).reduce((n,l)=>n+l);return e/r}function m(t){return!t.refuels||t.refuels.length===0?0:+t.refuels.map(e=>e.payedAmount).reduce((e,r)=>e+r).toString()}function h(t){return!t.refuels||t.refuels.length===0?0:t.refuels.length}class i extends f{constructor(e){super(),this.vehicle=e,this.title=this.setTitle(),this.value=this.calculateValue(this.vehicle),this.unit=this.getUnit(this.vehicle)}setTitle(){return""}calculateValue(e){return""}getUnit(e){return""}}class F extends i{constructor(e){super(e),this.vehicle=e}setTitle(){return"Fuel consumption"}calculateValue(e){return a(e).toFixedIfNotZero(2)}getUnit(e){var r,n;return(n=(r=e.fuelUnit)==null?void 0:r.fuelConsumptionUnit)!=null?n:""}}class U extends i{constructor(e){super(e),this.vehicle=e}setTitle(){return"Distance driven"}calculateValue(e){return g(e).toFixedIfNotZero(1)}getUnit(e){var r,n;return(n=(r=e.fuelUnit)==null?void 0:r.distanceUnit)!=null?n:""}}class x extends i{constructor(e){super(e),this.vehicle=e}setTitle(){return"Fuel burnt"}calculateValue(e){return p(e).toFixedIfNotZero(1)}getUnit(e){var r,n;return(n=(r=e.fuelUnit)==null?void 0:r.fuelUnit)!=null?n:""}}class D extends i{constructor(e){super(e),this.vehicle=e}setTitle(){return"Refuels made"}calculateValue(e){return h(e).toString()}getUnit(){return""}}class y extends i{constructor(e){super(e),this.vehicle=e}setTitle(){return"Fuel pricing"}calculateValue(e){return d(e).toFixedIfNotZero(2)}getUnit(e){var r;return`${e.currencyUnit}/${(r=e.fuelUnit)==null?void 0:r.fuelUnit}`}}class P extends i{constructor(e){super(e),this.vehicle=e}setTitle(){return"Money spent"}calculateValue(e){return m(e).toFixedIfNotZero(2)}getUnit(e){return e.currencyUnit}}function A(){s.register("1",F),s.register("2",U),s.register("3",P),s.register("4",y),s.register("5",x),s.register("6",D)}function T(t,e){return o(t,e)}function V(t,e){return c(t,e)}function G(t,e){return c(t,e)}function I(t,e){return o(t,e)}function M(t,e){return o(t,e)}function v(t,e){return t/e}function o(t,e){return t*100/e}function c(t,e){return e/t}function C(){u.register("1",T),u.register("2",V),u.register("3",G),u.register("4",I),u.register("5",M),u.register("6",v)}A();C();
