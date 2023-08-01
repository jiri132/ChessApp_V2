import { bounceIn } from "svelte/easing";
import Board from "./Board/Board";
import type { IChessBoard } from "./Interfaces/IChessBoard";
import PlayedGames from "./PlayedGames/PlayedGames";
import BoardVisualHelper from "./Helpers/BoardVisualHelper";
import { json } from "@sveltejs/kit";
import type { IPlayedGames } from "./Interfaces/PlayedGames/IPlayedGames";

class ChessBoard implements IChessBoard {


    public Board: Board = new Board();
    


    public readonly PlayedGames : PlayedGames[] = [];



    constructor() {
        this.PlayedGames = this.GetPreviousGamesFromLocalStorage();
        console.log(this.PlayedGames)
        this.newGame();
    }

    public newGame() {
        if (this.Board.playedMoves.length > 0) {
            // create a played games object
            const playedGame : PlayedGames = new PlayedGames(this.Board.playedMoves,PlayedGames.length);

            //put everything into the list
            this.PlayedGames.push(playedGame);
            this.SaveToLocalStorage();
        }

        // Create new board
        this.Board = new Board();

        BoardVisualHelper.RenderEmptyPlayedMovesContainer();
        BoardVisualHelper.RenderAllTiles(this.Board);
    }

    private SaveToLocalStorage() : void {
        localStorage.setItem("PlayedGames",JSON.stringify(this.PlayedGames));
    }

    private GetPreviousGamesFromLocalStorage() : PlayedGames[] {
        const Games : PlayedGames[] = [];
        const jsonString : string | null = localStorage.getItem("PlayedGames");

        if (jsonString === "null" || jsonString === null) { console.log(Games); return []; }
        
        const object : IPlayedGames[] = JSON.parse(jsonString);

        object.forEach((game_json : IPlayedGames) => {
            Games.push(PlayedGames.fromJson(game_json));
        });

        return Games;
    }
}

export default ChessBoard;