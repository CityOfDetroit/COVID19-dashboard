'use strict';
import './index.scss';
(function(){
    fetch('https://us-central1-detroit-iet.cloudfunctions.net/getToken')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(token) {
        let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Health_Data/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=${token.access_token}`;
        fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            let detected = 0;
            let quarantined = 0;
            let recovered = 0;
            let deaths = 0;
            if(data.features.length){
                data.features.forEach(element => {
                    switch (true) {
                        case element.attributes.Quarantine == '1':
                            detected++;
                            quarantined++;
                            break;

                        case element.attributes.Recovery == '1':
                            detected++;
                            recovered++;
                            break;

                            case element.attributes.Death == '1':
                            detected++;
                            recovered++;
                            break;
                    
                        default:
                            break;
                    }
                });
            }
            document.querySelector('.data-block.detected span').innerHTML = detected;
            document.querySelector('.data-block.quarantined span').innerHTML = quarantined;
            document.querySelector('.data-block.recovered span').innerHTML = recovered;
            document.querySelector('.data-block.deaths span').innerHTML = deaths;
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            today = `${mm}/${dd}/${yyyy}`;
            document.querySelector('.dashboard .update i').innerHTML = `Last updated ${today} - ${time}`;
            document.querySelector('#loader-overlay').className = '';
        });
    });    
})(window);