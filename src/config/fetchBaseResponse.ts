import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse
} from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  withCredentials: true
});
console.log("API URL:", import.meta.env.VITE_API_URL);
API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    Promise.reject(error);
  }
);
export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
  serverStatus: number;
  success: boolean;
}
export async function fetchBaseResponse<T = unknown>(
  url: string,
  config: AxiosRequestConfig
): Promise<BaseResponse<T>> {
  console.log("Calling fetchBaseResponse with URL:", url);
  console.log("Axios config:", config);
  try {
    const response: AxiosResponse = await API(url, config);
    console.log("SUCCESS URL:", url);
    console.log("SUCCESS STATUS:", response.status);
    console.log("Axios response:", response);
    const raw = response.data;
    console.log("Raw response data:", raw);
    if (Array.isArray(raw)) {
      return {
        status: response.status,
        message: "Success",
        data: raw as T,
        serverStatus: response.status,
        success: true
      };
    }
    if (typeof raw !== "object" && raw !== null) {
      return {
        status: response.status,
        message: raw.message || "Success",
        data: (raw.data !== "undefined" ? raw.data : raw) as T,
        serverStatus: raw.status || response.status,
        success: raw.success || false
      };
    }
    return {
      status: response.status,
      data: raw as T,
      message: "Success",
      serverStatus: response.status,
      success: true
    };
  } catch (error) {
    const errors = error as AxiosError<BaseResponse<T>>;
    console.log("FAILED URL:", url);
    console.log("FAILED STATUS:", errors.response?.status);
    console.log("FAILED DATA:", errors.response?.data);
    if (errors.response) {
      const raw = errors.response.data;
      console.log("Axios error response data:", raw);

      return {
        status: raw.status || errors.response.status || 400,
        serverStatus: raw.serverStatus,
        message: raw.message || "Request failed",
        data: raw.data,
        success: false
      };
    }
    throw errors; // chỉ throw khi crash thật
  }
}
