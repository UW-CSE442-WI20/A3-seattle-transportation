(function() {
	// Make sure the window has loaded before we start trying to 
	// modify the DOM.
	window.addEventListener("load", init);

	 function init() {
	 	setupSlider();
	 	id("myRange").addEventListener("change", changeTime);
	}

	function setupSlider() {
		var slider = document.getElementById("myRange");
		var output = document.getElementById("demo");
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
		d3.csv('./CSV/Avg-Burke-Data.csv').then(function(data) {
			d3.select("#p-north").text(data[time].ped_north_avg);
			d3.select("#p-south").text(data[time].ped_south_avg);
			d3.select("#c-north").text(data[time].bike_north_avg);
			d3.select("#c-south").text(data[time].bike_south_avg);
		});
	}

	function id(idName) {
 		return document.getElementById(idName);
	}
})();
