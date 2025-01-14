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

const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`/user/login`, {
      email,
      password,
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

const getUsers = async () => {
  try {
    const response = await apiClient.get("/user/all", {
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

const deleteUser = async (id: string) => {
  try {
    const response = await apiClient.delete(`/user/${id}`, {
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

export { registerUser, loginUser, getUsers, deleteUser };
