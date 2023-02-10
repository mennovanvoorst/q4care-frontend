import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const ResourceAPI = {
  list: async () => {
    try {
      const headers: any = {
        Authorization: `Basic ${process.env.SERVER_AUTH_TOKEN}`,
      };

      const response = await axios.get(`${SERVER_BASE_URL}/v1/resources`, {
        headers,
      });

      return response.data;
    } catch (error: any) {
      if (!error.response) throw error;

      throw error.response.data;
    }
  },
  getById: async (resourceId: string) => {
    try {
      const headers: any = {
        Authorization: `Basic ${process.env.SERVER_AUTH_TOKEN}`,
      };
      const response = await axios.get(
        `${SERVER_BASE_URL}/v1/resources/${resourceId}`,
        { headers }
      );

      return response.data;
    } catch (error: any) {
      if (!error.response) throw error;

      throw error.response.data;
    }
  },
  create: async (formData: any) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/v1/resources`,
        formData,
        {
          withCredentials: true,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.log(error);
      if (!error.response) throw error;
      throw error.response.data;
    }
  },
  destroy: async (id: string) => {
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/v1/resources/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error: any) {
      console.log(error);
      if (!error.response) throw error;
      throw error.response.data;
    }
  },
  updateById: async (id: string, formData: any) => {
    try {
      const response = await axios.patch(
        `${SERVER_BASE_URL}/v1/resources/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.log(error);
      if (!error.response) throw error;
      throw error.response.data;
    }
  },
};

export default ResourceAPI;
