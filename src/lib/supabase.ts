import { createClient } from '@supabase/supabase-js';
import { Product } from '@/data/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Subabase environment variables are missing! Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    throw new Error('Supabase Client not initialized: Missing Setup');
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products from Supabase:', error);
    throw new Error(error.message);
  }

  return data.map(item => ({
    id: item.id.toString(),
    title: item.title,
    category: item.category,
    price: Number(item.price),
    formattedPrice: item.formatted_price,
    description: item.description,
    features: item.features || [],
    imageUrl: item.image_url
  }));
}

export async function getProduct(id: string): Promise<Product | undefined> {
  if (!supabase) {
    throw new Error('Supabase Client not initialized: Missing Setup');
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return undefined;
  }

  return {
    id: data.id.toString(),
    title: data.title,
    category: data.category,
    price: Number(data.price),
    formattedPrice: data.formatted_price,
    description: data.description,
    features: data.features || [],
    imageUrl: data.image_url
  };
}
