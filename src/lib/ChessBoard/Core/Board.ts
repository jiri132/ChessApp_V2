// import { pieceTable } from "./Piece/enum/Pieces.table.enum";
import { colorTable } from "./Piece/enum/Color.table.enum";
// import Bitboard from "$lib/BitArray/Extensions/BitBoard";
import type {IPiece} from "./Piece/Piece";
import Rook from "./Piece/Pieces/Piece.Rook";
import Pawn from "./Piece/Pieces/Piece.Pawn";
import Knight from "./Piece/Pieces/Piece.Knight";
import Bishop from "./Piece/Pieces/Piece.Bishop";
import Queen from "./Piece/Pieces/Piece.Queen";
import King from "./Piece/Pieces/Piece.King";
import type { move } from "./Moves/move.type";
import type { IBoard } from "./IBoard.interface";
import type { playedMoves } from "./Moves/playedMoves.type";

class ChessBoard implements IBoard {
    // private readonly whiteBitTable : Bitboard;
    // private readonly blackBitTable : Bitboard;
    // private readonly gameBitTable  : Bitboard;

    public readonly playedMoves : playedMoves[][] = [];


    // private readonly turn : colorTable = colorTable.white; 
    public readonly game : IPiece[][] = [
        [new Rook(colorTable.black,"A8"),new Knight(colorTable.black, "B8"), new Bishop(colorTable.black, "C8"), new Queen(colorTable.black, "D8"), new King(colorTable.black, "E7"), new Bishop(colorTable.black, "F8"),new Knight(colorTable.black, "G8"),new Rook(colorTable.black,"H8")],
        [new Pawn(colorTable.black, "A7"),new Pawn(colorTable.black, "B7"),new Pawn(colorTable.black, "C7"),new Pawn(colorTable.black, "D7"),new Pawn(colorTable.black, "E7"),new Pawn(colorTable.black, "F7"),new Pawn(colorTable.black, "G7"),new Pawn(colorTable.black, "H7")],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [null!, null!, null!, null!, null!, null!, null!, null!],
        [new Pawn(colorTable.white, "A2"),new Pawn(colorTable.white, "B2"),new Pawn(colorTable.white, "C2"),new Pawn(colorTable.white, "D2"),new Pawn(colorTable.white, "E2"),new Pawn(colorTable.white, "F2"),new Pawn(colorTable.white, "G2"),new Pawn(colorTable.white, "H2")],
        [new Rook(colorTable.white,"A1"), new Knight(colorTable.white,"B1"), new Bishop(colorTable.white,"C1"), new Queen(colorTable.white, "D1"), new King(colorTable.white, "E1"), new Bishop(colorTable.white, "F1"),new Knight(colorTable.white, "G1"),new Rook(colorTable.white,"H1")]
    ]

    makeMove(): void {
        throw new Error("Method not implemented.");
    }
    undoMove() : void {
        throw new Error("Method not implemented.");
    }
    playMove(): void {
        throw new Error("Method not implemented.");        
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

    public getAllLegalMoves() : playedMoves[] {
        const allMoves : playedMoves[] = [];
        console.log(this.game)

        for (let i = 0; i < this.game.length; i++) {
            const rank = this.game[i];
                
            // 0. evade the null!
            // 1. Check if the piece is a specific color
            // 2. Move on to getting the legal moves
            // 3. Return the legal moves into an array
            rank.forEach((piece : IPiece, index : number) => {
                const file = index;    

                if (piece === null) {return;}


                if (this.isWhiteTurn()  && piece.pieceColor === "0") {
                    let moves : move[] = piece.legalMoves(this);
                    

                } else if (!this.isWhiteTurn()  && piece.pieceColor === "1"){

                }

            });
            
        }
        return null!;
    }

    public isWhiteTurn() : boolean {
        const whiteLatestMove = this.playedMoves[this.playedMoves.length-1][0];

        if (whiteLatestMove === undefined) {
            return true;
        }

        return false;
    }



    /*
    *
    *   **PRIVATES**
    * 
    *   These functions help the repeating behaviors of the board
    *
    */

    // private movePiece(fromPosition : move, toPosition : move) : IPiece[][] {
    //     // Get piece from the virtual board
    //     const piece = this.getPieceAtPosition(fromPosition);

    //     // error if the virtual board doesn't have a piece there
    //     if (!piece) {
    //         throw new Error("No piece found at the specified position");
    //     }


    //     if (piece.isLegalMove(this, toPosition)) {
    //         // Move the piece internally
    //         const [fromFile, fromRank] = this.getIndexFileRank(fromPosition);
    //         const [toFile, toRank] = this.getIndexFileRank(toPosition);

    //         // Remove the piece from the original position and place it at the new position
    //         this.game[toRank][toFile] = piece;
    //         this.game[fromRank][fromFile] = null!;
    //         // console.log(board.game)

    //         // Update the piece's location
    //         piece.location = toPosition;
            
    //         // return the new positions
    //         return this.game;
    //     } else {
    //         // If move is invalid return null
    //         throw new Error("Invalid Move");
    //     }
    // }

    private getIndexFileRank(position : move) : [number, number] {
        const [file, rank] = position;

         // Find the indices for the 'game' array based on the file and rank
        const fileIndex = file.charCodeAt(0) - "A".charCodeAt(0);
        const rankIndex =  8 - parseInt(rank);

        return [fileIndex, rankIndex];
    }



}

export default ChessBoard;