import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  try {
    const decodedToken : any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error("Invalid token", error.message);
  }
}