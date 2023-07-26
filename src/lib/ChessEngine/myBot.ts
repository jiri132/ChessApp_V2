import Chess_API_Bots from "$lib/ChessBoard/API/Interactions/Board.API.bot";
import type { playedMoves } from "$lib/ChessBoard/Core/Moves/playedMoves.type";
import type { ImyBot } from "./ImyBot";



class myBot extends Chess_API_Bots implements ImyBot {
    
    Think(): playedMoves {
        // Variable that gets given back
        let playingMove : playedMoves;
        let allMoves = this.API.getYourLegalMoves();

        // Get a random number between 0 and the possibler moves
        let randomNum = getRandomInteger(0, this.API.getYourLegalMoves().length)
        
        // Set the playing move to the random selected move
        playingMove = allMoves[randomNum];

        // Play the selected move
        return playingMove;
        
    }
    

}

function getRandomInteger(min : number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default myBot;