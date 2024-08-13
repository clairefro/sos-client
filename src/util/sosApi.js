import axios from "axios";
import config from "../config";

const SosApi = {
  generateThead: async function (question) {
    const URL = `${config.SOS_API_BASE_URL}/generate/thread`;

    return await this.call({
      url: URL,
      data: { question },
      method: "post",
    });
  },

  generateReply: async function (messages) {
    const URL = `${config.SOS_API_BASE_URL}/generate/reply`;

    return await this.call({
      url: URL,
      data: { messages },
      method: "post",
    });
  },

  call: async function ({ method, url, data }) {
    try {
      const response = await axios({ url, method, data });
      return response.data;
    } catch (error) {
      console.error("Error calling SOS API:", error);
      throw error;
    }
  },
};

export { SosApi };
