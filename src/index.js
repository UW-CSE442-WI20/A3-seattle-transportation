(function() {

	const csvFile = require("./CSV/Avg-Burke-Data.csv");
	// Make sure the window has loaded before we start trying to 
	// modify the DOM.
	window.addEventListener("load", init);

	 function init() {
		setupSlider(); 
		id("rangeSlider").addEventListener("change", changeTime);
		id("Cyclists").addEventListener("click", displayCyclistStats);
		id("pedestrians").addEventListener("click", displayPedestrianStats);
		id("both").addEventListener("click", displayBothStats);
	}

	function setupSlider() {
		var slider = document.getElementById("rangeSlider");
		var output = document.getElementById("time");
		output.innerHTML = "12:00 PM";
		
		slider.oninput = function() {
			var time = "";
			if (this.value == 0) {
				time = "12:00 AM";
			} else if (this.value < 12) {
				time = this.value + ":00 AM"
			} else if (this.value == 12) {
				time = "12:00 PM";
			} else { // if (this.value > 12)
				time = (this.value - 12) + ":00 PM";
			}
			output.innerHTML = time;
		}
	}

	function changeTime() {
		let time = this.value;
		d3.csv(csvFile).then(function(data) {
			d3.select("#p-north").text(data[time].ped_north_avg);
			d3.select("#p-south").text(data[time].ped_south_avg);
			d3.select("#c-north").text(data[time].bike_north_avg);
			d3.select("#c-south").text(data[time].bike_south_avg);
		});
	}

	function id(idName) {
 		return document.getElementById(idName);
	}

	function displayCyclistStats() {
		id("cyclistStats").style.visibility = "visible";
		id("pedStats").style.visibility = "hidden";
	}

	function displayPedestrianStats() {
		id("cyclistStats").style.visibility = "hidden";
		id("pedStats").style.visibility = "visible";
	}

	function displayBothStats() {
		id("cyclistStats").style.visibility = "visible";
		id("pedStats").style.visibility = "visible";
	}
})();
