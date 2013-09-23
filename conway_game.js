// implements the conway game of life and returns control functions
var Conway_Game = function(grid, initial_squares){
	var squares;
	var NUM_SQUARES = 40;
	var grid = grid;

	// this function will set the initial state of the game
	var reset_squares = function(clear) {
		squares = new Array(NUM_SQUARES);
		jQuery.each(squares, function(i){
			squares[i] = new Array(NUM_SQUARES);
		});

		grid_for_each(NUM_SQUARES, function(i,j){
			if (!clear && Math.random() > .5) {
				squares[i][j] = true;
			} else {
				squares[i][j] = false;
			}
		});
		return squares;
	}

	if (initial_squares === undefined){
		squares = reset_squares();
	} else {
		squares = initial_squares;
		NUM_SQUARES = initial_squares.length;
	}

	// iterates i, j over -1, +1 to check the neighbors of a square
	var square_neighbors = function(func){
		for (var i = -1; i <= 1; i++){
			for (var j=-1; j <= 1; j++){
				func(i, j);
			}
		}
	}

	// decides whether a square will live in the next time step
	var square_lives =  function(x_index, y_index, squares) {
		var num_neighbors = 0;
		square_neighbors(function(i,j){
				if ((i != 0 || j != 0) &&
					x_index + i >= 0 && x_index + i < squares.length &&
					y_index + j >= 0 && y_index + j < squares.length) {
					if (!!squares[x_index + i][y_index + j]){
						num_neighbors += 1;
					}
				}
			});
		// if the square is alive
		if (!!squares[x_index][y_index] && 
			 (num_neighbors === 2 || num_neighbors === 3)){
			return true;
		}
		// if the square is dead
		if (!squares[x_index][y_index] && num_neighbors === 3){
			return true;
		}
		return false;
	};

	// computes a unit of time in conway's game of life
	// sets squares to be the new value of squares
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
		// clears the board
		clear: function() {
			squares = reset_squares(true);
			grid.clear();
			grid.draw_squares(squares);
		},

		// advances the game a unit of time and redraws the grid appropriately
		step: function() {
			step_squares();
			grid.clear();
			grid.draw_squares(squares);
		},

		// resets the game by randomizing the squares then drawing the result
		reset: function() {
			squares = reset_squares();
			grid.clear();
			grid.draw_squares(squares);
		},

		// returns squares for testing purposes
		get_squares: function() {
			return squares;
		},

		// toggles the internal representation alive/dead
		// then applies the graphics function
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

		// initializes the grid and draws it on the page
		setup_game: function(){
			grid.setup_grid();
			grid.draw_squares(squares);
		}
	}
}