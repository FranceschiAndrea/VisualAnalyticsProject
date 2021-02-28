var full_data = [];
var full_data_no_overpopulated = [];
var world_map_file;
var current_year = 4;
var bar_graph_people_range = 1;          //1(bigger)-5(lower)

if(current_year<10){
    d3.selectAll(("input[name='range_years']")).property("value", "200"+current_year)
}else{
    d3.selectAll(("input[name='range_years']")).property("value", "20"+current_year)
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

var overpopulated_countries = ["India", "China", "USA"];

    //-----------------------------------------EUROPE--------------------------------------------------
    //comprende western+southern
    var region_southern_europe=[
    "Albania","Austria","Belgium","Bosnia and Herzegovina","Slovenia","Croatia","Greece","Italy","Germany",
    "Spain","Portugal","Switzerland","Netherlands","Republic of Serbia","Macedonia","France","Luxembourg"
    ]
    
    //comprende northern+eastern
    var region_northern_europe=[
    "Belarus","Bulgaria","Czech Republic","Denmark","Estonia","Finland","Russia","Latvia","Lithuania","Sweden",
    "Norway","England","Ireland","Iceland","Poland","Ukraine","Moldova","Romania","Slovakia","Hungary"
    ]
    //----------------------------------------------------------------------------------------------------
    
    //-----------------------------------------ASIA---------------------------------------------------- 
    var region_southern_asia=[
    "Afghanistan","Bangladesh","Pakistan","India","Nepal","Bhutan","Sri Lanka","Iran",
    ]
    
    var region_central_asia=[
    "Kazakhstan","Turkmenistan","Uzbekistan","Tajikistan","Kyrgyzstan"
    ]
    
    var region_western_asia=[
    "Armenia","Azerbaijan","Turkey","Cyprus","Northern Cyprus","Georgia","Oman","Yemen","Saudi Arabia",
    "United Arab Emirates","Qatar","Kuwait","Iraq","Jordan","Israel","Lebanon","Syria"
    ]
    
    var region_eastern_asia=[
    "China","North Korea","South Korea","Japan","Mongolia","Taiwan"
    ]
    
    var region_southeastern_asia=[
    "Brunei","Cambodia","Myanmar","Thailand","Laos","Vietnam","Malaysia","Indonesia","Philippines","East Timor"
    ]
    //----------------------------------------------------------------------------------------------------
    
    //-----------------------------------------AFRICA---------------------------------------------------- DONE
    
    //comprende northern+ western
    var region_northern_africa=[
    "Algeria","Benin","Burkina Faso","Niger","Nigeria","Togo","Ghana","Liberia","Sierra Leone","Guinea",
    "Guinea Bissau","Gambia","Senegal","Mauritania","Mali","Morocco","Tunisia","Libya","Egypt","Sudan"
    ]
    //comprende middle+eastern
    var region_central_africa=[
    "Angola","Burundi","Zambia","Zimbabwe","Mozambique","Madagascar","Cameroon",
    "Central African Republic","Chad","Republic of the Congo","Democratic Republic of the Congo",
    "South Sudan","Ethiopia","Eritrea","Somalia","Uganda","Kenya","Rwanda","United Republic of Tanzania",
    "Malawi","Equatorial Guinea","Gabon","Djibouti"
    ]
    var region_southern_africa=[
    "Botswana","Namibia","South Africa","Lesotho","Swaziland"
    ]
    //----------------------------------------------------------------------------------------------------
    
    //-----------------------------------------AMERICA----------------------------------------------------
    
    //DONE
    
    //comprendere northern+central+Caribbean
    var region_northern_america=[
    "The Bahamas","Belize","Canada","Costa Rica","Cuba","Dominican Republic","USA","Mexico","Guatemala",
    "Honduras","Nicaragua","Panama","Jamaica","Haiti","Puerto Rico","Greenland","El Salvador"
    ]
    
    var region_southern_america=[
    "Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","Peru","Venezuela","Trinidad and Tobago",
    "Guyana","Suriname","Paraguay","Uruguay"
    ]
    
    //----------------------------------------------------------------------------------------------------
    
    //------------------------------------------OCEANIA---------------------------------------------------
    var region_oceania=[
    "Australia","New Zealand","Papua New Guinea","Solomon Islands","Vanuatu","Fiji"
    ]
    
    //----------------------------------------------------------------------------------------------------
    


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
                for(k=0; k<full_data.length; k++){
                    parseTable(full_data[k], world);
                    full_data_no_overpopulated.push(flter_overpopulated(full_data[k]))
                }
                
                world_map_loader(full_data[current_year], world_map_file);
                scatterplot_pca_loader(full_data[current_year]);
                bar_chart_dht_loader(full_data[current_year], bar_graph_people_range)
                parallel_loader(full_data[current_year])

        }
    });




//Function that change the years of all the graphs
d3.selectAll(("input[name='range_years']")).on("input", function(){
    var value = parseInt(this.value.slice(-2))
    current_year = value
    if(overpopulated_countries_flag){
        change_map_with_year(full_data[current_year], full_data[current_year], overpopulated_countries)
        change_scatterplot_with_year(full_data[current_year])
        change_bar_chart_dth_with_year(full_data[current_year], bar_graph_people_range)
        change_parallel_with_year(full_data[current_year])
    }else{
        change_map_with_year(full_data[current_year], full_data_no_overpopulated[current_year], overpopulated_countries)
        change_scatterplot_with_year(full_data_no_overpopulated[current_year])
        change_bar_chart_dth_with_year(full_data_no_overpopulated[current_year], bar_graph_people_range)
        change_parallel_with_year(full_data_no_overpopulated[current_year])
    }
})

var overpopulated_countries_flag = true;
//Function to select or deselect the overpopulated countries
d3.select("input[name='no_big_countries_checkbox']").on("change", function(){

    if(overpopulated_countries_flag){
        overpopulated_countries_flag = !overpopulated_countries_flag
        change_bar_chart_dth_overpopulated(full_data_no_overpopulated[current_year], bar_graph_people_range, overpopulated_countries)
        change_scatterplot_overpopulated(full_data_no_overpopulated[current_year], overpopulated_countries)
        change_map_overpopulated(full_data[current_year], overpopulated_countries)
        change_parallel_overpopulated(full_data_no_overpopulated[current_year],overpopulated_countries)

    }else{
        overpopulated_countries_flag = !overpopulated_countries_flag
        change_bar_chart_dth_with_year(full_data[current_year], bar_graph_people_range)
        change_scatterplot_with_year(full_data[current_year])
        change_map_with_year(full_data[current_year], full_data[current_year], overpopulated_countries)
        change_parallel_with_year(full_data[current_year])
    }
})


d3.select(("button[id='total_reset_button']")).on("click", function(){

    selected_countries_world_map = []
    selected_countries_world_map_triple = []
    selected_countries_pca_scatterplot = []
    selected_countries_pca_scatterplot_by_parallel = []
    selected_countries_onAllAxis = []
    selected_countries_onAllAxis_by_scatterplot = []
    selected_countries_bar_chart_dth = []

    d3.select("#world_map").select('svg').remove()

    world_map_loader(full_data[current_year], world_map_file)

    if(overpopulated_countries_flag){
        //change_map_with_year(full_data[current_year], full_data_no_overpopulated[current_year], overpopulated_countries)
        change_scatterplot_with_year(full_data[current_year])
        change_bar_chart_dth_with_year(full_data[current_year], bar_graph_people_range)
        change_parallel_with_year(full_data[current_year])
    }else{
        //change_map_with_year(full_data[current_year], full_data_no_overpopulated[current_year], overpopulated_countries)
        //change_map_overpopulated(full_data[current_year], overpopulated_countries)
        change_scatterplot_with_year(full_data_no_overpopulated[current_year])
        change_bar_chart_dth_with_year(full_data_no_overpopulated[current_year], bar_graph_people_range)
        change_parallel_with_year(full_data_no_overpopulated[current_year])
    }
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
    for(i=0;i<table.length;i++){

        //EUROPE
        if(region_southern_europe.includes(table[i]['Country'])){
            table[i]["World Region"]="Southern Europe"
        }
        else if(region_northern_europe.includes(table[i]['Country'])){
            table[i]["World Region"]="Northern Europe"
        }
  
        //AFRICA
        else if(region_central_africa.includes(table[i]['Country'])){
            table[i]["World Region"]="Central Africa"
        }
        else if(region_southern_africa.includes(table[i]['Country'])){
            table[i]["World Region"]="Southern Africa"
        }
        else if(region_northern_africa.includes(table[i]['Country'])){
            table[i]["World Region"]="Northern Africa"
        }
  
        //ASIA
        else if(region_central_asia.includes(table[i]['Country'])){
            table[i]["World Region"]="Central Asia"
        }
        else if(region_eastern_asia.includes(table[i]['Country'])){
            table[i]["World Region"]="Eastern Asia"
        }
        else if(region_western_asia.includes(table[i]['Country'])){
            table[i]["World Region"]="Western Asia"
        }
        else if(region_southern_asia.includes(table[i]['Country'])){
            table[i]["World Region"]="Southern Asia"
        }
        else if(region_southeastern_asia.includes(table[i]['Country'])){
            table[i]["World Region"]="Southeastern Asia"
        }
  
        //AMERICA
        else if(region_southern_america.includes(table[i]['Country'])){
            table[i]["World Region"]="Southern America"
        }
        else if(region_northern_america.includes(table[i]['Country'])){
            table[i]["World Region"]="Northern America"
        }
  
        //OCEANIA
        else if(region_oceania.includes(table[i]['Country'])){
            table[i]["World Region"]="Oceania"
        }
    }
  
    return table;
}

//Function to create the datawithout the overpopulated countries
function flter_overpopulated(complete_data_table){

    var buffer = complete_data_table.slice(0);

    for(i=0; i<overpopulated_countries.length; i++){
        for(j=0; j<complete_data_table.length; j++){
            if(complete_data_table[j].Country == overpopulated_countries[i]){
                buffer.splice(buffer.indexOf(complete_data_table[j]), 1)
            }
        }
    }

    return buffer

}