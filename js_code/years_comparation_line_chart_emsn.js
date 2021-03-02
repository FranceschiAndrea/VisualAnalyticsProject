var value_to_display_emsn = 'Total Emissions Sum'

var initial_data_emsn;

var allGroupEmsn = ['Total Emissions Sum', 'CO', 'CH4', 'NH3', 'NMVOC', 'NOx', 'SO2','PM 2.5', 'PM 10']


// add the options to the button
d3.select("#selectButtonEmsn")
    .selectAll('myOptions')
        .data(allGroupEmsn)
    .enter()
        .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button
    



function line_cahrt_emsn_loader(data){


    var database_data = data_elaboration_line_chart_emsn(data);


    var min_data_value = database_data[0].values[0][value_to_display_emsn];
    var max_data_value = database_data[0].values[0][value_to_display_emsn];
    //console.log(database_data)

    //Calculate the max and the min value in the dataset to choose the colors thresholds
    for(i=0; i<database_data.length; i++){
        for(j=0; j<database_data[i].values.length; j++){
            if(database_data[i].values[j][value_to_display_emsn] > max_data_value){
                max_data_value = database_data[i].values[j][value_to_display_emsn];
            }
            if(database_data[i].values[j][value_to_display_emsn] < min_data_value){
                min_data_value = database_data[i].values[j][value_to_display_emsn];
            }
        }
    }    
    //console.log("Min and Max values to represent in the line chart of dth:",min_data_value, "|" , max_data_value)


    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 50, bottom: 30, left: 60},
        width = d3.select("#line_chart_pm_container").style('width').slice(0, -2) - margin.left - margin.right,
        height = d3.select("#line_chart_pm_container").style('height').slice(0, -2) - margin.top - margin.bottom - 20;

    // append the svg object to the body of the page
    var svg = d3.select("#line_chart_pm_container")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform","translate(" + margin.left + "," + margin.top + ")");


    // List of groups (here I have one group per column)
    /*var allGroup = Object.keys(database_data[0].values[0])
        allGroup.splice(0, 1)
        allGroup.splice(0, 1)
        //console.log(allGroup)

    console.log(allGroup)*/

    

    // A color scale: one color for each group
    /*var myColor = d3.scaleOrdinal()
                        .domain(allGroup)
                        .range(d3.schemeSet2);*/

    // Add X axis --> it is a date format
    /*var x = d3.scaleLinear()
    .domain(["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"])
    .range([ 0, width ]);*/
    var x = d3.scaleBand()
                    .domain(["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"])
                    .range([0, width])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
                .domain( [min_data_value, max_data_value])
                .range([ height, 0 ]).nice();
    svg.append("g")
        .call(d3.axisLeft(y));

    // Initialize line with group a
    svg.selectAll(".line")
        .data(database_data)
        .enter()
        .append("path")
            .attr("id", "path_countries")
            .attr("fill", "none")
            .attr("stroke", "#a81e1e")
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
                                    return d3.line()
                                                    .x(function(d) { return x(d.Year)+((x("2003")-x("2002"))/2); })                                                    
                                                    .y(function(d) { return y(+d[value_to_display_emsn]); })
                                                    (d.values)
                                    })
        

    // A function that update the chart
    /*function update(selectedGroup) {

    // Create new data with the selection?
    var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

    // Give these new data to update line
    line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.value) })
        )
        .attr("stroke", function(d){ return myColor(selectedGroup) })
    }*/

    // When the button is changed, run the updateChart function
    /*d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })*/


}


d3.select("#selectButtonEmsn").on("change", function(d) {
                                                        // recover the option that has been chosen
                                                        value_to_display_emsn = d3.select(this).property("value")
                                                        // run the updateChart function with this selected option
                                                        upload_line_chart_emsn()
                                                    })


function data_elaboration_line_chart_emsn(start_data){

    var output_data = [];

    for(i=0; i<start_data[0].length; i++){
        output_data.push({
                                'key' : start_data[0][i].Country,
                                'values' : []
                            })
    }
    
    for(k=0; k<start_data.length; k++){

        var year;

        if(k<10){
            year = "200"+k
        }else{
            year = "20"+k
        }

        /*var buffer_all_nations = []*/
        

        for(i=0; i<start_data[k].length; i++){

            var total_emissions_sum = start_data[k][i]['CO'] +
                                        start_data[k][i]['CH4'] + 
                                        start_data[k][i]['NH3'] +
                                        start_data[k][i]['NMVOC'] +
                                        start_data[k][i]['NOx'] +
                                        start_data[k][i]['SO2'] +
                                        start_data[k][i]['PM 10'] +
                                        start_data[k][i]['PM 2.5']


            output_data[i].values.push(
                                    {
                                        'Country' : start_data[k][i]['Country'],
                                        'Year' : year,
                                        'CO' : start_data[k][i]['CO'],
                                        'CH4': start_data[k][i]['CH4'],
                                        'NH3' : start_data[k][i]['NH3'] ,
                                        'NMVOC' : start_data[k][i]['NMVOC'],
                                        'NOx' : start_data[k][i]['NOx'],
                                        'SO2' : start_data[k][i]['SO2'],
                                        'PM 10' : start_data[k][i]['PM 10'],
                                        'PM 2.5': start_data[k][i]['PM 2.5'],
                                        'Total Emissions Sum': total_emissions_sum
                                    }
                                )

        }

    }

    //console.log(array_of_the_sum_over_the_years)

    //console.log(Object.keys(output_data[0]))
    //console.log(output_data)
    return output_data

}


//Function to change the chart with the map selection
function upload_line_chart_emsn(){

    var new_data = filter_data_from_map_selection_emsn()

    d3.select("#line_chart_pm_container").select('svg').remove()

    line_cahrt_emsn_loader(new_data)

    d3.selectAll('#line_chart_pm_container')
        .selectAll('#path_countries')
        .filter(function(d){
                                if(selected_countries_world_map.includes(d.key)){
                                    d3.select(this).attr("stroke", function(){
                                                                                for(i=0; i<colors_for_countries_association.length; i++){
                                                                                    if(colors_for_countries_association[i]==d.key){
                                                                                        return colors_for_countries[i]
                                                                                    }
                                                                                }
                                                                                    }).attr("stroke-width", 2.5)
                                }else{
                                    d3.select(this).attr("stroke", "#a81e1e")
                                }                        
                            })


}



//Filter the data to display in the line charts
function filter_data_from_map_selection_emsn(){

    var output_data = []

    if(selected_countries_world_map-length!=0){
        for(k=0; k<initial_data_emsn.length; k++){

            output_data.push([])

            for(i=0; i<initial_data_emsn[k].length; i++){

                    if(selected_countries_world_map.includes(initial_data_emsn[k][i].Country)){
                        output_data[k].push(initial_data_emsn[k][i])
                        
                    }

            }
        }
    }else{
        output_data = initial_data_emsn
    }

    return output_data

}

var big_ones = ['China', 'India', 'USA']
/*function filter_data_from_map_selection(){

    var output_data = []

        for(k=0; k<initial_data.length; k++){

            output_data.push([])

            for(i=0; i<initial_data[k].length; i++){
                
                if(!big_ones.includes(initial_data[k][i].Country)){
                    output_data[k].push(initial_data[k][i])
                }

            }
        }
    

    return output_data

}*/
