<script lang="ts">
    import type { ActionData } from './$types'

    export let form: ActionData;
</script>

<form method="POST">
	<hgroup class="mb-4">
		<h2 class="text-4xl">Register</h2>
		<h3>Create an account to be able to submit links and participate in conversation</h3>
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

	<button type="submit" class="btn btn-primary mt-4">Register</button>
</form>

<p class="mt-8">Already have an account? <a href="/login" class="underline">Login</a></p>