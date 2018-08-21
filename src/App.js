import React, { Component } from 'react';
import './App.css';

import Board from './containers/Board.js'
import MessagePane from './containers/MessagePane.js';
import SettingsPane from './containers/SettingsPane.js';
import AiManager from './model/AiManager';

const initialSettings = {
  boardSize: 6,
  houndsQuantity: 3,
  foxStartPosition: 4,
  startAsFox: true,
  enableAi: false,
  aiDelay: 300,
  aiTreeDepth: 3,
  shouldGenerateTree: false,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      settings: null,
    };
    this.board = React.createRef();
    this.aiManager = null;

    this.onSettingsChange = this.onSettingsChange.bind(this);
    this.doSingleAiStep = this.doSingleAiStep.bind(this);
  }

  setMessage(newMessage) {
    this.setState({ message: newMessage });
  }

  componentDidMount() {
    this.aiManager = new AiManager(this.board.current, initialSettings);
  }

  onSettingsChange(newSettings) {
    this.setState({ settings: newSettings }, () => this.aiManager.updateSettings(this.state.settings));
  }

  doSingleAiStep() {
    this.aiManager.aiCycle();
  }

  render() {
    let { message, settings } = this.state;
    let boardSettings = settings ? { ...settings } : initialSettings

    return (
      <div className="App">
        <p className="App-intro">
          Fox vs Hounds
        </p>
        <MessagePane message={ message } />
        <Board { ...boardSettings } setMessage={ this.setMessage.bind(this) } ref={this.board} />
        <SettingsPane onSettingsChange={ this.onSettingsChange } initialSettings={ initialSettings } doSingleAiStep={ this.doSingleAiStep } />
      </div>
    );
  }
}

export default App;
