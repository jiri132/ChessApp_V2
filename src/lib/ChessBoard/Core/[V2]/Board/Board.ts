import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
import BoardHelper from "../Helpers/BoardHelper";
import BoardVisualHelper from "../Helpers/BoardVisualHelper";
import type { IBoard } from "../Interfaces/Board/IBoard";
import type { IPiece } from "../Interfaces/Board/Pieces/IPieces";
import type Move from "../Move/Move";
import Bishop from "./Pieces/Piece.bishop";
import King from "./Pieces/Piece.king";
import Knight from "./Pieces/Piece.knight";
import Pawn from "./Pieces/Piece.pawn";
import Queen from "./Pieces/Piece.queen";
import Rook from "./Pieces/Piece.rook";
import Tile from "./Tile/Tile";

class Board implements IBoard {

    public isWhiteToMove : boolean = true;

    public readonly collectionWhite: IPiece[] = [];
    public readonly collectionBlack: IPiece[] = [];

    public readonly tiles: Tile[] = [];
    public readonly playedMoves: Move[] = new Proxy<Move[]>([], {
        set: (target: Move[], property : string, value: number) => {
            if (property === "length") {
                // Handle length property change (e.g., push)
                // You can also add further checks if needed
        
                // Call the RenderPlayedMove function passing the value and the current ChessBoard API
                // TODO: Change it from Deprecated visual API to BoardVisualHelper.
                //Chess_API_Visuals.RenderPlayedMove(target[value-1], this);
            }
            

            return Reflect.set(target, property, value);
        },
    }) as Move[]; // Cast the proxy to the desired type (Moves[]);
    

    constructor() {
        const width : number = 8;
        const height : number = 8;

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

                if (piece) {
                    if (piece.color === "0") {
                        this.collectionWhite.push(piece);
                    }else {
                        this.collectionBlack.push(piece);
                    }
                }

                const tile : Tile = new Tile(BoardLocation, piece)
                this.tiles.push(tile);
            }
        }
    } 

    public getLegalMoves(): Move[] {
        const legalMoves : Move[] = [];

        if (this.isWhiteToMove) {
            this.collectionWhite.forEach((piece : IPiece) => {
                piece.getLegalMoves(this).forEach((move : Move) => {
                    legalMoves.push(move)
                })
            });
        }else {
            this.collectionBlack.forEach((piece : IPiece) => {
                piece.getLegalMoves(this).forEach((move : Move) => {
                    legalMoves.push(move)
                })
            });
        }

        return legalMoves;
    }

    public playMove(move : Move): void {
        // find if the move is in the possible moves list
        const foundMove : Move | undefined = this.getLegalMoves().find((item : Move) => item.from === move.from && item.to === move.to) 
        
        // if tit is not found then return the function
        if (foundMove === undefined) {return;}


        // else move everything and swap the to playing black
        this.movePiece(move);
        this.isWhiteToMove = !this.isWhiteToMove
    }
    
    makeMove(move : Move): void {
        throw new Error("Method not implemented.");
    }
    undoMove(move : Move): void {
        throw new Error("Method not implemented.");
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