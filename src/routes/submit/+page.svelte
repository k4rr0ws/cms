<script lang="ts">
  import type { ActionData, PageData } from './$types'
  import type { Category } from '$lib/types'
  import Alert from '$lib/components/Alert.svelte'

  export let data: PageData
  let categories: Array<Category>
  $: categories = data.categories

  export let form: ActionData;
</script>

<form method="POST">
  <hgroup class="mb-4">
    <h2 class="text-4xl">Submit</h2>
    <h3>Use this form to submit news articles for consideration</h3>
  </hgroup>

  <div class="form-control w-full max-w-xs">
    <label class="label" for="title">
      <span class="label-text">Title</span>
    </label>
    {#if form?.errors?.title}
      <input name="title" value={form?.data?.title ?? ''} id="title" type="text" class="input input-error input-bordered w-full max-w-xs" required />
      <label for="title" class="label">
        <span class="label-text-alt text-error">{form?.errors?.title[0]}</span>
      </label>
      {:else}
      <input name="title" value={form?.data?.title ?? ''} id="title" type="text" class="input input-bordered w-full max-w-xs" />
    {/if}
  </div>

  <div class="form-control w-full max-w-xs">
    <label for="description" class="label">
      <span class="label-text">Description</span>
    </label>
    {#if form?.errors?.description}
    <textarea id="description" name="description" class="textarea textarea-error textarea-bordered h-24">{form?.data?.description ?? ''}</textarea>
    <label for="title" class="label">
      <span class="label-text-alt text-error">{form?.errors?.description[0]}</span>
    </label>
    {:else}
    <textarea id="description" name="description" class="textarea textarea-bordered h-24">{form?.data?.description ?? ''}</textarea>
    {/if}
  </div>

  <div class="form-control w-full max-w-xs">
    <label for="category" class="label">
      <span class="label-text">Category</span>
    </label>
    <select class="select w-full max-w-xs" name="categoryId" id="category">
      {#each categories as category}
          <option value={category.id}>{category.name}</option>
      {/each}
    </select>
  </div>

  <div class="form-control w-full max-w-xs">
    <label class="label" for="url">
      <span class="label-text">URL</span>
    </label>
    {#if form?.errors?.url}
      <input name="url" value={form?.data?.url ?? ''} id="url" type="text" class="input input-error input-bordered w-full max-w-xs" required />
      <label for="url" class="label">
        <span class="label-text-alt text-error">{form?.errors?.url[0]}</span>
      </label>
      {:else}
      <input name="url" value={form?.data?.url ?? ''} id="url" type="text" class="input input-bordered w-full max-w-xs" />
    {/if}
  </div>

  <button type="submit" class="btn btn-primary mt-4 text-white">Submit</button>
</form>