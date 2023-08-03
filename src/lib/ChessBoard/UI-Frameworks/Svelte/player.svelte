<script lang="ts">
    import type { BinaryDigit } from "$lib/BitArray/Core/Types/Binary/BinaryDigit.type";
    import { BoardStore } from "./Store";

    export let color : BinaryDigit;

    let name : string = "";

    $: {
        if (color === "0") {
            name = $BoardStore.playerTypeWhite
        }else {
            name = $BoardStore.playerTypeBlack
        }
    }

</script>

<div class="player">
    {name}
</div>

<style lang="scss">
    .player {
        background-color: rgb(61, 61, 61);
        color: rgb(211, 211, 211);
        padding: 15px;
        margin: 10px 0px 10px 0px;
        border-radius: 10px;
        font-size: 16pt;
    }
</style>