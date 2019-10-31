import React from 'react';
import { LinePanel } from './linePanel.js';
import { PatternPanel } from './patternPanel.js';
import { AttrSelect } from './attrSelect.js';
import './attributePanel.css';

export class AttributePanel extends React.Component {
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

    var pmbox;
    var select;
    const selectWidth = this.props.width / 6;

    if(this.props.pattern){
      const options = [['solid', 'solid'], ['//', 'rightSlash'],
                      ['\\\\', 'leftSlash'],['=', 'horizontalStripes'],
                      ['||', 'verticalStripes'],['checker', 'checker']];

      pmbox = (
        <PatternPanel
          width={this.props.width}
          line={this.props.line}
          handleLineChange={(v, a) => this.handleLineChange(v, a)}
        />
      )
      select = (
        <AttrSelect
          aspect='pattern'
          handleLineChange={(v, a) => this.handleLineChange(v, a)}
          value={this.props.line.pattern}
          options={options}
        />
      )
    } else {
      const options = [['horizontal', 'h'],
                       ['vertical','v'],
                       ['both', 'b']];
      pmbox = (
        <LinePanel
          width={this.props.width}
          line={this.props.line}
          handleLineChange={(v, a) => this.handleLineChange(v, a)}
        />
      )
      select = (
        <AttrSelect
          aspect='orientation'
          handleLineChange={(v, a) => this.handleLineChange(v, a)}
          value={this.props.line.orientation}
          options={options}
        />
      )
    }

    return (
      <div id='attribute-panel'>
        {pmbox}
        {select}
      </div>
    );

  }
}
