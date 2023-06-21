import jwt, { JwtPayload } from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET!;

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, jwt_secret);
    console.log(decoded);
    return decoded as JwtPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
