import Board from "./Board/Board";
import type { IChessBoard } from "./Interfaces/IChessBoard";
import PlayedGames from "./PlayedGames/PlayedGames";
import BoardVisualHelper from "./Helpers/BoardVisualHelper";
import type { IPlayedGames } from "./Interfaces/PlayedGames/IPlayedGames";
import type { ImyBot } from "$lib/ChessEngine/ImyBot";
import { GameType } from "./Types/Game/game.type";

class ChessBoard implements IChessBoard {


    public Board: Board = new Board();

    public baseBotFileNames : string[] = ['devBot', 'myBot'];

    public readonly PlayedGames : PlayedGames[] = [];


    constructor() {
        this.PlayedGames = this.GetPreviousGamesFromLocalStorage();
    }

    public newGame(gameType : GameType = GameType.Human_VS_Human, bot1? : string, bot2? : string) {
        console.log("started new game type:" ,gameType)

        if (this.Board.playedMoves.length > 0) {
            // create a played games object
            const playedGame : PlayedGames = new PlayedGames(this.Board.playedMoves,PlayedGames.length);

            //put everything into the list
            this.PlayedGames.push(playedGame);
            this.SaveToLocalStorage();
        }

        // Create new board
        this.Board = new Board(gameType, bot1,bot2);

        BoardVisualHelper.RenderAllTiles(this.Board);
        BoardVisualHelper.RenderEmptyPlayedMovesContainer();
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