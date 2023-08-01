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

    // Convert the class instance to a plain object
    public toJson() : string {
        const object : IPlayedGames = {
            Game_PlayedMoves: this.Game_PlayedMoves,
            Game_ID: this.Game_ID,
            Game_WhitePlayer: this.Game_WhitePlayer,
            Game_BlackPlayer: this.Game_BlackPlayer,
            Game_Outcome: this.Game_Outcome
        }

        return JSON.stringify(object);
    }

    // Factory method to create an instance from JSON data
    static fromJson(data : IPlayedGames) : PlayedGames {
        //const data : IPlayedGames = JSON.parse(jsonString);
        return new PlayedGames(data.Game_PlayedMoves, data.Game_ID, data.Game_WhitePlayer, data.Game_BlackPlayer, data.Game_Outcome);
    }
}

export default PlayedGames;