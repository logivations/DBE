/*! For license information please see ColorBox.9bd0bbbb.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkroot1=self.webpackChunkroot1||[]).push([[810],{13486:function(e,t,n){var o=this&&this.__extends||function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(t,"__esModule",{value:!0}),t.ToolbarItem=t.To=t.Show=t.Position=t.Options=t.Offset=t.My=t.Hide=t.From=t.DropDownOptions=t.Collision=t.Button=t.BoundaryOffset=t.At=t.Animation=t.ColorBox=void 0;var a=n(10461),i=n(52007),l=n(79714),r=n(98033),s=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._WidgetClass=a.default,t.subscribableOptions=["opened","value"],t.independentEvents=["onChange","onClosed","onCopy","onCut","onDisposing","onEnterKey","onFocusIn","onFocusOut","onInitialized","onInput","onKeyDown","onKeyUp","onOpened","onPaste","onValueChanged"],t._defaults={defaultOpened:"opened",defaultValue:"value"},t._expectedChildren={button:{optionName:"buttons",isCollectionItem:!0},dropDownOptions:{optionName:"dropDownOptions",isCollectionItem:!1}},t._templateProps=[{tmplOption:"dropDownButtonTemplate",render:"dropDownButtonRender",component:"dropDownButtonComponent",keyFn:"dropDownButtonKeyFn"},{tmplOption:"fieldTemplate",render:"fieldRender",component:"fieldComponent",keyFn:"fieldKeyFn"}],t}return o(t,e),Object.defineProperty(t.prototype,"instance",{get:function(){return this._instance},enumerable:!1,configurable:!0}),t}(l.Component);t.ColorBox=s,s.propTypes={acceptCustomValue:i.bool,accessKey:i.string,activeStateEnabled:i.bool,applyButtonText:i.string,applyValueMode:i.oneOfType([i.string,i.oneOf(["instantly","useButtons"])]),buttons:i.array,cancelButtonText:i.string,deferRendering:i.bool,disabled:i.bool,dropDownOptions:i.object,editAlphaChannel:i.bool,elementAttr:i.object,focusStateEnabled:i.bool,height:i.oneOfType([i.func,i.number,i.string]),hint:i.string,hoverStateEnabled:i.bool,isValid:i.bool,keyStep:i.number,label:i.string,labelMode:i.oneOfType([i.string,i.oneOf(["static","floating","hidden"])]),name:i.string,onChange:i.func,onClosed:i.func,onCopy:i.func,onCut:i.func,onDisposing:i.func,onEnterKey:i.func,onFocusIn:i.func,onFocusOut:i.func,onInitialized:i.func,onInput:i.func,onKeyDown:i.func,onKeyUp:i.func,onOpened:i.func,onOptionChanged:i.func,onPaste:i.func,onValueChanged:i.func,opened:i.bool,openOnFieldClick:i.bool,placeholder:i.string,readOnly:i.bool,rtlEnabled:i.bool,showClearButton:i.bool,showDropDownButton:i.bool,stylingMode:i.oneOfType([i.string,i.oneOf(["outlined","underlined","filled"])]),tabIndex:i.number,text:i.string,validationErrors:i.array,validationMessageMode:i.oneOfType([i.string,i.oneOf(["always","auto"])]),validationMessagePosition:i.oneOfType([i.string,i.oneOf(["bottom","left","right","top","auto"])]),validationStatus:i.oneOfType([i.string,i.oneOf(["valid","invalid","pending"])]),value:i.string,visible:i.bool,width:i.oneOfType([i.func,i.number,i.string])};var h=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="animation",t.ExpectedChildren={hide:{optionName:"hide",isCollectionItem:!1},show:{optionName:"show",isCollectionItem:!1}},t}(r.default);t.Animation=h;var u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="at",t}(r.default);t.At=u;var p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="boundaryOffset",t}(r.default);t.BoundaryOffset=p;var d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="buttons",t.IsCollectionItem=!0,t.ExpectedChildren={options:{optionName:"options",isCollectionItem:!1}},t}(r.default);t.Button=d;var c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="collision",t}(r.default);t.Collision=c;var _=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="dropDownOptions",t.DefaultsProps={defaultHeight:"height",defaultPosition:"position",defaultVisible:"visible",defaultWidth:"width"},t.ExpectedChildren={animation:{optionName:"animation",isCollectionItem:!1},position:{optionName:"position",isCollectionItem:!1},toolbarItem:{optionName:"toolbarItems",isCollectionItem:!0}},t.TemplateProps=[{tmplOption:"contentTemplate",render:"contentRender",component:"contentComponent",keyFn:"contentKeyFn"},{tmplOption:"titleTemplate",render:"titleRender",component:"titleComponent",keyFn:"titleKeyFn"}],t}(r.default);t.DropDownOptions=_;var C=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="from",t.ExpectedChildren={position:{optionName:"position",isCollectionItem:!1}},t}(r.default);t.From=C;var v=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="hide",t.ExpectedChildren={from:{optionName:"from",isCollectionItem:!1},to:{optionName:"to",isCollectionItem:!1}},t}(r.default);t.Hide=v;var f=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="my",t}(r.default);t.My=f;var m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="offset",t}(r.default);t.Offset=m;var g=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="options",t.TemplateProps=[{tmplOption:"template",render:"render",component:"component",keyFn:"keyFn"}],t}(r.default);t.Options=g;var b=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="position",t}(r.default);t.Position=b;var y=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="show",t}(r.default);t.Show=y;var w=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="to",t}(r.default);t.To=w;var H=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.OptionName="toolbarItems",t.IsCollectionItem=!0,t.TemplateProps=[{tmplOption:"menuItemTemplate",render:"menuItemRender",component:"menuItemComponent",keyFn:"menuItemKeyFn"},{tmplOption:"template",render:"render",component:"component",keyFn:"keyFn"}],t}(r.default);t.ToolbarItem=H,t.default=s},10461:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var o=n(39138),a=n(40007),i=n(18074),l=n(55163),r=n(52449),s=n(46237),h=n(20951),u="dx-colorbox",p=u+"-input",d=p+"-container",c=u+"-color-result-preview",_=u+"-color-is-not-defined",C=u+"-overlay",v=l.Z.prototype,f={makeTransparentBackground:v._makeTransparentBackground.bind(v),makeRgba:v._makeRgba.bind(v)},m=h.Z.inherit({_supportedKeys:function(){var e=function(e){if(e.stopPropagation(),this.option("opened"))return e.preventDefault(),!0};return(0,r.l)(this.callBase(),{tab:function(e){this.option("opened")&&(e.preventDefault(),this._colorView._rgbInputs[0].focus())},enter:this._enterKeyHandler,leftArrow:e,rightArrow:e,upArrow:function(e){return this.option("opened")?!e.altKey||(this.close(),!1):(e.preventDefault(),!1)},downArrow:function(e){return this.option("opened")||e.altKey?!(!this.option("opened")&&e.altKey)||(this._validatedOpening(),!1):(e.preventDefault(),!1)}})},_getDefaultOptions:function(){return(0,r.l)(this.callBase(),{editAlphaChannel:!1,applyValueMode:"useButtons",keyStep:1,fieldTemplate:null,buttonsLocation:"bottom after"})},_popupHidingHandler:function(){this.callBase(),"useButtons"===this.option("applyValueMode")&&this._updateColorViewValue(this.option("value"))},_popupConfig:function(){return(0,r.l)(this.callBase(),{width:""})},_contentReadyHandler:function(){this._createColorView(),this._addPopupBottomClasses()},_addPopupBottomClasses:function(){var e=this._popup.bottomToolbar();e&&(e.addClass("dx-colorview-container-cell").addClass("dx-colorview-button-cell").find(".dx-toolbar-items-container").addClass("dx-colorview-buttons-container"),e.find(".dx-popup-done").addClass("dx-colorview-apply-button"),e.find(".dx-popup-cancel").addClass("dx-colorview-cancel-button"))},_createColorView:function(){this._popup.$overlayContent().addClass(C);var e=(0,o.Z)("<div>").appendTo(this._popup.$content());this._colorView=this._createComponent(e,l.Z,this._colorViewConfig()),this._colorView.registerKeyHandler("escape",this._escapeHandler.bind(this)),a.Z.on(e,"focus",function(){this.focus()}.bind(this))},_escapeHandler:function(){this.close(),this.focus()},_applyNewColor:function(e){this.option("value",e),e&&f.makeTransparentBackground(this._$colorResultPreview,e),this._colorViewEnterKeyPressed&&(this.close(),this._colorViewEnterKeyPressed=!1)},_colorViewConfig:function(){var e=this;return{value:e.option("value"),matchValue:e.option("value"),editAlphaChannel:e.option("editAlphaChannel"),applyValueMode:e.option("applyValueMode"),focusStateEnabled:e.option("focusStateEnabled"),stylingMode:this.option("stylingMode"),onEnterKeyPressed:function(t){var n=t.event;e._colorViewEnterKeyPressed=!0,e._colorView.option("value")!==e.option("value")&&(e._saveValueChangeEvent(n),e._applyNewColor(e._colorView.option("value")),e.close())},onValueChanged:function(t){var n=t.event,o=t.value,a=t.previousValue,i="instantly"===e.option("applyValueMode"),l=f.makeRgba(o)===a,r=i||e._colorViewEnterKeyPressed,s=e._shouldSaveEmptyValue;l||!r||s||(n&&e._saveValueChangeEvent(n),e._applyNewColor(o))}}},_enterKeyHandler:function(e){var t=this._input().val(),n=this.option(),o=n.value,a=n.editAlphaChannel,l=o&&a?f.makeRgba(o):o;if(!t)return!1;if(!new i.Z(t).colorIsInvalid){if(t!==l&&(this._applyColorFromInput(t),this._saveValueChangeEvent(e),this.option("value",this.option("editAlphaChannel")?f.makeRgba(t):t)),this._colorView){var r=this._colorView.option("value");o!==r&&(this._saveValueChangeEvent(e),this.option("value",r))}return this.close(),!1}this._input().val(l)},_applyButtonHandler:function(e){this._saveValueChangeEvent(e.event),this._applyNewColor(this._colorView.option("value")),this.callBase()},_cancelButtonHandler:function(){this._resetInputValue(),this.callBase()},_getKeyboardListeners:function(){return this.callBase().concat([this._colorView])},_init:function(){this.callBase()},_initMarkup:function(){this.$element().addClass(u),this.callBase()},_renderInput:function(){this.callBase(),this._input().addClass(p),this._renderColorPreview()},_renderColorPreview:function(){this.$element().wrapInner((0,o.Z)("<div>").addClass(d)),this._$colorBoxInputContainer=this.$element().children().eq(0),this._$colorResultPreview=(0,o.Z)("<div>").addClass(c).appendTo(this._$textEditorInputContainer),this.option("value")?f.makeTransparentBackground(this._$colorResultPreview,this.option("value")):this._$colorBoxInputContainer.addClass(_)},_renderValue:function(){var e=this.option(),t=e.value,n=e.editAlphaChannel,o=t&&n?f.makeRgba(t):t;return this.option("text",o),this.callBase()},_resetInputValue:function(){var e=this._input(),t=this.option("value");e.val(t),this._updateColorViewValue(t)},_updateColorViewValue:function(e){this._colorView&&this._colorView.option({value:e,matchValue:e})},_valueChangeEventHandler:function(e){var t=this._input().val();t&&(t=this._applyColorFromInput(t),this._updateColorViewValue(t)),this.callBase(e,t)},_applyColorFromInput:function(e){return new i.Z(e).colorIsInvalid&&(this._resetInputValue(),e=this.option("value")),e},_clean:function(){this.callBase(),delete this._shouldSaveEmptyValue},_optionChanged:function(e){var t=e.value,n=e.name;switch(n){case"value":this._$colorBoxInputContainer.toggleClass(_,!t),t?f.makeTransparentBackground(this._$colorResultPreview,t):this._$colorResultPreview.removeAttr("style"),null===t&&(this._shouldSaveEmptyValue=!0),this._updateColorViewValue(t),this._shouldSaveEmptyValue=!1,this.callBase(e);break;case"applyButtonText":case"cancelButtonText":this.callBase(e),this._popup&&this._addPopupBottomClasses();break;case"editAlphaChannel":case"keyStep":this._colorView&&this._colorView.option(n,t);break;default:this.callBase(e)}}});(0,s.Z)("dxColorBox",m);var g=m},55163:function(e,t,n){var o=n(14334),a=n(39138),i=n(40007),l=n(37314),r=n(52449),s=n(18074),h=n(15044),u=n(68970),p=n(46237),d=n(72927),c=n(24123),_=n(36161),C=n(49173),v=n(15388),f=n(98091),m="dx-colorview-container-row",g="dx-colorview-palette-gradient",b="dx-colorview-palette-gradient-white",y="dx-colorview-palette-gradient-black",w="dx-colorview-color-preview",H="dx-colorview-color-preview-color-current",x="dx-colorview-color-preview-color-new",k=d.Z.inherit({_supportedKeys:function(){var e=this.option("rtlEnabled"),t=this,n=function(e){var n=100/t._paletteWidth;return e.shiftKey&&(n*=t.option("keyStep")),n=n>1?n:1,Math.round(n)},o=function(e){var n=t._currentColor.hsv.s+e;n>100?n=100:n<0&&(n=0),t._currentColor.hsv.s=n,s()},a=function(e){var n=100/t._paletteHeight;return e.shiftKey&&(n*=t.option("keyStep")),n=n>1?n:1,Math.round(n)},i=function(e){var n=t._currentColor.hsv.v+e;n>100?n=100:n<0&&(n=0),t._currentColor.hsv.v=n,s()};function s(){t._placePaletteHandle(),t._updateColorFromHsv(t._currentColor.hsv.h,t._currentColor.hsv.s,t._currentColor.hsv.v)}var h=function(e){var n=360/(t._hueScaleWrapperHeight-t._hueScaleHandleHeight);return e.shiftKey&&(n*=t.option("keyStep")),n=n>1?n:1},u=function(e){t._currentColor.hsv.h+=e,t._placeHueScaleHandle();var n=(0,l.jt)(t._$hueScaleHandle);t._updateColorHue(n.top+t._hueScaleHandleHeight/2)},p=function(n){var o=1/t._alphaChannelScaleWorkWidth;return n.shiftKey&&(o*=t.option("keyStep")),o=o>.01?o:.01,o=e?-o:o},d=function(e){t._currentColor.a+=e,t._placeAlphaChannelHandle();var n=(0,l.jt)(t._$alphaChannelHandle);t._calculateColorTransparencyByScaleWidth(n.left+t._alphaChannelHandleWidth/2)};return(0,r.l)(this.callBase(),{upArrow:function(e){e.preventDefault(),e.stopPropagation(),(0,v.j1)(e)?this._currentColor.hsv.h<=360&&!this._isTopColorHue&&(this._saveValueChangeEvent(e),u(h(e))):this._currentColor.hsv.v<100&&(this._saveValueChangeEvent(e),i(a(e)))},downArrow:function(e){e.preventDefault(),e.stopPropagation(),(0,v.j1)(e)?this._currentColor.hsv.h>=0&&(this._isTopColorHue&&(this._currentColor.hsv.h=360),this._saveValueChangeEvent(e),u(-h(e))):this._currentColor.hsv.v>0&&(this._saveValueChangeEvent(e),i(-a(e)))},rightArrow:function(t){t.preventDefault(),t.stopPropagation(),(0,v.j1)(t)?(e?this._currentColor.a<1:this._currentColor.a>0&&this.option("editAlphaChannel"))&&(this._saveValueChangeEvent(t),d(-p(t))):this._currentColor.hsv.s<100&&(this._saveValueChangeEvent(t),o(n(t)))},leftArrow:function(t){t.preventDefault(),t.stopPropagation(),(0,v.j1)(t)?(e?this._currentColor.a>0:this._currentColor.a<1&&this.option("editAlphaChannel"))&&(this._saveValueChangeEvent(t),d(p(t))):this._currentColor.hsv.s>0&&(this._saveValueChangeEvent(t),o(-n(t)))},enter:function(e){this._fireEnterKeyPressed(e)}})},_getDefaultOptions:function(){return(0,r.l)(this.callBase(),{value:null,matchValue:null,onEnterKeyPressed:void 0,editAlphaChannel:!1,keyStep:1,stylingMode:void 0})},_defaultOptionsRules:function(){return this.callBase().concat([{device:function(){return"desktop"===u.Z.real().deviceType&&!u.Z.isSimulator()},options:{focusStateEnabled:!0}}])},_init:function(){this.callBase(),this._initColorAndOpacity(),this._initEnterKeyPressedAction()},_initEnterKeyPressedAction:function(){this._onEnterKeyPressedAction=this._createActionByOption("onEnterKeyPressed")},_fireEnterKeyPressed:function(e){this._onEnterKeyPressedAction&&this._onEnterKeyPressedAction({event:e})},_initColorAndOpacity:function(){this._setCurrentColor(this.option("value"))},_setCurrentColor:function(e){e=e||"#000000";var t=new s.Z(e);t.colorIsInvalid?this.option("value",this._currentColor.baseColor):this._currentColor&&this._makeRgba(this._currentColor)===this._makeRgba(t)||(this._currentColor=t,this._$currentColor&&this._makeTransparentBackground(this._$currentColor,t))},_setBaseColor:function(e){var t=e||"#000000",n=new s.Z(t);n.colorIsInvalid||this._makeRgba(this.option("matchValue")!==this._makeRgba(n))&&this._$baseColor&&this._makeTransparentBackground(this._$baseColor,n)},_initMarkup:function(){this.callBase(),this.$element().addClass("dx-colorview"),this._renderColorPickerContainer()},_render:function(){this.callBase(),this._renderPalette(),this._renderHueScale(),this._renderControlsContainer(),this._renderControls(),this._renderAlphaChannelElements()},_makeTransparentBackground:function(e,t){t instanceof s.Z||(t=new s.Z(t)),e.css("backgroundColor",this._makeRgba(t))},_makeRgba:function(e){return e instanceof s.Z||(e=new s.Z(e)),"rgba("+[e.r,e.g,e.b,e.a].join(", ")+")"},_renderValue:function(){this.callBase(this.option("editAlphaChannel")?this._makeRgba(this._currentColor):this.option("value"))},_renderColorPickerContainer:function(){var e=this.$element();this._$colorPickerContainer=(0,a.Z)("<div>").addClass("dx-colorview-container").appendTo(e),this._renderHtmlRows()},_renderHtmlRows:function(e){var t=this._$colorPickerContainer.find("."+m),n=t.length,o=n-(this.option("editAlphaChannel")?2:1);if(o>0&&t.eq(-1).remove(),o<0){o=Math.abs(o);var i,l=[];for(i=0;i<o;i++)l.push((0,a.Z)("<div>").addClass(m));if(n)for(i=0;i<l.length;i++)t.eq(0).after(l[i]);else this._$colorPickerContainer.append(l)}},_renderHtmlCellInsideRow:function(e,t,n){return(0,a.Z)("<div>").addClass("dx-colorview-container-cell").addClass(n).appendTo(t.find("."+m).eq(e))},_renderPalette:function(){var e=this._renderHtmlCellInsideRow(0,this._$colorPickerContainer,"dx-colorview-palette-cell"),t=(0,a.Z)("<div>").addClass([g,b].join(" ")),n=(0,a.Z)("<div>").addClass([g,y].join(" "));this._$palette=(0,a.Z)("<div>").addClass("dx-colorview-palette").css("backgroundColor",this._currentColor.getPureColor().toHex()).appendTo(e),this._paletteHeight=(0,o.Cr)(this._$palette),this._paletteWidth=(0,o.dz)(this._$palette),this._renderPaletteHandle(),this._$palette.append([t,n])},_renderPaletteHandle:function(){var e=this;this._$paletteHandle=(0,a.Z)("<div>").addClass("dx-colorview-palette-handle").appendTo(this._$palette),this._createComponent(this._$paletteHandle,C.default,{contentTemplate:null,boundary:this._$palette,allowMoveByClick:!0,boundOffset:function(){return-this._paletteHandleHeight/2}.bind(this),onDragMove:function(t){var n=t.event,o=(0,l.jt)(e._$paletteHandle);e._updateByDrag=!0,e._saveValueChangeEvent(n),e._updateColorFromHsv(e._currentColor.hsv.h,e._calculateColorSaturation(o),e._calculateColorValue(o))}}),this._paletteHandleWidth=(0,o.dz)(this._$paletteHandle),this._paletteHandleHeight=(0,o.Cr)(this._$paletteHandle),this._placePaletteHandle()},_placePaletteHandle:function(){(0,l.pB)(this._$paletteHandle,{left:Math.round(this._paletteWidth*this._currentColor.hsv.s/100-this._paletteHandleWidth/2),top:Math.round(this._paletteHeight-this._paletteHeight*this._currentColor.hsv.v/100-this._paletteHandleHeight/2)})},_calculateColorValue:function(e){var t=Math.floor(e.top+this._paletteHandleHeight/2);return 100-Math.round(100*t/this._paletteHeight)},_calculateColorSaturation:function(e){var t=Math.floor(e.left+this._paletteHandleWidth/2);return Math.round(100*t/this._paletteWidth)},_updateColorFromHsv:function(e,t,n){var o=this._currentColor.a;this._currentColor=new s.Z("hsv("+[e,t,n].join(",")+")"),this._currentColor.a=o,this._updateColorParamsAndColorPreview(),this.applyColor()},_renderHueScale:function(){var e=this._renderHtmlCellInsideRow(0,this._$colorPickerContainer,"dx-colorview-hue-scale-cell");this._$hueScaleWrapper=(0,a.Z)("<div>").addClass("dx-colorview-hue-scale-wrapper").appendTo(e),this._$hueScale=(0,a.Z)("<div>").addClass("dx-colorview-hue-scale").appendTo(this._$hueScaleWrapper),this._hueScaleHeight=(0,o.Cr)(this._$hueScale),this._hueScaleWrapperHeight=(0,o.zp)(this._$hueScaleWrapper),this._renderHueScaleHandle()},_renderHueScaleHandle:function(){var e=this;this._$hueScaleHandle=(0,a.Z)("<div>").addClass("dx-colorview-hue-scale-handle").appendTo(this._$hueScaleWrapper),this._createComponent(this._$hueScaleHandle,C.default,{contentTemplate:null,boundary:this._$hueScaleWrapper,allowMoveByClick:!0,dragDirection:"vertical",onDragMove:function(t){var n=t.event;e._updateByDrag=!0,e._saveValueChangeEvent(n),e._updateColorHue((0,l.jt)(e._$hueScaleHandle).top+e._hueScaleHandleHeight/2)}}),this._hueScaleHandleHeight=(0,o.Cr)(this._$hueScaleHandle),this._placeHueScaleHandle()},_placeHueScaleHandle:function(){var e=this._hueScaleWrapperHeight,t=this._hueScaleHandleHeight,n=(e-t)*(360-this._currentColor.hsv.h)/360;e<n+t&&(n=e-t),n<0&&(n=0),(0,l.pB)(this._$hueScaleHandle,{top:Math.round(n)})},_updateColorHue:function(e){var t=360-Math.round(360*(e-this._hueScaleHandleHeight/2)/(this._hueScaleWrapperHeight-this._hueScaleHandleHeight)),n=this._currentColor.hsv.s,o=this._currentColor.hsv.v;this._isTopColorHue=!1,(t=t<0?0:t)>=360&&(this._isTopColorHue=!0,t=0),this._updateColorFromHsv(t,n,o),this._$palette.css("backgroundColor",this._currentColor.getPureColor().toHex())},_renderControlsContainer:function(){var e=this._renderHtmlCellInsideRow(0,this._$colorPickerContainer);this._$controlsContainer=(0,a.Z)("<div>").addClass("dx-colorview-controls-container").appendTo(e)},_renderControls:function(){this._renderColorsPreview(),this._renderRgbInputs(),this._renderHexInput()},_renderColorsPreview:function(){var e=(0,a.Z)("<div>").addClass("dx-colorview-color-preview-container").appendTo(this._$controlsContainer),t=(0,a.Z)("<div>").addClass("dx-colorview-color-preview-container-inner").appendTo(e);this._$currentColor=(0,a.Z)("<div>").addClass([w,x].join(" ")),this._$baseColor=(0,a.Z)("<div>").addClass([w,H].join(" ")),this._makeTransparentBackground(this._$baseColor,this.option("matchValue")),this._makeTransparentBackground(this._$currentColor,this._currentColor),t.append([this._$baseColor,this._$currentColor])},_renderAlphaChannelElements:function(){this.option("editAlphaChannel")&&(this._$colorPickerContainer.find("."+m).eq(1).addClass("dx-colorview-alpha-channel-row"),this._renderAlphaChannelScale(),this._renderAlphaChannelInput())},_renderRgbInputs:function(){this._rgbInputsWithLabels=[this._renderEditorWithLabel({editorType:c.default,value:this._currentColor.r,onValueChanged:this._updateColor.bind(this,!1),labelText:"R",labelAriaText:h.Z.format("dxColorView-ariaRed"),labelClass:"dx-colorview-label-red"}),this._renderEditorWithLabel({editorType:c.default,value:this._currentColor.g,onValueChanged:this._updateColor.bind(this,!1),labelText:"G",labelAriaText:h.Z.format("dxColorView-ariaGreen"),labelClass:"dx-colorview-label-green"}),this._renderEditorWithLabel({editorType:c.default,value:this._currentColor.b,onValueChanged:this._updateColor.bind(this,!1),labelText:"B",labelAriaText:h.Z.format("dxColorView-ariaBlue"),labelClass:"dx-colorview-label-blue"})],this._$controlsContainer.append(this._rgbInputsWithLabels),this._rgbInputs=[this._rgbInputsWithLabels[0].find(".dx-numberbox").dxNumberBox("instance"),this._rgbInputsWithLabels[1].find(".dx-numberbox").dxNumberBox("instance"),this._rgbInputsWithLabels[2].find(".dx-numberbox").dxNumberBox("instance")]},_renderEditorWithLabel:function(e){var t=this,n=(0,a.Z)("<div>"),o=(0,a.Z)("<label>").addClass(e.labelClass).text(e.labelText+":").append(n);i.Z.off(o,f.u),i.Z.on(o,f.u,(function(e){e.preventDefault()}));var l=e.editorType,s=(0,r.l)({value:e.value,onValueChanged:e.onValueChanged,onKeyboardHandled:function(e){return t._keyboardHandler(e)}},{stylingMode:this.option("stylingMode")});return l===c.default&&(s.min=e.min||0,s.max=e.max||255,s.step=e.step||1),new l(n,s).registerKeyHandler("enter",function(e){this._fireEnterKeyPressed(e)}.bind(this)),this.setAria("label",e.labelAriaText,n),o},hexInputOptions:function(){return{editorType:_.default,value:this._currentColor.toHex().replace("#",""),onValueChanged:this._updateColor.bind(this,!0),labelClass:"dx-colorview-label-hex",labelText:"#",labelAriaText:h.Z.format("dxColorView-ariaHex")}},_renderHexInput:function(){this._hexInput=_.default.getInstance(this._renderEditorWithLabel(this.hexInputOptions()).appendTo(this._$controlsContainer).find(".dx-textbox"))},_renderAlphaChannelScale:function(){var e=this._renderHtmlCellInsideRow(1,this._$colorPickerContainer,"dx-colorview-alpha-channel-cell"),t=(0,a.Z)("<div>").addClass("dx-colorview-alpha-channel-border").appendTo(e),n=(0,a.Z)("<div>").addClass("dx-colorview-alpha-channel-wrapper").appendTo(t);this._$alphaChannelScale=(0,a.Z)("<div>").addClass("dx-colorview-alpha-channel-scale").appendTo(n),this._makeCSSLinearGradient(this._$alphaChannelScale),this._renderAlphaChannelHandle(e)},_makeCSSLinearGradient:function(e){var t=this._currentColor,n=[t.r,t.g,t.b].join(","),o=t.toHex().replace("#","");e.attr("style",function(e,t){var n=this.option("rtlEnabled"),o="rgba("+e+", "+(n?"1":"0")+")",a="rgba("+e+", "+(n?"0":"1")+")";return["background-image: -webkit-linear-gradient(180deg, "+o+", "+a+")","background-image: -moz-linear-gradient(-90deg, "+o+", "+a+")","background-image: -o-linear-gradient(-90deg, "+o+", "+a+")","background-image: linear-gradient(-90deg, "+o+", "+a+")"].join(";")}.call(this,n,o))},_renderAlphaChannelInput:function(){var e=this,t=this._renderHtmlCellInsideRow(1,this._$colorPickerContainer);e._alphaChannelInput=this._renderEditorWithLabel({editorType:c.default,value:this._currentColor.a,max:1,step:.1,onValueChanged:function(t){var n=t.value;n=e._currentColor.isValidAlpha(n)?n:e._currentColor.a,t.event&&e._saveValueChangeEvent(t.event),e._updateColorTransparency(n),e._placeAlphaChannelHandle()},labelClass:"dx-colorview-alpha-channel-label",labelText:"Alpha",labelAriaText:h.Z.format("dxColorView-ariaAlpha")}).appendTo(t).find(".dx-numberbox").dxNumberBox("instance")},_updateColorTransparency:function(e){this._currentColor.a=e,this.applyColor()},_renderAlphaChannelHandle:function(e){var t=this;this._$alphaChannelHandle=(0,a.Z)("<div>").addClass("dx-colorview-alpha-channel-handle").appendTo(e),this._createComponent(this._$alphaChannelHandle,C.default,{contentTemplate:null,boundary:e,allowMoveByClick:!0,dragDirection:"horizontal",onDragMove:function(e){var n=e.event;t._updateByDrag=!0;var o=t._$alphaChannelHandle,a=(0,l.jt)(o).left+t._alphaChannelHandleWidth/2;t._saveValueChangeEvent(n),t._calculateColorTransparencyByScaleWidth(a)}}),this._alphaChannelHandleWidth=(0,o.dz)(this._$alphaChannelHandle),this._alphaChannelScaleWorkWidth=(0,o.dz)(e)-this._alphaChannelHandleWidth,this._placeAlphaChannelHandle()},_calculateColorTransparencyByScaleWidth:function(e){var t=(e-this._alphaChannelHandleWidth/2)/this._alphaChannelScaleWorkWidth,n=this.option("rtlEnabled");t=n?t:1-t,e>=this._alphaChannelScaleWorkWidth+this._alphaChannelHandleWidth/2?t=n?1:0:t<1&&(t=t.toFixed(2));var o=this._alphaChannelInput.option("value");t=Math.max(t,0),(t=Math.min(t,1))===o?this._updateByDrag=!1:this._alphaChannelInput.option("value",t)},_placeAlphaChannelHandle:function(){var e=this._alphaChannelScaleWorkWidth*(1-this._currentColor.a);e<0&&(e=0),this._alphaChannelScaleWorkWidth<e&&(e=this._alphaChannelScaleWorkWidth),(0,l.pB)(this._$alphaChannelHandle,{left:this.option("rtlEnabled")?this._alphaChannelScaleWorkWidth-e:e})},applyColor:function(){var e=this.option("value"),t=this.option("editAlphaChannel")?this._makeRgba(this._currentColor):this._currentColor.toHex();this._makeTransparentBackground(this._$currentColor,this._currentColor),t===e?this._updateByDrag=!1:this.option("value",t)},cancelColor:function(){this._initColorAndOpacity(),this._refreshMarkup()},_updateColor:function(e,t){var n,o;e?o=this._validateHex("#"+this._hexInput.option("value")):(n=this._validateRgb(),this._alphaChannelInput?(n.push(this._alphaChannelInput.option("value")),o="rgba("+n.join(", ")+")"):o="rgb("+n.join(", ")+")"),this._suppressEditorsValueUpdating||(this._currentColor=new s.Z(o),this._saveValueChangeEvent(t.event),this.applyColor(),this._refreshMarkup())},_validateHex:function(e){return this._currentColor.isValidHex(e)?e:this._currentColor.toHex()},_validateRgb:function(){var e=this._rgbInputs[0].option("value"),t=this._rgbInputs[1].option("value"),n=this._rgbInputs[2].option("value");return this._currentColor.isValidRGB(e,t,n)||(e=this._currentColor.r,t=this._currentColor.g,n=this._currentColor.b),[e,t,n]},_refreshMarkup:function(){this._placeHueScaleHandle(),this._placePaletteHandle(),this._updateColorParamsAndColorPreview(),this._$palette.css("backgroundColor",this._currentColor.getPureColor().toHex()),this._$alphaChannelHandle&&(this._updateColorTransparency(this._currentColor.a),this._placeAlphaChannelHandle())},_updateColorParamsAndColorPreview:function(){this._suppressEditorsValueUpdating=!0,this._hexInput.option("value",this._currentColor.toHex().replace("#","")),this._rgbInputs[0].option("value",this._currentColor.r),this._rgbInputs[1].option("value",this._currentColor.g),this._rgbInputs[2].option("value",this._currentColor.b),this._suppressEditorsValueUpdating=!1,this.option("editAlphaChannel")&&(this._makeCSSLinearGradient.call(this,this._$alphaChannelScale),this._alphaChannelInput.option("value",this._currentColor.a))},_optionChanged:function(e){var t=e.value;switch(e.name){case"value":this._setCurrentColor(t),this._updateByDrag||this._refreshMarkup(),this._updateByDrag=!1,this.callBase(e);break;case"matchValue":this._setBaseColor(t);break;case"onEnterKeyPressed":this._initEnterKeyPressedAction();break;case"editAlphaChannel":this._$colorPickerContainer&&(this._renderHtmlRows("editAlphaChannel"),this._renderAlphaChannelElements());break;case"keyStep":break;case"stylingMode":this._renderControls();break;default:this.callBase(e)}}});(0,p.Z)("dxColorView",k),t.Z=k}}]);
//# sourceMappingURL=ColorBox.9bd0bbbb.chunk.js.map