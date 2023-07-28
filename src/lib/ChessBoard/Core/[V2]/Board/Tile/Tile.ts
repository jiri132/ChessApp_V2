import BoardHelper from "../../Helpers/BoardHelper";
import type { IPiece } from "../../Interfaces/Board/Pieces/IPieces";
import type { ITile } from "../../Interfaces/Board/Tile/ITile";
import type { BoardLocation } from "../../Types/Location/Location.type";
import type { file } from "../../Types/Location/file.type";
import type { rank } from "../../Types/Location/rank.type";

class Tile implements ITile {
    public readonly name : BoardLocation;
    public readonly file : file;
    public readonly rank : rank;
    public readonly index: number;

    public piece?: IPiece;

    constructor(name : BoardLocation, piece? : IPiece) {
        this.name = name;
        this.file = name.charAt(0) as file;
        this.rank = name.charAt(1) as rank;
        this.index = BoardHelper.boardLocationToIndex(name);
        this.piece = piece; 
    }
}

export default Tile;