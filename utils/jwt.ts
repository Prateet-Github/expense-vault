import jwt from 'jsonwebtoken';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload: object): string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = async (token: string) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);

    const { payload } = await jose.jwtVerify(token, secret);

    return payload;
  } catch (error) {
    console.error("JWT_VERIFY_ERROR:", error);
    return null;
  }
};