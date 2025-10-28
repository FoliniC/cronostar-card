const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:o,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:d}=Object,u=globalThis,g=u.trustedTypes,p=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!r(t,e),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&o(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);a?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=a.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,a=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??_)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==a||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,f?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.1");const w=globalThis,E=w.trustedTypes,P=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,A=`<${C}>`,x=document,D=()=>x.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,k="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,O=/>/g,L=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,H=/"/g,T=/^(?:script|style|textarea|title)$/i,G=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),V=new WeakMap,j=x.createTreeWalker(x,129);function F(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==P?P.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let a,n=2===e?"<svg>":3===e?"<math>":"",r=B;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===B?"!--"===l[1]?r=I:void 0!==l[1]?r=O:void 0!==l[2]?(T.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=L):void 0!==l[3]&&(r=L):r===L?">"===l[0]?(r=a??B,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?L:'"'===l[3]?H:R):r===H||r===R?r=L:r===I||r===O?r=B:(r=L,a=void 0);const d=r===L&&t[e+1].startsWith("/>")?" ":"";n+=r===B?i+A:c>=0?(s.push(o),i.slice(0,c)+b+i.slice(c)+S+d):i+S+(-2===c?e:d)}return[F(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,n=0;const r=t.length-1,o=this.parts,[l,c]=W(t,e);if(this.el=q.createElement(l,i),j.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=j.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(b)){const e=c[n++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?X:"?"===r[1]?Q:"@"===r[1]?tt:Z}),s.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(T.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],D()),j.nextNode(),o.push({type:2,index:++a});s.append(t[e],D())}}}else if(8===s.nodeType)if(s.data===C)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)o.push({type:7,index:a}),t+=S.length-1}a++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===z)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=M(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=K(t,a._$AS(t,e.values),a,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??x).importNode(e,!0);j.currentNode=s;let a=j.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Y(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new et(a,this,t)),this._$AV.push(e),o=i[++r]}n!==o?.index&&(a=j.nextNode(),n++)}return j.currentNode=x,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),M(t)?t===N||null==t||""===t?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==N&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=q.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new q(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new Y(this.O(D()),this.O(D()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}_$AI(t,e=this,i,s){const a=this.strings;let n=!1;if(void 0===a)t=K(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const s=t;let r,o;for(t=a[0],r=0;r<a.length-1;r++)o=K(this,s[i+r],e,r),o===z&&(o=this._$AH[r]),n||=!M(o)||o!==this._$AH[r],o===N?t=N:t!==N&&(t+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(t)}j(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===N?void 0:t}}class Q extends Z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==N)}}class tt extends Z{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??N)===z)return;const i=this._$AH,s=t===N&&i!==N||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==N&&(i===N||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const it=w.litHtmlPolyfillSupport;it?.(q,Y),(w.litHtmlVersions??=[]).push("3.3.1");const st=globalThis;class at extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new Y(e.insertBefore(D(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}at._$litElement$=!0,at.finalized=!0,st.litElementHydrateSupport?.({LitElement:at});const nt=st.litElementPolyfillSupport;nt?.({LitElement:at}),(st.litElementVersions??=[]).push("4.2.1");const rt=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(s,t,i)})`

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

`,ot="2.3.0",lt={thermostat:{title:"CronoStar",entity_prefix:"temperature_hour_",y_axis_label:"Temperature",unit_of_measurement:"°C",min_value:15,max_value:30,step_value:.5,pause_entity:"input_boolean.temperature_schedule_paused",profiles_select_entity:"input_select.temperature_profiles",save_script:"script.save_temperature_profile",load_script:"script.load_temperature_profile"},ev_charging:{title:"CronoStar EV Charging",entity_prefix:"ev_charge_hour_",y_axis_label:"Power",unit_of_measurement:"kW",min_value:0,max_value:11,step_value:.5,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null},generic_kwh:{title:"CronoStar Generic kWh",entity_prefix:"generic_kwh_hour_",y_axis_label:"Energy",unit_of_measurement:"kWh",min_value:0,max_value:7,step_value:.5,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null},generic_temperature:{title:"CronoStar Generic Temperature",entity_prefix:"generic_temp_hour_",y_axis_label:"Temperature",unit_of_measurement:"°C",min_value:0,max_value:40,step_value:.5,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null},generic_switch:{title:"CronoStar Generic Switch",entity_prefix:"generic_switch_hour_",y_axis_label:"State",unit_of_measurement:"",min_value:0,max_value:1,step_value:1,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null,is_switch_preset:!0}},ct={preset:"thermostat",chartjs_path:"/local/chart.min.js",dragdata_path:"/local/chartjs-plugin-dragdata.min.js",hour_base:"auto",logging_enabled:!1,pause_entity:null,profiles_select_entity:null,save_script:null,load_script:null},ht=5,dt=8,ut=10,gt=2,pt=.4,ft=3e3,mt=600,yt=500,_t=1e3,vt="rgba(3, 169, 244, 1)",$t="rgba(3, 169, 244, 0.2)",wt="red",Et="darkred",Pt="#ff5252",bt="#b71c1c";function St(t){const e=t.preset||ct.preset,i=lt[e]||lt.thermostat,s={...ct,...i,...t};if(!s.entity_prefix)throw new Error("Configuration error: entity_prefix is required");return s.hour_base=function(t){if(0===t||1===t)return{value:t,determined:!0};if("string"==typeof t){const e=t.trim().toLowerCase();if("0"===e||"zero"===e||"00"===e)return{value:0,determined:!0};if("1"===e||"one"===e||"01"===e)return{value:1,determined:!0}}return{value:0,determined:!1}}(s.hour_base),s}function Ct(t,e=1){const i=Math.pow(10,e);return Math.round(t*i)/i}function At(t,e,i){return Math.max(e,Math.min(i,t))}function xt(t,e=0){return(t+e).toString().padStart(2,"0")}function Dt(t,e=null){const i=parseFloat(t);return Number.isNaN(i)?e:i}let Mt=!1;const Ut={setEnabled:t=>{Mt=!!t,console.log("Logger.setEnabled called, loggingEnabled is now",Mt)},log:(t,...e)=>{Mt&&console.log(`[${t}]`,...e)},warn:(t,...e)=>{Mt&&console.warn(`[${t}]`,...e)},error:(t,...e)=>console.error(`[${t}]`,...e),state:(...t)=>Ut.log("STATE",...t),load:(...t)=>Ut.log("LOAD",...t),save:(...t)=>Ut.log("SAVE",...t),sel:(...t)=>Ut.log("SEL",...t),memo:(...t)=>Ut.log("MEMO",...t),diff:(...t)=>Ut.log("DIFF",...t),key:(...t)=>Ut.log("KEY",...t),base:(...t)=>Ut.log("BASE",...t)};window.Logger=Ut;class kt{constructor(t){this.card=t,this.scheduleData=new Array(24).fill(null),this.dirtyIndices=new Set,this.isLoadingProfile=!1,this.missingEntities=[],this.missingEntitiesLogged=!1}updateFromHass(t){const e=[];let i=!1;const s=[];for(let a=0;a<24;a++){const n=this.getEntityIdForHour(a),r=t.states[n];let o=null;r?o=Dt(r.state):(s.push(n),o=null!==this.scheduleData[a]?this.scheduleData[a]:this.card.config.min_value),this.scheduleData[a]!==o&&(i=!0),e[a]=o}const a=JSON.stringify(this.missingEntities)!==JSON.stringify(s);if(this.missingEntities=s,this.missingEntities.length>0&&(!this.missingEntitiesLogged||a)){const t=this.groupMissingEntities(this.missingEntities);Ut.warn("STATE",`Missing ${this.missingEntities.length} entities. Using default values. Please create the following input_number entities:\n\n${t}`),this.missingEntitiesLogged=!0}else 0===this.missingEntities.length&&(this.missingEntitiesLogged=!1);return i&&!this.isLoadingProfile?(Ut.state("Schedule data updated from hass. Hours 00-05:",e.slice(0,6)),this.scheduleData=e,!0):!(!i||!this.isLoadingProfile)&&(Ut.state("Update ignored during profile loading"),!1)}getEntityIdForHour(t){return`input_number.${this.card.config.entity_prefix}${xt(t,this.card.hourBase)}`}getHourLabel(t){return`${xt(t,this.card.hourBase)}:00`}updateTemperatureAtHour(t,e){const i=this.getEntityIdForHour(t);Ut.memo(`set_value call -> entity=${i} hour=${this.getHourLabel(t)} value=${e}`),this.card.hass.callService("input_number","set_value",{entity_id:i,value:e}),this.dirtyIndices.add(t),this.card.hasUnsavedChanges=!0}async waitForEntityNumericState(t,e,i=3e3,s=.001){const a=Date.now();return new Promise((n,r)=>{const o=()=>{const l=this.card.hass?.states?.[t]?.state,c=Dt(l);return null!==c&&Math.abs(c-e)<=s?(Ut.memo(`State confirmed -> entity=${t}, expected=${e}, current=${c}`),void n()):Date.now()-a>i?(Ut.warn("MEMO",`Timeout waiting for ${t}. Expected: ${e}, current: ${c}`),void r(new Error(`Timeout waiting for ${t}`))):void setTimeout(o,100)};o()})}async ensureValuesApplied(){const t=[];Ut.memo("Ensuring values applied. Dirty indices:",Array.from(this.dirtyIndices));for(const e of Array.from(this.dirtyIndices)){const i=this.getEntityIdForHour(e),s=this.scheduleData[e];null!==s&&(Ut.memo(`Waiting for entity sync -> hour=${this.getHourLabel(e)}, entity=${i}, expected=${s}`),t.push(this.waitForEntityNumericState(i,s,4e3,.001).catch(t=>Ut.warn("MEMO",`Wait failed for ${i}:`,t))))}t.length>0&&await Promise.all(t),this.dirtyIndices.clear()}logPersistedValues(t,e){e.forEach(e=>{const i=this.getEntityIdForHour(e),s=this.getHourLabel(e),a=this.scheduleData[e];Ut.memo(`${t} -> hour=${s}, entity=${i}, value=${a}`)})}groupMissingEntities(t){const e=[],i=this.card.config.y_axis_label||"Value",s=this.card.config.unit_of_measurement||"";return t.forEach(t=>{const a=t.match(/^(input_number\.(.+?))_(\d{1,2})$/);if(a){a[1];const t=a[2],n=parseInt(a[3],10).toString().padStart(2,"0"),r=`\n${`${t}_${n}`}:\n  name: ${i} at ${n}\n  min: ${this.card.config.min_value}\n  max: ${this.card.config.max_value}\n  step: ${this.card.config.step_value}\n  initial: ${this.card.config.min_value}\n  unit_of_measurement: "${s}"\n`;e.push(r)}else e.push(`- ${t} (unrecognized format)`)}),e.join("\n\n")}clearDirty(){this.dirtyIndices.clear()}getData(){return[...this.scheduleData]}setData(t){this.scheduleData=[...t]}}class Bt{constructor(t){this.card=t,this.lastLoadedProfile=""}async waitForEntityState(t,e,i=ft){const s=Date.now();return new Promise((a,n)=>{const r=()=>{const o=this.card.hass?.states?.[t]?.state;o!==e?Date.now()-s>i?n(new Error(`Timeout waiting for ${t} to become '${e}', current: '${o}'`)):setTimeout(r,100):a()};r()})}async saveProfile(t=this.lastLoadedProfile){if(!t)throw Ut.warn("SAVE","No profile specified"),new Error("No profile specified for saving");const e=this.card.config.save_script.startsWith("script.")?this.card.config.save_script.substring(7):this.card.config.save_script;Ut.save(`Invoking script '${e}' for profile '${t}'`),Ut.save(`Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}`);try{await this.card.hass.callService("script",e,{profile_name:t,entity_prefix:this.card.config.entity_prefix,hour_base:this.card.hourBase,payload_version:2}),this.card.hasUnsavedChanges=!1,this.lastLoadedProfile=t,Ut.save(`Script '${e}' completed for profile '${t}'`)}catch(i){throw Ut.error("SAVE",`Error calling save script '${e}':`,i),alert(`Error saving profile '${t}'. Check console for details.`),i}}async loadProfile(t){this.card.stateManager.isLoadingProfile=!0;const e=[...this.card.stateManager.scheduleData];Ut.load("PRE-load schedule data (00..05):",e.slice(0,6));const i=this.card.config.load_script.startsWith("script.")?this.card.config.load_script.substring(7):this.card.config.load_script;Ut.load(`Invoking script '${i}' for profile '${t}'`),Ut.load(`Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}`);try{await this.card.hass.callService("script",i,{profile_name:t,entity_prefix:this.card.config.entity_prefix,hour_base:this.card.hourBase,payload_version:2}),Ut.load("Script completed, waiting for state propagation..."),await new Promise(t=>setTimeout(t,mt));const s=[];for(let t=0;t<24;t++){const e=this.card.stateManager.getEntityIdForHour(t),i=this.card.hass.states[e];let a=i?Dt(i.state):null;s[t]=a}Ut.load("POST-load values read (00..05):",s.slice(0,6)),Ut.load("POST-load values read (10..15):",s.slice(10,16));for(let t=0;t<24;t++)e[t]!==s[t]&&Ut.diff(`idx=${t} hour=${this.card.stateManager.getHourLabel(t)}: ${e[t]} -> ${s[t]}`);this.card.stateManager.setData(s),this.card.chartManager&&this.card.chartManager.isInitialized()&&(this.card.chartManager.updateData(s),Ut.load("Chart updated with new data")),this.card.hasUnsavedChanges=!1,this.lastLoadedProfile=t,Ut.load(`Profile '${t}' loaded completely`)}catch(e){throw Ut.error("LOAD",`Error calling load script '${i}':`,e),alert(`Error loading profile '${t}'. Check console for details.`),e}finally{this.card.stateManager.isLoadingProfile=!1}}async handleProfileSelection(t){this.card.suppressClickUntil=Date.now()+_t+500,this.card.selectionManager&&this.card.selectionManager.snapshotSelection();const e=t?.target?.value||t?.detail?.value||"";if(!e||e===this.card.selectedProfile)return;const i=this.lastLoadedProfile||this.card.selectedProfile;if(this.card.hasUnsavedChanges&&i)try{Ut.save(`Auto-saving previous profile '${i}' before switching`),await this.card.stateManager.ensureValuesApplied(),this.card.stateManager.logPersistedValues(`auto-save profile '${i}'`,Array.from(this.card.stateManager.dirtyIndices)),await this.saveProfile(i),Ut.save(`Auto-save of '${i}' completed`)}catch(t){Ut.error("SAVE","Error during auto-save:",t)}this.card.selectedProfile=e;try{await this.card.hass.callService("input_select","select_option",{entity_id:this.card.config.profiles_select_entity,option:e}),await this.waitForEntityState(this.card.config.profiles_select_entity,e,ft)}catch(t){Ut.warn("LOAD","select_option or wait failed:",t)}try{await this.loadProfile(e),this.card.selectionManager&&this.card.selectionManager.restoreSelectionFromSnapshot(),this.card.suppressClickUntil=Date.now()+yt}catch(t){Ut.error("LOAD","Error during auto-load:",t)}}async resetChanges(){const t=this.lastLoadedProfile||this.card.selectedProfile;if(t){this.card.selectionManager&&this.card.selectionManager.snapshotSelection();try{await this.loadProfile(t),this.card.selectionManager&&this.card.selectionManager.restoreSelectionFromSnapshot()}catch(t){Ut.error("LOAD","Error while reloading profile:",t)}}else Ut.warn("LOAD","No profile to reload")}}class It{constructor(t){this.card=t,this.selectedPoint=null,this.selectedPoints=[],this.selectionSnapshot=null}selectAll(){const t=Array.from({length:24},(t,e)=>e);this.selectIndices(t,!1),this.card.chartManager?.updatePointStyling(this.selectedPoint,this.selectedPoints),this.card.chartManager?.update()}selectIndices(t,e=!0){const i=(s=t,[...new Set(s)]).filter(t=>t>=0&&t<24);var s;this.selectedPoints=i,e&&null!==this.selectedPoint&&this.selectedPoints.includes(this.selectedPoint)||(this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null),this.logSelection("selectIndices")}toggleIndexSelection(t){const e=new Set(this.selectedPoints);e.has(t)?e.delete(t):e.add(t),this.selectedPoints=Array.from(e),null!==this.selectedPoint&&this.selectedPoints.includes(this.selectedPoint)||(this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null),this.logSelection("toggleIndexSelection")}clearSelection(){this.selectedPoints=[],this.selectedPoint=null,Ut.sel("Selection cleared")}snapshotSelection(){Array.isArray(this.selectedPoints)&&this.selectedPoints.length>0?(this.selectionSnapshot={points:[...this.selectedPoints],anchor:this.selectedPoint},this.logSelection("snapshot before profile change")):(this.selectionSnapshot=null,Ut.sel("Snapshot: no active selection"))}restoreSelectionFromSnapshot(){if(!this.selectionSnapshot)return void Ut.sel("Restore: no snapshot to restore");const t=Array.isArray(this.selectionSnapshot.points)?[...this.selectionSnapshot.points]:[];this.selectedPoints=t.filter(t=>t>=0&&t<24),null!==this.selectionSnapshot.anchor&&t.includes(this.selectionSnapshot.anchor)?this.selectedPoint=this.selectionSnapshot.anchor:this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null,this.card.chartManager&&this.card.chartManager.updatePointStyling(this.selectedPoint,this.selectedPoints),this.logSelection("restore selection after profile change")}logSelection(t=""){const e=null!==this.selectedPoint?this.card.stateManager.getHourLabel(this.selectedPoint):"n/a";if(Ut.sel(`${t} - anchor=${this.selectedPoint} (${e}) points=${JSON.stringify(this.selectedPoints)}`),this.card.stateManager){const t=this.card.stateManager.scheduleData;this.selectedPoints.forEach(e=>{const i=this.card.stateManager.getHourLabel(e),s=this.card.stateManager.getEntityIdForHour(e),a=t[e],n=this.card.hass?.states?.[s],r=n?n.state:void 0;Ut.sel(`  idx=${e}, hour=${i}, entity=${s}, chartVal=${a}, entityState=${r}`)})}}getActiveIndices(){return Array.isArray(this.selectedPoints)&&this.selectedPoints.length>0?[...this.selectedPoints]:null!==this.selectedPoint?[this.selectedPoint]:[]}isSelected(t){return this.selectedPoints.includes(t)}isAnchor(t){return this.selectedPoint===t}setAnchor(t){this.selectedPoints.includes(t)&&(this.selectedPoint=t)}getAnchor(){return this.selectedPoint}getSelectedPoints(){return[...this.selectedPoints]}}let Ot=!1;class Lt{constructor(t){this.card=t,this.chart=null,this.chartInitialized=!1,this.dragStartValues=null,this.dragAnchorIndex=null}async loadPlugins(){if(Ut.log("DEBUG","[loadPlugins] called"),Ot)return Ut.log("DEBUG","[loadPlugins] Plugins already loaded"),!0;try{window.Chart||(Ut.log("DEBUG","[loadPlugins] Chart.js not loaded, invoking loadScript"),await(t=this.card.config.chartjs_path,Ut.log("DEBUG",`[loadScript] Loading script from ${t}`),new Promise((e,i)=>{if(document.querySelector(`script[src="${t}"]`))return Ut.log("DEBUG",`[loadScript] Script already in DOM: ${t}`),void e();const s=document.createElement("script");s.src=t,s.onload=()=>{Ut.log("DEBUG",`[loadScript] Script loaded: ${t}`),e()},s.onerror=()=>{Ut.error("DEBUG",`[loadScript] Error loading script: ${t}`),i(new Error(`Failed to load script: ${t}`))},document.head.appendChild(s)})));let e=window.ChartJSdragDataPlugin;if(!e){Ut.log("DEBUG","[loadPlugins] dragDataPlugin not found, trying import");try{const t=await import(this.card.config.dragdata_path);e=t.default||t,Ut.log("DEBUG","[loadPlugins] dragDataModule imported")}catch(t){Ut.error("DEBUG","[loadPlugins] dragdata import failed",t),e=window.ChartJSdragDataPlugin||window.ChartDataDrag||void 0}}if(window.Chart&&e)return Ut.log("DEBUG","[loadPlugins] Registering dragDataPlugin"),window.Chart.register(e),Ot=!0,Ut.log("CHART","chartjs-plugin-dragdata registered"),!0;if(window.Chart)return Ot=!0,Ut.warn("CHART","dragdata plugin not found; proceeding"),Ut.log("DEBUG","[loadPlugins] dragDataPlugin still not found"),!0;throw Ut.error("CHART","[loadPlugins] Chart.js could not be resolved"),new Error("Chart.js could not be resolved")}catch(t){return Ut.error("CHART","Error loading chart libraries:",t),!1}var t}async initChart(t){Ut.log("DEBUG","[initChart] called");const e=await this.loadPlugins();if(Ut.log("DEBUG",`[initChart] Plugins loaded result: ${e}`),!e)return!1;const i=t.getContext("2d");if(Ut.log("DEBUG",`[initChart] Got canvas context: ${!!i}`),!i)return!1;const s=this.card.config.y_axis_label?`${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`:((t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i))("ui.temperature_label");return Ut.log("DEBUG",`[initChart] yAxisLabel: ${s}`),Ut.log("DEBUG",`[initChart] stateManager scheduleData len: ${this.card.stateManager.scheduleData?.length}`),this.chart=new window.Chart(i,{type:"line",data:{labels:Array.from({length:24},(t,e)=>`${e.toString().padStart(2,"0")}:00`),datasets:[{label:s,data:this.card.stateManager.scheduleData,backgroundColor:$t,borderColor:vt,borderWidth:gt,pointRadius:ht,pointHoverRadius:dt,pointHitRadius:ut,fill:!0,tension:pt}]},options:this.getChartOptions()}),Ut.log("DEBUG","[initChart] Chart instance created"),this.chartInitialized=!0,this.updatePointStyling(this.card.selectionManager?.selectedPoint,this.card.selectionManager?.selectedPoints),Ut.log("DEBUG","[initChart] Point styling updated"),this.chart.update(),Ut.log("DEBUG","[initChart] chart.update() called"),this.updateChartLabels(),Ut.log("DEBUG","[initChart] updateChartLabels() called"),Ut.log("CHART","Chart initialized successfully"),!0}getChartOptions(){Ut.log("DEBUG","[getChartOptions] called");const t=(t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i),e=this.card.config.y_axis_label?`${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`:t("ui.temperature_label");Ut.log("DEBUG",`[getChartOptions] yAxisLabel: ${e}`),Ut.log("CHART",`is_switch_preset: ${this.card.config.is_switch_preset}`);const i={beginAtZero:!1,min:this.card.config.min_value,max:this.card.config.max_value,title:{display:!0,text:e}};return this.card.config.is_switch_preset&&(Ut.log("DEBUG","[getChartOptions] Configuring custom Y-axis ticks for switch preset"),i.beginAtZero=!0,i.ticks={stepSize:1,callback:function(e,i,s){return Ut.log("DEBUG",`[Y-Tick callback] value=${e} index=${i} len=${s.length}`),Ut.log("DEBUG",`[Y-Tick callback] ticks: ${JSON.stringify(s)}`),Ut.log("DEBUG","[Y-Tick callback] localize is: "+typeof t),0===e?(Ut.log("DEBUG","[Y-Tick callback] Returning OFF"),t("ui.state_off")):1===e?(Ut.log("DEBUG","[Y-Tick callback] Returning ON"),t("ui.state_on")):(Ut.log("DEBUG",`[Y-Tick callback] Returning empty for value=${e}`),"")}}),{responsive:!0,maintainAspectRatio:!1,events:["mousemove","mouseout","click","touchstart","touchmove","touchend","pointermove","pointerdown","pointerup","mousedown","mouseup"],scales:{y:i,x:{title:{display:!0,text:t("ui.time_label")}}},onClick:t=>this.handleChartClick(t),plugins:{dragData:this.getDragDataOptions(),tooltip:{enabled:!0}}}}recreateChartOptions(){if(Ut.log("DEBUG","[recreateChartOptions] called"),!this.chartInitialized||!this.chart)return Ut.log("DEBUG","[recreateChartOptions] Chart not initialized"),!1;Ut.log("DEBUG","[recreateChartOptions] Destroying and recreating chart");const t=[...this.chart.data.datasets[0].data],e=this.card.selectionManager?.selectedPoint,i=this.card.selectionManager?.selectedPoints,s=this.card.shadowRoot?.getElementById("myChart");return s?(this.destroy(),this.initChart(s).then(()=>{Ut.log("DEBUG","[recreateChartOptions] Chart recreated"),this.updateData(t),(null!==e||i&&i.length>0)&&this.updatePointStyling(e,i)}),!0):(Ut.error("DEBUG","[recreateChartOptions] Canvas not found"),!1)}getDragDataOptions(){return Ut.log("DEBUG","[getDragDataOptions] called"),{round:this.card.config.step_value,dragX:!1,onDragStart:(t,e,i,s)=>{if(Ut.log("DEBUG",`[onDragStart] index=${i} value=${s}`),this.card.pointerHandler?.isSelecting)return Ut.log("DEBUG","[onDragStart] pointerHandler is selecting, abort"),!1;const a=this.card.selectionManager;if(!a)return Ut.log("DEBUG","[onDragStart] No selectionManager"),!1;a.isSelected(i)?a.setAnchor(i):a.selectIndices([i],!1),this.dragStartValues={};const n=this.chart.data.datasets[0].data;return a.getSelectedPoints().forEach(t=>{this.dragStartValues[t]=n[t]??this.card.stateManager.scheduleData[t]}),this.dragAnchorIndex=i,this.updatePointStyling(a.selectedPoint,a.selectedPoints),a.logSelection("onDragStart"),!0},onDrag:(t,e,i,s)=>{if(Ut.log("DEBUG",`[onDrag] index=${i} value=${s}`),!this.dragStartValues||null===this.dragAnchorIndex)return;const a=s-this.dragStartValues[this.dragAnchorIndex],n=this.chart.data.datasets[0],r=this.card.selectionManager;r.getSelectedPoints().forEach(t=>{let e=this.dragStartValues[t]+a;e=At(e,this.card.config.min_value,this.card.config.max_value),e=Ct(e,this.card.config.is_switch_preset?0:1),n.data[t]=e}),this.chart.update("none"),this.showDragValueDisplay(r.getSelectedPoints(),n.data)},onDragEnd:(t,e,i,s)=>{Ut.log("DEBUG",`[onDragEnd] index=${i} value=${s}`);const a=this.card.shadowRoot?.getElementById("myChart");a&&(a.style.cursor="default");const n=this.chart.data.datasets[0],r=this.card.selectionManager,o=this.card.stateManager,l=r.getActiveIndices(),c=[...o.scheduleData];l.forEach(t=>{let e=n.data[t];e=Ct(e,this.card.config.is_switch_preset?0:1),c[t]=e}),o.setData(c),o.logPersistedValues("dragEnd",l),l.forEach(t=>{o.updateTemperatureAtHour(t,c[t])}),r.setAnchor(i),this.updatePointStyling(r.selectedPoint,r.selectedPoints),this.hideDragValueDisplay(),this.dragStartValues=null,this.dragAnchorIndex=null}}}handleChartClick(t){if(Ut.log("DEBUG","[handleChartClick] called"),Date.now()<this.card.suppressClickUntil)return void Ut.log("DEBUG","[handleChartClick] Click suppressed");const e=this.chart.getElementsAtEventForMode(t,"nearest",{intersect:!0},!0),i=!!(this.card.keyboardHandler?.ctrlDown||this.card.keyboardHandler?.metaDown||t.ctrlKey||t.metaKey),s=this.card.selectionManager;if(Ut.log("DEBUG",`[handleChartClick] Found points: ${e?.length}`),e.length){const t=e[0].index;Ut.log("DEBUG",`[handleChartClick] Clicked index: ${t}`),i?s.toggleIndexSelection(t):s.selectIndices([t],!0)}else i||s.clearSelection();this.updatePointStyling(s.selectedPoint,s.selectedPoints),this.chartInitialized&&this.chart.update(),s.logSelection("onClick")}updatePointStyling(t,e=[]){if(Ut.log("DEBUG","[updatePointStyling] called"),!this.chartInitialized||!this.chart?.data?.datasets?.length)return void Ut.log("DEBUG","[updatePointStyling] Not initialized");const i=this.chart.data.datasets[0],s=Array.isArray(i.data)?i.data.length:24;i.pointRadius=Array(s).fill(ht),i.pointBackgroundColor=Array(s).fill(vt),i.pointBorderColor=Array(s).fill(vt),i.pointBorderWidth=Array(s).fill(gt),Array.isArray(e)&&e.length>0&&e.forEach(t=>{t>=0&&t<s&&(i.pointRadius[t]=8,i.pointBackgroundColor[t]=wt,i.pointBorderColor[t]=Et,i.pointBorderWidth[t]=2,Ut.log("DEBUG",`[updatePointStyling] Styled selected point idx=${t}`))}),null!==t&&t>=0&&t<s&&(i.pointRadius[t]=9,i.pointBorderWidth[t]=3,i.pointBackgroundColor[t]=Pt,i.pointBorderColor[t]=bt,Ut.log("DEBUG",`[updatePointStyling] Styled anchor point idx=${t}`))}showDragValueDisplay(t,e){Ut.log("DEBUG","[showDragValueDisplay] called");const i=this.card.shadowRoot?.getElementById("drag-value-display");if(!i||0===t.length)return void Ut.log("DEBUG","[showDragValueDisplay] No display element or indices empty");const s=Math.min(...t),a=e[s];i.style.display="block",i.textContent=((t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i))("ui.value_display",{"{value}":a,"{unit}":this.card.config.unit_of_measurement});const n=this.chart.getDatasetMeta(0).data[s];if(n){const{x:t,y:e}=n.tooltipPosition(),{x:s,y:a}=this.getContainerRelativePointCoords(t,e);i.style.left=`${s+10}px`,i.style.top=a-30+"px",Ut.log("DEBUG",`[showDragValueDisplay] Display position: left=${s+10} top=${a-30}`)}}hideDragValueDisplay(){Ut.log("DEBUG","[hideDragValueDisplay] called");const t=this.card.shadowRoot?.getElementById("drag-value-display");t&&(t.style.display="none",Ut.log("DEBUG","[hideDragValueDisplay] Hiding display"))}getContainerRelativePointCoords(t,e){Ut.log("DEBUG","[getContainerRelativePointCoords] called");const i=this.card.shadowRoot?.querySelector(".chart-container"),s=this.card.shadowRoot?.getElementById("myChart");if(!i||!s)return Ut.log("DEBUG","[getContainerRelativePointCoords] container or canvas not found"),{x:0,y:0};const a=i.getBoundingClientRect(),n=s.getBoundingClientRect(),r=n.left-a.left,o=n.top-a.top;return Ut.log("DEBUG",`[getContainerRelativePointCoords] OffsetX=${r} OffsetY=${o}`),{x:t+r,y:e+o}}updateData(t){Ut.log("DEBUG","[updateData] called"),this.chartInitialized&&this.chart?(this.chart.data.datasets[0].data=[...t],Ut.log("DEBUG",`[updateData] Data updated. Length: ${t.length}`),this.updatePointStyling(this.card.selectionManager?.selectedPoint,this.card.selectionManager?.selectedPoints),Ut.log("DEBUG","[updateData] Point styling updated"),this.chart.update(),Ut.log("DEBUG","[updateData] chart.update() called")):Ut.log("DEBUG","[updateData] Chart not initialized")}destroy(){Ut.log("DEBUG","[destroy] called"),this.chart&&(this.chart.destroy(),this.chart=null,this.chartInitialized=!1,Ut.log("DEBUG","[destroy] Chart destroyed"))}isInitialized(){return Ut.log("DEBUG","[isInitialized] called"),this.chartInitialized&&null!==this.chart}update(){Ut.log("DEBUG","[update] called"),this.chartInitialized&&this.chart&&(this.chart.update(),Ut.log("DEBUG","[update] chart.update() called"))}getChart(){return Ut.log("DEBUG","[getChart] called"),this.chart}updateChartLabels(){if(Ut.log("DEBUG","[updateChartLabels] called"),!this.chart)return void Ut.log("CHART","updateChartLabels: Chart not initialized");Ut.log("CHART","updateChartLabels called");const t=(t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i),e=this.card.config.y_axis_label?`${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`:t("ui.temperature_label"),i=t("ui.time_label");Ut.log("CHART",`New labels: ${e}, ${i}`),this.chart.data.datasets[0].label=e,this.chart.options.scales.y.title.text=e,this.chart.options.scales.x.title.text=i,Ut.log("CHART","Calling chart.update()"),this.chart.update()}}class Rt{constructor(t){this.card=t,this.ctrlDown=!1,this.metaDown=!1,this.enabled=!0,this.handleKeydown=this.handleKeydown.bind(this),this.handleKeyup=this.handleKeyup.bind(this)}enable(){this.enabled=!0}disable(){this.enabled=!1}handleKeydown(t){if(!this.enabled)return;if("Control"===t.key)return void(this.ctrlDown=!0);if("Meta"===t.key)return void(this.metaDown=!0);if((this.ctrlDown||this.metaDown)&&"a"===t.key)return t.preventDefault(),void this.card.selectionManager.selectAll();if("Escape"===t.key)return void this.handleEscape();const e=this.card.selectionManager.getActiveIndices();0!==e.length&&("ArrowLeft"!==t.key&&"ArrowRight"!==t.key?"ArrowUp"!==t.key&&"ArrowDown"!==t.key||this.handleArrowUpDown(t,e):this.handleArrowLeftRight(t,e))}handleKeyup(t){"Control"!==t.key?"Meta"!==t.key?"ArrowUp"!==t.key&&"ArrowDown"!==t.key&&"ArrowLeft"!==t.key&&"ArrowRight"!==t.key||this.card.chartManager?.hideDragValueDisplay():this.metaDown=!1:this.ctrlDown=!1}handleEscape(){this.card.selectionManager.clearSelection(),this.card.chartManager?.updatePointStyling(null,[]),this.card.chartManager?.update()}handleArrowLeftRight(t,e){t.preventDefault();const i=this.card.stateManager,s=this.card.chartManager,a=s.chart.data.datasets[0];let n;n="ArrowLeft"===t.key?Math.min(...e):Math.max(...e);const r=Ct(a.data[n]??i.scheduleData[n],1);Ut.key(`${t.key} -> align to index: ${n} (${i.getHourLabel(n)}) value=${r} indices=${JSON.stringify(e)}`);const o=[...i.scheduleData];e.forEach(t=>{o[t]=r,a.data[t]=r,i.updateTemperatureAtHour(t,r)}),i.setData(o),s.updatePointStyling(this.card.selectionManager.selectedPoint,this.card.selectionManager.selectedPoints),s.update(),s.showDragValueDisplay(e,a.data)}handleArrowUpDown(t,e){t.preventDefault();const i="ArrowUp"===t.key?this.card.config.step_value:-this.card.config.step_value,s=this.card.selectionManager,a=this.card.stateManager,n=this.card.chartManager,r=n.chart.data.datasets[0],o=[...a.scheduleData];Ut.key(`${t.key} -> delta=${i} indices=${JSON.stringify(e)}`),e.forEach(t=>{let e=(r.data[t]??a.scheduleData[t])+i;e=At(e,this.card.config.min_value,this.card.config.max_value),e=Ct(e,1),r.data[t]=e,o[t]=e,a.updateTemperatureAtHour(t,e)}),a.setData(o),n.updatePointStyling(s.selectedPoint,s.selectedPoints),n.update(),n.showDragValueDisplay(e,r.data)}attachListeners(t){t.addEventListener("keydown",this.handleKeydown),t.addEventListener("keyup",this.handleKeyup)}detachListeners(t){t.removeEventListener("keydown",this.handleKeydown),t.removeEventListener("keyup",this.handleKeyup)}}class Ht{constructor(t){this.card=t,this.isSelecting=!1,this.selStartPx=null,this.selEndPx=null,this.activePointerId=null,this.selectionAdditive=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onPointerCancel=this.onPointerCancel.bind(this)}getContainerRelativeCoords(t){const e=this.card.shadowRoot?.querySelector(".chart-container");if(!e)return{x:0,y:0};const i=e.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}}showSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");t&&(t.style.display="block",this.updateSelectionOverlay())}hideSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");t&&(t.style.display="none")}updateSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");if(!t||!this.selStartPx||!this.selEndPx)return;const e=Math.min(this.selStartPx.x,this.selEndPx.x),i=Math.min(this.selStartPx.y,this.selEndPx.y),s=Math.max(this.selStartPx.x,this.selEndPx.x),a=Math.max(this.selStartPx.y,this.selEndPx.y);t.style.left=`${e}px`,t.style.top=`${i}px`,t.style.width=`${Math.max(0,s-e)}px`,t.style.height=`${Math.max(0,a-i)}px`}getIndicesInSelectionRect(){const t=this.card.chartManager;if(!t?.chart||!this.selStartPx||!this.selEndPx)return[];const e=t.chart.getDatasetMeta(0);if(!e?.data)return[];const i=this.card.shadowRoot?.querySelector(".chart-container"),s=this.card.shadowRoot?.getElementById("myChart");if(!i||!s)return[];const a=i.getBoundingClientRect(),n=s.getBoundingClientRect(),r=n.left-a.left,o=n.top-a.top,l=Math.min(this.selStartPx.x,this.selEndPx.x),c=Math.min(this.selStartPx.y,this.selEndPx.y),h=Math.max(this.selStartPx.x,this.selEndPx.x),d=Math.max(this.selStartPx.y,this.selEndPx.y),u=[];return e.data.forEach((t,e)=>{const i="function"==typeof t.tooltipPosition?t.tooltipPosition():{x:t.x,y:t.y},s=i.x+r,a=i.y+o;s>=l&&s<=h&&a>=c&&a<=d&&u.push(e)}),Ut.sel(`Area selection: nodes in rectangle -> ${JSON.stringify(u)}`),u}onPointerDown(t){if("mouse"===t.pointerType&&0!==t.button)return;const e=this.card.chartManager,i=(e?.chart?.getElementsAtEventForMode?.(t,"nearest",{intersect:!0},!0)||[]).length>0;if(!(!!t.shiftKey||!i))return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.isSelecting=!0,this.activePointerId=t.pointerId,this.selectionAdditive=!!(this.card.keyboardHandler?.ctrlDown||this.card.keyboardHandler?.metaDown||t.ctrlKey||t.metaKey);const s=this.card.shadowRoot?.getElementById("myChart");try{s?.setPointerCapture(t.pointerId)}catch(t){}const{x:a,y:n}=this.getContainerRelativeCoords(t);this.selStartPx={x:a,y:n},this.selEndPx={x:a,y:n},this.showSelectionOverlay(),this.card.suppressClickUntil=Date.now()+yt}onPointerMove(t){if(!this.isSelecting)return;if(null!==this.activePointerId&&t.pointerId!==this.activePointerId)return;t.preventDefault();const e=this.getContainerRelativeCoords(t);this.selEndPx=e,this.updateSelectionOverlay()}onPointerUp(t){if(!this.isSelecting)return;if(null!==this.activePointerId&&t.pointerId!==this.activePointerId)return;this.isSelecting=!1,this.activePointerId=null;const e=this.card.shadowRoot?.getElementById("myChart");try{e?.releasePointerCapture(t.pointerId)}catch(t){}this.hideSelectionOverlay();const i=this.getIndicesInSelectionRect(),s=this.card.selectionManager,a=this.card.chartManager;if(i.length>0)if(this.selectionAdditive){const t=[...s.getSelectedPoints()];i.forEach(e=>{t.includes(e)||t.push(e)}),s.selectIndices(t,!0)}else s.selectIndices(i,!0);else s.clearSelection();a.updatePointStyling(s.selectedPoint,s.selectedPoints),a.update(),s.logSelection("area selection completed"),this.card.suppressClickUntil=Date.now()+yt}onPointerCancel(){this.isSelecting&&(this.isSelecting=!1,this.activePointerId=null,this.hideSelectionOverlay(),this.card.suppressClickUntil=Date.now()+300)}attachListeners(t){t.addEventListener("pointerdown",this.onPointerDown,{passive:!1,capture:!0}),window.addEventListener("pointermove",this.onPointerMove,!0),window.addEventListener("pointerup",this.onPointerUp,!0),window.addEventListener("pointercancel",this.onPointerCancel,!0)}detachListeners(t){t.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),window.removeEventListener("pointermove",this.onPointerMove,!0),window.removeEventListener("pointerup",this.onPointerUp,!0),window.removeEventListener("pointercancel",this.onPointerCancel,!0)}}const Tt={en:{"ui.title":"CronoStar Schedule","ui.loading":"Loading data...","ui.pause":"Pause","ui.profile":"Profile","ui.unsaved_changes":"Unsaved changes","ui.reset":"Reset","ui.value_display":"Value: {value}{unit}","ui.temperature_label":"Temperature (°C)","ui.time_label":"Time of Day","ui.missing_entities_message":"Missing required entities. Please create the following input_number entities:","ui.anomalous_operation_warning":"Anomalous operation: Some entities are missing. Activate logging and check the console for details.","ui.anomalous_operation_watermark":"ANOMALOUS OPERATION - MISSING ENTITIES","ui.state_off":"Off","ui.state_on":"On","menu.select_all":"Select All","menu.help":"Help","menu.language":"Language","menu.enable_logging":"Enable Logging","menu.select_preset":"Select Preset","preset.thermostat":"Thermostat","preset.ev_charging":"EV Charging","preset.generic_kwh":"Generic kWh","preset.generic_temperature":"Generic Temperature","preset.generic_switch":"Generic Switch","help.title":"CronoStar Help","help.text":"Drag points on the graph to change the temperature. Hold Shift to select multiple points. Use Ctrl+A to select all points."},it:{"ui.title":"Programma CronoStar","ui.loading":"Caricamento dati...","ui.pause":"Pausa","ui.profile":"Profilo","ui.unsaved_changes":"Modifiche non salvate","ui.reset":"Reset","ui.value_display":"Valore: {value}{unit}","ui.temperature_label":"Temperatura (°C)","ui.time_label":"Ora del Giorno","ui.missing_entities_message":"Entità richieste mancanti. Si prega di creare le seguenti entità input_number:","ui.anomalous_operation_warning":"Funzionamento anomalo: Alcune entità sono mancanti. Attiva il logging e controlla la console per i dettagli.","ui.anomalous_operation_watermark":"FUNZIONAMENTO ANOMALO - ENTITÀ MANCANTI","ui.state_off":"Spento","ui.state_on":"Acceso","menu.select_all":"Seleziona tutto","menu.help":"Aiuto","menu.language":"Lingua","menu.enable_logging":"Abilita Log","menu.select_preset":"Seleziona Preset","preset.thermostat":"Cronotermostato","preset.ev_charging":"Ricarica EV","preset.generic_kwh":"kWh Generico","preset.generic_temperature":"Temperatura Generica","preset.generic_switch":"Interruttore Generico","help.title":"Aiuto CronoStar","help.text":"Trascina i punti sul grafico per cambiare la temperatura. Tieni premuto Shift per selezionare più punti. Usa Ctrl+A per selezionare tutti i punti."}};class Gt{localize(t,e,i,s){let a=Tt[t]?.[e]||Tt.en[e]||e;if(i&&"object"==typeof i)for(const t in i)a=a.replace(new RegExp(t,"g"),i[t]);else i&&void 0!==s&&(a=a.replace(i,s));return a}}customElements.define("cronostar-card",class extends at{static get properties(){return{hass:{type:Object},config:{type:Object},isPaused:{type:Boolean},selectedProfile:{type:String},profileOptions:{type:Array},hasUnsavedChanges:{type:Boolean},isMenuOpen:{type:Boolean},language:{type:String},loggingEnabled:{type:Boolean},selectedPreset:{type:String},missingEntities:{type:Array},initialLoadComplete:{type:Boolean}}}static get styles(){return rt}constructor(){super(),this.config=null,this.hourBase=0,this.hourBaseDetermined=!1,this.isPaused=!1,this.selectedProfile="",this.profileOptions=[],this.hasUnsavedChanges=!1,this.suppressClickUntil=0,this.isMenuOpen=!1,this.language="it",this.loggingEnabled=!1,this.selectedPreset="thermostat",this.missingEntities=[],this.initialLoadComplete=!1,this.localizationManager=new Gt,this.stateManager=new kt(this),this.profileManager=new Bt(this),this.selectionManager=new It(this),this.chartManager=new Lt(this),this.keyboardHandler=new Rt(this),this.pointerHandler=new Ht(this)}setConfig(t){Ut.log("CONFIG","setConfig: config received",t),this.config=St(t),Ut.log("CONFIG","setConfig: validated config",this.config),this.loggingEnabled=this.config.logging_enabled,Ut.setEnabled(this.loggingEnabled),Ut.log("CONFIG","setConfig: Logger.setEnabled called with",this.loggingEnabled),this.selectedPreset=this.config.preset;const e=this.config.hour_base;"object"==typeof e&&(this.hourBase=e.value,this.hourBaseDetermined=e.determined)}static getStubConfig(){return{...ct}}detectHourBase(t){if(this.hourBaseDetermined)return;const e=this.config.entity_prefix;let i=0,s=0;for(let s=0;s<24;s++){const a=`input_number.${e}${s.toString().padStart(2,"0")}`;void 0!==t.states[a]&&i++}for(let i=1;i<=24;i++){const a=`input_number.${e}${i.toString().padStart(2,"0")}`;void 0!==t.states[a]&&s++}this.hourBase=s>i?1:0,this.hourBaseDetermined=!0,Ut.base(`Hour base detection -> 0-based: ${i}, 1-based: ${s}. Selected: ${this.hourBase} (${0===this.hourBase?"00-23":"01-24"})`)}set hass(t){if(this._hass=t,this.config&&this.config.entity_prefix){this.detectHourBase(t);const e=this.stateManager.updateFromHass(t);this.missingEntities=this.stateManager.missingEntities,e&&this.chartManager.isInitialized()?(Ut.log("DEBUG","[handlePresetChange] Recreating chart with new options"),this.chartManager.recreateChartOptions()):this.chartManager?.updateData(this.stateManager.getData());const i=t.states[this.config.pause_entity];i&&(this.isPaused="on"===i.state);const s=t.states[this.config.profiles_select_entity];s&&(this.selectedProfile=s.state,this.profileOptions=s.attributes.options||[])}}get hass(){return this._hass}toggleMenu(t){t&&(t.stopPropagation(),t.preventDefault()),this.isMenuOpen=!this.isMenuOpen,Ut.log("UI","toggleMenu: isMenuOpen is now",this.isMenuOpen),this.requestUpdate()}handleLanguageSelect(t){Ut.log("LANG",`handleLanguageSelect called with: ${t}`),this.language=t,this.isMenuOpen=!1,this.chartManager.updateChartLabels(),this.requestUpdate()}handleLoggingToggle(t){t.stopPropagation(),t.preventDefault();const e=t.target.checked;Ut.log("UI","handleLoggingToggle: newLoggingState",e),this.loggingEnabled=e,this.config={...this.config,logging_enabled:e},Ut.setEnabled(e),Ut.log("UI","handleLoggingToggle: Logger enabled state is now",e),setTimeout(()=>{this.isMenuOpen=!1,this.requestUpdate()},150)}handlePresetChange(t){t.stopPropagation(),t.preventDefault();const e=t.detail?.value||t.target?.value;if(Ut.log("UI","handlePresetChange: Event type:",t.type),Ut.log("UI","handlePresetChange: newPreset",e),Ut.log("UI","handlePresetChange: current preset",this.selectedPreset),!e||e===this.selectedPreset)return void Ut.log("UI","handlePresetChange: No change detected, ignoring");this.selectedPreset=e;const i=lt[e];this.config={...this.config,preset:e,...i},Ut.log("UI","handlePresetChange: New config",this.config),this.config=St(this.config),this.stateManager.setData(new Array(24).fill(null)),this.chartManager?.isInitialized()?(Ut.log("DEBUG","[handlePresetChange] Recreating chart with new options"),this.chartManager.recreateChartOptions()):this.chartManager?.updateData(this.stateManager.scheduleData),setTimeout(()=>{if(this.isMenuOpen=!1,this.requestUpdate(),this.chartManager.isInitialized()){const t=this.chartManager.getChart();t&&(t.options.scales.y.min=this.config.min_value,t.options.scales.y.max=this.config.max_value,t.update()),this.chartManager.updateChartLabels()}},150)}handleSelectAll(){this.selectionManager.selectAll(),this.isMenuOpen=!1}handleHelp(){alert(this.localizationManager.localize(this.language,"help.text")),this.isMenuOpen=!1}togglePause(){this.hass.callService("input_boolean","toggle",{entity_id:this.config.pause_entity})}async firstUpdated(){super.firstUpdated(),await this.initializeCard(),this.initialLoadComplete=!0}async initializeCard(){const t=this.shadowRoot.getElementById("myChart");if(!t)return void Ut.error("INIT","Canvas element not found");if(!await this.chartManager.initChart(t))return void Ut.error("INIT","Failed to initialize chart");this.pointerHandler.attachListeners(t);const e=this.shadowRoot.querySelector(".chart-container");e&&(e.setAttribute("tabindex","0"),this.keyboardHandler.attachListeners(e),e.addEventListener("pointerdown",()=>{e.focus(),this.keyboardHandler.enable()}),e.focus()),Ut.log("INIT","Card initialized successfully")}disconnectedCallback(){super.disconnectedCallback(),this.chartManager.destroy();const t=this.shadowRoot?.getElementById("myChart");t&&this.pointerHandler.detachListeners(t);const e=this.shadowRoot?.querySelector(".chart-container");e&&this.keyboardHandler.detachListeners(e)}render(){const t=this.stateManager.scheduleData.some(t=>null===t),e=(t,e,i)=>this.localizationManager.localize(this.language,t,e,i),i=e("ui.title");return G`
      <ha-card>
        <div class="card-header">
          <div class="name">${i} (v${ot})</div>
          <button class="menu-button" @click=${t=>this.toggleMenu(t)}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </button>
        </div>
        ${this.isMenuOpen?G`
          <div class="menu-content" @click=${t=>t.stopPropagation()}>
            <mwc-list-item @click=${this.handleSelectAll}>${e("menu.select_all")}</mwc-list-item>
            <mwc-list-item @click=${this.handleHelp}>${e("menu.help")}</mwc-list-item>
            
            <div class="menu-item-with-switch" @click=${t=>t.stopPropagation()}>
              <span>${e("menu.enable_logging")}</span>
              <ha-switch 
                .checked=${this.loggingEnabled} 
                @change=${this.handleLoggingToggle}
              ></ha-switch>
            </div>
            <div class="menu-item-with-select">
              <ha-select
                label="${e("menu.select_preset")}"
                .value=${this.selectedPreset}
                @selected=${this.handlePresetChange}
                @opened=${()=>{this.keyboardHandler.disable(),this.suppressClickUntil=Date.now()+_t}}
                @closed=${()=>{this.keyboardHandler.enable();const t=this.shadowRoot.querySelector(".chart-container");t?.focus(),this.suppressClickUntil=Date.now()+yt}}
              >
                ${Object.keys(lt).map(t=>G`<mwc-list-item .value=${t}>${e(`preset.${t}`)}</mwc-list-item>`)}
              </ha-select>
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
                            ${this.missingEntities.length>0&&this.initialLoadComplete?G`<div class="loading-overlay anomalous-operation-overlay">
                                  <div>
                                    ${e("ui.anomalous_operation_warning")}
                                  </div>
                                </div>`:t?G`<div class="loading-overlay"><div>${e("ui.loading")}</div></div>`:""}
                            <canvas id="myChart"></canvas>
                            ${this.missingEntities.length>0&&this.initialLoadComplete?G`<div class="anomalous-watermark">${e("ui.anomalous_operation_watermark")}</div>`:""}
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
                ${this.profileOptions.map(t=>G`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}
              </ha-select>
            </div>
            ${this.hasUnsavedChanges?G`
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
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"cronostar-card",name:"CronoStar",description:"Visual hourly schedule editor with drag-and-drop control",preview:!0,documentationURL:"https://github.com/FoliniC/cronostar-card"}),Logger.log("MAIN",`%c CRONOSTAR %c v${ot} `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");
