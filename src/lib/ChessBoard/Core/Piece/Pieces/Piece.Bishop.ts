import type ChessBoard from "../../Board";
import type { IPiece } from "../Piece"
import type { colorTable } from "../enum/Color.table.enum";
import type { move } from "../../Moves/move.type"
import { pieceTable } from "../enum/Pieces.table.enum";

class Bishop implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location: move;

    constructor(color : colorTable,location : move) {
        this.pieceData = pieceTable.Bishop;
        this.pieceColor = color;    
        this.location = location;
    }

    isLegalMove(board : IPiece[][],move: move): boolean {
        throw new Error("Method not implemented.");
    }
    legalMoves(board : IPiece[][]): string[] {
        throw new Error("Method not implemented.");
    }

}

export default Bishop;