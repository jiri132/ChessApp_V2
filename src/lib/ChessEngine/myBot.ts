import Chess_API_Bots from "$lib/ChessBoard/API/Interactions/Board.API.bot";
import type { move } from "$lib/ChessBoard/Core/Moves/move.type";
import type { playedMoves } from "$lib/ChessBoard/Core/Moves/playedMoves.type";
import type { ImyBot } from "./ImyBot";



class myBot extends Chess_API_Bots implements ImyBot {
    
    readonly values : number[] = [100,300,300,500,900,10000]

    Think(): playedMoves {
        let playingMove : playedMoves;


        let randomNum = getRandomInteger(0,this.API.getYourLegalMoves().length);
            playingMove = this.API.getYourLegalMoves()[randomNum];

        let capturingMove : playedMoves | undefined = undefined;
        let captureValue : number = 0; 

        this.API.getYourLegalMoves().forEach((move : playedMoves) => {
            const from : move = move.substring(0,2) as move;
            const to : move = move.substring(2,4) as move;

            let value : number = this.values[parseInt(this.API.getPieceAtPosition(to)?.pieceData as string,2)];

            if (value > captureValue) {
                capturingMove  = (from+to).toString() as playedMoves;
                captureValue = value;
            }
        })

        if ( capturingMove !== undefined) {
            playingMove = capturingMove;
        }


        return playingMove;
        
    }
    

}

function getRandomInteger(min : number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default myBot;