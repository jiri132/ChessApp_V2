import { pieceTable } from "./Pieces/enum/Pieces.table.enum";
import { colorTable } from "./Pieces/enum/Color.table.enum";
import Bitboard from "$lib/BitArray/Extensions/BitBoard";
import type { Piece } from "./Pieces/Piece";

class ChessBoard {
    public readonly whiteBitTable : Bitboard;
    public readonly blackBitTable : Bitboard;
    public readonly gameBitTable  : Bitboard;

    public readonly game : Piece[][] = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]


    constructor(
        whiteBitBoard : Bitboard = new Bitboard(64,["00000000","00000000","00000000","00000000","00000000","00000000","11111111","11111111"]),
        blackBitBoard : Bitboard = new Bitboard(64,["11111111","11111111","00000000","00000000","00000000","00000000","00000000","00000000"]))
        {
        this.whiteBitTable = whiteBitBoard;
        this.blackBitTable = blackBitBoard;
        this.gameBitTable = Bitboard.OR(this.whiteBitTable,this.blackBitTable);
    }


}

export default ChessBoard;