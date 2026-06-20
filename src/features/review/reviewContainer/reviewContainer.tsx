import React from "react";
import {
  Star,
  MessageSquareQuote,
  Loader2,
  AlertCircle,
  Quote,
  Pencil,
  Trash2,
  X
} from "lucide-react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  getReviewRequest,
  updateReviewRequest,
  deleteReviewRequest
} from "../reviewSlice";
import { ReviewProps } from "../reviewTypes";
import { TextField } from "@mui/material";

// Bảng màu avatar xoay vòng theo id — để mỗi khách hàng có một "chữ ký" màu riêng
// thay vì tất cả đều giống nhau.
const AVATAR_PALETTES = [
  "from-[#d58c63] to-[#b5562b]",
  "from-[#9aa68c] to-[#5f6b4f]",
  "from-[#e0b15c] to-[#b5562b]",
  "from-[#c47a8a] to-[#8a4a5c]",
  "from-[#7fa1a3] to-[#3d6b6d]"
];

const ReviewContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { review, loading, error } = useAppSelector((state) => state.review);
  const { data } = useAppSelector((state) => state.product);
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedReview, setSelectedReview] =
    React.useState<ReviewProps | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<ReviewProps | null>(
    null
  );

  React.useEffect(() => {
    dispatch(getReviewRequest());
  }, [dispatch]);

  const averageRating =
    review.length > 0
      ? (
          review.reduce((sum, item) => sum + item.rating, 0) / review.length
        ).toFixed(1)
      : "0";

  // Phân bố số lượng đánh giá theo từng mức sao, để vẽ thanh tỉ lệ trong header
  const ratingCounts = React.useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // index 0 = 1 sao ... index 4 = 5 sao
    review.forEach((item) => {
      const idx = Math.min(Math.max(Math.round(item.rating), 1), 5) - 1;
      counts[idx] += 1;
    });
    return counts.reverse(); // hiển thị từ 5 sao -> 1 sao
  }, [review]);

  const handleUpdate = (item: ReviewProps) => {
    setSelectedReview(item);
    setRating(item.rating);
    setComment(item.comment);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedReview(null);
    setHoverRating(0);
  };

  const handleDelete = (item: ReviewProps) => {
    setDeleteTarget(item);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteReviewRequest(deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleSubmitUpdate = () => {
    if (!selectedReview) return;

    dispatch(
      updateReviewRequest({
        id: selectedReview.id,
        data: {
          product_id: selectedReview.product_id,
          rating,
          comment
        }
      })
    );

    closeModal();
  };

  if (loading) {
    return (
      <div className="min-h-125 flex items-center justify-center bg-[#faf7f2]">
        <div className="text-center">
          <Loader2 className="w-9 h-9 animate-spin mx-auto text-[#b5562b]" />
          <p className="mt-4 text-[#8a7860] text-sm tracking-wide">
            Đang tải đánh giá...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-125 flex items-center justify-center bg-[#faf7f2]">
        <div className="bg-white px-10 py-8 rounded-3xl shadow-sm text-center border border-[#f3e3c3]">
          <AlertCircle className="w-9 h-9 mx-auto text-[#b5562b]" />
          <p className="mt-4 text-[#6b3a26] font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="-mb-10 min-h-screen bg-[#faf7f2] py-12 px-4">
      <div className="">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-3 px-1">
          <span className="h-px w-8 bg-[#b5562b]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b5562b]">
            Tiếng nói khách hàng
          </span>
        </div>

        <h1 className="text-4xl font-bold text-[#3d2c1e] tracking-tight px-1">
          Đánh giá khách hàng
        </h1>
        <p className="text-[#8a7860] mt-2 px-1 max-w-md">
          Những nhận xét chân thực từ khách hàng đã mua sản phẩm.
        </p>

        {/* Header / Rating Summary */}
        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-[#efe5d2] p-8 transition-shadow hover:shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Big score */}
            <div className="text-center md:text-left md:border-r md:border-[#efe5d2] md:pr-8 shrink-0">
              <div className="text-6xl font-bold text-[#3d2c1e] leading-none tabular-nums">
                {averageRating}
              </div>
              <div className="flex justify-center md:justify-start items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(Number(averageRating))
                        ? "fill-[#e0b15c] text-[#e0b15c]"
                        : "text-[#e9e0d0]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#8a7860] mt-2">
                {review.length} đánh giá
              </p>
            </div>

            {/* Distribution bars */}
            <div className="flex-1 w-full space-y-2.5">
              {ratingCounts.map((count, i) => {
                const starLevel = 5 - i;
                const pct =
                  review.length > 0 ? (count / review.length) * 100 : 0;
                return (
                  <div
                    key={starLevel}
                    className="flex items-center gap-3 text-sm group"
                  >
                    <span className="w-10 text-[#8a7860] shrink-0">
                      {starLevel} sao
                    </span>
                    <svg
                      className="flex-1 h-2 overflow-hidden"
                      viewBox="0 0 100 8"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="100"
                        height="8"
                        rx="4"
                        fill="#f3eee2"
                      />
                      <rect
                        x="0"
                        y="0"
                        width={pct}
                        height="8"
                        rx="4"
                        fill="#e0b15c"
                        className="transition-[width] duration-500 ease-out"
                      />
                    </svg>
                    <span className="w-6 text-right text-[#8a7860] text-xs shrink-0 tabular-nums">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Empty */}
        {review.length === 0 && (
          <div className="mt-8 bg-white rounded-3xl shadow-sm border border-dashed border-[#e9d9b8] p-12 text-center">
            <MessageSquareQuote className="w-10 h-10 mx-auto text-[#d8b88a]" />
            <h3 className="mt-4 text-lg font-semibold text-[#3d2c1e]">
              Chưa có đánh giá nào
            </h3>
            <p className="mt-2 text-[#8a7860] text-sm">
              Hãy là người đầu tiên chia sẻ trải nghiệm của bạn.
            </p>
          </div>
        )}

        {/* Review List */}
        <div className="mt-8 grid gap-5">
          {review.map((item, index) => {
            const product = data.find((p) => p.id === item.product_id);
            if (!product) return null;

            const numericId = Number(item.id);
            const palette =
              AVATAR_PALETTES[
                Number.isFinite(numericId)
                  ? numericId % AVATAR_PALETTES.length
                  : index % AVATAR_PALETTES.length
              ];

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-sm border border-[#efe5d2] overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#e9d9b8]"
              >
                {/* Product strip — sản phẩm được đánh giá */}
                <div className="flex items-center gap-4 px-6 py-4 bg-[#fbf7ee] border-b border-[#efe5d2]">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-[#efe5d2] shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-[#a89880] leading-none">
                      Đánh giá cho
                    </p>
                    <p className="text-base font-medium text-[#5a4530] truncate mt-1">
                      {product.name}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-12 h-12 shrink-0 rounded-full bg-linear-to-br ${palette} flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white`}
                    >
                      U
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Top row */}
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-[#3d2c1e] leading-tight">
                            Khách hàng
                          </h3>
                          <p className="text-xs text-[#a89880] mt-0.5">
                            {new Date(item.created_at).toLocaleDateString(
                              "vi-VN"
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= item.rating
                                    ? "fill-[#e0b15c] text-[#e0b15c]"
                                    : "text-[#e9e0d0]"
                                }`}
                              />
                            ))}
                          </div>

                          <button
                            onClick={() => handleUpdate(item)}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-[#e9d9b8] text-[#8a7860] hover:bg-[#fbf7ee] hover:text-[#b5562b] hover:border-[#e0b15c] transition-colors"
                            title="Cập nhật đánh giá"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Sửa
                          </button>

                          <button
                            onClick={() => handleDelete(item)}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-[#e9d9b8] text-[#8a7860] hover:bg-[#fdf0ee] hover:text-[#b5562b] hover:border-[#e3a08f] transition-colors"
                            title="Xoá đánh giá"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Xoá
                          </button>
                        </div>
                      </div>

                      {/* Comment */}
                      <div className="mt-4 relative pl-4 border-l-2 border-[#f3e3c3]">
                        <Quote className="w-4 h-4 text-[#e9d9b8] absolute -left-2.25 -top-1 bg-white" />
                        <p className="text-[#4d3b2c] leading-relaxed text-[15px]">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Update Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#3d2c1e]/50 backdrop-blur-[2px] flex items-center justify-center z-50 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-md rounded-3xl p-7 shadow-xl border border-[#efe5d2] animate-[fadeIn_0.15s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[#b5562b] font-semibold">
                  Chỉnh sửa
                </p>
                <h2 className="text-lg font-semibold text-[#3d2c1e] mt-1">
                  Cập nhật đánh giá
                </h2>
              </div>
              <button
                onClick={closeModal}
                aria-label="Đóng"
                className="text-[#a89880] hover:text-[#3d2c1e] transition-colors p-1 -m-1 rounded-full hover:bg-[#fbf7ee]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rating */}
            <p className="text-xs font-medium text-[#8a7860] mb-2">Số sao</p>
            <div
              className="flex items-center gap-1.5 mb-5"
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  title={`${star} sao`}
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-[#e0b15c] text-[#e0b15c]"
                        : "text-[#e9e0d0]"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Comment */}
            <p className="text-xs font-medium text-[#8a7860] mb-2">Nhận xét</p>
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              rows={4}
              placeholder="Chia sẻ trải nghiệm của bạn..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontSize: "14px",
                  backgroundColor: "#fbf7ee",
                  "& fieldset": { borderColor: "#e9d9b8" },
                  "&:hover fieldset": { borderColor: "#e0b15c" },
                  "&.Mui-focused fieldset": { borderColor: "#b5562b" }
                }
              }}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-[#8a7860] rounded-xl hover:bg-[#fbf7ee] transition-colors"
              >
                Huỷ
              </button>

              <button
                type="button"
                onClick={handleSubmitUpdate}
                className="px-5 py-2 text-sm font-medium bg-[#b5562b] text-white rounded-xl hover:bg-[#943f1c] transition-colors shadow-sm"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 bg-[#3d2c1e]/50 backdrop-blur-[2px] flex items-center justify-center z-50 px-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-3xl p-7 shadow-xl border border-[#efe5d2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-11 h-11 rounded-full bg-[#fdf0ee] flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-[#b5562b]" />
            </div>

            <h2 className="text-lg font-semibold text-[#3d2c1e] mt-4">
              Xoá đánh giá này?
            </h2>
            <p className="text-sm text-[#8a7860] mt-1.5 leading-relaxed">
              Đánh giá sẽ bị xoá vĩnh viễn và không thể khôi phục.
            </p>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm font-medium text-[#8a7860] rounded-xl hover:bg-[#fbf7ee] transition-colors"
              >
                Huỷ
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2 text-sm font-medium bg-[#b5562b] text-white rounded-xl hover:bg-[#943f1c] transition-colors shadow-sm"
              >
                Xoá đánh giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewContainer;
