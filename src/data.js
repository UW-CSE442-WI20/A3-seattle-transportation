// Code for extracting and averaging data based on 
// N/S and cyclist/pedestrian data
const csvFile = require('./CSV/Burke_Gilman_Bicycle_and_Pedestrian_Counter.csv');
d3.csv(csvFile).then(function(data) {
    for (i = 0; i < data.length; i++) {
        // extract the time of day from the date
        time = data[i].Date.split(" ", 2)[1];
        data[i].time_of_day = time
    }

    // avg_data is formatted like this: [{time_of_day: "0:00", 
    //    ped_north_avg: 2.061206120612061, 
    //    ped_south_avg: 14.298829882988299, 
    //    bike_north_avg: 0.5306030603060305, 
    //    bike_south_avg: 0.3177317731773177
    //   }, ...]
    var avg_data = d3.nest()
    .key(function(d) { return d.time_of_day; })
    .rollup(function(v) { return { ped_north_avg: d3.mean(v, function (d) { return d['Ped North']; }), 
                                   ped_south_avg: d3.mean(v, function (d) { return d['Ped South']; }),
                                   bike_north_avg: d3.mean(v, function (d) { return d['Bike North']; }),
                                   bike_south_avg: d3.mean(v, function (d) { return d['Bike South']; })
                                }; 
                        })
    .entries(data)
    .map(function(group) {
        return {
          time_of_day: group.key,
          ped_north_avg: group.value.ped_north_avg,
          ped_south_avg: group.value.ped_south_avg,
          bike_north_avg: group.value.bike_north_avg,
          bike_south_avg: group.value.bike_south_avg
        }
      });
    console.log(avg_data[0]);
});
