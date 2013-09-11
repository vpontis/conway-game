// a demonstration program using the graphics library
(function () {
	// define some colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);
    
	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));
	pad.reset();
	var runId = setInterval(function(){
		pad.step()
		}, 500);

	var reset = function(){
		pad.reset();
	}

	var play = function(){
		runId = setInterval(function(){
			pad.step()
		}, 500);
		document.getElementById("status").innerHTML = " playing...";
	}

	var pause = function(){
		clearInterval(runId);
		document.getElementById("status").innerHTML = " paused..."
	}

	document.getElementById("resetButton").onclick = reset;
	document.getElementById("playButton").onclick = play;
	document.getElementById("pauseButton").onclick = pause;
	reset();

	}) ()
