import React from 'react';
import { ColorPanel } from './colorPanel.js'

export class BasePanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(e) {

    this.props.handleColorChange(e);
  }

  render() {

    return (
      <div className='full-width'>
        <ColorPanel
          width={this.props.width}
          currentPanel={this.props.currentPanel}
          colorSource={this.props.base}
          handleColorChange={(e) => this.handleColorChange(e)}
        />
      </div>
    )
  }
}
