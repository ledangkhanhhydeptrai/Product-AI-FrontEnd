import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { BrandProps, CreateBrandsProps } from "./brandTypes";

export const getAllBrand = async (): Promise<ApiResponse<BrandProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<BrandProps>>(
      "/brands",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Response:", response.data);
    if (response.status !== 200) {
      throw new Error(`HTTP Status:${response.status}`);
    }
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
export const getBrandById = async (
  id: string
): Promise<ApiResponse<BrandProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<BrandProps>>(
      `/brands/${id}`,
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
    throw errors;
  }
};
export const CreateBrand = async (
  request: CreateBrandsProps
): Promise<ApiResponse<BrandProps>> => {
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("description", request.description);
  if (request.logo) {
    formData.append("logo", request.logo);
  }
  try {
    const response = await fetchBaseResponse<ApiResponse<BrandProps>>(
      "/create-brands",
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
export const updateBrandById = async (
  id: string,
  request: CreateBrandsProps
): Promise<ApiResponse<BrandProps>> => {
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("description", request.description);
  if (request.logo) {
    formData.append("logo", request.logo);
  }
  try {
    const response = await fetchBaseResponse<ApiResponse<BrandProps>>(
      `/brands/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
export const deleteBrandById = async (id: string) => {
  try {
    const response = await fetchBaseResponse<ApiResponse<BrandProps>>(
      `/brands/${id}`,
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
