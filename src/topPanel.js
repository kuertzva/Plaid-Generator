import React from 'react';
import { ColorPanel } from './colorPanel.js';
import { BasicPanel } from './basicPanel.js';
import { AdvancedPanel } from './advancedPanel.js';
import './topPanel.css';

export class TopPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddLine = this.handleAddLine.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.switchLine = this.switchLine.bind(this);
  }

  handleAddLine() {
    console.log('pass topPanel')
    const addHandler = this.props.handlers['addLine'];

    addHandler();
  }

  handleColorChange(e) {
    const colorChanger = this.props.handlers['colorChange'];

    colorChanger(e);
  }

  handleLineChange(v, a) {
    const lineChanger = this.props.handlers['lineChange'];

    lineChanger(v, a);
  }

  switchLine(diff) {
    const switchHandler = this.props.handlers['switchLine'];

    switchHandler(diff);
  }

  render() {
    var displayPanel;
    var header

    if(this.props.currentPanel === 0) {
      header = 'Base';
      displayPanel = (
      <div id='top-panel'>
        <h4
          style={{color: this.props.panel.returnColor()}}
        >
          {header}
        </h4>
        <ColorPanel
          width={this.props.width}
          currentPanel={this.props.currentPanel}
          colorSource={this.props.panel}
          handleColorChange={(e) => this.handleColorChange(e)}
        />
      </div>
      )
    } else {
      header = "Line " + this.props.currentPanel;
      if(this.props.panel.boundTo) {
        header += ' (bound to ' + this.props.panel.boundTo.index + ')'
      }
      if(this.props.panel.bindees.length > 0) {
        header += ' binds '
        const bindees  = this.props.panel.bindees.sort();
        var i;
        for (i = 0; i < bindees.length; i++) {
          var b = bindees[i].index;
          if(i === 0) {
            header += b;
          } else if(i < (bindees.length - 1)) {
            header += ', ' + b;
          } else {
            header += ' & ' + b;
          }
        }
      }

      var attributes;

      if (this.props.displayAdvanced) {
        attributes = (
          <AdvancedPanel
            handleLineChange={(v, a) => this.handleLineChange(v, a)}
            line={this.props.panel}
            currentPanel={this.props.currentPanel}
          />
        )
      } else {
        attributes = (
          <BasicPanel
            handleColorChange={(e) => this.handleColorChange(e)}
            handleLineChange={(v, a) => this.handleLineChange(v, a)}
            line={this.props.panel}
            currentPanel={this.props.currentPanel}
          />
        )
      }

      displayPanel = (
      <div id='top-panel'>
        <h4
          style={{color: this.props.panel.returnColor()}}
        >
          {header}
        </h4>
        {attributes}
      </div>
      )
    }

    return displayPanel;
  }
}


/*
<ColorPanel
  colorSource={this.props.panel}
  currentPanel={this.props.currentPanel}
  opacity={true}
  handleColorChange={(e) => this.handleColorChange(e)}
/>
<AttributePanel
  width={this.props.width}
  handleColorChange={(e) => this.handleColorChange(e)}
  handleLineChange={(v, a) => this.handleLineChange(v, a)}
  line={this.props.panel}
  currentPanel={this.props.currentPanel}
  pattern={this.props.displayPattern}
/>
*/
