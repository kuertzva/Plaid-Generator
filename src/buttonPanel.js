import React from 'react';
import './buttonPanel.css';

export function ButtonPanel(props) {

  function switchPanel(e) {
    let diff = parseInt(e.target.value)

    props.switchPanel(diff);
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
        onClick={props.handleAddLine}
        id='add'
      >
        Add
      </button>
      <button
        onClick={props.handleRemoveLine}
        id='remove'
      >
        Remove
      </button>
      <button
        onClick={props.handleCopyLine}
        id='copy'
      >
        Copy
      </button>
      <button
        onClick={props.handleDisplay}
      >
        {toggleText}
      </button>
      <button
        onClick={props.handleDownload}
        id='download'
      >
        Download
      </button>
      <button
        onClick={props.handleBind}
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
