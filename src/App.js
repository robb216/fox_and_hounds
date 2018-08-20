import React, { Component } from 'react';
import './App.css';

import Board from './containers/Board.js'
import MessagePane from './containers/MessagePane.js';
import SettingsPane from './containers/SettingsPane.js';
import AiManager from './model/AiManager';

const initialSettings = {
  boardSize: 8,
  houndsQuantity: 4,
  foxStartPosition: 4,
  startAsFox: true,
  enableAi: false,
  aiDelay: 100,
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
  }

  setMessage(newMessage) {
    this.setState({ message: newMessage });
  }

  componentDidMount() {
    console.log(this.board.current.boardPieceManager);
    this.aiManager = new AiManager(this.board.current);
  }

  onSettingsChange(newSettings) {
    console.log(newSettings)
    this.setState({ settings: newSettings });
  }

  render() {
    let { message, settings } = this.state;
    let boardSettings = settings ? { ...settings } : initialSettings

    return (
      <div className="App">
        <p className="App-intro">
          Fox vs Hounds
          { JSON.stringify(boardSettings) }
        </p>
        <MessagePane message={ message } />
        <Board { ...boardSettings } setMessage={ this.setMessage.bind(this) } ref={this.board} />
        <SettingsPane onSettingsChange={ this.onSettingsChange } initialSettings={ initialSettings } />
      </div>
    );
  }
}

export default App;
