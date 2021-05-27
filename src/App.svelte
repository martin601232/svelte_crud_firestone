<script>
  export let name;
  import { timingSafeEqual } from "crypto";

  import { db } from "./firebase.js";
  import toastr from "toastr";

  let task = {
	  name: "",
	  description: "",
	  category: "",
      imageURL: ""
	};

  let tasks = [];
  let inputElement;

  let editStatus = false;
  let currentId = "";

  db.collection("products")
	  .orderBy("createdAt", "asc")
	  .onSnapshot((querySnapshot) => {
		let docs = [];
		querySnapshot.forEach((doc) => {
		  docs.push({ ...doc.data(), id: doc.id });
		});
		tasks = [...docs];
		console.log(tasks);
	  });

  const addTask = async () => {
    try {
      await db
		  .collection("products")
		  .doc()
		  .set({ ...task, createdAt: Date.now() });
		console.log("new product created");
	  } catch (error) {
		console.error(error);
    }
  };

  const deleteTask = async (id) => {
    await db.collection("products").doc(id).delete();
  };

  const editTask = (currenTask) => {
	  currentId = currenTask.id;
	  task.name = currenTask.name;
	  task.description = currenTask.description;
	  task.category=currenTask.category;
	  task.imageURL=currenTask.imageURL;
  
	  editStatus = true;
	};

  const updateTask = async () => {
	  await db.collection("products").doc(currentId).update(task);
	  toastr.success("Product Updated Successfully", "", {
		timeOut: 1000,
		progressBar: true,
		positionClass: "toast-bottom-right",
	  });
	};

  const handleSubmit = () => {
	  if (!task.name) return;
  
	  if (!editStatus) {
		addTask();
	  } else {
		updateTask();
		editStatus = false;
		currentId = "";
	  }
  
	  task = { 
		  name: "", 
		  description: "",
		  category: "",
      	  imageURL: ""
	 };
	  inputElement.focus();
	};
  
  const onCancel = () => {
	  editStatus = false;
	  currentId = "";
	  task = { 
		  name: "", 
		  description: "",
		  category: "",
      	  imageURL: ""
		 };
	};
</script>

<main>
  <h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p>Then and I want to show how a mixed svelte with firebase</p>

<!-- TEMPLATE -->
  <div class="container p-4">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <form on:submit|preventDefault={handleSubmit} class="card card-body">
          <div class="form-group">
            <label for="product-name">Product Name</label>
            <input
              bind:value={task.name}
              type="text"
              class="form-control"
              id="product-name"
              placeholder="Product Name" />
            </div>

            <div class="form-group">
              <label for="product-description">Product Description</label>
              <textarea
                bind:value={task.description}
                id="product-description"
                rows="3"
                class="form-control"
                placeholder="Product Description" />
            </div>

            <div class="form-group">
              <label for="produtc-image-url">Product Image URL</label>
              <input
                bind:value={task.imageURL}
                type="url"
                id="product-image-url"
                class="form-control"
                placeholder="https://faztweb.com" />
              </div>
      
              <div class="form-group">
                <label for="category">Product Category</label>
                <select
                  id="category"
                  class="form-control"
                  bind:value={task.category}>
                  <option selected disabled>Select a Category</option>
                  <option value="laptops">Laptops</option>
                  <option value="peripherals">Peripherals</option>
                  <option value="servers">Servers</option>
                </select>
              </div>

          <div class="ml-auto mt-1">
            <button class="btn btn-primary">
              <i class="material-icons" style="vertical-align:middle;">save</i>
              <span style="vertical-align:middle">
                {#if !editStatus}Save{:else}Update{/if}
              </span>
            </button>
            {#if editStatus}
              <button on:click={onCancel} class="btn btn-info">Cancel</button>
            {/if}
          </div>
        </form>

          <div>
          {#each tasks as task}
            <div class="card card-body mt-2">
              <div>
                <h5>{task.name}</h5>
              </div>
              <div class="d-flex justify-content-between">{task.description}</div>
              
              <div class="d-flex justify-content-between">{task.category}</div>
              <div>
                {#if !task.imageURL}
                  <img src="images/no-product.png" class="p-2 img-fluid" alt="Image"/>
                  {:else}
                  <img src="{task.imageURL}" class="p-2 img-fluid" alt="Image"/>
                  {/if}
              </div>
              <div class="botones">
                <button on:click={deleteTask(task.id)} class="btn btn-danger">
                  <i class="material-icons" style="vertical-align:middle;">
                    delete_forever
                  </i>
                  <span style="vertical-align:middle;">Delete</span>
                </button>
                
                <button  on:click={editTask(task)} class="btn btn-warning">
                  <i
                  class="material-icons"
                  style="vertical-align:middle;"
                  >
                  edit
                  </i>
                  
                  <span style="vertical-align:middle;">Edit</span>
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	textarea{
		background-image: url(../favicon.png);
		background-position: center;
		background-repeat: no-repeat;
	}

  a{
    color:darkturquoise;
  }

  
  .botones{
    display: flex;
    justify-content: space-around;
  }
  h5 {
		color: #000;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: bold;
	}
	@media (min-width: 760px) {
		main {
			max-width: none;
		}
	}
	

	
	
</style>