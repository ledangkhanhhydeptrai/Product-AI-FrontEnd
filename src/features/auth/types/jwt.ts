import type { UserRole } from "../authApi";

export interface JwtPayload {
  sub: string;
  exp: number;
  role: UserRole;
  iat: number;
}
export function decodeJwt(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}