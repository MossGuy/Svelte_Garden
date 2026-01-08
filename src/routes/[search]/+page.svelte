<script lang="ts">
    export let data: {
        query: string | null;
        results: any[];
    };
</script>

<section class="mb-4">
    <h1>You searched for: {data.query}</h1>
    <p>Api searched: {data.queryBoolean}</p>
</section>

<section>
    {#if data.results.length === 0}
        <p>No results found.</p>
    {:else}
        <ul>
            {#each data.results as item}
                <li>
                    <a href={item.url} target="_blank">
                        {item.title}
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</section>
