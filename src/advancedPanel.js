import React from 'react';
import { ColorPanel } from './colorPanel.js';
import { PlusMinus } from './plusMinus.js';
import { AttrSelect } from './attrSelect.js';
import './topPanel.css';

export class AdvancedPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleLineChange = this.handleLineChange.bind(this);
  }

  handleLineChange(v, a) {
    this.props.handleLineChange(v, a);
  }

  render() {

    const options = [['solid', 'solid'], ['//', 'rightSlash'],
                    ['\\\\', 'leftSlash'],['=', 'horizontalStripes'],
                    ['||', 'verticalStripes'],['checker', 'checker']];

    return (
      <div>
        <div id='attribute-panel'>
          <div className='line-panel'>
            <PlusMinus
              aspect='spacing'
              handleLineChange={(v, a) => this.handleLineChange(v, a)}
              value={this.props.line.spacing}
              color={this.props.line.returnColor()}
              preventNegative={true}
            />
            <PlusMinus
              aspect='lineWidth'
              handleLineChange={(v, a) => this.handleLineChange(v, a)}
              value={this.props.line.lineWidth}
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
            <PlusMinus
              aspect='upper-boundary'
              handleLineChange={(v, a) => this.handleLineChange(v, a)}
              value={this.props.line.boundary.u}
              color={this.props.line.returnColor()}
              preventNegative={false}
            />
            <PlusMinus
              aspect='lower-boundary'
              handleLineChange={(v, a) => this.handleLineChange(v, a)}
              value={this.props.line.boundary.d}
              color={this.props.line.returnColor()}
              preventNegative={false}
            />
            <PlusMinus
              aspect='left-boundary'
              handleLineChange={(v, a) => this.handleLineChange(v, a)}
              value={this.props.line.boundary.l}
              color={this.props.line.returnColor()}
              preventNegative={false}
            />
            <PlusMinus
              aspect='right-boundary'
              handleLineChange={(v, a) => this.handleLineChange(v, a)}
              value={this.props.line.boundary.r}
              color={this.props.line.returnColor()}
              preventNegative={false}
            />
          </div>
          <AttrSelect
            aspect='pattern'
            handleLineChange={(v, a) => this.handleLineChange(v, a)}
            value={this.props.line.orientation}
            options={options}
          />
        </div>
      </div>
    )
  }
}
