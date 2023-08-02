import type Move from "../../Move/Move";
import type { outcome } from "../../Types/Game/outcome.enum";

//TODO: Remove the undefineds
export interface IPlayedGames {
    readonly Game_PlayedMoves : Move[];
    readonly Game_ID : number;

    readonly Game_WhitePlayer : string; 
    readonly Game_BlackPlayer : string;
    
    readonly Game_Outcome : outcome; 
}