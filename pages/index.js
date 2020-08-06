import Head from "next/head";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Sponsor @matchai</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>"
        ></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Thank you for sponsoring{" "}
          <a href="http://github.com/matchai">@matchai</a>!
        </h1>
        {!session && (
          <p className={styles.description}>
            Redeem your stickers by signing in with GitHub:{" "}
            <button onClick={() => signIn("github")}>Sign in</button>
          </p>
        )}

        {session && (
          <>
            <input type="text" />
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </main>
    </div>
  );
}
