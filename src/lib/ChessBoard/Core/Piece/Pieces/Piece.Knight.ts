import type ChessBoard from "../../Board";
import type { IPiece } from "../IPiece"
import type { colorTable } from "../enum/Color.table.enum";
import type { move } from "../../Moves/move.type"
import { pieceTable } from "../enum/Pieces.table.enum";

class Knight implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location: move;

    constructor(color : colorTable,location : move) {
        this.pieceData = pieceTable.Knight;
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
    
        // All potential knight moves from the current position
        const knightMoves = [
          { fileOffset: 1, rankOffset: 2 },
          { fileOffset: -1, rankOffset: 2 },
          { fileOffset: 2, rankOffset: 1 },
          { fileOffset: -2, rankOffset: 1 },
          { fileOffset: 1, rankOffset: -2 },
          { fileOffset: -1, rankOffset: -2 },
          { fileOffset: 2, rankOffset: -1 },
          { fileOffset: -2, rankOffset: -1 },
        ];
    
        for (const moveOffset of knightMoves) {
          const targetFile = file.charCodeAt(0) - "A".charCodeAt(0) + moveOffset.fileOffset;
          const targetRank = parseInt(rank) + moveOffset.rankOffset;
    
          if (targetFile >= 0 && targetFile <= 7 && targetRank >= 1 && targetRank <= 8) {
            // @ts-ignore
            const pieceAtPosition = board.getPieceAtPosition(String.fromCharCode(targetFile + 65)+ targetRank.toString());
    
            if (!pieceAtPosition || pieceAtPosition.pieceColor !== this.pieceColor) {
              // Add the valid move to the valid moves array
              //@ts-ignore
              validMoves.push(String.fromCharCode(targetFile + 65)+targetRank.toString());
            }
          }
        }
    
        return validMoves;
    }

}

export default Knight;