import NextAuth,{ NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",  // Usar JWT en lugar de cookies para la persistencia.
    maxAge: 24 * 60 * 60, // La sesión expira en 24 horas.
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const role = (profile as any).email?.includes('@admin.com') 
          ? 'admin' 
          : (profile as any).email?.includes('@coach.com') 
            ? 'coach' 
            : 'user';
        
        token.role = role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

// Exporta los métodos HTTP
const handler = NextAuth(authOptions);

export { handler as POST, handler as GET }; // Maneja las solicitudes POST
