import BoardPiece, { types as boardPieceTypes } from './BoardPiece.js';

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

    movePiece(piece, targetCoordinate) {
        if (piece.type === boardPieceTypes.TYPE_FOX) {
            piece.coordinate = targetCoordinate;
            this.fox = piece;
        } else {
            for (let pieceIndex in this.hounds) {
                if (this.hounds[pieceIndex].coordinate === piece.coordinate) {
                    this.hounds[pieceIndex].coordinate = targetCoordinate;
                }
            }
        }
    }

    getDeepCopy() {
        return JSON.parse(JSON.stringify(this));
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