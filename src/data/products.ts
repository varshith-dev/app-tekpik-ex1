export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  formattedPrice: string;
  description: string;
  features: string[];
  imageUrl: string;
}
