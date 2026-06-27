import React from "react";
import { BrandProps } from "../brands/brandTypes";
import { CategoryProps } from "../categories/categoryTypes";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  image_url: string;
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
  image_url: string;
}
export interface ProductPropsAdminForm {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string;
  category_id: string;
  brand_id: string;
  is_active: boolean;
  file: File | null;
  onSuccess: () => void;
  onError: (message: string) => void;
}
export interface ProductPropsFormAdmin {
  name: string;
  setName: (value: string) => void;
  slug: string;
  setSlug: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
  stock: number;
  setStock: (value: number) => void;
  thumbnail: string;
  setThumbnail: (value: string) => void;
  category_id: string;
  setCategory_id: (value: string) => void;
  brand_id: string;
  setBrand_id: (value: string) => void;
  is_active: boolean;
  setIs_active: (value: boolean) => void;
  file: File | null;
  setFile: (value: File | null) => void;
  brand: BrandProps[];
  category: CategoryProps[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}
export interface FormUpdateProduct {
  name: string;
  slug: string;
  price: number;
  description: string;
  stock: number;
  thumbnail: string;
  meta: {
    onSuccess: () => void;
    onError: () => void;
  };
}
export interface UpdateProductForm extends FormUpdateProduct {
  id: string;
}
export interface FormUpdateProductForm {
  name: string;
  setName: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;
  price: number;
  setPrice: (v: number) => void;
  description: string;
  setDescription: (v: string) => void;
  thumbnail: string;
  setThumbnail: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}
export interface ProductPropsSelected {
  selectedProduct: ProductPropsForAdmin | null;
  onClose: () => void;
}
