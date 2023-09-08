import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id: number
      username: string
      firstName: string
      lastName: string
      role: string
      isActive: boolean
      avatar: string
    }

    backendTokens: {
      accessToken: string
      refreshToken: string
      expiresIn: number
    }
  }
}

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      _id: number
      username: string
      firstName: string
      lastName: string
      role: string
      isActive: boolean
      avatar: string
    }

    backendTokens: {
      accessToken: string
      refreshToken: string
      expiresIn: number
    }
  }
}
