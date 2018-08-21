import { players as gamePlayers } from '../containers/Board.js';

class AiManager {
    constructor(board, settings) {
        this.board = board;
        this.settings = settings; 
        
        this.aiCycle = this.aiCycle.bind(this);
    }

    updateSettings(newSettings) {
        let oldSettings = this.settings;
        this.settings = newSettings;
        if (!oldSettings.enableAi && newSettings.enableAi) {
            this.aiCycle();
        }
    }

    compareScores(bestScore, newScore, isTargetScoreMax = true) {
        if (!bestScore) {
            return true;
        }
        if (isTargetScoreMax) {
            if (newScore > bestScore) {
                return true;
            }
        } else {
            if (newScore < bestScore) {
                return true;
            }
        }
        return false;
    }

    aiCycle() {
        let moves = this.board.generateMovesForBoard();
        let depth = this.settings.aiTreeDepth;

        if (moves.length > 1) {
            let isTargetScoreMax = this.board.state.activePlayer === gamePlayers.PLAYER_FOX ? true : false;
            // do tree stuff
            this.generateTurnFromTree(moves, depth, isTargetScoreMax);
            console.log("tree stuff");
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

    generateTurnFromTree(moves, depth, isTargetScoreMax = true) {
        let bestScore = 0;
        for (let index in moves) {
            let move = moves[index];
            let newScore = null;
            if (depth === 0) {
                newScore = move.evaluateScore();
                console.log("score: ", newScore)
            } else {
                let newMoves = move.getPossibleMoves(isTargetScoreMax);
                newScore = this.generateTurnFromTree(newMoves, depth-1, !isTargetScoreMax);
            }
            if (this.compareScores(bestScore, newScore, isTargetScoreMax)) {
                bestScore = newScore;
            }
        }
        console.log("depth: " + depth, "bestscore: ", bestScore, "isTargetScoreMax: ", isTargetScoreMax, moves);
        return bestScore;
    }
}

export default AiManager;