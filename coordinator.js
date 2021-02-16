var full_data = [];

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
    .await(function(error, table2000, table2001, table2002, table2003, table2004, table2005, table2006, table2007, table2008, table2009, table2010, table2011, table2012, table2013, table2014, table2015) {
        if (error) {
            console.error('Something bad with the csv loading: ' + error);
        }
        else {
            full_data = [table2000, table2001, table2002, table2003, table2004, table2005, table2006, table2007, table2008, table2009, table2010, table2011, table2012, table2013, table2014, table2015];
            for(j in full_data){
                full_data[j] = parseTable(full_data[j]);
            }
            
            world_map_loader(full_data[0]);
        }
    });


function parseTable(t){
    table = t;
    for(i in table){
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
    }
    return table;
}