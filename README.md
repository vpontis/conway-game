Project 1 -- Game of Life
=========================

Where to find the project
-------------------------
I am hosting the project on my [athena locker](http://mit.edu/vpontis/www/170/proj1/drawing.html).

Design choices 
--------------
I decided to modify the graphics class to hold two functions: Grid and Conway_Game. 

The grid functional takes a canvas object and a number of squares and creates a grid with dimensions corresponding to the number of squares. The grid allows you to draw squares by index and to clear the grid.  

The conway_game functional takes a canvas and an optional argument for the original squares. The conway_game controls the logistics of the game including time evolution and resetting the game. The optional initial_squares parameter allows for testing of the method. 

I decided to split the library into grid and conway_game because it allows one to create different cellular automata on the grid. The conway_game is just an example.

I then controlled the game from run_conway_game.js. This creates the game and sets it to run a time interval step every 500ms. This function also allows for control of the game and testing. 

Extra Feature Ideas 
-------------------

- Change color of squares that have persisted
- Allow for white/black to be switched and the game to continue so that it never reaches an end point
- Reverse the logic of squares living and dieing to run the game backwards