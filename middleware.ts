import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export const runtime = 'edge'; // Required for Clerk middleware on edge

// Define all the routes you want to protect
const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

// Main middleware handler
export default clerkMiddleware((auth, req) => {
  if (protectedRoute(req)) {
    auth().protect(); // Require authentication
  }
});

// Match only the necessary routes — avoid over-matching everything!
export const config = {
  matcher: [
    '/',
    '/upcoming',
    '/meeting/:path*',
    '/previous',
    '/recordings',
    '/personal-room',
  ],
};
