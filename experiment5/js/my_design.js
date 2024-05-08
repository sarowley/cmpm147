/* exported getInspirations, initDesign, renderDesign, mutateDesign */



function getInspirations() {
    return [
      {
        name: "The Dude", 
        assetUrl: "./assets/the_dude.PNG",
        credit: "https://www.pinterest.com/pin/39547302947800750/"
      },
      {
        name: "Courtney", 
        assetUrl: "./assets/courtney.jpg",
        credit: "https://www.all-creatures.org/stories/a-courtneygibbon.html"
      },
      {
        name: "Dreamworks", 
        assetUrl: "./assets/Dreamworks.jpg",
        credit: "https://www.flickr.com/photos/9690777@N05/2164060205"
      },
    ];
  }
  
  function initDesign(inspiration) {
    resizeCanvas(inspiration.image.width / 3, inspiration.image.height / 3);
    
    let design = {
      bg: 128,
      fg: [],
    }
    
    for(let i = 0; i < 20; i++) {
      design.fg.push({x:random(width),y: random(height)})
    }
    
    return design;
  }
  
  function renderDesign(design) {
    
    background(0);
    noStroke();
    drawVoronoiDiagram(design.fg);
    
  }
  
  function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    for(let point of design.fg) {
      point.x = mut(point.x, 0, width, rate);
      point.y = mut(point.y, 0, height, rate);
    }
  }
  
  
  function mut(num, min, max, rate) {
    return (num + rate*10*random(-1, 1))
      // return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
  }
  
  
  
  function drawVoronoiDiagram(fg) {
    stroke(0);
    strokeWeight(1);
    for (let x = 0; x < width; x+=4) {
      for (let y = 0; y < height; y+=4) {
        let closestSite = findClosestSite(x, y, fg);
        stroke(closestSite*30+50);
        point(x, y);
      }
    }
  }
  
  function findClosestSite(x, y, fg) {
    let minDist = Infinity;
    let closestIndex = -1;
    for (let i = 0; i < fg.length; i++) {
      let d = dist(x, y, fg[i].x, fg[i].y);
      if (d < minDist) {
        minDist = d;
        closestIndex = i;
      }
    }
    return closestIndex;
  }