import type ChessBoard from "./Board";
import type { move } from "./Moves/move.type";
import type { playedMoves } from "./Moves/playedMoves.type";
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

        // When the king is on an attacked square return it as a check
        if (board.isAttackedSquare(king.location)) {return true;}

        // else it is probably not in check so return false
        return false;
    }

    static isNextMoveInCheck(board : ChessBoard, move : playedMoves) : boolean {
        const king : IPiece = board.game.flat().find((piece) => {
            if (board.isWhiteToMove) {
                return piece?.pieceData === pieceTable.King && piece?.pieceColor === colorTable.white;
            }

            return piece?.pieceData === pieceTable.King && piece?.pieceColor === colorTable.black;
        }) as IPiece;

        const capturedPiece : IPiece | null = board.makeMove(move);
        const isInCheck : boolean = BoardHelper.isInCheck(board);
        board.undoMove(move, capturedPiece)

        if (isInCheck) {
            return true;
        }

        return false;
    }
}

export default BoardHelper;