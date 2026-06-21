import React from "react";
import { PaymentMethod } from "../OrderTypes/OrderProps";
import { ProductProps } from "../../product/productTypes";

import {
  MapPin,
  CreditCard,
  Truck,
  Package,
  Check,
  Minus,
  Plus
} from "lucide-react";
import { TextField } from "@mui/material";
import { CartItem } from "../../cart/CartAPI";

interface CreateCartForm {
  cartItems: CartItem[];
  products: ProductProps[];

  buyNow: boolean;
  product_id: string;
  quantity: number;
  setQuantity: (v: number) => void;
  shipping_address: string;
  setShipping_address: (value: string) => void;

  payment_method: PaymentMethod;
  setPayment_method: (value: PaymentMethod) => void;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const paymentOptions: {
  value: PaymentMethod;
  label: string;
  hint: string;
}[] = [
  {
    value: "PAYOS",
    label: "PayOS",
    hint: "Thanh toán online"
  },
  {
    value: "COD",
    label: "COD",
    hint: "Thanh toán khi nhận hàng"
  }
];

const CreateOrderForm: React.FC<CreateCartForm> = ({
  cartItems,
  products,
  shipping_address,
  setShipping_address,
  payment_method,
  setPayment_method,
  onSubmit,
  buyNow,
  product_id,
  quantity,
  setQuantity
}) => {
  const isBuyNow = buyNow && product_id;

  const product = isBuyNow ? products.find((p) => p.id === product_id) : null;
  if (!product) return null;
  const total = isBuyNow
    ? (product.price ?? 0) * quantity
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#fffdf8] shadow-[0_8px_30px_rgba(61,44,30,0.08)] border border-[#efe4cc] rounded-3xl p-7 sm:p-8 space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#efe4cc] pb-6">
        <div className="w-11 h-11 rounded-full bg-[#fbe9d0] flex items-center justify-center shrink-0 ring-1 ring-[#f1d8a8]">
          <Truck className="w-5 h-5 text-[#b5562b]" />
        </div>
        <div>
          <h2 className="text-lg font-serif font-semibold text-[#3d2c1e] leading-tight">
            Checkout đơn hàng
          </h2>
          <p className="text-sm text-[#a99776] mt-0.5">
            {isBuyNow ? "1 sản phẩm" : `${cartItems.length} sản phẩm trong giỏ`}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#a99776] flex items-center gap-1.5 px-1">
          <Package className="w-3.5 h-3.5" />
          Sản phẩm
        </p>

        <div className="rounded-2xl border border-[#efe4cc] divide-y divide-[#f1e7d3] overflow-hidden bg-white/40">
          {isBuyNow && product ? (
            <div className="flex items-center justify-between gap-3 px-4 py-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={product.image_url}
                  className="w-14 h-14 rounded-xl object-cover ring-1 ring-[#efe4cc] shrink-0"
                  alt=""
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#3d2c1e] truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-[#a99776] mt-0.5">
                    {product.price.toLocaleString("vi-VN")}đ / sản phẩm
                  </p>

                  <div className="flex items-center gap-2.5 mt-2">
                    <button
                      type="button"
                      aria-label="Please"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 border border-[#e3d7bf] rounded-md flex items-center justify-center text-[#8a7860] hover:border-[#b5562b] hover:text-[#b5562b] transition-colors"
                    >
                      <Minus className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                    <span className="text-xs font-semibold text-[#3d2c1e] w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      aria-label="Please"
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6 h-6 border border-[#e3d7bf] rounded-md flex items-center justify-center text-[#8a7860] hover:border-[#b5562b] hover:text-[#b5562b] transition-colors"
                    >
                      <Plus className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>

              <span className="font-semibold text-[#3d2c1e] shrink-0">
                {(product.price * quantity).toLocaleString("vi-VN")}đ
              </span>
            </div>
          ) : (
            cartItems.map((item) => {
              const product = products.find((p) => p.id === item.product_id);
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 px-4 py-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={product.image_url}
                      className="w-14 h-14 rounded-xl object-cover ring-1 ring-[#efe4cc] shrink-0"
                      alt=""
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#3d2c1e] truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#a99776] mt-0.5">
                        SL: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="font-semibold text-[#3d2c1e] shrink-0">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between px-2 pt-1">
          <span className="text-sm text-[#8a7860]">Tổng cộng</span>
          <span className="text-lg font-bold text-[#b5562b]">
            {total.toLocaleString("vi-VN")}đ
          </span>
        </div>
      </div>

      {/* Shipping address */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#a99776] px-1">
          <MapPin className="w-3.5 h-3.5" />
          Địa chỉ giao hàng
        </label>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Nhập địa chỉ nhận hàng..."
          value={shipping_address}
          onChange={(e) => setShipping_address(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              backgroundColor: "#fffdf8",
              fontSize: "0.9rem",
              "& fieldset": { borderColor: "#e3d7bf" },
              "&:hover fieldset": { borderColor: "#cdb88f" },
              "&.Mui-focused fieldset": {
                borderColor: "#b5562b",
                borderWidth: "1.5px"
              }
            }
          }}
        />
      </div>

      {/* Payment method */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#a99776] px-1">
          <CreditCard className="w-3.5 h-3.5" />
          Phương thức thanh toán
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentOptions.map((opt) => {
            const selected = payment_method === opt.value;

            return (
              <label
                key={opt.value}
                className={`relative flex items-center justify-between gap-2 p-4 border rounded-2xl cursor-pointer transition-all duration-150 ${
                  selected
                    ? "border-[#b5562b] bg-[#fbe9d0] shadow-[0_2px_10px_rgba(181,86,43,0.12)]"
                    : "border-[#e3d7bf] hover:border-[#cdb88f] hover:bg-[#fbf6ea]"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-[#3d2c1e]">
                    {opt.label}
                  </p>
                  <p className="text-xs text-[#8a7860] mt-0.5">{opt.hint}</p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-150 ${
                    selected
                      ? "border-[#b5562b] bg-[#b5562b]"
                      : "border-[#cdb88f] bg-white"
                  }`}
                >
                  {selected && (
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  )}
                </div>

                <input
                  type="radio"
                  checked={selected}
                  onChange={() => setPayment_method(opt.value)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#b5562b] text-white font-medium py-4 rounded-2xl hover:bg-[#9c4622] active:scale-[0.99] transition-all duration-150 shadow-[0_6px_20px_rgba(181,86,43,0.25)]"
      >
        Đặt hàng · {total.toLocaleString("vi-VN")}đ
      </button>
    </form>
  );
};

export default CreateOrderForm;
