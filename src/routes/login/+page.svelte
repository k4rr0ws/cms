<script lang="ts">
  import type { ActionData } from './$types'
  import Alert from '$lib/components/Alert.svelte'

  export let form: ActionData;
</script>

{#if form?.error}
  <Alert 
    type="error"
    message={form?.message}
  />
{/if}

<form method="POST">
<hgroup class="mb-4">
  <h2 class="text-4xl">Login</h2>
  <h3>Login to your account to access all the sites features</h3>
</hgroup>

<div class="form-control w-full max-w-xs">
  <label class="label" for="username">
    <span class="label-text">Username</span>
  </label>
  {#if form?.errors?.username}
    <input name="username" value={form?.data?.username ?? ''} id="username" type="text" class="input input-error input-bordered w-full max-w-xs" required />
    <label for="username" class="label">
      <span class="label-text-alt text-error">{form?.errors?.username[0]}</span>
    </label>
    {:else}
    <input name="username" value={form?.data?.username ?? ''} id="username" type="text" class="input input-bordered w-full max-w-xs" />
  {/if}
</div>

<div class="form-control w-full max-w-xs">
  <label class="label" for="password">
    <span class="label-text">Password</span>
  </label>
  {#if form?.errors?.password}
  <input name="password" id="password" type="text" class="input input-error input-bordered w-full max-w-xs" />
    <label for="password" class="label">
      <span class="label-text-alt text-error">{form?.errors?.password[0]}</span>
    </label>
    {:else}
    <input name="password" id="password" type="text" class="input input-bordered w-full max-w-xs" />
  {/if}
</div>

<button type="submit" class="btn btn-primary mt-4 text-white">Login</button>
</form>

<p class="mt-8">Don't have an account? <a href="/register" class="underline">Register</a></p>