<script lang="ts">
    import svelteImage from '$lib/assets/Svelte_Logo.png';

    import { goto } from '$app/navigation';
    import { Tooltip } from "flowbite-svelte";

    export let data: {
    };

    let searchValue = '';

    function handleSearch() {
        if (!searchValue.trim()) return;

        goto(`/search?query=${encodeURIComponent(searchValue)}`);
    }
</script>

<header class="flex justify-center items-center py-6 flex-col lg:flex-row">
    <img class="w-40" src="{svelteImage}" alt="">
    <div class="text-center">
        <h1 class="text-4xl font-bold">Welcome to Svelte Garden!</h1>
        <p class="text-lg">The place where I practice Svelte.</p>
        <p class="text-xs">Made in SvelteKit. Oficial documentation: <a target="new" class="text-orange-700" href="https://svelte.dev/">svelte.dev</a></p>
    </div>
</header>

<section>
    <p class="text-center text-xl">Search the news!</p>
    <p class="text-center text-xs">Made possible by: <a href="https://hn.algolia.com/api" target="new" class="text-orange-700">Hacker News API</a></p>

    <div class="flex justify-center mb-6 mt-2">
        <input
            type="text"
            placeholder="Are you looking for anything?"
            bind:value={searchValue}
            class="border border-gray-400 border-2 rounded-lg px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            on:keydown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <button
            on:click={handleSearch}
            class="bg-teal-600 hover:bg-teal-500 transition rounded px-3 mx-2 text-white font-semibold cursor-pointer"
        >
            Search
        </button>
    </div>
</section>
