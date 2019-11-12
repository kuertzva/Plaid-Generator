import React from 'react';
import './buttonPanel.css';

export function ButtonPanel(props) {

  function switchPanel(e) {
    let diff = parseInt(e.target.value)

    props.handlers['switchLine'](diff);
  }


  function underConstruction() {
    alert('this feature is under production');
  }

  var toggleText;

  if(props.displayAdvance) {
    toggleText = "Basic";
  } else {
    toggleText = "Advanced";
  }

  return (
    <div id='button-panel'>
      <button
        onClick={switchPanel}
        value = {-1}
        id='back'
      >
        {'<<'}
      </button>
      <button
        onClick={props.handlers['addLine']}
        id='add'
      >
        Add
      </button>
      <button
        onClick={props.handlers['removeLine']}
        id='remove'
      >
        Remove
      </button>
      <button
        onClick={props.handlers['copyLine']}
        id='copy'
      >
        Copy
      </button>
      <button
        onClick={props.handlers['advancedToggle']}
      >
        {toggleText}
      </button>
      <button
        onClick={props.handlers['downloadToggle']}
        id='download'
      >
        Download
      </button>
      <button
        onClick={props.handlers['bindToggle']}
        id='bind'
      >
        Bind
      </button>
      <button
        onClick={switchPanel}
        value = {1}
        id='forward'
      >
        {'>>'}
      </button>
    </div>
  )
}
