<script lang="ts">
    import type ChessBoard from "../../Core/[V2]/ChessBoard";

    

    export let ChessBoard : ChessBoard;

    function copyMovesToClipBoard(e : any) {
        let PGN : string = `
[Event "Live Chess"]
[Site "jiri.dscloud.me/chessbots"]
[Date "${Date.now().toLocaleString("en-CA")}"]
[Round "?"]
[White "${ChessBoard.Board.playerTypeWhite}"]
[Black "${ChessBoard.Board.playerTypeBlack}"]
[Result "?"]
[ECO "?"]
[WhiteElo "?"]
[BlackElo "?"]
[TimeControl "?"]
[EndTime "?"]
[Termination "${ChessBoard.Board.playerTypeWhite} by ${ChessBoard.Board.outcome}"]

        `;

        

        const movesContainer : HTMLElement | null = document.getElementById("movesContainer");

        if (!movesContainer) { return;}

        // Get all the div elements inside movesContainer
        const moveDivs : HTMLDivElement[] | null = Array.from(movesContainer.querySelectorAll("div"));

        let moveString = "";

        for (let i = 0; i < moveDivs.length; i++) {
            const moveDiv = moveDivs[i];

            // Check if the div contains a number followed by a period (e.g., "1.")
            //@ts-ignore
            if (/^\d+\.$/.test(moveDiv.textContent.trim())) {
                // If it's a number, add it to the moveString along with a space
                moveString += moveDiv.textContent?.trim() + " ";
            } else {
                // If it's not a number, add the move content to the moveString
                moveString += moveDiv.textContent?.trim() + " ";
            }
        }

        PGN += moveString;
        console.log(PGN);

        copyToClipboard(PGN);
        //alert("Copied the PGN to clipboard!")
    }

    function copyToClipboard(text : string) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
</script>


<div class="infoStack displayMoves">
    <div style="color: black;">Played Moves</div>
    <div class="movesHeightContainer">
        <div id="movesContainer" class="moves">
    
        </div>
    </div>
    
    <button on:click={(e) => {copyMovesToClipBoard(e)}}>export PGN</button>
</div>

<style lang="scss">
    .displayMoves {
        background-color: gray;
    }
    .infoStack button {
        justify-self: end;
    }

    .movesHeightContainer {
        height: 100%;
        overflow-y: scroll;
    }
    .moves {
        color: black;
        
        display: grid;
        grid-template-rows: repeat(2, 0fr);
        grid-template-columns: repeat(3,1fr);
        text-align:start;
        padding-left: 5px;
        //justify-items: center;
    }
    
    .movesHeightContainer::-webkit-scrollbar {
        width: 0px;
    }
</style>

