(window.webpackJsonpplaid=window.webpackJsonpplaid||[]).push([[0],[,,,,,,,,function(e,t,n){},,,function(e,t,n){e.exports=n(29)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(9),o=n.n(r),l=(n(16),n(10)),s=n(2),h=n(3),c=n(6),d=n(4),u=n(1),p=n(5),g=(n(17),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).side=null,n.priorClick={coords:{v:0,h:0},idx:null,dir:null},n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=document.getElementById("canvas"),t=(getComputedStyle(e).getPropertyValue("border"),document.getElementById("canvas-container")),n=getComputedStyle(t),a=parseInt(n.width.slice(0,-2)),i=parseInt(n.height.slice(0,-2));this.side=a>i?i:a,this.props.setSide(this.side),this.updateCanvas()}},{key:"componentDidUpdate",value:function(){this.updateCanvas()}},{key:"updateCanvas",value:function(){for(var e=this.refs.canvas.getContext("2d"),t=this.props.panels,n=0;n<t.length;n++)t[n].draw(e,this.side,this.side)}},{key:"canvasCoords",value:function(e){var t=e.target,n=parseInt(getComputedStyle(t,null).getPropertyValue("border-left-width").slice(0,-2)),a=t.offsetLeft+n,i=t.offsetTop+n;return{v:e.pageX-a,h:e.pageY-i}}},{key:"canvasClick",value:function(e){e.preventDefault();for(var t=this.canvasCoords(e),n=this.props.panels,a=1;a<n.length;a++){var i,r=n[a],o=(r.grid,void 0);o="b"===r.orientation?["h","v"]:[r.orientation];var l=!0,s=!1,h=void 0;try{for(var c,d=o[Symbol.iterator]();!(l=(c=d.next()).done);l=!0){i=c.value;var u,p=r.grid[i],g=!0,v=!1,f=void 0;try{for(var b,m=p[Symbol.iterator]();!(g=(b=m.next()).done);g=!0)if(u=b.value,t[i]>u&&t[i]<u+r.thickness)return console.log("click registered"),this.props.handleClick(a-this.props.currentPanel),this.priorClick.dir=i,this.priorClick.coords.v=t.v,this.priorClick.coords.h=t.h,this.priorClick.idx=a,!0}catch(C){v=!0,f=C}finally{try{g||null==m.return||m.return()}finally{if(v)throw f}}}}catch(C){s=!0,h=C}finally{try{l||null==d.return||d.return()}finally{if(s)throw h}}}return this.props.handleClick(0-this.props.currentPanel),this.priorClick.dir=null,this.priorClick.coords.v=0,this.priorClick.coords.h=0,this.priorClick.idx=null,!1}},{key:"canvasUnclick",value:function(e){if(e.preventDefault(),null!==this.priorClick.idx){var t=this.canvasCoords(e),n=this.props.panels[this.priorClick.idx];if("h"===this.priorClick.dir){var a=t.h-this.priorClick.coords.h;n.offset.y+=a}else if("v"===this.priorClick.dir){var i=t.v-this.priorClick.coords.v;n.offset.x+=i}this.updateCanvas(),this.priorClick.dir=null,this.priorClick.coords.v=0,this.priorClick.coords.h=0,this.priorClick.idx=null}}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{id:"canvas-container"},i.a.createElement("canvas",{ref:"canvas",id:"canvas",width:this.side,height:this.side,onMouseDown:function(t){return e.canvasClick(t)},onTouchStart:function(t){return e.canvasClick(t)},onMouseUp:function(t){return e.canvasUnclick(t)},onTouchEnd:function(t){return e.canvasUnclick(t)}}))}}]),t}(i.a.Component));function v(e){for(var t=e.charAt(0).toUpperCase(),n=1;n<e.length;n++)e.charAt(n)===e.charAt(n).toUpperCase()&&(t+=" "),t+=e.charAt(n);return t}n(18);function f(e){return i.a.createElement("div",{className:e.row},i.a.createElement("h5",null,v(e.aspect)),i.a.createElement("input",{type:"range",className:"color-slider",min:0,max:e.max,step:e.step,value:e.color[e.aspect],"data-aspect":e.aspect,style:e.style,onChange:function(t){return e.handleColorChange(t)}}))}n(19);var b=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleColorChange=n.handleColorChange.bind(Object(u.a)(n)),n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleColorChange",value:function(e){this.props.handleColorChange(e)}},{key:"render",value:function(){var e,t=this.props.colorSource.color,n=new m(t);e=this.props.currentPanel<1?"bottom2":"bottom3";var a=i.a.createElement(f,{key:"hue",aspect:"hue",color:t,max:360,step:1,row:"top",handleColorChange:this.handleColorChange,style:n.getStyle("h")}),r=i.a.createElement(f,{key:"sat",aspect:"sat",color:t,max:100,step:1,row:e,handleColorChange:this.handleColorChange,style:n.getStyle("s")}),o=i.a.createElement(f,{key:"light",aspect:"light",color:t,max:100,step:1,row:e,handleColorChange:this.handleColorChange,style:n.getStyle("l")}),l=i.a.createElement(f,{key:"opacity",aspect:"opacity",color:t,max:1,step:.1,row:e,handleColorChange:this.handleColorChange,style:n.getStyle("a")}),s=a,h=[r,o];return this.props.opacity&&h.push(l),i.a.createElement("div",{id:"color-panel"},i.a.createElement("div",{className:"row"},s),i.a.createElement("div",{className:"row"},h))}}]),t}(i.a.Component);function m(e){this.h=e.hue,this.s=e.sat,this.l=e.light,this.a=e.opacity,this.makeString=function(e){var t,n,a="linear-gradient(to right, ",i="hsla(";if("h"===e)t=", "+this.s+"%, "+this.l+"%, "+this.a+")",n=360;else if("s"===e)i+=this.h+", ",t="%, "+this.l+"%, "+this.a+")",n=100;else if("l"===e)i+=this.h+", "+this.s+"%, ",t="%, "+this.a+")",n=100;else{if("a"!==e)return alert("invalid input"),1;i+=this.h+", "+this.s+"%, "+this.l+"%, ",t=")",n=1}for(var r=n/6,o=0,l=0,s=["0%, ","17%, ","33%, ","50%, ","67%, ","83%, ","100%"];l<s.length;l++){a+=i+o+t+" "+s[l],(o+=r)===n&&(o=0)}return a+=")"},this.getStyle=function(e,t){return{background:this.makeString(e)}}}n(20);var C=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).input=i.a.createRef(),n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"buttonChange",value:function(e){var t=this.input.current,n=parseInt(e.target.getAttribute("data-change")),a=parseInt(t.value);this.props.preventNegative?(a>1||n>0)&&(t.value=n+a):t.value=n+a;var i=t.getAttribute("data-aspect");this.props.handleLineChange(parseInt(t.value),i)}},{key:"inputChange",value:function(e){var t=e.target,n=t.value,a=t.getAttribute("data-aspect"),i=["0","1","2","3","4","5","6","7","8","9"];this.props.preventNegative||i.push("-");var r,o="";for(console.log("inputChange for "+this.props.aspect),console.log("value: "+n),""===n&&this.props.handleLineChange(n,a),r=0;r<n.length;r++){var l=n.charAt(r);i.indexOf(l)>=0&&(o+=l)}console.log("endValue: "+o),isNaN(parseInt(o))?(console.log("sent string"),this.props.handleLineChange(o,a)):(console.log("sent num"),this.props.handleLineChange(parseInt(o),a))}},{key:"readValue",value:function(e){return console.log("readValue for "+this.props.aspect),console.log("value: "+e),""===e||"-"===e?e:isNaN(e)?0:e}},{key:"render",value:function(){var e=this,t=v(this.props.aspect);this.props.width;return i.a.createElement("div",{className:"pm-container"},i.a.createElement("h5",null,t),i.a.createElement("div",{className:"pm-bundle"},i.a.createElement("button",{onClick:function(t){return e.buttonChange(t)},"data-change":"-1",className:"pmButtons border-change"},"-"),i.a.createElement("input",{type:"text",onChange:function(t){return e.inputChange(t)},value:this.readValue(this.props.value),"data-aspect":this.props.aspect,ref:this.input,className:"pm-input"}),i.a.createElement("button",{onClick:function(t){return e.buttonChange(t)},"data-change":"1",className:"pmButtons border-change"},"+")))}}]),t}(i.a.Component),y=(n(21),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleLineChange=n.handleLineChange.bind(Object(u.a)(n)),n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleLineChange",value:function(e){var t=e.target,n=t.value,a=t.getAttribute("data-aspect");this.props.handleLineChange(n,a)}},{key:"render",value:function(){var e=this,t=v(this.props.aspect);return i.a.createElement("div",{id:"selectContainer"},i.a.createElement("h5",null,t),i.a.createElement("select",{size:this.props.options.length,value:this.props.value,onChange:function(t){return e.handleLineChange(t)},"data-aspect":this.props.aspect,className:"pm-select border-change"},this.props.options.map(function(e){return i.a.createElement("option",{key:e[1],value:e[1]},e[0])})))}}]),t}(i.a.Component)),k=(n(22),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleColorChange=n.handleColorChange.bind(Object(u.a)(n)),n.handleLineChange=n.handleLineChange.bind(Object(u.a)(n)),n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleColorChange",value:function(e){this.props.handleColorChange(e)}},{key:"handleLineChange",value:function(e,t){this.props.handleLineChange(e,t)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement(b,{width:this.props.width,colorSource:this.props.line,currentPanel:this.props.currentPanel,opacity:!0,handleColorChange:function(t){return e.handleColorChange(t)}}),i.a.createElement("div",{id:"attribute-panel"},i.a.createElement("div",{className:"line-panel"},i.a.createElement(C,{aspect:"regularity",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.regularity,color:this.props.line.returnColor(),preventNegative:!0}),i.a.createElement(C,{aspect:"thickness",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.thickness,color:this.props.line.returnColor(),preventNegative:!0})),i.a.createElement(y,{aspect:"orientation",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.orientation,options:[["horizontal","h"],["vertical","v"],["both","b"]]})))}}]),t}(i.a.Component)),w=(n(8),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleLineChange=n.handleLineChange.bind(Object(u.a)(n)),n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleLineChange",value:function(e,t){this.props.handleLineChange(e,t)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("div",{id:"attribute-panel"},i.a.createElement("div",{className:"line-panel"},i.a.createElement(C,{aspect:"spacing",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.spacing,color:this.props.line.returnColor(),preventNegative:!0}),i.a.createElement(C,{aspect:"lineWidth",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.lineWidth,color:this.props.line.returnColor(),preventNegative:!0}),i.a.createElement(C,{aspect:"offset-x",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.offset.x,color:this.props.line.returnColor(),preventNegative:!1}),i.a.createElement(C,{aspect:"offset-y",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.offset.y,color:this.props.line.returnColor(),preventNegative:!1}),i.a.createElement(C,{aspect:"upper-boundary",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.boundary.u,color:this.props.line.returnColor(),preventNegative:!1}),i.a.createElement(C,{aspect:"lower-boundary",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.boundary.d,color:this.props.line.returnColor(),preventNegative:!1}),i.a.createElement(C,{aspect:"left-boundary",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.boundary.l,color:this.props.line.returnColor(),preventNegative:!1}),i.a.createElement(C,{aspect:"right-boundary",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.boundary.r,color:this.props.line.returnColor(),preventNegative:!1})),i.a.createElement(y,{aspect:"pattern",handleLineChange:function(t,n){return e.handleLineChange(t,n)},value:this.props.line.orientation,options:[["solid","solid"],["//","rightSlash"],["\\\\","leftSlash"],["=","horizontalStripes"],["||","verticalStripes"],["checker","checker"]]})))}}]),t}(i.a.Component)),E=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleAddLine=n.handleAddLine.bind(Object(u.a)(n)),n.handleColorChange=n.handleColorChange.bind(Object(u.a)(n)),n.switchLine=n.switchLine.bind(Object(u.a)(n)),n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"handleAddLine",value:function(){console.log("pass topPanel"),(0,this.props.handlers.addLine)()}},{key:"handleColorChange",value:function(e){(0,this.props.handlers.colorChange)(e)}},{key:"handleLineChange",value:function(e,t){(0,this.props.handlers.lineChange)(e,t)}},{key:"switchLine",value:function(e){(0,this.props.handlers.switchLine)(e)}},{key:"render",value:function(){var e,t,n=this;if(0===this.props.currentPanel)t="Base",e=i.a.createElement("div",{id:"top-panel"},i.a.createElement("h4",{style:{color:this.props.panel.returnColor()}},t),i.a.createElement(b,{width:this.props.width,currentPanel:this.props.currentPanel,colorSource:this.props.panel,handleColorChange:function(e){return n.handleColorChange(e)}}));else{if(t="Line "+this.props.currentPanel,this.props.panel.boundTo&&(t+=" (bound to "+this.props.panel.boundTo.index+")"),this.props.panel.bindees.length>0){t+=" binds ";var a,r=this.props.panel.bindees.sort();for(a=0;a<r.length;a++){var o=r[a].index;0===a?t+=o:a<r.length-1?t+=", "+o:t+=" & "+o}}var l;l=this.props.displayAdvanced?i.a.createElement(w,{handleLineChange:function(e,t){return n.handleLineChange(e,t)},line:this.props.panel,currentPanel:this.props.currentPanel}):i.a.createElement(k,{handleColorChange:function(e){return n.handleColorChange(e)},handleLineChange:function(e,t){return n.handleLineChange(e,t)},line:this.props.panel,currentPanel:this.props.currentPanel}),e=i.a.createElement("div",{id:"top-panel"},i.a.createElement("h4",{style:{color:this.props.panel.returnColor()}},t),l)}return e}}]),t}(i.a.Component);function L(e){return"hsla("+e.hue+", "+e.sat+"%, "+e.light+"%, "+e.opacity+")"}function S(){this.type="base",this.index="0",this.color={hue:180,sat:50,light:50,opacity:1},this.returnColor=function(){return L(this.color)},this.draw=function(e,t,n){if(void 0!==this.color){e.fillStyle=this.returnColor();var a=new Path2D;a.rect(0,0,t,n),e.fill(a)}}}function j(e,t,n){this.type="line",this.index=n,this.color={hue:0,sat:70,light:0,opacity:1},this.height=e,this.width=t,this.thickness=10,this.regularity=1,this.orientation="b",this.pattern="solid",this.spacing=3,this.boundary={u:0,d:0,l:0,r:0},this.offset={x:0,y:0},this.grid=null,this.lineWidth=1,this.boundTo=null,this.bindees=[],this.allowDraw=function(){var e,t=[this.offset.x,this.offset.y,this.boundary.l,this.boundary.r,this.boundary.u,this.boundary.d,this.regularity,this.thickness,this.spacing,this.lineWidth];for(e=0;e<t;e++)if(isNaN(t[e]))return alert(t[e]+" failed"),!1;return!0},this.createGrid=function(){var e=[],t=[],n=0+this.boundary.l;this.boundTo&&(n+=this.boundTo.boundary.l);var a=0+this.boundary.u;this.boundTo&&(a+=this.boundTo.boundary.u);var i=this.width+this.boundary.r;this.boundTo&&(i+=this.boundTo.boundary.r);var r=this.height+this.boundary.d;this.boundTo&&(r+=this.boundTo.boundary.d),console.log("X from "+n+" to "+i),console.log("Y from "+a+" to "+r);var o=(i-n)/(this.regularity+1),l=(r-a)/(this.regularity+1);console.log("Gaps: X = "+o+", Y = "+l);for(var s=0;s<this.regularity;s++){var h=o*(s+1)-this.thickness/2+this.offset.x+n,c=l*(s+1)-this.thickness/2+this.offset.y+a;this.boundTo&&(h+=this.boundTo.offset.x,c+=this.boundTo.offset.y),console.log("xTick: "+h+",yTick: "+c),e.push(h),t.push(c)}this.grid={h:t,v:e},console.log(this.grid)},this.returnColor=function(){return L(this.color)},this.drawSolid=function(e,t,n,a){"h"===a?n.fillRect(0,e,t,this.thickness):"v"===a?n.fillRect(e,0,this.thickness,t):alert("critical draw error: improper dir")},this.drawRightSlash=function(e,t,n,a){for(var i=t/this.spacing,r=-5;r<i+5;r++){var o=void 0,l=void 0,s=void 0,h=void 0;"h"===a?(o=this.spacing*r,l=e+this.thickness,s=o+this.spacing,h=l-this.thickness):"v"===a?(o=e,l=this.spacing*(r+1),s=o+this.thickness,h=l-this.spacing):alert("cirtical draw error: improper "),n.lineWidth=this.lineWidth,n.strokeStyle=this.returnColor(),n.beginPath(),n.moveTo(o,l),n.lineTo(s,h),n.stroke(),n.closePath()}},this.drawLeftSlash=function(e,t,n,a){for(var i=t/this.spacing,r=-5;r<i+5;r++){var o=void 0,l=void 0,s=void 0,h=void 0;"h"===a?(l=e,s=(o=this.spacing*r)+this.spacing,h=l+this.thickness):"v"===a?(o=e,l=this.spacing*r,s=o+this.thickness,h=l+this.spacing):alert("cirtical draw error: improper dir"),n.lineWidth=this.lineWidth,n.strokeStyle=this.returnColor(),n.beginPath(),n.moveTo(o,l),n.lineTo(s,h),n.stroke(),n.closePath()}},this.drawHorizontalStripes=function(e,t,n,a){var i,r;"h"===a?(i=Math.floor(this.thickness/this.spacing),r=0):"v"===a?(i=Math.floor(t/this.spacing)+5,r=-5):alert("critical draw error: improper dir");for(var o=r;o<i;o++){var l=void 0,s=void 0,h=void 0,c=void 0;"h"===a?(l=0,h=t,c=s=e+o*this.spacing):"v"===a?(l=e,s=this.spacing*o,h=l+this.thickness,c=s):alert("cirtical draw error: improper dir"),n.lineWidth=this.lineWidth,n.strokeStyle=this.returnColor(),n.beginPath(),n.moveTo(l,s),n.lineTo(h,c),n.stroke(),n.closePath()}},this.drawVerticalStripes=function(e,t,n,a){var i,r;"v"===a?(i=Math.floor(this.thickness/this.spacing),r=0):"h"===a?(i=Math.floor(t/this.spacing)+5,r=-5):alert("cirtical draw error: improper dir");for(var o=r;o<i;o++){var l=void 0,s=void 0,h=void 0,c=void 0;"v"===a?(s=0,h=l=e+o*this.spacing,c=t):"h"===a?(h=l=this.spacing*o,c=(s=e)+this.thickness):alert("cirtical draw error: improper dir"),n.lineWidth=this.lineWidth,n.strokeStyle=this.returnColor(),n.beginPath(),n.moveTo(l,s),n.lineTo(h,c),n.stroke(),n.closePath()}},this.drawChecker=function(e,t,n,a){var i=!0,r=Math.floor(t/this.spacing),o=Math.floor(this.thickness/this.spacing);console.log(r,o);for(var l=0;l<r;l++){if(i){for(var s=0;s<o;s+=2)if("h"===a){var h=l*this.spacing,c=s*this.spacing+e;n.fillRect(h,c,this.spacing,this.spacing)}else if("v"===a){var d=s*this.spacing+e,u=l*this.spacing;n.fillRect(d,u,this.spacing,this.spacing)}}else for(var p=1;p<o;p+=2)if("h"===a){var g=l*this.spacing,v=p*this.spacing+e;n.fillRect(g,v,this.spacing,this.spacing)}else if("v"===a){var f=p*this.spacing+e,b=l*this.spacing;n.fillRect(f,b,this.spacing,this.spacing)}i=!i}},this.drawSolid=this.drawSolid.bind(this),this.drawRightSlash=this.drawRightSlash.bind(this),this.drawLeftSlash=this.drawLeftSlash.bind(this),this.drawHorizontalStripes=this.drawHorizontalStripes.bind(this),this.drawVerticalStripes=this.drawVerticalStripes.bind(this),this.drawChecker=this.drawChecker.bind(this),this.drawPatterns={solid:this.drawSolid,rightSlash:this.drawRightSlash,leftSlash:this.drawLeftSlash,horizontalStripes:this.drawHorizontalStripes,verticalStripes:this.drawVerticalStripes,checker:this.drawChecker},this.draw=function(e,t,n){if(!this.allowDraw())return alert("draw averted"),0;this.createGrid(),e.save(),e.fillStyle=this.returnColor(),this.drawLines=function(e,t,n){for(var a=this.grid[e],i=0;i<a.length;i++)this.drawPatterns[this.pattern](a[i],t,n,e)},this.drawLines=this.drawLines.bind(this),"h"!==this.orientation&&"b"!==this.orientation||this.drawLines("h",n,e),"v"!==this.orientation&&"b"!==this.orientation||this.drawLines("v",t,e),e.restore()},this.draw=this.draw.bind(this)}n(23);function O(e){function t(t){var n=parseInt(t.target.value);e.switchPanel(n)}var n;return n=e.displayAdvance?"Basic":"Advanced",i.a.createElement("div",{id:"button-panel"},i.a.createElement("button",{onClick:t,value:-1,id:"back"},"<<"),i.a.createElement("button",{onClick:e.handleAddLine,id:"add"},"Add"),i.a.createElement("button",{onClick:e.handleRemoveLine,id:"remove"},"Remove"),i.a.createElement("button",{onClick:e.handleCopyLine,id:"copy"},"Copy"),i.a.createElement("button",{onClick:e.handleDisplay},n),i.a.createElement("button",{onClick:e.handleDownload,id:"download"},"Download"),i.a.createElement("button",{onClick:e.handleBind,id:"bind"},"Bind"),i.a.createElement("button",{onClick:t,value:1,id:"forward"},">>"))}n(24);function P(e){return e.nav?i.a.createElement("div",{id:"nav-bar",class:"col-12"},i.a.createElement("button",{id:"nav-bar-close",class:"close-button",onClick:e.flip},"X"),i.a.createElement("div",{id:"inner-nav"},i.a.createElement("a",{href:"https://vkwebsite.herokuapp.com/"},"Homepage"),i.a.createElement("a",{href:"https://vkplaid.herokuapp.com/",id:"active"},"Plaid Maker"),i.a.createElement("a",{href:"https://vkwebsite.herokuapp.com/ep_search"},"Episode Picker"),i.a.createElement("a",{class:"hidden",id:"placeholder"}))):i.a.createElement("div",{id:"top-bar"},i.a.createElement("button",{id:"nav-bar-open",onClick:e.flip},"Nav Bar"),i.a.createElement("a",{href:"https://github.com/kuertzva/Plaid-Generator",id:"github-link"},"Github"))}n(25);var T=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).togglePreview=n.togglePreview.bind(Object(u.a)(n)),n.downloadImage=n.downloadImage.bind(Object(u.a)(n)),n.changeFormat=n.changeFormat.bind(Object(u.a)(n)),n.changeFilename=n.changeFilename.bind(Object(u.a)(n)),n.state={preview:!1,format:"png",filename:"plaid"},n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){document.getElementById("png").checked=!0}},{key:"togglePreview",value:function(){this.setState(function(e){return{preview:!e.preview}})}},{key:"downloadImage",value:function(){var e=document.getElementById("canvas"),t="image/"+this.state.format,n=e.toDataURL(t),a=document.createElement("a"),i=this.state.filename+"."+this.state.format;document.body.appendChild(a),a.download=i,a.href=n,a.click(),document.body.removeChild(a)}},{key:"changeFormat",value:function(e){var t=e.target.value;this.setState({format:t})}},{key:"changeFilename",value:function(e){var t=e.target.value,n=t[t.length-1];["<",">",":",'"',"/","\\","|","?","*"].indexOf(n)>=0?alert("this is not an allowed character!"):this.setState(function(e){return{filename:t}})}},{key:"render",value:function(){var e,t=this,n=[["png",!0],["jpeg",!1],["bmp",!1],["webp",!1]].map(function(e){return i.a.createElement("label",null," ",e[0].charAt(0).toUpperCase()+e[0].substring(1),i.a.createElement("input",{type:"radio",name:"radioButtons",value:e[0],id:e[0],onChange:function(e){return t.changeFormat(e)}}))});if(this.state.preview){var a=document.getElementById("canvas").toDataURL("image/png");e=i.a.createElement("div",{id:"preview",style:{backgroundImage:"url("+a+")"}},i.a.createElement("button",{id:"close-preview",class:"close-button",onClick:this.togglePreview}," X "))}else e=!1;return i.a.createElement("div",{class:"overlay col-12 narrow-row"},e,i.a.createElement("button",{id:"download-close",class:"close-button",onClick:this.props.flip},"X"),i.a.createElement("div",{id:"inner-download",class:"feature-box pop-up no-shadow"},i.a.createElement("h1",null," Download "),i.a.createElement("label",null,"File Name:",i.a.createElement("input",{id:"file-name",type:"text",value:this.state.filename,onChange:function(e){return t.changeFilename(e)}})),i.a.createElement("div",{class:"radio-options"},n),i.a.createElement("div",{className:"button-box"},i.a.createElement("button",{className:"option-buttons",id:"preview-button",onClick:this.togglePreview},"Preview"),i.a.createElement("button",{className:"option-buttons",id:"download-button",onClick:this.downloadImage},"Download"))))}}]),t}(i.a.Component);n(26);function N(e){for(var t=[],n=1;n<e.panels.length;)n!==e.currentPanel&&t.push(n),n++;console.log(t);var a,r=t.map(function(e){return i.a.createElement("label",null," ",e,i.a.createElement("input",{type:"radio",name:"lineButtons",value:e,id:e,key:e}))});return a=e.panels[e.currentPanel].boundTo?i.a.createElement("div",{className:"feature-box pop-up no-shadow",id:"bind-panel"},i.a.createElement("h1",null," Unbind this line? "),i.a.createElement("div",{className:"button-box"},i.a.createElement("button",{className:"option-buttons",onClick:e.unbind},"Unbind"))):i.a.createElement("div",{className:"feature-box pop-up no-shadow",id:"bind-panel"},i.a.createElement("h1",null,"Bind"),i.a.createElement("h3",null,"Which line would you like to bind this like too?"),i.a.createElement("div",{className:"radio-options"},r),i.a.createElement("div",{className:"button-box"},i.a.createElement("button",{className:"option-buttons",onClick:function(){var t,n=document.getElementsByName("lineButtons"),a=!1;for(t=0;t<n.length;t++)if(n[t].checked){var i=n[t].value;e.bind(i),a=!0,e.flip();break}a||alert("none selected")}},"Bind"))),i.a.createElement("div",{className:"overlay col-12 narrow-row"},i.a.createElement("button",{id:"bind-close",className:"close-button",onClick:e.flip},"X"),a)}n(27);var x=function(e){return i.a.createElement("div",{id:"outer-intro",className:"overlay col-24 narrow-row"},i.a.createElement("div",{id:"inner-intro",className:"pop-up no-shadow"},i.a.createElement("div",{id:"intro-text"},i.a.createElement("h1",null," Welcome! "),i.a.createElement("h2",null," This is my Plaid Maker"),i.a.createElement("p",null,"Please check it out and see what you can make. This is still a work in progress. Features may still be a little buggy and more features are on the way."),i.a.createElement("p",null,"You can navigate away from this page using the link at the top left."),i.a.createElement("h2",null," How this works"),i.a.createElement("p",null,"This project consists of a base object and a series of line objects which are drawn on a canvas html element. The base is the background you draw the lines against. We'll start there."),i.a.createElement("h3",null,"Base"),i.a.createElement("p",null,"For now, this is pretty simple. All the base has is a color, which is defined by its hue, saturation and lightness. Now lets get to lines."),i.a.createElement("h3",null,"Lines"),i.a.createElement("p",null,"Lines also have a color, but this also has an opacity that give the line the possibility of being transparent. Lines can go up, down or both and I refer to this as the lines orientation. A line will repeat a number of times on each relevant axis and this is called the lines regularity. The lines can be moved along there axis using the offset. Clicking a draging a line can be used to chang eoffset, though I'm still working on making this consistent."),i.a.createElement("p",null,"Lines can be changed to display as a number of patterns that can be modified when relevant. This is accessed by clicking the pattern button. You can switch lines with the buttons on the edges of the patterns or by clicking them in the canvas (again, not completely smooth."),i.a.createElement("p",null,"Lines can be added, removed or copied. The bind button, when implemented, will make 2 lines regularity and offset dependent on one another to create more intricate patterns. The download button will allow you to download your pattern as an image."),i.a.createElement("p",null,"Have fun!")),i.a.createElement("div",{id:"intro-button-container"},i.a.createElement("button",{onClick:e.handleClick},"Plaid Time!"))))},A=(n(28),document.getElementById("root")),I=function(e){function t(e){var n;Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleAddLine=n.handleAddLine.bind(Object(u.a)(n)),n.handleColorChange=n.handleColorChange.bind(Object(u.a)(n)),n.handleLineChange=n.handleLineChange.bind(Object(u.a)(n)),n.switchLine=n.switchLine.bind(Object(u.a)(n)),n.displayToggle=n.displayToggle.bind(Object(u.a)(n)),n.setSide=n.setSide.bind(Object(u.a)(n)),n.handleRemoveLine=n.handleRemoveLine.bind(Object(u.a)(n)),n.handleCopyLine=n.handleCopyLine.bind(Object(u.a)(n)),n.handleBind=n.handleBind.bind(Object(u.a)(n)),n.handleUnbind=n.handleUnbind.bind(Object(u.a)(n)),n.downloadToggle=n.downloadToggle.bind(Object(u.a)(n)),n.navToggle=n.navToggle.bind(Object(u.a)(n)),n.bindToggle=n.bindToggle.bind(Object(u.a)(n));var a=getComputedStyle(A);return n.state={intro:!0,nav:!1,download:!1,bind:!1,displayAdvanced:!1,panels:[new S],currentPanel:0,handlers:{addLine:n.handleAddLine,colorChange:n.handleColorChange,lineChange:n.handleLineChange,switchLine:n.switchLine},width:parseInt(a.width),height:parseInt(a.height),side:null},n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"updateStyles",value:function(){var e=document.getElementById("canvas").toDataURL("image/png");document.body.style.backgroundImage="url("+e+")",document.body.style.backgroundColor=this.state.panels[0].returnColor();var t=document.querySelectorAll(".border-change"),n=this.state.panels[this.state.currentPanel].returnColor(),a=!0,i=!1,r=void 0;try{for(var o,l=t[Symbol.iterator]();!(a=(o=l.next()).done);a=!0)o.value.style.borderColor=n}catch(s){i=!0,r=s}finally{try{a||null==l.return||l.return()}finally{if(i)throw r}}}},{key:"componentDidMount",value:function(){var e=getComputedStyle(document.getElementById("canvas"));this.setState({canvasWidth:parseInt(e.width),canvasHeight:parseInt(e.height)}),console.log("AppDidMount"),console.log(this.state.canvasWidth,this.state.canvasHeight),this.updateStyles()}},{key:"componentDidUpdate",value:function(){this.updateStyles()}},{key:"setSide",value:function(e){this.setState({side:e})}},{key:"switchLine",value:function(e){console.log(e);var t=this.state.currentPanel+e;0<=t&&t<this.state.panels.length&&this.setState({currentPanel:t})}},{key:"handleAddLine",value:function(){console.log("add line");var e=this.state.panels;e.push(new j(this.state.side,this.state.side,this.state.panels.length)),this.setState({panels:e,currentPanel:e.length-1})}},{key:"handleRemoveLine",value:function(){if(this.state.currentPanel>0){var e=this.state.panels[this.state.currentPanel],t=this.state.panels;t.splice(this.state.currentPanel,1);var n=this.state.currentPanel-1;e.bindees.length>0||e.boundTo?alert("Please unbind before removing"):this.setState({panels:t,currentPanel:n})}else alert("Cannot delete the background")}},{key:"handleCopyLine",value:function(){if(console.log("copy line"),this.state.currentPanel>0){for(var e,t=this.state.panels,n=this.state.panels[this.state.currentPanel],a=new j(this.state.side,this.state.side,this.state.panels.length),i=0,r=[["color","hue","sat","light","opacity"],"height","width","thickness","regularity","orientation","pattern","spacing",["offset","x","y"],"grid","lineWidth","boundTo"];i<r.length;i++){var o;if(e=r[i],Array.isArray(e))for(o=1;o<e.length;o++)a[e[0]][e[o]]=n[e[0]][e[o]];else a[e]=n[e]}t.push(a),this.setState({currentPanel:t.length-1,panels:t})}}},{key:"handleDownload",value:function(e){var t=e.target,n=document.getElementById("canvas").toDataURL("image/jpeg");t.href=n}},{key:"handleColorChange",value:function(e){var t,n=e.target,a=n.getAttribute("data-aspect"),i=n.value;(t=this.state.panels)[this.state.currentPanel].color[a]=i,this.setState(Object(l.a)({},"panels",t))}},{key:"handleLineChange",value:function(e,t){var n=e,a=t,i=this.state.panels,r=i[this.state.currentPanel];"offset"===a.slice(0,6)?r[a.slice(0,6)][a.slice(7)]=n:"boundary"===a.slice(-8)?"l"===a.charAt(0)?"e"===a.charAt(1)?r[a.slice(-8)][a.charAt(0)]=n:r[a.slice(-8)].d=n:r[a.slice(-8)][a.charAt(0)]=n:r[a]=n,this.setState({panels:i})}},{key:"handleBind",value:function(e){var t=this.state.panels[e],n=this.state.panels[this.state.currentPanel];n.boundTo=t,t.bindees.push(n)}},{key:"handleUnbind",value:function(){var e=this.state.panels[this.state.currentPanel],t=e.boundTo;e.boundTo=null;var n=t.bindees.indexOf(e);-1!==n&&t.bindees.splice(n,1),this.bindToggle()}},{key:"introToggle",value:function(){this.setState(function(e){return{intro:!e.intro}})}},{key:"navToggle",value:function(){this.setState(function(e){return{nav:!e.nav}})}},{key:"displayToggle",value:function(){this.setState(function(e){return{displayAdvanced:!e.displayAdvanced}})}},{key:"downloadToggle",value:function(){this.setState(function(e){return{download:!e.download}})}},{key:"bindToggle",value:function(){this.state.currentPanel>0?this.state.panels.length>2?this.setState(function(e){return{bind:!e.bind}}):alert("Nothing to bind to!"):alert("You can't bind the background!")}},{key:"render",value:function(){var e,t=this;return e=this.state.intro?i.a.createElement(x,{handleClick:function(){return t.introToggle()}}):this.state.download?i.a.createElement(T,{flip:this.downloadToggle}):!!this.state.bind&&i.a.createElement(N,{flip:this.bindToggle,bind:function(e){return t.handleBind(e)},unbind:function(){return t.handleUnbind()},panels:this.state.panels,currentPanel:this.state.currentPanel}),i.a.createElement("div",{id:"frame",className:"col-12 thick-row"},e,i.a.createElement(P,{nav:this.state.nav,flip:this.navToggle}),i.a.createElement("div",{id:"app"},i.a.createElement(g,{panels:this.state.panels,currentPanel:this.state.currentPanel,handleClick:this.switchLine,setSide:function(e){return t.setSide(e)}}),i.a.createElement(O,{switchPanel:function(e){return t.switchLine(e)},handleAddLine:function(){return t.handleAddLine()},handleRemoveLine:function(){return t.handleRemoveLine()},handleCopyLine:function(){return t.handleCopyLine()},handleDownload:function(){return t.downloadToggle()},handleBind:function(){return t.bindToggle()},handleDisplay:function(){return t.displayToggle()},display:this.state.displayAdvanced,width:this.props.width}),i.a.createElement(E,{width:this.state.width,height:this.state.height,panel:this.state.panels[this.state.currentPanel],currentPanel:this.state.currentPanel,handlers:this.state.handlers,displayAdvanced:this.state.displayAdvanced})))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[11,1,2]]]);
//# sourceMappingURL=main.7da25987.chunk.js.map