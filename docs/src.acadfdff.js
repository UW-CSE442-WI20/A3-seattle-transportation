parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"BclC":[function(require,module,exports) {
module.exports="/Avg-Burke-Data.9f1015dc.csv";
},{}],"Focm":[function(require,module,exports) {
!function(){var e=require("./CSV/Avg-Burke-Data.csv");function t(){var t=this.value;d3.csv(e).then(function(e){d3.select("#p-north").text(e[t].ped_north_avg),d3.select("#p-south").text(e[t].ped_south_avg),d3.select("#c-north").text(e[t].bike_north_avg),d3.select("#c-south").text(e[t].bike_south_avg)})}window.addEventListener("load",function(){n=document.getElementById("myRange"),a=document.getElementById("demo"),a.innerHTML="12:00 PM",n.oninput=function(){var e="";e=0==this.value?"12:00 AM":this.value<12?this.value+":00 AM":12==this.value?"12:00 PM":this.value-12+":00 PM",a.innerHTML=e},(e="myRange",document.getElementById(e)).addEventListener("change",t);var e;var n,a})}();
},{"./CSV/Avg-Burke-Data.csv":"BclC"}]},{},["Focm"], null)
//# sourceMappingURL=/src.acadfdff.js.map