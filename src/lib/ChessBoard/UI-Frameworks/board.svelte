<script lang="ts">
    import ChessBoard from "../Core/Board";
    import type { move } from "../Core/Moves/move.type";
    import type { IPiece } from "../Core/Piece/IPiece";

    const Board = new ChessBoard();
    
    let movingPiece : IPiece;
    let possibleMoves : move[] = [];

    function highlightPossibleMoves() : void {
        console.log(movingPiece , possibleMoves)
    }

</script>

<div>
    <svg viewBox="0 0 100 1000" class="coordinates">
        <text x="0" y="1.5" font-size="2" class="coordinates-light">8</text>
        <text x="0" y="6.75" font-size="2" class="coordinates-light">7</text>
        <text x="0" y="11.75" font-size="2" class="coordinates-light">6</text>
        <text x="0" y="16.75" font-size="2" class="coordinates-light">5</text>
        <text x="0" y="21.75" font-size="2" class="coordinates-light">4</text>
        <text x="0" y="26.75" font-size="2" class="coordinates-light">3</text>
        <text x="0" y="31.75" font-size="2" class="coordinates-light">2</text>
        <text x="0" y="36.75" font-size="2" class="coordinates-light">1</text>
    </svg>

    <div class="container">
        {#each Board.game as row, file}
                {#each Board.game[file] as piece, rank}
                    <div id={8-file + String.fromCharCode(65 + rank)} class="card"
                        on:click={(e) => {
                            console.log(e)
                        }}
                    >
                        {#if piece !== null}
                            <div style="background-image:url(/src/lib/assets/{piece.pieceColor+piece.pieceData}.png); width: 100%; height: 100%;"
                                on:mousedown={(e) => {
                                    movingPiece = piece; 
                                    possibleMoves = piece.legalMoves(Board);
                                    highlightPossibleMoves();
                                }}
                            >
                            </div>
                        {/if}
                    </div> 
                {/each}
        {/each}
    </div>
</div>
<style lang="scss">
    .container {
		display: grid;
		grid-template-rows: repeat(8, 0fr);
		grid-template-columns: repeat(8, 0fr);
        max-width: calc(60px * 8);
        max-height: calc(60px * 8);
        background-image: url("/src/lib/assets/board.png");
        background-size: calc(60px * 8);
        background-repeat: no-repeat;
	}
    .card {
		display: flex;
		justify-content: center;
		align-items: center;
        color: darkblue;
		background-color: rgb(173, 216, 230,0);
		width: 60px;
        height: 60px;
	}

    .coordinates {
        // left: 0;
        position: absolute;
        // top: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }
    .coordinate-dark, .coordinate-light {
        font-weight: 600;
    }
    .coordinate-light {
        fill: #779952;
    }
</style>