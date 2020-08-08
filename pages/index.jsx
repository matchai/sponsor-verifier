import Head from "next/head";
import Heading from '../components/Heading';
import AddressForm from '../components/AddressForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sponsor @matchai</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>"
        ></link>
      </Head>

      <main className="max-w-2xl mx-auto pt-24 px-8">
        <Heading />
        <AddressForm />
      </main>
    </>
  );
}
