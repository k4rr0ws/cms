<script lang="ts">
    import type { ActionData, PageData } from './$types'

    export let data: PageData
    $: category = data.category

    export let form: ActionData;

</script>

<form method="POST">
    <hgroup class="mb-4">
        <h2 class="text-2xl">Updating {category?.name} Category</h2>
    </hgroup>

    <div class="form-control w-full max-w-xs">
		<label class="label" for="name">
		  <span class="label-text">Name</span>
		</label>
		{#if form?.errors?.name}
			<input name="name" value={form?.data?.name ?? category?.name} id="name" type="text" class="input input-error input-bordered w-full max-w-xs" required />
			<label for="name" class="label">
				<span class="label-text-alt text-error">{form?.errors?.name[0]}</span>
			</label>
    	{:else}
			<input name="name" value={form?.data?.name ?? category?.name} id="name" type="text" class="input input-bordered w-full max-w-xs" />
		{/if}
	</div>

    <div class="form-control w-full max-w-xs">
		<label class="label" for="name">
		  <span class="label-text">URL Slug</span>
		</label>
		{#if form?.errors?.slug}
			<input name="slug" value={form?.data?.slug ?? category?.slug} id="slug" type="text" class="input input-error input-bordered w-full max-w-xs" required />
			<label for="slug" class="label">
				<span class="label-text-alt text-error">{form?.errors?.slug[0]}</span>
			</label>
    	{:else}
			<input name="slug" value={form?.data?.slug ?? category?.slug} id="slug" type="text" class="input input-bordered w-full max-w-xs" />
		{/if}
	</div>

    <button type="submit" class="btn btn-primary mt-4 text-white">Update Category</button>
</form>
<form action="/admin/categories?/deleteCategory" method="post" class="mb-8">
    <input name="categoryId" type="hidden" value={category?.id} />
    <button type="submit" class="btn bg-red-500 text-white border-none hover:bg-red-600 mt-4">Delete Category</button>
</form>

<a href="/admin/categories" class="underline">Back</a>
