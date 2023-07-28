import type Board from "../Board/Board";

export interface IChessBoard {
    /*  This is the main board where everything is on played  */
    Board : Board;

    /*  Save all the played games  */
    //readonly PlayedGames : [][] //TODO: make a type for playedGames content: {moves[], ID, white,black, win state}
}