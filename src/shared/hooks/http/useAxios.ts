import { useEffect, useRef } from "react";
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { LOGIN_REDIRECT_URL } from "../../constants";

/**
 * Axios client configured with the backend baseURL.
 * Shared between all hook instances.
 */
const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? undefined
});

/**
 * Global mutex to prevent multiple concurrent refreshes.
 * Ensures that only one refresh call is in progress at a time.
 */
let refreshPromise: Promise<string> | null = null;

/**
 * Refreshes the access token using the refresh token.
 * Implements a mutex to prevent concurrent calls.
 *
 * @param session - Current NextAuth session
 * @param update - Function to update the session
 * @returns New access token in “Bearer {token}” format
 */
const refreshAccessToken = async (
  session: Session | null,
  update: (data?: unknown) => Promise<Session | null>
): Promise<string> => {
  // If a refresh is already in progress, wait for its result
  if (refreshPromise) {
    return refreshPromise;
  }
  console.log("Refreshing access token...", session);
  // Validate that session and refreshToken exist
  if (!session?.refreshToken) {
    const error = new Error("No hay refresh token disponible");
    return Promise.reject(error);
  }

  // Start new refresh and store promise
  refreshPromise = (async (): Promise<string> => {
    try {
      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.refreshToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!refreshRes.ok) {
        throw new Error(`Error al refrescar token: HTTP ${refreshRes.status}`);
      }

      const response = await refreshRes.json();
      const { accessToken, refreshToken, user } = response.data;

      if (!accessToken || !refreshToken) {
        throw new Error("Respuesta de refresh inválida");
      }

      // Update session in NextAuth
      await update({
        accessToken,
        refreshToken,
        user
      });

      return `Bearer ${accessToken}`;
    } catch (refreshError) {
      console.error("[useAxios] Error al refrescar token:", refreshError);
      // Log out and redirect to login
      // Use relative path so hosting base URL is respected (via NEXTAUTH_URL)
      signOut({ callbackUrl: LOGIN_REDIRECT_URL });
      throw refreshError;
    } finally {
      // Release the mutex
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

/**
 * Custom hook for Axios client with automatic authentication.
 * Features:
 * - Injects Bearer token into private requests
 * - Automatically refreshes the token on 401
 * - Mutex to prevent concurrent refreshes
 * - Excludes auth endpoints from the refresh flow
 *
 * @param isPrivate - If true, injects Authorization header into each request
 * @returns Axios instance configured with interceptors
 */
const useAxios = (isPrivate: boolean = false): AxiosInstance => {
  const { data: session, update } = useSession();
  const isPrivateRef = useRef(isPrivate);

  // Update ref when isPrivate changes
  useEffect(() => {
    isPrivateRef.current = isPrivate;
  }, [isPrivate]);

  useEffect(() => {
    // Request Interceptor: Inject Bearer token
    const requestIntercept = axiosConfig.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (isPrivateRef.current && session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response Interceptor: Handle 401 and refresh
    const responseIntercept = axiosConfig.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error?.config as InternalAxiosRequestConfig & { _retry?: boolean };
        const url: string = prevRequest?.url || "";

        // List of endpoints that should NOT trigger a refresh
        const isAuthEndpoint = [
          "/auth/login",
          "/auth/logout",
          "/auth/refresh-token",
          "/auth/change-password"
        ].some((ep) => url.includes(ep));

        // If it's 401, not an auth endpoint, and hasn't retried
        if (error?.response?.status === 401 && !prevRequest._retry && !isAuthEndpoint) {
          prevRequest._retry = true;

          try {
            const newToken = await refreshAccessToken(session, update);
            prevRequest.headers.Authorization = newToken;
            return axios(prevRequest);
          } catch (refreshError) {
            // The refresh failed, the user will be redirected to login
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup: Remove interceptors on unmount
    return (): void => {
      axiosConfig.interceptors.request.eject(requestIntercept);
      axiosConfig.interceptors.response.eject(responseIntercept);
    };
  }, [session, update]); // Correct dependencies

  return axiosConfig;
};

export default useAxios;
