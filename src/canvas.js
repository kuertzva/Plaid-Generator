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
    const canvas = document.getElementById('canvas');
    const canvasStyle = getComputedStyle(canvas);
    const borderWidth = canvasStyle.getPropertyValue('border');

    const canvasContainer = document.getElementById('canvas-container');
    const ccStyle = getComputedStyle(canvasContainer);
    const ccWidth = parseInt(ccStyle.width.slice(0, -2));
    const ccHeight = parseInt(ccStyle.height.slice(0, -2));



    if(ccWidth > ccHeight) {
      this.side = ccHeight;
    } else {
      this.side = ccWidth;
    }

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
      (getComputedStyle(canvas, null).getPropertyValue('border-left-width')).slice(0, -2)
    );
    const xOffset = canvas.offsetLeft + borderWidth;
    const yOffset = canvas.offsetTop + borderWidth;
    const coords = {
      v: e.pageX - xOffset,
      h: e.pageY - yOffset
    }

    console.log('type:' + e.type);
    console.log('Coords: ' + coords.v + ',' + coords.h);


    //console.log('Coords: ' + coords.v + ',' + coords.h);

    return coords;
  }

  canvasClick(e) {
    e.preventDefault();

    const coords = this.canvasCoords(e);
    const lines = this.props.panels;

    for (let i  = 1; i < lines.length; i++) {
      let line = lines[i]
      let grid = line.grid;
      let axes;
      if(line.orientation === 'b'){
        axes = ['h', 'v'];
      } else {
        axes = [line.orientation];
      }
      var dir;
      for (dir of axes) {
          let axis = line.grid[dir];
          var tick;
          for (tick of axis) {
            if(coords[dir] > tick &&
            coords[dir] < (tick + line.thickness)) {
              console.log('click registered');
              this.props.handleClick(i - this.props.currentPanel);
              this.priorClick.dir= dir;
              this.priorClick.coords.v = coords.v;
              this.priorClick.coords.h = coords.h;
              this.priorClick.idx = i;
              return true;
            }
          }
      }
    }
    this.props.handleClick(0 - this.props.currentPanel);
    this.priorClick.dir = null;
    this.priorClick.coords.v = 0;
    this.priorClick.coords.h = 0;
    this.priorClick.idx = null;
    return false;
  }
  canvasUnclick(e) {
    e.preventDefault();

    // due to this describing both coordinates and orienations of lines,
    // it uses separate terminonlogy in separate locations. For reference:

    // x = v
    // y = h

    if(this.priorClick.idx === null) {
      return;
    }

    const coords = this.canvasCoords(e);
    const lines = this.props.panels;
    const line = lines[this.priorClick.idx];

    if(this.priorClick.dir === 'h') {
      let offset = coords.h - this.priorClick.coords.h;
      line.offset.y += offset;
    } else if(this.priorClick.dir === 'v') {
      let offset = coords.v - this.priorClick.coords.v;
      line.offset.x += offset;
    }

    this.updateCanvas();

    this.priorClick.dir = null;
    this.priorClick.coords.v = 0;
    this.priorClick.coords.h = 0;
    this.priorClick.idx = null;
  }

  canvasTouchStart(e) {
    e.preventDefault();
    console.clear();
    console.log(e.type);

    console.log(e.changedTouches.length);

    const lines = this.props.panels;
    var touch;

    for(touch of e.changedTouches) {
        console.log(touch);
        const coords = this.canvasCoords(touch);
        for (let i  = 1; i < lines.length; i++) {
        let line = lines[i]
        let grid = line.grid;
        let axes;
        if(line.orientation === 'b'){
          axes = ['h', 'v'];
        } else {
          axes = [line.orientation];
        }
        var dir;
        for (dir of axes) {
            let axis = line.grid[dir];
            var tick;
            for (tick of axis) {
              if(coords[dir] > tick &&
              coords[dir] < (tick + line.thickness)) {
                console.log('click registered');
                this.props.handleClick(i - this.props.currentPanel);
                this.priorClick.dir= dir;
                this.priorClick.coords.v = coords.v;
                this.priorClick.coords.h = coords.h;
                this.priorClick.idx = i;
                return true;
              }
            }
        }
      }
    }

    this.props.handleClick(0 - this.props.currentPanel);
    this.priorClick.dir = null;
    this.priorClick.coords.v = 0;
    this.priorClick.coords.h = 0;
    this.priorClick.idx = null;
    return false;
  }

  canvasTouchMove(e) {
    e.preventDefault();

    if(this.priorClick.idx === null) {
      return;
    }

    console.log('touch move');

    const coords = this.canvasCoords(e.changedTouches[0]);
    const lines = this.props.panels;
    const line = lines[this.priorClick.idx];

    if(this.priorClick.dir === 'h') {
      let offset = coords.h - this.priorClick.coords.h;
      line.offset.y += offset;
    } else if(this.priorClick.dir === 'v') {
      let offset = coords.v - this.priorClick.coords.v;
      line.offset.x += offset;
    }

    this.priorClick.coords.v = coords.v;
    this.priorClick.coords.h = coords.h;

    this.updateCanvas();
  }

  canvasTouchEnd() {
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
          onTouchStart={(e) => this.canvasTouchStart(e)}
          onTouchMove={(e) => this.canvasTouchMove(e)}
          onTouchEnd={(e) => this.canvasTouchEnd(e)}
          onMouseDown={(e) => this.canvasClick(e)}
          onMouseUp={(e) => this.canvasUnclick(e)}
         />
      </div>
    )
  }
}
