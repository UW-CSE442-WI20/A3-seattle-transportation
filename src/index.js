
const d3 = require('d3');
const csvFile = require('./Burke_Gilman_Bicycle_and_Pedestrian_Counter.csv');
d3.csv(csvFile).then(function(data) {
    for (i = 0; i < data.length; i++) {
        // extract the time of day from the date
        time = data[i].Date.split(" ", 2)[1];
        data[i].time_of_day = time
    }

    // puts data into format [{key: "0:00", value 0.5}, {key : "1:00", value: 3.4, ...} ]
    var ped_north_data = d3.nest()
    .key(function(d) { return d.time_of_day; })
    .rollup(function(v) { return d3.mean(v, function (d) { return d['Ped North']; }); })
    .entries(data);
    var ped_south_data = d3.nest()
    .key(function(d) { return d.time_of_day; })
    .rollup(function(v) { return d3.mean(v, function (d) { return d['Ped South']; }); })
    .entries(data);
    var bike_north_data = d3.nest()
    .key(function(d) { return d.time_of_day; })
    .rollup(function(v) { return d3.mean(v, function (d) { return d['Bike North']; }); })
    .entries(data);
    var bike_south_data = d3.nest()
    .key(function(d) { return d.time_of_day; })
    .rollup(function(v) { return d3.mean(v, function (d) { return d['Bike South']; }); })
    .entries(data);

// debugging logging may be useful in the future
//    console.log("ped north:")
//    console.log(ped_north_data);
//    console.log("ped south");
//    console.log(ped_south_data);
//    console.log("bike north");
//    console.log(bike_north_data);
//    console.log("bike south");
//    console.log(bike_south_data);
});