import { useRef } from "react";
import { useAddress, useSetAddress } from "./hooks";
import { signIn, signOut, useSession } from "next-auth/client";

import GitHub from "../svgs/github.svg";
import Spinner from "../svgs/spinner.svg";
import CheckCircle from "../svgs/check-circle.svg";
import XCircle from "../svgs/x-circle.svg";

export default function AddressForm() {
  const [session, loading] = useSession();
  const { data: address } = useAddress();
  const [setAddress, { data, isLoading, isSuccess, isError }] = useSetAddress();
  const addressInput = useRef(null);

  async function handleSubmitAddress() {
    const newAddress = addressInput.current.value;
    setAddress(newAddress);
  }

  if (loading) {
    return (
      <Spinner className="animate-spin mt-3 m-auto h-6 w-6 text-gray-600" />
    );
  }

  if (!session) {
    return (
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
    );
  }

  const sponsorAmount = session.user.sponsor_amount;
  if (sponsorAmount === 0) {
    return (
      <div className="text-center ">
        <p className="leading-relaxed">
          It looks like your account is not currently sponsoring{" "}
          <span className="font-semibold">@matchai</span>
          .<br />
          You can do so over on{" "}
          <a
            className="font-semibold text-blue-600"
            href="https://github.com/sponsors/matchai/"
          >
            this page
          </a>
          .
        </p>
        <button className="text-gray-500 mt-5" onClick={signOut}>
          Sign out
        </button>
      </div>
    );
  }

  if (sponsorAmount < 2) {
    return (
      <div className="text-center leading-relaxed">
        <p className="leading-relaxed">
          It looks like your account is not sponsored at the tier to recieve fun
          stickers. <br />
          You can increase your sponsorship level over on{" "}
          <a
            className="font-semibold text-blue-600"
            href="https://github.com/sponsors/matchai/"
          >
            this page
          </a>
          .
        </p>
        <button className="text-gray-500 mt-5" onClick={signOut}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
      @keyframes slideInFromLeft {
        0% {
          opacity: 0;
          transform: translateX(-10px);
        }
        20% {
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .notice {
        animation 500ms ease 0s slideInFromLeft;
      }
    `}</style>

      <p className="text-md mb-2 text-gray-600">Full mailing address</p>
      <textarea
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal resize-none"
        type="text"
        rows="5"
        defaultValue={address?.address}
        ref={addressInput}
        placeholder="John Smith
88 Colin P Kelly Jr St
San Francisco, CA 94107
United States"
      />

      <div className="flex items-center justify-between mt-5">
        <div className="flex">
          <button
            className="rounded px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold leading-tight inline-flex items-center"
            onClick={handleSubmitAddress}
          >
            {isLoading ? (
              <>
                <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Submitting...
              </>
            ) : (
              <>Submit</>
            )}
          </button>
          {isSuccess && (
            <div className="notice ml-3 inline-flex items-center font-semibold text-green-500">
              <CheckCircle className="mr-1 w-5 h-5 text-green-500" />{" "}
              {data.message}
            </div>
          )}

          {isError && (
            <div className="notice ml-3 inline-flex items-center font-semibold text-red-500">
              <XCircle className="mr-1 w-5 h-5 text-red-500" /> Failed to Submit
            </div>
          )}
        </div>

        <button className="text-gray-500" onClick={signOut}>
          Sign out
        </button>
      </div>
    </>
  );
}
