
const d3 = require('d3');
const csvFile = require('./Burke_Gilman_Bicycle_and_Pedestrian_Counter.csv');
d3.csv(csvFile).then(function(data) {
    console.log(data);
});