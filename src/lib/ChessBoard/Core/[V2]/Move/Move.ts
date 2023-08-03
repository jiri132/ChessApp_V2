import type Board from "../Board/Board";
import Queen from "../Board/Pieces/Piece.queen";
import type ChessBoard from "../ChessBoard";
import BoardHelper from "../Helpers/BoardHelper";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type { IMove } from "../Interfaces/Moves/IMove";
import type { BoardLocation } from "../Types/Location/Location.type";

class Move implements IMove {
    public readonly movingPiece: IPiece;
    public readonly from: BoardLocation;
    public readonly from_index: number
    public readonly to: BoardLocation;
    public readonly to_index: number;
    
    // Notations
    public readonly algebraic_notation: string;

    // Flags
    public readonly capturedPiece: IPiece | undefined;
    public readonly promotionType: IPiece | undefined;

    constructor(movingPiece : IPiece, to : BoardLocation, board : Board) {
        this.movingPiece = movingPiece;
        this.from = movingPiece.location;
        this.to = to;

        this.from_index = BoardHelper.boardLocationToIndex(this.from);
        this.to_index = BoardHelper.boardLocationToIndex(this.to);

        this.capturedPiece = BoardHelper.findPieceAtIndex(board, this.to_index);

        // When the piece is a pawn and gets to the opposite side of it create a queen
        if (movingPiece.data === "0000" && to.includes("8") || movingPiece.data === "1000" && to.includes("1")) {
            // create a promotion piece
            this.promotionType = new Queen(to,movingPiece.color);
        } 
        
        this.algebraic_notation = this.getAlgebraicNotation();
    }

    private getAlgebraicNotation() : string {
        function getPieceLetter(Piece : IPiece) : string {
            let notation = "";

            switch (Piece.piece) {
                case "001":
                    notation = "B"
                    break;
                case "010":
                    notation = "N"
                    break;
                case "011":
                    notation = "R"
                    break;
                case "100":
                    notation = "Q"
                    break;
                case "101":
                    notation = "K"
                    break;
            }
            return notation;
        }
        
        let notation = "";

        // Get the letter of the moving place
        notation += getPieceLetter(this.movingPiece);

        // When you capture an piece mark with "x"
        if (this.capturedPiece) {
            if (this.movingPiece.piece === "000") {
                notation += this.from.charAt(0).toLowerCase();
            }
            notation += "x"
        }

        // Set the played move into the notation in lowercase
        notation += this.to.toLowerCase();

        // Get the letter of the promotion piece
        if (this.promotionType) {notation += "=" + getPieceLetter(this.promotionType)}

        // Return the full notation 
        return notation;
    }
}

export default Move;