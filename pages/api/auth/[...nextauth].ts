import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { sponsorPrice, SponsorState } from "./github";

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
      session.user.login = user.login;
      session.user.github_node_id = user.github_node_id;
      session.user.sponsor_amount = user.sponsor_amount;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const sponsorAmount = await sponsorPrice(user.github_node_id);
        token.login = profile.login
        token.github_node_id = profile.node_id;
        token.sponsor_amount = sponsorAmount;
      }
      return Promise.resolve(token);
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export default (req, res) => NextAuth(req, res, options);
