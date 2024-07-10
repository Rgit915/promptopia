import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],

  //This is called whenever a session is checked.
  async session({ session }) {

  },

  //This is called whenever a user signs in
  async signIn({ profile }) {
    try {
      // Connect to the database
      await connectToDB();

      // Check if a user already exists

      //ifnot, create a user
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
});

export { handler as GET, handler as POST };