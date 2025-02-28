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

const productsData: Record<
  string,
  {
    id: string;
    image: string;
    title: string;
    price: string;
    ingredients: string;
    description?: string;
  }[]
> = {
  "Oil Control & Balance": [
    {
      id: "1",
      image:
        "/product-img/Skin_Balance_-_Moringa_Herb_Discolouration_Treatment_Serum_30ml_-_Spa_Ceylon_Sri_Lanka-4365603.jpg",
      title:
        "Skin Balance - Moringa Herb Discolouration Treatment Serum 30ml (For Men)",
      price: "4900.00 LKR",
      ingredients: "Moringa, Herbal Extracts, Vitamins",
      description:
        "A targeted serum designed to control excess oil and reduce discolouration.",
    },
    {
      id: "2",
      image:
        "/product-img/Skin_Balance_-_Moringa_Herb_Clarifying_Clay_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4365580.jpg",
      title: "Skin Balance - Moringa Herb Clarifying Clay Masque 100g",
      price: "5900.00 LKR",
      ingredients: "Moringa, Clay, Herbal Extracts",
      description:
        "A clarifying masque that helps to balance and refine the skin's texture.",
    },
    {
      id: "3",
      image:
        "/product-img/Neem_Tea_Tree_-_Mattifying_All_Day_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4363284.jpg",
      title: "Neem & Tea Tree - Mattifying All Day Protector - 50g",
      price: "5200.00 LKR",
      ingredients: "Neem, Tea Tree, Natural Oils",
      description:
        "A lightweight protector that mattifies and shields your skin throughout the day.",
    },
  ],
  "Skin Repair & Glow": [
    {
      id: "4",
      image: "/product-img/true_turmeric_-_serum_1.jpg",
      title: "True Turmeric - Vitamin C Glow - Renewing Treatment Serum 30ml",
      price: "5600.00 LKR",
      ingredients: "Turmeric, Vitamin C, Botanical Extracts",
      description:
        "A renewing serum that promotes a glowing complexion while repairing skin.",
    },
    {
      id: "5",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Deep_Cleansing_Facial_Balm_100ml_-_Spa_Ceylon_Sri_Lanka-4366288.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Deep Cleansing Facial Balm 100ml",
      price: "5200.00 LKR",
      ingredients: "Turmeric, Vitamin C, Cleansing Agents",
      description:
        "A deep cleansing balm that gently removes impurities while brightening the skin.",
    },
    {
      id: "6",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Exfoliating_Clay_Facial_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4366302.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Exfoliating Clay Facial Masque 100g",
      price: "6950.00 LKR",
      ingredients: "Turmeric, Clay, Exfoliating Agents",
      description:
        "An exfoliating masque that refines skin texture and enhances radiance.",
    },
    {
      id: "7",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Renewing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4366371.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Renewing All-Day Protector 50g",
      price: "5400.00 LKR",
      ingredients: "Turmeric, Vitamin C, Antioxidants",
      description:
        "An all-day protector that nourishes and renews for a lasting glow.",
    },
  ],
  "Hydrated and Glowing": [
    {
      id: "8",
      image: "/product-img/Best-Oil-Cleanser.png",
      title: "Virgin Coconut - Facial Cleansing Oil 100ml",
      price: "4300.00 LKR",
      ingredients: "Virgin Coconut Oil, Mild Cleansers",
      description:
        "A gentle cleansing oil that leaves skin hydrated and glowing.",
    },
    {
      id: "9",
      image:
        "/product-img/Virgin_Coconut_-_Face_Body_Soothing_Serum_100ml_-_Spa_Ceylon_Sri_Lanka-4366806.jpg",
      title: "Virgin Coconut - Face & Body Soothing Serum 100ml",
      price: "3900.00 LKR",
      ingredients: "Virgin Coconut, Soothing Agents",
      description:
        "A soothing serum that calms and hydrates skin for a radiant finish.",
    },
  ],
  "Moisturized": [
    {
      id: "10",
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Eye_Zone_-_Day_Night_Treatment_Concentrate_-_20ml_-_Spa_Ceylon_Sri_Lanka-4365011.jpg",
      title: "Sal & Saffron - Vitamin E Rich - Eye Zone - Day & Night Treatment Concentrate - 20ml",
      price: "5,200LKR",
      ingredients: "Sal, Saffron, Vitamin E",
      description: "blah blah"
    },
    { id: "11", 
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Glow_Activating_Day_Facial_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4365035.jpg", 
      title: "Sal & Saffron - Vitamin E Rich - Glow Activating Day Facial Protector - 50g", 
      price: "5,900 LKR",
      ingredients: "Sal, Saffron, Vitamin E",
      description: "blah blah"
    },
    { id: "12", 
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Ultra-Hydrating_Facial_Treatment_Gel_-_60ml_-_Spa_Ceylon_Sri_Lanka-4365048.jpg", 
      title: "Sal & Saffron - Vitamin E Rich - Ultra-Hydrating Facial Treatment Gel - 60ml", 
      price: "5,900 LKR",
      ingredients: "Sal, Saffron, Vitamin E",
      description: "blah blah"
    },
  ],
  "Calm & Soothed": [
    { 
      id: "13", 
      image: "/product-img/Lotus_Rambutan_-_Face_Care_Discovery_Set_-_Spa_Ceylon_Sri_Lanka-4362866.png", 
      title: "Lotus & Rambutan - Face Care Discovery Set", 
      price: "6,900 LKR",
      ingredients: "Lotus, Rambutan",
      description: "blah blah" 
    },
    { 
      id: "14", 
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B_Plus_Gentle_Face_Exfoliating_Masque_-_100g_-_Spa_Ceylon_Sri_Lanka-4362770.jpg", 
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B Plus Gentle Face Exfoliating Masque - 100g", 
      price: "5,900 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B",
      description: "blah blah",
    },
    { 
      id: "15", 
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Day_Facial_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4362853.jpg", 
      title: "Lotus & Rambutan - Active Cell Extract Vitamin B12 Day Facial Protector - 50g", 
      price: "5,900 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B12",
      description: "blah blah",
    },
    { 
      id: "16", 
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Ultra-Hydrating_Day_Night_Treatment_50ml_-_Spa_Ceylon_Sri_Lanka-4362822.jpg", 
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 Ultra-Hydrating Day & Night Treatment 50ml", 
      price: "5,900 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B12",
      description: "blah blah"
    },
    { 
      id: "17", 
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Face_Treatment_Milk_Serum_-_30ml_-_Spa_Ceylon_Sri_Lanka-4362798.jpg", 
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 Face Treatment Milk Serum - 30ml", 
      price: "5,900 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B12",
      description: "blah blah"
    },
    { 
      id: "18", 
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_-_Facial_Cleansing_Foam_100ml_-_Spa_Ceylon_Sri_Lanka-4362786.jpg", 
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 - Facial Cleansing Foam 100ml", 
      price: "4,900 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B12",
      description: "blah blah"
    },
  ],
};

export default function Question3() {
  const router = useRouter();
  const [skinType, setSkinType] = useState<string | null>(null);
  const [selectedSubChoice, setSelectedSubChoice] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const storedSkinType = localStorage.getItem("skinType");
    if (!storedSkinType) {
      router.push("/questions/2");
    } else {
      setSkinType(storedSkinType);
    }
  }, [router]);

  if (!selectedSubChoice) {
    const subChoices = subChoicesMap[skinType!] || [];
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
          <button
            className={styles.backButton}
            onClick={() => router.push("/questions/2")}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const products = productsData[selectedSubChoice] || [];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Products for {selectedSubChoice}</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productPrice}>{product.price}</p>
            <button
              className={styles.infoButton}
              onClick={() => {
                setSelectedProduct(product);
                setShowInfo(true);
              }}
            >
              Info
            </button>
          </div>
        ))}
      </div>
      <div className={styles.navigation}>
        <button
          className={styles.backButton}
          onClick={() => setSelectedSubChoice(null)}
        >
          ← Back
        </button>
      </div>
      <div className={styles.startQuizButtonContainer}>
        <button
          className={styles.startQuizButton}
          onClick={() => {
            localStorage.removeItem("skinType");
            localStorage.removeItem("skinSubChoice");
            setSelectedSubChoice(null);
            setSkinType(null);
            router.push("/questions/1");
          }}
        >
          Start a New Quiz
        </button>
      </div>
      {showInfo && selectedProduct && (
        <div className={styles.cartModal}>
          <div className={styles.cartContent}>
            <button
              className={styles.closeCartButton}
              onClick={() => setShowInfo(false)}
            >
              &times;
            </button>
            <h2>{selectedProduct.title}</h2>
            <p className={styles.productDescription}>
              {selectedProduct.description || "No description available."}
            </p>
            <p className={styles.productIngredients}>
              Ingredients: {selectedProduct.ingredients}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
