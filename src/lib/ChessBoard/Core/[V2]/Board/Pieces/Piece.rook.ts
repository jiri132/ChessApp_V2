import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import type { IPiece } from "../../Interfaces/Board/Pieces/IPieces";
import type Move from "../../Move/Move";
import type { BoardLocation } from "../../Types/Location/Location.type";

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

    public PieceLegalMoves(): Move[] {
        throw new Error("Method not implemented.");
    }
}

export default Rook;