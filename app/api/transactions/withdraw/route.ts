// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'; // Exemple d'un fournisseur

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Ajoutez d'autres fournisseurs si nécessaire
  ],
  // Autres options de configuration
};

export { authOptions };
export default NextAuth(authOptions);
