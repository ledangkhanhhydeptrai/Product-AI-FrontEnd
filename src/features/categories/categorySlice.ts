import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryProps } from "./categoryTypes";

interface CategoryState {
  loading: boolean;
  error: string | null;
  data: CategoryProps[] | [];
}
const initialState: CategoryState = {
  loading: false,
  error: null,
  data: []
};
const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryRequest(state, _action: PayloadAction<CategoryProps[]>) {
      state.loading = true;
      state.error = null;
    },
    categorySuccess(state, action: PayloadAction<CategoryProps[]>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    categoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const { categoryRequest, categorySuccess, categoryFailure } =
  CategorySlice.actions;
export default CategorySlice.reducer;
