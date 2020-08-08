import { graphql } from "@octokit/graphql";

export enum SponsorState {
  NotSponsor,
  SponsorBelowTier,
  SponsorMeetingTier,
}

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

const sponsorListQuery = `
{
  viewer {
    sponsorshipsAsMaintainer(first: 100, includePrivate: true) {
      nodes {
        sponsorEntity {
          ... on User {
            id
            login
          }
          ... on Organization {
            id
            login
          }
        }
        tier {
          monthlyPriceInDollars
        }
      }
    }
  }
}
`;

export async function sponsorPrice(githubNodeId): Promise<number> {
  const response = (await graphqlWithAuth(sponsorListQuery)) as any;
  const sponsorList = response.viewer.sponsorshipsAsMaintainer.nodes;
  const matchingSponsor = sponsorList.find(
    (sponsor) => sponsor.sponsorEntity.id === githubNodeId
  );

  if (!matchingSponsor) {
    return 0
  }

  return Number(matchingSponsor.tier.monthlyPriceInDollars);
}
