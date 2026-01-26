<script lang="ts">
    let props = $props();
    let visible = $state(false);

</script>

{#if visible}
<div class="bg-orange-200 border border-orange-600 text-orange-600 rounded p-1 flex justify-between items-center">
    <p>
        <i class="bi bi-exclamation-triangle"></i>
        Warning: {props.message}
    </p>

    <button
    class="p-1"
    onclick={() => visible = false}
    >
        <i class="bi bi-x-square"></i>
    </button>
</div>
{/if}