## Apex

Apex is a classic game.  You start in the middle of the window as a small life form and are surrounded by life forms of varying sizes.  You can move around but the faster you move the more you shrink.  You can absorb life forms that are smaller than you to grow.  You win when your life form is the only one left on the board and lose when if get fully absorbed by a life form larger than you.

![start_screen](/images/game_open.png)

### Functionality & MVP  

In this Survivor game, users will be able to:

- [ ] Start the game board
- [ ] Use the arrow and wsad keys to move around

In addition, this project will include:

- [ ] A splash page describing the controls of the game
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github and my LinkedIn.  Game controls will include Start and movement keys.

![wireframes](/images/gameboard.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary elements and rendering them to the DOM.

`survivor.js`: this script will handle the logic behind the scenes.  It will be responsible for detecting collisions and trigger the appropriate actions.

`life_form.js`: this will contain the logic for each floating life form.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Goals for the day:

- Get a green bundle with `webpack`
- Get initial canvas set up with life forms

**Day 2**: Get game logic setup so that the board renders with other life forms of varying sizes.

- Complete the `life-form.js` module (constructor, update functions)
- Render a square grid to the `Canvas`
- Give each life form a size and initial velocity

**Day 3**: Create logic for life forms absorbing each other on collision

- Fill out most of the survivor.js script with game logic.
- Create collision events and make sure they are firing properly
- Create logic for when the game is over
- Give player a start position


**Day 4**: Add in user controls and shrinking logic on movement

- Add in event listeners for arrow keys and wasd keys.
- Player will be able to start game with spacebar and then move around using direction
  controls.
- Player wins game when all other life forms are absorbed and loses game when they are absorbed

### Bonus features

- [ ] Add in pokemon theme
