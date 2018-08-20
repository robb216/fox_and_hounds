class AiManager {
    constructor(board) {
        this.board = board;

        let fox = board.boardPieceManager.getFox();
        board.movePiece(fox, fox.getPossibleMoves(board.props.boardSize)[0]);
    }
}

export default AiManager;