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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  if (error)
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl p-4 text-sm">
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
  const colors = [
    { cls: "bg-[#1C1917]", name: "Đen" },
    { cls: "bg-slate-300", name: "Bạc" },
    { cls: "bg-violet-500", name: "Tím" },
    { cls: "bg-rose-400", name: "Hồng" }
  ];

  return (
    <div className="mt-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-8">
        <Link
          to="/"
          className="text-slate-500 hover:text-violet-600 transition"
        >
          Trang chủ
        </Link>
        <span className="text-slate-300">/</span>
        <Link
          to="/productAll"
          className="text-slate-500 hover:text-violet-600 transition"
        >
          Sản phẩm
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-medium truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-[80px_1fr] gap-4">
            {/* Thumbnails - vertical */}
            <div className="flex flex-col gap-3">
              {images.map((img, i) => (
                <Button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeThumb === i
                      ? "border-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
                      : "border-transparent ring-1 ring-slate-200 hover:ring-violet-300"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </Button>
              ))}
            </div>

            {/* Main image */}
            <div className="relative aspect-square w-full rounded-3xl bg-linear-to-br from-violet-50 via-white to-slate-50 overflow-hidden ring-1 ring-slate-200/60 group">
              <img
                src={images[activeThumb]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Floating discount tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 shadow-sm ring-1 ring-rose-100">
                -13% HÔM NAY
              </div>
              {/* Floating wishlist */}
              <Button
                onClick={() => setWishlisted((w) => !w)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition shadow-sm ${
                  wishlisted
                    ? "bg-rose-500 text-white"
                    : "bg-white/90 text-slate-500 hover:text-rose-500"
                }`}
              >
                {wishlisted ? "♥" : "♡"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Info (sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 ring-1 ring-violet-100">
              ✦ Mới về
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              ● Còn hàng
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200">
              Bán chạy
            </span>
          </div>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1 text-amber-400">
              {"★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
              <span className="text-slate-200">★</span>
            </div>
            <span className="text-sm text-slate-500">4.2</span>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-500 hover:text-violet-600 cursor-pointer">
              128 đánh giá
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-500">312 đã bán</span>
          </div>

          {/* Price card */}
          <div className="bg-linear-to-br from-violet-50 to-white border border-violet-100 rounded-2xl p-5 mb-5">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-violet-700 tracking-tight">
                ${product.price}
              </span>
              <span className="text-base text-slate-400 line-through">
                ${(Number(product.price) * 1.15).toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-rose-700 bg-rose-100 px-2 py-1 rounded-md">
                TIẾT KIỆM 13%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Giá đã bao gồm VAT · Trả góp 0% từ{" "}
              <strong className="text-slate-700">
                ${(Number(product.price) / 6).toFixed(2)}
              </strong>
              /tháng
            </p>
          </div>

          {/* Color */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-sm font-semibold text-slate-700">
                Màu sắc:{" "}
                <span className="text-slate-500 font-normal">
                  {colors[selectedColor].name}
                </span>
              </p>
            </div>
            <div className="flex gap-2.5">
              {colors.map((c, i) => (
                <Button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-9 h-9 rounded-full transition-all ${c.cls} ${
                    selectedColor === i
                      ? "ring-2 ring-offset-2 ring-violet-500 scale-110"
                      : "ring-1 ring-slate-200 hover:scale-105"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quantity + CTA row */}
          <div className="flex items-stretch gap-3 mb-4">
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <Button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-12 text-slate-500 hover:bg-slate-50 hover:text-violet-600 transition text-lg"
              >
                −
              </Button>
              <span className="w-10 text-center text-sm font-semibold text-slate-800">
                {quantity}
              </span>
              <Button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-12 text-slate-500 hover:bg-slate-50 hover:text-violet-600 transition text-lg"
              >
                +
              </Button>
            </div>

            <Button
              title="Giỏ hàng"
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white text-sm font-semibold py-3 rounded-xl transition shadow-lg shadow-violet-600/20"
            >
              🛒 Thêm vào giỏ hàng
            </Button>
          </div>

          {/* Buy now */}
          <Button
            type="button"
            className="w-full mb-5 py-3 rounded-xl text-sm font-semibold text-violet-700 bg-white border-2 border-violet-200 hover:bg-violet-50 transition"
          >
            ⚡ Mua ngay
          </Button>

          {/* Feature strip */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { icon: "🚚", title: "Free ship", sub: "Đơn từ $50" },
              { icon: "↩️", title: "Đổi trả", sub: "Trong 7 ngày" },
              { icon: "🛡️", title: "Bảo hành", sub: "12 tháng" }
            ].map((f) => (
              <div
                key={f.title}
                className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-violet-200 hover:bg-violet-50/40 transition"
              >
                <div className="text-lg mb-1">{f.icon}</div>
                <div className="text-xs font-semibold text-slate-700">
                  {f.title}
                </div>
                <div className="text-[11px] text-slate-500">{f.sub}</div>
              </div>
            ))}
          </div>

          {/* Attributes */}
          <div className="border-t border-slate-100 pt-4 space-y-2.5">
            {[
              ["Mã sản phẩm", `SKU-${product.id}`],
              ["Thương hiệu", "Premium"],
              ["Tình trạng", "Mới 100%"],
              ["Bảo hành", "12 tháng chính hãng"]
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContainer;
