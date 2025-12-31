function pp(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const a in r)if(a!=="default"&&!(a in e)){const o=Object.getOwnPropertyDescriptor(r,a);o&&Object.defineProperty(e,a,o.get?o:{enumerable:!0,get:()=>r[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();function mp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var kc={exports:{}},qi={},jc={exports:{}},O={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Br=Symbol.for("react.element"),fp=Symbol.for("react.portal"),hp=Symbol.for("react.fragment"),gp=Symbol.for("react.strict_mode"),xp=Symbol.for("react.profiler"),yp=Symbol.for("react.provider"),vp=Symbol.for("react.context"),wp=Symbol.for("react.forward_ref"),kp=Symbol.for("react.suspense"),jp=Symbol.for("react.memo"),bp=Symbol.for("react.lazy"),Gs=Symbol.iterator;function Sp(e){return e===null||typeof e!="object"?null:(e=Gs&&e[Gs]||e["@@iterator"],typeof e=="function"?e:null)}var bc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Sc=Object.assign,Cc={};function Bn(e,t,n){this.props=e,this.context=t,this.refs=Cc,this.updater=n||bc}Bn.prototype.isReactComponent={};Bn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Bn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Nc(){}Nc.prototype=Bn.prototype;function Qo(e,t,n){this.props=e,this.context=t,this.refs=Cc,this.updater=n||bc}var Ko=Qo.prototype=new Nc;Ko.constructor=Qo;Sc(Ko,Bn.prototype);Ko.isPureReactComponent=!0;var Js=Array.isArray,zc=Object.prototype.hasOwnProperty,qo={current:null},Ec={key:!0,ref:!0,__self:!0,__source:!0};function Pc(e,t,n){var r,a={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)zc.call(t,r)&&!Ec.hasOwnProperty(r)&&(a[r]=t[r]);var l=arguments.length-2;if(l===1)a.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)a[r]===void 0&&(a[r]=l[r]);return{$$typeof:Br,type:e,key:o,ref:s,props:a,_owner:qo.current}}function Cp(e,t){return{$$typeof:Br,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zo(e){return typeof e=="object"&&e!==null&&e.$$typeof===Br}function Np(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var el=/\/+/g;function xa(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Np(""+e.key):t.toString(36)}function ui(e,t,n,r,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Br:case fp:s=!0}}if(s)return s=e,a=a(s),e=r===""?"."+xa(s,0):r,Js(a)?(n="",e!=null&&(n=e.replace(el,"$&/")+"/"),ui(a,t,n,"",function(d){return d})):a!=null&&(Zo(a)&&(a=Cp(a,n+(!a.key||s&&s.key===a.key?"":(""+a.key).replace(el,"$&/")+"/")+e)),t.push(a)),1;if(s=0,r=r===""?".":r+":",Js(e))for(var l=0;l<e.length;l++){o=e[l];var c=r+xa(o,l);s+=ui(o,t,n,c,a)}else if(c=Sp(e),typeof c=="function")for(e=c.call(e),l=0;!(o=e.next()).done;)o=o.value,c=r+xa(o,l++),s+=ui(o,t,n,c,a);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Vr(e,t,n){if(e==null)return e;var r=[],a=0;return ui(e,r,"","",function(o){return t.call(n,o,a++)}),r}function zp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ge={current:null},pi={transition:null},Ep={ReactCurrentDispatcher:ge,ReactCurrentBatchConfig:pi,ReactCurrentOwner:qo};function Ic(){throw Error("act(...) is not supported in production builds of React.")}O.Children={map:Vr,forEach:function(e,t,n){Vr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Vr(e,function(){t++}),t},toArray:function(e){return Vr(e,function(t){return t})||[]},only:function(e){if(!Zo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};O.Component=Bn;O.Fragment=hp;O.Profiler=xp;O.PureComponent=Qo;O.StrictMode=gp;O.Suspense=kp;O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ep;O.act=Ic;O.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Sc({},e.props),a=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=qo.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)zc.call(t,c)&&!Ec.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:Br,type:e.type,key:a,ref:o,props:r,_owner:s}};O.createContext=function(e){return e={$$typeof:vp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:yp,_context:e},e.Consumer=e};O.createElement=Pc;O.createFactory=function(e){var t=Pc.bind(null,e);return t.type=e,t};O.createRef=function(){return{current:null}};O.forwardRef=function(e){return{$$typeof:wp,render:e}};O.isValidElement=Zo;O.lazy=function(e){return{$$typeof:bp,_payload:{_status:-1,_result:e},_init:zp}};O.memo=function(e,t){return{$$typeof:jp,type:e,compare:t===void 0?null:t}};O.startTransition=function(e){var t=pi.transition;pi.transition={};try{e()}finally{pi.transition=t}};O.unstable_act=Ic;O.useCallback=function(e,t){return ge.current.useCallback(e,t)};O.useContext=function(e){return ge.current.useContext(e)};O.useDebugValue=function(){};O.useDeferredValue=function(e){return ge.current.useDeferredValue(e)};O.useEffect=function(e,t){return ge.current.useEffect(e,t)};O.useId=function(){return ge.current.useId()};O.useImperativeHandle=function(e,t,n){return ge.current.useImperativeHandle(e,t,n)};O.useInsertionEffect=function(e,t){return ge.current.useInsertionEffect(e,t)};O.useLayoutEffect=function(e,t){return ge.current.useLayoutEffect(e,t)};O.useMemo=function(e,t){return ge.current.useMemo(e,t)};O.useReducer=function(e,t,n){return ge.current.useReducer(e,t,n)};O.useRef=function(e){return ge.current.useRef(e)};O.useState=function(e){return ge.current.useState(e)};O.useSyncExternalStore=function(e,t,n){return ge.current.useSyncExternalStore(e,t,n)};O.useTransition=function(){return ge.current.useTransition()};O.version="18.3.1";jc.exports=O;var y=jc.exports;const Ac=mp(y),Pp=pp({__proto__:null,default:Ac},[y]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ip=y,Ap=Symbol.for("react.element"),Dp=Symbol.for("react.fragment"),Lp=Object.prototype.hasOwnProperty,Mp=Ip.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Rp={key:!0,ref:!0,__self:!0,__source:!0};function Dc(e,t,n){var r,a={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)Lp.call(t,r)&&!Rp.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)a[r]===void 0&&(a[r]=t[r]);return{$$typeof:Ap,type:e,key:o,ref:s,props:a,_owner:Mp.current}}qi.Fragment=Dp;qi.jsx=Dc;qi.jsxs=Dc;kc.exports=qi;var i=kc.exports,Xa={},Lc={exports:{}},Ae={},Mc={exports:{}},Rc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(D,T){var R=D.length;D.push(T);e:for(;0<R;){var Q=R-1>>>1,U=D[Q];if(0<a(U,T))D[Q]=T,D[R]=U,R=Q;else break e}}function n(D){return D.length===0?null:D[0]}function r(D){if(D.length===0)return null;var T=D[0],R=D.pop();if(R!==T){D[0]=R;e:for(var Q=0,U=D.length,ln=U>>>1;Q<ln;){var Se=2*(Q+1)-1,Vn=D[Se],We=Se+1,it=D[We];if(0>a(Vn,R))We<U&&0>a(it,Vn)?(D[Q]=it,D[We]=R,Q=We):(D[Q]=Vn,D[Se]=R,Q=Se);else if(We<U&&0>a(it,R))D[Q]=it,D[We]=R,Q=We;else break e}}return T}function a(D,T){var R=D.sortIndex-T.sortIndex;return R!==0?R:D.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var c=[],d=[],h=1,m=null,g=3,j=!1,w=!1,b=!1,v=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(D){for(var T=n(d);T!==null;){if(T.callback===null)r(d);else if(T.startTime<=D)r(d),T.sortIndex=T.expirationTime,t(c,T);else break;T=n(d)}}function k(D){if(b=!1,f(D),!w)if(n(c)!==null)w=!0,Wn(z);else{var T=n(d);T!==null&&Ot(k,T.startTime-D)}}function z(D,T){w=!1,b&&(b=!1,p(S),S=-1),j=!0;var R=g;try{for(f(T),m=n(c);m!==null&&(!(m.expirationTime>T)||D&&!F());){var Q=m.callback;if(typeof Q=="function"){m.callback=null,g=m.priorityLevel;var U=Q(m.expirationTime<=T);T=e.unstable_now(),typeof U=="function"?m.callback=U:m===n(c)&&r(c),f(T)}else r(c);m=n(c)}if(m!==null)var ln=!0;else{var Se=n(d);Se!==null&&Ot(k,Se.startTime-T),ln=!1}return ln}finally{m=null,g=R,j=!1}}var N=!1,P=null,S=-1,I=5,x=-1;function F(){return!(e.unstable_now()-x<I)}function A(){if(P!==null){var D=e.unstable_now();x=D;var T=!0;try{T=P(!0,D)}finally{T?ye():(N=!1,P=null)}}else N=!1}var ye;if(typeof u=="function")ye=function(){u(A)};else if(typeof MessageChannel<"u"){var B=new MessageChannel,Hn=B.port2;B.port1.onmessage=A,ye=function(){Hn.postMessage(null)}}else ye=function(){v(A,0)};function Wn(D){P=D,N||(N=!0,ye())}function Ot(D,T){S=v(function(){D(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(D){D.callback=null},e.unstable_continueExecution=function(){w||j||(w=!0,Wn(z))},e.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<D?Math.floor(1e3/D):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(D){switch(g){case 1:case 2:case 3:var T=3;break;default:T=g}var R=g;g=T;try{return D()}finally{g=R}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(D,T){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var R=g;g=D;try{return T()}finally{g=R}},e.unstable_scheduleCallback=function(D,T,R){var Q=e.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?Q+R:Q):R=Q,D){case 1:var U=-1;break;case 2:U=250;break;case 5:U=1073741823;break;case 4:U=1e4;break;default:U=5e3}return U=R+U,D={id:h++,callback:T,priorityLevel:D,startTime:R,expirationTime:U,sortIndex:-1},R>Q?(D.sortIndex=R,t(d,D),n(c)===null&&D===n(d)&&(b?(p(S),S=-1):b=!0,Ot(k,R-Q))):(D.sortIndex=U,t(c,D),w||j||(w=!0,Wn(z))),D},e.unstable_shouldYield=F,e.unstable_wrapCallback=function(D){var T=g;return function(){var R=g;g=T;try{return D.apply(this,arguments)}finally{g=R}}}})(Rc);Mc.exports=Rc;var Tp=Mc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bp=y,Ie=Tp;function E(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Tc=new Set,xr={};function rn(e,t){In(e,t),In(e+"Capture",t)}function In(e,t){for(xr[e]=t,e=0;e<t.length;e++)Tc.add(t[e])}var dt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ya=Object.prototype.hasOwnProperty,Fp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,tl={},nl={};function _p(e){return Ya.call(nl,e)?!0:Ya.call(tl,e)?!1:Fp.test(e)?nl[e]=!0:(tl[e]=!0,!1)}function Op(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Up(e,t,n,r){if(t===null||typeof t>"u"||Op(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function xe(e,t,n,r,a,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];le[t]=new xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){le[e]=new xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){le[e]=new xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){le[e]=new xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){le[e]=new xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Go=/[\-:]([a-z])/g;function Jo(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Go,Jo);le[t]=new xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Go,Jo);le[t]=new xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Go,Jo);le[t]=new xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){le[e]=new xe(e,1,!1,e.toLowerCase(),null,!1,!1)});le.xlinkHref=new xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){le[e]=new xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function es(e,t,n,r){var a=le.hasOwnProperty(t)?le[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Up(t,n,a,r)&&(n=null),r||a===null?_p(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ft=Bp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,$r=Symbol.for("react.element"),un=Symbol.for("react.portal"),pn=Symbol.for("react.fragment"),ts=Symbol.for("react.strict_mode"),Qa=Symbol.for("react.profiler"),Bc=Symbol.for("react.provider"),Fc=Symbol.for("react.context"),ns=Symbol.for("react.forward_ref"),Ka=Symbol.for("react.suspense"),qa=Symbol.for("react.suspense_list"),rs=Symbol.for("react.memo"),xt=Symbol.for("react.lazy"),_c=Symbol.for("react.offscreen"),rl=Symbol.iterator;function Qn(e){return e===null||typeof e!="object"?null:(e=rl&&e[rl]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Object.assign,ya;function rr(e){if(ya===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ya=t&&t[1]||""}return`
`+ya+e}var va=!1;function wa(e,t){if(!e||va)return"";va=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var a=d.stack.split(`
`),o=r.stack.split(`
`),s=a.length-1,l=o.length-1;1<=s&&0<=l&&a[s]!==o[l];)l--;for(;1<=s&&0<=l;s--,l--)if(a[s]!==o[l]){if(s!==1||l!==1)do if(s--,l--,0>l||a[s]!==o[l]){var c=`
`+a[s].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=s&&0<=l);break}}}finally{va=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?rr(e):""}function Hp(e){switch(e.tag){case 5:return rr(e.type);case 16:return rr("Lazy");case 13:return rr("Suspense");case 19:return rr("SuspenseList");case 0:case 2:case 15:return e=wa(e.type,!1),e;case 11:return e=wa(e.type.render,!1),e;case 1:return e=wa(e.type,!0),e;default:return""}}function Za(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case pn:return"Fragment";case un:return"Portal";case Qa:return"Profiler";case ts:return"StrictMode";case Ka:return"Suspense";case qa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Fc:return(e.displayName||"Context")+".Consumer";case Bc:return(e._context.displayName||"Context")+".Provider";case ns:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case rs:return t=e.displayName||null,t!==null?t:Za(e.type)||"Memo";case xt:t=e._payload,e=e._init;try{return Za(e(t))}catch{}}return null}function Wp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Za(t);case 8:return t===ts?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Mt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Oc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Vp(e){var t=Oc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Xr(e){e._valueTracker||(e._valueTracker=Vp(e))}function Uc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Oc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function bi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ga(e,t){var n=t.checked;return Z({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function il(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Mt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Hc(e,t){t=t.checked,t!=null&&es(e,"checked",t,!1)}function Ja(e,t){Hc(e,t);var n=Mt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?eo(e,t.type,n):t.hasOwnProperty("defaultValue")&&eo(e,t.type,Mt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function al(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function eo(e,t,n){(t!=="number"||bi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var ir=Array.isArray;function bn(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Mt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function to(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(E(91));return Z({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ol(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(E(92));if(ir(n)){if(1<n.length)throw Error(E(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Mt(n)}}function Wc(e,t){var n=Mt(t.value),r=Mt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function sl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Vc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function no(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Vc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Yr,$c=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Yr=Yr||document.createElement("div"),Yr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Yr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function yr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var sr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$p=["Webkit","ms","Moz","O"];Object.keys(sr).forEach(function(e){$p.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),sr[t]=sr[e]})});function Xc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||sr.hasOwnProperty(e)&&sr[e]?(""+t).trim():t+"px"}function Yc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=Xc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var Xp=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ro(e,t){if(t){if(Xp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(E(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(E(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(E(61))}if(t.style!=null&&typeof t.style!="object")throw Error(E(62))}}function io(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ao=null;function is(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var oo=null,Sn=null,Cn=null;function ll(e){if(e=Or(e)){if(typeof oo!="function")throw Error(E(280));var t=e.stateNode;t&&(t=ta(t),oo(e.stateNode,e.type,t))}}function Qc(e){Sn?Cn?Cn.push(e):Cn=[e]:Sn=e}function Kc(){if(Sn){var e=Sn,t=Cn;if(Cn=Sn=null,ll(e),t)for(e=0;e<t.length;e++)ll(t[e])}}function qc(e,t){return e(t)}function Zc(){}var ka=!1;function Gc(e,t,n){if(ka)return e(t,n);ka=!0;try{return qc(e,t,n)}finally{ka=!1,(Sn!==null||Cn!==null)&&(Zc(),Kc())}}function vr(e,t){var n=e.stateNode;if(n===null)return null;var r=ta(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(E(231,t,typeof n));return n}var so=!1;if(dt)try{var Kn={};Object.defineProperty(Kn,"passive",{get:function(){so=!0}}),window.addEventListener("test",Kn,Kn),window.removeEventListener("test",Kn,Kn)}catch{so=!1}function Yp(e,t,n,r,a,o,s,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(h){this.onError(h)}}var lr=!1,Si=null,Ci=!1,lo=null,Qp={onError:function(e){lr=!0,Si=e}};function Kp(e,t,n,r,a,o,s,l,c){lr=!1,Si=null,Yp.apply(Qp,arguments)}function qp(e,t,n,r,a,o,s,l,c){if(Kp.apply(this,arguments),lr){if(lr){var d=Si;lr=!1,Si=null}else throw Error(E(198));Ci||(Ci=!0,lo=d)}}function an(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Jc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cl(e){if(an(e)!==e)throw Error(E(188))}function Zp(e){var t=e.alternate;if(!t){if(t=an(e),t===null)throw Error(E(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return cl(a),e;if(o===r)return cl(a),t;o=o.sibling}throw Error(E(188))}if(n.return!==r.return)n=a,r=o;else{for(var s=!1,l=a.child;l;){if(l===n){s=!0,n=a,r=o;break}if(l===r){s=!0,r=a,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,r=a;break}if(l===r){s=!0,r=o,n=a;break}l=l.sibling}if(!s)throw Error(E(189))}}if(n.alternate!==r)throw Error(E(190))}if(n.tag!==3)throw Error(E(188));return n.stateNode.current===n?e:t}function ed(e){return e=Zp(e),e!==null?td(e):null}function td(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=td(e);if(t!==null)return t;e=e.sibling}return null}var nd=Ie.unstable_scheduleCallback,dl=Ie.unstable_cancelCallback,Gp=Ie.unstable_shouldYield,Jp=Ie.unstable_requestPaint,J=Ie.unstable_now,em=Ie.unstable_getCurrentPriorityLevel,as=Ie.unstable_ImmediatePriority,rd=Ie.unstable_UserBlockingPriority,Ni=Ie.unstable_NormalPriority,tm=Ie.unstable_LowPriority,id=Ie.unstable_IdlePriority,Zi=null,tt=null;function nm(e){if(tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(Zi,e,void 0,(e.current.flags&128)===128)}catch{}}var Ke=Math.clz32?Math.clz32:am,rm=Math.log,im=Math.LN2;function am(e){return e>>>=0,e===0?32:31-(rm(e)/im|0)|0}var Qr=64,Kr=4194304;function ar(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function zi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~a;l!==0?r=ar(l):(o&=s,o!==0&&(r=ar(o)))}else s=n&~a,s!==0?r=ar(s):o!==0&&(r=ar(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&a)&&(a=r&-r,o=t&-t,a>=o||a===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ke(t),a=1<<n,r|=e[n],t&=~a;return r}function om(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function sm(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-Ke(o),l=1<<s,c=a[s];c===-1?(!(l&n)||l&r)&&(a[s]=om(l,t)):c<=t&&(e.expiredLanes|=l),o&=~l}}function co(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ad(){var e=Qr;return Qr<<=1,!(Qr&4194240)&&(Qr=64),e}function ja(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Fr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ke(t),e[t]=n}function lm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-Ke(n),o=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~o}}function os(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ke(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var W=0;function od(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var sd,ss,ld,cd,dd,uo=!1,qr=[],St=null,Ct=null,Nt=null,wr=new Map,kr=new Map,vt=[],cm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ul(e,t){switch(e){case"focusin":case"focusout":St=null;break;case"dragenter":case"dragleave":Ct=null;break;case"mouseover":case"mouseout":Nt=null;break;case"pointerover":case"pointerout":wr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":kr.delete(t.pointerId)}}function qn(e,t,n,r,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[a]},t!==null&&(t=Or(t),t!==null&&ss(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function dm(e,t,n,r,a){switch(t){case"focusin":return St=qn(St,e,t,n,r,a),!0;case"dragenter":return Ct=qn(Ct,e,t,n,r,a),!0;case"mouseover":return Nt=qn(Nt,e,t,n,r,a),!0;case"pointerover":var o=a.pointerId;return wr.set(o,qn(wr.get(o)||null,e,t,n,r,a)),!0;case"gotpointercapture":return o=a.pointerId,kr.set(o,qn(kr.get(o)||null,e,t,n,r,a)),!0}return!1}function ud(e){var t=Vt(e.target);if(t!==null){var n=an(t);if(n!==null){if(t=n.tag,t===13){if(t=Jc(n),t!==null){e.blockedOn=t,dd(e.priority,function(){ld(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function mi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=po(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ao=r,n.target.dispatchEvent(r),ao=null}else return t=Or(n),t!==null&&ss(t),e.blockedOn=n,!1;t.shift()}return!0}function pl(e,t,n){mi(e)&&n.delete(t)}function um(){uo=!1,St!==null&&mi(St)&&(St=null),Ct!==null&&mi(Ct)&&(Ct=null),Nt!==null&&mi(Nt)&&(Nt=null),wr.forEach(pl),kr.forEach(pl)}function Zn(e,t){e.blockedOn===t&&(e.blockedOn=null,uo||(uo=!0,Ie.unstable_scheduleCallback(Ie.unstable_NormalPriority,um)))}function jr(e){function t(a){return Zn(a,e)}if(0<qr.length){Zn(qr[0],e);for(var n=1;n<qr.length;n++){var r=qr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(St!==null&&Zn(St,e),Ct!==null&&Zn(Ct,e),Nt!==null&&Zn(Nt,e),wr.forEach(t),kr.forEach(t),n=0;n<vt.length;n++)r=vt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<vt.length&&(n=vt[0],n.blockedOn===null);)ud(n),n.blockedOn===null&&vt.shift()}var Nn=ft.ReactCurrentBatchConfig,Ei=!0;function pm(e,t,n,r){var a=W,o=Nn.transition;Nn.transition=null;try{W=1,ls(e,t,n,r)}finally{W=a,Nn.transition=o}}function mm(e,t,n,r){var a=W,o=Nn.transition;Nn.transition=null;try{W=4,ls(e,t,n,r)}finally{W=a,Nn.transition=o}}function ls(e,t,n,r){if(Ei){var a=po(e,t,n,r);if(a===null)Da(e,t,r,Pi,n),ul(e,r);else if(dm(a,e,t,n,r))r.stopPropagation();else if(ul(e,r),t&4&&-1<cm.indexOf(e)){for(;a!==null;){var o=Or(a);if(o!==null&&sd(o),o=po(e,t,n,r),o===null&&Da(e,t,r,Pi,n),o===a)break;a=o}a!==null&&r.stopPropagation()}else Da(e,t,r,null,n)}}var Pi=null;function po(e,t,n,r){if(Pi=null,e=is(r),e=Vt(e),e!==null)if(t=an(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Jc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Pi=e,null}function pd(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(em()){case as:return 1;case rd:return 4;case Ni:case tm:return 16;case id:return 536870912;default:return 16}default:return 16}}var kt=null,cs=null,fi=null;function md(){if(fi)return fi;var e,t=cs,n=t.length,r,a="value"in kt?kt.value:kt.textContent,o=a.length;for(e=0;e<n&&t[e]===a[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===a[o-r];r++);return fi=a.slice(e,1<r?1-r:void 0)}function hi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Zr(){return!0}function ml(){return!1}function De(e){function t(n,r,a,o,s){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Zr:ml,this.isPropagationStopped=ml,this}return Z(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Zr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Zr)},persist:function(){},isPersistent:Zr}),t}var Fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ds=De(Fn),_r=Z({},Fn,{view:0,detail:0}),fm=De(_r),ba,Sa,Gn,Gi=Z({},_r,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:us,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Gn&&(Gn&&e.type==="mousemove"?(ba=e.screenX-Gn.screenX,Sa=e.screenY-Gn.screenY):Sa=ba=0,Gn=e),ba)},movementY:function(e){return"movementY"in e?e.movementY:Sa}}),fl=De(Gi),hm=Z({},Gi,{dataTransfer:0}),gm=De(hm),xm=Z({},_r,{relatedTarget:0}),Ca=De(xm),ym=Z({},Fn,{animationName:0,elapsedTime:0,pseudoElement:0}),vm=De(ym),wm=Z({},Fn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),km=De(wm),jm=Z({},Fn,{data:0}),hl=De(jm),bm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Cm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Nm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Cm[e])?!!t[e]:!1}function us(){return Nm}var zm=Z({},_r,{key:function(e){if(e.key){var t=bm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=hi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:us,charCode:function(e){return e.type==="keypress"?hi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?hi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Em=De(zm),Pm=Z({},Gi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gl=De(Pm),Im=Z({},_r,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:us}),Am=De(Im),Dm=Z({},Fn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Lm=De(Dm),Mm=Z({},Gi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Rm=De(Mm),Tm=[9,13,27,32],ps=dt&&"CompositionEvent"in window,cr=null;dt&&"documentMode"in document&&(cr=document.documentMode);var Bm=dt&&"TextEvent"in window&&!cr,fd=dt&&(!ps||cr&&8<cr&&11>=cr),xl=String.fromCharCode(32),yl=!1;function hd(e,t){switch(e){case"keyup":return Tm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function gd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var mn=!1;function Fm(e,t){switch(e){case"compositionend":return gd(t);case"keypress":return t.which!==32?null:(yl=!0,xl);case"textInput":return e=t.data,e===xl&&yl?null:e;default:return null}}function _m(e,t){if(mn)return e==="compositionend"||!ps&&hd(e,t)?(e=md(),fi=cs=kt=null,mn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return fd&&t.locale!=="ko"?null:t.data;default:return null}}var Om={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Om[e.type]:t==="textarea"}function xd(e,t,n,r){Qc(r),t=Ii(t,"onChange"),0<t.length&&(n=new ds("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var dr=null,br=null;function Um(e){Ed(e,0)}function Ji(e){var t=gn(e);if(Uc(t))return e}function Hm(e,t){if(e==="change")return t}var yd=!1;if(dt){var Na;if(dt){var za="oninput"in document;if(!za){var wl=document.createElement("div");wl.setAttribute("oninput","return;"),za=typeof wl.oninput=="function"}Na=za}else Na=!1;yd=Na&&(!document.documentMode||9<document.documentMode)}function kl(){dr&&(dr.detachEvent("onpropertychange",vd),br=dr=null)}function vd(e){if(e.propertyName==="value"&&Ji(br)){var t=[];xd(t,br,e,is(e)),Gc(Um,t)}}function Wm(e,t,n){e==="focusin"?(kl(),dr=t,br=n,dr.attachEvent("onpropertychange",vd)):e==="focusout"&&kl()}function Vm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ji(br)}function $m(e,t){if(e==="click")return Ji(t)}function Xm(e,t){if(e==="input"||e==="change")return Ji(t)}function Ym(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ze=typeof Object.is=="function"?Object.is:Ym;function Sr(e,t){if(Ze(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!Ya.call(t,a)||!Ze(e[a],t[a]))return!1}return!0}function jl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function bl(e,t){var n=jl(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=jl(n)}}function wd(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?wd(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function kd(){for(var e=window,t=bi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=bi(e.document)}return t}function ms(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Qm(e){var t=kd(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&wd(n.ownerDocument.documentElement,n)){if(r!==null&&ms(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,o=Math.min(r.start,a);r=r.end===void 0?o:Math.min(r.end,a),!e.extend&&o>r&&(a=r,r=o,o=a),a=bl(n,o);var s=bl(n,r);a&&s&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Km=dt&&"documentMode"in document&&11>=document.documentMode,fn=null,mo=null,ur=null,fo=!1;function Sl(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;fo||fn==null||fn!==bi(r)||(r=fn,"selectionStart"in r&&ms(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ur&&Sr(ur,r)||(ur=r,r=Ii(mo,"onSelect"),0<r.length&&(t=new ds("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=fn)))}function Gr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var hn={animationend:Gr("Animation","AnimationEnd"),animationiteration:Gr("Animation","AnimationIteration"),animationstart:Gr("Animation","AnimationStart"),transitionend:Gr("Transition","TransitionEnd")},Ea={},jd={};dt&&(jd=document.createElement("div").style,"AnimationEvent"in window||(delete hn.animationend.animation,delete hn.animationiteration.animation,delete hn.animationstart.animation),"TransitionEvent"in window||delete hn.transitionend.transition);function ea(e){if(Ea[e])return Ea[e];if(!hn[e])return e;var t=hn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in jd)return Ea[e]=t[n];return e}var bd=ea("animationend"),Sd=ea("animationiteration"),Cd=ea("animationstart"),Nd=ea("transitionend"),zd=new Map,Cl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Bt(e,t){zd.set(e,t),rn(t,[e])}for(var Pa=0;Pa<Cl.length;Pa++){var Ia=Cl[Pa],qm=Ia.toLowerCase(),Zm=Ia[0].toUpperCase()+Ia.slice(1);Bt(qm,"on"+Zm)}Bt(bd,"onAnimationEnd");Bt(Sd,"onAnimationIteration");Bt(Cd,"onAnimationStart");Bt("dblclick","onDoubleClick");Bt("focusin","onFocus");Bt("focusout","onBlur");Bt(Nd,"onTransitionEnd");In("onMouseEnter",["mouseout","mouseover"]);In("onMouseLeave",["mouseout","mouseover"]);In("onPointerEnter",["pointerout","pointerover"]);In("onPointerLeave",["pointerout","pointerover"]);rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));rn("onBeforeInput",["compositionend","keypress","textInput","paste"]);rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var or="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gm=new Set("cancel close invalid load scroll toggle".split(" ").concat(or));function Nl(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,qp(r,t,void 0,e),e.currentTarget=null}function Ed(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var l=r[s],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==o&&a.isPropagationStopped())break e;Nl(a,l,d),o=c}else for(s=0;s<r.length;s++){if(l=r[s],c=l.instance,d=l.currentTarget,l=l.listener,c!==o&&a.isPropagationStopped())break e;Nl(a,l,d),o=c}}}if(Ci)throw e=lo,Ci=!1,lo=null,e}function $(e,t){var n=t[vo];n===void 0&&(n=t[vo]=new Set);var r=e+"__bubble";n.has(r)||(Pd(t,e,2,!1),n.add(r))}function Aa(e,t,n){var r=0;t&&(r|=4),Pd(n,e,r,t)}var Jr="_reactListening"+Math.random().toString(36).slice(2);function Cr(e){if(!e[Jr]){e[Jr]=!0,Tc.forEach(function(n){n!=="selectionchange"&&(Gm.has(n)||Aa(n,!1,e),Aa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Jr]||(t[Jr]=!0,Aa("selectionchange",!1,t))}}function Pd(e,t,n,r){switch(pd(t)){case 1:var a=pm;break;case 4:a=mm;break;default:a=ls}n=a.bind(null,t,n,e),a=void 0,!so||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Da(e,t,n,r,a){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var l=r.stateNode.containerInfo;if(l===a||l.nodeType===8&&l.parentNode===a)break;if(s===4)for(s=r.return;s!==null;){var c=s.tag;if((c===3||c===4)&&(c=s.stateNode.containerInfo,c===a||c.nodeType===8&&c.parentNode===a))return;s=s.return}for(;l!==null;){if(s=Vt(l),s===null)return;if(c=s.tag,c===5||c===6){r=o=s;continue e}l=l.parentNode}}r=r.return}Gc(function(){var d=o,h=is(n),m=[];e:{var g=zd.get(e);if(g!==void 0){var j=ds,w=e;switch(e){case"keypress":if(hi(n)===0)break e;case"keydown":case"keyup":j=Em;break;case"focusin":w="focus",j=Ca;break;case"focusout":w="blur",j=Ca;break;case"beforeblur":case"afterblur":j=Ca;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":j=fl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":j=gm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":j=Am;break;case bd:case Sd:case Cd:j=vm;break;case Nd:j=Lm;break;case"scroll":j=fm;break;case"wheel":j=Rm;break;case"copy":case"cut":case"paste":j=km;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":j=gl}var b=(t&4)!==0,v=!b&&e==="scroll",p=b?g!==null?g+"Capture":null:g;b=[];for(var u=d,f;u!==null;){f=u;var k=f.stateNode;if(f.tag===5&&k!==null&&(f=k,p!==null&&(k=vr(u,p),k!=null&&b.push(Nr(u,k,f)))),v)break;u=u.return}0<b.length&&(g=new j(g,w,null,n,h),m.push({event:g,listeners:b}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",j=e==="mouseout"||e==="pointerout",g&&n!==ao&&(w=n.relatedTarget||n.fromElement)&&(Vt(w)||w[ut]))break e;if((j||g)&&(g=h.window===h?h:(g=h.ownerDocument)?g.defaultView||g.parentWindow:window,j?(w=n.relatedTarget||n.toElement,j=d,w=w?Vt(w):null,w!==null&&(v=an(w),w!==v||w.tag!==5&&w.tag!==6)&&(w=null)):(j=null,w=d),j!==w)){if(b=fl,k="onMouseLeave",p="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(b=gl,k="onPointerLeave",p="onPointerEnter",u="pointer"),v=j==null?g:gn(j),f=w==null?g:gn(w),g=new b(k,u+"leave",j,n,h),g.target=v,g.relatedTarget=f,k=null,Vt(h)===d&&(b=new b(p,u+"enter",w,n,h),b.target=f,b.relatedTarget=v,k=b),v=k,j&&w)t:{for(b=j,p=w,u=0,f=b;f;f=cn(f))u++;for(f=0,k=p;k;k=cn(k))f++;for(;0<u-f;)b=cn(b),u--;for(;0<f-u;)p=cn(p),f--;for(;u--;){if(b===p||p!==null&&b===p.alternate)break t;b=cn(b),p=cn(p)}b=null}else b=null;j!==null&&zl(m,g,j,b,!1),w!==null&&v!==null&&zl(m,v,w,b,!0)}}e:{if(g=d?gn(d):window,j=g.nodeName&&g.nodeName.toLowerCase(),j==="select"||j==="input"&&g.type==="file")var z=Hm;else if(vl(g))if(yd)z=Xm;else{z=Vm;var N=Wm}else(j=g.nodeName)&&j.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(z=$m);if(z&&(z=z(e,d))){xd(m,z,n,h);break e}N&&N(e,g,d),e==="focusout"&&(N=g._wrapperState)&&N.controlled&&g.type==="number"&&eo(g,"number",g.value)}switch(N=d?gn(d):window,e){case"focusin":(vl(N)||N.contentEditable==="true")&&(fn=N,mo=d,ur=null);break;case"focusout":ur=mo=fn=null;break;case"mousedown":fo=!0;break;case"contextmenu":case"mouseup":case"dragend":fo=!1,Sl(m,n,h);break;case"selectionchange":if(Km)break;case"keydown":case"keyup":Sl(m,n,h)}var P;if(ps)e:{switch(e){case"compositionstart":var S="onCompositionStart";break e;case"compositionend":S="onCompositionEnd";break e;case"compositionupdate":S="onCompositionUpdate";break e}S=void 0}else mn?hd(e,n)&&(S="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&(fd&&n.locale!=="ko"&&(mn||S!=="onCompositionStart"?S==="onCompositionEnd"&&mn&&(P=md()):(kt=h,cs="value"in kt?kt.value:kt.textContent,mn=!0)),N=Ii(d,S),0<N.length&&(S=new hl(S,e,null,n,h),m.push({event:S,listeners:N}),P?S.data=P:(P=gd(n),P!==null&&(S.data=P)))),(P=Bm?Fm(e,n):_m(e,n))&&(d=Ii(d,"onBeforeInput"),0<d.length&&(h=new hl("onBeforeInput","beforeinput",null,n,h),m.push({event:h,listeners:d}),h.data=P))}Ed(m,t)})}function Nr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ii(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=vr(e,n),o!=null&&r.unshift(Nr(e,o,a)),o=vr(e,t),o!=null&&r.push(Nr(e,o,a))),e=e.return}return r}function cn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function zl(e,t,n,r,a){for(var o=t._reactName,s=[];n!==null&&n!==r;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&d!==null&&(l=d,a?(c=vr(n,o),c!=null&&s.unshift(Nr(n,c,l))):a||(c=vr(n,o),c!=null&&s.push(Nr(n,c,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Jm=/\r\n?/g,ef=/\u0000|\uFFFD/g;function El(e){return(typeof e=="string"?e:""+e).replace(Jm,`
`).replace(ef,"")}function ei(e,t,n){if(t=El(t),El(e)!==t&&n)throw Error(E(425))}function Ai(){}var ho=null,go=null;function xo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var yo=typeof setTimeout=="function"?setTimeout:void 0,tf=typeof clearTimeout=="function"?clearTimeout:void 0,Pl=typeof Promise=="function"?Promise:void 0,nf=typeof queueMicrotask=="function"?queueMicrotask:typeof Pl<"u"?function(e){return Pl.resolve(null).then(e).catch(rf)}:yo;function rf(e){setTimeout(function(){throw e})}function La(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),jr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);jr(t)}function zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Il(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var _n=Math.random().toString(36).slice(2),et="__reactFiber$"+_n,zr="__reactProps$"+_n,ut="__reactContainer$"+_n,vo="__reactEvents$"+_n,af="__reactListeners$"+_n,of="__reactHandles$"+_n;function Vt(e){var t=e[et];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ut]||n[et]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Il(e);e!==null;){if(n=e[et])return n;e=Il(e)}return t}e=n,n=e.parentNode}return null}function Or(e){return e=e[et]||e[ut],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function gn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(E(33))}function ta(e){return e[zr]||null}var wo=[],xn=-1;function Ft(e){return{current:e}}function X(e){0>xn||(e.current=wo[xn],wo[xn]=null,xn--)}function V(e,t){xn++,wo[xn]=e.current,e.current=t}var Rt={},pe=Ft(Rt),ke=Ft(!1),Gt=Rt;function An(e,t){var n=e.type.contextTypes;if(!n)return Rt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in n)a[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function je(e){return e=e.childContextTypes,e!=null}function Di(){X(ke),X(pe)}function Al(e,t,n){if(pe.current!==Rt)throw Error(E(168));V(pe,t),V(ke,n)}function Id(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(E(108,Wp(e)||"Unknown",a));return Z({},n,r)}function Li(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Rt,Gt=pe.current,V(pe,e),V(ke,ke.current),!0}function Dl(e,t,n){var r=e.stateNode;if(!r)throw Error(E(169));n?(e=Id(e,t,Gt),r.__reactInternalMemoizedMergedChildContext=e,X(ke),X(pe),V(pe,e)):X(ke),V(ke,n)}var ot=null,na=!1,Ma=!1;function Ad(e){ot===null?ot=[e]:ot.push(e)}function sf(e){na=!0,Ad(e)}function _t(){if(!Ma&&ot!==null){Ma=!0;var e=0,t=W;try{var n=ot;for(W=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ot=null,na=!1}catch(a){throw ot!==null&&(ot=ot.slice(e+1)),nd(as,_t),a}finally{W=t,Ma=!1}}return null}var yn=[],vn=0,Mi=null,Ri=0,Re=[],Te=0,Jt=null,st=1,lt="";function Ht(e,t){yn[vn++]=Ri,yn[vn++]=Mi,Mi=e,Ri=t}function Dd(e,t,n){Re[Te++]=st,Re[Te++]=lt,Re[Te++]=Jt,Jt=e;var r=st;e=lt;var a=32-Ke(r)-1;r&=~(1<<a),n+=1;var o=32-Ke(t)+a;if(30<o){var s=a-a%5;o=(r&(1<<s)-1).toString(32),r>>=s,a-=s,st=1<<32-Ke(t)+a|n<<a|r,lt=o+e}else st=1<<o|n<<a|r,lt=e}function fs(e){e.return!==null&&(Ht(e,1),Dd(e,1,0))}function hs(e){for(;e===Mi;)Mi=yn[--vn],yn[vn]=null,Ri=yn[--vn],yn[vn]=null;for(;e===Jt;)Jt=Re[--Te],Re[Te]=null,lt=Re[--Te],Re[Te]=null,st=Re[--Te],Re[Te]=null}var Pe=null,Ee=null,Y=!1,Qe=null;function Ld(e,t){var n=Fe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ll(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Pe=e,Ee=zt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Pe=e,Ee=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Jt!==null?{id:st,overflow:lt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Fe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Pe=e,Ee=null,!0):!1;default:return!1}}function ko(e){return(e.mode&1)!==0&&(e.flags&128)===0}function jo(e){if(Y){var t=Ee;if(t){var n=t;if(!Ll(e,t)){if(ko(e))throw Error(E(418));t=zt(n.nextSibling);var r=Pe;t&&Ll(e,t)?Ld(r,n):(e.flags=e.flags&-4097|2,Y=!1,Pe=e)}}else{if(ko(e))throw Error(E(418));e.flags=e.flags&-4097|2,Y=!1,Pe=e}}}function Ml(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Pe=e}function ti(e){if(e!==Pe)return!1;if(!Y)return Ml(e),Y=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!xo(e.type,e.memoizedProps)),t&&(t=Ee)){if(ko(e))throw Md(),Error(E(418));for(;t;)Ld(e,t),t=zt(t.nextSibling)}if(Ml(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(E(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ee=zt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ee=null}}else Ee=Pe?zt(e.stateNode.nextSibling):null;return!0}function Md(){for(var e=Ee;e;)e=zt(e.nextSibling)}function Dn(){Ee=Pe=null,Y=!1}function gs(e){Qe===null?Qe=[e]:Qe.push(e)}var lf=ft.ReactCurrentBatchConfig;function Jn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(E(309));var r=n.stateNode}if(!r)throw Error(E(147,e));var a=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var l=a.refs;s===null?delete l[o]:l[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(E(284));if(!n._owner)throw Error(E(290,e))}return e}function ni(e,t){throw e=Object.prototype.toString.call(t),Error(E(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Rl(e){var t=e._init;return t(e._payload)}function Rd(e){function t(p,u){if(e){var f=p.deletions;f===null?(p.deletions=[u],p.flags|=16):f.push(u)}}function n(p,u){if(!e)return null;for(;u!==null;)t(p,u),u=u.sibling;return null}function r(p,u){for(p=new Map;u!==null;)u.key!==null?p.set(u.key,u):p.set(u.index,u),u=u.sibling;return p}function a(p,u){return p=At(p,u),p.index=0,p.sibling=null,p}function o(p,u,f){return p.index=f,e?(f=p.alternate,f!==null?(f=f.index,f<u?(p.flags|=2,u):f):(p.flags|=2,u)):(p.flags|=1048576,u)}function s(p){return e&&p.alternate===null&&(p.flags|=2),p}function l(p,u,f,k){return u===null||u.tag!==6?(u=Ua(f,p.mode,k),u.return=p,u):(u=a(u,f),u.return=p,u)}function c(p,u,f,k){var z=f.type;return z===pn?h(p,u,f.props.children,k,f.key):u!==null&&(u.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===xt&&Rl(z)===u.type)?(k=a(u,f.props),k.ref=Jn(p,u,f),k.return=p,k):(k=ji(f.type,f.key,f.props,null,p.mode,k),k.ref=Jn(p,u,f),k.return=p,k)}function d(p,u,f,k){return u===null||u.tag!==4||u.stateNode.containerInfo!==f.containerInfo||u.stateNode.implementation!==f.implementation?(u=Ha(f,p.mode,k),u.return=p,u):(u=a(u,f.children||[]),u.return=p,u)}function h(p,u,f,k,z){return u===null||u.tag!==7?(u=Kt(f,p.mode,k,z),u.return=p,u):(u=a(u,f),u.return=p,u)}function m(p,u,f){if(typeof u=="string"&&u!==""||typeof u=="number")return u=Ua(""+u,p.mode,f),u.return=p,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case $r:return f=ji(u.type,u.key,u.props,null,p.mode,f),f.ref=Jn(p,null,u),f.return=p,f;case un:return u=Ha(u,p.mode,f),u.return=p,u;case xt:var k=u._init;return m(p,k(u._payload),f)}if(ir(u)||Qn(u))return u=Kt(u,p.mode,f,null),u.return=p,u;ni(p,u)}return null}function g(p,u,f,k){var z=u!==null?u.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return z!==null?null:l(p,u,""+f,k);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case $r:return f.key===z?c(p,u,f,k):null;case un:return f.key===z?d(p,u,f,k):null;case xt:return z=f._init,g(p,u,z(f._payload),k)}if(ir(f)||Qn(f))return z!==null?null:h(p,u,f,k,null);ni(p,f)}return null}function j(p,u,f,k,z){if(typeof k=="string"&&k!==""||typeof k=="number")return p=p.get(f)||null,l(u,p,""+k,z);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case $r:return p=p.get(k.key===null?f:k.key)||null,c(u,p,k,z);case un:return p=p.get(k.key===null?f:k.key)||null,d(u,p,k,z);case xt:var N=k._init;return j(p,u,f,N(k._payload),z)}if(ir(k)||Qn(k))return p=p.get(f)||null,h(u,p,k,z,null);ni(u,k)}return null}function w(p,u,f,k){for(var z=null,N=null,P=u,S=u=0,I=null;P!==null&&S<f.length;S++){P.index>S?(I=P,P=null):I=P.sibling;var x=g(p,P,f[S],k);if(x===null){P===null&&(P=I);break}e&&P&&x.alternate===null&&t(p,P),u=o(x,u,S),N===null?z=x:N.sibling=x,N=x,P=I}if(S===f.length)return n(p,P),Y&&Ht(p,S),z;if(P===null){for(;S<f.length;S++)P=m(p,f[S],k),P!==null&&(u=o(P,u,S),N===null?z=P:N.sibling=P,N=P);return Y&&Ht(p,S),z}for(P=r(p,P);S<f.length;S++)I=j(P,p,S,f[S],k),I!==null&&(e&&I.alternate!==null&&P.delete(I.key===null?S:I.key),u=o(I,u,S),N===null?z=I:N.sibling=I,N=I);return e&&P.forEach(function(F){return t(p,F)}),Y&&Ht(p,S),z}function b(p,u,f,k){var z=Qn(f);if(typeof z!="function")throw Error(E(150));if(f=z.call(f),f==null)throw Error(E(151));for(var N=z=null,P=u,S=u=0,I=null,x=f.next();P!==null&&!x.done;S++,x=f.next()){P.index>S?(I=P,P=null):I=P.sibling;var F=g(p,P,x.value,k);if(F===null){P===null&&(P=I);break}e&&P&&F.alternate===null&&t(p,P),u=o(F,u,S),N===null?z=F:N.sibling=F,N=F,P=I}if(x.done)return n(p,P),Y&&Ht(p,S),z;if(P===null){for(;!x.done;S++,x=f.next())x=m(p,x.value,k),x!==null&&(u=o(x,u,S),N===null?z=x:N.sibling=x,N=x);return Y&&Ht(p,S),z}for(P=r(p,P);!x.done;S++,x=f.next())x=j(P,p,S,x.value,k),x!==null&&(e&&x.alternate!==null&&P.delete(x.key===null?S:x.key),u=o(x,u,S),N===null?z=x:N.sibling=x,N=x);return e&&P.forEach(function(A){return t(p,A)}),Y&&Ht(p,S),z}function v(p,u,f,k){if(typeof f=="object"&&f!==null&&f.type===pn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case $r:e:{for(var z=f.key,N=u;N!==null;){if(N.key===z){if(z=f.type,z===pn){if(N.tag===7){n(p,N.sibling),u=a(N,f.props.children),u.return=p,p=u;break e}}else if(N.elementType===z||typeof z=="object"&&z!==null&&z.$$typeof===xt&&Rl(z)===N.type){n(p,N.sibling),u=a(N,f.props),u.ref=Jn(p,N,f),u.return=p,p=u;break e}n(p,N);break}else t(p,N);N=N.sibling}f.type===pn?(u=Kt(f.props.children,p.mode,k,f.key),u.return=p,p=u):(k=ji(f.type,f.key,f.props,null,p.mode,k),k.ref=Jn(p,u,f),k.return=p,p=k)}return s(p);case un:e:{for(N=f.key;u!==null;){if(u.key===N)if(u.tag===4&&u.stateNode.containerInfo===f.containerInfo&&u.stateNode.implementation===f.implementation){n(p,u.sibling),u=a(u,f.children||[]),u.return=p,p=u;break e}else{n(p,u);break}else t(p,u);u=u.sibling}u=Ha(f,p.mode,k),u.return=p,p=u}return s(p);case xt:return N=f._init,v(p,u,N(f._payload),k)}if(ir(f))return w(p,u,f,k);if(Qn(f))return b(p,u,f,k);ni(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,u!==null&&u.tag===6?(n(p,u.sibling),u=a(u,f),u.return=p,p=u):(n(p,u),u=Ua(f,p.mode,k),u.return=p,p=u),s(p)):n(p,u)}return v}var Ln=Rd(!0),Td=Rd(!1),Ti=Ft(null),Bi=null,wn=null,xs=null;function ys(){xs=wn=Bi=null}function vs(e){var t=Ti.current;X(Ti),e._currentValue=t}function bo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function zn(e,t){Bi=e,xs=wn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(we=!0),e.firstContext=null)}function Ue(e){var t=e._currentValue;if(xs!==e)if(e={context:e,memoizedValue:t,next:null},wn===null){if(Bi===null)throw Error(E(308));wn=e,Bi.dependencies={lanes:0,firstContext:e}}else wn=wn.next=e;return t}var $t=null;function ws(e){$t===null?$t=[e]:$t.push(e)}function Bd(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,ws(t)):(n.next=a.next,a.next=n),t.interleaved=n,pt(e,r)}function pt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var yt=!1;function ks(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ct(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Et(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,H&2){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,pt(e,n)}return a=r.interleaved,a===null?(t.next=t,ws(r)):(t.next=a.next,a.next=t),r.interleaved=t,pt(e,n)}function gi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,os(e,n)}}function Tl(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?a=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?a=o=t:o=o.next=t}else a=o=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Fi(e,t,n,r){var a=e.updateQueue;yt=!1;var o=a.firstBaseUpdate,s=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var c=l,d=c.next;c.next=null,s===null?o=d:s.next=d,s=c;var h=e.alternate;h!==null&&(h=h.updateQueue,l=h.lastBaseUpdate,l!==s&&(l===null?h.firstBaseUpdate=d:l.next=d,h.lastBaseUpdate=c))}if(o!==null){var m=a.baseState;s=0,h=d=c=null,l=o;do{var g=l.lane,j=l.eventTime;if((r&g)===g){h!==null&&(h=h.next={eventTime:j,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var w=e,b=l;switch(g=t,j=n,b.tag){case 1:if(w=b.payload,typeof w=="function"){m=w.call(j,m,g);break e}m=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=b.payload,g=typeof w=="function"?w.call(j,m,g):w,g==null)break e;m=Z({},m,g);break e;case 2:yt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,g=a.effects,g===null?a.effects=[l]:g.push(l))}else j={eventTime:j,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},h===null?(d=h=j,c=m):h=h.next=j,s|=g;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;g=l,l=g.next,g.next=null,a.lastBaseUpdate=g,a.shared.pending=null}}while(1);if(h===null&&(c=m),a.baseState=c,a.firstBaseUpdate=d,a.lastBaseUpdate=h,t=a.shared.interleaved,t!==null){a=t;do s|=a.lane,a=a.next;while(a!==t)}else o===null&&(a.shared.lanes=0);tn|=s,e.lanes=s,e.memoizedState=m}}function Bl(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(E(191,a));a.call(r)}}}var Ur={},nt=Ft(Ur),Er=Ft(Ur),Pr=Ft(Ur);function Xt(e){if(e===Ur)throw Error(E(174));return e}function js(e,t){switch(V(Pr,t),V(Er,e),V(nt,Ur),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:no(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=no(t,e)}X(nt),V(nt,t)}function Mn(){X(nt),X(Er),X(Pr)}function _d(e){Xt(Pr.current);var t=Xt(nt.current),n=no(t,e.type);t!==n&&(V(Er,e),V(nt,n))}function bs(e){Er.current===e&&(X(nt),X(Er))}var K=Ft(0);function _i(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ra=[];function Ss(){for(var e=0;e<Ra.length;e++)Ra[e]._workInProgressVersionPrimary=null;Ra.length=0}var xi=ft.ReactCurrentDispatcher,Ta=ft.ReactCurrentBatchConfig,en=0,q=null,ne=null,ie=null,Oi=!1,pr=!1,Ir=0,cf=0;function ce(){throw Error(E(321))}function Cs(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ze(e[n],t[n]))return!1;return!0}function Ns(e,t,n,r,a,o){if(en=o,q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,xi.current=e===null||e.memoizedState===null?mf:ff,e=n(r,a),pr){o=0;do{if(pr=!1,Ir=0,25<=o)throw Error(E(301));o+=1,ie=ne=null,t.updateQueue=null,xi.current=hf,e=n(r,a)}while(pr)}if(xi.current=Ui,t=ne!==null&&ne.next!==null,en=0,ie=ne=q=null,Oi=!1,t)throw Error(E(300));return e}function zs(){var e=Ir!==0;return Ir=0,e}function Je(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ie===null?q.memoizedState=ie=e:ie=ie.next=e,ie}function He(){if(ne===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=ne.next;var t=ie===null?q.memoizedState:ie.next;if(t!==null)ie=t,ne=e;else{if(e===null)throw Error(E(310));ne=e,e={memoizedState:ne.memoizedState,baseState:ne.baseState,baseQueue:ne.baseQueue,queue:ne.queue,next:null},ie===null?q.memoizedState=ie=e:ie=ie.next=e}return ie}function Ar(e,t){return typeof t=="function"?t(e):t}function Ba(e){var t=He(),n=t.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=e;var r=ne,a=r.baseQueue,o=n.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}r.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,r=r.baseState;var l=s=null,c=null,d=o;do{var h=d.lane;if((en&h)===h)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var m={lane:h,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=m,s=r):c=c.next=m,q.lanes|=h,tn|=h}d=d.next}while(d!==null&&d!==o);c===null?s=r:c.next=l,Ze(r,t.memoizedState)||(we=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do o=a.lane,q.lanes|=o,tn|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Fa(e){var t=He(),n=t.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Ze(o,t.memoizedState)||(we=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Od(){}function Ud(e,t){var n=q,r=He(),a=t(),o=!Ze(r.memoizedState,a);if(o&&(r.memoizedState=a,we=!0),r=r.queue,Es(Vd.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||ie!==null&&ie.memoizedState.tag&1){if(n.flags|=2048,Dr(9,Wd.bind(null,n,r,a,t),void 0,null),ae===null)throw Error(E(349));en&30||Hd(n,t,a)}return a}function Hd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wd(e,t,n,r){t.value=n,t.getSnapshot=r,$d(t)&&Xd(e)}function Vd(e,t,n){return n(function(){$d(t)&&Xd(e)})}function $d(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ze(e,n)}catch{return!0}}function Xd(e){var t=pt(e,1);t!==null&&qe(t,e,1,-1)}function Fl(e){var t=Je();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ar,lastRenderedState:e},t.queue=e,e=e.dispatch=pf.bind(null,q,e),[t.memoizedState,e]}function Dr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Yd(){return He().memoizedState}function yi(e,t,n,r){var a=Je();q.flags|=e,a.memoizedState=Dr(1|t,n,void 0,r===void 0?null:r)}function ra(e,t,n,r){var a=He();r=r===void 0?null:r;var o=void 0;if(ne!==null){var s=ne.memoizedState;if(o=s.destroy,r!==null&&Cs(r,s.deps)){a.memoizedState=Dr(t,n,o,r);return}}q.flags|=e,a.memoizedState=Dr(1|t,n,o,r)}function _l(e,t){return yi(8390656,8,e,t)}function Es(e,t){return ra(2048,8,e,t)}function Qd(e,t){return ra(4,2,e,t)}function Kd(e,t){return ra(4,4,e,t)}function qd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zd(e,t,n){return n=n!=null?n.concat([e]):null,ra(4,4,qd.bind(null,t,e),n)}function Ps(){}function Gd(e,t){var n=He();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Cs(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Jd(e,t){var n=He();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Cs(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function eu(e,t,n){return en&21?(Ze(n,t)||(n=ad(),q.lanes|=n,tn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,we=!0),e.memoizedState=n)}function df(e,t){var n=W;W=n!==0&&4>n?n:4,e(!0);var r=Ta.transition;Ta.transition={};try{e(!1),t()}finally{W=n,Ta.transition=r}}function tu(){return He().memoizedState}function uf(e,t,n){var r=It(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},nu(e))ru(t,n);else if(n=Bd(e,t,n,r),n!==null){var a=he();qe(n,e,r,a),iu(n,t,r)}}function pf(e,t,n){var r=It(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(nu(e))ru(t,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,l=o(s,n);if(a.hasEagerState=!0,a.eagerState=l,Ze(l,s)){var c=t.interleaved;c===null?(a.next=a,ws(t)):(a.next=c.next,c.next=a),t.interleaved=a;return}}catch{}finally{}n=Bd(e,t,a,r),n!==null&&(a=he(),qe(n,e,r,a),iu(n,t,r))}}function nu(e){var t=e.alternate;return e===q||t!==null&&t===q}function ru(e,t){pr=Oi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function iu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,os(e,n)}}var Ui={readContext:Ue,useCallback:ce,useContext:ce,useEffect:ce,useImperativeHandle:ce,useInsertionEffect:ce,useLayoutEffect:ce,useMemo:ce,useReducer:ce,useRef:ce,useState:ce,useDebugValue:ce,useDeferredValue:ce,useTransition:ce,useMutableSource:ce,useSyncExternalStore:ce,useId:ce,unstable_isNewReconciler:!1},mf={readContext:Ue,useCallback:function(e,t){return Je().memoizedState=[e,t===void 0?null:t],e},useContext:Ue,useEffect:_l,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,yi(4194308,4,qd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return yi(4194308,4,e,t)},useInsertionEffect:function(e,t){return yi(4,2,e,t)},useMemo:function(e,t){var n=Je();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Je();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=uf.bind(null,q,e),[r.memoizedState,e]},useRef:function(e){var t=Je();return e={current:e},t.memoizedState=e},useState:Fl,useDebugValue:Ps,useDeferredValue:function(e){return Je().memoizedState=e},useTransition:function(){var e=Fl(!1),t=e[0];return e=df.bind(null,e[1]),Je().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=q,a=Je();if(Y){if(n===void 0)throw Error(E(407));n=n()}else{if(n=t(),ae===null)throw Error(E(349));en&30||Hd(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,_l(Vd.bind(null,r,o,e),[e]),r.flags|=2048,Dr(9,Wd.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Je(),t=ae.identifierPrefix;if(Y){var n=lt,r=st;n=(r&~(1<<32-Ke(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Ir++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=cf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},ff={readContext:Ue,useCallback:Gd,useContext:Ue,useEffect:Es,useImperativeHandle:Zd,useInsertionEffect:Qd,useLayoutEffect:Kd,useMemo:Jd,useReducer:Ba,useRef:Yd,useState:function(){return Ba(Ar)},useDebugValue:Ps,useDeferredValue:function(e){var t=He();return eu(t,ne.memoizedState,e)},useTransition:function(){var e=Ba(Ar)[0],t=He().memoizedState;return[e,t]},useMutableSource:Od,useSyncExternalStore:Ud,useId:tu,unstable_isNewReconciler:!1},hf={readContext:Ue,useCallback:Gd,useContext:Ue,useEffect:Es,useImperativeHandle:Zd,useInsertionEffect:Qd,useLayoutEffect:Kd,useMemo:Jd,useReducer:Fa,useRef:Yd,useState:function(){return Fa(Ar)},useDebugValue:Ps,useDeferredValue:function(e){var t=He();return ne===null?t.memoizedState=e:eu(t,ne.memoizedState,e)},useTransition:function(){var e=Fa(Ar)[0],t=He().memoizedState;return[e,t]},useMutableSource:Od,useSyncExternalStore:Ud,useId:tu,unstable_isNewReconciler:!1};function Xe(e,t){if(e&&e.defaultProps){t=Z({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function So(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Z({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ia={isMounted:function(e){return(e=e._reactInternals)?an(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=he(),a=It(e),o=ct(r,a);o.payload=t,n!=null&&(o.callback=n),t=Et(e,o,a),t!==null&&(qe(t,e,a,r),gi(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=he(),a=It(e),o=ct(r,a);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Et(e,o,a),t!==null&&(qe(t,e,a,r),gi(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=he(),r=It(e),a=ct(n,r);a.tag=2,t!=null&&(a.callback=t),t=Et(e,a,r),t!==null&&(qe(t,e,r,n),gi(t,e,r))}};function Ol(e,t,n,r,a,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!Sr(n,r)||!Sr(a,o):!0}function au(e,t,n){var r=!1,a=Rt,o=t.contextType;return typeof o=="object"&&o!==null?o=Ue(o):(a=je(t)?Gt:pe.current,r=t.contextTypes,o=(r=r!=null)?An(e,a):Rt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ia,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function Ul(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ia.enqueueReplaceState(t,t.state,null)}function Co(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},ks(e);var o=t.contextType;typeof o=="object"&&o!==null?a.context=Ue(o):(o=je(t)?Gt:pe.current,a.context=An(e,o)),a.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(So(e,t,o,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&ia.enqueueReplaceState(a,a.state,null),Fi(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Rn(e,t){try{var n="",r=t;do n+=Hp(r),r=r.return;while(r);var a=n}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:a,digest:null}}function _a(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function No(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var gf=typeof WeakMap=="function"?WeakMap:Map;function ou(e,t,n){n=ct(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Wi||(Wi=!0,To=r),No(e,t)},n}function su(e,t,n){n=ct(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){No(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){No(e,t),typeof r!="function"&&(Pt===null?Pt=new Set([this]):Pt.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function Hl(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new gf;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=If.bind(null,e,t,n),t.then(e,e))}function Wl(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Vl(e,t,n,r,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ct(-1,1),t.tag=2,Et(n,t,1))),n.lanes|=1),e)}var xf=ft.ReactCurrentOwner,we=!1;function me(e,t,n,r){t.child=e===null?Td(t,null,n,r):Ln(t,e.child,n,r)}function $l(e,t,n,r,a){n=n.render;var o=t.ref;return zn(t,a),r=Ns(e,t,n,r,o,a),n=zs(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,mt(e,t,a)):(Y&&n&&fs(t),t.flags|=1,me(e,t,r,a),t.child)}function Xl(e,t,n,r,a){if(e===null){var o=n.type;return typeof o=="function"&&!Bs(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,lu(e,t,o,r,a)):(e=ji(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&a)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:Sr,n(s,r)&&e.ref===t.ref)return mt(e,t,a)}return t.flags|=1,e=At(o,r),e.ref=t.ref,e.return=t,t.child=e}function lu(e,t,n,r,a){if(e!==null){var o=e.memoizedProps;if(Sr(o,r)&&e.ref===t.ref)if(we=!1,t.pendingProps=r=o,(e.lanes&a)!==0)e.flags&131072&&(we=!0);else return t.lanes=e.lanes,mt(e,t,a)}return zo(e,t,n,r,a)}function cu(e,t,n){var r=t.pendingProps,a=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},V(jn,ze),ze|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,V(jn,ze),ze|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,V(jn,ze),ze|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,V(jn,ze),ze|=r;return me(e,t,a,n),t.child}function du(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function zo(e,t,n,r,a){var o=je(n)?Gt:pe.current;return o=An(t,o),zn(t,a),n=Ns(e,t,n,r,o,a),r=zs(),e!==null&&!we?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,mt(e,t,a)):(Y&&r&&fs(t),t.flags|=1,me(e,t,n,a),t.child)}function Yl(e,t,n,r,a){if(je(n)){var o=!0;Li(t)}else o=!1;if(zn(t,a),t.stateNode===null)vi(e,t),au(t,n,r),Co(t,n,r,a),r=!0;else if(e===null){var s=t.stateNode,l=t.memoizedProps;s.props=l;var c=s.context,d=n.contextType;typeof d=="object"&&d!==null?d=Ue(d):(d=je(n)?Gt:pe.current,d=An(t,d));var h=n.getDerivedStateFromProps,m=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function";m||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==r||c!==d)&&Ul(t,s,r,d),yt=!1;var g=t.memoizedState;s.state=g,Fi(t,r,s,a),c=t.memoizedState,l!==r||g!==c||ke.current||yt?(typeof h=="function"&&(So(t,n,h,r),c=t.memoizedState),(l=yt||Ol(t,n,l,r,g,c,d))?(m||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),s.props=r,s.state=c,s.context=d,r=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,Fd(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:Xe(t.type,l),s.props=d,m=t.pendingProps,g=s.context,c=n.contextType,typeof c=="object"&&c!==null?c=Ue(c):(c=je(n)?Gt:pe.current,c=An(t,c));var j=n.getDerivedStateFromProps;(h=typeof j=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==m||g!==c)&&Ul(t,s,r,c),yt=!1,g=t.memoizedState,s.state=g,Fi(t,r,s,a);var w=t.memoizedState;l!==m||g!==w||ke.current||yt?(typeof j=="function"&&(So(t,n,j,r),w=t.memoizedState),(d=yt||Ol(t,n,d,r,g,w,c)||!1)?(h||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,w,c),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,w,c)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),s.props=r,s.state=w,s.context=c,r=d):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return Eo(e,t,n,r,o,a)}function Eo(e,t,n,r,a,o){du(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return a&&Dl(t,n,!1),mt(e,t,o);r=t.stateNode,xf.current=t;var l=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=Ln(t,e.child,null,o),t.child=Ln(t,null,l,o)):me(e,t,l,o),t.memoizedState=r.state,a&&Dl(t,n,!0),t.child}function uu(e){var t=e.stateNode;t.pendingContext?Al(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Al(e,t.context,!1),js(e,t.containerInfo)}function Ql(e,t,n,r,a){return Dn(),gs(a),t.flags|=256,me(e,t,n,r),t.child}var Po={dehydrated:null,treeContext:null,retryLane:0};function Io(e){return{baseLanes:e,cachePool:null,transitions:null}}function pu(e,t,n){var r=t.pendingProps,a=K.current,o=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(a&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),V(K,a&1),e===null)return jo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=sa(s,r,0,null),e=Kt(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Io(n),t.memoizedState=Po,e):Is(t,s));if(a=e.memoizedState,a!==null&&(l=a.dehydrated,l!==null))return yf(e,t,s,r,l,a,n);if(o){o=r.fallback,s=t.mode,a=e.child,l=a.sibling;var c={mode:"hidden",children:r.children};return!(s&1)&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=At(a,c),r.subtreeFlags=a.subtreeFlags&14680064),l!==null?o=At(l,o):(o=Kt(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?Io(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=Po,r}return o=e.child,e=o.sibling,r=At(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Is(e,t){return t=sa({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ri(e,t,n,r){return r!==null&&gs(r),Ln(t,e.child,null,n),e=Is(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function yf(e,t,n,r,a,o,s){if(n)return t.flags&256?(t.flags&=-257,r=_a(Error(E(422))),ri(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,a=t.mode,r=sa({mode:"visible",children:r.children},a,0,null),o=Kt(o,a,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Ln(t,e.child,null,s),t.child.memoizedState=Io(s),t.memoizedState=Po,o);if(!(t.mode&1))return ri(e,t,s,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(E(419)),r=_a(o,r,void 0),ri(e,t,s,r)}if(l=(s&e.childLanes)!==0,we||l){if(r=ae,r!==null){switch(s&-s){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(r.suspendedLanes|s)?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,pt(e,a),qe(r,e,a,-1))}return Ts(),r=_a(Error(E(421))),ri(e,t,s,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Af.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,Ee=zt(a.nextSibling),Pe=t,Y=!0,Qe=null,e!==null&&(Re[Te++]=st,Re[Te++]=lt,Re[Te++]=Jt,st=e.id,lt=e.overflow,Jt=t),t=Is(t,r.children),t.flags|=4096,t)}function Kl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),bo(e.return,t,n)}function Oa(e,t,n,r,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=a)}function mu(e,t,n){var r=t.pendingProps,a=r.revealOrder,o=r.tail;if(me(e,t,r.children,n),r=K.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Kl(e,n,t);else if(e.tag===19)Kl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(V(K,r),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&_i(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Oa(t,!1,a,n,o);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&_i(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Oa(t,!0,n,null,o);break;case"together":Oa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function vi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function mt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),tn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(E(153));if(t.child!==null){for(e=t.child,n=At(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=At(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function vf(e,t,n){switch(t.tag){case 3:uu(t),Dn();break;case 5:_d(t);break;case 1:je(t.type)&&Li(t);break;case 4:js(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;V(Ti,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(V(K,K.current&1),t.flags|=128,null):n&t.child.childLanes?pu(e,t,n):(V(K,K.current&1),e=mt(e,t,n),e!==null?e.sibling:null);V(K,K.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return mu(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),V(K,K.current),r)break;return null;case 22:case 23:return t.lanes=0,cu(e,t,n)}return mt(e,t,n)}var fu,Ao,hu,gu;fu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ao=function(){};hu=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,Xt(nt.current);var o=null;switch(n){case"input":a=Ga(e,a),r=Ga(e,r),o=[];break;case"select":a=Z({},a,{value:void 0}),r=Z({},r,{value:void 0}),o=[];break;case"textarea":a=to(e,a),r=to(e,r),o=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ai)}ro(n,r);var s;n=null;for(d in a)if(!r.hasOwnProperty(d)&&a.hasOwnProperty(d)&&a[d]!=null)if(d==="style"){var l=a[d];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(xr.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in r){var c=r[d];if(l=a!=null?a[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(s in l)!l.hasOwnProperty(s)||c&&c.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in c)c.hasOwnProperty(s)&&l[s]!==c[s]&&(n||(n={}),n[s]=c[s])}else n||(o||(o=[]),o.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(xr.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&$("scroll",e),o||l===c||(o=[])):(o=o||[]).push(d,c))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};gu=function(e,t,n,r){n!==r&&(t.flags|=4)};function er(e,t){if(!Y)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function de(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function wf(e,t,n){var r=t.pendingProps;switch(hs(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return de(t),null;case 1:return je(t.type)&&Di(),de(t),null;case 3:return r=t.stateNode,Mn(),X(ke),X(pe),Ss(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ti(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Qe!==null&&(_o(Qe),Qe=null))),Ao(e,t),de(t),null;case 5:bs(t);var a=Xt(Pr.current);if(n=t.type,e!==null&&t.stateNode!=null)hu(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(E(166));return de(t),null}if(e=Xt(nt.current),ti(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[et]=t,r[zr]=o,e=(t.mode&1)!==0,n){case"dialog":$("cancel",r),$("close",r);break;case"iframe":case"object":case"embed":$("load",r);break;case"video":case"audio":for(a=0;a<or.length;a++)$(or[a],r);break;case"source":$("error",r);break;case"img":case"image":case"link":$("error",r),$("load",r);break;case"details":$("toggle",r);break;case"input":il(r,o),$("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},$("invalid",r);break;case"textarea":ol(r,o),$("invalid",r)}ro(n,o),a=null;for(var s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&ei(r.textContent,l,e),a=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&ei(r.textContent,l,e),a=["children",""+l]):xr.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&$("scroll",r)}switch(n){case"input":Xr(r),al(r,o,!0);break;case"textarea":Xr(r),sl(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Ai)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Vc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[et]=t,e[zr]=r,fu(e,t,!1,!1),t.stateNode=e;e:{switch(s=io(n,r),n){case"dialog":$("cancel",e),$("close",e),a=r;break;case"iframe":case"object":case"embed":$("load",e),a=r;break;case"video":case"audio":for(a=0;a<or.length;a++)$(or[a],e);a=r;break;case"source":$("error",e),a=r;break;case"img":case"image":case"link":$("error",e),$("load",e),a=r;break;case"details":$("toggle",e),a=r;break;case"input":il(e,r),a=Ga(e,r),$("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=Z({},r,{value:void 0}),$("invalid",e);break;case"textarea":ol(e,r),a=to(e,r),$("invalid",e);break;default:a=r}ro(n,a),l=a;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?Yc(e,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&$c(e,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&yr(e,c):typeof c=="number"&&yr(e,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(xr.hasOwnProperty(o)?c!=null&&o==="onScroll"&&$("scroll",e):c!=null&&es(e,o,c,s))}switch(n){case"input":Xr(e),al(e,r,!1);break;case"textarea":Xr(e),sl(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Mt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?bn(e,!!r.multiple,o,!1):r.defaultValue!=null&&bn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Ai)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return de(t),null;case 6:if(e&&t.stateNode!=null)gu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(E(166));if(n=Xt(Pr.current),Xt(nt.current),ti(t)){if(r=t.stateNode,n=t.memoizedProps,r[et]=t,(o=r.nodeValue!==n)&&(e=Pe,e!==null))switch(e.tag){case 3:ei(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ei(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[et]=t,t.stateNode=r}return de(t),null;case 13:if(X(K),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Y&&Ee!==null&&t.mode&1&&!(t.flags&128))Md(),Dn(),t.flags|=98560,o=!1;else if(o=ti(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(E(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(E(317));o[et]=t}else Dn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;de(t),o=!1}else Qe!==null&&(_o(Qe),Qe=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||K.current&1?re===0&&(re=3):Ts())),t.updateQueue!==null&&(t.flags|=4),de(t),null);case 4:return Mn(),Ao(e,t),e===null&&Cr(t.stateNode.containerInfo),de(t),null;case 10:return vs(t.type._context),de(t),null;case 17:return je(t.type)&&Di(),de(t),null;case 19:if(X(K),o=t.memoizedState,o===null)return de(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)er(o,!1);else{if(re!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=_i(e),s!==null){for(t.flags|=128,er(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return V(K,K.current&1|2),t.child}e=e.sibling}o.tail!==null&&J()>Tn&&(t.flags|=128,r=!0,er(o,!1),t.lanes=4194304)}else{if(!r)if(e=_i(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),er(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!Y)return de(t),null}else 2*J()-o.renderingStartTime>Tn&&n!==1073741824&&(t.flags|=128,r=!0,er(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=J(),t.sibling=null,n=K.current,V(K,r?n&1|2:n&1),t):(de(t),null);case 22:case 23:return Rs(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ze&1073741824&&(de(t),t.subtreeFlags&6&&(t.flags|=8192)):de(t),null;case 24:return null;case 25:return null}throw Error(E(156,t.tag))}function kf(e,t){switch(hs(t),t.tag){case 1:return je(t.type)&&Di(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Mn(),X(ke),X(pe),Ss(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return bs(t),null;case 13:if(X(K),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(E(340));Dn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return X(K),null;case 4:return Mn(),null;case 10:return vs(t.type._context),null;case 22:case 23:return Rs(),null;case 24:return null;default:return null}}var ii=!1,ue=!1,jf=typeof WeakSet=="function"?WeakSet:Set,L=null;function kn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){G(e,t,r)}else n.current=null}function Do(e,t,n){try{n()}catch(r){G(e,t,r)}}var ql=!1;function bf(e,t){if(ho=Ei,e=kd(),ms(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,l=-1,c=-1,d=0,h=0,m=e,g=null;t:for(;;){for(var j;m!==n||a!==0&&m.nodeType!==3||(l=s+a),m!==o||r!==0&&m.nodeType!==3||(c=s+r),m.nodeType===3&&(s+=m.nodeValue.length),(j=m.firstChild)!==null;)g=m,m=j;for(;;){if(m===e)break t;if(g===n&&++d===a&&(l=s),g===o&&++h===r&&(c=s),(j=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=j}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(go={focusedElem:e,selectionRange:n},Ei=!1,L=t;L!==null;)if(t=L,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,L=e;else for(;L!==null;){t=L;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var b=w.memoizedProps,v=w.memoizedState,p=t.stateNode,u=p.getSnapshotBeforeUpdate(t.elementType===t.type?b:Xe(t.type,b),v);p.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(E(163))}}catch(k){G(t,t.return,k)}if(e=t.sibling,e!==null){e.return=t.return,L=e;break}L=t.return}return w=ql,ql=!1,w}function mr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&Do(t,n,o)}a=a.next}while(a!==r)}}function aa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Lo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function xu(e){var t=e.alternate;t!==null&&(e.alternate=null,xu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[et],delete t[zr],delete t[vo],delete t[af],delete t[of])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function yu(e){return e.tag===5||e.tag===3||e.tag===4}function Zl(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||yu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Mo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ai));else if(r!==4&&(e=e.child,e!==null))for(Mo(e,t,n),e=e.sibling;e!==null;)Mo(e,t,n),e=e.sibling}function Ro(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ro(e,t,n),e=e.sibling;e!==null;)Ro(e,t,n),e=e.sibling}var oe=null,Ye=!1;function gt(e,t,n){for(n=n.child;n!==null;)vu(e,t,n),n=n.sibling}function vu(e,t,n){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(Zi,n)}catch{}switch(n.tag){case 5:ue||kn(n,t);case 6:var r=oe,a=Ye;oe=null,gt(e,t,n),oe=r,Ye=a,oe!==null&&(Ye?(e=oe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):oe.removeChild(n.stateNode));break;case 18:oe!==null&&(Ye?(e=oe,n=n.stateNode,e.nodeType===8?La(e.parentNode,n):e.nodeType===1&&La(e,n),jr(e)):La(oe,n.stateNode));break;case 4:r=oe,a=Ye,oe=n.stateNode.containerInfo,Ye=!0,gt(e,t,n),oe=r,Ye=a;break;case 0:case 11:case 14:case 15:if(!ue&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var o=a,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&Do(n,t,s),a=a.next}while(a!==r)}gt(e,t,n);break;case 1:if(!ue&&(kn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){G(n,t,l)}gt(e,t,n);break;case 21:gt(e,t,n);break;case 22:n.mode&1?(ue=(r=ue)||n.memoizedState!==null,gt(e,t,n),ue=r):gt(e,t,n);break;default:gt(e,t,n)}}function Gl(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new jf),t.forEach(function(r){var a=Df.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function Ve(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var o=e,s=t,l=s;e:for(;l!==null;){switch(l.tag){case 5:oe=l.stateNode,Ye=!1;break e;case 3:oe=l.stateNode.containerInfo,Ye=!0;break e;case 4:oe=l.stateNode.containerInfo,Ye=!0;break e}l=l.return}if(oe===null)throw Error(E(160));vu(o,s,a),oe=null,Ye=!1;var c=a.alternate;c!==null&&(c.return=null),a.return=null}catch(d){G(a,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)wu(t,e),t=t.sibling}function wu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(t,e),Ge(e),r&4){try{mr(3,e,e.return),aa(3,e)}catch(b){G(e,e.return,b)}try{mr(5,e,e.return)}catch(b){G(e,e.return,b)}}break;case 1:Ve(t,e),Ge(e),r&512&&n!==null&&kn(n,n.return);break;case 5:if(Ve(t,e),Ge(e),r&512&&n!==null&&kn(n,n.return),e.flags&32){var a=e.stateNode;try{yr(a,"")}catch(b){G(e,e.return,b)}}if(r&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&Hc(a,o),io(l,s);var d=io(l,o);for(s=0;s<c.length;s+=2){var h=c[s],m=c[s+1];h==="style"?Yc(a,m):h==="dangerouslySetInnerHTML"?$c(a,m):h==="children"?yr(a,m):es(a,h,m,d)}switch(l){case"input":Ja(a,o);break;case"textarea":Wc(a,o);break;case"select":var g=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var j=o.value;j!=null?bn(a,!!o.multiple,j,!1):g!==!!o.multiple&&(o.defaultValue!=null?bn(a,!!o.multiple,o.defaultValue,!0):bn(a,!!o.multiple,o.multiple?[]:"",!1))}a[zr]=o}catch(b){G(e,e.return,b)}}break;case 6:if(Ve(t,e),Ge(e),r&4){if(e.stateNode===null)throw Error(E(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(b){G(e,e.return,b)}}break;case 3:if(Ve(t,e),Ge(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{jr(t.containerInfo)}catch(b){G(e,e.return,b)}break;case 4:Ve(t,e),Ge(e);break;case 13:Ve(t,e),Ge(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(Ls=J())),r&4&&Gl(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(ue=(d=ue)||h,Ve(t,e),ue=d):Ve(t,e),Ge(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!h&&e.mode&1)for(L=e,h=e.child;h!==null;){for(m=L=h;L!==null;){switch(g=L,j=g.child,g.tag){case 0:case 11:case 14:case 15:mr(4,g,g.return);break;case 1:kn(g,g.return);var w=g.stateNode;if(typeof w.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(b){G(r,n,b)}}break;case 5:kn(g,g.return);break;case 22:if(g.memoizedState!==null){ec(m);continue}}j!==null?(j.return=g,L=j):ec(m)}h=h.sibling}e:for(h=null,m=e;;){if(m.tag===5){if(h===null){h=m;try{a=m.stateNode,d?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=m.stateNode,c=m.memoizedProps.style,s=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Xc("display",s))}catch(b){G(e,e.return,b)}}}else if(m.tag===6){if(h===null)try{m.stateNode.nodeValue=d?"":m.memoizedProps}catch(b){G(e,e.return,b)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;h===m&&(h=null),m=m.return}h===m&&(h=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ve(t,e),Ge(e),r&4&&Gl(e);break;case 21:break;default:Ve(t,e),Ge(e)}}function Ge(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(yu(n)){var r=n;break e}n=n.return}throw Error(E(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(yr(a,""),r.flags&=-33);var o=Zl(e);Ro(e,o,a);break;case 3:case 4:var s=r.stateNode.containerInfo,l=Zl(e);Mo(e,l,s);break;default:throw Error(E(161))}}catch(c){G(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sf(e,t,n){L=e,ku(e)}function ku(e,t,n){for(var r=(e.mode&1)!==0;L!==null;){var a=L,o=a.child;if(a.tag===22&&r){var s=a.memoizedState!==null||ii;if(!s){var l=a.alternate,c=l!==null&&l.memoizedState!==null||ue;l=ii;var d=ue;if(ii=s,(ue=c)&&!d)for(L=a;L!==null;)s=L,c=s.child,s.tag===22&&s.memoizedState!==null?tc(a):c!==null?(c.return=s,L=c):tc(a);for(;o!==null;)L=o,ku(o),o=o.sibling;L=a,ii=l,ue=d}Jl(e)}else a.subtreeFlags&8772&&o!==null?(o.return=a,L=o):Jl(e)}}function Jl(e){for(;L!==null;){var t=L;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ue||aa(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ue)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:Xe(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Bl(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Bl(t,s,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var h=d.memoizedState;if(h!==null){var m=h.dehydrated;m!==null&&jr(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(E(163))}ue||t.flags&512&&Lo(t)}catch(g){G(t,t.return,g)}}if(t===e){L=null;break}if(n=t.sibling,n!==null){n.return=t.return,L=n;break}L=t.return}}function ec(e){for(;L!==null;){var t=L;if(t===e){L=null;break}var n=t.sibling;if(n!==null){n.return=t.return,L=n;break}L=t.return}}function tc(e){for(;L!==null;){var t=L;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{aa(4,t)}catch(c){G(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(c){G(t,a,c)}}var o=t.return;try{Lo(t)}catch(c){G(t,o,c)}break;case 5:var s=t.return;try{Lo(t)}catch(c){G(t,s,c)}}}catch(c){G(t,t.return,c)}if(t===e){L=null;break}var l=t.sibling;if(l!==null){l.return=t.return,L=l;break}L=t.return}}var Cf=Math.ceil,Hi=ft.ReactCurrentDispatcher,As=ft.ReactCurrentOwner,Oe=ft.ReactCurrentBatchConfig,H=0,ae=null,ee=null,se=0,ze=0,jn=Ft(0),re=0,Lr=null,tn=0,oa=0,Ds=0,fr=null,ve=null,Ls=0,Tn=1/0,at=null,Wi=!1,To=null,Pt=null,ai=!1,jt=null,Vi=0,hr=0,Bo=null,wi=-1,ki=0;function he(){return H&6?J():wi!==-1?wi:wi=J()}function It(e){return e.mode&1?H&2&&se!==0?se&-se:lf.transition!==null?(ki===0&&(ki=ad()),ki):(e=W,e!==0||(e=window.event,e=e===void 0?16:pd(e.type)),e):1}function qe(e,t,n,r){if(50<hr)throw hr=0,Bo=null,Error(E(185));Fr(e,n,r),(!(H&2)||e!==ae)&&(e===ae&&(!(H&2)&&(oa|=n),re===4&&wt(e,se)),be(e,r),n===1&&H===0&&!(t.mode&1)&&(Tn=J()+500,na&&_t()))}function be(e,t){var n=e.callbackNode;sm(e,t);var r=zi(e,e===ae?se:0);if(r===0)n!==null&&dl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&dl(n),t===1)e.tag===0?sf(nc.bind(null,e)):Ad(nc.bind(null,e)),nf(function(){!(H&6)&&_t()}),n=null;else{switch(od(r)){case 1:n=as;break;case 4:n=rd;break;case 16:n=Ni;break;case 536870912:n=id;break;default:n=Ni}n=Pu(n,ju.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ju(e,t){if(wi=-1,ki=0,H&6)throw Error(E(327));var n=e.callbackNode;if(En()&&e.callbackNode!==n)return null;var r=zi(e,e===ae?se:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=$i(e,r);else{t=r;var a=H;H|=2;var o=Su();(ae!==e||se!==t)&&(at=null,Tn=J()+500,Qt(e,t));do try{Ef();break}catch(l){bu(e,l)}while(1);ys(),Hi.current=o,H=a,ee!==null?t=0:(ae=null,se=0,t=re)}if(t!==0){if(t===2&&(a=co(e),a!==0&&(r=a,t=Fo(e,a))),t===1)throw n=Lr,Qt(e,0),wt(e,r),be(e,J()),n;if(t===6)wt(e,r);else{if(a=e.current.alternate,!(r&30)&&!Nf(a)&&(t=$i(e,r),t===2&&(o=co(e),o!==0&&(r=o,t=Fo(e,o))),t===1))throw n=Lr,Qt(e,0),wt(e,r),be(e,J()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(E(345));case 2:Wt(e,ve,at);break;case 3:if(wt(e,r),(r&130023424)===r&&(t=Ls+500-J(),10<t)){if(zi(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){he(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=yo(Wt.bind(null,e,ve,at),t);break}Wt(e,ve,at);break;case 4:if(wt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var s=31-Ke(r);o=1<<s,s=t[s],s>a&&(a=s),r&=~o}if(r=a,r=J()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Cf(r/1960))-r,10<r){e.timeoutHandle=yo(Wt.bind(null,e,ve,at),r);break}Wt(e,ve,at);break;case 5:Wt(e,ve,at);break;default:throw Error(E(329))}}}return be(e,J()),e.callbackNode===n?ju.bind(null,e):null}function Fo(e,t){var n=fr;return e.current.memoizedState.isDehydrated&&(Qt(e,t).flags|=256),e=$i(e,t),e!==2&&(t=ve,ve=n,t!==null&&_o(t)),e}function _o(e){ve===null?ve=e:ve.push.apply(ve,e)}function Nf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],o=a.getSnapshot;a=a.value;try{if(!Ze(o(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function wt(e,t){for(t&=~Ds,t&=~oa,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ke(t),r=1<<n;e[n]=-1,t&=~r}}function nc(e){if(H&6)throw Error(E(327));En();var t=zi(e,0);if(!(t&1))return be(e,J()),null;var n=$i(e,t);if(e.tag!==0&&n===2){var r=co(e);r!==0&&(t=r,n=Fo(e,r))}if(n===1)throw n=Lr,Qt(e,0),wt(e,t),be(e,J()),n;if(n===6)throw Error(E(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Wt(e,ve,at),be(e,J()),null}function Ms(e,t){var n=H;H|=1;try{return e(t)}finally{H=n,H===0&&(Tn=J()+500,na&&_t())}}function nn(e){jt!==null&&jt.tag===0&&!(H&6)&&En();var t=H;H|=1;var n=Oe.transition,r=W;try{if(Oe.transition=null,W=1,e)return e()}finally{W=r,Oe.transition=n,H=t,!(H&6)&&_t()}}function Rs(){ze=jn.current,X(jn)}function Qt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,tf(n)),ee!==null)for(n=ee.return;n!==null;){var r=n;switch(hs(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Di();break;case 3:Mn(),X(ke),X(pe),Ss();break;case 5:bs(r);break;case 4:Mn();break;case 13:X(K);break;case 19:X(K);break;case 10:vs(r.type._context);break;case 22:case 23:Rs()}n=n.return}if(ae=e,ee=e=At(e.current,null),se=ze=t,re=0,Lr=null,Ds=oa=tn=0,ve=fr=null,$t!==null){for(t=0;t<$t.length;t++)if(n=$t[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=a,r.next=s}n.pending=r}$t=null}return e}function bu(e,t){do{var n=ee;try{if(ys(),xi.current=Ui,Oi){for(var r=q.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}Oi=!1}if(en=0,ie=ne=q=null,pr=!1,Ir=0,As.current=null,n===null||n.return===null){re=1,Lr=t,ee=null;break}e:{var o=e,s=n.return,l=n,c=t;if(t=se,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,h=l,m=h.tag;if(!(h.mode&1)&&(m===0||m===11||m===15)){var g=h.alternate;g?(h.updateQueue=g.updateQueue,h.memoizedState=g.memoizedState,h.lanes=g.lanes):(h.updateQueue=null,h.memoizedState=null)}var j=Wl(s);if(j!==null){j.flags&=-257,Vl(j,s,l,o,t),j.mode&1&&Hl(o,d,t),t=j,c=d;var w=t.updateQueue;if(w===null){var b=new Set;b.add(c),t.updateQueue=b}else w.add(c);break e}else{if(!(t&1)){Hl(o,d,t),Ts();break e}c=Error(E(426))}}else if(Y&&l.mode&1){var v=Wl(s);if(v!==null){!(v.flags&65536)&&(v.flags|=256),Vl(v,s,l,o,t),gs(Rn(c,l));break e}}o=c=Rn(c,l),re!==4&&(re=2),fr===null?fr=[o]:fr.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var p=ou(o,c,t);Tl(o,p);break e;case 1:l=c;var u=o.type,f=o.stateNode;if(!(o.flags&128)&&(typeof u.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Pt===null||!Pt.has(f)))){o.flags|=65536,t&=-t,o.lanes|=t;var k=su(o,l,t);Tl(o,k);break e}}o=o.return}while(o!==null)}Nu(n)}catch(z){t=z,ee===n&&n!==null&&(ee=n=n.return);continue}break}while(1)}function Su(){var e=Hi.current;return Hi.current=Ui,e===null?Ui:e}function Ts(){(re===0||re===3||re===2)&&(re=4),ae===null||!(tn&268435455)&&!(oa&268435455)||wt(ae,se)}function $i(e,t){var n=H;H|=2;var r=Su();(ae!==e||se!==t)&&(at=null,Qt(e,t));do try{zf();break}catch(a){bu(e,a)}while(1);if(ys(),H=n,Hi.current=r,ee!==null)throw Error(E(261));return ae=null,se=0,re}function zf(){for(;ee!==null;)Cu(ee)}function Ef(){for(;ee!==null&&!Gp();)Cu(ee)}function Cu(e){var t=Eu(e.alternate,e,ze);e.memoizedProps=e.pendingProps,t===null?Nu(e):ee=t,As.current=null}function Nu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=kf(n,t),n!==null){n.flags&=32767,ee=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{re=6,ee=null;return}}else if(n=wf(n,t,ze),n!==null){ee=n;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);re===0&&(re=5)}function Wt(e,t,n){var r=W,a=Oe.transition;try{Oe.transition=null,W=1,Pf(e,t,n,r)}finally{Oe.transition=a,W=r}return null}function Pf(e,t,n,r){do En();while(jt!==null);if(H&6)throw Error(E(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(E(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(lm(e,o),e===ae&&(ee=ae=null,se=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ai||(ai=!0,Pu(Ni,function(){return En(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Oe.transition,Oe.transition=null;var s=W;W=1;var l=H;H|=4,As.current=null,bf(e,n),wu(n,e),Qm(go),Ei=!!ho,go=ho=null,e.current=n,Sf(n),Jp(),H=l,W=s,Oe.transition=o}else e.current=n;if(ai&&(ai=!1,jt=e,Vi=a),o=e.pendingLanes,o===0&&(Pt=null),nm(n.stateNode),be(e,J()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(Wi)throw Wi=!1,e=To,To=null,e;return Vi&1&&e.tag!==0&&En(),o=e.pendingLanes,o&1?e===Bo?hr++:(hr=0,Bo=e):hr=0,_t(),null}function En(){if(jt!==null){var e=od(Vi),t=Oe.transition,n=W;try{if(Oe.transition=null,W=16>e?16:e,jt===null)var r=!1;else{if(e=jt,jt=null,Vi=0,H&6)throw Error(E(331));var a=H;for(H|=4,L=e.current;L!==null;){var o=L,s=o.child;if(L.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(L=d;L!==null;){var h=L;switch(h.tag){case 0:case 11:case 15:mr(8,h,o)}var m=h.child;if(m!==null)m.return=h,L=m;else for(;L!==null;){h=L;var g=h.sibling,j=h.return;if(xu(h),h===d){L=null;break}if(g!==null){g.return=j,L=g;break}L=j}}}var w=o.alternate;if(w!==null){var b=w.child;if(b!==null){w.child=null;do{var v=b.sibling;b.sibling=null,b=v}while(b!==null)}}L=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,L=s;else e:for(;L!==null;){if(o=L,o.flags&2048)switch(o.tag){case 0:case 11:case 15:mr(9,o,o.return)}var p=o.sibling;if(p!==null){p.return=o.return,L=p;break e}L=o.return}}var u=e.current;for(L=u;L!==null;){s=L;var f=s.child;if(s.subtreeFlags&2064&&f!==null)f.return=s,L=f;else e:for(s=u;L!==null;){if(l=L,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:aa(9,l)}}catch(z){G(l,l.return,z)}if(l===s){L=null;break e}var k=l.sibling;if(k!==null){k.return=l.return,L=k;break e}L=l.return}}if(H=a,_t(),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(Zi,e)}catch{}r=!0}return r}finally{W=n,Oe.transition=t}}return!1}function rc(e,t,n){t=Rn(n,t),t=ou(e,t,1),e=Et(e,t,1),t=he(),e!==null&&(Fr(e,1,t),be(e,t))}function G(e,t,n){if(e.tag===3)rc(e,e,n);else for(;t!==null;){if(t.tag===3){rc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Pt===null||!Pt.has(r))){e=Rn(n,e),e=su(t,e,1),t=Et(t,e,1),e=he(),t!==null&&(Fr(t,1,e),be(t,e));break}}t=t.return}}function If(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=he(),e.pingedLanes|=e.suspendedLanes&n,ae===e&&(se&n)===n&&(re===4||re===3&&(se&130023424)===se&&500>J()-Ls?Qt(e,0):Ds|=n),be(e,t)}function zu(e,t){t===0&&(e.mode&1?(t=Kr,Kr<<=1,!(Kr&130023424)&&(Kr=4194304)):t=1);var n=he();e=pt(e,t),e!==null&&(Fr(e,t,n),be(e,n))}function Af(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),zu(e,n)}function Df(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(E(314))}r!==null&&r.delete(t),zu(e,n)}var Eu;Eu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ke.current)we=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return we=!1,vf(e,t,n);we=!!(e.flags&131072)}else we=!1,Y&&t.flags&1048576&&Dd(t,Ri,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;vi(e,t),e=t.pendingProps;var a=An(t,pe.current);zn(t,n),a=Ns(null,t,r,e,a,n);var o=zs();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,je(r)?(o=!0,Li(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,ks(t),a.updater=ia,t.stateNode=a,a._reactInternals=t,Co(t,r,e,n),t=Eo(null,t,r,!0,o,n)):(t.tag=0,Y&&o&&fs(t),me(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(vi(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Mf(r),e=Xe(r,e),a){case 0:t=zo(null,t,r,e,n);break e;case 1:t=Yl(null,t,r,e,n);break e;case 11:t=$l(null,t,r,e,n);break e;case 14:t=Xl(null,t,r,Xe(r.type,e),n);break e}throw Error(E(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Xe(r,a),zo(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Xe(r,a),Yl(e,t,r,a,n);case 3:e:{if(uu(t),e===null)throw Error(E(387));r=t.pendingProps,o=t.memoizedState,a=o.element,Fd(e,t),Fi(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=Rn(Error(E(423)),t),t=Ql(e,t,r,n,a);break e}else if(r!==a){a=Rn(Error(E(424)),t),t=Ql(e,t,r,n,a);break e}else for(Ee=zt(t.stateNode.containerInfo.firstChild),Pe=t,Y=!0,Qe=null,n=Td(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Dn(),r===a){t=mt(e,t,n);break e}me(e,t,r,n)}t=t.child}return t;case 5:return _d(t),e===null&&jo(t),r=t.type,a=t.pendingProps,o=e!==null?e.memoizedProps:null,s=a.children,xo(r,a)?s=null:o!==null&&xo(r,o)&&(t.flags|=32),du(e,t),me(e,t,s,n),t.child;case 6:return e===null&&jo(t),null;case 13:return pu(e,t,n);case 4:return js(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ln(t,null,r,n):me(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Xe(r,a),$l(e,t,r,a,n);case 7:return me(e,t,t.pendingProps,n),t.child;case 8:return me(e,t,t.pendingProps.children,n),t.child;case 12:return me(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,o=t.memoizedProps,s=a.value,V(Ti,r._currentValue),r._currentValue=s,o!==null)if(Ze(o.value,s)){if(o.children===a.children&&!ke.current){t=mt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){s=o.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(o.tag===1){c=ct(-1,n&-n),c.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var h=d.pending;h===null?c.next=c:(c.next=h.next,h.next=c),d.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),bo(o.return,n,t),l.lanes|=n;break}c=c.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(E(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),bo(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}me(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,zn(t,n),a=Ue(a),r=r(a),t.flags|=1,me(e,t,r,n),t.child;case 14:return r=t.type,a=Xe(r,t.pendingProps),a=Xe(r.type,a),Xl(e,t,r,a,n);case 15:return lu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Xe(r,a),vi(e,t),t.tag=1,je(r)?(e=!0,Li(t)):e=!1,zn(t,n),au(t,r,a),Co(t,r,a,n),Eo(null,t,r,!0,e,n);case 19:return mu(e,t,n);case 22:return cu(e,t,n)}throw Error(E(156,t.tag))};function Pu(e,t){return nd(e,t)}function Lf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fe(e,t,n,r){return new Lf(e,t,n,r)}function Bs(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mf(e){if(typeof e=="function")return Bs(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ns)return 11;if(e===rs)return 14}return 2}function At(e,t){var n=e.alternate;return n===null?(n=Fe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ji(e,t,n,r,a,o){var s=2;if(r=e,typeof e=="function")Bs(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case pn:return Kt(n.children,a,o,t);case ts:s=8,a|=8;break;case Qa:return e=Fe(12,n,t,a|2),e.elementType=Qa,e.lanes=o,e;case Ka:return e=Fe(13,n,t,a),e.elementType=Ka,e.lanes=o,e;case qa:return e=Fe(19,n,t,a),e.elementType=qa,e.lanes=o,e;case _c:return sa(n,a,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Bc:s=10;break e;case Fc:s=9;break e;case ns:s=11;break e;case rs:s=14;break e;case xt:s=16,r=null;break e}throw Error(E(130,e==null?e:typeof e,""))}return t=Fe(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Kt(e,t,n,r){return e=Fe(7,e,r,t),e.lanes=n,e}function sa(e,t,n,r){return e=Fe(22,e,r,t),e.elementType=_c,e.lanes=n,e.stateNode={isHidden:!1},e}function Ua(e,t,n){return e=Fe(6,e,null,t),e.lanes=n,e}function Ha(e,t,n){return t=Fe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Rf(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ja(0),this.expirationTimes=ja(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ja(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Fs(e,t,n,r,a,o,s,l,c){return e=new Rf(e,t,n,l,c),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Fe(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ks(o),e}function Tf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:un,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Iu(e){if(!e)return Rt;e=e._reactInternals;e:{if(an(e)!==e||e.tag!==1)throw Error(E(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(je(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(E(171))}if(e.tag===1){var n=e.type;if(je(n))return Id(e,n,t)}return t}function Au(e,t,n,r,a,o,s,l,c){return e=Fs(n,r,!0,e,a,o,s,l,c),e.context=Iu(null),n=e.current,r=he(),a=It(n),o=ct(r,a),o.callback=t??null,Et(n,o,a),e.current.lanes=a,Fr(e,a,r),be(e,r),e}function la(e,t,n,r){var a=t.current,o=he(),s=It(a);return n=Iu(n),t.context===null?t.context=n:t.pendingContext=n,t=ct(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Et(a,t,s),e!==null&&(qe(e,a,s,o),gi(e,a,s)),s}function Xi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ic(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function _s(e,t){ic(e,t),(e=e.alternate)&&ic(e,t)}function Bf(){return null}var Du=typeof reportError=="function"?reportError:function(e){console.error(e)};function Os(e){this._internalRoot=e}ca.prototype.render=Os.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(E(409));la(e,t,null,null)};ca.prototype.unmount=Os.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;nn(function(){la(null,e,null,null)}),t[ut]=null}};function ca(e){this._internalRoot=e}ca.prototype.unstable_scheduleHydration=function(e){if(e){var t=cd();e={blockedOn:null,target:e,priority:t};for(var n=0;n<vt.length&&t!==0&&t<vt[n].priority;n++);vt.splice(n,0,e),n===0&&ud(e)}};function Us(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function da(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ac(){}function Ff(e,t,n,r,a){if(a){if(typeof r=="function"){var o=r;r=function(){var d=Xi(s);o.call(d)}}var s=Au(t,r,e,0,null,!1,!1,"",ac);return e._reactRootContainer=s,e[ut]=s.current,Cr(e.nodeType===8?e.parentNode:e),nn(),s}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var l=r;r=function(){var d=Xi(c);l.call(d)}}var c=Fs(e,0,!1,null,null,!1,!1,"",ac);return e._reactRootContainer=c,e[ut]=c.current,Cr(e.nodeType===8?e.parentNode:e),nn(function(){la(t,c,n,r)}),c}function ua(e,t,n,r,a){var o=n._reactRootContainer;if(o){var s=o;if(typeof a=="function"){var l=a;a=function(){var c=Xi(s);l.call(c)}}la(t,s,e,a)}else s=Ff(n,t,e,a,r);return Xi(s)}sd=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ar(t.pendingLanes);n!==0&&(os(t,n|1),be(t,J()),!(H&6)&&(Tn=J()+500,_t()))}break;case 13:nn(function(){var r=pt(e,1);if(r!==null){var a=he();qe(r,e,1,a)}}),_s(e,1)}};ss=function(e){if(e.tag===13){var t=pt(e,134217728);if(t!==null){var n=he();qe(t,e,134217728,n)}_s(e,134217728)}};ld=function(e){if(e.tag===13){var t=It(e),n=pt(e,t);if(n!==null){var r=he();qe(n,e,t,r)}_s(e,t)}};cd=function(){return W};dd=function(e,t){var n=W;try{return W=e,t()}finally{W=n}};oo=function(e,t,n){switch(t){case"input":if(Ja(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=ta(r);if(!a)throw Error(E(90));Uc(r),Ja(r,a)}}}break;case"textarea":Wc(e,n);break;case"select":t=n.value,t!=null&&bn(e,!!n.multiple,t,!1)}};qc=Ms;Zc=nn;var _f={usingClientEntryPoint:!1,Events:[Or,gn,ta,Qc,Kc,Ms]},tr={findFiberByHostInstance:Vt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Of={bundleType:tr.bundleType,version:tr.version,rendererPackageName:tr.rendererPackageName,rendererConfig:tr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ft.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ed(e),e===null?null:e.stateNode},findFiberByHostInstance:tr.findFiberByHostInstance||Bf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var oi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!oi.isDisabled&&oi.supportsFiber)try{Zi=oi.inject(Of),tt=oi}catch{}}Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_f;Ae.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Us(t))throw Error(E(200));return Tf(e,t,null,n)};Ae.createRoot=function(e,t){if(!Us(e))throw Error(E(299));var n=!1,r="",a=Du;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Fs(e,1,!1,null,null,n,!1,r,a),e[ut]=t.current,Cr(e.nodeType===8?e.parentNode:e),new Os(t)};Ae.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(E(188)):(e=Object.keys(e).join(","),Error(E(268,e)));return e=ed(t),e=e===null?null:e.stateNode,e};Ae.flushSync=function(e){return nn(e)};Ae.hydrate=function(e,t,n){if(!da(t))throw Error(E(200));return ua(null,e,t,!0,n)};Ae.hydrateRoot=function(e,t,n){if(!Us(e))throw Error(E(405));var r=n!=null&&n.hydratedSources||null,a=!1,o="",s=Du;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Au(t,null,e,1,n??null,a,!1,o,s),e[ut]=t.current,Cr(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new ca(t)};Ae.render=function(e,t,n){if(!da(t))throw Error(E(200));return ua(null,e,t,!1,n)};Ae.unmountComponentAtNode=function(e){if(!da(e))throw Error(E(40));return e._reactRootContainer?(nn(function(){ua(null,null,e,!1,function(){e._reactRootContainer=null,e[ut]=null})}),!0):!1};Ae.unstable_batchedUpdates=Ms;Ae.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!da(n))throw Error(E(200));if(e==null||e._reactInternals===void 0)throw Error(E(38));return ua(e,t,n,!1,r)};Ae.version="18.3.1-next-f1338f8080-20240426";function Lu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lu)}catch(e){console.error(e)}}Lu(),Lc.exports=Ae;var Uf=Lc.exports,oc=Uf;Xa.createRoot=oc.createRoot,Xa.hydrateRoot=oc.hydrateRoot;/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Mr(){return Mr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Mr.apply(this,arguments)}var bt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(bt||(bt={}));const sc="popstate";function Hf(e){e===void 0&&(e={});function t(r,a){let{pathname:o,search:s,hash:l}=r.location;return Oo("",{pathname:o,search:s,hash:l},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:Yi(a)}return Vf(t,n,null,e)}function te(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Hs(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Wf(){return Math.random().toString(36).substr(2,8)}function lc(e,t){return{usr:e.state,key:e.key,idx:t}}function Oo(e,t,n,r){return n===void 0&&(n=null),Mr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?On(t):t,{state:n,key:t&&t.key||r||Wf()})}function Yi(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function On(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Vf(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:o=!1}=r,s=a.history,l=bt.Pop,c=null,d=h();d==null&&(d=0,s.replaceState(Mr({},s.state,{idx:d}),""));function h(){return(s.state||{idx:null}).idx}function m(){l=bt.Pop;let v=h(),p=v==null?null:v-d;d=v,c&&c({action:l,location:b.location,delta:p})}function g(v,p){l=bt.Push;let u=Oo(b.location,v,p);n&&n(u,v),d=h()+1;let f=lc(u,d),k=b.createHref(u);try{s.pushState(f,"",k)}catch(z){if(z instanceof DOMException&&z.name==="DataCloneError")throw z;a.location.assign(k)}o&&c&&c({action:l,location:b.location,delta:1})}function j(v,p){l=bt.Replace;let u=Oo(b.location,v,p);n&&n(u,v),d=h();let f=lc(u,d),k=b.createHref(u);s.replaceState(f,"",k),o&&c&&c({action:l,location:b.location,delta:0})}function w(v){let p=a.location.origin!=="null"?a.location.origin:a.location.href,u=typeof v=="string"?v:Yi(v);return u=u.replace(/ $/,"%20"),te(p,"No window.location.(origin|href) available to create URL for href: "+u),new URL(u,p)}let b={get action(){return l},get location(){return e(a,s)},listen(v){if(c)throw new Error("A history only accepts one active listener");return a.addEventListener(sc,m),c=v,()=>{a.removeEventListener(sc,m),c=null}},createHref(v){return t(a,v)},createURL:w,encodeLocation(v){let p=w(v);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:g,replace:j,go(v){return s.go(v)}};return b}var cc;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(cc||(cc={}));function $f(e,t,n){return n===void 0&&(n="/"),Xf(e,t,n,!1)}function Xf(e,t,n,r){let a=typeof t=="string"?On(t):t,o=Ws(a.pathname||"/",n);if(o==null)return null;let s=Mu(e);Yf(s);let l=null;for(let c=0;l==null&&c<s.length;++c){let d=ih(o);l=nh(s[c],d,r)}return l}function Mu(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(o,s,l)=>{let c={relativePath:l===void 0?o.path||"":l,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};c.relativePath.startsWith("/")&&(te(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let d=Dt([r,c.relativePath]),h=n.concat(c);o.children&&o.children.length>0&&(te(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Mu(o.children,t,h,d)),!(o.path==null&&!o.index)&&t.push({path:d,score:eh(d,o.index),routesMeta:h})};return e.forEach((o,s)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))a(o,s);else for(let c of Ru(o.path))a(o,s,c)}),t}function Ru(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return a?[o,""]:[o];let s=Ru(r.join("/")),l=[];return l.push(...s.map(c=>c===""?o:[o,c].join("/"))),a&&l.push(...s),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Yf(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:th(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Qf=/^:[\w-]+$/,Kf=3,qf=2,Zf=1,Gf=10,Jf=-2,dc=e=>e==="*";function eh(e,t){let n=e.split("/"),r=n.length;return n.some(dc)&&(r+=Jf),t&&(r+=qf),n.filter(a=>!dc(a)).reduce((a,o)=>a+(Qf.test(o)?Kf:o===""?Zf:Gf),r)}function th(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function nh(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,a={},o="/",s=[];for(let l=0;l<r.length;++l){let c=r[l],d=l===r.length-1,h=o==="/"?t:t.slice(o.length)||"/",m=uc({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},h),g=c.route;if(!m&&d&&n&&!r[r.length-1].route.index&&(m=uc({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},h)),!m)return null;Object.assign(a,m.params),s.push({params:a,pathname:Dt([o,m.pathname]),pathnameBase:ch(Dt([o,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(o=Dt([o,m.pathnameBase]))}return s}function uc(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=rh(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let o=a[0],s=o.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:r.reduce((d,h,m)=>{let{paramName:g,isOptional:j}=h;if(g==="*"){let b=l[m]||"";s=o.slice(0,o.length-b.length).replace(/(.)\/+$/,"$1")}const w=l[m];return j&&!w?d[g]=void 0:d[g]=(w||"").replace(/%2F/g,"/"),d},{}),pathname:o,pathnameBase:s,pattern:e}}function rh(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Hs(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function ih(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Hs(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Ws(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const ah=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,oh=e=>ah.test(e);function sh(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?On(e):e,o;if(n)if(oh(n))o=n;else{if(n.includes("//")){let s=n;n=n.replace(/\/\/+/g,"/"),Hs(!1,"Pathnames cannot have embedded double slashes - normalizing "+(s+" -> "+n))}n.startsWith("/")?o=pc(n.substring(1),"/"):o=pc(n,t)}else o=t;return{pathname:o,search:dh(r),hash:uh(a)}}function pc(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function Wa(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function lh(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Tu(e,t){let n=lh(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Bu(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=On(e):(a=Mr({},e),te(!a.pathname||!a.pathname.includes("?"),Wa("?","pathname","search",a)),te(!a.pathname||!a.pathname.includes("#"),Wa("#","pathname","hash",a)),te(!a.search||!a.search.includes("#"),Wa("#","search","hash",a)));let o=e===""||a.pathname==="",s=o?"/":a.pathname,l;if(s==null)l=n;else{let m=t.length-1;if(!r&&s.startsWith("..")){let g=s.split("/");for(;g[0]==="..";)g.shift(),m-=1;a.pathname=g.join("/")}l=m>=0?t[m]:"/"}let c=sh(a,l),d=s&&s!=="/"&&s.endsWith("/"),h=(o||s===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||h)&&(c.pathname+="/"),c}const Dt=e=>e.join("/").replace(/\/\/+/g,"/"),ch=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),dh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,uh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function ph(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Fu=["post","put","patch","delete"];new Set(Fu);const mh=["get",...Fu];new Set(mh);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Rr(){return Rr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Rr.apply(this,arguments)}const Vs=y.createContext(null),fh=y.createContext(null),on=y.createContext(null),pa=y.createContext(null),sn=y.createContext({outlet:null,matches:[],isDataRoute:!1}),_u=y.createContext(null);function hh(e,t){let{relative:n}=t===void 0?{}:t;Hr()||te(!1);let{basename:r,navigator:a}=y.useContext(on),{hash:o,pathname:s,search:l}=Uu(e,{relative:n}),c=s;return r!=="/"&&(c=s==="/"?r:Dt([r,s])),a.createHref({pathname:c,search:l,hash:o})}function Hr(){return y.useContext(pa)!=null}function Un(){return Hr()||te(!1),y.useContext(pa).location}function Ou(e){y.useContext(on).static||y.useLayoutEffect(e)}function Wr(){let{isDataRoute:e}=y.useContext(sn);return e?Eh():gh()}function gh(){Hr()||te(!1);let e=y.useContext(Vs),{basename:t,future:n,navigator:r}=y.useContext(on),{matches:a}=y.useContext(sn),{pathname:o}=Un(),s=JSON.stringify(Tu(a,n.v7_relativeSplatPath)),l=y.useRef(!1);return Ou(()=>{l.current=!0}),y.useCallback(function(d,h){if(h===void 0&&(h={}),!l.current)return;if(typeof d=="number"){r.go(d);return}let m=Bu(d,JSON.parse(s),o,h.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:Dt([t,m.pathname])),(h.replace?r.replace:r.push)(m,h.state,h)},[t,r,s,o,e])}function Uu(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=y.useContext(on),{matches:a}=y.useContext(sn),{pathname:o}=Un(),s=JSON.stringify(Tu(a,r.v7_relativeSplatPath));return y.useMemo(()=>Bu(e,JSON.parse(s),o,n==="path"),[e,s,o,n])}function xh(e,t){return yh(e,t)}function yh(e,t,n,r){Hr()||te(!1);let{navigator:a}=y.useContext(on),{matches:o}=y.useContext(sn),s=o[o.length-1],l=s?s.params:{};s&&s.pathname;let c=s?s.pathnameBase:"/";s&&s.route;let d=Un(),h;if(t){var m;let v=typeof t=="string"?On(t):t;c==="/"||(m=v.pathname)!=null&&m.startsWith(c)||te(!1),h=v}else h=d;let g=h.pathname||"/",j=g;if(c!=="/"){let v=c.replace(/^\//,"").split("/");j="/"+g.replace(/^\//,"").split("/").slice(v.length).join("/")}let w=$f(e,{pathname:j}),b=bh(w&&w.map(v=>Object.assign({},v,{params:Object.assign({},l,v.params),pathname:Dt([c,a.encodeLocation?a.encodeLocation(v.pathname).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?c:Dt([c,a.encodeLocation?a.encodeLocation(v.pathnameBase).pathname:v.pathnameBase])})),o,n,r);return t&&b?y.createElement(pa.Provider,{value:{location:Rr({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:bt.Pop}},b):b}function vh(){let e=zh(),t=ph(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},o=null;return y.createElement(y.Fragment,null,y.createElement("h2",null,"Unexpected Application Error!"),y.createElement("h3",{style:{fontStyle:"italic"}},t),n?y.createElement("pre",{style:a},n):null,o)}const wh=y.createElement(vh,null);class kh extends y.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?y.createElement(sn.Provider,{value:this.props.routeContext},y.createElement(_u.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function jh(e){let{routeContext:t,match:n,children:r}=e,a=y.useContext(Vs);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),y.createElement(sn.Provider,{value:t},r)}function bh(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=r)!=null&&o.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let s=e,l=(a=n)==null?void 0:a.errors;if(l!=null){let h=s.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);h>=0||te(!1),s=s.slice(0,Math.min(s.length,h+1))}let c=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let h=0;h<s.length;h++){let m=s[h];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(d=h),m.route.id){let{loaderData:g,errors:j}=n,w=m.route.loader&&g[m.route.id]===void 0&&(!j||j[m.route.id]===void 0);if(m.route.lazy||w){c=!0,d>=0?s=s.slice(0,d+1):s=[s[0]];break}}}return s.reduceRight((h,m,g)=>{let j,w=!1,b=null,v=null;n&&(j=l&&m.route.id?l[m.route.id]:void 0,b=m.route.errorElement||wh,c&&(d<0&&g===0?(Ph("route-fallback",!1),w=!0,v=null):d===g&&(w=!0,v=m.route.hydrateFallbackElement||null)));let p=t.concat(s.slice(0,g+1)),u=()=>{let f;return j?f=b:w?f=v:m.route.Component?f=y.createElement(m.route.Component,null):m.route.element?f=m.route.element:f=h,y.createElement(jh,{match:m,routeContext:{outlet:h,matches:p,isDataRoute:n!=null},children:f})};return n&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?y.createElement(kh,{location:n.location,revalidation:n.revalidation,component:b,error:j,children:u(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):u()},null)}var Hu=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Hu||{}),Qi=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Qi||{});function Sh(e){let t=y.useContext(Vs);return t||te(!1),t}function Ch(e){let t=y.useContext(fh);return t||te(!1),t}function Nh(e){let t=y.useContext(sn);return t||te(!1),t}function Wu(e){let t=Nh(),n=t.matches[t.matches.length-1];return n.route.id||te(!1),n.route.id}function zh(){var e;let t=y.useContext(_u),n=Ch(Qi.UseRouteError),r=Wu(Qi.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Eh(){let{router:e}=Sh(Hu.UseNavigateStable),t=Wu(Qi.UseNavigateStable),n=y.useRef(!1);return Ou(()=>{n.current=!0}),y.useCallback(function(a,o){o===void 0&&(o={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,Rr({fromRouteId:t},o)))},[e,t])}const mc={};function Ph(e,t,n){!t&&!mc[e]&&(mc[e]=!0)}function Ih(e,t){e==null||e.v7_startTransition,(e==null?void 0:e.v7_relativeSplatPath)===void 0&&(!t||t.v7_relativeSplatPath),t&&(t.v7_fetcherPersist,t.v7_normalizeFormMethod,t.v7_partialHydration,t.v7_skipActionErrorRevalidation)}function $e(e){te(!1)}function Ah(e){let{basename:t="/",children:n=null,location:r,navigationType:a=bt.Pop,navigator:o,static:s=!1,future:l}=e;Hr()&&te(!1);let c=t.replace(/^\/*/,"/"),d=y.useMemo(()=>({basename:c,navigator:o,static:s,future:Rr({v7_relativeSplatPath:!1},l)}),[c,l,o,s]);typeof r=="string"&&(r=On(r));let{pathname:h="/",search:m="",hash:g="",state:j=null,key:w="default"}=r,b=y.useMemo(()=>{let v=Ws(h,c);return v==null?null:{location:{pathname:v,search:m,hash:g,state:j,key:w},navigationType:a}},[c,h,m,g,j,w,a]);return b==null?null:y.createElement(on.Provider,{value:d},y.createElement(pa.Provider,{children:n,value:b}))}function Dh(e){let{children:t,location:n}=e;return xh(Uo(t),n)}new Promise(()=>{});function Uo(e,t){t===void 0&&(t=[]);let n=[];return y.Children.forEach(e,(r,a)=>{if(!y.isValidElement(r))return;let o=[...t,a];if(r.type===y.Fragment){n.push.apply(n,Uo(r.props.children,o));return}r.type!==$e&&te(!1),!r.props.index||!r.props.children||te(!1);let s={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(s.children=Uo(r.props.children,o)),n.push(s)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ho(){return Ho=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ho.apply(this,arguments)}function Lh(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Mh(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Rh(e,t){return e.button===0&&(!t||t==="_self")&&!Mh(e)}function Wo(e){return e===void 0&&(e=""),new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(a=>[n,a]):[[n,r]])},[]))}function Th(e,t){let n=Wo(e);return t&&t.forEach((r,a)=>{n.has(a)||t.getAll(a).forEach(o=>{n.append(a,o)})}),n}const Bh=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Fh="6";try{window.__reactRouterVersion=Fh}catch{}const _h="startTransition",fc=Pp[_h];function Oh(e){let{basename:t,children:n,future:r,window:a}=e,o=y.useRef();o.current==null&&(o.current=Hf({window:a,v5Compat:!0}));let s=o.current,[l,c]=y.useState({action:s.action,location:s.location}),{v7_startTransition:d}=r||{},h=y.useCallback(m=>{d&&fc?fc(()=>c(m)):c(m)},[c,d]);return y.useLayoutEffect(()=>s.listen(h),[s,h]),y.useEffect(()=>Ih(r),[r]),y.createElement(Ah,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:s,future:r})}const Uh=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Hh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_e=y.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:o,replace:s,state:l,target:c,to:d,preventScrollReset:h,viewTransition:m}=t,g=Lh(t,Bh),{basename:j}=y.useContext(on),w,b=!1;if(typeof d=="string"&&Hh.test(d)&&(w=d,Uh))try{let f=new URL(window.location.href),k=d.startsWith("//")?new URL(f.protocol+d):new URL(d),z=Ws(k.pathname,j);k.origin===f.origin&&z!=null?d=z+k.search+k.hash:b=!0}catch{}let v=hh(d,{relative:a}),p=Wh(d,{replace:s,state:l,target:c,preventScrollReset:h,relative:a,viewTransition:m});function u(f){r&&r(f),f.defaultPrevented||p(f)}return y.createElement("a",Ho({},g,{href:w||v,onClick:b||o?r:u,ref:n,target:c}))});var hc;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(hc||(hc={}));var gc;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(gc||(gc={}));function Wh(e,t){let{target:n,replace:r,state:a,preventScrollReset:o,relative:s,viewTransition:l}=t===void 0?{}:t,c=Wr(),d=Un(),h=Uu(e,{relative:s});return y.useCallback(m=>{if(Rh(m,n)){m.preventDefault();let g=r!==void 0?r:Yi(d)===Yi(h);c(e,{replace:g,state:a,preventScrollReset:o,relative:s,viewTransition:l})}},[d,c,h,r,a,n,e,o,s,l])}function Vh(e){let t=y.useRef(Wo(e)),n=y.useRef(!1),r=Un(),a=y.useMemo(()=>Th(r.search,n.current?null:t.current),[r.search]),o=Wr(),s=y.useCallback((l,c)=>{const d=Wo(typeof l=="function"?l(a):l);n.current=!0,o("?"+d,c)},[o,a]);return[a,s]}const si={ar:{dir:"rtl",nav:{home:"الرئيسية",services:"الخدمات",booking:"حجز موعد",report:"تحميل التقرير",payment:"الدفع",downloadApp:"تحميل التطبيق",admin:"الإدارة"},hero:{badge:"المركز الأول في الإمارات",title:"الأمان العالي الدولي",subtitle:"للفحص الفني للسيارات",description:"نقدم لكم خدمات فحص السيارات بأعلى معايير الجودة والدقة",features:"أجهزة متطورة • فريق محترف • تقارير شاملة",bookNow:"احجز موعدك الآن",downloadReport:"تحميل التقرير"},stats:{cars:"سيارة تم فحصها",years:"سنوات خبرة",customers:"عميل سعيد",rating:"تقييم العملاء"},services:{title:"خدماتنا",subtitle:"اختر الباقة الخاصة لسيارتك",fullInspection:"الفحص الشامل",fullInspectionDesc:"فحص كامل للسيارة يشمل جميع الأنظمة",mechanicalInspection:"ميكانيكا وكمبيوتر",mechanicalInspectionDesc:"فحص المحرك وناقل الحركة والفرامل والتعليق",basicInspection:"الأجزاء الأساسية",basicInspectionDesc:"فحص الأجزاء الرئيسية للسيارة",miscInspection:"فحوصات متنوعة",miscInspectionDesc:"فحوصات إضافية حسب الطلب",price:"درهم",bookNow:"احجز الآن",sedan:"السيارات الصالون",sedanEn:"Sedan",suv:"سيارات الدفع الرباعي",suvEn:"4WD / SUV",luxury:"السيارات الفاخرة والرياضية",luxuryEn:"Luxury / Coupe",selectPackage:"اختر الباقة الخاصة لسيارتك"},booking:{title:"حجز موعد",subtitle:"احجز موعد فحص سيارتك الآن",name:"الاسم الكامل",namePlaceholder:"أدخل اسمك الكامل",phone:"رقم الهاتف",phonePlaceholder:"05XXXXXXXX",email:"البريد الإلكتروني (اختياري)",emailPlaceholder:"example@email.com",carBrand:"ماركة السيارة",selectBrand:"اختر الماركة",carModel:"موديل السيارة",selectModel:"اختر الموديل",year:"سنة الصنع",selectYear:"اختر السنة",service:"نوع الخدمة",selectService:"اختر الخدمة",date:"التاريخ المفضل",time:"الوقت المفضل",notes:"ملاحظات إضافية (اختياري)",notesPlaceholder:"أي ملاحظات خاصة...",submit:"تأكيد الحجز",submitting:"جاري الحجز...",success:"تم الحجز بنجاح! سنتواصل معك قريباً.",error:"حدث خطأ. يرجى المحاولة مرة أخرى.",contactMethod:"طريقة التواصل المفضلة",signature:"توقيع العميل"},report:{title:"تحميل التقرير",subtitle:"أدخل الكود للحصول على تقرير الفحص",codePlaceholder:"أدخل كود التقرير",search:"البحث عن التقرير",searching:"جاري البحث...",downloadPdf:"تحميل التقرير PDF",images:"صور الفحص",downloadAll:"تحميل جميع الصور",notFound:"لم يتم العثور على تقرير بهذا الكود",found:"تم العثور على التقرير!",carInfo:"معلومات السيارة",brand:"الماركة",model:"الموديل",year:"السنة",date:"تاريخ الفحص"},payment:{title:"الدفع الإلكتروني",subtitle:"ادفع بأمان عبر البطاقة البنكية",badge:"الدفع الآمن",name:"الاسم الكامل",namePlaceholder:"أدخل اسمك الكامل",phone:"رقم الهاتف",email:"البريد الإلكتروني (اختياري)",amount:"المبلغ (درهم)",service:"نوع الخدمة",selectService:"اختر الخدمة",payNow:"ادفع الآن",processing:"جاري المعالجة...",features:"مميزات الدفع الإلكتروني",secure:"دفع آمن ومشفر 100%",secureStripe:"دفع آمن عبر Stripe",cards:"دعم Visa و Mastercard",ssl:"تشفير SSL/TLS",receipt:"إيصال فوري"},paymentSuccess:{title:"تم الدفع بنجاح!",message:"شكراً لك! تم استلام دفعتك بنجاح.",name:"الاسم",amount:"المبلغ",status:"الحالة",paid:"مدفوع",nextSteps:"الخطوات التالية:",step1:"سيتم التواصل معك لتأكيد موعد الفحص",step2:"ستصلك رسالة على البريد الإلكتروني بتفاصيل الدفع",step3:"يمكنك تحميل تقرير الفحص بعد إكماله من صفحة التقارير",backHome:"العودة للرئيسية",downloadReport:"تحميل التقرير",contact:"للاستفسار:"},paymentCancel:{title:"تم إلغاء الدفع",message:"لم تتم عملية الدفع. يمكنك المحاولة مرة أخرى.",tryAgain:"حاول مرة أخرى",backHome:"العودة للرئيسية",contact:"للمساعدة:"},footer:{about:"عن المركز",aboutText:"مركز الأمان العالي الدولي للفحص الفني للسيارات - نقدم خدمات فحص السيارات بأعلى معايير الجودة والدقة في الإمارات.",quickLinks:"روابط سريعة",contact:"تواصل معنا",location:"الشارقة - المنطقة الصناعية 13",rights:"جميع الحقوق محفوظة"},chat:{title:"المساعد الذكي",placeholder:"اكتب رسالتك...",send:"إرسال",welcome:`مرحباً! أنا المساعد الذكي لمركز الأمان العالي للفحص الفني. يمكنني مساعدتك في:

📋 حجز موعد للفحص
💰 الاستفسار عن الأسعار والخدمات
📍 معلومات الموقع وساعات العمل
❓ الإجابة على أي استفسارات

كيف يمكنني خدمتك؟`},common:{loading:"جاري التحميل...",error:"حدث خطأ",success:"تم بنجاح",close:"إغلاق",confirm:"تأكيد",cancel:"إلغاء",aed:"درهم"},languageSwitcher:{title:"اختر اللغة",current:"اللغة"},admin:{dashboard:"لوحة التحكم",centerName:"مركز الأمان العالي للفحص الفني",logout:"تسجيل الخروج",reports:"التقارير",bookings:"الحجوزات",pending:"قيد الانتظار",confirmed:"مؤكد",totalBookings:"إجمالي الحجوزات",search:"بحث...",refresh:"تحديث",uploadReport:"رفع تقرير جديد",customerName:"اسم العميل",reportCode:"كود التقرير",optional:"اختياري",pdfFile:"ملف PDF",images:"صور الفحص",upTo10:"حتى 10",uploading:"جاري الرفع...",upload:"رفع التقرير",uploadedReports:"التقارير المرفوعة",noReports:"لا توجد تقارير حالياً",noBookings:"لا توجد حجوزات حالياً",code:"الكود",date:"التاريخ",actions:"إجراءات",view:"عرض",delete:"حذف",confirm:"تأكيد",manageBookings:"إدارة الحجوزات",name:"الاسم",phone:"الهاتف",car:"السيارة",service:"الخدمة",status:"الحالة",imagesSelected:"تم اختيار {count} صورة",confirmDelete:"هل أنت متأكد من الحذف؟"},install:{title:"تثبيت التطبيق",androidStep1:"افتح الموقع في Chrome",androidStep2:"اضغط على ⋮ (القائمة)",androidStep3:'اختر "إضافة إلى الشاشة الرئيسية"',iosTitle:"تثبيت التطبيق على iPhone",iosStep1:"اضغط على أيقونة المشاركة ⬆️",iosStep2:'اختر "إضافة إلى الشاشة الرئيسية"',iosStep3:'اضغط "إضافة"',gotIt:"فهمت"}},en:{dir:"ltr",nav:{home:"Home",services:"Services",booking:"Book Now",report:"Download Report",payment:"Payment",downloadApp:"Download App",admin:"Admin"},hero:{badge:"#1 Center in UAE",title:"High Safety International",subtitle:"Technical Car Inspection",description:"We provide car inspection services with the highest standards of quality and accuracy",features:"Advanced Equipment • Expert Team • Comprehensive Reports",bookNow:"Book Your Appointment",downloadReport:"Download Report"},stats:{cars:"Cars Inspected",years:"Years Experience",customers:"Happy Customers",rating:"Customer Rating"},services:{title:"Our Services",subtitle:"Choose the package for your car",fullInspection:"Full Inspection",fullInspectionDesc:"Complete car inspection covering all systems",mechanicalInspection:"Mechanical + Computer",mechanicalInspectionDesc:"Engine, transmission, brakes, and suspension check",basicInspection:"Basic Parts",basicInspectionDesc:"Inspection of main car parts",miscInspection:"Various Tests",miscInspectionDesc:"Additional inspections on request",price:"AED",bookNow:"Book Now",sedan:"Sedan Cars",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"Luxury & Sports Cars",luxuryEn:"Luxury / Coupe",selectPackage:"Choose the package for your car"},booking:{title:"Book Appointment",subtitle:"Book your car inspection appointment now",name:"Full Name",namePlaceholder:"Enter your full name",phone:"Phone Number",phonePlaceholder:"05XXXXXXXX",email:"Email (Optional)",emailPlaceholder:"example@email.com",carBrand:"Car Brand",selectBrand:"Select Brand",carModel:"Car Model",selectModel:"Select Model",year:"Year",selectYear:"Select Year",service:"Service Type",selectService:"Select Service",date:"Preferred Date",time:"Preferred Time",notes:"Additional Notes (Optional)",notesPlaceholder:"Any special notes...",submit:"Confirm Booking",submitting:"Booking...",success:"Booking successful! We will contact you soon.",error:"An error occurred. Please try again.",contactMethod:"Preferred Contact Method",signature:"Customer Signature"},report:{title:"Download Report",subtitle:"Enter the code to get your inspection report",codePlaceholder:"Enter report code",search:"Search",searching:"Searching...",downloadPdf:"Download PDF Report",images:"Inspection Photos",downloadAll:"Download All Photos",notFound:"No report found with this code",found:"Report found!",carInfo:"Car Information",brand:"Brand",model:"Model",year:"Year",date:"Inspection Date"},payment:{title:"Online Payment",subtitle:"Pay securely with your bank card",badge:"Secure Payment",name:"Full Name",namePlaceholder:"Enter your full name",phone:"Phone Number",email:"Email (Optional)",amount:"Amount (AED)",service:"Service Type",selectService:"Select Service",payNow:"Pay Now",processing:"Processing...",features:"Payment Features",secure:"100% Secure & Encrypted",secureStripe:"Secure payment via Stripe",cards:"Visa & Mastercard supported",ssl:"SSL/TLS encryption",receipt:"Instant receipt"},paymentSuccess:{title:"Payment Successful!",message:"Thank you! Your payment has been received.",name:"Name",amount:"Amount",status:"Status",paid:"Paid",nextSteps:"Next Steps:",step1:"We will contact you to confirm your inspection appointment",step2:"You will receive an email with payment details",step3:"You can download the inspection report after completion from the Reports page",backHome:"Back to Home",downloadReport:"Download Report",contact:"For inquiries:"},paymentCancel:{title:"Payment Cancelled",message:"Payment was not completed. You can try again.",tryAgain:"Try Again",backHome:"Back to Home",contact:"For help:"},footer:{about:"About Us",aboutText:"High Safety International Technical Car Inspection Center - We provide car inspection services with the highest quality standards in the UAE.",quickLinks:"Quick Links",contact:"Contact Us",location:"Sharjah - Industrial Area 13",rights:"All Rights Reserved"},chat:{title:"Smart Assistant",placeholder:"Type your message...",send:"Send",welcome:`Hello! I am the smart assistant for High Safety Technical Inspection Center. I can help you with:

📋 Book an inspection appointment
💰 Inquire about prices and services
📍 Location and working hours
❓ Answer any questions

How can I help you?`},common:{loading:"Loading...",error:"An error occurred",success:"Success",close:"Close",confirm:"Confirm",cancel:"Cancel",aed:"AED"},languageSwitcher:{title:"Select Language",current:"Language"},admin:{dashboard:"Dashboard",centerName:"High Safety Inspection Center",logout:"Logout",reports:"Reports",bookings:"Bookings",pending:"Pending",confirmed:"Confirmed",totalBookings:"Total Bookings",search:"Search...",refresh:"Refresh",uploadReport:"Upload New Report",customerName:"Customer Name",reportCode:"Report Code",optional:"Optional",pdfFile:"PDF File",images:"Inspection Images",upTo10:"up to 10",uploading:"Uploading...",upload:"Upload Report",uploadedReports:"Uploaded Reports",noReports:"No reports yet",noBookings:"No bookings yet",code:"Code",date:"Date",actions:"Actions",view:"View",delete:"Delete",confirm:"Confirm",manageBookings:"Manage Bookings",name:"Name",phone:"Phone",car:"Car",service:"Service",status:"Status",imagesSelected:"{count} images selected",confirmDelete:"Are you sure you want to delete?"},install:{title:"Install App",androidStep1:"Open in Chrome browser",androidStep2:"Tap ⋮ (menu)",androidStep3:'Select "Add to Home Screen"',iosTitle:"Install App on iPhone",iosStep1:"Tap the Share icon ⬆️",iosStep2:'Select "Add to Home Screen"',iosStep3:'Tap "Add"',gotIt:"Got it"}},ru:{dir:"ltr",nav:{home:"Главная",services:"Услуги",booking:"Записаться",report:"Скачать отчёт",payment:"Оплата",downloadApp:"Скачать приложение",admin:"Админ"},hero:{badge:"Центр №1 в ОАЭ",title:"High Safety International",subtitle:"Технический осмотр автомобилей",description:"Мы предоставляем услуги осмотра автомобилей по высшим стандартам качества и точности",features:"Современное оборудование • Команда экспертов • Полные отчёты",bookNow:"Записаться на осмотр",downloadReport:"Скачать отчёт"},stats:{cars:"Автомобилей осмотрено",years:"Лет опыта",customers:"Довольных клиентов",rating:"Рейтинг клиентов"},services:{title:"Наши услуги",subtitle:"Выберите пакет для вашего автомобиля",fullInspection:"Полный осмотр",fullInspectionDesc:"Полный осмотр автомобиля, охватывающий все системы",mechanicalInspection:"Механика + Компьютер",mechanicalInspectionDesc:"Проверка двигателя, трансмиссии, тормозов и подвески",basicInspection:"Основные части",basicInspectionDesc:"Проверка основных частей автомобиля",miscInspection:"Разные проверки",miscInspectionDesc:"Дополнительные проверки по запросу",price:"AED",bookNow:"Записаться",sedan:"Седаны",sedanEn:"Sedan",suv:"Внедорожники",suvEn:"4WD / SUV",luxury:"Люкс и спорткары",luxuryEn:"Luxury / Coupe",selectPackage:"Выберите пакет для вашего автомобиля"},booking:{title:"Запись на осмотр",subtitle:"Запишитесь на осмотр вашего автомобиля",name:"Полное имя",namePlaceholder:"Введите ваше полное имя",phone:"Номер телефона",phonePlaceholder:"05XXXXXXXX",email:"Email (необязательно)",emailPlaceholder:"example@email.com",carBrand:"Марка автомобиля",selectBrand:"Выберите марку",carModel:"Модель автомобиля",selectModel:"Выберите модель",year:"Год выпуска",selectYear:"Выберите год",service:"Тип услуги",selectService:"Выберите услугу",date:"Желаемая дата",time:"Желаемое время",notes:"Дополнительные примечания (необязательно)",notesPlaceholder:"Любые особые пожелания...",submit:"Подтвердить запись",submitting:"Запись...",success:"Запись успешна! Мы свяжемся с вами в ближайшее время.",error:"Произошла ошибка. Попробуйте ещё раз.",contactMethod:"Предпочтительный способ связи",signature:"Подпись клиента"},report:{title:"Скачать отчёт",subtitle:"Введите код для получения отчёта об осмотре",codePlaceholder:"Введите код отчёта",search:"Поиск",searching:"Поиск...",downloadPdf:"Скачать PDF отчёт",images:"Фотографии осмотра",downloadAll:"Скачать все фотографии",notFound:"Отчёт с таким кодом не найден",found:"Отчёт найден!",carInfo:"Информация об автомобиле",brand:"Марка",model:"Модель",year:"Год",date:"Дата осмотра"},payment:{title:"Онлайн-оплата",subtitle:"Оплатите безопасно банковской картой",badge:"Безопасная оплата",name:"Полное имя",namePlaceholder:"Введите ваше полное имя",phone:"Номер телефона",email:"Email (необязательно)",amount:"Сумма (AED)",service:"Тип услуги",selectService:"Выберите услугу",payNow:"Оплатить",processing:"Обработка...",features:"Преимущества оплаты",secure:"100% безопасно и зашифровано",secureStripe:"Безопасная оплата через Stripe",cards:"Поддержка Visa и Mastercard",ssl:"SSL/TLS шифрование",receipt:"Мгновенный чек"},paymentSuccess:{title:"Оплата успешна!",message:"Спасибо! Ваш платёж получен.",name:"Имя",amount:"Сумма",status:"Статус",paid:"Оплачено",nextSteps:"Следующие шаги:",step1:"Мы свяжемся с вами для подтверждения записи на осмотр",step2:"Вы получите email с деталями оплаты",step3:"Вы можете скачать отчёт об осмотре после его завершения на странице отчётов",backHome:"На главную",downloadReport:"Скачать отчёт",contact:"По вопросам:"},paymentCancel:{title:"Оплата отменена",message:"Оплата не была завершена. Вы можете попробовать снова.",tryAgain:"Попробовать снова",backHome:"На главную",contact:"Для помощи:"},footer:{about:"О нас",aboutText:"High Safety International - Центр технического осмотра автомобилей. Мы предоставляем услуги осмотра по высшим стандартам качества в ОАЭ.",quickLinks:"Быстрые ссылки",contact:"Контакты",location:"Шарджа - Индустриальная зона 13",rights:"Все права защищены"},chat:{title:"Умный помощник",placeholder:"Введите сообщение...",send:"Отправить",welcome:`Здравствуйте! Я умный помощник центра технического осмотра High Safety. Я могу помочь вам:

📋 Записаться на осмотр
💰 Узнать о ценах и услугах
📍 Информация о местоположении и часах работы
❓ Ответить на любые вопросы

Чем могу помочь?`},common:{loading:"Загрузка...",error:"Произошла ошибка",success:"Успешно",close:"Закрыть",confirm:"Подтвердить",cancel:"Отмена",aed:"AED"},languageSwitcher:{title:"Выберите язык",current:"Язык"}},ur:{dir:"rtl",nav:{home:"ہوم",services:"خدمات",booking:"بکنگ",report:"رپورٹ ڈاؤنلوڈ",payment:"ادائیگی",downloadApp:"ایپ ڈاؤنلوڈ",admin:"ایڈمن"},hero:{badge:"UAE میں نمبر 1 سینٹر",title:"ہائی سیفٹی انٹرنیشنل",subtitle:"گاڑیوں کی تکنیکی معائنہ",description:"ہم اعلیٰ معیار کی کار معائنہ خدمات فراہم کرتے ہیں",features:"جدید آلات • ماہر ٹیم • مکمل رپورٹس",bookNow:"ابھی بکنگ کریں",downloadReport:"رپورٹ ڈاؤنلوڈ"},stats:{cars:"گاڑیوں کا معائنہ",years:"سال کا تجربہ",customers:"خوش گاہک",rating:"گاہک کی درجہ بندی"},services:{title:"ہماری خدمات",subtitle:"اپنی گاڑی کے لیے پیکج منتخب کریں",fullInspection:"مکمل معائنہ",fullInspectionDesc:"تمام سسٹمز کا مکمل معائنہ",mechanicalInspection:"میکینیکل + کمپیوٹر",mechanicalInspectionDesc:"انجن، ٹرانسمیشن، بریک اور سسپنشن چیک",basicInspection:"بنیادی حصے",basicInspectionDesc:"اہم حصوں کا معائنہ",miscInspection:"مختلف ٹیسٹ",miscInspectionDesc:"اضافی معائنہ درخواست پر",price:"درہم",bookNow:"ابھی بک کریں",sedan:"سیڈان کاریں",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"لگژری اور اسپورٹس کاریں",luxuryEn:"Luxury / Coupe",selectPackage:"اپنی گاڑی کے لیے پیکج منتخب کریں"},booking:{title:"بکنگ",subtitle:"اپنی گاڑی کے معائنہ کے لیے اپائنٹمنٹ بک کریں",name:"پورا نام",namePlaceholder:"اپنا پورا نام درج کریں",phone:"فون نمبر",phonePlaceholder:"05XXXXXXXX",email:"ای میل (اختیاری)",emailPlaceholder:"example@email.com",carBrand:"گاڑی کی کمپنی",selectBrand:"کمپنی منتخب کریں",carModel:"گاڑی کا ماڈل",selectModel:"ماڈل منتخب کریں",year:"سال",selectYear:"سال منتخب کریں",service:"سروس کی قسم",selectService:"سروس منتخب کریں",date:"پسندیدہ تاریخ",time:"پسندیدہ وقت",notes:"اضافی نوٹس (اختیاری)",notesPlaceholder:"کوئی خاص نوٹس...",submit:"بکنگ کی تصدیق",submitting:"بکنگ ہو رہی ہے...",success:"بکنگ کامیاب! ہم جلد آپ سے رابطہ کریں گے۔",error:"ایک خرابی پیش آئی۔ دوبارہ کوشش کریں۔",contactMethod:"پسندیدہ رابطے کا طریقہ",signature:"گاہک کے دستخط"},report:{title:"رپورٹ ڈاؤنلوڈ",subtitle:"معائنہ رپورٹ حاصل کرنے کے لیے کوڈ درج کریں",codePlaceholder:"رپورٹ کوڈ درج کریں",search:"تلاش",searching:"تلاش ہو رہی ہے...",downloadPdf:"PDF رپورٹ ڈاؤنلوڈ",images:"معائنہ کی تصاویر",downloadAll:"تمام تصاویر ڈاؤنلوڈ",notFound:"اس کوڈ سے کوئی رپورٹ نہیں ملی",found:"رپورٹ مل گئی!",carInfo:"گاڑی کی معلومات",brand:"کمپنی",model:"ماڈل",year:"سال",date:"معائنہ کی تاریخ"},payment:{title:"آن لائن ادائیگی",subtitle:"اپنے بینک کارڈ سے محفوظ ادائیگی کریں",badge:"محفوظ ادائیگی",name:"پورا نام",namePlaceholder:"اپنا پورا نام درج کریں",phone:"فون نمبر",email:"ای میل (اختیاری)",amount:"رقم (درہم)",service:"سروس کی قسم",selectService:"سروس منتخب کریں",payNow:"ابھی ادا کریں",processing:"پروسیسنگ...",features:"ادائیگی کی خصوصیات",secure:"100% محفوظ اور خفیہ",secureStripe:"Stripe کے ذریعے محفوظ ادائیگی",cards:"Visa اور Mastercard سپورٹ",ssl:"SSL/TLS خفیہ کاری",receipt:"فوری رسید"},paymentSuccess:{title:"ادائیگی کامیاب!",message:"شکریہ! آپ کی ادائیگی موصول ہو گئی۔",name:"نام",amount:"رقم",status:"حالت",paid:"ادا شدہ",nextSteps:"اگلے اقدامات:",step1:"ہم آپ کی اپائنٹمنٹ کی تصدیق کے لیے رابطہ کریں گے",step2:"آپ کو ادائیگی کی تفصیلات کے ساتھ ای میل ملے گی",step3:"آپ معائنہ کے بعد رپورٹ ڈاؤنلوڈ کر سکتے ہیں",backHome:"ہوم پیج پر واپس",downloadReport:"رپورٹ ڈاؤنلوڈ",contact:"استفسار کے لیے:"},paymentCancel:{title:"ادائیگی منسوخ",message:"ادائیگی مکمل نہیں ہوئی۔ آپ دوبارہ کوشش کر سکتے ہیں۔",tryAgain:"دوبارہ کوشش کریں",backHome:"ہوم پیج پر واپس",contact:"مدد کے لیے:"},footer:{about:"ہمارے بارے میں",aboutText:"ہائی سیفٹی انٹرنیشنل - کار معائنہ مرکز۔ ہم UAE میں اعلیٰ معیار کی معائنہ خدمات فراہم کرتے ہیں۔",quickLinks:"فوری لنکس",contact:"ہم سے رابطہ کریں",location:"شارجہ - صنعتی علاقہ 13",rights:"تمام حقوق محفوظ ہیں"},chat:{title:"سمارٹ اسسٹنٹ",placeholder:"اپنا پیغام لکھیں...",send:"بھیجیں",welcome:`السلام علیکم! میں ہائی سیفٹی معائنہ مرکز کا سمارٹ اسسٹنٹ ہوں۔ میں آپ کی مدد کر سکتا ہوں:

📋 معائنہ کے لیے اپائنٹمنٹ بک کریں
💰 قیمتوں اور خدمات کے بارے میں پوچھیں
📍 مقام اور کام کے اوقات
❓ کسی بھی سوال کا جواب

میں آپ کی کیا مدد کر سکتا ہوں؟`},common:{loading:"لوڈ ہو رہا ہے...",error:"ایک خرابی پیش آئی",success:"کامیاب",close:"بند کریں",confirm:"تصدیق",cancel:"منسوخ",aed:"درہم"},languageSwitcher:{title:"زبان منتخب کریں",current:"زبان"}},fa:{dir:"rtl",nav:{home:"خانه",services:"خدمات",booking:"رزرو",report:"دانلود گزارش",payment:"پرداخت",downloadApp:"دانلود اپ",admin:"مدیر"},hero:{badge:"مرکز شماره 1 در امارات",title:"ایمنی بالای بین‌المللی",subtitle:"بازرسی فنی خودرو",description:"ما خدمات بازرسی خودرو با بالاترین استانداردهای کیفیت ارائه می‌دهیم",features:"تجهیزات پیشرفته • تیم متخصص • گزارش‌های جامع",bookNow:"همین الان رزرو کنید",downloadReport:"دانلود گزارش"},stats:{cars:"خودرو بازرسی شده",years:"سال تجربه",customers:"مشتری راضی",rating:"امتیاز مشتریان"},services:{title:"خدمات ما",subtitle:"پکیج مناسب خودروی خود را انتخاب کنید",fullInspection:"بازرسی کامل",fullInspectionDesc:"بازرسی کامل خودرو شامل تمام سیستم‌ها",mechanicalInspection:"مکانیکی + کامپیوتر",mechanicalInspectionDesc:"بررسی موتور، گیربکس، ترمز و تعلیق",basicInspection:"قطعات اصلی",basicInspectionDesc:"بازرسی قطعات اصلی خودرو",miscInspection:"تست‌های متنوع",miscInspectionDesc:"بازرسی‌های اضافی بنا به درخواست",price:"درهم",bookNow:"رزرو کنید",sedan:"سدان",sedanEn:"Sedan",suv:"شاسی‌بلند",suvEn:"4WD / SUV",luxury:"لوکس و اسپرت",luxuryEn:"Luxury / Coupe",selectPackage:"پکیج مناسب خودروی خود را انتخاب کنید"},booking:{title:"رزرو نوبت",subtitle:"همین الان نوبت بازرسی خودرو خود را رزرو کنید",name:"نام کامل",namePlaceholder:"نام کامل خود را وارد کنید",phone:"شماره تلفن",phonePlaceholder:"05XXXXXXXX",email:"ایمیل (اختیاری)",emailPlaceholder:"example@email.com",carBrand:"برند خودرو",selectBrand:"برند را انتخاب کنید",carModel:"مدل خودرو",selectModel:"مدل را انتخاب کنید",year:"سال ساخت",selectYear:"سال را انتخاب کنید",service:"نوع خدمات",selectService:"خدمات را انتخاب کنید",date:"تاریخ ترجیحی",time:"زمان ترجیحی",notes:"یادداشت‌های اضافی (اختیاری)",notesPlaceholder:"هرگونه یادداشت خاص...",submit:"تأیید رزرو",submitting:"در حال رزرو...",success:"رزرو موفق! به زودی با شما تماس می‌گیریم.",error:"خطایی رخ داد. لطفاً دوباره تلاش کنید.",contactMethod:"روش تماس ترجیحی",signature:"امضای مشتری"},report:{title:"دانلود گزارش",subtitle:"کد را برای دریافت گزارش بازرسی وارد کنید",codePlaceholder:"کد گزارش را وارد کنید",search:"جستجو",searching:"در حال جستجو...",downloadPdf:"دانلود گزارش PDF",images:"عکس‌های بازرسی",downloadAll:"دانلود همه عکس‌ها",notFound:"گزارشی با این کد یافت نشد",found:"گزارش پیدا شد!",carInfo:"اطلاعات خودرو",brand:"برند",model:"مدل",year:"سال",date:"تاریخ بازرسی"},payment:{title:"پرداخت آنلاین",subtitle:"با کارت بانکی خود به صورت امن پرداخت کنید",badge:"پرداخت امن",name:"نام کامل",namePlaceholder:"نام کامل خود را وارد کنید",phone:"شماره تلفن",email:"ایمیل (اختیاری)",amount:"مبلغ (درهم)",service:"نوع خدمات",selectService:"خدمات را انتخاب کنید",payNow:"پرداخت کنید",processing:"در حال پردازش...",features:"ویژگی‌های پرداخت",secure:"100% امن و رمزگذاری شده",secureStripe:"پرداخت امن از طریق Stripe",cards:"پشتیبانی از Visa و Mastercard",ssl:"رمزگذاری SSL/TLS",receipt:"رسید فوری"},paymentSuccess:{title:"پرداخت موفق!",message:"متشکریم! پرداخت شما دریافت شد.",name:"نام",amount:"مبلغ",status:"وضعیت",paid:"پرداخت شده",nextSteps:"مراحل بعدی:",step1:"برای تأیید نوبت بازرسی با شما تماس می‌گیریم",step2:"ایمیلی با جزئیات پرداخت دریافت خواهید کرد",step3:"می‌توانید گزارش بازرسی را پس از اتمام دانلود کنید",backHome:"بازگشت به خانه",downloadReport:"دانلود گزارش",contact:"برای سؤالات:"},paymentCancel:{title:"پرداخت لغو شد",message:"پرداخت کامل نشد. می‌توانید دوباره تلاش کنید.",tryAgain:"دوباره تلاش کنید",backHome:"بازگشت به خانه",contact:"برای کمک:"},footer:{about:"درباره ما",aboutText:"ایمنی بالای بین‌المللی - مرکز بازرسی فنی خودرو. ما خدمات بازرسی با بالاترین استانداردهای کیفیت در امارات ارائه می‌دهیم.",quickLinks:"لینک‌های سریع",contact:"تماس با ما",location:"شارجه - منطقه صنعتی 13",rights:"تمام حقوق محفوظ است"},chat:{title:"دستیار هوشمند",placeholder:"پیام خود را بنویسید...",send:"ارسال",welcome:`سلام! من دستیار هوشمند مرکز بازرسی فنی High Safety هستم. می‌توانم به شما کمک کنم:

📋 رزرو نوبت بازرسی
💰 پرسش درباره قیمت‌ها و خدمات
📍 اطلاعات مکان و ساعات کاری
❓ پاسخ به هر سؤالی

چطور می‌توانم کمکتان کنم؟`},common:{loading:"در حال بارگذاری...",error:"خطایی رخ داد",success:"موفق",close:"بستن",confirm:"تأیید",cancel:"لغو",aed:"درهم"},languageSwitcher:{title:"انتخاب زبان",current:"زبان"}},hi:{dir:"ltr",nav:{home:"होम",services:"सेवाएं",booking:"बुकिंग",report:"रिपोर्ट डाउनलोड",payment:"भुगतान",downloadApp:"ऐप डाउनलोड",admin:"एडमिन"},hero:{badge:"UAE में #1 सेंटर",title:"हाई सेफ्टी इंटरनेशनल",subtitle:"टेक्निकल कार इंस्पेक्शन",description:"हम उच्चतम गुणवत्ता मानकों के साथ कार इंस्पेक्शन सेवाएं प्रदान करते हैं",features:"आधुनिक उपकरण • विशेषज्ञ टीम • व्यापक रिपोर्ट",bookNow:"अभी बुक करें",downloadReport:"रिपोर्ट डाउनलोड"},stats:{cars:"कारों का निरीक्षण",years:"वर्षों का अनुभव",customers:"खुश ग्राहक",rating:"ग्राहक रेटिंग"},services:{title:"हमारी सेवाएं",subtitle:"अपनी कार के लिए पैकेज चुनें",fullInspection:"पूर्ण निरीक्षण",fullInspectionDesc:"सभी सिस्टम को कवर करने वाला पूर्ण कार निरीक्षण",mechanicalInspection:"मैकेनिकल + कंप्यूटर",mechanicalInspectionDesc:"इंजन, ट्रांसमिशन, ब्रेक और सस्पेंशन चेक",basicInspection:"बेसिक पार्ट्स",basicInspectionDesc:"मुख्य कार पार्ट्स का निरीक्षण",miscInspection:"विभिन्न टेस्ट",miscInspectionDesc:"अनुरोध पर अतिरिक्त निरीक्षण",price:"दिरहम",bookNow:"अभी बुक करें",sedan:"सेडान कारें",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"लक्जरी और स्पोर्ट्स कारें",luxuryEn:"Luxury / Coupe",selectPackage:"अपनी कार के लिए पैकेज चुनें"},booking:{title:"अपॉइंटमेंट बुक करें",subtitle:"अभी अपनी कार के निरीक्षण के लिए अपॉइंटमेंट बुक करें",name:"पूरा नाम",namePlaceholder:"अपना पूरा नाम दर्ज करें",phone:"फोन नंबर",phonePlaceholder:"05XXXXXXXX",email:"ईमेल (वैकल्पिक)",emailPlaceholder:"example@email.com",carBrand:"कार ब्रांड",selectBrand:"ब्रांड चुनें",carModel:"कार मॉडल",selectModel:"मॉडल चुनें",year:"वर्ष",selectYear:"वर्ष चुनें",service:"सेवा प्रकार",selectService:"सेवा चुनें",date:"पसंदीदा तारीख",time:"पसंदीदा समय",notes:"अतिरिक्त नोट्स (वैकल्पिक)",notesPlaceholder:"कोई विशेष नोट्स...",submit:"बुकिंग कन्फर्म करें",submitting:"बुकिंग हो रही है...",success:"बुकिंग सफल! हम जल्द ही आपसे संपर्क करेंगे।",error:"एक त्रुटि हुई। कृपया पुनः प्रयास करें।",contactMethod:"पसंदीदा संपर्क विधि",signature:"ग्राहक हस्ताक्षर"},report:{title:"रिपोर्ट डाउनलोड करें",subtitle:"अपनी निरीक्षण रिपोर्ट प्राप्त करने के लिए कोड दर्ज करें",codePlaceholder:"रिपोर्ट कोड दर्ज करें",search:"खोजें",searching:"खोज रहे हैं...",downloadPdf:"PDF रिपोर्ट डाउनलोड करें",images:"निरीक्षण फोटो",downloadAll:"सभी फोटो डाउनलोड करें",notFound:"इस कोड से कोई रिपोर्ट नहीं मिली",found:"रिपोर्ट मिल गई!",carInfo:"कार की जानकारी",brand:"ब्रांड",model:"मॉडल",year:"वर्ष",date:"निरीक्षण तिथि"},payment:{title:"ऑनलाइन भुगतान",subtitle:"अपने बैंक कार्ड से सुरक्षित भुगतान करें",badge:"सुरक्षित भुगतान",name:"पूरा नाम",namePlaceholder:"अपना पूरा नाम दर्ज करें",phone:"फोन नंबर",email:"ईमेल (वैकल्पिक)",amount:"राशि (दिरहम)",service:"सेवा प्रकार",selectService:"सेवा चुनें",payNow:"अभी भुगतान करें",processing:"प्रोसेसिंग...",features:"भुगतान सुविधाएं",secure:"100% सुरक्षित और एन्क्रिप्टेड",secureStripe:"Stripe के माध्यम से सुरक्षित भुगतान",cards:"Visa और Mastercard समर्थित",ssl:"SSL/TLS एन्क्रिप्शन",receipt:"तुरंत रसीद"},paymentSuccess:{title:"भुगतान सफल!",message:"धन्यवाद! आपका भुगतान प्राप्त हो गया।",name:"नाम",amount:"राशि",status:"स्थिति",paid:"भुगतान किया गया",nextSteps:"अगले कदम:",step1:"हम आपकी अपॉइंटमेंट की पुष्टि के लिए संपर्क करेंगे",step2:"आपको भुगतान विवरण के साथ ईमेल प्राप्त होगा",step3:"आप पूरा होने के बाद निरीक्षण रिपोर्ट डाउनलोड कर सकते हैं",backHome:"होम पर वापस",downloadReport:"रिपोर्ट डाउनलोड",contact:"पूछताछ के लिए:"},paymentCancel:{title:"भुगतान रद्द",message:"भुगतान पूर्ण नहीं हुआ। आप पुनः प्रयास कर सकते हैं।",tryAgain:"पुनः प्रयास करें",backHome:"होम पर वापस",contact:"मदद के लिए:"},footer:{about:"हमारे बारे में",aboutText:"हाई सेफ्टी इंटरनेशनल - टेक्निकल कार इंस्पेक्शन सेंटर। हम UAE में उच्चतम गुणवत्ता मानकों के साथ निरीक्षण सेवाएं प्रदान करते हैं।",quickLinks:"त्वरित लिंक",contact:"संपर्क करें",location:"शारजाह - इंडस्ट्रियल एरिया 13",rights:"सर्वाधिकार सुरक्षित"},chat:{title:"स्मार्ट असिस्टेंट",placeholder:"अपना संदेश लिखें...",send:"भेजें",welcome:`नमस्ते! मैं हाई सेफ्टी टेक्निकल इंस्पेक्शन सेंटर का स्मार्ट असिस्टेंट हूं। मैं आपकी मदद कर सकता हूं:

📋 निरीक्षण अपॉइंटमेंट बुक करें
💰 कीमतों और सेवाओं के बारे में पूछें
📍 स्थान और कार्य समय की जानकारी
❓ किसी भी प्रश्न का उत्तर

मैं आपकी कैसे मदद कर सकता हूं?`},common:{loading:"लोड हो रहा है...",error:"एक त्रुटि हुई",success:"सफल",close:"बंद करें",confirm:"पुष्टि करें",cancel:"रद्द करें",aed:"दिरहम"},languageSwitcher:{title:"भाषा चुनें",current:"भाषा"}},tr:{dir:"ltr",nav:{home:"Ana Sayfa",services:"Hizmetler",booking:"Randevu",report:"Rapor İndir",payment:"Ödeme",downloadApp:"Uygulama İndir",admin:"Yönetici"},hero:{badge:"BAE'de 1 Numara",title:"High Safety International",subtitle:"Teknik Araç Muayenesi",description:"En yüksek kalite standartlarıyla araç muayene hizmetleri sunuyoruz",features:"Gelişmiş Ekipman • Uzman Ekip • Kapsamlı Raporlar",bookNow:"Hemen Randevu Al",downloadReport:"Rapor İndir"},stats:{cars:"Muayene Edilen Araç",years:"Yıllık Deneyim",customers:"Mutlu Müşteri",rating:"Müşteri Puanı"},services:{title:"Hizmetlerimiz",subtitle:"Aracınız için paketi seçin",fullInspection:"Tam Muayene",fullInspectionDesc:"Tüm sistemleri kapsayan tam araç muayenesi",mechanicalInspection:"Mekanik + Bilgisayar",mechanicalInspectionDesc:"Motor, şanzıman, fren ve süspansiyon kontrolü",basicInspection:"Temel Parçalar",basicInspectionDesc:"Ana araç parçalarının muayenesi",miscInspection:"Çeşitli Testler",miscInspectionDesc:"Talep üzerine ek muayeneler",price:"AED",bookNow:"Randevu Al",sedan:"Sedan Araçlar",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"Lüks ve Spor Araçlar",luxuryEn:"Luxury / Coupe",selectPackage:"Aracınız için paketi seçin"},booking:{title:"Randevu Al",subtitle:"Araç muayenesi için hemen randevu alın",name:"Ad Soyad",namePlaceholder:"Adınızı ve soyadınızı girin",phone:"Telefon Numarası",phonePlaceholder:"05XXXXXXXX",email:"E-posta (İsteğe bağlı)",emailPlaceholder:"example@email.com",carBrand:"Araç Markası",selectBrand:"Marka seçin",carModel:"Araç Modeli",selectModel:"Model seçin",year:"Yıl",selectYear:"Yıl seçin",service:"Hizmet Türü",selectService:"Hizmet seçin",date:"Tercih Edilen Tarih",time:"Tercih Edilen Saat",notes:"Ek Notlar (İsteğe bağlı)",notesPlaceholder:"Özel notlar...",submit:"Randevuyu Onayla",submitting:"Randevu alınıyor...",success:"Randevu başarılı! Yakında sizinle iletişime geçeceğiz.",error:"Bir hata oluştu. Lütfen tekrar deneyin.",contactMethod:"Tercih Edilen İletişim Yöntemi",signature:"Müşteri İmzası"},report:{title:"Rapor İndir",subtitle:"Muayene raporunuzu almak için kodu girin",codePlaceholder:"Rapor kodunu girin",search:"Ara",searching:"Aranıyor...",downloadPdf:"PDF Rapor İndir",images:"Muayene Fotoğrafları",downloadAll:"Tüm Fotoğrafları İndir",notFound:"Bu kodla rapor bulunamadı",found:"Rapor bulundu!",carInfo:"Araç Bilgileri",brand:"Marka",model:"Model",year:"Yıl",date:"Muayene Tarihi"},payment:{title:"Online Ödeme",subtitle:"Banka kartınızla güvenli ödeme yapın",badge:"Güvenli Ödeme",name:"Ad Soyad",namePlaceholder:"Adınızı ve soyadınızı girin",phone:"Telefon Numarası",email:"E-posta (İsteğe bağlı)",amount:"Tutar (AED)",service:"Hizmet Türü",selectService:"Hizmet seçin",payNow:"Şimdi Öde",processing:"İşleniyor...",features:"Ödeme Özellikleri",secure:"%100 Güvenli ve Şifreli",secureStripe:"Stripe ile güvenli ödeme",cards:"Visa ve Mastercard desteklenir",ssl:"SSL/TLS şifreleme",receipt:"Anında makbuz"},paymentSuccess:{title:"Ödeme Başarılı!",message:"Teşekkürler! Ödemeniz alındı.",name:"Ad",amount:"Tutar",status:"Durum",paid:"Ödendi",nextSteps:"Sonraki Adımlar:",step1:"Randevunuzu onaylamak için sizinle iletişime geçeceğiz",step2:"Ödeme detaylarını içeren bir e-posta alacaksınız",step3:"Tamamlandıktan sonra muayene raporunu indirebilirsiniz",backHome:"Ana Sayfaya Dön",downloadReport:"Rapor İndir",contact:"Sorularınız için:"},paymentCancel:{title:"Ödeme İptal Edildi",message:"Ödeme tamamlanamadı. Tekrar deneyebilirsiniz.",tryAgain:"Tekrar Dene",backHome:"Ana Sayfaya Dön",contact:"Yardım için:"},footer:{about:"Hakkımızda",aboutText:"High Safety International - Teknik Araç Muayene Merkezi. BAE'de en yüksek kalite standartlarıyla muayene hizmetleri sunuyoruz.",quickLinks:"Hızlı Linkler",contact:"İletişim",location:"Sharjah - Sanayi Bölgesi 13",rights:"Tüm Hakları Saklıdır"},chat:{title:"Akıllı Asistan",placeholder:"Mesajınızı yazın...",send:"Gönder",welcome:`Merhaba! Ben High Safety Teknik Muayene Merkezi'nin akıllı asistanıyım. Size yardımcı olabilirim:

📋 Muayene randevusu alın
💰 Fiyatlar ve hizmetler hakkında bilgi alın
📍 Konum ve çalışma saatleri
❓ Herhangi bir soruyu yanıtlayın

Size nasıl yardımcı olabilirim?`},common:{loading:"Yükleniyor...",error:"Bir hata oluştu",success:"Başarılı",close:"Kapat",confirm:"Onayla",cancel:"İptal",aed:"AED"},languageSwitcher:{title:"Dil Seçin",current:"Dil"}},es:{dir:"ltr",nav:{home:"Inicio",services:"Servicios",booking:"Reservar",report:"Descargar Informe",payment:"Pago",downloadApp:"Descargar App",admin:"Admin"},hero:{badge:"Centro #1 en EAU",title:"High Safety International",subtitle:"Inspección Técnica de Vehículos",description:"Brindamos servicios de inspección vehicular con los más altos estándares de calidad",features:"Equipos Avanzados • Equipo Experto • Informes Completos",bookNow:"Reserva tu Cita",downloadReport:"Descargar Informe"},stats:{cars:"Vehículos Inspeccionados",years:"Años de Experiencia",customers:"Clientes Satisfechos",rating:"Calificación"},services:{title:"Nuestros Servicios",subtitle:"Elige el paquete para tu vehículo",fullInspection:"Inspección Completa",fullInspectionDesc:"Inspección completa del vehículo",mechanicalInspection:"Mecánica + Computadora",mechanicalInspectionDesc:"Motor, transmisión, frenos y suspensión",basicInspection:"Partes Básicas",basicInspectionDesc:"Inspección de partes principales",miscInspection:"Pruebas Varias",miscInspectionDesc:"Inspecciones adicionales",price:"AED",bookNow:"Reservar",sedan:"Sedán",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"Lujo y Deportivos",luxuryEn:"Luxury / Coupe",selectPackage:"Elige el paquete para tu vehículo"},booking:{title:"Reservar Cita",subtitle:"Reserva tu inspección ahora",name:"Nombre Completo",namePlaceholder:"Ingresa tu nombre",phone:"Teléfono",phonePlaceholder:"05XXXXXXXX",email:"Email (Opcional)",emailPlaceholder:"ejemplo@email.com",carBrand:"Marca",selectBrand:"Seleccionar Marca",carModel:"Modelo",selectModel:"Seleccionar Modelo",year:"Año",selectYear:"Seleccionar Año",service:"Tipo de Servicio",selectService:"Seleccionar Servicio",date:"Fecha Preferida",time:"Hora Preferida",notes:"Notas (Opcional)",notesPlaceholder:"Notas especiales...",submit:"Confirmar Reserva",submitting:"Reservando...",success:"¡Reserva exitosa! Te contactaremos pronto.",error:"Error. Intenta de nuevo.",contactMethod:"Método de Contacto",signature:"Firma del Cliente"},report:{title:"Descargar Informe",subtitle:"Ingresa el código para obtener tu informe",codePlaceholder:"Ingresa código",search:"Buscar",searching:"Buscando...",downloadPdf:"Descargar PDF",images:"Fotos de Inspección",downloadAll:"Descargar Todas",notFound:"No se encontró el informe",found:"¡Informe encontrado!",carInfo:"Información del Vehículo",brand:"Marca",model:"Modelo",year:"Año",date:"Fecha de Inspección"},payment:{title:"Pago en Línea",subtitle:"Paga de forma segura con tarjeta",badge:"Pago Seguro",name:"Nombre Completo",namePlaceholder:"Ingresa tu nombre",phone:"Teléfono",email:"Email (Opcional)",amount:"Monto (AED)",service:"Tipo de Servicio",selectService:"Seleccionar Servicio",payNow:"Pagar Ahora",processing:"Procesando...",features:"Características del Pago",secure:"100% Seguro y Encriptado",secureStripe:"Pago seguro con Stripe",cards:"Visa y Mastercard",ssl:"Encriptación SSL/TLS",receipt:"Recibo instantáneo"},paymentSuccess:{title:"¡Pago Exitoso!",message:"¡Gracias! Tu pago fue recibido.",name:"Nombre",amount:"Monto",status:"Estado",paid:"Pagado",nextSteps:"Próximos Pasos:",step1:"Te contactaremos para confirmar tu cita",step2:"Recibirás un email con los detalles",step3:"Podrás descargar el informe después",backHome:"Volver al Inicio",downloadReport:"Descargar Informe",contact:"Consultas:"},paymentCancel:{title:"Pago Cancelado",message:"El pago no se completó. Puedes intentar de nuevo.",tryAgain:"Intentar de Nuevo",backHome:"Volver al Inicio",contact:"Ayuda:"},footer:{about:"Sobre Nosotros",aboutText:"High Safety International - Centro de Inspección Técnica Vehicular. Servicios de alta calidad en EAU.",quickLinks:"Enlaces Rápidos",contact:"Contáctanos",location:"Sharjah - Zona Industrial 13",rights:"Todos los Derechos Reservados"},chat:{title:"Asistente Inteligente",placeholder:"Escribe tu mensaje...",send:"Enviar",welcome:`¡Hola! Soy el asistente de High Safety. Puedo ayudarte con:

📋 Reservar una inspección
💰 Precios y servicios
📍 Ubicación y horarios
❓ Cualquier pregunta

¿Cómo puedo ayudarte?`},common:{loading:"Cargando...",error:"Ocurrió un error",success:"Éxito",close:"Cerrar",confirm:"Confirmar",cancel:"Cancelar",aed:"AED"},languageSwitcher:{title:"Seleccionar Idioma",current:"Idioma"}},fr:{dir:"ltr",nav:{home:"Accueil",services:"Services",booking:"Réserver",report:"Télécharger Rapport",payment:"Paiement",downloadApp:"Télécharger App",admin:"Admin"},hero:{badge:"Centre #1 aux EAU",title:"High Safety International",subtitle:"Contrôle Technique Automobile",description:"Services d'inspection automobile aux normes les plus élevées",features:"Équipement Avancé • Équipe Expert • Rapports Complets",bookNow:"Réserver Maintenant",downloadReport:"Télécharger Rapport"},stats:{cars:"Véhicules Inspectés",years:"Années d'Expérience",customers:"Clients Satisfaits",rating:"Note Clients"},services:{title:"Nos Services",subtitle:"Choisissez le forfait pour votre véhicule",fullInspection:"Inspection Complète",fullInspectionDesc:"Inspection complète du véhicule",mechanicalInspection:"Mécanique + Ordinateur",mechanicalInspectionDesc:"Moteur, transmission, freins, suspension",basicInspection:"Pièces de Base",basicInspectionDesc:"Inspection des pièces principales",miscInspection:"Tests Divers",miscInspectionDesc:"Inspections supplémentaires",price:"AED",bookNow:"Réserver",sedan:"Berline",sedanEn:"Sedan",suv:"4x4 / SUV",suvEn:"4WD / SUV",luxury:"Luxe et Sport",luxuryEn:"Luxury / Coupe",selectPackage:"Choisissez le forfait pour votre véhicule"},booking:{title:"Réserver un Rendez-vous",subtitle:"Réservez votre inspection maintenant",name:"Nom Complet",namePlaceholder:"Entrez votre nom",phone:"Téléphone",phonePlaceholder:"05XXXXXXXX",email:"Email (Optionnel)",emailPlaceholder:"exemple@email.com",carBrand:"Marque",selectBrand:"Sélectionner Marque",carModel:"Modèle",selectModel:"Sélectionner Modèle",year:"Année",selectYear:"Sélectionner Année",service:"Type de Service",selectService:"Sélectionner Service",date:"Date Préférée",time:"Heure Préférée",notes:"Notes (Optionnel)",notesPlaceholder:"Notes spéciales...",submit:"Confirmer",submitting:"Réservation...",success:"Réservation réussie! Nous vous contacterons.",error:"Erreur. Veuillez réessayer.",contactMethod:"Méthode de Contact",signature:"Signature Client"},report:{title:"Télécharger Rapport",subtitle:"Entrez le code pour obtenir votre rapport",codePlaceholder:"Entrez le code",search:"Rechercher",searching:"Recherche...",downloadPdf:"Télécharger PDF",images:"Photos d'Inspection",downloadAll:"Tout Télécharger",notFound:"Rapport non trouvé",found:"Rapport trouvé!",carInfo:"Informations Véhicule",brand:"Marque",model:"Modèle",year:"Année",date:"Date d'Inspection"},payment:{title:"Paiement en Ligne",subtitle:"Payez en toute sécurité par carte",badge:"Paiement Sécurisé",name:"Nom Complet",namePlaceholder:"Entrez votre nom",phone:"Téléphone",email:"Email (Optionnel)",amount:"Montant (AED)",service:"Type de Service",selectService:"Sélectionner Service",payNow:"Payer",processing:"Traitement...",features:"Caractéristiques",secure:"100% Sécurisé",secureStripe:"Paiement sécurisé Stripe",cards:"Visa et Mastercard",ssl:"Cryptage SSL/TLS",receipt:"Reçu instantané"},paymentSuccess:{title:"Paiement Réussi!",message:"Merci! Votre paiement a été reçu.",name:"Nom",amount:"Montant",status:"Statut",paid:"Payé",nextSteps:"Prochaines Étapes:",step1:"Nous vous contacterons pour confirmer",step2:"Vous recevrez un email de confirmation",step3:"Téléchargez le rapport après inspection",backHome:"Retour Accueil",downloadReport:"Télécharger Rapport",contact:"Questions:"},paymentCancel:{title:"Paiement Annulé",message:"Le paiement n'a pas été effectué. Réessayez.",tryAgain:"Réessayer",backHome:"Retour Accueil",contact:"Aide:"},footer:{about:"À Propos",aboutText:"High Safety International - Centre de Contrôle Technique. Services de qualité aux EAU.",quickLinks:"Liens Rapides",contact:"Nous Contacter",location:"Sharjah - Zone Industrielle 13",rights:"Tous Droits Réservés"},chat:{title:"Assistant Intelligent",placeholder:"Écrivez votre message...",send:"Envoyer",welcome:`Bonjour! Je suis l'assistant de High Safety. Je peux vous aider:

📋 Réserver une inspection
💰 Prix et services
📍 Localisation et horaires
❓ Questions

Comment puis-je vous aider?`},common:{loading:"Chargement...",error:"Une erreur s'est produite",success:"Succès",close:"Fermer",confirm:"Confirmer",cancel:"Annuler",aed:"AED"},languageSwitcher:{title:"Sélectionner Langue",current:"Langue"}},de:{dir:"ltr",nav:{home:"Startseite",services:"Dienste",booking:"Buchen",report:"Bericht Herunterladen",payment:"Zahlung",downloadApp:"App Herunterladen",admin:"Admin"},hero:{badge:"Nr. 1 in den VAE",title:"High Safety International",subtitle:"Technische Fahrzeuginspektion",description:"Fahrzeuginspektionsdienste mit höchsten Qualitätsstandards",features:"Moderne Ausrüstung • Expertenteam • Umfassende Berichte",bookNow:"Jetzt Buchen",downloadReport:"Bericht Herunterladen"},stats:{cars:"Fahrzeuge Geprüft",years:"Jahre Erfahrung",customers:"Zufriedene Kunden",rating:"Kundenbewertung"},services:{title:"Unsere Dienste",subtitle:"Wählen Sie das Paket für Ihr Fahrzeug",fullInspection:"Vollständige Inspektion",fullInspectionDesc:"Komplette Fahrzeuginspektion",mechanicalInspection:"Mechanik + Computer",mechanicalInspectionDesc:"Motor, Getriebe, Bremsen, Federung",basicInspection:"Grundteile",basicInspectionDesc:"Inspektion der Hauptteile",miscInspection:"Verschiedene Tests",miscInspectionDesc:"Zusätzliche Inspektionen",price:"AED",bookNow:"Buchen",sedan:"Limousine",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"Luxus & Sport",luxuryEn:"Luxury / Coupe",selectPackage:"Wählen Sie das Paket für Ihr Fahrzeug"},booking:{title:"Termin Buchen",subtitle:"Buchen Sie jetzt Ihre Inspektion",name:"Vollständiger Name",namePlaceholder:"Name eingeben",phone:"Telefon",phonePlaceholder:"05XXXXXXXX",email:"E-Mail (Optional)",emailPlaceholder:"beispiel@email.com",carBrand:"Marke",selectBrand:"Marke Wählen",carModel:"Modell",selectModel:"Modell Wählen",year:"Jahr",selectYear:"Jahr Wählen",service:"Diensttyp",selectService:"Dienst Wählen",date:"Bevorzugtes Datum",time:"Bevorzugte Zeit",notes:"Notizen (Optional)",notesPlaceholder:"Besondere Hinweise...",submit:"Bestätigen",submitting:"Buchung...",success:"Buchung erfolgreich! Wir melden uns.",error:"Fehler. Bitte erneut versuchen.",contactMethod:"Kontaktmethode",signature:"Kundenunterschrift"},report:{title:"Bericht Herunterladen",subtitle:"Code eingeben für Ihren Bericht",codePlaceholder:"Code eingeben",search:"Suchen",searching:"Suche...",downloadPdf:"PDF Herunterladen",images:"Inspektionsfotos",downloadAll:"Alle Herunterladen",notFound:"Bericht nicht gefunden",found:"Bericht gefunden!",carInfo:"Fahrzeuginformationen",brand:"Marke",model:"Modell",year:"Jahr",date:"Inspektionsdatum"},payment:{title:"Online-Zahlung",subtitle:"Sicher per Karte bezahlen",badge:"Sichere Zahlung",name:"Vollständiger Name",namePlaceholder:"Name eingeben",phone:"Telefon",email:"E-Mail (Optional)",amount:"Betrag (AED)",service:"Diensttyp",selectService:"Dienst Wählen",payNow:"Jetzt Bezahlen",processing:"Verarbeitung...",features:"Zahlungsfunktionen",secure:"100% Sicher",secureStripe:"Sichere Stripe-Zahlung",cards:"Visa und Mastercard",ssl:"SSL/TLS-Verschlüsselung",receipt:"Sofortiger Beleg"},paymentSuccess:{title:"Zahlung Erfolgreich!",message:"Danke! Ihre Zahlung wurde empfangen.",name:"Name",amount:"Betrag",status:"Status",paid:"Bezahlt",nextSteps:"Nächste Schritte:",step1:"Wir kontaktieren Sie zur Bestätigung",step2:"Sie erhalten eine E-Mail-Bestätigung",step3:"Laden Sie den Bericht nach der Inspektion herunter",backHome:"Zur Startseite",downloadReport:"Bericht Herunterladen",contact:"Fragen:"},paymentCancel:{title:"Zahlung Abgebrochen",message:"Zahlung nicht abgeschlossen. Erneut versuchen.",tryAgain:"Erneut Versuchen",backHome:"Zur Startseite",contact:"Hilfe:"},footer:{about:"Über Uns",aboutText:"High Safety International - Technisches Inspektionszentrum. Qualitätsservice in den VAE.",quickLinks:"Schnelllinks",contact:"Kontakt",location:"Sharjah - Industriegebiet 13",rights:"Alle Rechte Vorbehalten"},chat:{title:"Intelligenter Assistent",placeholder:"Nachricht schreiben...",send:"Senden",welcome:`Hallo! Ich bin der Assistent von High Safety. Ich kann helfen mit:

📋 Inspektion buchen
💰 Preise und Dienste
📍 Standort und Öffnungszeiten
❓ Fragen

Wie kann ich helfen?`},common:{loading:"Laden...",error:"Ein Fehler ist aufgetreten",success:"Erfolg",close:"Schließen",confirm:"Bestätigen",cancel:"Abbrechen",aed:"AED"},languageSwitcher:{title:"Sprache Wählen",current:"Sprache"}},pt:{dir:"ltr",nav:{home:"Início",services:"Serviços",booking:"Agendar",report:"Baixar Relatório",payment:"Pagamento",downloadApp:"Baixar App",admin:"Admin"},hero:{badge:"Centro #1 nos EAU",title:"High Safety International",subtitle:"Inspeção Técnica de Veículos",description:"Serviços de inspeção veicular com os mais altos padrões de qualidade",features:"Equipamento Avançado • Equipe Expert • Relatórios Completos",bookNow:"Agende Agora",downloadReport:"Baixar Relatório"},stats:{cars:"Veículos Inspecionados",years:"Anos de Experiência",customers:"Clientes Satisfeitos",rating:"Avaliação"},services:{title:"Nossos Serviços",subtitle:"Escolha o pacote para seu veículo",fullInspection:"Inspeção Completa",fullInspectionDesc:"Inspeção completa do veículo",mechanicalInspection:"Mecânica + Computador",mechanicalInspectionDesc:"Motor, transmissão, freios, suspensão",basicInspection:"Peças Básicas",basicInspectionDesc:"Inspeção das peças principais",miscInspection:"Testes Diversos",miscInspectionDesc:"Inspeções adicionais",price:"AED",bookNow:"Agendar",sedan:"Sedã",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"Luxo e Esportivos",luxuryEn:"Luxury / Coupe",selectPackage:"Escolha o pacote para seu veículo"},booking:{title:"Agendar",subtitle:"Agende sua inspeção agora",name:"Nome Completo",namePlaceholder:"Digite seu nome",phone:"Telefone",phonePlaceholder:"05XXXXXXXX",email:"Email (Opcional)",emailPlaceholder:"exemplo@email.com",carBrand:"Marca",selectBrand:"Selecionar Marca",carModel:"Modelo",selectModel:"Selecionar Modelo",year:"Ano",selectYear:"Selecionar Ano",service:"Tipo de Serviço",selectService:"Selecionar Serviço",date:"Data Preferida",time:"Hora Preferida",notes:"Notas (Opcional)",notesPlaceholder:"Notas especiais...",submit:"Confirmar",submitting:"Agendando...",success:"Agendamento realizado! Entraremos em contato.",error:"Erro. Tente novamente.",contactMethod:"Método de Contato",signature:"Assinatura do Cliente"},report:{title:"Baixar Relatório",subtitle:"Digite o código para obter seu relatório",codePlaceholder:"Digite o código",search:"Buscar",searching:"Buscando...",downloadPdf:"Baixar PDF",images:"Fotos da Inspeção",downloadAll:"Baixar Todas",notFound:"Relatório não encontrado",found:"Relatório encontrado!",carInfo:"Informações do Veículo",brand:"Marca",model:"Modelo",year:"Ano",date:"Data da Inspeção"},payment:{title:"Pagamento Online",subtitle:"Pague com segurança por cartão",badge:"Pagamento Seguro",name:"Nome Completo",namePlaceholder:"Digite seu nome",phone:"Telefone",email:"Email (Opcional)",amount:"Valor (AED)",service:"Tipo de Serviço",selectService:"Selecionar Serviço",payNow:"Pagar Agora",processing:"Processando...",features:"Recursos do Pagamento",secure:"100% Seguro",secureStripe:"Pagamento seguro via Stripe",cards:"Visa e Mastercard",ssl:"Criptografia SSL/TLS",receipt:"Recibo instantâneo"},paymentSuccess:{title:"Pagamento Realizado!",message:"Obrigado! Seu pagamento foi recebido.",name:"Nome",amount:"Valor",status:"Status",paid:"Pago",nextSteps:"Próximos Passos:",step1:"Entraremos em contato para confirmar",step2:"Você receberá um email de confirmação",step3:"Baixe o relatório após a inspeção",backHome:"Voltar ao Início",downloadReport:"Baixar Relatório",contact:"Dúvidas:"},paymentCancel:{title:"Pagamento Cancelado",message:"Pagamento não concluído. Tente novamente.",tryAgain:"Tentar Novamente",backHome:"Voltar ao Início",contact:"Ajuda:"},footer:{about:"Sobre Nós",aboutText:"High Safety International - Centro de Inspeção Técnica. Serviços de qualidade nos EAU.",quickLinks:"Links Rápidos",contact:"Contato",location:"Sharjah - Área Industrial 13",rights:"Todos os Direitos Reservados"},chat:{title:"Assistente Inteligente",placeholder:"Digite sua mensagem...",send:"Enviar",welcome:`Olá! Sou o assistente da High Safety. Posso ajudar com:

📋 Agendar inspeção
💰 Preços e serviços
📍 Localização e horários
❓ Perguntas

Como posso ajudar?`},common:{loading:"Carregando...",error:"Ocorreu um erro",success:"Sucesso",close:"Fechar",confirm:"Confirmar",cancel:"Cancelar",aed:"AED"},languageSwitcher:{title:"Selecionar Idioma",current:"Idioma"}},zh:{dir:"ltr",nav:{home:"首页",services:"服务",booking:"预约",report:"下载报告",payment:"支付",downloadApp:"下载应用",admin:"管理"},hero:{badge:"阿联酋第一中心",title:"High Safety International",subtitle:"汽车技术检测",description:"以最高质量标准提供汽车检测服务",features:"先进设备 • 专业团队 • 全面报告",bookNow:"立即预约",downloadReport:"下载报告"},stats:{cars:"已检测车辆",years:"年经验",customers:"满意客户",rating:"客户评分"},services:{title:"我们的服务",subtitle:"选择适合您车辆的套餐",fullInspection:"全面检测",fullInspectionDesc:"完整的车辆检测",mechanicalInspection:"机械+电脑",mechanicalInspectionDesc:"发动机、变速箱、刹车、悬挂",basicInspection:"基本部件",basicInspectionDesc:"主要部件检测",miscInspection:"其他测试",miscInspectionDesc:"额外检测",price:"AED",bookNow:"预约",sedan:"轿车",sedanEn:"Sedan",suv:"四驱/SUV",suvEn:"4WD / SUV",luxury:"豪华和跑车",luxuryEn:"Luxury / Coupe",selectPackage:"选择适合您车辆的套餐"},booking:{title:"预约",subtitle:"立即预约检测",name:"姓名",namePlaceholder:"输入您的姓名",phone:"电话",phonePlaceholder:"05XXXXXXXX",email:"邮箱（可选）",emailPlaceholder:"example@email.com",carBrand:"品牌",selectBrand:"选择品牌",carModel:"型号",selectModel:"选择型号",year:"年份",selectYear:"选择年份",service:"服务类型",selectService:"选择服务",date:"首选日期",time:"首选时间",notes:"备注（可选）",notesPlaceholder:"特别说明...",submit:"确认",submitting:"预约中...",success:"预约成功！我们会联系您。",error:"错误，请重试。",contactMethod:"联系方式",signature:"客户签名"},report:{title:"下载报告",subtitle:"输入代码获取报告",codePlaceholder:"输入代码",search:"搜索",searching:"搜索中...",downloadPdf:"下载PDF",images:"检测照片",downloadAll:"下载全部",notFound:"未找到报告",found:"找到报告！",carInfo:"车辆信息",brand:"品牌",model:"型号",year:"年份",date:"检测日期"},payment:{title:"在线支付",subtitle:"安全银行卡支付",badge:"安全支付",name:"姓名",namePlaceholder:"输入您的姓名",phone:"电话",email:"邮箱（可选）",amount:"金额（AED）",service:"服务类型",selectService:"选择服务",payNow:"立即支付",processing:"处理中...",features:"支付特点",secure:"100%安全",secureStripe:"Stripe安全支付",cards:"Visa和Mastercard",ssl:"SSL/TLS加密",receipt:"即时收据"},paymentSuccess:{title:"支付成功！",message:"谢谢！您的支付已收到。",name:"姓名",amount:"金额",status:"状态",paid:"已支付",nextSteps:"下一步：",step1:"我们会联系您确认预约",step2:"您将收到确认邮件",step3:"检测后可下载报告",backHome:"返回首页",downloadReport:"下载报告",contact:"咨询："},paymentCancel:{title:"支付取消",message:"支付未完成。请重试。",tryAgain:"重试",backHome:"返回首页",contact:"帮助："},footer:{about:"关于我们",aboutText:"High Safety International - 技术检测中心。阿联酋高质量服务。",quickLinks:"快速链接",contact:"联系我们",location:"Sharjah - 工业区13",rights:"版权所有"},chat:{title:"智能助手",placeholder:"输入消息...",send:"发送",welcome:`您好！我是High Safety的助手。我可以帮助：

📋 预约检测
💰 价格和服务
📍 位置和营业时间
❓ 问题

我能帮您什么？`},common:{loading:"加载中...",error:"发生错误",success:"成功",close:"关闭",confirm:"确认",cancel:"取消",aed:"AED"},languageSwitcher:{title:"选择语言",current:"语言"}},ja:{dir:"ltr",nav:{home:"ホーム",services:"サービス",booking:"予約",report:"レポートダウンロード",payment:"支払い",downloadApp:"アプリダウンロード",admin:"管理"},hero:{badge:"UAE No.1センター",title:"High Safety International",subtitle:"自動車技術検査",description:"最高品質基準で車両検査サービスを提供",features:"最新設備 • 専門チーム • 包括的レポート",bookNow:"今すぐ予約",downloadReport:"レポートダウンロード"},stats:{cars:"検査済み車両",years:"年の経験",customers:"満足のお客様",rating:"評価"},services:{title:"サービス",subtitle:"お車に合ったパッケージをお選びください",fullInspection:"総合検査",fullInspectionDesc:"完全な車両検査",mechanicalInspection:"機械+コンピュータ",mechanicalInspectionDesc:"エンジン、トランスミッション、ブレーキ、サスペンション",basicInspection:"基本部品",basicInspectionDesc:"主要部品の検査",miscInspection:"各種テスト",miscInspectionDesc:"追加検査",price:"AED",bookNow:"予約",sedan:"セダン",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"ラグジュアリー＆スポーツ",luxuryEn:"Luxury / Coupe",selectPackage:"お車に合ったパッケージをお選びください"},booking:{title:"予約",subtitle:"今すぐ検査を予約",name:"お名前",namePlaceholder:"お名前を入力",phone:"電話番号",phonePlaceholder:"05XXXXXXXX",email:"メール（任意）",emailPlaceholder:"example@email.com",carBrand:"メーカー",selectBrand:"メーカーを選択",carModel:"モデル",selectModel:"モデルを選択",year:"年式",selectYear:"年式を選択",service:"サービスタイプ",selectService:"サービスを選択",date:"希望日",time:"希望時間",notes:"メモ（任意）",notesPlaceholder:"特記事項...",submit:"確認",submitting:"予約中...",success:"予約完了！ご連絡いたします。",error:"エラー。再試行してください。",contactMethod:"連絡方法",signature:"お客様署名"},report:{title:"レポートダウンロード",subtitle:"コードを入力してレポートを取得",codePlaceholder:"コードを入力",search:"検索",searching:"検索中...",downloadPdf:"PDFダウンロード",images:"検査写真",downloadAll:"すべてダウンロード",notFound:"レポートが見つかりません",found:"レポートが見つかりました！",carInfo:"車両情報",brand:"メーカー",model:"モデル",year:"年式",date:"検査日"},payment:{title:"オンライン決済",subtitle:"カードで安全に支払い",badge:"安全な支払い",name:"お名前",namePlaceholder:"お名前を入力",phone:"電話番号",email:"メール（任意）",amount:"金額（AED）",service:"サービスタイプ",selectService:"サービスを選択",payNow:"今すぐ支払う",processing:"処理中...",features:"支払い機能",secure:"100%安全",secureStripe:"Stripe安全決済",cards:"VisaとMastercard",ssl:"SSL/TLS暗号化",receipt:"即時レシート"},paymentSuccess:{title:"支払い完了！",message:"ありがとうございます！お支払いを受け取りました。",name:"お名前",amount:"金額",status:"ステータス",paid:"支払い済み",nextSteps:"次のステップ：",step1:"予約確認のためご連絡いたします",step2:"確認メールをお送りします",step3:"検査後にレポートをダウンロードできます",backHome:"ホームに戻る",downloadReport:"レポートダウンロード",contact:"お問い合わせ："},paymentCancel:{title:"支払いキャンセル",message:"支払いが完了しませんでした。再試行してください。",tryAgain:"再試行",backHome:"ホームに戻る",contact:"ヘルプ："},footer:{about:"私たちについて",aboutText:"High Safety International - 技術検査センター。UAEで高品質サービス。",quickLinks:"クイックリンク",contact:"お問い合わせ",location:"シャルジャ - 工業地区13",rights:"全著作権所有"},chat:{title:"スマートアシスタント",placeholder:"メッセージを入力...",send:"送信",welcome:`こんにちは！High Safetyのアシスタントです。お手伝いできること：

📋 検査予約
💰 料金とサービス
📍 場所と営業時間
❓ 質問

どのようにお手伝いしましょうか？`},common:{loading:"読み込み中...",error:"エラーが発生しました",success:"成功",close:"閉じる",confirm:"確認",cancel:"キャンセル",aed:"AED"},languageSwitcher:{title:"言語を選択",current:"言語"}},ko:{dir:"ltr",nav:{home:"홈",services:"서비스",booking:"예약",report:"보고서 다운로드",payment:"결제",downloadApp:"앱 다운로드",admin:"관리자"},hero:{badge:"UAE 1위 센터",title:"High Safety International",subtitle:"자동차 기술 검사",description:"최고 품질 기준으로 차량 검사 서비스 제공",features:"첨단 장비 • 전문 팀 • 종합 보고서",bookNow:"지금 예약",downloadReport:"보고서 다운로드"},stats:{cars:"검사된 차량",years:"년 경력",customers:"만족한 고객",rating:"고객 평점"},services:{title:"서비스",subtitle:"차량에 맞는 패키지 선택",fullInspection:"전체 검사",fullInspectionDesc:"완전한 차량 검사",mechanicalInspection:"기계+컴퓨터",mechanicalInspectionDesc:"엔진, 변속기, 브레이크, 서스펜션",basicInspection:"기본 부품",basicInspectionDesc:"주요 부품 검사",miscInspection:"기타 테스트",miscInspectionDesc:"추가 검사",price:"AED",bookNow:"예약",sedan:"세단",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"럭셔리 & 스포츠",luxuryEn:"Luxury / Coupe",selectPackage:"차량에 맞는 패키지 선택"},booking:{title:"예약",subtitle:"지금 검사 예약",name:"성함",namePlaceholder:"성함 입력",phone:"전화번호",phonePlaceholder:"05XXXXXXXX",email:"이메일 (선택)",emailPlaceholder:"example@email.com",carBrand:"브랜드",selectBrand:"브랜드 선택",carModel:"모델",selectModel:"모델 선택",year:"연식",selectYear:"연식 선택",service:"서비스 유형",selectService:"서비스 선택",date:"희망 날짜",time:"희망 시간",notes:"메모 (선택)",notesPlaceholder:"특별 메모...",submit:"확인",submitting:"예약 중...",success:"예약 완료! 연락드리겠습니다.",error:"오류. 다시 시도하세요.",contactMethod:"연락 방법",signature:"고객 서명"},report:{title:"보고서 다운로드",subtitle:"코드를 입력하여 보고서 받기",codePlaceholder:"코드 입력",search:"검색",searching:"검색 중...",downloadPdf:"PDF 다운로드",images:"검사 사진",downloadAll:"모두 다운로드",notFound:"보고서를 찾을 수 없습니다",found:"보고서 발견!",carInfo:"차량 정보",brand:"브랜드",model:"모델",year:"연식",date:"검사 날짜"},payment:{title:"온라인 결제",subtitle:"카드로 안전하게 결제",badge:"안전 결제",name:"성함",namePlaceholder:"성함 입력",phone:"전화번호",email:"이메일 (선택)",amount:"금액 (AED)",service:"서비스 유형",selectService:"서비스 선택",payNow:"지금 결제",processing:"처리 중...",features:"결제 기능",secure:"100% 안전",secureStripe:"Stripe 안전 결제",cards:"Visa 및 Mastercard",ssl:"SSL/TLS 암호화",receipt:"즉시 영수증"},paymentSuccess:{title:"결제 완료!",message:"감사합니다! 결제가 완료되었습니다.",name:"성함",amount:"금액",status:"상태",paid:"결제 완료",nextSteps:"다음 단계:",step1:"예약 확인을 위해 연락드리겠습니다",step2:"확인 이메일을 보내드립니다",step3:"검사 후 보고서를 다운로드할 수 있습니다",backHome:"홈으로",downloadReport:"보고서 다운로드",contact:"문의:"},paymentCancel:{title:"결제 취소",message:"결제가 완료되지 않았습니다. 다시 시도하세요.",tryAgain:"다시 시도",backHome:"홈으로",contact:"도움:"},footer:{about:"소개",aboutText:"High Safety International - 기술 검사 센터. UAE 고품질 서비스.",quickLinks:"빠른 링크",contact:"연락처",location:"샤르자 - 산업 지구 13",rights:"모든 권리 보유"},chat:{title:"스마트 어시스턴트",placeholder:"메시지 입력...",send:"보내기",welcome:`안녕하세요! High Safety 어시스턴트입니다. 도움:

📋 검사 예약
💰 가격 및 서비스
📍 위치 및 영업시간
❓ 질문

어떻게 도와드릴까요?`},common:{loading:"로딩 중...",error:"오류가 발생했습니다",success:"성공",close:"닫기",confirm:"확인",cancel:"취소",aed:"AED"},languageSwitcher:{title:"언어 선택",current:"언어"}},it:{dir:"ltr",nav:{home:"Home",services:"Servizi",booking:"Prenota",report:"Scarica Report",payment:"Pagamento",downloadApp:"Scarica App",admin:"Admin"},hero:{badge:"Centro #1 negli EAU",title:"High Safety International",subtitle:"Ispezione Tecnica Veicoli",description:"Servizi di ispezione veicolare ai più alti standard di qualità",features:"Attrezzatura Avanzata • Team Esperto • Report Completi",bookNow:"Prenota Ora",downloadReport:"Scarica Report"},stats:{cars:"Veicoli Ispezionati",years:"Anni di Esperienza",customers:"Clienti Soddisfatti",rating:"Valutazione"},services:{title:"I Nostri Servizi",subtitle:"Scegli il pacchetto per il tuo veicolo",fullInspection:"Ispezione Completa",fullInspectionDesc:"Ispezione completa del veicolo",mechanicalInspection:"Meccanica + Computer",mechanicalInspectionDesc:"Motore, trasmissione, freni, sospensioni",basicInspection:"Parti Base",basicInspectionDesc:"Ispezione delle parti principali",miscInspection:"Test Vari",miscInspectionDesc:"Ispezioni aggiuntive",price:"AED",bookNow:"Prenota",sedan:"Berlina",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"Lusso e Sportive",luxuryEn:"Luxury / Coupe",selectPackage:"Scegli il pacchetto per il tuo veicolo"},booking:{title:"Prenota Appuntamento",subtitle:"Prenota ora la tua ispezione",name:"Nome Completo",namePlaceholder:"Inserisci il tuo nome",phone:"Telefono",phonePlaceholder:"05XXXXXXXX",email:"Email (Opzionale)",emailPlaceholder:"esempio@email.com",carBrand:"Marca",selectBrand:"Seleziona Marca",carModel:"Modello",selectModel:"Seleziona Modello",year:"Anno",selectYear:"Seleziona Anno",service:"Tipo Servizio",selectService:"Seleziona Servizio",date:"Data Preferita",time:"Ora Preferita",notes:"Note (Opzionale)",notesPlaceholder:"Note speciali...",submit:"Conferma",submitting:"Prenotazione...",success:"Prenotazione riuscita! Ti contatteremo.",error:"Errore. Riprova.",contactMethod:"Metodo di Contatto",signature:"Firma Cliente"},report:{title:"Scarica Report",subtitle:"Inserisci il codice per ottenere il report",codePlaceholder:"Inserisci codice",search:"Cerca",searching:"Ricerca...",downloadPdf:"Scarica PDF",images:"Foto Ispezione",downloadAll:"Scarica Tutte",notFound:"Report non trovato",found:"Report trovato!",carInfo:"Informazioni Veicolo",brand:"Marca",model:"Modello",year:"Anno",date:"Data Ispezione"},payment:{title:"Pagamento Online",subtitle:"Paga in sicurezza con carta",badge:"Pagamento Sicuro",name:"Nome Completo",namePlaceholder:"Inserisci il tuo nome",phone:"Telefono",email:"Email (Opzionale)",amount:"Importo (AED)",service:"Tipo Servizio",selectService:"Seleziona Servizio",payNow:"Paga Ora",processing:"Elaborazione...",features:"Funzionalità Pagamento",secure:"100% Sicuro",secureStripe:"Pagamento sicuro Stripe",cards:"Visa e Mastercard",ssl:"Crittografia SSL/TLS",receipt:"Ricevuta istantanea"},paymentSuccess:{title:"Pagamento Riuscito!",message:"Grazie! Il tuo pagamento è stato ricevuto.",name:"Nome",amount:"Importo",status:"Stato",paid:"Pagato",nextSteps:"Prossimi Passi:",step1:"Ti contatteremo per confermare",step2:"Riceverai un'email di conferma",step3:"Scarica il report dopo l'ispezione",backHome:"Torna alla Home",downloadReport:"Scarica Report",contact:"Domande:"},paymentCancel:{title:"Pagamento Annullato",message:"Pagamento non completato. Riprova.",tryAgain:"Riprova",backHome:"Torna alla Home",contact:"Aiuto:"},footer:{about:"Chi Siamo",aboutText:"High Safety International - Centro Ispezione Tecnica. Servizi di qualità negli EAU.",quickLinks:"Link Rapidi",contact:"Contattaci",location:"Sharjah - Zona Industriale 13",rights:"Tutti i Diritti Riservati"},chat:{title:"Assistente Intelligente",placeholder:"Scrivi un messaggio...",send:"Invia",welcome:`Ciao! Sono l'assistente di High Safety. Posso aiutarti con:

📋 Prenotare ispezione
💰 Prezzi e servizi
📍 Posizione e orari
❓ Domande

Come posso aiutarti?`},common:{loading:"Caricamento...",error:"Si è verificato un errore",success:"Successo",close:"Chiudi",confirm:"Conferma",cancel:"Annulla",aed:"AED"},languageSwitcher:{title:"Seleziona Lingua",current:"Lingua"}},bn:{dir:"ltr",nav:{home:"হোম",services:"সেবা",booking:"বুকিং",report:"রিপোর্ট ডাউনলোড",payment:"পেমেন্ট",downloadApp:"অ্যাপ ডাউনলোড",admin:"অ্যাডমিন"},hero:{badge:"UAE এ #1 কেন্দ্র",title:"High Safety International",subtitle:"প্রযুক্তিগত গাড়ি পরিদর্শন",description:"সর্বোচ্চ মানের গাড়ি পরিদর্শন সেবা",features:"আধুনিক সরঞ্জাম • বিশেষজ্ঞ দল • সম্পূর্ণ রিপোর্ট",bookNow:"এখনই বুক করুন",downloadReport:"রিপোর্ট ডাউনলোড"},stats:{cars:"পরিদর্শিত গাড়ি",years:"বছরের অভিজ্ঞতা",customers:"সন্তুষ্ট গ্রাহক",rating:"গ্রাহক রেটিং"},services:{title:"আমাদের সেবা",subtitle:"আপনার গাড়ির জন্য প্যাকেজ বেছে নিন",fullInspection:"সম্পূর্ণ পরিদর্শন",fullInspectionDesc:"সম্পূর্ণ গাড়ি পরিদর্শন",mechanicalInspection:"মেকানিক্যাল + কম্পিউটার",mechanicalInspectionDesc:"ইঞ্জিন, ট্রান্সমিশন, ব্রেক, সাসপেনশন",basicInspection:"বেসিক পার্টস",basicInspectionDesc:"প্রধান পার্টস পরিদর্শন",miscInspection:"বিবিধ টেস্ট",miscInspectionDesc:"অতিরিক্ত পরিদর্শন",price:"AED",bookNow:"বুক করুন",sedan:"সেডান",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"লাক্সারি ও স্পোর্টস",luxuryEn:"Luxury / Coupe",selectPackage:"আপনার গাড়ির জন্য প্যাকেজ বেছে নিন"},booking:{title:"অ্যাপয়েন্টমেন্ট বুক",subtitle:"এখনই পরিদর্শন বুক করুন",name:"সম্পূর্ণ নাম",namePlaceholder:"নাম লিখুন",phone:"ফোন",phonePlaceholder:"05XXXXXXXX",email:"ইমেইল (ঐচ্ছিক)",emailPlaceholder:"example@email.com",carBrand:"ব্র্যান্ড",selectBrand:"ব্র্যান্ড নির্বাচন",carModel:"মডেল",selectModel:"মডেল নির্বাচন",year:"বছর",selectYear:"বছর নির্বাচন",service:"সেবার ধরন",selectService:"সেবা নির্বাচন",date:"পছন্দের তারিখ",time:"পছন্দের সময়",notes:"নোট (ঐচ্ছিক)",notesPlaceholder:"বিশেষ নোট...",submit:"নিশ্চিত করুন",submitting:"বুক হচ্ছে...",success:"বুকিং সফল! আমরা যোগাযোগ করব।",error:"ত্রুটি। আবার চেষ্টা করুন।",contactMethod:"যোগাযোগ পদ্ধতি",signature:"গ্রাহক স্বাক্ষর"},report:{title:"রিপোর্ট ডাউনলোড",subtitle:"রিপোর্ট পেতে কোড লিখুন",codePlaceholder:"কোড লিখুন",search:"খুঁজুন",searching:"খোঁজা হচ্ছে...",downloadPdf:"PDF ডাউনলোড",images:"পরিদর্শন ফটো",downloadAll:"সব ডাউনলোড",notFound:"রিপোর্ট পাওয়া যায়নি",found:"রিপোর্ট পাওয়া গেছে!",carInfo:"গাড়ির তথ্য",brand:"ব্র্যান্ড",model:"মডেল",year:"বছর",date:"পরিদর্শন তারিখ"},payment:{title:"অনলাইন পেমেন্ট",subtitle:"কার্ডে নিরাপদে পরিশোধ করুন",badge:"নিরাপদ পেমেন্ট",name:"সম্পূর্ণ নাম",namePlaceholder:"নাম লিখুন",phone:"ফোন",email:"ইমেইল (ঐচ্ছিক)",amount:"পরিমাণ (AED)",service:"সেবার ধরন",selectService:"সেবা নির্বাচন",payNow:"এখনই পরিশোধ",processing:"প্রক্রিয়াকরণ...",features:"পেমেন্ট বৈশিষ্ট্য",secure:"100% নিরাপদ",secureStripe:"Stripe নিরাপদ পেমেন্ট",cards:"Visa ও Mastercard",ssl:"SSL/TLS এনক্রিপশন",receipt:"তাৎক্ষণিক রসিদ"},paymentSuccess:{title:"পেমেন্ট সফল!",message:"ধন্যবাদ! আপনার পেমেন্ট গ্রহণ হয়েছে।",name:"নাম",amount:"পরিমাণ",status:"স্ট্যাটাস",paid:"পরিশোধিত",nextSteps:"পরবর্তী ধাপ:",step1:"নিশ্চিত করতে যোগাযোগ করব",step2:"নিশ্চিতকরণ ইমেইল পাবেন",step3:"পরিদর্শনের পর রিপোর্ট ডাউনলোড",backHome:"হোমে ফিরুন",downloadReport:"রিপোর্ট ডাউনলোড",contact:"প্রশ্ন:"},paymentCancel:{title:"পেমেন্ট বাতিল",message:"পেমেন্ট সম্পন্ন হয়নি। আবার চেষ্টা করুন।",tryAgain:"আবার চেষ্টা",backHome:"হোমে ফিরুন",contact:"সাহায্য:"},footer:{about:"আমাদের সম্পর্কে",aboutText:"High Safety International - প্রযুক্তিগত পরিদর্শন কেন্দ্র। UAE তে মানসম্মত সেবা।",quickLinks:"দ্রুত লিংক",contact:"যোগাযোগ",location:"শারজাহ - শিল্প এলাকা ১৩",rights:"সর্বস্বত্ব সংরক্ষিত"},chat:{title:"স্মার্ট সহায়ক",placeholder:"বার্তা লিখুন...",send:"পাঠান",welcome:`হ্যালো! আমি High Safety সহায়ক। সাহায্য:

📋 পরিদর্শন বুক
💰 মূল্য ও সেবা
📍 অবস্থান ও সময়সূচী
❓ প্রশ্ন

কীভাবে সাহায্য করতে পারি?`},common:{loading:"লোড হচ্ছে...",error:"ত্রুটি হয়েছে",success:"সফল",close:"বন্ধ",confirm:"নিশ্চিত",cancel:"বাতিল",aed:"AED"},languageSwitcher:{title:"ভাষা নির্বাচন",current:"ভাষা"}},tl:{dir:"ltr",nav:{home:"Home",services:"Serbisyo",booking:"Mag-book",report:"I-download ang Report",payment:"Bayad",downloadApp:"I-download ang App",admin:"Admin"},hero:{badge:"#1 Center sa UAE",title:"High Safety International",subtitle:"Technical na Inspeksyon ng Sasakyan",description:"Nagbibigay ng serbisyo sa inspeksyon ng sasakyan na may pinakamataas na kalidad",features:"Advanced na Kagamitan • Expert na Team • Kompletong Report",bookNow:"Mag-book Ngayon",downloadReport:"I-download ang Report"},stats:{cars:"Inspected na Sasakyan",years:"Taon ng Karanasan",customers:"Masayang Kustomer",rating:"Rating ng Kustomer"},services:{title:"Mga Serbisyo",subtitle:"Pumili ng pakete para sa iyong sasakyan",fullInspection:"Buong Inspeksyon",fullInspectionDesc:"Kompletong inspeksyon ng sasakyan",mechanicalInspection:"Mechanical + Computer",mechanicalInspectionDesc:"Engine, transmission, brakes, suspension",basicInspection:"Basic Parts",basicInspectionDesc:"Inspeksyon ng pangunahing bahagi",miscInspection:"Iba't ibang Test",miscInspectionDesc:"Karagdagang inspeksyon",price:"AED",bookNow:"Mag-book",sedan:"Sedan",sedanEn:"Sedan",suv:"4WD / SUV",suvEn:"4WD / SUV",luxury:"Luxury at Sports",luxuryEn:"Luxury / Coupe",selectPackage:"Pumili ng pakete para sa iyong sasakyan"},booking:{title:"Mag-book ng Appointment",subtitle:"Mag-book ng inspeksyon ngayon",name:"Buong Pangalan",namePlaceholder:"Ilagay ang pangalan",phone:"Telepono",phonePlaceholder:"05XXXXXXXX",email:"Email (Opsyonal)",emailPlaceholder:"example@email.com",carBrand:"Brand",selectBrand:"Pumili ng Brand",carModel:"Model",selectModel:"Pumili ng Model",year:"Taon",selectYear:"Pumili ng Taon",service:"Uri ng Serbisyo",selectService:"Pumili ng Serbisyo",date:"Gustong Petsa",time:"Gustong Oras",notes:"Mga Nota (Opsyonal)",notesPlaceholder:"Mga espesyal na nota...",submit:"Kumpirmahin",submitting:"Nag-bo-book...",success:"Matagumpay ang booking! Kokontakin ka namin.",error:"Error. Subukan ulit.",contactMethod:"Paraan ng Pakikipag-ugnayan",signature:"Lagda ng Kustomer"},report:{title:"I-download ang Report",subtitle:"Ilagay ang code para makuha ang report",codePlaceholder:"Ilagay ang code",search:"Maghanap",searching:"Naghahanap...",downloadPdf:"I-download ang PDF",images:"Mga Larawan ng Inspeksyon",downloadAll:"I-download Lahat",notFound:"Hindi natagpuan ang report",found:"Natagpuan ang report!",carInfo:"Impormasyon ng Sasakyan",brand:"Brand",model:"Model",year:"Taon",date:"Petsa ng Inspeksyon"},payment:{title:"Online na Bayad",subtitle:"Magbayad ng ligtas gamit ang card",badge:"Ligtas na Bayad",name:"Buong Pangalan",namePlaceholder:"Ilagay ang pangalan",phone:"Telepono",email:"Email (Opsyonal)",amount:"Halaga (AED)",service:"Uri ng Serbisyo",selectService:"Pumili ng Serbisyo",payNow:"Magbayad Ngayon",processing:"Pinoproseso...",features:"Mga Feature ng Bayad",secure:"100% Ligtas",secureStripe:"Ligtas na bayad sa Stripe",cards:"Visa at Mastercard",ssl:"SSL/TLS encryption",receipt:"Instant na resibo"},paymentSuccess:{title:"Matagumpay ang Bayad!",message:"Salamat! Natanggap ang iyong bayad.",name:"Pangalan",amount:"Halaga",status:"Status",paid:"Bayad na",nextSteps:"Susunod na Hakbang:",step1:"Kokontakin ka namin para sa kumpirmasyon",step2:"Makakatanggap ka ng email na kumpirmasyon",step3:"I-download ang report pagkatapos ng inspeksyon",backHome:"Bumalik sa Home",downloadReport:"I-download ang Report",contact:"Mga Tanong:"},paymentCancel:{title:"Na-cancel ang Bayad",message:"Hindi nakumpleto ang bayad. Subukan ulit.",tryAgain:"Subukan Ulit",backHome:"Bumalik sa Home",contact:"Tulong:"},footer:{about:"Tungkol sa Amin",aboutText:"High Safety International - Technical Inspection Center. Kalidad na serbisyo sa UAE.",quickLinks:"Mabilis na Links",contact:"Makipag-ugnayan",location:"Sharjah - Industrial Area 13",rights:"Lahat ng Karapatan ay Nakalaan"},chat:{title:"Smart Assistant",placeholder:"Isulat ang mensahe...",send:"Ipadala",welcome:`Kumusta! Ako ang assistant ng High Safety. Makakatulong ako sa:

📋 Mag-book ng inspeksyon
💰 Presyo at serbisyo
📍 Lokasyon at oras
❓ Mga tanong

Paano kita matutulungan?`},common:{loading:"Naglo-load...",error:"May nangyaring error",success:"Tagumpay",close:"Isara",confirm:"Kumpirmahin",cancel:"Kanselahin",aed:"AED"},languageSwitcher:{title:"Pumili ng Wika",current:"Wika"}}},Vu=y.createContext(),nr=[{code:"ar",name:"العربية",flag:"🇦🇪",dir:"rtl"},{code:"en",name:"English",flag:"🇬🇧",dir:"ltr"},{code:"ru",name:"Русский",flag:"🇷🇺",dir:"ltr"},{code:"ur",name:"اردو",flag:"🇵🇰",dir:"rtl"},{code:"fa",name:"فارسی",flag:"🇮🇷",dir:"rtl"},{code:"hi",name:"हिंदी",flag:"🇮🇳",dir:"ltr"},{code:"tr",name:"Türkçe",flag:"🇹🇷",dir:"ltr"},{code:"es",name:"Español",flag:"🇪🇸",dir:"ltr"},{code:"fr",name:"Français",flag:"🇫🇷",dir:"ltr"},{code:"de",name:"Deutsch",flag:"🇩🇪",dir:"ltr"},{code:"pt",name:"Português",flag:"🇧🇷",dir:"ltr"},{code:"zh",name:"中文",flag:"🇨🇳",dir:"ltr"},{code:"ja",name:"日本語",flag:"🇯🇵",dir:"ltr"},{code:"ko",name:"한국어",flag:"🇰🇷",dir:"ltr"},{code:"it",name:"Italiano",flag:"🇮🇹",dir:"ltr"},{code:"bn",name:"বাংলা",flag:"🇧🇩",dir:"ltr"},{code:"tl",name:"Filipino",flag:"🇵🇭",dir:"ltr"}];function $h({children:e}){const[t,n]=y.useState(()=>{if(typeof window<"u"&&window.localStorage){const l=localStorage.getItem("language");if(l&&si[l])return l}return"ar"}),r=si[t]||si.en;y.useEffect(()=>{typeof window<"u"&&(window.localStorage&&localStorage.setItem("language",t),document.documentElement.dir=r.dir,document.documentElement.lang=t)},[t,r.dir]);const a=l=>{si[l]&&n(l)},o=()=>{const c=(nr.findIndex(d=>d.code===t)+1)%nr.length;n(nr[c].code)},s=()=>nr.find(l=>l.code===t);return i.jsx(Vu.Provider,{value:{language:t,setLanguage:a,toggleLanguage:o,t:r,languages:nr,currentLanguage:s()},children:e})}function rt(){const e=y.useContext(Vu);if(!e)throw new Error("useLanguage must be used within a LanguageProvider");return e}var Xh={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Yh=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),M=(e,t)=>{const n=y.forwardRef(({color:r="currentColor",size:a=24,strokeWidth:o=2,absoluteStrokeWidth:s,children:l,...c},d)=>y.createElement("svg",{ref:d,...Xh,width:a,height:a,stroke:r,strokeWidth:s?Number(o)*24/Number(a):o,className:`lucide lucide-${Yh(e)}`,...c},[...t.map(([h,m])=>y.createElement(h,m)),...(Array.isArray(l)?l:[l])||[]]));return n.displayName=`${e}`,n},Ki=M("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]),Tr=M("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),Va=M("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]]),Qh=M("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]),li=M("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]),qt=M("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]),Kh=M("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]),qh=M("Car",[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]]),fe=M("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]),dn=M("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),Zh=M("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),ci=M("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]),di=M("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),gr=M("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),Gh=M("Coffee",[["path",{d:"M17 8h1a4 4 0 1 1 0 8h-1",key:"jx4kbh"}],["path",{d:"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z",key:"1bxrl0"}],["line",{x1:"6",x2:"6",y1:"2",y2:"4",key:"1cr9l3"}],["line",{x1:"10",x2:"10",y1:"2",y2:"4",key:"170wym"}],["line",{x1:"14",x2:"14",y1:"2",y2:"4",key:"1c5f70"}]]),$u=M("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),Vo=M("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]),xc=M("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]),ma=M("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),$s=M("FileCheck",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"m9 15 2 2 4-4",key:"1grp1n"}]]),Lt=M("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]),Jh=M("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]),Xs=M("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]),Xu=M("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]),eg=M("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),$o=M("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]),tg=M("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]),Yu=M("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]),yc=M("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]),ng=M("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]),Qu=M("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]),Ku=M("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]),qu=M("PenTool",[["path",{d:"m12 19 7-7 3 3-7 7-3-3z",key:"rklqx2"}],["path",{d:"m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z",key:"1et58u"}],["path",{d:"m2 2 7.586 7.586",key:"etlp93"}],["circle",{cx:"11",cy:"11",r:"2",key:"xmgehs"}]]),Zu=M("PhoneCall",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}],["path",{d:"M14.05 2a9 9 0 0 1 8 7.94",key:"vmijpz"}],["path",{d:"M14.05 6A5 5 0 0 1 18 10",key:"13nbpp"}]]),Tt=M("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]),Gu=M("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),Ju=M("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),Ys=M("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]),fa=M("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),rg=M("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]),Yt=M("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]]),$a=M("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]),ep=M("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]),Pn=M("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]),ig=M("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]),Xo=M("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),vc=M("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),tp=M("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),Yo=M("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),ag=M("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]),og=M("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),Zt=M("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),wc=M("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]);function sg(){var S;const{language:e,setLanguage:t,t:n,languages:r,currentLanguage:a}=rt(),[o,s]=y.useState(!1),[l,c]=y.useState(null),[d,h]=y.useState(!1),[m,g]=y.useState(!1),[j,w]=y.useState(!1),[b,v]=y.useState(!1),[p,u]=y.useState(!1),f=y.useRef(null),k=Un(),z=e==="ar"||e==="ur"||e==="fa";y.useEffect(()=>{const I=x=>{f.current&&!f.current.contains(x.target)&&v(!1)};return document.addEventListener("mousedown",I),()=>document.removeEventListener("mousedown",I)},[]),y.useEffect(()=>{const I=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone){h(!0);return}I&&g(!0);const F=ye=>{ye.preventDefault(),c(ye)},A=()=>{h(!0),c(null)};return window.addEventListener("beforeinstallprompt",F),window.addEventListener("appinstalled",A),()=>{window.removeEventListener("beforeinstallprompt",F),window.removeEventListener("appinstalled",A)}},[]);const N=async()=>{if(s(!1),m){w(!0);return}if(l){l.prompt();const{outcome:I}=await l.userChoice;I==="accepted"&&h(!0),c(null)}else u(!0)},P=[{path:"/",label:n.nav.home,icon:i.jsx(Xs,{size:18})},{path:"/services",label:n.nav.services,icon:i.jsx(fa,{size:18})},{path:"/booking",label:n.nav.booking,icon:i.jsx(qt,{size:18})},{path:"/report",label:n.nav.report,icon:i.jsx(Lt,{size:18})}];return i.jsxs(i.Fragment,{children:[i.jsxs("header",{className:"header-pro",children:[i.jsx("div",{className:"header-top",children:i.jsxs("div",{className:"container",children:[i.jsxs(_e,{to:"/",className:"logo-pro",children:[i.jsx("div",{className:"logo-image-container",children:i.jsx("img",{src:"/images/logo.png",alt:"High Safety Logo"})}),i.jsxs("div",{className:"logo-text-container",children:[i.jsx("h1",{children:e==="ar"?"الأمان العالي الدولي":"High Safety International"}),i.jsx("span",{className:"logo-subtitle",children:e==="ar"?"للفحص الفني للسيارات":"Technical Car Inspection"})]})]}),i.jsxs("div",{className:"header-actions",children:[i.jsxs("div",{className:"language-switcher-pro",ref:f,children:[i.jsxs("button",{className:"lang-switcher-btn-pro",onClick:()=>v(!b),children:[i.jsx("span",{className:"lang-flag",children:a==null?void 0:a.flag}),i.jsx("span",{className:"lang-code",children:(S=a==null?void 0:a.code)==null?void 0:S.toUpperCase()}),i.jsx(Zh,{size:14,className:`lang-chevron ${b?"rotated":""}`})]}),b&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"lang-dropdown-overlay",onClick:()=>v(!1)}),i.jsxs("div",{className:"lang-dropdown-pro",children:[i.jsxs("div",{className:"lang-dropdown-header",children:[i.jsx(Jh,{size:16}),i.jsx("span",{children:e==="ar"?"اختر اللغة":"Select Language"})]}),i.jsx("div",{className:"lang-dropdown-grid",children:r.map(I=>i.jsxs("button",{className:`lang-option ${e===I.code?"active":""}`,onClick:()=>{t(I.code),v(!1),s(!1)},children:[i.jsx("span",{className:"lang-option-flag",children:I.flag}),i.jsx("span",{className:"lang-option-name",children:I.name}),e===I.code&&i.jsx(dn,{size:14,className:"lang-check"})]},I.code))})]})]})]}),!d&&i.jsxs("button",{className:"install-btn-pro",onClick:N,children:[i.jsx($a,{size:16}),i.jsx("span",{children:e==="ar"?"تحميل":"Install"})]}),i.jsx("button",{className:"mobile-menu-btn-pro",onClick:()=>s(!o),children:o?i.jsx(Zt,{size:24}):i.jsx(ng,{size:24})})]})]})}),i.jsx("nav",{className:`nav-pro ${o?"nav-open":""}`,children:i.jsx("div",{className:"container",children:i.jsx("div",{className:"nav-items",children:P.map(I=>i.jsxs(_e,{to:I.path,className:`nav-item ${k.pathname===I.path?"active":""}`,onClick:()=>s(!1),children:[I.icon,i.jsx("span",{children:I.label})]},I.path))})})})]}),i.jsx("style",{children:`
        .header-pro {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: linear-gradient(180deg, #0a0a14 0%, #0d0d1a 100%);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        
        .header-top {
          padding: 15px 0;
          border-bottom: 1px solid rgba(212, 168, 83, 0.15);
        }
        
        .header-top .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .logo-pro {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
          color: white;
        }
        
        .logo-image-container {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #D4A853;
          box-shadow: 0 4px 20px rgba(212, 168, 83, 0.4);
          flex-shrink: 0;
        }
        
        .logo-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .logo-text-container {
          display: flex;
          flex-direction: column;
        }
        
        .logo-text-container h1 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #D4A853;
          margin: 0;
          text-shadow: 0 0 30px rgba(212, 168, 83, 0.3);
          letter-spacing: 0.5px;
        }
        
        .logo-subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 2px;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .lang-switcher-btn-pro {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(212, 168, 83, 0.15);
          border: 1px solid rgba(212, 168, 83, 0.3);
          padding: 8px 14px;
          border-radius: 25px;
          color: white;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.3s ease;
        }
        
        .lang-switcher-btn-pro:hover {
          background: rgba(212, 168, 83, 0.25);
          border-color: #D4A853;
        }
        
        .lang-flag {
          font-size: 1.2rem;
        }
        
        .lang-code {
          font-weight: 700;
          font-size: 0.85rem;
        }
        
        .lang-chevron {
          color: #D4A853;
          transition: transform 0.3s ease;
        }
        
        .lang-chevron.rotated {
          transform: rotate(180deg);
        }
        
        .install-btn-pro {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #D4A853, #e8c252);
          color: #0a0a14;
          border: none;
          padding: 8px 16px;
          border-radius: 25px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }
        
        .install-btn-pro:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 168, 83, 0.4);
        }
        
        .mobile-menu-btn-pro {
          display: none;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 8px;
        }
        
        .nav-pro {
          background: rgba(20, 20, 35, 0.95);
          border-bottom: 1px solid rgba(212, 168, 83, 0.1);
        }
        
        .nav-pro .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .nav-items {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 12px 0;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 30px;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        
        .nav-item:hover {
          color: #D4A853;
          background: rgba(212, 168, 83, 0.1);
          border-color: rgba(212, 168, 83, 0.3);
        }
        
        .nav-item.active {
          color: #D4A853;
          background: rgba(212, 168, 83, 0.15);
          border-color: rgba(212, 168, 83, 0.4);
        }
        
        .nav-item svg {
          flex-shrink: 0;
        }
        
        .language-switcher-pro {
          position: relative;
        }
        
        .lang-dropdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 10001;
        }
        
        .lang-dropdown-pro {
          position: absolute;
          top: calc(100% + 10px);
          ${z?"left: 0;":"right: 0;"}
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          overflow: hidden;
          z-index: 10002;
          min-width: 280px;
          animation: dropdownSlide 0.25s ease;
        }
        
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .lang-dropdown-header {
          padding: 14px 18px;
          background: linear-gradient(135deg, #0a0a14, #1a1a2e);
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          border-bottom: 2px solid #D4A853;
        }
        
        .lang-dropdown-header svg {
          color: #D4A853;
        }
        
        .lang-dropdown-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          padding: 12px;
          background: #f8f9fb;
        }
        
        .lang-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          border: 2px solid transparent;
          background: white;
          border-radius: 10px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .lang-option:hover {
          border-color: rgba(212, 168, 83, 0.3);
          background: rgba(212, 168, 83, 0.05);
        }
        
        .lang-option.active {
          border-color: #D4A853;
          background: rgba(212, 168, 83, 0.1);
        }
        
        .lang-option-flag {
          font-size: 1.5rem;
        }
        
        .lang-option-name {
          font-size: 0.7rem;
          color: #333;
          font-weight: 600;
          text-align: center;
        }
        
        .lang-option.active .lang-option-name {
          color: #D4A853;
          font-weight: 700;
        }
        
        .lang-check {
          position: absolute;
          top: 4px;
          right: 4px;
          color: white;
          background: #D4A853;
          border-radius: 50%;
          padding: 2px;
        }
        
        @media (max-width: 900px) {
          .mobile-menu-btn-pro {
            display: block;
          }
          
          .install-btn-pro span {
            display: none;
          }
          
          .install-btn-pro {
            padding: 10px;
            border-radius: 50%;
          }
          
          .nav-pro {
            display: none;
          }
          
          .nav-pro.nav-open {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #0d0d1a;
            border-bottom: 2px solid rgba(212, 168, 83, 0.3);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          
          .nav-items {
            flex-direction: column;
            padding: 15px;
            gap: 8px;
          }
          
          .nav-item {
            justify-content: center;
            padding: 14px 20px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
          }
          
          .logo-text-container h1 {
            font-size: 1rem;
          }
          
          .logo-subtitle {
            font-size: 0.7rem;
          }
          
          .logo-image-container {
            width: 45px;
            height: 45px;
          }
        }
        
        @media (max-width: 480px) {
          .logo-text-container h1 {
            font-size: 0.9rem;
          }
          
          .logo-subtitle {
            display: none;
          }
          
          .logo-image-container {
            width: 40px;
            height: 40px;
          }
          
          .lang-switcher-btn-pro {
            padding: 6px 10px;
          }
          
          .lang-code {
            display: none;
          }
        }
      `}),p&&i.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10001,padding:"20px"},onClick:()=>u(!1),children:i.jsxs("div",{style:{background:"white",borderRadius:"20px",padding:"30px",maxWidth:"350px",textAlign:"center",position:"relative"},onClick:I=>I.stopPropagation(),children:[i.jsx("button",{onClick:()=>u(!1),style:{position:"absolute",top:"15px",left:"15px",background:"#f0f0f0",border:"none",borderRadius:"50%",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:i.jsx(Zt,{size:16})}),i.jsx("div",{style:{width:"70px",height:"70px",background:"linear-gradient(135deg, #0a0a14, #1a1a2e)",borderRadius:"15px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:i.jsx($a,{size:35,color:"#D4A853"})}),i.jsx("h3",{style:{color:"#0a0a14",marginBottom:"20px",fontSize:"1.2rem"},children:e==="ar"?"تثبيت التطبيق":"Install App"}),i.jsxs("div",{style:{textAlign:e==="ar"?"right":"left",color:"#333",lineHeight:"2.2",fontSize:"0.95rem"},children:[i.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[i.jsx("span",{style:{background:"#D4A853",color:"white",width:"25px",height:"25px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",flexShrink:0},children:"1"}),e==="ar"?"افتح الموقع في Chrome":"Open in Chrome browser"]}),i.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[i.jsx("span",{style:{background:"#D4A853",color:"white",width:"25px",height:"25px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",flexShrink:0},children:"2"}),e==="ar"?"اضغط على ⋮ (القائمة)":"Tap ⋮ (menu)"]}),i.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[i.jsx("span",{style:{background:"#D4A853",color:"white",width:"25px",height:"25px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",flexShrink:0},children:"3"}),e==="ar"?'اختر "إضافة إلى الشاشة الرئيسية"':'Select "Add to Home Screen"']})]}),i.jsx("button",{onClick:()=>u(!1),style:{marginTop:"25px",background:"linear-gradient(135deg, #0a0a14, #1a1a2e)",color:"white",border:"none",padding:"14px 40px",borderRadius:"10px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit",fontSize:"1rem"},children:e==="ar"?"فهمت":"Got it"})]})}),j&&i.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10001,padding:"20px"},onClick:()=>w(!1),children:i.jsxs("div",{style:{background:"white",borderRadius:"20px",padding:"30px",maxWidth:"350px",textAlign:"center",position:"relative"},onClick:I=>I.stopPropagation(),children:[i.jsx("button",{onClick:()=>w(!1),style:{position:"absolute",top:"15px",left:"15px",background:"#f0f0f0",border:"none",borderRadius:"50%",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:i.jsx(Zt,{size:16})}),i.jsx("div",{style:{width:"70px",height:"70px",background:"linear-gradient(135deg, #0a0a14, #1a1a2e)",borderRadius:"15px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"},children:i.jsx($a,{size:35,color:"#D4A853"})}),i.jsx("h3",{style:{color:"#0a0a14",marginBottom:"20px",fontSize:"1.2rem"},children:e==="ar"?"تثبيت التطبيق على iPhone":"Install App on iPhone"}),i.jsxs("div",{style:{textAlign:e==="ar"?"right":"left",color:"#333",lineHeight:"2.2",fontSize:"0.95rem"},children:[i.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[i.jsx("span",{style:{background:"#D4A853",color:"white",width:"25px",height:"25px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",flexShrink:0},children:"1"}),e==="ar"?"اضغط على زر المشاركة":"Tap the Share button",i.jsx("span",{style:{fontSize:"1.2rem"},children:"⬆️"})]}),i.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[i.jsx("span",{style:{background:"#D4A853",color:"white",width:"25px",height:"25px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",flexShrink:0},children:"2"}),e==="ar"?'اختر "إضافة إلى الشاشة الرئيسية"':'Select "Add to Home Screen"']}),i.jsxs("p",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[i.jsx("span",{style:{background:"#D4A853",color:"white",width:"25px",height:"25px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",flexShrink:0},children:"3"}),e==="ar"?'اضغط "إضافة"':'Tap "Add"']})]}),i.jsx("button",{onClick:()=>w(!1),style:{marginTop:"25px",background:"linear-gradient(135deg, #0a0a14, #1a1a2e)",color:"white",border:"none",padding:"14px 40px",borderRadius:"10px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit",fontSize:"1rem"},children:e==="ar"?"فهمت":"Got it"})]})})]})}function lg(){const{language:e,t}=rt();return i.jsx("footer",{className:"footer",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"footer-content",children:[i.jsxs("div",{className:"footer-section",children:[i.jsx("h4",{children:t.footer.about}),i.jsx("p",{children:t.footer.aboutText})]}),i.jsxs("div",{className:"footer-section",children:[i.jsx("h4",{children:t.footer.contact}),i.jsxs("div",{className:"contact-info",children:[i.jsx(Tt,{size:18}),i.jsx("span",{children:"+971 054 220 6000"})]}),i.jsxs("div",{className:"contact-info",children:[i.jsx(Yu,{size:18}),i.jsx("span",{children:"highsafety2021@gmail.com"})]})]}),i.jsxs("div",{className:"footer-section",children:[i.jsx("h4",{children:t.footer.quickLinks}),i.jsx("a",{href:"/services",children:t.nav.services}),i.jsx("a",{href:"/booking",children:t.nav.booking}),i.jsx("a",{href:"/report",children:t.nav.report})]})]}),i.jsx("div",{className:"footer-bottom",children:i.jsxs("p",{children:["© 2024 ",e==="ar"?"الأمان العالي الدولي للفحص الفني للسيارات":"High Safety International Technical Car Inspection"," - ",t.footer.rights]})})]})})}function cg(){const[e,t]=y.useState(!1);return i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
        .social-toggle-btn {
          position: fixed;
          left: 15px;
          bottom: 90px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          border: 2px solid #C89D2A;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 997;
          box-shadow: 0 4px 15px rgba(11, 31, 58, 0.4);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .social-toggle-btn:hover {
          transform: scale(1.1);
        }
        .social-buttons-container {
          position: fixed;
          left: 15px;
          bottom: 145px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 996;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }
        .social-buttons-container.expanded {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .social-btn {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none;
        }
        .social-btn:hover {
          transform: scale(1.15);
        }
        .social-btn.whatsapp {
          background: #25D366;
          box-shadow: 0 4px 15px rgba(37,211,102,0.4);
        }
        .social-btn.facebook {
          background: #1877F2;
          box-shadow: 0 4px 15px rgba(24,119,242,0.4);
        }
        .social-btn.tiktok {
          background: #000000;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        @media (max-width: 768px) {
          .social-toggle-btn {
            width: 40px;
            height: 40px;
            bottom: 80px;
            left: 10px;
          }
          .social-buttons-container {
            bottom: 130px;
            left: 10px;
          }
          .social-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}),i.jsx("div",{className:"social-toggle-btn",onClick:()=>t(!e),title:e?"إغلاق":"تواصل معنا",children:e?i.jsx(Zt,{size:20,color:"#C89D2A"}):i.jsx(rg,{size:20,color:"#C89D2A"})}),i.jsxs("div",{className:`social-buttons-container ${e?"expanded":""}`,children:[i.jsx("a",{href:"https://wa.me/9710542206000",target:"_blank",rel:"noopener noreferrer",className:"social-btn whatsapp",title:"واتساب",children:i.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"white",children:i.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})})}),i.jsx("a",{href:"https://www.facebook.com/share/1WgxRcySN1/",target:"_blank",rel:"noopener noreferrer",className:"social-btn facebook",title:"فيسبوك",children:i.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"white",children:i.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})})}),i.jsx("a",{href:"https://www.tiktok.com/@highs.afety",target:"_blank",rel:"noopener noreferrer",className:"social-btn tiktok",title:"تيك توك",children:i.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"white",children:i.jsx("path",{d:"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"})})})]})]})}function dg(){const[e,t]=y.useState(!1),[n,r]=y.useState(null);y.useEffect(()=>{if("serviceWorker"in navigator){navigator.serviceWorker.ready.then(s=>{s.addEventListener("updatefound",()=>{const l=s.installing;l&&l.addEventListener("statechange",()=>{l.state==="installed"&&navigator.serviceWorker.controller&&(r(l),t(!0))})})});let o=!1;navigator.serviceWorker.addEventListener("controllerchange",()=>{o||(o=!0,window.location.reload())})}},[]);const a=()=>{n&&n.postMessage("skipWaiting"),t(!1)};return e?i.jsxs("div",{style:{position:"fixed",top:"20px",left:"20px",right:"20px",background:"linear-gradient(135deg, #28a745, #20c997)",color:"white",padding:"15px 20px",borderRadius:"12px",boxShadow:"0 10px 40px rgba(0,0,0,0.3)",zIndex:10001,display:"flex",alignItems:"center",gap:"15px",animation:"slideDown 0.3s ease"},children:[i.jsx("style",{children:`
        @keyframes slideDown {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}),i.jsx(Gu,{size:24}),i.jsxs("div",{style:{flex:1},children:[i.jsx("strong",{children:"تحديث جديد متاح!"}),i.jsx("p",{style:{margin:"5px 0 0",fontSize:"0.9rem",opacity:.9},children:"اضغط للتحديث الآن"})]}),i.jsx("button",{onClick:a,style:{background:"white",color:"#28a745",border:"none",padding:"10px 20px",borderRadius:"8px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"},children:"تحديث"}),i.jsx("button",{onClick:()=>t(!1),style:{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"white"},children:i.jsx(Zt,{size:18})})]}):null}function ug(){const[e,t]=y.useState(!1),[n,r]=y.useState([{role:"assistant",content:`مرحباً! أنا المساعد الذكي لمركز الأمان العالي للفحص الفني. يمكنني مساعدتك في:

📋 حجز موعد للفحص
💰 الاستفسار عن الأسعار والخدمات
📍 معلومات الموقع وساعات العمل
🔍 البحث عن معلومات السيارة برقم الشاصي (VIN)
📸 تحليل صورة ملصق السيارة لاستخراج البيانات
❓ الإجابة على أي استفسارات

كيف يمكنني خدمتك؟`}]),[a,o]=y.useState(""),[s,l]=y.useState(!1),[c,d]=y.useState(!1),h=y.useRef(null),m=y.useRef(null),g=()=>{var v;(v=h.current)==null||v.scrollIntoView({behavior:"smooth"})};y.useEffect(()=>{g()},[n]);const j=async(v=null)=>{const p=v||a.trim();if(!p||s)return;v||o("");const u=[...n,{role:"user",content:p}];r(u),l(!0);try{const f=u.map(N=>({role:N.role,content:N.content})),z=await(await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:p,history:f})})).json();r(N=>[...N,{role:"assistant",content:z.reply}])}catch{r(k=>[...k,{role:"assistant",content:"عذراً، حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا عبر الواتساب."}])}finally{l(!1)}},w=async v=>{var f;const p=(f=v.target.files)==null?void 0:f[0];if(!p)return;if(!p.type.startsWith("image/")){r(k=>[...k,{role:"assistant",content:"يرجى رفع ملف صورة فقط (JPG, PNG, etc.)"}]);return}r(k=>[...k,{role:"user",content:`📸 جاري تحليل صورة: ${p.name}`,isImage:!0}]),d(!0);const u=new FormData;u.append("image",p);try{const z=await(await fetch("/api/chat/analyze-vin-image",{method:"POST",body:u})).json();if(z.success&&z.data){const N=z.data,P=N.decodedVIN;let S=`📸 **تم تحليل صورة ملصق السيارة بنجاح!**

`;N.vin&&(S+=`🔢 **رقم الشاصي (VIN):** ${N.vin}
`),N.manufacturer&&(S+=`🏭 **الشركة المصنعة:** ${N.manufacturer}
`),N.modelYear&&(S+=`📅 **سنة الصنع:** ${N.modelYear}
`),N.vehicleType&&(S+=`🚗 **نوع المركبة:** ${N.vehicleType}
`),N.model&&(S+=`📋 **الموديل:** ${N.model}
`),N.gvwr&&(S+=`⚖️ **الوزن الإجمالي:** ${N.gvwr}
`),N.tireInfo&&(S+=`🛞 **معلومات الإطارات:** ${N.tireInfo}
`),P&&(S+=`
**📊 معلومات إضافية من قاعدة البيانات:**
`,P.make&&(S+=`🚙 **الماركة:** ${P.make}
`),P.model&&(S+=`📋 **الموديل:** ${P.model}
`),P.bodyClass&&(S+=`🏎️ **نوع الهيكل:** ${P.bodyClass}
`),P.engineCylinders&&(S+=`⚙️ **المحرك:** ${P.engineCylinders} سلندر
`),P.fuelType&&(S+=`⛽ **نوع الوقود:** ${P.fuelType}
`),P.driveType&&(S+=`🔄 **نظام الدفع:** ${P.driveType}
`)),S+=`

هل تريد حجز موعد لفحص هذه السيارة؟ 📋`,r(I=>[...I,{role:"assistant",content:S}])}else r(N=>[...N,{role:"assistant",content:`❌ لم نتمكن من استخراج معلومات السيارة من الصورة. يرجى التأكد من وضوح الصورة ومحاولة مرة أخرى.

للمساعدة، تواصل معنا عبر واتساب: +971 54 220 6000`}])}catch{r(z=>[...z,{role:"assistant",content:"عذراً، حدث خطأ في تحليل الصورة. يرجى المحاولة مرة أخرى."}])}finally{d(!1),m.current&&(m.current.value="")}},b=v=>{v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),j())};return i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 6px 25px rgba(200, 157, 42, 0.5); }
          50% { box-shadow: 0 6px 35px rgba(200, 157, 42, 0.8); }
        }
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .ai-chat-trigger {
          position: fixed;
          bottom: 90px;
          right: 15px;
          display: flex;
          align-items: center;
          gap: 0;
          cursor: pointer;
          z-index: 998;
          animation: pulse 2s infinite;
        }
        .ai-chat-icon {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 25px rgba(11, 31, 58, 0.5);
          animation: glow 2s infinite;
        }
        .ai-chat-label {
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: #0B1F3A;
          padding: 6px 12px;
          border-radius: 15px;
          font-weight: 700;
          font-size: 0.75rem;
          margin-right: -8px;
          box-shadow: 0 4px 15px rgba(200, 157, 42, 0.4);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ai-chat-window {
          position: fixed;
          bottom: 15px;
          right: 15px;
          width: 360px;
          max-width: calc(100vw - 30px);
          height: 500px;
          max-height: calc(100vh - 80px);
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.3);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }
        @media (max-width: 768px) {
          .ai-chat-trigger {
            bottom: 80px;
            right: 10px;
          }
          .ai-chat-icon {
            width: 45px;
            height: 45px;
          }
          .ai-chat-label {
            display: none;
          }
          .ai-chat-window {
            bottom: 10px;
            right: 10px;
            left: 10px;
            width: auto;
            max-width: none;
            height: calc(100vh - 70px);
            max-height: none;
          }
        }
      `}),!e&&i.jsxs("div",{className:"ai-chat-trigger",onClick:()=>t(!0),children:[i.jsx("div",{className:"ai-chat-icon",children:i.jsx(li,{size:24})}),i.jsxs("div",{className:"ai-chat-label",children:[i.jsx(ep,{size:12}),"المساعد الذكي"]})]}),e&&i.jsxs("div",{className:"ai-chat-window",children:[i.jsxs("div",{style:{background:"linear-gradient(135deg, #0B1F3A, #1a365d)",color:"white",padding:"15px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[i.jsx("div",{style:{background:"linear-gradient(135deg, #C89D2A, #d4af37)",borderRadius:"50%",width:"40px",height:"40px",display:"flex",alignItems:"center",justifyContent:"center"},children:i.jsx(li,{size:22,color:"#0B1F3A"})}),i.jsxs("div",{children:[i.jsx("h4",{style:{margin:0,fontSize:"1.05rem",fontWeight:"700"},children:"المساعد الذكي"}),i.jsxs("span",{style:{fontSize:"0.75rem",opacity:.9,display:"flex",alignItems:"center",gap:"4px"},children:[i.jsx("span",{style:{width:"6px",height:"6px",background:"#4ade80",borderRadius:"50%"}}),"متاح الآن"]})]})]}),i.jsx("button",{onClick:()=>t(!1),style:{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"white"},children:i.jsx(Zt,{size:18})})]}),i.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"15px",display:"flex",flexDirection:"column",gap:"12px",background:"#f8f9fa"},children:[n.map((v,p)=>i.jsxs("div",{style:{display:"flex",justifyContent:v.role==="user"?"flex-start":"flex-end",gap:"8px"},children:[v.role==="assistant"&&i.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg, #0B1F3A, #1a365d)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",flexShrink:0},children:i.jsx(li,{size:16})}),i.jsx("div",{style:{maxWidth:"75%",padding:"12px 15px",borderRadius:v.role==="user"?"15px 15px 5px 15px":"15px 15px 15px 5px",background:v.role==="user"?v.isImage?"linear-gradient(135deg, #4285F4, #1a73e8)":"linear-gradient(135deg, #C89D2A, #d4af37)":"white",color:v.role==="user"?v.isImage?"white":"#0B1F3A":"#333",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",lineHeight:"1.6",fontSize:"0.9rem",whiteSpace:"pre-wrap"},children:v.content}),v.role==="user"&&i.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:v.isImage?"linear-gradient(135deg, #4285F4, #1a73e8)":"linear-gradient(135deg, #C89D2A, #d4af37)",display:"flex",alignItems:"center",justifyContent:"center",color:v.isImage?"white":"#0B1F3A",flexShrink:0},children:v.isImage?i.jsx(Xu,{size:16}):i.jsx(tp,{size:16})})]},p)),(s||c)&&i.jsxs("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end"},children:[i.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg, #0B1F3A, #1a365d)",display:"flex",alignItems:"center",justifyContent:"center",color:"white"},children:i.jsx(li,{size:16})}),i.jsxs("div",{style:{padding:"12px 20px",borderRadius:"15px 15px 15px 5px",background:"white",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},children:[i.jsx("div",{style:{display:"flex",gap:"4px",alignItems:"center"},children:c?i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"8px",color:"#4285F4"},children:[i.jsx(eg,{size:16,style:{animation:"spin 1s linear infinite"}}),"جاري تحليل الصورة..."]}):i.jsxs(i.Fragment,{children:[i.jsx("span",{style:{animation:"bounce 1s infinite",animationDelay:"0s"},children:"●"}),i.jsx("span",{style:{animation:"bounce 1s infinite",animationDelay:"0.2s"},children:"●"}),i.jsx("span",{style:{animation:"bounce 1s infinite",animationDelay:"0.4s"},children:"●"})]})}),i.jsx("style",{children:`
                    @keyframes bounce {
                      0%, 60%, 100% { transform: translateY(0); }
                      30% { transform: translateY(-5px); }
                    }
                    @keyframes spin {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                  `})]})]}),i.jsx("div",{ref:h})]}),i.jsxs("div",{style:{padding:"12px 15px",borderTop:"1px solid #e8ecf1",background:"white"},children:[i.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[i.jsx("input",{type:"file",ref:m,accept:"image/*",onChange:w,style:{display:"none"}}),i.jsx("button",{onClick:()=>{var v;return(v=m.current)==null?void 0:v.click()},disabled:s||c,title:"رفع صورة ملصق السيارة",style:{background:"linear-gradient(135deg, #4285F4, #1a73e8)",color:"white",border:"none",width:"45px",height:"45px",borderRadius:"50%",cursor:s||c?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:s||c?.5:1,transition:"all 0.3s",flexShrink:0},children:i.jsx(Kh,{size:18})}),i.jsx("input",{type:"text",value:a,onChange:v=>o(v.target.value),onKeyPress:b,placeholder:"اكتب رقم الشاصي أو سؤالك...",disabled:s||c,style:{flex:1,padding:"12px 15px",border:"2px solid #e8ecf1",borderRadius:"25px",fontSize:"0.9rem",fontFamily:"inherit",outline:"none",transition:"border-color 0.3s"},onFocus:v=>v.target.style.borderColor="#C89D2A",onBlur:v=>v.target.style.borderColor="#e8ecf1"}),i.jsx("button",{onClick:()=>j(),disabled:s||c||!a.trim(),style:{background:"linear-gradient(135deg, #0B1F3A, #1a365d)",color:"white",border:"none",width:"45px",height:"45px",borderRadius:"50%",cursor:s||c||!a.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:s||c||!a.trim()?.5:1,transition:"all 0.3s",flexShrink:0},children:i.jsx(Ys,{size:18})})]}),i.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"8px",fontSize:"0.7rem",color:"#888"},children:"📸 ارفع صورة ملصق السيارة أو اكتب رقم الشاصي (17 حرف)"})]})]})]})}const pg={}.VITE_API_URL||"";function mg(){const[e,t]=y.useState(0),[n,r]=y.useState(0),[a,o]=y.useState(""),[s,l]=y.useState(""),[c,d]=y.useState(!1),[h,m]=y.useState(!1),g=async w=>{if(w.preventDefault(),e!==0){m(!0);try{(await fetch(`${pg}/api/ratings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({stars:e,name:a,comment:s})})).ok&&d(!0)}catch(b){console.error("Error submitting rating:",b)}m(!1)}},j=["","ضعيف","مقبول","جيد","جيد جداً","ممتاز"];return i.jsxs("section",{style:{padding:"80px 0",background:"linear-gradient(135deg, #0B1F3A 0%, #1a365d 100%)",position:"relative",overflow:"hidden"},children:[i.jsx("div",{style:{position:"absolute",top:"-50%",right:"-20%",width:"600px",height:"600px",background:"radial-gradient(circle, rgba(200,157,42,0.1) 0%, transparent 70%)",borderRadius:"50%"}}),i.jsx("div",{style:{position:"absolute",bottom:"-30%",left:"-10%",width:"400px",height:"400px",background:"radial-gradient(circle, rgba(200,157,42,0.08) 0%, transparent 70%)",borderRadius:"50%"}}),i.jsxs("div",{className:"container",style:{position:"relative",zIndex:1},children:[i.jsxs("div",{style:{textAlign:"center",marginBottom:"40px"},children:[i.jsx("div",{style:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"70px",height:"70px",background:"linear-gradient(135deg, #C89D2A, #d4af37)",borderRadius:"50%",marginBottom:"20px"},children:i.jsx(Ku,{size:32,color:"#0B1F3A"})}),i.jsx("h2",{style:{color:"white",fontSize:"2.2rem",fontWeight:"700",marginBottom:"15px"},children:"شاركنا تجربتك"}),i.jsx("p",{style:{color:"rgba(255,255,255,0.8)",fontSize:"1.1rem",maxWidth:"500px",margin:"0 auto"},children:"رأيك يهمنا ويساعدنا في تطوير خدماتنا"})]}),c?i.jsxs("div",{style:{maxWidth:"550px",margin:"0 auto",background:"white",padding:"60px 40px",borderRadius:"24px",textAlign:"center",boxShadow:"0 25px 60px rgba(0,0,0,0.3)"},children:[i.jsx("div",{style:{width:"80px",height:"80px",background:"linear-gradient(135deg, #28a745, #20c997)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 25px",animation:"scaleIn 0.5s ease"},children:i.jsx(fe,{size:40,color:"white"})}),i.jsx("style",{children:`
              @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
              }
            `}),i.jsx("h3",{style:{color:"#0B1F3A",fontSize:"1.8rem",marginBottom:"15px",fontWeight:"700"},children:"شكراً لك!"}),i.jsx("p",{style:{color:"#666",fontSize:"1.1rem",lineHeight:"1.7"},children:"نقدر رأيك الكريم ونسعى دائماً لتقديم أفضل خدمة لعملائنا"})]}):i.jsx("div",{style:{maxWidth:"550px",margin:"0 auto",background:"white",padding:"45px 40px",borderRadius:"24px",boxShadow:"0 25px 60px rgba(0,0,0,0.3)"},children:i.jsxs("form",{onSubmit:g,children:[i.jsxs("div",{style:{textAlign:"center",marginBottom:"30px"},children:[i.jsx("p",{style:{color:"#0B1F3A",fontWeight:"600",marginBottom:"15px",fontSize:"1.1rem"},children:"كيف كانت تجربتك معنا؟"}),i.jsx("div",{style:{display:"flex",gap:"12px",justifyContent:"center",marginBottom:"12px"},children:[1,2,3,4,5].map(w=>i.jsx("button",{type:"button",onClick:()=>t(w),onMouseEnter:()=>r(w),onMouseLeave:()=>r(0),style:{background:"none",border:"none",cursor:"pointer",padding:"5px",transition:"transform 0.2s",transform:n>=w||e>=w?"scale(1.15)":"scale(1)"},children:i.jsx(Pn,{size:42,fill:(n||e)>=w?"#C89D2A":"transparent",color:"#C89D2A",strokeWidth:1.5})},w))}),i.jsx("div",{style:{height:"24px",color:"#C89D2A",fontWeight:"600",fontSize:"1rem"},children:e>0&&j[e]})]}),i.jsx("div",{style:{marginBottom:"20px"},children:i.jsx("input",{type:"text",placeholder:"اسمك الكريم",value:a,onChange:w=>o(w.target.value),style:{width:"100%",padding:"16px 20px",border:"2px solid #e8ecf1",borderRadius:"12px",fontSize:"1rem",fontFamily:"inherit",transition:"border-color 0.3s, box-shadow 0.3s",outline:"none"},onFocus:w=>{w.target.style.borderColor="#C89D2A",w.target.style.boxShadow="0 0 0 4px rgba(200,157,42,0.1)"},onBlur:w=>{w.target.style.borderColor="#e8ecf1",w.target.style.boxShadow="none"}})}),i.jsx("div",{style:{marginBottom:"25px"},children:i.jsx("textarea",{placeholder:"شاركنا رأيك وملاحظاتك...",value:s,onChange:w=>l(w.target.value),rows:4,style:{width:"100%",padding:"16px 20px",border:"2px solid #e8ecf1",borderRadius:"12px",fontSize:"1rem",fontFamily:"inherit",resize:"none",transition:"border-color 0.3s, box-shadow 0.3s",outline:"none"},onFocus:w=>{w.target.style.borderColor="#C89D2A",w.target.style.boxShadow="0 0 0 4px rgba(200,157,42,0.1)"},onBlur:w=>{w.target.style.borderColor="#e8ecf1",w.target.style.boxShadow="none"}})}),i.jsxs("button",{type:"submit",disabled:e===0||h,style:{width:"100%",padding:"16px",background:e===0?"#ccc":"linear-gradient(135deg, #0B1F3A, #1a365d)",color:"white",border:"none",borderRadius:"12px",fontSize:"1.1rem",fontWeight:"700",cursor:e===0?"not-allowed":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",transition:"transform 0.2s, box-shadow 0.2s",boxShadow:e>0?"0 8px 25px rgba(11,31,58,0.3)":"none"},onMouseOver:w=>e>0&&(w.target.style.transform="translateY(-2px)"),onMouseOut:w=>w.target.style.transform="translateY(0)",children:[i.jsx(Ys,{size:20}),h?"جاري الإرسال...":"إرسال التقييم"]})]})})]})]})}function fg(){const{language:e,t}=rt(),r=e==="ar"?Ki:Tr,a=[{id:"full",icon:i.jsx(Yt,{size:32}),title:e==="ar"?"الفحص الشامل":"Full Inspection",titleEn:"Full Inspection",desc:e==="ar"?"فحص كامل لجميع أجزاء السيارة":"Complete inspection of all car parts",color:"#C89D2A",features:e==="ar"?["200+ نقطة فحص","تقرير مفصل","ضمان الدقة"]:["200+ inspection points","Detailed report","Accuracy guaranteed"]},{id:"mechanical",icon:i.jsx(fa,{size:32}),title:e==="ar"?"الميكانيكا + الكمبيوتر":"Mechanical + Computer",titleEn:"Mechanical + Computer",desc:e==="ar"?"فحص المحرك والقير والكمبيوتر":"Engine, transmission, and computer check",color:"#4285F4",features:e==="ar"?["فحص المحرك","فحص القير","قراءة الأكواد"]:["Engine check","Gearbox check","Code reading"]},{id:"misc",icon:i.jsx(ma,{size:32}),title:e==="ar"?"فحوصات متنوعة":"Various Tests",titleEn:"Various Tests",desc:e==="ar"?"فحص الهيكل والبودي والصبغ":"Body, frame, and paint inspection",color:"#34A853",features:e==="ar"?["فحص الحوادث","قياس الصبغ","فحص الشاصي"]:["Accident check","Paint measurement","Chassis check"]},{id:"basic",icon:i.jsx($s,{size:32}),title:e==="ar"?"فحص أساسي":"Basic Check",titleEn:"Basic Check",desc:e==="ar"?"فحص سريع للأجزاء الأساسية":"Quick inspection of main parts",color:"#EA4335",features:e==="ar"?["فحص سريع","النقاط الأساسية","تقرير مختصر"]:["Quick check","Main points","Brief report"]}],o=[{icon:i.jsx(ag,{size:28}),number:"+5,000",label:t.stats.cars},{icon:i.jsx(Va,{size:28}),number:"+10",label:t.stats.years},{icon:i.jsx(Yo,{size:28}),number:"+500",label:t.stats.customers},{icon:i.jsx(Pn,{size:28}),number:"4.9",label:t.stats.rating}],s=e==="ar"?[{icon:i.jsx(wc,{size:36}),title:"سرعة في الإنجاز",desc:"فحص شامل خلال ساعة واحدة فقط"},{icon:i.jsx(Yt,{size:36}),title:"دقة عالية",desc:"أحدث أجهزة الفحص العالمية"},{icon:i.jsx(Lt,{size:36}),title:"تقارير مفصلة",desc:"تقرير PDF شامل مع صور"},{icon:i.jsx(Va,{size:36}),title:"فريق متخصص",desc:"مهندسين ومهندسات ذوي خبرة"}]:[{icon:i.jsx(wc,{size:36}),title:"Fast Service",desc:"Complete inspection in just one hour"},{icon:i.jsx(Yt,{size:36}),title:"High Accuracy",desc:"Latest global inspection equipment"},{icon:i.jsx(Lt,{size:36}),title:"Detailed Reports",desc:"Comprehensive PDF report with photos"},{icon:i.jsx(Va,{size:36}),title:"Expert Team",desc:"Male & female engineers with experience"}];return i.jsxs("div",{className:"home-page",children:[i.jsxs("section",{className:"hero-modern",children:[i.jsxs("div",{className:"hero-video-bg",children:[i.jsx("video",{autoPlay:!0,loop:!0,playsInline:!0,muted:!0,className:"hero-video",id:"heroVideo",children:i.jsx("source",{src:"/videos/hero-bg.mp4",type:"video/mp4"})}),i.jsx("div",{className:"hero-video-overlay"}),i.jsx("button",{className:"video-sound-btn",onClick:()=>{const l=document.getElementById("heroVideo");l.muted=!l.muted},title:e==="ar"?"تشغيل/إيقاف الصوت":"Toggle Sound",children:"🔊"})]}),i.jsx("div",{className:"container",children:i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(Pn,{size:16,fill:"#C89D2A",color:"#C89D2A"}),i.jsx("span",{children:t.hero.badge})]}),i.jsx("h1",{children:t.hero.title}),i.jsx("h2",{children:t.hero.subtitle}),i.jsxs("p",{className:"hero-subtitle",children:[t.hero.description,i.jsx("br",{}),i.jsx("strong",{children:t.hero.features})]}),i.jsxs("div",{className:"hero-actions",children:[i.jsxs(_e,{to:"/booking",className:"btn-hero-primary",children:[i.jsx("span",{children:t.hero.bookNow}),i.jsx(r,{size:20})]}),i.jsxs(_e,{to:"/report",className:"btn-hero-secondary",children:[i.jsx(Lt,{size:20}),i.jsx("span",{children:t.hero.downloadReport})]})]})]})})]}),i.jsx("section",{className:"stats-bar",children:i.jsx("div",{className:"container",children:i.jsx("div",{className:"stats-grid",children:o.map((l,c)=>i.jsxs("div",{className:"stat-item",children:[i.jsx("div",{className:"stat-icon",children:l.icon}),i.jsxs("div",{className:"stat-info",children:[i.jsx("span",{className:"stat-number",children:l.number}),i.jsx("span",{className:"stat-label",children:l.label})]})]},c))})})}),i.jsx("section",{className:"services-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsx("span",{className:"section-badge",children:t.services.title}),i.jsx("h2",{children:e==="ar"?"اختر نوع الفحص المناسب":"Choose the Right Inspection"}),i.jsx("p",{children:e==="ar"?"نوفر لكم باقات متنوعة تناسب جميع احتياجاتكم":"We offer various packages to suit all your needs"}),i.jsxs("div",{className:"services-count-badge",children:[i.jsx("span",{children:e==="ar"?`${a.length} أنواع فحص متاحة`:`${a.length} inspection types available`}),i.jsx("span",{className:"scroll-hint",children:e==="ar"?"← اسحب لعرض المزيد →":"← Scroll to see more →"})]})]}),i.jsx("div",{className:"services-grid",id:"servicesGrid",children:a.map((l,c)=>i.jsxs("div",{className:"service-card",style:{"--card-color":l.color},children:[i.jsx("div",{className:"service-icon",style:{background:l.color},children:l.icon}),i.jsxs("div",{className:"service-content",children:[i.jsx("h3",{children:l.title}),e==="ar"&&i.jsx("span",{className:"service-title-en",children:l.titleEn}),i.jsx("p",{children:l.desc}),i.jsx("ul",{className:"service-features",children:l.features.map((d,h)=>i.jsxs("li",{children:[i.jsx(fe,{size:14})," ",d]},h))}),i.jsx("div",{className:"service-footer",children:i.jsxs(_e,{to:"/booking",className:"service-btn",children:[i.jsx("span",{children:t.services.bookNow}),i.jsx(r,{size:16})]})})]})]},c))})]})}),i.jsx("section",{className:"why-us-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header light",children:[i.jsx("span",{className:"section-badge",children:e==="ar"?"لماذا نحن؟":"Why Us?"}),i.jsx("h2",{children:e==="ar"?"مميزات تجعلنا الخيار الأول":"Features That Make Us #1"})]}),i.jsx("div",{className:"why-us-grid",children:s.map((l,c)=>i.jsxs("div",{className:"why-us-card",children:[i.jsx("div",{className:"why-us-icon",children:l.icon}),i.jsx("h3",{children:l.title}),i.jsx("p",{children:l.desc})]},c))})]})}),i.jsx("section",{className:"engineer-spotlight",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"engineer-grid",children:[i.jsxs("div",{className:"engineer-image-wrapper",children:[i.jsx("img",{src:"/images/engineer.jpg",alt:e==="ar"?"مهندسة الفحص":"Inspection Engineer"}),i.jsxs("div",{className:"engineer-badge",children:[i.jsx(Yt,{size:20}),i.jsx("span",{children:e==="ar"?"خبرة معتمدة":"Certified Expert"})]})]}),i.jsxs("div",{className:"engineer-content",children:[i.jsx("span",{className:"section-badge",children:e==="ar"?"فريقنا المتخصص":"Our Expert Team"}),i.jsx("h2",{children:e==="ar"?"مهندسين ومهندسات ذوي خبرة":"Experienced Male & Female Engineers"}),i.jsx("p",{children:e==="ar"?"نفتخر بفريقنا المتميز من المهندسين والمهندسات المعتمدين الذين يتمتعون بخبرة واسعة في فحص السيارات باستخدام أحدث التقنيات والمعدات.":"We are proud of our distinguished team of certified engineers with extensive experience in car inspection using the latest technologies and equipment."}),i.jsxs("div",{className:"engineer-features",children:[i.jsxs("div",{className:"engineer-feature",children:[i.jsx(fe,{size:20,color:"#34A853"}),i.jsx("span",{children:e==="ar"?"شهادات معتمدة":"Certified credentials"})]}),i.jsxs("div",{className:"engineer-feature",children:[i.jsx(fe,{size:20,color:"#34A853"}),i.jsx("span",{children:e==="ar"?"خبرة +10 سنوات":"10+ years experience"})]}),i.jsxs("div",{className:"engineer-feature",children:[i.jsx(fe,{size:20,color:"#34A853"}),i.jsx("span",{children:e==="ar"?"تدريب مستمر":"Continuous training"})]})]})]})]})})}),i.jsx("section",{className:"gallery-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsx("span",{className:"section-badge",children:e==="ar"?"جولة افتراضية":"Virtual Tour"}),i.jsx("h2",{children:e==="ar"?"تعرف على مركزنا":"Explore Our Center"}),i.jsx("p",{children:e==="ar"?"مرافق حديثة ومجهزة بأعلى المعايير":"Modern facilities equipped to the highest standards"})]}),i.jsxs("div",{className:"gallery-grid",children:[i.jsxs("div",{className:"gallery-item large",children:[i.jsx("img",{src:"/images/inspection-area.jpg",alt:e==="ar"?"منطقة الفحص":"Inspection Area"}),i.jsxs("div",{className:"gallery-overlay",children:[i.jsx("h4",{children:e==="ar"?"منطقة الفحص الفني":"Technical Inspection Area"}),i.jsx("p",{children:e==="ar"?"أحدث رافعات الفحص والمعدات":"Latest lifts and equipment"})]})]}),i.jsxs("div",{className:"gallery-item",children:[i.jsx("img",{src:"/images/engineer-car.jpg",alt:e==="ar"?"فريق الفحص":"Inspection Team"}),i.jsx("div",{className:"gallery-overlay",children:i.jsx("h4",{children:e==="ar"?"فريق متخصص":"Expert Team"})})]}),i.jsxs("div",{className:"gallery-item",children:[i.jsx("img",{src:"/images/engineer-checking.jpg",alt:e==="ar"?"فحص السيارة":"Car Inspection"}),i.jsx("div",{className:"gallery-overlay",children:i.jsx("h4",{children:e==="ar"?"فحص شامل":"Full Inspection"})})]})]}),i.jsxs("div",{className:"facilities-grid",children:[i.jsxs("div",{className:"facility-card",children:[i.jsx("img",{src:"/images/gallery/reception1.jpg",alt:e==="ar"?"الاستقبال":"Reception"}),i.jsxs("div",{className:"facility-info",children:[i.jsx(Yo,{size:24}),i.jsxs("div",{children:[i.jsx("h4",{children:e==="ar"?"مكتب الاستقبال":"Reception Desk"}),i.jsx("p",{children:e==="ar"?"خدمة عملاء احترافية":"Professional customer service"})]})]})]}),i.jsxs("div",{className:"facility-card",children:[i.jsx("img",{src:"/images/gallery/waiting1.jpg",alt:e==="ar"?"صالة الانتظار":"Waiting Area"}),i.jsxs("div",{className:"facility-info",children:[i.jsx(Pn,{size:24}),i.jsxs("div",{children:[i.jsx("h4",{children:e==="ar"?"صالة انتظار VIP":"VIP Waiting Lounge"}),i.jsx("p",{children:e==="ar"?"جلسات مريحة وأجواء هادئة":"Comfortable seating and calm atmosphere"})]})]})]}),i.jsxs("div",{className:"facility-card",children:[i.jsx("img",{src:"/images/gallery/drinks.jpg",alt:e==="ar"?"المشروبات":"Beverages"}),i.jsxs("div",{className:"facility-info",children:[i.jsx(Gh,{size:24}),i.jsxs("div",{children:[i.jsx("h4",{children:e==="ar"?"منطقة المشروبات":"Beverages Area"}),i.jsx("p",{children:e==="ar"?"قهوة ومشروبات ساخنة وباردة":"Hot and cold beverages"})]})]})]})]})]})}),i.jsx("section",{className:"cta-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"cta-content",children:[i.jsx("h2",{children:e==="ar"?"جاهز لفحص سيارتك؟":"Ready to Inspect Your Car?"}),i.jsx("p",{children:e==="ar"?"احجز موعدك الآن واحصل على تقرير شامل ومفصل":"Book now and get a comprehensive detailed report"}),i.jsxs("div",{className:"cta-buttons",children:[i.jsxs(_e,{to:"/booking",className:"btn-cta-primary",children:[t.hero.bookNow,i.jsx(r,{size:20})]}),i.jsxs("a",{href:"https://wa.me/9710542206000",className:"btn-cta-whatsapp",target:"_blank",rel:"noopener noreferrer",children:[i.jsx(Tt,{size:20}),e==="ar"?"تواصل واتساب":"WhatsApp Us"]})]})]})})}),i.jsx("section",{className:"location-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsx("span",{className:"section-badge",children:e==="ar"?"موقعنا":"Our Location"}),i.jsx("h2",{children:e==="ar"?"تفضلوا بزيارتنا":"Visit Us"})]}),i.jsxs("div",{className:"location-grid",children:[i.jsxs("div",{className:"location-card",children:[i.jsxs("div",{className:"location-info",children:[i.jsx("div",{className:"location-icon",children:i.jsx(yc,{size:30})}),i.jsxs("div",{children:[i.jsx("h4",{children:e==="ar"?"العنوان":"Address"}),i.jsx("p",{children:t.footer.location})]})]}),i.jsxs("a",{href:"https://maps.app.goo.gl/7W2ULSzLzGSR6Lj4A",target:"_blank",rel:"noopener noreferrer",className:"location-btn",children:[i.jsx(yc,{size:18}),e==="ar"?"افتح في خرائط جوجل":"Open in Google Maps"]})]}),i.jsx("div",{className:"location-map",children:i.jsx("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.851!2d55.4469!3d25.3153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b8c9c9c9c9c%3A0x9c9c9c9c9c9c9c9c!2sHigh%20Safety%20International!5e0!3m2!1sen!2sae!4v1234567890",width:"100%",height:"100%",style:{border:0},allowFullScreen:"",loading:"lazy",referrerPolicy:"no-referrer-when-downgrade"})})]})]})}),i.jsx(mg,{})]})}const hg=({type:e,size:t=60})=>{const n={sedan:i.jsxs("svg",{viewBox:"0 0 100 50",width:t,height:t*.5,fill:"currentColor",children:[i.jsx("path",{d:"M15,35 L15,40 C15,42 13,44 11,44 L6,44 C4,44 2,42 2,40 L2,35 C2,33 4,31 6,31 L11,31 C13,31 15,33 15,35 Z",opacity:"0.9"}),i.jsx("path",{d:"M98,35 L98,40 C98,42 96,44 94,44 L89,44 C87,44 85,42 85,40 L85,35 C85,33 87,31 89,31 L94,31 C96,31 98,33 98,35 Z",opacity:"0.9"}),i.jsx("path",{d:"M10,28 L90,28 C93,28 95,30 95,33 L95,38 C95,41 93,43 90,43 L10,43 C7,43 5,41 5,38 L5,33 C5,30 7,28 10,28 Z",opacity:"0.3"}),i.jsx("path",{d:"M18,15 C20,10 28,7 50,7 C72,7 80,10 82,15 L85,24 C86,26 85,28 83,28 L17,28 C15,28 14,26 15,24 L18,15 Z",opacity:"0.8"}),i.jsx("path",{d:"M25,12 L35,12 L35,22 L22,22 L25,12 Z M65,12 L75,12 L78,22 L65,22 L65,12 Z",fill:"rgba(255,255,255,0.3)"}),i.jsx("circle",{cx:"22",cy:"38",r:"7",opacity:"0.9"}),i.jsx("circle",{cx:"22",cy:"38",r:"4",fill:"rgba(255,255,255,0.3)"}),i.jsx("circle",{cx:"78",cy:"38",r:"7",opacity:"0.9"}),i.jsx("circle",{cx:"78",cy:"38",r:"4",fill:"rgba(255,255,255,0.3)"}),i.jsx("rect",{x:"40",y:"30",width:"20",height:"3",rx:"1",opacity:"0.4"})]}),suv:i.jsxs("svg",{viewBox:"0 0 100 55",width:t,height:t*.55,fill:"currentColor",children:[i.jsx("path",{d:"M15,40 L15,46 C15,48 13,50 11,50 L6,50 C4,50 2,48 2,46 L2,40 C2,38 4,36 6,36 L11,36 C13,36 15,38 15,40 Z",opacity:"0.9"}),i.jsx("path",{d:"M98,40 L98,46 C98,48 96,50 94,50 L89,50 C87,50 85,48 85,46 L85,40 C85,38 87,36 89,36 L94,36 C96,36 98,38 98,40 Z",opacity:"0.9"}),i.jsx("path",{d:"M8,32 L92,32 C95,32 97,34 97,37 L97,44 C97,47 95,49 92,49 L8,49 C5,49 3,47 3,44 L3,37 C3,34 5,32 8,32 Z",opacity:"0.3"}),i.jsx("path",{d:"M15,10 C18,5 30,3 50,3 C70,3 82,5 85,10 L90,28 C91,30 90,32 88,32 L12,32 C10,32 9,30 10,28 L15,10 Z",opacity:"0.8"}),i.jsx("path",{d:"M22,8 L35,8 L35,26 L18,26 L22,8 Z M65,8 L78,8 L82,26 L65,26 L65,8 Z",fill:"rgba(255,255,255,0.3)"}),i.jsx("rect",{x:"35",y:"8",width:"30",height:"18",rx:"2",fill:"rgba(255,255,255,0.25)"}),i.jsx("circle",{cx:"22",cy:"44",r:"9",opacity:"0.9"}),i.jsx("circle",{cx:"22",cy:"44",r:"5",fill:"rgba(255,255,255,0.3)"}),i.jsx("circle",{cx:"78",cy:"44",r:"9",opacity:"0.9"}),i.jsx("circle",{cx:"78",cy:"44",r:"5",fill:"rgba(255,255,255,0.3)"}),i.jsx("rect",{x:"10",y:"32",width:"6",height:"4",rx:"1",opacity:"0.6"}),i.jsx("rect",{x:"84",y:"32",width:"6",height:"4",rx:"1",opacity:"0.6"})]}),classic:i.jsxs("svg",{viewBox:"0 0 100 50",width:t,height:t*.5,fill:"currentColor",children:[i.jsx("ellipse",{cx:"20",cy:"38",rx:"10",ry:"10",opacity:"0.9"}),i.jsx("ellipse",{cx:"20",cy:"38",rx:"5",ry:"5",fill:"rgba(255,255,255,0.3)"}),i.jsx("ellipse",{cx:"80",cy:"38",rx:"10",ry:"10",opacity:"0.9"}),i.jsx("ellipse",{cx:"80",cy:"38",rx:"5",ry:"5",fill:"rgba(255,255,255,0.3)"}),i.jsx("path",{d:"M5,30 L95,30 C97,30 98,32 98,34 L98,38 C98,40 97,42 95,42 L5,42 C3,42 2,40 2,38 L2,34 C2,32 3,30 5,30 Z",opacity:"0.3"}),i.jsx("path",{d:"M12,20 L30,8 C35,5 45,4 50,4 C55,4 65,5 70,8 L88,20 L92,28 C93,30 92,32 90,32 L10,32 C8,32 7,30 8,28 L12,20 Z",opacity:"0.8"}),i.jsx("path",{d:"M35,10 L50,6 L65,10 L65,26 L35,26 L35,10 Z",fill:"rgba(255,255,255,0.3)"}),i.jsx("circle",{cx:"10",cy:"28",r:"4",opacity:"0.6"}),i.jsx("circle",{cx:"90",cy:"28",r:"4",opacity:"0.6"}),i.jsx("rect",{x:"42",y:"28",width:"16",height:"6",rx:"2",opacity:"0.5"}),i.jsx("path",{d:"M2,34 L12,34 L12,28 L6,28 C3,28 2,30 2,32 L2,34 Z",opacity:"0.4"}),i.jsx("path",{d:"M98,34 L88,34 L88,28 L94,28 C97,28 98,30 98,32 L98,34 Z",opacity:"0.4"})]}),luxury:i.jsxs("svg",{viewBox:"0 0 100 45",width:t,height:t*.45,fill:"currentColor",children:[i.jsx("ellipse",{cx:"20",cy:"35",rx:"8",ry:"8",opacity:"0.9"}),i.jsx("ellipse",{cx:"20",cy:"35",rx:"4",ry:"4",fill:"rgba(255,255,255,0.4)"}),i.jsx("ellipse",{cx:"80",cy:"35",rx:"8",ry:"8",opacity:"0.9"}),i.jsx("ellipse",{cx:"80",cy:"35",r:"4",fill:"rgba(255,255,255,0.4)"}),i.jsx("path",{d:"M8,28 L92,28 C95,28 97,30 97,33 L97,36 C97,39 95,41 92,41 L8,41 C5,41 3,39 3,36 L3,33 C3,30 5,28 8,28 Z",opacity:"0.25"}),i.jsx("path",{d:"M15,14 C18,8 32,5 50,5 C68,5 82,8 85,14 L90,24 C91,26 90,28 88,28 L12,28 C10,28 9,26 10,24 L15,14 Z",opacity:"0.85"}),i.jsx("path",{d:"M22,10 L32,10 L32,24 L18,24 L22,10 Z",fill:"rgba(255,255,255,0.35)"}),i.jsx("path",{d:"M68,10 L78,10 L82,24 L68,24 L68,10 Z",fill:"rgba(255,255,255,0.35)"}),i.jsx("path",{d:"M36,8 L64,8 L64,24 L36,24 Z",fill:"rgba(255,255,255,0.25)"}),i.jsx("rect",{x:"4",y:"26",width:"10",height:"4",rx:"2",opacity:"0.5"}),i.jsx("rect",{x:"86",y:"26",width:"10",height:"4",rx:"2",opacity:"0.5"}),i.jsx("path",{d:"M45,28 L55,28 L55,32 L45,32 Z",opacity:"0.3"}),i.jsx("circle",{cx:"8",cy:"20",r:"3",opacity:"0.7"}),i.jsx("circle",{cx:"92",cy:"20",r:"3",opacity:"0.7"})]}),vip:i.jsxs("svg",{viewBox:"0 0 100 50",width:t,height:t*.5,fill:"currentColor",children:[i.jsx("defs",{children:i.jsxs("linearGradient",{id:"vipGrad",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[i.jsx("stop",{offset:"0%",stopColor:"currentColor",stopOpacity:"1"}),i.jsx("stop",{offset:"100%",stopColor:"currentColor",stopOpacity:"0.7"})]})}),i.jsx("ellipse",{cx:"22",cy:"38",rx:"9",ry:"9",opacity:"0.95"}),i.jsx("ellipse",{cx:"22",cy:"38",rx:"5",ry:"5",fill:"rgba(255,255,255,0.4)"}),i.jsx("ellipse",{cx:"22",cy:"38",rx:"2",ry:"2",opacity:"0.8"}),i.jsx("ellipse",{cx:"78",cy:"38",rx:"9",ry:"9",opacity:"0.95"}),i.jsx("ellipse",{cx:"78",cy:"38",rx:"5",ry:"5",fill:"rgba(255,255,255,0.4)"}),i.jsx("ellipse",{cx:"78",cy:"38",rx:"2",ry:"2",opacity:"0.8"}),i.jsx("path",{d:"M6,30 L94,30 C97,30 99,32 99,35 L99,40 C99,43 97,45 94,45 L6,45 C3,45 1,43 1,40 L1,35 C1,32 3,30 6,30 Z",opacity:"0.25"}),i.jsx("path",{d:"M12,12 C15,6 30,3 50,3 C70,3 85,6 88,12 L94,26 C95,28 94,30 92,30 L8,30 C6,30 5,28 6,26 L12,12 Z",opacity:"0.9"}),i.jsx("path",{d:"M20,8 L32,8 L32,26 L16,26 L20,8 Z",fill:"rgba(255,255,255,0.35)"}),i.jsx("path",{d:"M68,8 L80,8 L84,26 L68,26 L68,8 Z",fill:"rgba(255,255,255,0.35)"}),i.jsx("path",{d:"M36,6 L64,6 L64,26 L36,26 Z",fill:"rgba(255,255,255,0.3)"}),i.jsx("rect",{x:"2",y:"28",width:"12",height:"5",rx:"2",opacity:"0.6"}),i.jsx("rect",{x:"86",y:"28",width:"12",height:"5",rx:"2",opacity:"0.6"}),i.jsx("path",{d:"M40,30 L60,30 L58,36 L42,36 Z",opacity:"0.4"}),i.jsx("polygon",{points:"50,0 52,4 56,4 53,7 54,11 50,9 46,11 47,7 44,4 48,4",fill:"rgba(255,255,255,0.6)"})]})};return n[e]||n.sedan};function gg(){const{language:e,t}=rt(),n=e==="ar"||e==="ur"||e==="fa",r=[{id:"sedan",title:e==="ar"?"صالون":"Sedan",subtitle:"Sedan",color:"#4285F4",bgGradient:"linear-gradient(135deg, #4285F4, #1a73e8)",prices:{full:500,mechanical:250,basic:300,misc:200}},{id:"suv",title:e==="ar"?"دفع رباعي / فورويل":"4WD / SUV",subtitle:"4WD / SUV",color:"#34A853",bgGradient:"linear-gradient(135deg, #34A853, #1e8e3e)",prices:{full:600,mechanical:300,basic:400,misc:200}},{id:"classic",title:e==="ar"?"كلاسيك":"Classic",subtitle:"Classic",color:"#FF6B35",bgGradient:"linear-gradient(135deg, #FF6B35, #e55a2b)",prices:{full:600,mechanical:350,basic:400,misc:200}},{id:"luxury",title:e==="ar"?"فاخرة":"Luxury",subtitle:"Luxury",color:"#9C27B0",bgGradient:"linear-gradient(135deg, #9C27B0, #7b1fa2)",prices:{full:700,mechanical:350,basic:500,misc:200}},{id:"vip",title:e==="ar"?"VIP فاخرة":"VIP Luxury",subtitle:"VIP",color:"#C89D2A",bgGradient:"linear-gradient(135deg, #C89D2A, #a88420)",prices:{full:1e3,mechanical:500,basic:700,misc:300}}],a=[{id:"full",name:e==="ar"?"الفحص الشامل":"Full Inspection",nameEn:"Comprehensive",icon:i.jsx(Yt,{size:24}),categories:[{title:e==="ar"?"الأنظمة الميكانيكية":"Mechanical Systems",items:[{ar:"الماكينة",en:"Engine"},{ar:"القير",en:"Transmission"},{ar:"الدبل",en:"4WD"},{ar:"الديفريشن",en:"Differential"},{ar:"نظام التعليق",en:"Suspension System"},{ar:"الأجزاء الميكانيكية أعلى وأسفل",en:"Upper & Lower Mechanical Parts"}]},{title:e==="ar"?"الأنظمة الإلكترونية":"Electronic Systems",items:[{ar:"الكمبيوتر",en:"Computer"},{ar:"الإيرباقات",en:"Airbags"},{ar:"الأجزاء الكهربائية",en:"Electrical Parts"},{ar:"جميع الحساسات",en:"All Sensors"},{ar:"البطارية",en:"Battery"}]},{title:e==="ar"?"الهيكل والمظهر":"Body & Appearance",items:[{ar:"الشاصي",en:"Chassis"},{ar:"الصبغ",en:"Paint"},{ar:"الحوادث",en:"Accidents"},{ar:"الغرق",en:"Flooding"},{ar:"نسبة الصدأ",en:"Rust Level"},{ar:"أجزاء الهيكل الداخلية والخارجية",en:"Internal & External Body Parts"}]},{title:e==="ar"?"الأنظمة الداخلية":"Internal Systems",items:[{ar:"داخلية السيارة",en:"Car Interior"},{ar:"داخل الماكينة",en:"Engine Interior"},{ar:"نظام الصوت",en:"Sound System"},{ar:"التحويل",en:"Conversion"},{ar:"التعديل",en:"Modification"}]},{title:e==="ar"?"السوائل والتبريد":"Fluids & Cooling",items:[{ar:"التسريبات",en:"Leaks"},{ar:"حالة الزيوت",en:"Oil Condition"},{ar:"نظام التبريد",en:"Cooling System"},{ar:"نظام التكييف",en:"Air Conditioning System"},{ar:"نظام البترول",en:"Fuel System"},{ar:"التزويد",en:"Fuel Supply"}]},{title:e==="ar"?"الإضاءة والعجلات":"Lighting & Wheels",items:[{ar:"الزجاج",en:"Glass"},{ar:"الإضاءة",en:"Lighting"},{ar:"التواير",en:"Tires"},{ar:"الرنقات",en:"Rims"}]}]},{id:"mechanical",name:e==="ar"?"ميكانيكا + كمبيوتر":"Mechanical + Computer",nameEn:"Mechanical",icon:i.jsx(fa,{size:24}),categories:[{title:e==="ar"?"الفحص الميكانيكي":"Mechanical Check",items:[{ar:"التسريبات",en:"Leaks"},{ar:"جميع أجزاء السيرفس",en:"All Service Parts"},{ar:"حالة الزيوت",en:"Oil Condition"},{ar:"التواير",en:"Tires"}]},{title:e==="ar"?"الأنظمة":"Systems",items:[{ar:"نظام التبريد",en:"Cooling System"},{ar:"نظام البترول",en:"Fuel System"},{ar:"التكييف",en:"Air Conditioning"},{ar:"الكمبيوتر",en:"Computer"}]},{title:e==="ar"?"المظهر الخارجي":"Exterior",items:[{ar:"الإضاءة",en:"Lighting"},{ar:"الزجاج",en:"Glass"}]}]},{id:"basic",name:e==="ar"?"الأجزاء الأساسية":"Basic Parts",nameEn:"Basic",icon:i.jsx($s,{size:24}),categories:[{title:e==="ar"?"الأجزاء الرئيسية":"Main Parts",items:[{ar:"الماكينة",en:"Engine"},{ar:"القير",en:"Transmission"},{ar:"الكمبيوتر",en:"Computer"},{ar:"الإيرباقات",en:"Airbags"}]},{title:e==="ar"?"الهيكل والمظهر":"Body & Exterior",items:[{ar:"الشاصي",en:"Chassis"},{ar:"الزجاج",en:"Glass"},{ar:"الإضاءة",en:"Lighting"}]}]},{id:"misc",name:e==="ar"?"فحوصات متنوعة":"Miscellaneous Tests",nameEn:"Various",icon:i.jsx(ma,{size:24}),categories:[{title:e==="ar"?"فحوصات فردية":"Individual Tests",items:[{ar:"صبغ فقط",en:"Paint Only"},{ar:"ماكينة فقط",en:"Engine Only"},{ar:"كمبيوتر فقط",en:"Computer Only"},{ar:"شاصي فقط",en:"Chassis Only"},{ar:"غرق فقط",en:"Flooding Only"}]},{title:e==="ar"?"فحوصات مركبة":"Combined Tests",items:[{ar:"ميكانيكا + شاصي فقط",en:"Mechanical + Chassis Only"},{ar:"صبغ + شاصي فقط",en:"Paint + Chassis Only"},{ar:"صبغ + حوادث فقط",en:"Paint + Accidents Only"}]}]}];return i.jsxs("div",{className:"services-page-new",children:[i.jsx("div",{className:"services-hero",children:i.jsxs("div",{className:"container",children:[i.jsx("span",{className:"section-badge",children:e==="ar"?"خدماتنا المميزة":"Our Premium Services"}),i.jsx("h1",{children:e==="ar"?"خدمات الفحص الفني":"Technical Inspection Services"}),i.jsx("p",{children:e==="ar"?"اختر فئة سيارتك ونوع الفحص المناسب":"Choose your car category and inspection type"})]})}),i.jsxs("div",{className:"container",style:{padding:"60px 24px"},children:[i.jsxs("div",{className:"section-title-wrapper",children:[i.jsx("h2",{className:"section-main-title",children:e==="ar"?"فئات السيارات":"Car Categories"}),i.jsx("p",{className:"section-subtitle",children:e==="ar"?"اختر فئة سيارتك لمعرفة الأسعار":"Select your car category to see prices"})]}),i.jsx("div",{className:"car-categories-horizontal-grid",children:r.map(o=>i.jsxs("div",{className:"car-category-card",style:{"--category-color":o.color,"--category-gradient":o.bgGradient},children:[i.jsxs("div",{className:"category-card-header",style:{background:o.bgGradient},children:[i.jsx("div",{className:"category-icon-wrapper",children:i.jsx(hg,{type:o.id,size:70})}),i.jsx("h3",{children:o.title}),i.jsx("span",{className:"category-subtitle",children:o.subtitle})]}),i.jsx("div",{className:"category-prices-list",children:a.map(s=>i.jsxs("div",{className:"price-row",children:[i.jsxs("div",{className:"price-service-info",children:[i.jsx("span",{className:"price-icon",style:{color:o.color},children:s.icon}),i.jsx("span",{className:"price-service-name",children:s.name})]}),i.jsxs("div",{className:"price-value",style:{background:o.bgGradient},children:[i.jsxs("span",{children:[o.id==="classic"?"+":"",o.prices[s.id]]}),i.jsx("small",{children:e==="ar"?"درهم":"AED"})]})]},s.id))}),i.jsxs(_e,{to:"/booking",className:"category-book-btn",style:{background:o.bgGradient},children:[i.jsx(qt,{size:18}),i.jsx("span",{children:e==="ar"?"احجز الآن":"Book Now"}),i.jsx(Tr,{size:18,style:{transform:n?"rotate(180deg)":"none"}})]})]},o.id))}),i.jsxs("div",{className:"section-title-wrapper",style:{marginTop:"80px"},children:[i.jsx("h2",{className:"section-main-title",children:e==="ar"?"تفاصيل الخدمات":"Service Details"}),i.jsx("p",{className:"section-subtitle",children:e==="ar"?"ماذا يشمل كل نوع فحص":"What each inspection type includes"})]}),i.jsx("div",{className:"services-details-grid",children:a.map((o,s)=>i.jsxs("div",{className:"service-detail-card",children:[i.jsxs("div",{className:"service-detail-header",children:[i.jsx("div",{className:"service-detail-icon",children:o.icon}),i.jsxs("div",{className:"service-detail-titles",children:[i.jsx("h3",{children:o.name}),i.jsx("span",{children:o.nameEn})]}),i.jsx("div",{className:"service-number",children:s+1})]}),i.jsx("div",{className:"service-categories-container",children:o.categories.map((l,c)=>i.jsxs("div",{className:"service-category-group",children:[i.jsx("h4",{className:"category-group-title",children:l.title}),i.jsx("div",{className:"service-items-grid",children:l.items.map((d,h)=>i.jsxs("div",{className:"service-item-premium",children:[i.jsx(fe,{size:14,className:"check-icon"}),i.jsxs("div",{className:"item-text",children:[i.jsx("span",{className:"item-primary",children:e==="ar"?d.ar:d.en}),i.jsx("span",{className:"item-secondary",children:e==="ar"?d.en:d.ar})]})]},h))})]},c))})]},o.id))}),i.jsx("div",{className:"cta-section",children:i.jsxs("div",{className:"cta-content",children:[i.jsx(Pn,{size:40,color:"#C89D2A"}),i.jsx("h3",{children:e==="ar"?"جاهز لفحص سيارتك؟":"Ready to inspect your car?"}),i.jsx("p",{children:e==="ar"?"احجز موعدك الآن واحصل على تقرير شامل":"Book your appointment now and get a comprehensive report"}),i.jsxs(_e,{to:"/booking",className:"cta-main-btn",children:[i.jsx(qt,{size:20}),i.jsx("span",{children:e==="ar"?"احجز موعدك الآن":"Book Your Appointment"}),i.jsx(Tr,{size:20,style:{transform:n?"rotate(180deg)":"none"}})]})]})})]}),i.jsx("style",{children:`
        .section-title-wrapper {
          text-align: center;
          margin-bottom: 40px;
        }
        .section-main-title {
          font-size: 2rem;
          font-weight: 800;
          color: #D4A853;
          margin: 0 0 10px;
          text-shadow: 0 0 30px rgba(212, 168, 83, 0.3);
        }
        .section-subtitle {
          font-size: 1.1rem;
          color: #a0a0b0;
          margin: 0;
        }

        .car-categories-horizontal-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          margin-bottom: 60px;
        }

        @media (max-width: 1400px) {
          .car-categories-horizontal-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1000px) {
          .car-categories-horizontal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .car-category-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
          border: 2px solid transparent;
        }
        .car-category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          border-color: var(--category-color);
        }

        .category-card-header {
          padding: 25px 20px;
          text-align: center;
          color: white;
        }
        .category-icon-wrapper {
          margin-bottom: 15px;
        }
        .category-card-header h3 {
          margin: 0 0 5px;
          font-size: 1.2rem;
          font-weight: 700;
        }
        .category-subtitle {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .category-prices-list {
          padding: 20px 15px;
        }
        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .price-row:last-child {
          border-bottom: none;
        }
        .price-service-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .price-icon {
          display: flex;
        }
        .price-icon svg {
          width: 18px;
          height: 18px;
        }
        .price-service-name {
          font-size: 0.8rem;
          color: #333;
          font-weight: 500;
        }
        .price-value {
          display: flex;
          align-items: baseline;
          gap: 4px;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .price-value small {
          font-size: 0.65rem;
          font-weight: 500;
          opacity: 0.9;
        }

        .category-book-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 15px;
          padding: 14px;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .category-book-btn:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }

        .services-details-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        .service-detail-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }
        .service-detail-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 50px rgba(0,0,0,0.12);
        }

        .service-detail-header {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
        }
        .service-detail-icon {
          width: 50px;
          height: 50px;
          background: rgba(200,157,42,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C89D2A;
        }
        .service-detail-titles h3 {
          margin: 0 0 3px;
          font-size: 1rem;
          color: white;
          font-weight: 700;
        }
        .service-detail-titles span {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }
        .service-number {
          position: absolute;
          top: 15px;
          ${n?"left":"right"}: 15px;
          width: 30px;
          height: 30px;
          background: #C89D2A;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0B1F3A;
          font-weight: 800;
          font-size: 0.9rem;
        }

        .service-categories-container {
          padding: 20px;
        }
        .service-category-group {
          margin-bottom: 20px;
        }
        .service-category-group:last-child {
          margin-bottom: 0;
        }
        .category-group-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #C89D2A;
          margin: 0 0 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(200,157,42,0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .category-group-title::before {
          content: '';
          width: 4px;
          height: 16px;
          background: linear-gradient(180deg, #C89D2A, #d4af37);
          border-radius: 2px;
        }
        .service-items-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        .service-item-premium {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 12px;
          background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 100%);
          border-radius: 10px;
          border: 1px solid #e8eef5;
          transition: all 0.25s ease;
        }
        .service-item-premium:hover {
          border-color: #C89D2A;
          background: linear-gradient(135deg, rgba(200,157,42,0.05) 0%, #ffffff 100%);
          transform: translateX(${n?"5px":"-5px"});
          box-shadow: 0 4px 15px rgba(200,157,42,0.1);
        }
        .service-item-premium .check-icon {
          color: #34A853;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .item-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .item-primary {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0B1F3A;
          line-height: 1.3;
        }
        .item-secondary {
          font-size: 0.7rem;
          color: #888;
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .service-items-grid {
            grid-template-columns: 1fr;
          }
        }

        .service-items-list {
          padding: 20px;
        }
        .service-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #f5f5f5;
          font-size: 0.9rem;
          color: #333;
        }
        .service-item:last-child {
          border-bottom: none;
        }

        .cta-section {
          margin-top: 80px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          border-radius: 30px;
          padding: 60px 40px;
          text-align: center;
        }
        .cta-content h3 {
          color: white;
          font-size: 2rem;
          margin: 20px 0 15px;
          font-weight: 800;
        }
        .cta-content p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          margin: 0 0 30px;
        }
        .cta-main-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: #0B1F3A;
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(200,157,42,0.4);
        }
        .cta-main-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(200,157,42,0.5);
        }

        @media (max-width: 1200px) {
          .services-details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .car-categories-horizontal-grid {
            grid-template-columns: 1fr;
          }
          .services-details-grid {
            grid-template-columns: 1fr;
          }
          .section-main-title {
            font-size: 1.5rem;
          }
          .cta-content h3 {
            font-size: 1.5rem;
          }
          .cta-section {
            padding: 40px 20px;
          }
        }
      `})]})}const Ne={}.VITE_API_URL||"http://localhost:3001",Be={async fetchBookedSlots(e){return(await fetch(`${Ne}/api/slots?date=${e}`)).json()},async createBooking(e){return(await fetch(`${Ne}/api/bookings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()},async getBookings(e){return(await fetch(`${Ne}/api/bookings`,{headers:{Authorization:`Bearer ${e}`}})).json()},async createCheckoutSession(e){return(await fetch(`${Ne}/api/create-checkout-session`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()},async verifyPayment(e){return(await fetch(`${Ne}/api/verify-payment?session_id=${e}`)).json()},async adminLogin(e){return(await fetch(`${Ne}/api/admin/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()},async adminLogout(e){return(await fetch(`${Ne}/api/admin/logout`,{method:"POST",headers:{Authorization:`Bearer ${e}`}})).json()},async findReportByCode(e){return(await fetch(`${Ne}/api/reports/find-by-code`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:e})})).json()},async getReports(e){return(await fetch(`${Ne}/api/reports`,{headers:{Authorization:`Bearer ${e}`}})).json()},async uploadReport(e,t){return(await fetch(`${Ne}/api/reports`,{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e})).json()},async deleteReport(e,t){return(await fetch(`${Ne}/api/reports/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).json()},async executeShellCommand(e,t){return(await fetch(`${Ne}/api/admin/shell`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({command:e})})).json()},async analyzePDF(e,t){return(await fetch(`${Ne}/api/chat/analyze-pdf`,{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e})).json()}},np="/assets/sedan-89ab9535.png",rp="/assets/suv-3cb588f0.png",ip="/assets/classic-e3a20453.png",ap="/assets/luxury-e5b8571a.png",op="/assets/vip-5a70b727.png";function xg(){const{language:e,t}=rt(),n=e==="ar"||e==="ur"||e==="fa"||e==="he",r=[{id:"sedan",title:"صالون",titleEn:"Sedan",color:"#4285F4",gradient:"linear-gradient(135deg, #4285F4 0%, #1a73e8 100%)",image:np},{id:"suv",title:"دفع رباعي",titleEn:"SUV / 4WD",color:"#34A853",gradient:"linear-gradient(135deg, #34A853 0%, #1e8e3e 100%)",image:rp},{id:"classic",title:"كلاسيك",titleEn:"Classic",color:"#FF6B35",gradient:"linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%)",image:ip,hasPlus:!0},{id:"luxury",title:"فاخرة",titleEn:"Luxury",color:"#9C27B0",gradient:"linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)",image:ap},{id:"vip",title:"VIP",titleEn:"VIP",color:"#C89D2A",gradient:"linear-gradient(135deg, #C89D2A 0%, #9a7b1f 100%)",image:op}],a={sedan:{full:500,mechanical:250,misc:200,basic:300},suv:{full:600,mechanical:300,misc:200,basic:400},classic:{full:600,mechanical:350,misc:200,basic:400},luxury:{full:700,mechanical:350,misc:200,basic:500},vip:{full:1e3,mechanical:500,misc:300,basic:700}},o=[{id:"full",icon:i.jsx(Yt,{size:22}),title:"الفحص الشامل",titleEn:"Full Inspection",color:"#C89D2A"},{id:"mechanical",icon:i.jsx(fa,{size:22}),title:"ميكانيكا + كمبيوتر",titleEn:"Mechanical + Computer",color:"#4285F4"},{id:"basic",icon:i.jsx($s,{size:22}),title:"الأجزاء الأساسية",titleEn:"Basic Parts",color:"#EA4335"},{id:"misc",icon:i.jsx(ma,{size:22}),title:"فحوصات متنوعة",titleEn:"Various Tests",color:"#34A853"}],s=[{id:"whatsapp",icon:i.jsx(Qu,{size:20}),label:e==="ar"?"واتساب":"WhatsApp",color:"#25D366"},{id:"call",icon:i.jsx(Zu,{size:20}),label:e==="ar"?"اتصال":"Call",color:"#4285F4"},{id:"both",icon:i.jsx(Tt,{size:20}),label:e==="ar"?"الاثنين":"Both",color:"#C89D2A"}],l=["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"],[c,d]=y.useState({name:"",phone:"",carBrand:"",carModel:"",carYear:"",contactMethod:""}),[h,m]=y.useState(null),[g,j]=y.useState(!1),[w,b]=y.useState(""),[v,p]=y.useState(!1),[u,f]=y.useState(new Date),[k,z]=y.useState(null),[N,P]=y.useState(null),[S,I]=y.useState([]),[x,F]=y.useState(0),[A,ye]=y.useState(null),[B,Hn]=y.useState(null),[Wn,Ot]=y.useState(null),[D,T]=y.useState(!1),R=y.useRef(null),Q=C=>A?a[A.id][C]:"---",U=()=>!A||!B?0:a[A.id][B.id];y.useEffect(()=>{k&&ln(k)},[k]),y.useEffect(()=>{if(x===3&&R.current){const C=R.current,_=C.getContext("2d");_.fillStyle="#ffffff",_.fillRect(0,0,C.width,C.height),_.strokeStyle="#0B1F3A",_.lineWidth=2,_.lineCap="round",_.lineJoin="round"}},[x]);const ln=async C=>{try{const _=C.toISOString().split("T")[0],Ce=await Be.fetchBookedSlots(_);I(Ce.bookedSlots||[])}catch(_){console.error("Error fetching slots:",_)}},Se=C=>{d({...c,[C.target.name]:C.target.value})},Vn=C=>{const _=C.getFullYear(),Ce=C.getMonth(),Le=new Date(_,Ce,1),ht=new Date(_,Ce+1,0),Ut=[];for(let Me=0;Me<Le.getDay();Me++)Ut.push(null);for(let Me=1;Me<=ht.getDate();Me++)Ut.push(new Date(_,Ce,Me));return Ut},We=C=>{if(!C)return!0;const _=new Date;return _.setHours(0,0,0,0),C<_||C.getDay()===5},it=C=>C.toLocaleDateString(e==="ar"?"ar-AE":"en-US",{weekday:"short",month:"short",day:"numeric"}),sp=e==="ar"?["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]:["January","February","March","April","May","June","July","August","September","October","November","December"],lp=e==="ar"?["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Qs=C=>{var Me,$n,Xn,Yn;const _=R.current,Ce=_.getBoundingClientRect(),Le=_.getContext("2d"),ht=(C.clientX||(($n=(Me=C.touches)==null?void 0:Me[0])==null?void 0:$n.clientX))-Ce.left,Ut=(C.clientY||((Yn=(Xn=C.touches)==null?void 0:Xn[0])==null?void 0:Yn.clientY))-Ce.top;Le.beginPath(),Le.moveTo(ht,Ut),T(!0)},Ks=C=>{var Me,$n,Xn,Yn;if(!D)return;const _=R.current,Ce=_.getBoundingClientRect(),Le=_.getContext("2d"),ht=(C.clientX||(($n=(Me=C.touches)==null?void 0:Me[0])==null?void 0:$n.clientX))-Ce.left,Ut=(C.clientY||((Yn=(Xn=C.touches)==null?void 0:Xn[0])==null?void 0:Yn.clientY))-Ce.top;Le.lineTo(ht,Ut),Le.stroke()},ha=()=>{D&&R.current&&Ot(R.current.toDataURL()),T(!1)},cp=()=>{const C=R.current,_=C.getContext("2d");_.fillStyle="#ffffff",_.fillRect(0,0,C.width,C.height),Ot(null)},qs=async C=>{if(C&&C.preventDefault(),!k||!N||!B||!A||!c.contactMethod||!h){alert(e==="ar"?"الرجاء إكمال جميع البيانات":"Please complete all fields");return}p(!0);try{const _=h==="electronic"?Math.round(U()*.95):U(),Ce={...c,serviceType:B.id,carCategory:A.id,totalPrice:_,originalPrice:U(),discount:h==="electronic"?5:0,preferredDate:k.toISOString().split("T")[0],preferredTime:N,signature:Wn,paymentMethod:h},Le=await Be.createBooking(Ce);if(Le.success)if(h==="electronic"){const ht=await Be.createCheckoutSession({amount:_*100,bookingId:Le.bookingId,customerName:c.name,customerPhone:c.phone,serviceType:B.id,carCategory:A.id});ht.url?window.location.href=ht.url:(j(!0),b(Le.bookingId||""))}else j(!0),b(Le.bookingId||"")}catch(_){console.error("Error:",_),alert(e==="ar"?"حدث خطأ، يرجى المحاولة مرة أخرى":"An error occurred, please try again")}p(!1)},ga=C=>S.includes(C),dp=()=>x===0?A&&B:x===1?k:x===2?N:x===3?c.name&&c.phone&&c.carBrand&&c.carModel&&c.carYear&&c.contactMethod:x===4?h!==null:!1,Zs=e==="ar"?["الخدمة","التاريخ","الوقت","البيانات","الدفع"]:["Service","Date","Time","Details","Payment"],up=()=>{j(!1),F(0),ye(null),Hn(null),z(null),P(null),Ot(null),m(null),d({name:"",phone:"",carBrand:"",carModel:"",carYear:"",contactMethod:""})};return i.jsxs("div",{className:"booking-page",children:[i.jsx("div",{className:"booking-hero",children:i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(ep,{size:16}),i.jsx("span",{children:e==="ar"?"احجز موعدك الآن":"Book Your Appointment"})]}),i.jsx("h1",{children:e==="ar"?"حجز موعد الفحص":"Book Inspection"}),i.jsx("p",{children:e==="ar"?"اختر فئة سيارتك ونوع الفحص المناسب":"Select your car category and inspection type"})]})}),i.jsx("div",{className:"booking-content",children:g?i.jsx("div",{className:"success-container",children:i.jsxs("div",{className:"success-card",children:[i.jsx("div",{className:"success-icon-wrapper",children:i.jsx("div",{className:"success-icon",children:i.jsx(dn,{size:50})})}),i.jsx("h2",{children:e==="ar"?"تم الحجز بنجاح!":"Booking Confirmed!"}),i.jsxs("div",{className:"booking-code-section",children:[i.jsx("p",{className:"code-label",children:e==="ar"?"رقم الحجز الخاص بك":"Your Booking Code"}),i.jsxs("div",{className:"booking-code-box",children:[i.jsx("span",{className:"booking-code-value",children:w}),i.jsxs("button",{className:"copy-code-btn",onClick:()=>{navigator.clipboard.writeText(w),alert(e==="ar"?"تم نسخ الكود!":"Code copied!")},children:[i.jsx($u,{size:18}),e==="ar"?"نسخ":"Copy"]})]}),i.jsxs("p",{className:"code-instruction",children:[i.jsx(Ku,{size:16}),e==="ar"?"انسخ الكود واستخدمه مع شات الذكاء الاصطناعي للتحقق من حالة حجزك":"Copy this code and use it with the AI chat to check your booking status"]})]}),i.jsxs("div",{className:"success-details",children:[i.jsxs("div",{className:"detail-row",children:[i.jsx("span",{className:"detail-label",children:e==="ar"?"فئة السيارة":"Car Category"}),i.jsx("span",{className:"detail-value",children:e==="ar"?A==null?void 0:A.title:A==null?void 0:A.titleEn})]}),i.jsxs("div",{className:"detail-row",children:[i.jsx("span",{className:"detail-label",children:e==="ar"?"نوع الفحص":"Inspection Type"}),i.jsx("span",{className:"detail-value",children:e==="ar"?B==null?void 0:B.title:B==null?void 0:B.titleEn})]}),i.jsxs("div",{className:"detail-row",children:[i.jsx("span",{className:"detail-label",children:e==="ar"?"التاريخ":"Date"}),i.jsx("span",{className:"detail-value",children:k&&it(k)})]}),i.jsxs("div",{className:"detail-row",children:[i.jsx("span",{className:"detail-label",children:e==="ar"?"الوقت":"Time"}),i.jsx("span",{className:"detail-value",children:N})]}),i.jsxs("div",{className:"detail-row total",children:[i.jsx("span",{className:"detail-label",children:e==="ar"?"السعر":"Price"}),i.jsxs("span",{className:"detail-value",children:[U()," ",e==="ar"?"درهم":"AED"]})]})]}),i.jsx("div",{className:"success-message",children:i.jsx("p",{children:e==="ar"?"شكراً لاختيارك مركز الأمان العالي الدولي! سيتم التواصل معك خلال 30 دقيقة لتأكيد موعدك.":"Thank you for choosing High Safety International! We will contact you within 30 minutes to confirm your appointment."})}),i.jsx("button",{className:"new-booking-btn",onClick:up,children:e==="ar"?"حجز جديد":"New Booking"})]})}):i.jsxs("div",{className:"booking-wizard",children:[i.jsx("div",{className:"wizard-progress",children:Zs.map((C,_)=>i.jsxs("div",{className:`progress-step ${x>=_?"active":""} ${x===_?"current":""}`,children:[i.jsx("div",{className:"step-number",children:_+1}),i.jsx("span",{className:"step-label",children:C}),_<Zs.length-1&&i.jsx("div",{className:"step-connector"})]},_))}),i.jsxs("div",{className:"wizard-content",children:[x===0&&i.jsxs("div",{className:"step-service",children:[i.jsxs("div",{className:"section-block",children:[i.jsxs("h3",{className:"section-title",children:[i.jsx("span",{className:"title-number",children:"1"}),e==="ar"?"اختر فئة السيارة":"Select Car Category"]}),i.jsx("p",{className:"click-instruction",children:e==="ar"?"👆 انقر واختر الفئة المطلوبة":"👆 Click to select your category"}),i.jsx("div",{className:"car-categories-grid",children:r.map(C=>i.jsxs("div",{className:`category-card ${(A==null?void 0:A.id)===C.id?"selected":""}`,onClick:()=>{ye(C),Hn(null)},children:[i.jsx("div",{className:"category-icon category-icon-img",children:i.jsx("img",{src:C.image,alt:C.titleEn,style:{width:"100%",height:"100%",objectFit:"contain",transition:"transform 0.3s ease"}})}),i.jsxs("div",{className:"category-name",children:[i.jsxs("strong",{children:[e==="ar"?C.title:C.titleEn,C.hasPlus&&i.jsx("span",{style:{color:"#C89D2A",marginRight:"5px",marginLeft:"5px"},children:"+"})]}),i.jsx("small",{children:e==="ar"?C.titleEn:C.title})]}),(A==null?void 0:A.id)===C.id&&i.jsx("div",{className:"selected-check",style:{background:C.gradient},children:i.jsx(dn,{size:16})}),i.jsx("div",{className:"category-indicator",style:{background:C.gradient}})]},C.id))})]}),A&&i.jsxs("div",{className:"section-block",children:[i.jsxs("h3",{className:"section-title",children:[i.jsx("span",{className:"title-number",children:"2"}),e==="ar"?"اختر نوع الفحص":"Select Inspection Type"]}),i.jsx("div",{className:"services-grid",children:o.map(C=>i.jsxs("div",{className:`service-card ${(B==null?void 0:B.id)===C.id?"selected":""}`,onClick:()=>Hn(C),children:[i.jsxs("div",{className:"service-header",children:[i.jsx("div",{className:"service-icon",style:{background:C.color},children:C.icon}),i.jsxs("div",{className:"service-info",children:[i.jsx("strong",{children:e==="ar"?C.title:C.titleEn}),i.jsx("small",{children:e==="ar"?C.titleEn:C.title})]})]}),i.jsxs("div",{className:"service-price",children:[i.jsxs("span",{className:"price-value",children:[Q(C.id),(A==null?void 0:A.id)==="classic"&&i.jsx("span",{style:{color:"#C89D2A",fontWeight:"bold"},children:"+"})]}),i.jsx("span",{className:"price-currency",children:e==="ar"?"درهم":"AED"})]}),(B==null?void 0:B.id)===C.id&&i.jsx("div",{className:"selected-indicator",style:{background:C.color}})]},C.id))})]}),A&&B&&i.jsxs("div",{className:"summary-card",children:[i.jsxs("div",{className:"summary-header",children:[i.jsx(Pn,{size:20}),i.jsx("span",{children:e==="ar"?"ملخص الاختيار":"Selection Summary"})]}),i.jsxs("div",{className:"summary-body",children:[i.jsxs("div",{className:"summary-item",children:[i.jsx("img",{src:A.image,alt:A.titleEn,style:{width:"60px",height:"60px",objectFit:"contain"}}),i.jsx("span",{children:e==="ar"?A.title:A.titleEn})]}),i.jsx("div",{className:"summary-divider",children:"+"}),i.jsxs("div",{className:"summary-item",children:[i.jsx("span",{children:B.icon}),i.jsx("span",{children:e==="ar"?B.title:B.titleEn})]}),i.jsx("div",{className:"summary-divider",children:"="}),i.jsxs("div",{className:"summary-total",children:[i.jsxs("span",{className:"total-amount",children:[U(),(A==null?void 0:A.id)==="classic"&&i.jsx("span",{style:{color:"#C89D2A"},children:"+"})]}),i.jsx("span",{className:"total-currency",children:e==="ar"?"درهم":"AED"})]})]})]})]}),x===1&&i.jsx("div",{className:"step-date",children:i.jsxs("div",{className:"calendar-card",children:[i.jsxs("div",{className:"calendar-header",children:[i.jsx("button",{className:"nav-btn",onClick:()=>f(new Date(u.getFullYear(),u.getMonth()-1)),children:n?i.jsx(di,{size:24}):i.jsx(ci,{size:24})}),i.jsxs("h3",{children:[sp[u.getMonth()]," ",u.getFullYear()]}),i.jsx("button",{className:"nav-btn",onClick:()=>f(new Date(u.getFullYear(),u.getMonth()+1)),children:n?i.jsx(ci,{size:24}):i.jsx(di,{size:24})})]}),i.jsx("div",{className:"calendar-days-header",children:lp.map(C=>i.jsx("span",{children:C},C))}),i.jsx("div",{className:"calendar-days-grid",children:Vn(u).map((C,_)=>i.jsx("button",{className:`day-cell ${C?"":"empty"} ${We(C)?"disabled":""} ${(k==null?void 0:k.toDateString())===(C==null?void 0:C.toDateString())?"selected":""} ${(C==null?void 0:C.getDay())===5?"friday":""}`,onClick:()=>C&&!We(C)&&z(C),disabled:!C||We(C),children:(C==null?void 0:C.getDate())||""},_))}),i.jsx("p",{className:"calendar-note",children:e==="ar"?"⚠️ يوم الجمعة إجازة رسمية":"⚠️ Friday is an official holiday"})]})}),x===2&&i.jsx("div",{className:"step-time",children:i.jsxs("div",{className:"time-card",children:[i.jsxs("div",{className:"selected-date-display",children:[i.jsx(qt,{size:20}),i.jsx("span",{children:it(k)})]}),i.jsx("p",{className:"working-hours",children:e==="ar"?"ساعات العمل: 10 صباحاً - 9 مساءً":"Working hours: 10 AM - 9 PM"}),i.jsx("div",{className:"time-slots-grid",children:l.map(C=>i.jsxs("button",{className:`time-slot ${ga(C)?"booked":""} ${N===C?"selected":""}`,onClick:()=>!ga(C)&&P(C),disabled:ga(C),children:[i.jsx(gr,{size:14}),i.jsx("span",{children:C})]},C))})]})}),x===3&&i.jsxs("form",{className:"step-details",onSubmit:qs,children:[i.jsxs("div",{className:"booking-summary-bar",children:[i.jsxs("div",{className:"summary-item-bar",children:[A&&i.jsx("img",{src:A.image,alt:A.titleEn,style:{width:"40px",height:"40px",objectFit:"contain"}}),i.jsx("span",{children:e==="ar"?A==null?void 0:A.title:A==null?void 0:A.titleEn})]}),i.jsxs("div",{className:"summary-item-bar",children:[B==null?void 0:B.icon,i.jsx("span",{children:e==="ar"?B==null?void 0:B.title:B==null?void 0:B.titleEn})]}),i.jsxs("div",{className:"summary-item-bar",children:[i.jsx(qt,{size:16}),i.jsx("span",{children:it(k)})]}),i.jsxs("div",{className:"summary-item-bar",children:[i.jsx(gr,{size:16}),i.jsx("span",{children:N})]}),i.jsxs("div",{className:"summary-price-bar",children:[U()," ",e==="ar"?"درهم":"AED"]})]}),i.jsxs("div",{className:"form-card",children:[i.jsxs("div",{className:"form-section",children:[i.jsx("h4",{children:e==="ar"?"بيانات التواصل":"Contact Information"}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:e==="ar"?"الاسم الكامل":"Full Name"}),i.jsx("input",{name:"name",placeholder:e==="ar"?"أدخل اسمك الكامل":"Enter your full name",value:c.name,onChange:Se,required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:e==="ar"?"رقم الهاتف":"Phone Number"}),i.jsx("input",{name:"phone",placeholder:"05XXXXXXXX",value:c.phone,onChange:Se,required:!0})]})]})]}),i.jsxs("div",{className:"form-section",children:[i.jsx("h4",{children:e==="ar"?"طريقة التواصل المفضلة":"Preferred Contact Method"}),i.jsx("div",{className:"contact-options",children:s.map(C=>i.jsxs("button",{type:"button",className:`contact-option ${c.contactMethod===C.id?"selected":""}`,onClick:()=>d({...c,contactMethod:C.id}),children:[i.jsx("span",{className:"contact-icon",style:{color:C.color},children:C.icon}),i.jsx("span",{children:C.label}),c.contactMethod===C.id&&i.jsx(dn,{size:18,className:"check-icon"})]},C.id))})]}),i.jsxs("div",{className:"form-section",children:[i.jsx("h4",{children:e==="ar"?"بيانات السيارة":"Car Information"}),i.jsxs("div",{className:"form-row three-cols",children:[i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:e==="ar"?"ماركة السيارة":"Car Brand"}),i.jsx("input",{name:"carBrand",placeholder:e==="ar"?"مثال: تويوتا":"e.g., Toyota",value:c.carBrand,onChange:Se,required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:e==="ar"?"الموديل":"Model"}),i.jsx("input",{name:"carModel",placeholder:e==="ar"?"مثال: كامري":"e.g., Camry",value:c.carModel,onChange:Se,required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:e==="ar"?"سنة الصنع":"Year"}),i.jsx("input",{name:"carYear",type:"number",min:"1980",max:"2025",placeholder:"2020",value:c.carYear,onChange:Se,required:!0})]})]})]}),i.jsxs("div",{className:"form-section",children:[i.jsxs("h4",{children:[i.jsx(qu,{size:18}),e==="ar"?"توقيع العميل":"Customer Signature"]}),i.jsxs("div",{className:"signature-area",children:[i.jsx("canvas",{ref:R,width:320,height:140,onMouseDown:Qs,onMouseMove:Ks,onMouseUp:ha,onMouseLeave:ha,onTouchStart:Qs,onTouchMove:Ks,onTouchEnd:ha}),i.jsx("button",{type:"button",className:"clear-btn",onClick:cp,children:e==="ar"?"مسح التوقيع":"Clear"})]})]})]})]}),x===4&&i.jsxs("div",{className:"step-payment",children:[i.jsxs("div",{className:"booking-summary-bar",children:[i.jsxs("div",{className:"summary-item-bar",children:[A&&i.jsx("img",{src:A.image,alt:A.titleEn,style:{width:"40px",height:"40px",objectFit:"contain"}}),i.jsx("span",{children:e==="ar"?A==null?void 0:A.title:A==null?void 0:A.titleEn})]}),i.jsxs("div",{className:"summary-item-bar",children:[B==null?void 0:B.icon,i.jsx("span",{children:e==="ar"?B==null?void 0:B.title:B==null?void 0:B.titleEn})]}),i.jsxs("div",{className:"summary-item-bar",children:[i.jsx(qt,{size:16}),i.jsx("span",{children:it(k)})]}),i.jsxs("div",{className:"summary-item-bar",children:[i.jsx(gr,{size:16}),i.jsx("span",{children:N})]}),i.jsxs("div",{className:"summary-price-bar",children:[U()," ",e==="ar"?"درهم":"AED"]})]}),i.jsxs("div",{className:"payment-card",children:[i.jsxs("h3",{className:"section-title",children:[i.jsx("span",{className:"title-number",children:i.jsx(Vo,{size:18})}),e==="ar"?"اختر طريقة الدفع":"Select Payment Method"]}),i.jsxs("div",{className:"payment-options",children:[i.jsxs("div",{className:`payment-option ${h==="electronic"?"selected":""}`,onClick:()=>m("electronic"),children:[i.jsx("div",{className:"payment-icon electronic",children:i.jsx(Vo,{size:32})}),i.jsxs("div",{className:"payment-info",children:[i.jsx("strong",{children:e==="ar"?"الدفع الإلكتروني":"Electronic Payment"}),i.jsx("small",{children:e==="ar"?"بطاقة ائتمان / Apple Pay":"Credit Card / Apple Pay"}),i.jsxs("div",{className:"discount-info",children:[i.jsx("span",{className:"discount-badge",children:"-5%"}),i.jsx("span",{className:"discount-text",children:e==="ar"?`السعر: ${Math.round(U()*.95)} درهم بدلاً من ${U()} درهم`:`Price: ${Math.round(U()*.95)} AED instead of ${U()} AED`})]})]}),h==="electronic"&&i.jsx("div",{className:"selected-check",style:{background:"linear-gradient(135deg, #4285F4, #1a73e8)"},children:i.jsx(dn,{size:16})})]}),i.jsxs("div",{className:`payment-option ${h==="cash"?"selected":""}`,onClick:()=>m("cash"),children:[i.jsx("div",{className:"payment-icon cash",children:i.jsx(Qh,{size:32})}),i.jsxs("div",{className:"payment-info",children:[i.jsx("strong",{children:e==="ar"?"الدفع كاش عند الوصول":"Cash on Arrival"}),i.jsx("small",{children:e==="ar"?"ادفع نقداً في المركز":"Pay at the center"})]}),i.jsx("div",{className:"payment-badge cash-badge",children:e==="ar"?"نقدي":"Cash"}),h==="cash"&&i.jsx("div",{className:"selected-check",style:{background:"linear-gradient(135deg, #34A853, #1e8e3e)"},children:i.jsx(dn,{size:16})})]})]}),i.jsx("div",{className:"payment-summary",children:i.jsxs("div",{className:"payment-total",children:[i.jsx("span",{children:e==="ar"?"المبلغ الإجمالي:":"Total Amount:"}),h==="electronic"?i.jsxs("div",{className:"amount-with-discount",children:[i.jsx("span",{className:"original-amount",children:U()}),i.jsxs("span",{className:"discounted-amount",children:[Math.round(U()*.95)," ",e==="ar"?"درهم":"AED"]})]}):i.jsxs("span",{className:"amount",children:[U()," ",e==="ar"?"درهم":"AED"]})]})}),i.jsx("button",{className:"submit-booking-btn",onClick:qs,disabled:v||!h,children:v?e==="ar"?"جاري المعالجة...":"Processing...":h==="electronic"?e==="ar"?"المتابعة للدفع":"Proceed to Payment":e==="ar"?"تأكيد الحجز":"Confirm Booking"})]})]})]}),i.jsxs("div",{className:"wizard-navigation",children:[x>0&&i.jsxs("button",{className:"nav-back-btn",onClick:()=>F(x-1),children:[n?i.jsx(di,{size:20}):i.jsx(ci,{size:20}),e==="ar"?"السابق":"Back"]}),x<4&&i.jsxs("button",{className:"nav-next-btn",onClick:()=>F(x+1),disabled:!dp(),children:[e==="ar"?"التالي":"Next",n?i.jsx(ci,{size:20}):i.jsx(di,{size:20})]})]})]})}),i.jsx("style",{children:`
        .booking-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        }
        .booking-hero {
          background: linear-gradient(135deg, #0B1F3A 0%, #1a365d 50%, #2d4a6f 100%);
          padding: 60px 20px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .booking-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero-content {
          position: relative;
          z-index: 1;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .booking-hero h1 {
          color: white;
          font-size: 2.5rem;
          margin: 0 0 10px;
          font-weight: 700;
        }
        .booking-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          margin: 0;
        }
        .booking-content {
          max-width: 900px;
          margin: -40px auto 40px;
          padding: 0 20px;
          position: relative;
        }
        .booking-wizard {
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .wizard-progress {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px 20px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-bottom: 1px solid #e2e8f0;
        }
        .progress-step {
          display: flex;
          align-items: center;
          position: relative;
        }
        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .progress-step.active .step-number {
          background: #0B1F3A;
          color: white;
        }
        .progress-step.current .step-number {
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: white;
          box-shadow: 0 4px 15px rgba(200,157,42,0.4);
          transform: scale(1.1);
        }
        .step-label {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 0.8rem;
          color: #64748b;
        }
        .progress-step.current .step-label {
          color: #0B1F3A;
          font-weight: 600;
        }
        .step-connector {
          width: 60px;
          height: 3px;
          background: #e2e8f0;
          margin: 0 10px;
        }
        .progress-step.active .step-connector {
          background: #0B1F3A;
        }
        .wizard-content {
          padding: 40px 30px;
        }
        .section-block {
          margin-bottom: 35px;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.2rem;
          color: #0B1F3A;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .title-number {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
        .car-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }
        .category-card {
          position: relative;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 25px 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .category-card.selected {
          border-color: transparent;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        .category-icon {
          margin-bottom: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .click-instruction {
          text-align: center;
          color: #C89D2A;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 20px;
          padding: 10px;
          background: linear-gradient(135deg, rgba(200,157,42,0.1), rgba(200,157,42,0.05));
          border-radius: 10px;
          border: 1px dashed #C89D2A;
        }
        .price-prefix {
          color: #C89D2A;
          font-weight: 700;
          font-size: 1rem;
          margin-right: 2px;
        }
        .category-name strong {
          display: block;
          font-size: 1rem;
          color: #0B1F3A;
          margin-bottom: 4px;
        }
        .category-name small {
          color: #64748b;
          font-size: 0.8rem;
        }
        .selected-check {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .category-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .category-card.selected .category-indicator {
          opacity: 1;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .service-card {
          position: relative;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .service-card:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }
        .service-card.selected {
          border-color: #0B1F3A;
          background: linear-gradient(135deg, #f8fafc, #fff);
        }
        .service-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }
        .service-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .service-info strong {
          display: block;
          font-size: 1rem;
          color: #0B1F3A;
          margin-bottom: 3px;
        }
        .service-info small {
          color: #64748b;
          font-size: 0.85rem;
        }
        .service-price {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .price-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #C89D2A;
        }
        .price-currency {
          font-size: 0.9rem;
          color: #64748b;
        }
        .selected-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
        }
        .summary-card {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          border-radius: 16px;
          padding: 20px;
          color: white;
        }
        .summary-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          color: #C89D2A;
          font-weight: 600;
        }
        .summary-body {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        .summary-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          padding: 10px 18px;
          border-radius: 10px;
        }
        .summary-divider {
          color: #C89D2A;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .summary-total {
          display: flex;
          align-items: baseline;
          gap: 6px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          padding: 12px 25px;
          border-radius: 12px;
        }
        .total-amount {
          font-size: 1.8rem;
          font-weight: 700;
        }
        .total-currency {
          font-size: 0.9rem;
        }
        .calendar-card, .time-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          border: 1px solid #e2e8f0;
        }
        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .calendar-header h3 {
          color: #0B1F3A;
          font-size: 1.1rem;
          margin: 0;
          font-weight: 700;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          background: #f1f5f9;
          color: #0B1F3A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .nav-btn:hover {
          background: #e2e8f0;
        }
        .calendar-days-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          margin-bottom: 10px;
        }
        .calendar-days-header span {
          text-align: center;
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
          padding: 10px 0;
        }
        .calendar-days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        .day-cell {
          aspect-ratio: 1;
          border-radius: 10px;
          border: none;
          background: #f8fafc;
          color: #0B1F3A;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .day-cell:hover:not(.disabled):not(.empty) {
          background: #e2e8f0;
        }
        .day-cell.selected {
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: white;
          font-weight: 600;
        }
        .day-cell.disabled, .day-cell.friday {
          background: #fee2e2;
          color: #ef4444;
          cursor: not-allowed;
          opacity: 0.6;
        }
        .day-cell.empty {
          background: transparent;
          cursor: default;
        }
        .calendar-note {
          text-align: center;
          color: #ef4444;
          font-size: 0.85rem;
          margin-top: 15px;
        }
        .selected-date-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          padding: 15px;
          border-radius: 12px;
          margin-bottom: 15px;
          font-weight: 600;
        }
        .working-hours {
          text-align: center;
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }
        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          max-width: 100%;
          overflow: hidden;
        }
        .time-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 12px 6px;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
          background: white;
          color: #0B1F3A;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 0;
          white-space: nowrap;
        }
        .time-slot:hover:not(.booked) {
          border-color: #C89D2A;
          background: #fffbeb;
        }
        .time-slot.selected {
          border-color: #C89D2A;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          color: white;
        }
        .time-slot.booked {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
          text-decoration: line-through;
        }
        .booking-summary-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          padding: 15px 20px;
          border-radius: 14px;
          margin-bottom: 25px;
          align-items: center;
          justify-content: center;
        }
        .summary-item-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          padding: 8px 15px;
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
        }
        .summary-price-bar {
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          padding: 8px 20px;
          border-radius: 8px;
          color: white;
          font-weight: 700;
          font-size: 1rem;
        }
        .form-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 25px;
        }
        .form-section {
          margin-bottom: 25px;
        }
        .form-section:last-child {
          margin-bottom: 0;
        }
        .form-section h4 {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0B1F3A;
          font-size: 1rem;
          margin: 0 0 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }
        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .form-row.three-cols {
          grid-template-columns: repeat(3, 1fr);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 0.85rem;
          color: #475569;
          font-weight: 500;
        }
        .form-group input {
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .form-group input:focus {
          outline: none;
          border-color: #C89D2A;
          box-shadow: 0 0 0 3px rgba(200,157,42,0.1);
        }
        .contact-options {
          display: flex;
          gap: 12px;
        }
        .contact-option {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          font-size: 0.95rem;
          position: relative;
        }
        .contact-option:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }
        .contact-option.selected {
          border-color: #0B1F3A;
          background: #f8fafc;
        }
        .contact-icon {
          font-size: 1.2rem;
        }
        .check-icon {
          color: #34A853;
        }
        .signature-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }
        .signature-area canvas {
          border: 2px dashed #C89D2A;
          border-radius: 12px;
          background: white;
          cursor: crosshair;
          touch-action: none;
          max-width: 100%;
          width: 100%;
          height: auto;
        }
        .clear-btn {
          padding: 10px 25px;
          background: #f1f5f9;
          border: none;
          border-radius: 8px;
          color: #475569;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        .clear-btn:hover {
          background: #e2e8f0;
        }
        .submit-booking-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .submit-booking-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(200,157,42,0.4);
        }
        .submit-booking-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .wizard-navigation {
          display: flex;
          justify-content: space-between;
          padding: 20px 30px 30px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        .nav-back-btn, .nav-next-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .nav-back-btn {
          background: white;
          border: 2px solid #e2e8f0;
          color: #475569;
        }
        .nav-back-btn:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
        .nav-next-btn {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          border: none;
          color: white;
          margin-left: auto;
        }
        .nav-next-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(11,31,58,0.3);
        }
        .nav-next-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .success-container {
          padding: 20px;
        }
        .success-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .success-icon-wrapper {
          margin-bottom: 20px;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          background: linear-gradient(135deg, #34A853, #2e7d32);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .success-card h2 {
          color: #0B1F3A;
          font-size: 1.8rem;
          margin: 0 0 10px;
        }
        .booking-code-section {
          margin-bottom: 25px;
          max-width: 100%;
          overflow: hidden;
        }
        .code-label {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        .booking-code-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          padding: 20px 15px;
          border-radius: 14px;
          margin-bottom: 12px;
          max-width: 100%;
          overflow: hidden;
        }
        .booking-code-value {
          font-family: monospace;
          font-size: 1.1rem;
          font-weight: 700;
          color: #C89D2A;
          letter-spacing: 1px;
          word-break: break-all;
          text-align: center;
          max-width: 100%;
        }
        .copy-code-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .copy-code-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(200,157,42,0.4);
        }
        .code-instruction {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #34A853;
          font-size: 0.85rem;
          background: rgba(52,168,83,0.1);
          padding: 12px 20px;
          border-radius: 10px;
          margin: 0;
        }
        .success-details {
          background: #f8fafc;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-row.total {
          font-weight: 700;
          font-size: 1.1rem;
          color: #C89D2A;
        }
        .detail-label {
          color: #64748b;
        }
        .detail-value {
          color: #0B1F3A;
          font-weight: 500;
        }
        .success-message {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          color: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 25px;
        }
        .success-message p {
          margin: 0;
          line-height: 1.7;
        }
        .new-booking-btn {
          padding: 16px 40px;
          background: linear-gradient(135deg, #C89D2A, #d4af37);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }
        .new-booking-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(200,157,42,0.4);
        }
        .step-payment {
          padding: 0;
        }
        .payment-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          border: 1px solid #e2e8f0;
          margin-top: 20px;
        }
        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 25px;
        }
        .payment-option {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-wrap: wrap;
        }
        .payment-option:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        .payment-option.selected {
          border-color: #0B1F3A;
          background: linear-gradient(135deg, #f8fafc, #fff);
          box-shadow: 0 8px 25px rgba(11,31,58,0.15);
        }
        .payment-icon {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .payment-icon.electronic {
          background: linear-gradient(135deg, #4285F4, #1a73e8);
        }
        .payment-icon.cash {
          background: linear-gradient(135deg, #34A853, #1e8e3e);
        }
        .payment-info {
          flex: 1;
          min-width: 0;
        }
        .payment-info strong {
          display: block;
          font-size: 1rem;
          color: #0B1F3A;
          margin-bottom: 5px;
        }
        .payment-info small {
          color: #64748b;
          font-size: 0.85rem;
          display: block;
        }
        .discount-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }
        .discount-badge {
          background: linear-gradient(135deg, #34A853, #1e8e3e);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .discount-text {
          color: #34A853;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .payment-badge {
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .payment-badge.secure {
          background: linear-gradient(135deg, rgba(66,133,244,0.1), rgba(26,115,232,0.1));
          color: #4285F4;
        }
        .payment-badge.cash-badge {
          background: linear-gradient(135deg, rgba(52,168,83,0.1), rgba(30,142,62,0.1));
          color: #34A853;
        }
        .amount-with-discount {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .original-amount {
          text-decoration: line-through;
          color: rgba(255,255,255,0.5);
          font-size: 1rem;
        }
        .discounted-amount {
          font-size: 1.8rem;
          font-weight: 700;
          color: #34A853;
        }
        .payment-summary {
          background: linear-gradient(135deg, #0B1F3A, #1a365d);
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .payment-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }
        .payment-total .amount {
          font-size: 1.8rem;
          font-weight: 700;
          color: #C89D2A;
        }
        @media (max-width: 768px) {
          .car-categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .services-grid {
            grid-template-columns: 1fr;
          }
          .time-slots-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }
          .time-slot {
            padding: 10px 4px;
            font-size: 0.75rem;
            gap: 2px;
          }
          .time-slot svg {
            width: 12px;
            height: 12px;
          }
          .form-row, .form-row.three-cols {
            grid-template-columns: 1fr;
          }
          .contact-options {
            flex-direction: column;
          }
          .wizard-content {
            padding: 25px 20px;
          }
          .booking-hero h1 {
            font-size: 1.8rem;
          }
        }
      `})]})}function yg(){const{language:e,t}=rt(),[n,r]=y.useState(""),[a,o]=y.useState(""),[s,l]=y.useState(""),[c,d]=y.useState(null),[h,m]=y.useState(!1),[g,j]=y.useState(null),w=async v=>{v.preventDefault(),m(!0),o(""),d(null);try{const p=await Be.findReportByCode(n.trim());p.success?(d(p.report),o(t.report.found||"Report found!"),l("success")):(o(t.report.notFound),l("error"))}catch{o(t.common.error),l("error")}m(!1)},b=()=>{r(""),o(""),d(null)};return i.jsxs("div",{style:{minHeight:"100vh",background:"linear-gradient(180deg, #0B1F3A 0%, #0B1F3A 40%, #C89D2A 100%)",padding:"20px",display:"flex",flexDirection:"column",alignItems:"center"},children:[i.jsx("div",{style:{width:"100%",maxWidth:"420px",marginTop:"40px"},children:i.jsxs("div",{style:{background:"white",borderRadius:"24px",padding:"40px 30px",boxShadow:"0 10px 40px rgba(0,0,0,0.2)"},children:[i.jsxs("div",{style:{textAlign:"center",marginBottom:"30px"},children:[i.jsx("div",{style:{width:"80px",height:"80px",margin:"0 auto 20px",display:"flex",alignItems:"center",justifyContent:"center"},children:i.jsx(Lt,{size:60,color:"#0B1F3A",strokeWidth:1.5})}),i.jsxs("h1",{style:{fontSize:"1.8rem",fontWeight:"700",color:"#0B1F3A",margin:"0 0 10px 0",lineHeight:"1.3"},children:[e==="ar"?"تحميل تقرير":"Download",i.jsx("br",{}),e==="ar"?"الفحص":"Inspection Report"]}),i.jsx("div",{style:{width:"50px",height:"4px",background:"#C89D2A",margin:"15px auto 0",borderRadius:"2px"}})]}),a&&i.jsx("div",{style:{padding:"12px 16px",borderRadius:"12px",marginBottom:"20px",textAlign:"center",fontWeight:"600",background:s==="success"?"#d4edda":"#f8d7da",color:s==="success"?"#155724":"#721c24",border:`1px solid ${s==="success"?"#c3e6cb":"#f5c6cb"}`},children:a}),c?i.jsxs("div",{style:{textAlign:"center"},children:[i.jsxs("div",{style:{background:"#f8f9fa",padding:"20px",borderRadius:"12px",marginBottom:"20px",border:"1px solid #e0e0e0"},children:[i.jsx("p",{style:{margin:"0 0 5px 0",color:"#666",fontSize:"0.9rem"},children:e==="ar"?"اسم العميل:":"Customer Name:"}),i.jsx("p",{style:{margin:0,fontSize:"1.2rem",fontWeight:"700",color:"#0B1F3A"},children:c.customerName})]}),c.filename&&i.jsxs("a",{href:`/uploads/${c.filename}`,download:!0,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",padding:"16px",fontSize:"1.1rem",fontWeight:"700",background:"#0B1F3A",color:"white",textDecoration:"none",borderRadius:"12px",marginBottom:"15px",boxShadow:"0 4px 15px rgba(11,31,58,0.3)",transition:"transform 0.2s"},onMouseOver:v=>v.currentTarget.style.transform="translateY(-2px)",onMouseOut:v=>v.currentTarget.style.transform="translateY(0)",children:[i.jsx(xc,{size:22}),t.report.downloadPdf]}),c.images&&c.images.length>0&&i.jsxs("div",{style:{marginBottom:"20px"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"15px",color:"#0B1F3A"},children:[i.jsx(Xu,{size:20}),i.jsxs("span",{style:{fontWeight:"600"},children:[t.report.images," (",c.images.length,")"]})]}),i.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(80px, 1fr))",gap:"8px"},children:c.images.map((v,p)=>i.jsx("div",{onClick:()=>j(`/uploads/${v}`),style:{borderRadius:"8px",overflow:"hidden",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",transition:"transform 0.2s"},onMouseOver:u=>u.currentTarget.style.transform="scale(1.05)",onMouseOut:u=>u.currentTarget.style.transform="scale(1)",children:i.jsx("img",{src:`/uploads/${v}`,alt:`${e==="ar"?"صورة فحص":"Inspection image"} ${p+1}`,style:{width:"100%",height:"70px",objectFit:"cover"}})},p))}),i.jsxs("a",{href:"#",onClick:v=>{v.preventDefault(),c.images.forEach((p,u)=>{setTimeout(()=>{const f=document.createElement("a");f.href=`/uploads/${p}`,f.download=`inspection-image-${u+1}.jpg`,f.click()},u*300)})},style:{display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"15px",color:"#C89D2A",fontWeight:"600",textDecoration:"none"},children:[i.jsx(xc,{size:18}),t.report.downloadAll]})]}),i.jsx("button",{onClick:b,style:{width:"100%",padding:"14px",fontSize:"1rem",fontWeight:"600",background:"transparent",color:"#0B1F3A",border:"2px solid #0B1F3A",borderRadius:"12px",cursor:"pointer",transition:"all 0.2s"},onMouseOver:v=>{v.currentTarget.style.background="#0B1F3A",v.currentTarget.style.color="white"},onMouseOut:v=>{v.currentTarget.style.background="transparent",v.currentTarget.style.color="#0B1F3A"},children:e==="ar"?"بحث جديد":"New Search"})]}):i.jsxs("form",{onSubmit:w,children:[i.jsxs("div",{style:{marginBottom:"20px"},children:[i.jsx("label",{style:{display:"block",marginBottom:"12px",fontSize:"1.1rem",fontWeight:"600",color:"#0B1F3A",textAlign:"center"},children:e==="ar"?"كود التقرير":"Report Code"}),i.jsx("input",{type:"text",value:n,onChange:v=>r(v.target.value.toUpperCase()),required:!0,placeholder:e==="ar"?"أدخل كود التقرير":"Enter report code",style:{width:"100%",padding:"16px 20px",fontSize:"1.1rem",border:"2px solid #e0e0e0",borderRadius:"12px",textAlign:"center",letterSpacing:"2px",fontWeight:"600",textTransform:"uppercase",background:"#f8f9fa",color:"#0B1F3A",outline:"none",transition:"border-color 0.3s, box-shadow 0.3s",boxSizing:"border-box"},onFocus:v=>{v.target.style.borderColor="#C89D2A",v.target.style.boxShadow="0 0 0 3px rgba(200,157,42,0.1)"},onBlur:v=>{v.target.style.borderColor="#e0e0e0",v.target.style.boxShadow="none"}})]}),i.jsx("button",{type:"submit",disabled:h||!n.trim(),style:{width:"100%",padding:"16px",fontSize:"1.1rem",fontWeight:"700",background:"#EA4335",color:"white",border:"none",borderRadius:"12px",cursor:h||!n.trim()?"not-allowed":"pointer",opacity:h||!n.trim()?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",transition:"transform 0.2s, box-shadow 0.2s",boxShadow:"0 4px 15px rgba(234,67,53,0.3)"},onMouseOver:v=>{!h&&n.trim()&&(v.currentTarget.style.transform="translateY(-2px)",v.currentTarget.style.boxShadow="0 6px 20px rgba(234,67,53,0.4)")},onMouseOut:v=>{v.currentTarget.style.transform="translateY(0)",v.currentTarget.style.boxShadow="0 4px 15px rgba(234,67,53,0.3)"},children:h?i.jsx("span",{children:e==="ar"?"جاري البحث...":"Searching..."}):i.jsxs(i.Fragment,{children:[i.jsx(Ju,{size:20}),i.jsx("span",{children:e==="ar"?"البحث عن التقرير":"Search for Report"})]})})]})]})}),g&&i.jsxs("div",{onClick:()=>j(null),style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,cursor:"pointer"},children:[i.jsx("button",{onClick:()=>j(null),style:{position:"absolute",top:"20px",right:"20px",background:"white",border:"none",borderRadius:"50%",width:"45px",height:"45px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:i.jsx(Zt,{size:24,color:"#0B1F3A"})}),i.jsx("img",{src:g,alt:e==="ar"?"صورة مكبرة":"Enlarged image",style:{maxWidth:"90%",maxHeight:"90%",borderRadius:"10px"},onClick:v=>v.stopPropagation()})]})]})}function vg(){const[e,t]=y.useState({username:"",password:""}),[n,r]=y.useState(""),[a,o]=y.useState(!1),s=Wr(),l=async c=>{c.preventDefault(),o(!0),r("");try{const d=await Be.adminLogin(e);d.success?(localStorage.setItem("adminToken",d.token),s("/admin/dashboard")):r(d.message)}catch{r("حدث خطأ، يرجى المحاولة لاحقاً")}o(!1)};return i.jsx("div",{className:"form-page",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"form-container",style:{maxWidth:"400px"},children:[i.jsx("div",{style:{textAlign:"center",marginBottom:"30px"},children:i.jsx($o,{size:60,color:"#1a365d"})}),i.jsx("h2",{className:"section-title",children:"لوحة التحكم"}),n&&i.jsx("div",{className:"error-message",children:n}),i.jsxs("form",{onSubmit:l,children:[i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:"اسم المستخدم"}),i.jsx("input",{type:"text",value:e.username,onChange:c=>t({...e,username:c.target.value}),required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:"كلمة المرور"}),i.jsx("input",{type:"password",value:e.password,onChange:c=>t({...e,password:c.target.value}),required:!0})]}),i.jsx("button",{type:"submit",className:"btn btn-primary",style:{width:"100%"},disabled:a,children:a?"جاري الدخول...":"دخول"})]}),i.jsx("p",{style:{textAlign:"center",marginTop:"20px",fontSize:"0.85rem",color:"#888"},children:"للتجربة: admin / admin123"})]})})})}function wg(){const{language:e}=rt(),[t,n]=y.useState("reports"),[r,a]=y.useState([]),[o,s]=y.useState([]),[l,c]=y.useState({customerName:"",code:"",file:null,images:[]}),[d,h]=y.useState(!1),[m,g]=y.useState(""),j=Wr(),w=()=>({Authorization:`Bearer ${localStorage.getItem("adminToken")}`});y.useEffect(()=>{if(!localStorage.getItem("adminToken")){j("/admin");return}b()},[j]);const b=async()=>{try{const x=localStorage.getItem("adminToken"),[F,A]=await Promise.all([Be.getBookings(x),Be.getReports(x)]);a(F),s(A)}catch(x){console.error("Error loading data:",x),x.message.includes("401")&&(localStorage.removeItem("adminToken"),j("/admin"))}},v=async x=>{x.preventDefault(),h(!0);const F=new FormData;if(F.append("customerName",l.customerName),l.code&&F.append("code",l.code.toUpperCase()),l.file&&F.append("file",l.file),l.images&&l.images.length>0)for(let A=0;A<l.images.length;A++)F.append("images",l.images[A]);await Be.uploadReport(F,localStorage.getItem("adminToken")),c({customerName:"",code:"",file:null,images:[]}),b(),h(!1)},p=async x=>{confirm(e==="ar"?"هل أنت متأكد من حذف هذا التقرير؟":"Are you sure you want to delete this report?")&&(await Be.deleteReport(x,localStorage.getItem("adminToken")),b())},u=async(x,F)=>{await fetch(`/api/bookings/${x}`,{method:"PATCH",headers:{...w(),"Content-Type":"application/json"},body:JSON.stringify({status:F})}),b()},f=async x=>{confirm(e==="ar"?"هل أنت متأكد من حذف هذا الحجز؟":"Are you sure you want to delete this booking?")&&(await fetch(`/api/bookings/${x}`,{method:"DELETE",headers:w()}),b())},k=async()=>{await Be.adminLogout(localStorage.getItem("adminToken")),localStorage.removeItem("adminToken"),j("/admin")},z={full:e==="ar"?"الفحص الشامل":"Full Inspection",mechanical:e==="ar"?"ميكانيكي وكمبيوتر":"Mechanical + Computer",misc:e==="ar"?"فحوصات متنوعة":"Various Tests",basic:e==="ar"?"فحص أساسي":"Basic Inspection"},N=r.filter(x=>x.status==="pending").length,P=r.filter(x=>x.status==="confirmed").length,S=r.filter(x=>{var F,A,ye;return((F=x.name)==null?void 0:F.toLowerCase().includes(m.toLowerCase()))||((A=x.phone)==null?void 0:A.includes(m))||((ye=x.carModel)==null?void 0:ye.toLowerCase().includes(m.toLowerCase()))}),I=o.filter(x=>{var F,A;return((F=x.customerName)==null?void 0:F.toLowerCase().includes(m.toLowerCase()))||((A=x.code)==null?void 0:A.toLowerCase().includes(m.toLowerCase()))});return i.jsxs("div",{className:"admin-page",style:{background:"#f5f7fa",minHeight:"100vh"},children:[i.jsx("div",{className:"admin-header",style:{background:"linear-gradient(135deg, #0B1F3A, #1a365d)",padding:"20px 0",marginBottom:"30px",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"},children:i.jsx("div",{className:"container",children:i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[i.jsxs("div",{children:[i.jsx("h2",{style:{color:"white",margin:0,fontSize:"1.5rem",fontWeight:"700"},children:e==="ar"?"لوحة التحكم":"Admin Dashboard"}),i.jsx("p",{style:{color:"rgba(255,255,255,0.7)",margin:"5px 0 0",fontSize:"0.9rem"},children:e==="ar"?"مركز الأمان العالي للفحص الفني":"High Safety Inspection Center"})]}),i.jsxs("button",{onClick:k,style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 20px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:"8px",color:"white",cursor:"pointer",fontSize:"0.9rem",transition:"all 0.3s ease"},onMouseOver:x=>x.currentTarget.style.background="rgba(255,255,255,0.2)",onMouseOut:x=>x.currentTarget.style.background="rgba(255,255,255,0.1)",children:[i.jsx(tg,{size:18}),e==="ar"?"تسجيل الخروج":"Logout"]})]})})}),i.jsxs("div",{className:"container",children:[i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"20px",marginBottom:"30px"},children:[i.jsxs("div",{style:{background:"white",padding:"25px",borderRadius:"16px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:"15px"},children:[i.jsx("div",{style:{width:"50px",height:"50px",borderRadius:"12px",background:"linear-gradient(135deg, #4285F4, #5a9cf4)",display:"flex",alignItems:"center",justifyContent:"center"},children:i.jsx(Lt,{size:24,color:"white"})}),i.jsxs("div",{children:[i.jsx("p",{style:{margin:0,color:"#888",fontSize:"0.85rem"},children:e==="ar"?"التقارير":"Reports"}),i.jsx("h3",{style:{margin:"5px 0 0",fontSize:"1.8rem",color:"#0B1F3A"},children:o.length})]})]}),i.jsxs("div",{style:{background:"white",padding:"25px",borderRadius:"16px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:"15px"},children:[i.jsx("div",{style:{width:"50px",height:"50px",borderRadius:"12px",background:"linear-gradient(135deg, #C89D2A, #d4a936)",display:"flex",alignItems:"center",justifyContent:"center"},children:i.jsx(gr,{size:24,color:"white"})}),i.jsxs("div",{children:[i.jsx("p",{style:{margin:0,color:"#888",fontSize:"0.85rem"},children:e==="ar"?"قيد الانتظار":"Pending"}),i.jsx("h3",{style:{margin:"5px 0 0",fontSize:"1.8rem",color:"#0B1F3A"},children:N})]})]}),i.jsxs("div",{style:{background:"white",padding:"25px",borderRadius:"16px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:"15px"},children:[i.jsx("div",{style:{width:"50px",height:"50px",borderRadius:"12px",background:"linear-gradient(135deg, #34A853, #4ab862)",display:"flex",alignItems:"center",justifyContent:"center"},children:i.jsx(fe,{size:24,color:"white"})}),i.jsxs("div",{children:[i.jsx("p",{style:{margin:0,color:"#888",fontSize:"0.85rem"},children:e==="ar"?"مؤكد":"Confirmed"}),i.jsx("h3",{style:{margin:"5px 0 0",fontSize:"1.8rem",color:"#0B1F3A"},children:P})]})]}),i.jsxs("div",{style:{background:"white",padding:"25px",borderRadius:"16px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)",display:"flex",alignItems:"center",gap:"15px"},children:[i.jsx("div",{style:{width:"50px",height:"50px",borderRadius:"12px",background:"linear-gradient(135deg, #0B1F3A, #1a365d)",display:"flex",alignItems:"center",justifyContent:"center"},children:i.jsx(Yo,{size:24,color:"white"})}),i.jsxs("div",{children:[i.jsx("p",{style:{margin:0,color:"#888",fontSize:"0.85rem"},children:e==="ar"?"إجمالي الحجوزات":"Total Bookings"}),i.jsx("h3",{style:{margin:"5px 0 0",fontSize:"1.8rem",color:"#0B1F3A"},children:r.length})]})]})]}),i.jsxs("div",{style:{display:"flex",gap:"15px",marginBottom:"25px",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"},children:[i.jsxs("div",{style:{display:"flex",gap:"10px"},children:[i.jsxs("button",{onClick:()=>n("reports"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"12px 24px",background:t==="reports"?"#0B1F3A":"white",color:t==="reports"?"white":"#0B1F3A",border:t==="reports"?"none":"2px solid #e0e0e0",borderRadius:"10px",cursor:"pointer",fontSize:"0.95rem",fontWeight:"600",transition:"all 0.3s ease"},children:[i.jsx(Lt,{size:18}),e==="ar"?"التقارير":"Reports"," (",o.length,")"]}),i.jsxs("button",{onClick:()=>n("bookings"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"12px 24px",background:t==="bookings"?"#0B1F3A":"white",color:t==="bookings"?"white":"#0B1F3A",border:t==="bookings"?"none":"2px solid #e0e0e0",borderRadius:"10px",cursor:"pointer",fontSize:"0.95rem",fontWeight:"600",transition:"all 0.3s ease"},children:[i.jsx(qt,{size:18}),e==="ar"?"الحجوزات":"Bookings"," (",r.length,")"]})]}),i.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[i.jsxs("div",{style:{position:"relative"},children:[i.jsx(Ju,{size:18,style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"#888"}}),i.jsx("input",{type:"text",placeholder:e==="ar"?"بحث...":"Search...",value:m,onChange:x=>g(x.target.value),style:{padding:"10px 12px 10px 40px",border:"2px solid #e0e0e0",borderRadius:"10px",fontSize:"0.9rem",width:"200px",outline:"none"}})]}),i.jsx("button",{onClick:b,style:{display:"flex",alignItems:"center",justifyContent:"center",width:"42px",height:"42px",background:"white",border:"2px solid #e0e0e0",borderRadius:"10px",cursor:"pointer"},title:e==="ar"?"تحديث":"Refresh",children:i.jsx(Gu,{size:18,color:"#666"})})]})]}),t==="reports"&&i.jsxs("div",{children:[i.jsxs("div",{style:{background:"white",padding:"30px",borderRadius:"16px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)",marginBottom:"25px"},children:[i.jsxs("h3",{style:{margin:"0 0 20px",color:"#0B1F3A",display:"flex",alignItems:"center",gap:"10px"},children:[i.jsx(vc,{size:22,color:"#C89D2A"}),e==="ar"?"رفع تقرير جديد":"Upload New Report"]}),i.jsxs("form",{onSubmit:v,children:[i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[i.jsxs("div",{children:[i.jsxs("label",{style:{display:"block",marginBottom:"8px",fontWeight:"600",color:"#333",fontSize:"0.9rem"},children:[e==="ar"?"اسم العميل":"Customer Name"," *"]}),i.jsx("input",{type:"text",value:l.customerName,onChange:x=>c({...l,customerName:x.target.value}),required:!0,style:{width:"100%",padding:"12px 15px",border:"2px solid #e0e0e0",borderRadius:"10px",fontSize:"0.95rem",outline:"none",transition:"border-color 0.3s"}})]}),i.jsxs("div",{children:[i.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"600",color:"#333",fontSize:"0.9rem"},children:e==="ar"?"كود التقرير (اختياري)":"Report Code (Optional)"}),i.jsx("input",{type:"text",value:l.code,onChange:x=>c({...l,code:x.target.value.toUpperCase()}),placeholder:e==="ar"?"مثال: ABC123":"Example: ABC123",maxLength:"10",style:{width:"100%",padding:"12px 15px",border:"2px solid #e0e0e0",borderRadius:"10px",fontSize:"0.95rem",textTransform:"uppercase",outline:"none"}})]}),i.jsxs("div",{children:[i.jsxs("label",{style:{display:"block",marginBottom:"8px",fontWeight:"600",color:"#333",fontSize:"0.9rem"},children:[e==="ar"?"ملف PDF":"PDF File"," *"]}),i.jsx("input",{type:"file",accept:".pdf",onChange:x=>c({...l,file:x.target.files[0]}),required:!0,style:{width:"100%",padding:"10px",border:"2px dashed #e0e0e0",borderRadius:"10px",fontSize:"0.9rem",background:"#f9f9f9"}})]}),i.jsxs("div",{children:[i.jsx("label",{style:{display:"block",marginBottom:"8px",fontWeight:"600",color:"#333",fontSize:"0.9rem"},children:e==="ar"?"صور الفحص (حتى 10)":"Inspection Images (up to 10)"}),i.jsx("input",{type:"file",accept:"image/*",multiple:!0,onChange:x=>c({...l,images:Array.from(x.target.files)}),style:{width:"100%",padding:"10px",border:"2px dashed #e0e0e0",borderRadius:"10px",fontSize:"0.9rem",background:"#f9f9f9"}}),l.images&&l.images.length>0&&i.jsx("p",{style:{color:"#34A853",marginTop:"8px",fontSize:"0.85rem",fontWeight:"600"},children:e==="ar"?`تم اختيار ${l.images.length} صورة`:`${l.images.length} images selected`})]})]}),i.jsxs("button",{type:"submit",disabled:d,style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"25px",padding:"14px 30px",background:"linear-gradient(135deg, #C89D2A, #d4a936)",color:"white",border:"none",borderRadius:"10px",fontSize:"1rem",fontWeight:"600",cursor:d?"not-allowed":"pointer",opacity:d?.7:1},children:[i.jsx(vc,{size:20}),d?e==="ar"?"جاري الرفع...":"Uploading...":e==="ar"?"رفع التقرير":"Upload Report"]})]})]}),i.jsxs("div",{style:{background:"white",borderRadius:"16px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)",overflow:"hidden"},children:[i.jsx("div",{style:{padding:"20px 25px",borderBottom:"1px solid #eee"},children:i.jsx("h3",{style:{margin:0,color:"#0B1F3A"},children:e==="ar"?"التقارير المرفوعة":"Uploaded Reports"})}),I.length===0?i.jsx("p",{style:{padding:"30px",textAlign:"center",color:"#888"},children:e==="ar"?"لا توجد تقارير حالياً":"No reports yet"}):i.jsx("div",{style:{overflowX:"auto"},children:i.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[i.jsx("thead",{children:i.jsxs("tr",{style:{background:"#f8f9fa"},children:[i.jsx("th",{style:{padding:"15px 20px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.9rem"},children:e==="ar"?"الكود":"Code"}),i.jsx("th",{style:{padding:"15px 20px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.9rem"},children:e==="ar"?"اسم العميل":"Customer Name"}),i.jsx("th",{style:{padding:"15px 20px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.9rem"},children:e==="ar"?"التاريخ":"Date"}),i.jsx("th",{style:{padding:"15px 20px",textAlign:"center",fontWeight:"600",color:"#666",fontSize:"0.9rem"},children:e==="ar"?"إجراءات":"Actions"})]})}),i.jsx("tbody",{children:I.map(x=>i.jsxs("tr",{style:{borderBottom:"1px solid #eee"},children:[i.jsx("td",{style:{padding:"15px 20px"},children:i.jsx("span",{style:{fontWeight:"bold",color:"#C89D2A",fontSize:"1rem",letterSpacing:"1px",background:"rgba(200, 157, 42, 0.1)",padding:"5px 12px",borderRadius:"6px"},children:x.code||"-"})}),i.jsx("td",{style:{padding:"15px 20px",fontWeight:"500",color:"#333"},children:x.customerName}),i.jsx("td",{style:{padding:"15px 20px",color:"#666",fontSize:"0.9rem"},children:new Date(x.createdAt).toLocaleDateString(e==="ar"?"ar-SA":"en-US")}),i.jsx("td",{style:{padding:"15px 20px",textAlign:"center"},children:i.jsxs("div",{style:{display:"flex",gap:"8px",justifyContent:"center"},children:[i.jsxs("a",{href:`/uploads/${x.filename}`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"5px",padding:"8px 15px",background:"#4285F4",color:"white",textDecoration:"none",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"500"},children:[i.jsx(ma,{size:16}),e==="ar"?"عرض":"View"]}),i.jsxs("button",{onClick:()=>p(x.id),style:{display:"flex",alignItems:"center",gap:"5px",padding:"8px 15px",background:"#EA4335",color:"white",border:"none",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"500",cursor:"pointer"},children:[i.jsx(Xo,{size:16}),e==="ar"?"حذف":"Delete"]})]})})]},x.id))})]})})]})]}),t==="bookings"&&i.jsxs("div",{style:{background:"white",borderRadius:"16px",boxShadow:"0 4px 15px rgba(0,0,0,0.05)",overflow:"hidden"},children:[i.jsx("div",{style:{padding:"20px 25px",borderBottom:"1px solid #eee"},children:i.jsx("h3",{style:{margin:0,color:"#0B1F3A"},children:e==="ar"?"إدارة الحجوزات":"Manage Bookings"})}),S.length===0?i.jsx("p",{style:{padding:"30px",textAlign:"center",color:"#888"},children:e==="ar"?"لا توجد حجوزات حالياً":"No bookings yet"}):i.jsx("div",{style:{overflowX:"auto"},children:i.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[i.jsx("thead",{children:i.jsxs("tr",{style:{background:"#f8f9fa"},children:[i.jsx("th",{style:{padding:"15px 10px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"كود الحجز":"Booking Code"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"الاسم":"Name"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"الهاتف":"Phone"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"التواصل":"Contact"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"السيارة":"Car"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"الخدمة":"Service"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:e==="ar"?"right":"left",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"التاريخ":"Date"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:"center",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"الحالة":"Status"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:"center",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"الدفع":"Payment"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:"center",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"التوقيع":"Signature"}),i.jsx("th",{style:{padding:"15px 10px",textAlign:"center",fontWeight:"600",color:"#666",fontSize:"0.85rem"},children:e==="ar"?"إجراءات":"Actions"})]})}),i.jsx("tbody",{children:S.map(x=>i.jsxs("tr",{style:{borderBottom:"1px solid #eee"},children:[i.jsx("td",{style:{padding:"12px 10px"},children:i.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"5px",background:"linear-gradient(135deg, #0B1F3A, #1a365d)",color:"#C89D2A",padding:"5px 10px",borderRadius:"6px",fontFamily:"monospace",fontWeight:"700",fontSize:"0.85rem",letterSpacing:"0.5px",cursor:"pointer"},onClick:()=>{navigator.clipboard.writeText(x.bookingId||`HS-${x.id.substring(0,8).toUpperCase()}`),alert(e==="ar"?"تم نسخ الكود!":"Code copied!")},title:e==="ar"?"انقر للنسخ":"Click to copy",children:[i.jsx($u,{size:12}),x.bookingId||`HS-${x.id.substring(0,8).toUpperCase()}`]})}),i.jsx("td",{style:{padding:"12px 10px",fontWeight:"500",color:"#333"},children:x.name}),i.jsx("td",{style:{padding:"12px 10px",color:"#666"},children:i.jsxs("a",{href:`tel:${x.phone}`,style:{color:"#4285F4",textDecoration:"none",display:"flex",alignItems:"center",gap:"5px"},children:[i.jsx(Tt,{size:14}),x.phone]})}),i.jsxs("td",{style:{padding:"12px 10px"},children:[x.contactMethod==="whatsapp"&&i.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",background:"rgba(37, 211, 102, 0.15)",color:"#25D366",padding:"5px 10px",borderRadius:"15px",fontSize:"0.8rem",fontWeight:"600"},children:[i.jsx(Qu,{size:14}),e==="ar"?"واتساب":"WhatsApp"]}),x.contactMethod==="call"&&i.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",background:"rgba(66, 133, 244, 0.15)",color:"#4285F4",padding:"5px 10px",borderRadius:"15px",fontSize:"0.8rem",fontWeight:"600"},children:[i.jsx(Zu,{size:14}),e==="ar"?"اتصال":"Call"]}),x.contactMethod==="both"&&i.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",background:"rgba(200, 157, 42, 0.15)",color:"#C89D2A",padding:"5px 10px",borderRadius:"15px",fontSize:"0.8rem",fontWeight:"600"},children:[i.jsx(Tt,{size:14}),e==="ar"?"الاثنين":"Both"]}),!x.contactMethod&&i.jsx("span",{style:{color:"#999",fontSize:"0.8rem"},children:"-"})]}),i.jsx("td",{style:{padding:"12px 10px",color:"#666"},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[i.jsx(qh,{size:14,color:"#888"}),x.carBrand||""," ",x.carModel," - ",x.carYear]})}),i.jsx("td",{style:{padding:"12px 10px",color:"#333",fontSize:"0.85rem"},children:z[x.serviceType]}),i.jsxs("td",{style:{padding:"12px 10px",color:"#666",fontSize:"0.85rem"},children:[x.preferredDate,x.preferredTime&&i.jsx("span",{style:{display:"block",fontSize:"0.8rem",color:"#888"},children:x.preferredTime})]}),i.jsx("td",{style:{padding:"15px",textAlign:"center"},children:i.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"5px",padding:"6px 14px",borderRadius:"20px",fontSize:"0.8rem",fontWeight:"600",background:x.status==="pending"?"rgba(200, 157, 42, 0.15)":"rgba(52, 168, 83, 0.15)",color:x.status==="pending"?"#C89D2A":"#34A853"},children:[x.status==="pending"?i.jsx(gr,{size:14}):i.jsx(fe,{size:14}),x.status==="pending"?e==="ar"?"قيد الانتظار":"Pending":e==="ar"?"مؤكد":"Confirmed"]})}),i.jsx("td",{style:{padding:"12px 10px",textAlign:"center"},children:i.jsx("span",{style:{display:"inline-flex",alignItems:"center",gap:"5px",padding:"6px 12px",borderRadius:"20px",fontSize:"0.75rem",fontWeight:"600",background:x.paymentMethod==="electronic"?"rgba(52, 168, 83, 0.15)":x.paymentMethod==="cash"?"rgba(255, 152, 0, 0.15)":"rgba(158, 158, 158, 0.15)",color:x.paymentMethod==="electronic"?"#34A853":x.paymentMethod==="cash"?"#FF9800":"#9E9E9E"},children:x.paymentMethod==="electronic"?e==="ar"?"💳 مدفوع إلكتروني":"💳 Paid Online":x.paymentMethod==="cash"?e==="ar"?"💵 كاش عند الوصول":"💵 Cash on Arrival":e==="ar"?"في الانتظار":"Pending"})}),i.jsx("td",{style:{padding:"12px 10px",textAlign:"center"},children:x.signature?i.jsx("img",{src:x.signature,alt:e==="ar"?"توقيع العميل":"Customer Signature",style:{maxWidth:"80px",maxHeight:"40px",border:"1px solid #e0e0e0",borderRadius:"6px",background:"white",cursor:"pointer"},onClick:()=>{window.open("","_blank").document.write(`<img src="${x.signature}" style="max-width: 100%; border: 2px solid #C89D2A; border-radius: 10px; padding: 10px; background: white;" />`)},title:e==="ar"?"انقر للتكبير":"Click to enlarge"}):i.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",color:"#999",fontSize:"0.8rem"},children:[i.jsx(qu,{size:14}),e==="ar"?"لا يوجد":"None"]})}),i.jsx("td",{style:{padding:"15px",textAlign:"center"},children:i.jsxs("div",{style:{display:"flex",gap:"6px",justifyContent:"center"},children:[x.status==="pending"&&i.jsxs("button",{onClick:()=>u(x.id,"confirmed"),style:{display:"flex",alignItems:"center",gap:"4px",padding:"7px 12px",background:"#34A853",color:"white",border:"none",borderRadius:"6px",fontSize:"0.8rem",fontWeight:"500",cursor:"pointer"},children:[i.jsx(fe,{size:14}),e==="ar"?"تأكيد":"Confirm"]}),i.jsxs("button",{onClick:()=>f(x.id),style:{display:"flex",alignItems:"center",gap:"4px",padding:"7px 12px",background:"#EA4335",color:"white",border:"none",borderRadius:"6px",fontSize:"0.8rem",fontWeight:"500",cursor:"pointer"},children:[i.jsx(Xo,{size:14}),e==="ar"?"حذف":"Delete"]})]})})]},x.id))})]})})]})]})]})}function kg(){const e=Wr(),[t,n]=y.useState(""),[r,a]=y.useState([{type:"system",text:"مرحباً بك في لوحة التحكم - High Safety Shell v1.0"},{type:"system",text:"اكتب الأمر واضغط Enter للتنفيذ"}]),[o,s]=y.useState(!1),l=y.useRef(null),c=y.useRef(null);y.useEffect(()=>{localStorage.getItem("adminToken")||e("/admin")},[e]),y.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const d=async()=>{var j;if(!t.trim())return;const g=localStorage.getItem("adminToken");if(!g){e("/admin");return}a(w=>[...w,{type:"command",text:`$ ${t}`}]),s(!0);try{const w=await Be.executeShellCommand(t.trim(),g);a(b=>[...b,{type:w.output?"output":"error",text:w.output||w.error||"تم التنفيذ بنجاح"}])}catch{a(b=>[...b,{type:"error",text:"خطأ في الاتصال بالسيرفر"}])}n(""),s(!1),(j=c.current)==null||j.focus()},h=g=>{g.key==="Enter"&&!o&&d()},m=()=>{a([{type:"system",text:"تم مسح السجل"}])};return i.jsxs("div",{className:"shell-page",children:[i.jsxs("div",{className:"shell-header",children:[i.jsxs("div",{className:"shell-title",children:[i.jsx(ig,{size:28}),i.jsxs("div",{children:[i.jsx("h1",{children:"Terminal"}),i.jsx("span",{children:"لوحة التحكم المتقدمة"})]})]}),i.jsxs("div",{className:"shell-actions",children:[i.jsxs("button",{className:"shell-btn clear",onClick:m,children:[i.jsx(Xo,{size:18}),"مسح"]}),i.jsxs("button",{className:"shell-btn back",onClick:()=>e("/admin/dashboard"),children:[i.jsx(Ki,{size:18}),"العودة"]})]})]}),i.jsxs("div",{className:"shell-container",children:[i.jsxs("div",{className:"shell-output",ref:l,children:[r.map((g,j)=>i.jsxs("div",{className:`shell-line ${g.type}`,children:[g.type==="command"&&i.jsx("span",{className:"prompt",children:"❯"}),i.jsx("pre",{children:g.text})]},j)),o&&i.jsx("div",{className:"shell-line loading",children:i.jsx("span",{className:"loading-dots",children:"..."})})]}),i.jsxs("div",{className:"shell-input-area",children:[i.jsx("span",{className:"input-prompt",children:"$"}),i.jsx("input",{ref:c,type:"text",value:t,onChange:g=>n(g.target.value),onKeyDown:h,placeholder:"اكتب الأمر هنا...",disabled:o,autoFocus:!0}),i.jsx("button",{className:"execute-btn",onClick:d,disabled:o||!t.trim(),children:i.jsx(Ys,{size:20})})]})]}),i.jsx("style",{children:`
        .shell-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
          padding: 20px;
        }

        .shell-header {
          max-width: 1200px;
          margin: 0 auto 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .shell-title {
          display: flex;
          align-items: center;
          gap: 15px;
          color: #00D4FF;
        }

        .shell-title h1 {
          margin: 0;
          font-size: 1.5rem;
          color: white;
        }

        .shell-title span {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
        }

        .shell-actions {
          display: flex;
          gap: 10px;
        }

        .shell-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: none;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .shell-btn.clear {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .shell-btn.clear:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        .shell-btn.back {
          background: rgba(0, 212, 255, 0.2);
          color: #00D4FF;
        }

        .shell-btn.back:hover {
          background: rgba(0, 212, 255, 0.3);
        }

        .shell-container {
          max-width: 1200px;
          margin: 0 auto;
          background: #0d0d1a;
          border-radius: 16px;
          border: 1px solid rgba(0, 212, 255, 0.2);
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .shell-output {
          height: 500px;
          overflow-y: auto;
          padding: 20px;
          font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .shell-line {
          display: flex;
          gap: 10px;
          margin-bottom: 8px;
        }

        .shell-line pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .shell-line.system {
          color: #64748b;
        }

        .shell-line.command {
          color: #00D4FF;
        }

        .shell-line.command .prompt {
          color: #C89D2A;
        }

        .shell-line.output {
          color: #34d399;
        }

        .shell-line.error {
          color: #ef4444;
        }

        .shell-line.loading {
          color: #C89D2A;
        }

        .loading-dots {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .shell-input-area {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 20px;
          background: rgba(0, 212, 255, 0.05);
          border-top: 1px solid rgba(0, 212, 255, 0.2);
        }

        .input-prompt {
          color: #C89D2A;
          font-family: 'Fira Code', monospace;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .shell-input-area input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          font-family: 'Fira Code', 'Monaco', monospace;
          font-size: 1rem;
          outline: none;
        }

        .shell-input-area input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .execute-btn {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #00D4FF, #0066FF);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .execute-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }

        .execute-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .shell-page {
            padding: 10px;
          }

          .shell-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .shell-output {
            height: 400px;
            font-size: 0.8rem;
          }
        }
      `})]})}function jg(){const{language:e,t}=rt(),[n,r]=y.useState(0),[a,o]=y.useState({customerName:"",customerPhone:"",customerEmail:"",amount:"",serviceType:"",carCategory:""}),[s,l]=y.useState(!1),[c,d]=y.useState(""),h=e==="ar"||e==="ur"||e==="fa",m=[{value:"sedan",label:e==="ar"?"السيارات الصالون":"Sedan",desc:e==="ar"?"سيارات عادية":"Regular Cars",image:np},{value:"suv",label:e==="ar"?"سيارات الدفع الرباعي":"4WD / SUV",desc:e==="ar"?"سيارات كبيرة":"Large Vehicles",image:rp},{value:"classic",label:e==="ar"?"السيارات الكلاسيكية":"Classic",desc:e==="ar"?"سيارات كلاسيكية":"Classic Cars",image:ip,hasPlus:!0},{value:"luxury",label:e==="ar"?"السيارات الفاخرة":"Luxury",desc:e==="ar"?"سيارات فاخرة":"Luxury Cars",image:ap},{value:"vip",label:"VIP",desc:e==="ar"?"خدمة مميزة":"Premium Service",image:op}],g={sedan:{full:500,mechanical:250,misc:200,basic:300},suv:{full:600,mechanical:300,misc:200,basic:400},classic:{full:600,mechanical:350,misc:200,basic:400},luxury:{full:700,mechanical:350,misc:200,basic:500},vip:{full:1e3,mechanical:500,misc:300,basic:700}},j=e==="ar"?{full:"الفحص الشامل",mechanical:"ميكانيكا + كمبيوتر",misc:"فحوصات متنوعة",basic:"الأجزاء الأساسية"}:{full:"Full Inspection",mechanical:"Mechanical + Computer",misc:"Various Tests",basic:"Basic Parts"},w={full:"🔍",mechanical:"⚙️",misc:"🔧",basic:"📋"},b=S=>{if(!S||!g[S])return[];const I=g[S];return Object.keys(I).map(x=>({value:x,label:j[x],price:I[x],icon:w[x]}))},v=S=>{o(I=>({...I,carCategory:S,serviceType:"",amount:""})),r(1)},p=S=>{const x=b(a.carCategory).find(F=>F.value===S);o(F=>({...F,serviceType:S,amount:x?x.price.toString():""})),r(2)},u=S=>{const{name:I,value:x}=S.target;o(F=>({...F,[I]:x}))},f=async S=>{S.preventDefault(),l(!0),d("");try{const I=await Be.createCheckoutSession({customerName:a.customerName,customerPhone:a.customerPhone,customerEmail:a.customerEmail,amount:parseInt(a.amount),serviceType:a.serviceType,carCategory:a.carCategory});I.url?window.location.href=I.url:d(I.error||(e==="ar"?"حدث خطأ في إنشاء جلسة الدفع":"Error creating checkout session"))}catch{d(e==="ar"?"حدث خطأ في الاتصال بالخادم":"Connection error")}l(!1)},k=b(a.carCategory),z=m.find(S=>S.value===a.carCategory),N=k.find(S=>S.value===a.serviceType),P=[{title:e==="ar"?"فئة السيارة":"Car Category",icon:"🚗"},{title:e==="ar"?"نوع الخدمة":"Service Type",icon:"⚙️"},{title:e==="ar"?"بيانات الدفع":"Payment Details",icon:"💳"}];return i.jsxs("div",{className:"payment-page-new",dir:h?"rtl":"ltr",children:[i.jsxs("div",{className:"payment-hero-new",children:[i.jsxs("div",{className:"payment-hero-content",children:[i.jsxs("div",{className:"payment-badge",children:[i.jsx($o,{size:16}),i.jsx("span",{children:t.payment.badge})]}),i.jsx("h1",{children:t.payment.title}),i.jsx("p",{children:t.payment.subtitle})]}),i.jsxs("div",{className:"payment-hero-decoration",children:[i.jsx("div",{className:"decoration-circle circle-1"}),i.jsx("div",{className:"decoration-circle circle-2"})]})]}),i.jsxs("div",{className:"payment-wizard-container",children:[i.jsx("div",{className:"payment-progress",children:P.map((S,I)=>i.jsxs("div",{className:`progress-step ${n>=I?"active":""} ${n===I?"current":""}`,onClick:()=>n>I&&r(I),children:[i.jsx("div",{className:"step-number",children:n>I?i.jsx(fe,{size:18}):i.jsx("span",{children:S.icon})}),i.jsx("span",{className:"step-label",children:S.title}),I<P.length-1&&i.jsx("div",{className:"step-connector"})]},I))}),i.jsxs("div",{className:"payment-wizard-content",children:[n===0&&i.jsxs("div",{className:"wizard-step step-category",children:[i.jsx("h2",{children:e==="ar"?"اختر فئة سيارتك":"Select Your Car Category"}),i.jsx("p",{className:"step-description",children:e==="ar"?"👆 انقر واختر الفئة المطلوبة - الأسعار تختلف حسب نوع السيارة":"👆 Click to select - Prices vary based on vehicle type"}),i.jsx("div",{className:"category-grid",children:m.map(S=>i.jsxs("div",{className:`category-card ${a.carCategory===S.value?"selected":""}`,onClick:()=>v(S.value),children:[i.jsx("div",{className:"category-icon",children:i.jsx("img",{src:S.image,alt:S.label,style:{width:"100%",height:"100%",objectFit:"contain"}})}),i.jsxs("h3",{children:[S.label,S.hasPlus&&i.jsx("span",{style:{color:"#C89D2A",marginRight:"5px",marginLeft:"5px"},children:"+"})]}),i.jsx("p",{children:S.desc}),i.jsxs("div",{className:"category-price-range",children:[g[S.value].misc," - ",g[S.value].full,S.hasPlus&&"+"," ",t.common.aed]})]},S.value))})]}),n===1&&i.jsxs("div",{className:"wizard-step step-service",children:[i.jsx("div",{className:"step-header",children:i.jsxs("button",{className:"back-btn",onClick:()=>r(0),children:[h?i.jsx(Tr,{size:20}):i.jsx(Ki,{size:20}),e==="ar"?"رجوع":"Back"]})}),i.jsx("h2",{children:e==="ar"?"اختر نوع الخدمة":"Select Service Type"}),i.jsx("p",{className:"step-description",children:e==="ar"?`أسعار ${z==null?void 0:z.label}`:`${z==null?void 0:z.label} Pricing`}),i.jsx("div",{className:"service-grid",children:k.map(S=>i.jsxs("div",{className:`service-card ${a.serviceType===S.value?"selected":""}`,onClick:()=>p(S.value),children:[i.jsx("div",{className:"service-icon",children:S.icon}),i.jsx("h3",{children:S.label}),i.jsxs("div",{className:"service-price",children:[i.jsx("span",{className:"price-value",children:S.price}),a.carCategory==="classic"&&i.jsx("span",{className:"price-prefix",style:{color:"#C89D2A",fontWeight:"bold"},children:"+"}),i.jsx("span",{className:"price-currency",children:t.common.aed})]})]},S.value))})]}),n===2&&i.jsxs("div",{className:"wizard-step step-details",children:[i.jsx("div",{className:"step-header",children:i.jsxs("button",{className:"back-btn",onClick:()=>r(1),children:[h?i.jsx(Tr,{size:20}):i.jsx(Ki,{size:20}),e==="ar"?"رجوع":"Back"]})}),i.jsxs("div",{className:"payment-layout",children:[i.jsxs("div",{className:"payment-form-section",children:[i.jsx("h2",{children:e==="ar"?"بياناتك":"Your Details"}),c&&i.jsx("div",{className:"error-alert",children:c}),i.jsxs("form",{onSubmit:f,className:"payment-form-new",children:[i.jsxs("div",{className:"form-field",children:[i.jsxs("label",{children:[i.jsx(tp,{size:18}),t.payment.name]}),i.jsx("input",{type:"text",name:"customerName",value:a.customerName,onChange:u,required:!0,placeholder:t.payment.namePlaceholder})]}),i.jsxs("div",{className:"form-field",children:[i.jsxs("label",{children:[i.jsx(Tt,{size:18}),t.payment.phone]}),i.jsx("input",{type:"tel",name:"customerPhone",value:a.customerPhone,onChange:u,required:!0,placeholder:"05XXXXXXXX"})]}),i.jsxs("div",{className:"form-field",children:[i.jsxs("label",{children:[i.jsx(Yu,{size:18}),t.payment.email]}),i.jsx("input",{type:"email",name:"customerEmail",value:a.customerEmail,onChange:u,placeholder:"example@email.com"})]}),i.jsx("button",{type:"submit",className:"submit-payment-btn",disabled:s||!a.customerName||!a.customerPhone,children:s?i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"spinner"}),t.payment.processing]}):i.jsxs(i.Fragment,{children:[i.jsx($o,{size:20}),t.payment.payNow,i.jsxs("span",{className:"btn-amount",children:[a.amount," ",t.common.aed]})]})}),i.jsxs("p",{className:"redirect-note",children:[i.jsx(Yt,{size:14}),e==="ar"?"سيتم تحويلك إلى Stripe للدفع الآمن":"You will be redirected to Stripe for secure payment"]})]})]}),i.jsxs("div",{className:"order-summary",children:[i.jsx("h3",{children:e==="ar"?"ملخص الطلب":"Order Summary"}),i.jsxs("div",{className:"summary-item",children:[i.jsx("span",{className:"summary-label",children:e==="ar"?"فئة السيارة":"Car Category"}),i.jsx("span",{className:"summary-value",children:z==null?void 0:z.label})]}),i.jsxs("div",{className:"summary-item",children:[i.jsx("span",{className:"summary-label",children:e==="ar"?"نوع الخدمة":"Service Type"}),i.jsxs("span",{className:"summary-value",children:[N==null?void 0:N.icon," ",N==null?void 0:N.label]})]}),i.jsx("div",{className:"summary-divider"}),i.jsxs("div",{className:"summary-total",children:[i.jsx("span",{children:e==="ar"?"الإجمالي":"Total"}),i.jsxs("span",{className:"total-value",children:[a.amount," ",t.common.aed]})]}),i.jsxs("div",{className:"security-features",children:[i.jsxs("div",{className:"security-item",children:[i.jsx(fe,{size:16}),i.jsx("span",{children:t.payment.secureStripe})]}),i.jsxs("div",{className:"security-item",children:[i.jsx(fe,{size:16}),i.jsx("span",{children:t.payment.cards})]}),i.jsxs("div",{className:"security-item",children:[i.jsx(fe,{size:16}),i.jsx("span",{children:t.payment.ssl})]}),i.jsxs("div",{className:"security-item",children:[i.jsx(fe,{size:16}),i.jsx("span",{children:t.payment.receipt})]})]}),i.jsxs("div",{className:"accepted-cards-new",children:[i.jsx("span",{children:e==="ar"?"البطاقات المقبولة":"Accepted Cards"}),i.jsxs("div",{className:"cards-logos",children:[i.jsx("div",{className:"card-logo visa",children:"VISA"}),i.jsx("div",{className:"card-logo mastercard",children:"MC"})]})]})]})]})]})]})]}),i.jsx("style",{children:`
        .payment-page-new {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
        }

        .payment-hero-new {
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%);
          padding: 80px 24px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .payment-hero-content {
          position: relative;
          z-index: 2;
        }

        .payment-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200, 157, 42, 0.2);
          color: #C89D2A;
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
          border: 1px solid rgba(200, 157, 42, 0.3);
        }

        .payment-hero-new h1 {
          color: white;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 15px 0;
        }

        .payment-hero-new p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          margin: 0;
        }

        .payment-hero-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(200, 157, 42, 0.1);
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -50px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          left: -50px;
        }

        .payment-wizard-container {
          max-width: 1000px;
          margin: -30px auto 60px;
          padding: 0 24px;
          position: relative;
          z-index: 10;
        }

        .payment-progress {
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          padding: 20px 40px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 30px;
          gap: 10px;
          flex-wrap: wrap;
        }

        .progress-step {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .progress-step.active {
          opacity: 1;
        }

        .progress-step.current .step-number {
          background: #C89D2A;
          color: white;
          transform: scale(1.1);
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e8e8e8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: #0B1F3A;
          color: white;
        }

        .step-label {
          font-weight: 600;
          color: #0B1F3A;
          font-size: 0.9rem;
        }

        .step-connector {
          width: 40px;
          height: 3px;
          background: #e8e8e8;
          margin: 0 10px;
        }

        .progress-step.active + .step-connector,
        .progress-step.active .step-connector {
          background: #0B1F3A;
        }

        .payment-wizard-content {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
          padding: 40px;
        }

        .wizard-step h2 {
          text-align: center;
          color: #0B1F3A;
          font-size: 1.8rem;
          margin: 0 0 10px 0;
        }

        .step-description {
          text-align: center;
          color: #666;
          margin: 0 0 30px 0;
        }

        .step-header {
          margin-bottom: 20px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #0B1F3A;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          padding: 10px 0;
          transition: color 0.3s ease;
        }

        .back-btn:hover {
          color: #C89D2A;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .category-card {
          background: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-card:hover {
          border-color: #C89D2A;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(200, 157, 42, 0.15);
        }

        .category-card.selected {
          border-color: #C89D2A;
          background: rgba(200, 157, 42, 0.08);
        }

        .category-icon {
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .price-prefix {
          color: #C89D2A;
          font-weight: 700;
          font-size: 1rem;
          margin-right: 2px;
        }

        .category-card h3 {
          margin: 0 0 8px 0;
          color: #0B1F3A;
          font-size: 1.1rem;
        }

        .category-card p {
          margin: 0 0 15px 0;
          color: #666;
          font-size: 0.85rem;
        }

        .category-price-range {
          background: #0B1F3A;
          color: #C89D2A;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-block;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 25px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          border-color: #C89D2A;
          transform: translateY(-5px);
        }

        .service-card.selected {
          border-color: #C89D2A;
          background: rgba(200, 157, 42, 0.08);
        }

        .service-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .service-card h3 {
          margin: 0 0 15px 0;
          color: #0B1F3A;
          font-size: 1rem;
        }

        .service-price {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 5px;
        }

        .price-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #C89D2A;
        }

        .price-currency {
          color: #666;
          font-size: 0.9rem;
        }

        .payment-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 40px;
        }

        @media (max-width: 900px) {
          .payment-layout {
            grid-template-columns: 1fr;
          }
          
          .order-summary {
            order: -1;
          }
        }

        .payment-form-section h2 {
          text-align: left;
          font-size: 1.5rem;
          margin-bottom: 25px;
        }

        [dir="rtl"] .payment-form-section h2 {
          text-align: right;
        }

        .error-alert {
          background: #fee2e2;
          color: #dc2626;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .payment-form-new {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-field label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #0B1F3A;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-field input {
          width: 100%;
          padding: 15px 18px;
          border: 2px solid #e8e8e8;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .form-field input:focus {
          outline: none;
          border-color: #C89D2A;
          background: white;
        }

        .submit-payment-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #C89D2A 0%, #a8822a 100%);
          color: white;
          border: none;
          padding: 18px 30px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-payment-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(200, 157, 42, 0.3);
        }

        .submit-payment-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-amount {
          background: rgba(255, 255, 255, 0.2);
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .redirect-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #666;
          font-size: 0.85rem;
          margin: 0;
        }

        .order-summary {
          background: #f8f9fa;
          border-radius: 16px;
          padding: 25px;
          height: fit-content;
        }

        .order-summary h3 {
          margin: 0 0 20px 0;
          color: #0B1F3A;
          font-size: 1.2rem;
          padding-bottom: 15px;
          border-bottom: 2px solid #e8e8e8;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .summary-label {
          color: #666;
          font-size: 0.9rem;
        }

        .summary-value {
          color: #0B1F3A;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .summary-divider {
          height: 2px;
          background: #e8e8e8;
          margin: 10px 0;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .total-value {
          color: #C89D2A;
          font-size: 1.4rem;
        }

        .security-features {
          background: white;
          border-radius: 12px;
          padding: 15px;
          margin-top: 20px;
        }

        .security-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          color: #34A853;
          font-size: 0.85rem;
        }

        .accepted-cards-new {
          margin-top: 20px;
          text-align: center;
        }

        .accepted-cards-new span {
          display: block;
          color: #666;
          font-size: 0.8rem;
          margin-bottom: 10px;
        }

        .cards-logos {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .card-logo {
          padding: 8px 15px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .card-logo.visa {
          background: #1A1F71;
          color: white;
        }

        .card-logo.mastercard {
          background: linear-gradient(135deg, #EB001B 0%, #F79E1B 100%);
          color: white;
        }

        @media (max-width: 600px) {
          .payment-hero-new {
            padding: 60px 16px 50px;
          }
          
          .payment-hero-new h1 {
            font-size: 1.8rem;
          }

          .payment-progress {
            padding: 15px 20px;
          }

          .step-label {
            display: none;
          }

          .step-connector {
            width: 20px;
          }

          .payment-wizard-content {
            padding: 25px 20px;
          }

          .category-grid,
          .service-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .category-card,
          .service-card {
            padding: 20px 15px;
          }

          .category-icon svg {
            width: 60px !important;
            height: 30px !important;
          }

          .service-icon {
            font-size: 2rem;
          }
        }
      `})]})}function bg(){var l;const{language:e,t}=rt(),[n]=Vh(),[r,a]=y.useState(null),[o,s]=y.useState(!0);return y.useEffect(()=>{const c=n.get("session_id");c?fetch(`/api/payment/verify/${c}`).then(d=>d.json()).then(d=>{a(d),s(!1)}).catch(()=>s(!1)):s(!1)},[n]),i.jsx("div",{className:"payment-result-page",children:i.jsxs("div",{className:"payment-result-container success",children:[i.jsx("div",{className:"result-icon",children:i.jsx(fe,{size:80})}),i.jsx("h1",{children:t.paymentSuccess.title}),i.jsx("p",{className:"result-message",children:t.paymentSuccess.message}),o?i.jsx("p",{children:e==="ar"?"جاري التحقق من الدفع...":"Verifying payment..."}):r?i.jsxs("div",{className:"payment-details",children:[i.jsxs("div",{className:"detail-row",children:[i.jsxs("span",{children:[t.paymentSuccess.name,":"]}),i.jsx("span",{children:r.customerName})]}),i.jsxs("div",{className:"detail-row",children:[i.jsxs("span",{children:[t.paymentSuccess.amount,":"]}),i.jsxs("span",{children:[r.amount," ",(l=r.currency)==null?void 0:l.toUpperCase()]})]}),i.jsxs("div",{className:"detail-row",children:[i.jsxs("span",{children:[t.paymentSuccess.status,":"]}),i.jsx("span",{className:"status-paid",children:t.paymentSuccess.paid})]})]}):null,i.jsxs("div",{className:"next-steps",children:[i.jsx("h3",{children:t.paymentSuccess.nextSteps}),i.jsxs("ul",{children:[i.jsx("li",{children:t.paymentSuccess.step1}),i.jsx("li",{children:t.paymentSuccess.step2}),i.jsx("li",{children:t.paymentSuccess.step3})]})]}),i.jsxs("div",{className:"result-actions",children:[i.jsxs(_e,{to:"/",className:"btn-result-primary",children:[i.jsx(Xs,{size:18}),t.paymentSuccess.backHome]}),i.jsxs(_e,{to:"/report",className:"btn-result-secondary",children:[i.jsx(Lt,{size:18}),t.paymentSuccess.downloadReport]})]}),i.jsxs("div",{className:"contact-info",children:[i.jsx(Tt,{size:18}),i.jsxs("span",{children:[t.paymentSuccess.contact," +971 54 220 6000"]})]})]})})}function Sg(){const{language:e,t}=rt();return i.jsx("div",{className:"payment-result-page",children:i.jsxs("div",{className:"payment-result-container cancel",children:[i.jsx("div",{className:"result-icon cancel",children:i.jsx(og,{size:80})}),i.jsx("h1",{children:t.paymentCancel.title}),i.jsx("p",{className:"result-message",children:t.paymentCancel.message}),i.jsxs("div",{className:"cancel-reasons",children:[i.jsx("h3",{children:e==="ar"?"أسباب محتملة:":"Possible reasons:"}),i.jsxs("ul",{children:[i.jsx("li",{children:e==="ar"?"قمت بإلغاء العملية":"You cancelled the transaction"}),i.jsx("li",{children:e==="ar"?"انتهت صلاحية الجلسة":"Session expired"}),i.jsx("li",{children:e==="ar"?"رفض البطاقة من البنك":"Card declined by bank"})]})]}),i.jsxs("div",{className:"result-actions",children:[i.jsxs(_e,{to:"/payment",className:"btn-result-primary",children:[i.jsx(Vo,{size:18}),t.paymentCancel.tryAgain]}),i.jsxs(_e,{to:"/",className:"btn-result-secondary",children:[i.jsx(Xs,{size:18}),t.paymentCancel.backHome]})]}),i.jsxs("div",{className:"contact-info",children:[i.jsx(Tt,{size:18}),i.jsxs("span",{children:[t.paymentCancel.contact," +971 54 220 6000"]})]})]})})}function Cg(){return i.jsx($h,{children:i.jsx(Oh,{children:i.jsxs("div",{className:"app",children:[i.jsx(sg,{}),i.jsx("main",{className:"main-content",children:i.jsxs(Dh,{children:[i.jsx($e,{path:"/",element:i.jsx(fg,{})}),i.jsx($e,{path:"/services",element:i.jsx(gg,{})}),i.jsx($e,{path:"/booking",element:i.jsx(xg,{})}),i.jsx($e,{path:"/report",element:i.jsx(yg,{})}),i.jsx($e,{path:"/payment",element:i.jsx(jg,{})}),i.jsx($e,{path:"/payment/success",element:i.jsx(bg,{})}),i.jsx($e,{path:"/payment/cancel",element:i.jsx(Sg,{})}),i.jsx($e,{path:"/admin",element:i.jsx(vg,{})}),i.jsx($e,{path:"/admin/dashboard",element:i.jsx(wg,{})}),i.jsx($e,{path:"/admin/shell",element:i.jsx(kg,{})})]})}),i.jsx(lg,{}),i.jsx(cg,{}),i.jsx(ug,{}),i.jsx(dg,{})]})})})}Xa.createRoot(document.getElementById("root")).render(i.jsx(Ac.StrictMode,{children:i.jsx(Cg,{})}));
