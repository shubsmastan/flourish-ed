export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/classes/:path*", "/lessons/:path*"],
};
