// implements the conway game of life and returns control functions
var Conway_Game = function(grid_container, initial_squares){
	var squares = [];
	var NUM_SQUARES = 40;

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
	if (initial_squares === undefined){
		squares = randomize_squares();
	} else {
		squares = initial_squares;
		NUM_SQUARES = initial_squares.length;
	}

	var grid = new Grid(grid_container, NUM_SQUARES);

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
			grid.draw_squares(squares);
		},

		get_squares: function() {
			return squares;
		},

		square_toggled: function(square) {
			var x = square.attr('x');
			var y = square.attr('y');
			if (!!squares[x][y]){
				squares[x][y] = false;
			} else {
				squares[x][y] = true;
			}
			grid.square_clicked(square);
		},

		setup_game: function(){
			grid.setup_grid();
			grid.draw_squares(squares);
		}
	}
}