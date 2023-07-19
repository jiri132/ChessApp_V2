import { pieceTable } from "./Pieces/Pieces.table.enum";
import { colorTable } from "./Pieces/Color.table.enum";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import Bitboard from "$lib/BitArray/Extensions/BitBoard";

class ChessBoard {
    public readonly whiteBitTable : Bitboard;
    public readonly blackBitTable : Bitboard;
    public readonly gameBitTable  : Bitboard;

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