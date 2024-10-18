import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Asegúrate de que esto coincida con el tipo real que esperas
  }

  interface Session {
    user: {
      id: string; // Aquí agregas el id
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // Puedes añadir más propiedades si es necesario
    };
  }
}
