import React from 'react';
import { ColorPanel } from './colorPanel.js';
import { PlusMinus } from './plusMinus.js';
import { AttrSelect } from './attrSelect.js';
import './linePanel.css';

export function BasicPanel(props) {

  const options = [['horizontal', 'h'],
                   ['vertical','v'],
                   ['both', 'b']];

  return (
    <div>
      <ColorPanel
        width={props.width}
        colorSource={props.line}
        currentPanel={props.currentPanel}
        opacity={true}
        handleColorChange={(e) => props.handleColorChange(e)}
      />
      <div id='attribute-panel'>
        <div className='line-panel'>
          <PlusMinus
            aspect='regularity'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.regularity}
            color={props.line.returnColor()}
            preventNegative={true}
          />
          <PlusMinus
            aspect='thickness'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.thickness}
            color={props.line.returnColor()}
            preventNegative={true}
          />
        </div>
        <AttrSelect
          aspect='orientation'
          handleLineChange={(v, a) => props.handleLineChange(v, a)}
          value={props.line.orientation}
          options={options}
        />
      </div>
    </div>
  )
}
