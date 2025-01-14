import { AxiosError } from "axios";
import apiClient from "./axiosClient";

const getAiInsight = async (id: string) => {
  try {
    const response = await apiClient.get(`/ai/ask-ai/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

export default getAiInsight;
