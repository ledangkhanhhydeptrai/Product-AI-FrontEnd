import React from "react";
import { CartItem } from "../../cart/CartAPI";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
export type PaymentStatus = "PAID" | "UNPAID";
export type PaymentMethod = "PAYOS" | "COD";
export interface OrderItemProps {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  subtotal: number;
}
export interface OrderProps {
  id: string;
  status: OrderStatus;
  total_price: number;
  shipping_address: string;
  payment_method: PaymentMethod;
  created_at: string;
  order_items: OrderItemProps[];
}
export interface CreateOrderProps {
  cart_item_ids: string[];
  shipping_address: string;
  payment_method: PaymentMethod;
}
export const ORDER_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
} as const;
export interface CreatePropsBuyNow {
  product_id: string;
  quantity: number;
  shipping_address: string;
  payment_method: PaymentMethod;
}
export type CreateOrderLocationState = {
  cartItems: CartItem[];
  buyNow: boolean;
  product_id: string;
  quantity: number;
};
export interface User {
  id: string;
  email: string;
  password: string;
  avatar: string;
  full_name: string;
  phone: string;
  role: string;
  is_active: boolean;
}

export interface Payment {
  id: string;
  order_id: string;
  payment_method: string;
  transaction_id: string | null;
  created_at: string;
  amount: number;
  status: string;
  checkout_url: string;
}

export interface OrderItem {
  id: string;
  price: number;
  product_id: string;
  order_id: string;
  quantity: number;
  subtotal: number;
}

export interface Order {
  user_id: string;
  id: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  shipping_address: string;
  payment_method: "COD" | "PAYOS";
  payment_status: "PAID" | "UNPAID";
  total_price: number;
  payos_order_code: number;
  created_at: string;
  payment: Payment;
  order_items: OrderItem[];
  user: User;
}

export interface OrderResponse {
  status: number;
  message: string;
  data: Order[];
}
export interface OrderAdmin {
  user_id: string;
  id: string;
  status: OrderStatus;
  shipping_address: string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  total_price: number;
  payos_order_code: number;
  created_at: string;
  payment: Payment;
  order_items: OrderItem[];
  user: User;
}
export interface OrderUpdateAdmin {
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  shipping_address: string;
}
export interface OrderUpdateAdminById extends OrderUpdateAdmin {
  id: string;
}
export interface OrderUpdateAdminProps {
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  setStatus: (
    v: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  ) => void;
  payment_status: PaymentStatus;
  setPayment_status: (v: PaymentStatus) => void;
  payment_method: PaymentMethod;
  setPayment_method: (v: PaymentMethod) => void;
  shipping_address: string;
  setShipping_address: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export interface OrderUpdateProps {
  selectedOrder: OrderAdmin | null;
  onClose: () => void;
}
