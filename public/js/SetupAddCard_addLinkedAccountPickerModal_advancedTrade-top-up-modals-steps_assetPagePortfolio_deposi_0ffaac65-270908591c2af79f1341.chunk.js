(("undefined"!==typeof self?self:this).webpackJsonp=("undefined"!==typeof self?self:this).webpackJsonp||[]).push([[11],{"+w5n":function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var n=t("mXGw"),s=t("gwkW");const{useFocused:o}=s.a;function r({onFocusProp:e,onBlurProp:a}){const[t,{onFocus:s,onBlur:r}]=o();return[t,{handleFocus:Object(n.useCallback)(()=>{s(),e&&e()},[s,e]),handleBlur:Object(n.useCallback)(()=>{r(),a&&a()},[r,a])}]}},"1gFA":function(e,a,t){"use strict";var n=t("We61");a.a=e=>"."===e||Object(n.a)(e)>=0&&"number"===typeof Object(n.a)(e)},"99u4":function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var n=t("GZdV"),s=t.n(n),o=t("mXGw"),r=t("SXf5");function i(e){const a=Object(o.useContext)(e.context),t=Object(o.useContext)(r.a),n={},i=Object(o.useCallback)(s()(e=>a=>t({type:"change",payload:a,meta:{name:e}})),[t]),u=Object(o.useCallback)(s()(e=>a=>t({type:"error",payload:a,meta:{name:e}})),[t]),c=Object(o.useCallback)(s()(e=>a=>(t({type:"registerValidator",payload:a,meta:{name:e}}),()=>t({type:"unregisterValidator",meta:{name:e}}))),[t]);for(const s in a)Object.prototype.hasOwnProperty.call(a,s)&&(n[s]=Object.assign({},a[s],{name:s,onChange:i(s),onErrors:u(s),registerValidator:c(s)}));return n}},GNVE:function(e,a,t){"use strict";var n=t("mXGw");const s=Object(n.createContext)({});a.a=s},GtAy:function(e,a,t){"use strict";t.d(a,"a",(function(){return o}));var n=t("mXGw"),s=t("SXf5");function o(e){const a=Object(n.useContext)(e.context),t=Object(n.useContext)(s.b);let o=!0;for(const n in a)Object.prototype.hasOwnProperty.call(a,n)&&a[n].errors&&(o=!1);return[t,o]}},"IK+w":function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var n=t("mXGw");function s(e,a){Object(n.useEffect)(()=>a(a=>{const t=[];for(const[n,s]of e){!0!==n(a)&&t.push(new Error(s||""))}if(t.length>0)return t}),[])}},SBaq:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var n=t("mXGw");function s(e,a){const t=Object(n.useContext)(e.context),s=[];for(const n of a)Object.prototype.hasOwnProperty.call(t,n)&&t[n].errors&&s.push(...t[n].errors);return s}},SXf5:function(e,a,t){"use strict";t.d(a,"a",(function(){return s})),t.d(a,"b",(function(){return r}));var n=t("mXGw");const s=Object(n.createContext)(e=>Promise.reject(new Error("Dispatch context not provided"))),o=()=>{},r=Object(n.createContext)(o)},TZPP:function(e,a){},V3dI:function(e,a,t){"use strict";t.d(a,"a",(function(){return d}));var n=t("5n0U"),s=t("mXGw");const o=e=>(a,t)=>{try{const n="read"===t.type?a:e(a,t.originalAction);return t.resolve(n),n}catch(n){throw t.reject(n),n}};var r=t("SXf5");function i(e,a){var t;let n;switch(a.type){case"error":return Object.assign({},e,{values:Object.assign({},e.values,{[a.meta.name]:Object.assign({},e.values[a.meta.name],{errors:[...e.values[a.meta.name].errors||[],...a.payload]})})});case"formError":n=Object.assign({},e,{values:Object.assign({},e.values)});for(const e in a.payload){var s;n.values[e]=Object.assign({},n.values[e],{errors:[...(null===(s=n.values[e])||void 0===s?void 0:s.errors)||[],...a.payload[e]]})}return n;case"registerValidator":return Object.assign({},e,{values:Object.assign({},e.values,{[a.meta.name]:Object.assign({},e.values[a.meta.name],{errors:a.payload(null===(t=e.values[a.meta.name])||void 0===t?void 0:t.value)})}),validators:Object.assign({},e.validators,{[a.meta.name]:a.payload})});case"unregisterValidator":return Object.assign({},e,{values:Object.assign({},e.values,{[a.meta.name]:Object.assign({},e.values[a.meta.name],{errors:void 0})}),validators:Object.assign({},e.validators,{[a.meta.name]:void 0})});case"change":return Object.assign({},e,{values:Object.assign({},e.values,{[a.meta.name]:{value:a.payload,isDirty:!0,errors:e.validators[a.meta.name]?e.validators[a.meta.name](a.payload):void 0}})});default:return e}}function u(e){const a={validators:{},values:{}};for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(a.values[t]={value:e[t],isDirty:!1});return a}const c=(e,a)=>({initialValues:t=a,onSubmit:c,children:d})=>{const[l,g,f]=function(e,a,t){const n=Object(s.useRef)(o(e));Object(s.useLayoutEffect)(()=>{n.current=o(e)},[e]);const[r,i]=Object(s.useReducer)(n.current,a,t);return[r,Object(s.useCallback)(e=>new Promise((a,t)=>{i({type:"mutate",originalAction:e,resolve:a,reject:t})}),[]),Object(s.useCallback)(()=>new Promise((e,a)=>{i({type:"read",resolve:e,reject:a})}),[])]}(i,t,u),m=Object(s.useCallback)(async e=>{const a=function(e){const a={};for(const t in e.values)Object.prototype.hasOwnProperty.call(e.values,t)&&(a[t]=e.values[t].value);return a}(await f());return c(a,e=>{g({type:"formError",payload:e})},e)},[c,g,f]);return Object(n.a)(r.a.Provider,{value:g},void 0,Object(n.a)(r.b.Provider,{value:m},void 0,Object(n.a)(e.Provider,{value:l.values},void 0,d)))};function d(e){const a=u(e),t=Object(s.createContext)(a.values);return{context:t,Provider:c(t,e)}}},VJC8:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var n=t("mXGw");function s(e){const a=Object(n.useContext)(e.context);for(const t in a)if(Object.prototype.hasOwnProperty.call(a,t)&&a[t].isDirty)return!0;return!1}},Vxsc:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var n=t("hWgQ");const s=Object(n.c)({oneHour:{id:"PeriodStore.oneHour",defaultMessage:"1h"},oneHourLong:{id:"PeriodStore.oneHourLong",defaultMessage:"1 hour"},oneDay:{id:"PeriodStore.oneDay",defaultMessage:"1d"},oneDayLong:{id:"PeriodStore.oneDayLong",defaultMessage:"1 day"},oneWeek:{id:"PeriodStore.oneWeek",defaultMessage:"1w"},oneWeekLong:{id:"PeriodStore.oneWeekLong",defaultMessage:"1 week"},oneMonth:{id:"PeriodStore.oneMonth",defaultMessage:"1m"},oneMonthLong:{id:"PeriodStore.oneMonthLong",defaultMessage:"1 month"},oneYear:{id:"PeriodStore.oneYear",defaultMessage:"1y"},oneYearLong:{id:"PeriodStore.oneYearLong",defaultMessage:"1 year"},all:{id:"PeriodStore.all",defaultMessage:"all"}})},ZShm:function(e,a,t){"use strict";t.d(a,"a",(function(){return s}));var n=t("mXGw");function s(){const[e,a]=Object(n.useState)(!1);return[e,{onBlur:Object(n.useCallback)(()=>a(!1),[a]),onFocus:Object(n.useCallback)(()=>a(!0),[a])}]}},ZqYi:function(e,a,t){"use strict";t.d(a,"b",(function(){return u})),t.d(a,"a",(function(){return c.b}));var n=t("mXGw"),s=t.n(n),o=t("2UTc"),r=t("4gc5");const i=e=>{var a;const t=Object(r.a)(),i=Object(n.useCallback)(e=>{Bugsnag.notify(e+" is missing the required 'name' prop inside <Form />")},[]);return s.a.createElement(o.a,Object.assign({},e,{countryCode:null===t||void 0===t||null===(a=t.country)||void 0===a?void 0:a.code,onUncontrolledField:i}))};var u=Object(n.memo)(i),c=t("GII9")},gfXo:function(e,a,t){"use strict";var n=t("+I+c"),s=t("5n0U"),o=t("mXGw"),r=t.n(o),i=t("UutA"),u=t("gwkW"),c=t("nPjV"),d=t("WI56"),l=t("GNVE"),g=t("+w5n");const{useValidate:f}=u.a,m=({errors:e})=>Object(s.a)(c.a,{},void 0,e[0].message);a.a=e=>{let{errors:a,isDirty:t,validators:i,component:u,registerValidator:c,onFocus:d,onBlur:p,errorComponent:y=m}=e,M=Object(n.a)(e,["errors","isDirty","validators","component","registerValidator","onFocus","onBlur","errorComponent"]);f(i,c);const[b,{handleFocus:h,handleBlur:O}]=Object(g.a)({onFocusProp:d,onBlurProp:p}),C=!(b||!t||!a),j=Object(o.useContext)(l.a);return Object(s.a)(v,{auto:!0,column:!0,className:M.className},void 0,r.a.createElement(r.a.Fragment,null,r.a.createElement(u,Object.assign({},M,{showError:C,refCallback:j?j.refCallback:void 0,onFocus:h,onBlur:O})),C&&a&&a[0].message&&Object(s.a)(y,{errors:a})))};const v=Object(i.e)(d.a).withConfig({displayName:"ValidatedField__Wrapper",componentId:"sc-1tcbrxa-0"})(["&:first-child{min-height:70px;}"])},gwkW:function(e,a,t){"use strict";t.d(a,"a",(function(){return c}));var n=t("hWgQ");const s=Object(n.c)({startEarningCTA:{id:"Earn.startEarning",defaultMessage:"Start earning"},viewMoreCTA:{id:"Earn.viewMoreCTA",defaultMessage:"View more"},earnHomeTitle:{id:"Earn.Home.Title",defaultMessage:"Earn crypto while learning about crypto"},earnHomeSubtitle:{id:"Earn.Home.Subtitle",defaultMessage:"Discover how specific cryptocurrencies work \u2014 and get a bit of each crypto to try out for yourself."},homeHowDoesEarnWork:{id:"Earn.Home.HowEarnWorks",defaultMessage:"How does Coinbase Earn work?"},homeReadBlog:{id:"Earn.Home.ReadBlog",defaultMessage:"Read the blog post"},homeVideoTitle:{id:"Earn.Home.videoTitle",defaultMessage:"Watch videos"},homeVideoText:{id:"Earn.Home.videoText",defaultMessage:"We\u2019ve created educational tutorials to teach you about different cryptocurrencies."},homeQuizTitle:{id:"Earn.Home.quizTitle",defaultMessage:"Complete a quiz"},homeQuizText:{id:"Earn.Home.quizText",defaultMessage:"After each tutorial you\u2019ll receive a simple quiz testing what you\u2019ve learned."},homeEarnTitle:{id:"Earn.Home.earnTitle",defaultMessage:"Earn"},homeEarnText:{id:"Earn.Home.earnText",defaultMessage:"You\u2019ll receive crypto in Coinbase for every quiz you complete."},homeStartTitle:{id:"Earn.Home.startTitle",defaultMessage:"Start today"},homeStartText:{id:"Earn.Home.startText",defaultMessage:"Opportunities to earn crypto don't last long, so get started today."},earnAssetCTA:{id:"Earn.earnAssetCTA",defaultMessage:"Earn {asset}"},startCourseCTA:{id:"Earn.AssetHelper.startCourse",defaultMessage:"Start course"},earnStatus:{id:"Earn.AssetHelper.earn",defaultMessage:"Earn {amount}"},earnStatusWithTicker:{id:"Earn.earnWithTicker",defaultMessage:"Earn {amount} {ticker}"},earnedStatusWithTicker:{id:"Earn.earnedWithTicker",defaultMessage:"Earned {amount} in {ticker}"},buttonViewCTA:{id:"Earn.AssetHelper.buttonView",defaultMessage:"View"},earnUpToAmount:{id:"Earn.earnUpToAmount",defaultMessage:"Earn up to {amount} worth of crypto"},linkViewLabel:{id:"Earn.AssetHelper.linkViewLabel",defaultMessage:"View {name}"},startCourseLabel:{id:"Earn.AssetHelper.startCourseLabel",defaultMessage:"Start course {name}"}}),o=Object(n.c)({lessonView:{id:"Earn.LessonCard.lessonView",defaultMessage:"View"},lessonDuration:{id:"Earn.LessonCard.lessonDuration",defaultMessage:"{duration} minute"},quizWatch:{id:"Earn.LessonCard.quizWatch",defaultMessage:"Watch"},quizWatchAgain:{id:"Earn.LessonCard.quizWatchAgain",defaultMessage:"Watch it again!"},quizDuration:{id:"Earn.LessonCard.quizDuration",defaultMessage:"{duration} minute video"},tutorialDuration:{id:"Earn.LessonCard.tutorialDuration",defaultMessage:"{duration} minute tutorial"},earn:{id:"Earn.LessonCard.earn",defaultMessage:"Earn {amount}"},earned:{id:"Earn.LessonCard.earned",defaultMessage:"Earned {amount}"},earnLeft:{id:"Earn.LessonCard.earnLeft",defaultMessage:"{amount} left"}}),r=Object(n.c)({getStartedCTA:{id:"Earn.HeroContent.getStarted",defaultMessage:"Get started"}}),i=Object(n.c)({home:{id:"Navigation.home",defaultMessage:"Home"},signUp:{id:"Navigation.signup",defaultMessage:"Get started"},getStarted:{id:"Navigation.getStarted",defaultMessage:"Get started"},signin:{id:"Navigation.signin",defaultMessage:"Sign in"},login:{id:"Navigation.login",defaultMessage:"Log in"},products:{id:"Navigation.products",defaultMessage:"Products"},prices:{id:"Navigation.prices",defaultMessage:"Prices"},learn:{id:"Navigation.learn",defaultMessage:"Learn"},individuals:{id:"Navigation.individuals",defaultMessage:"Individuals"},businesses:{id:"Navigation.businesses",defaultMessage:"Businesses"},developers:{id:"Navigation.developers",defaultMessage:"Developers"},buy:{id:"Navigation.buy",defaultMessage:"Buy {currency}"},supportedCountries:{id:"Navigation.supportedCountries",defaultMessage:"Supported countries"},status:{id:"Navigation.status",defaultMessage:"Status"},taxes:{id:"Navigation.taxes",defaultMessage:"Taxes"},company:{id:"Navigation.company",defaultMessage:"Company"},companyDescription:{id:"Navigation.companyDescription",defaultMessage:"Company Description"},about:{id:"Navigation.about",defaultMessage:"About"},affiliates:{id:"Navigation.affiliates",defaultMessage:"Affiliates"},careers:{id:"Navigation.careers",defaultMessage:"Careers"},partners:{id:"Navigation.partners",defaultMessage:"Partners"},press:{id:"Navigation.press",defaultMessage:"Press"},investors:{id:"Navigation.investors",defaultMessage:"Investors"},legalPrivacy:{id:"Navigation.legalPrivacy",defaultMessage:"Legal & privacy"},cookiePolicy:{id:"Navigation.cookiePolicy",defaultMessage:"Cookie policy"},modernSlaveryStatement:{id:"Navigation.modernSlaveryStatement",defaultMessage:"UK Modern Slavery Statement"},impressum:{id:"Navigation.impressum",defaultMessage:"Impressum"},support:{id:"Navigation.support",defaultMessage:"Support"},helpCenter:{id:"Navigation.helpCenter",defaultMessage:"Help center"},contactUs:{id:"Navigation.contactUs",defaultMessage:"Contact us"},createAccount:{id:"Navigation.createAccount",defaultMessage:"Create account"},idVerification:{id:"Navigation.idVerification",defaultMessage:"ID verification"},accountInformation:{id:"Navigation.accountInformation",defaultMessage:"Account information"},paymentMethods:{id:"Navigation.paymentMethods",defaultMessage:"Payment methods"},accountAccess:{id:"Navigation.accountAccess",defaultMessage:"Account access"},sendReceiveCrypto:{id:"Navigation.sendReceiveCrypto",defaultMessage:"Send/Receive crypto"},supportedCrypto:{id:"Navigation.supportedCrypto",defaultMessage:"Supported crypto"},pricingAndFees:{id:"Navigation.pricingAndFees",defaultMessage:"Pricing and fees"},social:{id:"Navigation.social",defaultMessage:"Social"},blog:{id:"Navigation.blog",defaultMessage:"Blog"},earnCrypto:{id:"Navigation.earnCrypto",defaultMessage:"Earn crypto"},earnGetAmount:{id:"Navigation.earnGetAmount",defaultMessage:"Get {amount}+"},compactEarnGetAmount:{id:"Navigation.compactEarnGetAmount",defaultMessage:"{amount}+"},cryptoOverview:{id:"Navigation.cryptoOverview",defaultMessage:"Overview of crypto"},feesDisclosure:{id:"Navigation.feesDisclosure",defaultMessage:"Fees disclosure"},disclosures:{id:"Navigation.disclosures",defaultMessage:"Disclosures"},risks:{id:"Navigation.risks",defaultMessage:"Risks related to cryptocurrency"},complaints:{id:"Navigation.complaints",defaultMessage:"Complaints handling procedure"},blockchainForks:{id:"Navigation.blockchainForks",defaultMessage:"Blockchain forks"},foreignExchange:{id:"Navigation.foreignExchange",defaultMessage:"Foreign Exchange and Trade Acts"},securityMeasures:{id:"Navigation.securityMeasures",defaultMessage:"Security measures to protect user\u2019s assets"},language:{id:"Navigation.language",defaultMessage:"Language selector"},prime:{id:"Navigation.prime",defaultMessage:"Prime"},commerce:{id:"Navigation.commerce",defaultMessage:"Commerce"},custody:{id:"Navigation.custody",defaultMessage:"Custody"},assetHub:{id:"Navigation.assetHub",defaultMessage:"Asset Hub"},wallet:{id:"Navigation.wallet",defaultMessage:"Wallet"},card:{id:"Navigation.card",defaultMessage:"Card"},keyDocumentInformation:{id:"Navigation.keyDocumentInformation",defaultMessage:"Key Information Document"},conflictOfInterest:{id:"Navigation.conflictOfInterest",defaultMessage:"Conflict of Interest"},compensationMethod:{id:"Navigation.compensationMethod",defaultMessage:"Statement on the Compensation Method"},statementBestExecution:{id:"Navigation.statementBestExecution",defaultMessage:"Statement of Best Execution"},antiSocialForcesPolicy:{id:"Navigation.antiSocialForcesPolicy",defaultMessage:"Policy on Blocking Relationships with Antisocial Forces"},safetyManagementOfInformationAssets:{id:"Navigation.safetyManagementOfInformationAssets",defaultMessage:"Basic Policy on Safety Management of Information Assets"},systemRiskManagement:{id:"Navigation.systemRiskManagement",defaultMessage:"Basic Policy for System Risk Management"},moneyLaunderingPrevention:{id:"Navigation.moneyLaunderingPrevention",defaultMessage:"Basic Policy on Prevention of Money Laundering and Terrorist Financing"}});var u=t("Vxsc"),c=t("p3LL");Object.assign({},i,u.a,s,r,o)},p3LL:function(e,a,t){"use strict";t.r(a);var n=t("V3dI");t.d(a,"createForm",(function(){return n.a}));var s=t("VJC8");t.d(a,"useDirty",(function(){return s.a}));var o=t("SBaq");t.d(a,"useErrors",(function(){return o.a}));var r=t("99u4");t.d(a,"useFields",(function(){return r.a}));var i=t("ZShm");t.d(a,"useFocused",(function(){return i.a}));var u=t("GtAy");t.d(a,"useSubmitter",(function(){return u.a}));var c=t("IK+w");t.d(a,"useValidate",(function(){return c.a}));var d=t("TZPP");for(var l in d)["default","createForm","useFields","useSubmitter","useErrors","useValidate","useFocused","useDirty"].indexOf(l)<0&&function(e){t.d(a,e,(function(){return d[e]}))}(l)}}]);
//# sourceMappingURL=SetupAddCard~addLinkedAccountPickerModal~advancedTrade-top-up-modals-steps~assetPagePortfolio~deposi~0ffaac65-270908591c2af79f1341.chunk.js.map