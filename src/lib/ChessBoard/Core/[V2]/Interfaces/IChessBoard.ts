import type Board from "../Board/Board";
import type PlayedGames from "../PlayedGames/PlayedGames";

export interface IChessBoard {
    /*  This is the main board where everything is on played  */
    Board : Board;

    /*  Save all the played games  */
    readonly PlayedGames : PlayedGames[]

    newGame() : void;
}