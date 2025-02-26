import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/Questions.module.css";

const subChoicesMap: Record<string, string[]> = {
  "Oily Skin": ["Oil Control & Balance", "Skin Repair & Glow"],
  "Dry & Dull Skin": ["Hydrated and Glowing", "Moisturized"],
  "Sensitive Skin": ["Calm & Soothed"],
  Normal: ["Bright", "Hydrated", "Youthful"],
  "Acne-Prone": [
    "Clear & Acne-free (Active acne)",
    "Problem Free skin (occasional acne)",
  ],
  Ageing: ["Maintain youthful skin", "Tighter & even skin tone"],
};

export default function Question3() {
  const router = useRouter();
  const [skinType, setSkinType] = useState<string | null>(null);

  useEffect(() => {
    const storedSkinType = localStorage.getItem("skinType");
    if (!storedSkinType) {
      router.push("/questions/2");
    } else {
      setSkinType(storedSkinType);
    }
  }, [router]);

  if (!skinType) {
    return null;
  }

  const subChoices = subChoicesMap[skinType] || [];

  const handleSubChoiceClick = (choice: string) => {
    localStorage.setItem("skinSubChoice", choice);
    alert(`Sub-choice saved: ${choice}. Next page would go here.`);
    // e.g. router.push("/questions/4") or "/results"
  };

  const handleBack = () => {
    router.push("/questions/2");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>What&rsquo;s your main skincare goal?</h1>
      <p className={styles.subtitle}>Skin Type: {skinType}</p>
      <div className={styles.options}>
        {subChoices.map((choice) => (
          <button
            key={choice}
            className={styles.optionButton}
            onClick={() => handleSubChoiceClick(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      <div className={styles.navigation}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}
