import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const FileAPI = {
  download: async (fileId: string) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/files/${fileId}`, {}, {
        withCredentials: true,
        responseType: "blob",
      });

      return response;
    } catch (error: any) {
      return error.response;
    }
  },
  destroy: async (fileId: string) => {
    try {
      const response = await axios.delete(`${SERVER_BASE_URL}/v1/files/${fileId}`, {
        withCredentials: true
      });

      return response.data;
    } catch (error: any) {
      if(!error.response) throw error;
      
      throw error.response.data;
    }
  },
};

export default FileAPI;