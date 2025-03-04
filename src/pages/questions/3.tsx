"use client";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from "@/styles/Questions.module.css";

const subChoicesMap: Record<string, string[]> = {
  "Oily Skin": ["Oil Control & Balance", "Skin Repair & Glow"],
  "Dry & Dull Skin": ["Hydrated", "Glowing and Moisturized"],
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
    description: string;
    ingredientDetails?: {
      name: string;
      image: string;
      description: string;
    }[];
  }[]
> = {
  "Oil Control & Balance": [
    {
      id: "1",
      image:
        "/product-img/Skin_Balance_-_Moringa_Herb_Discolouration_Treatment_Serum_30ml_-_Spa_Ceylon_Sri_Lanka-4365603.jpg",
      title:
        "Skin Balance - Moringa Herb Discolouration Treatment Serum 30ml (For Men)",
      price: "4,900.00 LKR",
      description:
        "An advanced skin resurfacing treatment infused with deep-penetrating Ayurveda Wonderherbs. Moringa & Natural pro-biotics help strengthen skin Balance & minimise UV-induced sun damage. For blemished, blotchy, uneven skin & problem skin that seeks soothing Balance, freshness & new radiance.",
      ingredientDetails: [
        {
          name: "Aloe Vera",
          image: "/ingredient-img/Aloe-Vera.png",
          description: "Hydrates & refreshes skin, treating dryness.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        },
        {
          name: "Moringa",
          image: "/ingredient-img/Moringa.png",
          description: "Rich in antibacterial & nourishing properties. Boosts collagen & minimizes skin imperfections.",
        },
        {
          name: "Watercress",
          image: "/ingredient-img/Watercress.png",
          description: "Rich in Vitamin C. Increases collagen production & reduces cellulite & wrinkles.",
        },
        {
          name: "Ceylon Tea",
          image: "/ingredient-img/Ceylon-Tea.png",
          description: "Packed with antioxidants. Protects against free radicals & premature aging effects.",
        },
      ],
    },
    {
      id: "2",
      image:
        "/product-img/Skin_Balance_-_Moringa_Herb_Clarifying_Clay_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4365580.jpg",
      title: "Skin Balance - Moringa Herb Clarifying Clay Masque 100g",
      price: "5900.00 LKR",
      description:
        "An intense soothing, purifying &amp; refreshing formula to help control problem skin &amp; restore natural skin balance.",
      ingredientDetails: [
        {
          name: "Aloe Vera",
          image: "/ingredient-img/Aloe-Vera.png",
          description: "Hydrates & refreshes skin, treating dryness.",
        }, 
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        }, 
        {
          name: "Calendula",
          image: "/ingredient-img/Calendula.png",
          description: "Relieves skin of flakiness & itchiness, aids in sustaining soothes & hydrated skin.",
        }, 
        {
          name: "Moringa",
          image: "/ingredient-img/Moringa.png",
          description: "Rich in antibacterial & nourishing properties. Controls problem skin & restores natural balance.",
        }, 
        {
          name: "Arnica",
          image: "/ingredient-img/Arnica.png",
          description : "Rich in anti-inflammatory properties. Promotes soothing & healing."
        }
      ],
    },
    {
      id: "3",
      image:
        "/product-img/Neem_Tea_Tree_-_Mattifying_All_Day_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4363284.jpg",
      title: "Neem & Tea Tree - Mattifying All Day Protector - 50g",
      price: "5200.00 LKR",
      description:
        "An instantly-absorbent non-oily formula to help keep skin looking matte &amp; oil-free for longer.",
      ingredientDetails: [
        {
          name: "Neem",
          image: "/ingredient-img/Neem.png",
          description : "Rich in anti-bacterial & anti-inflammatory properties. Soothes & cools skin irritations."
        }, 
        { 
          name : "Peppermint",
          image : "/ingredient-img/Peppermint.png",
          description: "Rich in antiseptic & antibacterial properties. Soothes skin irritations & inflammations caused by acne."
        }, 
        {
          name : "Tea Tree",
          image: "/ingredient-img/Tea-Tree.png",
          description : "Calms redness and inflammation."
        }, 
        { 
          name : "Arnica",
          image: "/ingredient-img/Arnica.png",
          description: "Rich in anti-inflammatory properties. Promotes soothing & healing."
        }
      ],
    },
  ],
  "Skin Repair & Glow": [
    {
      id: "4",
      image: "/product-img/true_turmeric_-_serum_1.jpg",
      title: "True Turmeric - Vitamin C Glow - Renewing Treatment Serum 30ml",
      price: "5600.00 LKR",
      description:
        "A powerful overnight repair treatment infused with Ayurveda Wonder herbs &amp; anti-oxidant, healing &amp; calming Turmeric to help minimize dark patches, take-off dullness &amp; control imperfections.",
      ingredientDetails: [
          {
            name: "Turmeric",
            image: "/ingredient-img/Turmeric.png",
            description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
          },
          {
            name: "Almond",
            image: "/ingredient-img/Almond.png",
            description: "Rich in vitamin E, to nourish & soften skin.",
          },
          {
            name: "Moringa",
            image: "/ingredient-img/Moringa.png",
            description: "Rich in antibacterial & nourishing properties. Boosts collagen & minimizes skin imperfections.",
          },
          {
            name: "Rice Bran",
            image: "/ingredient-img/Rice-Bran.png",
            description: "Rich in antioxidants. Nourishes skin & protects skin from environmental damage. Preserve youthful skin.",
          },
          {
            name: "Marigold",
            image: "/ingredient-img/Marigold.png",
            description: "Rich in antiseptic and anti-inflammatory properties. Promotes healing & accelerates the regeneration of new cells.",
          },
        ],
    },
    {
      id: "5",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Deep_Cleansing_Facial_Balm_100ml_-_Spa_Ceylon_Sri_Lanka-4366288.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Deep Cleansing Facial Balm 100ml",
      price: "5200.00 LKR",
      description:
        "A powerful blend of Ayurveda Wonderherbs infused with anti-oxidant, healing &amp; calming Turmeric to intensely purify &amp; Energise skin. Virgin Coconut &amp; Sweet Almond help instantly deep cleanse the skin, dissolving makeup, daily grime &amp; pollutants.",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description : "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates."
        }, 
        {
          name: "Sweet Almond",
          image: "/ingredient-img/Sweet-Almond.png",
          description: "Reduces puffiness & under-eye circles. Treats dry skin & reverses sun damage. Enhances overall skin health."
        }
      ]
    },
    {
      id: "6",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Exfoliating_Clay_Facial_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4366302.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Exfoliating Clay Facial Masque 100g",
      price: "6950.00 LKR",
      description:
        "A powerful blend of Ayurveda Wonderherbs infused with anti-oxidant, healing &amp; calming Turmeric to intensely purify &amp; Energise skin. Virgin Coconut &amp; Sweet Almond help instantly deep cleanse skin, dissolving makeup, daily grime &amp; pollutants.",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        }, 
        {
          name: "Kokum",
          image: "/ingredient-img/Kokum.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Soothes & heals inflamed damaged skin."
        },
        {
          name: "Bearberry",
          image: "/ingredient-img/Bearberry.png",
          description: "A natural skin brightener. Evens out skin tones by eliminating age spots & acne scars."
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits."
        }
      ],
    },
    {
      id: "7",
      image:
        "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Renewing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4366371.jpg",
      title:
        "True Turmeric - Vitamin C Glow - Renewing All-Day Protector 50g",
      price: "5400.00 LKR",
      description:
        "A fast-absorbent blend of Ayurveda Wonderherbs infused with calming, anti-oxidant &amp; fortifying Turmeric, Rice Bran &amp; Marigold, to help minimise dark patches, take-away dullness &amp; control imperfections.",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        },
        {
          name: "Rice Bran",
          image: "/ingredient-img/Rice-Bran.png",
          description: "Rich in antioxidants. Nourishes skin & protects skin from environmental damage. Preserve youthful skin.",
        },
        {
          name: "Watercress",
          image: "/ingredient-img/Watercress.png",
          description: "Rich in Vitamin C. Increases collagen production & reduces cellulite & wrinkles.",
        }
      ],
    },
  ],
  "Hydrated": [
    {
      id: "8",
      image: "/product-img/Best-Oil-Cleanser.png",
      title: "Virgin Coconut - Facial Cleansing Oil 100ml",
      price: "4300.00 LKR",
      description:
        "An extra-gentle purifying formula, blended with pure Virgin Coconut Oil - naturally cold pressed at source from the finest fresh coconuts hand-picked from the lush tropical gardens of Ceylon. Rich in nourishing vitamins &amp; protective anti-oxidants to help protect skin against dryness &amp; improve natural skin balance.",
      ingredientDetails: [
        {
          name: "Aloe Vera",
          image : "/ingredient-img/Aloe-Vera.png",
          description: "Hydrates & refreshes skin, treating dryness"
        },
        {
          name: "Olive",
          image: "/ingredient-img/Olive.png",
          description: "Protects & hydrates the most sensitive of skins."
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates."
        },
        {
          name: "Watercress",
          image: "/ingredient-img/Watercress.png",
          description: "Rich in Vitamin C. Increases collagen production & reduces cellulite & wrinkles."
        },
        {
          name: "Bearberry",
          image: "/ingredient-img/Bearberry.png",
          description: "A natural skin brightener. Evens out skin tones by eliminating age spots & acne scars."
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits."
        }
      ],
    },
    {
      id: "9",
      image:
        "/product-img/Virgin_Coconut_-_Face_Body_Soothing_Serum_100ml_-_Spa_Ceylon_Sri_Lanka-4366806.jpg",
      title: "Virgin Coconut - Face & Body Soothing Serum 100ml",
      price: "3900.00 LKR",
      description:
        "A 100% natural serum of pure Virgin Coconut Oil naturally cold pressed at source from the finest fresh coconuts hand-picked from the lush tropical gardens of Ceylon.",
      ingredientDetails: [
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates."
        },
        {
          name: "Moringa",
          image: "/ingredient-img/Moringa.png",
          description: "Rich in antibacterial & nourishing properties. Controls problem skin & restores natural balance."
        },
        {
          name: "Watercress",
          image: "/ingredient-img/Watercress.png",
          description: "Rich in Vitamin C. Increases collagen production & reduces cellulite & wrinkles."
        },
        {
          name: "Vetiver",
          image: "/ingredient-img/Vetiver.png",
          description: "Enriched with calming & cooling properties. Balances skin's PH & even's out skin tones."
        },
      ],
    },
  ],
  "Glowing and Moisturized": [
    {
      id: "10",
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Eye_Zone_-_Day_Night_Treatment_Concentrate_-_20ml_-_Spa_Ceylon_Sri_Lanka-4365011.jpg",
      title: "Sal & Saffron - Vitamin E Rich - Eye Zone - Day & Night Treatment Concentrate - 20ml",
      price: "5200.00 LKR",
      description:
        "A powerful targeted treatment infused with nourishing Sal Butter &amp; precious Saffron to help soothe &amp; protect skin around &amp; under the eyes, defending against visible signs of skin aging.",
      ingredientDetails: [
        {
          name: "Saffron",
          image: "/ingredient-img/Saffron.png",
          description: "Saffron helps to deeply nourish, treat & rejuvenate skin, boosting skin elasticity & promoting a brighter natural glow."
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates."
        },
        {
          name: "Avocado",
          image: "/ingredient-img/Avocado.png",
          description: "Deeply nourishes, softens & hydrates the skin. Smoothens skin & boosts skin's immunity."
        },
        {
          name: "Rice-Bran.png",
          image: "/ingredient-img/Rice-Bran.png",
          description: "Rich in antioxidants. Nourishes skin & protects skin from environmental damage. Preserve youthful skin."
        }
      ],
    },
    {
      id: "11",
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Glow_Activating_Day_Facial_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4365035.jpg",
      title: "Sal & Saffron - Vitamin E Rich - Glow Activating Day Facial Protector - 50g",
      price: "5900.00 LKR",
      description:
        "A light, fast-absorbent blend of nourishing Sal Butter &amp; precious Saffron, to soothe &amp; control dryness, while keep skin looking fresh &amp; matte throughout the day.",
      ingredientDetails: [
        {
          name: "Saffron",
          image: "/ingredient-img/Saffron.png",
          description: "Saffron helps to deeply nourish, treat & rejuvenate skin, boosting skin elasticity & promoting a brighter natural glow."
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates."
        },
        {
          name: "Almond",
          image: "/ingredient-img/Almond.png",
          description: "Rich in vitamin E, to nourish & soften skin."
        }
      ],
    },
    {
      id: "12",
      image: "/product-img/Sal_Saffron_-_Vitamin_E_Rich_-_Ultra-Hydrating_Facial_Treatment_Gel_-_60ml_-_Spa_Ceylon_Sri_Lanka-4365048.jpg",
      title: "Sal & Saffron - Vitamin E Rich - Ultra-Hydrating Facial Treatment Gel - 60ml",
      price: "5900.00 LKR",
      description:
        "A fast-action extra-potent wonder blend infused with nourishing Sal Butter &amp; precious Saffron to instantly deep-hydrate, soothe dryness, minimise appearance of pores &amp; add a more visibly youthful Glow to skin.",
      ingredientDetails: [
        {
          name: "Saffron",
          image: "/ingredient-img/Saffron.png",
          description: "Saffron helps to deeply nourish, treat & rejuvenate skin, boosting skin elasticity & promoting a brighter natural glow."
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates."
        },
        {
          name: "Almond",
          image: "/ingredient-img/Almond.png",
          description: "Rich in vitamin E, to nourish & soften skin."
        }
      ],
    },
  ],
  "Calm & Soothed": [
    {
      id: "13",
      image: "/product-img/Lotus_Rambutan_-_Face_Care_Discovery_Set_-_Spa_Ceylon_Sri_Lanka-4362866.png",
      title: "Lotus & Rambutan - Face Care Discovery Set",
      price: "6900.00 LKR",
      description:
        "A discovery set ideal for calming sensitive skin and reducing irritation.",
      ingredientDetails: [
        {
          name: "Watercress",
          image: "/ingredient-img/Watercress.png",
          description: "Promotes skin clarity, Rich in vitamin C & improves overall radiance."
        },
        {
          name: "Eucalyptus",
          image: "/ingredient-img/Eucalyptus.png",
          description: "Rich in anti-inflammatory properties. Treats & prevents acne while boosting circulation."
        },
        {
          name: "Calendula",
          image: "/ingredient-img/Calendula.png",
          description: "Relieves skin of flakiness & itchiness, aids in sustaining soothes & hydrated skin."
        },
        {
          name: "Arnica",
          image: "/ingredient-img/Arnica.png",
          description: "Rich in anti-inflammatory properties. Promotes soothing & healing."
        }
      ],
    },
    {
      id: "14",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B_Plus_Gentle_Face_Exfoliating_Masque_-_100g_-_Spa_Ceylon_Sri_Lanka-4362770.jpg",
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B Plus Gentle Face Exfoliating Masque - 100g",
      price: "5900.00 LKR",
      description:
        "A gentle exfoliating masque that refreshes and soothes the skin.",
      ingredientDetails: [
        {
          name: "Calendula",
          image: "/ingredient-img/Calendula.png",
          description: "Relieves skin of flakiness & itchiness, aids in sustaining soothes & hydrated skin."
        },
        {
          name: "Arnica",
          image: "/ingredient-img/Arnica.png",
          description: "Rich in anti-inflammatory properties. Promotes soothing & healing."
        }
      ],
    },
    {
      id: "15",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Day_Facial_Protector_-_50g_-_Spa_Ceylon_Sri_Lanka-4362853.jpg",
      title: "Lotus & Rambutan - Active Cell Extract Vitamin B12 Day Facial Protector - 50g",
      price: "5900.00 LKR",
      description:
        "A light, fast-absorbent formula to help keep skin fresh &amp; matte through the day. Infused with Lotus Leaf Active Cell Extract, Vitamin B12, Rambutan, Kava Kava, Arnica &amp; Calendula to help soothe skin &amp; calm redness.",
      ingredientDetails: [
        {
          name: "Calendula",
          image: "/ingredient-img/Calendula.png",
          description: "Relieves skin of flakiness & itchiness, aids in sustaining soothes & hydrated skin."
        },
        {
          name: "Arnica",
          image: "/ingredient-img/Arnica.png",
          description: "Rich in anti-inflammatory properties. Promotes soothing & healing."
        }
      ],
    },
    {
      id: "16",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Ultra-Hydrating_Day_Night_Treatment_50ml_-_Spa_Ceylon_Sri_Lanka-4362822.jpg",
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 Ultra-Hydrating Day & Night Treatment 50ml",
      price: "5900.00 LKR",
      description:
        "A fast action, extra-potent wonder treatment infused with Lotus Leaf Active Cell Extract, Vitamin B12, Rambutan &amp; Kava Kava to help soothe skin, calm redness &amp; reduce sensation of irritation.",
      ingredientDetails: [
        {
          name: "Calendula",
          image: "/ingredient-img/Calendula.png",
          description: "Relieves skin of flakiness & itchiness, aids in sustaining soothes & hydrated skin."
        },
        {
          name: "Arnica",
          image: "/ingredient-img/Arnica.png",
          description: "Rich in anti-inflammatory properties. Promotes soothing & healing."
        }
      ],
    },
    {
      id: "17",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_Face_Treatment_Milk_Serum_-_30ml_-_Spa_Ceylon_Sri_Lanka-4362798.jpg",
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 Face Treatment Milk Serum - 30ml",
      price: "5900.00 LKR",
      description:
        "A powerful overnight repair treatment infused with Lotus Leaf Active Cell Extract, Vitamin B12, Rambutan, Kava Kava, Arnica &amp; Calendula to help soothe skin, calm redness &amp; reduce sensation of irritation.",
      ingredientDetails: [
        {
          name: "Calendula",
          image: "/ingredient-img/Calendula.png",
          description: "Relieves skin of flakiness & itchiness, aids in sustaining soothes & hydrated skin."
        },
        {
          name: "Arnica",
          image: "/ingredient-img/Arnica.png",
          description: "Rich in anti-inflammatory properties. Promotes soothing & healing."
        }
      ],
    },
    {
      id: "18",
      image: "/product-img/Lotus_Rambutan_-_Active_Cell_Extract_Vitamin_B12_-_Facial_Cleansing_Foam_100ml_-_Spa_Ceylon_Sri_Lanka-4362786.jpg",
      title: "Lotus & Rambutan - Active Cell Extract + Vitamin B12 - Facial Cleansing Foam 100ml",
      price: "4900.00 LKR",
      description:
        "A soft-foaming formula to gently cleanse skin &amp; help fortify delicate natural skin balance. Enriched with a powerful blend of Lotus Leaf Active Cell Extract, Vitamin B12, Rambutan &amp; Kava Kava to help soothe skin &amp; calm redness.",
      ingredientDetails: [
        {
          name: "Calendula",
          image: "/ingredient-img/Calendula.png",
          description: "Relieves skin of flakiness & itchiness, aids in sustaining soothes & hydrated skin."
        },
        {
          name: "Arnica",
          image: "/ingredient-img/Arnica.png",
          description: "Rich in anti-inflammatory properties. Promotes soothing & healing."
        }
      ],
    },
  ],
  "Youthful": [
    {
      id: "15",
      image: "/product-img/White_Rice_-_Nourishing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4367516.jpg",
      title: "White Rice - Nourishing All-Day Protector 50g",
      price: "5100.00 LKR",
      description: "A protective formula that nourishes skin with natural white rice extracts.",
      ingredientDetails: [
        {
          name: "Rice Bran",
          image: "/ingredient-img/Rice-Bran.png",
          description: "Rich in antioxidants. Nourishes skin & protects skin from environmental damage. Preserve youthful skin.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description : "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits."
        },
        {
          name: "Watercress",
          image: "/ingredient-img/Watercress.png",
          description: "Rich in Vitamin C. Increases collagen production & reduces cellulite & wrinkles."
        },
        {
          name: "Ceylon Tea",
          image: "/ingredient-img/Ceylon-Tea.png",
          description: "Packed with antioxidants. Protects against free radicals & premature aging effects."
        },
        {
          name: "Marigold",
          image: "/ingredient-img/Marigold.png",
          description: "Rich in antiseptic and anti-inflammatory properties. Promotes healing & accelerates the regeneration of new cells."
        }
      ],
    },
  ],
  "Clear & Acne-free (Active acne)": [],
  "Problem Free skin (occasional acne)": [
    {
      id: "19",
      image: "/product-img/Skin_Balance_-_Moringa_Herb_Clarifying_Clay_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4365580.jpg",
      title: "Skin Balance - Moringa Herb Clarifying Clay Masque 100g",
      price: "5,900.00 LKR",
      description: "",
      ingredientDetails: [
        {
          name: "Aloe Vera",
          image: "/ingredient-img/Aloe-Vera.png",
          description: "Hydrates & refreshes skin, treating dryness.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        }, 
        {
          name : "Calendula",
          image: "/ingredient-img/Calendula.png",
          description: "Relieves skin of flakiness & itchiness, aids in sustaining soothes & hydrated skin."
        }, 
        { 
          name : "Arnica",
          image: "/ingredient-img/Arnica.png",
          description: "Rich in anti-inflammatory properties. Promotes soothing & healing."
        },
        {
          name: "Moringa",
          image: "/ingredient-img/Moringa.png",
          description: "Rich in antibacterial & nourishing properties. Controls problem skin & restores natural balance.",
        },
      ],
    },
    {
      id: "20",
      image: "/product-img/Skin_Balance_-_Moringa_Neem_-_Clarifying_Clay_Facial_Exfoliator_100g_-_Spa_Ceylon_Sri_Lanka-4365571.jpg",
      title: "Skin Balance - Moringa & Neem - Clarifying Clay Facial Exfoliator 100g",
      price: "5,200.00 LKR",
      description: "",
      ingredientDetails: [
        {
          name: "Aloe Vera",
          image: "/ingredient-img/Aloe-Vera.png",
          description: "Hydrates & refreshes skin, treating dryness.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        }, 
        {
          name: "Neem",
          image: "/ingredient-img/Neem.png",
          description: "Rich in anti-bacterial & anti-inflammatory properties. Soothes & cools skin irritations."
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates."
        },
        {
          name: "Tea Tree",
          image: "/ingredient-img/Tea-Tree.png",
          description: "Helps unclog pores, and calms redness & inflammation."
        },
        {
          name: "Moringa",
          image: "/ingredient-img/Moringa.png",
          description: "Rich in antibacterial & nourishing properties. Controls problem skin & restores natural balance.",
        },
      ],
    },
  ],
  "Maintain youthful skin": [],
  "Tighter & even skin tone": [],
  "Bright": [
    {
      id: "19",
      image: "/product-img/true_turmeric_-_serum_1.jpg",
      title: "True Turmeric - Vitamin C Glow - Renewing Treatment Serum 30ml",
      price: "5600.00 LKR",
      description: "A powerful overnight repair treatment infused with Ayurveda WonderHerbs & anti-oxidant, healing & calming Turmeric to help minimise dark patches, take-off dullness & control imperfections. Infused with an advanced natural pro-biotic complex to help rebalance skin, fortify natural defences & promote overall skin wellness. Aloe Vera, Witch Hazel & Marigold help hydrate & refresh skin, while Almond, Rice Bran, Moringa & Licorice combine to help minimise dark spots, even-out skin tone & boost visible youthfulness. Super-charged with natural Vitamin-C rich Rosehip & Pineapple enzymes to help energise & renew skin, adding a clear natural glow.",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "Almond",
          image: "/ingredient-img/Almond.png",
          description: "Rich in vitamin E, to nourish & soften skin.",
        },
        {
          name: "Moringa",
          image: "/ingredient-img/Moringa.png",
          description: "Rich in antibacterial & nourishing properties. Controls problem skin & restores natural balance.",
        },
        {
          name: "Rice Bran",
          image: "/ingredient-img/Rice-Bran.png",
          description: "Rich in antioxidants. Nourishes skin & protects skin from environmental damage. Preserve youthful skin.",
        },
        {
          name: "Marigold",
          image: "/ingredient-img/Marigold.png",
          description: "Rich in antiseptic and anti-inflammatory properties. Promotes healing & accelerates the regeneration of new cells.",
        }
      ]
    },
    {
      id: "20",
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Deep_Cleansing_Facial_Balm_100ml_-_Spa_Ceylon_Sri_Lanka-4366288.jpg", 
      title: "True Turmeric - Vitamin C Glow - Deep Cleansing Facial Balm 100ml",
      price: "5200.00 LKR",
      description: "Deep Cleansing & Make-up Removal: Apply & massage all over face & neck. Wipe off with cotton / warm wet towel & rinse thoroughly. Special care & awareness: In case of discomfort, decrease the duration & frequency of application. If irritation occurs, discontinue use & seek medical advice.",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates.",
        },
        {
          name: "Sweet Almond",
          image: "/ingredient-img/Sweet-Almond.png",
          description: "Reduces puffiness & under-eye circles. Treats dry skin & reverses sun damage. Enhances overall skin health.",
        }
      ]
    },
    { 
      id: "21", 
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Exfoliating_Clay_Facial_Masque_100g_-_Spa_Ceylon_Sri_Lanka-4366302.jpg", 
      title: "True Turmeric - Vitamin C Glow - Exfoliating Clay Facial Masque 100g", 
      price: "6,950 LKR",
      description: "Deep cleanse skin & apply thick layer, all over face & neck, avoiding eye area. Leave for 10 minutes. Wet skin & lightly massage with fingertips, using gentle circular motions. Wash off.Special care & awareness: In case of discomfort, decrease the duration & frequency of application. If irritation occurs, discontinue use & seek medical advice.",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "Kokum",
          image: "/ingredient-img/Kokum.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Soothes & heals inflamed damaged skin.",
        },
        {
          name: "Bearberry",
          image: "/ingredient-img/Bearberry.png",
          description: "A natural skin brightener. Evens out skin tones by eliminating age spots & acne scars.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        }
      ]
    },
    { 
      id: "22", 
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Renewing_All-Day_Protector_50g_-_Spa_Ceylon_Sri_Lanka-4366371.jpg", 
      title: "True Turmeric - Vitamin C Glow - Renewing All-Day Protector 50g", 
      price: "5,400 LKR",
      description: "Cleanse & tone skin. Using fingertips, apply lightly all over face & neck. Avoid eye area. Blend into skin & leave on. Special care & awareness: In case of discomfort, decrease the duration & frequency of application. If irritation occurs, discontinue use & seek medical advice.",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        },
        {
          name: "Rice Bran",
          image: "/ingredient-img/Rice-Bran.png",
          description: "Rich in antioxidants. Nourishes skin & protects skin from environmental damage. Preserve youthful skin.",
        },
        {
          name: "Watercress",
          image: "/ingredient-img/Watercress.png",
          description: "Rich in Vitamin C. Increases collagen production & reduces cellulite & wrinkles.",
        }
      ]
    },
    { 
      id: "23", 
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Facial_Cleansing_Foam_150ml_-_Spa_Ceylon_Sri_Lanka-4366337.jpg", 
      title: "True Turmeric - Vitamin C Glow - Facial Cleansing Foam 150ml", 
      price: "4,800 LKR",
      description: "A soft-foaming formula infused with True Turmeric & powerful Ayurveda WonderHerbs to deep cleanse & purify skin, taking away dullness & imperfections. Virgin Coconut, Moringa, Neem, Kokum Butter & natural vitamins help improve overall skin wellness & revitalise skin. Turmeric combines with Aloe Vera, Licorice, Green Tea & Watercress to help inhibit formation of skin darkening cells & remove sun-tan. Super-charged with natural Vitamin-C rich Rosehip & Pineapple enzymes to help energise skin & promote a brighter natural glow. 150ml TUBE A soft-foaming formula infused with True Turmeric & naturally Vitamin-C rich powerful Ayurveda WonderHerbs to deep cleanse & purify skin, taking away dullness & imperfections. Virgin Coconut, Moringa, Neem, Kokum Butter & natural vitamins help improve overall skin health & revitalise skin. Turmeric combined with Rosehip, Pineapple Enzymes & Aloe Vera brighten skin & enhance natural glow.",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        },
        {
          name: "Morinaga",
          image: "/ingredient-img/Morinaga.png",
          description: "Rich in antibacterial & nourishing properties. Controls problem skin & restores natural balance.",
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates.",
        },
        {
          name: "Watercress",
          image: "/ingredient-img/Watercress.png",
          description: "Rich in Vitamin C. Increases collagen production & reduces cellulite & wrinkles.",
        }
      ]
    },
    { 
      id: "23", 
      image: "/product-img/True_Turmeric_-_Gold_Facial_Masque_-Vitamin_C_Glow_Brightening_Treatment_-_Spa_Ceylon_Sri_Lanka-4366241.jpg", 
      title: "True Turmeric - Gold Facial Masque -Vitamin C Glow Brightening Treatment", 
      price: "1,050 LKR",
      description: "",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        },
        {
          name: "Virgin Coconut",
          image: "/ingredient-img/Virgin-Coconut.png",
          description: "Rich in nourishing fatty acids. Increases collagen production & intensely hydrates.",
        }
      ]
    },
    { 
      id: "23", 
      image: "/product-img/True_Turmeric_-_Vitamin_C_Glow_-_Anti-Pollution_Gel_Facial_Masque_60ml_-_Spa_Ceylon_Sri_Lanka-4366272.jpg", 
      title: "True Turmeric - Vitamin C Glow - Anti-Pollution Gel Facial Masque 60ml",
      price: "5,550 LKR",
      description: "",
      ingredientDetails: [
        {
          name: "Turmeric",
          image: "/ingredient-img/Turmeric.png",
          description: "Rich in anti-oxidants & anti-inflammatory properties. Revives skin dull skin & enhances skin radiance.",
        },
        {
          name: "Licorice",
          image: "/ingredient-img/Licorice.png",
          description: "Rich in anti-inflammatory & anti-microbial properties. Promotes skin brightening & anti-aging benefits.",
        },
        {
          name: "Aloe Vera",
          image: "/ingredient-img/Aloe-Vera.png",
          description: "Hydrates & refreshes skin, treating dryness.",
        },
        {
          name: "Almond",
          image: "/ingredient-img/Almond.png",
          description: "Rich in vitamin E, to nourish & soften skin.",
        }
      ]
    },
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
            onClick={() => router.push("/questions/2")}
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
          style={{ width: "300px", height: "300px", margin: "0 auto" }}
          loop
          autoplay
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
              Check on the Ingredients
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
            router.push("/../");
          }}
        >
          Start Over
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
            {selectedProduct.ingredientDetails && selectedProduct.ingredientDetails.length > 0 ? (
              <div className={styles.ingredientList}>
                {selectedProduct.ingredientDetails.map((ingredient: { image: string | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
                  <div key={index} className={styles.ingredientItem}>
                    <img
                      src={ingredient.image}
                      alt={String(ingredient.name)}
                      className={styles.ingredientImage}
                    />
                    <div className={styles.ingredientDetails}>
                      <p className={styles.ingredientName}>{ingredient.name}</p>
                      <p className={styles.ingredientDescription}>{ingredient.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.productIngredients}>
                Ingredients: {selectedProduct.ingredients}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}