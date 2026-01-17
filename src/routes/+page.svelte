<script lang="ts">
	import { matchas } from '$lib/data/matcha';
	import MatchaCard from '$lib/components/MatchaCard.svelte';
	import MatchaRitual from '$lib/components/MatchaRitual.svelte';

	let tab: 'library' | 'ritual' = 'library';
	$: libraryCount = filtered.length;

	let query = '';
	let style: 'all' | 'ceremonial' | 'premium' | 'basic' = 'all';
  let ritualStepIndex = 0;

  const ritualImages = [
    {
      src: '/ritual/bowl.jpg',
      alt: 'Warm bowl'
    },
    {
      src: '/ritual/sift.jpg',
      alt: 'Sift matcha'
    },
    {
      src: '/ritual/scoop.jpg',
      alt: 'Pour water'
    },
    {
      src: '/ritual/whisk.jpg',
      alt: 'Whisking matcha'
    },
    {
      src: '/ritual/finish.jpg',
      alt: 'Enjoy'
    }
  ];

  $: if (tab === 'ritual') query = '';

	$: filtered = matchas
		.filter((m) => (style === 'all' ? true : m.style === style))
		.filter((m) => {
			const q = query.trim().toLowerCase();
			if (!q) return true;
			return (
				m.name.toLowerCase().includes(q) ||
				(m.brand ?? '').toLowerCase().includes(q) ||
				m.notes.toLowerCase().includes(q) ||
				(m.tags ?? []).join(' ').toLowerCase().includes(q)
			);
		});
</script>

<svelte:head>
	<title>Matcha Notes</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
	<div class="mx-auto max-w-6xl px-5 py-12">
		<header class="rounded-3xl bg-gradient-to-b from-[#e6eddc] to-transparent p-4 sm:p-6">
      <div class="flex flex-col gap-6">
        <p class="text-sm font-medium text-neutral-500">
          Personal tasting notes
        </p>

        <h1 class="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Matcha book
        </h1>

        <p class="max-w-2xl text-sm leading-relaxed text-neutral-600">
          Notes with ratings. Built with SvelteKit + TypeScript.
        </p>
      </div>
    </header>

    <div class="mt-10">
      <!-- Tabs -->
      <div class="inline-flex rounded-2xl bg-neutral-100 p-1 ring-1 ring-black/5">
        <button
          type="button"
          on:click={() => (tab = 'library')}
          class="rounded-2xl px-4 py-2 text-sm font-medium transition
            {tab === 'library'
              ? 'bg-white text-neutral-900 shadow-sm ring-1 ring-black/5'
              : 'text-neutral-600 hover:text-neutral-900'}"
        >
          Library
          <span class="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700 ring-1 ring-black/5">
            {libraryCount}
          </span>
        </button>

        <button
          type="button"
          on:click={() => (tab = 'ritual')}
          class="rounded-2xl px-4 py-2 text-sm font-medium transition
            {tab === 'ritual'
              ? 'bg-white text-neutral-900 shadow-sm ring-1 ring-black/5'
              : 'text-neutral-600 hover:text-neutral-900'}"
        >
          Ritual
        </button>
		  </div>

      <!-- Panels -->
      <div class="mt-6">
        {#if tab === 'library'}
          <!-- Filters -->
          <div class="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div />

            <div class="flex flex-wrap items-center gap-2">
              <input
                class="w-64 rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm text-neutral-800 shadow-sm ring-1 ring-black/5 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Search name, notes, tags…"
                bind:value={query}
              />
              <select
                class="w-30 rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm text-neutral-800 shadow-sm ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                bind:value={style}
              >
                <option value="all">All</option>
                <option value="ceremonial">Ceremonial</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
              </select>
            </div>
          </div>

          <!-- Matcha Grid -->
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {#each filtered as item (item.id)}
              <MatchaCard {item} />
            {/each}
          </div>

          {#if filtered.length === 0}
            <p class="mt-8 text-sm text-neutral-600">No matcha found. Try a different search.</p>
          {/if}

        <!--Ritual Tab-->
        {:else}
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
            <div class="max-w-xl">
              <MatchaRitual bind:stepIndex={ritualStepIndex} />
            </div>

            <!-- RHS image panel -->
            <div class="lg:sticky lg:top-6 flex justify-center">
              <div class="w-fit max-w-lg">
                <div class="flex h-116 w-full items-center justify-center overflow-hidden rounded-3xl bg-neutral-50">
                  <img
                    class="h-full w-full object-cover"
                    src={ritualImages[ritualStepIndex]?.src}
                    alt={ritualImages[ritualStepIndex]?.alt}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>

		<footer class="mt-14 border-t border-black/5 pt-6 text-xs text-neutral-500">
			© {new Date().getFullYear()} · Matcha Notes
		</footer>
	</div>
</div>
