import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(tr|en)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
