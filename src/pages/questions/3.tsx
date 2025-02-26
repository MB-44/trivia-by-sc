"use client";
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

const productsData: Record<string, { id: string; image: string; title: string; price: string }[]> = {
  "Oil Control & Balance": [
    { id: "1", image: "/product-img/Skin_Balance_-_Moringa_Herb_Discolouration_Treatment_Serum_30ml_-_Spa_Ceylon_Sri_Lanka-4365603.jpg", title: "Skin Balance - Moringa Herb Discolouration Treatment Serum 30ml (For Men)", price: "4,900.00 LKR" },
    { id: "2", image: "/product-img/Skin_Balance_-_Moringa_Herb_Clarifying_Clay_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4365580.jpg", title: "Skin Balance - Moringa Herb Clarifying Clay Masque 100g", price: "5,900.00 LKR" },
    { id: "3", image: "/product-img/Neem_Tea_Tree_-_Mattifying_All_Day_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4363284.jpg", title: "Neem & Tea Tree - Mattifying All Day Protector - 50g", price: "5,200.00 LKR" },
  ],
  "Skin Repair & Glow": [
    { id: "4", image: "/product-img/true_turmeric_-_serum_1.jpg", title: "True Turmeric - Vitamin C Glow - Renewing Treatment Serum 30ml", price: "5,600 LKR" },
    { id: "5", image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Deep_Cleansing_Facial_Balm_100ml_-_Spa_Ceylon_Sri_Lanka-4366288.jpg", title: "True Turmeric - Vitamin C Glow - Deep Cleansing Facial Balm 100ml", price: "5,200 LKR" },
  ],
  "Hydrated and Glowing": [
    { id: "5", image: "/images/hydrated1.jpg", title: "Hydrating Toner", price: "$24.99" },
    { id: "6", image: "/images/hydrated2.jpg", title: "Glowing Moisturizer", price: "$34.99" },
  ],
  Moisturized: [
    { id: "7", image: "/images/moisturizer1.jpg", title: "Deep Moisturizer", price: "$39.99" },
    { id: "8", image: "/images/moisturizer2.jpg", title: "Moisture Lock Cream", price: "$42.99" },
  ],
  "Calm & Soothed": [
    { id: "9", image: "/images/calm1.jpg", title: "Soothing Gel", price: "$19.99" },
    { id: "10", image: "/images/calm2.jpg", title: "Calming Cream", price: "$29.99" },
  ],
  Bright: [
    { id: "11", image: "/images/bright1.jpg", title: "Brightening Serum", price: "$39.99" },
    { id: "12", image: "/images/bright2.jpg", title: "Illuminating Cream", price: "$49.99" },
  ],
  Hydrated: [
    { id: "13", image: "/images/hydrated3.jpg", title: "Hydrating Essence", price: "$27.99" },
    { id: "14", image: "/images/hydrated4.jpg", title: "Moisture Boost Lotion", price: "$37.99" },
  ],
  Youthful: [
    { id: "15", image: "/images/youthful1.jpg", title: "Youth Restoring Serum", price: "$59.99" },
    { id: "16", image: "/images/youthful2.jpg", title: "Firming Cream", price: "$69.99" },
  ],
  "Clear & Acne-free (Active acne)": [
    { id: "17", image: "/images/clear1.jpg", title: "Acne Control Gel", price: "$25.99" },
    { id: "18", image: "/images/clear2.jpg", title: "Purifying Cleanser", price: "$32.99" },
  ],
  "Problem Free skin (occasional acne)": [
    { id: "19", image: "/images/problemfree1.jpg", title: "Spot Treatment", price: "$15.99" },
    { id: "20", image: "/images/problemfree2.jpg", title: "Balancing Lotion", price: "$28.99" },
  ],
  "Maintain youthful skin": [
    { id: "21", image: "/images/maintain1.jpg", title: "Anti-Aging Serum", price: "$49.99" },
    { id: "22", image: "/images/maintain2.jpg", title: "Rejuvenating Cream", price: "$59.99" },
  ],
  "Tighter & even skin tone": [
    { id: "23", image: "/images/tighter1.jpg", title: "Firming Elixir", price: "$54.99" },
    { id: "24", image: "/images/tighter2.jpg", title: "Even Tone Moisturizer", price: "$44.99" },
  ],
};

export default function Question3() {
  const router = useRouter();
  const [skinType, setSkinType] = useState<string | null>(null);
  const [selectedSubChoice, setSelectedSubChoice] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({}); // simple cart state

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

  if (!selectedSubChoice) {
    const subChoices = subChoicesMap[skinType] || [];
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>What&rsquo;s your main skincare goal?</h1>
        <p className={styles.subtitle}>Skin Type: {skinType}</p>
        <div className={styles.options}>
          {subChoices.map((choice) => (
            <button
              key={choice}
              className={styles.optionButton}
              onClick={() => {
                localStorage.setItem("skinSubChoice", choice);
                setSelectedSubChoice(choice);
              }}
            >
              {choice}
            </button>
          ))}
        </div>
        <div className={styles.navigation}>
          <button className={styles.backButton} onClick={() => router.push("/questions/2")}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const products = productsData[selectedSubChoice] || [];

  const handleAddToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: prev[productId] ? prev[productId] + 1 : 1,
    }));
    alert(`Product ${productId} added to cart.`);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Products for {selectedSubChoice}</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productPrice}>{product.price}</p>
            <button className={styles.addToCartButton} onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className={styles.navigation}>
        <button className={styles.backButton} onClick={() => setSelectedSubChoice(null)}>
          ← Back
        </button>
      </div>
    </div>
  );
}