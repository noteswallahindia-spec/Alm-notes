/**
 * ==========================================================================
 * NOTES WALLAH - Study Module Data
 * Multi-Class & Multi-Stream Curriculum (Class 9, 10, 11 & 12)
 * ==========================================================================
 */

const STUDY_SUBJECTS = [
  {
    id: 'math',
    name: 'Mathematics',
    code: 'MATH-10',
    color: '#2B6DEF',
    bgLight: '#EBF2FE',
    icon: 'fa-solid fa-calculator',
    gradient: 'linear-gradient(135deg, #2B6DEF 0%, #174BB8 100%)',
    chaptersCount: 14,
    completedCount: 5,
    chapters: [
      {
        id: 'math-ch1',
        number: 1,
        title: 'Real Numbers',
        description: 'Explore Fundamental Theorem of Arithmetic, irrational proofs for √2 and √3, and decimal representations.',
        status: 'completed',
        progress: 100,
        pages: 18,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf',
        proNotesUrl: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf',
        proNotesContent: `
          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Core Formula Matrix</h5>
            <div class="pro-formula-card">
              <div class="pro-formula-row">
                <span class="pro-formula-term">Fundamental Theorem of Arithmetic:</span>
                <span class="pro-formula-val">Every composite number = unique product of primes (apart from the order of factors).</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">HCF & LCM Relation:</span>
                <span class="pro-formula-val">HCF(a, b) × LCM(a, b) = a × b  (Valid for 2 numbers only!)</span>
              </div>
            </div>
          </div>

          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-lightbulb"></i> Topper's Exam Strategy & Mnemonics</h5>
            <div class="pro-tip-box">
              <strong>Contradiction Proof for √2 / √3:</strong>
              <ol style="margin-left: 18px; margin-top: 6px; line-height: 1.5;">
                <li>Assume √p is rational = a/b where a and b are co-prime integers (HCF = 1).</li>
                <li>Square both sides: p · b² = a² ⇒ p divides a² ⇒ p divides a.</li>
                <li>Let a = p · c ⇒ p · b² = p² · c² ⇒ b² = p · c² ⇒ p divides b.</li>
                <li>Contradiction! Both a and b share factor p, defying the co-prime assumption. Therefore, √p is irrational.</li>
              </ol>
            </div>
          </div>

          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-star"></i> High-Frequency Board Questions (10-Yr Trend)</h5>
            <div class="pro-qa-card">
              <div class="pro-qa-q">Q1. Given HCF(306, 657) = 9, find LCM(306, 657).</div>
              <div class="pro-qa-a"><strong>Ans:</strong> LCM = (306 × 657) / 9 = 34 × 657 = <strong>22,338</strong>. [CBSE 2019, 2022]</div>
            </div>
            <div class="pro-qa-card">
              <div class="pro-qa-q">Q2. Explain why 7 × 11 × 13 + 13 is a composite number.</div>
              <div class="pro-qa-a"><strong>Ans:</strong> Take out 13: 13(7 × 11 + 1) = 13(78) = 13 × 6 × 13. Since it has more than two factors (1 and itself), it is composite.</div>
            </div>
          </div>

          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-triangle-exclamation"></i> Common Mistakes to Avoid</h5>
            <ul class="pro-warning-list">
              <li><strong>Do NOT apply HCF × LCM = a × b × c for 3 numbers!</strong> It holds strictly for pairs.</li>
              <li>Always explicitly declare "where a and b are co-prime integers and b ≠ 0" in irrationality proofs to secure full credit.</li>
            </ul>
          </div>
        `,
        highlights: [
          'Fundamental Theorem of Arithmetic statement & applications',
          'Proof of irrationality of √2, √3, √5 using contradiction',
          'Prime factorisation method for HCF and LCM'
        ]
      },
      {
        id: 'math-ch2',
        number: 2,
        title: 'Polynomials',
        description: 'Geometrical meaning of zeroes, relationship between zeroes and coefficients of quadratic polynomials.',
        status: 'completed',
        progress: 100,
        pages: 22,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jemh102.pdf',
        proNotesUrl: 'https://ncert.nic.in/textbook/pdf/jemh102.pdf',
        proNotesContent: `
          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Core Formula Matrix</h5>
            <div class="pro-formula-card">
              <div class="pro-formula-row">
                <span class="pro-formula-term">Quadratic Polynomial:</span>
                <span class="pro-formula-val">p(x) = ax² + bx + c (where a ≠ 0)</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Sum of Zeroes:</span>
                <span class="pro-formula-val">α + β = -b / a = -(Coefficient of x) / (Coefficient of x²)</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Product of Zeroes:</span>
                <span class="pro-formula-val">α · β = c / a = (Constant term) / (Coefficient of x²)</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Forming a Polynomial:</span>
                <span class="pro-formula-val">k [x² - (α + β)x + αβ]</span>
              </div>
            </div>
          </div>

          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-lightbulb"></i> Key Concept Pointers</h5>
            <div class="pro-tip-box">
              <strong>Graphical Zeroes:</strong> The zeroes of y = p(x) correspond precisely to the x-coordinates of the points where the graph intersects the x-axis. A quadratic parabola opens upward if a > 0 and downward if a < 0.
            </div>
          </div>

          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-star"></i> High-Yield Board Problems</h5>
            <div class="pro-qa-card">
              <div class="pro-qa-q">Q. If α and β are zeroes of x² - 5x + 6, evaluate 1/α + 1/β and α² + β².</div>
              <div class="pro-qa-a"><strong>Ans:</strong> α + β = 5, αβ = 6.<br>1/α + 1/β = (α + β) / αβ = <strong>5/6</strong>.<br>α² + β² = (α + β)² - 2αβ = 25 - 12 = <strong>13</strong>.</div>
            </div>
          </div>
        `,
        highlights: [
          'Zeroes of linear and quadratic polynomials',
          'Sum of zeroes (α + β = -b/a) & product (αβ = c/a)',
          'Division algorithm for polynomials'
        ]
      },
      {
        id: 'math-ch3',
        number: 3,
        title: 'Pair of Linear Equations in Two Variables',
        description: 'Graphical and algebraic methods: substitution, elimination, and consistency conditions.',
        status: 'completed',
        progress: 100,
        pages: 28,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jemh103.pdf',
        highlights: [
          'Graphical representation & intersection cases',
          'Substitution & Elimination solving techniques',
          'Conditions for unique, infinite, or no solution'
        ]
      },
      {
        id: 'math-ch4',
        number: 4,
        title: 'Quadratic Equations',
        description: 'Standard form ax² + bx + c = 0, factorisation method, quadratic formula, and discriminant nature of roots.',
        status: 'in_progress',
        progress: 65,
        pages: 20,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jemh104.pdf',
        highlights: [
          'Standard form and real-world word problems',
          'Discriminant D = b² - 4ac and roots nature',
          'Quadratic formula x = (-b ± √D) / 2a'
        ]
      },
      {
        id: 'math-ch5',
        number: 5,
        title: 'Arithmetic Progressions',
        description: 'nth term of an AP, common difference, and sum of first n terms with practical problems.',
        status: 'in_progress',
        progress: 40,
        pages: 24,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jemh105.pdf',
        highlights: [
          'General term formula: an = a + (n - 1)d',
          'Sum of n terms: Sn = n/2 [2a + (n - 1)d]',
          'Properties of consecutive arithmetic terms'
        ]
      },
      {
        id: 'math-ch6',
        number: 6,
        title: 'Triangles',
        description: 'Basic Proportionality Theorem (Thales), criteria for similarity (AAA, SSS, SAS) and area ratios.',
        status: 'not_started',
        progress: 0,
        pages: 26,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jemh106.pdf',
        highlights: [
          'Basic Proportionality Theorem & its converse',
          'Similarity criteria (AAA, SAS, SSS)',
          'High frequency board exam proof questions'
        ]
      },
      {
        id: 'math-ch7',
        number: 7,
        title: 'Coordinate Geometry',
        description: 'Distance formula, section formula (internal division), and collinearity conditions on a Cartesian plane.',
        status: 'not_started',
        progress: 0,
        pages: 19,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jemh107.pdf',
        highlights: [
          'Distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]',
          'Section formula for internal coordinate division',
          'Mid-point formula and centroid coordinates'
        ]
      },
      {
        id: 'math-ch8',
        number: 8,
        title: 'Introduction to Trigonometry',
        description: 'Trigonometric ratios of acute angles, values at standard angles (0°, 30°, 45°, 60°, 90°), and identities.',
        status: 'not_started',
        progress: 0,
        pages: 22,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jemh108.pdf',
        highlights: [
          'sin, cos, tan, cot, sec, cosec definitions',
          'Trigonometric values table memorization tips',
          'Core identity: sin²θ + cos²θ = 1'
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    code: 'SCI-10',
    color: '#10B981',
    bgLight: '#ECFDF5',
    icon: 'fa-solid fa-flask-vial',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    chaptersCount: 16,
    completedCount: 6,
    chapters: [
      {
        id: 'sci-ch1',
        number: 1,
        title: 'Chemical Reactions and Equations',
        description: 'Balancing chemical equations, combination, decomposition, displacement, double displacement, redox reactions.',
        status: 'completed',
        progress: 100,
        pages: 20,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jesc101.pdf',
        proNotesUrl: 'https://ncert.nic.in/textbook/pdf/jesc101.pdf',
        proNotesContent: `
          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-flask"></i> Essential Chemical Equations & Colors</h5>
            <div class="pro-formula-card">
              <div class="pro-formula-row">
                <span class="pro-formula-term">Magnesium Ribbon:</span>
                <span class="pro-formula-val">2Mg + O₂ → 2MgO (Dazzling white flame, white powder residue)</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Lead Nitrate Heating:</span>
                <span class="pro-formula-val">2Pb(NO₃)₂ → 2PbO (Yellow solid) + 4NO₂ (Brown fumes) + O₂</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Ferrous Sulphate:</span>
                <span class="pro-formula-val">2FeSO₄ (Green) → Fe₂O₃ (Reddish brown) + SO₂ + SO₃ (Choking smell)</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Precipitation Reaction:</span>
                <span class="pro-formula-val">Na₂SO₄ + BaCl₂ → BaSO₄↓ (White ppt) + 2NaCl</span>
              </div>
            </div>
          </div>

          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-lightbulb"></i> Redox Analysis Trick</h5>
            <div class="pro-tip-box">
              <strong>OIL RIG / Oxygen Transfer:</strong>
              <ul style="margin-left: 18px; margin-top: 6px; line-height: 1.5;">
                <li><strong>Oxidation:</strong> Gain of O or Loss of H (Substance oxidised is the <em>reducing agent</em>).</li>
                <li><strong>Reduction:</strong> Loss of O or Gain of H (Substance reduced is the <em>oxidising agent</em>).</li>
                <li>In: CuO + H₂ → Cu + H₂O: CuO is reduced to Cu; H₂ is oxidised to H₂O.</li>
              </ul>
            </div>
          </div>

          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-star"></i> High-Frequency Board Questions</h5>
            <div class="pro-qa-card">
              <div class="pro-qa-q">Q. Why is respiration considered an exothermic reaction?</div>
              <div class="pro-qa-a"><strong>Ans:</strong> During digestion, carbohydrates break down into glucose. In cellular respiration, glucose combines with oxygen (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy), releasing large amounts of heat/energy.</div>
            </div>
            <div class="pro-qa-card">
              <div class="pro-qa-q">Q. Why do chips manufacturers flush bags with Nitrogen gas?</div>
              <div class="pro-qa-a"><strong>Ans:</strong> Nitrogen is an inert gas. It displaces oxygen and prevents aerial oxidation of oils/fats, preventing rancidity, unpleasant smell, and bad taste.</div>
            </div>
          </div>
        `,
        highlights: [
          'Law of Conservation of Mass in balancing reactions',
          'Endothermic vs Exothermic processes',
          'Corrosion and Rancidity prevention methods'
        ]
      },
      {
        id: 'sci-ch2',
        number: 2,
        title: 'Acids, Bases and Salts',
        description: 'Indicators, pH scale, chemical properties of acids and bases, preparation of bleaching powder and plaster of Paris.',
        status: 'completed',
        progress: 100,
        pages: 24,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jesc102.pdf',
        highlights: [
          'Action of acids on metals and carbonates',
          'Importance of pH in everyday life and tooth decay',
          'Manufacturing & formulas of Washing Soda, Baking Soda, PoP'
        ]
      },
      {
        id: 'sci-ch3',
        number: 3,
        title: 'Metals and Non-metals',
        description: 'Physical and chemical properties, reactivity series, formation of ionic compounds, metallurgy and corrosion.',
        status: 'completed',
        progress: 100,
        pages: 26,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jesc103.pdf',
        highlights: [
          'Reactivity series of metals & displacement',
          'Properties of ionic compounds & electron transfer',
          'Roasting, calcination, and electrolytic refining'
        ]
      },
      {
        id: 'sci-ch4',
        number: 4,
        title: 'Carbon and its Compounds',
        description: 'Covalent bonding, versatile nature of carbon, homologous series, functional groups, and cleansing action of soap.',
        status: 'in_progress',
        progress: 70,
        pages: 28,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jesc104.pdf',
        highlights: [
          'Catenation and tetravalency of Carbon',
          'IUPAC nomenclature of alcohols, aldehydes, ketones',
          'Difference between soaps and synthetic detergents'
        ]
      },
      {
        id: 'sci-ch5',
        number: 5,
        title: 'Life Processes',
        description: 'Nutrition (autotrophic & heterotrophic), respiration (aerobic & anaerobic), transportation in plants & humans, excretion.',
        status: 'completed',
        progress: 100,
        pages: 32,
        readTime: '50 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jesc106.pdf',
        highlights: [
          'Steps of photosynthesis and stomatal regulation',
          'Structure and working of Human Heart & circulation',
          'Nephron structure and urine formation mechanism'
        ]
      },
      {
        id: 'sci-ch6',
        number: 6,
        title: 'Control and Coordination',
        description: 'Nervous system, reflex arc, parts of the human brain, plant hormones (auxins, gibberellins), and animal endocrine glands.',
        status: 'in_progress',
        progress: 35,
        pages: 22,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jesc107.pdf',
        highlights: [
          'Structure of neuron and transmission of nerve impulses',
          'Forebrain, midbrain, and hindbrain functions',
          'Tropic movements in plants vs nastic responses'
        ]
      },
      {
        id: 'sci-ch7',
        number: 7,
        title: 'Light – Reflection and Refraction',
        description: 'Spherical mirrors, mirror formula, magnification, laws of refraction, lens formula, and power of a lens.',
        status: 'completed',
        progress: 100,
        pages: 30,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jesc110.pdf',
        highlights: [
          'Ray diagrams for concave and convex mirrors',
          'Refraction through glass slab & Snell\'s law',
          'Lens formula 1/v - 1/u = 1/f & power P = 1/f'
        ]
      },
      {
        id: 'sci-ch8',
        number: 8,
        title: 'Electricity',
        description: 'Ohm’s law, resistance, factors affecting resistance, series and parallel circuits, Joule\'s law of heating, electric power.',
        status: 'not_started',
        progress: 0,
        pages: 25,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jesc112.pdf',
        highlights: [
          'Ohm\'s law statement and V-I graph verification',
          'Equivalent resistance in series & parallel circuits',
          'Heating effect H = I²Rt and commercial unit of energy'
        ]
      }
    ]
  },
  {
    id: 'social',
    name: 'Social Science',
    code: 'SST-10',
    color: '#8B5CF6',
    bgLight: '#F3E8FF',
    icon: 'fa-solid fa-landmark',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    chaptersCount: 14,
    completedCount: 6,
    chapters: [
      {
        id: 'sst-ch1',
        number: 1,
        title: 'The Rise of Nationalism in Europe',
        description: 'French Revolution impact, making of nationalism in Europe, unification of Germany and Italy, and visualising the nation.',
        status: 'completed',
        progress: 100,
        pages: 26,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jess101.pdf',
        highlights: [
          'Napoleonic Code of 1804 provisions',
          'Role of Mazzini, Cavour, and Garibaldi in Italy unification',
          'Bismarck\'s role in German unification'
        ]
      },
      {
        id: 'sst-ch2',
        number: 2,
        title: 'Nationalism in India',
        description: 'First World War, Khilafat & Non-Cooperation movement, Salt March & Civil Disobedience, sense of collective belonging.',
        status: 'completed',
        progress: 100,
        pages: 28,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jess102.pdf',
        highlights: [
          'Rowlatt Act and Jallianwala Bagh massacre impacts',
          'Dandi March & Launch of Civil Disobedience movement',
          'Participation of peasants, tribal communities, and women'
        ]
      },
      {
        id: 'sst-ch3',
        number: 3,
        title: 'Power Sharing',
        description: 'Case studies of Belgium and Sri Lanka, majoritarianism vs accommodation, and forms of power sharing in modern democracies.',
        status: 'completed',
        progress: 100,
        pages: 16,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jess301.pdf',
        highlights: [
          'Ethnic composition of Belgium and Sri Lanka',
          'Prudential and moral reasons for power sharing',
          'Horizontal vs Vertical distribution of power'
        ]
      },
      {
        id: 'sst-ch4',
        number: 4,
        title: 'Federalism',
        description: 'What makes India a federal country, linguistic states, Centre-State relations, and decentralisation in India (1992 amendment).',
        status: 'in_progress',
        progress: 55,
        pages: 18,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jess302.pdf',
        highlights: [
          'Union, State, and Concurrent legislative lists',
          'Coming together vs Holding together federations',
          '73rd & 74th Constitutional amendments (Panchayati Raj)'
        ]
      },
      {
        id: 'sst-ch5',
        number: 5,
        title: 'Development (Economics)',
        description: 'What development promises, national development, comparison of countries by income, and sustainability of development.',
        status: 'completed',
        progress: 100,
        pages: 18,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jess201.pdf',
        highlights: [
          'Different persons have different developmental goals',
          'World Bank criterion vs UNDP Human Development Index (HDI)',
          'Net Attendance Ratio, IMR, and Literacy Rate metrics'
        ]
      },
      {
        id: 'sst-ch6',
        number: 6,
        title: 'Resources and Development (Geography)',
        description: 'Classification of resources, sustainable development, resource planning in India, soil types and conservation.',
        status: 'in_progress',
        progress: 60,
        pages: 22,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jess401.pdf',
        highlights: [
          'Rio de Janeiro Earth Summit 1992 & Agenda 21',
          'Land use pattern and causes of land degradation',
          'Alluvial, Black, Red & Yellow, and Laterite soils'
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English',
    code: 'ENG-10',
    color: '#FF7A00',
    bgLight: '#FFF4E5',
    icon: 'fa-solid fa-feather-pointed',
    gradient: 'linear-gradient(135deg, #FF8A00 0%, #E55300 100%)',
    chaptersCount: 11,
    completedCount: 5,
    chapters: [
      {
        id: 'eng-ch1',
        number: 1,
        title: 'A Letter to God',
        description: 'Lencho\'s profound faith in God, devastation caused by hailstorm, and post office workers\' empathy.',
        status: 'completed',
        progress: 100,
        pages: 12,
        readTime: '20 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jeef101.pdf',
        highlights: [
          'Character sketch of Lencho & the Postmaster',
          'Irony at the heart of the ending (bunch of crooks)',
          'Key vocabulary and character motivation themes'
        ]
      },
      {
        id: 'eng-ch2',
        number: 2,
        title: 'Nelson Mandela: Long Walk to Freedom',
        description: 'Extract from Mandela’s autobiography on the historic inauguration ceremony, courage, and twin obligations.',
        status: 'completed',
        progress: 100,
        pages: 16,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jeef102.pdf',
        highlights: [
          'Significance of 10th May 1994 inauguration',
          'Definition of courage: triumph over fear, not absence of fear',
          'Mandela\'s reflections on twin obligations to family & country'
        ]
      },
      {
        id: 'eng-ch3',
        number: 3,
        title: 'Two Stories about Flying',
        description: 'Part I: His First Flight (young seagull overcoming fear) & Part II: Black Aeroplane (mysterious rescue in storm).',
        status: 'in_progress',
        progress: 60,
        pages: 15,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jeef103.pdf',
        highlights: [
          'Overcoming initial fear through necessity and parental guidance',
          'The enigma of the black aeroplane pilot in Dakota DS 088',
          'Symbolism of self-confidence and instinct'
        ]
      },
      {
        id: 'eng-ch4',
        number: 4,
        title: 'From the Diary of Anne Frank',
        description: 'Intimate thoughts of a 13-year-old girl in hiding, relationship with teachers, and the importance of Kitty.',
        status: 'not_started',
        progress: 0,
        pages: 14,
        readTime: '22 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jeef104.pdf',
        highlights: [
          'Why Anne considered paper to have more patience than people',
          'Humorous essays on talkativeness given by Mr. Keesing',
          'Historical background of wartime persecution'
        ]
      }
    ]
  },
  {
    id: 'hindi',
    name: 'Hindi',
    code: 'HIN-10',
    color: '#0EA5E9',
    bgLight: '#E0F2FE',
    icon: 'fa-solid fa-language',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    chaptersCount: 9,
    completedCount: 4,
    chapters: [
      {
        id: 'hin-ch1',
        number: 1,
        title: 'साखी (कबीरदास)',
        description: 'कबीर की साखियों में मीठी वाणी, ईश्वर की सर्वव्यापकता, अहंकार त्याग तथा सच्चा ज्ञान का महत्व।',
        status: 'completed',
        progress: 100,
        pages: 10,
        readTime: '18 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jhsp101.pdf',
        highlights: [
          'ऐसी बानी बोलिए, मन का आपा खोइ - भावार्थ',
          'कस्तूरी कुंडलि बसै, मृग ढूंढै बन माहि - उपमा अलंकार',
          'कबीर का समाज सुधारक दृष्टिकोण'
        ]
      },
      {
        id: 'hin-ch2',
        number: 2,
        title: 'पद (मीराबाई)',
        description: 'श्रीकृष्ण के प्रति मीरा की अनन्य भक्ति, समर्पण, विरह वेदना और उद्धार की प्रार्थना।',
        status: 'completed',
        progress: 100,
        pages: 12,
        readTime: '20 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jhsp102.pdf',
        highlights: [
          'हरि आप हरो जन री भीर - द्रोपदी व गजराज के दृष्टांत',
          'चाकरी करने का भाव एवं भक्ति के तीनों रूप',
          'माधुर्य भाव की भक्ति और राजस्थानी मिश्रित ब्रजभाषा'
        ]
      },
      {
        id: 'hin-ch3',
        number: 3,
        title: 'बड़े भाई साहब (मुंशी प्रेमचंद)',
        description: 'किताबी ज्ञान बनाम व्यावहारिक अनुभव की द्वंद्वात्मक कहानी, बाल मनोविज्ञान और भाईचारे का चित्रण।',
        status: 'in_progress',
        progress: 50,
        pages: 18,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/jhsp103.pdf',
        highlights: [
          'शिक्षा प्रणाली की रटंत पद्धति पर प्रेमचंद का व्यंग्य',
          'बड़े भाई साहब का छोटा भाई के प्रति स्नेह और त्याग',
          'जीवन में अनुभव और उम्र के महत्व का मार्मिक अंत'
        ]
      }
    ]
  }
];



// ==========================================================================
// CLASS 10 CURRICULUM ALIAS
// ==========================================================================
const CLASS_10_SUBJECTS = STUDY_SUBJECTS;

// ==========================================================================
// CLASS 9 CURRICULUM (CBSE Normal Subjects)
// ==========================================================================
const CLASS_9_SUBJECTS = [
  {
    id: 'c9-math',
    name: 'Mathematics',
    code: 'MATH-9',
    color: '#2B6DEF',
    bgLight: '#EBF2FE',
    icon: 'fa-solid fa-calculator',
    gradient: 'linear-gradient(135deg, #2B6DEF 0%, #174BB8 100%)',
    chaptersCount: 12,
    completedCount: 4,
    chapters: [
      {
        id: 'c9-math-ch1',
        number: 1,
        title: 'Number Systems',
        description: 'Irrational numbers, real numbers and their decimal expansions, representing real numbers on the number line, laws of exponents.',
        status: 'completed',
        progress: 100,
        pages: 20,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iemh101.pdf',
        proNotesUrl: 'https://ncert.nic.in/textbook/pdf/iemh101.pdf',
        proNotesContent: `
          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Number Systems Summary</h5>
            <div class="pro-formula-card">
              <div class="pro-formula-row">
                <span class="pro-formula-term">Rational Number:</span>
                <span class="pro-formula-val">Can be expressed as p/q, q ≠ 0, p and q are integers.</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Irrational Number:</span>
                <span class="pro-formula-val">Non-terminating, non-repeating decimal expansion (e.g. √2, √3, π).</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Laws of Exponents:</span>
                <span class="pro-formula-val">a^m · a^n = a^(m+n), (a^m)^n = a^(mn), a^m / a^n = a^(m-n)</span>
              </div>
            </div>
          </div>
        `,
        highlights: [
          'Rational and irrational number classification',
          'Rationalising the denominator techniques',
          'Laws of exponents for real bases'
        ]
      },
      {
        id: 'c9-math-ch2',
        number: 2,
        title: 'Polynomials',
        description: 'Polynomials in one variable, zeroes of a polynomial, Remainder Theorem, Factor Theorem, and algebraic identities.',
        status: 'completed',
        progress: 100,
        pages: 22,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iemh102.pdf',
        highlights: [
          'Degree and classification of polynomials',
          'Remainder Theorem & Factor Theorem',
          'Important algebraic identities expansion'
        ]
      },
      {
        id: 'c9-math-ch3',
        number: 3,
        title: 'Coordinate Geometry',
        description: 'Cartesian system, origin, axes, quadrants, and plotting points on the Cartesian plane.',
        status: 'in_progress',
        progress: 60,
        pages: 16,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iemh103.pdf',
        highlights: [
          'Cartesian coordinates: abscissa & ordinate',
          'Four quadrants and sign conventions',
          'Plotting points in coordinate plane'
        ]
      },
      {
        id: 'c9-math-ch4',
        number: 4,
        title: 'Linear Equations in Two Variables',
        description: 'Standard form ax + by + c = 0, solution of linear equations, and graphs of linear equations in two variables.',
        status: 'not_started',
        progress: 0,
        pages: 18,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iemh104.pdf',
        highlights: [
          'Linear equation representation: ax + by + c = 0',
          'Infinitely many solutions for a line',
          'Graphing straight lines on Cartesian plane'
        ]
      }
    ]
  },
  {
    id: 'c9-science',
    name: 'Science',
    code: 'SCI-9',
    color: '#10B981',
    bgLight: '#E8F8F2',
    icon: 'fa-solid fa-flask-vial',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    chaptersCount: 12,
    completedCount: 3,
    chapters: [
      {
        id: 'c9-sci-ch1',
        number: 1,
        title: 'Matter in Our Surroundings',
        description: 'Physical nature of matter, characteristics of particles, states of matter, and evaporation.',
        status: 'completed',
        progress: 100,
        pages: 16,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iesc101.pdf',
        highlights: [
          'Solid, Liquid, Gas kinetic properties',
          'Latent heat of fusion and vaporization',
          'Evaporation and cooling effect factors'
        ]
      },
      {
        id: 'c9-sci-ch2',
        number: 2,
        title: 'Atoms and Molecules',
        description: 'Laws of chemical combination, Dalton\'s atomic theory, atomic mass, molecular mass, and chemical formulas.',
        status: 'in_progress',
        progress: 50,
        pages: 20,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iesc103.pdf',
        highlights: [
          'Law of Conservation of Mass and Definite Proportions',
          'Writing chemical formula using valency',
          'Molecular mass calculation'
        ]
      },
      {
        id: 'c9-sci-ch3',
        number: 3,
        title: 'Force and Laws of Motion',
        description: 'Balanced and unbalanced forces, Newton\'s three laws of motion, momentum, and inertia.',
        status: 'not_started',
        progress: 0,
        pages: 22,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iesc109.pdf',
        highlights: [
          'Newton\'s First Law & Inertia',
          'Newton\'s Second Law: F = dp/dt = ma',
          'Newton\'s Third Law: Action-Reaction pairs'
        ]
      }
    ]
  },
  {
    id: 'c9-social',
    name: 'Social Science',
    code: 'SST-9',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-earth-americas',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    chaptersCount: 16,
    completedCount: 4,
    chapters: [
      {
        id: 'c9-sst-ch1',
        number: 1,
        title: 'India - Size and Location',
        description: 'Location, size, India and the world, India\'s neighbours and strategic maritime position.',
        status: 'completed',
        progress: 100,
        pages: 14,
        readTime: '20 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iess101.pdf',
        highlights: [
          'Latitudinal & longitudinal extent of India',
          'Standard Meridian: 82°30\' E at Mirzapur',
          'Strategic significance of Indian Ocean routes'
        ]
      },
      {
        id: 'c9-sst-ch2',
        number: 2,
        title: 'What is Democracy? Why Democracy?',
        description: 'Features of democracy, arguments for and against democracy, broader meaning of democratic institutions.',
        status: 'in_progress',
        progress: 60,
        pages: 18,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iess201.pdf',
        highlights: [
          'Major decisions by elected leaders',
          'Free and fair electoral competition',
          'Rule of law and respect for rights'
        ]
      }
    ]
  },
  {
    id: 'c9-english',
    name: 'English',
    code: 'ENG-9',
    color: '#8B5CF6',
    bgLight: '#F3E8FF',
    icon: 'fa-solid fa-feather-pointed',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    chaptersCount: 10,
    completedCount: 3,
    chapters: [
      {
        id: 'c9-eng-ch1',
        number: 1,
        title: 'The Fun They Had (Isaac Asimov)',
        description: 'Futuristic vision of computerized tele-books, mechanical teachers, and the nostalgia of ancient schools.',
        status: 'completed',
        progress: 100,
        pages: 12,
        readTime: '20 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iebe101.pdf',
        highlights: [
          'Margie and Tommy finding a real printed book in 2157',
          'Contrast between mechanical screen teaching and human schools',
          'Themes of peer socialization and learning joy'
        ]
      },
      {
        id: 'c9-eng-ch2',
        number: 2,
        title: 'The Sound of Music: Evelyn Glennie',
        description: 'Inspiring journey of Evelyn Glennie who conquered profound deafness to become a world-renowned solo percussionist.',
        status: 'in_progress',
        progress: 40,
        pages: 14,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/iebe102.pdf',
        highlights: [
          'Sensing sound through vibrations of the body',
          'Ron Forbes guidance and determination',
          'Inspiration for physically challenged children'
        ]
      }
    ]
  },
  {
    id: 'c9-hindi',
    name: 'Hindi',
    code: 'HIN-9',
    color: '#EF4444',
    bgLight: '#FEE2E2',
    icon: 'fa-solid fa-book',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    chaptersCount: 10,
    completedCount: 2,
    chapters: [
      {
        id: 'c9-hin-ch1',
        number: 1,
        title: 'दो बैलों की कथा (प्रेमचंद)',
        description: 'हीरा और मोती की स्वाभिमान और मित्रता की अमर कहानी, स्वतंत्रता के संघर्ष का प्रतीकात्मक चित्रण।',
        status: 'completed',
        progress: 100,
        pages: 20,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/ihks101.pdf',
        highlights: [
          'पशुओं और मनुष्य के भावनात्मक संबंध',
          'स्वतंत्रता बिना संघर्ष के नहीं मिलती',
          'प्रेमचंद की सरल व प्रभावशाली ग्रामीण भाषा'
        ]
      }
    ]
  }
];

// ==========================================================================
// CLASS 11 CURRICULUM: SCIENCE STREAM
// ==========================================================================
const CLASS_11_SCIENCE_SUBJECTS = [
  {
    id: 'c11-phys',
    name: 'Physics',
    code: 'PHY-11',
    color: '#7C3AED',
    bgLight: '#EDE9FE',
    icon: 'fa-solid fa-atom',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    chaptersCount: 14,
    completedCount: 4,
    chapters: [
      {
        id: 'c11-phys-ch1',
        number: 1,
        title: 'Units and Measurements',
        description: 'SI units, dimensional analysis, applications of dimensional equations, significant figures, and error analysis.',
        status: 'completed',
        progress: 100,
        pages: 24,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/keph101.pdf',
        proNotesUrl: 'https://ncert.nic.in/textbook/pdf/keph101.pdf',
        proNotesContent: `
          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Fundamental Formulas & Dimensions</h5>
            <div class="pro-formula-card">
              <div class="pro-formula-row">
                <span class="pro-formula-term">Force [F]:</span>
                <span class="pro-formula-val">[M L T^-2]</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Work / Energy [W]:</span>
                <span class="pro-formula-val">[M L^2 T^-2]</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Universal Gravitational Constant [G]:</span>
                <span class="pro-formula-val">[M^-1 L^3 T^-2]</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Principle of Homogeneity:</span>
                <span class="pro-formula-val">In any physical equation, dimensions on LHS = dimensions on RHS.</span>
              </div>
            </div>
          </div>
        `,
        highlights: [
          'Dimensional formulas of basic & derived constants',
          'Converting units across MKS and CGS systems',
          'Relative error and percentage error propagation'
        ]
      },
      {
        id: 'c11-phys-ch2',
        number: 2,
        title: 'Motion in a Straight Line',
        description: 'Position-time graph, instantaneous velocity and acceleration, equations of motion by calculus, and relative velocity.',
        status: 'in_progress',
        progress: 75,
        pages: 26,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/keph102.pdf',
        highlights: [
          'Kinematic equations: v = u + at, s = ut + 1/2 at^2, v^2 = u^2 + 2as',
          'Calculus derivations: v = dx/dt, a = dv/dt = v dv/dx',
          'Motion under gravity and stopping distance'
        ]
      },
      {
        id: 'c11-phys-ch3',
        number: 3,
        title: 'Laws of Motion',
        description: 'Inertia, momentum, Newton\'s laws, impulse, conservation of linear momentum, friction, and circular banking.',
        status: 'not_started',
        progress: 0,
        pages: 30,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/keph104.pdf',
        highlights: [
          'Free Body Diagrams (FBD) problem solving',
          'Friction laws: Static, Limiting, and Kinetic friction',
          'Banking of roads: tan θ = v^2 / (rg)'
        ]
      }
    ]
  },
  {
    id: 'c11-chem',
    name: 'Chemistry',
    code: 'CHEM-11',
    color: '#EC4899',
    bgLight: '#FCE7F3',
    icon: 'fa-solid fa-vial',
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)',
    chaptersCount: 14,
    completedCount: 3,
    chapters: [
      {
        id: 'c11-chem-ch1',
        number: 1,
        title: 'Some Basic Concepts of Chemistry',
        description: 'Mole concept, molar mass, stoichiometry, empirical and molecular formulas, percentage composition, and molarity.',
        status: 'completed',
        progress: 100,
        pages: 22,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kech101.pdf',
        highlights: [
          '1 Mole = 6.022 × 10^23 particles (Avogadro Constant)',
          'Molarity (M) = moles of solute / volume of solution (L)',
          'Limiting reagent identification in reactions'
        ]
      },
      {
        id: 'c11-chem-ch2',
        number: 2,
        title: 'Structure of Atom',
        description: 'Bohr\'s model, de Broglie relation, Heisenberg\'s uncertainty principle, quantum numbers, Aufbau principle, and Hund\'s rule.',
        status: 'in_progress',
        progress: 60,
        pages: 28,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kech102.pdf',
        highlights: [
          'Bohr radius and energy: E_n = -13.6 / n^2 eV',
          'de Broglie wavelength: λ = h / (mv)',
          'Quantum numbers (n, l, m, s) and electronic configurations'
        ]
      }
    ]
  },
  {
    id: 'c11-math',
    name: 'Mathematics',
    code: 'MATH-11',
    color: '#2B6DEF',
    bgLight: '#EBF2FE',
    icon: 'fa-solid fa-square-root-variable',
    gradient: 'linear-gradient(135deg, #2B6DEF 0%, #174BB8 100%)',
    chaptersCount: 16,
    completedCount: 4,
    chapters: [
      {
        id: 'c11-math-ch1',
        number: 1,
        title: 'Sets and Functions',
        description: 'Roster and set-builder form, subsets, union, intersection, Cartesian product, relations, and types of functions.',
        status: 'completed',
        progress: 100,
        pages: 24,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kemh101.pdf',
        highlights: [
          'Venn diagrams and subset operations',
          'Cartesian product A × B',
          'Domain, codomain, and range of functions'
        ]
      },
      {
        id: 'c11-math-ch2',
        number: 2,
        title: 'Trigonometric Functions',
        description: 'Radian measure, trigonometric identities, sum and product formulas, double and triple angle identities.',
        status: 'in_progress',
        progress: 50,
        pages: 28,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kemh103.pdf',
        highlights: [
          'Angle conversion: π rad = 180°',
          'cos(x+y) = cos x cos y - sin x sin y',
          'sin 2x = 2 sin x cos x, cos 2x = cos^2 x - sin^2 x'
        ]
      }
    ]
  },
  {
    id: 'c11-bio',
    name: 'Biology',
    code: 'BIO-11',
    color: '#10B981',
    bgLight: '#E8F8F2',
    icon: 'fa-solid fa-dna',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    chaptersCount: 19,
    completedCount: 3,
    chapters: [
      {
        id: 'c11-bio-ch1',
        number: 1,
        title: 'The Living World',
        description: 'What is living?, biodiversity, need for classification, three domains of life, taxonomy, and binomial nomenclature.',
        status: 'completed',
        progress: 100,
        pages: 18,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kebo101.pdf',
        highlights: [
          'Defining characteristics of living organisms',
          'Carolus Linnaeus Binomial Nomenclature',
          'Taxonomic hierarchy: Kingdom to Species'
        ]
      },
      {
        id: 'c11-bio-ch2',
        number: 2,
        title: 'Biological Classification',
        description: 'Five kingdom classification by Whittaker: Monera, Protista, Fungi, Plantae, and Animalia; viruses and viroids.',
        status: 'in_progress',
        progress: 40,
        pages: 24,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kebo102.pdf',
        highlights: [
          'Five Kingdom Classification criteria',
          'Structure and nutrition in Fungi',
          'Viruses, viroids, and lichens characteristics'
        ]
      }
    ]
  },
  {
    id: 'c11-eng',
    name: 'English Core',
    code: 'ENG-11',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-feather-pointed',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    chaptersCount: 8,
    completedCount: 2,
    chapters: [
      {
        id: 'c11-eng-ch1',
        number: 1,
        title: 'The Portrait of a Lady (Khushwant Singh)',
        description: 'Affectionate bond between author and his grandmother, their changing relationship as he moves to the city.',
        status: 'completed',
        progress: 100,
        pages: 14,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kehb101.pdf',
        highlights: [
          'Village school versus city English school',
          'Grandmother\'s prayer routine and feeding sparrows',
          'Touching silent mourning by sparrows upon her death'
        ]
      }
    ]
  }
];

// ==========================================================================
// CLASS 11 CURRICULUM: COMMERCE STREAM
// ==========================================================================
const CLASS_11_COMMERCE_SUBJECTS = [
  {
    id: 'c11-acct',
    name: 'Accountancy',
    code: 'ACCT-11',
    color: '#2563EB',
    bgLight: '#EFF6FF',
    icon: 'fa-solid fa-receipt',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    chaptersCount: 13,
    completedCount: 3,
    chapters: [
      {
        id: 'c11-acct-ch1',
        number: 1,
        title: 'Introduction to Accounting',
        description: 'Meaning, objectives, qualitative characteristics of accounting information, role of accountant in business.',
        status: 'completed',
        progress: 100,
        pages: 20,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/keac101.pdf',
        highlights: [
          'Accounting as an information system',
          'Assets, Liabilities, Capital, Revenue and Expenses',
          'Distinction between Book-keeping and Accounting'
        ]
      },
      {
        id: 'c11-acct-ch2',
        number: 2,
        title: 'Theory Base of Accounting & Standards',
        description: 'Accounting concepts: Going concern, Consistency, Accrual, Matching, Prudence; GAAP and GST overview.',
        status: 'in_progress',
        progress: 60,
        pages: 22,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/keac102.pdf',
        highlights: [
          'Dual Aspect principle: Assets = Liabilities + Capital',
          'Accrual vs Cash basis of accounting',
          'Revenue recognition and Prudence concept'
        ]
      }
    ]
  },
  {
    id: 'c11-bst',
    name: 'Business Studies',
    code: 'BST-11',
    color: '#0891B2',
    bgLight: '#ECFEFF',
    icon: 'fa-solid fa-briefcase',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    chaptersCount: 10,
    completedCount: 2,
    chapters: [
      {
        id: 'c11-bst-ch1',
        number: 1,
        title: 'Nature and Purpose of Business',
        description: 'Economic and non-economic activities, concept of business, characteristics, business risks and objectives.',
        status: 'completed',
        progress: 100,
        pages: 20,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kebs101.pdf',
        highlights: [
          'Classification of business: Industry and Commerce',
          'Multiple objectives of business: Economic & Social',
          'Causes and nature of business risks'
        ]
      }
    ]
  },
  {
    id: 'c11-econ',
    name: 'Economics',
    code: 'ECON-11',
    color: '#059669',
    bgLight: '#ECFDF5',
    icon: 'fa-solid fa-chart-line',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    chaptersCount: 12,
    completedCount: 3,
    chapters: [
      {
        id: 'c11-econ-ch1',
        number: 1,
        title: 'Introduction to Microeconomics',
        description: 'Scarcity, central problems of an economy: What, How and For Whom to produce, PPC curve and opportunity cost.',
        status: 'completed',
        progress: 100,
        pages: 18,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/keec101.pdf',
        highlights: [
          'Production Possibility Curve (PPC) and concave shape',
          'Marginal Opportunity Cost (MOC)',
          'Positive vs Normative economic statements'
        ]
      }
    ]
  },
  {
    id: 'c11-eng-comm',
    name: 'English Core',
    code: 'ENG-11',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-feather-pointed',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    chaptersCount: 8,
    completedCount: 2,
    chapters: [
      {
        id: 'c11-eng-comm-ch1',
        number: 1,
        title: 'The Portrait of a Lady (Khushwant Singh)',
        description: 'Affectionate bond between author and his grandmother, their changing relationship as he moves to the city.',
        status: 'completed',
        progress: 100,
        pages: 14,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kehb101.pdf',
        highlights: [
          'Village school versus city English school',
          'Grandmother\'s prayer routine and feeding sparrows',
          'Touching silent mourning by sparrows upon her death'
        ]
      }
    ]
  }
];

// ==========================================================================
// CLASS 11 CURRICULUM: ARTS / HUMANITIES STREAM
// ==========================================================================
const CLASS_11_ARTS_SUBJECTS = [
  {
    id: 'c11-hist',
    name: 'History',
    code: 'HIST-11',
    color: '#B45309',
    bgLight: '#FFFBEB',
    icon: 'fa-solid fa-monument',
    gradient: 'linear-gradient(135deg, #D97706 0%, #92400E 100%)',
    chaptersCount: 11,
    completedCount: 2,
    chapters: [
      {
        id: 'c11-hist-ch1',
        number: 1,
        title: 'Early Societies: From the Beginning of Time',
        description: 'Hominids and modern humans, early hunting and gathering communities, discovery of fire, cave art at Altamira.',
        status: 'completed',
        progress: 100,
        pages: 24,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kehs101.pdf',
        highlights: [
          'Australopithecus and Homo species emergence',
          'Hadar and Olduvai Gorge archaeological evidence',
          'Hunter-gatherer communication and hunting tools'
        ]
      }
    ]
  },
  {
    id: 'c11-pol',
    name: 'Political Science',
    code: 'POL-11',
    color: '#4338CA',
    bgLight: '#EEF2FF',
    icon: 'fa-solid fa-scale-balanced',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
    chaptersCount: 10,
    completedCount: 3,
    chapters: [
      {
        id: 'c11-pol-ch1',
        number: 1,
        title: 'Constitution: Why and How?',
        description: 'Why do we need a constitution?, constituent assembly debates, borrowing from world constitutions, and foundational values.',
        status: 'completed',
        progress: 100,
        pages: 22,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/keps101.pdf',
        highlights: [
          'Coordination and assurance among diverse groups',
          'Limiting powers of the government',
          'Aspirations and goals of a sovereign republic'
        ]
      }
    ]
  },
  {
    id: 'c11-geog',
    name: 'Geography',
    code: 'GEOG-11',
    color: '#0D9488',
    bgLight: '#F0FDFA',
    icon: 'fa-solid fa-earth-asia',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
    chaptersCount: 14,
    completedCount: 3,
    chapters: [
      {
        id: 'c11-geog-ch1',
        number: 1,
        title: 'Geography as a Discipline',
        description: 'Nature of geography, branches of physical and human geography, interface with other natural and social sciences.',
        status: 'completed',
        progress: 100,
        pages: 16,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kegy101.pdf',
        highlights: [
          'Spatial synthesis and areal differentiation',
          'Physical geography vs Human geography branches',
          'Remote sensing, GIS and GPS spatial technologies'
        ]
      }
    ]
  },
  {
    id: 'c11-eng-arts',
    name: 'English Core',
    code: 'ENG-11',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-feather-pointed',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    chaptersCount: 8,
    completedCount: 2,
    chapters: [
      {
        id: 'c11-eng-arts-ch1',
        number: 1,
        title: 'The Portrait of a Lady (Khushwant Singh)',
        description: 'Affectionate bond between author and his grandmother, their changing relationship as he moves to the city.',
        status: 'completed',
        progress: 100,
        pages: 14,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/kehb101.pdf',
        highlights: [
          'Village school versus city English school',
          'Grandmother\'s prayer routine and feeding sparrows',
          'Touching silent mourning by sparrows upon her death'
        ]
      }
    ]
  }
];

// ==========================================================================
// CLASS 12 CURRICULUM: SCIENCE STREAM
// ==========================================================================
const CLASS_12_SCIENCE_SUBJECTS = [
  {
    id: 'c12-phys',
    name: 'Physics',
    code: 'PHY-12',
    color: '#7C3AED',
    bgLight: '#EDE9FE',
    icon: 'fa-solid fa-atom',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    chaptersCount: 14,
    completedCount: 5,
    chapters: [
      {
        id: 'c12-phys-ch1',
        number: 1,
        title: 'Electric Charges and Fields',
        description: 'Coulomb\'s law, electric field lines, electric dipole, flux, and Gauss\'s theorem with cylindrical and planar applications.',
        status: 'completed',
        progress: 100,
        pages: 32,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/leph101.pdf',
        proNotesUrl: 'https://ncert.nic.in/textbook/pdf/leph101.pdf',
        proNotesContent: `
          <div class="pro-notes-section">
            <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Electrostatics Formula Sheet</h5>
            <div class="pro-formula-card">
              <div class="pro-formula-row">
                <span class="pro-formula-term">Coulomb\'s Force:</span>
                <span class="pro-formula-val">F = (1 / 4πε₀) · (|q₁q₂| / r²)</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Electric Field of Dipole (Axial):</span>
                <span class="pro-formula-val">E_axial = (1 / 4πε₀) · (2p / r³)</span>
              </div>
              <div class="pro-formula-row">
                <span class="pro-formula-term">Gauss\'s Law:</span>
                <span class="pro-formula-val">∮ E · dA = q_enclosed / ε₀</span>
              </div>
            </div>
          </div>
        `,
        highlights: [
          'Quantisation and conservation of electric charge',
          'Torque on a dipole in uniform electric field (τ = p × E)',
          'Gauss\'s law derivations for wire and plane sheet'
        ]
      },
      {
        id: 'c12-phys-ch2',
        number: 2,
        title: 'Electrostatic Potential and Capacitance',
        description: 'Electric potential due to point charge and dipole, equipotential surfaces, parallel plate capacitor, and dielectrics.',
        status: 'in_progress',
        progress: 80,
        pages: 28,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/leph102.pdf',
        highlights: [
          'Potential: V = q / (4πε₀r)',
          'Capacitance: C = ε₀A / d (with dielectric C = K·C₀)',
          'Energy stored in capacitor: U = 1/2 CV²'
        ]
      },
      {
        id: 'c12-phys-ch3',
        number: 3,
        title: 'Current Electricity',
        description: 'Ohm\'s law, drift velocity, resistivity, Kirchhoff\'s laws, Wheatstone bridge, and meter bridge calculations.',
        status: 'completed',
        progress: 100,
        pages: 30,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/leph103.pdf',
        highlights: [
          'Drift velocity relation: I = n·e·A·v_d',
          'Kirchhoff\'s Current Law (KCL) & Voltage Law (KVL)',
          'Wheatstone Bridge balanced condition: P/Q = R/S'
        ]
      }
    ]
  },
  {
    id: 'c12-chem',
    name: 'Chemistry',
    code: 'CHEM-12',
    color: '#EC4899',
    bgLight: '#FCE7F3',
    icon: 'fa-solid fa-vial',
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)',
    chaptersCount: 10,
    completedCount: 4,
    chapters: [
      {
        id: 'c12-chem-ch1',
        number: 1,
        title: 'Solutions',
        description: 'Types of solutions, Henry\'s law, Raoult\'s law, colligative properties: boiling elevation, freezing depression, osmotic pressure, and Van \'t Hoff factor.',
        status: 'completed',
        progress: 100,
        pages: 26,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lech101.pdf',
        highlights: [
          'Raoult\'s Law for volatile and non-volatile solutes',
          'Colligative properties: ΔTb = Kb·m, ΔTf = Kf·m, π = CRT',
          'Van \'t Hoff factor (i) for association and dissociation'
        ]
      },
      {
        id: 'c12-chem-ch2',
        number: 2,
        title: 'Electrochemistry',
        description: 'Galvanic cells, Nernst equation, conductance in electrolytic solutions, Kohlrausch\'s law, electrolysis, and batteries.',
        status: 'in_progress',
        progress: 70,
        pages: 28,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lech102.pdf',
        highlights: [
          'Nernst equation: E_cell = E°_cell - (0.0591/n) log Q',
          'Kohlrausch\'s law of independent migration of ions',
          'Faraday\'s laws of electrolysis: w = z·I·t'
        ]
      }
    ]
  },
  {
    id: 'c12-math',
    name: 'Mathematics',
    code: 'MATH-12',
    color: '#2B6DEF',
    bgLight: '#EBF2FE',
    icon: 'fa-solid fa-square-root-variable',
    gradient: 'linear-gradient(135deg, #2B6DEF 0%, #174BB8 100%)',
    chaptersCount: 13,
    completedCount: 4,
    chapters: [
      {
        id: 'c12-math-ch1',
        number: 1,
        title: 'Relations and Functions',
        description: 'Types of relations: reflexive, symmetric, transitive, equivalence; types of functions: one-one (injective) and onto (surjective).',
        status: 'completed',
        progress: 100,
        pages: 22,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lemh101.pdf',
        highlights: [
          'Equivalence relation definitions and proofs',
          'Injectivity and surjectivity test methods',
          'Bijective functions and inverse existence'
        ]
      },
      {
        id: 'c12-math-ch2',
        number: 2,
        title: 'Matrices and Determinants',
        description: 'Matrix operations, symmetric and skew-symmetric matrices, properties of determinants, adjoint and inverse, solving linear systems by Cramer/matrix method.',
        status: 'completed',
        progress: 100,
        pages: 30,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lemh103.pdf',
        highlights: [
          'Matrix multiplication row-by-column rules',
          'Inverse: A^-1 = (1 / |A|) adj(A)',
          'System of equations: X = A^-1 · B'
        ]
      },
      {
        id: 'c12-math-ch3',
        number: 3,
        title: 'Continuity and Differentiability',
        description: 'Continuity test, derivative of implicit functions, logarithmic differentiation, parametric differentiation, and second-order derivatives.',
        status: 'in_progress',
        progress: 60,
        pages: 32,
        readTime: '50 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lemh105.pdf',
        highlights: [
          'Left-hand limit = Right-hand limit = f(c)',
          'Logarithmic differentiation for variable powers',
          'Parametric derivatives: dy/dx = (dy/dt) / (dx/dt)'
        ]
      }
    ]
  },
  {
    id: 'c12-bio',
    name: 'Biology',
    code: 'BIO-12',
    color: '#10B981',
    bgLight: '#E8F8F2',
    icon: 'fa-solid fa-dna',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    chaptersCount: 16,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-bio-ch1',
        number: 1,
        title: 'Sexual Reproduction in Flowering Plants',
        description: 'Flower structure, development of male and female gametophytes, pollination types, double fertilization, seed and fruit development.',
        status: 'completed',
        progress: 100,
        pages: 26,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lebo101.pdf',
        highlights: [
          'Microsporogenesis and Megasporogenesis',
          'Pollination adaptations: Anemophily, Hydrophily, Entomophily',
          'Double fertilization: Syngamy and Triple Fusion (PEN)'
        ]
      },
      {
        id: 'c12-bio-ch2',
        number: 2,
        title: 'Human Reproduction',
        description: 'Male and female reproductive systems, spermatogenesis, oogenesis, menstrual cycle, fertilization, implantation, and pregnancy.',
        status: 'in_progress',
        progress: 65,
        pages: 28,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lebo102.pdf',
        highlights: [
          'Spermatogenesis vs Oogenesis stages',
          'Menstrual cycle hormonal regulation (LH, FSH, Estrogen, Progesterone)',
          'Blastocyst formation and implantation process'
        ]
      }
    ]
  },
  {
    id: 'c12-eng',
    name: 'English Core',
    code: 'ENG-12',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-feather-pointed',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    chaptersCount: 8,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-eng-ch1',
        number: 1,
        title: 'The Last Lesson (Alphonse Daudet)',
        description: 'Prussian occupation of Alsace-Lorraine, order to teach only German, M. Hamel\'s passionate final French lecture and patriotism.',
        status: 'completed',
        progress: 100,
        pages: 14,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lefl101.pdf',
        highlights: [
          'Linguistic chauvinism and the value of mother tongue',
          'M. Hamel\'s character transformation and final chalk writing',
          'Vive La France message and student awakening'
        ]
      },
      {
        id: 'c12-eng-ch2',
        number: 2,
        title: 'Lost Spring: Stories of Stolen Childhood (Anees Jung)',
        description: 'Plight of impoverished child laborers in Seemapuri ragpickers and Firozabad bangle-making industries.',
        status: 'in_progress',
        progress: 50,
        pages: 16,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lefl102.pdf',
        highlights: [
          'Saheb-e-Alam: Name irony vs ragpicking reality',
          'Mukesh\'s dream of becoming a motor mechanic in Firozabad',
          'Vicious circle of sahukars, middlemen, and corrupt police'
        ]
      }
    ]
  }
];

// ==========================================================================
// CLASS 12 CURRICULUM: COMMERCE STREAM
// ==========================================================================
const CLASS_12_COMMERCE_SUBJECTS = [
  {
    id: 'c12-acct',
    name: 'Accountancy',
    code: 'ACCT-12',
    color: '#2563EB',
    bgLight: '#EFF6FF',
    icon: 'fa-solid fa-receipt',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    chaptersCount: 11,
    completedCount: 4,
    chapters: [
      {
        id: 'c12-acct-ch1',
        number: 1,
        title: 'Accounting for Partnership: Basic Concepts',
        description: 'Nature of partnership, partnership deed, capital accounts: fixed vs fluctuating, profit and loss appropriation account, and past adjustments.',
        status: 'completed',
        progress: 100,
        pages: 28,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/leac101.pdf',
        highlights: [
          'Provisions of Indian Partnership Act 1932 in absence of Deed',
          'Profit & Loss Appropriation Account format',
          'Interest on drawings: Monthly, Quarterly average period formulas'
        ]
      },
      {
        id: 'c12-acct-ch2',
        number: 2,
        title: 'Reconstitution of Partnership: Admission & Retirement',
        description: 'Sacrificing and gaining ratio, valuation and accounting of goodwill, revaluation of assets and reassessment of liabilities.',
        status: 'in_progress',
        progress: 60,
        pages: 32,
        readTime: '45 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/leac102.pdf',
        highlights: [
          'New profit sharing ratio & Sacrificing ratio',
          'Goodwill accounting under AS-26',
          'Revaluation Account debit and credit rules'
        ]
      }
    ]
  },
  {
    id: 'c12-bst',
    name: 'Business Studies',
    code: 'BST-12',
    color: '#0891B2',
    bgLight: '#ECFEFF',
    icon: 'fa-solid fa-briefcase',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    chaptersCount: 12,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-bst-ch1',
        number: 1,
        title: 'Nature and Significance of Management',
        description: 'Management definition, efficiency vs effectiveness, objectives, levels of management, management as science, art, and profession.',
        status: 'completed',
        progress: 100,
        pages: 22,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lebs101.pdf',
        highlights: [
          'Distinction between Efficiency and Effectiveness',
          'Top, Middle and Operational management functions',
          'Coordination: The essence of management'
        ]
      },
      {
        id: 'c12-bst-ch2',
        number: 2,
        title: 'Principles of Management',
        description: 'Henri Fayol\'s 14 principles of general management versus F.W. Taylor\'s scientific management and techniques.',
        status: 'in_progress',
        progress: 50,
        pages: 24,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lebs102.pdf',
        highlights: [
          'Fayol\'s Division of Work, Unity of Command, and Scalar Chain',
          'Taylor\'s Time Study, Motion Study, and Differential Piece Wage',
          'Mental Revolution in scientific management'
        ]
      }
    ]
  },
  {
    id: 'c12-econ',
    name: 'Economics',
    code: 'ECON-12',
    color: '#059669',
    bgLight: '#ECFDF5',
    icon: 'fa-solid fa-chart-line',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    chaptersCount: 10,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-econ-ch1',
        number: 1,
        title: 'National Income and Related Aggregates',
        description: 'Circular flow of income, GDP, GNP, NDP, NNP at market price and factor cost, measurement methods: Value Added, Income, Expenditure.',
        status: 'completed',
        progress: 100,
        pages: 28,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/leec101.pdf',
        highlights: [
          'Value Added Method (Output - Intermediate Consumption)',
          'Income Method: Compensation of employees + Operating Surplus + Mixed Income',
          'Expenditure Method: C + I + G + (X - M)'
        ]
      },
      {
        id: 'c12-econ-ch2',
        number: 2,
        title: 'Money and Banking',
        description: 'Money supply: M1, M2, M3, M4; credit creation by commercial banks, Central Bank (RBI) and monetary control instruments.',
        status: 'in_progress',
        progress: 50,
        pages: 22,
        readTime: '30 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/leec102.pdf',
        highlights: [
          'Credit Multiplier: 1 / LRR (Legal Reserve Ratio)',
          'Repo Rate, Reverse Repo, CRR, and SLR mechanisms',
          'Open Market Operations (OMO) by Reserve Bank of India'
        ]
      }
    ]
  },
  {
    id: 'c12-eng-comm',
    name: 'English Core',
    code: 'ENG-12',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-feather-pointed',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    chaptersCount: 8,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-eng-comm-ch1',
        number: 1,
        title: 'The Last Lesson (Alphonse Daudet)',
        description: 'Prussian occupation of Alsace-Lorraine, order to teach only German, M. Hamel\'s passionate final French lecture and patriotism.',
        status: 'completed',
        progress: 100,
        pages: 14,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lefl101.pdf',
        highlights: [
          'Linguistic chauvinism and the value of mother tongue',
          'M. Hamel\'s character transformation and final chalk writing',
          'Vive La France message and student awakening'
        ]
      }
    ]
  }
];

// ==========================================================================
// CLASS 12 CURRICULUM: ARTS / HUMANITIES STREAM
// ==========================================================================
const CLASS_12_ARTS_SUBJECTS = [
  {
    id: 'c12-hist',
    name: 'History',
    code: 'HIST-12',
    color: '#B45309',
    bgLight: '#FFFBEB',
    icon: 'fa-solid fa-monument',
    gradient: 'linear-gradient(135deg, #D97706 0%, #92400E 100%)',
    chaptersCount: 12,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-hist-ch1',
        number: 1,
        title: 'Bricks, Beads and Bones (The Harappan Civilisation)',
        description: 'Early urban centers, town planning at Mohenjodaro, Harappan crafts, trade connections, script, weights, and decline theories.',
        status: 'completed',
        progress: 100,
        pages: 26,
        readTime: '40 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lehs101.pdf',
        highlights: [
          'Citadel vs Lower Town urban architecture',
          'The Great Bath and drainage systems',
          'Chanhudaro craft production and seals analysis'
        ]
      }
    ]
  },
  {
    id: 'c12-pol',
    name: 'Political Science',
    code: 'POL-12',
    color: '#4338CA',
    bgLight: '#EEF2FF',
    icon: 'fa-solid fa-scale-balanced',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
    chaptersCount: 9,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-pol-ch1',
        number: 1,
        title: 'The End of Bipolarity',
        description: 'The Soviet System, Gorbachev\'s reforms (Glasnost & Perestroika), fall of Berlin Wall, disintegration of USSR and consequences.',
        status: 'completed',
        progress: 100,
        pages: 24,
        readTime: '35 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/leps101.pdf',
        highlights: [
          'Weaknesses of the Soviet administrative system',
          'Shock Therapy in post-communist regimes',
          'Rise of unipolar world order & India-Russia relations'
        ]
      }
    ]
  },
  {
    id: 'c12-geog',
    name: 'Geography',
    code: 'GEOG-12',
    color: '#0D9488',
    bgLight: '#F0FDFA',
    icon: 'fa-solid fa-earth-asia',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
    chaptersCount: 10,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-geog-ch1',
        number: 1,
        title: 'Human Geography: Nature and Scope',
        description: 'Human geography concepts, Environmental Determinism vs Possibilism, Neo-determinism (Stop and Go Determinism) by Griffith Taylor.',
        status: 'completed',
        progress: 100,
        pages: 16,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/legy101.pdf',
        highlights: [
          'Definition by Ratzel, Semple, and Vidal de la Blache',
          'Environmental determinism vs Possibilism debate',
          'Neo-determinism and sustainable natural resource usage'
        ]
      }
    ]
  },
  {
    id: 'c12-eng-arts',
    name: 'English Core',
    code: 'ENG-12',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-feather-pointed',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    chaptersCount: 8,
    completedCount: 3,
    chapters: [
      {
        id: 'c12-eng-arts-ch1',
        number: 1,
        title: 'The Last Lesson (Alphonse Daudet)',
        description: 'Prussian occupation of Alsace-Lorraine, order to teach only German, M. Hamel\'s passionate final French lecture and patriotism.',
        status: 'completed',
        progress: 100,
        pages: 14,
        readTime: '25 mins',
        ebookUrl: 'https://ncert.nic.in/textbook/pdf/lefl101.pdf',
        highlights: [
          'Linguistic chauvinism and the value of mother tongue',
          'M. Hamel\'s character transformation and final chalk writing',
          'Vive La France message and student awakening'
        ]
      }
    ]
  }
];

// ==========================================================================
// DYNAMIC SUBJECT RETRIEVAL HELPER FUNCTIONS
// ==========================================================================

/**
 * Get all curriculum subjects based on active AppState.user class & stream
 * @returns {Array} Array of subject objects
 */
function getAllSubjects() {
  const userClass = (typeof AppState !== 'undefined' && AppState.user && AppState.user.class)
    ? AppState.user.class
    : (typeof currentProfile !== 'undefined' && currentProfile?.class ? currentProfile.class : 'Class 10');

  const userStream = (typeof AppState !== 'undefined' && AppState.user && AppState.user.stream)
    ? AppState.user.stream
    : (typeof currentProfile !== 'undefined' && currentProfile?.stream ? currentProfile.stream : '');

  // 1. Class 9
  if (userClass.includes('9')) {
    return CLASS_9_SUBJECTS;
  }

  // 2. Class 11 (Stream-dependent)
  if (userClass.includes('11')) {
    const streamNorm = (userStream || '').toLowerCase();
    if (streamNorm.includes('comm')) {
      return CLASS_11_COMMERCE_SUBJECTS;
    }
    if (streamNorm.includes('art') || streamNorm.includes('human')) {
      return CLASS_11_ARTS_SUBJECTS;
    }
    // Default to Science
    return CLASS_11_SCIENCE_SUBJECTS;
  }

  // 3. Class 12 (Stream-dependent)
  if (userClass.includes('12')) {
    const streamNorm = (userStream || '').toLowerCase();
    if (streamNorm.includes('comm')) {
      return CLASS_12_COMMERCE_SUBJECTS;
    }
    if (streamNorm.includes('art') || streamNorm.includes('human')) {
      return CLASS_12_ARTS_SUBJECTS;
    }
    // Default to Science
    return CLASS_12_SCIENCE_SUBJECTS;
  }

  // 4. Default: Class 10
  return CLASS_10_SUBJECTS;
}

/**
 * Retrieve a subject by ID from active class, or fallback across all sets
 * @param {string} subjectId 
 * @returns {Object}
 */
function getSubjectById(subjectId) {
  const currentSubjects = getAllSubjects();
  let found = currentSubjects.find(s => s.id === subjectId);
  if (found) return found;

  // Fallback search across all subject catalogs
  const allCatalogs = [
    CLASS_9_SUBJECTS,
    CLASS_10_SUBJECTS,
    CLASS_11_SCIENCE_SUBJECTS,
    CLASS_11_COMMERCE_SUBJECTS,
    CLASS_11_ARTS_SUBJECTS,
    CLASS_12_SCIENCE_SUBJECTS,
    CLASS_12_COMMERCE_SUBJECTS,
    CLASS_12_ARTS_SUBJECTS
  ];

  for (const catalog of allCatalogs) {
    const match = catalog.find(s => s.id === subjectId);
    if (match) return match;
  }

  return currentSubjects[0] || CLASS_10_SUBJECTS[0];
}

/**
 * Retrieve a chapter by subject ID and chapter ID
 * @param {string} subjectId 
 * @param {string} chapterId 
 * @returns {Object}
 */
function getChapterById(subjectId, chapterId) {
  const subject = getSubjectById(subjectId);
  if (!subject || !subject.chapters || subject.chapters.length === 0) return null;
  const chapter = subject.chapters.find(c => c.id === chapterId);
  return chapter || subject.chapters[0];
}

