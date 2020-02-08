(function() {

	const csvFile = require("./CSV/Avg-Burke-Data.csv");
	const ped = require("./SVG/ped.svg");
	// Make sure the window has loaded before we start trying to 
	// modify the DOM.
	window.addEventListener("load", init);

	 function init() {
		setupSlider(); 
		id("range-slider").addEventListener("change", changeTime);
		id("cyclists").addEventListener("click", displayCyclistStats);
		id("pedestrians").addEventListener("click", displayPedestrianStats);
		id("both").addEventListener("click", displayBothStats);
	}

	function setupSlider() {
		let slider = id("range-slider");
		let output = id("time");
		output.innerHTML = "12:00 PM";
		
		slider.oninput = function() {
			let time = "";
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
		// Clear out all the old ped/bike
		id("insert-here").innerHTML = "";
		let time = this.value;
		d3.csv(csvFile).then(function(data) {
			d3.select("#p-north").text(data[time].ped_north_avg);
			createIcons(data[time].ped_north_avg);
			d3.select("#p-south").text(data[time].ped_south_avg);
			d3.select("#c-north").text(data[time].bike_north_avg);
			d3.select("#c-south").text(data[time].bike_south_avg);
		});		
	}

	function createIcons(numIcons) {
		// Create the first one before the interval so that the user isn't
		// staring at a blank page
		d3.xml(ped)
			.then(data => {
			  	d3.select("#insert-here")
			    	.node()
			    	.append(data.documentElement);
			    startTransition(0);
			})
		
		let x = 0;
		// Keep making icons until we've reached the necessary amount,
		// staggering by 5 seconds
		setInterval(function() {
			if (x < numIcons - 1) {
		        d3.xml(ped)
					.then(data => {
		  				d3.select("#insert-here")
		    				.node()
		    				.append(data.documentElement)
		    			startTransition(x);
				  	})
			} else {
				return;
			}
		    x++;
		}, 2000);
	}

	function startTransition(num) {
		d3.selectAll("#insert-here svg")
			.filter(function(d, i) {
			    return i >= num;
			 })
			.transition()
			.attr("transform", "translate(1180,0)")
			.duration(5000)
			.ease(d3.easeLinear); 
	}

	function id(idName) {
 		return document.getElementById(idName);
	}

	function displayCyclistStats() {
		id("cyclist-stats").style.visibility = "visible";
		id("ped-stats").style.visibility = "hidden";
	}

	function displayPedestrianStats() {
		id("cyclist-stats").style.visibility = "hidden";
		id("ped-stats").style.visibility = "visible";
	}

	function displayBothStats() {
		id("cyclist-stats").style.visibility = "visible";
		id("ped-stats").style.visibility = "visible";
	}
})();
