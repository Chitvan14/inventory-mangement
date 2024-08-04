// src/services/api.ts
import axios from "axios";
import { toast } from "react-toastify";
import { Item } from "../interfaces";

const baseUrl = process.env.REACT_APP_API_URL;
const API_URL = `${baseUrl}/api`;

export const getParties = async () => {
  try {
    const response = await axios.get(`${API_URL}/parties`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const addParty = async (party: { name: string }) => {
  try {
    await axios.post(`${API_URL}/parties`, party);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateParty = async (id: number, party: { name: string }) => {
  try {
    await axios.put(`${API_URL}/parties/${id}`, party);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/inventory`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const addItem = async (item: Item) => {
  try {
    await axios.post(`${API_URL}/inventory`, item);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateItem = async (id: number, item: Item) => {
  try {
    await axios.put(`${API_URL}/inventory/${id}`, item);
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// export const login = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/auth`);
//     console.log("LOGIN RESPONSE ",response);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     throw error;
//   }
// };

const handleError = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        toast.error(
          "Bad request: " + (error.response.data.message || "Invalid input")
        );
        break;
      case 404:
        toast.error(
          "Not found: " + (error.response.data.message || "Resource not found")
        );
        break;
      case 500:
        toast.error(
          "Server error: " +
            (error.response.data.message || "Internal server error")
        );
        break;
      default:
        toast.error("An unexpected error occurred");
        break;
    }
  } else if (error.request) {
    toast.error("Network error: Unable to reach the server");
  } else {
    toast.error("An unexpected error occurred");
  }
};
