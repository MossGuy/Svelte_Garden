<script lang="ts">
    let props = $props();
    let visible = $state(false);
</script>

{#if visible}
<div class="bg-red-200 border border-red-600 text-red-600 rounded p-1 flex justify-between items-center">
    <p>
        <i class="bi bi-info-circle"></i>
        Error: {props.message}
    </p>

    <button
    class="p-1"
    onclick={() => visible = false}
    >
        <i class="bi bi-x-square"></i>
    </button>
</div>
{/if}