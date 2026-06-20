import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewProps } from "./reviewTypes";

interface ReviewState {
  loading: boolean;
  error: string | null;
  review: ReviewProps[];
}
const initialState: ReviewState = {
  loading: false,
  error: null,
  review: []
};
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    getReviewRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getReviewSuccess(state, action: PayloadAction<ReviewProps[]>) {
      state.loading = false;
      state.error = null;
      state.review = action.payload;
    },
    getReviewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const { getReviewRequest, getReviewSuccess, getReviewFailure } =
  reviewSlice.actions;
export default reviewSlice.reducer;
