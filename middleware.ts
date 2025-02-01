import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/api/webhook"],
  afterAuth(auth, req, evt) {
    // Remove Clerk's default layout
    if (req.url.includes('/chat')) {
      return;
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
