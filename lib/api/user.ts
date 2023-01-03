import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const UserAPI = {
  list: async () => {
    try {
      const headers: any = {
        'Authorization': `Basic ${process.env.SERVER_AUTH_TOKEN}`
      };

      const response = await axios.get(`${SERVER_BASE_URL}/v1/users`, { headers });

      return response.data;
    } catch (error: any) {
      if(!error.response) throw error;
      
      throw error.response.data;
    }
  },
  getSkillsById: async (userId: string) => {
    try {
      const headers: any = {
        'Authorization': `Basic ${process.env.SERVER_AUTH_TOKEN}`
      };

      const response = await axios.get(`${SERVER_BASE_URL}/v1/users/${userId}/skills`, { headers });

      return response.data;
    } catch (error: any) {
      if(!error.response) throw error;
      
      throw error.response.data;
    }
  },
  getCertificateForSkill: async (userId: string, skillId: string) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/users/${userId}/skills/${skillId}/certificate`, {}, {
        withCredentials: true,
        responseType: "blob",
      });

      return response;
    } catch (error: any) {
      return error.response;
    }
  },
  create: async (firstName: string, lastName: string, email: string, flags: number) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/users`, { firstName, lastName, email, flags }, {
        withCredentials: true
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      if(!error.response) throw error;
      throw error.response.data;
    }
  },
  updateById: async (id: string, firstName: string, lastName: string, email: string, flags: number) => {
    try {
      const response = await axios.patch(`${SERVER_BASE_URL}/v1/users/${id}`, { firstName, lastName, email, flags }, {
        withCredentials: true
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      if(!error.response) throw error;
      throw error.response.data;
    }
  },
  getById: async (id: string) => {
    try {
      const headers: any = {
        'Authorization': `Basic ${process.env.SERVER_AUTH_TOKEN}`
      };
      const response = await axios.get(`${SERVER_BASE_URL}/v1/users/${id}`, { headers });

      return response.data;
    } catch (error: any) {
      if(!error.response) throw error;
      
      throw error.response.data;
    }
  },
  addSkillById: async (userId: string, skillId: string) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/users/${userId}/skills/${skillId}`, { achievementDate: new Date().toISOString() }, {
        withCredentials: true
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      if(!error.response) throw error;
      throw error.response.data;
    }
  },
  removeSkillById: async (userId: string, skillId: string) => {
    try {
      const response = await axios.delete(`${SERVER_BASE_URL}/v1/users/${userId}/skills/${skillId}`, {
        withCredentials: true
      });

      return response.data;
    } catch (error: any) {
      console.log(error);
      if(!error.response) throw error;
      throw error.response.data;
    }
  },
  getPaymentsById: async (userId: string) => {
    try {
      const headers: any = {
        'Authorization': `Basic ${process.env.SERVER_AUTH_TOKEN}`
      };

      const response = await axios.get(`${SERVER_BASE_URL}/v1/users/${userId}/payments`, { headers });

      return response.data;
    } catch (error: any) {
      if(!error.response) throw error;
      
      throw error.response.data;
    }
  },
};

export default UserAPI;