import React from 'react';
import './canvas.css';

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.side = null;
    this.priorClick = {
      coords: {
        v: 0,
        h: 0
      },
      idx: null,
      dir: null
    }
  }

  componentDidMount() {
    const ccStyle = getComputedStyle(
      document.getElementById('canvas-container'));
    const ccWidth = parseInt(ccStyle.width.slice(0, -2));
    const ccHeight = parseInt(ccStyle.height.slice(0, -2));
    const borderWidth = parseInt(
      (getComputedStyle(
        document.getElementById('canvas'), null).getPropertyValue(
          'border-left-width')).slice(0, -2)
    );

    if(ccWidth > ccHeight) {
      this.side = ccHeight;
    } else {
      this.side = ccWidth;
    }

    this.side -= borderWidth * 2;

    this.props.setSide(this.side);

    this.updateCanvas();
  }

  // may be unnecessary
  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    const panels = this.props.panels;

    for(var i = 0; i < panels.length; i++) {
      panels[i].draw(ctx, this.side, this.side);
    }
  }

  canvasCoords(e) {
    const canvas = e.target;
    const borderWidth = parseInt(
      (getComputedStyle(
        canvas, null).getPropertyValue('border-left-width')).slice(0, -2)
    );
    const coords = {
      v: e.pageX - (canvas.offsetLeft + borderWidth),
      h: e.pageY - (canvas.offsetTop + borderWidth)
    }

    return coords;
  }

  canvasStart(e) {
    e.preventDefault();
    console.log('start')

    // account for click or touch
    var coords;
    if(e.type === 'touchstart') {
      coords = this.canvasCoords(e.changedTouches[0])
    } else {
      coords = this.canvasCoords(e);
    }

    // reusable function to search for line clicks on an axis
    function iterTicks(axis, dir) {
      if(axis.length < 1) {
        return false
      }
      // check each tick in line to see if in handleColorChange
      var tick;
      for (tick of axis) {
        if(coords[dir] > tick &&
        coords[dir] < (tick + line.thickness)) {
          // change priorClick attributes that can be handled in function
          this.priorClick.dir= dir;
          this.priorClick.coords.v = coords.v;
          this.priorClick.coords.h = coords.h;
          return true;
        }
      }
      return false;
    }
    iterTicks = iterTicks.bind(this)

    // find if any of the lines were clicked
    var line
    for (line of this.props.panels.slice(1)) {
      // run iterTicks in each direction
      if(iterTicks(line.grid.h, 'h') || iterTicks(line.grid.v, 'v')) {
        // change remaining priorClick attributes
        this.props.handleClick(line.index - this.props.currentPanel);
        this.priorClick.idx = line.index;
        return true
      }
    }
    // default priorClick attributes
    this.props.handleClick(0 - this.props.currentPanel);
    this.priorClick.dir = null;
    this.priorClick.coords.v = 0;
    this.priorClick.coords.h = 0;
    this.priorClick.idx = null;
    return false;
  }

  canvasMove(e) {
    e.preventDefault();
    console.log('move')

    // make sure there was a prior click
    if(this.priorClick.idx === null) {
      return;
    }

    // check for touch and get coords
    var coords;
    if(e.type === 'touchmove'){
      coords= this.canvasCoords(e.changedTouches[0]);
    } else {
      coords = this.canvasCoords(e)
    }
    const lines = this.props.panels;
    const line = lines[this.priorClick.idx];

    //adjust offset
    if(this.priorClick.dir === 'h') {
      let offset = coords.h - this.priorClick.coords.h;
      line.offset.y += offset;
    } else if(this.priorClick.dir === 'v') {
      let offset = coords.v - this.priorClick.coords.v;
      line.offset.x += offset;
    }

    //record coords
    this.priorClick.coords.v = coords.v;
    this.priorClick.coords.h = coords.h;

    this.updateCanvas();
  }

  canvasEnd(e) {
    e.preventDefault();
    console.log('end')

    this.updateCanvas();

    this.priorClick.dir = null;
    this.priorClick.coords.v = 0;
    this.priorClick.coords.h = 0;
    this.priorClick.idx = null;
  }

  render() {
    return (
      <div id='canvas-container'>
        <canvas
          ref='canvas'
          id='canvas'
          width={this.side}
          height={this.side}
          onTouchStart={(e) => this.canvasStart(e)}
          onTouchMove={(e) => this.canvasMove(e)}
          onTouchEnd={(e) => this.canvasEnd(e)}
          onMouseDown={(e) => this.canvasStart(e)}
          onMouseMove={(e) => this.canvasMove(e)}
          onMouseUp={(e) => this.canvasEnd(e)}
        />
      </div>
    )
  }
}
