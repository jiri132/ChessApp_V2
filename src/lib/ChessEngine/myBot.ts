import Chess_API_Bots from "$lib/ChessBoard/API/Interactions/Board.API.bot";
import type { playedMoves } from "$lib/ChessBoard/Core/Moves/playedMoves.type";
import type { ImyBot } from "./ImyBot";



class myBot extends Chess_API_Bots implements ImyBot {
    
    Think(): playedMoves {
        let playingMove : playedMoves;

        let randomNum = getRandomInteger(0, this.API.getYourLegalMoves().length)
        playingMove = this.API.getYourLegalMoves()[randomNum];

        return playingMove;
        
    }
    

}

function getRandomInteger(min : number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default myBot;