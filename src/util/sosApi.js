import axios from "axios";
import config from "../config";

const SosApi = {
  generateThead: async function (question) {
    const URL = `${config.SOS_API_BASE_URL}/generate/thread`;

    const data = { question };

    try {
      const response = await axios.post(URL, data);
      return response.data;
    } catch (error) {
      console.error("Error calling SOS API:", error);
      throw error;
    }
  },
};

export { SosApi };
