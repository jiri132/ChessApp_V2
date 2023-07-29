import type { IPlayedGames } from "../Interfaces/PlayedGames/IPlayedGames";
import type Move from "../Move/Move";

class PlayedGames implements IPlayedGames {
    public readonly Game_PlayedMoves: Move[] = [];
    public readonly Game_ID: number = 0;
    public readonly Game_WhitePlayer: undefined;
    public readonly Game_BlackPlayer: undefined;
    public readonly Game_Outcome: undefined;

    constructor(PlayedMoves : Move[], ID  :number, whitePlayer? : undefined, blackPlayer? : undefined, outcome? :undefined) {
        this.Game_PlayedMoves = PlayedMoves;
        this.Game_ID = ID;
        
        this.Game_WhitePlayer = whitePlayer;
        this.Game_BlackPlayer = blackPlayer;
        this.Game_Outcome = outcome;
    }
}

export default PlayedGames;