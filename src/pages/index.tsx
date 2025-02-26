import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButton = () => {
    router.push("questions/1")
  }

  return (
    <>
      <Head>
        <title>Spa Ceylon Trivia</title>
        <meta name="description" content="Created By Spa Ceylon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={`${styles.page}`}
      >
        <main className={styles.main}>
          <h1 className={styles.title}>Build Your Spa Ceylon Regime</h1>
          <p className={styles.paragraph}>Not sure which products are right for you? We'll help you find the right products for your skin with your very own bespoke Medik8 skincare regime – all in under 60 seconds! You're only 8 clicks away...</p>
          <button className={styles.startButton} onClick={handleButton}>Let's Get Started</button>
          {/* <div className={styles.ctas}></div> */}
        </main>
        <footer className={styles.footer}>
          {/* <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a> */}
        </footer>
      </div>
    </>
  );
}
