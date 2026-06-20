import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateReviewProps, ReviewProps } from "./reviewTypes";

interface ReviewState {
  loading: boolean;
  error: string | null;
  review: ReviewProps[];
  data: ReviewProps | null;
}
const initialState: ReviewState = {
  loading: false,
  error: null,
  review: [],
  data: null
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
    },
    createReviewRequest(state, _action: PayloadAction<CreateReviewProps>) {
      state.loading = true;
      state.error = null;
    },
    createReviewSuccess(state, action: PayloadAction<ReviewProps>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    createReviewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getReviewRequest,
  getReviewSuccess,
  getReviewFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure
} = reviewSlice.actions;
export default reviewSlice.reducer;
