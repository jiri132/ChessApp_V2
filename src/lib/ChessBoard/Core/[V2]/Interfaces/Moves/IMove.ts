import type { BoardLocation } from "../../Types/Location/Location.type";
import type { IPiece } from "../Board/Pieces/IPieces";

export interface IMove {
    // Which piece is getting moved to where
    movingPiece : IPiece;
    to : BoardLocation;
    from : BoardLocation;

    // the captured piece
    capturedPiece : IPiece | undefined;

    // the index of the `to` positions
    to_index : number; 
    from_index : number;
}