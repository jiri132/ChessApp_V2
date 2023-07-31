import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { BinaryGroup } from "$lib/BitArray/Core/Types/Binary/BinaryGroup.type";
import BoardHelper from "../../Helpers/BoardHelper";
import type { IPiece } from "../../Interfaces/Board/Pieces/IPieces";
import Move from "../../Move/Move";
import type { BoardLocation } from "../../Types/Location/Location.type";
import type Board from "../Board";

class Knight implements IPiece {
    public location : BoardLocation;

    public readonly data: BinaryGroup<4>;
    public readonly color: BinaryDigit;
    public readonly piece: BinaryGroup<3>;

    constructor(location : BoardLocation, color : BinaryDigit) {
        this.location = location;
        this.color = color;
        this.piece = "010";
        this.data = (this.color + this.piece) as BinaryGroup<4>;
    }

    public getLegalMoves(API : Board): Move[] {
        const [file, rank] = this.location;
        const validMoves: Move[] = [];
    
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
            const newLocation : BoardLocation = (String.fromCharCode(targetFile + 65)+ targetRank.toString()) as BoardLocation
            const pieceAtPosition : IPiece | undefined = BoardHelper.findPieceAtLocation(API,newLocation);
    
            if (!pieceAtPosition || pieceAtPosition.color !== this.color) {
              // Add the valid move to the valid moves array
              const move : Move = new Move(this,newLocation,API);
              validMoves.push(move);
            }
          }
        }
    
        return validMoves;
    }
}

export default Knight;