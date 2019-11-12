import React from 'react';
import { makeHeader } from './helpers.js';
import './plusMinus.css';

export class PlusMinus extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef()
  }


  buttonChange(e) {
    const input = this.input.current

    var inc = parseInt(e.target.getAttribute('data-change'));
    var oldVar = parseInt(input.value);
    if(this.props.preventNegative) {
      if(oldVar > 1 || inc > 0) {
        input.value = inc + oldVar;
      }
    } else {
      input.value = inc + oldVar;
    }

    const aspect = input.getAttribute('data-aspect');
    this.props.handleLineChange(parseInt(input.value), aspect);
  }

  inputChange(e) {
    const input = e.target;
    const value = input.value;
    const aspect = input.getAttribute('data-aspect');
    const allowed_chars = ['0','1','2','3','4','5','6','7','8','9'];
    if(!this.props.preventNegative) {
      allowed_chars.push('-');
    }
    var endValue = ''

    if(value === '') {
      this.props.handleLineChange(value, aspect);
    }
    // scrub for invalid chars
    var i;
    for(i = 0; i < value.length; i++) {
      var char = value.charAt(i);
      if(allowed_chars.indexOf(char) >= 0) {
        endValue += char;
      }
    }

    if(isNaN(parseInt(endValue))) {
      this.props.handleLineChange(endValue, aspect);
    } else {
      this.props.handleLineChange(parseInt(endValue), aspect);
    }
  }

  render() {

    const header = makeHeader(this.props.aspect);
    const third = this.props.width / 4;

    return (
      <div className='pm-container'>
        <h5>
          {header}
        </h5>
        <div className='pm-bundle'>
          <button
            onClick={(e) => this.buttonChange(e)}
            data-change='-1'
            className='pmButtons border-change'
          >
            -
          </button>
          <input
            type='text'
            onChange={(e) => this.inputChange(e)}
            value={this.props.value}
            data-aspect={this.props.aspect}
            ref={this.input}
            className='pm-input'
          />
          <button
            onClick={(e) => this.buttonChange(e)}
            data-change='1'
            className='pmButtons border-change'
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
