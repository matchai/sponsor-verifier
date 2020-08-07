import Head from "next/head";
import GitHub from "../svgs/github.svg";
import Spinner from "../svgs/spinner.svg";
import { signIn, signOut, useSession } from "next-auth/client";
import { useAddress, useSetAddress } from "./hooks";
import { useRef } from "react";

export default function Home() {
  const [session, loading] = useSession();
  const { data: address } = useAddress();
  const [setAddress, { isLoading, isSuccess }] = useSetAddress();
  const addressInput = useRef(null);

  async function handleSubmitAddress() {
    const newAddress = addressInput.current.value;
    setAddress(newAddress);
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
              width="128"
              height="128"
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

        {loading && (
          <Spinner className="animate-spin mt-3 m-auto h-6 w-6 text-gray-600" />
        )}

        {!loading && !session && (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Sign in to confirm your sponsorship
            </p>

            <button
              className="mt-3 rounded px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-gray-900 hover:bg-gray-800 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md inline-flex items-center"
              onClick={() => signIn("github")}
            >
              <GitHub className="fill-current w-4 h-4 mr-3" />
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
                {isLoading ? (
                  <>
                    <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Saving...
                  </>
                ) : isSuccess ? (
                  <>Address Saved</>
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
