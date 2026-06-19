export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
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
