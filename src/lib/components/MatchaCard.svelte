<script lang="ts">
  import type { Matcha } from '$lib/data/matcha';
	export let item: Matcha;

	const stars = Array.from({ length: 5 }, (_, i) => i + 1);
</script>

<article class="group rounded-3xl border border-black/5 bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
	<header class="flex items-start justify-between gap-3">
		<div class="min-w-0">
			<h3 class="truncate text-base font-semibold tracking-tight text-neutral-900">
				{item.brand ? `${item.brand} — ` : ''}{item.name}
			</h3>
			<p class="mt-1 text-sm text-neutral-600">
				<span class="capitalize">{item.style}</span>
				{#if item.origin} · {item.origin}{/if}
				· <span class="font-medium">{item.priceTier}</span>
			</p>
		</div>

		<div class="flex shrink-0 items-center gap-0.5" aria-label={`Rating: ${item.rating} out of 5`}>
			{#each stars as s}
				<span class={s <= item.rating ? 'text-neutral-900' : 'text-neutral-300'}>★</span>
			{/each}
		</div>
	</header>

	<p class="mt-4 text-sm leading-relaxed text-neutral-700">
		{item.notes}
	</p>

	{#if item.url}
		<p class="mt-4 text-xs text-neutral-500">
			Available in Germany: <span class="font-medium text-neutral-700">{item.url}</span>
		</p>
	{/if}

	<footer class="mt-4 flex flex-wrap items-center gap-2">
		{#if item.rebuy}
			<span class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
				Rebuy ✅
			</span>
		{:else}
			<span class="rounded-full bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-100">
				No rebuy
			</span>
		{/if}

		{#each item.tags as tag (tag)}
			<span class="rounded-full bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-100">
				#{tag}
			</span>
		{/each}
	</footer>
</article>
