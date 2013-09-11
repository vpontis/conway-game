// a very simple graphics library using HTML5 canvas features

// constructor for 2D coordinate
var Coord = function (x, y) {
	return {x:x, y:y};
	};

// constructor for color
var Color = function (red, green, blue) {
	return {red: red, green: green, blue: blue};
	};

// an abstraction for drawing in a canvas
var Pad = function (canvas) {
	var DEFAULT_CIRCLE_RADIUS = 5;
	var DEFAULT_LINE_WIDTH = 2;

	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;

	var num_squares = 20;
	var square_width = width/num_squares;
	var square_height = height/num_squares;
	var squares = []

	var reset_squares = function() {
		for (var i = 0; i < num_squares; i++){
			squares[i] = new Array(num_squares);
			for (var j = 0; j < num_squares; j++){
				if (Math.random() > .5) {
					squares[i][j] = true;
					}
				}
			}
		}
	reset_squares();

	// sets the line width for subsequent drawing
	var apply_line_width = function (ctx, line_width) {
		ctx.lineWidth = (line_width) ? line_width : DEFAULT_LINE_WIDTH;
		}

	// sets the color for subsequent drawing and a default stroke width
	var apply_color = function (ctx, color) {
		if (color) {
			ctx.strokeStyle = 'rgba(' + color.red + ',' + color.green + ',' + color.blue + ', 1)';
			}
		}

	// sets the fill color for subsequent drawing
	var apply_fill_color = function (ctx, color) {
		ctx.fillStyle = 'rgba(' + 0 + ',' + 0 + ',' + 0 + ', 1)';
		ctx.fill();
		}

	// return the abstract object from the constructor
	return {
		// Draws a rectangle starting at the top left corner (as
		// returned by the Coord function) of the given width and
		// height. An optional line width can be supplied (defaults to
		// DEFAULT_LINE_WIDTH otherwise), as well as an optional color
		// and fill color (both returned by the Color function).
		draw_rectangle: function(top_left, width, height, line_width, color, fill_color) {
			context.beginPath();
			context.rect(top_left.x, top_left.y, width, height);
			apply_line_width(context, line_width);
			apply_color(context, color);
			apply_fill_color(context, fill_color);
			context.closePath();
			context.stroke();
			},

		// Draws a square given indices
		draw_square: function(x_index, y_index, color) {
			context.beginPath();
			x_coord = x_index * square_width;
			y_coord = y_index * square_height;
			context.rect(x_coord, y_coord, square_width, square_height);
			apply_color(context, color);
			apply_fill_color(context, color);
			context.closePath();
			context.stroke();
			},

		step_squares: function() {
			var new_squares = [];
			for (var i = 0; i < squares.length; i++) {
				new_squares[i] = new Array(squares.length);
				for (var j = 0; j < squares.length; j++) {
					new_squares[i][j] = this.square_lives(i, j, squares);
					}
				}
			squares = new_squares;
			return new_squares;
			},

		draw_squares: function() {
			this.clear();
			for (var i =0; i < squares.length; i++){
				for (var j=0; j < squares.length; j++){
					if (!!squares[i][j]){
						this.draw_square(i, j);
						}
					}
				}
			},

		square_lives: function(x_index, y_index, squares) {
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
			},

		step: function() {
			this.step_squares();
			this.draw_squares();
			},

		// Clears the entire board
		clear: function() {
			context.clearRect(0, 0, width, height);
			},

		reset: function() {
			this.clear();
			reset_squares();
		},

		// return width and height of the drawing area
		get_width: function() {
			return width;
			},
		get_height: function() {
			return height;
			},

		get_squares: function() {
			return squares;
			},
	}
}