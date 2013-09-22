// (function () {
	// begin the game when the page is loaded
	// game = Conway_Game(document.getElementById('canvas'));
	// var runId = setInterval(function(){
	// 	game.step()
	// 	}, 500);

	var reset = function(){
		game = Conway_Game(document.getElementById('canvas'));
	}

	var play = function(){
		runId = setInterval(function(){
			game.step()
			}, 500);
		document.getElementById("status").innerHTML = " playing...";
		};

	var pause = function(){
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
		var test_game = Conway_Game(document.getElementById('canvas'), squares);

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

	var setup_grid = function(num_squares){
		var grid = $('<div>').attr({
			id: 'grid',
			class: 'grid'
		});

		for (var i=0; i < num_squares; i++){
			var row = create_row(num_squares, i); 
			grid.append(row);
		}
		$('#grid-container').append(grid);
	}

	var create_row = function(num_squares, y){
		var rowId = 'canvas-row-' + y;
		var row = $('<div>', {
			id: rowId,
			class: 'canvas-row'
			});

		for (var i=0; i<num_squares; i++){
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
			})
			.text("c")
			.attr("onClick", "square_clicked(this.id)");
		return elem;
	}

	var square_clicked = function(id){
		var square = $('#' + id);
		if ($(square).hasClass('alive')){
			$(square).removeClass('alive').addClass('dead');
		} else {
			$(square).removeClass('dead').addClass('alive');
		}
	}

	var color_squares = function(){
		var squares = game.get_squares();

	}

	var times = function(n, func){
		for (var i=0; i<n; i++){
			func();
		}
	}

	setup_grid(40);

	document.getElementById("resetButton").onclick = reset;
	document.getElementById("playButton").onclick = play;
	document.getElementById("pauseButton").onclick = pause;
	document.getElementById("testButton").onclick = test;
	// game.reset();

	// }) ()
