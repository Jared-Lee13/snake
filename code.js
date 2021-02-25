var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var unitWidth = 10;
var speed = 15;
var unitTime = 1;

var group = createGroup();
var sprite = createSprite(200, 200, unitWidth, unitWidth);
sprite.shapeColor=rgb(randomNumber(100,255),100,100);

sprite.velocityX = unitWidth;
createEdgeSprites();

group.add(sprite);

lastTime = 0;

var gameOver = 0;
var score = 0;

function draw() {
  background("blue");
  World.frameRate = speed;

  if (!gameOver) {
    // if there's a collision with the edges or ourself, we die
    if (edges.isTouching(sprite)  ||  group.isTouching(sprite))  {
      playSound("assets/category_digital/hop.mp3", false);
      
      gameOver = 1;
      sprite.setSpeedAndDirection(0,0);
    }
  }

  if (!gameOver) {
  
    // every unitTime seconds, make the snake longer and increase the score
    if (World.seconds == (lastTime + unitTime)) {
      lastTime = World.seconds;
      
      var s = createSprite(200,200, unitWidth, unitWidth);
      s.shapeColor=rgb(randomNumber(100,255),100,100);
      
      group.add(s);
      score ++;
    }
    
    //make each snake block follow the previous one
    for (var i = group.length - 1; i > 0; i--) {
      group.get(i).x = group.get(i-1).x;
      group.get(i).y = group.get(i-1).y;
  
    }
  
    // move the sprite  
    if (keyDown("up")) {
       sprite.setSpeedAndDirection(unitWidth, -90);
    }
    if (keyDown("down")) {
       sprite.setSpeedAndDirection(unitWidth, 90);
    }
    if (keyDown("left")) {
       sprite.setSpeedAndDirection(unitWidth, 180);
    }
    if (keyDown("right")) {
       sprite.setSpeedAndDirection(unitWidth, 0);
    }
  }
  else {
    fill("red");
    textSize(35);
    text("GAME OVER",100,200);
    
  }

  fill("green");
  textSize(25);
  text("SCORE:  " +score,10,30);
    
  drawSprites();
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
