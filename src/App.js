import React, { Component } from 'react';
import './App.css';

import Board, { players as gamePlayers } from './containers/Board.js'
import MessagePane from './containers/MessagePane.js';

const settings = {
  boardSize: 8,
  houndsQuantity: 4,
  foxStartPosition: 4,
  startingPlayer: gamePlayers.PLAYER_FOX,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  setMessage(newMessage) {
    this.setState({ message: newMessage });
  }

  render() {
    let { message } = this.state;

    return (
      <div className="App">
        <p className="App-intro">
          Fox vs Hounds
        </p>
        <MessagePane message={ message } />
        <Board { ...settings } setMessage={ this.setMessage.bind(this) } />
      </div>
    );
  }
}

export default App;
