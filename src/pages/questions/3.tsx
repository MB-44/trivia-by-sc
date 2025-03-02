"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from "@/styles/Questions.module.css";

const subChoicesMap: Record<string, string[]> = {
  "Oily Skin": [
    "Oil Control & Balance", 
    "Skin Repair & Glow"
  ],
  "Dry & Dull Skin": [
    "Hydrated", 
    "Glowing and Moisturized"
  ],
  "Sensitive Skin": [
    "Calm & Soothed"
  ],
  "Normal": [
    "Bright", 
    "Hydrated", 
    "Youthful"
  ],
  "Acne-Prone": [
    "Clear & Acne-free (Active acne)",
    "Problem Free skin (occasional acne)",
  ],
  "Ageing": [
    "Maintain youthful skin", 
    "Tighter & even skin tone"
  ],
};

const productsData: Record<
  string,
  {
    id: string;
    image: string;
    title: string;
    price: string;
    ingredients: string;
    description: string;
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
      ingredients: "Aloe Vera, Licorice, Moringa, Watercress, Ceylon Tea",
      description:
        "A targeted serum designed to control excess oil and reduce discolouration.",
    },
    {
      id: "2",
      image:
        "/product-img/Skin_Balance_-_Moringa_Herb_Clarifying_Clay_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4365580.jpg",
      title: "Skin Balance - Moringa Herb Clarifying Clay Masque 100g",
      price: "5900.00 LKR",
      ingredients: "Aloe Vera,	Licorice,	Calendula,	Arnica,	Moringa",
      description:
        "A clarifying masque that helps to balance and refine the skin's texture.",
    },
    {
      id: "3",
      image: "/product-img/Neem_Tea_Tree_-_Mattifying_All_Day_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4363284.jpg",
      title: "Neem & Tea Tree - Mattifying All Day Protector - 50g",
      price: "5200.00 LKR",
      ingredients: "Neem,	Peppermint,	Tea Tree,	Arnica",
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
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Deep_Cleansing_Facial_Balm_100ml_-_Spa_Ceylon_Sri_Lanka-4366288.jpg",
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
  "Hydrated": [
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
  "Glowing and Moisturized": [
    {
      id: "10",
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Eye_Zone_-_Day_Night_Treatment_Concentrate_-_20ml_-_Spa_Ceylon_Sri_Lanka-4365011.jpg",
      title: "Sal & Saffron - Vitamin E Rich - Eye Zone - Day & Night Treatment Concentrate - 20ml",
      price: "5200.00 LKR",
      ingredients: "Sal, Saffron, Vitamin E",
      description:
        "A concentrated treatment for the eye area, reducing puffiness and dark circles."
    },
    {
      id: "11",
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Glow_Activating_Day_Facial_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4365035.jpg",
      title: "Sal & Saffron - Vitamin E Rich - Glow Activating Day Facial Protector - 50g",
      price: "5900.00 LKR",
      ingredients: "Sal, Saffron, Vitamin E",
      description:
        "A day facial protector that enhances skin glow while keeping it hydrated."
    },
    {
      id: "12",
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Ultra-Hydrating_Facial_Treatment_Gel_-_60ml_-_Spa_Ceylon_Sri_Lanka-4365048.jpg",
      title: "Sal & Saffron - Vitamin E Rich - Ultra-Hydrating Facial Treatment Gel - 60ml",
      price: "5900.00 LKR",
      ingredients: "Sal, Saffron, Hyaluronic Acid",
      description:
        "A treatment gel that delivers deep hydration and rejuvenates the skin."
    },
  ],
  "Calm & Soothed": [
    {
      id: "13",
      image: "/product-img/Lotus_Rambutan_-_Face_Care_Discovery_Set_-_Spa_Ceylon_Sri_Lanka-4362866.png",
      title: "Lotus & Rambutan - Face Care Discovery Set",
      price: "6900.00 LKR",
      ingredients: "Lotus, Rambutan, Herbal Extracts",
      description:
        "A discovery set ideal for calming sensitive skin and reducing irritation."
    },
    {
      id: "14",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B_Plus_Gentle_Face_Exfoliating_Masque_-_100g_-_Spa_Ceylon_Sri_Lanka-4362770.jpg",
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B Plus Gentle Face Exfoliating Masque - 100g",
      price: "5900.00 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B",
      description:
        "A gentle exfoliating masque that refreshes and soothes the skin."
    },
    {
      id: "15",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Day_Facial_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4362853.jpg",
      title: "Lotus & Rambutan - Active Cell Extract Vitamin B12 Day Facial Protector - 50g",
      price: "5900.00 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B12",
      description:
        "A day facial protector that helps maintain a calm and balanced complexion."
    },
    {
      id: "16",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Ultra-Hydrating_Day_Night_Treatment_50ml_-_Spa_Ceylon_Sri_Lanka-4362822.jpg",
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 Ultra-Hydrating Day & Night Treatment 50ml",
      price: "5900.00 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B12",
      description:
        "A versatile treatment providing hydration around the clock."
    },
    {
      id: "17",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Face_Treatment_Milk_Serum_-_30ml_-_Spa_Ceylon_Sri_Lanka-4362798.jpg",
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 Face Treatment Milk Serum - 30ml",
      price: "5900.00 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B12",
      description:
        "A milk serum that nourishes the skin with gentle, effective ingredients."
    },
    {
      id: "18",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_-_Facial_Cleansing_Foam_100ml_-_Spa_Ceylon_Sri_Lanka-4362786.jpg",
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 - Facial Cleansing Foam 100ml",
      price: "4900.00 LKR",
      ingredients: "Lotus, Rambutan, Vitamin B12",
      description:
        "A cleansing foam that removes impurities while maintaining skin balance."
    },
  ],
  "Bright": [
    {
      id: "19",
      image: "/product-img/true_turmeric_-_serum_1.jpg",
      title: "True Turmeric - Vitamin C Glow - Renewing Treatment Serum 30ml",
      price: "5600.00 LKR",
      ingredients: "Turmeric, Almond, Moringa, Rice Bran, Marigold",
      description: "A powerful overnight repair treatment infused with Ayurveda WonderHerbs & anti-oxidant, healing & calming Turmeric to help minimise dark patches, take-off dullness & control imperfections. Infused with an advanced natural pro-biotic complex to help rebalance skin, fortify natural defences & promote overall skin wellness. Aloe Vera, Witch Hazel & Marigold help hydrate & refresh skin, while Almond, Rice Bran, Moringa & Licorice combine to help minimise dark spots, even-out skin tone & boost visible youthfulness. Super-charged with natural Vitamin-C rich Rosehip & Pineapple enzymes to help energise & renew skin, adding a clear natural glow."
    },
    {
      id: "20",
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Deep_Cleansing_Facial_Balm_100ml_-_Spa_Ceylon_Sri_Lanka-4366288.jpg", 
      title: "True Turmeric - Vitamin C Glow - Deep Cleansing Facial Balm 100ml",
      price: "5200.00 LKR",
      ingredients: "Tumeric, Virigin Coconut, Sweet Almond",
      description: "Deep Cleansing & Make-up Removal: Apply & massage all over face & neck. Wipe off with cotton / warm wet towel & rinse thoroughly. Special care & awareness: In case of discomfort, decrease the duration & frequency of application. If irritation occurs, discontinue use & seek medical advice."
    },
    { 
      id: "21", 
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Exfoliating_Clay_Facial_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4366302.jpg", 
      title: "True Turmeric - Vitamin C Glow - Exfoliating Clay Facial Masque 100g", 
      price: "6,950 LKR",
      ingredients: "Turmeric, Kokum, Bearberry, Licorice",
      description: "Deep cleanse skin & apply thick layer, all over face & neck, avoiding eye area. Leave for 10 minutes. Wet skin & lightly massage with fingertips, using gentle circular motions. Wash off.Special care & awareness: In case of discomfort, decrease the duration & frequency of application. If irritation occurs, discontinue use & seek medical advice."
    },
    { 
      id: "22", 
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Renewing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4366371.jpg", 
      title: "True Turmeric - Vitamin C Glow - Renewing All-Day Protector 50g", 
      price: "5,400 LKR",
      ingredients: "Turmeric, Rice Bran, Licorice, Watercress",
      description: "Cleanse & tone skin. Using fingertips, apply lightly all over face & neck. Avoid eye area. Blend into skin & leave on. Special care & awareness: In case of discomfort, decrease the duration & frequency of application. If irritation occurs, discontinue use & seek medical advice."
    },
    { 
      id: "23", 
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Facial_Cleansing_Foam_150ml_-_Spa_Ceylon_Sri_Lanka-4366337.jpg", 
      title: "True Turmeric - Vitamin C Glow - Facial Cleansing Foam 150ml", 
      price: "4,800 LKR",
      ingredients: "Turmeric, Licorice, Moringa, Virgin Coconut, Watercress",
      description: "A soft-foaming formula infused with True Turmeric & powerful Ayurveda WonderHerbs to deep cleanse & purify skin, taking away dullness & imperfections. Virgin Coconut, Moringa, Neem, Kokum Butter & natural vitamins help improve overall skin wellness & revitalise skin. Turmeric combines with Aloe Vera, Licorice, Green Tea & Watercress to help inhibit formation of skin darkening cells & remove sun-tan. Super-charged with natural Vitamin-C rich Rosehip & Pineapple enzymes to help energise skin & promote a brighter natural glow. 150ml TUBE A soft-foaming formula infused with True Turmeric & naturally Vitamin-C rich powerful Ayurveda WonderHerbs to deep cleanse & purify skin, taking away dullness & imperfections. Virgin Coconut, Moringa, Neem, Kokum Butter & natural vitamins help improve overall skin health & revitalise skin. Turmeric combined with Rosehip, Pineapple Enzymes & Aloe Vera brighten skin & enhance natural glow."
    },
    { 
      id: "23", 
      image: "/product-img/True_Turmeric_-_Gold_Facial_Masque_-Vitamin_C_Glow_Brightening_Treatment_-_Spa_Ceylon_Sri_Lanka-4366241.jpg", 
      title: "True Turmeric - Gold Facial Masque -Vitamin C Glow Brightening Treatment", 
      price: "1,050 LKR",
      ingredients: "",
      description: ""
    },
    { 
      id: "23", 
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Anti-Pollution_Gel_Facial_Masque_60ml_-_Spa_Ceylon_Sri_Lanka-4366272.jpg", 
      title: "True Turmeric - Vitamin C Glow - Anti-Pollution Gel Facial Masque 60ml",
      price: "5,550 LKR",
      ingredients: "",
      description: ""
    },
  ],
  "Youthful": [
    { id: "15", 
      image: "/product-img/White_Rice_-_Nourishing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4367516.jpg",
      title: "White Rice - Nourishing All-Day Protector 50g", 
      price: "5,100 LKR",
      ingredients: "",
      description: "",
    },
  ],
  "Clear & Acne-free (Active acne)": [
    { 
      id: "17", 
      image: "/images/clear1.jpg", 
      title: "Acne Control Gel", 
      price: "$25.99",
      ingredients: "",
      description: "",
    },
    { 
      id: "18", 
      image: "/images/clear2.jpg", 
      title: "Purifying Cleanser", 
      price: "$32.99",
      ingredients: "",
      description: "",
    },
  ],
  "Problem Free skin (occasional acne)": [
    { 
      id: "19", 
      image: "/product-img/Skin_Balance_-_Moringa_Herb_Clarifying_Clay_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4365580.jpg", 
      title: "Skin Balance - Moringa Herb Clarifying Clay Masque 100g", 
      price: "5,900 LKR",
      ingredients : "",
      description: ""
    },
    { 
      id: "20", 
      image: "/product-img/Skin_Balance_-_Moringa_Neem_-_Clarifying_Clay_Facial_Exfoliator_100g_-_Spa_Ceylon_Sri_Lanka-4365571.jpg", 
      title: "Skin Balance - Moringa & Neem - Clarifying Clay Facial Exfoliator 100g", 
      price: "5,200 LKR",
      ingredients: "",
      description: "", 
    },
  ],
  "Maintain youthful skin" : [

  ],
  "Tighter & even skin tone": [

  ],
};

export default function Question3() {
  const router = useRouter();
  const [skinType, setSkinType] = useState<string | null>(null);
  const [selectedSubChoice, setSelectedSubChoice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  useEffect(() => {
    if (selectedSubChoice) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedSubChoice]);

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
            onClick={() => router.push("../../")}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Loading Products...</h1>
        <DotLottieReact 
          src="https://lottie.host/d5995d52-aa30-4b3f-b4ac-d71aa7edd195/nAwDsObOT4.lottie" 
          speed={1} 
          style={{width: "300px", height: "300px", margin: "0 auto"}}
          loop autoplay
          />
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