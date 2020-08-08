import Airtable, { Table, Record } from "airtable";
import { getSession } from "next-auth/client";

interface Row extends Airtable.FieldSet {
  "GitHub ID": string;
  "Mailing Address": string;
}

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base("Mailing Addresses") as Table<Row>;

export default async (req, res) => {
  const {
    method,
    body: { address },
  } = req;

  const session = await getSession({ req });
  const githubId: string = session.user.github_node_id;

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
    if (address) {
      await putAddress(githubId, address);
      return res.status(200).json({ message: "Submitted" });
    } else {
      await deleteRecord(githubId)
      return res.status(200).json({ message: "Address cleared" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

async function getRecord(githubId): Promise<Record<Row> | undefined> {
  const list = await table.select().firstPage();
  const record = list.find((record) => record.fields["GitHub ID"] === githubId);
  return record;
}

async function getAddress(githubId) {
  const record = await getRecord(githubId);
  if (!record) return;
  const address = record.fields["Mailing Address"];
  return address;
}

async function putAddress(githubId, address) {
  const record = await getRecord(githubId);
  if (record) {
    console.log(`Updating record: ${githubId}`);
    await updateRecord(record.id, address);
  } else {
    console.log(`Creating record: ${githubId}`);
    await createRecord(githubId, address);
  }
}

async function createRecord(githubId, address) {
  return table.create({
    "GitHub ID": githubId,
    "Mailing Address": address,
  });
}

async function updateRecord(recordId, address) {
  return table.update([
    {
      id: recordId,
      fields: {
        "Mailing Address": address,
      },
    },
  ]);
}

async function deleteRecord(githubId) {
  const record = await getRecord(githubId);
  return table.destroy([record.id]);
}
