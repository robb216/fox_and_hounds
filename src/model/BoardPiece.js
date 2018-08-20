import Coordinate from "./Coordinate";

const boardPieceTypes = {
    TYPE_HOUND: 'hound',
    TYPE_FOX  : 'fox',
};

class BoardPiece {
    constructor(x, y, type) {
        this.coordinate = new Coordinate(x, y)
        this.type = type;
    }

    getPossibleMoves(boardSize) {
        if (!boardSize) { console.warn("BoardPiece getPossibleMoves boardSize not defined!") }
        let proximateSpaces = this.coordinate.getProximateSpaces(boardSize);
        let possibleMoves = [];

        for (let index in proximateSpaces) {
            if (proximateSpaces[index].y >= this.coordinate.y || this.type !== boardPieceTypes.TYPE_HOUND) {
                possibleMoves.push(proximateSpaces[index]);
            }
        }

        return possibleMoves;
    }
}

export default BoardPiece;
export const types = boardPieceTypes;