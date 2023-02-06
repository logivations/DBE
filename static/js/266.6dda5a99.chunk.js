/*! For license information please see 266.6dda5a99.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkroot1=self.webpackChunkroot1||[]).push([[266],{67182:function(e,t,n){var i=n(1413),o=n(42982),r=n(70885),a=n(72791),u=n(68962),l=n.n(u),s=n(68418),c=n(71078),p=(n(57463),n(80184));t.Z=function(e){var t=e.data,n=e.column,d=(0,a.useRef)(),f=(0,a.useState)((function(){return t.value?"string"===typeof t.value?[t.value]:t.value:[n.getDefaultValue()]})),m=(0,r.Z)(f,2),h=m[0],v=m[1];(0,a.useEffect)((function(){t.setValue(h)}),[]);var b=(0,a.useCallback)((function(){var e;return null===d||void 0===d||null===(e=d.current)||void 0===e?void 0:e.instance.validate()}),[]),g=(0,a.useCallback)((function(e,i){v((function(r){var a=[].concat((0,o.Z)(r.slice(0,e)),[i||n.getDefaultValue()],(0,o.Z)(r.slice(e+1)));return t.setValue(a),t.closeEditor(),a}))}),[]),C=(0,a.useCallback)((function(e){v((function(n){var i=[].concat((0,o.Z)(n.slice(0,e)),(0,o.Z)(n.slice(e+1)));return t.setValue(i),t.closeEditor(),i}))}),[]);return(0,p.jsx)("div",{className:"editor-component-filter-builder",children:(0,p.jsxs)(l(),{ref:d,children:[h.reduce((function(e,t,r){return[].concat((0,o.Z)(e),[(0,p.jsx)(u.SimpleItem,{editorType:n.getViewModel().getInputType(),component:n.getCellRenderForFilterBuilder(null===t||void 0===t?void 0:t.foreignButtonId),editorOptions:(0,i.Z)((0,i.Z)({},n.getEditorOptionsForFilterBuilder(t||n.getDefaultValue(),(function(e){var t=b();t.isValid?g(r,e.value):t.brokenRules.forEach((function(e){var t=e.message;throw new c.Z(t)}))}))),{},{setValueToBuilder:function(e){return g(r,e)},columnName:n.getName()}),children:n.getChildren()},"".concat(t,"-").concat(r,"-item")),1!==h.length?(0,p.jsx)(u.ButtonItem,{buttonOptions:{icon:"remove",useSubmitBehavior:!1,onClick:function(){return C(r)}}},"".concat(t,"-").concat(r,"-button")):null])}),[]),(0,p.jsx)(u.ButtonItem,{cssClass:"add-button",buttonOptions:{icon:"add",useSubmitBehavior:!1,onClick:function(){v((function(e){var i=[].concat((0,o.Z)(e),[n.getDefaultValue()]);return t.setValue(i),i}))},disabled:h.some((function(e){return!(0,s.$K)(e)||""===e}))}})]})})}},6123:function(e,t,n){var i=n(70885),o=n(68962),r=n.n(o),a=n(72791),u=(n(57463),n(80184)),l=new RegExp("^(%)(.*)$","gm"),s=new RegExp("^(.*)(%)$","gm");t.Z=function(e){var t=e.data,n=(0,a.useMemo)((function(){return t.value||""}),[]),c=(0,a.useState)(n),p=(0,i.Z)(c,2),d=p[0],f=p[1],m=(0,a.useState)((function(){return!!n.matchAll(l).next().value})),h=(0,i.Z)(m,2),v=h[0],b=h[1],g=(0,a.useState)((function(){return!!n.matchAll(s).next().value})),C=(0,i.Z)(g,2),y=C[0],O=C[1];return(0,a.useEffect)((function(){t.setValue(d)}),[d]),(0,u.jsx)(r(),{children:(0,u.jsxs)(o.GroupItem,{colCount:6,children:[(0,u.jsx)(o.ButtonItem,{colSpan:1,cssClass:"ends-with percent-btn",buttonOptions:{elementAttr:{class:v?"active":""},icon:"percent",stylingMode:"text",useSubmitBehavior:!1,onClick:function(){f((function(e){return e.matchAll(l).next().value?(b(!1),e.matchAll(l).next().value[2]):(b(!0),"%".concat(e))}))}}}),(0,u.jsx)(o.SimpleItem,{colSpan:4,editorType:"dxTextBox",editorOptions:{value:d,elementAttr:{class:"searchInTextInput"},onValueChanged:function(e){var t=e.value;f(t),b((function(){return!!t.matchAll(l).next().value})),O((function(){return!!t.matchAll(s).next().value}))}}}),(0,u.jsx)(o.ButtonItem,{colSpan:1,cssClass:"percent-btn",buttonOptions:{elementAttr:{class:y?"active":""},icon:"percent",stylingMode:"text",useSubmitBehavior:!1,onClick:function(){f((function(e){return e.matchAll(s).next().value?(O(!1),e.matchAll(s).next().value[1]):(O(!0),"".concat(e,"%"))}))}}})]})})}},20266:function(e,t,n){n.r(t),n.d(t,{default:function(){return D}});var i=n(15671),o=n(43144),r=n(48186),a=n(56118),u=n(72791),l=n(68962),s=n(1413),c=n(70885),p=n(54965),d=n.n(p),f=n(67182),m=n(6123),h=n(41189),v=n(52614),b=n(98482),g=n(24255),C=n(80184),y=function(e){var t=e.tableInstance,n=(0,u.useRef)(),i=(0,u.useMemo)((function(){return h.Z.getCompareTableDto()}),[]),o=(0,u.useMemo)((function(){return t.getTableDataModel().getPrimaryKeys()}),[]),r=(0,u.useMemo)((function(){return t.getTableDataModel().columns.filter((function(e){var t=e.columnName;return o.includes(t)}))}),[]),a=(0,u.useCallback)((function(e){return r.find((function(t){return t.columnName===e}))}),[r]),l=(0,u.useCallback)((function(){var e=o[0];return i.setSelectedCompareCriteriaValue(e),[[e,g.ZP["="],""],g.CI.AND,[e,g.ZP["="],""]]}),[]),y=(0,u.useState)((function(){return l()})),O=(0,c.Z)(y,2),x=O[0],I=O[1];(0,u.useEffect)((function(){var e=(0,c.Z)(x,3),t=e[0],n=e[1],o=e[2];n===g.CI.AND&&t[2]&&o[2]&&(i.setSourceAndTargetFilter(v.e_.createFilterGroup(t),v.e_.createFilterGroup(o)),i.setSelectedCompareCriteriaValue(t[0]))}),[x]);var T=(0,b.rI)(I),A=(0,c.Z)(T,2),_=A[0],D=A[1];return(0,C.jsx)("div",{children:(0,C.jsxs)(d(),{ref:n,value:x,groupOperations:[],onValueChanged:_,onContentReady:D,focusStateEnabled:!0,children:[r.map((function(e){return(0,C.jsx)(p.Field,(0,s.Z)((0,s.Z)({},e.getColumnParametersForFilterSetting()),{},{filterOperations:e.getFilterOperationForComparing()}))})),(0,C.jsx)(p.CustomOperation,{name:"anyof",caption:"Is any of",icon:"check",editorRender:function(e){var t=a(e.field.dataField);return(0,C.jsx)(f.Z,{data:e,column:t})}}),(0,C.jsx)(p.CustomOperation,{name:"searchintext",caption:"Search in text",icon:"search",editorRender:function(e){return(0,C.jsx)(m.Z,{data:e})}})]})})},O=n(9101),x=function(){function e(){(0,i.Z)(this,e),this.name=r.Z.COMPARE_DATA_BY_CAMPAIGN,this.localizedName=(0,a.Z)("COMPARE_DATA_BY_CAMPAIGN"),this.isVisible=void 0}return(0,o.Z)(e,[{key:"setVisible",value:function(e){return this.isVisible=e,this}},{key:"getName",value:function(){return this.name}},{key:"getCaption",value:function(){return(0,a.Z)("SELECT_CAMPAIGN_TO_COMPARE")}},{key:"getComponent",value:function(e,t){return function(e,t){return(0,C.jsxs)(l.GroupItem,{children:[(0,C.jsx)(l.SimpleItem,{editorType:"dxSelectBox",editorOptions:{items:t,value:e,disabled:!0,displayExpr:"name",valueExpr:"campaignId"}}),(0,C.jsx)(l.SimpleItem,{editorType:"dxSelectBox",editorOptions:{items:t,displayExpr:"name",valueExpr:"campaignId",onValueChanged:function(t){var n=t.value;return h.Z.getCompareTableDto().setSourceAndTargetCampaignId(n,e)}},children:(0,C.jsx)(O.RequiredRule,{})})]})}(e.getTableDataModel().getMetadata().campaignId,t)}}],[{key:"create",value:function(t){var n=t.getPrimaryKeys().length>1;return(new e).setVisible(n)}}]),e}(),I=n(1099),T=function(){function e(){(0,i.Z)(this,e),this.name=r.Z.COMPARE_DATA_WITHIN_THIS_LAYOUT,this.localizedName=(0,a.Z)("COMPARE_DATA_WITHIN_THIS_LAYOUT"),this.isVisible=void 0}return(0,o.Z)(e,[{key:"setVisible",value:function(e){return this.isVisible=e,this}},{key:"getName",value:function(){return this.name}},{key:"getCaption",value:function(){return(0,a.Z)("SELECT_FILTERS_TO_COMPARE")}},{key:"getComponent",value:function(e){return function(e){return(0,C.jsx)(y,{tableInstance:e})}(e)}}],[{key:"create",value:function(t){var n=t.getMetadata().getTable().getTableSuffix(),i=e.isButtonVisible(n);return(new e).setVisible(i)}},{key:"isButtonVisible",value:function(e){return e===I.KC.WAREHOUSE_AND_CAMPAIGN_ID_SUFFIX}}]),e}(),A=function(){function e(t){(0,i.Z)(this,e),this.name=r.Z.COMPARE_DATA_FROM_OTHER_LAYOUT,this.localizedName=(0,a.Z)("COMPARE_DATA_FROM_OTHER_LAYOUT"),this.isVisible=void 0,this.tableDataModel=void 0,this.tableDataModel=t}return(0,o.Z)(e,[{key:"setVisible",value:function(e){return this.isVisible=e,this}},{key:"getCaption",value:function(){return(0,a.Z)("SELECT_WAREHOUSE_TO_COMPARE")}},{key:"getName",value:function(){return this.name}},{key:"getComponent",value:function(){return function(e){return(0,C.jsx)(l.SimpleItem,{dataField:"targetWarehouseId",editorType:"dxSelectBox",editorOptions:{items:e,displayExpr:"name",valueExpr:"warehouseId",required:!0,onValueChanged:function(e){var t=e.value;return h.Z.getCompareTableDto().setTargetWarehouseId(parseInt(t,10))}},children:(0,C.jsx)(O.RequiredRule,{})})}(this.tableDataModel.getMetadata().getUserAccessibleWarehouses())}}],[{key:"create",value:function(t){return new e(t).setVisible(!0)}}]),e}(),_=function(){function e(t){return(0,i.Z)(this,e),this.tableDataModel=void 0,this.tableInstance=void 0,this.compareDataFromOtherLayout=void 0,this.compareDataWithinThisLayout=void 0,this.compareDataByCampaign=void 0,e.instance||(e.instance=this),this.tableDataModel=t,this.createCompareButtons(),e.instance}return(0,o.Z)(e,[{key:"createCompareButtons",value:function(){this.compareDataByCampaign=x.create(this.tableDataModel),this.compareDataWithinThisLayout=T.create(this.tableDataModel),this.compareDataFromOtherLayout=A.create(this.tableDataModel)}},{key:"getVisibleCompareTableButtons",value:function(){return[this.compareDataFromOtherLayout,this.compareDataByCampaign,this.compareDataWithinThisLayout].filter((function(e){return e.isVisible}))}}]),e}();_.instance=void 0;var D=_},54965:function(e,t,n){var i=this&&this.__extends||function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}();Object.defineProperty(t,"__esModule",{value:!0}),t.Lookup=t.GroupOperationDescriptions=t.Format=t.FilterOperationDescriptions=t.Field=t.CustomOperation=t.FilterBuilder=void 0;var o=n(11774),r=n(52007),a=n(79714),u=n(98033),l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._WidgetClass=o.default,t.subscribableOptions=["value"],t.independentEvents=["onContentReady","onDisposing","onEditorPrepared","onEditorPreparing","onInitialized","onValueChanged"],t._defaults={defaultValue:"value"},t._expectedChildren={customOperation:{optionName:"customOperations",isCollectionItem:!0},field:{optionName:"fields",isCollectionItem:!0},filterOperationDescriptions:{optionName:"filterOperationDescriptions",isCollectionItem:!1},groupOperationDescriptions:{optionName:"groupOperationDescriptions",isCollectionItem:!1}},t}return i(t,e),Object.defineProperty(t.prototype,"instance",{get:function(){return this._instance},enumerable:!1,configurable:!0}),t}(a.Component);t.FilterBuilder=l,l.propTypes={accessKey:r.string,activeStateEnabled:r.bool,allowHierarchicalFields:r.bool,customOperations:r.array,disabled:r.bool,elementAttr:r.object,fields:r.array,filterOperationDescriptions:r.object,focusStateEnabled:r.bool,groupOperationDescriptions:r.object,groupOperations:r.array,height:r.oneOfType([r.func,r.number,r.string]),hint:r.string,hoverStateEnabled:r.bool,maxGroupLevel:r.number,onContentReady:r.func,onDisposing:r.func,onEditorPrepared:r.func,onEditorPreparing:r.func,onInitialized:r.func,onOptionChanged:r.func,onValueChanged:r.func,rtlEnabled:r.bool,tabIndex:r.number,value:r.oneOfType([r.array,r.func,r.string]),visible:r.bool,width:r.oneOfType([r.func,r.number,r.string])};var s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.OptionName="customOperations",t.IsCollectionItem=!0,t.TemplateProps=[{tmplOption:"editorTemplate",render:"editorRender",component:"editorComponent",keyFn:"editorKeyFn"}],t}(u.default);t.CustomOperation=s;var c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.OptionName="fields",t.IsCollectionItem=!0,t.ExpectedChildren={format:{optionName:"format",isCollectionItem:!1},lookup:{optionName:"lookup",isCollectionItem:!1}},t.TemplateProps=[{tmplOption:"editorTemplate",render:"editorRender",component:"editorComponent",keyFn:"editorKeyFn"}],t}(u.default);t.Field=c;var p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.OptionName="filterOperationDescriptions",t}(u.default);t.FilterOperationDescriptions=p;var d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.OptionName="format",t}(u.default);t.Format=d;var f=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.OptionName="groupOperationDescriptions",t}(u.default);t.GroupOperationDescriptions=f;var m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.OptionName="lookup",t}(u.default);t.Lookup=m,t.default=l},57463:function(){}}]);
//# sourceMappingURL=266.6dda5a99.chunk.js.map