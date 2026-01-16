export type Matcha = {
	id: string;
	name: string;
	brand?: string;
	style: 'ceremonial' | 'premium' | 'basic';
	origin?: string;
	url?: string;
	rating: 1 | 2 | 3 | 4 | 5;
	notes: string;
	priceTier: '€' | '€€' | '€€€';
	tags: string[];
	rebuy: boolean;
  triedAt?: string;
};

export const matchas: Matcha[] = [
	{
		id: 'isuzu',
		name: 'Isuzu',
		brand: 'Marukyu Koyamaen',
		style: 'premium',
		origin: 'Uji, Kyoto',
		url: 'Add your shop link/name',
		rating: 4,
		notes:
			'Bright, pleasant bitterness, very forgiving. Great daily bowl; holds up well as usucha.',
		priceTier: '€€',
		tags: ['balanced', 'easy', 'daily-driver'],
		rebuy: true,
		triedAt: '2025-11-02'
	},
	{
		id: 'placeholder-1',
		name: 'From that shop',
		style: 'basic',
		rating: 1,
		notes: `Can't say`,
		priceTier: '€',
		tags: ['bad'],
		rebuy: false
	},
	{
		id: 'aoarashi',
		name: 'Aoarashi',
		brand: 'Marukyu Koyamaen',
		style: 'basic',
		origin: 'Uji, Kyoto',
		url: 'Yuuki-Cha',
		rating: 3,
		notes:
			'Noticeable bitterness with grassy notes. Works better in lattes than straight usucha.',
		priceTier: '€',
		tags: ['bitter', 'latte', 'budget'],
		rebuy: false,
		triedAt: '2024-10-18'
	},
	{
		id: 'chigi-no-shiro',
		name: 'Chigi no Shiro',
		brand: 'Marukyu Koyamaen',
		style: 'ceremonial',
		origin: 'Uji, Kyoto',
		url: 'Sazen Tea (EU)',
		rating: 5,
		notes:
			'Extremely smooth and creamy with deep umami. Minimal bitterness. Special-occasion matcha.',
		priceTier: '€€€',
		tags: ['umami', 'smooth', 'luxury'],
		rebuy: true,
		triedAt: '2024-12-05'
	},
	{
		id: 'wako',
		name: 'Wako',
		brand: 'Ippodo',
		style: 'premium',
		origin: 'Uji, Kyoto',
		url: 'Ippodo EU',
		rating: 4,
		notes:
			'Clean and mellow with subtle sweetness. Less intense than Isuzu but very elegant.',
		priceTier: '€€',
		tags: ['smooth', 'mellow', 'clean'],
		rebuy: true,
		triedAt: '2024-09-22'
	},
	{
		id: 'sayaka',
		name: 'Sayaka',
		brand: 'Ippodo',
		style: 'basic',
		origin: 'Uji, Kyoto',
		url: 'Ippodo EU',
		rating: 3,
		notes:
			'Light body with mild bitterness. Acceptable straight, better suited for milk drinks.',
		priceTier: '€',
		tags: ['light', 'latte', 'simple'],
		rebuy: false,
		triedAt: '2024-08-30'
	},
	{
		id: 'kan-no-shiro',
		name: 'Kan no Shiro',
		brand: 'Marukyu Koyamaen',
		style: 'ceremonial',
		origin: 'Uji, Kyoto',
		url: 'Sazen Tea (EU)',
		rating: 5,
		notes:
			'Rich umami with a velvety mouthfeel. Dense foam and almost no bitterness.',
		priceTier: '€€€',
		tags: ['umami', 'thick', 'ceremonial'],
		rebuy: true,
		triedAt: '2025-01-10'
	},
	{
		id: 'daily-organic',
		name: 'Organic Daily Matcha',
		brand: 'Local EU Brand',
		style: 'basic',
		origin: 'Japan',
		url: 'Bio supermarket',
		rating: 2,
		notes:
			'Dull color and flat taste. Drinkable in lattes but lacks depth and aroma.',
		priceTier: '€',
		tags: ['organic', 'flat', 'supermarket'],
		rebuy: false,
		triedAt: '2024-07-14'
	}
];