'use strict';
import './index.scss';
(function(){
    var viz, sheet, workbook, table, cases, deaths; 

    var containerDiv = document.getElementById("vizContainer"),
    url = "https://codtableau.detroitmi.gov/t/DHD/views/PublicCOVIDTableau/DetriotCountsOnly?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&:origin=viz_share_link",
    options = {
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function() {
            getUnderlyingData();
        }
    };
    viz = new tableau.Viz(containerDiv, url, options);

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
            today = `${mm}/${dd}/${yyyy}`;
            document.querySelector('.update-date .mich').innerHTML = `Last updated ${today} `;
            document.querySelector('#loader-overlay').className = '';
        });
    });    

    function getUnderlyingData() {
        workbook = viz.getWorkbook();
        sheet = workbook.getActiveSheet().getWorksheets().get("Patient Status");
        // If the active sheet is not a dashboard, then you can just enter:
        // viz.getWorkbook().getActiveSheet();
        options = {
            maxRows: 0, // Max rows to return. Use 0 to return all rows
            ignoreAliases: false,
            ignoreSelection: true,
            includeAllColumns: false
        };

       sheet.getUnderlyingDataAsync(options).then(function(t) {
            table = t.getData();
            if(table[0][2].value != "Deceased"){
                cases = table.length;
            }
            if(deaths == undefined){
                sheet = workbook.getActiveSheet().getWorksheets().get("Patient Deaths");
                sheet.getUnderlyingDataAsync(options).then(function(d) {
                    table = d.getData();
                    if(table[0][2].value == "Deceased"){
                        deaths = table.length;
                    }
                    let today = new Date();
                    let dd = String(today.getDate()).padStart(2, '0');
                    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    let yyyy = today.getFullYear();
                    today = `${mm}/${dd}/${yyyy}`;
                    document.querySelector('.data-block.detected.det span').innerHTML = cases;
                    document.querySelector('.data-block.deaths.det span').innerHTML = deaths;
                    document.querySelector('.update-date .det').innerHTML = `Last updated ${today}`;
                });
            }
        });
    }
})(window);