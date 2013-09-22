Design Challenges
=================

Prompt
------
- List of problems to resolve in concepts, behaviors or implementation
- For each problem: options available, evaluation, which chosen
- Notes on code design: schema design choices, abstractions

Response
--------
###Problems 

- Each square should toggle dead/alive on click
  - Options
    - Find mouse position on canvas with click
    - Use divs for each square 
  - Solution: use divs for each square
  	- Each square has ID that corresponds to location
  	- Calls back function with ID, javascript then alters the class on the square
- When user clicks on square, needs to propagate both to logic of game and display
	- Options
		- Have each click call both the game and the grid
		- Have the grid call the game or vice versa
		- Call the grid and then the game looks at the html elements on each step
	- Solution: have the game call the grid 
	  	- The conway_game stores an internal representation of alive/dead squares in a 2D array then calls grid to display the squares
	  	- This allows the js in run_conway_game to only be interacting with the game, the game controls how things will be displayed by calling the grid
- User should be able to pause/test/step the game but only when game is paused
	- Options
		- Allow the user to click the pause/step/buttons but do nothing when game is playing
		- Hide the buttons when the game is playing
		- Make buttons look disabled when game is playing
	- Solution: hide the buttons when the game is paused
		- Allows user to see available options
		- User not frustrated when clicking on disabled options
		
###Code Design 

- I partitioned code into two library files and used loose coupling to make both libraries completely modular: grid_graphics.js and conway_game.js
  - grid_graphics.js
  	- Contains the code for creating a grid of html elements and modifying their classes
  	- Can be used for other grids or other games using a grid
  - conway_game.js
  	- Takes in a grid object and calls a standard set of methods on this object to draw the squares
  	- Could take in different grid with same endpoints implemented
  