import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface RequestBody {
  accessToken: string;
  refreshToken: string;
}
const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export async function POST(req: NextRequest) {
  console.log("Request received");
  try {
    console.log("Enter the try block");
    const reqBody = await req.json();
    const { accessToken, refreshToken }: RequestBody =
      reqBody as unknown as RequestBody;
    console.log(accessToken);
    console.log(refreshToken);
    if (!accessToken || !refreshToken) {
      throw new Error("Access token or refresh token is missing");
    }
    console.log("trying to set cookies");
    // Using res.cookies.set() to set cookies
    const decodedAccessToken = jwt.decode(accessToken) as JwtPayload | null;
    console.log("Decoded access token:", decodedAccessToken?.email);

    const response = NextResponse.json({ message: "Success" }, { status: 201 });
    response.cookies.set(`access_token`, accessToken, { expires });
    console.log("access");

    response.cookies.set(`refresh_token`, refreshToken);
    response.cookies.set("email", decodedAccessToken?.email, { expires });

    return response;
  } catch (e) {
    console.log("error");
    console.log(e);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
