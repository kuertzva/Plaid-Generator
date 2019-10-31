import React from 'react';
import { ColorPanel } from './colorPanel.js';
import { PlusMinus } from './plusMinus.js';
import { AttrSelect } from './attrSelect.js';
import './linePanel.css';

export class BasicPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleLineChange = this.handleLineChange.bind(this);
  }

  handleColorChange(e) {
    this.props.handleColorChange(e);
  }

  handleLineChange(v, a) {
    this.props.handleLineChange(v, a);
  }


  render() {
    const options = [['horizontal', 'h'],
                     ['vertical','v'],
                     ['both', 'b']];

    return (
      <div>
        <ColorPanel
          width={this.props.width}
          colorSource={this.props.line}
          currentPanel={this.props.currentPanel}
          opacity={true}
          handleColorChange={(e) => this.handleColorChange(e)}
        />
        <div id='attribute-panel'>
          <div className='line-panel'>
            <PlusMinus
              aspect='regularity'
              handleLineChange={(v, a) => this.handleLineChange(v, a)}
              value={this.props.line.regularity}
              color={this.props.line.returnColor()}
              preventNegative={true}
            />
            <PlusMinus
              aspect='thickness'
              handleLineChange={(v, a) => this.handleLineChange(v, a)}
              value={this.props.line.thickness}
              color={this.props.line.returnColor()}
              preventNegative={true}
            />
          </div>
          <AttrSelect
            aspect='orientation'
            handleLineChange={(v, a) => this.handleLineChange(v, a)}
            value={this.props.line.orientation}
            options={options}
          />
        </div>
      </div>
    )
  }
}
