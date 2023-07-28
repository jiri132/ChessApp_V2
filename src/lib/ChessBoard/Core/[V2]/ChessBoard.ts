import type Board from "./Board/Board";
import type { IChessBoard } from "./Interfaces/IChessBoard";

class ChessBoard implements IChessBoard {
    Board: Board;

}

export default ChessBoard;