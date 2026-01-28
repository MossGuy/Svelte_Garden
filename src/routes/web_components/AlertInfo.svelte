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
class="bg-blue-200 border border-blue-600 text-blue-600 rounded p-1 flex justify-between items-center"
>
    <p>
        <i class="bi bi-info-circle"></i>
        Notice: {message}
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