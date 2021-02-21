var full_data = [];
var world_map_file;
var starting_year = 4;
var bar_graph_people_range = 1          //1(bigger)-5(lower)

if(starting_year<10){
    d3.selectAll(("input[name='range_years']")).property("value", "200"+starting_year)
}else{
    d3.selectAll(("input[name='range_years']")).property("value", "20"+starting_year)
}
d3.select("#bar_chart_dth_dropdown").property("value", bar_graph_people_range)

var map_countries_divided_flag = [false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false]

var map_countries = [["French Southern and Antarctic Lands",""],
    ["The Bahamas","Bahamas"], 
    ["Bolivia","Bolivia (Plurinational State of)"], 
    ["Brunei","Brunei Darussalam"], 
    ["Ivory Coast",""],
    ["Republic of the Congo","Congo"],          
    ["Northern Cyprus","Cyprus"],                           //divided
    ["Czech Republic","Czechia"],
    ["Falkland Islands",""],
    ["England","United Kingdom"],                             //divided
    ["Guinea Bissau","Guinea-Bissau"],
    ["Iran","Iran (Islamic Republic of)"],
    ["South Korea","Republic of Korea"],
    ["Kosovo",""],
    ["Laos","Lao People's Democratic Republic"],
    ["Moldova","Republic of Moldova"],
    ["Macedonia","North Macedonia"],
    ["Montenegro",""],
    ["New Caledonia",""],
    ["North Korea","Democratic People's Republic of Korea"],
    ["Russia","Russian Federation"],
    ["Western Sahara",""],
    ["South Sudan","Sudan"],                                   //divided
    ["Somaliland",""],
    ["Republic of Serbia","Serbia"],
    ["Swaziland","Eswatini"],
    ["Syria","Syrian Arab Republic"],
    ["East Timor","Timor-Leste"],
    ["Taiwan","Taiwan (Province of China)"],
    ["USA","United States of America"],
    ["Venezuela","Venezuela (Bolivarian Republic of)"],
    ["Vietnam","Viet Nam"],
    ["West Bank",""]];

/*d3.csv("dataset/total_merge/2015.csv", d3.autoType).then(function(data){
    full_data.push(data);    
    world_map_loader(full_data[0]);
    });*/

/*Promise.all([
    d3_v5.csv("dataset/total_merge/2000.csv"),
    d3_v5.csv("dataset/total_merge/2001.csv"),
    d3_v5.csv("dataset/total_merge/2002.csv"),
    d3_v5.csv("dataset/total_merge/2003.csv"),
    d3_v5.csv("dataset/total_merge/2004.csv"),
    d3_v5.csv("dataset/total_merge/2005.csv"),
    d3_v5.csv("dataset/total_merge/2006.csv"),
    d3_v5.csv("dataset/total_merge/2007.csv"),
    d3_v5.csv("dataset/total_merge/2008.csv"),
    d3_v5.csv("dataset/total_merge/2009.csv"),
    d3_v5.csv("dataset/total_merge/2010.csv"),
    d3_v5.csv("dataset/total_merge/2011.csv"),
    d3_v5.csv("dataset/total_merge/2012.csv"),
    d3_v5.csv("dataset/total_merge/2013.csv"),
    d3_v5.csv("dataset/total_merge/2014.csv"),
    d3_v5.csv("dataset/total_merge/2015.csv"),
]).then(function(files) {

    world_map_loader(files[0]);

    //files[1]
}).catch(function(err) {
    // handle error here
});*/

d3.queue()
    .defer(d3.csv, "dataset/total_merge/2000.csv")
    .defer(d3.csv, "dataset/total_merge/2001.csv")
    .defer(d3.csv, "dataset/total_merge/2002.csv")
    .defer(d3.csv, "dataset/total_merge/2003.csv")
    .defer(d3.csv, "dataset/total_merge/2004.csv")
    .defer(d3.csv, "dataset/total_merge/2005.csv")
    .defer(d3.csv, "dataset/total_merge/2006.csv")
    .defer(d3.csv, "dataset/total_merge/2007.csv")
    .defer(d3.csv, "dataset/total_merge/2008.csv")
    .defer(d3.csv, "dataset/total_merge/2009.csv")
    .defer(d3.csv, "dataset/total_merge/2010.csv")
    .defer(d3.csv, "dataset/total_merge/2011.csv")
    .defer(d3.csv, "dataset/total_merge/2012.csv")
    .defer(d3.csv, "dataset/total_merge/2013.csv")
    .defer(d3.csv, "dataset/total_merge/2014.csv")
    .defer(d3.csv, "dataset/total_merge/2015.csv")
    .defer(d3.json, "resources/world.json")
    .await(function(error, table2000, table2001, table2002, table2003, table2004, table2005, table2006, table2007, table2008, table2009, table2010, table2011, table2012, table2013, table2014, table2015, world) {
        if (error) {
            console.error('Something bad with the csv loading: ' + error);
        }
        else {
                world_map_file = world
                
                full_data = [table2000, table2001, table2002, table2003, table2004, table2005, table2006, table2007, table2008, table2009, table2010, table2011, table2012, table2013, table2014, table2015];
                for(i in full_data){
                    parseTable(full_data[i], world);
                }
                world_map_loader(full_data[starting_year]);
                scatterplot_pca_loader(full_data[starting_year]);
                bar_chart_dht_loader(full_data[starting_year], bar_graph_people_range)

        }
    });




//Function that change the years of all the graphs
d3.selectAll(("input[name='range_years']")).on("input", function(){
    var value = parseInt(this.value.slice(-2))
    console.log(value)
    change_map_with_year(full_data[value])
    change_scatterplot_with_year(full_data[value])
    change_bar_chart_dth_with_year(full_data[value], bar_graph_people_range)
})














//Function to parse the data and to join the countries with the ones on the map
function parseTable(table, topology){
    countries_not_in_worldraph = []
    countries_to_duplicate = []
    flag = false
    for(i=0; i<table.length; i++){
        table[i]['CO'] = parseFloat(table[i]['CO']);
        table[i]['CH4'] = parseFloat(table[i]['CH4']);
        table[i]['NH3'] = parseFloat(table[i]['NH3']);
        table[i]['NMVOC'] = parseFloat(table[i]['NMVOC']);
        table[i]['NOx'] = parseFloat(table[i]['NOx']);
        table[i]['SO2'] = parseFloat(table[i]['SO2']);
        table[i]['PM 10'] = parseFloat(table[i]['PM 10']);
        table[i]['PM 2.5'] = parseFloat(table[i]['PM 2.5']);
        table[i]['Total Cancer'] = parseFloat(table[i]['Total Cancer']);
        table[i]['Air Cancer'] = parseFloat(table[i]['Air Cancer']);
        table[i]['Chronic Respiratory Diseases'] = parseFloat(table[i]['Chronic Respiratory Diseases']);
        table[i]['Pneumoconiosis'] = parseFloat(table[i]['Pneumoconiosis']);
        table[i]['Asthma'] = parseFloat(table[i]['Asthma']);
        table[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis'] = parseFloat(table[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis']);
        table[i]['Other Chronic Respiratory Diseases'] = parseFloat(table[i]['Other Chronic Respiratory Diseases']);
        table[i]['Total Deaths'] = parseFloat(table[i]['Total Deaths']);
        table[i]['Total Population'] = parseFloat(table[i]['Total Population']);
        table[i]['PCA first component'] = parseFloat(table[i]['PCA first component']);
        table[i]['PCA second component'] = parseFloat(table[i]['PCA second component']);

        
        //BRING THE DATA CONGRUENT WITH THE COUNTRIES ON THE WORLD GRAPHICS
        flag = false
        //Check if the country in in the world
        for(j=0; j<(topology.features).length; j++){
            if(table[i]['Country'] == topology.features[j].properties.name ){
                flag = true
            }
        }
        //Check if the country in in the countryies map
        for(j=0; j<map_countries.length; j++){
            if(table[i]['Country'] == map_countries[j][1] ){
                flag = true
                //Check if the country in in the countryies map but it is divided in the world
                if(map_countries_divided_flag[j]==true){
                    var buffer = Object.assign({}, table[i])
                    buffer['Country'] = map_countries[j][0]
                    countries_to_duplicate.push(buffer)
                }else{
                    table[i]['Country'] = map_countries[j][0]
                }
                
            }
        }
        //If the country not in the world and not in the countries map, it does not exist in the world so add it to array of to delete countries
        if(!flag){
            countries_not_in_worldraph.push(table[i])
        }
        
    }
    //Delete all the countries in the deletion array
    for(i=0; i<countries_not_in_worldraph.length; i++){
        table.splice(table.indexOf(countries_not_in_worldraph[i]), 1)
    }
    //Add the countries that are divided in the world map
    for(i=0; i<countries_to_duplicate.length; i++){
        table.push(countries_to_duplicate[i])
    }
    //This will contain 24 countries becasue 188 are the ones in the database - 176 are the ones in the world + 9 in the world are not in the database + 3 in the database but divided in the world so other 3 are in db but no in the world

    return table;
}
