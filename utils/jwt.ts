import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload: object): string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): object | string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.verify(token, JWT_SECRET);
}