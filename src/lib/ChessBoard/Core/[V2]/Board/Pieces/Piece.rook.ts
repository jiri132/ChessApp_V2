import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import BoardHelper from "../../Helpers/BoardHelper";
import type { IPiece } from "../../Interfaces/Board/Pieces/IPieces";
import Move from "../../Move/Move";
import type { BoardLocation } from "../../Types/Location/Location.type";
import type Board from "../Board";

class Rook implements IPiece {
    public location : BoardLocation;

    public readonly data: BinaryGroup<4>;
    public readonly color: BinaryDigit;
    public readonly piece: BinaryGroup<3>;

    constructor(location : BoardLocation, color : BinaryDigit) {
        this.location = location;
        this.color = color;
        this.piece = "011";
        this.data = (this.color + this.piece) as BinaryGroup<4>;
    }

    public getLegalMoves(API : Board): Move[] {
      if (this.location === null) {return [];}

        const [file, rank] = this.location;
        const validMoves: Move[] = [];
    
        // Check moves in all four directions (up, down, left, right)
        const directions = [
          { fileOffset: 0, rankOffset: 1 }, // Up
          { fileOffset: 0, rankOffset: -1 }, // Down
          { fileOffset: 1, rankOffset: 0 }, // Right
          { fileOffset: -1, rankOffset: 0 }, // Left
        ];
    
        for (const direction of directions) {
          let currentFile = file.charCodeAt(0) - "A".charCodeAt(0) + direction.fileOffset;
          let currentRank = parseInt(rank) + direction.rankOffset;
    
          while (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
            const pieceAtPosition : IPiece | undefined = BoardHelper.findPieceAtLocation(API,(String.fromCharCode(currentFile + 65) + currentRank).toString() as BoardLocation);
            const move : Move = new Move(this,(String.fromCharCode(currentFile + 65) + currentRank.toString()) as BoardLocation,API)
    
            if (!pieceAtPosition) {
                // Empty square, add it to valid moves
                validMoves.push(move);
            } else {
                if (pieceAtPosition.color !== this.color) {
                    // Enemy piece, add it to valid moves and stop further iterations in this direction
                    validMoves.push(move);
                }
                break; // Stop further iterations in this direction, as we can't move through pieces
            }
    
            // Move to the next square in the same direction
            currentFile += direction.fileOffset;
            currentRank += direction.rankOffset;
          }
        }
    
        return validMoves;
    }
}

export default Rook;