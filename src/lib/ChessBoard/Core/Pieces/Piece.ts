import type { pieceTable } from "./enum/Pieces.table.enum"


class Piece {
    pieceData : pieceTable;

    constructor(pieceType : pieceTable) {
        this.pieceData = pieceType;
    }
}

export default Piece;