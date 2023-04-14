<script lang="ts">
    import { timeSince } from '$lib/utils'
    import type { PageData } from './$types'

    export let data: PageData
    $: console.log(data.paginationData)

    $: ({ articles } = data)
</script>

<ul class="list-none space-y-4">
    {#each articles as article}
    <li>
      <h2 class="text-xl"><a href={article.url}>{article.title}</a></h2>
      <p class="text-sm text-neutral-800">{article.description}</p>
      <p class="text-xs text-neutral-500"><span class="time">{timeSince(article.createdAt)} ago</span> by {article.user.username} | <a href="#">123 comments</a> | <a href={article.url}>{article.url}</a></p>
    </li>
    {/each}
</ul>