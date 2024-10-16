import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

 const Handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});

export { Handler as GET, Handler as POST };
