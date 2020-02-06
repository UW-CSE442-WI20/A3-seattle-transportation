(function() {
	// Make sure the window has loaded before we start trying to 
	// modify the DOM.
	window.addEventListener("load", init);

	 function init() {
	 	setupSlider();
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
})();
