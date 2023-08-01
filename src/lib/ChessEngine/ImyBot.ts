import type Move from "$lib/ChessBoard/Core/[V2]/Move/Move";

export interface ImyBot {
    Think() : Move
}