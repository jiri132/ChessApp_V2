import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import BoardHelper from "../../Helpers/BoardHelper";
import type { IPiece } from "../../Interfaces/Board/Pieces/IPieces";
import Move from "../../Move/Move";
import type { BoardLocation } from "../../Types/Location/Location.type";
import type Board from "../Board";

class King implements IPiece {
    public location : BoardLocation;

    public readonly data: BinaryGroup<4>;
    public readonly color: BinaryDigit;
    public readonly piece: BinaryGroup<3>;

    constructor(location : BoardLocation, color : BinaryDigit) {
        this.location = location;
        this.color = color;
        this.piece = "101";
        this.data = (this.color + this.piece) as BinaryGroup<4>;
    }

    public getLegalMoves(API : Board): Move[] {
        if (this.location === null) {return [];}
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
            const currentFile = file.charCodeAt(0) - "A".charCodeAt(0) + moveOffset.fileOffset;
            const currentRank = parseInt(rank) + moveOffset.rankOffset;

            if (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
                const tile : BoardLocation = String.fromCharCode(currentFile + 65) + currentRank.toString() as BoardLocation;
                const _move : Move = new Move(this,tile, API);

                if (!_move.capturedPiece || _move.capturedPiece.color !== this.color) {
                    // Empty square or enemy piece, add it to valid moves
                    validMoves.push(_move);
                }
            }
        }

        // Check for castling opportunities (Kingside and Queenside)
        // ... Implement castling logic here ...

        return validMoves;
    }
}

export default King;