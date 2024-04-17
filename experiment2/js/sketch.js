// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

// function resizeScreen() {
//   centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
//   centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
//   console.log("Resizing...");
//   resizeCanvas(canvasContainer.width(), canvasContainer.height());
//   // redrawCanvas(); // Redraw everything based on new size
// }

// setup() function is called once when the program starts
function setup() {
  createButton("reimagine").mousePressed(() => seed++);
  //reimagine.mousePressed(() => seed++);
  //canvasContainer = createCanvas(400, 600);

  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(400, 600);
  canvas.parent("canvas-container");

  // canvasContainer.parent('canvas-Container')

  // $(window).resize(function() {
  //   resizeScreen();
  // });
  // resizeScreen();
}

let theOneTrueVar = 0;

let boatX = 80//random(80, 120);
let boatY = 450//random(450, 550);
let counter = 0;
let up = 1;

let seed = 1;

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed); // Seed the random number generator

  // Background: Sky
  let skyBright = 235
  let skyColor = color(skyBright, skyBright, skyBright);
  let spaceY = random(30, 90);
  background(skyColor);
  fill(color(0, 0, 100));
  rect(0, 0, width, spaceY + 5);
  
  //sky gradiant
  noStroke()
  let distX = spaceY;
  let gradiantColorFirst = 0;
  let gradiantColorMiddle = 0;
  let gradiantColorLast = 100;
  for (let x = 0; x < 30; x++){
    fill(color(gradiantColorFirst,gradiantColorMiddle, gradiantColorLast))
    rect(0,distX, width, 8)
    distX += 1;
    gradiantColorFirst += 8;
    gradiantColorMiddle += 8;
    gradiantColorLast += 6;
  }
  // fill(color(180, 180, 220));
  // rect(0, spaceY, width, 1)
  
  // Background: Mount Fuji
  let fujiColor = color(220, 220, 220);
  fill(fujiColor);
  let fujiX = random(-width/4, width / 3);
  let fujiY = (height / 2) + 25;
  let fujiBaseWidth = width / 2;
  let fujiTopWidth = fujiBaseWidth / 4;
  let fujiHeight = random(height/5, height/6);
  stroke(color(0,0,0));
  strokeWeight(0.5)
  beginShape();
  vertex(fujiX,fujiY);
  vertex(fujiX + (fujiBaseWidth / 2) - (fujiTopWidth / 2), fujiY - fujiHeight);
  vertex(fujiX + (fujiBaseWidth / 2) + (fujiTopWidth / 2), fujiY - fujiHeight);
  vertex(fujiX + fujiBaseWidth, fujiY)
  endShape(CLOSE);
  strokeWeight(0)

  // Background: forest line
  let forestColor = color(100, 150, 100);
  let forestHeight = random(30, 40)
  let noiseFactor = 10; // Adjust the amount of noise
  let horizonY = (height / 2) - random(0, 20); 
  fill(forestColor);
  beginShape();
  for (let x = 0; x < width; x += 10) {
    let y = horizonY + random(-noiseFactor, noiseFactor);
    vertex(x, y);
  }
  vertex(width, horizonY)
  vertex(width, horizonY+forestHeight)
  vertex(0, horizonY+forestHeight)
  endShape(CLOSE);
  
  let forestColor2 = color(140, 190, 140);
  let forestHeight2 = random(30, 40)
  let noiseFactor2 = 10; // Adjust the amount of noise
  let horizonY2 = horizonY +20; 
  fill(forestColor2);
  beginShape();
  for (let x = 0; x < width; x += 10) {
    let y = horizonY2 + random(-noiseFactor2, noiseFactor2);
    vertex(x, y);
  }
  vertex(width, horizonY2)
  vertex(width, horizonY2+forestHeight2)
  vertex(0, horizonY2+forestHeight2)
  endShape(CLOSE);
  
  // Middleground: Ocean
  let oceanColor = color(230, 250, 255);
  fill(oceanColor)
  beginShape();
  vertex(0, horizonY + forestHeight);
  vertex(width, horizonY + forestHeight);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  // Middleground: boats
  let boatColor = color(250,250,250);
  fill(boatColor)
  strokeWeight(0.1);
  let randBoatLength = 0;
  let randBoatWidth = 0;
  let boatNum = random(1,4);
  for (let x = 0; x < boatNum; x++){
    let boatWidth = width/2 + random(-width/2, width/2)
    randBoatLength = random(10,20)
    randBoatWidth = random(5,10)
    rect(boatWidth, 25 + height/2, randBoatWidth, randBoatLength)
  }
  strokeWeight(0);
  
  // ocean gradiant
  noStroke()
  let waveHeight = height * random(0.7, 0.8);
  let distX1 = waveHeight - 50;
  let gradiantColorFirst1 = 230;
  let gradiantColorMiddle1 = 250;
  let gradiantColorLast1 = 255;
  for (let x = 0; x < 35; x++){
    fill(color(gradiantColorFirst1,gradiantColorMiddle1, gradiantColorLast1))
    rect(0,distX1, width, 4)
    distX1 += 1;
    gradiantColorFirst1 -= 4;
    gradiantColorMiddle1 -= 4;
    gradiantColorLast1 -= 2;
  }
  
  // Middleground: Wave
  fill(color(70, 70, 200));
  noStroke();

  rect(0, waveHeight, width, height)
  
  let waveColor = color(50, 50, 150);
  fill(waveColor)
  strokeWeight(5);
  stroke(color(230, 230, 255));
  
  let idkVar6 = theOneTrueVar + 100;
  beginShape();
  vertex(0, waveHeight);
  for (let x = 0; x < width; x += 1) {
    let noiseVal2 = noise(x * 0.1, idkVar6); // Generate noise for second layer
    let y2 = map(noiseVal2, 0, 1, -5, 5); // Map noise value to jitter
    let y = waveHeight - 10 - y2; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, waveHeight);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  let idkVar8 = theOneTrueVar + 1000;
  beginShape();
  vertex(0, waveHeight);
  for (let x = 0; x < width; x += 1) {
    let noiseVal2 = noise(x * 0.1, idkVar8); // Generate noise for second layer
    let y2 = map(noiseVal2, 0, 1, -5, 5); // Map noise value to jitter
    let y = waveHeight + 20 - y2; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, waveHeight);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  let idkVar9 = theOneTrueVar + 2000;
  beginShape();
  vertex(0, waveHeight);
  for (let x = 0; x < width; x += 1) {
    let noiseVal2 = noise(x * 0.1, idkVar9); // Generate noise for second layer
    let y2 = map(noiseVal2, 0, 1, -5, 5); // Map noise value to jitter
    let y = waveHeight + 50 - y2; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, waveHeight);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  let idkVar10 = theOneTrueVar + 3000;
  beginShape();
  vertex(0, waveHeight);
  for (let x = 0; x < width; x += 1) {
    let noiseVal2 = noise(x * 0.1, idkVar10); // Generate noise for second layer
    let y2 = map(noiseVal2, 0, 1, -5, 5); // Map noise value to jitter
    let y = waveHeight + 80 - y2; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, waveHeight);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  let idkVar11 = theOneTrueVar + 8000;
  beginShape();
  vertex(0, waveHeight);
  for (let x = 0; x < width; x += 1) {
    let noiseVal2 = noise(x * 0.1, idkVar11); // Generate noise for second layer
    let y2 = map(noiseVal2, 0, 1, -5, 5); // Map noise value to jitter
    let y = waveHeight + 110 - y2; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, waveHeight);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  let idkVar12 = theOneTrueVar + 2000;
  beginShape();
  vertex(0, waveHeight);
  for (let x = 0; x < width; x += 1) {
    let noiseVal2 = noise(x * 0.1, idkVar12); // Generate noise for second layer
    let y2 = map(noiseVal2, 0, 1, -5, 5); // Map noise value to jitter
    let y = waveHeight + 140 - y2; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, waveHeight);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  
  //other (single boat)
  
  
  let boatRock = 0.05;
  let counterMax = 100;
  if(up == 1){
    boatY -= boatRock;
  }
  else {
    boatY += boatRock;
  }
  if (counter >= counterMax){
    counter = 0;
    up *= -1;
  }
  counter++;
  
  let longBoatColor = color(0,0,0);
  fill(longBoatColor)
  noStroke()
  strokeWeight(.5);
  beginShape();
  vertex(boatX + 0,boatY + 0);
  vertex(boatX + 26, boatY + 0);
  vertex(boatX + 26, boatY - 40);
  vertex(boatX + 30, boatY + 0);
  vertex(boatX + 40,boatY + 0);
  vertex(boatX + 70, boatY -10);
  vertex(boatX + 46, boatY + 10);
  vertex(boatX + 0, boatY + 10);
  endShape(CLOSE)
  
  
  
  
  // foreground: cliff far
  let cliffColor = color(212, 200, 130)
  fill(cliffColor)
  noStroke();
  
  
  let cliffHeight = random(height*0.3, height*0.5)
  let idkVar1 = random(0,3);
  let idkVar2 = random(0,3);
  beginShape();
  vertex(width, height);
  for (let y = height; y > cliffHeight; y -= 1) {
    let noiseVal1 = noise(y * 0.01, idkVar1); // Generate noise for first layer
    let noiseVal2 = noise(y * 0.03, idkVar2); // Generate noise for second layer
    let x1 = map(noiseVal1, 0, 1, 0, height); // Map noise value to y-coordinate
    let x2 = map(noiseVal2, 0, 1, -5, 5); // Map noise value to jitter
    let x = x1 + x2; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, cliffHeight)
  endShape(CLOSE);
  
  // foreground: cliff close
  let closeCliffColor = color(230, 230, 150)
  fill(closeCliffColor)
  noStroke();
  
  let idkVar3 = random(0,3);
  let idkVar4 = random(0,3);
  beginShape();
  vertex(width, height);
  for (let y = height; y > cliffHeight; y -= 1) {
    let noiseVal1 = noise(y * 0.01, idkVar3); // Generate noise for first layer
    let noiseVal2 = noise(y * 0.05, idkVar4); // Generate noise for second layer
    let x1 = map(noiseVal1, 0, 1, 0, height); // Map noise value to y-coordinate
    let x2 = map(noiseVal2, 0, 1, -2, 2); // Map noise value to jitter
    let x = x1 + x2 + 20; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, cliffHeight)
  endShape(CLOSE);
  
  
  // foreground: greenery
  let greenHeight = cliffHeight - random(40, 70);
  fill(color(120, 200,  100));
  beginShape();
  // vertex(0,0)
  vertex(width, cliffHeight+1);
  for (let y = cliffHeight+1; y > greenHeight; y -= 1) {
    let noiseVal1 = noise(y * 0.01, idkVar1); // Generate noise for first layer
    let noiseVal2 = noise(y * 0.03, idkVar2); // Generate noise for second layer
    let x1 = map(noiseVal1, 0, 1, 0, height); // Map noise value to y-coordinate
    let x2 = map(noiseVal2, 0, 1, -5, 5); // Map noise value to jitter
    let x = x1 + x2; // Add jitter to the first layer
    vertex(x, y);
  }
  vertex(width, greenHeight);
  endShape(CLOSE);
  
  //grey thing
  let leftY = random(height- 20, height - 70)
  let leftX = random(width/4, width/3);
  let rightX = random(width/3, width/2);
  let rightY = random(height - 30, height - 120);
  let greyCliffColor = ('grey')
  fill(greyCliffColor)
  beginShape()
  vertex(0, leftY);
  vertex(leftX, leftY + 20);
  vertex(rightX, leftY + 20);
  vertex(width, rightY);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE)
  
  theOneTrueVar += 0.005
  //people?
  


}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}