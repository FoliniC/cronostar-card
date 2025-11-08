function t(t,e=1){const i=Math.pow(10,e);return Math.round(t*i)/i}function e(t,e,i){return Math.max(e,Math.min(i,t))}function i(t,e=0){return(t+e).toString().padStart(2,"0")}function s(t,e=null){const i=parseFloat(t);return Number.isNaN(i)?e:i}const a={none:0,config:1,error:2,warn:3,info:4,debug:5,verbose:6};let n=a.info;const r={setLevel:t=>{t in a&&(n=a[t],console.log(`[Logger] Log level set to '${t}'`))},error:(t,...e)=>{n>=a.error&&console.error(`[${t}]`,...e)},warn:(t,...e)=>{n>=a.warn&&console.warn(`[${t}]`,...e)},info:(t,...e)=>{n>=a.info&&console.log(`[${t}]`,...e)},debug:(t,...e)=>{n>=a.debug&&console.log(`%c[${t}]`,"color: #03a9f4;",...e)},verbose:(t,...e)=>{n>=a.verbose&&console.log(`%c[${t}]`,"color: #9e9e9e;",...e)},config:(t,...e)=>{n>=a.config&&console.log(`%c[${t}]`,"color: #4caf50;",...e)},state:(...t)=>r.debug("STATE",...t),load:(...t)=>r.info("LOAD",...t),save:(...t)=>r.info("SAVE",...t),sel:(...t)=>r.debug("SEL",...t),memo:(...t)=>r.debug("MEMO",...t),diff:(...t)=>r.debug("DIFF",...t),key:(...t)=>r.debug("KEY",...t),base:(...t)=>r.info("BASE",...t)};window.Logger=r;const o=globalThis,l=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),d=new WeakMap;let h=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(l&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=d.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&d.set(e,t))}return t}toString(){return this.cssText}};const u=l?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new h("string"==typeof t?t:t+"",void 0,c))(e)})(t):t,{is:p,defineProperty:g,getOwnPropertyDescriptor:f,getOwnPropertyNames:m,getOwnPropertySymbols:_,getPrototypeOf:y}=Object,v=globalThis,w=v.trustedTypes,$=w?w.emptyScript:"",b=v.reactiveElementPolyfillSupport,C=(t,e)=>t,A={toAttribute(t,e){switch(e){case Boolean:t=t?$:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},P=(t,e)=>!p(t,e),S={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:P};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=S){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&g(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=f(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=y(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,e=[...m(t),..._(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(l)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),s=o.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:A).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:A;this._$Em=s;const n=a.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,a=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??P)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[C("elementProperties")]=new Map,x[C("finalized")]=new Map,b?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.1");const E=globalThis,T=E.trustedTypes,M=T?T.createPolicy("lit-html",{createHTML:t=>t}):void 0,D="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+R,k=`<${H}>`,O=document,L=()=>O.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,B=/>/g,F=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,Y=/"/g,W=/^(?:script|style|textarea|title)$/i,J=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),G=new WeakMap,Z=O.createTreeWalker(O,129);function X(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==M?M.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,s=[];let a,n=2===e?"<svg>":3===e?"<math>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===z?"!--"===l[1]?r=V:void 0!==l[1]?r=B:void 0!==l[2]?(W.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=F):void 0!==l[3]&&(r=F):r===F?">"===l[0]?(r=a??z,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?F:'"'===l[3]?Y:j):r===Y||r===j?r=F:r===V||r===B?r=z:(r=F,a=void 0);const h=r===F&&t[e+1].startsWith("/>")?" ":"";n+=r===z?i+k:c>=0?(s.push(o),i.slice(0,c)+D+i.slice(c)+R+h):i+R+(-2===c?e:h)}return[X(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class tt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0;const r=t.length-1,o=this.parts,[l,c]=Q(t,e);if(this.el=tt.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Z.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(D)){const e=c[n++],i=s.getAttribute(t).split(R),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?nt:"?"===r[1]?rt:"@"===r[1]?ot:at}),s.removeAttribute(t)}else t.startsWith(R)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(R),e=t.length-1;if(e>0){s.textContent=T?T.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],L()),Z.nextNode(),o.push({type:2,index:++a});s.append(t[e],L())}}}else if(8===s.nodeType)if(s.data===H)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(R,t+1));)o.push({type:7,index:a}),t+=R.length-1}a++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function et(t,e,i=t,s){if(e===q)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=I(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=et(t,a._$AS(t,e.values),a,s)),e}class it{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);Z.currentNode=s;let a=Z.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new st(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new lt(a,this,t)),this._$AV.push(e),o=i[++r]}n!==o?.index&&(a=Z.nextNode(),n++)}return Z.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class st{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=et(this,t,e),I(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=tt.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new it(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new tt(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new st(this.O(L()),this.O(L()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class at{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const a=this.strings;let n=!1;if(void 0===a)t=et(this,t,e,0),n=!I(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const s=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=et(this,s[i+r],e,r),o===q&&(o=this._$AH[r]),n||=!I(o)||o!==this._$AH[r],o===K?t=K:t!==K&&(t+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nt extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class rt extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class ot extends at{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=et(this,t,e,0)??K)===q)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class lt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){et(this,t)}}const ct=E.litHtmlPolyfillSupport;ct?.(tt,st),(E.litHtmlVersions??=[]).push("3.3.1");const dt=globalThis;class ht extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new st(e.insertBefore(L(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ht._$litElement$=!0,ht.finalized=!0,dt.litElementHydrateSupport?.({LitElement:ht});const ut=dt.litElementPolyfillSupport;ut?.({LitElement:ht}),(dt.litElementVersions??=[]).push("4.2.1");const pt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new h(i,t,c)})`

  ha-card {

    padding: 16px;

    height: 100%;

    box-sizing: border-box;

    display: flex;

    flex-direction: column;

    position: relative;

  }

  

  .card-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    padding-bottom: 8px;

  }



  .name {

    font-size: 1.2rem;

    font-weight: 500;

  }



        .menu-button {



          background: none;



          border: none;



          cursor: pointer;



          padding: 0;



          position: absolute;



          top: 12px;



          right: 12px;



        }



        .menu-button svg {



          fill: var(--primary-text-color);



        }



      



        .language-menu mwc-button {



          margin: 0 4px;



        }



    .menu-content {



      position: absolute;



      top: 48px;



      right: 8px;



      background: var(--card-background-color, white);



      border: 1px solid var(--divider-color, #e0e0e0);



      border-radius: 4px;



      z-index: 100;



      box-shadow: 0 2px 4px rgba(0,0,0,0.2);



      padding: 8px 0; /* Add padding for better spacing */



    }



  



    .menu-item-with-switch,



    .menu-item-with-select {



      display: flex;



      justify-content: space-between;



      align-items: center;



      padding: 8px 16px;



      min-height: 48px; /* Ensure consistent height */



    }



  



    .menu-item-with-switch span,



    .menu-item-with-select span {



      flex-grow: 1;



      color: var(--primary-text-color);



    }



  



    .language-menu {



      display: flex;



      align-items: center;



      padding: 0 8px;



    }



  .card-content {

    flex-grow: 1;

    position: relative;

    display: flex;

    flex-direction: column;

  }

  

  .chart-container {

    position: relative;

    flex-grow: 1;

    min-height: 300px;

    user-select: none;

    outline: none;

  }

  

  .loading-overlay {

    position: absolute;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    background: rgba(255, 255, 255, 0.8);

    display: flex;

    justify-content: center;

    align-items: center;

    z-index: 10;

    font-size: 14px;

    color: var(--primary-text-color);

  }

  

    .selection-rect {

  

      position: absolute;

  

      border: 2px dashed var(--primary-color, #03a9f4);

  

      background: rgba(3, 169, 244, 0.15);

  

      display: none;

  

      pointer-events: none;

  

      z-index: 20;

  

      border-radius: 4px;

  

    }

  

  

  

          .anomalous-operation-overlay {

  

  

  

            background: transparent; /* No background */

  

  

  

            color: var(--primary-text-color); /* Use primary text color */

  

  

  

            font-weight: bold;

  

  

  

            text-align: center;

  

  

  

            padding: 20px;

  

  

  

            pointer-events: none; /* Allow interaction with elements beneath */

  

  

  

          }

  

  

  

      

  

  

  

        .anomalous-watermark {

  

  

  

          position: absolute;

  

  

  

          top: 50%;

  

  

  

          left: 50%;

  

  

  

          transform: translate(-50%, -50%) rotate(-45deg);

  

  

  

          font-size: 2em; /* Slightly smaller for less intrusiveness */

  

  

  

          color: rgba(128, 128, 128, 0.1); /* Very light gray, very transparent */

  

  

  

          pointer-events: none;

  

  

  

          user-select: none;

  

  

  

          z-index: 1;

  

  

  

          white-space: nowrap;

  

  

  

          text-shadow: none; /* No shadow */

  

  

  

        }

  

  canvas {

    cursor: ns-resize;

    touch-action: none;

  }

  

  .drag-value-display {

    position: absolute;

    top: 0;

    left: 0;

    background: var(--card-background-color, white);

    border: 1px solid var(--divider-color, #e0e0e0);

    padding: 4px 8px;

    border-radius: 4px;

    display: none;

    z-index: 100;

    font-size: 12px;

    font-weight: 500;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    white-space: nowrap;

  }

  

  .controls {

    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin-top: 16px;

    align-items: center;

    padding-top: 12px;

    border-top: 1px solid var(--divider-color, #e0e0e0);

  }

  

  .control-group {

    display: flex;

    align-items: center;

    gap: 8px;

  }

  

  .control-group span {

    font-size: 14px;

    color: var(--primary-text-color);

  }

  

  ha-select {

    min-width: 180px;

  }

  

  mwc-button {

    --mdc-theme-primary: var(--primary-color);

  }

  

      .unsaved-indicator {

  

        display: inline-flex;

  

        align-items: center;

  

        gap: 4px;

  

        font-size: 12px;

  

        color: var(--warning-color, #ff9800);

  

      }

  

    

  

        input.info-value {

  

    

  

          text-align: right;

  

    

  

          border: none;

  

    

  

          background-color: transparent;

  

    

  

          color: var(--secondary-text-color);

  

    

  

          font-family: inherit;

  

    

  

          font-size: inherit;

  

    

  

          width: 100%;

  

    

  

          overflow: hidden;

  

    

  

          text-overflow: ellipsis;

  

    

  

          cursor: text;

  

    

  

        }

  

    

  

      

  

    

  

        .yaml-display {

  

    

  

          display: flex;

  

    

  

          flex-direction: column;

  

    

  

          padding: 16px;

  

    

  

        }

  

    

  

      

  

    

  

        .yaml-display p {

  

    

  

          margin-top: 0;

  

    

  

          font-size: 14px;

  

    

  

        }

  

    

  

      

  

    

  

        .yaml-display textarea {

  

    

  

          width: 100%;

  

    

  

          min-height: 150px;

  

    

  

          resize: vertical;

  

    

  

          box-sizing: border-box;

  

    

  

          background-color: var(--code-editor-background-color, #f4f4f4);

  

    

  

          color: var(--code-editor-text-color, #333);

  

    

  

          font-family: "Courier New", Courier, monospace;

  

    

  

          font-size: 13px;

  

    

  

          padding: 8px;

  

    

  

          border: 1px solid var(--divider-color);

  

    

  

          border-radius: 4px;

  

    

  

        }

  

    

  

      

  

    

  

        .menu-info {

  

      border-top: 1px solid var(--divider-color, #e0e0e0);

  

      margin-top: 8px;

  

      padding: 8px 16px;

  

      font-size: 12px;

  

      color: var(--secondary-text-color);

  

    }

  

  

  

    .info-row {

  

      display: flex;

  

      justify-content: space-between;

  

      margin-bottom: 4px;

  

    }

  

  

  

    .info-label {

  

      font-weight: bold;

  

      margin-right: 8px;

  

      flex-shrink: 0;

  

    }

  

  

  

    .info-value {

  

      text-align: right;

  

      word-break: break-all;

  

    }

  

    

  

    @media (max-width: 600px) {

    .controls {

      flex-direction: column;

      align-items: stretch;

    }

    

    .control-group {

      width: 100%;

      justify-content: space-between;

    }

    

    ha-select {

      width: 100%;

    }

  }

`,gt="3.3.0",ft={thermostat:{title:"CronoStar",entity_prefix:"temperature_hour_",y_axis_label:"Temperature",unit_of_measurement:"°C",min_value:15,max_value:30,step_value:.5,pause_entity:"input_boolean.temperature_schedule_paused",profiles_select_entity:"input_select.temperature_profiles",save_script:"script.cronostar_save_profile",load_script:"script.cronostar_load_profile"},ev_charging:{title:"CronoStar EV Charging",entity_prefix:"ev_charge_hour_",y_axis_label:"Power",unit_of_measurement:"kW",min_value:0,max_value:11,step_value:.5,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null},generic_kwh:{title:"CronoStar Generic kWh",entity_prefix:"generic_kwh_hour_",y_axis_label:"Energy",unit_of_measurement:"kWh",min_value:0,max_value:7,step_value:.5,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null},generic_temperature:{title:"CronoStar Generic Temperature",entity_prefix:"generic_temp_hour_",y_axis_label:"Temperature",unit_of_measurement:"°C",min_value:0,max_value:40,step_value:.5,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null},generic_switch:{title:"CronoStar Generic Switch",entity_prefix:"generic_switch_hour_",y_axis_label:"State",unit_of_measurement:"",min_value:0,max_value:1,step_value:1,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null,is_switch_preset:!0}},mt=["none","config","error","warn","info","debug","verbose"],_t={preset:"thermostat",chartjs_path:"/local/chart.min.js",dragdata_path:"/local/chartjs-plugin-dragdata.min.js",hour_base:"auto",log_level:"info",pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null,allow_max_value:!1,cronostar_custom_presets_entity:null},yt=5,vt=8,wt=10,$t=2,bt=.4,Ct=3e3,At=600,Pt=500,St=1e3,xt="rgba(3, 169, 244, 1)",Et="rgba(3, 169, 244, 0.2)",Tt="red",Mt="darkred",Dt="#ff5252",Rt="#b71c1c";function Ht(t){const e=t.preset||_t.preset,i=ft[e]||ft.thermostat,s={..._t,...i,...t};if(!s.entity_prefix)throw new Error("Configuration error: entity_prefix is required");return s.hour_base=function(t){if(0===t||1===t)return{value:t,determined:!0};if("string"==typeof t){const e=t.trim().toLowerCase();if("0"===e||"zero"===e||"00"===e)return{value:0,determined:!0};if("1"===e||"one"===e||"01"===e)return{value:1,determined:!0}}return{value:0,determined:!1}}(s.hour_base),s}class kt{constructor(t){this.card=t,this.scheduleData=new Array(24).fill(null),this.dirtyIndices=new Set,this.isLoadingProfile=!1,this.missingEntities=[],this.missingEntitiesLogged=!1,this.cooldownUntil=0}startCooldown(t){this.cooldownUntil=Date.now()+t,r.debug("STATE",`Cooldown started for ${t}ms`)}updateFromHass(t){if(Date.now()<this.cooldownUntil)return r.debug("STATE","Update ignored during cooldown period."),!1;const e=[];let i=!1;const a=[];for(let n=0;n<24;n++){const o=this.getEntityIdForHour(n),l=t.states[o];let c=null;l?(c=s(l.state),r.verbose("STATE",`updateFromHass loop [h:${n}] [id:${o}]: state='${l.state}', parsedValue=${c}`)):(a.push(o),c=null!==this.scheduleData[n]?this.scheduleData[n]:this.card.config.min_value,r.verbose("STATE",`updateFromHass loop [h:${n}] [id:${o}]: entity not found, using value=${c}`)),this.scheduleData[n]!==c&&(i=!0,r.debug("STATE",`Read from hass: ${o} -> ${c} (old value: ${this.scheduleData[n]})`)),e[n]=c}const n=JSON.stringify(this.missingEntities)!==JSON.stringify(a);if(this.missingEntities=a,this.missingEntities.length>0&&(!this.missingEntitiesLogged||n)){const t=this.groupMissingEntities(this.missingEntities);r.config("STATE",`Missing ${this.missingEntities.length} entities. Using default values. Please create the following input_number entities:\n\n${t}`),this.missingEntitiesLogged=!0}else 0===this.missingEntities.length&&(this.missingEntitiesLogged=!1);return i&&!this.isLoadingProfile?(r.debug("STATE","Schedule data updated from hass. Hours 00-05:",e.slice(0,6)),this.scheduleData=e,!0):!(!i||!this.isLoadingProfile)&&(r.debug("STATE","Update ignored during profile loading"),!1)}getEntityIdForHour(t){return`input_number.${this.card.config.entity_prefix}${i(t,this.card.hourBase)}`}getHourLabel(t){return`${i(t,this.card.hourBase)}:00`}updateTemperatureAtHour(t,e){const i=this.getEntityIdForHour(t);r.debug("MEMO",`set_value call -> entity=${i} hour=${this.getHourLabel(t)} value=${e}`),r.debug("STATE",`Setting ${i} to ${e}`),this.card.hass.callService("input_number","set_value",{entity_id:i,value:e}),this.dirtyIndices.add(t),this.card.hasUnsavedChanges=!0}async waitForEntityNumericState(t,e,i=3e3,a=.001){const n=Date.now();return new Promise((o,l)=>{const c=()=>{const d=this.card.hass?.states?.[t]?.state,h=s(d);return null!==h&&Math.abs(h-e)<=a?(r.debug("MEMO",`State confirmed -> entity=${t}, expected=${e}, current=${h}`),void o()):Date.now()-n>i?(r.warn("MEMO",`Timeout waiting for ${t}. Expected: ${e}, current: ${h}`),void l(new Error(`Timeout waiting for ${t}`))):void setTimeout(c,100)};c()})}async ensureValuesApplied(){const t=[];r.debug("MEMO","Ensuring values applied. Dirty indices:",Array.from(this.dirtyIndices));for(const e of Array.from(this.dirtyIndices)){const i=this.getEntityIdForHour(e),s=this.scheduleData[e];null!==s&&(r.debug("MEMO",`Waiting for entity sync -> hour=${this.getHourLabel(e)}, entity=${i}, expected=${s}`),t.push(this.waitForEntityNumericState(i,s,4e3,.001).catch(t=>r.warn("MEMO",`Wait failed for ${i}:`,t))))}t.length>0&&await Promise.all(t),this.dirtyIndices.clear()}logPersistedValues(t,e){e.forEach(e=>{const i=this.getEntityIdForHour(e),s=this.getHourLabel(e),a=this.scheduleData[e];r.debug("MEMO",`${t} -> hour=${s}, entity=${i}, value=${a}`)})}groupMissingEntities(t){const e=[],i=this.card.config.y_axis_label||"Value",s=this.card.config.unit_of_measurement||"";return t.forEach(t=>{const a=t.match(/^(input_number\.(.+?))_(\d{1,2})$/);if(a){const t=a[2],n=parseInt(a[3],10).toString().padStart(2,"0"),r=`\n${`${t}_${n}`}:\n  name: ${i} at ${n}\n  min: ${this.card.config.min_value}\n  max: ${this.card.config.max_value}\n  step: ${this.card.config.step_value}\n  initial: ${this.card.config.min_value}\n  unit_of_measurement: "${s}"\n`;e.push(r)}else e.push(`- ${t} (unrecognized format)`)}),e.join("\n\n")}clearDirty(){this.dirtyIndices.clear()}getData(){return[...this.scheduleData]}setData(t){this.scheduleData=[...t]}}class Ot{constructor(t){this.card=t,this.lastLoadedProfile=""}async waitForEntityState(t,e,i=Ct){const s=Date.now();return new Promise((a,n)=>{const r=()=>{const o=this.card.hass?.states?.[t]?.state;o!==e?Date.now()-s>i?n(new Error(`Timeout waiting for ${t} to become '${e}', current: '${o}'`)):setTimeout(r,100):a()};r()})}async saveProfile(t=this.lastLoadedProfile){if(!t)throw r.warn("SAVE","No profile specified"),new Error("No profile specified for saving");const e=this.card.config.save_script.startsWith("script.")?this.card.config.save_script.substring(7):this.card.config.save_script;r.info("SAVE",`Invoking script '${e}' for profile '${t}'`),r.info("SAVE",`Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}`),r.info("SAVE",`Data to save: ${JSON.stringify(this.card.stateManager.scheduleData)}`);try{await this.card.hass.callService("script",e,{profile_name:t,entity_prefix:this.card.config.entity_prefix,hour_base:this.card.hourBase,payload_version:2}),this.card.hasUnsavedChanges=!1,this.lastLoadedProfile=t,r.info("SAVE",`Script '${e}' completed for profile '${t}'`)}catch(i){throw r.error("SAVE",`Error calling save script '${e}':`,i),alert(`Error saving profile '${t}'. Check console for details.`),i}}async loadProfile(t){this.card.stateManager.isLoadingProfile=!0;const e=`input_text.ev_charging_profile_${t.toLowerCase().replace(/\s+/g,"_")}`,i=this.card.hass.states[e];if(!i||!i.state)throw r.error("LOAD",`Profile input_text entity '${e}' not found or empty.`),alert(`Error: Profile '${t}' input_text entity not found or empty.`),this.card.stateManager.isLoadingProfile=!1,new Error(`Profile input_text entity '${e}' not found or empty.`);let a;try{a=JSON.parse(i.state),a=a.map(t=>s(t))}catch(i){throw r.error("LOAD",`Error parsing JSON from '${e}':`,i),alert(`Error: Invalid JSON in profile '${t}'.`),this.card.stateManager.isLoadingProfile=!1,i}this.card.stateManager.setData(a),this.card.chartManager.updateData(a),r.info("LOAD",`Profile '${t}' loaded from input_text. Hours 00-05:`,a.slice(0,6));const n=this.card.config.load_script.startsWith("script.")?this.card.config.load_script.substring(7):this.card.config.load_script;r.info("LOAD",`Invoking script '${n}' to set input_numbers for profile '${t}'`),r.info("LOAD",`Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}, schedule_data=${JSON.stringify(a)}`);try{await this.card.hass.callService("script",n,{profile_name:t,entity_prefix:this.card.config.entity_prefix,hour_base:this.card.hourBase,schedule_data:a,payload_version:2}),r.info("LOAD","Script completed, waiting for state propagation..."),await new Promise(t=>setTimeout(t,At)),this.card.hasUnsavedChanges=!1,this.lastLoadedProfile=t,r.info("LOAD",`Profile '${t}' loaded completely`)}catch(e){throw r.error("LOAD",`Error calling load script '${n}':`,e),alert(`Error setting input_numbers for profile '${t}'. Check console for details.`),e}finally{this.card.stateManager.startCooldown(500),this.card.stateManager.isLoadingProfile=!1}}async handleProfileSelection(t){this.card.suppressClickUntil=Date.now()+St+500,this.card.selectionManager&&this.card.selectionManager.snapshotSelection();const e=t?.target?.value||t?.detail?.value||"";if(!e)return;if("__ADD_NEW__"===e)return this.createNewProfile(),void(t.target.value=this.card.selectedProfile);if(e===this.card.selectedProfile)return;const i=this.lastLoadedProfile||this.card.selectedProfile;if(this.card.hasUnsavedChanges&&i)try{r.info("SAVE",`Auto-saving previous profile '${i}' before switching`),await this.card.stateManager.ensureValuesApplied(),this.card.stateManager.logPersistedValues(`auto-save profile '${i}'`,Array.from(this.card.stateManager.dirtyIndices)),await this.saveProfile(i),r.info("SAVE",`Auto-save of '${i}' completed`)}catch(t){r.error("SAVE","Error during auto-save:",t)}this.card.selectedProfile=e;try{await this.card.hass.callService("input_select","select_option",{entity_id:this.card.config.profiles_select_entity,option:e}),await this.waitForEntityState(this.card.config.profiles_select_entity,e,Ct)}catch(t){r.warn("LOAD","select_option or wait failed:",t)}try{await this.loadProfile(e),this.card.selectionManager&&this.card.selectionManager.restoreSelectionFromSnapshot(),this.card.suppressClickUntil=Date.now()+Pt}catch(t){r.error("LOAD","Error during auto-load:",t)}}async createNewProfile(){const t=prompt("Enter the name for the new profile:");if(!t||""===t.trim())return void r.info("PROFILE","Profile creation cancelled.");const e=this.card.config.profiles_select_entity;if(!e)return void alert("Cannot add a new profile because 'profiles_select_entity' is not configured for this card.");const i=this.card.hass.states[e]?.attributes?.options||[];if(i.includes(t))return void alert(`Profile "${t}" already exists.`);const s=t.trim().toLowerCase().replace(/\s+/g,"_"),a=e.split(".")[1],n=`${a.endsWith("s")?a.slice(0,-1):a}_${s}`,o=[...i,t.trim()],l=`\n# 1. Add this to your input_text configuration:\ninput_text:\n  ${n}:\n    name: "Profile ${t.trim()} (JSON)"\n    max: 255\n`,c=`\n# 2. Update your input_select configuration (remove the '#' if this is a standalone file):\n#input_select:\n${a}:\n  options:\n${o.map(t=>`    - "${t}"`).join("\n")}\n`;this.card.displayYamlForProfileCreation(l,c)}async resetChanges(){const t=this.lastLoadedProfile||this.card.selectedProfile;if(t){this.card.selectionManager&&this.card.selectionManager.snapshotSelection();try{await this.loadProfile(t),this.card.selectionManager&&this.card.selectionManager.restoreSelectionFromSnapshot()}catch(t){r.error("LOAD","Error while reloading profile:",t)}}else r.warn("LOAD","No profile to reload")}}class Lt{constructor(t){this.card=t,this.selectedPoint=null,this.selectedPoints=[],this.selectionSnapshot=null}selectAll(){const t=Array.from({length:24},(t,e)=>e);this.selectIndices(t,!1),this.card.chartManager?.updatePointStyling(this.selectedPoint,this.selectedPoints),this.card.chartManager?.update()}selectIndices(t,e=!0){const i=(s=t,[...new Set(s)]).filter(t=>t>=0&&t<24);var s;this.selectedPoints=i,e&&null!==this.selectedPoint&&this.selectedPoints.includes(this.selectedPoint)||(this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null),this.logSelection("selectIndices")}toggleIndexSelection(t){const e=new Set(this.selectedPoints);e.has(t)?e.delete(t):e.add(t),this.selectedPoints=Array.from(e),null!==this.selectedPoint&&this.selectedPoints.includes(this.selectedPoint)||(this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null),this.logSelection("toggleIndexSelection")}clearSelection(){this.selectedPoints=[],this.selectedPoint=null,r.sel("Selection cleared")}snapshotSelection(){Array.isArray(this.selectedPoints)&&this.selectedPoints.length>0?(this.selectionSnapshot={points:[...this.selectedPoints],anchor:this.selectedPoint},this.logSelection("snapshot before profile change")):(this.selectionSnapshot=null,r.sel("Snapshot: no active selection"))}restoreSelectionFromSnapshot(){if(!this.selectionSnapshot)return void r.sel("Restore: no snapshot to restore");const t=Array.isArray(this.selectionSnapshot.points)?[...this.selectionSnapshot.points]:[];this.selectedPoints=t.filter(t=>t>=0&&t<24),null!==this.selectionSnapshot.anchor&&t.includes(this.selectionSnapshot.anchor)?this.selectedPoint=this.selectionSnapshot.anchor:this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null,this.card.chartManager&&this.card.chartManager.updatePointStyling(this.selectedPoint,this.selectedPoints),this.logSelection("restore selection after profile change")}logSelection(t=""){const e=null!==this.selectedPoint?this.card.stateManager.getHourLabel(this.selectedPoint):"n/a";if(r.sel(`${t} - anchor=${this.selectedPoint} (${e}) points=${JSON.stringify(this.selectedPoints)}`),this.card.stateManager){const t=this.card.stateManager.scheduleData;this.selectedPoints.forEach(e=>{const i=this.card.stateManager.getHourLabel(e),s=this.card.stateManager.getEntityIdForHour(e),a=t[e],n=this.card.hass?.states?.[s],o=n?n.state:void 0;r.sel(`  idx=${e}, hour=${i}, entity=${s}, chartVal=${a}, entityState=${o}`)})}}getActiveIndices(){return Array.isArray(this.selectedPoints)&&this.selectedPoints.length>0?[...this.selectedPoints]:null!==this.selectedPoint?[this.selectedPoint]:[]}isSelected(t){return this.selectedPoints.includes(t)}isAnchor(t){return this.selectedPoint===t}setAnchor(t){this.selectedPoints.includes(t)&&(this.selectedPoint=t)}getAnchor(){return this.selectedPoint}getSelectedPoints(){return[...this.selectedPoints]}}let It=!1;class Nt{constructor(t){this.card=t,this.chart=null,this.chartInitialized=!1,this.dragStartValues=null,this.dragAnchorIndex=null,this.hideValueDisplayTimeout=null}async loadPlugins(){if(r.verbose("CHART","[loadPlugins] called"),It)return r.debug("CHART","[loadPlugins] Plugins already loaded"),!0;const t=t=>(r.debug("CHART",`[loadScript] Loading script from ${t}`),new Promise((e,i)=>{const s=document.querySelector(`script[src="${t}"]`);if(s)return r.debug("CHART",`[loadScript] Script already in DOM: ${t}`),void(window.Chart?(r.debug("CHART","[loadScript] window.Chart is already defined."),e()):(s.addEventListener("load",()=>{r.debug("CHART",`[loadScript] Existing script loaded: ${t}`),e()}),s.addEventListener("error",()=>{r.error("CHART",`[loadScript] Existing script failed to load: ${t}`),i(new Error(`Failed to load script: ${t}`))})));const a=document.createElement("script");a.src=t,a.onload=()=>{r.debug("CHART",`[loadScript] Script loaded: ${t}`),window.Chart?r.debug("CHART","[loadScript] window.Chart is now defined."):r.warn("CHART","[loadScript] window.Chart is still not defined after script load."),e()},a.onerror=()=>{r.error("CHART",`[loadScript] Error loading script: ${t}`),i(new Error(`Failed to load script: ${t}`))},document.head.appendChild(a)}));try{if(window.Chart||(r.debug("CHART","[loadPlugins] Chart.js not loaded, invoking loadScript"),await t(this.card.config.chartjs_path)),!window.Chart)throw r.error("CHART","[loadPlugins] Chart.js could not be resolved"),new Error("Chart.js could not be resolved");window.ChartJSdragDataPlugin||(r.debug("CHART","[loadPlugins] dragDataPlugin not found, trying to load it"),await t(this.card.config.dragdata_path));const e=window.ChartJSdragDataPlugin||window.ChartDataDrag;return e?(r.debug("CHART","[loadPlugins] Registering dragDataPlugin"),window.Chart.registry.plugins.get("dragdata")||(window.Chart.register(e),r.info("CHART","chartjs-plugin-dragdata registered"))):r.warn("CHART","dragdata plugin not found; proceeding"),It=!0,!0}catch(t){return r.error("CHART","Error loading chart libraries:",t),!1}}async initChart(t){r.verbose("CHART","[initChart] called");const e=await this.loadPlugins();if(r.debug("CHART",`[initChart] Plugins loaded result: ${e}`),!e)return!1;const i=t.getContext("2d");if(r.debug("CHART",`[initChart] Got canvas context: ${!!i}`),!i)return!1;window.Chart.getChart(i)&&(r.warn("CHART","[initChart] Found existing chart on canvas context, destroying it."),window.Chart.getChart(i).destroy());const s=this.card.config.y_axis_label?`${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`:((t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i))("ui.temperature_label");return r.debug("CHART",`[initChart] yAxisLabel: ${s}`),r.debug("CHART",`[initChart] stateManager scheduleData len: ${this.card.stateManager.scheduleData?.length}`),this.chart=new window.Chart(i,{type:"line",data:{labels:Array.from({length:24},(t,e)=>`${e.toString().padStart(2,"0")}:00`),datasets:[{label:s,data:this.card.stateManager.scheduleData,backgroundColor:Et,borderColor:xt,borderWidth:$t,pointRadius:yt,pointHoverRadius:vt,pointHitRadius:wt,fill:!0,tension:bt}]},options:this.getChartOptions()}),r.debug("CHART","[initChart] Chart instance created"),this.chartInitialized=!0,this.updatePointStyling(this.card.selectionManager?.selectedPoint,this.card.selectionManager?.selectedPoints),r.verbose("CHART","[initChart] Point styling updated"),this.chart.update(),r.verbose("CHART","[initChart] chart.update() called"),this.updateChartLabels(),r.verbose("CHART","[initChart] updateChartLabels() called"),r.info("CHART","Chart initialized successfully"),!0}getChartOptions(){r.verbose("CHART","[getChartOptions] called");const t=(t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i),e=this.card.config.y_axis_label?`${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`:t("ui.temperature_label");r.debug("CHART",`[getChartOptions] yAxisLabel: ${e}`),r.debug("CHART",`is_switch_preset: ${this.card.config.is_switch_preset}`);const i={beginAtZero:!1,min:this.card.config.min_value,max:this.card.config.max_value,title:{display:!0,text:e}};return this.card.config.allow_max_value&&(i.max=this.card.config.max_value+this.card.config.step_value,i.ticks={...i.ticks,callback:(e,i,s)=>e>this.card.config.max_value?"Max":this.card.config.is_switch_preset?0===e?t("ui.state_off"):1===e?t("ui.state_on"):"":e}),this.card.config.is_switch_preset&&(r.debug("CHART","[getChartOptions] Configuring custom Y-axis ticks for switch preset"),i.beginAtZero=!0,i.ticks={stepSize:1,callback:function(e,i,s){return r.debug("CHART",`[Y-Tick callback] value=${e} index=${i} len=${s.length}`),r.debug("CHART",`[Y-Tick callback] ticks: ${JSON.stringify(s)}`),r.debug("CHART","[Y-Tick callback] localize is: "+typeof t),0===e?(r.debug("CHART","[Y-Tick callback] Returning OFF"),t("ui.state_off")):1===e?(r.debug("CHART","[Y-Tick callback] Returning ON"),t("ui.state_on")):(r.debug("CHART",`[Y-Tick callback] Returning empty for value=${e}`),"")}}),{responsive:!0,maintainAspectRatio:!1,events:["mousemove","mouseout","click","touchstart","touchmove","touchend","pointermove","pointerdown","pointerup","mousedown","mouseup"],scales:{y:i,x:{title:{display:!0,text:t("ui.time_label")}}},onClick:t=>this.handleChartClick(t),plugins:{dragData:this.getDragDataOptions(),tooltip:{enabled:!0}}}}recreateChartOptions(){if(r.verbose("CHART","[recreateChartOptions] called"),!this.chartInitialized||!this.chart)return r.debug("CHART","[recreateChartOptions] Chart not initialized"),!1;r.debug("CHART","[recreateChartOptions] Destroying and recreating chart");const t=[...this.chart.data.datasets[0].data],e=this.card.selectionManager?.selectedPoint,i=this.card.selectionManager?.selectedPoints,s=this.card.shadowRoot?.getElementById("myChart");return s?(this.destroy(),this.initChart(s).then(()=>{r.debug("CHART","[recreateChartOptions] Chart recreated"),this.updateData(t),(null!==e||i&&i.length>0)&&this.updatePointStyling(e,i)}),!0):(r.error("CHART","[recreateChartOptions] Canvas not found"),!1)}getDragDataOptions(){return r.verbose("CHART","[getDragDataOptions] called"),{round:this.card.config.step_value,dragX:!1,onDragStart:(t,e,i,s)=>{if(this.hideValueDisplayTimeout&&(clearTimeout(this.hideValueDisplayTimeout),this.hideValueDisplayTimeout=null),r.debug("CHART",`[onDragStart] index=${i} value=${s}`),this.card.pointerHandler?.isSelecting)return r.debug("CHART","[onDragStart] pointerHandler is selecting, abort"),!1;const a=this.card.selectionManager;if(!a)return r.debug("CHART","[onDragStart] No selectionManager"),!1;a.isSelected(i)?a.setAnchor(i):a.selectIndices([i],!1),this.dragStartValues={};const n=this.chart.data.datasets[0].data;return a.getSelectedPoints().forEach(t=>{this.dragStartValues[t]=n[t]??this.card.stateManager.scheduleData[t]}),this.dragAnchorIndex=i,this.updatePointStyling(a.selectedPoint,a.selectedPoints),a.logSelection("onDragStart"),!0},onDrag:(i,s,a,n)=>{if(r.debug("CHART",`[onDrag] index=${a} value=${n}`),!this.dragStartValues||null===this.dragAnchorIndex)return;const o=n-this.dragStartValues[this.dragAnchorIndex],l=this.chart.data.datasets[0],c=this.card.selectionManager;c.getSelectedPoints().forEach(i=>{let s=this.dragStartValues[i]+o;const a=this.card.config.allow_max_value?this.card.config.max_value+this.card.config.step_value:this.card.config.max_value;s=e(s,this.card.config.min_value,a),s=t(s,this.card.config.is_switch_preset?0:1),l.data[i]=s}),this.chart.update("none"),this.showDragValueDisplay(c.getSelectedPoints(),l.data)},onDragEnd:(e,i,s,a)=>{r.debug("CHART",`[onDragEnd] index=${s} value=${a}`);const n=this.card.shadowRoot?.getElementById("myChart");n&&(n.style.cursor="default");const o=this.chart.data.datasets[0],l=this.card.selectionManager,c=this.card.stateManager,d=l.getActiveIndices(),h=[...c.scheduleData];d.forEach(e=>{let i=o.data[e];i=t(i,this.card.config.is_switch_preset?0:1),h[e]=i}),c.setData(h),c.logPersistedValues("dragEnd",d),d.forEach(t=>{c.updateTemperatureAtHour(t,h[t])}),l.setAnchor(s),this.updatePointStyling(l.selectedPoint,l.selectedPoints),this.hideValueDisplayTimeout&&clearTimeout(this.hideValueDisplayTimeout),this.hideValueDisplayTimeout=setTimeout(()=>{this.hideDragValueDisplay()},1500),this.dragStartValues=null,this.dragAnchorIndex=null}}}handleChartClick(t){if(this.card.wasLongPress)return void(this.card.wasLongPress=!1);if(r.verbose("CHART","[handleChartClick] called"),Date.now()<this.card.suppressClickUntil)return void r.debug("CHART","[handleChartClick] Click suppressed");const e=this.chart.getElementsAtEventForMode(t,"nearest",{intersect:!0},!0),i=!!(this.card.keyboardHandler?.ctrlDown||this.card.keyboardHandler?.metaDown||t.ctrlKey||t.metaKey),s=this.card.selectionManager;if(r.debug("CHART",`[handleChartClick] Found points: ${e?.length}`),e.length){const t=e[0].index;r.debug("CHART",`[handleChartClick] Clicked index: ${t}`),i?s.toggleIndexSelection(t):s.selectIndices([t],!0)}else i||s.clearSelection();this.updatePointStyling(s.selectedPoint,s.selectedPoints),this.chartInitialized&&this.chart.update(),s.logSelection("onClick")}updatePointStyling(t,e=[]){if(r.verbose("CHART","[updatePointStyling] called"),!this.chartInitialized||!this.chart?.data?.datasets?.length)return void r.debug("CHART","[updatePointStyling] Not initialized");const i=this.chart.data.datasets[0],s=Array.isArray(i.data)?i.data.length:24;i.pointRadius=Array(s).fill(yt),i.pointBackgroundColor=Array(s).fill(xt),i.pointBorderColor=Array(s).fill(xt),i.pointBorderWidth=Array(s).fill($t),Array.isArray(e)&&e.length>0&&e.forEach(t=>{t>=0&&t<s&&(i.pointRadius[t]=8,i.pointBackgroundColor[t]=Tt,i.pointBorderColor[t]=Mt,i.pointBorderWidth[t]=2,r.verbose("CHART",`[updatePointStyling] Styled selected point idx=${t}`))}),null!==t&&t>=0&&t<s&&(i.pointRadius[t]=9,i.pointBorderWidth[t]=3,i.pointBackgroundColor[t]=Dt,i.pointBorderColor[t]=Rt,r.verbose("CHART",`[updatePointStyling] Styled anchor point idx=${t}`))}showDragValueDisplay(t,e){r.verbose("CHART","[showDragValueDisplay] called");const i=this.card.shadowRoot?.getElementById("drag-value-display");if(!i||0===t.length)return void r.debug("CHART","[showDragValueDisplay] No display element or indices empty");const s=Math.min(...t),a=e[s];i.style.display="block",i.textContent=((t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i))("ui.value_display",{"{value}":a,"{unit}":this.card.config.unit_of_measurement});const n=this.chart.getDatasetMeta(0).data[s];if(n){const{x:t,y:e}=n.tooltipPosition(),{x:s,y:a}=this.getContainerRelativePointCoords(t,e);i.style.left=`${s+10}px`,i.style.top=a-30+"px",r.verbose("CHART",`[showDragValueDisplay] Display position: left=${s+10} top=${a-30}`)}}hideDragValueDisplay(){r.verbose("CHART","[hideDragValueDisplay] called");const t=this.card.shadowRoot?.getElementById("drag-value-display");t&&(t.style.display="none",r.debug("CHART","[hideDragValueDisplay] Hiding display"))}getContainerRelativePointCoords(t,e){r.verbose("CHART","[getContainerRelativePointCoords] called");const i=this.card.shadowRoot?.querySelector(".chart-container"),s=this.card.shadowRoot?.getElementById("myChart");if(!i||!s)return r.debug("CHART","[getContainerRelativePointCoords] container or canvas not found"),{x:0,y:0};const a=i.getBoundingClientRect(),n=s.getBoundingClientRect(),o=n.left-a.left,l=n.top-a.top;return r.verbose("CHART",`[getContainerRelativePointCoords] OffsetX=${o} OffsetY=${l}`),{x:t+o,y:e+l}}updateData(t){r.verbose("CHART","[updateData] called"),this.chartInitialized&&this.chart?(this.chart.data.datasets[0].data=[...t],r.debug("CHART",`[updateData] Data updated. Length: ${t.length}`),this.updatePointStyling(this.card.selectionManager?.selectedPoint,this.card.selectionManager?.selectedPoints),r.verbose("CHART","[updateData] Point styling updated"),this.chart.update(),r.verbose("CHART","[updateData] chart.update() called")):r.debug("CHART","[updateData] Chart not initialized")}destroy(){if(r.verbose("CHART","[destroy] called"),this.chart){this.chart.destroy(),this.chart=null,this.chartInitialized=!1;const t=this.chart?.canvas;t&&(t.width=0,t.height=0,r.debug("CHART","[destroy] Canvas dimensions cleared")),r.debug("CHART","[destroy] Chart destroyed")}}isInitialized(){return r.verbose("CHART","[isInitialized] called"),this.chartInitialized&&null!==this.chart}update(){r.verbose("CHART","[update] called"),this.chartInitialized&&this.chart&&(this.chart.update(),r.verbose("CHART","[update] chart.update() called"))}getChart(){return r.verbose("CHART","[getChart] called"),this.chart}updateChartLabels(){if(r.verbose("CHART","[updateChartLabels] called"),!this.chart)return void r.warn("CHART","updateChartLabels: Chart not initialized");r.verbose("CHART","updateChartLabels called");const t=(t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i),e=this.card.config.y_axis_label?`${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`:t("ui.temperature_label"),i=t("ui.time_label");r.debug("CHART",`New labels: ${e}, ${i}`),this.chart.data.datasets[0].label=e,this.chart.options.scales.y.title.text=e,this.chart.options.scales.x.title.text=i,r.verbose("CHART","Calling chart.update()"),this.chart.update()}}class Ut{constructor(t){this.card=t,this.ctrlDown=!1,this.metaDown=!1,this.enabled=!0,this.handleKeydown=this.handleKeydown.bind(this),this.handleKeyup=this.handleKeyup.bind(this)}enable(){this.enabled=!0}disable(){this.enabled=!1}handleKeydown(t){if(r.key(`Keydown event: key=${t.key}, ctrl=${this.ctrlDown}, meta=${this.metaDown}, enabled=${this.enabled}`),!this.enabled)return;if("Control"===t.key)return void(this.ctrlDown=!0);if("Meta"===t.key)return void(this.metaDown=!0);if((this.ctrlDown||this.metaDown)&&"a"===t.key)return t.preventDefault(),r.key("Ctrl+A detected, selecting all."),void this.card.selectionManager.selectAll();if("Escape"===t.key)return void this.handleEscape();const e=this.card.selectionManager.getActiveIndices();0!==e.length&&("ArrowLeft"!==t.key&&"ArrowRight"!==t.key?"ArrowUp"!==t.key&&"ArrowDown"!==t.key||this.handleArrowUpDown(t,e):this.handleArrowLeftRight(t,e))}handleKeyup(t){if("Control"!==t.key)if("Meta"!==t.key){if("ArrowUp"===t.key||"ArrowDown"===t.key||"ArrowLeft"===t.key||"ArrowRight"===t.key){const t=this.card.chartManager;t&&(t.hideValueDisplayTimeout&&clearTimeout(t.hideValueDisplayTimeout),t.hideValueDisplayTimeout=setTimeout(()=>{t.hideDragValueDisplay()},1500))}}else this.metaDown=!1;else this.ctrlDown=!1}handleEscape(){this.card.selectionManager.clearSelection(),this.card.chartManager?.updatePointStyling(null,[]),this.card.chartManager?.update()}handleArrowLeftRight(e,i){e.preventDefault();const s=this.card.stateManager,a=this.card.chartManager;a.hideValueDisplayTimeout&&(clearTimeout(a.hideValueDisplayTimeout),a.hideValueDisplayTimeout=null);const n=a.chart.data.datasets[0];let o;o="ArrowLeft"===e.key?Math.min(...i):Math.max(...i);const l=t(n.data[o]??s.scheduleData[o],1);r.key(`${e.key} -> align to index: ${o} (${s.getHourLabel(o)}) value=${l} indices=${JSON.stringify(i)}`);const c=[...s.scheduleData];i.forEach(t=>{c[t]=l,n.data[t]=l,s.updateTemperatureAtHour(t,l)}),s.setData(c),a.updatePointStyling(this.card.selectionManager.selectedPoint,this.card.selectionManager.selectedPoints),a.update(),a.showDragValueDisplay(i,n.data)}handleArrowUpDown(i,s){i.preventDefault();const a="ArrowUp"===i.key?this.card.config.step_value:-this.card.config.step_value,n=this.card.selectionManager,o=this.card.stateManager,l=this.card.chartManager;l.hideValueDisplayTimeout&&(clearTimeout(l.hideValueDisplayTimeout),l.hideValueDisplayTimeout=null);const c=l.chart.data.datasets[0],d=[...o.scheduleData];r.key(`${i.key} -> delta=${a} indices=${JSON.stringify(s)}`),s.forEach(i=>{let s=(c.data[i]??o.scheduleData[i])+a;const n=this.card.config.allow_max_value?this.card.config.max_value+this.card.config.step_value:this.card.config.max_value;s=e(s,this.card.config.min_value,n),s=t(s,1),c.data[i]=s,d[i]=s,o.updateTemperatureAtHour(i,s)}),o.setData(d),l.updatePointStyling(n.selectedPoint,n.selectedPoints),l.update(),l.showDragValueDisplay(s,c.data)}attachListeners(t){t.addEventListener("keydown",this.handleKeydown),t.addEventListener("keyup",this.handleKeyup)}detachListeners(t){t.removeEventListener("keydown",this.handleKeydown),t.removeEventListener("keyup",this.handleKeyup)}}class zt{constructor(t){this.card=t,this.isSelecting=!1,this.selStartPx=null,this.selEndPx=null,this.activePointerId=null,this.selectionAdditive=!1,this.longPressTimeout=null,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onPointerCancel=this.onPointerCancel.bind(this)}getContainerRelativeCoords(t){const e=this.card.shadowRoot?.querySelector(".chart-container");if(!e)return{x:0,y:0};const i=e.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}}showSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");t&&(t.style.display="block",this.updateSelectionOverlay())}hideSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");t&&(t.style.display="none")}updateSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");if(!t||!this.selStartPx||!this.selEndPx)return;const e=Math.min(this.selStartPx.x,this.selEndPx.x),i=Math.min(this.selStartPx.y,this.selEndPx.y),s=Math.max(this.selStartPx.x,this.selEndPx.x),a=Math.max(this.selStartPx.y,this.selEndPx.y);t.style.left=`${e}px`,t.style.top=`${i}px`,t.style.width=`${Math.max(0,s-e)}px`,t.style.height=`${Math.max(0,a-i)}px`}getIndicesInSelectionRect(){const t=this.card.chartManager;if(!t?.chart||!this.selStartPx||!this.selEndPx)return[];const e=t.chart.getDatasetMeta(0);if(!e?.data)return[];const i=this.card.shadowRoot?.querySelector(".chart-container"),s=this.card.shadowRoot?.getElementById("myChart");if(!i||!s)return[];const a=i.getBoundingClientRect(),n=s.getBoundingClientRect(),o=n.left-a.left,l=n.top-a.top,c=Math.min(this.selStartPx.x,this.selEndPx.x),d=Math.min(this.selStartPx.y,this.selEndPx.y),h=Math.max(this.selStartPx.x,this.selEndPx.x),u=Math.max(this.selStartPx.y,this.selEndPx.y),p=[];return e.data.forEach((t,e)=>{const i="function"==typeof t.tooltipPosition?t.tooltipPosition():{x:t.x,y:t.y},s=i.x+o,a=i.y+l;s>=c&&s<=h&&a>=d&&a<=u&&p.push(e)}),r.sel(`Area selection: nodes in rectangle -> ${JSON.stringify(p)}`),p}onPointerDown(t){if("mouse"===t.pointerType&&0!==t.button)return;if("touch"===t.pointerType){const e=this.card.chartManager,i=e?.chart?.getElementsAtEventForMode?.(t,"nearest",{intersect:!0},!0)||[];i.length>0&&(this.longPressTimeout=setTimeout(()=>{this.card.wasLongPress=!0;const t=this.card.selectionManager,s=i[0].index;t.toggleIndexSelection(s),e.updatePointStyling(t.selectedPoint,t.selectedPoints),e.update(),this.longPressTimeout=null},500))}const e=this.card.chartManager,i=(e?.chart?.getElementsAtEventForMode?.(t,"nearest",{intersect:!0},!0)||[]).length>0;if(!(!!t.shiftKey||!i))return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.isSelecting=!0,this.activePointerId=t.pointerId,this.selectionAdditive=!!(this.card.keyboardHandler?.ctrlDown||this.card.keyboardHandler?.metaDown||t.ctrlKey||t.metaKey);const s=this.card.shadowRoot?.getElementById("myChart");try{s?.setPointerCapture(t.pointerId)}catch(t){}const{x:a,y:n}=this.getContainerRelativeCoords(t);this.selStartPx={x:a,y:n},this.selEndPx={x:a,y:n},this.showSelectionOverlay(),this.card.suppressClickUntil=Date.now()+Pt}onPointerMove(t){if(this.longPressTimeout&&(clearTimeout(this.longPressTimeout),this.longPressTimeout=null),!this.isSelecting)return;if(null!==this.activePointerId&&t.pointerId!==this.activePointerId)return;t.preventDefault();const e=this.getContainerRelativeCoords(t);this.selEndPx=e,this.updateSelectionOverlay()}onPointerUp(t){if(this.longPressTimeout&&(clearTimeout(this.longPressTimeout),this.longPressTimeout=null),this.card.wasLongPress)return this.card.wasLongPress=!1,t.preventDefault(),t.stopPropagation(),void t.stopImmediatePropagation();if(!this.isSelecting)return;if(null!==this.activePointerId&&t.pointerId!==this.activePointerId)return;this.isSelecting=!1,this.activePointerId=null;const e=this.card.shadowRoot?.getElementById("myChart");try{e?.releasePointerCapture(t.pointerId)}catch(t){}this.hideSelectionOverlay();const i=this.getIndicesInSelectionRect(),s=this.card.selectionManager,a=this.card.chartManager;if(i.length>0)if(this.selectionAdditive){const t=[...s.getSelectedPoints()];i.forEach(e=>{t.includes(e)||t.push(e)}),s.selectIndices(t,!0)}else s.selectIndices(i,!0);else s.clearSelection();a.updatePointStyling(s.selectedPoint,s.selectedPoints),a.update(),s.logSelection("area selection completed"),this.card.suppressClickUntil=Date.now()+Pt}onPointerCancel(){this.isSelecting&&(this.isSelecting=!1,this.activePointerId=null,this.hideSelectionOverlay(),this.card.suppressClickUntil=Date.now()+300)}attachListeners(t){t.addEventListener("pointerdown",this.onPointerDown,{passive:!1,capture:!0}),window.addEventListener("pointermove",this.onPointerMove,!0),window.addEventListener("pointerup",this.onPointerUp,!0),window.addEventListener("pointercancel",this.onPointerCancel,!0)}detachListeners(t){t.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),window.removeEventListener("pointermove",this.onPointerMove,!0),window.removeEventListener("pointerup",this.onPointerUp,!0),window.removeEventListener("pointercancel",this.onPointerCancel,!0)}}const Vt={en:{"ui.title":"CronoStar Schedule","ui.loading":"Loading data...","ui.pause":"Pause","ui.profile":"Profile","ui.unsaved_changes":"Unsaved changes","ui.reset":"Reset","ui.value_display":"Value: {value}{unit}","ui.temperature_label":"Temperature (°C)","ui.time_label":"Time of Day","ui.missing_entities_message":"Missing required entities. Please create the following input_number entities:","ui.anomalous_operation_warning":"Anomalous operation: Some entities are missing. Activate logging and check the console for details.","ui.anomalous_operation_watermark":"ANOMALOUS OPERATION - MISSING ENTITIES","ui.state_off":"Off","ui.state_on":"On","menu.select_all":"Select All","menu.help":"Help","menu.language":"Language","menu.log_level":"Log Level","menu.select_preset":"Select Preset","preset.thermostat":"Thermostat","preset.ev_charging":"EV Charging","preset.generic_kwh":"Generic kWh","preset.generic_temperature":"Generic Temperature","preset.generic_switch":"Generic Switch","help.title":"CronoStar Help","help.text":"Drag points on the graph to change the temperature. Hold Shift to select multiple points. Use Ctrl+A to select all points."},it:{"ui.title":"Programma CronoStar","ui.loading":"Caricamento dati...","ui.pause":"Pausa","ui.profile":"Profilo","ui.unsaved_changes":"Modifiche non salvate","ui.reset":"Reset","ui.value_display":"Valore: {value}{unit}","ui.temperature_label":"Temperatura (°C)","ui.time_label":"Ora del Giorno","ui.missing_entities_message":"Entità richieste mancanti. Si prega di creare le seguenti entità input_number:","ui.anomalous_operation_warning":"Funzionamento anomalo: Alcune entità sono mancanti. Attiva il logging e controlla la console per i dettagli.","ui.anomalous_operation_watermark":"FUNZIONAMENTO ANOMALO - ENTITÀ MANCANTI","ui.state_off":"Spento","ui.state_on":"Acceso","menu.select_all":"Seleziona tutto","menu.help":"Aiuto","menu.language":"Lingua","menu.log_level":"Livello Log","menu.select_preset":"Seleziona Preset","preset.thermostat":"Cronotermostato","preset.ev_charging":"Ricarica EV","preset.generic_kwh":"kWh Generico","preset.generic_temperature":"Temperatura Generica","preset.generic_switch":"Interruttore Generico","help.title":"Aiuto CronoStar","help.text":"Trascina i punti sul grafico per cambiare la temperatura. Tieni premuto Shift per selezionare più punti. Usa Ctrl+A per selezionare tutti i punti."}};class Bt{localize(t,e,i,s){let a=Vt[t]?.[e]||Vt.en[e]||e;if(i&&"object"==typeof i)for(const t in i)a=a.replace(new RegExp(t,"g"),i[t]);else i&&void 0!==s&&(a=a.replace(i,s));return a}}customElements.define("cronostar-card",class extends ht{static get properties(){return{hass:{type:Object},config:{type:Object},isPaused:{type:Boolean},selectedProfile:{type:String},profileOptions:{type:Array},hasUnsavedChanges:{type:Boolean},isMenuOpen:{type:Boolean},language:{type:String},log_level:{type:String},selectedPreset:{type:String},missingEntities:{type:Array},initialLoadComplete:{type:Boolean},_isShowingYaml:{state:!0},_yamlToShow:{state:!0},_yamlStep:{state:!0}}}static get styles(){return pt}constructor(){super(),this.config=null,this.hourBase=0,this.hourBaseDetermined=!1,this.isPaused=!1,this.selectedProfile="",this.profileOptions=[],this.hasUnsavedChanges=!1,this.suppressClickUntil=0,this.isMenuOpen=!1,this.language="it",this.log_level="info",this.selectedPreset="thermostat",this.missingEntities=[],this.initialLoadComplete=!1,this.wasLongPress=!1,this._customPresets={},this._isShowingYaml=!1,this._yamlToShow="",this._yamlStep=1,this._secondYaml="",this.localizationManager=new Bt,this.stateManager=new kt(this),this.profileManager=new Ot(this),this.selectionManager=new Lt(this),this.chartManager=new Nt(this),this.keyboardHandler=new Ut(this),this.pointerHandler=new zt(this)}displayYamlForProfileCreation(t,e){this._yamlToShow=t,this._secondYaml=e,this._yamlStep=1,this._isShowingYaml=!0}_handleYamlDialogClick(){1===this._yamlStep?(this._yamlToShow=this._secondYaml,this._yamlStep=2):(this._isShowingYaml=!1,this._yamlToShow="",this._secondYaml="",this._yamlStep=1,this.chartManager.destroy())}updated(t){super.updated(t),t.has("_isShowingYaml")&&!this._isShowingYaml&&this.initializeCard()}_renderYamlDialog(){const t=1===this._yamlStep?"To add the new profile, first copy the YAML for the new input_text entity:":"Next, copy the YAML to update your input_select configuration:",e=1===this._yamlStep?"Next":"Close";return J`
      <ha-card>
        <div class="yaml-display">
          <p>${t}</p>
          <textarea readonly>${this._yamlToShow}</textarea>
          <mwc-button outlined @click=${this._handleYamlDialogClick}>${e}</mwc-button>
        </div>
      </ha-card>
    `}setConfig(t){r.debug("CONFIG","setConfig: config received",t),this.config=Ht(t),r.debug("CONFIG","setConfig: validated config",this.config),this.log_level=this.config.log_level,r.setLevel(this.log_level),r.info("CONFIG","setConfig: Logger.setLevel called with",this.log_level),this.selectedPreset=this.config.preset;const e=this.config.hour_base;if("object"==typeof e&&(this.hourBase=e.value,this.hourBaseDetermined=e.determined),this.config.cronostar_custom_presets_entity&&this.hass){const t=this.hass.states[this.config.cronostar_custom_presets_entity];if(t&&"unknown"!==t.state&&"unavailable"!==t.state)try{this._customPresets=JSON.parse(t.state),r.debug("PRESET","Loaded custom presets:",this._customPresets)}catch(t){r.error("PRESET","Error parsing custom presets JSON:",t),this._customPresets={}}}}static getStubConfig(){return{..._t}}detectHourBase(t){if(this.hourBaseDetermined)return;const e=this.config.entity_prefix;let i=0,s=0;for(let s=0;s<24;s++){const a=`input_number.${e}${s.toString().padStart(2,"0")}`;void 0!==t.states[a]&&i++}for(let i=1;i<=24;i++){const a=`input_number.${e}${i.toString().padStart(2,"0")}`;void 0!==t.states[a]&&s++}this.hourBase=s>i?1:0,this.hourBaseDetermined=!0,r.base(`Hour base detection -> 0-based: ${i}, 1-based: ${s}. Selected: ${this.hourBase} (${0===this.hourBase?"00-23":"01-24"})`)}set hass(t){if(this._hass=t,this.config&&this.config.entity_prefix){this.detectHourBase(t);const e=this.stateManager.updateFromHass(t);this.missingEntities=this.stateManager.missingEntities,e&&this.chartManager.isInitialized()?(r.debug("CHART","[handlePresetChange] Recreating chart with new options"),this.chartManager.recreateChartOptions()):this.chartManager?.updateData(this.stateManager.getData());const i=t.states[this.config.pause_entity];i&&(this.isPaused="on"===i.state);const s=t.states[this.config.profiles_select_entity];if(s){const t=this.selectedProfile;this.selectedProfile=s.state,this.profileOptions=s.attributes.options||[],this.selectedProfile&&this.selectedProfile!==t&&(r.info("LOAD",`Initial/Changed profile detected: '${this.selectedProfile}'. Attempting to load.`),this.profileManager.loadProfile(this.selectedProfile))}}}get hass(){return this._hass}async _saveCustomPresets(t){if(!this.config.cronostar_custom_presets_entity)return r.error("PRESET","Cannot save custom presets: cronostar_custom_presets_entity is not configured."),void alert("Error: cronostar_custom_presets_entity is not configured in the card settings.");try{await this.hass.callService("input_text","set_value",{entity_id:this.config.cronostar_custom_presets_entity,value:JSON.stringify(t)}),this._customPresets=t,r.info("PRESET","Custom presets saved successfully.",t)}catch(t){r.error("PRESET","Error saving custom presets:",t),alert("Error saving custom presets. Check console for details.")}}toggleMenu(t){t&&(t.stopPropagation(),t.preventDefault()),this.isMenuOpen=!this.isMenuOpen,r.debug("UI","toggleMenu: isMenuOpen is now",this.isMenuOpen),this.requestUpdate()}handleLanguageSelect(t){r.debug("LANG",`handleLanguageSelect called with: ${t}`),this.language=t,this.isMenuOpen=!1,this.chartManager.updateChartLabels(),this.requestUpdate()}handleLogLevelChange(t){t.stopPropagation();const e=t.detail?.value||t.target.value;e&&e!==this.log_level&&(this.log_level=e,this.config={...this.config,log_level:e},r.setLevel(e),this.isMenuOpen=!1,this.requestUpdate())}handlePresetChange(t){t.stopPropagation(),t.preventDefault();const e=t.detail?.value||t.target?.value;if(r.debug("UI","handlePresetChange: Event type:",t.type),r.debug("UI","handlePresetChange: newPreset",e),r.debug("UI","handlePresetChange: current preset",this.selectedPreset),"__ADD_NEW_PRESET__"===e)return this.handleAddNewPreset(),void(t.target.value=this.selectedPreset);if(!e||e===this.selectedPreset)return void r.debug("UI","handlePresetChange: No change detected, ignoring");this.selectedPreset=e;const i=ft[e];this.config={...this.config,preset:e,...i},r.debug("UI","handlePresetChange: New config",this.config),this.config=Ht(this.config),this.stateManager.setData(new Array(24).fill(null)),this.chartManager?.isInitialized()?(r.debug("CHART","[handlePresetChange] Recreating chart with new options"),this.chartManager.recreateChartOptions()):this.chartManager?.updateData(this.stateManager.scheduleData),setTimeout(()=>{if(this.isMenuOpen=!1,this.requestUpdate(),this.chartManager.isInitialized()){const t=this.chartManager.getChart();t&&(t.options.scales.y.min=this.config.min_value,t.options.scales.y.max=this.config.max_value,t.update()),this.chartManager.updateChartLabels()}},150)}handleSelectAll(){this.selectionManager.selectAll(),this.isMenuOpen=!1}handleHelp(){alert(this.localizationManager.localize(this.language,"help.text")),this.isMenuOpen=!1}async handleAddNewPreset(){if(!this.config.cronostar_custom_presets_entity){const t='input_text:\n  cronostar_custom_presets:\n    name: CronoStar Custom Presets\n    initial: "{}"\n    max: 2000 # Adjust as needed\n';return void prompt(`\nTo add new presets, you first need to configure a storage entity.\n\n1. Copy the YAML below and add it to your configuration.yaml:\n--------------------------------------------------\n${t}--------------------------------------------------\n\n2. Go to Developer Tools > YAML and click "RELOAD INPUT TEXTS".\n\n3. Once reloaded, refresh your Home Assistant dashboard.\n\nAfter these steps, you can try adding a new preset again.\n    `,t)}const t=prompt("Enter a unique name for the new preset:");if(!t||""===t.trim())return void r.info("PRESET","Preset creation cancelled.");const e={...ft,...this._customPresets};if(e[t])return void alert(`Preset "${t}" already exists. Choose a different name.`);const i=e[this.selectedPreset]||ft.thermostat,s={title:`CronoStar ${t}`,entity_prefix:`${t.toLowerCase().replace(/\s+/g,"_")}_hour_`,y_axis_label:i.y_axis_label||"Value",unit_of_measurement:i.unit_of_measurement||"",min_value:i.min_value||0,max_value:i.max_value||25,step_value:i.step_value||.5,pause_entity:i.pause_entity||null,profiles_select_entity:i.profiles_select_entity||null,save_script:i.save_script||null,load_script:i.load_script||null},a=prompt("\n        1. Review and modify the JSON below for your new preset.\n        2. Copy the final JSON (optional, for backup).\n        \n        3. Click OK to save this new preset to your 'custom_presets_entity'.\n            ",JSON.stringify(s,null,2));if(null!==a)try{const e=JSON.parse(a),i={...this._customPresets,[t]:e};await this._saveCustomPresets(i),this.selectedPreset=t,this.config={...this.config,preset:t},this.requestUpdate(),alert(`Preset "${t}" created and saved. Please reload your custom_presets_entity (input_text)`),this.isMenuOpen=!1}catch(t){r.error("PRESET","Error creating new preset:",t),alert("Error creating preset: Invalid JSON or other issue. Check console.")}}togglePause(){this.hass.callService("input_boolean","toggle",{entity_id:this.config.pause_entity})}async firstUpdated(){super.firstUpdated(),await this.initializeCard(),this.initialLoadComplete=!0}connectedCallback(){super.connectedCallback(),this.initialLoadComplete&&this.initializeCard()}async initializeCard(){if(await this.updateComplete,this.chartManager.isInitialized())return;const t=this.shadowRoot.getElementById("myChart");if(!t)return void r.error("INIT","Canvas element not found");if(!await this.chartManager.initChart(t))return void r.error("INIT","Failed to initialize chart");this.pointerHandler.attachListeners(t);const e=this.shadowRoot.querySelector(".chart-container");e&&(e.setAttribute("tabindex","0"),this.keyboardHandler.attachListeners(e),e.addEventListener("pointerdown",()=>{e.focus(),this.keyboardHandler.enable()}),e.focus()),r.info("INIT","Card initialized successfully")}disconnectedCallback(){super.disconnectedCallback(),this.chartManager.destroy();const t=this.shadowRoot?.getElementById("myChart");t&&this.pointerHandler.detachListeners(t);const e=this.shadowRoot?.querySelector(".chart-container");e&&this.keyboardHandler.detachListeners(e)}render(){if(this._isShowingYaml)return this._renderYamlDialog();const t=this.stateManager.scheduleData.some(t=>null===t),e=(t,e,i)=>this.localizationManager.localize(this.language,t,e,i),i=e("ui.title");return J`
      <ha-card>
        <div class="card-header">
          <div class="name">${i} (v${gt})</div>
          <button class="menu-button" @click=${t=>this.toggleMenu(t)}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </button>
        </div>
        ${this.isMenuOpen?J`
          <div class="menu-content" @click=${t=>t.stopPropagation()}>
            <mwc-list-item @click=${this.handleSelectAll}>${e("menu.select_all")}</mwc-list-item>
            <mwc-list-item @click=${this.handleHelp}>${e("menu.help")}</mwc-list-item>
            
            <div class="menu-item-with-select">
              <ha-select
                label="${e("menu.log_level")}"
                .value=${this.log_level}
                @selected=${this.handleLogLevelChange}
              >
                ${mt.map(t=>J`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
              </ha-select>
            </div>
            <div class="menu-item-with-select">
              <ha-select
                label="${e("menu.select_preset")}"
                .value=${this.selectedPreset}
                @selected=${this.handlePresetChange}
                @opened=${()=>{this.keyboardHandler.disable(),this.suppressClickUntil=Date.now()+St}}
                @closed=${()=>{this.keyboardHandler.enable();const t=this.shadowRoot.querySelector(".chart-container");t?.focus(),this.suppressClickUntil=Date.now()+Pt}}
              >
                ${Object.keys({...ft,...this._customPresets}).map(t=>J`<mwc-list-item .value=${t}>${e(`preset.${t}`)||t}</mwc-list-item>`)}
                <mwc-list-item value="__ADD_NEW_PRESET__"><b>Add new preset...</b></mwc-list-item>
              </ha-select>
            </div>
            <div class="menu-info">
              <div class="info-row">
                <span class="info-label">Entity Prefix:</span>
                <input class="info-value" readonly .value=${this.config.entity_prefix}>
              </div>
              <div class="info-row">
                <span class="info-label">Profile Entity:</span>
                <input class="info-value" readonly .value=${this.config.profiles_select_entity||"none"}>
              </div>
              <div class="info-row">
                <span class="info-label">Profiles:</span>
                <input class="info-value" readonly .value=${this.profileOptions.join(", ")||"none"}>
              </div>
              <div class="info-row">
                <span class="info-label">'Max' Enabled:</span>
                <input class="info-value" readonly .value=${this.config.allow_max_value?"Yes":"No"}>
              </div>
            </div>
            <div class="language-menu">
              <mwc-list-item>${e("menu.language")}</mwc-list-item>
              <mwc-button @click=${()=>this.handleLanguageSelect("en")}>EN</mwc-button>
              <mwc-button @click=${()=>this.handleLanguageSelect("it")}>IT</mwc-button>
            </div>
          </div>
        `:""}
                        <div class="card-content">
                
                          <div class="chart-container">
                            ${this.missingEntities.length>0&&this.initialLoadComplete?J`<div class="loading-overlay anomalous-operation-overlay">
                                  <div>
                                    ${e("ui.anomalous_operation_warning")}
                                  </div>
                                </div>`:t?J`<div class="loading-overlay"><div>${e("ui.loading")}</div></div>`:""}
                            <canvas id="myChart"></canvas>
                            ${this.missingEntities.length>0&&this.initialLoadComplete?J`<div class="anomalous-watermark">${e("ui.anomalous_operation_watermark")}</div>`:""}
            <div id="selection-rect" class="selection-rect"></div>
            <div id="drag-value-display" class="drag-value-display"></div>
          </div>
          <div class="controls">
            <div class="control-group">
              <ha-switch
                .checked=${this.isPaused}
                @change=${this.togglePause}
              ></ha-switch>
              <span>${e("ui.pause")}</span>
            </div>
            <div class="control-group">
              <ha-select
                label="${e("ui.profile")}"
                .value=${this.selectedProfile}
                @selected=${t=>this.profileManager.handleProfileSelection(t)}
                @opened=${()=>{this.keyboardHandler.disable(),this.suppressClickUntil=Date.now()+1e3}}
                @closed=${()=>{this.keyboardHandler.enable();const t=this.shadowRoot.querySelector(".chart-container");t?.focus(),this.suppressClickUntil=Date.now()+500}}
              >
                ${this.profileOptions.map(t=>J`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
                <mwc-list-item value="__ADD_NEW__"><b>Add new profile...</b></mwc-list-item>
              </ha-select>
            </div>
            ${this.hasUnsavedChanges?J`
              <div class="control-group">
                <span class="unsaved-indicator">● ${e("ui.unsaved_changes")}</span>
                <mwc-button outlined @click=${()=>this.profileManager.resetChanges()}>
                  ${e("ui.reset")}
                </mwc-button>
              </div>
            `:""}
          </div>
        </div>
      </ha-card>
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"cronostar-card",name:"CronoStar",description:"Visual hourly schedule editor with drag-and-drop control",preview:!0,documentationURL:"https://github.com/FoliniC/cronostar-card"}),r.info("MAIN",`%c CRONOSTAR %c v${gt} `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");
