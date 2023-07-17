<script lang="ts">
    import ExtendedDatabase from "../Core/DatabaseExtention";
    import type { InputParams } from "../Core/interfaces/DatabaseExtention.TableParams.interface";
    import type { FormParams } from "./FormParams.interface";


  function transformFormParamsToInputParams(formParams: FormParams): InputParams {
    const inputParams: InputParams = {};

    for (const columnName in formParams) {
      if (formParams.hasOwnProperty(columnName)) {
        const { value } = formParams[columnName];
        inputParams[columnName] = value;
      }
    }

    return inputParams;
  }


  let data : FormParams = {
    displayName: {type: "text", value:""},
    userName: {type: "text", value:""},
    email: {type: "email", value:""},
    age: {type: "number",value:0},
  }

  const db = new ExtendedDatabase(import.meta.env.VITE_URL,import.meta.env.VITE_DB)

  const handleSignUp = () => {
    db.AppendTable('humans', transformFormParamsToInputParams(data));
  };

</script>
  
  <form>
    <h3>Sign up!</h3>
    <div class="line"></div>
    {#each Object.keys(data) as columName,i}
      <div class="item">
        <input on:keyup={(value) => {
              data[columName].value = value.srcElement.value; 
              console.log(value.srcElement.value);
            }
          } 
          placeholder="input your {columName}"
          type={data[columName].type}
        />
      </div>  
    {/each}
    
    <div class="action">
      <button type="submit" on:click={handleSignUp}>Sign up</button>
    </div>
  </form>
  

<style lang="scss"> 
  form {
    color: #222;
    background-color: #dddddd;
    padding: 1rem;
    border-radius: 30px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    input {
      width: -webkit-fill-available;
      border-radius: 100px;
      background-color: #c0c0c0;
    }
    h3 {
      color:#444;
      align-self: center;
      font-size: 30px;
      margin: 0px 0px 10px 0px;
    }
    .line {
      border: 1px rgb(255, 255, 255) solid;
      margin-bottom: 10px;
    }
    .action {
      flex-grow: 1;
      align-self: center;
      button {
        margin-top: 10px;
        // width: -webkit-fill-available;
        color: white;
        background-color:rgb(62, 92, 226);
      }
    }
  }  
  
</style>