/**
 * NOTES WALLAH — TEST MODULE DATA
 * Chapter-wise MCQ Question Banks for CBSE Class 10
 */

const TEST_BANK = [
  {
    id: "sci-life-1",
    title: "Life Processes",
    subject: "Science",
    subjectCode: "086",
    color: "#10B981",
    icon: "fa-solid fa-dna",
    questionCount: 10,
    durationMin: 15,
    difficulty: "Medium",
    description: "Autotrophic nutrition, human digestive system, respiration, and excretion in animals.",
    questions: [
      {
        id: 1,
        text: "Which of the following events does NOT occur during photosynthesis in the light phase?",
        options: [
          "Absorption of light energy by chlorophyll",
          "Splitting of water molecules into hydrogen and oxygen",
          "Direct conversion of glucose into carbon dioxide",
          "Conversion of light energy to chemical energy"
        ],
        correctIndex: 2,
        explanation: "During photosynthesis, CO2 is reduced to carbohydrates. It is not converted into CO2."
      },
      {
        id: 2,
        text: "The opening and closing of stomatal pores is primarily regulated by:",
        options: [
          "Oxygen concentration in stomata",
          "Temperature of the surrounding air",
          "Water content inside the guard cells",
          "Amount of nitrogen absorbed by roots"
        ],
        correctIndex: 2,
        explanation: "Guard cells swell when water flows into them causing stomatal pores to open, and shrink when they lose water."
      },
      {
        id: 3,
        text: "In human beings, the primary site for complete digestion of carbohydrates, proteins, and fats is:",
        options: [
          "Stomach",
          "Small Intestine",
          "Large Intestine",
          "Oesophagus"
        ],
        correctIndex: 1,
        explanation: "The small intestine is the site of complete digestion of carbohydrates, proteins, and fats with intestinal enzymes."
      },
      {
        id: 4,
        text: "Which enzyme is present in human saliva that initiates the breakdown of starch into simple sugars?",
        options: [
          "Pepsin",
          "Salivary Amylase",
          "Trypsin",
          "Lipase"
        ],
        correctIndex: 1,
        explanation: "Salivary amylase (ptyalin) breaks down complex starch into maltose in the buccal cavity."
      },
      {
        id: 5,
        text: "What is the primary substance that accumulates in human muscle cells during vigorous exercise causing cramps?",
        options: [
          "Ethanol",
          "Lactic acid",
          "Carbon dioxide",
          "Pyruvate"
        ],
        correctIndex: 1,
        explanation: "Lack of oxygen in muscle cells leads to anaerobic breakdown of pyruvate into lactic acid, causing cramps."
      },
      {
        id: 6,
        text: "Which chamber of the human heart receives deoxygenated blood returning from the upper and lower body?",
        options: [
          "Left atrium",
          "Left ventricle",
          "Right atrium",
          "Right ventricle"
        ],
        correctIndex: 2,
        explanation: "The right atrium receives deoxygenated blood from the body tissues via the vena cava."
      },
      {
        id: 7,
        text: "The filtration units of the human kidney are known as:",
        options: [
          "Nephrons",
          "Neurons",
          "Alveoli",
          "Ureters"
        ],
        correctIndex: 0,
        explanation: "Nephrons are the structural and functional filtration units of the kidneys."
      },
      {
        id: 8,
        text: "The movement of synthesized food materials (sucrose) through phloem tissue in plants is termed:",
        options: [
          "Transpiration",
          "Translocation",
          "Guttation",
          "Imbibition"
        ],
        correctIndex: 1,
        explanation: "The transport of soluble products of photosynthesis through phloem is called translocation."
      },
      {
        id: 9,
        text: "Which blood vessel carries oxygenated blood from the lungs directly into the left atrium of the heart?",
        options: [
          "Pulmonary artery",
          "Pulmonary vein",
          "Aorta",
          "Vena cava"
        ],
        correctIndex: 1,
        explanation: "Pulmonary veins are the only veins in the human body that carry oxygen-rich blood, moving from lungs to left atrium."
      },
      {
        id: 10,
        text: "The breakdown of pyruvate using oxygen takes place inside the:",
        options: [
          "Cytoplasm",
          "Mitochondria",
          "Chloroplast",
          "Golgi apparatus"
        ],
        correctIndex: 1,
        explanation: "Aerobic breakdown of pyruvate into CO2, H2O, and ATP energy occurs in the mitochondria."
      }
    ]
  },
  {
    id: "sci-chem-1",
    title: "Chemical Reactions & Equations",
    subject: "Science",
    subjectCode: "086",
    color: "#2B6DEF",
    icon: "fa-solid fa-flask-vial",
    questionCount: 10,
    durationMin: 15,
    difficulty: "Easy",
    description: "Types of chemical reactions, balancing equations, oxidation-reduction, and rancidity.",
    questions: [
      {
        id: 1,
        text: "When a magnesium ribbon is burned in air, the white powder formed is:",
        options: [
          "Magnesium nitrate",
          "Magnesium oxide",
          "Magnesium carbonate",
          "Magnesium hydroxide"
        ],
        correctIndex: 1,
        explanation: "2Mg + O2 -> 2MgO. Magnesium burns with a dazzling white flame to form white magnesium oxide powder."
      },
      {
        id: 2,
        text: "Which gas is released when zinc granules react with dilute sulphuric acid?",
        options: [
          "Oxygen gas",
          "Carbon dioxide gas",
          "Hydrogen gas",
          "Nitrogen dioxide gas"
        ],
        correctIndex: 2,
        explanation: "Zn + H2SO4 -> ZnSO4 + H2↑. Hydrogen gas burns with a characteristic pop sound."
      },
      {
        id: 3,
        text: "The chemical reaction: CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat is an example of:",
        options: [
          "Endothermic decomposition reaction",
          "Exothermic combination reaction",
          "Displacement reaction",
          "Neutralization reaction only"
        ],
        correctIndex: 1,
        explanation: "Two reactants combine to form slaked lime while releasing large amounts of heat, making it an exothermic combination reaction."
      },
      {
        id: 4,
        text: "When lead nitrate powder is heated in a dry boiling tube, brown fumes are emitted. These fumes are of:",
        options: [
          "Lead oxide (PbO)",
          "Nitrogen dioxide (NO2)",
          "Oxygen gas (O2)",
          "Nitrous oxide (N2O)"
        ],
        correctIndex: 1,
        explanation: "2Pb(NO3)2 -> 2PbO + 4NO2↑ (brown fumes) + O2↑."
      },
      {
        id: 5,
        text: "When iron nails are placed in a blue copper sulphate solution, the colour of the solution turns:",
        options: [
          "Deep blue",
          "Pale green",
          "Colorless",
          "Milky white"
        ],
        correctIndex: 1,
        explanation: "Fe displaces Cu forming FeSO4 which has a light pale green color."
      },
      {
        id: 6,
        text: "A reaction in which an insoluble substance separates out from an aqueous mixture is called:",
        options: [
          "Precipitation reaction",
          "Combustion reaction",
          "Reduction reaction",
          "Decomposition reaction"
        ],
        correctIndex: 0,
        explanation: "Any reaction that produces an insoluble precipitate is called a precipitation reaction."
      },
      {
        id: 7,
        text: "In the redox reaction: CuO + H2 -> Cu + H2O, which substance acts as the oxidizing agent?",
        options: [
          "CuO",
          "H2",
          "Cu",
          "H2O"
        ],
        correctIndex: 0,
        explanation: "CuO gives oxygen to H2 and gets reduced to Cu; hence CuO is the oxidizing agent."
      },
      {
        id: 8,
        text: "The black coating developed on silver ornaments upon prolonged exposure to air is caused by:",
        options: [
          "Silver oxide (Ag2O)",
          "Silver sulphide (Ag2S)",
          "Silver chloride (AgCl)",
          "Silver carbonate (Ag2CO3)"
        ],
        correctIndex: 1,
        explanation: "Silver reacts with hydrogen sulphide gas in the air to form a black coating of silver sulphide (Ag2S)."
      },
      {
        id: 9,
        text: "To prevent potato chips from getting oxidized and rancid, chip packets are flushed with an unreactive gas called:",
        options: [
          "Chlorine",
          "Hydrogen",
          "Nitrogen",
          "Carbon monoxide"
        ],
        correctIndex: 2,
        explanation: "Nitrogen gas provides an inert antioxidant environment that prevents fats and oils from turning rancid."
      },
      {
        id: 10,
        text: "The law of conservation of mass requires that every chemical equation must be:",
        options: [
          "Exothermic",
          "Balanced on both sides",
          "Reversible",
          "Catalyzed"
        ],
        correctIndex: 1,
        explanation: "Total mass of elements on the reactant side must equal total mass on the product side."
      }
    ]
  },
  {
    id: "math-real-1",
    title: "Real Numbers",
    subject: "Mathematics",
    subjectCode: "041",
    color: "#FF8A00",
    icon: "fa-solid fa-calculator",
    questionCount: 10,
    durationMin: 15,
    difficulty: "Medium",
    description: "Fundamental Theorem of Arithmetic, HCF & LCM relationships, and proofs of irrationality.",
    questions: [
      {
        id: 1,
        text: "According to the Fundamental Theorem of Arithmetic, every composite number can be expressed as a product of:",
        options: [
          "Even numbers",
          "Prime numbers uniquely, apart from the order",
          "Consecutive integers",
          "Rational fractions"
        ],
        correctIndex: 1,
        explanation: "Every composite number can be factored uniquely as a product of prime powers, irrespective of order."
      },
      {
        id: 2,
        text: "If HCF(a, b) = 12 and a × b = 1800, then LCM(a, b) is equal to:",
        options: [
          "120",
          "150",
          "180",
          "200"
        ],
        correctIndex: 1,
        explanation: "HCF × LCM = a × b => 12 × LCM = 1800 => LCM = 1800 / 12 = 150."
      },
      {
        id: 3,
        text: "The number (3 + 2√5) is classified as:",
        options: [
          "A rational number",
          "An irrational number",
          "An integer",
          "A recurring decimal"
        ],
        correctIndex: 1,
        explanation: "The sum of a non-zero rational number and an irrational number is always irrational."
      },
      {
        id: 4,
        text: "The prime factorization of the natural number 140 is:",
        options: [
          "2 × 5 × 7",
          "2² × 5 × 7",
          "2³ × 5 × 7",
          "2² × 3 × 7"
        ],
        correctIndex: 1,
        explanation: "140 = 2 × 70 = 2 × 2 × 35 = 2² × 5 × 7."
      },
      {
        id: 5,
        text: "The HCF of two consecutive positive integers n and (n + 1) is always:",
        options: [
          "0",
          "1",
          "n",
          "n + 1"
        ],
        correctIndex: 1,
        explanation: "Consecutive integers share no common positive factor other than 1 (they are co-prime)."
      },
      {
        id: 6,
        text: "If two positive integers p and q are written as p = a²b³ and q = a³b, where a and b are prime numbers, then HCF(p, q) is:",
        options: [
          "ab",
          "a²b",
          "a³b³",
          "a²b²"
        ],
        correctIndex: 1,
        explanation: "HCF takes the minimum power of each common prime factor: a^(min(2,3)) * b^(min(3,1)) = a²b."
      },
      {
        id: 7,
        text: "If p is a prime number and p divides a² (where a is a positive integer), then p must also divide:",
        options: [
          "a³ only",
          "a",
          "2a + 1",
          "a / 2"
        ],
        correctIndex: 1,
        explanation: "By the fundamental theorem of arithmetic theorem, if prime p divides a², then p divides a."
      },
      {
        id: 8,
        text: "Which of the following numbers is irrational?",
        options: [
          "√4",
          "√9",
          "√7",
          "√16"
        ],
        correctIndex: 2,
        explanation: "√7 cannot be expressed as a ratio of two integers p/q; it is a non-terminating non-repeating decimal."
      },
      {
        id: 9,
        text: "The product of a non-zero rational number and an irrational number is:",
        options: [
          "Always rational",
          "Always irrational",
          "Can be rational or irrational",
          "Always zero"
        ],
        correctIndex: 1,
        explanation: "Multiplying any non-zero rational number by an irrational number always yields an irrational number."
      },
      {
        id: 10,
        text: "The largest number that divides 70 and 125 leaving remainders 5 and 8 respectively is:",
        options: [
          "13",
          "65",
          "875",
          "1750"
        ],
        correctIndex: 0,
        explanation: "Required number = HCF(70 - 5, 125 - 8) = HCF(65, 117). 65 = 13 × 5 and 117 = 13 × 9, so HCF = 13."
      }
    ]
  },
  {
    id: "math-poly-1",
    title: "Polynomials",
    subject: "Mathematics",
    subjectCode: "041",
    color: "#8B5CF6",
    icon: "fa-solid fa-square-root-variable",
    questionCount: 8,
    durationMin: 12,
    difficulty: "Medium",
    description: "Geometrical meaning of zeroes, sum & product of zeroes of a quadratic polynomial.",
    questions: [
      {
        id: 1,
        text: "If α and β are the zeroes of the quadratic polynomial p(x) = ax² + bx + c (a ≠ 0), then the sum (α + β) is:",
        options: [
          "-b / a",
          "b / a",
          "c / a",
          "-c / a"
        ],
        correctIndex: 0,
        explanation: "For any quadratic polynomial ax² + bx + c, sum of roots α + β = -b/a."
      },
      {
        id: 2,
        text: "If α and β are the zeroes of p(x) = ax² + bx + c, then the product (α · β) is equal to:",
        options: [
          "-c / a",
          "c / a",
          "b / a",
          "-b / a"
        ],
        correctIndex: 1,
        explanation: "Product of zeroes αβ = c/a."
      },
      {
        id: 3,
        text: "The number of zeroes that a polynomial of degree n can have at most is:",
        options: [
          "n - 1",
          "n",
          "n + 1",
          "2n"
        ],
        correctIndex: 1,
        explanation: "A polynomial of degree n can have at most n real zeroes."
      },
      {
        id: 4,
        text: "The zeroes of the quadratic polynomial x² - 2x - 8 are:",
        options: [
          "4 and -2",
          "-4 and 2",
          "4 and 2",
          "-4 and -2"
        ],
        correctIndex: 0,
        explanation: "x² - 2x - 8 = (x - 4)(x + 2) = 0 => x = 4 or x = -2."
      },
      {
        id: 5,
        text: "A quadratic polynomial whose sum of zeroes is 4 and product of zeroes is 1 is given by:",
        options: [
          "x² + 4x + 1",
          "x² - 4x + 1",
          "x² - 4x - 1",
          "x² + 4x - 1"
        ],
        correctIndex: 1,
        explanation: "p(x) = k[x² - (sum)x + product] = x² - 4x + 1."
      },
      {
        id: 6,
        text: "The graph of a quadratic polynomial y = ax² + bx + c is a symmetrical curve shaped like a:",
        options: [
          "Straight line",
          "Circle",
          "Parabola",
          "Hyperbola"
        ],
        correctIndex: 2,
        explanation: "The graph of any quadratic function is a parabola opening upwards (if a > 0) or downwards (if a < 0)."
      },
      {
        id: 7,
        text: "If one zero of the quadratic polynomial (k - 1)x² + kx + 1 is -3, then the value of k is:",
        options: [
          "4/3",
          "-4/3",
          "2/3",
          "-2/3"
        ],
        correctIndex: 0,
        explanation: "(k - 1)(-3)² + k(-3) + 1 = 0 => 9(k - 1) - 3k + 1 = 0 => 6k - 8 = 0 => k = 8/6 = 4/3."
      },
      {
        id: 8,
        text: "If the zeroes of the quadratic polynomial ax² + bx + c are equal in magnitude but opposite in sign, then:",
        options: [
          "b = 0",
          "c = 0",
          "a = 0",
          "b = c"
        ],
        correctIndex: 0,
        explanation: "Sum of zeroes = α + (-α) = 0 => -b/a = 0 => b = 0."
      }
    ]
  }
];

// Helper to look up a test by ID
function getTestById(testId) {
  return TEST_BANK.find(t => t.id === testId) || null;
}
