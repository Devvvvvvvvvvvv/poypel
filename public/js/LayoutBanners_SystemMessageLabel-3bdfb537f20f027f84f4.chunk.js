(("undefined"!==typeof self?self:this).webpackJsonp=("undefined"!==typeof self?self:this).webpackJsonp||[]).push([[59],{"5X/J":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));const r="REMEDIATION_MESSAGE_BANNER"},Ha1O:function(e,t,n){"use strict";n.r(t);const r=function(){var e=[{defaultValue:null,kind:"LocalArgument",name:"skip"}],t={alias:null,args:null,kind:"ScalarField",name:"id",storageKey:null},n={alias:null,args:null,concreteType:"Alert",kind:"LinkedField",name:"alerts",plural:!0,selections:[t,{alias:null,args:null,kind:"ScalarField",name:"views",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"currencies",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"title",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"description",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"type",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"displayType",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"dismissable",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"priority",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"primaryCtaText",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"primaryCtaUrl",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"secondaryCtaText",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"secondaryCtaUrl",storageKey:null}],storageKey:null};return{fragment:{argumentDefinitions:e,kind:"Fragment",metadata:null,name:"alertsQuery",selections:[{condition:"skip",kind:"Condition",passingValue:!1,selections:[{alias:null,args:null,concreteType:"Viewer",kind:"LinkedField",name:"viewer",plural:!1,selections:[n],storageKey:null}]}],type:"Query",abstractKey:null},kind:"Request",operation:{argumentDefinitions:e,kind:"Operation",name:"alertsQuery",selections:[{condition:"skip",kind:"Condition",passingValue:!1,selections:[{alias:null,args:null,concreteType:"Viewer",kind:"LinkedField",name:"viewer",plural:!1,selections:[n,t],storageKey:null}]}]},params:{id:"cf7ef2e21ee42ca53b8327b6ec5373234fc96569fc7c30d729aeadfcd7867f58",metadata:{},name:"alertsQuery",operationKind:"query",text:null}}}();r.hash="21aef569d4fa57a3a594c2145c1da325",t.default=r},KLBk:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useMessage=function({messages:e,dismissedIds:t,onDismiss:n,currencies:a,view:s,displayType:l}){const[c,u]=(0,r.useState)(null);(0,r.useEffect)(()=>{!c&&t&&u([...t])},[t,c]);const d=(0,r.useMemo)(()=>{if(!e||!c&&t)return;return(c?e.filter(({id:e})=>!c.includes(e)):[...e]).sort((e,t)=>"WARNING"===e.type&&"INFO"===t.type?-1:"INFO"===e.type&&"WARNING"===t.type?1:e.priority-t.priority)},[e,c,t]),p=(0,r.useMemo)(()=>null===d||void 0===d?void 0:d.find(({views:e,currencies:t,displayType:n})=>(!l||l===n)&&(!(s&&e.length>0&&!e.includes(s))&&!(a&&t.length>0&&!t.some(e=>a.includes(e))))),[d,l,s,a]),m=(0,r.useCallback)(()=>{p&&(0,i.isDismissable)(p)&&(u([...new Set(c).add(p.id)]),n&&n(p.id))},[p,c,u,n]);return(0,r.useMemo)(()=>{if(p)return(0,i.isDismissable)(p)?o(o({},p),{},{dismiss:m}):p},[p,m])};var r=n("mXGw"),i=n("yFIp");function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},LnIy:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n("mXGw"),i=n("v5At"),a=n("hIT1"),o=n("rlm3"),s=n("ajGt");const l="DISMISSED_ALERTS";function c({alerts:e,currencies:t,displayType:n,view:c,skip:u}={}){const{dismissedIds:d,onDismiss:p}=function({skip:e=!1}={}){const t=Object(s.a)(),[n,i]=Object(r.useState)(void 0),c=Object(r.useCallback)(async e=>{var n;if(e.startsWith(o.a))return;const r=null!=(n=await t.getItem(l))?n:[];t.setItem(l,[...new Set(r).add(e)])},[t]);return Object(r.useEffect)(()=>{if(e)return;const{promise:n,cancel:r}=Object(a.a)(t.getItem(l));return async function(e){const t=await e;i(null!=t?t:[])}(n),r},[]),{dismissedIds:n,onDismiss:c}}({skip:u}),m={messages:Object(r.useMemo)(()=>u||!d?[]:e,[e,u,d]),dismissedIds:d,onDismiss:p,currencies:t,displayType:n,view:c};return Object(i.useMessage)(m)}},"PO+y":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("mXGw"),i=n("v5At"),a=n("SIYu");function o(e){const t=Object(a.a)("system_alert_cta",e);return Object(r.useCallback)(()=>{Object(i.isDismissable)(e)&&(t({cta_type:"dismiss"}),e.dismiss())},[e,t])}},PusF:function(e,t,n){"use strict";var r,i=n("GMCK"),a=n("4aSu");n("oN8/");var o=void 0!==r?r:r=n("Ha1O");const s=[];t.a=function({skip:e}){var t;const n=Object(i.a)(o,{skip:e},{isRequired:!1});return Object(a.a)({name:"alerts",data:null===n||void 0===n||null===(t=n.viewer)||void 0===t?void 0:t.alerts,fallback:s})}},S8tx:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("mXGw"),i=n("oNR1"),a=n("vu4t");function o({type:e,message:t,logMessageEvent:n}){const[o,s]="primary"===e?[t.primaryCtaUrl,t.primaryCtaText]:[t.secondaryCtaUrl,t.secondaryCtaText],l=Object(i.h)(),c=Object(a.a)(o),u=Object(r.useCallback)(()=>{const{href:t,openInNewTab:r,to:i}=c;(t||i)&&(n({cta_type:e}),r&&t?window.open(t,"_blank","noopener,noreferrer"):i&&l.push(i))},[e,n,l,c]);return o&&s?u:void 0}var s=n("SIYu");function l(e){const t=Object(s.a)("system_alert_cta",e);return{onPrimaryPress:o({type:"primary",message:e,logMessageEvent:t}),onSecondaryPress:o({type:"secondary",message:e,logMessageEvent:t})}}},SIYu:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("TDwA");const i={system_alert:{action:r.ActionType.view,componentType:r.ComponentType.card,loggingId:"b44e6ed9-541f-45ee-b5d2-5a601129605e"},system_alert_cta:{action:r.ActionType.click,componentType:r.ComponentType.button,loggingId:"3a98e081-e88a-4820-8e16-2b8a449a5fa3"},remediation_alert:{action:r.ActionType.view,componentType:r.ComponentType.banner,loggingId:"450ce5d7-27e6-4952-bece-3b31f791afa8"},remediation_alert_cta:{action:r.ActionType.click,componentType:r.ComponentType.button,loggingId:"9dc023b0-499b-46b3-81ef-132c2fec0edd"}};function a(e,t){var n,a,o;return Object(r.useEventLogger)(e,Object.assign({},i[e],{display_type:null!=(n=null===t||void 0===t?void 0:t.displayType.toLowerCase())?n:"banner",alert_type:null!=(a=null===t||void 0===t?void 0:t.type.toLowerCase())?a:"info",alert_title:null!=(o=null===t||void 0===t?void 0:t.title)?o:""}))}},YwrZ:function(e,t,n){"use strict";n.d(t,"a",(function(){return I}));var r=n("5n0U"),i=n("mXGw"),a=n("5X/J"),o=n("S8tx"),s=n("SIYu"),l=n("UutA"),c=n("WjcU"),u=n("rzVu"),d=l.e.div.withConfig({displayName:"Banner",componentId:"qu7vl6-0"})(["display:flex;flex:0 1 auto;flex-wrap:wrap;justify-content:center;align-content:stretch;padding:",";min-height:","px;will-change:opacity,transform;z-index:",";background-color:",";border-radius:",";margin-bottom:0;@media not all and (","){flex:1 1 100%;padding:",";min-height:","px;flex-wrap:unset;border-radius:",";margin-bottom:0;}"],({theme:e})=>e.size.huge,u.b,({theme:e})=>e.zIndex.extraHigh,({severity:e,theme:t})=>"INFO"===e?t.color.iconFill:t.color.iconWarning,({displayType:e,theme:t})=>"OVERLAY"===e?t.border.radius:0,c.b.phone,({theme:e})=>e.size.large,u.a,({displayType:e,theme:t})=>"OVERLAY"===e?t.border.radius:0),p=n("5pfX");var m=Object(l.e)(p.a).attrs({role:"link"}).withConfig({displayName:"ActionButton",componentId:"cuprpc-0"})(["font-weight:",";height:36px;padding-bottom:0;padding-top:0;justify-content:center;flex:1 0 50%;@media not all and (","){min-width:124px;flex:unset;}&:first-child{background-color:",";border:0;margin-right:6px;color:",";&:hover{background-color:",";border:0;}&:active{background-color:",";border:0;}}&:nth-child(2){margin-left:6px;background-color:",";border:",";color:",";&:hover{background-color:",";border:",";}&:active{background-color:",";border:",";}&:only-child{margin:0;}}"],({theme:e})=>e.fontWeight.bold,c.b.phone,({theme:e})=>e.color.white,({theme:e,severity:t})=>"INFO"===t?e.color.buttonFill:e.color.iconWarning,({theme:e})=>e.color.maskLight,({theme:e})=>e.color.white60,({theme:e})=>e.color.transparent,({theme:e})=>"1px solid "+e.color.white,({theme:e})=>e.color.white,({theme:e})=>e.color.backgroundHover,({theme:e})=>"1px solid "+e.color.white,({theme:e})=>e.color.white40,({theme:e})=>"1px solid "+e.color.white);const f=l.e.div.withConfig({displayName:"CallsToAction__FlexBox",componentId:"mlhcot-0"})(["display:flex;justify-content:center;align-items:center;flex:1 100%;padding-top:",";order:4;@media not all and (","){padding-top:0;order:2;flex:unset;}"],({theme:e})=>e.size.large,c.b.phone);var y=Object(i.memo)((function({severity:e,message:t,onPrimaryPress:n,onSecondaryPress:i}){return(n||i)&&(t.primaryCtaText||t.secondaryCtaText)?Object(r.a)(f,{},void 0,!!n&&t.primaryCtaText&&Object(r.a)(m,{severity:e,onClick:n},void 0,t.primaryCtaText),!!i&&t.secondaryCtaText&&Object(r.a)(m,{severity:e,onClick:i},void 0,t.secondaryCtaText)):null}));const h=l.e.section.withConfig({displayName:"Description__DescriptionBox",componentId:"sc-1io4d4h-0"})(["display:flex;flex-direction:column;justify-content:center;align-items:flex-start;flex:1 1 0;order:1;font-size:13px;color:",";& strong{margin-bottom:",";}"],({theme:e})=>e.color.white,({theme:e})=>e.size.tiny);var v=Object(i.memo)((function({title:e,description:t}){return Object(r.a)(h,{},void 0,Object(r.a)("strong",{},void 0,e),Object(r.a)("span",{},void 0,t))}));function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var b=i.createElement("path",{d:"M11.71 1.71L10.29.29 6 4.59 1.71.29.29 1.71 4.59 6l-4.3 4.29 1.42 1.42L6 7.41l4.29 4.3 1.42-1.42L7.41 6l4.3-4.29z",fill:"#fff"});function O(e){return i.createElement("svg",g({width:12,height:12,viewBox:"0 0 12 12",fill:"current"},e),b)}n.p;var j=n("v5At"),w=n("D4bG"),x=n("PO+y");const k=l.e.div.withConfig({displayName:"Dismisser__FlexBox",componentId:"sc-15ptzvl-0"})(["display:flex;justify-content:center;align-items:flex-start;flex:0 1 0;order:3;padding-left:",";@media not all and (","){align-items:center;}"],({theme:e})=>e.size.large,c.b.phone);var C=Object(i.memo)((function({message:e}){const t=Object(x.a)(e);return Object(r.a)(k,{},void 0,Object(j.isDismissable)(e)&&Object(r.a)(p.a,{onClick:t,type:"transparent"},void 0,Object(r.a)(w.b,{fillColor:"white",width:12,height:12},void 0,Object(r.a)(O,{}))))})),T=n("k5wk");const S=l.e.div.withConfig({displayName:"Icon__FlexBox",componentId:"sc-4q6r6o-0"})(["display:flex;justify-content:center;align-items:center;flex:0 1 0;order:0;padding-right:",";"],({theme:e})=>e.size.large);var P=Object(i.memo)((function({severity:e}){return Object(r.a)(S,{},void 0,Object(r.a)(T.a,{type:e,size:"m",fillColor:"white"}))})),I=Object(i.memo)((function({message:e,onPrimaryPress:t,onSecondaryPress:n}){const l=Object(s.a)(e.id===a.a?"remediation_alert":"system_alert",e),c=Object(o.a)(e);Object(i.useEffect)(l,[l]);const{displayType:u,type:p}=e;return Object(r.a)(d,{displayType:u,severity:p},void 0,Object(r.a)(P,{severity:p}),Object(r.a)(v,{description:e.description,title:e.title}),Object(r.a)(y,{severity:p,message:e,onPrimaryPress:null!=t?t:c.onPrimaryPress,onSecondaryPress:null!=n?n:c.onSecondaryPress}),Object(r.a)(C,{message:e}))}))},f6jL:function(e,t,n){},hIT1:function(e,t,n){"use strict";t.a=function(e){let t=!1;const n=new Promise(()=>{});return{cancel:()=>{t=!0},promise:e.then(e=>t?n:e).catch(e=>{if(t)return n;throw e})}}},k5wk:function(e,t,n){"use strict";n.d(t,"a",(function(){return S}));var r=n("5n0U"),i=n("mXGw");function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o=i.createElement("path",{d:"M16 32c8.84 0 16-7.16 16-16S24.84 0 16 0 0 7.16 0 16s7.16 16 16 16zM14.667 6.667h2.666v2.666h-2.666V6.667zm0 5.333h2.666v13.333h-2.666V12z"});function s(e){return i.createElement("svg",a({width:32,height:32,viewBox:"0 0 32 32",fill:"current"},e),o)}n.p;function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var c=i.createElement("path",{d:"M12 24c6.63 0 12-5.37 12-12S18.63 0 12 0 0 5.37 0 12s5.37 12 12 12zM11 5h2v2h-2V5zm0 4h2v10h-2V9z"});n.p;function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var d=i.createElement("path",{d:"M8 16c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zM7 3.5h2v2H7v-2zM7 7h2v5.5H7V7z"});n.p;function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var m=i.createElement("path",{d:"M6 12c3.31 0 6-2.69 6-6S9.31 0 6 0 0 2.69 0 6s2.69 6 6 6zm-.75-9.38h1.5v1.5h-1.5v-1.5zm0 2.76h1.5v4h-1.5v-4z"});n.p;function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var y=i.createElement("path",{d:"M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm1.333 25.333h-2.666v-2.666h2.666v2.666zm0-5.333h-2.666V6.667h2.666V20z"});function h(e){return i.createElement("svg",f({width:32,height:32,viewBox:"0 0 32 32",fill:"current"},e),y)}n.p;function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var g=i.createElement("path",{d:"M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm1.333 25.333h-2.666v-2.666h2.666v2.666zm0-5.333h-2.666V6.667h2.666V20z"});n.p;function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var O=i.createElement("path",{d:"M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm1.333 25.333h-2.666v-2.666h2.666v2.666zm0-5.333h-2.666V6.667h2.666V20z"});n.p;function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var w=i.createElement("path",{d:"M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0zm1.333 25.333h-2.666v-2.666h2.666v2.666zm0-5.333h-2.666V6.667h2.666V20z"});n.p;var x=n("X2+i"),k=n("D4bG");const C={INFO:{fillColor:"iconFill",xl:s,l:s,m:function(e){return i.createElement("svg",l({width:24,height:24,viewBox:"0 0 24 24",fill:"current"},e),c)},s:function(e){return i.createElement("svg",u({width:16,height:16,viewBox:"0 0 16 16",fill:"current"},e),d)},xs:function(e){return i.createElement("svg",p({width:12,height:12,viewBox:"0 0 12 12",fill:"current"},e),m)}},WARNING:{fillColor:"iconWarning",xl:h,l:h,m:function(e){return i.createElement("svg",v({width:32,height:32,viewBox:"0 0 32 32",fill:"current"},e),g)},s:function(e){return i.createElement("svg",b({width:32,height:32,viewBox:"0 0 32 32",fill:"current"},e),O)},xs:function(e){return i.createElement("svg",j({width:32,height:32,viewBox:"0 0 32 32",fill:"current"},e),w)}}},T={xl:64,l:32,m:24,s:16,xs:12};var S=Object(i.memo)((function({type:e,size:t,fillColor:n}){const i=Object(x.a)(),a=C[e],o=T[t],s=a[t];return Object(r.a)(k.b,{width:o,height:o,fillColor:i.color[null!=n?n:a.fillColor]},void 0,Object(r.a)(s,{}))}))},mbSN:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n("mXGw");const i=[/^\/price\/?/,/^\/invite\/?/,/^\/buy\/?/,/^\/sell\/?/,/^\/accounts\/?/,/^\/settings\/?$/,/^\/card\/?/,/^\/notfications\/?$/,/^\/borrow\/?$/,/^\/for-you\/?$/,/^\/earn\/?/,/^\/pay\/?/,/^\/send\/?/,/^\/setup\/?/,/^\/yield\/?/];function a(e){return Object(r.useMemo)(()=>i.some(t=>e.match(t)),[e])}},rlm3:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return a}));var r=n("mXGw");const i="dashboard_promo";function a(e){const t=Object(r.useMemo)(()=>{var t;const n=null===e||void 0===e?void 0:e.promo;return"dismiss"===(null===n||void 0===n||null===(t=n.secondaryAction)||void 0===t?void 0:t.type)},[e]),n=Object(r.useMemo)(()=>{const n=null===e||void 0===e?void 0:e.promo;var r,a;if(n&&"expired_edd"!==n.id)return{id:`${i}_${n.id}`,dismissable:t,currencies:[],title:n.title,description:n.description,primaryCtaText:null===(r=n.primaryAction)||void 0===r?void 0:r.label,primaryCtaUrl:null===(a=n.primaryAction)||void 0===a?void 0:a.url,displayType:"BANNER",priority:101,type:"INFO",views:["DASHBOARD"]}},[e,t]);if(n)return n}},v5At:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={useMessage:!0};Object.defineProperty(t,"useMessage",{enumerable:!0,get:function(){return i.useMessage}});var i=n("KLBk"),a=n("yFIp");Object.keys(a).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(r,e)||e in t&&t[e]===a[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}}))}));var o=n("f6jL");Object.keys(o).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(r,e)||e in t&&t[e]===o[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}}))}))},vu4t:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("mXGw"),i=n("nZNK"),a=n("mbSN");function o(e){const{pathname:t}=Object(i.a)(e),n=Object(a.a)(t);return Object(r.useMemo)(()=>({to:n?t:void 0,href:n?void 0:e,openInNewTab:!n}),[n,t,e])}},yFIp:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDismissable=function(e){return e.dismissable},t.isBannerMessage=function(e){return"BANNER"===e.displayType},t.isLabelMessage=function(e){return"LABEL"===e.displayType},t.isOverlayMessage=function(e){return"OVERLAY"===e.displayType}}}]);
//# sourceMappingURL=LayoutBanners~SystemMessageLabel-3bdfb537f20f027f84f4.chunk.js.map