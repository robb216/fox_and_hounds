class AiManager {
    constructor(board, cycleDelay) {
        this.board = board;
        this.cycleDelay = cycleDelay;

        let fox = board.boardPieceManager.getFox();
        board.movePiece(fox, fox.getPossibleMoves(board.props.boardSize)[0]);
    }

    startAiLoop() {

    }

    AiCycle() {
        console.log("cycling!");

    }
}

export default AiManager;