import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { CategoryProps, CreateCategoryProps } from "./categoryTypes";

export const getAllCategory = async (): Promise<ApiResponse<CategoryProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CategoryProps>>(
      "/public/category",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status !== 200) {
      throw new Error(`HTTP Status:${response.status}`);
    }
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    console.log("Error:", errors);
    throw errors;
  }
};
export const getCategoryById = async (
  id: string
): Promise<ApiResponse<CategoryProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CategoryProps>>(
      `/public/category/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status !== 200) {
      throw new Error(`HTTP Status:${response.status}`);
    }
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    console.log("Error:", errors);
    throw errors;
  }
};
export const createCategory = async ({
  name,
  description,
  slug
}: CreateCategoryProps): Promise<ApiResponse<CategoryProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CategoryProps>>(
      "/category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { name, description, slug }
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    console.log("Error:", errors);
    throw errors;
  }
};
export const updateCategoryById = async (
  id: string,
  { name, description, slug }: CreateCategoryProps
): Promise<ApiResponse<CategoryProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CategoryProps>>(
      `/category/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          name,
          description,
          slug
        }
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    console.log("Error:", errors);
    throw errors;
  }
};
export const deleteCategoryById = async (id: string) => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CategoryProps>>(
      `/category/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    console.log("Error:", errors);
    throw errors;
  }
};
