class AiManager {
    constructor(board, settings) {
        this.board = board;
        this.settings = settings; 
    }

    startAiLoop() {
        console.log("yay")
    }

    updateSettings(newSettings) {
        if (!this.settings.enableAi && newSettings.enableAi) {
            this.aiCycle();
        }

        this.settings = newSettings;
        
    }

    aiCycle() {
        let moves = this.board.generateMovesForBoard();

        if (moves.length > 1) {
            // do tree stuff
            return;
        } else if (moves.length === 1) {
            // Only one move to choose from, no need to generate a tree
            this.board.updateBoardPieceManager(moves[0])
        } else {
            console.error("AiManager aiCycle: unexpected remaining moves <= 0")
            return;
        }
        this.settings.enableAi && setTimeout(this.aiCycle, this.settings.aiDelay)
    }
}

export default AiManager;