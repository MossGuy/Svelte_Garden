<script lang="ts">
    import { fly } from 'svelte/transition';
    import type { PageData } from './$types';

    // import data from database
    let { data }: { data: PageData } = $props();

    $effect(() => {
        console.log('Loaded items:', data.items);
    });

    type Item = {
        item_id: number;
        item_name: string;
        item_description: string;
        creation_date: string;
    };

    // responsive view state variables
    let current_view = $state<'overview' | 'read' | 'update' | 'create'>('overview');
    let current_item = $state<Item | null>(null);

    function toggleView(view: typeof current_view, item: Item | null = null) {
        current_view = view;
        current_item = item;
    }
</script>

<!-- PAGE HEADER -->
<section>
    <h1 class="text-2xl font-semibold">Items</h1>
    <button
        onclick={() => toggleView('create')}
        class="text-teal-700 hover:text-orange-500">
        Create
    </button>
</section>


<!-- OVERVIEW -->
{#if current_view === 'overview'}
<section
    class="overflow-y-auto"
    in:fly={{ y: 20, duration: 300 }}
    out:fly={{ y: -20, duration: 300 }}>

   {#each data.items as item}
    <div class="border-b py-2 my-2">
        <h3 class="text-lg font-semibold">{item.item_name}</h3>

        <div class="flex gap-3 text-sm">
            <button
                onclick={() => toggleView('read', item)}
                class="text-teal-700 hover:text-orange-500">
                Read
            </button>

            <button
                onclick={() => toggleView('update', item)}
                class="text-teal-700 hover:text-orange-500">
                Update
            </button>

            <form
                method="POST"
                action="?/delete"
                onsubmit={(e) => {
                    const confirmed = confirm('Are you sure you want to delete this item?');
                    if (!confirmed) {
                        e.preventDefault();
                    }
                }}
            >
                <input type="hidden" name="item_id" value={item.item_id} />

                <button
                    type="submit"
                    class="text-red-600 hover:text-red-800">
                    Delete
                </button>
            </form>
        </div>
    </div>
   {/each}

</section>
{/if}


<!-- READ -->
{#if current_view === 'read' && current_item}
<section
    class="p-4"
    in:fly={{ y: 20, duration: 300 }}
    out:fly={{ y: -20, duration: 300 }}>

    <h2 class="text-2xl font-semibold mb-2">
        {current_item.item_name}
    </h2>

    <p class="mb-2">
        {current_item.item_description}
    </p>

    <small class="text-gray-500">
        Created: {new Date(current_item.creation_date).toLocaleString()}
    </small>
</section>

<button
    onclick={() => toggleView('overview')}
    class="text-teal-700 hover:text-orange-500">
    Back to Overview
</button>
{/if}


<!-- UPDATE -->
{#if current_view === 'update' && current_item}
<section
    class="p-4"
    in:fly={{ y: 20, duration: 300 }}
    out:fly={{ y: -20, duration: 300 }}>

    <h2 class="text-xl font-semibold mb-3">
        Update: {current_item.item_name}
    </h2>

    <form method="POST" action="?/update">
        <input type="hidden" name="item_id" value={current_item.item_id} />

        <label for="item_name_update" class="block mb-2">Item Name</label>
        <input
            type="text"
            name="item_name_update"
            id="item_name_update"
            value={current_item.item_name}
            class="border rounded px-2 py-1 w-full mb-4" />

        <label for="item_description_update" class="block mb-2">Description</label>
        <textarea
            name="item_description_update"
            id="item_description_update"
            rows="4"
            class="border rounded px-2 py-1 w-full mb-4 resize-none">{current_item.item_description}</textarea>
        <button
            type="submit"
            class="text-teal-700 hover:text-orange-500">
            Save Changes
        </button>
    </form>
</section>

<button
    onclick={() => toggleView('overview')}
    class="text-teal-700 hover:text-orange-500">
    Back to Overview
</button>
{/if}


<!-- CREATE -->
{#if current_view === 'create'}
<section
    class="p-4"
    in:fly={{ y: 20, duration: 300 }}
    out:fly={{ y: -20, duration: 300 }}>

    <h2 class="text-xl font-semibold mb-3">
        Create New Item
    </h2>

    <form method="POST" action="?/create">
        <label for="item_name_create" class="block mb-2">Item Name</label>
        <input
            type="text"
            name="item_name_create"
            id="item_name_create"
            required
            class="border rounded px-2 py-1 w-full mb-4" />

        <label for="item_description_create" class="block mb-2">Description</label>
        <textarea
            name="item_description_create"
            id="item_description_create"
            rows="4"
            class="border rounded px-2 py-1 w-full mb-4 resize-none"></textarea>

        <button
            type="submit"
            class="text-teal-700 hover:text-orange-500">
            Create Item
        </button>
    </form>
</section>

<button
    onclick={() => toggleView('overview')}
    class="text-teal-700 hover:text-orange-500">
    Back to Overview
</button>
{/if}