import React from 'react';
import { makeHeader } from './helpers.js';
import './colorSlider.css';

export function ColorSlider(props) {

  return (
    <div className={props.row}>
      <h5>
        {makeHeader(props.aspect)}
      </h5>
      <input
        type='range'
        className='color-slider'
        min={0}
        max={props.max}
        step={props.step}
        value={props.color[props.aspect]}
        data-aspect = {props.aspect}
        style={props.style}
        onChange={(e) => props.handleColorChange(e)}
      />
    </div>
  )
}
