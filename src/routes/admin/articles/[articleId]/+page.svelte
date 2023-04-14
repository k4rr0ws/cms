<script lang="ts">
    import { timeSince } from '$lib/utils'
    import type { PageData, ActionData } from './$types'

    export let data: PageData

    let categories: Array<Category>
    let article: any

    $: ({ categories, article } = data)

    export let form: ActionData;
</script>

<form method="POST">
    <hgroup class="mb-4">
      <h2 class="text-4xl">Editing {article?.title}</h2>
      <h3>Use this form edit, publish, or delete an article.</h3>
    </hgroup>
  
    <div class="form-control w-full max-w-xs">
      <label class="label" for="title">
        <span class="label-text">Title</span>
      </label>
      {#if form?.errors?.title}
        <input name="title" value={form?.data?.title ?? article?.title} id="title" type="text" class="input input-error input-bordered w-full max-w-xs" required />
        <label for="title" class="label">
          <span class="label-text-alt text-error">{form?.errors?.title[0]}</span>
        </label>
        {:else}
        <input name="title" value={form?.data?.title ?? article?.title} id="title" type="text" class="input input-bordered w-full max-w-xs" />
      {/if}
    </div>

    <div class="form-control w-full max-w-xs">
        <label for="description" class="label">
          <span class="label-text">Description</span>
        </label>
        {#if form?.errors?.description}
        <textarea id="description" name="description" class="textarea textarea-error textarea-bordered h-24">{form?.data?.description ?? article?.description}</textarea>
        <label for="title" class="label">
          <span class="label-text-alt text-error">{form?.errors?.description[0]}</span>
        </label>
        {:else}
        <textarea id="description" name="description" class="textarea textarea-bordered h-24">{form?.data?.description ?? article?.description}</textarea>
        {/if}
    </div>

    <div class="form-control w-full max-w-xs">
        <label for="category" class="label">
          <span class="label-text">Category</span>
        </label>
        <select class="select w-full max-w-xs" name="categoryId" id="category">
        {#if article?.category}
            <option value={article?.category?.id} selected>{article?.category?.name}</option>
        {/if}
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
          <input name="url" value={form?.data?.url ?? article?.url} id="url" type="text" class="input input-error input-bordered w-full max-w-xs" required />
          <label for="url" class="label">
            <span class="label-text-alt text-error">{form?.errors?.url[0]}</span>
          </label>
          {:else}
          <input name="url" value={form?.data?.url ?? article?.url} id="url" type="text" class="input input-bordered w-full max-w-xs" />
        {/if}
      </div>

      <div class="form-control w-full max-w-xs">
        <label for="published" class="label">
            <span class="label-text">Published</span>
            <input type="checkbox" checked={article?.published} class="checkbox" id="published" name="published" />
        </label>
      </div>
    
      <button type="submit" formaction="/admin/articles/{article?.id}?/updateArticle" class="btn btn-primary mt-4 text-white">Update</button>
      <button type="submit" formaction="/admin/articles/{article?.id}?/deleteArticle" class="btn btn-primary mt-4 text-white">Delete</button>
</form>