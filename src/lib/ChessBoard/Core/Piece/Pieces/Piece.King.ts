import type ChessBoard from "../../Board";
import type { IPiece } from "../IPiece"
import type { colorTable } from "../enum/Color.table.enum";
import type { move } from "../../Moves/move.type"
import { pieceTable } from "../enum/Pieces.table.enum";

class King implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location: move;

    hasMoved:boolean = false;

    constructor(color : colorTable,location : move) {
        this.pieceData = pieceTable.King;
        this.pieceColor = color;    
        this.location = location;
    }

    isLegalMove(board: ChessBoard, move: move): boolean {
        if  (this.legalMoves(board).includes(move)) {
            console.log(this.legalMoves(board))
            return true;
        } 
        else {
            return false;
        }       
    }
    legalMoves(board : ChessBoard): move[] {
        const [file, rank] = this.location;
        const validMoves: move[] = [];

        // All potential moves (up, down, left, right, and the four diagonal directions)
        const allMoves = [
            { fileOffset: 1, rankOffset: 0 }, // Right
            { fileOffset: -1, rankOffset: 0 }, // Left
            { fileOffset: 0, rankOffset: 1 }, // Up
            { fileOffset: 0, rankOffset: -1 }, // Down
            { fileOffset: 1, rankOffset: 1 }, // Up-right
            { fileOffset: -1, rankOffset: 1 }, // Up-left
            { fileOffset: 1, rankOffset: -1 }, // Down-right
            { fileOffset: -1, rankOffset: -1 }, // Down-left
        ];

        for (const moveOffset of allMoves) {
            const currentFile = file.charCodeAt(0) - "A".charCodeAt(0) + moveOffset.fileOffset;
            const currentRank = parseInt(rank) + moveOffset.rankOffset;

            if (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
                // @ts-ignore
                const tile : move = String.fromCharCode(currentFile + 65) + currentRank.toString();
                const pieceAtPosition = board.getPieceAtPosition(tile);

                if (pieceAtPosition === null) {continue;}

                // console.log(tile)
                if (board.isAttackedSquare(tile)) {continue;}

                if (!pieceAtPosition || pieceAtPosition.pieceColor !== this.pieceColor ) {
                    // Empty square or enemy piece, add it to valid moves
                    // @ts-ignore
                    validMoves.push(String.fromCharCode(currentFile + 65) + currentRank.toString());
                }
            }
        }

        // Check for castling opportunities (Kingside and Queenside)
        // ... Implement castling logic here ...

        return validMoves;
    }

}

export default King;