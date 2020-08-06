import airtable from "airtable";
import { getSession } from "next-auth/client";

// Authenticate Airtable
const base = airtable.base(process.env.AIRTABLE_BASE_ID);

export default async (req, res) => {
  const session = await getSession({ req });
  const githubId = String(session.github_id);

  if (req.method === "GET") {
    const address = await getAddress(githubId) || "";
    res.status(200).json({ address });
  }

  if (req.method === "PATCH") {
    const list = await base("Mailing Addresses").select().firstPage();

    const record = list.find((record) => record.fields["GitHub ID"] === githubId);
    if (!record) await base("Mailing Addresses").create([{
      "GitHub ID": githubId,
      "Mailing Address": "123 Fake Street, Montreal, Quebec"
    }])
  }
  // if (req.method === "POST") updateAddress(githubId);
};

async function getAddress(githubId) {
  const list = await base("Mailing Addresses").select().firstPage();

  const record = list.find((record) => record.fields["GitHub ID"] === githubId);
  if (!record) return null;

  const address = record.fields["Mailing Address"];
  return address;
}
