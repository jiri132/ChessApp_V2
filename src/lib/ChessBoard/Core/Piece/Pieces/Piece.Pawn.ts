import type ChessBoard from "../../Board";
import type { IPiece } from "../Piece"
import { colorTable } from "../enum/Color.table.enum";
import { pieceTable } from "../enum/Pieces.table.enum";

class Pawn implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location: string;

    constructor(color : colorTable,location : string) {
        this.pieceData = pieceTable.Pawn;
        this.pieceColor = color;    
        this.location = location;
    }

    legalMoves(board : ChessBoard): string[] {
        const legalMoves: string[] = [];
        const [file, rank] = this.location;

        // Determine the direction the pawn should move based on its color
        const direction = this.pieceColor === colorTable.white ? 1 : -1;

        // Check the single square in front of the pawn
        const nextRank = String.fromCharCode(rank.charCodeAt(0) + direction);
        const nextSquare = `${file}${nextRank}`;
        if (!board.getPieceAtPosition(nextSquare)) {
            legalMoves.push(nextSquare);
        }

        // Check the double square move from the starting position
        if ((this.pieceColor === colorTable.white && rank === "2") || (this.pieceColor === colorTable.black && rank === "7")) {
            const doubleMoveRank = String.fromCharCode(rank.charCodeAt(0) + 2 * direction);
            const doubleMoveSquare = `${file}${doubleMoveRank}`;
            if (!board.getPieceAtPosition(doubleMoveSquare) && !board.getPieceAtPosition(nextSquare)) {
                legalMoves.push(doubleMoveSquare);
            }
        }

        // Check captures diagonally
        const captureMoves: string[] = [
            String.fromCharCode(file.charCodeAt(0) + 1) + nextRank,
            String.fromCharCode(file.charCodeAt(0) - 1) + nextRank,
        ];

        for (const move of captureMoves) {
            const pieceAtCaptureSquare = board.getPieceAtPosition(move);
            if (pieceAtCaptureSquare && pieceAtCaptureSquare.pieceColor !== this.pieceColor) {
                legalMoves.push(move);
            }
        }

        return legalMoves;
    }

}

export default Pawn;