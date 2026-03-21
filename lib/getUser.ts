import { cookies } from "next/headers";
import { verifyToken } from "@/utils/jwt";

export const getUserFromRequest = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const decoded = await verifyToken(token);
    return decoded;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};