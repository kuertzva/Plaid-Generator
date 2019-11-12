import React from 'react';
import { ColorPanel } from './colorPanel.js';
import { PlusMinus } from './plusMinus.js';
import { AttrSelect } from './attrSelect.js';
import './topPanel.css';

export function AdvancedPanel(props){

  const options = [['solid', 'solid'], ['//', 'rightSlash'],
                  ['\\\\', 'leftSlash'],['=', 'horizontalStripes'],
                  ['||', 'verticalStripes'],['checker', 'checker']];

  return (
    <div>
      <div id='attribute-panel'>
        <div className='line-panel'>
          <PlusMinus
            aspect='spacing'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.spacing}
            color={props.line.returnColor()}
            preventNegative={true}
          />
          <PlusMinus
            aspect='lineWidth'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.lineWidth}
            color={props.line.returnColor()}
            preventNegative={true}
          />
          <PlusMinus
            aspect='offset-x'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.offset.x}
            color={props.line.returnColor()}
            preventNegative={false}
          />
          <PlusMinus
            aspect='offset-y'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.offset.y}
            color={props.line.returnColor()}
            preventNegative={false}
          />
          <PlusMinus
            aspect='upper-boundary'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.boundary.u}
            color={props.line.returnColor()}
            preventNegative={false}
          />
          <PlusMinus
            aspect='lower-boundary'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.boundary.d}
            color={props.line.returnColor()}
            preventNegative={false}
          />
          <PlusMinus
            aspect='left-boundary'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.boundary.l}
            color={props.line.returnColor()}
            preventNegative={false}
          />
          <PlusMinus
            aspect='right-boundary'
            handleLineChange={(v, a) => props.handleLineChange(v, a)}
            value={props.line.boundary.r}
            color={props.line.returnColor()}
            preventNegative={false}
          />
        </div>
        <AttrSelect
          aspect='pattern'
          handleLineChange={(v, a) => props.handleLineChange(v, a)}
          value={props.line.orientation}
          options={options}
        />
      </div>
    </div>
  )
}
