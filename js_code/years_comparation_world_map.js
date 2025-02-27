var selected_countries_world_map = [];

var database_data;

function world_map_loader(data, topology){
    
    //console.log(data)
    //Transform the dataset rows in Country, Sum rows
    database_data = data_elaboration_to_display_map(data);
    var min_data_value = database_data[0]["Mean of total population over years"];
    var max_data_value = database_data[0]["Mean of total population over years"];
    //console.log(database_data)

    //Calculate the max and the min value in the dataset to choose the colors thresholds
    for(i=0; i<database_data.length; i++){
        if(database_data[i]["Mean of total population over years"] > max_data_value){
            max_data_value = database_data[i]["Mean of total population over years"];
        }
        if(database_data[i]["Mean of total population over years"] < min_data_value){
            min_data_value = database_data[i]["Mean of total population over years"];
        }
    }    
    console.log("Min and Max values to represent:",min_data_value, "|" , max_data_value)

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
                        .domain([10000000, 50000000, 100000000, 1000000000])
                        //.domain([min_data_value, max_data_value])
                        .range(d3.schemePurples[4]);
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
                //Retrive the Sum for the country to display on the map
                var sum_for_labels = "No Data";
                for(i=0; i<database_data.length; i++){
                    if(database_data[i].Country == d.properties.name){
                        sum_for_labels = database_data[i]["Mean of total population over years"];
                    }
                }
                //Check if hte country is one between the ones with database data not empty
                var list_buffer = JSON.stringify([d.properties.name, ""]);
                if(map_countries_stringifyed.indexOf(list_buffer) == -1 ){   //If the country is in the map_countries list with value "" this will return its index, not -1
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
                    
            
                //Used to display the countries name
                tooltip.style("hidden", false)
                .html(function(){
                                if(!overpopulated_countries_flag && overpopulated_countries.includes(d.properties.name)){
                                    return d.properties.name + "<br>" +  "Excluded";
                                }else if(sum_for_labels=="No Data"){
                                        return d.properties.name + "<br>" +  sum_for_labels;
                                }else{
                                    return d.properties.name + "<br>" +  Math.round(sum_for_labels) /*+ "&nbsp;Gg"*/;
                                }});
            
            }
    let mouse_move = function(d){
                //Retrive the Sum for the country to display on the map
                var sum_for_labels = "No Data";
                for(i=0; i<database_data.length; i++){
                    if(database_data[i].Country == d.properties.name){
                        sum_for_labels = database_data[i]["Mean of total population over years"];
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
                                            return d.properties.name + "<br>" +  Math.round(sum_for_labels) /*+ "&nbsp;Gg"*/;
                                        }
                                        });
            }
    let mouse_leave = function(d){
                    //Check if hte country is one between the ones with database data not empty
                    var list_buffer = JSON.stringify([d.properties.name, ""]);
                    if(map_countries_stringifyed.indexOf(list_buffer) == -1){   //If the country is in the map_countries list with value "" this will return its index, not -1
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
                //Hide the label of the country name
                tooltip.classed("hidden", true);
            }
    let mouse_click = function(d){
                //Check if hte country is one between the ones with database data not empty
                var list_buffer = JSON.stringify([d.properties.name, ""]);
                if(map_countries_stringifyed.indexOf(list_buffer) == -1 ){   //If the country is in the map_countries list with value "" this will return its index, not -1
                    
                    
                        if(!selected_countries_world_map.includes(d.properties.name)){
                            //Chech that the selected countries are less that 9 (number of colors)
                            if(selected_countries_world_map.length < 9){
                                selected_countries_world_map.push(d.properties.name);
                                
                                //Associo ogni nazione ad un colore
                                country_associate_colors(d.properties.name)

                                map_selection_trigger()
                                legend_creatuon_update()
                            }
                    }else {
                        selected_countries_world_map.splice(selected_countries_world_map.indexOf(d.properties.name), 1);
                        
                        d3.select(this)
                            .style("opacity", .6)
                            .style("stroke", "white")
                            .style("stroke-width", "0.3px")
                        
                        //map_deselection_interaction(d.properties.name)

                        if(selected_countries_world_map.length==0){           //If no more selected countries bring all the other countries to the start map state (no selected countries)
                            d3.selectAll(".Country")
                                .style("opacity", .8)
                        }

                        //Deassocio ogni nazione ad un colore
                        country_deassociate_colors(d.properties.name)

                        map_selection_trigger()
                        legend_creatuon_update()

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
                                return color_scale(database_data[i]["Mean of total population over years"]);
                            }
                        }
                        
                                    //console.log("Country non matched:", d.properties.name);
                                
                        return "#e2e5a9";

                    })
    //console.log("Total number of matched countries:", counter);

    //Add the Zoom
    svg_layer_1.call(zoom)

    //Add the pattern for the no selected overpopulated countries
    /*svg_layer_1
            .append('defs')
            .append('pattern')
                .attr('id', 'diagonalHatch')
                .attr('patternUnits', 'userSpaceOnUse')
                .attr('width', 4)
                .attr('height', 4)
            .append('path')
                .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 1);*/


    //For the reset button
    /*if(!overpopulated_countries_flag){
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
    }*/

    
    
    //Addition of the legend
    var threshold = d3.scaleThreshold()
                        .domain([1, 2, 3, 4])       //Used just to solor the legend
                        .range(d3.schemePurples[4]);
        
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
                .attr('fill', '#e2e5a9')


    //Insert the labels of the legend
    svg_layer_1.append("text")
                .attr('x', 40)
                .attr('y', 14)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(85,21)")                   //Move the legend's text
                .text("< 1.5BN")
    svg_layer_1.append("text")
                .attr('x', 40)
                .attr('y', 40)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(85,46)")                   //Move the legend's text
                .text("< 10M")
    svg_layer_1.append("text")
                .attr('x', 40)
                .attr('y', 65)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(85,71)")                   //Move the legend's text
                .text("< 5M")
    svg_layer_1.append("text")
                .attr('x', 40)
                .attr('y', 90)
                .attr("fill", "#FFF")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                //.attr("transform", "translate(85,96)")                   //Move the legend's text
                .text("< 1M")
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
                .text("Total Population 2000-2015 Average")
    
    //Movetheleend to fit in the resized page
    svg_layer_1.selectAll("rect")
                .attr("transform", "translate(0,"+ ((height/2)+(width/15)) +")")
    svg_layer_1.selectAll("text")
                .attr("transform", "translate(0,"+ ((height/2)+(width/15)) +")")


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

    //Create the empty legend
    legend_creatuon_update()

};

function data_elaboration_to_display_map(start_data){
    var output_data = [];

    /*for(i=0; i<start_data.length; i++){
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
    }*/
    
    var array_of_the_sum_over_the_years = []

    for(k=0; k<start_data.length; k++){

        for(i=0; i<start_data[k].length; i++){

            //var sum_PMs = start_data[k][i]['PM 10']+start_data[k][i]['PM 2.5']

            //Sum of each country over the years
            if(array_of_the_sum_over_the_years.length<start_data[0].length){
                //array_of_the_sum_over_the_years.push(start_data[k])
                array_of_the_sum_over_the_years.push(start_data[k][i]["Total Population"])

            }else{
                array_of_the_sum_over_the_years[i] = array_of_the_sum_over_the_years[i]+start_data[k][i]["Total Population"]
            }

        }

    }


    for(i=0; i<array_of_the_sum_over_the_years.length; i++){
        //array_of_the_sum_over_the_years[i] = array_of_the_sum_over_the_years[i]/start_data.length
        array_of_the_sum_over_the_years[i] = array_of_the_sum_over_the_years[i]/start_data.length
        /*output_data.push(
            {
                "Country" : start_data[0][i]['Country'],
                "Mean of emissions over years" : array_of_the_sum_over_the_years[i]
            }
        )*/
        output_data.push(
            {
                "Country" : start_data[0][i]['Country'],
                "Mean of total population over years" : array_of_the_sum_over_the_years[i]
            }
        )

    }

    //console.log(output_data)
    //console.log(output_data)
    return output_data
}





function map_selection_trigger(){
    upload_line_chart_dth()
    upload_line_chart_emsn()
}






function country_associate_colors(country){
    for(i=0; i<colors_for_countries.length; i++){
        if(colors_for_countries_association[i]==" "){
            colors_for_countries_association[i] = country
            break
        }
    }
}

function country_deassociate_colors(country){
    for(i=0; i<colors_for_countries.length; i++){
        if(colors_for_countries_association[i]==country){
            colors_for_countries_association[i] = " "
        }
    }
}





function legend_creatuon_update(){
    var margin = {top: 20, right: 50, bottom: 30, left: 60},
        width = d3.select("#legend").style('width').slice(0, -2) - margin.left - margin.right,
        height = d3.select("#legend").style('height').slice(0, -2) - margin.top - margin.bottom - 20;

    d3.select("#legend").select('svg').remove()

    // append the svg object to the body of the page
    var svg = d3.select("#legend")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    svg.append('rect')
        .attr('x', 0)
        .attr('y', 30)
        .attr('width', 280)
        .attr('height', 60)
        .attr('fill', "black")
        .attr("stroke", "black")
        .attr("stroke-width", "0.1px")
        //.attr("opacity", 0.5)
        
    svg.append("text")
        .attr('x', 25)
        .attr('y', 65)
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .attr("text-anchor", "start")
        .text("Selected countries colors")

    for(i=0; i<colors_for_countries.length; i++){

        svg.append('rect')
            .attr('x', 10)
            .attr('y', ((i*25)+100))
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', colors_for_countries[i])
            .attr("stroke", "black")
            .attr("stroke-width", "0.1px")
            //.attr("opacity", 0.5)
        
        if(colors_for_countries_association[i] != " "){

            svg.append("text")
                .attr('x', 40)
                .attr('y', (i*25)+15+100)
                .attr("fill", "black")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text(colors_for_countries_association[i])
        }

    }
    }


































































