export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/:path', '/users', '/courses', '/notes', '/users'],
}
