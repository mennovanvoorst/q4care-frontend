import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const PaymentApi = {
  make: async (userId: string, productId: string) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/v1/payments`, { userId, productId }, {
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

export default PaymentApi;