import type Move from "../../Move/Move";

//TODO: Remove the undefineds
export interface IPlayedGames {
    readonly Game_PlayedMoves : Move[];
    readonly Game_ID : number;

    readonly Game_WhitePlayer : undefined; 
    readonly Game_BlackPlayer : undefined;
    
    readonly Game_Outcome : undefined; 
}