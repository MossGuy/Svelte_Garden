<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { fade } from 'svelte/transition';

	let navbarOpen = $state(false);

	function toggleNavbar() {
		navbarOpen = !navbarOpen;
		console.log('Navbar open:', navbarOpen);
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="flex flex-col lg:flex-row justify-center text-2xl lg:text-xl text-white border-b-2 border-teal-900 pb-1 px-2 py-1 gap-2 bg-teal-700">
	<!-- nav header -->
	<div class="flex gap-2 mr-auto font-semibold w-full justify-between items-center">
		<a class="hover:underline" href="/">Home</a>

		<button
			onclick={toggleNavbar}
			aria-label="Toggle navigation"
			class="border border-2 rounded px-1 block lg:hidden hover:bg-teal-600 transition cursor-pointer"
		>
			<i class="bi bi-list"></i>
		</button>
	</div>

	<!-- nav body -->
	<div
	class="flex flex-col gap-2 lg:flex lg:flex-row lg:gap-4 justify-end lg:w-full"
	class:hidden={!navbarOpen}
	>
		<a class="hover:underline" href="/search">News</a>
		<a class="hover:underline" href="/web_components">Components</a>
	</div>
</nav>

<main class="px-4 py-6">
	{@render children()}
</main>
