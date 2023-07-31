import type { BoardLocation } from "../../Types/Location/Location.type";
import type { IPiece } from "../Board/Pieces/IPieces";

export interface IMove {
    // Which piece is getting moved to where
    readonly movingPiece : IPiece;
    readonly to : BoardLocation;
    readonly from : BoardLocation;

    // the captured piece
    readonly capturedPiece : IPiece | undefined;

    // the index of the `to` positions
    readonly to_index : number; 
    readonly from_index : number;

    // Notations
    readonly algebraic_notation : string;
}