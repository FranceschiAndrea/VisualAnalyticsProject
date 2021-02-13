function world_map_loader(data){
    
    console.log(data)
    //Transform the dataset rows in Country, Sum rows
    var database_data = data_elaboration_to_display(data);
    var min_data_value = database_data[0].Sum;
    var max_data_value = database_data[0].Sum;
    console.log(database_data)

    //Calculate the max and the min value in the dataset to choose the colors thresholds
    for(i in database_data){
        if(database_data[i].Sum > max_data_value){
            max_data_value = database_data[i].Sum;
        }
        if(database_data[i].Sum < min_data_value){
            min_data_value = database_data[i].Sum;
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
	                    .scale((width - 1) / 1.8 / Math.PI) // scale to fit group width
	                    .translate([width / 2, height / 1.7]); // ensure centred in group
                         
    var plane_path = d3.geoPath()
                        .projection(projection);
    
    //Map Zoom
    const zoom = d3.zoom()
                    .scaleExtent([1, 5])
                    .on('zoom', zoomed);

    //Append the svg in the html world_map div
    var svg = d3.select("#world_map").append("svg")
                                .attr("width", width)
                                .attr("height", height);

    //Div for the countries label on mouse over
    var tooltip = d3.select("div.tooltip_world_map");

    //Colors of the map with a the threshhold, white < 1000, red >10000000
    var color_scale = d3.scaleThreshold()
                        .domain([1000, 10000, 100000, 1000000])
                        //.domain([min_data_value, max_data_value])
                        .range(d3.schemeReds[4]);

    var g = svg.append("g");

    var path = d3.geoPath()
                    .projection(projection);

    //Map of the countries, left the name on the world map, right the name in the dataset
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

    var map_countries_stringifyed = JSON.stringify(map_countries);

    //Load and display the World
    d3.json("resources/world.json", function(error, topology) {

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
        
        //Color the world
        g.selectAll('path')
            .attr('fill', function (d) {
                            for(i in database_data){
                                if(database_data[i].Country == d.properties.name){
                                    counter += 1;
                                    return color_scale(database_data[i].Sum);
                                }
                            }
                            for(i in map_countries){
                                if(map_countries[i][0] == d.properties.name){
                                    if(map_countries[i][1] != ""){
                                        for(j in database_data){
                                            if(database_data[j].Country == map_countries[i][1]){
                                                counter += 1;
                                                return color_scale(database_data[j].Sum);
                                            }
                                        }
                                    }else{
                                        console.log("Country non matched:", d.properties.name);
                                    }
                                }
                            }
                            return "#cacdd9";

                        });
        console.log("Total number of matched countries:", counter);

        //Add the Zoom
        g.call(zoom)


    });
    
    //Zoom function
    function zoomed() {
        g.selectAll('path') // To prevent stroke width from scaling
          .attr('transform', d3.event.transform);
      }

    //Interaction  functions
    //Array that manage all the selected (clicked) countries
    var selected_countries = [];
    let mouse_over = function(d){
                                    //Retrive the Sum for the country to display on the map
                                    var sum_for_labels;
                                    for(i in database_data){
                                        if(database_data[i].Country == d.properties.name){
                                            sum_for_labels = database_data[i].Sum;
                                        }
                                    }
                                    for(i in map_countries){
                                        if(map_countries[i][0] == d.properties.name){
                                            if(map_countries[i][1] != ""){
                                                for(j in database_data){
                                                    if(database_data[j].Country == map_countries[i][1]){
                                                        sum_for_labels = database_data[j].Sum;
                                                    }
                                                }
                                            }else{
                                                sum_for_labels = "No Data";
                                            }
                                        }
                                    }
                                    //Check if hte country is one between the ones with database data not empty
                                    var list_buffer = JSON.stringify([d.properties.name, ""]);
                                    if(map_countries_stringifyed.indexOf(list_buffer) == -1){   //If the country is in the map_countries list with value "" this will return its index, not -1
                                        if(selected_countries.length == 0){
                                            d3.selectAll(".Country")
                                                .style("opacity", .6)
                                        }
                                        d3.select(this)
                                            .style("opacity", 1)
                                            .style("stroke", "white")
                                    }
                                    d3.select(this).append("text")
                                                    .text(d.properties.name)
                                    //Used to display the countries name
                                    tooltip.style("hidden", false).html(d.properties.name + "<br>" + Math.round(sum_for_labels) + "&nbsp;Gg")
                                
                                }
    let mouse_move = function(d){
                                    //Retrive the Sum for the country to display on the map
                                    var sum_for_labels;
                                    for(i in database_data){
                                        if(database_data[i].Country == d.properties.name){
                                            sum_for_labels = database_data[i].Sum;
                                        }
                                    }
                                    for(i in map_countries){
                                        if(map_countries[i][0] == d.properties.name){
                                            if(map_countries[i][1] != ""){
                                                for(j in database_data){
                                                    if(database_data[j].Country == map_countries[i][1]){
                                                        sum_for_labels = database_data[j].Sum;
                                                    }
                                                }
                                            }else{
                                                sum_for_labels = "No Data";
                                            }
                                        }
                                    }
                                    //Move the div with the country name with the mouse on the map
                                    tooltip.classed("hidden", false)
                                            .style("top", (d3.event.pageY) + "px")
                                            .style("left", (d3.event.pageX + 15) + "px")
                                            .html(d.properties.name + "<br>" + Math.round(sum_for_labels) + "&nbsp;Gg");
                                }
    let mouse_leave = function(d){
                                    //Check if hte country is one between the ones with database data not empty
                                    var list_buffer = JSON.stringify([d.properties.name, ""]);
                                    if(map_countries_stringifyed.indexOf(list_buffer) == -1){   //If the country is in the map_countries list with value "" this will return its index, not -1
                                        if(selected_countries.length == 0){
                                            d3.selectAll(".Country")
                                                .style("opacity", .8)
                                        }
                                        if(!selected_countries.includes(d.properties.name)){
                                            if(selected_countries.length != 0){
                                                d3.select(this)
                                                    .style("opacity", .6)
                                                    .style("stroke", "transparent")
                                            }else{
                                                d3.select(this)
                                                    .style("stroke", "transparent")
                                            }
                                        }
                                    }
                                    //Hide the label of the country name
                                    tooltip.classed("hidden", true);
                                }
    let mouse_click = function(d){
                                    //Check if hte country is one between the ones with database data not empty
                                    var list_buffer = JSON.stringify([d.properties.name, ""]);
                                    if(map_countries_stringifyed.indexOf(list_buffer) == -1){   //If the country is in the map_countries list with value "" this will return its index, not -1
                                        if(!selected_countries.includes(d.properties.name)){
                                            selected_countries.push(d.properties.name);
                                        }else{  //If the country was already selected, deselect that country
                                            selected_countries.splice(selected_countries.indexOf(d.properties.name), 1);
                                            d3.select(this)
                                                .style("opacity", .6)
                                                .style("stroke", "transparent")
                                            if(selected_countries.length==0){           //If no more selected countries bring all the other countries to the start map state (no selected countries)
                                                d3.selectAll(".Country")
                                                    .style("opacity", .8)
                                            }
                                        }
                                    }
                                    console.log(selected_countries);
                                }

    //Addition of the legend
    var w = 400, h = 100;
    var superscript = "⁰¹²³⁴⁵⁶",
        formatPower = function(d) { return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };

    var threshold = d3.scaleThreshold()
                        .domain([1, 2, 3, 4])       //Used just to solor the legend
                        .range(d3.schemeReds[4]);
        
    var x = d3.scaleLinear()                        //Used to set the distance between the different colors
                .domain([0, 4])
                .range([0, 180]);                   //Increae or decrease the length of the colors block

    var y = d3.scaleLog()                           //Used to se the numbers in a logaritmic way
                        .domain([1e6, 1e0])
                        .range([260, 0]);           //Increae or decrease the spage between the legend's numbers


    var xAxis = d3.axisBottom(y)
                    .tickSize(10)
                    .tickValues([1000, 10000, 100000, 1000000])
                    .tickFormat(function(d) { 
                                                //console.log(Math.log(d) / Math.LN10);
                                                return 10 + formatPower(Math.round(Math.log(d) / Math.LN10)); })

    //var g = d3.select("g").call(xAxis);
    var key = d3.select("#world_map")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("class", "map_legend")
                .attr("transform", "translate(-80,170)")        //Move all the legend, bar plus numbers
                .call(xAxis)

    key.select(".domain")
        .remove();

    key.selectAll("rect")
        .data(threshold.range().map(function(color) {
                                                        var d = threshold.invertExtent(color);
                                                        if (d[0] == null) d[0] = x.domain()[0];
                                                        if (d[1] == null) d[1] = x.domain()[1];
                                                        return d;
                                                    }))
        .enter().insert("rect", ".tick")
                .attr("height", 10)
                .attr("x", function(d) { 
                                        console.log(x(d[0]));
                                        return x(d[0]); })
                .attr("width", function(d) { 
                                            console.log(x(d[1]) - x(d[0]));
                                            return x(d[1]) - x(d[0]); })
                .attr("fill", function(d) { 
                                            return threshold(d[0]); })
                .attr("transform", "translate(90,30)")          //Move the legend's bar

    key.append("text")
        .attr("fill", "#FFF")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .attr("transform", "translate(70,60)")                   //Move the legend's text
        .text("Total Air Pollulant Emissions in Gg");


};

function data_elaboration_to_display(start_data){
    var output_data = [];
    for(i in start_data){
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
    
    return output_data;
}