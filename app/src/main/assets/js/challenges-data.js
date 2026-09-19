/**
 * NOTES WALLAH — CHALLENGES MODULE DATA
 * Daily Sprints, Weekly Goals & Speed Practice MCQs for Class 10
 */

const CHALLENGES_DATA = {
  daily: {
    id: "daily-sci-sprint",
    title: "Science Sprint",
    subtitle: "5 Quick Questions · Daily revision",
    badge: "Daily",
    subject: "Science",
    questionsCount: 5,
    durationMin: 5,
    tag: "Streak Friendly",
    questions: [
      {
        id: 1,
        text: "What is the pH range of human blood under normal healthy physiological conditions?",
        options: ["5.5 – 6.5", "7.35 – 7.45", "8.5 – 9.0", "6.8 – 7.0"],
        correctIndex: 1,
        explanation: "Human blood is slightly basic with a tightly controlled pH range between 7.35 and 7.45."
      },
      {
        id: 2,
        text: "Which of the following metals is liquid at normal room temperature?",
        options: ["Sodium", "Mercury", "Gallium", "Potassium"],
        correctIndex: 1,
        explanation: "Mercury (Hg) is the only metal that remains in liquid state at standard room temperature."
      },
      {
        id: 3,
        text: "According to Ohm's Law (V = IR), if resistance R is doubled while potential difference V remains constant, the electric current I will:",
        options: ["Double", "Be halved", "Remain unchanged", "Become zero"],
        correctIndex: 1,
        explanation: "Since I = V / R, doubling the resistance halves the electric current for a constant voltage."
      },
      {
        id: 4,
        text: "The male reproductive part of a flowering angiosperm is called the:",
        options: ["Carpel", "Stamen", "Sepal", "Petal"],
        correctIndex: 1,
        explanation: "The stamen consists of the anther and filament and produces pollen grains."
      },
      {
        id: 5,
        text: "A shiny brown-coloured element 'X' on heating in air becomes black in colour. The element 'X' is:",
        options: ["Copper", "Silver", "Iron", "Aluminium"],
        correctIndex: 0,
        explanation: "Copper (Cu) reacts with oxygen on heating to form black copper(II) oxide (CuO)."
      }
    ]
  },

  weekly: {
    title: "Complete 3 chapter tests this week",
    subtitle: "Solidify your Term 1 preparation",
    done: 1,
    total: 3,
    badge: "Weekly",
    tag: "Progress 33%"
  },

  list: [
    {
      id: "chal-math-sprint",
      title: "Maths Sprint: Algebra & Numbers",
      subject: "Mathematics",
      difficulty: "Medium",
      icon: "fa-solid fa-calculator",
      color: "#FF8A00",
      questionsCount: 5,
      durationMin: 5,
      badge: "Subject Sprint",
      description: "Fast-paced questions on quadratic roots, AP series, and prime factors.",
      questions: [
        {
          id: 1,
          text: "The 10th term of the Arithmetic Progression (AP): 2, 7, 12, ... is:",
          options: ["47", "52", "45", "50"],
          correctIndex: 0,
          explanation: "a = 2, d = 5. a10 = a + 9d = 2 + 9(5) = 47."
        },
        {
          id: 2,
          text: "If discriminant D = b² - 4ac > 0 and not a perfect square, the roots of ax² + bx + c = 0 are:",
          options: ["Real and equal", "Real, unequal and irrational", "Non-real complex", "Rational and equal"],
          correctIndex: 1,
          explanation: "When D > 0 and not a perfect square, quadratic roots are distinct real irrationals."
        },
        {
          id: 3,
          text: "The distance of point P(3, 4) from the origin (0, 0) is:",
          options: ["7 units", "5 units", "25 units", "1 unit"],
          correctIndex: 1,
          explanation: "Distance = √(3² + 4²) = √(9 + 16) = √25 = 5 units."
        },
        {
          id: 4,
          text: "If sin θ = 1/2, what is the value of (9 cot² θ + 9)?",
          options: ["36", "18", "27", "9"],
          correctIndex: 0,
          explanation: "9(cot² θ + 1) = 9 cosec² θ = 9 * (1/sin θ)² = 9 * (2)² = 36."
        },
        {
          id: 5,
          text: "The probability of getting an even prime number when rolling an unbiased 6-sided die is:",
          options: ["1/6", "1/2", "1/3", "2/3"],
          correctIndex: 0,
          explanation: "The only even prime number on a standard die is 2. Probability = 1/6."
        }
      ]
    },
    {
      id: "chal-board-practice",
      title: "CBSE Board Practice",
      subject: "All Subjects",
      difficulty: "Board Level",
      icon: "fa-solid fa-graduation-cap",
      color: "#2B6DEF",
      questionsCount: 5,
      durationMin: 6,
      badge: "Exam Challenge",
      description: "Hand-picked high-weightage questions from recent CBSE sample papers.",
      questions: [
        {
          id: 1,
          text: "Which mirror is preferred as a rear-view mirror in vehicles?",
          options: ["Concave mirror", "Convex mirror", "Plane mirror", "Cylindrical mirror"],
          correctIndex: 1,
          explanation: "Convex mirrors always give an erect, diminished virtual image and have a wider field of view."
        },
        {
          id: 2,
          text: "In Mendel's monohybrid cross between pure tall (TT) and dwarf (tt) pea plants, the phenotypic ratio in F2 generation is:",
          options: ["1 : 2 : 1", "3 : 1", "9 : 3 : 3 : 1", "2 : 1"],
          correctIndex: 1,
          explanation: "The phenotypic ratio of tall to dwarf plants in F2 is 3 : 1."
        },
        {
          id: 3,
          text: "The resistance of a conductor is inversely proportional to its:",
          options: ["Length", "Area of cross-section", "Temperature", "Resistivity"],
          correctIndex: 1,
          explanation: "R = ρ * (L / A). Resistance is inversely proportional to cross-sectional area A."
        },
        {
          id: 4,
          text: "Which of the following acids is present in a bee sting that causes burning pain?",
          options: ["Acetic acid", "Methanoic acid", "Tartaric acid", "Oxalic acid"],
          correctIndex: 1,
          explanation: "Bee sting injects methanoic acid (formic acid), treated using a mild base like baking soda."
        },
        {
          id: 5,
          text: "The SI unit of magnetic field intensity is:",
          options: ["Ohm", "Tesla", "Watt", "Coulomb"],
          correctIndex: 1,
          explanation: "The SI unit of magnetic flux density / magnetic field is Tesla (T)."
        }
      ]
    },
    {
      id: "chal-speed-science",
      title: "Rapid Fire Science",
      subject: "Science",
      difficulty: "Speed Challenge",
      icon: "fa-solid fa-bolt",
      color: "#10B981",
      questionsCount: 5,
      durationMin: 3,
      badge: "Speed Run",
      description: "Test your reflex and recall! 5 questions in 3 minutes.",
      questions: [
        {
          id: 1,
          text: "Which organ produces bile juice in the human digestive system?",
          options: ["Pancreas", "Liver", "Gall bladder", "Stomach"],
          correctIndex: 1,
          explanation: "Bile is synthesized in the liver and stored in the gall bladder."
        },
        {
          id: 2,
          text: "Which gas turns lime water milky due to formation of calcium carbonate?",
          options: ["Carbon dioxide", "Sulfur dioxide", "Hydrogen", "Oxygen"],
          correctIndex: 0,
          explanation: "CO2 reacts with Ca(OH)2 to precipitate white insoluble CaCO3."
        },
        {
          id: 3,
          text: "The ability of the eye lens to adjust its focal length is termed:",
          options: ["Presbyopia", "Accommodation", "Refraction", "Astigmatism"],
          correctIndex: 1,
          explanation: "Power of accommodation is the capacity of the ciliary muscles to adjust the lens curvature."
        },
        {
          id: 4,
          text: "The functional group present in ethanol (C2H5OH) is:",
          options: ["Carboxylic acid", "Aldehyde", "Alcohol (-OH)", "Ketone"],
          correctIndex: 2,
          explanation: "-OH represents the alcohol functional group."
        },
        {
          id: 5,
          text: "Which plant hormone promotes cell division and is present in high concentration in fruits and seeds?",
          options: ["Auxin", "Gibberellin", "Cytokinin", "Abscisic acid"],
          correctIndex: 2,
          explanation: "Cytokinins promote cell division and are found abundantly in rapidly dividing plant tissues."
        }
      ]
    }
  ]
};

// Lookup challenge item by ID (daily or from list)
function getChallengeById(chalId) {
  if (CHALLENGES_DATA.daily.id === chalId) {
    return CHALLENGES_DATA.daily;
  }
  return CHALLENGES_DATA.list.find(c => c.id === chalId) || null;
}
