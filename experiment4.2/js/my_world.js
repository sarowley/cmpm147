"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

let mouse_helperX;
let mouse_helperY;
let color1;
let color2;
let color3;
let discoMode = false;
let helper;

function p3_setup() {
}

function rand_colors(){
  color1 = random(0,255);
  color2 = random(0,255);
  color3 = random(0,255);
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
  rand_colors()
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}



function p3_drawTile(i, j) {
  //noStroke();



  if (XXH.h32("tile:" + [i, j], worldSeed) % 3 == 0) {
    fill("white");
    ellipse(100, 0, 10);
    fill("black")
  } 
  else if (XXH.h32("title:" + [i,j], worldSeed) % 10002 == 0) {
    fill("purple")
    helper = rect(-5,-5,10,10)
    rotate(30);
    noFill();
    //fill("white")
  }
  else if (XXH.h32("tile:" + [i, j], worldSeed) % 50 == 0) {
    fill("white")
    ellipse(0,0,100)
    //arc(105, 35, 50, 50, -PI, 0, CHORD);
    //arc(0,0,10,10,10,0,10, CHORD);
  
    fill(color1,color2,color3);
    
    mouse_helperX = mouseX - 400;
    // console.log(mouseX)
    if (mouse_helperX >= 25){
      mouse_helperX = 25;
    }
    if (mouse_helperX <= -25){
      mouse_helperX = -25;
    }
    mouse_helperY = mouseY - 200;
    if (mouse_helperY >= 25){
      mouse_helperY = 25;
    }
    if (mouse_helperY <= -25){
      mouse_helperY = -25;
    }
    //mouse_helperY = mouseY;
    ellipse(mouse_helperX, mouse_helperY, 50);
    //fill("black")
    noStroke()
    noFill()
    //ellipse(0,0,50)
  } 
  
  else {  
    fill ("black")
  }
  

  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    // fill(0, 0, 0, 32);
    // ellipse(0, 0, 10, 5);
    // translate(0, -10);
    // fill(255, 255, 100, 128);
    // ellipse(0, 0, 10, 10);
    //window.open("https://en.wikipedia.org/wiki/Special:Random")
    if (discoMode){
      discoMode = false;
    }
    else if (!discoMode) {
      discoMode = true;
      //singe_color()
    }
    if (discoMode){
      rand_colors();
    }
    else if (!discoMode){
      color1 = color1 - 1;
      color2 = color2 - 1;
      color3 = color3 - 1;
    }
  }
  

  pop();
}

function p3_drawSelectedTile(i, j) {
//   noFill();
//   stroke(0, 255, 0, 128);

//   beginShape();
//   vertex(-tw, 0);
//   vertex(0, th);
//   vertex(tw, 0);
//   vertex(0, -th);
//   endShape(CLOSE);

//   noStroke();
//   fill(0);
//   text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {
  
//   fill("white");
//   ellipse(250, 250, 250);
    
//   let angle = atan2(mouseY - 100, mouseX - 100);
    
//   let pd = 0.75 * 80;
//   let pr = 0.25 * 80;
    
//   let x2 = 300 + pd * cos(angle);
//   let y2 = 200 + pd * sin(angle);
    
//   fill("black");
//   ellipse(x2, y2, pr);
}
