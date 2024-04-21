// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let canvasContainer;
var centerHorz, centerVert;
let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;
let life = 0;
let counter = 0;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  numCols = select("#asciiBox").attribute("rows") | 0;
  numRows = select("#asciiBox").attribute("cols") | 0;

  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);

  reseed();
}


function draw() {
  randomSeed(seed);
  drawGrid(currentGrid, life);
  if(counter > 30){
    life++;
    counter = 0;
  }
  counter++;
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}





/* exported generateGrid, drawGrid */
/* global placeTile */

function gridCheck(grid, i, j, target) {
  return (
    i < grid.length &&
    i >= 0 &&
    j < grid[0].length &&
    j >= 0 &&
    grid[i][j] == target
  );
}

function gridCode(grid, i, j, target) {
  const NORTH = 0b1000;
  const SOUTH = 0b0100;
  const EAST = 0b0010;
  const WEST = 0b0001;

  // Initial state: No direction is set
  let direction = 0b0000; // All bits are false initially

  //north
  if (gridCheck(grid, i, j - 1, target)){
    direction |= NORTH;
  }
  //south
  if  (gridCheck(grid, i, j + 1, target)){
    direction |= SOUTH;
  }
  //east
  if (gridCheck(grid, i + 1, j, target)){
    direction |= EAST;
  }
  //west
  if(gridCheck(grid, i - 1, j, target)){
    direction |= WEST
  }

  return direction;
}

function drawContext(grid, i, j, target, dti, dtj) {
  let code = gridCode(grid, i, j, target);
  const [tiOffset, tjOffset] = lookup[code]; 
  placeTile(i, j, dti + tiOffset, dtj + tjOffset);
}

const lookup = [
  [0,0], // (0) nothing around
  [2,2], // (1) one above
  [2,0], // (2) one below
  [0,0], // (3) now above and below
  [1,1], // (4) one to the right
  [1,2], // (5) changes bottom left
  [1,0],// (6) changes top left
  [1,1], // (7) changes all the left col
  [3,1], // (8) one to the left
  [3,2], // (9) changes bottom right
  [3,0], // (10) changes top right
  [3,1], // (11) changes all the right col
  [2,0], // (12) one to the right, one to the left
  [2,2], // (13) changes bottom row
  [2,0], // (14) changes top row
  [2,1], // (15) changes all the middle stuff
];

function generateGrid(numCols, numRows) {
  
  let noiseScale = 0.1;
  let grid = [];
  
  let dungeonOrOverworld = floor(random(1, 6));
  
  
  if (dungeonOrOverworld < 3){
    
    //OverWorld
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("_");
      }
      grid.push(row);
    }

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if(noise(i * noiseScale, j * noiseScale) > 0.5){
          grid[i][j] = ".";
        }
        if(noise(i * noiseScale, j * noiseScale) < 0.35){
          grid[i][j] = "/";
        }
        if(noise(i * noiseScale, j * noiseScale) > 0.66){
          grid[i][j] = "0";
        }
      }
    }
    
    
  } else {
    //dungeon
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("1");
      }
      grid.push(row);
    }
    
    let dungNoise = 1;
    let dungNoiseScale = 10;
    let rooms = []

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if(noise(i * dungNoise, j * dungNoise) * dungNoiseScale > 8){
          rooms.push([i, j]);
        }
      }
    }
    
    let lastRoom = undefined;
    while(rooms.length > 0){ 
      let currRoom = rooms.pop();
      let roomWidth = floor(random(3, 8));
      let roomHeight = floor(random(3, 8));
      let startX = currRoom[0] - floor(roomWidth/2);
      let startY = currRoom[1] - floor(roomHeight/2);
      for (let i = startX; i < startX + roomWidth; i++) {
        for (let j = startY; j < startY + roomHeight; j++) {
          if(gridCheck(grid, i, j, "1")){
            grid[i][j] = "2";
          }
        }
      }
      
      if(lastRoom != undefined){
        //draw paths between current and last room
        let hallWidth = abs(currRoom[0] - lastRoom[0]);
        let hallHeight = abs(currRoom[1] - lastRoom[1]);
        
        //horizontal halls
        for(let x = 0; x < hallWidth; x++){
          if(currRoom[0] < lastRoom[0]){//current Room is to the left of the last room
            if(gridCheck(grid, currRoom[0] + x, currRoom[1], "1")){
              grid[currRoom[0] + x][currRoom[1]] = "3";
            }
          } 
          else {//current Room is to the right of the last room
            if(gridCheck(grid, currRoom[0]-x, currRoom[1], "1")){
              grid[currRoom[0] - x][currRoom[1]] = "3"
            }
          }
        }
        
        
        //verticle halls
        for(let y = 0; y < hallHeight; y++){
          if(currRoom[1] < lastRoom[1]){//current room is above the last room
            if(gridCheck(grid, lastRoom[0], currRoom[1] + y, "1")){
              grid[lastRoom[0]][currRoom[1] + y] = "3";
            }
          } 
          else {//current room is below the last room
            if(gridCheck(grid, lastRoom[0], currRoom[1] - y, "1"))
              grid[lastRoom[0]][currRoom[1] - y] = "3";
          }
        }
      }
      
      
      lastRoom = currRoom;
    }
    
    let noChest = true
    while(noChest){
      let x = floor(random(0, numCols));
      let y = floor(random(0, numRows));
      if(gridCheck(grid, x, y, "2") && gridCode(grid, x, y, "2") == 15){
        grid[x][y] = "9";
        noChest = false;
      }
    }
    
  }
  return grid;
}

function drawGrid(grid, life) {
  background(128);
  

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      
      //grass
      if (grid[i][j] == "_") {
        placeTile(i, j, floor(random(4)), 0);
      }
      
      //light trees
      if (grid[i][j] == ".") {
        placeTile(i, j, floor(random(4)), 0);
        drawContext(grid, i, j, ".", 14, 0);
      }
      
      //water
      if (grid[i][j] == "/") {
        placeTile(i, j, floor(life * i * j)%4, 13);
        drawContext(grid, i, j, "/", 8, 0);
         
      }
      
      //dark trees
      if (grid[i][j] == "0") {
        placeTile(i, j, floor(random(4)), 0);
        drawContext(grid, i, j, "0", 14, 6);
         
      }
      
      //dungeon background
      if (grid[i][j] == "1") {
        placeTile(i, j, 0, 10);
      }
      
      //rooms
      if (grid[i][j] == "2") {
        placeTile(i, j, floor(random(1, 4)), random(21, 24));
        drawContext(grid, i, j, "2", 14, 21);
         
      }
      
      //hallways
      if (grid[i][j] == "3") {
        placeTile(i, j, 28, 24);
      }
      
      //chest
      if (grid[i][j] == "9") {
        placeTile(i, j, floor(random(1, 4)), random(21, 24));
        placeTile(i, j, 4, 28);
      }
    }
  }
}