import React from 'react';
import { ColorSlider } from './colorSlider.js';
import './colorPanel.css';

export class ColorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(e) {
    this.props.handleColorChange(e);
  }

  render() {

    const color = this.props.colorSource.color;
    const styler = new sliderStyle(color);
    var bottomClass;
    if(this.props.currentPanel < 1){
      bottomClass = 'bottom2';
    } else {
      bottomClass = 'bottom3';
    }

    const hue = (
      <ColorSlider
        key='hue'
        aspect='hue'
        color={color}
        max={360}
        step={1}
        row={'top'}
        handleColorChange={this.handleColorChange}
        style={styler.getStyle('h')}
      />
    )
    const sat = (
      <ColorSlider
        key='sat'
        aspect='sat'
        color={color}
        max={100}
        step={1}
        row={bottomClass}
        handleColorChange={this.handleColorChange}
        style={styler.getStyle('s')}
      />);
    const light = (
      <ColorSlider
        key='light'
        aspect='light'
        color={color}
        max={100}
        step={1}
        row={bottomClass}
        handleColorChange={this.handleColorChange}
        style={styler.getStyle('l')}
      />);
    const opacity = (
      <ColorSlider
        key='opacity'
        aspect='opacity'
        color={color}
        max={1}
        step={.1}
        row={bottomClass}
        handleColorChange={this.handleColorChange}
        style={styler.getStyle('a')}
      />);
    const topRow = hue
    const bottomRow = [sat, light]
    if(this.props.opacity){
      bottomRow.push(opacity);
    }

    return (
      <div id='color-panel'>
        <div className="row">{topRow}</div>
        <div className="row">{bottomRow}</div>
      </div>
    )
  }
}

function sliderStyle(color) {
  this.h = color.hue;
  this.s = color.sat;
  this.l = color.light;
  this.a = color.opacity;

  this.makeString = function(qual) {
    var lin = "linear-gradient(to right, ";
    const stopPoints = ['0%, ','17%, ','33%, ','50%, ','67%, ','83%, ','100%'];
    var left = 'hsla(';
    var right;
    var max;

    if(qual === 'h') {
      right = ', ' + this.s + '%, '+ this.l + '%, ' + this.a + ')';
      max = 360;
    } else if(qual === 's') {
      left += this.h +', ';
      right = '%, ' + this.l + '%, ' + this.a + ')';
      max = 100;
    } else if(qual === 'l') {
      left += this.h +', ' + this.s + '%, ';
      right = '%, ' + this.a + ')';
      max = 100;
    } else if(qual === 'a') {
      left += this.h +', ' + this.s + '%, ' + this.l + '%, ';
      right =')';
      max = 1;
    } else {
      alert('invalid input');
      return 1;
    }

    const inc = max / 6
    var x = 0;
    var point;
    for(point of stopPoints) {
      let hsla = left + x + right + ' ' + point;
      lin += hsla;
      x += inc;
      if(x === max) {
        x = 0;
      }
    }
    lin += ')';

    return lin;
  }

  this.getStyle = function(qual,width) {
    return {
      background: this.makeString(qual)
    };
  }
}
