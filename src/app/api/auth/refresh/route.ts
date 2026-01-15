/**
 * POST /api/auth/refresh
 *
 * Server-side token refresh endpoint for secure session token updates.
 *
 * This API route handles refreshing expired access tokens using the stored refresh token.
 * It runs exclusively on the server, ensuring the refresh token never reaches the client browser.
 *
 * **Security Architecture:**
 * - Server-side execution: Refresh logic isolated from client-side code
 * - httpOnly cookies: Both tokens (access & refresh) stored securely
 * - Backend integration: Delegates to backend `/auth/refresh-token` endpoint
 * - No client exposure: Client receives only the new accessToken
 * - HTTPS-only transmission: Tokens transmitted only over encrypted connections
 *
 * **Flow:**
 * 1. Client detects 401 response (expired accessToken)
 * 2. Calls POST /api/auth/refresh
 * 3. Server retrieves session (including stored tokens)
 * 4. Server calls backend /auth/refresh-token with refreshToken
 * 5. Backend returns new tokens
 * 6. Server updates session/JWT
 * 7. Client receives new accessToken for authorization headers
 *
 * **Error Handling:**
 * - 401: No active session - user must re-authenticate
 * - 500: Backend failure or invalid refresh token
 * - Other: Propagated from backend refresh-token endpoint
 *
 * @route POST /api/auth/refresh
 * @returns {Promise<NextResponse>} JSON with accessToken and refreshToken or error
 *
 * @example
 * ```tsx
 * // Called automatically by useAxios when receiving 401
 * const response = await fetch('/api/auth/refresh', { method: 'POST' });
 * const { accessToken, refreshToken } = await response.json();
 * ```
 *
 * @throws {401} When session is not available or expired
 * @throws {500} When backend refresh fails
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/infrastructure/nextAuth";
import { NextResponse } from "next/server";

/**
 * Handles POST requests to refresh authentication tokens.
 *
 * **Endpoint:** `POST /api/auth/refresh`
 *
 * **Purpose:**
 * Server-side token refresh handler that securely refreshes expired access tokens
 * using the stored refresh token. This ensures the refresh token never leaves the server.
 *
 * **Security Features:**
 * - Server-side execution: Refresh logic isolated from browser
 * - Session-based: Uses NextAuth session containing httpOnly cookies
 * - Token validation: Validates JWT format before use
 * - Error handling: Returns generic error messages
 * - Backend delegation: Backend maintains token security
 *
 * **Request:**
 * - Method: POST
 * - Authentication: Via httpOnly cookies (automatic)
 * - Body: Empty (session retrieved server-side)
 *
 * **Response Success (200):**
 * ```json
 * {
 *   "accessToken": "new_jwt_token",
 *   "refreshToken": "new_refresh_token"
 * }
 * ```
 *
 * **Response Errors:**
 * - `401`: No active session or refresh token expired
 * - `500`: Backend error or invalid refresh token format
 *
 * **Flow:**
 * 1. Retrieve session from NextAuth (contains stored tokens)
 * 2. Validate refresh token is present and valid JWT format
 * 3. Call backend `/auth/refresh-token` endpoint
 * 4. Backend returns new access and refresh tokens
 * 5. Return tokens to client
 * 6. Client updates session via NextAuth
 *
 * @async
 * @route POST /api/auth/refresh
 *   - Success: `{ accessToken, refreshToken }`
 *   - Error: `{ error: string, message?: string }`
 * @statusCode 200 - Tokens refreshed successfully
 * @statusCode 401 - No session or invalid token
 * @statusCode 500 - Backend failure
 *
 * @example
 * ```tsx
 * // Called automatically by useAxios when detecting 401
 * try {
 *   const response = await fetch('/api/auth/refresh', {
 *     method: 'POST',
 *     credentials: 'include' // Include cookies
 *   });
 *
 *   if (response.ok) {
 *     const { accessToken, refreshToken } = await response.json();
 *     // Update session with new tokens
 *   } else {
 *     // User needs to re-authenticate
 *     window.location.href = '/auth/iniciar-sesion';
 *   }
 * } catch (error) {
 *   console.error('Token refresh failed:', error);
 * }
 * ```
 *
 * @throws {401} When session is not available or expired
 * @throws {500} When backend refresh fails
 *
 * @see {@link authOptions} - NextAuth configuration
 * @see {@link useAxios} - Client hook that calls this endpoint
 * @see {@link isValidJWT} - JWT format validation
 */
export async function POST() {
  try {
    /**
     * Retrieve the user's session from the server.
     * Contains JWT data including accessToken, refreshToken, and user info.
     * Session is retrieved from httpOnly cookies automatically by NextAuth.
     */
    const session = await getServerSession(authOptions);

    if (!session?.refreshToken) {
      return NextResponse.json(
        { error: "Unauthorized", message: "No refresh token available" },
        { status: 401 }
      );
    }

    // ✅ Type-safe token extraction
    const refreshToken = session.refreshToken as string;

    if (!isValidJWT(refreshToken)) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
    }

    /**
     * Call the backend refresh-token endpoint.
     *
     * The refresh token is extracted from the session (JWT) and sent to the backend
     * to obtain a new accessToken. This keeps the refresh token on the server only.
     *
     * **Security Note:**
     * - Refresh token sent via Authorization header (not in body)
     * - Uses HTTPS only in production
     * - Backend validates token and issues new tokens
     */

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { error: "Failed to refresh token", message: data.message },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data?.data?.accessToken || !data?.data?.refreshToken) {
      if (process.env.NEXT_PUBLIC_NODE_ENV_ENV === "development") {
        console.error("[refresh] Invalid response structure", data);
      }
      return NextResponse.json(
        { error: "Server error", message: data.message },
        { status: response.status }
      );
    }

    /**
     * Return the new tokens to the client.
     * The client's useAxios hook will update the session with these tokens.
     */
    return NextResponse.json({
      accessToken: data.data?.accessToken,
      refreshToken: data.data?.refreshToken
    });
  } catch (error) {
    if (process.env.NEXT_PUBLIC_NODE_ENV_ENV === "development") {
      console.error("[/api/auth/refresh] Error:", error);
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Validates that a string is a well-formed JWT token.
 *
 * **JWT Format:**
 * ```
 * header.payload.signature
 * (base64).(base64).(base64)
 * ```
 *
 * **Validation Checks:**
 * - Exactly 3 parts separated by dots
 * - Each part contains at least 1 character
 * - Does NOT validate signature (backend does that)
 *
 * **Purpose:**
 * Prevents sending malformed tokens to backend, reducing unnecessary API calls
 * and potential backend errors.
 *
 * @param {string} token - Token string to validate
 * @returns {boolean} True if token has valid JWT format, false otherwise
 *
 * @example
 * ```typescript
 * isValidJWT("eyJhbGc.eyJzdWI.SflKxw")  // true
 * isValidJWT("invalid-token")              // false
 * isValidJWT("")                           // false
 * ```
 *
 * @see {@link POST} - Called before sending token to backend
 */
function isValidJWT(token: string): boolean {
  const parts = token.split(".");
  return parts.length === 3 && parts.every((p) => p.length > 0);
}
