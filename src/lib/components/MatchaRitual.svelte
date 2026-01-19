<!-- src/lib/components/MatchaRitual.svelte -->
<script lang="ts">
	type Step = {
		title: string;
		desc: string;
		timerSec?: number;
	};

	const recipe = {
		matchaG: 2,
		waterMl: 70,
		tempC: 78,
		steps: [
			{
				title: 'Warm the bowl',
				desc: 'Rinse the chawan with hot water, then discard and dry.'
			},
			{
				title: 'Sift matcha',
				desc: 'Sift ~2g of matcha (about 2 chashaku) to avoid clumps.'
			},
			{
				title: 'Add water',
				desc: 'Add ~70ml water at ~78°C. Avoid boiling water.'
			},
			{
				title: 'Whisk',
				desc: 'Use quick M/W strokes near the surface to build fine foam.',
				timerSec: 20
			},
			{
				title: 'Finish',
				desc: 'Slow down, lift the whisk gently, and enjoy your matcha ☁️'
			}
		]
	};

  export let stepIndex = 0;

	// timer state
	let running = false;
	let remaining = 0;
	let interval: number | null = null;

	function stopTimer() {
		running = false;
		if (interval) window.clearInterval(interval);
		interval = null;
	}

	function startTimer(sec: number) {
		stopTimer();
		running = true;
		remaining = sec;

		interval = window.setInterval(() => {
			remaining -= 1;
			if (remaining <= 0) {
				stopTimer();
				// Gentle guidance: auto-advance when timer ends (if there is a next step)
				if (stepIndex < recipe.steps.length - 1) stepIndex += 1;
			}
		}, 1000);
	}

	function next() {
		stopTimer();
		if (stepIndex < recipe.steps.length - 1) stepIndex += 1;
	}

	function prev() {
		stopTimer();
		if (stepIndex > 0) stepIndex -= 1;
	}

	function reset() {
		stopTimer();
		stepIndex = 0;
	}

	$: current = recipe.steps[stepIndex];
	$: progress = Math.round(((stepIndex + 1) / recipe.steps.length) * 100);
</script>

<section class="w-full rounded-3xl border border-black/5 bg-white p-6 shadow-sm ring-1 ring-black/5">
	<header class="flex items-start justify-between gap-4">
		<div>
			<h2 class="text-lg font-semibold tracking-tight text-neutral-900">Matcha Ritual</h2>
			<p class="mt-1 text-sm text-neutral-600">A simple, calm preparation guide.</p>
		</div>

		<button
			type="button"
			on:click={reset}
			class="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-200"
		>
			Reset
		</button>
	</header>

	<!-- Recipe summary -->
	<div class="mt-5 rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-100">
		<div class="grid grid-cols-3 gap-3 text-sm">
			<div class="rounded-xl bg-white p-3 ring-1 ring-neutral-200">
				<div class="text-xs text-neutral-500">Matcha</div>
				<div class="mt-1 font-semibold text-neutral-900">{recipe.matchaG}g</div>
			</div>
			<div class="rounded-xl bg-white p-3 ring-1 ring-neutral-200">
				<div class="text-xs text-neutral-500">Water</div>
				<div class="mt-1 font-semibold text-neutral-900">{recipe.waterMl}ml</div>
			</div>
			<div class="rounded-xl bg-white p-3 ring-1 ring-neutral-200">
				<div class="text-xs text-neutral-500">Temp</div>
				<div class="mt-1 font-semibold text-neutral-900">{recipe.tempC}°C</div>
			</div>
		</div>
	</div>

	<!-- Progress -->
	<div class="mt-5">
		<div class="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
			<div class="h-full rounded-full bg-neutral-900 transition-all" style={`width:${progress}%`} />
		</div>
		<div class="mt-2 flex items-center justify-between text-xs text-neutral-500">
			<span>Step {stepIndex + 1} / {recipe.steps.length}</span>
			<span>{progress}%</span>
		</div>
	</div>

	<div class="mt-6 rounded-2xl bg-neutral-50 p-5 ring-1 ring-neutral-100">
    <!-- Title + Timer row -->
    <div class="flex items-start justify-between gap-4">
      <h3 class="text-base font-semibold text-neutral-900 py-2">
        {current.title}
      </h3>

      {#if current.timerSec}
        <div class="shrink-0">
          {#if !running}
            <button
              type="button"
              on:click={() => startTimer(current.timerSec!)}
              class="cursor-pointer rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Start timer {current.timerSec}s
            </button>
          {:else}
            <div class="flex items-center gap-2">
              <div class="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 ring-1 ring-neutral-200">
                {remaining}s
              </div>
              <button
                type="button"
                on:click={stopTimer}
                class="cursor-pointer rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-200"
              >
                Stop
              </button>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Description -->
    <p class="mt-2 text-sm leading-relaxed text-neutral-700">
      {current.desc}
    </p>
  </div>

	<!-- Navigation -->
	<footer class="mt-5 flex items-center justify-between">
		<button
			type="button"
			on:click={prev}
			disabled={stepIndex === 0}
			class="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-200 disabled:opacity-50"
		>
			Back
		</button>

		<button
			type="button"
			on:click={next}
			disabled={stepIndex === recipe.steps.length - 1}
			class="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
		>
			Next
		</button>
	</footer>
</section>
