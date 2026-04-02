import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_ACCESS_SECRET: string =
  process.env.JWT_ACCESS_SECRET || "access-secret-key";
const JWT_REFRESH_SECRET: string =
  process.env.JWT_REFRESH_SECRET || "refresh-secret-key";
const JWT_ACCESS_EXPIRES_IN: string =
  process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const JWT_REFRESH_EXPIRES_IN: string =
  process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN as any,
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as any,
  });
};

export const verifyAccessToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (
  token: string,
): { userId: string } | null => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
