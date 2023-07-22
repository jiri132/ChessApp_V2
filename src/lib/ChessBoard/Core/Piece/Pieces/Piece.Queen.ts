import type ChessBoard from "../../Board";
import type { IPiece } from "../Piece"
import type { colorTable } from "../enum/Color.table.enum";
import type { move } from "../../Moves/move.type"
import { pieceTable } from "../enum/Pieces.table.enum";

class Queen implements IPiece {
    pieceData: pieceTable;
    pieceColor: colorTable; 
    location: move;

    constructor(color : colorTable,location : move) {
        this.pieceData = pieceTable.Queen;
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
      let currentFile = file.charCodeAt(0) - "A".charCodeAt(0) + moveOffset.fileOffset;
      let currentRank = parseInt(rank) + moveOffset.rankOffset;

      while (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
        //@ts-ignore
        const pieceAtPosition = board.getPieceAtPosition(String.fromCharCode(currentFile + 65) + currentRank.toString());

        if (!pieceAtPosition) {
          // Empty square, add it to valid moves
          //@ts-ignore
          validMoves.push(String.fromCharCode(currentFile + 65) + currentRank.toString());
        } else {
          if (pieceAtPosition.pieceColor !== this.pieceColor) {
            // Enemy piece, add it to valid moves and stop further iterations in this direction
            //@ts-ignore
            validMoves.push(String.fromCharCode(currentFile + 65) + currentRank.toString());
          }
          break; // Stop further iterations in this direction, as we can't move through pieces
        }

        // Move to the next square in the same direction
        currentFile += moveOffset.fileOffset;
        currentRank += moveOffset.rankOffset;
      }
    }

    return validMoves;
    }

}

export default Queen;