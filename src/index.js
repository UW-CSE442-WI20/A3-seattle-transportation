(function() {

	const csvFile = require("./CSV/Avg-Burke-Data.csv");
	const ped = require("./SVG/ped.svg");
	const bike = require("./SVG/bike.svg");
	const pedReverse = require("./SVG/ped-reverse.svg");
	const bikeReverse = require("./SVG/bike-reverse.svg");
	// Keep track of the selected time so that if the user clicks to a new
	// time, we don't continue populating the icons from the old time
	// in createIcons!
	let currentTime = 0;

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
		//id("all-moving-icons").style.visibility = "visible";
		let containers = qsa(".icon-container")
		for (let i = 0; i < containers.length; i++) {
		    containers[i].innerHTML = "";
		}
		currentTime = this.value;
		d3.csv(csvFile).then(function(data) {
			d3.select("#p-north").text(data[currentTime].ped_north_avg);
			createIcons(data[currentTime].ped_north_avg, "#insert-ped-north-here", ped, currentTime, "translate(1000,0)", "translate(1020, 0)");
			d3.select("#b-north").text(data[currentTime].bike_north_avg);
			createIcons(data[currentTime].bike_north_avg, "#insert-bike-north-here", bike, currentTime, "translate(1000,0)", "translate(1020, 0)");
			
			d3.select("#p-south").text(data[currentTime].ped_south_avg);
			createIcons(data[currentTime].ped_south_avg, "#insert-ped-south-here", pedReverse, currentTime, "translate(-1000,0)", "translate(-1020, 0)");
			d3.select("#b-south").text(data[currentTime].bike_south_avg);
			createIcons(data[currentTime].bike_south_avg, "#insert-bike-south-here", bikeReverse, currentTime, "translate(-1000,0)", "translate(-1020, 0)");
		});		
	}

	function createIcons(numIcons, insertDiv, typeOfIcon, time, translation, endTranslation) {
		// Create the first one before the interval so that the user isn't
        // staring at a blank page
		d3.xml(typeOfIcon)
			.then(data => {
			  	d3.select(insertDiv)
			    	.node()
			    	.append(data.documentElement);
                startTransition(0, insertDiv, translation, endTranslation);
			})
		
        let x = 0;
        
		// Keep making icons until we've reached the necessary amount,
		// staggering by 5 seconds
		setInterval(function() {
			// If the user has changed the time on us, we should 
			// stop creating new icons.
			if (x < numIcons - 1 && currentTime == time) {
		        d3.xml(typeOfIcon)
					.then(data => {
                          d3.select(insertDiv)
		    				.node()
                            .append(data.documentElement)
                        startTransition(x, insertDiv, translation, endTranslation);
                      })
			} else {
				return;
			}
		    x++;
		}, 1000);
	}

	function startTransition(num, insertDiv, translation, endTranslation) {
        d3.selectAll(insertDiv + " svg")
			.filter(function(d, i) {
			    return i >= num;
			 })
            .transition()
			.attr("transform", translation)
			.duration(5000)
            .ease(d3.easeLinear)
            .on('end', function () { 
                d3.select(this).transition().attr("transform", endTranslation).ease(d3.easeLinear).style('opacity', 0).duration(200)
            });
	}

	function displayCyclistStats() {
		id("bike-stats").style.visibility = "visible";
		id("ped-stats").style.visibility = "hidden";
		id("insert-ped-north-here").style.visibility = "hidden";
		id("insert-bike-north-here").style.visibility = "visible";
		id("insert-ped-south-here").style.visibility = "hidden";
		id("insert-bike-south-here").style.visibility = "visible";
	}

	function displayPedestrianStats() {
		id("bike-stats").style.visibility = "hidden";
		id("ped-stats").style.visibility = "visible";
		id("insert-ped-north-here").style.visibility = "visible";
		id("insert-bike-north-here").style.visibility = "hidden";
		id("insert-ped-south-here").style.visibility = "visible";
		id("insert-bike-south-here").style.visibility = "hidden";
	}

	function displayBothStats() {
		id("bike-stats").style.visibility = "visible";
		id("ped-stats").style.visibility = "visible";
		id("insert-ped-north-here").style.visibility = "visible";
		id("insert-bike-north-here").style.visibility = "visible";
		id("insert-ped-south-here").style.visibility = "visible";
		id("insert-bike-south-here").style.visibility = "visible";
	}

	function id(idName) {
 		return document.getElementById(idName);
	}

	function qsa(query) {
		return document.querySelectorAll(query);
	}
})();
