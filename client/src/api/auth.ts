import { AxiosError } from "axios";
import apiClient from "./axiosClient";

const registerUser = async (
  userName: string,
  email: string,
  role: string,
  password: string,
  referralCode?: string
) => {
  try {
    const response = await apiClient.post("/user/register", {
      userName,
      role,
      email,
      password,
      referralCode,
    });

    console.log(response);

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

export { registerUser };
