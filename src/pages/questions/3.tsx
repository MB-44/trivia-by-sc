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
  { id: string; image: string; title: string; price: string }[]
> = {
  "Oil Control & Balance": [
    {
      id: "1",
      image:
        "/product-img/Skin_Balance_-_Moringa_Herb_Discolouration_Treatment_Serum_30ml_-_Spa_Ceylon_Sri_Lanka-4365603.jpg",
      title:
        "Skin Balance - Moringa Herb Discolouration Treatment Serum 30ml (For Men)",
      price: "4900.00 LKR",
    },
    {
      id: "2",
      image:
        "/product-img/Skin_Balance_-_Moringa_Herb_Clarifying_Clay_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4365580.jpg",
      title: "Skin Balance - Moringa Herb Clarifying Clay Masque 100g",
      price: "5900.00 LKR",
    },
    {
      id: "3",
      image:
        "/product-img/Neem_Tea_Tree_-_Mattifying_All_Day_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4363284.jpg",
      title: "Neem & Tea Tree - Mattifying All Day Protector - 50g",
      price: "5200.00 LKR",
    },
  ],
  "Skin Repair & Glow": [
    {
      id: "4",
      image: "/product-img/true_turmeric_-_serum_1.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Renewing Treatment Serum 30ml",
      price: "5600.00 LKR",
    },
    {
      id: "5",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Deep_Cleansing_Facial_Balm_100ml_-_Spa_Ceylon_Sri_Lanka-4366288.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Deep Cleansing Facial Balm 100ml",
      price: "5200.00 LKR",
    },
    {
      id: "6",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Exfoliating_Clay_Facial_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4366302.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Exfoliating Clay Facial Masque 100g",
      price: "6950.00 LKR",
    },
    {
      id: "7",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Renewing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4366371.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Renewing All-Day Protector 50g",
      price: "5400.00 LKR",
    },
  ],
  "Hydrated and Glowing": [
    {
      id: "8",
      image: "/product-img/Best-Oil-Cleanser.png",
      title: "Virgin Coconut - Facial Cleansing Oil 100ml",
      price: "4300.00 LKR",
    },
    {
      id: "9",
      image:
        "/product-img/Virgin_Coconut_-_Face_Body_Soothing_Serum_100ml_-_Spa_Ceylon_Sri_Lanka-4366806.jpg",
      title: "Virgin Coconut - Face & Body Soothing Serum 100ml",
      price: "3900.00 LKR",
    },
  ],
  Moisturized: [
    {
      id: "10",
      image:
        "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Eye_Zone_-_Day_Night_Treatment_Concentrate_-_20ml_-_Spa_Ceylon_Sri_Lanka-4365011.jpg",
      title:
        "Sal & Saffron - Vitamin E Rich - Eye Zone - Day & Night Treatment Concentrate - 20ml",
      price: "5200.00 LKR",
    },
    {
      id: "11",
      image:
        "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Glow_Activating_Day_Facial_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4365035.jpg",
      title:
        "Sal & Saffron - Vitamin E Rich - Glow Activating Day Facial Protector - 50g",
      price: "5900.00 LKR",
    },
    {
      id: "12",
      image:
        "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Ultra-Hydrating_Facial_Treatment_Gel_-_60ml_-_Spa_Ceylon_Sri_Lanka-4365048.jpg",
      title:
        "Sal & Saffron - Vitamin E Rich - Ultra-Hydrating Facial Treatment Gel - 60ml",
      price: "5900.00 LKR",
    },
  ],
  "Calm & Soothed": [
    {
      id: "13",
      image:
        "/product-img/Lotus_Rambutan_-_Face_Care_Discovery_Set_-_Spa_Ceylon_Sri_Lanka-4362866.png",
      title: "Lotus & Rambutan - Face Care Discovery Set",
      price: "6900.00 LKR",
    },
    {
      id: "14",
      image:
        "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B_Plus_Gentle_Face_Exfoliating_Masque_-_100g_-_Spa_Ceylon_Sri_Lanka-4362770.jpg",
      title:
        "Lotus & Rambutan - Active Cell Extract + Vitamin B Plus Gentle Face Exfoliating Masque - 100g",
      price: "5900.00 LKR",
    },
    {
      id: "15",
      image:
        "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Day_Facial_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4362853.jpg",
      title:
        "Lotus & Rambutan - Active Cell Extract Vitamin B12 Day Facial Protector - 50g",
      price: "5900.00 LKR",
    },
    {
      id: "16",
      image:
        "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Ultra-Hydrating_Day_Night_Treatment_50ml_-_Spa_Ceylon_Sri_Lanka-4362822.jpg",
      title:
        "Lotus & Rambutan - Active Cell Extract + Vitamin B12 Ultra-Hydrating Day & Night Treatment 50ml",
      price: "5900.00 LKR",
    },
    {
      id: "17",
      image:
        "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Face_Treatment_Milk_Serum_-_30ml_-_Spa_Ceylon_Sri_Lanka-4362798.jpg",
      title:
        "Lotus & Rambutan - Active Cell Extract + Vitamin B12 Face Treatment Milk Serum - 30ml",
      price: "5900.00 LKR",
    },
    {
      id: "18",
      image:
        "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_-_Facial_Cleansing_Foam_100ml_-_Spa_Ceylon_Sri_Lanka-4362786.jpg",
      title:
        "Lotus & Rambutan - Active Cell Extract + Vitamin B12 - Facial Cleansing Foam 100ml",
      price: "4900.00 LKR",
    },
  ],
  Bright: [
    {
      id: "19",
      image: "/product-img/true_turmeric_-_serum_1.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Renewing Treatment Serum 30ml",
      price: "5600.00 LKR",
    },
    {
      id: "20",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Deep_Cleansing_Facial_Balm_100ml_-_Spa_Ceylon_Sri_Lanka-4366288.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Deep Cleansing Facial Balm 100ml",
      price: "5200.00 LKR",
    },
    {
      id: "21",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Exfoliating_Clay_Facial_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4366302.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Exfoliating Clay Facial Masque 100g",
      price: "6950.00 LKR",
    },
    {
      id: "22",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Renewing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4366371.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Renewing All-Day Protector 50g",
      price: "5400.00 LKR",
    },
    {
      id: "23",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Facial_Cleansing_Foam_150ml_-_Spa_Ceylon_Sri_Lanka-4366337.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Facial Cleansing Foam 150ml",
      price: "4800.00 LKR",
    },
    {
      id: "24",
      image:
        "/product-img/True_Turmeric_-_Gold_Facial_Masque_-Vitamin_C_Glow_Brightening_Treatment_-_Spa_Ceylon_Sri_Lanka-4366241.jpg",
      title:
        "True Turmeric - Gold Facial Masque -Vitamin C Glow Brightening Treatment",
      price: "1050.00 LKR",
    },
    {
      id: "25",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Anti-Pollution_Gel_Facial_Masque_60ml_-_Spa_Ceylon_Sri_Lanka-4366272.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Anti-Pollution Gel Facial Masque 60ml",
      price: "5550.00 LKR",
    },
  ],
  Hydrated: [],
  Youthful: [
    {
      id: "26",
      image:
        "/product-img/White_Rice_-_Nourishing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4367516.jpg",
      title: "White Rice - Nourishing All-Day Protector 50g",
      price: "5100.00 LKR",
    },
  ],
  "Clear & Acne-free (Active acne)": [
    {
      id: "27",
      image: "/images/clear1.jpg",
      title: "Acne Control Gel",
      price: "2599.00 LKR",
    },
    {
      id: "28",
      image: "/images/clear2.jpg",
      title: "Purifying Cleanser",
      price: "3299.00 LKR",
    },
  ],
  "Problem Free skin (occasional acne)": [
    {
      id: "29",
      image:
        "/product-img/Skin_Balance_-_Moringa_Herb_Clarifying_Clay_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4365580.jpg",
      title:
        "Skin Balance - Moringa Herb Clarifying Clay Masque 100g",
      price: "5900.00 LKR",
    },
    {
      id: "30",
      image:
        "/product-img/Skin_Balance_-_Moringa_Neem_-_Clarifying_Clay_Facial_Exfoliator_100g_-_Spa_Ceylon_Sri_Lanka-4365571.jpg",
      title:
        "Skin Balance - Moringa & Neem - Clarifying Clay Facial Exfoliator 100g",
      price: "5200.00 LKR",
    },
  ],
  "Maintain youthful skin": [],
  "Tighter & even skin tone": [],
};

export default function Question3() {
  const router = useRouter();
  const [skinType, setSkinType] = useState<string | null>(null);
  const [selectedSubChoice, setSelectedSubChoice] = useState<string | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    const storedSkinType = localStorage.getItem("skinType");
    if (!storedSkinType) {
      router.push("/questions/2");
    } else {
      setSkinType(storedSkinType);
    }
  }, [router]);

  const increaseQuantity = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId: string) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [productId]: current - 1,
        };
      }
    });
  };

  const parsePrice = (priceStr: string) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  };

  if (!skinType) {
    return null;
  }

  if (!selectedSubChoice) {
    const subChoices = subChoicesMap[skinType] || [];
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <button className={styles.cartButton} onClick={() => setShowCart(true)}>
            Cart ({Object.keys(cart).length})
          </button>
        </header>
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
        {showCart && (
          <div className={styles.cartModal}>
            <div className={styles.cartContent}>
              <button className={styles.closeCartButton} onClick={() => setShowCart(false)}>
                &times;
              </button>
              <h2>Your Cart</h2>
              {Object.keys(cart).length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div>
                  {

                  }
                  {selectedSubChoice && productsData[selectedSubChoice]
                    .filter((product) => cart[product.id])
                    .map((product) => {
                      const quantity = cart[product.id];
                      const price = parsePrice(product.price);
                      return (
                        <div key={product.id} className={styles.cartItem}>
                          <img src={product.image} alt={product.title} className={styles.cartItemImage} />
                          <div className={styles.cartItemDetails}>
                            <p className={styles.cartItemTitle}>{product.title}</p>
                            <p className={styles.cartItemQuantity}>Quantity: {quantity}</p>
                            <p className={styles.cartItemPrice}>Price: {product.price}</p>
                            <p className={styles.cartItemTotal}>Total: {(price * quantity).toFixed(2)} LKR</p>
                          </div>
                        </div>
                      );
                    })}
                  <hr />
                  <p className={styles.cartTotal}>
                    Grand Total:{" "}
                    {selectedSubChoice && productsData[selectedSubChoice]
                      .filter((product) => cart[product.id])
                      .reduce((acc, product) => {
                        const quantity = cart[product.id];
                        const price = parsePrice(product.price);
                        return acc + price * quantity;
                      }, 0)
                      .toFixed(2)}{" "}
                    LKR
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  const products = productsData[selectedSubChoice] || [];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.cartButton} onClick={() => setShowCart(true)}>
          Cart ({Object.keys(cart).length})
        </button>
      </header>
      <h1 className={styles.title}>Products for {selectedSubChoice}</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => {
          const quantity = cart[product.id] || 0;
          return (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.title} className={styles.productImage} />
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productPrice}>{product.price}</p>
              {quantity === 0 ? (
                <button className={styles.addToCartButton} onClick={() => increaseQuantity(product.id)}>
                  Add to Cart
                </button>
              ) : (
                <div className={styles.quantityControls}>
                  <button className={styles.decrementButton} onClick={() => decreaseQuantity(product.id)}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button className={styles.incrementButton} onClick={() => increaseQuantity(product.id)}>
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.navigation}>
        <button className={styles.backButton} onClick={() => setSelectedSubChoice(null)}>
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
            setCart({});
            router.push("/../");
          }}
        >
          Start a New Quiz
        </button>
      </div>
      {showCart && (
        <div className={styles.cartModal}>
          <div className={styles.cartContent}>
            <button className={styles.closeCartButton} onClick={() => setShowCart(false)}>
              &times;
            </button>
            <h2>Your Cart</h2>
            {Object.keys(cart).length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {products
                  .filter((product) => cart[product.id])
                  .map((product) => {
                    const quantity = cart[product.id];
                    const price = parsePrice(product.price);
                    return (
                      <div key={product.id} className={styles.cartItem}>
                        <img src={product.image} alt={product.title} className={styles.cartItemImage} />
                        <div className={styles.cartItemDetails}>
                          <p className={styles.cartItemTitle}>{product.title}</p>
                          <p className={styles.cartItemQuantity}>Quantity: {quantity}</p>
                          <p className={styles.cartItemPrice}>Price: {product.price}</p>
                          <p className={styles.cartItemTotal}>Total: {(price * quantity).toFixed(2)} LKR</p>
                        </div>
                      </div>
                    );
                  })}
                <hr />
                <p className={styles.cartTotal}>
                  Grand Total:{" "}
                  {products
                    .filter((product) => cart[product.id])
                    .reduce((acc, product) => {
                      const quantity = cart[product.id];
                      const price = parsePrice(product.price);
                      return acc + price * quantity;
                    }, 0)
                    .toFixed(2)}{" "}
                  LKR
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
