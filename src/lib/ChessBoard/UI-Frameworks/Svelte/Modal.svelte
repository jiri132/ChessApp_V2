<script lang = "ts">
    import settings from "./settings.svelte";
    
    let shown = false;

    //inteval of time in ms 
    const interval = 3000;
    
    
    //function that looks for the macth outcome in localStorage
    const checkLocalStorage = () => {
    const storedValue = localStorage.getItem('outcome'); 
    if (storedValue !== "undefined") {
      console.log(storedValue)
      shown = true;
      clearInterval;
    }
    };

    //functions to show/hide the pop-up
    export function show(){
        setInterval(checkLocalStorage, interval);
    }
    


    export function hide(){
       
        shown = false;
        localStorage.setItem("outcome", "undefined");

    }


    

</script>





{#if shown}
    <div class="modal-wrapper">
        <div class="modal">
            <p id="outcm">OUTCOME:</p>
            <p>{localStorage.getItem("outcome")}</p>
            <slot />
            <span class="close" on:click={() => hide()}>Quit</span>
            
        </div>
    </div>
     
{/if}




<style>
    .close{
        float: left;
        cursor: pointer;
        
    }

    .close:hover{
        font-weight: bold;
    }

    .modal-wrapper{
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.6);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .modal{
        background: white;
        max-width: 40vw;
        padding: 4rem;
        margin: 15% auto;

    }
</style>

