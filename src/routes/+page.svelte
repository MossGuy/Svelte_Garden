<script lang="ts">
    import svelteImage from '$lib/assets/Svelte_Logo.png';
</script>

<header class="flex justify-center items-center py-6 flex-col lg:flex-row">
    <img class="w-40" src="{svelteImage}" alt="">
    <div class="text-center">
        <h1 class="text-4xl font-bold">Welcome to Svelte Garden!</h1>
        <p class="text-lg">The place where I practice my Svelte.</p>
        <p class="text-xs">Made in SvelteKit. Oficial documentation: <a target="new" class="text-orange-700" href="https://svelte.dev/">svelte.dev</a></p>
    </div>
</header>
