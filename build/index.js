parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"eHzx":[function(require,module,exports) {

},{}],"Focm":[function(require,module,exports) {
"use strict";require("./index.scss"),function(){var e,t,n,r,a,o,i=document.getElementById("vizContainer"),s={hideTabs:!0,hideToolbar:!0,onFirstInteractive:function(){n=e.getWorkbook(),t=n.getActiveSheet().getWorksheets().get("Patient Status"),s={maxRows:0,ignoreAliases:!1,ignoreSelection:!0,includeAllColumns:!1},t.getUnderlyingDataAsync(s).then(function(e){"Deceased"!=(r=e.getData())[0][2].value&&(a=r.length),null==o&&(t=n.getActiveSheet().getWorksheets().get("Patient Deaths")).getUnderlyingDataAsync(s).then(function(e){"Deceased"==(r=e.getData())[0][2].value&&(o=r.length);var t=new Date,n=String(t.getDate()).padStart(2,"0"),i=String(t.getMonth()+1).padStart(2,"0"),s=t.getFullYear();t="".concat(i,"/").concat(n,"/").concat(s),document.querySelector(".data-block.detected.det span").innerHTML=a,document.querySelector(".data-block.deaths.det span").innerHTML=o,document.querySelector(".update-date .det").innerHTML="Last updated ".concat(t)})})}};e=new tableau.Viz(i,"https://codtableau.detroitmi.gov/t/DHD/views/PublicCOVIDTableau/DetriotCountsOnly?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",s),fetch("https://us-central1-detroit-iet.cloudfunctions.net/getToken").then(function(e){return e.json()}).then(function(e){fetch("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?where=Country_Region+%3D%27US%27+AND+Province_State+%3D+%27Michigan%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=").then(function(e){return e.json()}).then(function(e){document.querySelector(".data-block.detected.mich span").innerHTML=e.features[0].attributes.Confirmed,document.querySelector(".data-block.deaths.mich span").innerHTML=e.features[0].attributes.Deaths;var t=new Date(e.features[0].attributes.Last_Update),n=String(t.getDate()).padStart(2,"0"),r=String(t.getMonth()+1).padStart(2,"0"),a=t.getFullYear();t="".concat(r,"/").concat(n,"/").concat(a),document.querySelector(".update-date .mich").innerHTML="Last updated ".concat(t," "),document.querySelector("#loader-overlay").className=""})})}(window);
},{"./index.scss":"eHzx"}]},{},["Focm"], null)
//# sourceMappingURL=index.js.map