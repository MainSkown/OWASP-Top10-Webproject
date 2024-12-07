import jwt from "jsonwebtoken";

const secret = 'secret'

export function generateToken(
  username: string,
  user_id: number,
  isAdmin: boolean
): string {
  return jwt.sign(
    { username, user_id, isAdmin },
    secret,
    { expiresIn: "1h" }
  );
}

export function verifyToken(token: string): {
  username: string;
  user_id: number;
  isAdmin: boolean;
} {
  // Not verifying the token to enable token tempering as possible vector of attack
  return jwt.decode(token, { json: true }) as {
    username: string;
    user_id: number;
    isAdmin: boolean;
  };
}
