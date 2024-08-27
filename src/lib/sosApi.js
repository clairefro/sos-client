import axios from "axios";
import config from "../config";

const BASE_URL = config.SOS_API_BASE_URL;

const SosApi = {
  generateThead: async function (question) {
    const url = `${BASE_URL}/generate/thread`;

    return await this.call({
      url,
      data: { question },
      method: "post",
    });
  },

  generateReply: async function (messages) {
    const url = `${BASE_URL}/generate/reply`;

    return await this.call({
      url,
      data: { messages },
      method: "post",
    });
  },

  getGenerateThreadPrompt: async function () {
    const url = `${BASE_URL}/prompts/generateThread`;

    return await this.call({
      url,
      method: "get",
    });
  },

  getGenerateReplyPrompt: async function () {
    const url = `${BASE_URL}/prompts/generateReply`;

    return await this.call({
      url,
      method: "get",
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
