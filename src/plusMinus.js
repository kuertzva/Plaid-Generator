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

    console.log('inputChange for ' + this.props.aspect);
    console.log('value: ' + value);

    if(value === '') {
      this.props.handleLineChange(value, aspect);
    }
    // scrub for invalid chars
    var i;
    for(i = 0; i < value.length; i++) {
      var char = value.charAt(i);
      //console.log('char: ' + char);
      //console.log(allowed_chars.indexOf(char))
      if(allowed_chars.indexOf(char) >= 0) {
        //console.log('allowed')
        endValue += char;
      }
    }

    console.log('endValue: ' + endValue);

    if(isNaN(parseInt(endValue))) {
      console.log('sent string');
      this.props.handleLineChange(endValue, aspect);
    } else {
      console.log('sent num');
      this.props.handleLineChange(parseInt(endValue), aspect);
    }
  }

  readValue(value) {

    console.log('readValue for ' + this.props.aspect);
    console.log('value: ' + value);

    // allow line to be cleared
    if(value === '' || value === '-'){
      return value;
    // further scrub out NaNs
    } else if(isNaN(value)) {
      return 0;
    // default
    } else {
      return value;
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
            value={this.readValue(this.props.value)}
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
