import { players as gamePlayers } from '../containers/Board.js';

class AiManager {
    constructor(board, settings) {
        this.board = board;
        this.settings = settings; 
        
        this.aiCycle = this.aiCycle.bind(this);

        this.treeDump = [];
    }

    updateSettings(newSettings) {
        let oldSettings = this.settings;
        this.settings = newSettings;
        if (!oldSettings.enableAi && newSettings.enableAi) {
            this.aiCycle();
        }
    }

    compareScores(bestScore, newScore, isTargetScoreMax = true) {
        // console.log("comparescores", bestScore, newScore, isTargetScoreMax)
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
        let isTargetScoreMax = this.board.state.activePlayer === gamePlayers.PLAYER_FOX ? true : false;
        let moves = this.board.boardPieceManager.getPossibleMoves(isTargetScoreMax);
        let depth = this.settings.aiTreeDepth;

        if (moves.length > 1) {
            // do tree stuff
            let bestScore = null;
            let bestMove = null;
            for (let index in moves) {
                let move = moves[index];
                let newScore = null;
                if (depth === 0) {
                    newScore = move.evaluateScore();
                    this.settings.shouldGenerateTree && console.log("score: ", newScore)
                } else {
                    // let newMoves = move.getPossibleMoves(isTargetScoreMax);
                    newScore = move.evaluateScore();
                    if (newScore!==400) {
                        let newMoves = move.getPossibleMoves(!isTargetScoreMax);
                        newScore = this.generateScoreFromTree(newMoves, depth-1, !isTargetScoreMax, isTargetScoreMax);
                        this.settings.shouldGenerateTree && console.log("beginning of tree", move,  newMoves, newScore);
                    }
                }
                if (this.compareScores(bestScore, newScore, isTargetScoreMax)) {
                    bestScore = newScore;
                    bestMove = move;
                }
            }
            // console.log("best result", bestScore, bestMove)
            if (bestMove) {
                this.board.updateBoardPieceManager(bestMove);
            } else {
                console.error("AiManager aiCycle: unexpected bestMove undefined");
                return;
            }
        } else if (moves.length === 1) {
            // Only one move to choose from, no need to generate a tree
            this.board.updateBoardPieceManager(moves[0])
        } else {
            console.error("AiManager aiCycle: unexpected remaining moves <= 0")
            return;
        }
        this.settings.enableAi && setTimeout(this.aiCycle, this.settings.aiDelay)
    }

    generateScoreFromTree(moves, depth, isTargetScoreMax, isCurrentPlayerFox = true) {
        let bestScore = 0;
        let scores = [];
        for (let index in moves) {
            let move = moves[index];
            let newScore = null;
            if (depth === 0) {
                newScore = move.evaluateScore();
                scores.push(newScore);
                // console.log("score: ", newScore)
            } else {
                if (newScore===400) {
                    return newScore;
                } 
                let newMoves = move.getPossibleMoves(!isTargetScoreMax);
                newScore = this.generateScoreFromTree(newMoves, depth-1, !isTargetScoreMax, isCurrentPlayerFox);
                scores.push(newScore);
            }

            if (this.compareScores(bestScore, newScore, isCurrentPlayerFox)) {
                bestScore = newScore;
            }
        }
        if (this.settings.shouldGenerateTree) {
            console.log("depth: " + depth, "bestscore: ", bestScore, "allScores: ", scores, "isTargetScoreMax: ", isTargetScoreMax, moves);
        }
        return bestScore;
    }
}

export default AiManager;