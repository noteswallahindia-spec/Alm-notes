// CLASS 9 CURRICULUM DATA (NCERT 2026 EDITION)
const CLASS_9_DATA = [
  {
    id: 'c9-math',
    name: 'Mathematics',
    code: 'MATH-09',
    color: '#2B6DEF',
    bgLight: '#EBF2FE',
    icon: 'fa-solid fa-calculator',
    gradient: 'linear-gradient(135deg, #2B6DEF 0%, #174BB8 100%)',
    chapters: [
      { num: 1, title: 'Number Systems', code: 'iemh101', p: 24, t: 30, desc: 'Rational and irrational numbers, decimal expansions, representation of square roots on number line, laws of exponents.' },
      { num: 2, title: 'Polynomials', code: 'iemh102', p: 26, t: 32, desc: 'Polynomials in one variable, zeroes, Remainder Theorem, Factor Theorem, algebraic identities.' },
      { num: 3, title: 'Coordinate Geometry', code: 'iemh103', p: 14, t: 20, desc: 'Cartesian plane, coordinates of a point, abscissa, ordinate, quadrants and plotting points.' },
      { num: 4, title: 'Linear Equations in Two Variables', code: 'iemh104', p: 16, t: 22, desc: 'Linear equations in form ax + by + c = 0, infinitely many solutions, graphical representation.' },
      { num: 5, title: 'Introduction to Euclid\'s Geometry', code: 'iemh105', p: 12, t: 18, desc: 'Euclid’s definitions, axioms and postulates, equivalent versions of Euclid’s fifth postulate.' },
      { num: 6, title: 'Lines and Angles', code: 'iemh106', p: 20, t: 26, desc: 'Intersecting lines, vertically opposite angles, linear pair, parallel lines with transversal, angle sum property.' },
      { num: 7, title: 'Triangles', code: 'iemh107', p: 24, t: 30, desc: 'Congruence of triangles (SAS, ASA, SSS, RHS), properties of isosceles triangles, inequalities.' },
      { num: 8, title: 'Quadrilaterals', code: 'iemh108', p: 22, t: 28, desc: 'Properties of a parallelogram, conditions for a quadrilateral to be parallelogram, Mid-point Theorem.' },
      { num: 9, title: 'Circles', code: 'iemh109', p: 24, t: 30, desc: 'Chords, perpendicular from centre, equal chords distance, angles subtended by arcs, cyclic quadrilaterals.' },
      { num: 10, title: 'Heron\'s Formula', code: 'iemh110', p: 16, t: 22, desc: 'Area of triangle using semi-perimeter s: √[s(s - a)(s - b)(s - c)], applications to triangles.' },
      { num: 11, title: 'Surface Areas and Volumes', code: 'iemh111', p: 22, t: 30, desc: 'Surface areas and volumes of right circular cones, spheres, and hemispheres.' },
      { num: 12, title: 'Statistics', code: 'iemh112', p: 18, t: 25, desc: 'Collection of data, presentation of data in bar graphs, histograms of uniform and varying widths, frequency polygons.' }
    ]
  },
  {
    id: 'c9-science',
    name: 'Science',
    code: 'SCI-09',
    color: '#059669',
    bgLight: '#E6F4EA',
    icon: 'fa-solid fa-flask-vial',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    chapters: [
      { num: 1, title: 'Matter in Our Surroundings', code: 'iesc101', p: 16, t: 22, desc: 'States of matter (solid, liquid, gas), change of state, melting, latent heat, sublimation, evaporation cooling.' },
      { num: 2, title: 'Is Matter Around Us Pure?', code: 'iesc102', p: 20, t: 26, desc: 'Mixtures, solutions, colloids, suspensions, Tyndall effect, separation techniques, physical and chemical changes.' },
      { num: 3, title: 'Atoms and Molecules', code: 'iesc103', p: 22, t: 28, desc: 'Law of conservation of mass, constant proportions, Dalton\'s atomic theory, chemical formula writing, molecular mass.' },
      { num: 4, title: 'Structure of the Atom', code: 'iesc104', p: 20, t: 26, desc: 'Electrons, protons, neutrons, Thomson, Rutherford, and Bohr models, valency, atomic number, isotopes and isobars.' },
      { num: 5, title: 'The Fundamental Unit of Life', code: 'iesc105', p: 24, t: 30, desc: 'Cell structure, plasma membrane, osmosis, cell wall, nucleus, cytoplasm, organelles (mitochondria, plastids, ER).' },
      { num: 6, title: 'Tissues', code: 'iesc106', p: 26, t: 32, desc: 'Plant tissues (meristematic, simple, complex vascular xylem/phloem), animal tissues (epithelial, connective, muscular, nervous).' },
      { num: 7, title: 'Motion', code: 'iesc107', p: 26, t: 35, desc: 'Distance, displacement, velocity, acceleration, distance-time and velocity-time graphs, equations of motion, circular motion.' },
      { num: 8, title: 'Force and Laws of Motion', code: 'iesc108', p: 24, t: 30, desc: 'Balanced/unbalanced forces, Newton’s three laws of motion, inertia, momentum p=mv, F=ma, conservation of momentum.' },
      { num: 9, title: 'Gravitation', code: 'iesc109', p: 22, t: 28, desc: 'Universal law of gravitation, free fall, acceleration due to gravity g, mass vs weight, thrust, pressure, Archimedes\' principle.' },
      { num: 10, title: 'Work and Energy', code: 'iesc110', p: 20, t: 26, desc: 'Scientific concept of work, kinetic energy (1/2 mv²), potential energy (mgh), law of conservation of energy, power in Watts.' },
      { num: 11, title: 'Sound', code: 'iesc111', p: 22, t: 28, desc: 'Production and propagation of sound, longitudinal waves, frequency, wavelength, amplitude, echo, reverberation, ultrasound SONAR.' },
      { num: 12, title: 'Improvement in Food Resources', code: 'iesc112', p: 20, t: 26, desc: 'Crop variety improvement, manures and fertilisers, cropping patterns, animal husbandry, cattle, poultry, composite fish culture.' }
    ]
  },
  {
    id: 'c9-social',
    name: 'Social Science',
    code: 'SST-09',
    color: '#D97706',
    bgLight: '#FEF3C7',
    icon: 'fa-solid fa-earth-americas',
    gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
    chapters: [
      { num: 1, title: 'The French Revolution', code: 'iess101', p: 24, t: 30, desc: 'French society in 18th century, storming of Bastille, constitutional monarchy, Reign of Terror, Robespierre, abolition of slavery.' },
      { num: 2, title: 'Socialism in Europe and the Russian Revolution', code: 'iess102', p: 26, t: 32, desc: 'Liberals, radicals, conservatives, 1905 Bloody Sunday, 1917 February & October Bolshevik revolution, Lenin April Theses, collectivisation.' },
      { num: 3, title: 'Nazism and the Rise of Hitler', code: 'iess103', p: 24, t: 30, desc: 'Weimar Republic, Versailles Treaty humiliation, hyperinflation, Hitler\'s rise, Enabling Act 1933, Nazi racial state, Holocaust.' },
      { num: 4, title: 'Forest Society and Colonialism', code: 'iess104', p: 20, t: 25, desc: 'Deforestation under British, Dietrich Brandis, scientific forestry, tribal impact, Bastar rebellion 1910, Dutch forestry in Java.' },
      { num: 5, title: 'Pastoralists in the Modern World', code: 'iess105', p: 20, t: 25, desc: 'Nomadic pastoralists (Gaddis, Bakarwals, Raikas), transhumance, colonial grazing taxes, Waste Land rules, Maasai pastoralists in Africa.' },
      { num: 6, title: 'India - Size and Location', code: 'iess201', p: 14, t: 18, desc: 'Latitudinal and longitudinal extent, Tropic of Cancer, Standard Meridian 82°30\'E at Mirzapur, area 3.28 million sq km, neighbours.' },
      { num: 7, title: 'Physical Features of India', code: 'iess202', p: 22, t: 28, desc: 'Plate tectonics, Himalayas (Himadri, Himachal, Shiwalik), Northern Plains (Bhabar, Terai, Bhangar, Khadar), Peninsular Plateau, Coastal Plains, Islands.' },
      { num: 8, title: 'Drainage', code: 'iess203', p: 20, t: 26, desc: 'Drainage basins, Himalayan rivers (Indus, Ganga, Brahmaputra) vs Peninsular rivers (Narmada, Tapi, Godavari, Krishna, Cauvery), lakes.' },
      { num: 9, title: 'Climate', code: 'iess204', p: 22, t: 28, desc: 'Climatic controls, Indian monsoon mechanism, ITCZ, El Nino, cold, hot, advancing monsoon, retreating monsoon, October heat.' },
      { num: 10, title: 'Natural Vegetation and Wildlife', code: 'iess205', p: 20, t: 26, desc: 'Ecosystems, Tropical Evergreen, Deciduous, Thorn, Montane, Mangrove forests, biosphere reserves, wildlife protection.' },
      { num: 11, title: 'Population', code: 'iess206', p: 16, t: 22, desc: 'Census data, population growth, birth and death rates, internal vs international migration, sex ratio, literacy, NPP 2000.' },
      { num: 12, title: 'What is Democracy? Why Democracy?', code: 'iess301', p: 18, t: 24, desc: 'Definition, features of democracy, major decisions by elected leaders, free and fair elections, universal adult franchise, rule of law.' },
      { num: 13, title: 'Constitutional Design', code: 'iess302', p: 20, t: 26, desc: 'South African struggle against apartheid, Indian Constituent Assembly, Dr. B.R. Ambedkar, guiding philosophy in Preamble.' },
      { num: 14, title: 'Electoral Politics', code: 'iess303', p: 20, t: 26, desc: 'Elections in democracy, constituencies, reserved seats, voters list, nomination, campaign, Model Code of Conduct, Election Commission.' },
      { num: 15, title: 'Working of Institutions', code: 'iess304', p: 22, t: 28, desc: 'Parliament (Lok Sabha vs Rajya Sabha), Prime Minister and Cabinet, President of India, Supreme Court, Judicial Review, PIL.' },
      { num: 16, title: 'Democratic Rights', code: 'iess305', p: 20, t: 26, desc: 'Life without rights (Guantanamo, Kosovo), six Fundamental Rights in Indian Constitution, Article 32 constitutional remedies, NHRC.' },
      { num: 17, title: 'The Story of Village Palampur', code: 'iess401', p: 16, t: 22, desc: 'Four factors of production (Land, Labour, Physical Capital, Human Capital), Green Revolution, multiple cropping, non-farm activities.' },
      { num: 18, title: 'People as Resource', code: 'iess402', p: 18, t: 25, desc: 'Human capital investment, education, health, economic activities of men/women, unemployment (seasonal, disguised, educated).' },
      { num: 19, title: 'Poverty as a Challenge', code: 'iess403', p: 20, t: 26, desc: 'Poverty line calorie norms (2400 rural, 2100 urban), vulnerable groups, interstate disparities, causes of poverty, MGNREGA 2005.' },
      { num: 20, title: 'Food Security in India', code: 'iess404', p: 18, t: 24, desc: 'Food availability, accessibility, affordability, Buffer Stock (FCI & MSP), Public Distribution System (PDS), food cooperatives.' }
    ]
  },
  {
    id: 'c9-english',
    name: 'English',
    code: 'ENG-09',
    color: '#7C3AED',
    bgLight: '#EDE9FE',
    icon: 'fa-solid fa-book-open-reader',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    chapters: [
      { num: 1, title: 'The Fun They Had', code: 'iebe101', p: 12, t: 18, desc: 'Isaac Asimov story of 2157: Margie and Tommy discovering an old printed book about human teachers and traditional fun schools.' },
      { num: 2, title: 'The Sound of Music', code: 'iebe102', p: 18, t: 25, desc: 'I. Evelyn Glennie listening to music through body vibrations. II. Ustad Bismillah Khan transforming the Shehnai.' },
      { num: 3, title: 'The Little Girl', code: 'iebe103', p: 14, t: 20, desc: 'Kezia fearing her authoritative father, making a pin-cushion gift, and discovering his hidden tender love during nightmare.' },
      { num: 4, title: 'A Truly Beautiful Mind', code: 'iebe104', p: 16, t: 22, desc: 'Life of Albert Einstein: rebellion against rote schooling, Special Relativity E=mc², Nobel Prize, and campaign for world peace.' },
      { num: 5, title: 'The Snake and the Mirror', code: 'iebe105', p: 14, t: 20, desc: 'A doctor contemplating handsome looks in mirror when a deadly cobra lands on his arm and gets captivated by its own reflection.' },
      { num: 6, title: 'My Childhood', code: 'iebe106', p: 16, t: 22, desc: 'Dr. A.P.J. Abdul Kalam memoirs in Rameswaram: parents, childhood friends, breaking communal prejudice with teacher Sivasubramania Iyer.' },
      { num: 7, title: 'Reach for the Top', code: 'iebe107', p: 16, t: 22, desc: 'I. Santosh Yadav scaling Everest twice. II. Maria Sharapova enduring sacrifices in Florida to become World No. 1 in tennis.' },
      { num: 8, title: 'Kathmandu', code: 'iebe108', p: 14, t: 20, desc: 'Vikram Seth travelogue: bustling holy Pashupatinath temple vs serene Buddhist Baudhnath stupa, and haunting flute music.' },
      { num: 9, title: 'If I Were You', code: 'iebe109', p: 14, t: 20, desc: 'Gerrard outwitting an armed criminal intruder through theatrical wit and locking him inside a cupboard.' },
      { num: 10, title: 'The Lost Child (Moments)', code: 'iemo101', p: 14, t: 20, desc: 'A young boy fascinated by toys and sweets at a village fair, separated from parents, rejecting all worldly goods for his mother and father.' }
    ]
  },
  {
    id: 'c9-hindi',
    name: 'Hindi',
    code: 'HIN-09',
    color: '#DC2626',
    bgLight: '#FEE2E2',
    icon: 'fa-solid fa-pen-nib',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
    chapters: [
      { num: 1, title: 'दो बैलों की कथा (प्रेमचंद)', code: 'ihks101', p: 16, t: 22, desc: 'हीरा और मोती की स्वाभिमानी मित्रता, कांजीहौस की दीवार तोड़ना, पशुओं में मानवीय संवेदना और आजादी का संघर्ष।' },
      { num: 2, title: 'ल्हासा की ओर (राहुल सांकृत्यायन)', code: 'ihks102', p: 16, t: 22, desc: 'तिब्बत यात्रा का सजीव वृत्तांत, डांडे के डाकू, भीखमंगे के वेश में यात्रा, तिब्बती समाज की उदारता और कंजुर पोथियां।' },
      { num: 3, title: 'उपभोक्तावाद की संस्कृति (श्यामाचरण दुबे)', code: 'ihks103', p: 14, t: 20, desc: 'दिखावे की संस्कृति, विज्ञापनों का सम्मोहन, सामाजिक असमानता और भारतीय सांस्कृतिक मूल्यों के क्षरण पर गंभीर विमर्श।' },
      { num: 4, title: 'सांवले सपनों की याद (जाबिर हुसैन)', code: 'ihks104', p: 14, t: 20, desc: 'पक्षी विज्ञानी सालिम अली का व्यक्ति-चित्र, साइलेंट वैली संरक्षण, पक्षियों के प्रति उनकी अनथक निष्ठा और संवेदनशीलता।' },
      { num: 5, title: 'प्रेमचंद के फटे जूते (हरिशंकर परसाई)', code: 'ihks105', p: 14, t: 20, desc: 'प्रेमचंद की सादगी और स्वाभिमान, सामाजिक कुरीतियों पर ठोकर मारना, दिखावटी संस्कृति और अवसरवादिता पर तीखा व्यंग्य।' },
      { num: 6, title: 'मेरे बचपन के दिन (महादेवी वर्मा)', code: 'ihks106', p: 14, t: 20, desc: 'महादेवी वर्मा का आत्मकथात्मक संस्मरण, कन्या सम्मान, सुभद्रा कुमारी चौहान से मित्रता, गांधीजी को चांदी का कटोरा भेंट करना।' },
      { num: 7, title: 'साखियाँ एवं सबद (कबीर)', code: 'ihks107', p: 12, t: 18, desc: 'कबीर के ज्ञानोपदेश, मानसरोवर का प्रतीक, जाति-पांति और बाह्य आडंबरों का खंडन, ईश्वर की प्रत्येक प्राणी में सर्वव्यापकता।' },
      { num: 8, title: 'वाख (ललद्यद)', code: 'ihks108', p: 10, t: 16, desc: 'कश्मीरी कवयित्री ललद्यद के चार वाख, जीवन नौका को कच्चे धागे से खींचना, हठयोग की विफलता और समभावी बनकर मुक्ति पाना।' },
      { num: 9, title: 'सवैये (रसखान)', code: 'ihks109', p: 12, t: 18, desc: 'रसखान का कृष्ण और ब्रजभूमि के प्रति अनन्य समर्पण, गोकुल में जन्म की अभिलाषा, कृष्ण की लाठी-कंबल पर तीनों लोकों का त्याग।' },
      { num: 10, title: 'कैदी और कोकिला (माखनलाल चतुर्वेदी)', code: 'ihks110', p: 14, t: 20, desc: 'अंग्रेजी जेल में बंद स्वतंत्रता सेनानी का कोयल से संवाद, बेड़ियों को ब्रिटिश गहना मानना और आजादी के लिए बलिदान का आह्वान।' }
    ]
  }
];

module.exports = { CLASS_9_DATA };
