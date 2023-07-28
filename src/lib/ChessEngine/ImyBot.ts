import type { playedMoves } from "$lib/ChessBoard/Core/[V1] DepricatedCore/Moves/playedMoves.type";

export interface ImyBot {
    Think() : playedMoves
}