import Chess_API_Bots from "$lib/ChessBoard/API/[V2]/Board.API.bot";
import BoardHelper from "$lib/ChessBoard/Core/[V2]/Helpers/BoardHelper";
import type Move from "$lib/ChessBoard/Core/[V2]/Move/Move";
import { outcome } from "$lib/ChessBoard/Core/[V2]/Types/Game/outcome.enum";
import Random from "$lib/Random/Random";
import type { ImyBot } from "../ImyBot";

/*----------------Improvements Log-------------------
 *  
 *  Version 0.1         <27 - 7 - 2023>
 *      -bot was the same as default myBot.ts
 * 
 *  Version 0.2         <27 - 7 - 2023>
 *      -bot made decisions on the highest capturing piece
 * 
 *  Version 0.3         < 3 - 8 - 2023>
 *      -bot can find mate in 1
 *      -bot removes all stalemate moves
 *
 */



class devBot extends Chess_API_Bots implements ImyBot {
    
    readonly values : number[] = [100,300,300,500,900,10000]

    override Think(): Move {
        const _allMoves : Move[]  = this.API.getLegalMoves();
        const allMoves : Move[] = [];

        for (const move of _allMoves) {
            this.API.makeMove(move);

            const _outcome : outcome = BoardHelper.SolveOutCome(this.API);

            this.API.undoMove(move);

            if (_outcome === outcome.Stalemate) {
                // do nothing
                continue;
            }

            // Push moves that don't resolve in stale mates 
            allMoves.push(move);
        }



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

            if (this.nextMoveIsCheckMate(move)) {
                playingMove = move;
                return;
            }
        })


        return playingMove;
    }

    nextMoveIsCheckMate(move : Move) : boolean {
        this.API.makeMove(move);

        const _outcome : outcome = BoardHelper.SolveOutCome(this.API);

        this.API.undoMove(move);

        if (_outcome === outcome.Checkmate) { 
            return true;
        }
        
        return false;
    }
}



export default devBot;