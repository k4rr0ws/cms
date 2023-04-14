<script lang="ts">
    import type { ActionData, PageData } from './$types'

    export let data: PageData
    $: categories = data.categories

    export let form: ActionData;

    let selected: HTMLSelectElement
    let category: Category

    const onSelectCategory = () => {
        for(let i=0;i<categories.length;i++) {
            if (categories[i].id == Number(selected.value)) {
                category = categories[i]
            }
        }
    }
</script>

<div class="mb-12">
    <hgroup class="mb-4">
        <h2 class="text-2xl">Categories</h2>
        <h3>Manage existing categories</h3>
    </hgroup>
    <select class="select w-full max-w-xs" on:change={onSelectCategory} bind:this={selected}>
        <option disabled selected>Select</option>
        {#each data.categories as category}
            <option value={category.id}>{category.name}</option>
        {/each}
    </select>

    {#if category}
    <div class="mt-4">
    <a href="/admin/categories/{category?.id}" class="btn btn-primary">Edit</a>
    </div>
    {/if}
</div>

<form method="POST" action="/admin/categories?/createCategory">
    <hgroup class="mb-4">
        <h2 class="text-2xl">Add New Category</h2>
        <h3>Create a new category</h3>
    </hgroup>

    <div class="form-control w-full max-w-xs">
		<label class="label" for="name">
		  <span class="label-text">Name</span>
		</label>
		{#if form?.errors?.name}
			<input name="name" value={form?.data?.name ?? ''} id="name" type="text" class="input input-error input-bordered w-full max-w-xs" required />
			<label for="name" class="label">
				<span class="label-text-alt text-error">{form?.errors?.name[0]}</span>
			</label>
    	{:else}
			<input name="name" value={form?.data?.name ?? ''} id="name" type="text" class="input input-bordered w-full max-w-xs" />
		{/if}
	</div>

    <div class="form-control w-full max-w-xs">
		<label class="label" for="name">
		  <span class="label-text">URL Slug</span>
		</label>
		{#if form?.errors?.slug}
			<input name="slug" value={form?.data?.slug ?? ''} id="slug" type="text" class="input input-error input-bordered w-full max-w-xs" required />
			<label for="slug" class="label">
				<span class="label-text-alt text-error">{form?.errors?.slug[0]}</span>
			</label>
    	{:else}
			<input name="slug" value={form?.data?.slug ?? ''} id="slug" type="text" class="input input-bordered w-full max-w-xs" />
		{/if}
	</div>

    <button type="submit" class="btn btn-primary mt-4">Add Category</button>
</form>
