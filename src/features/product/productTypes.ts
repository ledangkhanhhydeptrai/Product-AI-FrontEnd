export interface ProductProps {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
}
export interface ProductPropsForAdmin {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  slug: string;
  description: string;
  stock: number;
  category_id: string;
  brand_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  has_embedding: boolean;
}