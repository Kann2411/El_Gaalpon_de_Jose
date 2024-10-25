import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      role?: 'admin' | 'user' | 'coach';
      imgUrl?: string;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: 'admin' | 'user' | 'coach';
    imgUrl?: string;
  }
}