// convert value from color element into string readable by fillStyle

// Object constructors
function returnColor(colorObj) {

  return 'hsla(' + colorObj.hue + ', ' + colorObj.sat + '%, ' + colorObj.light + '%, '+ colorObj.opacity + ')';
}

export function base() {
  this.type = 'base';
  this.index = '0'
  this.color = {
    hue: 180,
    sat: 50,
    light: 50,
    opacity: 1.0
  }

  this.returnColor = function() {
    var ret = returnColor(this.color);
    return ret;
  }

  this.draw = function(ctx, width, height) {
    if (this.color !== undefined) {
      ctx.fillStyle = this.returnColor();
      var background = new Path2D();
      background.rect(0, 0, width, height);
      ctx.fill(background);
    }
  };
};

export function line(height, width, index) {
  this.type='line';
  this.index = index;
  // attributes
  this.color = {
    hue: 0,
    sat: 70,
    light: 0,
    opacity: 1.0
  }
  this.height = height;
  this.width = width;
  this.thickness = 10;
  this.regularity = 1;
  this.orientation = 'b'; // can be h for horizontal, v for vertical or b for both
  this.pattern = 'solid';
  this.spacing = 3; // space between iterations of the pattern
  this.boundary = {
    u: 0,
    d: 0,
    l: 0,
    r: 0
  }
  this.offset = {
    x: 0,
    y: 0
  };
  this.grid = null;
  this.lineWidth = 1;
  this.boundTo = null;
  this.bindees = [];

  this.allowDraw = function() {
    var reg;
    var offX, offY, boundL, boundR, boundU, boundD
    var checkNaNs = [this.offset.x, this.offset.y, this.boundary.l,
      this.boundary.r, this.boundary.u, this.boundary.d, this.regularity,
      this.thickness, this.spacing, this.lineWidth];
    var i;
    for(i = 0; i < checkNaNs; i++) {
      if(isNaN(checkNaNs[i])) {
        alert(checkNaNs[i] +' failed');
        return false;
      }
    }

    return true;
  }


  // methods
  this.createGrid = function() {

    // will contain the latitude of horizontal lines and longitude of vertical
    const xAxis = [];
    const yAxis = [];



    // determine where we start of end the marking
    var xStart = 0 + this.boundary.l;
    if(this.boundTo) {
      xStart += this.boundTo.boundary.l;
    }

    var yStart = 0 + this.boundary.u;
    if(this.boundTo) {
      yStart += this.boundTo.boundary.u;
    }

    var xEnd = this.width + this.boundary.r;
    if(this.boundTo) {
      xEnd += this.boundTo.boundary.r;
    }

    var yEnd = this.height + this.boundary.d;
    if(this.boundTo) {
      yEnd += this.boundTo.boundary.d;
    }

    //console.log('X from ' + xStart + ' to ' + xEnd);
    //console.log('Y from ' + yStart + ' to ' + yEnd);


    // the space between ticks
    const xGap = (xEnd - xStart) / (this.regularity + 1);
    const yGap = (yEnd - yStart) / (this.regularity + 1);

    //console.log('Gaps: X = ' + xGap +', Y = ' + yGap);

    // get offset modifications from bind chain
    var inheritOffset = this.boundTo;
    var xOffsetChange = 0;
    var yOffsetChange = 0;
    var whileCount = 0;
    while(inheritOffset){
      whileCount += 1;
      xOffsetChange += inheritOffset.offset.x;
      yOffsetChange += inheritOffset.offset.y;
      inheritOffset = inheritOffset.boundTo;
    }

    // mark out the ticks
    for(let i = 0; i < this.regularity; i++) {

        let xTick = ((xGap * (i + 1)) - (this.thickness / 2)) + this.offset.x + xStart;
        let yTick = ((yGap * (i + 1)) - (this.thickness / 2)) + this.offset.y + yStart;

        xTick += xOffsetChange;
        yTick += yOffsetChange;

        //console.log('xTick: ' + xTick + ',yTick: ' + yTick);

        xAxis.push(xTick);
        yAxis.push(yTick);
    }

    this.grid = {
      h: yAxis,
      v: xAxis
    }
    //console.log(this.grid);
  }

  this.returnColor = function() {
    return returnColor(this.color)
  }

  this.drawSolid = function(lineStart, side, ctx, dir) {

    if(dir === 'h') {
      ctx.fillRect(0, lineStart, side, this.thickness);
    } else if (dir === 'v') {
      ctx.fillRect(lineStart, 0, this.thickness, side);
    } else {
      alert('critical draw error: improper dir');
    }
  }

  this.drawRightSlash = function(lineStart, side, ctx, dir) {

    const iter = side / this.spacing;

    for(let i = -5; i < iter + 5; i++) {
      let startX;
      let startY;
      let endX;
      let endY;

      if(dir === 'h') {
        startX = this.spacing * i;
        startY = lineStart + this.thickness;
        endX = startX + this.spacing;
        endY = startY - this.thickness;

      } else if(dir === 'v') {
        startX = lineStart;
        startY = this.spacing * (i + 1);
        endX = startX + this.thickness;
        endY = startY - this.spacing;

      } else {
        alert('cirtical draw error: improper ')
      }

      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.returnColor();

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
    }
  }

  this.drawLeftSlash = function(lineStart, side, ctx, dir) {

    const iter = side / this.spacing;

    for(let i = -5; i < iter + 5; i++) {
      let startX;
      let startY;
      let endX;
      let endY;

      if(dir === 'h') {
        startX = this.spacing * i;
        startY = lineStart;
        endX = startX + this.spacing;
        endY = startY + this.thickness;

      } else if(dir === 'v') {
        startX = lineStart;
        startY = this.spacing * i;
        endX = startX + this.thickness;
        endY = startY + this.spacing;

      } else {
        alert('cirtical draw error: improper dir');
      }

      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.returnColor();

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();
    }
  }

  this.drawHorizontalStripes = function(lineStart, side, ctx, dir) {
    var iter;
    var setBack;

    if (dir === 'h') {
       iter = Math.floor(this.thickness / this.spacing);
       setBack = 0;
    } else if (dir === 'v') {
        iter = Math.floor(side / this.spacing) + 5
        setBack = -5;
    } else {
      alert('critical draw error: improper dir');
    }

    for(let i = setBack; i < iter; i++) {
      let startX;
      let startY;
      let endX;
      let endY;

      if(dir === 'h') {
        startX = 0;
        startY = lineStart  + (i * this.spacing);
        endX = side;
        endY = startY;

      } else if(dir === 'v') {
        startX = lineStart;
        startY = this.spacing * i;
        endX = startX + this.thickness;
        endY = startY;

      } else {
        alert('cirtical draw error: improper dir');
      }

      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.returnColor();

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();

    }
  }

  this.drawVerticalStripes = function(lineStart, side, ctx, dir) {
    var iter;
    var setBack;

    if (dir === 'v') {
       iter = Math.floor(this.thickness / this.spacing);
       setBack = 0;
    } else if (dir === 'h') {
        iter = Math.floor(side / this.spacing) + 5
        setBack = -5
    } else {
      alert('cirtical draw error: improper dir');
    }

    for(let i = setBack; i < iter; i++) {
      let startX;
      let startY;
      let endX;
      let endY;

      if(dir === 'v') {
        startX = lineStart  + (i * this.spacing);
        startY = 0;
        endX = startX;
        endY = side;

      } else if(dir === 'h') {
        startX = this.spacing * i;
        startY = lineStart;
        endX = startX;
        endY = startY + this.thickness;

      } else {
        alert('cirtical draw error: improper dir');
      }

      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.returnColor();

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.closePath();

    }
  }

  this.drawChecker = function(lineStart, side, ctx, dir) {

    var topLeft = true;
    var breadth = Math.floor(side / this.spacing);
    var depth = Math.floor(this.thickness / this.spacing);

    console.log(breadth, depth)

    for(let i = 0; i < breadth; i++) {
      if(topLeft) {
        for(let j = 0; j < depth; j += 2) {
          if(dir === 'h') {
            let x = (i * this.spacing);
            let y = (j * this.spacing) + lineStart;
            ctx.fillRect(x, y, this.spacing, this.spacing)
          } else if(dir === 'v') {
            let x = (j * this.spacing) + lineStart;
            let y = (i * this.spacing);
            ctx.fillRect(x,y,this.spacing, this.spacing)
          }
        }
      } else {
        for(let j = 1; j < depth; j += 2) {
          if(dir === 'h') {
            let x = (i * this.spacing);
            let y = (j * this.spacing) + lineStart;
            ctx.fillRect(x, y, this.spacing, this.spacing)
          } else if(dir === 'v') {
            let x = (j * this.spacing) + lineStart;
            let y = (i * this.spacing);
            ctx.fillRect(x,y,this.spacing, this.spacing)
          }
        }
      }
      topLeft = !topLeft;
    }
  }


  this.drawSolid = this.drawSolid.bind(this);
  this.drawRightSlash = this.drawRightSlash.bind(this);
  this.drawLeftSlash = this.drawLeftSlash.bind(this);
  this.drawHorizontalStripes = this.drawHorizontalStripes.bind(this);
  this.drawVerticalStripes = this.drawVerticalStripes.bind(this);
  this.drawChecker = this.drawChecker.bind(this);


  this.drawPatterns = {
    solid: this.drawSolid,
    rightSlash: this.drawRightSlash,
    leftSlash: this.drawLeftSlash,
    horizontalStripes:  this.drawHorizontalStripes,
    verticalStripes: this.drawVerticalStripes,
    checker: this.drawChecker
  }

  this.draw = function(ctx, width, height) {

    if (this.allowDraw()){
      this.createGrid();

      ctx.save();
      ctx.fillStyle = this.returnColor();

      this.drawLines = function(dir, side, ctx) {
        //console.log('side: ' + side);
        //console.log('divisor: ' + (this.regularity + 1));


        const axis = this.grid[dir];

        for(let i = 0; i < axis.length; i++) {

            this.drawPatterns[this.pattern](axis[i], side, ctx, dir);
        }
      }

      this.drawLines = this.drawLines.bind(this)

      if(this.orientation === 'h' || this.orientation === 'b') {
        this.drawLines('h', height, ctx);
      }

      if(this.orientation === 'v' || this.orientation === 'b') {
        this.drawLines('v', width, ctx);
      }

      ctx.restore();
    } else {
      alert('draw averted');
      return 0;
    }


  };
  //this.drawBoundaries = function(ctx, width)
  this.draw = this.draw.bind(this);

}
