// an abstraction for drawing squares in a grid
var Grid = function (canvas, num_squares) {
	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	var square_width = width/num_squares;
	var square_height = height/num_squares;

	context.strokeStyle = 'rgba(0,0,0,1)';
	context.fillStyle = 'rgba(0,0,0,1)';
	context.fill();

	// return the abstract object from the constructor
	return {
		// clears the entire board
		clear: function() {
			context.clearRect(0, 0, width, height);
			},

		draw_squares: function(squares) {
			for (var i =0; i < squares.length; i++){
				for (var j=0; j < squares.length; j++){
					if (!!squares[i][j]){
						this.draw_square(i, j);
						}
					}
				}
			},

		// draws a square given indices
		draw_square: function(x_index, y_index) {
			context.beginPath();
			x_coord = x_index * square_width;
			y_coord = y_index * square_height;
			context.rect(x_coord, y_coord, square_width, square_height);
			context.fill();
			context.closePath();
			context.stroke();
			},
		}
	}

// implements the conway game of life and returns control functions
var Conway_Game = function(canvas, initial_squares){
	var NUM_SQUARES = 40;
	var grid = new Grid(canvas, NUM_SQUARES);

	var squares = [];

	// this function will set the initial state of the game
	var randomize_squares = function() {
		squares = new Array(NUM_SQUARES);
		for (var i = 0; i < NUM_SQUARES; i++){
			squares[i] = new Array(NUM_SQUARES);
			for (var j = 0; j < NUM_SQUARES; j++){
				if (Math.random() > .5) {
					squares[i][j] = true;
					}
				}
			}
		return squares;
		}
	if (initial_squares == undefined){
		squares = randomize_squares();
	} else {
		squares = initial_squares;
		}

	// decides whether a square will live in the next time step
	var square_lives =  function(x_index, y_index, squares) {
		var num_neighbors = 0;
		for (var i = -1; i <= 1; i++){
			for (var j = -1; j <= 1; j++){
				if ((i != 0 || j != 0) &&
					x_index + i >= 0 && x_index + i < squares.length &&
					y_index + j >= 0 && y_index + j < squares.length) {
					if (!!squares[x_index + i][y_index + j]){
						num_neighbors += 1;
						}
					}
				}
			}
		if (!!squares[x_index][y_index] && 
			 (num_neighbors === 2 || num_neighbors === 3)){
			return true;
			}
		if (!squares[x_index][y_index] && num_neighbors === 3){
			return true;
			}
		return false;
		};

	var step_squares = function() {
		var new_squares = [];
		for (var i = 0; i < squares.length; i++) {
			new_squares[i] = new Array(squares.length);
			for (var j = 0; j < squares.length; j++) {
				new_squares[i][j] = square_lives(i, j, squares);
				}
			}
		squares = new_squares;
		};

	return {
		step: function() {
			step_squares();
			grid.clear();
			grid.draw_squares(squares);
			},

		reset: function() {
			grid.clear();
			squares = randomize_squares();
			},

		get_squares: function() {
			return squares;
			},
		}
	}