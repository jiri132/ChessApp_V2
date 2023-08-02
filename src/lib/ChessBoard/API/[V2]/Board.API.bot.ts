import type Board from "$lib/ChessBoard/Core/[V2]/Board/Board";
import type Move from "$lib/ChessBoard/Core/[V2]/Move/Move";

abstract class Chess_API_Bots {
    public readonly API : Board;
    constructor(board : Board) {
        this.API = board;
    }

    abstract Think() : Move;
}


export default Chess_API_Bots