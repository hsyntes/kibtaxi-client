const { default: axios } = require("axios");

class HttpRequest {
  static async get(endpoint, payload) {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API} in GET Request.`);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/?API_KEY=${process.env.NEXT_PUBLIC_API_KEY}&${endpoint}`,
        {
          params: {
            ...payload,
          },
        }
      );

      return response?.data;
    } catch (e) {
      console.error(e);
      return e.response?.error;
    }
  }

  static async post(endpoint, payload) {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API} in POST Request.`);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/${endpoint}`,
        {
          ...payload,
        }
      );

      return response?.data;
    } catch (e) {
      console.error(e);
      return e.response?.data;
    }
  }
}

export default HttpRequest;
