import type ChessBoard from "../../Board";
import type { IPiece } from "../Piece"
import type { colorTable } from "../enum/Color.table.enum";
import { pieceTable } from "../enum/Pieces.table.enum";

class Rook implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location : string;
    firstMove : boolean;

    constructor(color : colorTable,location : string) {
        this.pieceData = pieceTable.Rook;
        this.pieceColor = color;    
        this.location = location;
        this.firstMove = true;
    }

    legalMoves(board : ChessBoard): string[] {
        throw new Error("Method not implemented.");
    }

}

export default Rook;