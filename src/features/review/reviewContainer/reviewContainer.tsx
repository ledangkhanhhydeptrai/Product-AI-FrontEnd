import React from "react";
import {
  Star,
  MessageSquareQuote,
  Loader2,
  AlertCircle,
  Quote
} from "lucide-react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getReviewRequest } from "../reviewSlice";

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

  const { review, loading, error } = useAppSelector(state => state.review);

  React.useEffect(
    () => {
      dispatch(getReviewRequest());
    },
    [dispatch]
  );

  const averageRating =
    review.length > 0
      ? (review.reduce((sum, item) => sum + item.rating, 0) /
          review.length).toFixed(1)
      : "0";

  // Phân bố số lượng đánh giá theo từng mức sao, để vẽ thanh tỉ lệ trong header
  const ratingCounts = React.useMemo(
    () => {
      const counts = [0, 0, 0, 0, 0]; // index 0 = 1 sao ... index 4 = 5 sao
      review.forEach(item => {
        const idx = Math.min(Math.max(Math.round(item.rating), 1), 5) - 1;
        counts[idx] += 1;
      });
      return counts.reverse(); // hiển thị từ 5 sao -> 1 sao
    },
    [review]
  );

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
          <p className="mt-4 text-[#6b3a26] font-medium">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] py-12 px-4">
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
        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-[#efe5d2] p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Big score */}
            <div className="text-center md:text-left md:border-r md:border-[#efe5d2] md:pr-8 shrink-0">
              <div className="text-6xl font-bold text-[#3d2c1e] leading-none">
                {averageRating}
              </div>
              <div className="flex justify-center md:justify-start items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map(star =>
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <=
                    Math.round(Number(averageRating))
                      ? "fill-[#e0b15c] text-[#e0b15c]"
                      : "text-[#e9e0d0]"}`}
                  />
                )}
              </div>
              <p className="text-sm text-[#8a7860] mt-2">
                {review.length} đánh giá
              </p>
            </div>

            {/* Distribution bars */}
            <div className="flex-1 w-full space-y-2">
              {ratingCounts.map((count, i) => {
                const starLevel = 5 - i;
                const pct = review.length > 0 ? count / review.length * 100 : 0;
                return (
                  <div
                    key={starLevel}
                    className="flex items-center gap-3 text-sm"
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
                      />
                    </svg>
                    <span className="w-6 text-right text-[#8a7860] text-xs shrink-0">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Empty */}
        {review.length === 0 &&
          <div className="mt-8 bg-white rounded-3xl shadow-sm border border-dashed border-[#e9d9b8] p-12 text-center">
            <MessageSquareQuote className="w-10 h-10 mx-auto text-[#d8b88a]" />
            <h3 className="mt-4 text-lg font-semibold text-[#3d2c1e]">
              Chưa có đánh giá nào
            </h3>
            <p className="mt-2 text-[#8a7860] text-sm">
              Hãy là người đầu tiên chia sẻ trải nghiệm của bạn.
            </p>
          </div>}

        {/* Review List */}
        <div className="mt-8 grid gap-5">
          {review.map((item, index) => {
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
                className="bg-white rounded-3xl shadow-sm border border-[#efe5d2] p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full bg-linear-to-br ${palette} flex items-center justify-center text-white font-bold`}
                  >
                    U
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex items-center justify-between gap-3">
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

                      <div className="flex items-center gap-0.5 shrink-0">
                        {[1, 2, 3, 4, 5].map(star =>
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${star <= item.rating
                              ? "fill-[#e0b15c] text-[#e0b15c]"
                              : "text-[#e9e0d0]"}`}
                          />
                        )}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewContainer;
