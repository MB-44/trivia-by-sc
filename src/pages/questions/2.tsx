import { useRouter } from "next/navigation";
import styles from "@/styles/Questions.module.css";

export default function Question2() {
  const router = useRouter();

  const handleOptionClick = (value: string) => {
    localStorage.setItem("skinType", value);

    router.push("/questions/3");
    // alert("Skin type saved: " + value + ". Next page or results would be here.");
  };

  const handleBack = () => {
    router.push("/questions/1");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>What’s your skin type?</h1>
      <div className={styles.options}>
        <button className={styles.optionButton} onClick={() => handleOptionClick("Oily Skin")}>
          Oily Skin
        </button>
        <button className={styles.optionButton} onClick={() => handleOptionClick("Dry & Dull Skin")}>
          Dry & Dull Skin
        </button>
        <button className={styles.optionButton} onClick={() => handleOptionClick("Sensitive Skin")}>
          Sensitive Skin
        </button>
        <button className={styles.optionButton} onClick={() => handleOptionClick("Normal")}>
          Normal
        </button>
        <button className={styles.optionButton} onClick={() => handleOptionClick("Acne-Prone")}>
          Acne-Prone
        </button>
        <button className={styles.optionButton} onClick={() => handleOptionClick("Ageing")}>
          Ageing
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
