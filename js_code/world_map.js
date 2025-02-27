var selected_countries_world_map = [];
var selected_countries_world_map_triple = []
var database_data;

function world_map_loader(data, topology){
    
    //console.log(data)
    //Transform the dataset rows in Country, Sum rows
    database_data = data_elaboration_to_display_map(data);
    var min_data_value = database_data[0].Sum;
    var max_data_value = database_data[0].Sum;
    //console.log(database_data)

    //Calculate the max and the min value in the dataset to choose the colors thresholds
    for(i=0; i<database_data.length; i++){
        if(database_data[i].Sum > max_data_value){
            max_data_value = database_data[i].Sum;
        }
        if(database_data[i].Sum < min_data_value){
            min_data_value = database_data[i].Sum;
        }
    }    
    //console.log("Min and Max values to represent:",min_data_value, "|" , max_data_value)

    /*var width = Math.max(960, d3.select("#world_map").style('width').slice(0, -2)),
    height = Math.max(500, d3.select("#world_map").style('height').slice(0, -2)),
    centered,
    clicked_point;*/
    
    //Variables of the map size
    var width =d3.select("#world_map").style('width').slice(0, -2),
    height = d3.select("#world_map").style('height').slice(0, -2),
    centered,
    clicked_point;

    //Map projection
    var projection = d3.geoEquirectangular()
	                    .scale((width - 1) / 2 / Math.PI) // scale to fit group width
	                    .translate([width / 2.03, height / 1.7]); // ensure centred in group
                         
    var plane_path = d3.geoPath()
                        .projection(projection);
    
    //Map Zoom
    const zoom = d3.zoom()
                    .scaleExtent([1, 20])
                    .translateExtent([[0,0], [width, height]])
                    .extent([[0, 0], [width, height]])
                    .on('zoom', zoomed);

    //Append the svg for the map in the html world_map div
    var svg_layer_1 = d3.select("#world_map").append("svg")
                        .attr("width", "100%")
                        .attr("height", "100%");

    //Div for the countries label on mouse over
    var tooltip = d3.select("div.tooltip_world_map");
        tooltip.classed("hidden", true)

    //Colors of the map with a the threshhold, white < 1000, red >10000000
    var color_scale = d3.scaleThreshold()
                        .domain([1000, 10000, 100000, 1000000])
                        //.domain([min_data_value, max_data_value])
                        .range(d3.schemeReds[4]);
    /*var color_scale = d3.scaleLinear()
                        .domain([1000, 10000, 100000, 1000000])
                        //.domain([min_data_value, max_data_value])
                        .range(d3.schemeReds[4])*/

    var g = svg_layer_1.append("g");

    var path = d3.geoPath()
                    .projection(projection);

    //Zoom function
    function zoomed() {
        g.selectAll('path') // To prevent stroke width from scaling
        .attr('transform', d3.event.transform);
    }

    //Interaction  functions
    //Array that manage all the selected (clicked) countries
    let mouse_over = function(d){
            //console.log("Prima dell'if mouse over")
                //console.log(selected_countries_world_map_triple, selected_countries_pca_scatterplot_by_parallel, selected_countries_onAllAxis_by_scatterplot)
                if(!selected_countries_world_map_triple.includes(d.properties.name) && !selected_countries_pca_scatterplot_by_parallel.includes(d.properties.name) && !selected_countries_onAllAxis_by_scatterplot.includes(d.properties.name)){
                    //console.log("Dopo dell'if mouse over")
                    //Retrive the Sum for the country to display on the map
                    var sum_for_labels = "No Data";
                    for(i=0; i<database_data.length; i++){
                        if(database_data[i].Country == d.properties.name){
                            sum_for_labels = database_data[i].Sum;
                        }
                    }
                    //Check if hte country is one between the ones with database data not empty
                    var list_buffer = JSON.stringify([d.properties.name, ""]);
                    if(map_countries_stringifyed.indexOf(list_buffer) == -1 && (overpopulated_countries_flag || (!overpopulated_countries_flag && !overpopulated_countries.includes(d.properties.name)))){   //If the country is in the map_countries list with value "" this will return its index, not -1
                        if(selected_countries_world_map.length == 0){
                            d3.selectAll(".Country")
                                .style("opacity", .6)
                        }
                        d3.select(this)
                            .style("opacity", 1)
                            .style("stroke", "white")
                            .style("stroke-width", "1.5px")
                    }
                    d3.select(this).append("text")
                                    .text(d.properties.name)
                    
                }
                //Used to display the countries name
                tooltip.style("hidden", false)
                .html(function(){
                                if(!overpopulated_countries_flag && overpopulated_countries.includes(d.properties.name)){
                                    return d.properties.name + "<br>" +  "Excluded";
                                }else if(sum_for_labels=="No Data"){
                                        return d.properties.name + "<br>" +  sum_for_labels;
                                }else{
                                    return d.properties.name + "<br>" +  Math.round(sum_for_labels) + "&nbsp;Gg";
                                }});
            
            }
    let mouse_move = function(d){
                //Retrive the Sum for the country to display on the map
                var sum_for_labels = "No Data";
                for(i=0; i<database_data.length; i++){
                    if(database_data[i].Country == d.properties.name){
                        sum_for_labels = database_data[i].Sum;
                    }
                }
                //Move the div with the country name with the mouse on the map
                tooltip.classed("hidden", false)
                        .style("top", (d3.event.pageY) + "px")
                        .style("left", (d3.event.pageX + 15) + "px")
                        .html(function(){
                                        if(!overpopulated_countries_flag && overpopulated_countries.includes(d.properties.name)){
                                            return d.properties.name + "<br>" +  "Excluded";
                                        }else if(sum_for_labels=="No Data"){
                                            return d.properties.name + "<br>" +  sum_for_labels;
                                        }else{
                                            return d.properties.name + "<br>" +  Math.round(sum_for_labels) + "&nbsp;Gg";
                                        }
                                        });
            }
    let mouse_leave = function(d){
                if(!selected_countries_world_map_triple.includes(d.properties.name) && !selected_countries_pca_scatterplot_by_parallel.includes(d.properties.name) && !selected_countries_onAllAxis_by_scatterplot.includes(d.properties.name)){
                    //Check if hte country is one between the ones with database data not empty
                    var list_buffer = JSON.stringify([d.properties.name, ""]);
                    if(map_countries_stringifyed.indexOf(list_buffer) == -1 && (overpopulated_countries_flag || (!overpopulated_countries_flag && !overpopulated_countries.includes(d.properties.name)))){   //If the country is in the map_countries list with value "" this will return its index, not -1
                        if(selected_countries_world_map.length == 0){
                            d3.selectAll(".Country")
                                .style("opacity", .8)
                        }
                        if(!selected_countries_world_map.includes(d.properties.name)){
                            if(selected_countries_world_map.length != 0){
                                d3.select(this)
                                    .style("opacity", .6)
                                    .style("stroke", "white")
                                    .style("stroke-width", "0.3px")
                            }else{
                                d3.select(this)
                                .style("stroke", "white")
                                .style("stroke-width", "0.3px")
                            }
                        }
                    }
                    
                }
                //Hide the label of the country name
                tooltip.classed("hidden", true);
            }
    let mouse_click = function(d){
                //Check if hte country is one between the ones with database data not empty
                var list_buffer = JSON.stringify([d.properties.name, ""]);
                if(map_countries_stringifyed.indexOf(list_buffer) == -1 && (overpopulated_countries_flag || (!overpopulated_countries_flag && !overpopulated_countries.includes(d.properties.name)))){   //If the country is in the map_countries list with value "" this will return its index, not -1
                    
                    if(!selected_countries_world_map.includes(d.properties.name) && selected_countries_bar_chart_dth.length==0){
                        selected_countries_world_map.push(d.properties.name);
                        if(!selected_countries_world_map_triple.includes(d.properties.name)){
                            selected_countries_world_map_triple.push(d.properties.name);
                        }
                        map_selection_interaction(d.properties.name)
                    }else if(selected_countries_world_map.includes(d.properties.name) && (selected_countries_bar_chart_dth.length==0 || selected_countries_bar_chart_dth.includes(d.properties.name))){
                        selected_countries_world_map.splice(selected_countries_world_map.indexOf(d.properties.name), 1);
                        if(selected_countries_world_map_triple.includes(d.properties.name)){
                            selected_countries_world_map_triple.splice(selected_countries_world_map_triple.indexOf(d.properties.name), 1);
                        }
                        d3.select(this)
                            .style("opacity", .6)
                            .style("stroke", "white")
                            .style("stroke-width", "0.3px")
                        
                        map_deselection_interaction(d.properties.name)

                        if(selected_countries_world_map.length==0){           //If no more selected countries bring all the other countries to the start map state (no selected countries)
                            d3.selectAll(".Country")
                                .style("opacity", .8)
                        }

                    }else if (!selected_countries_world_map.includes(d.properties.name) && !selected_countries_bar_chart_dth.includes(d.properties.name)){ 
                        
                        for(i=0; i<selected_countries_world_map.length; i++){
                            map_deselection_interaction(selected_countries_world_map[i])
                        }
                        d3.selectAll(".Country")
                                .style("opacity", .6)
                                .style("stroke", "white")
                                .style("stroke-width", "0.3px")
                        selected_countries_world_map = []
                        selected_countries_world_map_triple = []
                        d3.select(this)
                            .style("opacity", 1)
                            .style("stroke", "white")
                            .style("stroke-width", "1.5px")
                        selected_countries_world_map.push(d.properties.name);
                        selected_countries_world_map_triple.push(d.properties.name);

                        map_selection_interaction(d.properties.name)
                    }
                }
                //console.log(selected_countries_world_map);
            }


    var map_countries_stringifyed = JSON.stringify(map_countries);

    //Load and display the World
    g.selectAll("path")
        .data(topology.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath()
                        .projection(projection))
        .attr("class", function(d){ return "Country" } )        //Set one class for each country in the map
        .style("opacity", .8)                                   //Set starting opacity 
        .on("mouseover", mouse_over )                           //From here are all mouse events handler
        .on("mouseleave", mouse_leave )
        .on("click", mouse_click)
        .on("mousemove", mouse_move)

    //var just to debug
    var counter = 0;
    
    //color the world
    g.selectAll('path')
        .attr('fill', function (d) {
                        for(i=0; i<database_data.length; i++){
                            if(database_data[i].Country == d.properties.name){
                                counter += 1;
                                return color_scale(database_data[i].Sum);
                            }
                        }
                        
                                    //console.log("Country non matched:", d.properties.name);
                                
                        return "#69a3b2";

                    })
    //console.log("Total number of matched countries:", counter);

    //Add the Zoom
    svg_layer_1.call(zoom)

    //Add the pattern for the no selected overpopulated countries
    svg_layer_1
            .append('defs')
            .append('pattern')
                .attr('id', 'diagonalHatch')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
            .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 1);


    //For the reset button
    if(!overpopulated_countries_flag){
        d3.select("#world_map").select("g").selectAll("path").filter(function(f) {
            if(overpopulated_countries.includes(f.properties.name)){
                for(i=0; i<database_data.length; i++){
                    if(database_data[i].Country == f.properties.name){
                        d3.select("#world_map").select("defs").select("pattern").select("path").attr('stroke', color_scale(database_data[i].Sum))
                    }
                }
                return true
            }else{
                return false
            }
        }).attr('fill', 'url(#diagonalHatch)')
    }

    
    
    //Addition of the legend
    var threshold = d3.scaleThreshold()
                        .domain([1, 2, 3, 4])       //Used just to solor the legend
                        .range(d3.schemeReds[4]);
        
    var x = d3.scaleLinear()                        //Used to set the distance between the different colors
                .domain([0, 4])
                .range([0, 200]);                   //Increae or decrease the length of the colors block
    
    /*var superscript = "⁰¹²³⁴⁵⁶",
        formatPower = function(d) { return ( d + "").split("").map(function(c) { return superscript[c]; }).join(""); };

    var y = d3.scaleLog()                           //Used to se the numbers in a logaritmic way
                        .domain([1e6, 1e0])
                        .range([150, 0]);           //Increae or decrease the spage between the legend's numbers


    var xAxis = d3.axisRight(y)
                    .tickSize(0)
                    .tickValues([1000, 10000, 100000, 1000000])
                    .tickFormat(function(d) { 
                                                //console.log(Math.log(d) / Math.LN10);
                                                return 10 + formatPower(Math.round(Math.log(d) / Math.LN10)); })

    //var g = d3.select("g").call(xAxis);
    
    svg_layer_1.select(".domain")
        .remove();*/

    //Insert all the rectangles with the colors of the choroplet
    svg_layer_1.selectAll("rect")
                .data(threshold.range().map(function(color) {
                                                            var d = threshold.invertExtent(color);
                                                            if (d[0] == null) d[0] = x.domain()[0];
                                                            if (d[1] == null) d[1] = x.domain()[1];
                                                            return d;}))
                .enter().insert("rect", ".tick")
                        .attr("height", 20)
                        .attr("x", function(d) { 
                                                return 15 })
                        .attr("y", function(d) { 
                                                return (d[0]*25) })
                        .attr("width", function(d) { 
                                                    return 20 })
                        .attr("fill", function(d) { 
                                                    if(d[0] == 0) return threshold(3);
                                                    else if (d[0] == 1) return threshold(2);
                                                    else if (d[0] == 2) return threshold(1);
                                                    else if (d[0] == 3) return threshold(0);})
                        .style("opacity", .8)

    //Insert the rectangle with the color of no data countries
    svg_layer_1.append('rect')
                .attr('x', 15)
                .attr('y', 100)
                .attr('width', 20)
                .attr('height', 20)
                //.attr('stroke', 'black')
                .attr('fill', '#69a3b2')


    //Insert the labels of the legend
    svg_layer_1.append("text")
                .attr('x', 40)
                .attr('y', 14)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(85,21)")                   //Move the legend's text
                .text("< 10⁶")
    svg_layer_1.append("text")
                .attr('x', 40)
                .attr('y', 40)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(85,46)")                   //Move the legend's text
                .text("< 10⁵")
    svg_layer_1.append("text")
                .attr('x', 40)
                .attr('y', 65)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(85,71)")                   //Move the legend's text
                .text("< 10⁴")
    svg_layer_1.append("text")
                .attr('x', 40)
                .attr('y', 90)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(85,96)")                   //Move the legend's text
                .text("< 10³")
    svg_layer_1.append("text")
                .attr('x', 43)
                .attr('y', 116)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(89,121)")                   //Move the legend's text
                .text("N.D.")
    svg_layer_1.append("text")
                .attr('x', 13)
                .attr('y', 142)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(0,12)")                   //Move the legend's text
                .text("Total Air Pollutants Emissions (Gg)")
    
    //Movetheleend to fit in the resized page
    svg_layer_1.selectAll("rect")
                .attr("transform", "translate(0,"+ ((height/2)+(width/17)) +")")
    svg_layer_1.selectAll("text")
                .attr("transform", "translate(0,"+ ((height/2)+(width/17)) +")")


    //Update the selected countries when this start
    g.selectAll('path', function(d){
            if (selected_countries_world_map.indexOf(d.properties.name) > -1) {
                //In the array!
                d3.select(this)
                .style("opacity", 1)
                .style("stroke", "white")
                .style("stroke-width", "1.5px")
            } else {
                //Not in the array
            }
        })



};

function data_elaboration_to_display_map(start_data){
    var output_data = [];
    for(i=0; i<start_data.length; i++){
        //sum of all the emissions
        var total = start_data[i]['CO'] +
                    start_data[i]['CH4'] +
                    start_data[i]['NH3'] +
                    start_data[i]['NMVOC'] +
                    start_data[i]['NOx'] +
                    start_data[i]['SO2'] +
                    start_data[i]['PM 10'] +
                    start_data[i]['PM 2.5'];
        output_data.push(
                            {
                                "Country" : start_data[i]['Country'],
                                "Sum" : total
                            }
                        )
    }
    //console.log(output_data)
    return output_data
}


//================================================================= BETWEEN GRAPHS INTERACTION =========================================================
//Function to change the years
function change_map_with_year(ever_full_data, data, countries_array){
    var color_scale = d3.scaleThreshold()
                        .domain([1000, 10000, 100000, 1000000])
                        //.domain([min_data_value, max_data_value])
                        .range(d3.schemeReds[4]);
    database_data = data_elaboration_to_display_map(data);
    var ever_full_data_processed = data_elaboration_to_display_map(ever_full_data);
    d3.select("#world_map").select("g").selectAll("path").filter(function(f) {return true })
                                                .attr('fill', function (d) {
                                                    if(!overpopulated_countries_flag && countries_array.includes(d.properties.name)){
                                                        for(i=0; i<ever_full_data_processed.length; i++){
                                                            if(ever_full_data_processed[i].Country == d.properties.name){
                                                                d3.select("#world_map").select("defs").select("pattern").select("path").attr('stroke', color_scale(ever_full_data_processed[i].Sum))
                                                            }
                                                        }
                                                        return 'url(#diagonalHatch)'
                                                    }else{
                                                        for(i=0; i<database_data.length; i++){
                                                            if(database_data[i].Country == d.properties.name){
                                                                return color_scale(database_data[i].Sum);
                                                            }
                                                        }           
                                                        return "#69a3b2";
                                                    }
                                                    
                                                })
}

//Function to de/select the overpopulated countries
function change_map_overpopulated(ever_full_data, countries_array){

    var ever_full_data_processed = data_elaboration_to_display_map(ever_full_data);
    var color_scale = d3.scaleThreshold()
                        .domain([1000, 10000, 100000, 1000000])
                        //.domain([min_data_value, max_data_value])
                        .range(d3.schemeReds[4]);

    for(i=0; i<countries_array.length; i++){
        if(selected_countries_world_map.includes(countries_array[i])){
            deselect_country_on_map(countries_array[i])
        }
        if(selected_countries_world_map_triple.includes(overpopulated_countries[i])){
            selected_countries_world_map_triple.splice(selected_countries_world_map_triple.indexOf(overpopulated_countries[i]),1)
        }
    }
    
    d3.select("#world_map").select("g").selectAll("path").filter(function(f) {
                                                                    if(countries_array.includes(f.properties.name)){
                                                                        for(i=0; i<ever_full_data_processed.length; i++){
                                                                            if(ever_full_data_processed[i].Country == f.properties.name){
                                                                                d3.select("#world_map").select("defs").select("pattern").select("path").attr('stroke', color_scale(ever_full_data_processed[i].Sum))
                                                                            }
                                                                        }
                                                                        return true
                                                                    }else{
                                                                        return false
                                                                    }
                                                                }).attr('fill', 'url(#diagonalHatch)')
}

//Function called by other graphs to select countries on the map
function select_country_on_map(country, from){
    if(selected_countries_world_map.length==0){
        d3.selectAll(".Country")
            .filter(function(f){
                return true
            })
            .style("opacity", .6)
    }
    if(!selected_countries_world_map.includes(country)){
        selected_countries_world_map.push(country);
    }
    d3.select("#world_map").select("g").selectAll("path").filter(function(f) {
        if(f.properties.name == country){
            //console.log(f)
            return true
        }else{
            return false
        }
    })
    .style("opacity", 1)
    .style("stroke", function(){
        
                    if(from == "scatterplot"){
                        return "#eb04f7"
                    }else if (from == "parallel"){
                        return "#16bc21"
                    }else{
                        return "white"
                    }
    })
    .style("stroke-width", "1.5px")

}

//Function called by other graphs to deselect countries on the map
function deselect_country_on_map(country){
    if(selected_countries_world_map.includes(country)){
        selected_countries_world_map.splice(selected_countries_world_map.indexOf(country), 1);
    }
    d3.select("#world_map").select("g").selectAll("path").filter(function(f) {
        if(f.properties.name == country){
            //console.log(f)
            return true
        }else{
            return false
        }
    })
    .style("opacity", .6)
    .style("stroke", "white")
    .style("stroke-width", "0.3px")

    if(selected_countries_world_map.length==0){
        d3.selectAll(".Country")
            .filter(function(f){
                return true
            })
            .style("opacity", .8)
    }
}

//Function to select in the case of triple interaction
function select_country_on_map_triple(country){
    
    if(!selected_countries_world_map_triple.includes(country)){
        //Se non era gia in tripla selezione la aggiungo all'array
        selected_countries_world_map_triple.push(country);

        d3.select("#world_map").select("g").selectAll("path").filter(function(f) {
            if(f.properties.name == country){
                //console.log(f)
                return true
            }else{
                return false
            }
        })
        .style("opacity", 1)
        .style("stroke", "white")
        .style("stroke-width", "1.5px")
    }
}

//Function to select in the case of triple interaction
function deselect_country_on_map_triple(country){
    
    if(selected_countries_world_map_triple.includes(country)){
        //Se non era gia in tripla selezione la aggiungo all'array
        selected_countries_world_map_triple.splice(selected_countries_world_map_triple.indexOf(country), 1);

        d3.select("#world_map").select("g").selectAll("path").filter(function(f) {
            if(f.properties.name == country){
                //console.log(f)
                return true
            }else{
                return false
            }
        })
        .style("opacity", 1)
        .style("stroke", function(d){
                                        //console.log(selected_countries_pca_scatterplot_by_parallel)
                                        //console.log(selected_countries_onAllAxis_by_scatterplot)
                                        if(selected_countries_pca_scatterplot_by_parallel.includes(d.properties.name)){
                                            return "#16bc21"
                                        }else if(selected_countries_onAllAxis_by_scatterplot.includes(d.properties.name)){
                                            return "#eb04f7"
                                        }else{
                                            return "white"
                                        }
                                        
    
                                    })
        .style("stroke-width", "1.5px")
    }
}

function deselect_all_countries_on_map(){
    var buffer = selected_countries_world_map.slice()
    for(i=0; i<buffer.length; i++){
        deselect_country_on_map(buffer[i])
    }
    /*var buffer = selected_countries_world_map_triple.slice()
    for(i=0; i<buffer.length; i++){
        deselect_country_on_map_triple(buffer[i])
    }*/
}

//Function that trigger the selection from the map to the other graphs 
function map_selection_interaction(country){
    select_country_on_scatterplot(country)
    select_for_parallel_to_scatterplot(country)
    select_on_parallel(country)
    select_on_parallel_from_pca(country)
    //select_country_on_map_triple(country)
}

//Function that trigger the deselection from the map to the other graphs 
function map_deselection_interaction(country){
    if(selected_countries_pca_scatterplot_by_parallel.includes(country)){
        deselect_for_parallel_to_scatterplot(country)
        deselect_country_on_map_triple(country)
    }
    if(selected_countries_onAllAxis_by_scatterplot.includes(country)){
        deselect_on_parallel_from_pca(country)
        deselect_country_on_map_triple(country)
    }
    deselect_country_on_scatterplot(country)
    deselect_country_on_bar_chart_dth(country)
    deselect_on_parallel(country)
    //select_country_on_map_triple(country)
}

var  set_interval = false;

/*setInterval(function(){ 
    
                        set_interval = !set_interval
                
                        d3.select("#world_map").select("g").selectAll("path").filter(function(f) {
                            if(selected_countries_pca_scatterplot_by_parallel.includes(f.properties.name) && selected_countries_onAllAxis_by_scatterplot.includes(f.properties.name)){
                                
                                return true
                            }else{
                                return false
                            }
                        })
                        .style("opacity", 1)
                        .style("stroke", function(){
                                                        if(set_interval){
                                                            return "white"
                                                        }else{
                                                            return "#16bc21"
                                                        }
                                                        })
                        .style("stroke-width", "1.5px")

                    }, 500);*/