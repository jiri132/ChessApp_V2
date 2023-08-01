import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import BoardHelper from "../../Helpers/BoardHelper";
import type { IPiece } from "../../Interfaces/Board/Pieces/IPieces";
import Move from "../../Move/Move";
import type { BoardLocation } from "../../Types/Location/Location.type";
import type Board from "../Board";

class Pawn implements IPiece {
    public location : BoardLocation;

    public readonly data: BinaryGroup<4>;
    public readonly color: BinaryDigit;
    public readonly piece: BinaryGroup<3>;

    constructor(location : BoardLocation, color : BinaryDigit) {
        this.location = location;
        this.color = color;
        this.piece = "000";
        this.data = (this.color + this.piece) as BinaryGroup<4>;
    }

    public getLegalMoves(API : Board): Move[] {
        const [file, rank] = this.location;
        const legalMoves: Move[] = [];

        // Determine the direction the pawn should move based on its color
        const direction = this.color === "0" ? 1 : -1;

        // Check the single square in front of the pawn
        const nextRank = parseInt(rank) + direction;
        const nextSquare : BoardLocation = `${file}${nextRank}` as BoardLocation;

        // return empty array when the next rank is outside of the area
        if (nextRank === 0 || nextRank > 8) {
            return [];
        }

        if (!BoardHelper.findPieceAtLocation(API,nextSquare)) {
            const move : Move = new Move(this,nextSquare,API);
            legalMoves.push(move)
        }

        // Check the double square move from the starting position
        if ((this.color === "0" && rank === "2") || (this.color === "1" && rank === "7")) {
            const doubleMoveRank : string = String.fromCharCode(rank.charCodeAt(0) + 2 * direction);

            const doubleMoveSquare : BoardLocation = `${file}${doubleMoveRank}` as BoardLocation;
            if (!BoardHelper.findPieceAtLocation(API,doubleMoveSquare) && !BoardHelper.findPieceAtLocation(API, nextSquare)) {
                const move : Move = new Move(this,doubleMoveSquare,API);
                legalMoves.push(move)
            }
        }

        // Check captures diagonally
        const captureLocations: BoardLocation[] = [
            String.fromCharCode(file.charCodeAt(0) + 1) + nextRank as BoardLocation, 
            String.fromCharCode(file.charCodeAt(0) - 1) + nextRank as BoardLocation,
        ];

        for (const move of captureLocations) {
            if (move.charAt(0) === "@" || move.charAt(0) === "I") {
                continue;
            }

            const _move : Move = new Move(this,move,API);
            // Push when it is not undefined
            if (_move.capturedPiece === undefined) { continue; }

            // break if same color
            if (_move.capturedPiece.color === this.color) { continue; }   
            
            legalMoves.push(_move);
        }

        return legalMoves;
    }
}

export default Pawn;