import { JWT_SECRET } from "../configs/env.js";
import jwt from "jsonwebtoken"

export function generateJwt():string {
  const payload = {
    iss: "nodeApp",
    iat: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
}
