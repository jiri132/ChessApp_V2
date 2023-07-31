
import type Board from "../Board/Board";
import type ChessBoard from "../ChessBoard";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type { BoardLocation } from "../Types/Location/Location.type";
import type { file } from "../Types/Location/file.type";
import type { rank } from "../Types/Location/rank.type";

class BoardHelper {

    // gives you the board locations in a form of number for the array
    static boardLocationToIndex(boardLocation : BoardLocation) : number {
        const file: file = boardLocation.charAt(0) as file;
        const rank: rank = boardLocation.charAt(1) as rank;

        const fileIndex = file.charCodeAt(0) - "A".charCodeAt(0);
        const rankIndex = 8 - parseInt(rank, 10);

        return rankIndex * 8 + fileIndex;
    }

    /*
    *   **indexToBoardLocation(index)** 
    *
    *   This function is used to go form index to board location
    * 
    *   @example
    *   ```ts
    *       BoardHelper.indexToBoardLocation(0);
    *   ``` 
    *   
    *   @result
    *   ```ts
    *       A1
    *   ```
    */
    static indexToBoardLocation(index : number) : BoardLocation {
        if (index < 0 || index >= 64) {
            throw new Error("Invalid index. Must be between 0 and 63.");
        }

        const fileIndex = index % 8;
        const rankIndex = Math.floor(index / 8);

        const file: file = String.fromCharCode("A".charCodeAt(0) + fileIndex) as file;
        const rank: rank = (8 - rankIndex).toString() as rank;

        return `${file}${rank}` as BoardLocation;
    }

    //Returns the piece at the given location
    static findPieceAtIndex(API : Board, index : number) : IPiece | undefined {
        return API.tiles[index].piece;
    }
    static findPieceAtLocation(API : Board, location : BoardLocation) : IPiece | undefined {
        const index = this.boardLocationToIndex(location);

        return API.tiles[index].piece;
    }

    // Returns if you are in check
    static isInCheck(API:ChessBoard) : boolean {
        throw new Error("Function not implemented")
    }
}

export default BoardHelper;