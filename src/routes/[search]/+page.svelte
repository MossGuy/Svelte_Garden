<script lang="ts">
    import { goto } from '$app/navigation';
    import { tick } from 'svelte';
    import { Tooltip } from "flowbite-svelte";
    import hackerNewsLogo from '$lib/assets/hacker-news.png';

    // import bootstrap icons
    import 'bootstrap-icons/font/bootstrap-icons.css';

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

    // watch input changes for active search
    function handleInput() {
        // only trigger when active search is enabled
        if (!activeSearch) return;

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(handleSearch, 200);
    }
</script>

<!-- inputs ui -->
<section class="flex flex-col bg-gray-300 rounded-lg mb-6">
    <div class="flex items-center justify-center w-100 mx-auto border-b-2 border-teal-900 mb-1">
        <img src="{hackerNewsLogo}" alt="Hacker News Logo" class="w-12 mb-2" />
        <h2 class="text-center text-2xl font-semibold text-teal-700"> Hacker News</h2>
    </div>
    
    <div class="px-2 py-4 flex flex-col lg:flex-row justify-center gap-2 lg:gap-8 lg:items-center">
        <input
            bind:this={inputEl}
            bind:value={searchValue}
            on:input={handleInput}
            on:keydown={(e) => e.key === 'Enter' && handleSearch()}
            class="bg-gray-100 border border-gray-400 border-2 rounded-lg px-4 py-2 w-full lg:w-2/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <div class="flex justify-between lg:justify-start gap-4 h-10">
            <button
                on:click={handleSearch}
                class="bg-teal-600 hover:bg-teal-500 transition rounded px-3 text-white font-semibold cursor-pointer"
            >
                Search
            </button>

            <label id="activeSearchLabel" class="text-sm my-auto flex items-center gap-1 px-2 py-1 hover:underline cursor-pointer">
                Active search
                <input
                    type="checkbox"
                    bind:checked={activeSearch}
                />
            </label>
            <Tooltip triggeredBy="#activeSearchLabel" placement="bottom" class="text-default bg-gray-400">
                When enabled, searches are performed automatically as you type (with a small delay).
            </Tooltip>
        </div>
    </div>
</section>

<!-- news search results -->
<section>
    {#if data.results.length === 0}
        <p>No results found.</p>
    {:else}
        <ul>
            {#each data.results as item}
                <li class="px-1 py-2 border-b border-gray-300">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" class="text-teal-700 font-semibold">
                        {item.title}
                    </a>
                    <div class="text-sm flex flex-col md:flex-row gap-2 md:gap-4 mt-1">
                        <p>
                            <i class="bi bi-calendar-event-fill text-teal-800"></i>
                            Updated at:
                            <span class="text-gray-700">{new Date(item.updated_at).toLocaleDateString('nl-NL')}</span>
                        </p>
                        <p>
                            <i class="bi bi-tags-fill text-teal-800"></i>
                            Tags: 
                            {#each item._tags as tag}
                                <span class="bg-gray-200 text-gray-700 px-1 rounded mr-1">{tag}</span>
                            {/each}
                        </p>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</section>
