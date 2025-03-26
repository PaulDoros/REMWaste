export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string | null;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  name?: string;
  description?: string;
  imageUrl?: string;
}

// Helper function to generate skip names and descriptions based on size
const getSkipDetails = (size: number): { name: string; description: string } => {
  if (size <= 4) {
    return {
      name: `${size} Yard Mini Skip`,
      description:
        'Perfect for small domestic clearances, such as garden waste or small kitchen refits.',
    };
  } else if (size <= 6) {
    return {
      name: `${size} Yard Midi Skip`,
      description: 'Ideal for bathroom refits, kitchen renovations, and medium-sized projects.',
    };
  } else if (size <= 8) {
    return {
      name: `${size} Yard Builder's Skip`,
      description: 'Suitable for larger renovations, construction waste, and house clearances.',
    };
  } else if (size <= 12) {
    return {
      name: `${size} Yard Maxi Skip`,
      description: 'For major renovation projects, large-scale clearances, and commercial use.',
    };
  } else if (size <= 16) {
    return {
      name: `${size} Yard Large Skip`,
      description: 'For commercial projects, large home renovations, and substantial clearances.',
    };
  } else {
    return {
      name: `${size} Yard Roll-On Roll-Off Skip`,
      description:
        'Industrial-sized skip for major construction sites and large-scale waste disposal.',
    };
  }
};

export const skips: Skip[] = [
  {
    id: 11554,
    size: 4,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 311,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: true,
    allows_heavy_waste: true,
    ...getSkipDetails(4),
    imageUrl: '/images/4.JPG',
  },
  {
    id: 11555,
    size: 6,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 342,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: true,
    allows_heavy_waste: true,
    ...getSkipDetails(6),
    imageUrl: '/images/6.JPG',
  },
  {
    id: 11556,
    size: 8,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 420,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: true,
    allows_heavy_waste: true,
    ...getSkipDetails(8),
    imageUrl: '/images/8.JPG',
  },
  {
    id: 11557,
    size: 10,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 448,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(10),
    imageUrl: '/images/10.JPG',
  },
  {
    id: 11558,
    size: 12,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 491,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(12),
    imageUrl: '/images/12.JPG',
  },
  {
    id: 11559,
    size: 14,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 527,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(14),
    imageUrl: '/images/14.png',
  },
  {
    id: 11560,
    size: 16,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 556,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(16),
    imageUrl: '/images/16.png',
  },
  {
    id: 11561,
    size: 20,
    hire_period_days: 14,
    transport_cost: 236,
    per_tonne_cost: 236,
    price_before_vat: 944,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: false,
    allows_heavy_waste: true,
    ...getSkipDetails(20),
    imageUrl: '/images/20.png',
  },
  {
    id: 11562,
    size: 40,
    hire_period_days: 14,
    transport_cost: 236,
    per_tonne_cost: 236,
    price_before_vat: 944,
    vat: 20,
    postcode: 'NR32',
    area: null,
    forbidden: false,
    created_at: '2021-04-06T17:04:42',
    updated_at: '2024-04-02T09:22:38',
    allowed_on_road: false,
    allows_heavy_waste: false,
    ...getSkipDetails(40),
    imageUrl: '/images/40.png',
  },
];
