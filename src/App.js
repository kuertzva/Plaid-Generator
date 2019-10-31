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
    this.handleAddLine = this.handleAddLine.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleLineChange = this.handleLineChange.bind(this);
    this.switchLine = this.switchLine.bind(this);
    this.displayToggle = this.displayToggle.bind(this);
    this.setSide = this.setSide.bind(this);
    this.handleRemoveLine = this.handleRemoveLine.bind(this);
    this.handleCopyLine = this.handleCopyLine.bind(this);
    this.handleBind = this.handleBind.bind(this);
    this.handleUnbind = this.handleUnbind.bind(this);
    this.downloadToggle = this.downloadToggle.bind(this);
    this.navToggle = this.navToggle.bind(this);
    this.bindToggle = this.bindToggle.bind(this);
    const rootStyle = getComputedStyle(root);
    this.state = {
      intro: true,
      nav: false,
      download: false,
      bind: false,
      displayAdvanced: false,
      panels: [new base()],
      currentPanel: 0,
      handlers: {
        'addLine' : this.handleAddLine,
        'colorChange': this.handleColorChange,
        'lineChange' : this.handleLineChange,
        'switchLine' : this.switchLine
      },
      width: parseInt(rootStyle.width),
      height: parseInt(rootStyle.height),
      side: null
    };
  }

  updateStyles() {

    const canvas = document.getElementById('canvas');
    const bkgd = canvas.toDataURL('image/png');

    document.body.style.backgroundImage = 'url(' + bkgd + ')';
    document.body.style.backgroundColor = this.state.panels[0].returnColor();

    //root.style.background = this.state.panels[0].returnColor();

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
    console.log('AppDidMount')
    console.log(this.state.canvasWidth, this.state.canvasHeight);

    // styling changes
    this.updateStyles();

  }

  componentDidUpdate() {
    this.updateStyles();
  }

  setSide(side) {
    this.setState({
      side: side
    })
  }

  switchLine(diff) {
    let currentPanel = this.state.currentPanel + diff;

    if(0 <= currentPanel && currentPanel < this.state.panels.length){
      this.setState({
        currentPanel: currentPanel
      });
    }
  }

  handleAddLine() {
    console.log('add line');
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
      newPanels.splice(this.state.currentPanel, 1);
      var newCurrent = this.state.currentPanel - 1;

      // check for binding
      if(current.bindees.length > 0 || current.boundTo) {
        alert('Please unbind before removing')
      } else {
        this.setState({
          panels: newPanels,
          currentPanel: newCurrent
        });
      }
    } else {
      alert('Cannot delete the background');
    }
  }

  handleCopyLine() {
    console.log('copy line');

    if(this.state.currentPanel > 0) {
      const newPanels = this.state.panels;
      const currentLine = this.state.panels[this.state.currentPanel];
      const copyLine = new line(this.state.side, this.state.side,this.state.panels.length);

      const copyStrings = [['color','hue','sat','light','opacity'], 'height', 'width', 'thickness',
    'regularity', 'orientation', 'pattern', 'spacing', ['offset', 'x', 'y'], 'grid',
    'lineWidth', 'boundTo'];

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


      newPanels.push(copyLine);
      this.setState({
        currentPanel: newPanels.length - 1,
        panels: newPanels,
      });
    }
  }

  handleDownload(e) {
    const target = e.target;
    const canvas = document.getElementById('canvas');
    const image = canvas.toDataURL('image/jpeg');

    target.href = image;
  }

  handleColorChange(e) {
    const target = e.target;
    const aspect = target.getAttribute('data-aspect');
    const input = target.value;
    var key;
    var value;
    var color;


    key = 'panels';
    value = this.state.panels;
    color = value[this.state.currentPanel].color;


    //alert(input, this.state.base.color.hue)
    color[aspect] = input;

    this.setState({
      [key]: value
    });
  }

  handleLineChange(v, a) {

    const value = v
    const aspect = a
    const lines = this.state.panels;
    const line = lines[this.state.currentPanel];

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
    }else {
      line[aspect] = value;
    }

    this.setState({
      panels: lines
    });
  }

  handleBind(index) {
    const bindor = this.state.panels[index];
    const bindee = this.state.panels[this.state.currentPanel];

    bindee.boundTo = bindor;
    bindor.bindees.push(bindee);

  }

  handleUnbind() {
    const bindee = this.state.panels[this.state.currentPanel];
    const bindor = bindee.boundTo;

    bindee.boundTo = null;

    var bindeeIndex = bindor.bindees.indexOf(bindee);
    if(bindeeIndex !== -1) {
      bindor.bindees.splice(bindeeIndex, 1);
    }

    this.bindToggle();

  }

  introToggle() {
    this.setState((state) => ({
      intro: !(state.intro)
    }));
  }

  navToggle() {
    this.setState((state) => ({
      nav: !(state.nav)
    }));
  }

  displayToggle() {
    this.setState((state) => ({
      displayAdvanced: !(state.displayAdvanced)
    }));
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

  render() {
    const canvasHeight = 300;
    var overlay;
    if(this.state.intro){
      overlay = <Intro handleClick={() => this.introToggle()}/>
    } else if(this.state.download){
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
    }else {
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
            handleAddLine={() => this.handleAddLine()}
            handleRemoveLine={() => this.handleRemoveLine()}
            handleCopyLine={() => this.handleCopyLine()}
            handleDownload={() => this.downloadToggle()}
            handleBind={() => this.bindToggle()}
            handleDisplay={() => this.displayToggle()}
            display = {this.state.displayAdvanced}
            width={this.props.width}
          />
          <TopPanel
            width={this.state.width}
            height={this.state.height}
            panel={this.state.panels[this.state.currentPanel]}
            currentPanel={this.state.currentPanel}
            handlers={this.state.handlers}
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
