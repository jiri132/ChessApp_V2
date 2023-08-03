
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import type Board from "../Board/Board";
import type King from "../Board/Pieces/Piece.king";
import type Tile from "../Board/Tile/Tile";
import type ChessBoard from "../ChessBoard";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type Move from "../Move/Move";
import { outcome } from "../Types/Game/outcome.enum";
import type { BoardLocation } from "../Types/Location/Location.type";
import type { file } from "../Types/Location/file.type";
import type { rank } from "../Types/Location/rank.type";

class BoardHelper {

    // gives you the board locations in a form of number for the array
    static boardLocationToIndex(boardLocation : BoardLocation) : number {
        const file: file = boardLocation.charAt(0) as file;
        const rank: rank = boardLocation.charAt(1) as rank;

        const fileIndex = file.charCodeAt(0) - "A".charCodeAt(0);
        const rankIndex = 8 - parseInt(rank, 10);

        return rankIndex * 8 + fileIndex;
    }

    /*
    *   **indexToBoardLocation(index)** 
    *
    *   This function is used to go form index to board location
    * 
    *   @example
    *   ```ts
    *       BoardHelper.indexToBoardLocation(0);
    *   ``` 
    *   
    *   @result
    *   ```ts
    *       A1
    *   ```
    */
    static indexToBoardLocation(index : number) : BoardLocation {
        if (index < 0 || index >= 64) {
            throw new Error("Invalid index. Must be between 0 and 63.");
        }

        const fileIndex = index % 8;
        const rankIndex = Math.floor(index / 8);

        const file: file = String.fromCharCode("A".charCodeAt(0) + fileIndex) as file;
        const rank: rank = (8 - rankIndex).toString() as rank;

        return `${file}${rank}` as BoardLocation;
    }

    //Returns the piece at the given location
    static findPieceAtIndex(API : Board, index : number) : IPiece | undefined {
        return API.tiles[index].piece;
    }
    static findPieceAtLocation(API : Board, location : BoardLocation) : IPiece | undefined {
        const index = this.boardLocationToIndex(location);

        return API.tiles[index].piece;
    }

    // Returns if you are in check
    static isInCheck(API:Board) : boolean {
        let isInCheck : boolean = false;
        let foundLocation : Move | undefined;
        const legalMoves : Move[] = API.getAllMoves();

        // Get the opponents King color
        if (API.isWhiteToMove) {
            foundLocation = legalMoves.find((item : Move) => item.capturedPiece?.data === "1101")
        }else {
            foundLocation = legalMoves.find((item : Move) => item.capturedPiece?.data === "0101")
        }
         
        // If there is one found then you are in check
        if (foundLocation) {
            isInCheck = true;
        }

        return isInCheck;
    }

    static isNextMoveInCheck(API : Board, move : Move) : boolean {
        // Make the simulated move
        API.makeMove(move);

        // Check if the simulated moves makes you in check
        const isInCheck : boolean = this.isInCheck(API);

        // undo the simulated move
        API.undoMove(move);

        // return the simulated move check
        return isInCheck;
    }

    static hasSufficientPieces(API : Board) : boolean {
        const whitePieces : IPiece[] = [];
        const blackPieces : IPiece[] = [];

        // Push all pieces into the array sorted on color 
        API.tiles.forEach((tile : Tile) => {
            if (!tile.piece) { return;}

            if(tile.piece.color === "0") {
                whitePieces.push(tile.piece)
            }else {
                blackPieces.push(tile.piece)
            }
        })

        // Calculate all the sufficient pieces
        const whiteSufficient : boolean = this.solveSufficientPieces(whitePieces);
        const blackSufficient : boolean = this.solveSufficientPieces(blackPieces);

        // Return true if one of them is sufficient of delivering checkmate
        if (whiteSufficient || blackSufficient) {
            return true;
        }

        return false;
    }

    private static solveSufficientPieces(pieces : IPiece[]) : boolean {
        const pieceCounts: Record<BinaryGroup<3>, number> = {
            "000": 0, // Pawn
            "001": 0, // Bishop
            "010": 0, // Knight
            "011": 0, // Rook
            "100": 0, // Queen
            "101": 0, // King
            "110": 0, // Nothing value needs to exist because of type
            "111": 0  // Nothing value needs to exist because of type
        };

        // Count the occurrences of each piece
        pieces.forEach((piece) => {
            pieceCounts[piece.piece]++;
        });

        // Check if there is a king other wise there is not even a way to win so return 
        if (pieceCounts["101"] === 0) { return false; }

        // Check if there is sufficient material based on your conditions
        // For example, you might consider that having at least one King and one other piece (e.g., Queen) is sufficient material
        // Credits to @Manthee1 for making it more readable
        if ( pieceCounts["100"] >= 1) return true //  Queen
        if ( pieceCounts["011"] >= 1) return true //  Rook
        if ( pieceCounts["000"] >= 1) return true //  Pawn
        if ( pieceCounts["001"] >= 2) return true //  2 Bishops
        if ( pieceCounts["010"] >= 3) return true //  3 Knights 
        if ( pieceCounts["001"] >= 1 && pieceCounts["010"] >= 1) return true  //  Bishop + Knight   

        return false;
    }

    static FiftyMovesPast(API : Board) : boolean {

        // Find the last pawn move
        let lastMovedPawn : number | undefined = API.playedMoves.findLastIndex((item : Move) => item.movingPiece.piece === "000");
        if (!lastMovedPawn) {lastMovedPawn = 0;}

        // Calculate the difference between PlayedMoves and pawnMove
        const movesBetween : number =  API.playedMoves.length - lastMovedPawn;

        // Check if it is above the 50 moves threshold and return true or false
        if (movesBetween >= 50) {
            return true;
        }

        return false;
    }

    // TODO: Implement threeFoldRepetition
    // static ThreeFoldRepetition(API : Board) : boolean {
    //     const playedMoves : Move[] = API.playedMoves;

    //     if (playedMoves.length < 3) {
    //         // Not enough moves for threefold repetition
    //         return false;
    //       }
      
    //       // Compare the last move with the previous two moves
    //       const lastMove = playedMoves[playedMoves.length - 1];
    //       const secondLastMove = playedMoves[playedMoves.length - 2];
    //       const thirdLastMove = playedMoves[playedMoves.length - 3];
      
    // }

    static SolveOutCome(API: Board) : outcome {
        function InCheck(API:Board) : boolean {
            let isInCheck : boolean = false;
            let foundLocation : Move | undefined;
            const legalMoves : Move[] = API.getAllOpponentsMoves();
    
            // Get the opponents King color
            if (API.isWhiteToMove) {
                foundLocation = legalMoves.find((item : Move) => item.capturedPiece?.data === "0101")
            }else {
                foundLocation = legalMoves.find((item : Move) => item.capturedPiece?.data === "1101")
            }
             
            // If there is one found then you are in check
            if (foundLocation) {
                isInCheck = true;
            }
    
            return isInCheck;
        }


        // When you do not have sufficient pieces it is automatically a draw
        if (!this.hasSufficientPieces(API)) {
            return outcome.InsufficientMaterial;
        }

        // When there hasn't bee a pawn move in 50 moves this will get fired
        if (this.FiftyMovesPast(API)) {
            return outcome.FiftyMoveRule;
        }

        // TODO: Implement threeFoldRepetition
        // if (this.ThreeFoldRepetition(API)) {
        //     return outcome.ThreeFoldRepetition;
        // }


        // When you don't have any moves to prevent the check then the game ends in an checkmate
        if (InCheck(API) && API.getLegalMoves().length === 0) {
            return outcome.Checkmate;
        }

        // When you don't have any available moves and you are not in check it is a stalemate
        if (!InCheck(API) && API.getLegalMoves().length === 0) {
            return outcome.Stalemate;
        }
    

        return undefined!;
    } 
}

export default BoardHelper;