import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
callbacks:{
  //This is called whenever a session is checked.
  async session({ session }) {
    // Find the user in the database by email
    const sessionUser = await User.findOne({
      email: session.user.email
    });
    // Attach the user's ID to the session object
    session.user.id = sessionUser._id.toString();
    return session;
  },

  //This is called whenever a user signs in
  async signIn({ profile }) {
    try {
      // Connect to the database
      await connectToDB();

      // Check if a user already exists
      const userExists = await User.findOne({
        email: profile.email
      });

      //if not, create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

});

export { handler as GET, handler as POST };