import type Board from "$lib/ChessBoard/Core/[V2]/Board/Board";
import { writable, type Writable } from "svelte/store";


export const BoardStore : Writable<Board> = writable();
