import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { useState, useRef } from "react";
import useSWR, { mutate } from "swr";

const Spinner = (props) => (
  <svg
    className={`animate-spin m-auto ${props.className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>{" "}
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function Home() {
  const [session, loading] = useSession();
  const { data: address } = useSWR(session ? "/api/address" : null);

  const addressInput = useRef(null);
  const [submittingAddress, setSubmittingAddress] = useState(false);

  async function handleSubmitAddress() {
    const newAddress = addressInput.current.value;
    const body = { address: newAddress };

    mutate("/api/address", body, false);

    setSubmittingAddress(true);

    await fetch("/api/address", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSubmittingAddress(false);

    mutate("/api/address");
  }

  return (
    <>
      <Head>
        <title>Sponsor @matchai</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>"
        ></link>
      </Head>

      <main className="max-w-xl mx-auto pt-24">
        <div className="text-center">
          <a href="http://github.com/matchai">
            <img
              className="w-32 m-auto mb-4 inline rounded-full"
              src="https://github.com/matchai.png"
              alt="Matan Kushner (matchai)"
            />
          </a>
          <h1 className="text-3xl md:text-4xl">Thank you for sponsoring me!</h1>
          <p className="text-lg mt-6 mb-12 text-gray-600">
            I am incredibly greatful for your support and would like to send you
            the occasional sticker pack for the projects I'm working on 💌
          </p>
        </div>

        {loading && Spinner({ className: "h-6 w-6 text-gray-600" })}

        {!loading && !session && (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Sign in to confirm your sponsorship
            </p>

            <button
              className="mt-3 rounded px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-gray-900 hover:bg-gray-800 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md inline-flex items-center"
              onClick={() => signIn("github")}
            >
              <svg
                className="fill-current w-4 h-4 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Sign in with GitHub</span>
            </button>
          </div>
        )}

        {!loading && session && (
          <>
            <p className="text-md mb-2 text-gray-600">Full mailing address</p>
            <textarea
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal resize-none"
              type="text"
              rows="5"
              defaultValue={address?.address}
              ref={addressInput}
              placeholder="Matan Kushner
88 Colin P Kelly Jr St
San Francisco, CA 94107
United States"
            />

            <div className="flex items-center justify-between mt-5">
              <button
                className="rounded px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold leading-tight inline-flex items-center"
                onClick={handleSubmitAddress}
              >
                {submittingAddress ? (
                  <>
                    <Spinner className="h-5 w-5 mr-3 text-white" /> Saving...
                    
                  </>
                ) : (
                  <>Save address</>
                )}
              </button>

              <button className="text-gray-500" onClick={signOut}>
                Sign out
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
