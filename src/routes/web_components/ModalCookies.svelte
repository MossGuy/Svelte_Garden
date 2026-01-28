<script lang="ts">
    import { fly } from 'svelte/transition';

    let { 
        visible = $bindable(false)
    } = $props<{
        visible?: boolean;
    }>();
</script>

{#if visible}
<div
class="border border-2 rounded p-1 h-64 w-100 mx-auto bg-white shadow-lg flex flex-col gap-4 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
in:fly={{ y: -20, duration: 1000 }}
out:fly={{ y: -20, duration: 300 }}
>
    <h2>
        <i class="bi bi-cookie"></i>
        I need to inform you about cookies, you know the drill.
    </h2>
    <div class="overflow-y-scroll">
        <p>Every website makes use of cookies, even if the programmer never wrote any code about it...</p>
        <br>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet blandit orci, sed volutpat nunc. Quisque commodo posuere quam sit amet fermentum. Phasellus nec vehicula dui. Nulla ornare dui eu enim ornare, eu fringilla dolor egestas. Praesent fermentum quis quam et laoreet. Curabitur ac vulputate orci. Donec nec scelerisque tortor. Mauris quis felis pulvinar, convallis mi quis, hendrerit metus. Integer eu dolor vulputate, feugiat eros non, auctor massa. Ut id quam iaculis, vulputate lectus ut, mattis tellus. Suspendisse in mauris vitae lorem commodo aliquet eu sed orci. Nam vel euismod magna, vitae rhoncus enim. Fusce iaculis ipsum ac purus posuere posuere. Curabitur bibendum sapien gravida fringilla lacinia. Mauris quis iaculis eros.
        </p>
    </div>
    <div class="flex justify-between">
        <button
        onclick={
        () => {

            console.info("Choice is but an illusion...");
            visible = false;
            }
        }
        class="py-1 px-3 rounded border border-2"
        >
            Reject all cookies
        </button>
        
        <button
        onclick={
        () => {
            console.info("I shall be very delicate with your data...");
            visible = false;
            }
        }
        class="py-1 px-3 rounded bg-green-600 text-white"
        >
            Accept all cookies
        </button>
    </div>
</div>
{/if}