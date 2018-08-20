import React, { Component } from 'react';
import './App.css';

import Board, { players as gamePlayers } from './containers/Board.js'
import MessagePane from './containers/MessagePane.js';
import AiManager from './model/AiManager';

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
    this.board = React.createRef();
    this.aiManager = null;
  }

  setMessage(newMessage) {
    this.setState({ message: newMessage });
  }

  componentDidMount() {
    console.log(this.board.current.boardPieceManager);
    this.aiManager = new AiManager(this.board.current);
  }

  render() {
    let { message } = this.state;

    return (
      <div className="App">
        <p className="App-intro">
          Fox vs Hounds
        </p>
        <MessagePane message={ message } />
        <Board { ...settings } setMessage={ this.setMessage.bind(this) } ref={this.board} />
      </div>
    );
  }
}

export default App;
