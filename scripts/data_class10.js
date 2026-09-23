// CLASS 10 CURRICULUM DATA (NCERT 2026 EDITION)
const CLASS_10_DATA = [
  {
    id: 'math',
    name: 'Mathematics',
    code: 'MATH-10',
    color: '#2B6DEF',
    bgLight: '#EBF2FE',
    icon: 'fa-solid fa-calculator',
    gradient: 'linear-gradient(135deg, #2B6DEF 0%, #174BB8 100%)',
    chapters: [
      { num: 1, title: 'Real Numbers', code: 'jemh101', p: 18, t: 25, desc: 'Fundamental Theorem of Arithmetic, irrational proofs for √2, √3, √5, prime factorisation HCF and LCM.' },
      { num: 2, title: 'Polynomials', code: 'jemh102', p: 22, t: 30, desc: 'Zeroes of a polynomial, geometrical meaning, relation between coefficients and zeroes of quadratic polynomials.' },
      { num: 3, title: 'Pair of Linear Equations in Two Variables', code: 'jemh103', p: 26, t: 35, desc: 'Graphical method, consistency conditions, Substitution and Elimination methods for pairs of linear equations.' },
      { num: 4, title: 'Quadratic Equations', code: 'jemh104', p: 20, t: 30, desc: 'Standard form ax² + bx + c = 0, factorisation, quadratic formula, nature of roots via discriminant D = b² - 4ac.' },
      { num: 5, title: 'Arithmetic Progressions', code: 'jemh105', p: 24, t: 30, desc: 'nth term an = a + (n - 1)d, sum of n terms Sn = n/2[2a + (n - 1)d], applications in daily life problems.' },
      { num: 6, title: 'Triangles', code: 'jemh106', p: 28, t: 40, desc: 'Similarity of triangles, Basic Proportionality Theorem (Thales Theorem) and converse, AAA, SSS, SAS criteria.' },
      { num: 7, title: 'Coordinate Geometry', code: 'jemh107', p: 20, t: 25, desc: 'Distance formula, Section formula (internal division), and midpoint formula on Cartesian plane.' },
      { num: 8, title: 'Introduction to Trigonometry', code: 'jemh108', p: 22, t: 30, desc: 'Trigonometric ratios of acute angles, specific values (0°, 30°, 45°, 60°, 90°), identity sin²θ + cos²θ = 1.' },
      { num: 9, title: 'Some Applications of Trigonometry', code: 'jemh109', p: 16, t: 25, desc: 'Heights and distances, line of sight, angle of elevation, angle of depression, two right-triangle scenarios.' },
      { num: 10, title: 'Circles', code: 'jemh110', p: 18, t: 25, desc: 'Tangent to a circle, radius-tangent perpendicularity theorem, tangents from external point are equal.' },
      { num: 11, title: 'Areas Related to Circles', code: 'jemh111', p: 18, t: 25, desc: 'Area and perimeter of circles, area of sector (θ/360 × πr²), area of minor and major segments.' },
      { num: 12, title: 'Surface Areas and Volumes', code: 'jemh112', p: 22, t: 30, desc: 'Surface areas and volumes of combinations of cubes, cylinders, cones, spheres, and hemispheres.' },
      { num: 13, title: 'Statistics', code: 'jemh113', p: 24, t: 35, desc: 'Mean, median and mode of grouped data, assumed mean method, empirical relation: Mode = 3 Median - 2 Mean.' },
      { num: 14, title: 'Probability', code: 'jemh114', p: 18, t: 25, desc: 'Classical probability definition, elementary events, impossible and sure events, complementary events.' }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    code: 'SCI-10',
    color: '#059669',
    bgLight: '#E6F4EA',
    icon: 'fa-solid fa-flask-vial',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    chapters: [
      { num: 1, title: 'Chemical Reactions and Equations', code: 'jesc101', p: 16, t: 25, desc: 'Balanced equations, types: combination, decomposition, displacement, double displacement, redox, corrosion, rancidity.' },
      { num: 2, title: 'Acids, Bases and Salts', code: 'jesc102', p: 20, t: 30, desc: 'Chemical properties of acids and bases, pH scale, preparation and uses of Bleaching Powder, Baking Soda, Washing Soda, POP.' },
      { num: 3, title: 'Metals and Non-metals', code: 'jesc103', p: 24, t: 30, desc: 'Reactivity series, ionic bonding and properties, metallurgy (roasting, calcination, refining), corrosion prevention.' },
      { num: 4, title: 'Carbon and its Compounds', code: 'jesc104', p: 26, t: 35, desc: 'Covalent bonding, catenation and tetravalency, homologous series, functional groups, IUPAC, soaps and detergents.' },
      { num: 5, title: 'Life Processes', code: 'jesc105', p: 28, t: 40, desc: 'Autotrophic & heterotrophic nutrition, aerobic vs anaerobic respiration, double circulation in heart, nephron excretion.' },
      { num: 6, title: 'Control and Coordination', code: 'jesc106', p: 22, t: 30, desc: 'Neuron, reflex arc, human brain structure, plant hormones (auxin, cytokinin, ABA), tropic and nastic movements.' },
      { num: 7, title: 'How do Organisms Reproduce?', code: 'jesc107', p: 24, t: 30, desc: 'Asexual reproduction, sexual reproduction in flowering plants, human male and female reproductive systems, contraception.' },
      { num: 8, title: 'Heredity', code: 'jesc108', p: 18, t: 25, desc: 'Mendel’s laws of inheritance, monohybrid cross 3:1, dihybrid cross 9:3:3:1, sex determination in humans (XX & XY).' },
      { num: 9, title: 'Light – Reflection and Refraction', code: 'jesc109', p: 26, t: 35, desc: 'Spherical mirrors, mirror formula, Snell\'s law, refraction, convex and concave lenses, lens formula, power of lens.' },
      { num: 10, title: 'The Human Eye and the Colourful World', code: 'jesc110', p: 20, t: 25, desc: 'Human eye defects (myopia, hypermetropia), prism dispersion, atmospheric refraction (twinkling stars), Tyndall scattering.' },
      { num: 11, title: 'Electricity', code: 'jesc111', p: 24, t: 30, desc: 'Electric current, potential difference, Ohm\'s law, factors affecting resistance, series and parallel circuits, Joule\'s law.' },
      { num: 12, title: 'Magnetic Effects of Electric Current', code: 'jesc112', p: 22, t: 28, desc: 'Magnetic field lines, straight wire, circular loop, solenoid, Fleming\'s left-hand rule, domestic electrical circuits.' },
      { num: 13, title: 'Our Environment', code: 'jesc113', p: 16, t: 20, desc: 'Ecosystems, food chain, 10% law of energy, biological magnification, ozone layer depletion (CFCs), waste management.' }
    ]
  },
  {
    id: 'social',
    name: 'Social Science',
    code: 'SST-10',
    color: '#D97706',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-earth-americas',
    gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
    chapters: [
      { num: 1, title: 'The Rise of Nationalism in Europe', code: 'jess101', p: 28, t: 35, desc: 'French Revolution ideas, Napoleonic Code 1804, Zollverein, Unification of Germany (Bismarck) and Italy (Cavour, Garibaldi), Balkans.' },
      { num: 2, title: 'Nationalism in India', code: 'jess102', p: 26, t: 35, desc: 'First World War impact, Satyagraha, Rowlatt Act, Jallianwala Bagh, Non-Cooperation Movement, Civil Disobedience, Salt March, Poona Pact.' },
      { num: 3, title: 'The Making of a Global World', code: 'jess103', p: 20, t: 25, desc: 'Silk routes, pre-modern trade, smallpox biological weapon, 19th-century indenture labour, Great Depression 1929, Bretton Woods.' },
      { num: 4, title: 'The Age of Industrialisation', code: 'jess104', p: 22, t: 28, desc: 'Proto-industrialisation, factories, steam power vs hand labour in Victorian Britain, industrialisation in colonies, market for goods.' },
      { num: 5, title: 'Print Culture and the Modern World', code: 'jess105', p: 24, t: 30, desc: 'Gutenberg press, print revolution, Martin Luther 95 Theses, reading mania, Vernacular Press Act 1878 in colonial India.' },
      { num: 6, title: 'Resources and Development', code: 'jess201', p: 16, t: 25, desc: 'Resource classification, sustainable development, Rio Summit 1992, resource planning, major soil types of India (Alluvial, Black, Laterite).' },
      { num: 7, title: 'Forest and Wildlife Resources', code: 'jess202', p: 14, t: 20, desc: 'Flora and fauna, IUCN categories, Project Tiger 1973, Reserved, Protected, and Unclassed forests, Joint Forest Management.' },
      { num: 8, title: 'Water Resources', code: 'jess203', p: 16, t: 22, desc: 'Water scarcity, multi-purpose river valley projects, pros and cons of dams, traditional rainwater harvesting (Tankas, Guls/Kuls).' },
      { num: 9, title: 'Agriculture', code: 'jess204', p: 18, t: 25, desc: 'Farming types, cropping seasons (Rabi, Kharif, Zaid), major food crops (Rice, Wheat, Millets), cash crops, Bhoodan-Gramdan.' },
      { num: 10, title: 'Minerals and Energy Resources', code: 'jess205', p: 20, t: 28, desc: 'Mode of occurrence of minerals, ferrous/non-ferrous, coal types (Anthracite, Bituminous), petroleum, renewable energy (solar, wind).' },
      { num: 11, title: 'Manufacturing Industries', code: 'jess206', p: 22, t: 30, desc: 'Importance of manufacturing, agro-based vs mineral-based (iron and steel, textiles), IT and electronics industry, pollution control.' },
      { num: 12, title: 'Lifelines of National Economy', code: 'jess207', p: 18, t: 25, desc: 'Transport systems: Golden Quadrilateral roadways, railways, major sea ports (Kandla, Mumbai, Paradip), international trade, tourism.' },
      { num: 13, title: 'Power Sharing', code: 'jess301', p: 16, t: 22, desc: 'Belgium accommodation vs Sri Lanka majoritarianism, prudential and moral reasons, horizontal vs vertical power sharing.' },
      { num: 14, title: 'Federalism', code: 'jess302', p: 18, t: 25, desc: 'Features of federalism, coming together vs holding together, Union/State/Concurrent lists, linguistic states, 1992 decentralisation.' },
      { num: 15, title: 'Gender, Religion and Caste', code: 'jess303', p: 16, t: 22, desc: 'Feminist movements, women\'s representation, secular state constitutional provisions, communalism, caste in Indian politics.' },
      { num: 16, title: 'Political Parties', code: 'jess304', p: 20, t: 26, desc: 'Functions of political parties, national vs regional party criteria, challenges (dynastic rule, money power), electoral reforms.' },
      { num: 17, title: 'Outcomes of Democracy', code: 'jess305', p: 14, t: 20, desc: 'Accountable, responsive and legitimate government, economic growth, reduction of inequality, dignity and freedom of citizens.' },
      { num: 18, title: 'Development', code: 'jess401', p: 16, t: 22, desc: 'Different goals of individuals, national development, Per capita income vs UNDP Human Development Index (HDI) indicators.' },
      { num: 19, title: 'Sectors of the Indian Economy', code: 'jess402', p: 20, t: 26, desc: 'Primary, Secondary, Tertiary sectors, GDP contribution, disguised unemployment in agriculture, organised vs unorganised, MGNREGA.' },
      { num: 20, title: 'Money and Credit', code: 'jess403', p: 18, t: 25, desc: 'Money as medium of exchange, demand deposits, terms of credit, collateral, formal (banks/cooperatives) vs informal credit, SHGs.' },
      { num: 21, title: 'Globalisation and the Indian Economy', code: 'jess404', p: 18, t: 24, desc: 'MNC operations, foreign trade integration, 1991 economic liberalisation, role of WTO, technology impact, fair globalisation.' },
      { num: 22, title: 'Consumer Rights', code: 'jess405', p: 16, t: 20, desc: 'Consumer exploitation, COPRA 1986 three-tier redressal machinery (District, State, National), consumer rights, ISI and AGMARK.' }
    ]
  },
  {
    id: 'english',
    name: 'English',
    code: 'ENG-10',
    color: '#7C3AED',
    bgLight: '#EDE9FE',
    icon: 'fa-solid fa-book-open-reader',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    chapters: [
      { num: 1, title: 'A Letter to God', code: 'jeff101', p: 12, t: 18, desc: 'Lencho’s unshakable faith in God, hailstorm devastation, letter asking 100 pesos, postmaster\'s generosity, irony of "bunch of crooks".' },
      { num: 2, title: 'Nelson Mandela: Long Walk to Freedom', code: 'jeff102', p: 16, t: 22, desc: 'Inauguration of non-racial democratic South Africa, twin obligations, bravery as triumph over fear, rainbow nation.' },
      { num: 3, title: 'Two Stories about Flying', code: 'jeff103', p: 16, t: 22, desc: 'Part I: Young seagull conquering fear to fly. Part II: Pilot guided safely through storm by miraculous black aeroplane.' },
      { num: 4, title: 'From the Diary of Anne Frank', code: 'jeff104', p: 14, t: 20, desc: 'Anne Frank\'s intimate diary "Kitty", "paper has more patience than people", humorous banter with teacher Mr. Keesing.' },
      { num: 5, title: 'Glimpses of India', code: 'jeff105', p: 18, t: 25, desc: 'Three travelogues: traditional baker (Pader) in Goa, coffee and Kodavu warriors in Coorg, tea plantations and legends in Assam.' },
      { num: 6, title: 'Mijbil the Otter', code: 'jeff106', p: 16, t: 22, desc: 'Gavin Maxwell adopting pet otter Mijbil from Iraq, joyful water play, flight journey, and humorous Londoners’ guesses.' },
      { num: 7, title: 'Madam Rides the Bus', code: 'jeff107', p: 18, t: 24, desc: 'Eight-year-old Valli planning her solitary bus ride, self-respecting conduct, and encountering the harsh reality of mortality.' },
      { num: 8, title: 'The Sermon at Benares', code: 'jeff108', p: 14, t: 20, desc: 'Gautama Buddha’s enlightenment and first sermon at Benares, Kisa Gotami\'s mustard seed quest, universal truth of mortality.' },
      { num: 9, title: 'The Proposal', code: 'jeff109', p: 20, t: 26, desc: 'Anton Chekhov one-act farce: Lomov proposing to Natalya, erupting into petty squabbles over Oxen Meadows and hunting dogs.' },
      { num: 10, title: 'A Triumph of Surgery (Footprints)', code: 'jeff201', p: 14, t: 20, desc: 'Dr. Herriot curing pampered obese dog Tricki through strict diet and exercise pack without surgical intervention.' },
      { num: 11, title: 'The Thief\'s Story (Footprints)', code: 'jeff202', p: 14, t: 20, desc: 'Thief Hari Singh befriending generous writer Anil, stealing cash, but returning because trust and education are priceless.' }
    ]
  },
  {
    id: 'hindi',
    name: 'Hindi',
    code: 'HIN-10',
    color: '#DC2626',
    bgLight: '#FEE2E2',
    icon: 'fa-solid fa-pen-nib',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
    chapters: [
      { num: 1, title: 'पद (सूरदास)', code: 'jhks101', p: 12, t: 18, desc: 'भ्रमरगीत सार से चयनित चार पद, उद्धव-गोपी संवाद, गोपियों का सगुण कृष्ण प्रेम, उद्धव के निर्गुण योग संदेश को कड़वी ककड़ी बताना।' },
      { num: 2, title: 'राम-लक्ष्मण-परशुराम संवाद (तुलसीदास)', code: 'jhks102', p: 16, t: 22, desc: 'रामचरितमानस के बालकांड से संकलित, शिव धनुष टूटने पर परशुराम का क्रोध, लक्ष्मण के तीखे व्यंग्य बाण, राम का विनीत स्वभाव।' },
      { num: 3, title: 'आत्मकथ्य (जयशंकर प्रसाद)', code: 'jhks103', p: 10, t: 16, desc: 'छायावादी कवि जयशंकर प्रसाद द्वारा आत्मकथा न लिखने के कारण, जीवन की विडंबनाएं, स्मृति को पाथेय बनाना, सादगी का उपहास न उड़ाना।' },
      { num: 4, title: 'उत्साह और अट नहीं रही (सूर्यकांत त्रिपाठी निराला)', code: 'jhks104', p: 12, t: 18, desc: 'उत्साह: बादलों को क्रांति और नवरचना का अग्रदूत मानकर गर्जन का आह्वान। अट नहीं रही: फाल्गुन मास के मादक सौंदर्य का सजीव चित्रण।' },
      { num: 5, title: 'यह दंतुरित मुसकान और फसल (नागार्जुन)', code: 'jhks105', p: 12, t: 18, desc: 'दंतुरित मुसकान में शिशु की निष्पाप मुस्कान का जादू। फसल: कोटि-कोटि हाथों के श्रम, नदियों के पानी और धूप-हवा का सामूहिक योगदान।' },
      { num: 6, title: 'संगतकार (मंगलेश डबराल)', code: 'jhks106', p: 10, t: 15, desc: 'मुख्य गायक के सुर को सहारा देने वाले सहायक कलाकार (संगतकार) का महत्व, उसकी आवाज में हिचक और उसकी मनुष्यता व त्याग।' },
      { num: 7, title: 'नेताजी का चश्मा (स्वयं प्रकाश)', code: 'jhks107', p: 14, t: 20, desc: 'हालदार साहब की यात्रा, देशभक्त कैप्टन चश्मेवाले का नेताजी की मूर्ति पर चश्मा बदलना, बच्चों का सरकंडे का चश्मा लगाना।' },
      { num: 8, title: 'बालगोबिन भगत (रामवृक्ष बेनीपुरी)', code: 'jhks108', p: 16, t: 22, desc: 'कबीरपंथी गृहस्थ संत बालगोबिन भगत का चरित्र, संगीत साधना, पुत्र की मृत्यु पर उत्सव, पतोहू का पुनर्विवाह कराकर सामाजिक सुधार।' },
      { num: 9, title: 'लखनवी अंदाज़ (यशपाल)', code: 'jhks109', p: 14, t: 20, desc: 'ट्रेन के डिब्बे में नवाब साहब का खीरा सूंघकर खिड़की से बाहर फेंकना, पतनशील सामंती दिखावटी जीवनशैली पर करारा व्यंग्य।' },
      { num: 10, title: 'एक कहानी यह भी (मन्नू भंडारी)', code: 'jhks110', p: 16, t: 22, desc: 'मन्नू भंडारी की आत्मकथा, पिता के अंतर्विरोधी व्यक्तित्व, शीला अग्रवाल का प्रभाव, आजादी के आंदोलन में भागीदारी और स्त्री चेतना।' }
    ]
  }
];

module.exports = { CLASS_10_DATA };
