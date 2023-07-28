import type ChessBoard from "../ChessBoard";
import BoardHelper from "../Helpers/BoardHelper";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type { IMove } from "../Interfaces/Moves/IMove";
import type { BoardLocation } from "../Types/Location/Location.type";

class Move implements IMove {
    public readonly movingPiece: IPiece;
    public readonly to: BoardLocation;
    public readonly capturedPiece: IPiece;

    // Are these 2 really needed? 
    public readonly from: BoardLocation;
    public readonly index: number;
    
    constructor(movingPiece : IPiece, to : BoardLocation, Chessboard : ChessBoard) {
        this.movingPiece = movingPiece;
        this.from = movingPiece.location;
        this.to = to;

        this.capturedPiece = BoardHelper.findPieceAt(Chessboard, this.to);
        this.index = BoardHelper.boardLocationToIndex(this.to);
    }
}

export default Move;