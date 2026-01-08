<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav class="flex justify-center text-xl text-white font-semibold border-b-2 border-teal-900 pb-1 bg-teal-700">
	<div class="flex gap-2 mr-auto px-2">
		<a class="mr-5 hover:underline" href="/">Home</a>
	</div>
</nav>

<main class="bg-gray-200 min-h-screen px-4 py-6">
	{@render children()}
</main>