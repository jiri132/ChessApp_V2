// import { pieceTable } from "./Piece/enum/Pieces.table.enum";
import { colorTable } from "./Piece/enum/Color.table.enum";
// import Bitboard from "$lib/BitArray/Extensions/BitBoard";
import Rook from "./Piece/Pieces/Piece.Rook";
import Pawn from "./Piece/Pieces/Piece.Pawn";
import Knight from "./Piece/Pieces/Piece.Knight";
import Bishop from "./Piece/Pieces/Piece.Bishop";
import Queen from "./Piece/Pieces/Piece.Queen";
import King from "./Piece/Pieces/Piece.King";
import type { move } from "./Moves/move.type";
import type { IBoard } from "./IBoard.interface";
import type { playedMoves } from "./Moves/playedMoves.type";
import { pieceTable } from "./Piece/enum/Pieces.table.enum";
import type { IPiece } from "./Piece/IPiece";

class ChessBoard implements IBoard {

    public readonly playedMoves : playedMoves[] = [];
    
    public isWhiteToMove: boolean = true;
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
    playMove(playingMove : playedMoves): void {
        if (this.getYourLegalMoves().includes(playingMove)) {
            this.isWhiteToMove = !this.isWhiteToMove;

            if (this.isWhiteToMove) {
                this.playedMoves.push(playingMove);

            }else {
                this.playedMoves.push(playingMove);
            }
            

        }else {
            throw new Error("This played move isn't valid!");
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

    public getOpponentsLegalMoves() : playedMoves[] {
        const allMoves : playedMoves[] = [];

        for (let i = 0; i < this.game.length; i++) {
            const rankPieces = this.game[i];
            const rank = 8 - i;

            rankPieces.forEach((piece : IPiece, index : number) => {
                // -1. get number ot letter so that you can create the location of the piece
                const letterCode = 65 + index;
                const file = String.fromCharCode(letterCode);    
            
                // 0. evade the null!
                if (piece === null) {return;}
                
                // 0.1. evade the kings? 
                // Not sure if I need to do this and then create some logic for it that I can check that the king doesn't move next to the other king
                // I don't know maybe?
                if (piece.pieceData === pieceTable.King) {return;}

                // 1. Check if the piece is a specific color
                if (this.isWhiteToMove && piece.pieceColor === "1") {
                    // 2. Move on to getting the legal moves
                    let moves : move[] = piece.legalMoves(this);
                    
                    moves.forEach((move : string) => {
                        // @ts-ignore
                        allMoves.push(file + rank + move);    
                    });

                } else if (!this.isWhiteToMove && piece.pieceColor === "0"){
                    // 2. Move on to getting the legal moves
                    let moves : move[] = piece.legalMoves(this);
                                        
                    moves.forEach((move : string) => {
                        // @ts-ignore
                        allMoves.push(file + rank + move);    
                    });
                }

            });
            
        }

        // 3. Return the legal moves into an array
        return allMoves;
    }
    public getYourLegalMoves() : playedMoves[] {
        const allMoves : playedMoves[] = [];

        for (let i = 0; i < this.game.length; i++) {
            const rankPieces = this.game[i];
            const rank = 8 - i;

            rankPieces.forEach((piece : IPiece, index : number) => {
                // -1. get number ot letter so that you can create the location of the piece
                const letterCode = 65 + index;
                const file = String.fromCharCode(letterCode);    
            
                // 0. evade the null!
                if (piece === null) {return;}

                // 1. Check if the piece is a specific color
                if (this.isWhiteToMove && piece.pieceColor === "0") {
                    // 2. Move on to getting the legal moves
                    let moves : move[] = piece.legalMoves(this);
                    
                    moves.forEach((move : string) => {
                        // @ts-ignore
                        allMoves.push(file + rank + move);    
                    });

                } else if (!this.isWhiteToMove && piece.pieceColor === "1"){
                    // 2. Move on to getting the legal moves
                    let moves : move[] = piece.legalMoves(this);
                                        
                    moves.forEach((move : string) => {
                        // @ts-ignore
                        allMoves.push(file + rank + move);    
                    });
                }

            });
            
        }
        // 3. Return the legal moves into an array
        return allMoves;
    }
    public isAttackedSquare(square : move) : boolean {
        const mappedMoves = this.getOpponentsLegalMoves().map(move => move.substring(2, 4));

        if (mappedMoves.includes(square)) {
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