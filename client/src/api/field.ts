import { AxiosError } from "axios";
import apiClient from "./axiosClient";

const createField = async (
  fieldName: string,
  location: string,
  latitude: string,
  longitude: string,
  cropType: string,
  fieldArea: string,
  plantingDate: string,
  harvestingDate: string,
  soilType: string,
  inputCost: string,
  revenue: string,
  cropHealth: string
) => {
  try {
    const response = await apiClient.post(
      "/field/create",
      {
        fieldName,
        location,
        latitude,
        longitude,
        cropType,
        fieldArea,
        plantingDate,
        harvestingDate,
        soilType,
        inputCost,
        revenue,
        cropHealth,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

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

const updateField = async (
  id: string,
  fieldName: string,
  location: string,
  latitude: string,
  longitude: string,
  cropType: string,
  fieldArea: string,
  plantingDate: string,
  harvestingDate: string,
  soilType: string,
  inputCost: string,
  revenue: string,
  cropHealth: string
) => {
  try {
    const response = await apiClient.put(
      `/field/update/${id}`,
      {
        fieldName,
        location,
        latitude,
        longitude,
        cropType,
        fieldArea,
        plantingDate,
        harvestingDate,
        soilType,
        inputCost,
        revenue,
        cropHealth,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

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

const getFields = async () => {
  try {
    const response = await apiClient.get("/field", {
      headers: {
        "Content-Type": "application/json",
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

const getField = async (id: string) => {
  try {
    const response = await apiClient.get(`/field/${id}`, {
      headers: {
        "Content-Type": "application/json",
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

const deleteField = async (id: string) => {
  try {
    const response = await apiClient.delete(`field/delete/${id}`, {
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

export { createField, getFields, getField, updateField, deleteField };
