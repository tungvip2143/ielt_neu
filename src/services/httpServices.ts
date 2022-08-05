import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL } from "constants/api";

class Services {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
      timeout: 60000,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG5leHRsZXZlbHZuLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJ1c2VyVHlwZSI6IlNVUEVSX0FETUlOIiwiX2lkIjoiNjJlYzBjMzNhMGVjOTJjNGNlMzliODY3IiwiaWF0IjoxNjU5Njg0ODY4LCJleHAiOjE2NjIyNzY4Njh9.zz79pBQeXhSQ8WYDbeMxdSW8DKSxHeHHD3MO5V7Bf_o",
      },
    });

    //! Interceptor request
    this.axios.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    //! Interceptor response
    this.axios.interceptors.response.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token: string) {
    this.axios.interceptors.request.use(
      function (config) {
        if (config.headers) {
          // Do something before request is sent
          config.headers.Authorization =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG5leHRsZXZlbHZuLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJ1c2VyVHlwZSI6IlNVUEVSX0FETUlOIiwiX2lkIjoiNjJlYzBjMzNhMGVjOTJjNGNlMzliODY3IiwiaWF0IjoxNjU5Njg3OTk3LCJleHAiOjE2NjIyNzk5OTd9.oyMCZxtd3wlQckf9MPn0M5WkrUoy49rpV8XyLFV7w7M";
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  put(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }
}

export default new Services();
