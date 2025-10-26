const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:n,defineProperty:o,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:d}=Object,u=globalThis,p=u.trustedTypes,g=p?p.emptyScript:"",f=u.reactiveElementPolyfillSupport,y=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!n(t,e),$={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&o(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,a=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??v)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,f?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.1");const _=globalThis,P=_.trustedTypes,S=P?P.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+b,E=`<${x}>`,C=document,M=()=>C.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,I="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,L=/>/g,O=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,T=/"/g,z=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),N=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),j=new WeakMap,F=C.createTreeWalker(C,129);function K(t,e){if(!k(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===H?"!--"===l[1]?n=R:void 0!==l[1]?n=L:void 0!==l[2]?(z.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=O):void 0!==l[3]&&(n=O):n===O?">"===l[0]?(n=a??H,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?O:'"'===l[3]?T:U):n===T||n===U?n=O:n===R||n===L?n=H:(n=O,a=void 0);const d=n===O&&t[e+1].startsWith("/>")?" ":"";r+=n===H?i+E:c>=0?(s.push(o),i.slice(0,c)+A+i.slice(c)+b+d):i+b+(-2===c?e:d)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const n=t.length-1,o=this.parts,[l,c]=W(t,e);if(this.el=q.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=c[r++],i=s.getAttribute(t).split(b),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?X:"?"===n[1]?Q:"@"===n[1]?tt:Y}),s.removeAttribute(t)}else t.startsWith(b)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(z.test(s.tagName)){const t=s.textContent.split(b),e=t.length-1;if(e>0){s.textContent=P?P.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),F.nextNode(),o.push({type:2,index:++a});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===x)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(b,t+1));)o.push({type:7,index:a}),t+=b.length-1}a++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===N)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=D(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=J(t,a._$AS(t,e.values),a,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??C).importNode(e,!0);F.currentNode=s;let a=F.nextNode(),r=0,n=0,o=i[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new Z(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new et(a,this,t)),this._$AV.push(e),o=i[++n]}r!==o?.index&&(a=F.nextNode(),r++)}return F.currentNode=C,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),D(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==N&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>k(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=q.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new q(t)),e}k(t){k(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new Z(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=J(this,t,e,0),r=!D(t)||t!==this._$AH&&t!==N,r&&(this._$AH=t);else{const s=t;let n,o;for(t=a[0],n=0;n<a.length-1;n++)o=J(this,s[i+n],e,n),o===N&&(o=this._$AH[n]),r||=!D(o)||o!==this._$AH[n],o===V?t=V:t!==V&&(t+=(o??"")+a[n+1]),this._$AH[n]=o}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class Q extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class tt extends Y{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??V)===N)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const it=_.litHtmlPolyfillSupport;it?.(q,Z),(_.litHtmlVersions??=[]).push("3.3.1");const st=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new Z(e.insertBefore(M(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}}at._$litElement$=!0,at.finalized=!0,st.litElementHydrateSupport?.({LitElement:at});const rt=st.litElementPolyfillSupport;rt?.({LitElement:at}),(st.litElementVersions??=[]).push("4.2.1");const nt=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(s,t,i)})`

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

`,ot="2.19.4",lt={title:"Temperature Scheduler",entity_prefix:"temperature_hour_",chartjs_path:"/local/chart.min.js",dragdata_path:"/local/chartjs-plugin-dragdata.min.js",pause_entity:"input_boolean.temperature_schedule_paused",profiles_select_entity:"input_select.temperature_profiles",save_script:"script.save_temperature_profile",load_script:"script.load_temperature_profile",hour_base:"auto"},ct=0,ht=50,dt=15,ut=30,pt=.5,gt=5,ft=8,yt=10,mt=2,vt=.4,$t="rgba(3, 169, 244, 1)",wt="rgba(3, 169, 244, 0.2)",_t="red",Pt="darkred",St="#ff5252",At="#b71c1c",bt=3e3,xt=600,Et=500,Ct=1e3;function Mt(t,e=1){const i=Math.pow(10,e);return Math.round(t*i)/i}function Dt(t,e,i){return Math.max(e,Math.min(i,t))}function kt(t,e=0){return(t+e).toString().padStart(2,"0")}function It(t,e=null){const i=parseFloat(t);return Number.isNaN(i)?e:i}const Ht={log:(t,...e)=>console.log(`[${t}]`,...e),warn:(t,...e)=>console.warn(`[${t}]`,...e),error:(t,...e)=>console.error(`[${t}]`,...e),state:(...t)=>Ht.log("STATE",...t),load:(...t)=>Ht.log("LOAD",...t),save:(...t)=>Ht.log("SAVE",...t),sel:(...t)=>Ht.log("SEL",...t),memo:(...t)=>Ht.log("MEMO",...t),diff:(...t)=>Ht.log("DIFF",...t),key:(...t)=>Ht.log("KEY",...t),base:(...t)=>Ht.log("BASE",...t)};class Rt{constructor(t){this.card=t,this.scheduleData=new Array(24).fill(null),this.dirtyIndices=new Set,this.isLoadingProfile=!1}updateFromHass(t){const e=[];let i=!1;for(let s=0;s<24;s++){const a=this.getEntityIdForHour(s),r=t.states[a];let n=r?It(r.state):null;this.scheduleData[s]!==n&&(i=!0),e[s]=n}return i&&!this.isLoadingProfile?(Ht.state("Schedule data updated from hass. Hours 00-05:",e.slice(0,6)),this.scheduleData=e,!0):!(!i||!this.isLoadingProfile)&&(Ht.state("Update ignored during profile loading"),!1)}getEntityIdForHour(t){return`input_number.${this.card.config.entity_prefix}${kt(t,this.card.hourBase)}`}getHourLabel(t){return`${kt(t,this.card.hourBase)}:00`}updateTemperatureAtHour(t,e){const i=this.getEntityIdForHour(t);Ht.memo(`set_value call -> entity=${i} hour=${this.getHourLabel(t)} value=${e}`),this.card.hass.callService("input_number","set_value",{entity_id:i,value:e}),this.dirtyIndices.add(t),this.card.hasUnsavedChanges=!0}async waitForEntityNumericState(t,e,i=3e3,s=.001){const a=Date.now();return new Promise((r,n)=>{const o=()=>{const l=this.card.hass?.states?.[t]?.state,c=It(l);return null!==c&&Math.abs(c-e)<=s?(Ht.memo(`State confirmed -> entity=${t}, expected=${e}, current=${c}`),void r()):Date.now()-a>i?(Ht.warn("MEMO",`Timeout waiting for ${t}. Expected: ${e}, current: ${c}`),void n(new Error(`Timeout waiting for ${t}`))):void setTimeout(o,100)};o()})}async ensureValuesApplied(){const t=[];Ht.memo("Ensuring values applied. Dirty indices:",Array.from(this.dirtyIndices));for(const e of Array.from(this.dirtyIndices)){const i=this.getEntityIdForHour(e),s=this.scheduleData[e];null!==s&&(Ht.memo(`Waiting for entity sync -> hour=${this.getHourLabel(e)}, entity=${i}, expected=${s}`),t.push(this.waitForEntityNumericState(i,s,4e3,.001).catch(t=>Ht.warn("MEMO",`Wait failed for ${i}:`,t))))}t.length>0&&await Promise.all(t),this.dirtyIndices.clear()}logPersistedValues(t,e){e.forEach(e=>{const i=this.getEntityIdForHour(e),s=this.getHourLabel(e),a=this.scheduleData[e];Ht.memo(`${t} -> hour=${s}, entity=${i}, value=${a}`)})}clearDirty(){this.dirtyIndices.clear()}getData(){return[...this.scheduleData]}setData(t){this.scheduleData=[...t]}}class Lt{constructor(t){this.card=t,this.lastLoadedProfile=""}async waitForEntityState(t,e,i=bt){const s=Date.now();return new Promise((a,r)=>{const n=()=>{const o=this.card.hass?.states?.[t]?.state;o!==e?Date.now()-s>i?r(new Error(`Timeout waiting for ${t} to become '${e}', current: '${o}'`)):setTimeout(n,100):a()};n()})}async saveProfile(t=this.lastLoadedProfile){if(!t)throw Ht.warn("SAVE","No profile specified"),new Error("No profile specified for saving");const e=this.card.config.save_script.startsWith("script.")?this.card.config.save_script.substring(7):this.card.config.save_script;Ht.save(`Invoking script '${e}' for profile '${t}'`),Ht.save(`Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}`);try{await this.card.hass.callService("script",e,{profile_name:t,entity_prefix:this.card.config.entity_prefix,hour_base:this.card.hourBase,payload_version:2}),this.card.hasUnsavedChanges=!1,this.lastLoadedProfile=t,Ht.save(`Script '${e}' completed for profile '${t}'`)}catch(i){throw Ht.error("SAVE",`Error calling save script '${e}':`,i),alert(`Error saving profile '${t}'. Check console for details.`),i}}async loadProfile(t){this.card.stateManager.isLoadingProfile=!0;const e=[...this.card.stateManager.scheduleData];Ht.load("PRE-load schedule data (00..05):",e.slice(0,6));const i=this.card.config.load_script.startsWith("script.")?this.card.config.load_script.substring(7):this.card.config.load_script;Ht.load(`Invoking script '${i}' for profile '${t}'`),Ht.load(`Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}`);try{await this.card.hass.callService("script",i,{profile_name:t,entity_prefix:this.card.config.entity_prefix,hour_base:this.card.hourBase,payload_version:2}),Ht.load("Script completed, waiting for state propagation..."),await new Promise(t=>setTimeout(t,xt));const s=[];for(let t=0;t<24;t++){const e=this.card.stateManager.getEntityIdForHour(t),i=this.card.hass.states[e];let a=i?It(i.state):null;s[t]=a}Ht.load("POST-load values read (00..05):",s.slice(0,6)),Ht.load("POST-load values read (10..15):",s.slice(10,16));for(let t=0;t<24;t++)e[t]!==s[t]&&Ht.diff(`idx=${t} hour=${this.card.stateManager.getHourLabel(t)}: ${e[t]} -> ${s[t]}`);this.card.stateManager.setData(s),this.card.chartManager&&this.card.chartManager.isInitialized()&&(this.card.chartManager.updateData(s),Ht.load("Chart updated with new data")),this.card.hasUnsavedChanges=!1,this.lastLoadedProfile=t,Ht.load(`Profile '${t}' loaded completely`)}catch(e){throw Ht.error("LOAD",`Error calling load script '${i}':`,e),alert(`Error loading profile '${t}'. Check console for details.`),e}finally{this.card.stateManager.isLoadingProfile=!1}}async handleProfileSelection(t){this.card.suppressClickUntil=Date.now()+Ct+500,this.card.selectionManager&&this.card.selectionManager.snapshotSelection();const e=t?.target?.value||t?.detail?.value||"";if(!e||e===this.card.selectedProfile)return;const i=this.lastLoadedProfile||this.card.selectedProfile;if(this.card.hasUnsavedChanges&&i)try{Ht.save(`Auto-saving previous profile '${i}' before switching`),await this.card.stateManager.ensureValuesApplied(),this.card.stateManager.logPersistedValues(`auto-save profile '${i}'`,Array.from(this.card.stateManager.dirtyIndices)),await this.saveProfile(i),Ht.save(`Auto-save of '${i}' completed`)}catch(t){Ht.error("SAVE","Error during auto-save:",t)}this.card.selectedProfile=e;try{await this.card.hass.callService("input_select","select_option",{entity_id:this.card.config.profiles_select_entity,option:e}),await this.waitForEntityState(this.card.config.profiles_select_entity,e,bt)}catch(t){Ht.warn("LOAD","select_option or wait failed:",t)}try{await this.loadProfile(e),this.card.selectionManager&&this.card.selectionManager.restoreSelectionFromSnapshot(),this.card.suppressClickUntil=Date.now()+Et}catch(t){Ht.error("LOAD","Error during auto-load:",t)}}async resetChanges(){const t=this.lastLoadedProfile||this.card.selectedProfile;if(t){this.card.selectionManager&&this.card.selectionManager.snapshotSelection();try{await this.loadProfile(t),this.card.selectionManager&&this.card.selectionManager.restoreSelectionFromSnapshot()}catch(t){Ht.error("LOAD","Error while reloading profile:",t)}}else Ht.warn("LOAD","No profile to reload")}}class Ot{constructor(t){this.card=t,this.selectedPoint=null,this.selectedPoints=[],this.selectionSnapshot=null}selectAll(){const t=Array.from({length:24},(t,e)=>e);this.selectIndices(t,!1),this.card.chartManager?.updatePointStyling(this.selectedPoint,this.selectedPoints),this.card.chartManager?.update()}selectIndices(t,e=!0){const i=(s=t,[...new Set(s)]).filter(t=>t>=0&&t<24);var s;this.selectedPoints=i,e&&null!==this.selectedPoint&&this.selectedPoints.includes(this.selectedPoint)||(this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null),this.logSelection("selectIndices")}toggleIndexSelection(t){const e=new Set(this.selectedPoints);e.has(t)?e.delete(t):e.add(t),this.selectedPoints=Array.from(e),null!==this.selectedPoint&&this.selectedPoints.includes(this.selectedPoint)||(this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null),this.logSelection("toggleIndexSelection")}clearSelection(){this.selectedPoints=[],this.selectedPoint=null,Ht.sel("Selection cleared")}snapshotSelection(){Array.isArray(this.selectedPoints)&&this.selectedPoints.length>0?(this.selectionSnapshot={points:[...this.selectedPoints],anchor:this.selectedPoint},this.logSelection("snapshot before profile change")):(this.selectionSnapshot=null,Ht.sel("Snapshot: no active selection"))}restoreSelectionFromSnapshot(){if(!this.selectionSnapshot)return void Ht.sel("Restore: no snapshot to restore");const t=Array.isArray(this.selectionSnapshot.points)?[...this.selectionSnapshot.points]:[];this.selectedPoints=t.filter(t=>t>=0&&t<24),null!==this.selectionSnapshot.anchor&&t.includes(this.selectionSnapshot.anchor)?this.selectedPoint=this.selectionSnapshot.anchor:this.selectedPoint=this.selectedPoints.length>0?this.selectedPoints[0]:null,this.card.chartManager&&this.card.chartManager.updatePointStyling(this.selectedPoint,this.selectedPoints),this.logSelection("restore selection after profile change")}logSelection(t=""){const e=null!==this.selectedPoint?this.card.stateManager.getHourLabel(this.selectedPoint):"n/a";if(Ht.sel(`${t} - anchor=${this.selectedPoint} (${e}) points=${JSON.stringify(this.selectedPoints)}`),this.card.stateManager){const t=this.card.stateManager.scheduleData;this.selectedPoints.forEach(e=>{const i=this.card.stateManager.getHourLabel(e),s=this.card.stateManager.getEntityIdForHour(e),a=t[e],r=this.card.hass?.states?.[s],n=r?r.state:void 0;Ht.sel(`  idx=${e}, hour=${i}, entity=${s}, chartVal=${a}, entityState=${n}`)})}}getActiveIndices(){return Array.isArray(this.selectedPoints)&&this.selectedPoints.length>0?[...this.selectedPoints]:null!==this.selectedPoint?[this.selectedPoint]:[]}isSelected(t){return this.selectedPoints.includes(t)}isAnchor(t){return this.selectedPoint===t}setAnchor(t){this.selectedPoints.includes(t)&&(this.selectedPoint=t)}getAnchor(){return this.selectedPoint}getSelectedPoints(){return[...this.selectedPoints]}}let Ut=!1;class Tt{constructor(t){this.card=t,this.chart=null,this.chartInitialized=!1,this.dragStartValues=null,this.dragAnchorIndex=null}async loadPlugins(){if(Ut)return!0;try{window.Chart||await(t=this.card.config.chartjs_path,new Promise((e,i)=>{if(document.querySelector(`script[src="${t}"]`))return void e();const s=document.createElement("script");s.src=t,s.onload=e,s.onerror=()=>i(new Error(`Failed to load script: ${t}`)),document.head.appendChild(s)}));let e=window.ChartJSdragDataPlugin;if(!e)try{const t=await import(this.card.config.dragdata_path);e=t.default||t}catch(t){e=window.ChartJSdragDataPlugin||window.ChartDataDrag||void 0}if(window.Chart&&e)return window.Chart.register(e),Ut=!0,Ht.log("CHART","chartjs-plugin-dragdata registered"),!0;if(window.Chart)return Ut=!0,Ht.warn("CHART","dragdata plugin not found; proceeding"),!0;throw new Error("Chart.js could not be resolved")}catch(t){return Ht.error("CHART","Error loading chart libraries:",t),!1}var t}async initChart(t){if(!await this.loadPlugins())return!1;const e=t.getContext("2d");if(!e)return!1;return this.chart=new window.Chart(e,{type:"line",data:{labels:Array.from({length:24},(t,e)=>`${e.toString().padStart(2,"0")}:00`),datasets:[{label:((t,e,i)=>this.card.localizationManager.localize(t,e,i))("ui.temperature_label"),data:this.card.stateManager.scheduleData,backgroundColor:wt,borderColor:$t,borderWidth:mt,pointRadius:gt,pointHoverRadius:ft,pointHitRadius:yt,fill:!0,tension:vt}]},options:this.getChartOptions()}),this.chartInitialized=!0,this.updatePointStyling(this.card.selectionManager?.selectedPoint,this.card.selectionManager?.selectedPoints),this.chart.update(),this.updateChartLabels(),Ht.log("CHART","Chart initialized successfully"),!0}getChartOptions(){const t=(t,e,i)=>this.card.localizationManager.localize(t,e,i);return{responsive:!0,maintainAspectRatio:!1,events:["mousemove","mouseout","click","touchstart","touchmove","touchend","pointermove","pointerdown","pointerup","mousedown","mouseup"],scales:{y:{beginAtZero:!1,suggestedMin:dt,suggestedMax:ut,title:{display:!0,text:t("ui.temperature_label")}},x:{title:{display:!0,text:t("ui.time_label")}}},onClick:t=>this.handleChartClick(t),plugins:{dragData:this.getDragDataOptions(),tooltip:{enabled:!0}}}}getDragDataOptions(){return{round:pt,dragX:!1,onDragStart:(t,e,i,s)=>{if(this.card.pointerHandler?.isSelecting)return!1;const a=this.card.selectionManager;if(!a)return!1;a.isSelected(i)?a.setAnchor(i):a.selectIndices([i],!1),this.dragStartValues={};const r=this.chart.data.datasets[0].data;return a.getSelectedPoints().forEach(t=>{this.dragStartValues[t]=r[t]??this.card.stateManager.scheduleData[t]}),this.dragAnchorIndex=i,this.updatePointStyling(a.selectedPoint,a.selectedPoints),a.logSelection("onDragStart"),!0},onDrag:(t,e,i,s)=>{if(!this.dragStartValues||null===this.dragAnchorIndex)return;const a=s-this.dragStartValues[this.dragAnchorIndex],r=this.chart.data.datasets[0],n=this.card.selectionManager;n.getSelectedPoints().forEach(t=>{let e=this.dragStartValues[t]+a;e=Dt(e,ct,ht),e=Mt(e,1),r.data[t]=e}),this.chart.update("none"),this.showDragValueDisplay(n.getSelectedPoints(),r.data)},onDragEnd:(t,e,i,s)=>{const a=this.card.shadowRoot?.getElementById("myChart");a&&(a.style.cursor="default");const r=this.chart.data.datasets[0],n=this.card.selectionManager,o=this.card.stateManager,l=n.getActiveIndices(),c=[...o.scheduleData];l.forEach(t=>{let e=r.data[t];e=Mt(e,1),c[t]=e}),o.setData(c),o.logPersistedValues("dragEnd",l),l.forEach(t=>{o.updateTemperatureAtHour(t,c[t])}),n.setAnchor(i),this.updatePointStyling(n.selectedPoint,n.selectedPoints),this.hideDragValueDisplay(),this.dragStartValues=null,this.dragAnchorIndex=null}}}handleChartClick(t){if(Date.now()<this.card.suppressClickUntil)return;const e=this.chart.getElementsAtEventForMode(t,"nearest",{intersect:!0},!0),i=!!(this.card.keyboardHandler?.ctrlDown||this.card.keyboardHandler?.metaDown||t.ctrlKey||t.metaKey),s=this.card.selectionManager;if(e.length){const t=e[0].index;i?s.toggleIndexSelection(t):s.selectIndices([t],!0)}else i||s.clearSelection();this.updatePointStyling(s.selectedPoint,s.selectedPoints),this.chartInitialized&&this.chart.update(),s.logSelection("onClick")}updatePointStyling(t,e=[]){if(!this.chartInitialized||!this.chart?.data?.datasets?.length)return;const i=this.chart.data.datasets[0],s=Array.isArray(i.data)?i.data.length:24;i.pointRadius=Array(s).fill(gt),i.pointBackgroundColor=Array(s).fill($t),i.pointBorderColor=Array(s).fill($t),i.pointBorderWidth=Array(s).fill(mt),Array.isArray(e)&&e.length>0&&e.forEach(t=>{t>=0&&t<s&&(i.pointRadius[t]=8,i.pointBackgroundColor[t]=_t,i.pointBorderColor[t]=Pt,i.pointBorderWidth[t]=2)}),null!==t&&t>=0&&t<s&&(i.pointRadius[t]=9,i.pointBorderWidth[t]=3,i.pointBackgroundColor[t]=St,i.pointBorderColor[t]=At)}showDragValueDisplay(t,e){const i=this.card.shadowRoot?.getElementById("drag-value-display");if(!i||0===t.length)return;const s=Math.min(...t),a=e[s];i.style.display="block",i.textContent=((t,e,i)=>this.card.localizationManager.localize(t,e,i))("ui.value_display","{value}",a);const r=this.chart.getDatasetMeta(0).data[s];if(r){const{x:t,y:e}=r.tooltipPosition(),{x:s,y:a}=this.getContainerRelativePointCoords(t,e);i.style.left=`${s+10}px`,i.style.top=a-30+"px"}}hideDragValueDisplay(){const t=this.card.shadowRoot?.getElementById("drag-value-display");t&&(t.style.display="none")}getContainerRelativePointCoords(t,e){const i=this.card.shadowRoot?.querySelector(".chart-container"),s=this.card.shadowRoot?.getElementById("myChart");if(!i||!s)return{x:0,y:0};const a=i.getBoundingClientRect(),r=s.getBoundingClientRect();return{x:t+(r.left-a.left),y:e+(r.top-a.top)}}updateData(t){this.chartInitialized&&this.chart&&(this.chart.data.datasets[0].data=[...t],this.updatePointStyling(this.card.selectionManager?.selectedPoint,this.card.selectionManager?.selectedPoints),this.chart.update())}destroy(){this.chart&&(this.chart.destroy(),this.chart=null,this.chartInitialized=!1)}isInitialized(){return this.chartInitialized&&null!==this.chart}update(){this.chartInitialized&&this.chart&&this.chart.update()}getChart(){return this.chart}updateChartLabels(){if(!this.chart)return void console.log("[CHART] updateChartLabels: Chart not initialized");console.log("[CHART] updateChartLabels called");const t=(t,e,i)=>this.card.localizationManager.localize(this.card.language,t,e,i),e=t("ui.temperature_label"),i=t("ui.temperature_label"),s=t("ui.time_label");console.log(`[CHART] New labels: ${e}, ${i}, ${s}`),this.chart.data.datasets[0].label=e,this.chart.options.scales.y.title.text=i,this.chart.options.scales.x.title.text=s,console.log("[CHART] Calling chart.update()"),this.chart.update()}}class zt{constructor(t){this.card=t,this.ctrlDown=!1,this.metaDown=!1,this.enabled=!0,this.handleKeydown=this.handleKeydown.bind(this),this.handleKeyup=this.handleKeyup.bind(this)}enable(){this.enabled=!0}disable(){this.enabled=!1}handleKeydown(t){if(!this.enabled)return;if("Control"===t.key)return void(this.ctrlDown=!0);if("Meta"===t.key)return void(this.metaDown=!0);if((this.ctrlDown||this.metaDown)&&"a"===t.key)return t.preventDefault(),void this.card.selectionManager.selectAll();if("Escape"===t.key)return void this.handleEscape();const e=this.card.selectionManager.getActiveIndices();0!==e.length&&("ArrowLeft"!==t.key&&"ArrowRight"!==t.key?"ArrowUp"!==t.key&&"ArrowDown"!==t.key||this.handleArrowUpDown(t,e):this.handleArrowLeftRight(t,e))}handleKeyup(t){"Control"!==t.key?"Meta"!==t.key?"ArrowUp"!==t.key&&"ArrowDown"!==t.key&&"ArrowLeft"!==t.key&&"ArrowRight"!==t.key||this.card.chartManager?.hideDragValueDisplay():this.metaDown=!1:this.ctrlDown=!1}handleEscape(){this.card.selectionManager.clearSelection(),this.card.chartManager?.updatePointStyling(null,[]),this.card.chartManager?.update()}handleArrowLeftRight(t,e){t.preventDefault();const i=this.card.stateManager,s=this.card.chartManager,a=s.chart.data.datasets[0];let r;r="ArrowLeft"===t.key?Math.min(...e):Math.max(...e);const n=Mt(a.data[r]??i.scheduleData[r],1);Ht.key(`${t.key} -> align to index: ${r} (${i.getHourLabel(r)}) value=${n} indices=${JSON.stringify(e)}`);const o=[...i.scheduleData];e.forEach(t=>{o[t]=n,a.data[t]=n,i.updateTemperatureAtHour(t,n)}),i.setData(o),s.updatePointStyling(this.card.selectionManager.selectedPoint,this.card.selectionManager.selectedPoints),s.update(),s.showDragValueDisplay(e,a.data)}handleArrowUpDown(t,e){t.preventDefault();const i="ArrowUp"===t.key?pt:-.5,s=this.card.selectionManager,a=this.card.stateManager,r=this.card.chartManager,n=r.chart.data.datasets[0],o=[...a.scheduleData];Ht.key(`${t.key} -> delta=${i} indices=${JSON.stringify(e)}`),e.forEach(t=>{let e=(n.data[t]??a.scheduleData[t])+i;e=Dt(e,ct,ht),e=Mt(e,1),n.data[t]=e,o[t]=e,a.updateTemperatureAtHour(t,e)}),a.setData(o),r.updatePointStyling(s.selectedPoint,s.selectedPoints),r.update(),r.showDragValueDisplay(e,n.data)}attachListeners(t){t.addEventListener("keydown",this.handleKeydown),t.addEventListener("keyup",this.handleKeyup)}detachListeners(t){t.removeEventListener("keydown",this.handleKeydown),t.removeEventListener("keyup",this.handleKeyup)}}class Bt{constructor(t){this.card=t,this.isSelecting=!1,this.selStartPx=null,this.selEndPx=null,this.activePointerId=null,this.selectionAdditive=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onPointerCancel=this.onPointerCancel.bind(this)}getContainerRelativeCoords(t){const e=this.card.shadowRoot?.querySelector(".chart-container");if(!e)return{x:0,y:0};const i=e.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}}showSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");t&&(t.style.display="block",this.updateSelectionOverlay())}hideSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");t&&(t.style.display="none")}updateSelectionOverlay(){const t=this.card.shadowRoot?.getElementById("selection-rect");if(!t||!this.selStartPx||!this.selEndPx)return;const e=Math.min(this.selStartPx.x,this.selEndPx.x),i=Math.min(this.selStartPx.y,this.selEndPx.y),s=Math.max(this.selStartPx.x,this.selEndPx.x),a=Math.max(this.selStartPx.y,this.selEndPx.y);t.style.left=`${e}px`,t.style.top=`${i}px`,t.style.width=`${Math.max(0,s-e)}px`,t.style.height=`${Math.max(0,a-i)}px`}getIndicesInSelectionRect(){const t=this.card.chartManager;if(!t?.chart||!this.selStartPx||!this.selEndPx)return[];const e=t.chart.getDatasetMeta(0);if(!e?.data)return[];const i=this.card.shadowRoot?.querySelector(".chart-container"),s=this.card.shadowRoot?.getElementById("myChart");if(!i||!s)return[];const a=i.getBoundingClientRect(),r=s.getBoundingClientRect(),n=r.left-a.left,o=r.top-a.top,l=Math.min(this.selStartPx.x,this.selEndPx.x),c=Math.min(this.selStartPx.y,this.selEndPx.y),h=Math.max(this.selStartPx.x,this.selEndPx.x),d=Math.max(this.selStartPx.y,this.selEndPx.y),u=[];return e.data.forEach((t,e)=>{const i="function"==typeof t.tooltipPosition?t.tooltipPosition():{x:t.x,y:t.y},s=i.x+n,a=i.y+o;s>=l&&s<=h&&a>=c&&a<=d&&u.push(e)}),Ht.sel(`Area selection: nodes in rectangle -> ${JSON.stringify(u)}`),u}onPointerDown(t){if("mouse"===t.pointerType&&0!==t.button)return;const e=this.card.chartManager,i=(e?.chart?.getElementsAtEventForMode?.(t,"nearest",{intersect:!0},!0)||[]).length>0;if(!(!!t.shiftKey||!i))return;t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.isSelecting=!0,this.activePointerId=t.pointerId,this.selectionAdditive=!!(this.card.keyboardHandler?.ctrlDown||this.card.keyboardHandler?.metaDown||t.ctrlKey||t.metaKey);const s=this.card.shadowRoot?.getElementById("myChart");try{s?.setPointerCapture(t.pointerId)}catch(t){}const{x:a,y:r}=this.getContainerRelativeCoords(t);this.selStartPx={x:a,y:r},this.selEndPx={x:a,y:r},this.showSelectionOverlay(),this.card.suppressClickUntil=Date.now()+Et}onPointerMove(t){if(!this.isSelecting)return;if(null!==this.activePointerId&&t.pointerId!==this.activePointerId)return;t.preventDefault();const e=this.getContainerRelativeCoords(t);this.selEndPx=e,this.updateSelectionOverlay()}onPointerUp(t){if(!this.isSelecting)return;if(null!==this.activePointerId&&t.pointerId!==this.activePointerId)return;this.isSelecting=!1,this.activePointerId=null;const e=this.card.shadowRoot?.getElementById("myChart");try{e?.releasePointerCapture(t.pointerId)}catch(t){}this.hideSelectionOverlay();const i=this.getIndicesInSelectionRect(),s=this.card.selectionManager,a=this.card.chartManager;if(i.length>0)if(this.selectionAdditive){const t=[...s.getSelectedPoints()];i.forEach(e=>{t.includes(e)||t.push(e)}),s.selectIndices(t,!0)}else s.selectIndices(i,!0);else s.clearSelection();a.updatePointStyling(s.selectedPoint,s.selectedPoints),a.update(),s.logSelection("area selection completed"),this.card.suppressClickUntil=Date.now()+Et}onPointerCancel(){this.isSelecting&&(this.isSelecting=!1,this.activePointerId=null,this.hideSelectionOverlay(),this.card.suppressClickUntil=Date.now()+300)}attachListeners(t){t.addEventListener("pointerdown",this.onPointerDown,{passive:!1,capture:!0}),window.addEventListener("pointermove",this.onPointerMove,!0),window.addEventListener("pointerup",this.onPointerUp,!0),window.addEventListener("pointercancel",this.onPointerCancel,!0)}detachListeners(t){t.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),window.removeEventListener("pointermove",this.onPointerMove,!0),window.removeEventListener("pointerup",this.onPointerUp,!0),window.removeEventListener("pointercancel",this.onPointerCancel,!0)}}const Nt={en:{"ui.title":"Temperature Schedule","ui.loading":"Loading data...","ui.pause":"Pause","ui.profile":"Profile","ui.unsaved_changes":"Unsaved changes","ui.reset":"Reset","ui.value_display":"Value: {value}°C","ui.temperature_label":"Temperature (°C)","ui.time_label":"Time of Day","menu.select_all":"Select All","menu.help":"Help","menu.language":"Language","help.title":"Temperature Scheduler Help","help.text":"Drag points on the graph to change the temperature. Hold Shift to select multiple points. Use Ctrl+A to select all points."},it:{"ui.title":"Programma Temperatura","ui.loading":"Caricamento dati...","ui.pause":"Pausa","ui.profile":"Profilo","ui.unsaved_changes":"Modifiche non salvate","ui.reset":"Reset","ui.value_display":"Valore: {value}°C","ui.temperature_label":"Temperatura (°C)","ui.time_label":"Ora del Giorno","menu.select_all":"Seleziona tutto","menu.help":"Aiuto","menu.language":"Lingua","help.title":"Aiuto Programma Temperatura","help.text":"Trascina i punti sul grafico per cambiare la temperatura. Tieni premuto Shift per selezionare più punti. Usa Ctrl+A per selezionare tutti i punti."}};class Vt{localize(t,e,i,s){console.log(`[LOCALIZE] lang: ${t}, key: ${e}`);let a=Nt[t]?.[e]||Nt.en[e]||e;return i&&s&&(a=a.replace(i,s)),a}}customElements.define("temperature-scheduler-card",class extends at{static get properties(){return{hass:{type:Object},config:{type:Object},isPaused:{type:Boolean},selectedProfile:{type:String},profileOptions:{type:Array},hasUnsavedChanges:{type:Boolean},isMenuOpen:{type:Boolean},language:{type:String}}}static get styles(){return nt}constructor(){super(),this.config=null,this.hourBase=0,this.hourBaseDetermined=!1,this.isPaused=!1,this.selectedProfile="",this.profileOptions=[],this.hasUnsavedChanges=!1,this.suppressClickUntil=0,this.isMenuOpen=!1,this.language="it",this.localizationManager=new Vt,this.stateManager=new Rt(this),this.profileManager=new Lt(this),this.selectionManager=new Ot(this),this.chartManager=new Tt(this),this.keyboardHandler=new zt(this),this.pointerHandler=new Bt(this)}setConfig(t){this.config=function(t){if(!t.entity_prefix)throw new Error("Configuration error: entity_prefix is required");const e={...lt,...t};return e.hour_base=function(t){if(0===t||1===t)return{value:t,determined:!0};if("string"==typeof t){const e=t.trim().toLowerCase();if("0"===e||"zero"===e||"00"===e)return{value:0,determined:!0};if("1"===e||"one"===e||"01"===e)return{value:1,determined:!0}}return{value:0,determined:!1}}(t.hour_base),e}(t);const e=this.config.hour_base;"object"==typeof e&&(this.hourBase=e.value,this.hourBaseDetermined=e.determined)}static getStubConfig(){return{...lt}}detectHourBase(t){if(this.hourBaseDetermined)return;const e=this.config.entity_prefix;let i=0,s=0;for(let s=0;s<24;s++){const a=`input_number.${e}${s.toString().padStart(2,"0")}`;void 0!==t.states[a]&&i++}for(let i=1;i<=24;i++){const a=`input_number.${e}${i.toString().padStart(2,"0")}`;void 0!==t.states[a]&&s++}this.hourBase=s>i?1:0,this.hourBaseDetermined=!0,Ht.base(`Hour base detection -> 0-based: ${i}, 1-based: ${s}. Selected: ${this.hourBase} (${0===this.hourBase?"00-23":"01-24"})`)}set hass(t){if(this._hass=t,this.config&&this.config.entity_prefix){this.detectHourBase(t);this.stateManager.updateFromHass(t)&&this.chartManager.isInitialized()&&this.chartManager.updateData(this.stateManager.getData());const e=t.states[this.config.pause_entity];e&&(this.isPaused="on"===e.state);const i=t.states[this.config.profiles_select_entity];i&&(this.selectedProfile=i.state,this.profileOptions=i.attributes.options||[])}}get hass(){return this._hass}toggleMenu(){this.isMenuOpen=!this.isMenuOpen}handleLanguageSelect(t){console.log(`[LANG] handleLanguageSelect called with: ${t}`),console.log(`[LANG] this.language before: ${this.language}`),this.language=t,console.log(`[LANG] this.language after: ${this.language}`),this.isMenuOpen=!1,console.log("[LANG] Calling updateChartLabels"),this.chartManager.updateChartLabels()}handleSelectAll(){this.selectionManager.selectAll(),this.isMenuOpen=!1}handleHelp(){alert(this.localizationManager.localize(this.language,"help.text")),this.isMenuOpen=!1}togglePause(){this.hass.callService("input_boolean","toggle",{entity_id:this.config.pause_entity})}async firstUpdated(){super.firstUpdated(),await this.initializeCard()}async initializeCard(){const t=this.shadowRoot.getElementById("myChart");if(!t)return void Ht.error("INIT","Canvas element not found");if(!await this.chartManager.initChart(t))return void Ht.error("INIT","Failed to initialize chart");this.pointerHandler.attachListeners(t);const e=this.shadowRoot.querySelector(".chart-container");e&&(e.setAttribute("tabindex","0"),this.keyboardHandler.attachListeners(e),e.addEventListener("pointerdown",()=>{e.focus(),this.keyboardHandler.enable()}),e.focus()),Ht.log("INIT","Card initialized successfully")}disconnectedCallback(){super.disconnectedCallback(),this.chartManager.destroy();const t=this.shadowRoot?.getElementById("myChart");t&&this.pointerHandler.detachListeners(t);const e=this.shadowRoot?.querySelector(".chart-container");e&&this.keyboardHandler.detachListeners(e)}render(){const t=this.stateManager.scheduleData.some(t=>null===t),e=(t,e,i)=>this.localizationManager.localize(this.language,t,e,i),i=e("ui.title");return B`



          <ha-card>



            <div class="card-header">



              <div class="name">${i} (v${ot})</div>

          <button class="menu-button" @click=${this.toggleMenu}>

            <svg viewBox="0 0 24 24" width="24" height="24">

              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>

            </svg>

          </button>

        </div>

        ${this.isMenuOpen?B`

          <div class="menu-content">

            <mwc-list-item @click=${this.handleSelectAll}>${e("menu.select_all")}</mwc-list-item>

            <mwc-list-item @click=${this.handleHelp}>${e("menu.help")}</mwc-list-item>

            <div class="language-menu">

              <mwc-list-item>${e("menu.language")}</mwc-list-item>

              <mwc-button @click=${()=>this.handleLanguageSelect("en")}>EN</mwc-button>

              <mwc-button @click=${()=>this.handleLanguageSelect("it")}>IT</mwc-button>

            </div>

          </div>

        `:""}

        <div class="card-content">

          <div class="chart-container">

            ${t?B`<div class="loading-overlay"><div>${e("ui.loading")}</div></div>`:""}

            <canvas id="myChart"></canvas>

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

                ${this.profileOptions.map(t=>B`<mwc-list-item .value=${t}>${t}</mwc-list-item>`)}

              </ha-select>

            </div>



            ${this.hasUnsavedChanges?B`

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

    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"temperature-scheduler-card",name:"Temperature Scheduler Card",description:"Visual temperature schedule editor with drag-and-drop control",preview:!0,documentationURL:"https://github.com/YOUR_USERNAME/temperature-scheduler-card"}),console.info(`%c TEMPERATURE-SCHEDULER-CARD %c v${ot} `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");
