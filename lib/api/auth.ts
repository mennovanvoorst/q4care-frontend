import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const AuthAPI = {
  requestToken: async (email: string) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/auth/login/token`, { email }, {
        withCredentials: true
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      if(!error.response) throw error;
      throw error.response.data;
    }
  },
  verifyToken: async (token: string) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/auth/login/token/verify`, { token }, {
        withCredentials: true
      });

      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/auth/logout`, {
        withCredentials: true
      });

      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export default AuthAPI;