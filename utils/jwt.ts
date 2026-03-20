import jwt from 'jsonwebtoken';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload: object): string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = async (token: string) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    // Convert secret string to Uint8Array for jose
    const secret = new TextEncoder().encode(JWT_SECRET);

    // Verify the token
    const { payload } = await jose.jwtVerify(token, secret);

    // Return the decoded data (userId, email, etc.)
    return payload;
  } catch (error) {
    console.error("JWT_VERIFY_ERROR:", error);
    return null; // Return null so you can handle "Unauthorized" easily
  }
};