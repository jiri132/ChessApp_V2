import type Board from "../Board/Board";
import type ChessBoard from "../ChessBoard";
import BoardHelper from "../Helpers/BoardHelper";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type { IMove } from "../Interfaces/Moves/IMove";
import type { BoardLocation } from "../Types/Location/Location.type";

class Move implements IMove {
    public readonly movingPiece: IPiece;
    public readonly to: BoardLocation;
    public readonly to_index: number;
    public readonly capturedPiece: IPiece | undefined;

    // Are these 2 really needed? 
    public readonly from: BoardLocation;
    public readonly from_index: number
    
    // Notations
    public readonly algebraic_notation: string;


    constructor(movingPiece : IPiece, to : BoardLocation, board : Board) {
        this.movingPiece = movingPiece;
        this.from = movingPiece.location;
        this.to = to;

        this.from_index = BoardHelper.boardLocationToIndex(this.from);
        this.to_index = BoardHelper.boardLocationToIndex(this.to);

        this.capturedPiece = BoardHelper.findPieceAtIndex(board, this.to_index);

        this.algebraic_notation = this.getAlgebraicNotation();
    }

    private getAlgebraicNotation() : string {
        let notation = "";

        // get the letter of the moving place
        switch (this.movingPiece.piece) {
            case "001":
                notation += "B"
                break;
            case "010":
                notation += "K"
                break;
            case "011":
                notation += "R"
                break;
            case "100":
                notation += "Q"
                break;
            case "101":
                notation += "K"
                break;
        }

        if (this.capturedPiece) {notation += "x"}

        notation += this.to.toLowerCase();

        return notation;
    }
}

export default Move;