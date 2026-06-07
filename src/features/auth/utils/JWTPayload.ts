import type { JwtPayload } from "../types/jwt";
import { jwtDecode } from "jwt-decode";
export function getUsernameFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub ? decoded.sub : null;
  } catch (error) {
    console.error("Error:", error);
    // Token không hợp lệ / decode lỗi
    return null;
  }
}
