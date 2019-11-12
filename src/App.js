import React from 'react';
import { Canvas } from './canvas.js';
import { TopPanel } from './topPanel.js';
import { line, base } from './objects.js';
import { ButtonPanel } from './buttonPanel.js';
import { TopBar } from './topBar.js';
import { Download } from './download.js';
import { Bind } from './bind.js';
import Intro from './intro.js';
import './App.css';


const root = document.getElementById('root');

class App extends React.Component {
  constructor(props) {
    super(props);

    // Multi-component function binding
    this.switchLine = this.switchLine.bind(this);
    this.handleLineChange = this.handleLineChange.bind(this);
    this.downloadToggle = this.downloadToggle.bind(this);
    this.bindToggle = this.bindToggle.bind(this);
    // Conditional pop-up function binding
    this.introToggle = this.introToggle.bind(this);
    this.handleBind = this.handleBind.bind(this);
    this.handleUnbind = this.handleUnbind.bind(this);
    // TopBar function binding
    this.navToggle = this.navToggle.bind(this);
    // Canvas function binding
    this.setSide = this.setSide.bind(this);
    // ButtonPanel functiong binding
    this.handleAddLine = this.handleAddLine.bind(this);
    this.handleRemoveLine = this.handleRemoveLine.bind(this);
    this.handleCopyLine = this.handleCopyLine.bind(this);
    this.advancedToggle = this.advancedToggle.bind(this);
    // TopPanel function binding
    this.handleColorChange = this.handleColorChange.bind(this);
    // Called in this component
    this.unbind = this.unbind.bind(this);
    this.bind = this.bind.bind(this);

    //const for use throughout
    const rootStyle = getComputedStyle(root);

    this.state = {
      intro: true,
      nav: false,
      download: false,
      bind: false,
      displayAdvanced: false,
      panels: [new base()],
      currentPanel: 0,
      topHandlers: {
        'colorChange': this.handleColorChange,
        'lineChange' : this.handleLineChange,
      },
      buttonHandlers: {
        'switchLine' : this.switchLine,
        'addLine' : this.handleAddLine,
        'removeLine' : this.handleRemoveLine,
        'copyLine' : this.handleCopyLine,
        'advancedToggle' : this.advancedToggle,
        'downloadToggle': this.downloadToggle,
        'bindToggle' : this.bindToggle
      },
      width: parseInt(rootStyle.width),
      height: parseInt(rootStyle.height),
      side: null
    };
  }

  updateStyles() {
    const bkgd = document.getElementById('canvas').toDataURL('image/png');

    document.body.style.backgroundColor = this.state.panels[0].returnColor();
    document.body.style.backgroundImage = 'url(' + bkgd + ')';

    const borderChanges = document.querySelectorAll('.border-change');

    let lineColor = this.state.panels[this.state.currentPanel].returnColor();

    let border;
    for(border of borderChanges) {
      border.style.borderColor = lineColor;
    }
  }

  componentDidMount() {
    const canvasStyle = getComputedStyle(document.getElementById('canvas'));
    this.setState({
      canvasWidth: parseInt(canvasStyle.width),
      canvasHeight: parseInt(canvasStyle.height)
    })

    // styling changes
    this.updateStyles();

  }

  componentDidUpdate() {
    this.updateStyles();
  }

  // FUNCTIONS PASSED TO MULTIPLE COMPONENTS

  switchLine(diff) {
    let currentPanel = this.state.currentPanel + diff;

    if(0 <= currentPanel && currentPanel < this.state.panels.length){
      this.setState({
        currentPanel: currentPanel
      });
    }
  }

  handleLineChange(v, a) {

    // set consts
    const value = v
    const aspect = a
    const lines = this.state.panels;
    const line = lines[this.state.currentPanel];

    // check for unique aspects
    if (aspect.slice(0, 6) === 'offset'){
      line[aspect.slice(0,6)][aspect.slice(7)] = value
    } else if (aspect.slice(-8) === 'boundary'){
      if(aspect.charAt(0) === 'l') {
        if(aspect.charAt(1) === 'e') {
          line[aspect.slice(-8)][aspect.charAt(0)] = value;
        } else {
          line[aspect.slice(-8)].d = value;
        }
      } else {
        line[aspect.slice(-8)][aspect.charAt(0)] = value;
      }
    // base case for nonunique aspects
    }else {
      line[aspect] = value;
    }

    // setState
    this.setState({
      panels: lines
    });
  }

  downloadToggle() {
    this.setState((state) => ({
      download: !(state.download)
    }));
  }

  bindToggle() {

    if(this.state.currentPanel > 0){
      if(this.state.panels.length > 2) {
        this.setState((state) => ({
          bind: !(state.bind)
        }));
      } else {
        alert("Nothing to bind to!")
      }
    } else {
      alert("You can't bind the background!");
    }
  }

  // FUNCTIONS PASSED TO CONDITIONAL POP UP (OVERLAY)

  introToggle() {
    this.setState((state) => ({
      intro: !(state.intro)
    }));
  }

  handleBind(index) {
    const bindor = this.state.panels[index];
    const bindee = this.state.panels[this.state.currentPanel];

    this.bind(bindee, bindor);
  }

  handleUnbind() {
    const bindee = this.state.panels[this.state.currentPanel];

    this.unbind(bindee);

    this.bindToggle();

  }


  // FUNCTIONS PASSED TO TopBar
  navToggle() {
    this.setState((state) => ({
      nav: !(state.nav)
    }));
  }

  // FUNCTIONS PASS TO CANVAS

  setSide(side) {
    this.setState({
      side: side
    })
  }

  // FUNCTIONS PASSED TO BUTTON PANEL

  handleAddLine() {
    const newPanels = this.state.panels;

    newPanels.push(new line(this.state.side, this.state.side, this.state.panels.length));

    this.setState({
      panels: newPanels,
      currentPanel: newPanels.length - 1
    });
  }

  handleRemoveLine() {

    // prevent removing base
    if(this.state.currentPanel > 0) {
      const current = this.state.panels[this.state.currentPanel];
      const newPanels = this.state.panels;
      // check for binding
      if(current.bindees.length > 0 || current.boundTo) {
        //alert('Please unbind before removing')

        // unbind all bound to line to be removed
        if(current.bindees.length > 0) {
          var bindees = current.bindees.slice(0);
          for(var i = 0; i < bindees.length; i++) {
            this.unbind(bindees[i]);
          }
        }
        // unbind line to be removed
        if(current.boundTo) {
          this.unbind(current);
        }
      }

      // remove the line
      newPanels.splice(this.state.currentPanel, 1);

      // fix the indexes
      var i;
      for (i = 1; i < newPanels.length; i++) {
        newPanels[i].index = i;
      }

      var newCurrent = this.state.currentPanel - 1;
      this.setState({
          panels: newPanels,
          currentPanel: newCurrent
        });
    } else {
      alert('Cannot delete the background');
    }
  }

  handleCopyLine() {
    //check we aren't copying the base
    if(this.state.currentPanel > 0) {
      // make consts
      const newPanels = this.state.panels;
      const currentLine = this.state.panels[this.state.currentPanel];
      const copyLine = new line(this.state.side, this.state.side,this.state.panels.length);
      // attributes of lines
      const copyStrings = [['color','hue','sat','light','opacity'], 'height', 'width', 'thickness',
    'regularity', 'orientation', 'pattern', 'spacing', ['offset', 'x', 'y'], 'grid',
    'lineWidth'];

      // copy all attributes
      var attr;
      for(attr of copyStrings) {
        if(Array.isArray(attr)){
          var i;
          for(i = 1; i < attr.length; i++) {
            copyLine[attr[0]][attr[i]] = currentLine[attr[0]][attr[i]];
          }
        } else {
          copyLine[attr] = currentLine[attr];
        }
      }

      // bind if necessary
      if(currentLine.boundTo) {
        this.bind(copyLine, currentLine.boundTo);
      }

      // add to state variables
      newPanels.push(copyLine);
      this.setState({
        currentPanel: newPanels.length - 1,
        panels: newPanels,
      });
    }
  }

  handleColorChange(e) {

    // set vars and consts
    const target = e.target;
    const aspect = target.getAttribute('data-aspect');
    const input = target.value;
    var key = 'panels';
    var value = this.state.panels;
    var color = value[this.state.currentPanel].color;
    color[aspect] = input;

    this.setState({
      [key]: value
    });
  }

  advancedToggle() {
    this.setState((state) => ({
      displayAdvanced: !(state.displayAdvanced)
    }));
  }

  downloadToggle() {
    this.setState((state) => ({
      download: !(state.download)
    }));
  }

  // UNPASSED/ CALLED WITHIN THIS COMPONENT
  bind(bindee, bindor) {
    bindee.boundTo = bindor;
    bindor.bindees.push(bindee);

    // This is the make the line not move when bound
    bindee.offset.x -= bindor.offset.x;
    bindee.offset.y -= bindor.offset.y;
    bindee.boundary.u -= bindor.boundary.u;
    bindee.boundary.d -= bindor.boundary.d;
    bindee.boundary.l -= bindor.boundary.l;
    bindee.boundary.r -= bindor.boundary.r;
  }



  unbind(bindee) {
    const bindor = bindee.boundTo;

    bindee.boundTo = null;

    // remove bindee from bindor's bindees
    var bindeeIndex = bindor.bindees.indexOf(bindee);
    if(bindeeIndex !== -1) {
      bindor.bindees.splice(bindeeIndex, 1);
    }

    // This is the make the line not move when bound
    bindee.offset.x += bindor.offset.x;
    bindee.offset.y += bindor.offset.y;
    bindee.boundary.u += bindor.boundary.u;
    bindee.boundary.d += bindor.boundary.d;
    bindee.boundary.l += bindor.boundary.l;
    bindee.boundary.r += bindor.boundary.r;
  }

  render() {
    // check for and display necessary popups
    var overlay;
    if(this.state.intro){
      overlay = <Intro handleClick={() => this.introToggle()}/>
    } else if(this.state.download) {
      overlay = (
        <Download
          flip={this.downloadToggle}
        />
      )
    } else if(this.state.bind) {
      overlay = (
        <Bind
          flip={this.bindToggle}
          bind={(i) => this.handleBind(i)}
          unbind={() => this.handleUnbind()}
          panels={this.state.panels}
          currentPanel={this.state.currentPanel}
        />
      )
    } else {
      overlay = false;
    }

    return (
      <div id='frame' className='col-12 thick-row'>
        {overlay}
        <TopBar
          nav={this.state.nav}
          flip={this.navToggle}
        />
        <div id='app'>
          <Canvas
            panels={this.state.panels}
            currentPanel={this.state.currentPanel}
            handleClick={this.switchLine}
            setSide={(s) => this.setSide(s)}
          />
          <ButtonPanel
            switchPanel={(d) => this.switchLine(d)}
            handlers={this.state.buttonHandlers}
            display = {this.state.displayAdvanced}
            width={this.props.width}
          />
          <TopPanel
            width={this.state.width}
            height={this.state.height}
            panel={this.state.panels[this.state.currentPanel]}
            currentPanel={this.state.currentPanel}
            handlers={this.state.topHandlers}
            displayAdvanced={this.state.displayAdvanced}
          />
        </div>
      </div>
    )
  }
}

export default App;

/*

*/
