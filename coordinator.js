var full_data = [];

/*
d3.csv("dataset/total_merge/2015.csv", d3.autoType).then(function(data){
    full_data.push(data);    
    world_map_loader(full_data[0]);
});*/


Promise.all([
    d3.csv("dataset/total_merge/2000.csv"),
    d3.csv("dataset/total_merge/2001.csv"),
    d3.csv("dataset/total_merge/2002.csv"),
    d3.csv("dataset/total_merge/2003.csv"),
    d3.csv("dataset/total_merge/2004.csv"),
    d3.csv("dataset/total_merge/2005.csv"),
    d3.csv("dataset/total_merge/2006.csv"),
    d3.csv("dataset/total_merge/2007.csv"),
    d3.csv("dataset/total_merge/2008.csv"),
    d3.csv("dataset/total_merge/2009.csv"),
    d3.csv("dataset/total_merge/2010.csv"),
    d3.csv("dataset/total_merge/2011.csv"),
    d3.csv("dataset/total_merge/2012.csv"),
    d3.csv("dataset/total_merge/2013.csv"),
    d3.csv("dataset/total_merge/2014.csv"),
    d3.csv("dataset/total_merge/2015.csv"),
]).then(function(files) {

    world_map_loader(files);

    //files[1]
}).catch(function(err) {
    // handle error here
})