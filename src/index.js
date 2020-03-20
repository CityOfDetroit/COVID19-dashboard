'use strict';
import './index.scss';
(function(){
    fetch('https://us-central1-detroit-iet.cloudfunctions.net/getToken')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(token) {
        let url = `https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query?where=Country_Region+%3D%27US%27+AND+Province_State+%3D+%27Michigan%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`;
        fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            document.querySelector('.data-block.detected.mich span').innerHTML = data.features[0].attributes.Confirmed;
            document.querySelector('.data-block.deaths.mich span').innerHTML = data.features[0].attributes.Deaths;
            let today = new Date(data.features[0].attributes.Last_Update);
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            today = `${mm}/${dd}/${yyyy}`;
            console.log(today);
            console.log(time);
            document.querySelector('.update-date .mich').innerHTML = `Last updated ${today} - ${time}`;
            document.querySelector('#loader-overlay').className = '';
        });
    });    
})(window);