export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/:path',
    '/users',
    '/courses',
    '/notes',
    '/users',
    '/parent',
    '/student',
    '/parent/students',
    '/student/courses',
    '/profile',
    '/tuitions',
    '/teacher/(.*)',
    '/teacher/courses/(.*)',
    '/parent/(.*)',
  ],
}
