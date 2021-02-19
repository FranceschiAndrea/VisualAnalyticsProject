var selected_countries_pca_scatterplot=[]

function scatterplot_pca_loader(data){

    var database_data = data_elaboration_to_display_scutterplot_pca(data);
    console.log(database_data)

    //calcuate the min and the max for each exes to set their values
    var min_x = database_data[0].Y1, 
        max_x = database_data[0].Y1, 
        min_y = database_data[0].Y2, 
        max_y = database_data[0].Y2
    for(i in database_data){
        if(database_data[i].Y1 > max_x){
            max_x = database_data[i].Y1;
        }
        if(database_data[i].Y1 < min_x){
            min_x = database_data[i].Y1;
        }
        if(database_data[i].Y2 > max_y){
            max_y = database_data[i].Y2;
        }
        if(database_data[i].Y2 < min_y){
            min_y = database_data[i].Y2;
        }
    }
    console.log("min_x= "+min_x+", "+"max_x= "+max_x+", "+"min_y= "+min_y+", "+"max_y= "+max_y)

    //set the dimensions and margins of the graph
    var margin = {top: 60, right: 30, bottom: 20, left: 80},
        width = (d3.select("#scatterplot_pca").style('width').slice(0, -2)) - margin.left - margin.right,
        height = (d3.select("#scatterplot_pca").style('height').slice(0, -2)) - margin.top - margin.bottom

    //create the zoom object that call the function at the end
    var zoom = d3.zoom()
                    .scaleExtent([.5, Infinity])
                    .extent([[0, 0], [width, height]])
                    .on("zoom", zoomed);

    //append the svg object to the body of the page
    var SVG = d3.select("#scatterplot_pca")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom+30)
                .append("g")
                .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")")

    //add the x axes
    var x = d3.scaleLinear()
                .domain([Math.round(min_x)-1, Math.ceil(max_x)+1])
                .range([ 0, width ]);
    var xax = d3.axisBottom(x)
    var gx = SVG.append("g")
                    .attr("class", "scatterplot_pca_axes")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xax)

    //add the y axes
    var y = d3.scaleLinear()
            .domain([Math.round(min_y)-1, Math.ceil(max_y)+1])
            .range([ height, 0])
    var yax = d3.axisLeft(y).tickPadding(5) 
    var gy = SVG.append("g")
                .attr("class", "scatterplot_pca_axes")
                .call(yax)
    
    //add the text for of the axes
    SVG.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left+20)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("PCA Component 2");                    
    SVG.append("text")
        .attr("y", height+margin.bottom+25)
        .attr("x",(width)/2)       
        .style("text-anchor", "middle")
        .text("PCA Component 1");

    
    //functions that controll the mouse input in zoom modality
    let mouse_over = function(d){
                                    d3.select(this)
                                        //.attr("opacity", 1)
                                        .attr("stroke", "red",)
                                        .attr("stroke-width", "2px")
                                    
                                }
    let mouse_leave = function(d){
                                    if(!selected_countries_pca_scatterplot.includes(d.Country)){
                                        d3.select(this)
                                            //.classed("selected", false)
                                            //.attr("opacity", 0.5)
                                            .attr("stroke", "black",)
                                            .attr("stroke-width", "0.1px")
                                    }
                                }
    let mouse_click = function(d){
                                    if(!selected_countries_pca_scatterplot.includes(d.Country)){
                                        d3.select(this)
                                            //.attr("opacity", 1)
                                            .attr("stroke", "red",)
                                            .attr("stroke-width", "2px")
                                        selected_countries_pca_scatterplot.push(d.Country)
                                        scatterplot_selection_interaction(d.Country)
                                        console.log(selected_countries_pca_scatterplot)
                                    }else{
                                        selected_countries_pca_scatterplot.splice(selected_countries_pca_scatterplot.indexOf(d.Country), 1)
                                        scatterplot_deselection_interaction(d.Country)
                                        d3.select(this)
                                            //.attr("opacity", 0.5)
                                            .attr("stroke", "black",)
                                            .attr("stroke-width", "0.1px")
                                        console.log(selected_countries_pca_scatterplot)
                                    }
                                }

    // Color scale: give me a specie name, I return a color
    /*var color = d3.scaleOrdinal()
                    .domain(["Uzbekistan", "Namibia", "Iran" ])
                    .range([ "#440154ff", "#21908dff", "#fde725ff"])*/
    
    //color scale used to color the various points
    var color_scale = d3.scaleThreshold()
                        .domain([0.03, 0.05, 0.1, 0.15])
                        .range(d3.schemeYlGn[4]);

    //add a clip path where everything out of this area won't be drawn to not see the points overlap the axes
    var clip = SVG.append('defs')
                    .append('SVG:clipPath')
                    .attr('id', 'clip')
                    .append('SVG:rect')
                    .attr('width', width)
                    .attr('height', height)
                    .attr('x', 0)
                    .attr('y', 0);

    //create the scatter variable where both the circles and the brush take place
    var scatter = SVG.append('g').attr('clip-path', 'url(#clip)');

    //add dots and append to the the mouse event functions
    var myCircle = scatter.append('g').selectAll("circle")
                                        .data(database_data)
                                        .enter()
                                        .append("circle")
                                        .attr("cx", function (d) { return x(d.Y1); } )
                                        .attr("cy", function (d) { return y(d.Y2); } )
                                        .attr("r", 6.5)
                                        .style("fill", function (d) { return color_scale(d['Death Percentage']) } )
                                        //.style("opacity", 0.7)
                                        .attr("stroke", "black",)
                                        .attr("stroke-width", "0.1px")
                                        .on("mouseover", mouse_over )                    
                                        .on("mouseleave", mouse_leave )
                                        .on("click", mouse_click)
    
    //create the brush feature
    var brush =  d3.brush()
                    //initialise the brush areawith start at 0,0 and finishes at width,height so that is possible select the whole graph area
                    .extent( [ [0,0], [width,height] ] ) 
                    //each time the brush selection changes trigger the 'update_chart' function
                    .on("start brush", update_chart) 

    //function that is triggered when brushing is performed that select the points in the brush area
    function update_chart() {
                            extent = d3.event.selection
                                myCircle.selectAll(function(d){
                                    if(isBrushed(extent, x(d.Y1), y(d.Y2) )){
                                        d3.select(this)
                                            //.classed("selected", true)
                                            //.attr("opacity", 1)
                                            .attr("stroke", "red",)
                                            .attr("stroke-width", "2px")

                                        if(!selected_countries_pca_scatterplot.includes(d.Country)){
                                            selected_countries_pca_scatterplot.push(d.Country)
                                            scatterplot_selection_interaction(d.Country)
                                            console.log(selected_countries_pca_scatterplot)
                                        }
                                    }else{
                                        d3.select(this)
                                            //.classed("selected", false)
                                            //.attr("opacity", 0.5)
                                            .attr("stroke", "black")
                                            .attr("stroke-width", "0.1px")
                                            if(selected_countries_pca_scatterplot.includes(d.Country)){
                                                selected_countries_pca_scatterplot.splice(selected_countries_pca_scatterplot.indexOf(d.Country), 1)
                                                scatterplot_deselection_interaction(d.Country)
                                            }
                                            
                                    }
                                })
                            }

    //function that return TRUE or FALSE according if a dot is in the brush area or not
    function isBrushed(brush_coords, cx, cy) {

        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1]

        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1 
    }

    //zoom function that reload the axes and update the graph
    function zoomed() {
                    // create new scale ojects based on event
                        var new_xScale = d3.event.transform.rescaleX(x);
                        var new_yScale = d3.event.transform.rescaleY(y);
                    // update axes
                        gx.call(xax.scale(new_xScale));
                        gy.call(d3.axisLeft(y).scale(new_yScale));
                        myCircle.data(database_data)
                                .attr('cx', function(d) {return new_xScale(d.Y1)})
                                .attr('cy', function(d) {return new_yScale(d.Y2)});
                    }
    
    //functions to controll the switch between the zoom and the brush
    function enableZoom() {
                            svg = d3.select("#scatterplot_pca").select('svg');
                            svg.call(zoom);
                            }
    function disableZoom() {
                            svg = d3.select("#scatterplot_pca").select('svg');
                            svg.on('.zoom', null);
                            }
    function enableBrush() {
                            disableZoom();
                            
                            SVG.append('g')
                                .attr('class', 'brush')
                                .call(brush);
    }
    function disableBrush() {
                            SVG.selectAll('g.brush').remove();
                            
                            enableZoom();
    }
    function reset_zoom() {
                            newX = x.domain([Math.round(min_x)-1, Math.ceil(max_x)+1]);
                            newY = y.domain([Math.round(min_y)-1, Math.ceil(max_y)+1]);
                        
                            var svg = d3.select("#scatterplot_pca").select('svg');
                            svg.transition()
                                .duration(750)
                                .call(zoom.transform, d3.zoomIdentity);
                        }
    enableBrush()
    d3.selectAll(("input[name='scatterplot_pca_button']")).on("change", function(){
                                                                                        console.log(this.value)
                                                                                        if(this.value == "Zoom"){
                                                                                            disableBrush()
                                                                                        }else{
                                                                                            reset_zoom()
                                                                                            enableBrush()
                                                                                        }
                                                                                    })



    /*SVG.selectAll("rect")
        .data(threshold.range().map(function(color) {
                                                    var d = threshold.invertExtent(color);
                                                    if (d[0] == null) d[0] = x.domain()[0];
                                                    if (d[1] == null) d[1] = x.domain()[1];
                                                    return d;}))
        .enter().insert("rect", ".tick")
                .attr("height", 20)
                .attr("x", function(d) { 
                                        return 20 })
                .attr("y", function(d) { 
                                        return (d[0]*25) })
                .attr("width", function(d) { 
                                            return 20 })
                .attr("fill", function(d) { 
                                            if(d[0] == 0) return threshold(3);
                                            else if (d[0] == 1) return threshold(2);
                                            else if (d[0] == 2) return threshold(1);
                                            else if (d[0] == 3) return threshold(0);})
                .style("opacity", .8)*/

    var threshold = d3.scaleThreshold()
                        .domain([1, 2, 3, 4])
                        .range(d3.schemeYlGn[5]);

    var legend_labels = ["< 0,03","< 0,05","< 0,1","< 0,15"]

    //Insert the rectangle with the color of no data countries
    for(i=0; i<4; i++){
        
        SVG.append('rect')
            .attr('x', width-125)
            .attr('y', ((i*25)))
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', threshold(i))
            .attr("stroke", "black")
            .attr("stroke-width", "0.1px")
            //.attr("opacity", 0.5)

        SVG.append("text")
            .attr('x', width-100)
            .attr('y', (i*25)+15)
            .attr("fill", "black")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text(legend_labels[i])

    }



    //Movetheleend to fit in the resized page
    /*SVG.selectAll("rect")
    .attr("transform", "translate(0,"+ ((height/2)+(width/13)) +")")
    SVG.selectAll("text")
    .attr("transform", "translate(0,"+ ((height/2)+(width/13)) +")")*/

}

//function that elaborate the datas comes from the coordinator
function data_elaboration_to_display_scutterplot_pca(start_data){
    var output_data = [];
    for(i=0; i<start_data.length; i++){
        var total = (start_data[i]['Air Cancer'] + 
                     start_data[i]['Chronic Respiratory Diseases'] +
                     start_data[i]['Pneumoconiosis']+
                     start_data[i]['Asthma']+
                     start_data[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis']+
                     start_data[i]['Other Chronic Respiratory Diseases']) /
                     start_data[i]['Total Deaths']
        output_data.push(
                            {
                                "Country" : start_data[i]['Country'],
                                "Y1" : start_data[i]['PCA first component'],
                                "Y2" : start_data[i]['PCA second component'],
                                "Death Percentage" : total
                            }
                        )
    }
    return output_data;
}

//================================================================= BETWEEN GRAPHS INTERACTION =========================================================
//Function to change the years
function change_scatterplot_with_year(data){
    d3.select("#scatterplot_pca").select('svg').remove()
    scatterplot_pca_loader(data)
}

//Function called by other graphs to select points on the scatterplot 
function select_country_on_scatterplot(country){

    if(!selected_countries_pca_scatterplot.includes(country)){
        selected_countries_pca_scatterplot.push(country)
        
    }

    d3.select("#scatterplot_pca").selectAll("circle").filter(function(f) {
        if(f.Country == country){
            console.log(f)
            return true
        }else{
            return false
        }
    })
    .attr("stroke", "red",)
    .attr("stroke-width", "2px")
    
}

//Function called by other graphs to deselect points on the scatterplot 
function deselect_country_on_scatterplot(country){

    if(selected_countries_pca_scatterplot.includes(country)){
        selected_countries_pca_scatterplot.splice(selected_countries_pca_scatterplot.indexOf(country), 1)
    }

    d3.select("#scatterplot_pca").selectAll("circle").filter(function(f) {
        if(f.Country == country){
            console.log(f)
            return true
        }else{
            return false
        }
    })
    .attr("stroke", "black",)
    .attr("stroke-width", "0.1px")

}


//Function that trigger the selection from the scatterplot to the other graphs 
function scatterplot_selection_interaction(country){
    select_country_on_map(country)
}

//Function that trigger the deselection from the scatterplot to the other graphs 
function scatterplot_deselection_interaction(country){
    deselect_country_on_map(country)
}