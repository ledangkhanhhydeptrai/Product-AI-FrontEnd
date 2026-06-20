import { ProductProps } from "../product/productTypes";

export interface ReviewProps {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
}
export interface CreateReviewProps {
  product_id: string;
  rating: number;
  comment: string;
}
export interface CreateReview {
  product_id: string;
  setProduct_id: (v: string) => void;
  comment: string;
  setComment: (v: string) => void;
  rating: number;
  setRating: (v: number) => void;
  product: ProductProps[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
