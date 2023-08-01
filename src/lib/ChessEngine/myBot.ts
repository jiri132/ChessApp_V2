import Chess_API_Bots from "$lib/ChessBoard/API/[V2]/Board.API.bot";
import type Move from "$lib/ChessBoard/Core/[V2]/Move/Move";
import Random from "$lib/Random/Random";
import type { ImyBot } from "./ImyBot";



class myBot extends Chess_API_Bots implements ImyBot {
    
    Think(): Move {
        // Variable that gets given back
        let playingMove : Move;
        let allMoves : Move[] = this.API.getLegalMoves();

        // Get a random number between 0 and the possibler moves
        let randomNum = Random.getRandomInteger(0, allMoves.length)
        
        // Set the playing move to the random selected move
        playingMove = allMoves[randomNum];
        console.log(playingMove);

        // Play the selected move
        return playingMove;
    }
}

export default myBot;