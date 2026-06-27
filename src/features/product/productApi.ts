import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import {
  FormUpdateProduct,
  ProductProps,
  ProductPropsAdminForm,
  ProductPropsForAdmin,
  ProductPropsFormAdmin
} from "./productTypes";

export const getAllProductForCustomer = async (): Promise<
  ApiResponse<ProductProps>
> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ProductProps>>(
      `/public/product`,
      {
        method: "GET",
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
export const getProductByIdForCustomer = async (
  id: string
): Promise<ApiResponse<ProductProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ProductProps>>(
      `/public/product/${id}`,
      {
        method: "GET",
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
export const getProductAdmin = async (): Promise<
  ApiResponse<ProductPropsForAdmin>
> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ProductPropsForAdmin>>(
      "/product",
      {
        method: "GET",
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
export const getProductAdminById = async (
  id: string
): Promise<ApiResponse<ProductPropsForAdmin>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ProductPropsForAdmin>>(
      `/product/${id}`,
      {
        method: "GET",
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
export const createProductFormAdmin = async ({
  name,
  slug,
  description,
  price,
  stock,
  thumbnail,
  category_id,
  brand_id,
  is_active,
  file
}: ProductPropsAdminForm): Promise<ApiResponse<ProductPropsForAdmin>> => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("thumbnail", thumbnail);
    formData.append("category_id", category_id);
    formData.append("brand_id", brand_id);
    formData.append("is_active", String(is_active));
    if (file) {
      formData.append("file", file);
    }
    const response = await fetchBaseResponse<ApiResponse<ProductPropsForAdmin>>(
      "/create-product",
      {
        method: "POST",
        headers: {},
        data: formData
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
export const updateProductForAdmin = async (
  id: string,
  request: FormUpdateProduct
): Promise<ApiResponse<ProductPropsForAdmin>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ProductPropsForAdmin>>(
      `/product/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        data: request
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
export const deleteProductAdmin = async (
  id: string
): Promise<ApiResponse<ProductPropsFormAdmin>> => {
  try {
    const response = await fetchBaseResponse<
      ApiResponse<ProductPropsFormAdmin>
    >(`/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
