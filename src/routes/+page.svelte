<script lang="ts">
  import Greet from '../lib/Greet.svelte'
  import ExtendedDatabase from '$lib/DatabseExtention/DatabaseExtention';
  import type { TableParams } from '$lib/DatabseExtention/DatabaseExtention.TableParams.interface';

  const url = "mysql://user:mypassword@localhost:3306/testdb";
  const db = new ExtendedDatabase(url);
    
  const exampleData : TableParams = {
    id: {
      type: "INT(10)",
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    displayName: {type:"VARCHAR(255)"},
    userName: {
      type:"VARCHAR(255)",
      unique: true,
    },
    age: {type:"INT(3)"},
    email: {type:"VARCHAR(255)"},
  }
 
  db.CreateTable('humans', exampleData);

</script>
  
<h1>Welcome to SvelteKit</h1>
<Greet />