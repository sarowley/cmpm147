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

let dude;
let help;
let rand1;
let rand2;
let rand3;
let rand4;
let rand5;
let rand6;
let rand7;
let rand8;
let rand9;
let rand10;
let rand11;
let rand12;
let rand13;
let rand14;
let rand15;
let rand16;
let rand17;
let rand18;

function rand_helper() {
  rand1 = random(0,5);
  rand2 = random(0,5);
  rand3 = random(40,65);
  rand4 = random(0,5);
  rand5 = random(-10,10);
  rand6 = random(-10,10);
  rand7 = random(30,90);
  rand8 = random(-10,10);
  rand9 = random(30,90);
  rand10 = random(-60,-30);
  rand11 = random(-10,40);
  rand12 = random(-60,-10);
  rand13 = random(-10,25);
  rand14 = random(-40,-10);
  rand15 = random(-10,10);
  rand16 = random(-40,0);
  rand17 = rand1;
  rand18 = rand2;
}

function p3_setup() {
  dude = {pos: createVector(200,200)}
  help = {pos: createVector(500,200), speed: 1}
  console.log("hatred")
  rand_helper()
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
  rand_helper();
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
  noStroke();

  if (XXH.h32("tile:" + [i, j], worldSeed) % 1000 == 0) {
    fill(2,118,84);
  } 
  else if (XXH.h32("tile:" + [i, j], worldSeed) % 3500 == 0) {
    fill(0,105,148);
  }
  else if (XXH.h32("tile:" + [i, j], worldSeed) % 6 == 0) {
    fill(152,118,84);
  }
  else {
    fill(122,118,84);
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
  }

  // console.log(mouseX, mouseY);
  //   fill(100,100,100);
  //   let help = rect(0,0,10,5);

  //   help.pos += 5;

  
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
  // text("tile " + [i, j], 0, 0);
}

let game_over = false;
let time_counter = 0;


function p3_drawAfter() {
  fill("grey")
  ellipse(dude.pos.x + 5, dude.pos.y, 20,20);
  ellipse(dude.pos.x + 55, dude.pos.y, 20,20);
  fill("blue")
  beginShape()
  vertex(dude.pos.x, dude.pos.y);
  vertex(dude.pos.x + 60, dude.pos.y);
  vertex(dude.pos.x + 60, dude.pos.y - 40);
  vertex(dude.pos.x + 20, dude.pos.y - 40);
  vertex(dude.pos.x + 15, dude.pos.y - 25);
  vertex(dude.pos.x, dude.pos.y - 20);
  vertex(dude.pos.x, dude.pos.y);
  endShape();
  
  fill("grey")
  ellipse(help.pos.x + rand1, help.pos.y + rand2, 20,20);
  ellipse(help.pos.x + rand3, help.pos.y + rand4, 20,20);
  fill("red")
  beginShape()
  vertex(help.pos.x + rand5, help.pos.y + rand6);
  vertex(help.pos.x + rand7, help.pos.y + rand8);
  vertex(help.pos.x + rand9, help.pos.y + rand10);
  vertex(help.pos.x + rand11, help.pos.y + rand12);
  vertex(help.pos.x + rand13, help.pos.y + rand14);
  vertex(help.pos.x + rand15, help.pos.y + rand16);
  vertex(help.pos.x + rand17, help.pos.y + rand18);
  endShape();
  //     if (dist(player.x, player.y, zombie.x, zombie.y) <= 100) {
  // ba
  // textSize(20);
  // text('You died \n Round '+round,165,200)

  //   }
  
  if (frameCount % 60 == 0 && !game_over){
    time_counter ++;
    console.log(time_counter)
  }
  
  fill("white");
  text(time_counter, dude.pos.x, dude.pos.y - 30);
  
  if (dist(dude.pos.x,dude.pos.y,help.pos.x,help.pos.y) <= 50){
    //console.log("hekop")
    //window.location.reload(true);
    // location.reload();
    game_over = true;
    fill("white")
    text("Game Over", dude.pos.x, dude.pos.y - 50)
  }
  
  // if (keyIsPressed && keyCode === 87) {
  //   dude.pos.y -= 2;
  // }
  // if (keyIsPressed && keyCode === 83) {
  //   dude.pos.y += 2;
  // }
  // if (keyIsPressed && keyCode === 65) {
  //   dude.pos.x -= 2;
  // }
  // if (keyIsPressed && keyCode === 68) {
  //   dude.pos.x += 2;
  // }
  if (keyIsDown(87) && !game_over) {
    dude.pos.y -= 2;
  }
  if (keyIsDown(83)&& !game_over) {
    dude.pos.y += 2;
  }
  if (keyIsDown(65)&& !game_over) {
    dude.pos.x -= 2;
  }
  if (keyIsDown(68)&& !game_over) {
    dude.pos.x += 2;
  }
  help.pos.add(p5.Vector.sub(dude.pos, help.pos).limit(help.speed))
}
