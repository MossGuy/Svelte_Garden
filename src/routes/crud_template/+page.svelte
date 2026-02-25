<script lang="ts">
    import { fly } from 'svelte/transition';

    // import data from database
    let { data } = $props();
    $effect(() => {
        // console.log('Data:', data);
    });

    // dynamic view states
    let current_view = $state('overview');
    let current_item = $state('');

    function toggleView(view: string, item: string = '') {
        console.log('Toggling view to:', view, 'for item:', item);
        current_view = view;
        current_item = item;
    }

    // delete item function (placeholder)
    function delete_item(item: string) {
        if (confirm('Are you sure you want to delete ' + item + '?')) {
            console.log('Deleting item:', item);
        }
    }
</script>


<section>
    <h1 class="text-2xl font-semibold">Items</h1>
    <button onclick={() => toggleView('create')} class="text-teal-700 hover:text-orange-500">Create New Item</button>
</section>

<!-- overview sectie -->
{#if current_view === 'overview'}
<section class="overflow-y-auto"
in:fly={{ y: 20, duration: 300 }}
out:fly={{ y: -20, duration: 300 }}>
   {#each data.items as item}
    <div class="border-b py-1 my-1">
        <h3 class="text-lg font-semibold">{item.item_name}</h3>
        <div class="flex gap-2">
            <button onclick={() => toggleView('read', item.item_name)} class="text-teal-700 hover:text-orange-500">Read</button>
            <button onclick={() => toggleView('update', item.item_name)} class="text-teal-700 hover:text-orange-500">Update</button>
            <button onclick={() => delete_item(item.item_name)} class="text-teal-700 hover:text-orange-500">Delete</button>
        </div>
    </div>
    {/each}
</section>
{/if}

<!-- read sectie -->
{#if current_view === 'read'}
    <section class="p-4"
    in:fly={{ y: 20, duration: 300 }}
    out:fly={{ y: -20, duration: 300 }}>
        <h1 class="text-2xl font-semibold">{current_item}</h1>
        <p>Details about {current_item}...</p>
    </section>
    <button onclick={() => toggleView('overview')} class="text-teal-700 hover:text-orange-500">Back to Overview</button>
{/if}

<!-- update sectie -->
{#if current_view === 'update'}
    <section class="p-4"
    in:fly={{ y: 20, duration: 300 }}
    out:fly={{ y: -20, duration: 300 }}>
        <p>Updating: {current_item}</p>
    </section>
    <button onclick={() => toggleView('overview')} class="text-teal-700 hover:text-orange-500">Back to Overview</button>
{/if}

<!-- create sectie -->
{#if current_view === 'create'}
    <section class="p-4"
    in:fly={{ y: 20, duration: 300 }}
    out:fly={{ y: -20, duration: 300 }}>
        <p>Creating new item...</p>
    </section>
    <button onclick={() => toggleView('overview')} class="text-teal-700 hover:text-orange-500">Back to Overview</button>
{/if}