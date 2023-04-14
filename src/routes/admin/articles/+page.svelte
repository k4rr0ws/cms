<script lang="ts">
    import { timeSince } from '$lib/utils'
    import type { PageData } from './$types'

    export let data: PageData

    $: ({ articles } = data)
</script>


<hgroup class="mb-8">
  <h2 class="text-2xl">Moderate</h2>
  <h3>Submitted articles that haven't yet been published</h3>
</hgroup>
<div class="overflow-x-auto shadow-sm">
  <table class="table table-compact w-full">
    <thead>
      <tr class="text-white">
        <th class="bg-red-500"></th> 
        <th class="bg-red-500">Title</th> 
        <th class="bg-red-500">Date</th> 
        <th class="bg-red-500">Submitted By</th> 
        <th class="bg-red-500"></th>
      </tr>
    </thead> 
    <tbody>
    {#each articles as article}
    <tr>
      <td class="text-xs">{article.id}</td>
      <td class="text-xs">{article.title}</td>
      <td class="text-xs">{article.createdAt}</td>
      <td class="text-xs">{article.user.username}</td>
      <td class="text-xs"><a href="/admin/articles/{article.id}">Edit</a></td>
    </tr>
    {/each}
    </tbody> 
  </table>
</div>