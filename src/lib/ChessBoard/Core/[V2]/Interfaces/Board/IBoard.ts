import type Tile from "../../Board/Tile/Tile";
import type Move from "../../Move/Move";

export interface IBoard {
    readonly tiles : Tile[];
    readonly playedMoves : Move[];

}