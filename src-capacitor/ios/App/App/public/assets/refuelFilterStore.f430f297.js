import{k as c,r as i}from"./index.af9e0f6e.js";import{d as t}from"./dexie.e9b82229.js";import{d as u}from"./date.a0df01d2.js";const d=c("refuelFilterStore",()=>{const o=i(""),a=i(!1),r=i(new Date),l=i(new Date);function s(){(async()=>{const e=await t.refuelFilters.toArray();e[0].name=o.value=u.formatDate(r.value,"YYYY/MM/DD")+" - "+u.formatDate(l.value,"YYYY/MM/DD"),e[0].active=a.value=!0,e[0].dateFrom=r.value,e[0].dateUntil=l.value,await t.refuelFilters.put(e[0])})()}function n(){(async()=>{const e=await t.refuelFilters.toArray();e[0].active=a.value=!1,await t.refuelFilters.put(e[0])})()}function f(){(async()=>{const e=await t.refuelFilters.toArray();o.value=e[0].name,a.value=e[0].active,r.value=e[0].dateFrom,l.value=e[0].dateUntil})()}return{filterName:o,filterActive:a,dateFrom:r,dateUntil:l,setFilter:s,removeFilter:n,readFilter:f}});export{d as u};