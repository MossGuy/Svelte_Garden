<script lang="ts">
    import { invalidate, replaceState, goto } from '$app/navigation';
    import { Tooltip } from "flowbite-svelte";
    import hackerNewsLogo from '$lib/assets/hacker-news.png';

    export let data: {
        query: string | null;
        results: any[];
    };

    let searchValue = data.query || '';
    let activeSearch = false;

    let debounceTimeout: ReturnType<typeof setTimeout>;

    function handleSearch() {
        if (!searchValue.trim()) return;

        const url = `/search?query=${encodeURIComponent(searchValue)}`;

        goto(url, {
            replaceState: true,
            keepFocus: true,
            noScroll: true
        });
    }



    function handleInput() {
        if (!activeSearch) return;

        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
            handleSearch();
        }, 200);
    }
</script>


<section class="flex flex-col bg-gray-300 rounded-lg mb-6">
    <div class="flex items-center justify-center w-100 mx-auto border-b-2 border-teal-900 mb-1">
        <img src="{hackerNewsLogo}" alt="Hacker News Logo" class="w-12 mb-2" />
        <h2 class="text-center text-2xl font-semibold text-teal-700"> Hacker News</h2>
    </div>
    
    <div class="px-2 py-4 flex flex-col lg:flex-row justify-center gap-2 lg:gap-8 lg:items-center">
        <input
            type="text"
            placeholder="Look for something else?"
            bind:value={searchValue}
            on:input={handleInput}
            on:keydown={(e) => e.key === 'Enter' && handleSearch()}
            class="border border-gray-400 border-2 rounded-lg px-4 py-2 lg:w-2/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
