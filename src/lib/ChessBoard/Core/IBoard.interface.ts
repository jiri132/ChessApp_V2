import type ChessBoard from "./Board";
import type { move } from "./Moves/move.type";
import type { playedMoves } from "./Moves/playedMoves.type";
import type { IPiece } from "./Piece/IPiece";
import type { colorTable } from "./Piece/enum/Color.table.enum";

export interface IBoard {

    /*
    *    **PUBLICS**
    *   
    *    All the underlying variables or functions are public class members
    *    Most often used functions for bot data/logic to create the whole interaction with the game 
    */

    /*
    *   **playedMoves** 
    *
    *   This constant variable saves all the past moves that where made
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       board.makeMove("A2", "A4");
    *       console.log(board.playedMoves); 
    *   ``` 
    *   
    *   @result
    *   ```ts
    *       @{Engine Notation}
    *       [["A2A4", <black move>], ...]
    *       @{Algebraic Notation}
    *       [["A4", <black move>], ...]
    *   ```
    */
    readonly playedMoves : playedMoves[];

    /*
    *   **isWhiteToMove** 
    *
    *   This function is used to check if it is whites turn to play a move if it is not then it is blacks move
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       console.log(board.isWhiteTurn); 
    *       board.playMove("A2","A4");
    *       console.log(board.isWhiteTurn); 
    *   ``` 
    *   
    *   @result
    *   ```ts
    *       True
    *       >> "White played the move `A2` to `A4` "
    *       False
    *   ```
    */
    readonly isWhiteToMove : boolean;

    /*
    *   **game** 
    *
    *   This constant variable saves the positions of all the pieces
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       console.log(board.game); 
    *   ``` 
    *   
    *   @result -folded
    *   ```ts
    *       [Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8), Array(8)]
    *   ```
    */
    //game : IPiece[][];
       
    /*
    *   **makeMove()** 
    *
    *   This function is used when you need to play a move on the board 
    *   Players interaction is via the GUI and the bots have to be playing by this API to the board.
    * 
    *   A separate API will be made when the engine gets created and people can create their own bots with coding blocks
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       board.makeMove("A2","A4");
    *   ``` 
    *   
    *   @result -folded
    *   ```ts
    *       >> "moved Virtual `A2` to `A4` "
    *   ```
    */
    makeMove() : void;

    /*
    *   **undoMove()** 
    *
    *   This function is used when you want the chess bot to undo a VIRTUAL move 
    *   all moves created through `makeMove()` are set to be `Virtual` moves
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       board.makeMove("A2","A4");
    *       board.undoMove();
    *   ``` 
    *   
    *   @result
    *   ```ts
    *      >> "moved Virtual `A2` to `A4` "
    *      >> "undo Virtual move `A2` to `A4` "
    *   ```
    */
    undoMove() : void;

    /*
    *   **playMove()** 
    *
    *   This function is used when the player makes a move or the bot is SURE to play THAT specific move!
    *   this ensures that only the actually played moves will be displayed and saved in the memory of `playedMoves`
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       board.playMove("A2", "A4");
    *       console.log(board.playedMoves);
    *       board.playMove("A7", "A5");
    *       console.log(board.playedMoves);
    *   ``` 
    *   
    *   @result
    *   ```ts
    *       >> "White played the move `A2` to `A4` "
    *       [["A2A4"]]
    *       >> "Black played the move `A7` to `A5` "
    *       [["A2A4","A7A5"]]
    *   ```
    */
    playMove(playedMove : playedMoves): void;

   


    /*
    *   **getAllLegalMoves()** 
    *
    *   This function gives back all possible legal moves in the format of `playedMoves`
    *   The format of `playedMoves` ensures that there will be no bugs with played moves for example
    *   
    *   @bug report
    *   `B2 -> A3` was a possibility for the engine when it was in the format of `moves`
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       console.log(board.getYourLegalMoves()); 
    *   ``` 
    *   
    *   @result -folded
    *   ```ts
    *      ["A2A3", "A2A4", "B2B3", "B2B4", "C2C3", "C2C4", "D2D3", "D2D4", "E2E3", "E2E4", "F2F3", "F2F4", "G2G3", "G2G4", "H2H3", "H2H4", "B1A3", "B1C3", "G1F3", "G1H3"]
    *   ```
    */
    getYourLegalMoves() : playedMoves[];

    /*
    *   **getOpponentLegalMoves()** 
    *
    *   This function gives back all possible legal moves in the format of `playedMoves`
    *   The format of `playedMoves` ensures that there will be no bugs with played moves for example
    *   
    *   @bug report
    *   `B2 -> A3` was a possibility for the engine when it was in the format of `moves`
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       console.log(board.getOpponentLegalMoves()); 
    *   ``` 
    *   
    *   @result -folded
    *   ```ts
    *      ["A2A3", "A2A4", "B2B3", "B2B4", "C2C3", "C2C4", "D2D3", "D2D4", "E2E3", "E2E4", "F2F3", "F2F4", "G2G3", "G2G4", "H2H3", "H2H4", "B1A3", "B1C3", "G1F3", "G1H3"]
    *   ```
    */
    getOpponentsLegalMoves() : playedMoves[];
    /*
    *   **getPieceAtPosition()** 
    *
    *   This function can be used for the chess API, it has been implemented into the base function 
    *   to help other functions with calculating and finding the pieces at the specified indexes   
    * 
    *   @example
    *   ```ts
    *       board = new board();
    *       console.log(board.getPieceAtPosition("A2")); 
    *   ``` 
    *   
    *   @result -folded
    *   ```ts
    *       class Pawn
    *   ```
    */
    getPieceAtPosition(position : move) : IPiece | null;




    /*
    *    **PRIVATES**
    *   
    *    All the underlying variables or functions are public class members
    *    Most often used functions for bot data/logic to create the whole interaction with the game 
    */
    
    //movePiece(fromPosition : move, toPosition : move, board) : IPiece[][]
    //private getIndexFileRank(position : move) : [number, number]
    
}