(("undefined"!==typeof self?self:this).webpackJsonp=("undefined"!==typeof self?self:this).webpackJsonp||[]).push([[48],{"+INK":function(e,t,a){"use strict";var n=a("hWgQ");t.a=Object(n.c)({share:{id:"ReferralsShareDrawer.share",defaultMessage:"Share"},shareYourLink:{id:"ReferralsShareDrawer.shareYourLink",defaultMessage:"Share your link"},shareText:{id:"ReferralsShareDrawer.shareText",defaultMessage:"Check out Coinbase. Get {amount} of free Bitcoin when you sign up with my link and trade {threshold} of digital currency:"},copyLink:{id:"ReferralsShareDrawer.copy",defaultMessage:"Copy link"},copied:{id:"ReferralsShareDrawer.copied",defaultMessage:"Copied!"}})},"17Hy":function(e,t,a){"use strict";(function(e){var n=a("HACA"),r=a("+Xhe");const o="154072648063392";t.a=({url:t,type:a,text:i})=>{(({name:t,url:a,width:n,height:r})=>{"window"in e&&window.open&&(window.open(a,t,`width=${n},height=${r}`).opener=null)})((({url:e,type:t,text:a=""})=>{let i=e;i.startsWith("/")&&!i.startsWith("//")&&(i="https://www.coinbase.com"+i),i.startsWith("http")||(i="https://"+i);const c=encodeURIComponent,s=Object(n.a)()||Object(r.a)()?"fb-messenger://share/?":`http://www.facebook.com/dialog/send?&display=popup&caption=&redirect_uri=${c("https://www.coinbase.com")}&`;return{whatsapp:{name:"Whatsapp",url:"https://api.whatsapp.com/send?text="+c(`${a}\n${i}`),width:640,height:480},twitter:{name:"Twitter",url:`https://twitter.com/intent/tweet?url=${c(i)}&text=${c(a)}`,width:640,height:255},facebook:{name:"Facebook",url:`http://www.facebook.com/dialog/feed?app_id=${o}&display=popup&caption=&link=${c(i)}&redirect_uri=${c("https://www.coinbase.com")}`,width:640,height:600},messenger:{name:"Messenger",url:`${s}app_id=${o}&link=${c(i)}`,width:640,height:600},linkedIn:{name:"LinkedIn",url:"https://www.linkedin.com/sharing/share-offsite/?url="+c(i),width:640,height:590}}[t]})({url:t,type:a,text:i}))}}).call(this,a("pCvA"))},"99u4":function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a("GZdV"),r=a.n(n),o=a("mXGw"),i=a("SXf5");function c(e){const t=Object(o.useContext)(e.context),a=Object(o.useContext)(i.a),n={},c=Object(o.useCallback)(r()(e=>t=>a({type:"change",payload:t,meta:{name:e}})),[a]),s=Object(o.useCallback)(r()(e=>t=>a({type:"error",payload:t,meta:{name:e}})),[a]),l=Object(o.useCallback)(r()(e=>t=>(a({type:"registerValidator",payload:t,meta:{name:e}}),()=>a({type:"unregisterValidator",meta:{name:e}}))),[a]);for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=Object.assign({},t[r],{name:r,onChange:c(r),onErrors:s(r),registerValidator:l(r)}));return n}},AAcj:function(e,t,a){"use strict";(function(e){t.a=t=>{var a;const n=document.createElement("DIV");return n.textContent=t,document.body.appendChild(n),function(t){let a;if(!("window"in e))return;try{a=window.getSelection().getRangeAt(0)}catch(r){a=document.createRange()}const n=document.createRange();(function(e){return e.startContainer===e.endContainer&&e.startOffset===e.endOffset}(a)||"1"===t.getAttribute("data-force-autoselect"))&&(window.getSelection().removeAllRanges(),n.selectNodeContents(t),window.getSelection().addRange(n))}(n),document.execCommand("copy"),null===n||void 0===n||null===(a=n.parentNode)||void 0===a||a.removeChild(n),!0}}).call(this,a("pCvA"))},"CB+/":function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("mXGw");var r=function(e,t){const a=Object(n.useRef)(!0);return Object(n.useEffect)(()=>(a.current=!0,()=>{a.current=!1}),[]),Object(n.useCallback)(()=>{a.current&&e()},t)};function o(e){const[t,a]=Object(n.useState)(!1),o=Object(n.useRef)(0),i=r(()=>{clearTimeout(o.current),a(!0),o.current=setTimeout(()=>{a(!1)},e)},[e]);return Object(n.useEffect)(()=>()=>{clearTimeout(o.current)},[]),[t,i]}},GtAy:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("mXGw"),r=a("SXf5");function o(e){const t=Object(n.useContext)(e.context),a=Object(n.useContext)(r.b);let o=!0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&t[n].errors&&(o=!1);return[a,o]}},SBaq:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a("mXGw");function r(e,t){const a=Object(n.useContext)(e.context),r=[];for(const n of t)Object.prototype.hasOwnProperty.call(a,n)&&a[n].errors&&r.push(...a[n].errors);return r}},SXf5:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return i}));var n=a("mXGw");const r=Object(n.createContext)(e=>Promise.reject(new Error("Dispatch context not provided"))),o=()=>{},i=Object(n.createContext)(o)},V3dI:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a("5n0U"),r=a("mXGw");const o=e=>(t,a)=>{try{const n="read"===a.type?t:e(t,a.originalAction);return a.resolve(n),n}catch(n){throw a.reject(n),n}};var i=a("SXf5");function c(e,t){var a;let n;switch(t.type){case"error":return Object.assign({},e,{values:Object.assign({},e.values,{[t.meta.name]:Object.assign({},e.values[t.meta.name],{errors:[...e.values[t.meta.name].errors||[],...t.payload]})})});case"formError":n=Object.assign({},e,{values:Object.assign({},e.values)});for(const e in t.payload){var r;n.values[e]=Object.assign({},n.values[e],{errors:[...(null===(r=n.values[e])||void 0===r?void 0:r.errors)||[],...t.payload[e]]})}return n;case"registerValidator":return Object.assign({},e,{values:Object.assign({},e.values,{[t.meta.name]:Object.assign({},e.values[t.meta.name],{errors:t.payload(null===(a=e.values[t.meta.name])||void 0===a?void 0:a.value)})}),validators:Object.assign({},e.validators,{[t.meta.name]:t.payload})});case"unregisterValidator":return Object.assign({},e,{values:Object.assign({},e.values,{[t.meta.name]:Object.assign({},e.values[t.meta.name],{errors:void 0})}),validators:Object.assign({},e.validators,{[t.meta.name]:void 0})});case"change":return Object.assign({},e,{values:Object.assign({},e.values,{[t.meta.name]:{value:t.payload,isDirty:!0,errors:e.validators[t.meta.name]?e.validators[t.meta.name](t.payload):void 0}})});default:return e}}function s(e){const t={validators:{},values:{}};for(const a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t.values[a]={value:e[a],isDirty:!1});return t}const l=(e,t)=>({initialValues:a=t,onSubmit:l,children:u})=>{const[d,b,m]=function(e,t,a){const n=Object(r.useRef)(o(e));Object(r.useLayoutEffect)(()=>{n.current=o(e)},[e]);const[i,c]=Object(r.useReducer)(n.current,t,a);return[i,Object(r.useCallback)(e=>new Promise((t,a)=>{c({type:"mutate",originalAction:e,resolve:t,reject:a})}),[]),Object(r.useCallback)(()=>new Promise((e,t)=>{c({type:"read",resolve:e,reject:t})}),[])]}(c,a,s),p=Object(r.useCallback)(async e=>{const t=function(e){const t={};for(const a in e.values)Object.prototype.hasOwnProperty.call(e.values,a)&&(t[a]=e.values[a].value);return t}(await m());return l(t,e=>{b({type:"formError",payload:e})},e)},[l,b,m]);return Object(n.a)(i.a.Provider,{value:b},void 0,Object(n.a)(i.b.Provider,{value:p},void 0,Object(n.a)(e.Provider,{value:d.values},void 0,u)))};function u(e){const t=s(e),a=Object(r.createContext)(t.values);return{context:a,Provider:l(a,e)}}},WEsb:function(e,t,a){"use strict";var n=a("5n0U"),r=a("mXGw"),o=a.n(r),i=a("UutA"),c=a("WI56"),s=a("17Hy");function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var u=r.createElement("circle",{cx:27.966,cy:27.112,r:27,fill:"#3B5998"}),d=r.createElement("path",{d:"M37.808 17.112H19.125c-.64 0-1.159.52-1.159 1.159v18.683c0 .64.52 1.158 1.159 1.158h10.057V29.98h-2.738v-3.168h2.738v-2.34c0-2.713 1.657-4.188 4.077-4.188 1.16 0 2.156.085 2.446.124v2.835h-1.68c-1.313 0-1.569.63-1.569 1.55v2.021h3.136l-.407 3.177h-2.729v8.121h5.35c.642 0 1.16-.518 1.16-1.158V18.27c0-.64-.518-1.159-1.158-1.159z",fill:"#fff"});function b(e){return r.createElement("svg",l({width:55,height:55,viewBox:"0 0 55 55",fill:"none"},e),u,d)}a.p;function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var p=r.createElement("circle",{cx:27.966,cy:27.112,r:27,fill:"#0084FF"}),h=r.createElement("path",{d:"M27.966 15.112c-6.627 0-12 4.974-12 11.111 0 3.498 1.744 6.614 4.47 8.654v4.235l4.087-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.11s-5.373-11.112-12-11.112zm1.191 14.963l-3.055-3.26-5.963 3.26 6.56-6.963 3.13 3.26 5.89-3.26-6.562 6.963z",fill:"#fff"});function f(e){return r.createElement("svg",m({width:55,height:55,viewBox:"0 0 55 55",fill:"none"},e),p,h)}a.p;function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var v=r.createElement("circle",{cx:27.966,cy:27.112,r:27,fill:"#27A249"}),O=r.createElement("path",{d:"M27.966 14.86c-6.768 0-12.253 5.485-12.253 12.252 0 3.963 2.388 7.268 2.388 7.268l-1.495 4.46 4.608-1.502s3.002 2.027 6.752 2.027c6.768 0 12.253-5.486 12.253-12.252 0-6.768-5.486-12.253-12.253-12.253z",fill:"#fff"}),j=r.createElement("path",{d:"M22.411 20.762s.394-.25.6-.25h1.149s.308.055.45.375c.141.321 1.11 2.598 1.182 2.773.072.176.26.61-.041 1-.302.388-.933 1.115-.933 1.115s-.25.225-.033.583.978 1.54 1.974 2.432c.995.892 2.215 1.548 2.823 1.748.608.2.741-.066.974-.366.233-.3.958-1.216.958-1.216s.25-.366.741-.14c.492.224 2.881 1.382 2.881 1.382s.292.05.308.374c.017.325.217 1.297-.649 2.232-.866.935-2.708 1.368-3.58 1.123-.873-.243-3.756-.998-5.637-2.752-1.881-1.753-3.404-3.6-4.027-4.961-.623-1.362-.589-2.17-.554-2.55.035-.381.234-2.146 1.414-2.902z",fill:"#27A249"});function y(e){return r.createElement("svg",g({width:55,height:55,viewBox:"0 0 55 55",fill:"none"},e),v,O,j)}a.p;const w=({title:e,url:t,shareText:a,className:i,onShare:c})=>{const l=Object(r.useCallback)(()=>{c&&c({type:"whatsapp"}),Object(s.a)({type:"whatsapp",text:a,url:t})},[a,t,c]),u=Object(r.useCallback)(()=>{c&&c({type:"messenger"}),Object(s.a)({type:"messenger",text:a,url:t})},[a,t,c]),d=Object(r.useCallback)(()=>{c&&c({type:"facebook"}),Object(s.a)({type:"facebook",text:a,url:t})},[a,t,c]),m=Object(r.useRef)(null);return Object(r.useEffect)(()=>{m.current&&m.current.focus()},[m.current]),o.a.createElement(o.a.Fragment,null,o.a.createElement(x,{className:i,ref:m},Object(n.a)(C,{},void 0,e),Object(n.a)(k,{},void 0,Object(n.a)(E,{onClick:l},void 0,Object(n.a)(y,{})),Object(n.a)(E,{onClick:u},void 0,Object(n.a)(f,{})),Object(n.a)(E,{onClick:d},void 0,Object(n.a)(b,{})))))},x=i.e.div.attrs(()=>({tabIndex:-1})).withConfig({displayName:"Tray__StyledTray",componentId:"sk4cd9-0"})(["outline:none;background-color:",";color:",";border:",";border-radius:",";min-width:250px;right:0;top:99%;z-index:",";"],({theme:e})=>e.color.background,({theme:e})=>e.color.text,({theme:e})=>e.border.border,({theme:e})=>e.border.radius,e=>e.theme.zIndex.elevated),C=Object(i.e)(c.a).attrs(()=>({auto:!0})).withConfig({displayName:"Tray__Header",componentId:"sk4cd9-1"})(["border-bottom:",";padding:15px;"],({theme:e})=>e.border.border),k=Object(i.e)(c.a).attrs(()=>({justify:"space-around"})).withConfig({displayName:"Tray__IconsContainer",componentId:"sk4cd9-2"})(["padding:25px;"]),E=i.e.button.withConfig({displayName:"Tray__StyledButton",componentId:"sk4cd9-3"})(["background:none;outline:none;border:none;cursor:pointer;"]);t.a=Object(r.memo)(w)},di3f:function(e,t,a){"use strict";var n=a("5n0U"),r=a("+I+c"),o=a("mXGw"),i=a.n(o),c=a("hWgQ"),s=a("gN02"),l=a("CB+/"),u=a("JZhg"),d=a("U0YE"),b=a.n(d),m=a("UutA"),p=a("5pfX"),h=a("WI56");function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var g=o.createElement("path",{d:"M11.224.958a.65.65 0 00-.942 0L6.044 5.196 1.806.958a.65.65 0 00-.942 0 .65.65 0 000 .941l4.239 4.239-4.239 4.238a.65.65 0 000 .941.61.61 0 00.471.202.61.61 0 00.471-.202L6.044 7.08l4.238 4.238a.726.726 0 00.471.202.727.727 0 00.471-.202.65.65 0 000-.941L6.986 6.138l4.238-4.239a.65.65 0 000-.941z",fill:"currentColor"});a.p;const v=({value:e,validate:t,onClick:a,disabled:r})=>{const o=!t||t(e);return Object(n.a)(j,{valid:o,onClick:a,disabled:r},void 0,Object(n.a)(h.a,{},void 0,e),Object(n.a)(O,{}))},O=Object(m.e)((function(e){return o.createElement("svg",f({width:12,height:12,viewBox:"0 0 12 12",fill:"none"},e),g)})).withConfig({displayName:"InputValueButton__StyledClose",componentId:"qebm3b-0"})(["margin-left:6px;height:12px;width:12px;margin-bottom:-3px;"]),j=m.e.button.attrs(({onClick:e,disabled:t})=>({onClick:t?null:e,type:"button"})).withConfig({displayName:"InputValueButton__InputValue",componentId:"qebm3b-1"})(["border-radius:100px;outline:none;display:flex;align-items:center;margin-right:5px;font-size:16px;padding:8px 10px;",";"],({theme:e,valid:t,disabled:a})=>Object(m.d)(["background:",";border:",";color:",";opacity:",";","{color:",";}"],t?e.color.background:e.color.negative,t?e.border.border:"none",t?e.color.text:e.color.background,a?.8:1,O,t?e.color.textLight:e.color.background));var y=Object(o.memo)(v);const w=({value:e,onChange:t,onFocus:a,disabled:r,separator:i=/\s|,/,placeholder:c,validateItem:s,className:l})=>{const u=[...e],d=u.pop()||"",b=Object(o.useCallback)(a=>{var n;const r=e.slice(0,-1),o=((null===a||void 0===a||null===(n=a.target)||void 0===n?void 0:n.value)||"").split(i),c=o.pop(),s=o.filter(e=>e&&!r.includes(e));t([...r,...s,c])},[t,i,e]),m=Object(o.useCallback)(e=>{u.includes(e)?t([...u,""]):t([...u,e,""])},[t,u]),p=Object(o.useCallback)(a=>{t([...e.slice(0,a),...e.slice(a+1,e.length)])},[t,e]),h=Object(o.useCallback)(t=>{"Tab"===t.key&&""!==t.target.value&&(t.preventDefault(),m(t.target.value)),0===t.target.selectionEnd&&"Backspace"===t.key&&p(e.length-2)},[p,e,m]),f=0===u.length;return Object(n.a)(C,{className:l},void 0,Object(n.a)(k,{},void 0,u.map((e,t)=>Object(n.a)(y,{value:e,validate:s,disabled:r,onClick:()=>p(t)},e)),Object(n.a)(E,{value:d,disabled:r,onChange:b,onKeyDown:h,placeholder:f?c:"",onFocus:a,"aria-label":c})))};var x=Object(o.memo)(w);const C=Object(m.e)(h.a).attrs(()=>({auto:!0})).withConfig({displayName:"MultiInput__InputContainer",componentId:"sc-125mn2y-0"})(["position:relative;overflow-x:auto;white-space:normal;background-color:",";",";"],({theme:e})=>e.color.background,({theme:e})=>Object(m.d)(["border:",";border-radius:",";"],e.border.border,e.border.radius)),k=Object(m.e)(h.a).withConfig({displayName:"MultiInput__ValuesContainer",componentId:"sc-125mn2y-1"})(["position:absolute;padding:5px 20px;top:0;left:0;right:0;bottom:0;align-items:center;"]),E=m.e.input.withConfig({displayName:"MultiInput__TextInput",componentId:"sc-125mn2y-2"})(["flex-grow:1;flex-shrink:0;font-size:16px;border:none;outline:none;background-color:",";color:",";::placeholder{color:",";}"],e=>e.theme.color.background,e=>e.theme.color.text,e=>e.theme.color.text);var I=a("kSTq"),_=a("99u4"),S=a("GtAy"),M=a("SBaq"),T=a("WjcU"),N=a("V3dI");const A={emails:[]};var R=Object(N.a)(A);const B=({placeholderText:e,buttonText:t,borderless:a,buttonType:r,onFocus:c,className:s,isSent:l,formMinHeight:d=56,hideRightBorder:m=!0,roundedButton:p,buttonMarginLeft:h,buttonMarginRight:f,buttonWidth:g})=>{const{emails:v}=Object(_.a)(R),[O,j]=Object(o.useState)(!1),[y]=Object(S.a)(R),w=Object(M.a)(R,["emails"]).map(e=>e.message),x=b()(w),C=Object(o.useCallback)(async e=>{e.preventDefault(),j(!0),await y(),j(!1)},[y]);return Object(o.useEffect)(()=>{v.onChange([])},[l]),Object(n.a)(X,{column:!0,className:s},void 0,Object(n.a)(P,{formMinHeight:d,onSubmit:C,autoComplete:"off"},void 0,i.a.createElement(W,Object.assign({},v,{disabled:O,placeholder:e,validateItem:u.a,borderless:a,onFocus:c,hideRightBorder:m})),Object(n.a)(z,{type:r||"green",disabled:O,roundedButton:p,buttonMarginLeft:h,buttonMarginRight:f,buttonWidth:g,nowrap:!1},void 0,t)),x.length>0&&x.map((e,t)=>Object(n.a)(D,{marginTop:"xs"},t,e)))};var F=Object(o.memo)(B);const P=m.e.form.withConfig({displayName:"EmailMultiInputField__StyledForm",componentId:"sc-1yzntw6-0"})(["display:flex;flex:1;",";@media (","){flex-direction:column;}"],({formMinHeight:e})=>e?Object(m.d)(["min-height:","px;"],e):null,T.b.phone_small),z=Object(m.e)(p.a).attrs(({disabled:e,onClick:t})=>({onClick:e?null:t})).withConfig({displayName:"EmailMultiInputField__StyledButton",componentId:"sc-1yzntw6-1"})([""," margin-left:","px;margin-right:","px;width:",";white-space:normal;min-width:120px;min-height:100%;padding:0 ",";word-wrap:normal;@media (","){margin-top:",";border-radius:",";min-height:48px;}"],({roundedButton:e})=>e?Object(m.d)(["border-radius:",";"],({theme:e})=>e.border.borderRadius):Object(m.d)(["border-top-left-radius:0;border-bottom-left-radius:0;"]),({buttonMarginLeft:e})=>null!=e?e:0,({buttonMarginRight:e})=>null!=e?e:0,({buttonWidth:e})=>null!=e?e:0,({theme:e})=>e.size.medium,T.b.phone_small,({theme:e})=>e.size.large,({theme:e})=>e.border.borderRadius),W=Object(m.e)(x).withConfig({displayName:"EmailMultiInputField__StyledMultiInput",componentId:"sc-1yzntw6-2"})(["border-top-right-radius:0;border-bottom-right-radius:0;min-height:100%;border-right:",";",";@media (","){border-radius:",";border-right:",";min-height:48px;}"],e=>e.hideRightBorder?"none":e.theme.border.border,e=>e.borderless?Object(m.d)(["border:none;"]):null,T.b.phone_small,({theme:e})=>e.border.borderRadius,({theme:e})=>e.border.border),X=Object(m.e)(h.a).withConfig({displayName:"EmailMultiInputField__Container",componentId:"sc-1yzntw6-3"})(["flex:1 1 auto;"]),D=Object(m.e)(I.a).withConfig({displayName:"EmailMultiInputField__ErrorText",componentId:"sc-1yzntw6-4"})(["color:",";"],({theme:e})=>e.color.negative),V=Object(c.c)({oneEmailError:{id:"EmailMultiInputField.oneEmailError",defaultMessage:"Please submit at least one email"},validEmailError:{id:"EmailMultiInputField.validEmailError",defaultMessage:"Please submit a valid email"},enterEmailAddresses:{id:"EmailMultiInputField.enterAnEmailAddresses",defaultMessage:"Enter email addresses"},sendInvites:{id:"EmailMultiInputField.sendInvites",defaultMessage:"Send invites"},successfullySent:{id:"EmailMultiInputField.successfullySent",defaultMessage:"Your invites are on their way!"}}),G=e=>{let{borderless:t,onEmailsSubmit:a,buttonType:c,onFocus:d,className:b}=e,m=Object(r.a)(e,["borderless","onEmailsSubmit","buttonType","onFocus","className"]);const{formatMessage:p}=Object(s.a)(),[h,f]=Object(l.a)(2e3),g=Object(o.useCallback)(async(e,t)=>{const{emails:n}=e,r=Array.from(n).filter(e=>Boolean(e));if(0!==r.length)if((e=>{let t=!0;return e.forEach(e=>{Object(u.a)(e)||(t=!1)}),t})(r))try{await a(r),f()}catch(o){t({emails:[o]})}else t({emails:[new Error(p(V.validEmailError))]});else t({emails:[new Error(p(V.oneEmailError))]})},[p,f,a]);return Object(n.a)(R.Provider,{initialValues:A,onSubmit:g},void 0,i.a.createElement(F,Object.assign({className:b,borderless:t,placeholderText:p(h?V.successfullySent:V.enterEmailAddresses),buttonText:p(V.sendInvites),buttonType:c,onFocus:d,isSent:h},m)))};t.a=Object(o.memo)(G)},efYg:function(e,t,a){"use strict";var n=a("5n0U"),r=a("mXGw"),o=a.n(r),i=a("UutA"),c=a("TDwA"),s=a("hqqT"),l=a("5pfX"),u=a("WEsb");const d=({title:e,className:t,url:a,shareText:i,buttonText:l,page:u,eventProps:d,onPress:h,hasMarginWhenExpanded:f=!1})=>{const[g,v]=Object(r.useState)(!1),O=Object(r.useRef)(null),j=Object(r.useCallback)(()=>{g||u&&Object(c.logEvent)(u+"_tapped_referral_banner_share",d),h&&h(!g),v(!g)},[h,g,u,d]),y=Object(r.useCallback)(({relatedTarget:e})=>{const t=O.current;e instanceof Node&&(null===t||void 0===t?void 0:t.contains(e))?t.focus():v(!1)},[v]),w=Object(r.useCallback)(({type:e})=>{Object(c.logEvent)("referrer_page_invite_action",Object.assign({type:e},d))},[d]);return o.a.createElement(p,{onBlur:y,ref:O,className:t},Object(n.a)(m,{onClick:j,type:"light"},void 0,Object(n.a)(s.Icon,{name:"share",size:"s",color:"currentColor",spacingEnd:2}),l),g&&Object(n.a)(b,{shareText:i,url:a,title:e,onShare:w,hasMarginWhenExpanded:f}))},b=Object(i.e)(u.a).withConfig({displayName:"SocialShareDrawer__StyledTray",componentId:"sc-1ewl14o-0"})(["position:absolute;",";"],({hasMarginWhenExpanded:e})=>e&&"margin-bottom: 24px"),m=Object(i.e)(l.a).withConfig({displayName:"SocialShareDrawer__StyledButton",componentId:"sc-1ewl14o-1"})(["min-height:100%;padding:0 ",";svg:hover{fill:",";}"],({theme:e})=>e.size.enormous,({theme:e})=>e.color.textAccentHover),p=i.e.div.withConfig({displayName:"SocialShareDrawer__Container",componentId:"sc-1ewl14o-2"})(["display:flex;position:relative;min-height:100%;flex:1 1 auto;"]);t.a=Object(r.memo)(d)},zkXM:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return h}));var n=a("5n0U"),r=a("mXGw"),o=a("gN02"),i=a("efYg"),c=a("WEsb"),s=a("4gc5"),l=a("+INK");const u=({className:e,type:t="button",page:a})=>{const{formatMessage:r}=Object(o.a)(),{inviteFriendsUrl:u,referralAmount:d,referralThreshold:b}=Object(s.a)(),m="button"===t?i.a:c.a;return Object(n.a)(m,{className:e,buttonText:r(l.a.share),title:r(l.a.shareYourLink),shareText:r(l.a.shareText,{amount:d,threshold:b}),url:u,page:a})};var d=Object(r.memo)(u),b=a("TDwA"),m=a("1L0a"),p=a("K/G0");var h=async(e,t="referrer")=>{p.a.track(t+"_page_invite_action",{action:b.ActionType.unknown,componentType:b.ComponentType.unknown,loggingId:"9bea8504-25f9-4914-8326-69f9190752c4",type:"email"}),await m.b.post("/v2/invites/email-invite",{emails:e.join(",")})}}}]);
//# sourceMappingURL=assets-tab~invite-friends~rewards-986c68a66a22bcb30dd8.chunk.js.map