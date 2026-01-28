<script lang="ts">
    import { fly } from 'svelte/transition';

    let { 
        message,
        visible = $bindable(false)
    } = $props<{
        message: string;
        visible?: boolean;
    }>();
</script>

{#if visible}
<div
in:fly={{ y: -20, duration: 300 }}
out:fly={{ y: -20, duration: 150 }}
class="bg-red-200 border border-red-600 text-red-600 rounded p-1 flex justify-between items-center"
>
    <p>
        <i class="bi bi-info-circle"></i>
        Error: {message}
    </p>

    <button
    class="p-1"
    onclick={() => visible = false}
    aria-label="Close alert"
    >
        <i class="bi bi-x-square"></i>
    </button>
</div>
{/if}