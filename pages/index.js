import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Sponsor @matchai</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>"
        ></link>
      </Head>

      <main class="max-w-xl mx-auto text-center pt-24">
        <img
          class="w-32 m-auto mb-4 rounded-full"
          src="https://github.com/matchai.png"
          alt="Matan Kushner (matchai)"
        />
        <h1 class="text-3xl md:text-4xl">
          Thank you for sponsoring <a href="http://github.com/matchai">me</a>!
        </h1>
        {!session && (
          <>
            <p class="text-lg mt-6 text-gray-600">
              I am incredibly greatful for your support and would like to send
              you the occasional sticker pack for the projects I'm working on 💌
            </p>

            <p class="text-sm mt-12 text-gray-500">
              Sign in to confirm your sponsorship
            </p>

            <button
              class="mt-3 rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-gray-900 hover:bg-gray-800 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md inline-flex items-center"
              onClick={() => signIn("github")}
            >
              <svg
                class="fill-current w-4 h-4 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Sign in with GitHub</span>
            </button>
          </>
        )}

        {session && (
          <>
            <input type="text" />
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </main>
    </>
  );
}
