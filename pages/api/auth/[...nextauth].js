import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "",
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      // Add github_id to session token
      session.github_id = user.github_id;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      // Add github_id to token on signin in
      if (isSignIn) token.github_id = profile.id;
      return Promise.resolve(token);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
