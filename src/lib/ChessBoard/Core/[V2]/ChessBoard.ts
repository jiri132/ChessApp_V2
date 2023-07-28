import Board from "./Board/Board";
import type { IChessBoard } from "./Interfaces/IChessBoard";

class ChessBoard implements IChessBoard {
    Board: Board;

    constructor() {
        this.Board = new Board();
    }
}

export default ChessBoard;