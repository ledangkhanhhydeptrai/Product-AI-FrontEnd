import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateReviewProps,
  ReviewProps,
  UpdateReviewPayload
} from "./reviewTypes";

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
    },
    updateReviewRequest(state, _action: PayloadAction<UpdateReviewPayload>) {
      state.loading = true;
      state.error = null;
    },
    updateReviewSuccess: (state, action: PayloadAction<ReviewProps>) => {
      const updated = action.payload;

      state.review = state.review.map((r) =>
        r.id === updated.id ? updated : r
      );
    },
    updateReviewFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteReviewSuccess(state, action: PayloadAction<ReviewProps>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    deleteReviewFailure(state, action: PayloadAction<string>) {
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
  createReviewFailure,
  updateReviewRequest,
  updateReviewSuccess,
  updateReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure
} = reviewSlice.actions;
export default reviewSlice.reducer;
