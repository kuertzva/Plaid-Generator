import React from 'react';
import { ColorPanel } from './colorPanel.js';
import { BasicPanel } from './basicPanel.js';
import { AdvancedPanel } from './advancedPanel.js';
import './topPanel.css';

export function TopPanel(props) {

  var displayPanel;
  var header

  if(props.currentPanel === 0) {
    header = 'Base';
    displayPanel = (
    <div id='top-panel'>
      <h4
        style={{color: props.panel.returnColor()}}
      >
        {header}
      </h4>
      <ColorPanel
        currentPanel={props.currentPanel}
        colorSource={props.panel}
        handleColorChange={(e) => props.handlers['colorChange'](e)}
      />
    </div>
    )
  } else {
    header = "Line " + props.currentPanel;
    if(props.panel.boundTo) {
      header += ' (bound to ' + props.panel.boundTo.index + ')'
    }
    if(props.panel.bindees.length > 0) {
      header += ' binds '
      const bindees  = props.panel.bindees.sort();
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

    if (props.displayAdvanced) {
      attributes = (
        <AdvancedPanel
          handleLineChange={(v, a) => props.handlers['lineChange'](v, a)}
          line={props.panel}
          currentPanel={props.currentPanel}
        />
      )
    } else {
      attributes = (
        <BasicPanel
          handleColorChange={(e) => props.handlers['colorChange'](e)}
          handleLineChange={(v, a) => props.handlers['lineChange'](v, a)}
          line={props.panel}
          currentPanel={props.currentPanel}
        />
      )
    }

    displayPanel = (
      <div id='top-panel'>
        <h4
          style={{color: props.panel.returnColor()}}
        >
          {header}
        </h4>
        {attributes}
      </div>
      )
    }

  return displayPanel;
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
