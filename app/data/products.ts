import { supabase } from '../lib/supabaseClient';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  size: string;
  unit?: string;
  description: string;
  benefits: string[];
  howToApply: string;
  ingredients?: string;
  images: string[];
  // Updated availability type to support on-demand sourcing model
  availability: 'in_stock' | 'available_to_order' | 'out_of_stock';
  searchKeywords: string[];
}

// Keep hardcoded fallback products so your frontend NEVER breaks or shows blank UI
export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    name: 'Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++',
    brand: 'SKIN1004',
    category: 'Sun Care',
    subcategory: 'Sunscreen',
    price: 68.00,
    size: '50ml',
    description: 'A non-nano chemical sunscreen that blocks UV rays while simultaneously hydrating the skin.',
    benefits: [
      'Deeply hydrating Hyalu-Cica Formula',
      'Soothes sensitive and irritated skin',
      'Lightweight serum texture with zero white cast'
    ],
    howToApply: 'Apply as the last step of your morning skincare routine. Reapply every 2-3 hours.',
    ingredients: 'Centella Asiatica Extract, Water, Niacinamide...',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800'],
    availability: 'available_to_order',
    searchKeywords: ['sunscreen', 'centella', 'skin1004', 'spf50']
  }
];

/**
 * Fetch active products from Supabase matching flat products table layout.
 * Returns FALLBACK_PRODUCTS if Supabase returns no data or fails.
 */
export async function getProductsFromSupabase(): Promise<Product[]> {
  try {
const { data: dbProducts, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        name_ar,
        brand,
        brand_ar,
        category,
        category_ar,
        subcategory,
        price_sar,
        size_value,
        unit,
        description_en,
        description_ar,
        key_benefits_en,
        key_benefits_ar,
        how_to_apply_en,
        how_to_apply_ar,
        ingredients,
        search_keywords,
        availability,
        images
      `);

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return FALLBACK_PRODUCTS;
    }

    if (!dbProducts || dbProducts.length === 0) {
      return FALLBACK_PRODUCTS;
    }

    return dbProducts.map((p: any) => {
      // Parse key_benefits whether stored as Postgres ARRAY or semicolon-separated string
      let benefitsArray: string[] = [];
      if (Array.isArray(p.key_benefits)) {
        benefitsArray = p.key_benefits;
      } else if (typeof p.key_benefits === 'string') {
        benefitsArray = p.key_benefits.split(';').map((b: string) => b.trim());
      }

      // Read images text array directly from products table column
      const imageList = Array.isArray(p.images) && p.images.length > 0 
        ? p.images 
        : ['/placeholder.png'];

      // Format size string (e.g., 15 + g = 15g)
      const sizeString = p.size_value ? `${p.size_value}${p.unit || ''}` : p.size || '';

      return {
        id: p.id,
        name: p.name,
        brand: p.brand || 'Glowin',
        category: p.category || 'General',
        subcategory: p.subcategory || '',
        price: Number(p.price_sar || 0),
        size: sizeString,
        unit: p.unit || '',
        description: p.description || '',
        benefits: benefitsArray,
        howToApply: p.how_to_use || p.how_to_apply || '',
        ingredients: p.ingredients || '',
        images: imageList,
        availability: p.availability || 'available_to_order',
        searchKeywords: p.search_keywords || []
      };
    });
  } catch (err) {
    console.error('Unexpected error loading products from Supabase:', err);
    return FALLBACK_PRODUCTS;
  }
}