import React, { useRef, useEffect } from 'react'

const Canvas = ( dice ) => {
  
  const canvasRef = useRef(null);
  const diceColor = 'white';
  const dotColor = '#F73E53';
  var diceNumber = Object["values"](dice)[0];
  var newGame = 0;
  const draw = (ctx, x, y, size, value, diceColor, dotColor) => {
    var dots = [];
    ctx.save();
    ctx.fillStyle = diceColor;
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'lightgrey';
    if (newGame == 0){
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    }
    ctx.fillRect(0, 0, size, size);
    
    //define dot locations
    var padding = 0.25;
    var x, y;
    x = padding*size;
    y = padding*size;
    dots.push({x: x, y: y});
    y = size*0.5;
    dots.push({x: x, y: y});
    y = size * (1-padding);
    dots.push({x: x, y: y});
    x = size*0.5;
    y = size*0.5;
    dots.push({x: x, y: y});
    x = size * (1-padding);
    y = padding*size;
    dots.push({x: x, y: y});
    y = size*0.5;
    dots.push({x: x, y: y});
    y = size * (1-padding);
    dots.push({x: x, y: y});

    //Define number of dots
    var dotsToDraw;
    if (value == 1) dotsToDraw = [3];
    else if (value == 2) dotsToDraw = [0, 6];
    else if (value == 3) dotsToDraw = [0, 3, 6];
    else if (value == 4) dotsToDraw = [0, 2, 4, 6];
    else if (value == 5) dotsToDraw = [0, 2, 3, 4, 6];
    else if (value == 6) dotsToDraw = [0, 1, 2, 4, 5, 6];
    else console.log("Dice value shall be between 1 and 6");
        
    ctx.fillStyle = dotColor;
    for (var i=0; i<dotsToDraw.length; i++) {
        ctx.beginPath();
        var j = dotsToDraw[i];
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(dots[j].x, dots[j].y, size*0.07, 0, 2*Math.PI);
        ctx.fill();
    }

  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    /* Media queries that change the size of the dice */
    function mediaQueries(x) {
        if (x.matches) { // If media query matches (mobile)
            canvas.width = 100;
            canvas.height = 100;
            draw(context,0, 0, canvas.width - 20, diceNumber, diceColor, dotColor)
        } else { 
            canvas.width = 150;
            canvas.height = 150;
            draw(context,0, 0, canvas.width - 20, diceNumber, diceColor, dotColor)
        }
      }
      var x = window.matchMedia("(max-width: 700px)");
    mediaQueries(x); // Call listener function at run time
    x.addListener(mediaQueries); // Attach listener function on state changes 
    
  }, [draw])
  
  return <canvas ref={canvasRef} />
}

export default Canvas
