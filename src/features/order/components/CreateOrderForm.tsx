import React from "react";
import { PaymentMethod } from "../OrderTypes/OrderProps";
import { ProductProps } from "../../product/productTypes";

import { MapPin, CreditCard, Truck, Package, Check } from "lucide-react";
import { TextField } from "@mui/material";
import { CartItem } from "../../cart/CartAPI";

interface CreateCartForm {
  cartItems: CartItem[];
  products: ProductProps[];

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
  onSubmit
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#fffdf8] shadow-[0_8px_30px_rgba(61,44,30,0.08)] border border-[#efe4cc] p-7 space-y-7 "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#efe4cc] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fbe9d0] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-[#b5562b]" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-semibold text-[#3d2c1e] leading-tight">
              Checkout đơn hàng
            </h2>
            <p className="text-sm text-[#a99776]">
              {cartItems.length} sản phẩm trong giỏ
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#a99776] flex items-center gap-1.5 px-1">
          <Package className="w-3.5 h-3.5" />
          Sản phẩm
        </p>

        <div className="rounded-2xl border border-[#efe4cc] divide-y divide-[#f1e7d3] overflow-hidden">
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.product_id);

            if (!product) return null;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#fbf6ea] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#efe4cc] shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#3d2c1e] truncate">
                      {product.name}
                    </p>

                    <p className="text-xs text-[#a99776]">
                      SL: {item.quantity} × {item.price.toLocaleString("vi-VN")}
                      đ
                    </p>
                  </div>
                </div>

                <span className="text-sm font-semibold text-[#3d2c1e] whitespace-nowrap">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-2 pt-2">
          <span className="text-sm text-[#8a7860]">Tổng cộng</span>
          <span className="text-base font-bold text-[#b5562b]">
            {total.toLocaleString("vi-VN")}đ
          </span>
        </div>
      </div>

      {/* Shipping address */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#a99776] px-1">
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
              borderRadius: "14px",
              backgroundColor: "#fffdf8",
              fontSize: "0.9rem",
              "& fieldset": { borderColor: "#e3d7bf" },
              "&:hover fieldset": { borderColor: "#cdb88f" },
              "&.Mui-focused fieldset": { borderColor: "#b5562b" }
            }
          }}
        />
      </div>

      {/* Payment method */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#a99776] px-1">
          <CreditCard className="w-3.5 h-3.5" />
          Phương thức thanh toán
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentOptions.map((opt) => {
            const selected = payment_method === opt.value;

            return (
              <label
                key={opt.value}
                className={`relative flex items-center justify-between gap-2 p-4 border rounded-2xl cursor-pointer transition-all ${
                  selected
                    ? "border-[#b5562b] bg-[#fbe9d0] shadow-sm"
                    : "border-[#e3d7bf] hover:border-[#cdb88f] hover:bg-[#fbf6ea]"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-[#3d2c1e]">
                    {opt.label}
                  </p>
                  <p className="text-xs text-[#8a7860]">{opt.hint}</p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
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
        className="w-full bg-[#b5562b] text-white font-medium py-3.5 rounded-2xl hover:bg-[#9c4622] active:scale-[0.99] transition-all shadow-sm"
      >
        Đặt hàng · {total.toLocaleString("vi-VN")}đ
      </button>
    </form>
  );
};

export default CreateOrderForm;
