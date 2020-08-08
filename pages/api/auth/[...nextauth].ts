import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { checkSponsorship, SponsorState } from "./github";

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
      const tier = await checkSponsorship(user.github_node_id);
      if (tier !== SponsorState.SponsorMeetingTier)
        return Promise.reject(
          new Error("Not meeing the required sponsor tier.")
        );

      // Add github_id to session token
      session.user.github_node_id = user.github_node_id;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;

      // Add github_id to token on signin in
      if (isSignIn) token.github_node_id = profile.node_id;
      return Promise.resolve(token);
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export default (req, res) => NextAuth(req, res, options);
