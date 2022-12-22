import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const SkillApi = {
  list: async () => {
    try {
      const headers: any = {
        'Authorization': `Basic ${process.env.SERVER_AUTH_TOKEN}`
      };

      const response = await axios.get(`${SERVER_BASE_URL}/v1/skills`, { headers });

      return response.data;
    } catch (error: any) {
      if(!error.response) throw error;
      
      throw error.response.data;
    }
  },
  getById: async (id: string) => {
    try {
      const headers: any = {
        'Authorization': `Basic ${process.env.SERVER_AUTH_TOKEN}`
      };
      const response = await axios.get(`${SERVER_BASE_URL}/v1/skills/${id}`, { headers });

      return response.data;
    } catch (error: any) {
      if(!error.response) throw error;
      
      throw error.response.data;
    }
  },
  create: async (name: string) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/skills`, { name }, {
        withCredentials: true
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      if(!error.response) throw error;
      throw error.response.data;
    }
  },
  updateById: async (id: string, name: string) => {
    try {
      const response = await axios.patch(`${SERVER_BASE_URL}/v1/skills/${id}`, { name }, {
        withCredentials: true
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      if(!error.response) throw error;
      throw error.response.data;
    }
  },
};

export default SkillApi;