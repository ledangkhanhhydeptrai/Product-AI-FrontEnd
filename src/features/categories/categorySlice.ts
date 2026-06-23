import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryProps,
  CreateCategoryProps,
  UpdateCategoryProps
} from "./categoryTypes";

interface CategoryState {
  loading: boolean;
  error: string | null;
  data: CategoryProps[] | [];
  categories: CategoryProps | null;
}
const initialState: CategoryState = {
  loading: false,
  error: null,
  data: [],
  categories: null
};
const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryRequest(state) {
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
    },
    categoryDetailRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    categoryDetailSuccess(state, action: PayloadAction<CategoryProps | null>) {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    categoryDetailFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createCategoryRequest(state, _action: PayloadAction<CreateCategoryProps>) {
      state.loading = true;
      state.error = null;
    },
    createCategorySuccess(state, action: PayloadAction<CategoryProps>) {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    createCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateCategoryRequest(state, _action: PayloadAction<UpdateCategoryProps>) {
      state.loading = true;
      state.error = null;
    },
    updateCategorySuccess(state, action: PayloadAction<CategoryProps>) {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    updateCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCategoryRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteCategorySuccess(state, action: PayloadAction<CategoryProps>) {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    deleteCategoryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  categoryRequest,
  categorySuccess,
  categoryFailure,
  categoryDetailRequest,
  categoryDetailSuccess,
  categoryDetailFailure,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure
} = CategorySlice.actions;
export default CategorySlice.reducer;
