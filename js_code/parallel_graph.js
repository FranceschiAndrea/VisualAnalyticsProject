var selected_countries_onAllAxis=[]
var selected_countries_onAllAxis_by_scatterplot=[]


function parallel_loader(data_table){

var color_scale = d3.scaleThreshold().domain([1000, 10000, 100000, 1000000]).range(d3.schemeReds[4]);
data=data_elaboration_to_display_parallel(data_table)

var total_population_forCountry=[]
var total_deaths_forCountry=[]
var total_ozone_forCountry=[]
var total_acid_forCountry=[]
var total_pm25_forCountry=[]
var total_pm10_forCountry=[]


for(i=0;i<data.length;i++){
  total_population_forCountry.push(data[i]['Total Population'])
  total_deaths_forCountry.push(data[i]['Total Deaths'])
  total_ozone_forCountry.push(data[i]['Ozone Prec.Gases'])
  total_acid_forCountry.push(data[i]['Acid. Gases'])
  total_pm25_forCountry.push(data[i]['PM 2.5'])
  total_pm10_forCountry.push(data[i]['PM 10'])
}

var min_population=Math.min.apply(Math, total_population_forCountry);
var max_population=Math.max.apply(Math, total_population_forCountry);

var min_totalDeaths=Math.min.apply(Math, total_deaths_forCountry);
var max_totalDeaths=Math.max.apply(Math, total_deaths_forCountry);

var min_ozone=Math.min.apply(Math, total_ozone_forCountry);
var max_ozone=Math.max.apply(Math, total_ozone_forCountry);

var min_acid=Math.min.apply(Math, total_acid_forCountry);
var max_acid=Math.max.apply(Math, total_acid_forCountry);

var min_pm25=Math.min.apply(Math, total_pm25_forCountry);
var max_pm25=Math.max.apply(Math, total_pm25_forCountry);

var min_pm10=Math.min.apply(Math, total_pm10_forCountry);
var max_pm10=Math.max.apply(Math, total_pm10_forCountry);


//console.log(min_population,max_population,min_totalDeaths,max_totalDeaths,min_ozone,max_ozone,min_acid,max_acid,min_pm25,max_pm25,min_pm10,max_pm10)





  var margin = {top: 40, right:5, bottom: 20, left: 5},
  width = d3.select("#parallel_graph").style('width').slice(0, -2)-margin.left-margin.right,
  height = d3.select("#parallel_graph").style('height').slice(0, -2)-margin.bottom-margin.top
 

var container = d3.selectAll("#parallel_graph")
    
var svg = container.append("svg")
    .attr("class","svg_parallel")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("g")
    .attr("transform", "translate(" + (margin.left+30) + "," + margin.top + ")");


var background;
var foreground;
var country_selection;
var type_selection;
var y = {};
var names = [];



function path(d) {
  points = [];
  for (i in dimensions) {
    n = dimensions[i];
    r = dimensions[i];
    if (r == "time") {
      date = conv(d[r]);
      points.push([x(n), y[r](date)]);
    }
    else {
      points.push([x(n), y[r](d[r])]);
    }

  }
  return d3.line()(points);
}


dimensions = ["World Region","Total Population","Total Deaths","Ozone Prec.Gases","Acid. Gases","PM 2.5","PM 10"]


for (i in dimensions) {
  j = dimensions[i];
  names.push(dimensions[i]);
  if (j == "World Region") {
    countries = [];
    data.forEach(element => {
      if (!countries.includes(element[j])) {
        countries.push(element[j])
      }
    });
    countries.sort();
    countries.unshift("  ")
    countries.push(" ")
    y[j] = d3.scalePoint()
      .domain(countries)
      .range([0, height]);
      //console.log("----")
    //console.log(countries)

  }else if (j == "Total Population") {
    y[j] = d3.scaleLinear().domain([min_population,max_population]).range([height, 0]).nice();
  }
  else if (j == "Total Deaths"){
    y[j] = d3.scaleLinear().domain([min_totalDeaths, max_totalDeaths]).range([height, 0]).nice();
    
  }else if (j == "Ozone Prec.Gases"){
    y[j] = d3.scaleLinear().domain([min_ozone, max_ozone]).range([height, 0]).nice();
    
  }else if (j == "Acid. Gases") {
    y[j] = d3.scaleLinear().domain([min_acid, max_acid]).range([height, 0]).nice();
    
  }else if (j == "PM 2.5") {
    y[j] = d3.scaleLinear().domain([min_pm25, max_pm25]).range([height, 0]).nice();
  
  }else if (j == "PM 10") {
    y[j] = d3.scaleLinear().domain([min_pm10, max_pm10]).range([height, 0]).nice();
  }


  x = d3.scalePoint()
    .range([0, width])
    .padding(1)
    .domain(names);
}

  
  extents = dimensions.map(function (p) { return [0, 0]; });
  background = svg.append("g")
    .attr("class", "background")
    .selectAll("path")
    .data(data)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "path_background")
    .style("stroke", "#6b5e5e");
    //.style("stroke", "grey");
  foreground = svg.append("g")
    .attr("class", "foreground")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", path)
    .attr('class', 'path_foreground')
    .style("stroke", function(d){
      return color_scale(d.Sum)
    });


  //svg.selectAll('.path_highlighted').raise();

var gP = svg.selectAll("axis")
    .data(dimensions)
    .enter().append("g")
    .attr("class", "axis_parallel")
    .attr("transform", function (d) { return "translate(" + x(d) + ")"; })

  gP.append("g")
    .attr("class", "axis")
    .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
    .append("text")
    .attr("class","text_parallel_axis")
    .style("text-anchor", "middle")
    .attr("y", -14)
    .text(function (d) { return d; })
    
    
    
    gP.append("g")
    .attr("class", "brushParallel")
    .each(function (d) {
      d3.select(this).call(y[d].brush = d3.brushY().extent([[-8, 0], [8, height]]).
        on("start", brushstart).
        on("brush", brushParallel)).
        on("click", cancelSelection)
    })
    .selectAll("rect")
    .attr("x", -8)
    .attr("width", 16);
    
    //manager.filteringByParallel = parallelFiltering;
      




function scalePointInverseC(pos) {
  var xPos = pos;
  var domainC = y["World Region"].domain();
  var rangeC = y["World Region"].range();
  var rangePointsC = d3.range(rangeC[0], rangeC[1], y["World Region"].step());
  var inverseC = domainC[d3.bisect(rangePointsC, xPos)];
  return inverseC;
}


function parallelFiltering(d) {
  var rangeC = y["World Region"].range();
  
  var rangePointsC = d3.range(rangeC[0], rangeC[1], y["World Region"].step());
  value = dimensions.every(function (p, i) {
    if (extents[i][0] == 0 && extents[i][1] == 0) {
      return true;
    }
    if (p == "World Region") {
      if (country_selection == undefined) return true;
      dValue = rangePointsC[countries.indexOf(d[p])];

      return dValue >= country_selection[0] && dValue <= country_selection[1];
    }
    else {
      return extents[i][1] <= d[p] && d[p] <= extents[i][0];
    }

  });
  return value;
}



function brushstart() {
  d3.event.sourceEvent.stopPropagation();
}

var flag_onClick=false;

function cancelSelection() {
  key = this.__data__;
  
  children = this.childNodes;
  hide = false;
  for (i = 0; i < children.length; i++) {
    if (children[i].__data__.type == 'selection' && children[i].y.animVal.value == 0) hide = true;
  }
  if (!hide) return;

  flag_onClick=true

  for (i in dimensions) {
    if (key == dimensions[i]) {
      extents[i] = [0, 0];
      brushParallel()
    }
  }

  //console.log("stampo data")
  //console.log(data,selected_countries_onAllAxis)
  //console.log(flag_onClick)
  if(selected_countries_onAllAxis.length==data.length){
    for(i=0;i<selected_countries_onAllAxis.length;i++){
      deselect_from_parallel(selected_countries_onAllAxis[i])
    }
    d3.selectAll(".path_foreground").filter(function(d){
                                                          if(selected_countries_onAllAxis_by_scatterplot.includes(d['Country'])){
                                                            d3.select(this).style("stroke", "#eb04f7")
                                                          }else{
                                                            d3.select(this).style("stroke", color_scale(d.Sum))
                                                          }
                                                        })
  }
  selected_countries_onAllAxis=[]
}



function brushParallel() {
  
  for (i in dimensions) {
    if (d3.event.target == y[dimensions[i]].brush) {
      if (dimensions[i] == "World Region") {
        country_selection = d3.event.selection;
        
        extents[i] = d3.event.selection.map(scalePointInverseC, y[dimensions[i]]);
        //console.log(extents[i])
      }
      else {
        extents[i] = d3.event.selection.map(y[dimensions[i]].invert, y[dimensions[i]]);
      }
    }
  }
  

  selected_countries_onAllAxis=[]

  //manager.notifyParallelBrushing();
  foreground.style("display", function (d) {
      value = parallelFiltering(d);
      if (value) {
        selected_countries_onAllAxis.push(d['Country'])
        select_from_parallel(d['Country'])
        d3.select(this).style("stroke", function(d){
                                                      //Se non vengo dal click
                                                      if(!flag_onClick){
                                                        if(selected_countries_onAllAxis_by_scatterplot.includes(d['Country'])){
                                                          //return "#eb04f7"
                                                          return "white"
                                                        }else{
                                                          return "#16bc21"
                                                        }
                                                      }//Se vengo dal click
                                                      else if(selected_countries_onAllAxis_by_scatterplot.includes(d['Country'])){
                                                        return "white"
                                                      }else{
                                                        //return color_scale(d.Sum)
                                                        return "#16bc21"
                                                      }          
                                                               
        })
        return null;
      }
      
        /*
        if(selected_countries_onAllAxis.includes(d['Country'])){
          selected_countries_onAllAxis.splice(selected_countries_onAllAxis.indexOf(d['Country']),1)
        }*/
      
      deselect_from_parallel(d['Country'])
      //d3.select(this).style("stroke", color_scale(d.Sum))
      return "none";
  });

  if(!flag_onClick){
    foreground.filter(function(d){
      if(selected_countries_onAllAxis_by_scatterplot.includes(d['Country']) && !selected_countries_onAllAxis.includes(d.Country) ){
        return true
      }else{
        return false
      }
    }).style("stroke", "#eb04f7").style("display", null)
  }
  
  flag_onClick=false

  //console.log("stampo dopo la brush")
  //console.log(selected_countries_onAllAxis)


}



    
}//---closing


function change_parallel_overpopulated(data_current_year, overpopulated_countries){
  d3.select("#parallel_graph").select('svg').remove()
  parallel_loader(data_current_year)
  for(i=0;i<overpopulated_countries.length;i++){
    if(selected_countries_onAllAxis.includes(overpopulated_countries[i])){
      selected_countries_onAllAxis.splice(selected_countries_onAllAxis.indexOf(overpopulated_countries[i]),1)
    }
    if(selected_countries_onAllAxis_by_scatterplot.includes(overpopulated_countries[i])){
      selected_countries_onAllAxis_by_scatterplot.splice(selected_countries_onAllAxis_by_scatterplot.indexOf(overpopulated_countries[i]),1)
    }
  }
  d3.selectAll(".path_foreground").filter(function(d){
    var color_scale = d3.scaleThreshold().domain([1000, 10000, 100000, 1000000]).range(d3.schemeReds[4]);
    if((selected_countries_onAllAxis_by_scatterplot.includes(d.Country) && selected_countries_pca_scatterplot_by_parallel.includes(d.Country)) || 
              selected_countries_bar_chart_dth.includes(d.Country) || 
              (selected_countries_world_map.includes(d.Country) && selected_countries_pca_scatterplot.includes(d.Country) && selected_countries_onAllAxis.includes(d['Country']))){
      d3.select(this).style("display",null).style("stroke", "white")
    }else if(selected_countries_onAllAxis_by_scatterplot.includes(d['Country']) && !selected_countries_pca_scatterplot_by_parallel.includes(d.Country) /*|| (selected_countries_onAllAxis_by_scatterplot.includes(d['Country']) && !selected_countries_onAllAxis.includes(d.Country))*/){
      d3.select(this).style("display",null).style("stroke", "#eb04f7")
    }else if(selected_countries_onAllAxis.includes(d['Country'])){
      d3.select(this).style("display",null).style("stroke", "#16bc21")
    }else if(selected_countries_onAllAxis.length==0){
      d3.select(this).style("display",null).style("stroke", color_scale(d.Sum))
    }else{
      d3.select(this).style("display","none")
    }
  })
}

function change_parallel_with_year(data_new_year){
  var color_scale = d3.scaleThreshold().domain([1000, 10000, 100000, 1000000]).range(d3.schemeReds[4]);
  d3.select("#parallel_graph").select('svg').remove()
  parallel_loader(data_new_year)
  //if(selected_countries_onAllAxis.length!=0){
    d3.selectAll(".path_foreground").filter(function(d){
      if((selected_countries_onAllAxis_by_scatterplot.includes(d.Country) && selected_countries_pca_scatterplot_by_parallel.includes(d.Country)) || selected_countries_bar_chart_dth.includes(d.Country) || (selected_countries_world_map.includes(d.Country) && selected_countries_pca_scatterplot.includes(d.Country) && selected_countries_onAllAxis.includes(d['Country']))){
        d3.select(this).style("display",null).style("stroke", "white")
      }else if(selected_countries_onAllAxis_by_scatterplot.includes(d.Country) && !selected_countries_pca_scatterplot_by_parallel.includes(d.Country) /*|| (selected_countries_onAllAxis_by_scatterplot.includes(d['Country']) && !selected_countries_onAllAxis.includes(d.Country))*/ ){
        d3.select(this).style("display",null).style("stroke", "#eb04f7")
      }else if(selected_countries_onAllAxis.includes(d['Country'])){
        d3.select(this).style("display",null).style("stroke", "#16bc21")
      }else if(selected_countries_onAllAxis.length==0){
        d3.select(this).style("display",null).style("stroke", color_scale(d.Sum))
      }else{
        d3.select(this).style("display","none")
      }
    })
//}
  //console.log(selected_countries_onAllAxis_by_scatterplot, selected_countries_pca_scatterplot_by_parallel)
}


function select_from_parallel(country){

  if(!selected_countries_onAllAxis_by_scatterplot.includes(country)){
    select_country_on_map(country, "parallel")
  }else{
    select_country_on_map_triple(country)
  }

  select_for_parallel_to_scatterplot(country)
}


function deselect_from_parallel(country){

  deselect_country_on_bar_chart_dth(country)
  deselect_for_parallel_to_scatterplot(country)

  if(!selected_countries_onAllAxis_by_scatterplot.includes(country)){
    deselect_country_on_map(country)
    deselect_country_on_scatterplot(country)
  }else{
    deselect_country_on_map_triple(country)
  }

}


function select_on_parallel(country){
  d3.selectAll(".path_foreground").filter(function(d){
    if(d['Country']==country){
      selected_countries_onAllAxis.push(country)
      d3.select(this).style("display",null).style("stroke", function(d){
                                                                          if(selected_countries_onAllAxis.includes(d.Country)){
                                                                            return "white"
                                                                          }else{
                                                                            return "#eb04f7"
                                                                          }
                                                                        })
    }else{
      if(!selected_countries_onAllAxis.includes(d['Country']) && !selected_countries_onAllAxis_by_scatterplot.includes(d['Country'])){
        d3.select(this).style("display","none")
      }
    }
  })
}


function deselect_on_parallel(country){
  var color_scale = d3.scaleThreshold().domain([1000, 10000, 100000, 1000000]).range(d3.schemeReds[4]);
  if(selected_countries_onAllAxis.includes(country)){
    selected_countries_onAllAxis.splice(selected_countries_onAllAxis.indexOf(country),1)
    d3.selectAll(".path_foreground").filter(function(d){
      if(d['Country']==country){
        //console.log(country)
        d3.select(this).style("display","none")
      } 
    })
    //console.log("sono in deselect")
    //console.log(selected_countries_onAllAxis)

    if(selected_countries_onAllAxis.length==0){
      //console.log("lunghezza 0")
      d3.selectAll(".path_foreground").filter(function(d){d3.select(this).style("stroke", color_scale(d.Sum));return true}).style("display",null)
    }
  }
}

function deselect_all_on_parallel(){
  selected_countries_onAllAxis=[]
  selected_countries_onAllAxis_by_scatterplot=[]
  d3.selectAll(".path_foreground").filter(function(d){return true}).style("display",null)
}


function select_on_parallel_from_pca(country){
  var color_scale = d3.scaleThreshold().domain([1000, 10000, 100000, 1000000]).range(d3.schemeReds[4]);
  //Se qiello che seleziono non è gia stato selezionato lo seleziono
  if(!selected_countries_onAllAxis_by_scatterplot.includes(country)){
      
      d3.selectAll(".path_foreground").filter(function(f) {
          if(f.Country == country){
            selected_countries_onAllAxis_by_scatterplot.push(country)
              //Se gia selezionato nel parallel diventa verde e anche se non ho niente selezionato nel paralle (tutti preselezionati) diventa verde
              /*if(selected_countries_onAllAxis.includes(country) || selected_countries_onAllAxis.length==0){
                return true
              }*/
              return true
          }
      }).style("stroke", function(d){
                                      if(selected_countries_onAllAxis.includes(d.Country)){
                                        return "white"
                                      }else{
                                        d3.select(this).style("display", null)
                                        return "#eb04f7"
                                      }
                                    })
  }

}

function deselect_on_parallel_from_pca(country){
  var color_scale = d3.scaleThreshold().domain([1000, 10000, 100000, 1000000]).range(d3.schemeReds[4]);
  //Se la country è tra quelle gia selezionate la devo deselezionare
  if(selected_countries_onAllAxis_by_scatterplot.includes(country)){
    //La elimino dall'array 
    selected_countries_onAllAxis_by_scatterplot.splice(selected_countries_onAllAxis_by_scatterplot.indexOf(country), 1)
  
    d3.selectAll(".path_foreground").filter(function(f) {
          if(f.Country == country){
              //Se deselezionato dallo scatter ma è selezionato nel paralle
              if(selected_countries_onAllAxis.includes(country)){
                  d3.select(this).style("stroke", "#16bc21")
              }
              //Se deselezionato dallo scatter e non è selezionato nel paralle
              else{
                //Se non ho selezionato nulla è come se fossero tutti selezionati nel parralle quindi devo rimettere solo il colore rosso
                if(selected_countries_onAllAxis.length==0){
                  d3.select(this).style("stroke", color_scale(f.Sum))
                }
                //Se ho selezioanto qualcosa nella parallel, oltre a mettere il colore originale lo devo nascondeere percè se sono arrivato qui non è tra quelli selezionati nella parallel
                else{
                  d3.select(this).style("stroke", color_scale(f.Sum)).style("display", "none")
                }
              }
          }
      })

  }
  //console.log("deselect_parallel", selected_countries_onAllAxis_by_scatterplot)

}
//-------------------------------------------------PRE-PROCESSING
function data_elaboration_to_display_parallel(start_data){
  var output_data = [];
  for(i=0; i<start_data.length; i++){
      //sum of all the emissions
      var OzonePrecGases = start_data[i]['CO'] +
                  start_data[i]['CH4'] +
                  start_data[i]['NMVOC'] +
                  start_data[i]['NOx'] +
                  start_data[i]['SO2']

      var AcidGases =start_data[i]['NH3']+
                     start_data[i]['NOx']+
                     start_data[i]['SO2'];
      
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
                              "World Region" : start_data[i]['World Region'],
                              "Country": start_data[i]['Country'],
                              "Total Population": start_data[i]['Total Population'],
                              "Total Deaths": start_data[i]['Total Deaths'],
                              "Ozone Prec.Gases": OzonePrecGases,
                              "Acid. Gases": AcidGases,
                              "PM 2.5": start_data[i]['PM 2.5'],
                              "PM 10":start_data[i]['PM 10'],
                              "Sum" : total
                          }
                      )
  }
  return output_data
}
