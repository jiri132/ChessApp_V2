import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import type { IPiece } from "../../Interfaces/Board/Pieces/IPieces";
import Move from "../../Move/Move";
import type { BoardLocation } from "../../Types/Location/Location.type";
import type Board from "../Board";

class Queen implements IPiece {
    public location : BoardLocation;

    public readonly data: BinaryGroup<4>;
    public readonly color: BinaryDigit;
    public readonly piece: BinaryGroup<3>;

    constructor(location : BoardLocation, color : BinaryDigit) {
        this.location = location;
        this.color = color;
        this.piece = "100";
        this.data = (this.color + this.piece) as BinaryGroup<4>;
    }

    public PieceLegalMoves(API : Board): Move[] {
        const [file, rank] = this.location;
        const validMoves: Move[] = [];

        // All potential moves (up, down, left, right, and the four diagonal directions)
        const allMoves = [
            { fileOffset: 1, rankOffset: 0 }, // Right
            { fileOffset: -1, rankOffset: 0 }, // Left
            { fileOffset: 0, rankOffset: 1 }, // Up
            { fileOffset: 0, rankOffset: -1 }, // Down
            { fileOffset: 1, rankOffset: 1 }, // Up-right
            { fileOffset: -1, rankOffset: 1 }, // Up-left
            { fileOffset: 1, rankOffset: -1 }, // Down-right
            { fileOffset: -1, rankOffset: -1 }, // Down-left
        ];

        for (const moveOffset of allMoves) {
            let currentFile = file.charCodeAt(0) - "A".charCodeAt(0) + moveOffset.fileOffset;
            let currentRank = parseInt(rank) + moveOffset.rankOffset;

            while (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
                const newLocation = (String.fromCharCode(currentFile + 65) + currentRank).toString() as BoardLocation;
                const move : Move = new Move(this,newLocation,API);

                if (!move.capturedPiece) {
                    // Empty square, add it to valid moves
                    validMoves.push(move);
                } else {
                    if (move.capturedPiece.color !== this.color) {
                        // Enemy piece, add it to valid moves and stop further iterations in this direction
                        validMoves.push(move);
                    }
                    break; // Stop further iterations in this direction, as we can't move through pieces
                }

                // Move to the next square in the same direction
                currentFile += moveOffset.fileOffset;
                currentRank += moveOffset.rankOffset;
            }
        }

        return validMoves;
    }
}

export default Queen;