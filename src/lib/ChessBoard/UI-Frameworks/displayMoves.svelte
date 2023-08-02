
<div class="infoStack">
    <div style="color: black;">Played Moves</div>
    <div id="movesContainer" class="moves">
    
    </div>
</div>

<style lang="scss">
    .moves {
        color: black;
        overflow-y: scroll;
        display: grid;
        grid-template-rows: repeat(2, 0fr);
        grid-template-columns: repeat(3,1fr);
        text-align:end;
        padding-right: 10px;
        //justify-items: center;
    }
    
    .moves::-webkit-scrollbar {
            width: 0px;
    }
</style>

