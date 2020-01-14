import React from 'react';
import './topBar.css';

export function TopBar(props) {
  var display;

  if(props.nav) {
    display = (
      <div id='nav-bar' class='col-12'>
        <button
          id='nav-bar-close'
          class='close-button'
          onClick={props.flip}
        >
          X
        </button>
        <div id='inner-nav'>
          <a class='link-block' href='https://vkwebsite.herokuapp.com/'>Homepage</a>
          <a class='link-block' href='https://vkplaid.herokuapp.com/' id='active'>Plaid Maker</a>
          <a class='link-block' href='https://vkep-picker.herokuapp.com/'>Episode Picker</a>
          <p class='hidden link-block' id='placeholder'></p>
        </div>
      </div>
    )
  } else {
    display = (
      <div id='top-bar'>
        <button
          id='nav-bar-open'
          onClick={props.flip}
        >Nav Bar</button>
        <a
          href='https://github.com/kuertzva/Plaid-Generator'
          id='github-link'
        >Github</a>
      </div>
    )
  }

  return display;
}

// export default TopBar;
