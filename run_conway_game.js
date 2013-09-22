// begin the game when the page is loaded
game = Conway_Game($('#grid-container'));
var runId = setInterval(function(){
	game.step()
	}, 500);

var locked = true;

var reset = function(){
	game.reset();
};

var play = function(){
	locked = true;
	runId = setInterval(function(){
		game.step()	
		}, 500);
	document.getElementById("status").innerHTML = " playing...";
};

var pause = function(){
	locked = false;
	clearInterval(runId);
	document.getElementById("status").innerHTML = " paused..."
};	

// helper function for test that compares two nested arrays
var compare_arrays = function(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return false;
		}
	for (var i = 0; i < arr1.length; i++){
		if (arr1[i].length !== arr2[i].length){
			return false;
			}
		for (var j=0; j < arr1.length; j++){
			if (arr1[i][j] !== arr2[i][j]){
				return false;
				}
			}
		}
	return true;
	}

var test_step = function(){
	test_output = "";

	var squares = [[1, 1, 1], [1,1, 1], [1,1,1]];
	var test_game = Conway_Game(document.getElementById('grid-container'), squares);

	test_game.step();
	test_output += "initial step: ";
	test_output += compare_arrays(test_game.get_squares(),
		[[true,false,true], [false,false,false], [true,false,true]]);
	test_output += "<br />";

	test_game.step();
	test_output += "second step: ";
	test_output += compare_arrays(test_game.get_squares(), 
		[[false,false,false], [false,false,false], [false,false,false]]);
	test_output += "<br />";
	return test_output;
	};

var test = function(){
	pause();
	test_step_output = test_step();
	document.getElementById("testingOutput").innerHTML = test_step_output;
}

var square_clicked = function(id){
	if (!locked){
		var square = $('#' + id);
		// console.log(id);
		game.square_toggled(square);
	} 	
};

var step = function(){
	if (!locked){
		game.step();
	}
};

game.setup_game();

$("#resetButton").click(reset);
$("#playButton").click(play);
$("#pauseButton").click(pause);
$("#testButton").click(test);
$("#stepButton").click(step);
// game.reset();


