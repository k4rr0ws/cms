<script lang="ts">
    import "../app.postcss";
    import AdminNavigation from '$lib/components/AdminNavigation.svelte'
    import type { Category } from '$lib/types'
    import type { PageData } from './$types'

    export let data: PageData
    let categories: Array<Category>
    $: categories = data.categories


</script>
{#if !data?.user?.admin}
      <AdminNavigation />
{/if}
<div class="bg-yellow-50 my-4 mx-4 md:mx-auto md:w-[1200px] rounded-b-lg">
<header class="flex flex-cols bg-red-500 rounded-t-lg">
      <nav class="p-2 text-sm">
        <ul class="list-none space-x-4 text-white">
          <li class="inline-block hover:underline"><a href="/">News</a></li>
          <li class="inline-block"><a href="/submit">Submit</a></li>
          {#if !data.user}
            <li class="inline-block"><a href="/login">Login</a></li>
            <li class="inline-block"><a href="/register">Register</a></li>
          {:else}
            <li class="inline-block">
            <form method="POST">
                <button formaction="/logout" type="submit">Logout</button>
            </form>
            </li>
          {/if}
        </ul>
      </nav>
    </header>
    <nav class="p-2 text-xs bg-neutral-500">
      <ul class="list-none space-x-4 text-white">
        <li class="inline-block font-semibold">Categories:</li>
        {#each categories as category}
          <li class="inline-block"><a href="/category/{category.slug}" class="underline">{category.name}</a></li>
        {/each}
      </ul>
  </nav>
    <main class="p-4">
        <slot />
    </main>
</div>
<style>


</style>