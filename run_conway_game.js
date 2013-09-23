// locked stores the state of the game
// if locked is true, the game is being played and squares cannot be modified
// if locked is false, the game is paused and squares can be modified
var locked = false;

// run id will be the process we will start and stop for stepping the game
var runId;

// this resets the game by randomizing all of the squares
var reset = function(){
	game.reset();
};

// this 
var play = function(){
	locked = true;
	runId = setInterval(function(){
		game.step()	
		}, 500);
	$('#playButton').hide();
	$('#stepButton').hide();
	$('#testButton').hide();
	$('#clearButton').hide();
	$('#pauseButton').show();
	$("#status").html(" playing...");
	$("#testingOutput").html("");
};

var pause = function(){
	locked = false;
	clearInterval(runId);
	$('#playButton').show();
	$('#stepButton').show();
	$('#testButton').show();
	$('#clearButton').show();
	$('#pauseButton').hide();
	$("#status").html(" paused...");
};	

// helper function for test that compares two nested arrays


// this function is fired when a square in the grid is clicked
// if the game is not being played, the square will be set to alive from dead
// or vice versa and the color will change correspondingly
var square_clicked = function(id){
	if (!locked){
		var square = $('#' + id);
		// console.log(id);
		game.square_toggled(square);
	} 	
};

// steps the game if it is not being played
// this is helpful in debugging and allows the user to control the speed
var step = function(){
	if (!locked){
		game.step();
	}
};

// begin the game when the page is loaded
var grid = Grid($('#grid-container'))
var game = Conway_Game(grid);
game.setup_game();

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
	var test_output = "";

	var squares = [[1, 1, 1], [1,1, 1], [1,1,1]];
	var grid = Grid($('grid-container'), 3);
	var test_game = Conway_Game(grid, squares);

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

var test_clear = function(){
	var test_output = "";

	var squares = [[1, 1, 1], [1,1, 1], [1,1,1]];
	var grid = Grid($('grid-container'), 3);
	var test_game = Conway_Game(grid, squares);

	test_game.clear();
	test_output += "reset squares: ";
	test_output += compare_arrays(test_game.get_squares(),
		[[false,false,false], [false,false,false], [false,false,false]]);
	test_output += "<br />";
	return test_output;
}

var test = function(){
	pause();
	var test_output = "Testing output <br />";
	test_output += test_step();
	test_output += test_clear();
	$("#testingOutput").html(test_output);

	// begin the game when the page is loaded
	grid = Grid($('#grid-container'))
	game = Conway_Game(grid);
	game.setup_game();

};

// these lines setup the event handlers for each of the buttons
$("#resetButton").click(reset);
$("#playButton").click(play);
$("#pauseButton").click(pause);
$("#testButton").click(test);
$("#stepButton").click(step);
$("#clearButton").click(game.clear);