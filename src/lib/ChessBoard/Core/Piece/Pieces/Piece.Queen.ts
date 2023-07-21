import type ChessBoard from "../../Board";
import type { IPiece } from "../Piece"
import type { colorTable } from "../enum/Color.table.enum";
import { pieceTable } from "../enum/Pieces.table.enum";

class Queen implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location: string;

    constructor(color : colorTable,location : string) {
        this.pieceData = pieceTable.Queen;
        this.pieceColor = color;    
        this.location = location;
    }


    legalMoves(board : ChessBoard): string[] {
        throw new Error("Method not implemented.");
    }

}

export default Queen;