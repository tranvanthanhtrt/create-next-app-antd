import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';


/**
 * @class Api
 * @extends {Axios}
 * @example
 */
export class Api {
  private api: AxiosInstance;
  /**
   * Creates an instance of Api.
   *
   * @param {import("axios").AxiosRequestConfig} [config] - axios configuration.
   * @memberof Api
   */
  public constructor(config?: AxiosRequestConfig) {
    this.api = axios.create(config);
    this.api.interceptors.request.use( async (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
      const token = localStorage.getItem('access_token');
      if (!(token)) {
        const headers = {
          /* eslint no-unneeded-ternary: "error" */
          Authorization: token,
        } as unknown as AxiosHeaders;
        if (config.headers) {
          config.headers = Object.assign(headers, config.headers);
        } else {
          config.headers = headers;
        }
      }

      return {
        baseURL: process.env.REACT_APP_SERVER_API_URL,
        ...config,
      };
    });

    this.api.interceptors.response.use(
      (param: AxiosResponse) => ({
        ...param,
      }),
      async (error: AxiosError) => {
        if (error.response) {
          const statusCode = error.response && error.response.status;

          switch (statusCode) {
            case 401:
              // store.dispatch(logoutAction());
              break;
            // case 403:
            //   history.push('/403');
            //   break;
            // case 404:
            //   history.push('/404');
            //   break;
            // case 500:
            //   history.push('/500');
            //   break;
            // case 503:
            //   history.push('/503');
            //   break;
            default:
              break;
          }

          if (statusCode === 401) {
            // toast.error('Unauthorized')
          }

          if (statusCode !== 401 && statusCode < 500) {
            // toast.error(error.response.data.message)
          }

          return Promise.reject(error.response && error.response.data);
        }
      },
    );
  }

  /**
   * Get Uri
   *
   * @param {import("axios").AxiosRequestConfig} [config]
   * @returns {string}
   * @memberof Api
   */
  public getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  /**
   * Generic request.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP axios response payload.
   * @memberof Api
   *
   * @example
   * api.request({
   *   method: "GET|POST|DELETE|PUT|PATCH"
   *   baseUrl: "http://www.domain.com",
   *   url: "/api/v1/users",
   *   headers: {
   *     "Content-Type": "application/json"
   *  }
   * }).then((response: AxiosResponse<User>) => response.data)
   *
   */
  public request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.api.request(config);
  }

  /**
   * HTTP GET method, used to fetch data `statusCode`: 200.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} HTTP `axios` response payload.
   * @memberof Api
   */
  public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.api.get(url, config);
  }

  /**
   * HTTP DELETE method, `statusCode`: 204 No Content.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.api.delete(url, config);
  }

  /**
   * HTTP HEAD method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.api.head(url, config);
  }

  /**
   * HTTP POST method `statusCode`: 201 Created.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public post<T, B, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.api.post(url, data, config);
  }

  /**
   * HTTP PUT method.
   *
   * @access public
   * @template T - `TYPE`: expected object.   
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public put<T, B, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.api.put(url, data, config);
  }

  /**
   * HTTP PATCH method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public patch<T, B, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.api.patch(url, data, config);
  }

  /**
   *
   * @template T - type.
   * @param {import("axios").AxiosResponse<T>} response - axios response.
   * @returns {T} - expected object.
   * @memberof Api
   */
  public success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  /**
   * throw Error
   */
  public error(error: AxiosError<Error>) {
    throw error;
  }
}
