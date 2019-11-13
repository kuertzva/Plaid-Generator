import React from 'react';
import { makeHeader } from './helpers.js';
import './attrSelect.css'

export function AttrSelect(props) {

  function handleLineChange(e) {
    const target = e.target;
    const value = target.value;
    const aspect = target.getAttribute('data-aspect');

    props.handleLineChange(value, aspect);
  }

  const header = makeHeader(props.aspect);


  return (
    <div id='selectContainer'>
      <h5>
        {header}
      </h5>
      <select
        size={props.options.length}
        value={props.value}
        onChange={(e) => handleLineChange(e)}
        data-aspect={props.aspect}
        className='pm-select border-change'
      >
        {props.options.map(value => <option key={value[1]} value={value[1]}>{value[0]}</option>) }
      </select>
    </div>
  )
}
