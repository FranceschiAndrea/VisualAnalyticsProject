var flag = true;

function changeColor(){

    if(flag){
        var red = d3.selectAll(".red");
        console.log(red);
        red.attr("class", "green");
        flag = false;
    }else{
        var green = d3.selectAll(".green");
        console.log(red);
        green.attr("class", "red");
        flag = true;
    }


    var blue=d3.select("#blue");
    blue.attr("fill","yellow");
}

setInterval(() => {
    changeColor();
}, 1000);