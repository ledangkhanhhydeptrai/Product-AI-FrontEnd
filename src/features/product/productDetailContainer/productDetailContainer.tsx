import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { productRequestById } from "../productSlice";
import { RootState } from "../../../app/store";
import React from "react";
import Button from "../../../components/Button";

const ProductDetailContainer: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [activeThumb, setActiveThumb] = React.useState(0);
  const [wishlisted, setWishlisted] = React.useState(false);

  const { product, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  React.useEffect(() => {
    if (id) dispatch(productRequestById(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  if (error)
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      </div>
    );
  if (!product)
    return (
      <div className="max-w-5xl mx-auto p-6 text-slate-400 text-sm">
        Sản phẩm không tồn tại.
      </div>
    );

  const images = [
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url
  ];

  return (
    <>
      {/* Breadcrumb — slate muted, violet link */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-6">
        <Link
          to="/"
          className="text-violet-500 hover:text-violet-700 hover:underline"
        >
          Trang chủ
        </Link>
        <span>›</span>
        <Link
          to="/products"
          className="text-violet-500 hover:text-violet-700 hover:underline"
        >
          Sản phẩm
        </Link>
        <span>›</span>
        <span className="text-slate-600 truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Images */}
        <div>
          {/* Main image — violet tint background */}
          <div className="w-full h-80 rounded-2xl bg-violet-50 overflow-hidden flex items-center justify-center">
            <img
              src={images[activeThumb]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnails — violet active border */}
          <div className="flex gap-3 mt-3">
            {images.map((img, i) => (
              <Button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  activeThumb === i
                    ? "border-violet-500"
                    : "border-slate-100 hover:border-slate-300"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </Button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          {/* Badges — amber "Mới", sky "Còn hàng" */}
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
              ✦ Mới về
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
              ✓ Còn hàng
            </span>
          </div>

          {/* Name */}
          <h1 className="text-xl font-semibold text-slate-900 leading-snug mb-2">
            {product.name}
          </h1>

          {/* Rating — amber stars */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-amber-400 text-sm">{"★★★★☆"}</div>
            <span className="text-sm text-slate-400">4.2 · 128 đánh giá</span>
          </div>

          {/* Price — violet primary, rose discount badge */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-semibold text-violet-700">
              ${product.price}
            </span>
            <span className="text-sm text-slate-400 line-through">
              ${(Number(product.price) * 1.15).toFixed(2)}
            </span>
            <span className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
              -13%
            </span>
          </div>

          <hr className="border-slate-100 my-4" />

          {/* Color — violet ring on selected */}
          <div className="mb-4">
            <p className="text-xs font-medium text-slate-500 mb-2">Màu sắc</p>
            <div className="flex gap-2">
              {[
                "bg-[#1C1917]",
                "bg-slate-300",
                "bg-violet-500",
                "bg-rose-400"
              ].map((colorClass, i) => (
                <Button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-6 h-6 rounded-full transition-all ${
                    selectedColor === i
                      ? "ring-2 ring-offset-2 ring-violet-500"
                      : "opacity-80 hover:opacity-100"
                  } ${colorClass}`}
                />
              ))}
            </div>
          </div>

          <hr className="border-slate-100 my-4" />

          {/* Attributes */}
          <div className="space-y-2 mb-4">
            {[
              ["Mã sản phẩm", `SKU-${product.id}`],
              ["Bảo hành", "12 tháng"]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-slate-400">{label}</span>
                <span className="font-medium text-slate-700">{value}</span>
              </div>
            ))}
          </div>

          <hr className="border-slate-100 my-4" />

          {/* Quantity — slate neutral */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-slate-500">Số lượng</span>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition flex items-center justify-center"
              >
                −
              </Button>
              <span className="text-sm font-semibold w-6 text-center text-slate-800">
                {quantity}
              </span>
              <Button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition flex items-center justify-center"
              >
                +
              </Button>
            </div>
          </div>

          {/* CTA — violet cart, rose wishlist */}
          <div className="flex gap-3">
            <Button
              title="Giỏ hàng"
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-3 rounded-xl transition"
            >
              🛒 Thêm vào giỏ hàng
            </Button>
            <Button
              title="Yêu thích"
              type="button"
              onClick={() => setWishlisted((w) => !w)}
              className={`w-11 h-11 border rounded-xl flex items-center justify-center transition text-base ${
                wishlisted
                  ? "border-rose-300 bg-rose-50 text-rose-500"
                  : "border-slate-200 text-slate-400 hover:text-rose-400 hover:border-rose-200 hover:bg-rose-50"
              }`}
            >
              {wishlisted ? "♥" : "♡"}
            </Button>
          </div>

          {/* Shipping — amber tint */}
          <div className="flex items-center gap-2 mt-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
            <span className="text-amber-500 text-sm">🚚</span>
            <span className="text-xs text-amber-800">
              Miễn phí giao hàng từ{" "}
              <strong className="text-amber-900">$50</strong> · Giao trong 2–4
              ngày
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailContainer;
