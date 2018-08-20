class AiManager {
    constructor(board, settings) {
        this.board = board;
        this.settings = settings;

        let fox = board.boardPieceManager.getFox();
        board.movePiece(fox, fox.getPossibleMoves(board.props.boardSize)[0]);
    }

    startAiLoop() {
        console.log("yay")
    }

    updateSettings(newSettings) {
        if (!this.settings.enableAi && newSettings.enableAi) {
            this.startAiLoop();
        }

        this.settings = newSettings;
        
    }

    aiCycle() {
        console.log("cycling!");
    }
}

export default AiManager;