import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { ImyBot } from "$lib/ChessEngine/ImyBot";
import Random from "$lib/Random/Random";
import BoardHelper from "../Helpers/BoardHelper";
import BoardVisualHelper from "../Helpers/BoardVisualHelper";
import type { IBoard } from "../Interfaces/Board/IBoard";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type Move from "../Move/Move";
import { GameType } from "../Types/Game/game.enum";
import { outcome } from "../Types/Game/outcome.enum";
import { PlayerType } from "../Types/Players/Player.enum";
import Bishop from "./Pieces/Piece.bishop";
import King from "./Pieces/Piece.king";
import Knight from "./Pieces/Piece.knight";
import Pawn from "./Pieces/Piece.pawn";
import Queen from "./Pieces/Piece.queen";
import Rook from "./Pieces/Piece.rook";
import Tile from "./Tile/Tile";
import Modal__SvelteComponent_ from "$lib/ChessBoard/UI-Frameworks/Svelte/Modal.svelte";

class Board implements IBoard {

    

    public isWhiteToMove : boolean = true;


    public whiteBot? : ImyBot;
    public blackBot? : ImyBot;
    public outcome? : outcome;

    public aborted : boolean = false;

    public readonly playerTypeWhite : `${PlayerType} ${string}` = `${PlayerType.Human} ${""}`;
    public readonly playerTypeBlack : `${PlayerType} ${string}` = `${PlayerType.Human} ${""}`;

    public readonly tiles: Tile[] = [];
    public readonly playedMoves: Move[] = new Proxy<Move[]>([], {
        set: (target: Move[], property : string, value: number) => {
            if (property === "length") {
                // Handle length property change (e.g., push)
                // You can also add further checks if needed
        
                // Call the RenderPlayedMove & singleContainerItem function passing the value and the current ChessBoard API
                BoardVisualHelper.RenderSinglePlayedMoveInContainer(this)
                BoardVisualHelper.RenderPlayedMove(this,target[value-1] )

                // Call the SolveOutcome form the board helper to check if the game is done
                this.outcome = BoardHelper.SolveOutCome(this);
                if (outcome !== undefined) {
                    console.log(this.outcome)     
                    //saves the outcome of the match in localStorage
                    localStorage.setItem("outcome",this.outcome)
                    
                    
                }

            }

            return Reflect.set(target, property, value);
        },
    }) as Move[]; // Cast the proxy to the desired type (Moves[]);
    

    constructor(gameType : GameType = GameType.Human_VS_Human, bot1? : string, bot2? : string) {
        const width : number = 8;
        const height : number = 8;

        this.isWhiteToMove = true;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const color : BinaryDigit = (i === 0 || i === 1) ? "1" : "0";
                const index : number = i * 8 + j;
                const BoardLocation = BoardHelper.indexToBoardLocation(index);
                
                let piece : IPiece | undefined;

                // Spawn the special row pieces
                if (i === 0 || i === 7) {
                    switch(j) {
                        case 0:
                            piece = new Rook(BoardLocation,color);
                            break;
                        case 1:
                            piece = new Knight(BoardLocation,color);
                            break;
                        case 2:
                            piece = new Bishop(BoardLocation,color);
                            break;
                        case 3:
                            piece = new Queen(BoardLocation,color);
                            break;
                        case 4:
                            piece = new King(BoardLocation,color);
                            break;
                        case 5:
                            piece = new Bishop(BoardLocation,color);
                            break;
                        case 6:
                            piece = new Knight(BoardLocation,color);
                            break;
                        case 7:
                            piece = new Rook(BoardLocation,color);
                            break;
                    }
                }
                // Spawn the pawns on spot 2 or 7
                if (i === 1 || i === 6) {
                    piece = new Pawn(BoardLocation, color);
                }

                const tile : Tile = new Tile(BoardLocation, piece)
                this.tiles.push(tile);
            }
        }
        
        switch (gameType) {
            case GameType.Bot_VS_Bot:
                const bot1IsWhite : boolean = Random.getRandomBoolean();

                // Set the player types
                this.playerTypeBlack = `${PlayerType.Bot} ${bot1}`;  
                this.playerTypeWhite = `${PlayerType.Bot} ${bot2}`;

                // Set the bot scripts
                if (!bot1 || !bot2) {throw new Error("select 2 bots")}

                if (bot1IsWhite) {
                    this.setBot(bot1, "0")
                    this.setBot(bot2, "1")
                }else {
                    this.setBot(bot1, "1")
                    this.setBot(bot2, "0")
                }

                break;
            case GameType.Human_VS_Bot:
                const humanIsWhite : boolean = Random.getRandomBoolean();
                
                if (!bot1) {throw new Error("select a bot")}
                
                if (humanIsWhite) {
                    this.playerTypeBlack =  `${PlayerType.Bot} ${bot1}`;
                    this.setBot(bot1, "1")
                }else {
                    this.playerTypeWhite =  `${PlayerType.Bot} ${bot1}`;
                    this.setBot(bot1, "0");
                }
                
                console.log(this.blackBot, this.whiteBot)

                break;
            case GameType.Human_VS_Human:
                break;
            default: 
                console.log("defaulted switch", gameType)
                break;
        }
    } 

    private async setBot(botName : string, color : BinaryDigit) : Promise<boolean> {
        try {
            // Dynamically import the selected bot class based on its name
            const BotClassModule = await import( `../../../../ChessEngine/bots/${botName}` /* @vite-ignore */);
        
            // Assuming that the bot class is the default export of the module
            const BotClass = BotClassModule.default;
        
            // Perform any additional setup if needed
            // For example, you might want to set the board or other parameters for the bot
        
            // Create an instance of the selected bot class
            if (color === "0") {
              this.whiteBot = new BotClass(this) as ImyBot;
              this.playMove(this.whiteBot.Think())
            } else {
              this.blackBot = new BotClass(this) as ImyBot;
            }
        
            return true;
          } catch (error) {
            console.error('Error loading selected bot:', error);
            return false;
          }
       
    }

    public getAllMoves() : Move[] {
        const allMoves : Move[] = [];
        const color : BinaryDigit = this.isWhiteToMove ? "0" : "1"
        
        this.tiles.forEach((tile : Tile) => {
            if (!tile.piece) { return;}

            if (tile.piece.color !== color) {return;}

            tile.piece.getLegalMoves(this).forEach((move : Move) => {
                allMoves.push(move);
            })
        })

        return allMoves;
    }

    public getLegalMoves(): Move[] {
        const legalMoves : Move[] = [];
        const color : BinaryDigit = this.isWhiteToMove ? "0" : "1"
        
        this.tiles.forEach((tile : Tile) => {
            if (!tile.piece) { return;}

            if (tile.piece.color !== color) {return;}

            tile.piece.getLegalMoves(this).forEach((move : Move) => {
                if (BoardHelper.isNextMoveInCheck(this,move)) {return;}
                legalMoves.push(move);
            })
        })
        

        return legalMoves;
    }
    public getAllOpponentsMoves() : Move[] {
        const allMoves : Move[] = [];
        const color : BinaryDigit = this.isWhiteToMove ? "1" : "0"
        
        this.tiles.forEach((tile : Tile) => {
            if (!tile.piece) { return;}

            if (tile.piece.color !== color) {return;}

            tile.piece.getLegalMoves(this).forEach((move : Move) => {
                allMoves.push(move);
            })
        })

        return allMoves;
    }

    public playMove(move : Move): void {
        const allMoves : Move[] = this.getAllMoves();
        const foundMove : Move | undefined = allMoves.find((item : Move) => item.from === move.from && item.to === move.to);
        if (foundMove === undefined) {throw new Error("Played illegal move")}

        this.isWhiteToMove = !this.isWhiteToMove

        this.movePiece(move);

        this.playedMoves.push(move);

        if (this.aborted) {return;}

        if (this.outcome === undefined) {
            setTimeout(() => {
                let move : Move;
    
                if (this.isWhiteToMove && this.whiteBot !== undefined) {
                    move = this.whiteBot.Think();
                    this.playMove(move);
                } else if (!this.isWhiteToMove && this.blackBot !== undefined) {
                    move = this.blackBot.Think();
                    this.playMove(move);
                }     
    
            }, 50);
        }
    }
    
    public makeMove(move : Move): void {
        // else move everything and swap the to playing black
        this.isWhiteToMove = !this.isWhiteToMove
        
        this.movePiece(move);
    }
    public undoMove(move : Move): void {
        this.isWhiteToMove = !this.isWhiteToMove;
        
        const from_tile : Tile = this.tiles[move.from_index];
        const to_tile : Tile = this.tiles[move.to_index];

        to_tile.piece = move.capturedPiece;
        from_tile.piece = move.movingPiece;
 
        move.movingPiece.location = move.from;
    }

    private movePiece(move : Move) : void {
        // Get the 2 tiles that are being used
        const from_tile : Tile = this.tiles[move.from_index];
        const to_tile : Tile = this.tiles[move.to_index];

        // Set the from location to undefined
        from_tile.piece = undefined;
        // Set the new piece on the to tile
        to_tile.piece = move.movingPiece;
        if (move.promotionType) {to_tile.piece = move.promotionType}

        // Set th moving piece his location to the new location
        move.movingPiece.location = move.to;
    }
}

export default Board;