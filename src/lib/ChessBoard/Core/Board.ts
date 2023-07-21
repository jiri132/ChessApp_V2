import { pieceTable } from "./Piece/enum/Pieces.table.enum";
import { colorTable } from "./Piece/enum/Color.table.enum";
import Bitboard from "$lib/BitArray/Extensions/BitBoard";
import type {IPiece} from "./Piece/Piece";
import Rook from "./Piece/Pieces/Piece.Rook";
import Pawn from "./Piece/Pieces/Piece.Pawn";
import Knight from "./Piece/Pieces/Piece.Knight";
import Bishop from "./Piece/Pieces/Piece.Bishop";
import Queen from "./Piece/Pieces/Piece.Queen";
import King from "./Piece/Pieces/Piece.King";
import type { move } from "./Moves/move.type";

class ChessBoard {
    private readonly whiteBitTable : Bitboard;
    private readonly blackBitTable : Bitboard;
    private readonly gameBitTable  : Bitboard;

    public readonly turn : colorTable = colorTable.white; 

    private readonly game : IPiece[][] = [
        [new Rook(colorTable.black,"A8"),new Knight(colorTable.black, "B8"), new Bishop(colorTable.black, "C8"), new Queen(colorTable.black, "D8"), new King(colorTable.black, "E7"), new Bishop(colorTable.black, "F8"),new Knight(colorTable.black, "G8"),new Rook(colorTable.black,"H8")],
        [new Pawn(colorTable.black, "A7"),new Pawn(colorTable.black, "B7"),new Pawn(colorTable.black, "C7"),new Pawn(colorTable.black, "D7"),new Pawn(colorTable.black, "E7"),new Pawn(colorTable.black, "F7"),new Pawn(colorTable.black, "G7"),new Pawn(colorTable.black, "H7")],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [new Pawn(colorTable.white, "A2"),new Pawn(colorTable.white, "B2"),new Pawn(colorTable.white, "C2"),new Pawn(colorTable.white, "D2"),new Pawn(colorTable.white, "E2"),new Pawn(colorTable.white, "F2"),new Pawn(colorTable.white, "G2"),new Pawn(colorTable.white, "H2")],
        [new Rook(colorTable.white,"A1"), new Knight(colorTable.white,"B1"), new Bishop(colorTable.white,"C1"), new Queen(colorTable.white, "D1"), new King(colorTable.white, "E1"), new Bishop(colorTable.white, "F1"),new Knight(colorTable.white, "G1"),new Rook(colorTable.white,"H1")]
    ]


    constructor(
        whiteBitBoard : Bitboard = new Bitboard(64,["00000000","00000000","00000000","00000000","00000000","00000000","11111111","11111111"]),
        blackBitBoard : Bitboard = new Bitboard(64,["11111111","11111111","00000000","00000000","00000000","00000000","00000000","00000000"]))
        {
        this.whiteBitTable = whiteBitBoard;
        this.blackBitTable = blackBitBoard;
        this.gameBitTable = Bitboard.OR(this.whiteBitTable,this.blackBitTable);
    }

    movePiece(fromPosition: move, toPosition: move): void {
        const piece = this.getPieceAtPosition(fromPosition);
        if (!piece) {
          console.log("No piece found at the specified position.");
          return;
        }
    
        if (piece.isLegalMove(this, toPosition)) {
            // Move the piece internally
            const [fromFile, fromRank] = this.getIndexFileRank(fromPosition);
            const [toFile, toRank] = this.getIndexFileRank(toPosition);

            // Remove the piece from the original position and place it at the new position
            this.game[toRank][toFile] = piece;
            this.game[fromRank][fromFile] = null!;
        
            // Update the piece's location
            piece.location = toPosition;
            return;
        } else {
          console.log("Invalid move.");
          return;
        }
    }
    
    public getPieceAtPosition(position: move): IPiece | null {
        // Implement logic to find and return the piece at the specified position.
        // If no piece is found, return null.
        const [file, rank] = this.getIndexFileRank(position);

        // Get the piece at the specified position
        const piece = this.game[rank][file];

        // Return the piece if found, otherwise return null
        return piece ? piece : null;
    }

    private getIndexFileRank(position : move) : [number, number] {
        const [file, rank] = position;

         // Find the indices for the 'game' array based on the file and rank
        const fileIndex = file.charCodeAt(0) - "A".charCodeAt(0);
        const rankIndex =  8 - parseInt(rank);

        return [fileIndex, rankIndex];
    }

}

export default ChessBoard;