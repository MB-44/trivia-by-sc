import { useRouter } from "next/navigation";
import styles from "@/styles/Questions.module.css";

export default function Question1() {
  const router = useRouter();

  const handleOptionClick = (value: string) => {
    localStorage.setItem("ageGroup", value);

    router.push("/questions/2");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>What’s your age group?</h1>
      <div className={styles.options}>
        <button className={styles.optionButton} onClick={() => handleOptionClick("Below 24")}>
          Below 24
        </button>
        <button className={styles.optionButton} onClick={() => handleOptionClick("25 - 35")}>
          25 - 35
        </button>
        <button className={styles.optionButton} onClick={() => handleOptionClick("35 & above")}>
          35 & above
        </button>
      </div>
      <div className={styles.navigation}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}
