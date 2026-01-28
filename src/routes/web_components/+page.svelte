<script lang="ts">
    import { fly } from 'svelte/transition';
    import { crossfade } from 'svelte/transition';
    const [send, receive] = crossfade({
        duration: 200
    });

    // alert info
    import AlertInfo from './AlertInfo.svelte';
    let showAlertInfo = $state(false);
    let alertInfoMessage = $state("Welcome to the Web Components gallery!");

    // alert error
    import AlertError from './AlertError.svelte';
    let showAlertError = $state(false);
    let alertErrorMessage = $state("Some components may not function as expected.");

    // alert warning
    import AlertWarning from './AlertWarning.svelte';
    let showAlertWarning = $state(false);
    let alertWarningMessage = $state("This page is under construction. More components may be added later!");

    // cookies modal
    import ModalCookies from './ModalCookies.svelte';
    // modal visibility TODO: make it show only once per user session
    let showModalCookies = $state(true);


    // reactive div data
    let { data } = $props<{ data: { framework_experiences: any[] } }>();
    let selectedExperience = $derived(data.framework_experiences[0]);
</script>

<svelte:head>
    <title>Svelte Garden | Components</title>
</svelte:head>

<!-- alerts container -->
<section class="flex flex-col gap-1 fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg z-50">
    <AlertInfo bind:visible={showAlertInfo} bind:message={alertInfoMessage} />
    <AlertError bind:visible={showAlertError} bind:message={alertErrorMessage} />
    <AlertWarning bind:visible={showAlertWarning} bind:message={alertWarningMessage} />
</section>

<!-- modal container -->
<section>
    <ModalCookies bind:visible={showModalCookies} />
</section>

<!-- page title -->
<section>
    <h1 class="text-4xl font-bold text-center my-6">Web Components gallery</h1>
</section>

<!-- reactive div -->
<section>
    <h2>Reactive div:</h2>
    <!-- toggle buttons -->
    <div
    class="border border-teal-700 rounded px-2 flex flex-wrap justify-center mb-6 w-3/5 text-xs mx-auto"
    >
        {#each data.framework_experiences as experience}
                <button
                hidden={experience.hidden}
                class="text-teal-700 font-semibold px-4 py-2 m-2 hover:text-orange-600 hover:underline transition cursor-pointer"
                class:selected={experience === selectedExperience}
                onclick={() => selectedExperience = experience}
                >
                    {experience.title}
                </button>
        {/each}
    </div>

    <!-- reactive divs -->
    <div>
        {#each data.framework_experiences as experience}
            {#if experience === selectedExperience}
                <div
                in:fly={{ x: 200, duration: 300, opacity: 0, delay: 350 }}
                out:fly={{ x: -200, duration: 300, opacity: 0 }}

                class="border border-teal-700 rounded p-4 mx-auto w-3/5 mb-6 text-center"
                >
                    <h3 class="text-xl font-bold mb-4">
                        My experience with: <br>
                        <span class="text-2xl text-teal-700">{experience.title}</span>
                    </h3>
                    <p class="mb-4">{experience.description1}</p>
                    <p class="mb-4">{experience.description2}</p>
                    <ul class="list-disc list-inside">
                        {#each experience.features as feature}
                            <li>{feature}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
        {/each}
    </div>
</section>

<!-- event buttons -->
<section>
    <h2>Buttons that trigger events:</h2>

    <div>
        <button
        onclick={() => showAlertInfo = true}
        class="border border-blue-700 text-blue-700 bg-blue-200 border-2 rounded p-1"
        >
            Info alert
        </button>

        <button
        onclick={() => showAlertError = true}
        class="border border-red-700 text-red-700 bg-red-200 border-2 rounded p-1"
        >
            Error alert
        </button>
        
        <button
        onclick={() => showAlertWarning = true}
        class="border border-orange-700 text-orange-700 bg-orange-200 border-2 rounded p-1"
        >
            Warning alert
        </button>
    </div>
</section>

<section class="h-screen">

</section>

<style>
    .selected {
        color: #f54900; /* orange-600 */
    }
</style>