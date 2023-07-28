import type { BoardLocation } from "../../../Types/Location/Location.type";
import type { file } from "../../../Types/Location/file.type";
import type { rank } from "../../../Types/Location/rank.type";
import type { IPiece } from "../Pieces/IPieces";

export interface ITile {
    readonly name : BoardLocation;
    readonly file : file;
    readonly rank : rank;
    readonly index : number;

    piece? : IPiece;
}