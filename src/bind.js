import React from 'react';
import './bind.css';

export function Bind(props) {

  function handleBind() {
    const radios = document.getElementsByName('lineButtons');
    var i;
    var found = false;
    for (i = 0; i < radios.length; i++) {
      if(radios[i].checked) {
        var value = radios[i].value;
        props.bind(value);
        found = true;
        props.flip();
        break;
      }
    } if(!found) {
      alert('none selected');
    }

  }

  var otherLines = [];
  var count = 1;

  while(count < props.panels.length) {
    if (count !== props.currentPanel) {
      otherLines.push(count);
    }
    count++;
  }


  console.log(otherLines);

  const lineButtons = otherLines.map((line) =>

    <label> {line}
        <input type='radio' name='lineButtons' value={line}
        id={line} key={line}/>
    </label>

  )

  var contents;
  const bound = props.panels[props.currentPanel].boundTo;
  if(!bound){
    contents = (
      <div className='feature-box pop-up no-shadow' id='bind-panel'>
        <h1>Bind</h1>
        <h3>Which line would you like to bind this like too?</h3>
        <div className='radio-options'>
          {lineButtons}
        </div>
        <div className='button-box'>
          <button
            className='option-buttons'
            onClick={handleBind}
          >
            Bind
          </button>
        </div>
      </div>
    )
  } else {
    contents = (
      <div className='feature-box pop-up no-shadow' id='bind-panel'>
        <h1> Unbind this line? </h1>
        <div className='button-box'>
          <button
            className='option-buttons'
            onClick={props.unbind}
          >
            Unbind
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='overlay col-12 narrow-row'>
      <button
        id='bind-close'
        className='close-button'
        onClick={props.flip}
      >
        X
      </button>
      {contents}
    </div>
  )
}
