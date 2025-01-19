/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface BankApplication {
  /** ID */
  pk: number;
  /** Status */
  status: "draft" | "deleted" | "created" | "completed" | "rejected";
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string;
  /**
   * Apply date
   * @format date-time
   */
  apply_date?: string | null;
  /**
   * End date
   * @format date-time
   */
  end_date?: string | null;
  /**
   * Creator
   * @minLength 1
   */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /**
   * Psrn and company name
   * @maxLength 100
   */
  psrn_and_company_name?: string | null;
}

export interface BankOffer {
  /** ID */
  pk?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Description
   * @minLength 1
   * @maxLength 500
   */
  description?: string;
  /**
   * Bonus
   * @minLength 1
   * @maxLength 200
   */
  bonus?: string;
  /**
   * Fact
   * @minLength 1
   * @maxLength 100
   */
  fact?: string;
  /**
   * Cost
   * @min -2147483648
   * @max 2147483647
   */
  cost?: number;
  /**
   * ImageUrl
   * @format uri
   * @maxLength 200
   */
  imageUrl?: string | null;
}

export interface DetailedBankOffer {
    pk?: number;
    name: string;
    description?: string;
    bonus?: string;
    fact?: string;
    cost?: number;
    imageUrl?: string | null;
    comment?: string | null;
    account_number?: string | null;
  }

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserList
     * @request GET:/api/user/
     * @secure
     */
    apiUserList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request username ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags api
     * @name ApiUserCreate
     * @summary Регистрация
     * @request POST:/api/user/
     * @secure
     */
    apiUserCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserRead
     * @request GET:/api/user/{id}/
     * @secure
     */
    apiUserRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция обновления данных существующего пользователя. Обновляет информацию пользователя по ID, переданному в URL.
     *
     * @tags api
     * @name ApiUserUpdate
     * @summary Обновление данных пользователя
     * @request PUT:/api/user/{id}/
     * @secure
     */
    apiUserUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserPartialUpdate
     * @request PATCH:/api/user/{id}/
     * @secure
     */
    apiUserPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags api
     * @name ApiUserDelete
     * @request DELETE:/api/user/{id}/
     * @secure
     */
    apiUserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  applications = {
    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsList
     * @summary Список банковских заявок
     * @request GET:/applications/
     * @secure
     */
    applicationsList: (
        query?: {
            status?: string;
            start_apply_date?: string;
            end_apply_date?: string;
          },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          applications: BankApplication[];
        },
        any
      >({
        path: `/applications/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsCreate
     * @summary Добавление в заявку-черновик
     * @request POST:/applications/
     * @secure
     */
    applicationsCreate: (
      data: {
        section_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<{
        draft_application_id: number
        number_of_offers: number
      }, void>({
        path: `/applications/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsRead
     * @summary Одна заявка
     * @request GET:/applications/{application_id}/
     * @secure
     */
    applicationsRead: (applicationId: string, params: RequestParams = {}) =>
      this.request<
        {
          application: BankApplication;
          offers: DetailedBankOffer[];
        },
        any
      >({
        path: `/applications/${applicationId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsUpdate
     * @summary Изменение доп. полей заявки
     * @request PUT:/applications/{application_id}/
     * @secure
     */
    applicationsUpdate: (applicationId: string, data: BankApplication, params: RequestParams = {}) =>
      this.request<BankApplication, any>({
        path: `/applications/${applicationId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsDelete
     * @summary Удаление заявки
     * @request DELETE:/applications/{application_id}/
     * @secure
     */
    applicationsDelete: (applicationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/applications/${applicationId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsApproveRejectUpdate
     * @summary Завершить/отклонить модератором
     * @request PUT:/applications/{application_id}/approve-reject/
     * @secure
     */
    applicationsApproveRejectUpdate: (
      applicationId: string,
      data: {
        /** 'completed' or 'rejected' */
        status: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<BankApplication, void>({
        path: `/applications/${applicationId}/approve-reject/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsOfferUpdate
     * @summary Изменить комментарий к услуге в заявке
     * @request PUT:/applications/{application_id}/offer/{offer_id}
     * @secure
     */
    applicationsOfferUpdate: (applicationId: string, offerId: string, data: { comment: string }, params: RequestParams = {}) =>
      this.request<{
        application: BankApplication
        offers: DetailedBankOffer[]
      }, any>({
        path: `/applications/${applicationId}/offer/${offerId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsOfferDelete
     * @summary Удалить услугу из заявки
     * @request DELETE:/applications/{application_id}/offer/{offer_id}
     * @secure
     */
    applicationsOfferDelete: (applicationId: string, offerId: string, params: RequestParams = {}) =>
      this.request<
    {
      application: BankApplication;
      offers: DetailedBankOffer[];
    },
    any
  >({
        path: `/applications/${applicationId}/offer/${offerId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags applications
     * @name ApplicationsSubmitUpdate
     * @summary Сформировать создателем
     * @request PUT:/applications/{application_id}/submit/
     * @secure
     */
    applicationsSubmitUpdate: (applicationId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/applications/${applicationId}/submit/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @summary Аутентификация
     * @request POST:/login/
     * @secure
     */
    loginCreate: (
      data: {
        login: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          pk: number;
          login: string;
          password: string;
          is_staff: boolean;
          is_superuser: boolean;
        },
        any
      >({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @summary Деавторизация
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  offers = {
    /**
     * No description
     *
     * @tags offers
     * @name OffersList
     * @summary Список банковских услуг
     * @request GET:/offers/
     * @secure
     */
    offersList: (
      query?: {
        offer_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          offers: BankOffer[];
          draft_application_id: number;
          application_offers_counter: number;
        },
        any
      >({
        path: `/offers/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OffersCreate
     * @summary Добавление банковской услуги
     * @request POST:/offers/
     * @secure
     */
    offersCreate: (data: BankOffer, params: RequestParams = {}) =>
      this.request<BankOffer, any>({
        path: `/offers/`,
        method: "POST",
        secure: true,
        body: data,
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OffersRead
     * @summary Одна банковская услуга
     * @request GET:/offers/{offer_id}/
     * @secure
     */
    offersRead: (offerId: string, params: RequestParams = {}) =>
      this.request<BankOffer, any>({
        path: `/offers/${offerId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OffersCreateImage
     * @summary Добавление изображения
     * @request POST:/offers/{offer_id}/
     * @originalName offersCreate
     * @duplicate
     * @secure
     */
    OffersCreateImage: (offerId: string, data: { image: File }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/offers/${offerId}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OffersUpdate
     * @summary Изменение банковской услуги
     * @request PUT:/offers/{offer_id}/
     * @secure
     */
    offersUpdate: (offerId: string, data: BankOffer, params: RequestParams = {}) =>
      this.request<BankOffer, any>({
        path: `/offers/${offerId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags offers
     * @name OffersDelete
     * @summary Удаление банковской услуги
     * @request DELETE:/offers/{offer_id}/
     * @secure
     */
    offersDelete: (offerId: string, params: RequestParams = {}) =>
      this.request<BankOffer[], any>({
        path: `/offers/${offerId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
