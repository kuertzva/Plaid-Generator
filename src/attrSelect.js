import React from 'react';
import { makeHeader } from './helpers.js';
import './attrSelect.css'

export class AttrSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleLineChange = this.handleLineChange.bind(this);
  }

  handleLineChange(e) {
    const target = e.target;
    const value = target.value;
    const aspect = target.getAttribute('data-aspect');


    this.props.handleLineChange(value, aspect);
  }

  render() {

    const header = makeHeader(this.props.aspect);


    return (
      <div id='selectContainer'>
        <h5>
          {header}
        </h5>
        <select
          size={this.props.options.length}
          value={this.props.value}
          onChange={(e) => this.handleLineChange(e)}
          data-aspect={this.props.aspect}
          className='pm-select border-change'
        >
        {this.props.options.map(value => <option key={value[1]} value={value[1]}>{value[0]}</option>) }
        </select>
      </div>
    )
  }
}
