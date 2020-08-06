import airtable from "airtable";
import { getSession } from "next-auth/client";

// Authenticate Airtable
const base = airtable.base(process.env.AIRTABLE_BASE_ID);

export default async (req, res) => {
  const {
    method,
    body: { address },
  } = req;

  const session = await getSession({ req });
  const githubId = String(session.user.github_id);

  if (method === "GET") {
    const address = await getAddress(githubId);
    if (!address) {
      return res
        .status(404)
        .json({ message: `User with the id: ${githubId} not found.` });
    }
    return res.status(200).json({ address });
  }

  if (method === "PUT") {
    await putAddress(githubId, address);
    return res.status(200).json({ id: githubId });
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

async function getRecord(githubId) {
  const list = await base("Mailing Addresses").select().firstPage();
  const record = list.find((record) => record.fields["GitHub ID"] === githubId);
  return record || null;
}

async function getAddress(githubId) {
  const record = await getRecord(githubId);
  const address = record.fields["Mailing Address"];
  return address;
}

async function putAddress(githubId, address) {
  const record = await getRecord(githubId);
  if (record) {
    await updateRecord(record.id, address);
  } else {
    await createRecord(githubId, address);
  }
}

async function createRecord(githubId, address) {
  return base("Mailing Addresses").create([
    {
      fields: {
        "GitHub ID": githubId,
        "Mailing Address": address,
      },
    },
  ]);
}

async function updateRecord(recordId, address) {
  return base("Mailing Addresses").update([
    {
      id: recordId,
      fields: {
        "Mailing Address": address,
      },
    },
  ]);
}
