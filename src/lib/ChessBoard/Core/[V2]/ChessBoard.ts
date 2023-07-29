import { bounceIn } from "svelte/easing";
import Board from "./Board/Board";
import type { IChessBoard } from "./Interfaces/IChessBoard";
import PlayedGames from "./PlayedGames/PlayedGames";

class ChessBoard implements IChessBoard {


    public Board: Board = new Board();


    public readonly PlayedGames : PlayedGames[] = [];



    constructor() {
        this.newGame();
    }

    public newGame() {
        if (this.Board.playedMoves.length > 0) {
            // create a played games object
            const playedGame : PlayedGames = new PlayedGames(this.Board.playedMoves,PlayedGames.length);

            //put everything into the list
            this.PlayedGames.push(playedGame);
        }

        // Create new board
        this.Board = new Board();
    }
}

export default ChessBoard;