import React from 'react';
import { PlusMinus } from './plusMinus.js';
import './linePanel.css';

export class LinePanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleLineChange = this.handleLineChange.bind(this);
  }

  handleLineChange(v, a) {
    this.props.handleLineChange(v, a);
  }

  render() {

    const plusWidth = this.props.width / 6;

    return (

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
        <PlusMinus
          aspect='offset-x'
          handleLineChange={(v, a) => this.handleLineChange(v, a)}
          value={this.props.line.offset.x}
          color={this.props.line.returnColor()}
          preventNegative={false}
        />
        <PlusMinus
          aspect='offset-y'
          handleLineChange={(v, a) => this.handleLineChange(v, a)}
          value={this.props.line.offset.y}
          color={this.props.line.returnColor()}
          preventNegative={false}
        />
      </div>
    );
  }
}
