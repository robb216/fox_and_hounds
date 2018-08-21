import React, { Component } from 'react';

import Coordinate from "../model/Coordinate";

import BoardSpace, { types as boardSpaceTypes } from './BoardSpace.js';
import { types as boardPieceTypes } from '../model/BoardPiece.js';
import BoardPieceManager from '../model/BoardPieceManager';

const gamePlayers = {
    PLAYER_FOX: "fox",
    PLAYER_HOUNDS: "hounds",
};

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [],
            pieces: [],
            scores: {},
            activePlayer: null,
            selectedPiece: null,
        };
        this.boardPieceManager = null;
    }

    componentDidMount() {
        let { boardSize, houndsQuantity, foxStartPosition } = this.props;

        this.boardPieceManager = new BoardPieceManager(boardSize, houndsQuantity, foxStartPosition);
        this.renderBoard();
        this.endTurn();
    }

    renderBoard() {
        const { boardSize } = this.props;

        let result = [];
        for (let i = 0; i < boardSize; i++) {
            let row = [];

            for (let j = 0; j < boardSize; j++) {
                let boardSpaceType = (i % 2) === (j % 2) ? boardSpaceTypes.TYPE_BLACK : boardSpaceTypes.TYPE_WHITE;
                if (boardSpaceType === boardSpaceTypes.TYPE_WHITE) {
                    let currentCoordinate = new Coordinate(j, i);
                    let piece = this.boardPieceManager.getPieceForCoordinate(currentCoordinate);
        
                    if (piece && piece.type === boardPieceTypes.TYPE_HOUND) {
                        boardSpaceType = boardSpaceTypes.TYPE_HOUND;
                    } else if (piece && piece.type === boardPieceTypes.TYPE_FOX) {
                        boardSpaceType = boardSpaceTypes.TYPE_FOX;
                    }
                }

                row.push(<BoardSpace key={ "s" + i + "." + j } type={ boardSpaceType } coordinate={ new Coordinate(j, i) } onClick={ this.onSpaceSelect.bind(this) } />);
            }
            result.push(<tr key={ i }>{ row }</tr>);
        }

        this.setState({board: result});
    }

    checkWinConditions() {
        let { boardSize } = this.props;
        let possibleMoves = this.boardPieceManager.getFox().getPossibleMoves(boardSize);
        let validMoves = 0;

        // let currentScore = this.boardPieceManager.evaluateScore();
        // console.log("Current score: ", currentScore);

        for (let index in possibleMoves) {
            if (!this.boardPieceManager.getPieceForCoordinate(possibleMoves[index])) {
                validMoves += 1;
            }
        }

        if (validMoves === 0) {
            return gamePlayers.PLAYER_HOUNDS;
        }

        if (this.boardPieceManager.getFox().coordinate.y === 0) {
            return gamePlayers.PLAYER_FOX;
        }

        return false;

    }

    movePiece(piece, targetCoordinate) {
        let { selectedPiece } = this.state;

        console.log(piece)

        this.boardPieceManager.movePiece(piece, targetCoordinate);
        selectedPiece = null;

        this.setState({ selectedPiece }, this.renderBoard);
        this.endTurn();
    }

    updateBoardPieceManager(newBoardPieceManager, shouldEndTurn = true) {
        this.boardPieceManager = newBoardPieceManager;
        this.renderBoard();
        shouldEndTurn && this.endTurn();
    }

    endTurn() {
        let { activePlayer } = this.state;
        let { startAsFox, setMessage } = this.props;

        if (activePlayer) {
            activePlayer = (activePlayer === gamePlayers.PLAYER_FOX) ? gamePlayers.PLAYER_HOUNDS : gamePlayers.PLAYER_FOX;
        } else {
            activePlayer = startAsFox ? gamePlayers.PLAYER_FOX : gamePlayers.PLAYER_HOUNDS;
        }

        let winningPlayer = this.checkWinConditions();
        if (winningPlayer) {
            let scores = this.state.scores;
            scores[winningPlayer]? scores[winningPlayer] += 1 : scores[winningPlayer] = 1;
            this.setState({ scores }, () => setMessage(`Player ${ winningPlayer } won ${ scores[winningPlayer] } times!`));
        } else {
            setMessage(`It's ${ activePlayer } turn!`);

            this.setState({ activePlayer });
        }
    }

    onSpaceSelect(coordinate, type) {
        let { selectedPiece, activePlayer } = this.state;
        let { setMessage } = this.props;

        if (!selectedPiece) {
            if (activePlayer === gamePlayers.PLAYER_FOX && type === boardSpaceTypes.TYPE_FOX ) {
                selectedPiece = this.boardPieceManager.getPieceForCoordinate(coordinate);
            } else if (activePlayer === gamePlayers.PLAYER_HOUNDS && type === boardSpaceTypes.TYPE_HOUND) {
                selectedPiece = this.boardPieceManager.getPieceForCoordinate(coordinate);
            }
            this.setState({ selectedPiece })
        } else if (type === boardSpaceTypes.TYPE_WHITE) {
            if (selectedPiece.coordinate.getDistance(coordinate) < 2) {
                if (selectedPiece.type === boardPieceTypes.TYPE_HOUND && coordinate.y < selectedPiece.coordinate.y) {
                    setMessage(`${ selectedPiece.type } cannot move backwards`);    
                } else {
                    this.movePiece(selectedPiece, coordinate);
                }            
            } else {
                setMessage("Target too far away!");
            }
        }
    }
 
    render() {
        return (
            <table>
                <tbody>
                    { this.state.board }
                </tbody>
            </table>
        );
    }
}

export default Board;
export const players = gamePlayers;