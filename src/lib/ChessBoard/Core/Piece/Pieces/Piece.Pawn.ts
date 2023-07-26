import type ChessBoard from "../../Board";
import type { IPiece } from "../IPiece"
import type { move } from "../../Moves/move.type"
import { colorTable } from "../enum/Color.table.enum";
import { pieceTable } from "../enum/Pieces.table.enum";

class Pawn implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location: move;

    constructor(color : colorTable,location : move) {
        this.pieceData = pieceTable.Pawn;
        this.pieceColor = color;    
        this.location = location;
    }

    isLegalMove(board: ChessBoard, move: move): boolean {
        if  (this.legalMoves(board).includes(move)) {
            return true;
        } 
        else {
            return false;
        }       
    }

    public attackingSquares(board : ChessBoard) : move[] {
        const attackingSquares : move[] = [];
        const [file, rank] = this.location;

        // Check captures diagonally
        // Determine the direction the pawn should move based on its color
        const direction = this.pieceColor === colorTable.white ? 1 : -1;

        // Check the single square in front of the pawn
        const nextRank = String.fromCharCode(rank.charCodeAt(0) + direction);
        
        const captureMoves: move[] = [
            String.fromCharCode(file.charCodeAt(0) + 1) + nextRank as move, 
            String.fromCharCode(file.charCodeAt(0) - 1) + nextRank as move,
        ];

        for (const move of captureMoves) {
            attackingSquares.push(move);
        }
        
        
        return attackingSquares;
    }
    legalMoves(board : ChessBoard): move[] {
        const legalMoves: move[] = [];
        const [file, rank] = this.location;

        // Determine the direction the pawn should move based on its color
        const direction = this.pieceColor === colorTable.white ? 1 : -1;

        // Check the single square in front of the pawn
        const nextRank = String.fromCharCode(rank.charCodeAt(0) + direction);
        
        const nextSquare : move= `${file}${nextRank}` as move;
        if (!board.getPieceAtPosition(nextSquare)) {
            legalMoves.push(nextSquare);
        }

        // Check the double square move from the starting position
        if ((this.pieceColor === colorTable.white && rank === "2") || (this.pieceColor === colorTable.black && rank === "7")) {
            const doubleMoveRank = String.fromCharCode(rank.charCodeAt(0) + 2 * direction);

            const doubleMoveSquare : move = `${file}${doubleMoveRank}` as move;
            if (!board.getPieceAtPosition(doubleMoveSquare) && !board.getPieceAtPosition(nextSquare)) {
                legalMoves.push(doubleMoveSquare);
            }
        }

        // Check captures diagonally
        const captureMoves: move[] = [
            String.fromCharCode(file.charCodeAt(0) + 1) + nextRank as move, 
            String.fromCharCode(file.charCodeAt(0) - 1) + nextRank as move,
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