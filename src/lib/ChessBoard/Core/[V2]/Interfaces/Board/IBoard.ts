import type Tile from "../../Board/Tile/Tile";
import type Move from "../../Move/Move";
import type { IPiece } from "./Pieces/IPieces";

export interface IBoard {
    isWhiteToMove : boolean;
    
    readonly tiles : Tile[];
    readonly playedMoves : Move[];
    readonly collectionWhite : IPiece[];
    readonly collectionBlack : IPiece[];
    // Get you're legal moves on the board
    getLegalMoves() : Move[];

    // The move you want to play definitly
    playMove(move : Move) : void;

    // Move players that will play the move but wont register it as a real move
    // Used for searching and deep searching
    makeMove(move : Move) : void;
    undoMove(move : Move) : void;

}