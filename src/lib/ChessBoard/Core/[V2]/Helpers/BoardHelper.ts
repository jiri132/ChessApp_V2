
import type ChessBoard from "../ChessBoard";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type { BoardLocation } from "../Types/Location/Location.type";

class BoardHelper {

    // gives you the board locations in a form of number for the array
    static boardLocationToIndex(BoardLocation : BoardLocation) : number {
        throw new Error("Function not implemented")
    }

    //Returns the piece at the given location
    static findPieceAt(API : ChessBoard, Location : BoardLocation) : IPiece {
        throw new Error("Function not implemented")
    }

    // Returns if you are in check
    static isInCheck(API:ChessBoard) : boolean {
        throw new Error("Function not implemented")
    }
}

export default BoardHelper;