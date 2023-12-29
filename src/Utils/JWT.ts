import jwt from "jsonwebtoken";

const HASH = process.env.JWT_HASH;

export const sign = (data: any) => jwt.sign(data, HASH, { expiresIn: "72h" });

export const decodeJWT = (access_token: string) =>
  jwt.verify(access_token, HASH);
