import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import type { ImyBot } from "$lib/ChessEngine/ImyBot";
import Random from "$lib/Random/Random";
import BoardHelper from "../Helpers/BoardHelper";
import BoardVisualHelper from "../Helpers/BoardVisualHelper";
import type { IBoard } from "../Interfaces/Board/IBoard";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type Move from "../Move/Move";
import { GameType } from "../Types/Game/game.type";
import { PlayerType } from "../Types/Players/Player.enum";
import Bishop from "./Pieces/Piece.bishop";
import King from "./Pieces/Piece.king";
import Knight from "./Pieces/Piece.knight";
import Pawn from "./Pieces/Piece.pawn";
import Queen from "./Pieces/Piece.queen";
import Rook from "./Pieces/Piece.rook";
import Tile from "./Tile/Tile";

class Board implements IBoard {

    public isWhiteToMove : boolean = true;

    public readonly playerTypeWhite : PlayerType = PlayerType.Human;
    public readonly playerTypeBlack : PlayerType = PlayerType.Human;

    public readonly whiteBot? : ImyBot;
    public readonly blackBot? : ImyBot;

    //public readonly collectionWhite: IPiece[] = [];
    //public readonly collectionBlack: IPiece[] = [];

    public readonly tiles: Tile[] = [];
    public readonly playedMoves: Move[] = new Proxy<Move[]>([], {
        set: (target: Move[], property : string, value: number) => {
            if (property === "length") {
                // Handle length property change (e.g., push)
                // You can also add further checks if needed
        
                // Call the RenderPlayedMove & singleContainerItem function passing the value and the current ChessBoard API
                BoardVisualHelper.RenderSinglePlayedMoveInContainer(this)
                BoardVisualHelper.RenderPlayedMove(this,target[value-1] )
            }

            return Reflect.set(target, property, value);
        },
    }) as Move[]; // Cast the proxy to the desired type (Moves[]);
    

    constructor(gameType : GameType = GameType.Human_VS_Human, bot1? : ImyBot, bot2? : ImyBot) {
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

                // if (piece) {
                //     if (piece.color === "0") {
                //         this.collectionWhite.push(piece);
                //     }else if (piece.color === "1") {
                //         this.collectionBlack.push(piece);
                //     }
                // }

                const tile : Tile = new Tile(BoardLocation, piece)
                this.tiles.push(tile);
            }
        }

        switch (gameType) {
            case GameType.Bot_VS_Bot:
                const bot1IsWhite : boolean = Random.getRandomBoolean();

                // Set the player types
                this.playerTypeBlack = PlayerType.Bot;  
                this.playerTypeWhite = PlayerType.Bot

                // Set the bot scripts
                if (!bot1 || !bot2) {throw new Error("select 2 bots")}

                

                if (bot1IsWhite) {
                    this.whiteBot = bot1;
                    this.blackBot = bot2;
                }else {
                    this.whiteBot = bot2;
                    this.blackBot = bot1;
                }
                this.playMove(this.whiteBot.Think())

                break;
            case GameType.Human_VS_Bot:
                const humanIsWhite : boolean = Random.getRandomBoolean();
                
                if (!bot1) {throw new Error("select a bot")}
                
                if (humanIsWhite) {
                    this.playerTypeBlack =  PlayerType.Bot;
                    this.blackBot = bot1;
                }else {
                    this.playerTypeWhite =  PlayerType.Bot;
                    this.whiteBot = bot1;
                    this.playMove(this.whiteBot.Think())
                }
                
                break;
            case GameType.Human_VS_Human:
                break;
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

    public playMove(move : Move): void {
        const allMoves : Move[] = this.getAllMoves();
        const foundMove : Move | undefined = allMoves.find((item : Move) => item.from === move.from && item.to === move.to);
        console.log(allMoves)
        //console.log(this.tiles)
        console.log(foundMove, move)
        if (foundMove === undefined) {throw new Error("Played illegal move")}

        this.isWhiteToMove = !this.isWhiteToMove

        const from_tile : Tile = this.tiles[move.from_index];
        const to_tile : Tile = this.tiles[move.to_index];

        // Set the from location to undefined
        from_tile.piece = undefined;
        // Set the new piece on the to tile
        to_tile.piece = move.movingPiece;
       
        if (move.capturedPiece) {
            move.capturedPiece.location = null!
        }

        // Set th moving piece his location to the new location
        move.movingPiece.location = move.to;

        this.playedMoves.push(move);

        setTimeout(() => {
            console.log(this.isWhiteToMove)
            let move : Move;

            if (this.isWhiteToMove && this.whiteBot !== undefined) {
                move = this.whiteBot.Think();
                this.playMove(move);
            } else if (!this.isWhiteToMove && this.blackBot !== undefined) {
                move = this.blackBot.Think();
                this.playMove(move);
            }     

        }, 1000);
        
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

        // Set th moving piece his location to the new location
        move.movingPiece.location = move.to;
    }
}

export default Board;