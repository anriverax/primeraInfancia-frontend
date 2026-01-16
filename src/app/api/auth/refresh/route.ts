/**
 * POST /api/auth/refresh
 * Server-side token refresh endpoint for secure session token updates.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/infrastructure/nextAuth";
import { NextResponse } from "next/server";

/**
 * Refreshes JWT and refresh tokens using server session.
 * @returns JSON with new accessToken and refreshToken.
 * @throws 401 if no refresh token or invalid token format.
 * @throws 500 on server errors.
 */
export async function POST() {
  try {
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
 * Validates JWT format (three dot-separated parts).
 * @param token - Token string to validate.
 * @returns True if valid JWT format.
 */
function isValidJWT(token: string): boolean {
  const parts = token.split(".");
  return parts.length === 3 && parts.every((p) => p.length > 0);
}
