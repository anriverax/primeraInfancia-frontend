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
 * @async
 */
export async function POST() {
  try {
    /**
     * Retrieve the user's session from the server.
     * Contains JWT data including accessToken, refreshToken, and user info.
     */
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /**
     * Call the backend refresh-token endpoint.
     *
     * The refresh token is extracted from the session (JWT) and sent to the backend
     * to obtain a new accessToken. This keeps the refresh token on the server only.
     */
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${(session as any).refreshToken || (session as any).accessToken}`
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to refresh token" }, { status: response.status });
    }

    const data = await response.json();

    /**
     * Return the new tokens to the client.
     * The client's useAxios hook will update the session with these tokens.
     */
    return NextResponse.json({
      accessToken: data.data?.accessToken,
      refreshToken: data.data?.refreshToken
    });
  } catch (error) {
    console.error("[/api/auth/refresh] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
