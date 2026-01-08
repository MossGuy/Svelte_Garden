<script lang="ts">
    import { goto } from '$app/navigation';
    import { tick } from 'svelte';
    import { Tooltip } from "flowbite-svelte";

    export let data: {
        query: string | null;
        results: any[];
    };

    let searchValue = '';
    let activeSearch = true;
    let inputEl: HTMLInputElement;

    let debounceTimeout: ReturnType<typeof setTimeout>;

    async function handleSearch() {
        if (!searchValue.trim()) return;

        await goto(`/search?query=${encodeURIComponent(searchValue)}`, {
            replaceState: true
        });

        // wachten tot DOM opnieuw gerenderd is
        await tick();
        inputEl?.focus();
    }

    function handleInput() {
        if (!activeSearch) return;

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(handleSearch, 200);
    }
</script>

<section class="mb-4 p-4 flex justify-center border-b-2 border-teal-900 gap-2">
    <input
        bind:this={inputEl}
        bind:value={searchValue}
        on:input={handleInput}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
        class="border border-gray-400 border-2 rounded-lg px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />



    <button
        on:click={handleSearch}
        class="bg-teal-600 hover:bg-teal-500 transition rounded px-3 text-white font-semibold cursor-pointer"
    >
        Search
    </button>

    <label id="activeSearchLabel" class="my-auto flex items-center gap-1 px-2 py-1 hover:underline cursor-pointer">
        Active search
        <input
            type="checkbox"
            bind:checked={activeSearch}
        />
    </label>
    <Tooltip triggeredBy="#activeSearchLabel" class="text-default bg-gray-300">
        When enabled, searches are performed automatically as you type (with a small delay).
    </Tooltip>
</section>

<section>
    {#if data.results.length === 0}
        <p>No results found.</p>
    {:else}
        <ul>
            {#each data.results as item}
                <li>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</section>
