import type ChessBoard from "../Board";
import type { colorTable } from "./enum/Color.table.enum";
import type { pieceTable } from "./enum/Pieces.table.enum"
import type { move } from "../Moves/move.type"


export interface IPiece {
    pieceData : pieceTable;
    pieceColor : colorTable;
    location : move;
    legalMoves(board : ChessBoard) : move[];            // Returns an array of legal moves @example `['f8','f7']`
    isLegalMove(board : ChessBoard, move : move) : boolean;
}