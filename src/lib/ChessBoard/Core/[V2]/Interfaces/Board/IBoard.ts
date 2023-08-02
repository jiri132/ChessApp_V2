import type { ImyBot } from "$lib/ChessEngine/ImyBot";
import type Tile from "../../Board/Tile/Tile";
import type Move from "../../Move/Move";
import type { PlayerType } from "../../Types/Players/Player.enum";
import type { IPiece } from "./Pieces/IPieces";

export interface IBoard {
    isWhiteToMove : boolean;
    
    whiteBot? : ImyBot;
    blackBot? : ImyBot;

    readonly tiles : Tile[];
    readonly playedMoves : Move[];

    readonly playerTypeWhite : `${PlayerType} ${string}`;
    readonly playerTypeBlack : `${PlayerType} ${string}`;

    
    // Get you're legal moves on the board
    getLegalMoves() : Move[];

    // The move you want to play definitly
    playMove(move : Move) : void;

    // Move players that will play the move but wont register it as a real move
    // Used for searching and deep searching
    makeMove(move : Move) : void;
    undoMove(move : Move) : void;

}