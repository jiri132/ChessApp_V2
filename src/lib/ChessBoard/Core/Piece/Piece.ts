import type ChessBoard from "../Board";
import type { colorTable } from "./enum/Color.table.enum";
import type { pieceTable } from "./enum/Pieces.table.enum"


export interface IPiece {
    pieceData : pieceTable;
    pieceColor : colorTable;
    legalMoves(ChessBoard : ChessBoard) : string[];            // Returns an array of legal moves @example `['f8','f7']`
}