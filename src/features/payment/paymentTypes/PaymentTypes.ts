import { OrderStatus, PaymentMethod } from "../../order/OrderTypes/OrderProps";

export interface PaymentProps {
  id: string;
  amount: number;
  payment_method: PaymentMethod;
  status: OrderStatus;
  transaction_id: string;
  checkout_url: string;
}
