import type ChessBoard from "./Board";
import type { IPiece } from "./Piece/IPiece";
import { colorTable } from "./Piece/enum/Color.table.enum";
import { pieceTable } from "./Piece/enum/Pieces.table.enum";

class BoardHelper {

    static isInCheck(board : ChessBoard) : boolean {

        const king : IPiece = board.game.flat().find((piece) => {
            if (board.isWhiteToMove) {
                return piece?.pieceData === pieceTable.King && piece?.pieceColor === colorTable.white;
            }

            return piece?.pieceData === pieceTable.King && piece?.pieceColor === colorTable.black;
        }) as IPiece;

        // console.log(king);

        return false;
    }
}

export default BoardHelper;