(("undefined"!==typeof self?self:this).webpackJsonp=("undefined"!==typeof self?self:this).webpackJsonp||[]).push([[14],{"/u9F":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return nt}));var n=a("5n0U"),c=a("mXGw"),o=a.n(c),i=a("gF5a"),s=a("Yvcg"),r=a("SPtF"),d=a("/PpR"),l=a("pW8h"),u=a("Di00"),b=a("0p21"),p=a("uHTm"),v=a("BiV5"),j=a("5CTd"),O=a("DMJL"),g=a("KqNE");var m=Object(g.c)({defaultStep:"addressStep",steps:["addressStep","selectAccountStep","sendWarningStep"]});function f({children:e}){const{goToStep:t}=Object(g.j)(m),a=Object(c.useCallback)(()=>{t("addressStep")},[t]);return Object(n.a)(O.b,{onClick:a},void 0,e)}var y=a("uEse");var h=Object(y.a)({initialValues:{accountId:""},validators:{accountId:[]}}),S=a("O0l7"),w=a("WI56"),C=a("O8JI"),I=a("e/K8"),E=a("PtKK"),A=a("Fc7c"),B=a("6pIo"),_=a("3c2x"),k=a("sbA6"),T=a("jDdq");function R(e){const{data:t}=Object(r.a)(T.a.detailShape(),{id:e}),a=Object(k.a)(T.a.detailShape());return Object(c.useEffect)(()=>{if(((null===t||void 0===t?void 0:t.warnings)||[]).length>0)return()=>a({id:e})},[]),t}var x=a("Mz/W"),W=a.n(x),P=a("TDwA"),M=a("wngC"),F=a("iiUS"),V=a("tqeJ"),L=a("hqqT"),N=a("yVYY"),D=a("XJwD"),z=a("e29S");function U({inlineWarning:e}){const{goToStep:t}=Object(g.j)(m),{text:a}=e;return Object(n.a)(N.HStack,{alignItems:"flex-start",spacingTop:2,spacingBottom:1},void 0,Object(n.a)(D.PressableOpacity,{onPress:()=>t("sendWarningStep"),noScaleOnPress:!0},void 0,Object(n.a)(N.HStack,{},void 0,Object(n.a)(L.Icon,{name:"info",color:"foregroundMuted",size:"s",spacingEnd:1}),Object(n.a)(z.TextLegal,{as:"p"},void 0,a))))}var q=Object(c.memo)(U),J=a("hWgQ"),H=a("gN02"),Z=a("U59w"),K=a("nms+"),Q=a("v4lh");function Y(){const{accountId:e}=Object(S.a)(h),{accounts:t=[]}=Object(Q.a)("RECEIVE");return t.find(t=>(null===t||void 0===t?void 0:t.id)===e.value)}function $(){const{assets:e=[]}=Object(Q.a)("RECEIVE"),t=Y();return e.find(e=>{var a;return(null===e||void 0===e?void 0:e.id)===(null===t||void 0===t||null===(a=t.assetId)||void 0===a?void 0:a.id)})}function X(e,t={}){const a=$();return Object(K.a)(e,Object.assign({category:"receive",action:P.ActionType.click,asset_ticker:null===a||void 0===a?void 0:a.symbol},t))}const G=Object(J.c)({asset:{id:"Receive.CurrencySelectorRow.asset",defaultMessage:"Asset"}});function ee(){const e=X("receive_update_asset_tapped",{context:"address"}),{logReceiveFlowButtonPress:t}=Object(V.a)(),{formatMessage:a}=Object(H.a)(),o=$(),i=Y(),{goToStep:s}=Object(g.j)(m),r=Object(c.useCallback)(()=>{e(),t({flow:"receive_setup",componentName:"change_asset"}),s("selectAccountStep")},[e,s,t]);return Object(n.a)(C.E,{onPress:r,borderedTop:!0,primaryLabel:a(G.asset),image:(null===o||void 0===o?void 0:o.imageUrl)||"",secondaryLabel:null===i||void 0===i?void 0:i.name,leftColumnWidth:Z.b,nonTruncated:!0})}var te=a("xNHB"),ae=a("j7F+"),ne=a("4aSu"),ce=a("bZa+"),oe=a("EiJ9"),ie=a("rdkD");function se({primaryLabel:e,value:t,onCopy:a,borderTop:c=!1,secondaryLabel:o=t,leftColumnWidth:i,nonTruncated:s=!1,copyButtonAriaLabel:r}){return Object(n.a)(C.E,{disableSelection:!0,hideCaret:!0,primaryLabel:e,secondaryLabel:o,borderedTop:c,rightIcon:Object(n.a)(ie.a,{value:t,onCopy:a,spacingStart:0,ariaLabel:r}),leftColumnWidth:i,nonTruncated:s})}const re=Object(J.c)({assetCodeAndAddress:{id:"SendReceive.Send.TextAddressRows.assetCodeAndAddress",defaultMessage:"{assetCode} Address"},copyField:{id:"SendReceive.Send.TextAddressRows.copyField",defaultMessage:"Copy {field}"}});function de(){var e,t;const{formatMessage:a}=Object(H.a)(),i=X("receive_copy_address_tapped",{context:"address"}),{logReceiveFlowButtonPress:s}=Object(V.a)(),r=Object(c.useCallback)(()=>{s({flow:"receive_setup",componentName:"copy_address"}),i()},[i,s]),{accountId:d}=Object(S.a)(h),l=Object(oe.a)({uuid:d.value}),u=Object(ne.a)({name:"TextAddressRows",data:l}),{data:b}=Object(te.a)(T.a.detailShape(),{id:d.value});if(!b)return null;const p=(null===(e=b.addressInfo)||void 0===e?void 0:e.destinationTag)||"",v=null===(t=u.currency)||void 0===t?void 0:t.destinationTagName;return o.a.createElement(o.a.Fragment,null,Object(n.a)(se,{primaryLabel:a(re.assetCodeAndAddress,{assetCode:u.currencyCode}),value:b.address,onCopy:r,leftColumnWidth:Z.b,borderTop:!0,nonTruncated:!0,copyButtonAriaLabel:a(re.copyField,{field:a(re.assetCodeAndAddress,{assetCode:u.currencyCode})})}),p&&v&&Object(n.a)(se,{primaryLabel:v,value:p,secondaryLabel:Object(n.a)(M.Box,{alignItems:"center"},void 0,Object(n.a)(ce.TextLabel2,{as:"p",color:"foregroundMuted",overflow:"truncate"},void 0,p),Object(n.a)(ae.a,{href:"https://help.coinbase.com/en/coinbase/trading-and-funding/sending-or-receiving-cryptocurrency/destination-tag-memo-faq",openInNewTab:!0},void 0,Object(n.a)(L.Icon,{spacingStart:1,name:"info",size:"s",color:"foregroundMuted"}))),borderTop:!0,leftColumnWidth:Z.b,nonTruncated:!0,copyButtonAriaLabel:a(re.copyField,{field:v})}))}const le=({address:e,completeButton:t})=>{const{entryPoint:a}=Object(c.useContext)(I.a);Object(P.useLogEventOnMount)("receive_address_code",{category:"receive",componentType:P.ComponentType.modal,loggingId:"5666026a-be79-4f99-9761-35da48ad546f",entryPoint:a});const{logReceiveModalRenderEvent:o}=Object(V.a)();Object(c.useEffect)(()=>{o({flow:"receive_setup"})},[]);const i="account"!==a,{inlineWarning:s}=e;return Object(n.a)(F.VStack,{overflow:"hidden"},void 0,Object(n.a)(F.VStack,{bordered:!0,borderRadius:"compact"},void 0,Object(n.a)(F.VStack,{spacing:4,justifyContent:"center",alignItems:"center"},void 0,Object(n.a)(M.Box,{dangerouslySetBackground:"white",spacing:1},void 0,Object(n.a)(W.a,{value:e.depositUri,size:175}))),i&&Object(n.a)(ee,{}),Object(n.a)(de,{})),s&&Object(n.a)(q,{inlineWarning:s}),t)};var ue=Object(c.memo)(le),be=a("UutA"),pe=a("B05N"),ve=a("kSTq"),je=a("AaJB");function Oe(e){switch(e){case"primary":return"primary";case"secondary":return"light";default:return Bugsnag.notify("Reached default case in switch statement",{metaData:{optionStyle:e}}),"primary"}}var ge=a("1YZV"),me=a("+bmC"),fe=a("sQ9R");function ye({warning:e,accountId:t,onDismiss:a}){const i=Object(E.a)(t,"RECEIVE"),s=function({type:e,accountId:t,onDismiss:a}){const n=Object(ge.a)(me.a.services.Addresses.dismissWarning()),o=Object(fe.a)(t,"RECEIVE"),i=null===o||void 0===o?void 0:o.assetId;return Object(c.useCallback)(async t=>{n({},{type:e,assetId:i,optionId:t}).catch(e=>{Bugsnag.notify("Address warning dismissal failed",{metaData:{apiError:e}})}),a()},[n,i,a,e])}({accountId:t,onDismiss:a,type:e.type}),{entryPoint:r}=Object(c.useContext)(I.a),d="onboarding"===r,{logReceiveModalRenderEvent:l,logReceiveFlowButtonPress:u}=Object(V.a)();Object(c.useEffect)(()=>{l({flow:"receive_disclaimer"})},[]),Object(C.M)("receive_warning_viewed","receive",{category:"receive",action:P.ActionType.render,warning_type:e.type,asset_ticker:null===i||void 0===i?void 0:i.symbol,entryPoint:r});const b=Object(K.a)("receive_next_tapped",{category:"receive",action:"viewed",warning_type:e.type,asset_ticker:null===i||void 0===i?void 0:i.symbol,entryPoint:r}),p=Object(c.useCallback)(e=>{b(),u({flow:"receive_disclaimer",componentName:"i_understand"}),s(e)},[s,b,u]),v=Object(n.a)(Ie,{column:!0},void 0,e.options.map(e=>o.a.createElement(o.a.Fragment,null,Object(n.a)(C.F,{size:d?48:"large"}),Object(n.a)(je.a,{"data-testid":"address-warning-button-"+e.id,type:Oe(e.style),onClick:()=>p(e.id),size:d?void 0:"xlarge",fullWidth:!0},void 0,e.text))));return Object(n.a)(w.a,{auto:!0,column:!0},void 0,Object(n.a)(w.a,{column:!0,auto:!0,center:!0},void 0,Object(n.a)(C.F,{size:"medium"}),Object(n.a)(Se,{column:!0,justify:"center",align:"center"},void 0,Object(n.a)(we,{src:e.imageUrl})),Object(n.a)(Ce,{center:!0,auto:!0,column:!0,justify:"space-between",bottomPadding:d},void 0,Object(n.a)(w.a,{column:!0},void 0,Object(n.a)(pe.a,{level:3},void 0,e.title),Object(n.a)(C.F,{size:"medium"}),Object(n.a)(ve.a,{},void 0,e.details)),v)))}const he="200px",Se=Object(be.e)(w.a).withConfig({displayName:"AddressWarning__ImageContainer",componentId:"sc-1jxp3hi-0"})(["height:",";"],he),we=be.e.img.withConfig({displayName:"AddressWarning__WarningImage",componentId:"sc-1jxp3hi-1"})(["max-height:",";max-width:100%;"],he),Ce=Object(be.e)(w.a).withConfig({displayName:"AddressWarning__BottomContent",componentId:"sc-1jxp3hi-2"})(["padding:"," 0;text-align:center;",";"],e=>e.theme.size.large,e=>e.bottomPadding?"":"padding-bottom: 0;"),Ie=Object(be.e)(w.a).withConfig({displayName:"AddressWarning__ButtonWrapper",componentId:"sc-1jxp3hi-3"})(["width:100%;"]);var Ee=e=>{const t=Object(c.useRef)(e),[a,n]=Object(c.useState)(0),o=t.current!==e?0:a,i=Object(c.useMemo)(()=>(null===e||void 0===e?void 0:e.warnings)||[],[e]),s=Object(c.useCallback)(()=>{n(e=>e+1)},[n]),r=i[o];return Object(c.useEffect)(()=>{t.current=e,n(0)},[e]),{dismiss:s,warnings:i,activeWarning:r}};const Ae=({completeButton:e})=>{const{accountId:t}=Object(S.a)(h),a=R(t.value),{warnings:c,activeWarning:o,dismiss:i}=Ee(a),s=(null===o||void 0===o?void 0:o.type)||"completed_warnings";return Object(n.a)(_.a,{step:s},void 0,c.map(e=>Object(n.a)(ye,{accountId:t.value,warning:e,onDismiss:i},e.type)),Object(n.a)(ue,{address:a,completeButton:e},"completed_warnings"))};var Be=Object(c.memo)(Ae),_e=a("9iU7"),ke=a("rOHf"),Te=a("3lp0"),Re=a("7rk+");const xe=["selectAccountStep","availableBalanceStep"];function We(){var e;const{accountId:t}=Object(S.a)(h),a=null===(e=Object(E.a)(t.value,"SEND"))||void 0===e?void 0:e.symbol,c=Object(ke.a)(),o=Object(Te.a)({aggregateAccounts:c,currencyCode:a}),{currentStep:i}=Object(g.j)(m),s=Object(Re.a)();return a&&o&&!xe.includes(i)?Object(n.a)(_e.b,{balance:{amount:String(o.cumulativeBalance),currency:a},fiatBalance:{amount:String(o.cumulativeBalanceInNativeCurrency),currency:s}}):null}var Pe=Object(c.memo)(We),Me=a("U0rQ"),Fe=a("B6gP"),Ve=a("14lz");const Le=Object(J.c)({addressStep:{id:"SendReceive.ReceiveHeader.addressStep",defaultMessage:"Receive"}});const Ne=["availableBalanceStep","selectAccountStep"],De=[...Ne,"addressStep"],ze=({step:e})=>{const t=function(){const{goBack:e,currentStep:t}=Object(g.j)(m),a=Object(Me.a)(),n=Object(Fe.h)();return Object(c.useCallback)(()=>{"addressStep"===t&&a?n():e()},[e,a,n,t])}(),a=Object(Me.a)(),o=Object.assign({},Le,{selectAccountStep:p.a.selectAccountStep,availableBalanceStep:p.a.availableBalanceStep}),i="onboarding"===Object(c.useContext)(I.a).entryPoint,s=a&&!i?De:Ne;return Object(n.a)(Ve.a,{onBack:t,messages:o,navigationBarSteps:s,step:e})};var Ue=Object(c.memo)(ze);const qe=({completeButton:e})=>{!function(e,t={}){const a=$();Object(C.M)(e,"receive",Object.assign({category:"receive",action:P.ActionType.render,asset_ticker:null===a||void 0===a?void 0:a.symbol},t))}("receive_address_viewed");const{accountId:t}=Object(S.a)(h),a=Object(E.a)(t.value,"RECEIVE"),i=(null===a||void 0===a?void 0:a.symbol)?[a.symbol]:void 0,{setCurrency:s}=Object(c.useContext)(I.a);Object(c.useEffect)(()=>{s("receive",null===a||void 0===a?void 0:a.symbol)},[a]);const r="onboarding"!==Object(c.useContext)(I.a).entryPoint;return o.a.createElement(o.a.Fragment,null,Object(n.a)(B.a,{view:"RECEIVE",currencies:i}),Object(n.a)(A.a,{view:"RECEIVE",currencies:i}),Object(n.a)(w.a,{auto:!0,column:!0},void 0,Object(n.a)(Ue,{step:"addressStep"}),Object(n.a)(C.s,{paddingTopDesktop:24,paddingTopMobile:24},void 0,Object(n.a)(Be,{completeButton:e})),r&&Object(n.a)(Pe,{})))};var Je=e=>Object(n.a)(s.a,{},void 0,o.a.createElement(qe,Object.assign({},e))),He=a("4gc5"),Ze=a("Zwlm");function Ke(){const{accountId:e}=Object(S.a)(h),t=e.onChange,{goBack:a}=Object(g.j)(m),o=Object(Me.a)(),i=Object(He.a)(),{setCurrency:s}=Object(c.useContext)(I.a);Object(P.useLogEventOnMount)("crypto_deposit",{category:"asset_selection",componentType:P.ComponentType.page,loggingId:"30efdf0f-d893-4543-9589-b212f580585c"});const r=Object(K.a)("crypto_deposit",{category:"asset_selection",action:P.ActionType.click}),d=Object(c.useCallback)((e,n)=>{r(),t(e),n&&s("receive",n),a()},[r,t,s,a]),l="onboarding"!==Object(c.useContext)(I.a).entryPoint;return Object(n.a)(Ze.a,{flow:"RECEIVE",header:Object(n.a)(Qe,{marginBottom:o},void 0,Object(n.a)(Ue,{step:"selectAccountStep"})),activeAccountId:e.value,onAccountSelect:d,targetFiatCurrency:i.nativeCurrency,showBalances:l})}const Qe=be.e.div.withConfig({displayName:"SelectAccountStep__HeaderWrapper",componentId:"tucejn-0"})(["",""],e=>e.marginBottom&&"\n    margin-bottom: 12px;\n  ");var Ye=a("3Fxd"),$e=a("zQX7");const Xe=Object(J.c)({goBack:{id:"Receive.SendWarningStep.goBack",defaultMessage:"Back"}});function Ge(){const{accountId:e}=Object(S.a)(h),t=R(e.value),{goBack:a}=Object(g.j)(m),{formatMessage:o}=Object(H.a)(),{logReceiveModalRenderEvent:i}=Object(V.a)();if(Object(c.useEffect)(()=>{i({step:"receive_warning",flow:"receive_setup"})},[]),!t.inlineWarning)return null;const{title:s,subtitle:r}=t.inlineWarning.tooltip;return Object(n.a)(F.VStack,{height:"100%"},void 0,Object(n.a)(C.h,{goBack:a,title:s}),Object(n.a)(F.VStack,{spacing:3,alignItems:"center",justifyContent:"space-between",height:"100%"},void 0,Object(n.a)($e.TextBody,{as:"p",color:"foregroundMuted",overflow:"clip"},void 0,r),Object(n.a)(Ye.Button,{onPress:a,variant:"secondary",block:!0},void 0,o(Xe.goBack))))}var et=Object(c.memo)(Ge);const tt=["selectAccountStep","availableBalanceStep"];function at({accountId:e,completeButton:t}){var a;const[c]=Object(d.a)(e=>e(r.a)(u.a.Accounts.getAccounts,{type:"RECEIVE",pageOptions:null}),e=>e(l.b)({type:"receives",errorClass:v.a})),o=Object(b.a)(tt,"receive"),i=null!=e?e:null===(a=c.defaultAccount)||void 0===a?void 0:a.id;if(!i)throw p.a.noAccountError;return Object(n.a)(h.Provider,{initialValues:{accountId:i},onSubmit:()=>{}},void 0,Object(n.a)(f,{},void 0,Object(n.a)(j.a,{stepper:m,overlaySteps:o},void 0,Object(n.a)(m.Steps,{},void 0,Object(n.a)(m.Step,{},"addressStep",Object(n.a)(Je,{completeButton:t})),Object(n.a)(m.Step,{},"selectAccountStep",Object(n.a)(Ke,{})),Object(n.a)(m.Step,{},"sendWarningStep",Object(n.a)(et,{}))))))}function nt({accountId:e,completeButton:t}){return Object(n.a)(i.a.Provider,{},void 0,Object(n.a)(s.b,{boundaryName:"receive"},void 0,Object(n.a)(m.Provider,{},void 0,Object(n.a)(at,{accountId:e,completeButton:t}))))}},jDdq:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("Vbt9");class c extends n.a{constructor(...e){super(...e),this.accountId="",this.imageUrl="",this.title="",this.details="",this.type="correct_address_warning",this.options=void 0}pk(){return`${this.accountId}-${this.type}`}static get key(){return"AddressWarningEntity"}}var o=a("uddp");class i extends o.b{constructor(...e){super(...e),this.id="",this.address="",this.addressInfo={address:""},this.desinationTag="",this.name=null,this.createdAt="1990-01-01T00:00:00Z",this.updatedAt="1990-01-01T00:00:00Z",this.network="",this.uriScheme="",this.resource="address",this.resourcePath="",this.depositUri="",this.callbackUrl=null,this.warnings=void 0,this.inlineWarning=void 0}pk(){return this.id}static denormalize(e,t){const a=new this;let n=!0,c=!1;return Object.keys(this.schema).forEach(o=>{const i=this.schema[o],[s,r,d]=t(e[o],i);r||o in a&&!a[o]||(n=!1),d||o in a&&!a[o]||(c=!0),Object.hasOwnProperty.call(e,o)&&(e[o]=s)}),[e,n,c]}static url(e){if(!e)throw new Error("valid url needs params for AccoundAddressesResource");return`${this.urlRoot}/${e.id}/addresses`}static detailShape(){const e=super.detailShape(),t=Object.assign({},e.options);return Object.assign({},e,{fetch:async e=>{const t=await this.fetch("post",this.url(e));return Object.assign({},t,{data:Object.assign({},t.data,{warnings:t.data.warnings.map(t=>Object.assign({},t,{accountId:e.id}))})})},options:t})}static get key(){return"account_address"}}i.schema={warnings:[c]},i.urlRoot="/v2/accounts"}}]);
//# sourceMappingURL=SetupDepositCrypto~advancedTrade-order-form~assetCategories~assetPagePortfolio~buySellModal~coinbase~21e9fc06-8193ba958a5f5d80590f.chunk.js.map