import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import BoardHelper from "../../Helpers/BoardHelper";
import type { IPiece } from "../../Interfaces/Board/Pieces/IPieces";
import Move from "../../Move/Move";
import type { BoardLocation } from "../../Types/Location/Location.type";
import type Board from "../Board";

class Bishop implements IPiece {
    public location : BoardLocation;

    public readonly data: BinaryGroup<4>;
    public readonly color: BinaryDigit;
    public readonly piece: BinaryGroup<3>;

    constructor(location : BoardLocation, color : BinaryDigit) {
        this.location = location;
        this.color = color;
        this.piece = "001";
        this.data = (this.color + this.piece) as BinaryGroup<4>;
    }

    public getLegalMoves(API : Board): Move[] {
        const [file,rank] = this.location;
        const validMoves : Move[] = [];

        // All potential diagonal moves (up-right, up-left, down-right, down-left)
        const diagonalMoves = [
            { fileOffset: 1, rankOffset: 1 }, // Up-right
            { fileOffset: -1, rankOffset: 1 }, // Up-left
            { fileOffset: 1, rankOffset: -1 }, // Down-right
            { fileOffset: -1, rankOffset: -1 }, // Down-left
        ];

        for (const moveOffset of diagonalMoves) {
            let currentFile = file.charCodeAt(0) - "A".charCodeAt(0) + moveOffset.fileOffset;
            let currentRank = parseInt(rank) + moveOffset.rankOffset;
          
            while (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
                const moveBoardLocation : BoardLocation = (String.fromCharCode(currentFile + 65) + currentRank.toString()) as BoardLocation 
                const pieceAtPosition : IPiece | undefined = BoardHelper.findPieceAtLocation(API,moveBoardLocation);
            
              if (!pieceAtPosition) {
                // Empty square, add it to valid moves
                const move : Move = new Move(this,moveBoardLocation,API);
                validMoves.push(move);
            } else {
                if (pieceAtPosition.color !== this.color) {
                    // Enemy piece, add it to valid moves and stop further iterations in this direction
                    const move : Move = new Move(this,moveBoardLocation,API);
                    validMoves.push(move);
                }
                break; // Stop further iterations in this direction, as we can't move through pieces
              }
            
              // Move to the next square in the same diagonal direction
              currentFile += moveOffset.fileOffset;
              currentRank += moveOffset.rankOffset;
            }
          }

        return validMoves;
    }


}

export default Bishop;