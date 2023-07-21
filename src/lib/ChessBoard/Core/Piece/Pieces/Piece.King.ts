import type ChessBoard from "../../Board";
import type { IPiece } from "../Piece"
import type { colorTable } from "../enum/Color.table.enum";
import type { move } from "../../Moves/move.type"
import { pieceTable } from "../enum/Pieces.table.enum";

class King implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location: move;

    constructor(color : colorTable,location : move) {
        this.pieceData = pieceTable.King;
        this.pieceColor = color;    
        this.location = location;
    }

    isLegalMove(board : ChessBoard,move: move): boolean {
        throw new Error("Method not implemented.");
    }
    legalMoves(board : ChessBoard): move[] {
        throw new Error("Method not implemented.");
    }

}

export default King;