import type { playedMoves } from "$lib/ChessBoard/Core/Moves/playedMoves.type";

export interface ImyBot {
    Think() : playedMoves
}