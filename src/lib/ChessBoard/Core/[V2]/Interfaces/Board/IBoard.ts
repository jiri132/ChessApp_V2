import type Tile from "../../Board/Tile/Tile";
import type Move from "../../Move/Move";

export interface IBoard {
    isWhiteToMove : boolean;
    
    readonly tiles : Tile[];
    readonly playedMoves : Move[];

    // Get you're legal moves on the board
    getLegalMoves() : void;

    // The move you want to play definitly
    playMove() : void;

    // Move players that will play the move but wont register it as a real move
    // Used for searching and deep searching
    makeMove() : void;
    undoMove() : void;

}