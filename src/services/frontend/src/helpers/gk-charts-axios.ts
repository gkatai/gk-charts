import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Step-1: Create a new Axios instance with a custom config.
const gkChartsAxios = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3000/" : "/",
  timeout: 10000,
});

// Step-2: Create request, response & error handlers
const requestHandler = (request: InternalAxiosRequestConfig<any>) => {
  return request;
};

const responseHandler = (response: AxiosResponse<any, any>) => {
  return response;
};

const errorHandler = (error: any) => {
  return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
gkChartsAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

gkChartsAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { gkChartsAxios };
