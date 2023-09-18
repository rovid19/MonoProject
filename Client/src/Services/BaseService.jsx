import axios from "axios";

class BaseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint, params) {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        params,
      });
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async put(endpoint, data) {
    try {
      const response = await axios.put(`${this.baseUrl}${endpoint}`, data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async delete(endpoint, data) {
    try {
      const response = await axios.delete(`${this.baseUrl}${endpoint}`, {
        data,
      });
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default BaseService;
