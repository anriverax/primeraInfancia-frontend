/**
 * Custom hook for making Axios requests with NextAuth.js session handling.
 *
 * @param isPrivate - Indicates whether the request requires authentication.
 * @returns Axios instance with interceptors for handling sessions and errors.
 */
import { useEffect } from "react";

import axios, { AxiosError, AxiosInstance } from "axios";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { LOGIN_REDIRECT_URL } from "../constants";

// Axios configuration
const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND ? process.env.NEXT_PUBLIC_BACKEND : undefined
});

const refreshAccessToken = async (
  session: Session,
  /* eslint-disable */
  update: (data?: any) => Promise<Session | null>
  /* eslint-enable */
): Promise<string | void> => {
  try {
    // 1. Call the refresh endpoint with the refreshToken
    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/refresh-token`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session.refreshToken}`
      }
    });

    if (!refreshRes.ok) throw new Error("Hubo un error al refrescar el token");

    const response = await refreshRes.json();

    const { accessToken, refreshToken, user } = response.data;

    // 2. Update the session in NextAuth
    await update({
      accessToken,
      refreshToken,
      user
    });

    return `Bearer ${accessToken}`;
  } catch (refreshError) {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL || ""}${LOGIN_REDIRECT_URL}` });
    return Promise.reject(refreshError);
  }
};

/**
 * Custom hook for making Axios requests with NextAuth.js session handling.
 *
 * @param isPrivate - Indicates whether the request requires authentication.
 * @returns Axios instance with interceptors for handling sessions and errors.
 */
const useAxios = (isPrivate: boolean = false): AxiosInstance => {
  const { data: session, update } = useSession();

  /* eslint-disable */
  useEffect(() => {
    // Request interceptor
    const requestIntercept = axiosConfig.interceptors.request.use(
      (config) => {
        if (isPrivate && session?.accessToken)
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        return config;
      },
      (error: AxiosError) => {
        Promise.reject(error);
      }
    );

    // Response interceptor
    const responseIntercept = axiosConfig.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest: any = error?.config;
        const url: string = prevRequest?.url || "";
        // Evitar ciclo de refresh en endpoints de auth
        const isAuthEndpoint = [
          "/auth/login",
          "/auth/logout",
          "/auth/refresh-token",
          "/auth/change-password"
        ].some((ep) => url.includes(ep));

        if (error?.response?.status === 401 && !prevRequest?.sent && !isAuthEndpoint) {
          prevRequest.sent = true;

          const getToken = await refreshAccessToken(session!, update);

          prevRequest.headers["Authorization"] = getToken;

          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosConfig.interceptors.request.eject(requestIntercept);
      axiosConfig.interceptors.response.eject(responseIntercept);
    };
  }, [session]);
  /* eslint-enable */

  return axiosConfig;
};

export default useAxios;
