import Chess_API_Bots from "$lib/ChessBoard/API/[V2]/Board.API.bot";
import type Move from "$lib/ChessBoard/Core/[V2]/Move/Move";
import Random from "$lib/Random/Random";
import type { ImyBot } from "./ImyBot";



class devBot extends Chess_API_Bots implements ImyBot {
    
    readonly values : number[] = [100,300,300,500,900,10000]

    Think(): Move {
        const allMoves : Move[]  = this.API.getLegalMoves();
        const randomNum = Random.getRandomInteger(0,allMoves.length - 1);

        let playingMove : Move;
        let captureValue : number = 0; 

        playingMove = allMoves[randomNum];

        allMoves.forEach((move : Move) => {
            if (!move.capturedPiece) { return; }

            const pieceToNumber : number = parseInt(move.capturedPiece?.piece,2)
            let value : number = this.values[pieceToNumber];

            if (value > captureValue) {
                playingMove = move;
                captureValue = value;
            }
        })

        return playingMove;
    }
}



export default devBot;