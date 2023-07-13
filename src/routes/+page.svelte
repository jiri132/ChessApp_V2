<script lang="ts">
  import Greet from '../lib/Greet.svelte'
  import ExtendedDatabase from '$lib/DatabseExtention/DatabaseExtention';
  import type { TableParams } from '$lib/DatabseExtention/DatabaseExtention.TableParams.interface';

  const url = "mysql://user:mypassword@localhost:3306/testdb";
  const db = new ExtendedDatabase(url);
    
  const exampleData : TableParams = {
    name: "VARCHAR (255)",
    age: "INT (3)",
    email: "VARCHAR (255)",
  }
 
  db.CreateTable('humans', exampleData)

</script>
  
<h1>Welcome to SvelteKit</h1>
<Greet />