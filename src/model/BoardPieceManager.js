import BoardPiece, { types as boardPieceTypes } from './BoardPiece.js';
import { players as gamePlayers } from '../containers/Board.js';
import Coordinate from './Coordinate.js';

class BoardPieceManager {
    constructor(boardSize = 8, houndsQuantity = 4, foxStartPosition = 4) {
        this.hounds = [];
        this.fox = null;
        this.boardSize = boardSize;

        for (let i = 0; i < houndsQuantity; i++) {
            this.hounds.push(new BoardPiece(i*2+1, 0, boardPieceTypes.TYPE_HOUND));
        }

        this.fox = new BoardPiece(foxStartPosition, boardSize-1, boardPieceTypes.TYPE_FOX);

    }

    evaluateScore() {
        let evaluation = 0;

        // Check the distance between fox and the highest dog(s)
        // If the fox's Y has already passed the hounds, fox win
        let minHoundsY = this.boardSize - 1;
        for (let index in this.hounds) {
            const houndY = this.hounds[index].coordinate.y;
            if (houndY < minHoundsY) {
                minHoundsY = houndY;
            }
        }
        if (this.fox.y <= minHoundsY) {
            evaluation = 400;
            return evaluation;
        }
        evaluation += (this.boardSize - 1 - (this.fox.coordinate.y - minHoundsY)) * 10

        // Check the amount of moves the fox can make this turn
        // If 0, hounds win
        let possibleMoves = this.fox.getPossibleMoves(this.boardSize);
        let validMoves = possibleMoves.length;
        for (let index in possibleMoves) {
            if (this.getPieceForCoordinate(possibleMoves[index])) {
                validMoves -= 1;
            }
        }
        if (validMoves === 0) {
            evaluation = -400;
            return evaluation;
        }
        evaluation -= (4 - validMoves) * 10;

        return evaluation;
    }

    getPossibleMoves(isCurrentPlayerFox = true) {
        let boardPieceManager = this.getClone();
        let activePlayer = isCurrentPlayerFox ? gamePlayers.PLAYER_FOX : gamePlayers.PLAYER_HOUNDS;
        let result = [];
        let fox = boardPieceManager.getFox();
        let hounds = boardPieceManager.getHounds();
        let possibleMoves = [];

        let possibleMovesToBoards = (possibleMoves, boardPiece) => {
            let result = []
            for (let moveIndex in possibleMoves) {
                if (!boardPieceManager.getPieceForCoordinate(possibleMoves[moveIndex])) {
                    let movedBoard = boardPieceManager.getClone();
                    movedBoard.movePiece(boardPiece, possibleMoves[moveIndex]);
                    result.push(movedBoard);
                }
            }
            return result;
        }

        if ( activePlayer === gamePlayers.PLAYER_FOX ) {
            possibleMoves = fox.getPossibleMoves(this.boardSize);
            result = result.concat(possibleMovesToBoards(possibleMoves, fox));
        } else {
            for (let houndIndex in hounds) {
                let hound = hounds[houndIndex];
                possibleMoves = hound.getPossibleMoves(this.boardSize);
                result = result.concat(possibleMovesToBoards(possibleMoves, hound));
            }
        }

        return result;
    }

    movePiece(piece, targetCoordinate) {
        if (piece.type === boardPieceTypes.TYPE_FOX) {
            this.fox.coordinate = new Coordinate(targetCoordinate.x, targetCoordinate.y);
        } else {
            for (let pieceIndex in this.hounds) {
                if (this.hounds[pieceIndex].coordinate.equals(piece.coordinate)) {
                    this.hounds[pieceIndex].coordinate = new Coordinate(targetCoordinate.x, targetCoordinate.y);
                }
            }
        }
    }

    getClone() {
        let newBoardPieceManager = new BoardPieceManager(this.boardSize, 0, 0);
        
        let newHounds = [];
        for (let index in this.hounds) {
            let hound = this.hounds[index];
            newHounds.push(new BoardPiece(hound.coordinate.x, hound.coordinate.y, boardPieceTypes.TYPE_HOUND));
        }
        let newFox = new BoardPiece(this.fox.coordinate.x, this.fox.coordinate.y, boardPieceTypes.TYPE_FOX);

        newBoardPieceManager.hounds = newHounds;
        newBoardPieceManager.fox = newFox;

        return newBoardPieceManager;
    }

    getHounds() {
        return this.hounds;
    }

    getFox() {
        return this.fox;
    }

    getAllPieces() {
        let result = [];
        result.push(this.fox);
        return result.concat(this.hounds);
    }

    getPieceForCoordinate(coordinate) {
        let pieces = this.getAllPieces();
        let result = null;

        for (let pieceIndex in pieces) {
            let piece = pieces[pieceIndex];
            
            if (piece.coordinate.equals(coordinate)) {
                result = piece;
            }
        }

        return result;
    }
}

export default BoardPieceManager;