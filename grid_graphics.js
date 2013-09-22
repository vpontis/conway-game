// an abstraction for drawing squares in a grid
var Grid = function (grid_container, num_squares) {
	var NUM_SQUARES = num_squares;
	var GRID_CONTAINER = grid_container;

	var create_row = function(y){
		var rowId = 'canvas-row-' + y;
		var row = $('<div>', {
			id: rowId,
			class: 'canvas-row'
			});

		for (var i=0; i<NUM_SQUARES; i++){
			var square = create_square(i, y);
			row.append(square);
		}

		return row;
	}

	var create_square = function(x, y){
		var elemId = 'canvas-square-' + x + '-' + y;
		var elem = $('<div>', {
			class: 'canvas-square alive', 
			id: elemId,
			x: x,
			y: y
			})
			.attr("onClick", "square_clicked(this.id)");
		return elem;
	}

	

	// return the abstract object from the constructor
	return {
		// clears the entire board
		clear: function() {
			$('#grid').remove();
		},

		// this function goes through the squares on the page and appropriately
		// labels them alive or dead
		// param squares must be a 2D array with length and width equal to NUM_SQUARES
		draw_squares: function(squares) {
			this.clear();
			this.setup_grid();
			for (var i =0; i < NUM_SQUARES; i++){
				for (var j=0; j < NUM_SQUARES; j++){
					var square_id = '#canvas-square-' + i + '-' + j;

					if (!!squares[i][j] === true) {
						$(square_id).removeClass('alive').addClass('dead');
					} else{
						$(square_id).removeClass('dead').addClass('alive');
					}
				}
			}
		},

		square_clicked: function(square){
			if ($(square).hasClass('alive')){
				$(square).removeClass('alive').addClass('dead');
			} else {
				$(square).removeClass('dead').addClass('alive');
			}
		},
		setup_grid: function(){
			var grid = $('<div>').attr({
				id: 'grid',
				class: 'grid'
			});

			for (var i=0; i < NUM_SQUARES; i++){
				var row = create_row(i); 
				grid.append(row);
			}
			$('#grid-container').append(grid);
		}
	}
}

