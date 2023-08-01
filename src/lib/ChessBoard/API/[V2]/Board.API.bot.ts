import type Board from "$lib/ChessBoard/Core/[V2]/Board/Board";

class Chess_API_Bots {
    public readonly API : Board;

    constructor(board : Board) {
        this.API = board;
    }
}


export default Chess_API_Bots