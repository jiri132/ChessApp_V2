import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import type Move from "../../../Move/Move";
import type { BoardLocation } from "../../../Types/Location/Location.type";

export interface IPiece {
    // get the location on the board
    location : BoardLocation;
    // all the data of the piece (color piece)
    readonly data : BinaryGroup<4>;
    // color 0 | 1
    readonly color : BinaryDigit;
    // 000 to 111     
    readonly piece : BinaryGroup<3>;

    PieceLegalMoves() : Move[];
}