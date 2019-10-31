import React from 'react';
import { PlusMinus } from './plusMinus.js';
import { AttrSelect } from './attrSelect.js';

export class PatternPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleLineChange = this.handleLineChange.bind(this);
  }

  handleLineChange(v, a) {
    this.props.handleLineChange(v, a);
  }

  render() {

    const plusWidth = this.props.width / 6;
    const selectWidth = this.props.width / 6;

    return (
      <div className='line-panel'>
        <PlusMinus
          width={plusWidth}
          aspect='spacing'
          handleLineChange={(v, a) => this.handleLineChange(v, a)}
          value={this.props.line.spacing}
          color={this.props.line.returnColor()}
          preventNegative={true}
        />
        <PlusMinus
          width={plusWidth}
          aspect='lineWidth'
          handleLineChange={(v, a) => this.handleLineChange(v, a)}
          value={this.props.line.lineWidth}
          color={this.props.line.returnColor()}
          preventNegative={true}
        />
      </div>
    );
  }
}
