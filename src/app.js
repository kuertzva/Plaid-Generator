import React from 'react';
import ReactDOM from 'react-dom';
import { canvas } from '/canvas.js';
import { base, line } from './objects.js';

const root = document.getElementById('root')

class AllContainer extends React.Component {
  constructor(props) {
    super(props);
    const background = new base('black')
    this.state = {
      width: root.offsetWidth,
      height: 300;
      base: background,
      lines: []
    }

  render() {
    return (
      <div>
        <Canvas
          width={this.state.width}
          height={this.state.height}
          base={this.state.base}
          lines={this.state.lines}
        />
        <p>
          "I'm a pretty little piggy"
        </p>
      </div>
    )
  }
}

ReactDOM.render(
  <AllContainer />,
  document.getElementById('root');
);
