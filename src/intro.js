import React from 'react';
import './intro.css';

function Intro(props) {
  return (
    <div id='outer-intro' className='overlay col-24 narrow-row'>
      <div id='inner-intro' className='pop-up no-shadow'>
        <div id='intro-text'>
          <h1> Welcome! </h1>
          <h2> This is my Plaid Maker</h2>
          <p>
            Please check it out and see what you can make. This is still a work
            in progress. Features may still be a little buggy and more features are
            on the way.
          </p>
          <p>
            You can navigate away from this page using the link at the top left.
          </p>
          <h2> How this works</h2>
          <p>
            This project consists of a base object and a series of line objects
            which are drawn on a canvas html element. The base is the background
            you draw the lines against. We'll start there.
          </p>
          <h3>Base</h3>
          <p>
            For now, this is pretty simple. All the base has is a color, which
            is defined by its hue, saturation and lightness. Now lets get to lines.
          </p>
          <h3>Lines</h3>
          <p>
            Lines also have a color, but this also has an opacity that give the
            line the possibility of being transparent. Lines can go up, down or
            both and I refer to this as the lines orientation. A line will repeat
            a number of times on each relevant axis and this is called the lines
            regularity. The lines can be moved along there axis using the offset.
            Clicking a draging a line can be used to chang eoffset, though I'm
            still working on making this consistent.
          </p>
          <p>
            Lines can be changed to display as a number of patterns that can be
            modified when relevant. This is accessed by clicking the pattern
            button. You can switch lines with the buttons on the edges of the
            patterns or by clicking them in the canvas (again, not completely
            smooth.
          </p>
          <p>
            Lines can be added, removed or copied. The bind button, when
            implemented, will make 2 lines regularity and offset dependent on one
            another to create more intricate patterns. The download button will
            allow you to download your pattern as an image.
          </p>
          <p>
            Have fun!
          </p>
        </div>
        <div id='intro-button-container'>
          <button onClick={props.handleClick}>
            Plaid Time!
          </button>
        </div>
      </div>
    </div>
  )
}

export default Intro;
