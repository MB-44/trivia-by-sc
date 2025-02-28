import Head from "next/head";
import { useRouter } from "next/navigation";
import styles from "@/styles/Questions.module.css"
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
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <h1 className={styles.title}>Build Your Spa Ceylon</h1>
          <p className={styles.subtitle}>Not sure which Skincare products are right for you? <br />Check out this by touching Let's get started button</p>
          <button className={styles.optionButton} onClick={handleButton}>Let's Get Started</button>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}
