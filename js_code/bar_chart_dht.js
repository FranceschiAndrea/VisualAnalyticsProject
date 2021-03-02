var selected_countries_bar_chart_dth = [];
var mouse_over_flag = false



function bar_chart_dht_loader(data, pop_range){

    var max_total_causes_value = 0

    var database_data = data_elaboration_to_display_bar_chart_dth(data, pop_range);

    for(i=0; i<database_data.length; i++){
        if(database_data[i]['Total_Death_All_Cause'] > max_total_causes_value){
            max_total_causes_value = database_data[i]['Total_Death_All_Cause']
        }
    }

    database_data.sort((a, b) => b['Total_Death_All_Cause'] - a['Total_Death_All_Cause']);

    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 30, bottom: 65, left: 60},
        width = d3.select("#bar_chart_dth").style('width').slice(0, -2) - margin.left - margin.right,
        height = d3.select("#bar_chart_dth").style('height').slice(0, -2) - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#bar_chart_dth")
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform",
                            "translate(" + margin.left + "," + margin.top + ")");


    // List of subgroups = header of the csv files = soil condition here
    var subgroups = ["Air_Cancer","Chronic_Respiratory_Diseases","Pneumoconiosis","Asthma","Interstitial_Lung_Disease_and_Pulmonary_Sarcoidosis","Other_Chronic_Respiratory_Diseases"]


    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(database_data, function(d){return(d.Name_Abbreviation)}).keys()

    // Add X axis
    var x = d3.scaleBand()
                .domain(groups)
                .range([0, width])
                .padding([0.2])
    svg.append("g")
            .attr("class", "bar_chart_dth_axes")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0))
            //Rotate the labels of the x axes in the main graph
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.9em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)")

    
    /*focus.select('.axis--x')
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");*/

    // Add Y axis
    var y = d3.scaleLinear()
                .domain([0, max_total_causes_value])
                .range([ height, 0 ])
                .nice()
    svg.append("g")
            .attr("class", "bar_chart_dth_axes")
            .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    /*var color_array = ["Air_Cancer", "a", "Chronic_Respiratory_Diseases", "b", "Pneumoconiosis", "c", "Asthma", "d", "Interstitial_Lung_Disease_and_Pulmonary_Sarcoidosis", "e", "Other_Chronic_Respiratory_Diseases", "f"]
    var color = d3.scaleOrdinal()
                    .domain(color_array)
                    .range(d3.schemePaired);*/

    var color_array = ["Air_Cancer", "Chronic_Respiratory_Diseases", "Pneumoconiosis", "Asthma", "Interstitial_Lung_Disease_and_Pulmonary_Sarcoidosis", "Other_Chronic_Respiratory_Diseases"]
    var color = d3.scaleOrdinal()
                    .domain(color_array)
                    .range(d3.schemeSet3);

    //console.log(subgroups)

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
                            .keys(subgroups)
                            (database_data)

        // ----------------
    // Highlight a specific subgroup when hovered
    // ----------------

    // What happens when user hover a bar
    var mouseover = function(d) {
                                mouse_over_flag=true
                                    if(selected_countries_bar_chart_dth.length==0){
                                        // what subgroup are we hovering?
                                        var subgroupName = d3.select(this.parentNode).datum().key; // This was the tricky part
                                        //console.log(subgroupName)
                                        var subgroupValue = d.data[subgroupName];
                                        //console.log(subgroupValue)
                                        // Reduce opacity of all rect to 0.2
                                        d3.selectAll(".myRect").selectAll("rect").attr("opacity", 0.45)
                                        // Highlight all rects of this subgroup with opacity 0.8. It is possible to select them since they have a specific class = their name.
                                        d3.selectAll("."+subgroupName).selectAll("rect")
                                            .attr("opacity", 1)
                                    }

                                    //Interactive legend
                                    svg.selectAll(".temporary_text").remove()
                                    for(i=0; i<6; i++){
                                        if(i==0){
                                            svg.append("text")
                                                .attr("class", "temporary_text")
                                                .attr('x', width-240)
                                                .attr('y', -25)
                                                .attr("fill", "black")
                                                .attr("font-weight", "bold")
                                                .attr("text-anchor", "start")
                                                .text(function(){
                                                                    if(d.data.Country.length>13){
                                                                        return d.data.Name_Abbreviation
                                                                    }else{
                                                                        return d.data.Country
                                                                    }                
                                                                })
                                                
                                            svg.append("text")
                                                .attr("class", "temporary_text")
                                                .attr('x', width-329.5)
                                                .attr('y', 6*25)
                                                .attr("fill", "black")
                                                .attr("font-weight", "bold")
                                                .attr("text-anchor", "start")
                                                .text("Population: \u00A0\u00A0 "+d.data.Total_Population)
                                        }
                            
                                        svg.append("text")
                                            .attr("class", "temporary_text")
                                            .attr('x', width-230)
                                            .attr('y', (i*25))
                                            .attr("fill", "black")
                                            .attr("font-weight", "bold")
                                            .attr("text-anchor", "start")
                                            .text(d.data[subgroups[i]])
                                    }
                                }

    // When user do not hover anymore
    var mouseleave = function(d) {
                                    mouse_over_flag = false
                                    if(selected_countries_bar_chart_dth.length==0){
                                        // Back to normal opacity: 0.8
                                        d3.selectAll(".myRect").selectAll("rect")
                                            .attr("opacity",0.8)
                                    }
                                    //Interactive legend
                                    svg.selectAll(".temporary_text").remove()
                                    for(i=0; i<6; i++){
                                        if(i==0){
                                            svg.append("text")
                                                .attr("class", "temporary_text")
                                                .attr('x', width-240)
                                                .attr('y', -25)
                                                .attr("fill", "black")
                                                .attr("font-weight", "bold")
                                                .attr("text-anchor", "start")
                                                .text("Country")
                                            
                                            svg.append("text")
                                                .attr("class", "temporary_text")
                                                .attr('x', width-329.5)
                                                .attr('y', 6*25)
                                                .attr("fill", "black")
                                                .attr("font-weight", "bold")
                                                .attr("text-anchor", "start")
                                                .text("Population: \u00A0\u00A0 N°")
                                        }
                            
                                        svg.append("text")
                                            .attr("class", "temporary_text")
                                            .attr('x', width-230)
                                            .attr('y', (i*25))
                                            .attr("fill", "black")
                                            .attr("font-weight", "bold")
                                            .attr("text-anchor", "start")
                                            .text("N°")
                                    }
                                }

    var mouseclick = function(d) {
                                    if(!selected_countries_bar_chart_dth.includes(d.data.Country)){

                                        bar_chart_dth_selection_interaction(d.data.Country, data)

                                        selected_countries_bar_chart_dth.push(d.data.Country)
                                        
                                        d3.selectAll(".myRect")
                                            .selectAll("rect")
                                            .filter(function(d){
                                                if(selected_countries_bar_chart_dth.includes(d.data.Country)){
                                                    return false
                                                }else{
                                                    return true
                                                }
                                            })
                                            .attr("opacity", 0.45)

                                        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                            .attr("opacity",1)
                                        

                                    }else{
                                        selected_countries_bar_chart_dth.splice(selected_countries_bar_chart_dth.indexOf(d.data.Country), 1);
                                        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                            .attr("opacity",0.45)

                                        if(selected_countries_bar_chart_dth.length==0){
                                            var subgroupName = d3.select(this.parentNode).datum().key;
                                            d3.selectAll(".myRect").selectAll("rect").attr("opacity", 0.45)
                                            d3.selectAll("."+subgroupName).selectAll("rect")
                                                .attr("opacity", 1)
                                        }
                                        
                                        bar_chart_dth_deselection_interaction(d.data.Country)
                                    }  
                                    
    }

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { 
                                    //console.log(d.key)
                                    return color(d.key); 
                                    })
        .attr("class", function(d){return "myRect " + d.key }) // Add a class to each subgroup: their name
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
                    .attr("x", function(d) { 
                                                //console.log(d.data.Name_Abbreviation)
                                                return x(d.data.Name_Abbreviation); 
                                            })
                    .attr("y", function(d) { 
                                            //console.log(d[1])
                                            return y(d[1]); 
                                            })
                    .attr("height", function(d) { 
                                                    //console.log(d)
                                                    return y(d[0]) - y(d[1]); 
                                                })
                    .attr("width",x.bandwidth())
                    .attr("stroke", "grey")
                    .attr("opacity", function(d){
                                                    if(selected_countries_bar_chart_dth.length==0 || selected_countries_bar_chart_dth.includes(d.data.Country)){
                                                        return 1
                                                    }else{
                                                        return 0.45
                                                    }
                                                 })
                    .attr("id", function(d){
                                            return "bar_chart_dth_"+d.data.Country.split(' ').join('_')
                                        })
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
        .on("click", mouseclick).filter(function(d){ bar_display_with_interactions(d) })

        /*d3.selectAll(("button[id='bar_chart_dth_button_1']")).on("click", function(){
            console.log("Premuto",this.value)
            d3.select("#bar_chart_dth").select('svg').remove()
            bar_chart_dht_loader(data, parseInt(this.value))
            
        })
        d3.selectAll(("button[id='bar_chart_dth_button_2']")).on("click", function(){
            console.log("Premuto",this.value)
            d3.select("#bar_chart_dth").select('svg').remove()
            bar_chart_dht_loader(data, parseInt(this.value))
            
        })
        d3.selectAll(("button[id='bar_chart_dth_button_3']")).on("click", function(){
            console.log("Premuto",this.value)
            d3.select("#bar_chart_dth").select('svg').remove()
            bar_chart_dht_loader(data, parseInt(this.value))
            
        })
        d3.selectAll(("button[id='bar_chart_dth_button_4']")).on("click", function(){
            console.log("Premuto",this.value)
            d3.select("#bar_chart_dth").select('svg').remove()
            bar_chart_dht_loader(data, parseInt(this.value))
            
        })
        d3.selectAll(("button[id='bar_chart_dth_button_5']")).on("click", function(){
            console.log("Premuto",this.value)
            d3.select("#bar_chart_dth").select('svg').remove()
            bar_chart_dht_loader(data, parseInt(this.value))
            
        })*/

        d3.select("#bar_chart_dth_dropdown").on("change", function(d) {
            if(selected_countries_bar_chart_dth.length!=0){
                for(i=0; i<selected_countries_bar_chart_dth.length; i++){
                    bar_chart_dth_deselection_interaction(selected_countries_bar_chart_dth[i])
                }
                selected_countries_bar_chart_dth = []
            }
            bar_graph_people_range = parseInt(this.value)
            d3.select("#bar_chart_dth").select('svg').remove()
            bar_chart_dht_loader(data, parseInt(this.value))
        })

        //Legend 
        //var subgroups_legend_names = ["Air Cancer","Chronic Obstructive Pulmonary Deseases","Pneumoconiosis","Asthma","Interstitial Lung Disease / Pulmonary Sarcoidosis","Other Chronic Respiratory Diseases"]
        var subgroups_legend_names = ["T.B.L Cancer","C.O.P.D.","Pneumoconiosis","Asthma","I.L.D. / P.S.","Other C.R.D."]

        for(i=0; i<6; i++){
        
            svg.append('rect')
                .attr('x', width-130)
                .attr('y', ((i*25)-15))
                .attr('width', 20)
                .attr('height', 20)
                .attr('fill', color(subgroups[i]))
                .attr("stroke", "black")
                .attr("stroke-width", "0.1px")
                //.attr("opacity", 0.5)
    
            if(i==0){
                svg.append("text")
                    .attr('x', width-132)
                    .attr('y', -25)
                    .attr("fill", "black")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "start")
                    .text("Death for:")
            }

            svg.append("text")
                .attr('x', width-105)
                .attr('y', (i*25))
                .attr("fill", "black")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text(subgroups_legend_names[i])
            
            if(i==0){
                svg.append("text")
                    .attr("class", "temporary_text")
                    .attr('x', width-240)
                    .attr('y', -25)
                    .attr("fill", "black")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "start")
                    .text("Country")

                svg.append("text")
                    .attr("class", "temporary_text")
                    .attr('x', width-329.5)
                    .attr('y', 6*25)
                    .attr("fill", "black")
                    .attr("font-weight", "bold")
                    .attr("text-anchor", "start")
                    .text("Population: \u00A0\u00A0 N°")
            }

            svg.append("text")
                .attr("class", "temporary_text")
                .attr('x', width-230)
                .attr('y', (i*25))
                .attr("fill", "black")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("N°")
    
        }
        
}


function data_elaboration_to_display_bar_chart_dth(start_data, pop_range){
    var output_data = [];

    for(i=0; i<start_data.length; i++){

        total_death_pollution_causes =  start_data[i]['Air Cancer'] + 
                                        start_data[i]['Chronic Respiratory Diseases'] +
                                        start_data[i]['Pneumoconiosis'] +
                                        start_data[i]['Asthma'] +
                                        start_data[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis'] +
                                        start_data[i]['Other Chronic Respiratory Diseases']

        //start_data[i]['Total Population']>=40000000                                                33 countries england and united kingdom
        //start_data[i]['Total Population']<40000000 && start_data[i]['Total Population']>=15000000  34 countries
        //start_data[i]['Total Population']<15000000 && start_data[i]['Total Population']>=7000000   35 countries
        //start_data[i]['Total Population']<7000000 && start_data[i]['Total Population']>=2500000    36 countries
        //start_data[i]['Total Population']<2500000                                                  30 countries

        if(start_data[i]['Total Population']>=40000000 && pop_range==1){ //&& start_data[i]['Country']!="China" && start_data[i]['Country']!="India" && start_data[i]['Country']!="USA"){
            var name_abbreviation = ""
            for(j=0; j<world_map_file.features.length; j++){
                if(start_data[i]['Country'] == world_map_file.features[j].properties.name){
                    name_abbreviation = world_map_file.features[j].id
                }
            }
            output_data.push(
                                {
                                    "Country" : start_data[i]['Country'],
                                    "Air_Cancer" : start_data[i]['Air Cancer'],
                                    "Chronic_Respiratory_Diseases" : start_data[i]['Chronic Respiratory Diseases'],
                                    "Pneumoconiosis" : start_data[i]['Pneumoconiosis'],
                                    "Asthma" : start_data[i]['Asthma'],
                                    "Interstitial_Lung_Disease_and_Pulmonary_Sarcoidosis" : start_data[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis'],
                                    "Other_Chronic_Respiratory_Diseases" : start_data[i]['Other Chronic Respiratory Diseases'],
                                    "Total_Death_All_Cause": total_death_pollution_causes,
                                    "Name_Abbreviation" : name_abbreviation,
                                    "Total_Population" : start_data[i]['Total Population']
                                }
            )
        }else if(start_data[i]['Total Population']<40000000 && start_data[i]['Total Population']>=15000000 && pop_range==2){ 
            var name_abbreviation = ""
            for(j=0; j<world_map_file.features.length; j++){
                if(start_data[i]['Country'] == world_map_file.features[j].properties.name){
                    name_abbreviation = world_map_file.features[j].id
                }
            }
            output_data.push(
                                {
                                    "Country" : start_data[i]['Country'],
                                    "Air_Cancer" : start_data[i]['Air Cancer'],
                                    "Chronic_Respiratory_Diseases" : start_data[i]['Chronic Respiratory Diseases'],
                                    "Pneumoconiosis" : start_data[i]['Pneumoconiosis'],
                                    "Asthma" : start_data[i]['Asthma'],
                                    "Interstitial_Lung_Disease_and_Pulmonary_Sarcoidosis" : start_data[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis'],
                                    "Other_Chronic_Respiratory_Diseases" : start_data[i]['Other Chronic Respiratory Diseases'],
                                    "Total_Death_All_Cause": total_death_pollution_causes,
                                    "Name_Abbreviation" : name_abbreviation,
                                    "Total_Population" : start_data[i]['Total Population']
                                }
            )
        }else if(start_data[i]['Total Population']<15000000 && start_data[i]['Total Population']>=6000000 && pop_range==3){ 
            var name_abbreviation = ""
            for(j=0; j<world_map_file.features.length; j++){
                if(start_data[i]['Country'] == world_map_file.features[j].properties.name){
                    name_abbreviation = world_map_file.features[j].id
                }
            }
            output_data.push(
                                {
                                    "Country" : start_data[i]['Country'],
                                    "Air_Cancer" : start_data[i]['Air Cancer'],
                                    "Chronic_Respiratory_Diseases" : start_data[i]['Chronic Respiratory Diseases'],
                                    "Pneumoconiosis" : start_data[i]['Pneumoconiosis'],
                                    "Asthma" : start_data[i]['Asthma'],
                                    "Interstitial_Lung_Disease_and_Pulmonary_Sarcoidosis" : start_data[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis'],
                                    "Other_Chronic_Respiratory_Diseases" : start_data[i]['Other Chronic Respiratory Diseases'],
                                    "Total_Death_All_Cause": total_death_pollution_causes,
                                    "Name_Abbreviation" : name_abbreviation,
                                    "Total_Population" : start_data[i]['Total Population']
                                }
            )
        }else if(start_data[i]['Total Population']<6000000 && start_data[i]['Total Population']>=2500000 && pop_range==4){ 
            var name_abbreviation = ""
            for(j=0; j<world_map_file.features.length; j++){
                if(start_data[i]['Country'] == world_map_file.features[j].properties.name){
                    name_abbreviation = world_map_file.features[j].id
                }
            }
            output_data.push(
                                {
                                    "Country" : start_data[i]['Country'],
                                    "Air_Cancer" : start_data[i]['Air Cancer'],
                                    "Chronic_Respiratory_Diseases" : start_data[i]['Chronic Respiratory Diseases'],
                                    "Pneumoconiosis" : start_data[i]['Pneumoconiosis'],
                                    "Asthma" : start_data[i]['Asthma'],
                                    "Interstitial_Lung_Disease_and_Pulmonary_Sarcoidosis" : start_data[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis'],
                                    "Other_Chronic_Respiratory_Diseases" : start_data[i]['Other Chronic Respiratory Diseases'],
                                    "Total_Death_All_Cause": total_death_pollution_causes,
                                    "Name_Abbreviation" : name_abbreviation,
                                    "Total_Population" : start_data[i]['Total Population']
                                }
            )
        }else if(start_data[i]['Total Population']<2500000 && pop_range==5){ 
            var name_abbreviation = ""
            for(j=0; j<world_map_file.features.length; j++){
                if(start_data[i]['Country'] == world_map_file.features[j].properties.name){
                    name_abbreviation = world_map_file.features[j].id
                }
            }
            output_data.push(
                                {
                                    "Country" : start_data[i]['Country'],
                                    "Air_Cancer" : start_data[i]['Air Cancer'],
                                    "Chronic_Respiratory_Diseases" : start_data[i]['Chronic Respiratory Diseases'],
                                    "Pneumoconiosis" : start_data[i]['Pneumoconiosis'],
                                    "Asthma" : start_data[i]['Asthma'],
                                    "Interstitial_Lung_Disease_and_Pulmonary_Sarcoidosis" : start_data[i]['Interstitial Lung Disease and Pulmonary Sarcoidosis'],
                                    "Other_Chronic_Respiratory_Diseases" : start_data[i]['Other Chronic Respiratory Diseases'],
                                    "Total_Death_All_Cause": total_death_pollution_causes,
                                    "Name_Abbreviation" : name_abbreviation,
                                    "Total_Population" : start_data[i]['Total Population']
                                }
            )
        }
    }
    return output_data
}

//================================================================= BETWEEN GRAPHS INTERACTION =========================================================

//Function to change the years
function change_bar_chart_dth_with_year(data, pop_range){
    d3.select("#bar_chart_dth").select('svg').remove()
    bar_chart_dht_loader(data, pop_range)
}

//Function to de/select the overpopulated countries
function change_bar_chart_dth_overpopulated(data, pop_range, countries_array){
    //console.log("BAR CHART OVERPOPULATED COUNTRYESARRRAY LENTH", countries_array)
    for(i=0; i<countries_array.length; i++){
        /*console.log(selected_countries_bar_chart_dth)
        console.log(countries_array)
        console.log(selected_countries_bar_chart_dth.includes(countries_array[0]))*/
        if(selected_countries_bar_chart_dth.includes(countries_array[i])){
            //console.log("BAR CHART FOR x OVERPOPULATED IF")
            selected_countries_bar_chart_dth.splice(selected_countries_bar_chart_dth.indexOf(countries_array[i]), 1);
        }
    }
    d3.select("#bar_chart_dth").select('svg').remove()
    bar_chart_dht_loader(data, pop_range)
}

//Function to deselect the countries from the other charts only if alredy selected in thebar chart
function deselect_country_on_bar_chart_dth(country){
    if(selected_countries_bar_chart_dth.includes(country)){
        selected_countries_bar_chart_dth.splice(selected_countries_bar_chart_dth.indexOf(country), 1);
        d3.selectAll(("#bar_chart_dth_"+country.split(' ').join('_'))).filter(function(f){/*console.log(f);*/ return true;})
            .attr("opacity",0.45)

        if(selected_countries_bar_chart_dth.length==0){
            d3.selectAll(".myRect").selectAll("rect").attr("opacity", 1)
        }
    }
}

//Function that trigger the selection from the bar chart to the other graphs 
function bar_chart_dth_selection_interaction(country, data){
    if(selected_countries_bar_chart_dth.length==0){
        deselect_all_countries_on_map()
        deselect_all_countries_on_scatterplot()
        deselect_all_on_parallel()
    }
    select_country_on_scatterplot(country)
    select_country_on_map(country)
    select_on_parallel(country)

    /*console.log("world map", selected_countries_world_map)
    console.log("world map triple", selected_countries_world_map_triple)
    console.log("scatterplot", selected_countries_pca_scatterplot)
    console.log("scatterplot from p", selected_countries_pca_scatterplot_by_parallel)
    console.log("parallel", selected_countries_onAllAxis)
    console.log("scatterplot from s", selected_countries_onAllAxis_by_scatterplot)
    console.log("------------------------------------")*/

    //Bug (so said CAFONATA) to refresh and make appear the green fill on scatterplot
    d3.select("#scatterplot_pca").select('svg').remove()
    scatterplot_pca_loader(data)
    d3.selectAll(("input[name='scatterplot_pca_button']")).filter( function(){
        //console.log(this.value)
        if(this.value == "BrushSelection"){
            d3.select(this).property("checked", true)
        }
    })
    /*select_for_parallel_to_scatterplot(country)
    select_on_parallel_from_pca(country)*/

    //d3.select("#scatterplot_pca").selectAll("Circle")
}

//Function that trigger the deselection from the bar chart to the other graphs 
function bar_chart_dth_deselection_interaction(country){
    deselect_country_on_scatterplot(country)
    deselect_country_on_map(country)
    deselect_on_parallel(country)

    /*console.log("world map", selected_countries_world_map)
    console.log("world map triple", selected_countries_world_map_triple)
    console.log("scatterplot", selected_countries_pca_scatterplot)
    console.log("scatterplot from p", selected_countries_pca_scatterplot_by_parallel)
    console.log("parallel", selected_countries_onAllAxis)
    console.log("scatterplot from s", selected_countries_onAllAxis_by_scatterplot)
    console.log("------------------------------------")*/
}

/******************************************************************************************************************************
/******************************************************************************************************************************
/*******************************************************************************************************************************/     

function start_bar_chart_loop(database_data){ 
    var triple_selection = false
    return setInterval(function(){ 
            
                        if(!mouse_over_flag){
                            d3.selectAll(".myRect")
                                        .selectAll("rect")
                                        .filter(function(d){ bar_display_with_interactions(d) })             
                        }

                    }, 0);
}
/******************************************************************************************************************************
/******************************************************************************************************************************
/*******************************************************************************************************************************/

function bar_display_with_interactions(d){
    if(selected_countries_pca_scatterplot_by_parallel.includes(d.data.Country) && selected_countries_onAllAxis_by_scatterplot.includes(d.data.Country)){
        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                                                            .attr("stroke", "grey")
                                                                            .attr("stroke-width", "1px")
                                                                            .style("stroke-dasharray", "none")
    }else if(selected_countries_pca_scatterplot_by_parallel.includes(d.data.Country)){
        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                                                            .attr("stroke", "#16bc21"/*"#16bc21"*/)
                                                                            .attr('stroke-width', 2.5   )
                                                                            .style("stroke-dasharray", function(f){
                                                                                                                        //console.log("PROVAAAAA")
                                                                                                                        return fillTheBarPerimeter(this)
                                                                                                                    
                                                                                                                    })
    }else if(selected_countries_onAllAxis_by_scatterplot.includes(d.data.Country)){
        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                                                            .attr("stroke", "#eb04f7")
                                                                            .attr('stroke-width', 2.5)
                                                                            .style("stroke-dasharray", function(f){
                                                                                                                        //console.log("PROVAAAAA")
                                                                                                                        return fillTheBarPerimeter(this)
                                                                                                                    
                                                                                                                    })
    }else{
        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                                                            .attr("stroke", "grey")
                                                                            .attr("stroke-width", "1px")
                                                                            .style("stroke-dasharray", "none")
    }

    if((selected_countries_pca_scatterplot_by_parallel.includes(d.data.Country) && selected_countries_onAllAxis_by_scatterplot.includes(d.data.Country)) || selected_countries_bar_chart_dth.includes(d.data.Country)){
        
        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                                                            .attr("opacity",1)
        //console.log(selected_countries_bar_chart_dth)
    }else if(selected_countries_bar_chart_dth.length != 0  || (selected_countries_pca_scatterplot_by_parallel.length != 0 && selected_countries_onAllAxis_by_scatterplot.length != 0 && (selected_countries_onAllAxis_by_scatterplot.filter(value => selected_countries_pca_scatterplot_by_parallel.includes(value))).length!=0)){
        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                                                            .attr("opacity",0.45)
    }else{
        d3.selectAll(("#bar_chart_dth_"+d.data.Country.split(' ').join('_')))
                                                                            .attr("opacity",1)
    }
}

function fillTheBarPerimeter(node_value){
    var height = node_value.getBoundingClientRect().height
    var width = node_value.getBoundingClientRect().width
    //console.log(this.getBoundingClientRect())
   //console.log(/*("0,"+width+","+height+","+width+","+height),*/ this.parentNode.attributes.class.nodeValue)
   if(node_value.parentNode.attributes.class.nodeValue == "myRect Air_Cancer"){
        return ("0,"+width+","+(height+width+height))
   }else if(node_value.parentNode.attributes.class.nodeValue == "myRect Other_Chronic_Respiratory_Diseases"){
        return ((width+height)+","+width+","+height)
   }else{
        return ("0,"+width+","+height+","+width+","+height)
   }
}
