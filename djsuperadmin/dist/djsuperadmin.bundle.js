!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){var r=n(1);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(3)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,".djsuperadmin-content{border:2px #ff5050 dotted;border-radius:6px;padding:.2rem .5rem}.djsuperadmin-background{position:fixed;top:0;width:100%;height:100vh;background:#4a4a4aa1;z-index:10000}.djsuperadmin-logout{position:fixed;top:15px;right:15px;background:#000;color:#fff;text-decoration:none;border-radius:15px;font-size:large;font-family:monospace;padding:10px;z-index:100000000000}.djsuperadmin-editor{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);width:35rem;height:20rem}.djsuperadmin-save{background:#78a6e4;color:#fff;font-family:monospace;padding:.5rem;border:1px solid;border-radius:1rem;left:50%;position:absolute;transform:translateX(-50%);margin-top:1rem;cursor:pointer}.raw-editor{background:#fff;width:100%;min-height:15rem;font-size:1.5rem;display:block;border-radius:.5rem}.ql-container{background:#fff}.ql-toolbar{background:#fff}span.djsuperadmin{z-index:1000000;display:block;width:100%;height:100%;cursor:pointer}",""])},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(i).concat([o]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];null!=a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(e,t){return t?t.querySelector(e):document.querySelector(e)},u=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=s.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),c=null,d=0,f=[],l=n(4);function p(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(y(r.parts[a],t))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(y(r.parts[a],t));i[r.id]={id:r.id,refs:1,parts:s}}}}function m(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function h(e,t){var n=u(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),f.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=u(e.insertAt.before,n);n.insertBefore(t,o)}}function v(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=f.indexOf(e);t>=0&&f.splice(t,1)}function b(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return g(t,e.attrs),h(e,t),t}function g(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function y(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var a=d++;n=c||(c=b(t)),r=T.bind(null,n,a,!1),o=T.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",g(t,e.attrs),h(e,t),t}(t),r=x.bind(null,n,t),o=function(){v(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(t),r=w.bind(null,n),o=function(){v(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=m(e,t);return p(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var a=n[o];(s=i[a.id]).refs--,r.push(s)}e&&p(m(e,t),t);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete i[s.id]}}}};var j,E=(j=[],function(e,t){return j[e]=t,j.filter(Boolean).join("\n")});function T(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=E(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function w(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function x(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=l(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){"use strict";n.r(t);n(0);CKEDITOR.env.ie&&CKEDITOR.env.version<9&&CKEDITOR.tools.enableHtml5Elements(document),CKEDITOR.config.height=150,CKEDITOR.config.width="auto";var r=function(){var e=function(){if("%REV%"==CKEDITOR.revision)return!0;return!!CKEDITOR.plugins.get("wysiwygarea")}();CKEDITOR.plugins.get("bbcode");return function(){var t=CKEDITOR.document.getById("editor");e?CKEDITOR.replace("editor"):(t.setAttribute("contenteditable","true"),CKEDITOR.inline("editor"))}}(),o=function(e){return e.status>=200&&e.status<300?Promise.resolve(e):Promise.reject(new Error(e.statusText))},i=function(e){return e.json()},a=function(e){var t=("; "+document.cookie).split("; "+e+"=");if(2==t.length)return t.pop().split(";").shift()}("csrftoken"),s=document.createElement("a");s.innerHTML="LOGOUT",s.href=djsa_logout_url,s.classList.add("djsuperadmin-logout"),document.body.appendChild(s);for(var u,c=document.getElementsByClassName("djsuperadmin"),d=1,f=function(e){var t={};return t.method=e,t.headers={},t.headers["Content-Type"]="application/json",/^(GET|HEAD|OPTIONS|TRACE)$/.test(e)||(t.headers["X-CSRFToken"]=a),t},l=function(e){e.stopPropagation(),e.preventDefault();var t=this;clearTimeout(this.clickTimeout),this.clickTimeout=setTimeout(function(){2==e.detail?p(t):e.target.parentNode.click()},200)},p=function(e){var t=e.getAttribute("data-djsa");d=e.getAttribute("data-mode");var n=f("GET");fetch("/djsuperadmin/contents/"+t+"/",n).then(o).then(i).then(function(e){u=e,h(d)}).catch(function(e){console.log("Request failed",e)})},m=function(e){u.content=e;var t="/djsuperadmin/contents/"+u.id+"/",n=f("PATCH");n.body=JSON.stringify(u),fetch(t,n).then(o).then(i).then(function(e){location.reload()}).catch(function(e){console.log("Request failed",e)})},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,t=document.createElement("div"),n=document.createElement("div"),o=document.createElement("button");o.innerHTML="SALVA",o.classList.add("djsuperadmin-save"),t.classList.add("djsuperadmin-background"),n.classList.add("djsuperadmin-editor"),t.appendChild(n),document.body.appendChild(t);var i=null,a=null;switch(e){case"0":(i=document.createElement("textarea")).value=u.content,i.className="raw-editor",a=function(){return i.value},n.appendChild(i);break;case"2":break;default:(i=document.createElement("div")).id="editor",n.appendChild(i),r(),(i=CKEDITOR.document.getById("editor")).setHtml(u.content),a=function(){return CKEDITOR.instances.editor.getData()}}n.appendChild(o),o.addEventListener("click",function(){m(a())},!1),window.onclick=function(e){e.target==t&&t.remove()}},v=0;v<c.length;v++)c[v].addEventListener("click",l,!1),c[v].parentNode.classList.add("djsuperadmin-content")}]);