-- Run this in your Supabase SQL Editor to populate your store with premium products!

INSERT INTO products (category_id, title, slug, price, formatted_price, description, features, image_url, stock_quantity)
VALUES
(
  (SELECT id FROM categories WHERE slug = 'audio'), 
  'Sony WH-1000XM5 Wireless Headphones', 
  'sony-wh1000xm5', 
  29990, 
  '₹29,990', 
  'Industry-leading noise cancellation with two processors controlling eight microphones for unprecedented noise cancellation.', 
  ARRAY['Auto NC Optimizer', 'Up to 30 hours battery life', 'Ultra-comfortable lightweight design'], 
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop', 
  50
),
(
  (SELECT id FROM categories WHERE slug = 'laptops'), 
  'Apple MacBook Air M3 (2024)', 
  'macbook-air-m3', 
  114900, 
  '₹1,14,900', 
  'Supercharged by M3, the MacBook Air is ultra-fast, ultra-portable, and features up to 18 hours of battery life.', 
  ARRAY['M3 chip with 8-core CPU', '13.6-inch Liquid Retina display', '1080p FaceTime HD camera'], 
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop', 
  20
),
(
  (SELECT id FROM categories WHERE slug = 'smartphones'), 
  'Samsung Galaxy S24 Ultra 5G', 
  'galaxy-s24-ultra', 
  129999, 
  '₹1,29,999', 
  'Welcome to the era of mobile AI. The Galaxy S24 Ultra unleashes new levels of creativity, productivity and possibility.', 
  ARRAY['Galaxy AI built-in', 'Titanium frame', '200MP Wide-angle camera', 'Built-in S Pen'], 
  'https://images.unsplash.com/photo-1707151025700-0effca936552?q=80&w=600&auto=format&fit=crop', 
  35
),
(
  (SELECT id FROM categories WHERE slug = 'accessories'), 
  'Keychron K2 V2 Wireless Keyboard', 
  'keychron-k2-v2', 
  7999, 
  '₹7,999', 
  'A superb 75% layout compact wireless mechanical keyboard. Connects with up to 3 devices via Bluetooth 5.1.', 
  ARRAY['Gateron G Pro switches', 'Mac & Windows compatibility', '4000mAh big battery'], 
  'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop', 
  100
),
(
  (SELECT id FROM categories WHERE slug = 'accessories'), 
  'Logitech MX Master 3S Wireless Mouse', 
  'logitech-mx-master-3s', 
  9995, 
  '₹9,995', 
  'An iconic mouse remastered. Feel every moment of your workflow with even more precision, tactility, and performance.', 
  ARRAY['8000 DPI track-on-glass sensor', 'Quiet Clicks', 'MagSpeed scrolling'], 
  'https://images.unsplash.com/photo-1615663245857-ac1eeb536fcb?q=80&w=600&auto=format&fit=crop', 
  150
);
