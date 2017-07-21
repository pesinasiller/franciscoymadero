// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Separation and Seek

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of vehicles
var vehicles = [];
var originalWindowHeight;
var aumentar = true;
var tam = $("#canv-cont").height();
    var bandera_mx;
  
    var bandera_fym;
 
    var bandera_us;
    
function preload(){
    bandera_mx = loadImage("img/bandera_mx.png");
  
    bandera_fym = loadImage("img/logofym.png");
 
    bandera_us = loadImage("img/bandera_us.png");
}

function setup() {

  var canvas = createCanvas(windowWidth, tam);
  canvas.parent('canvas-holder');

 // originalWindowHeight = windowHeight;
  // We are now making random vehicles and storing them in an array
  for (var i = 0; i < 15; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
   
}

function draw() {
 
  clear();
  background(0, 0, 0, 0);


  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].applyBehaviors(vehicles);
    vehicles[i].update();
    vehicles[i].borders();
    vehicles[i].display();
  }

}


function mouseDragged() {
  if (vehicles.length == 50) {
    this.aumentar = false;
  }
  else if (vehicles.length == 0) {
    this.aumentar = true;
  }
  if (this.aumentar) {
    vehicles.push(new Vehicle(mouseX, mouseY));
  }
  else {
    vehicles.pop();
  }



}

/*

function windowResized() {
  tam = $("#canv-cont").height();
  resizeCanvas(windowWidth, tam);

}*/
