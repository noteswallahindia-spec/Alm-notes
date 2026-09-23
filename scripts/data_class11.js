// CLASS 11 CURRICULUM DATA (NCERT 2026 EDITION)
const CLASS_11_DATA = {
  science: [
    {
      id: 'c11-physics',
      name: 'Physics',
      code: 'PHY-11',
      color: '#0284C7',
      bgLight: '#E0F2FE',
      icon: 'fa-solid fa-atom',
      gradient: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
      chapters: [
        { num: 1, title: 'Units and Measurements', code: 'keph101', p: 20, t: 25, desc: 'SI units, fundamental and derived quantities, dimensional analysis and applications, errors in measurement.' },
        { num: 2, title: 'Motion in a Straight Line', code: 'keph102', p: 24, t: 30, desc: 'Position, path length, displacement, instantaneous velocity, uniform acceleration, kinematic equations, relative velocity.' },
        { num: 3, title: 'Motion in a Plane', code: 'keph103', p: 26, t: 35, desc: 'Scalars and vectors, vector addition, resolution, projectile motion (trajectory, range, height), uniform circular motion.' },
        { num: 4, title: 'Laws of Motion', code: 'keph104', p: 28, t: 35, desc: 'Newton’s laws of motion, momentum, impulse, law of conservation of momentum, static and kinetic friction, banking of roads.' },
        { num: 5, title: 'Work, Energy and Power', code: 'keph105', p: 26, t: 32, desc: 'Work-energy theorem, kinetic and potential energy, spring potential energy, conservative forces, elastic and inelastic collisions.' },
        { num: 6, title: 'System of Particles and Rotational Motion', code: 'keph106', p: 30, t: 40, desc: 'Centre of mass, torque, angular momentum and conservation, moment of inertia, parallel and perpendicular axis theorems.' },
        { num: 7, title: 'Gravitation', code: 'keph107', p: 24, t: 30, desc: 'Kepler’s laws, universal gravitation, acceleration due to gravity variation with altitude/depth, gravitational potential, escape speed, orbital speed.' },
        { num: 8, title: 'Mechanical Properties of Solids', code: 'keph201', p: 18, t: 25, desc: 'Stress-strain curve, Hooke’s law, Young’s modulus, shear modulus, bulk modulus, elastic potential energy.' },
        { num: 9, title: 'Mechanical Properties of Fluids', code: 'keph202', p: 28, t: 35, desc: 'Pascal’s law, hydraulic lift, streamline and turbulent flow, Bernoulli’s theorem, viscosity, Poiseuille\'s formula, surface tension, capillary rise.' },
        { num: 10, title: 'Thermal Properties of Matter', code: 'keph203', p: 22, t: 28, desc: 'Temperature, thermal expansion, specific heat capacity, calorimetry, latent heat, heat transfer (conduction, convection, radiation, Newton’s law of cooling).' },
        { num: 11, title: 'Thermodynamics', code: 'keph204', p: 22, t: 28, desc: 'Thermal equilibrium, Zeroth law, first law (ΔQ = ΔU + ΔW), isothermal and adiabatic processes, second law, Carnot engine.' },
        { num: 12, title: 'Kinetic Theory', code: 'keph205', p: 20, t: 25, desc: 'Molecular model of an ideal gas, pressure formula P = 1/3 ρv_rms², kinetic interpretation of temperature, degrees of freedom, law of equipartition.' },
        { num: 13, title: 'Oscillations', code: 'keph206', p: 24, t: 30, desc: 'Periodic and harmonic motion, simple harmonic motion (SHM), displacement, velocity, acceleration, energy in SHM, simple pendulum.' },
        { num: 14, title: 'Waves', code: 'keph207', p: 26, t: 32, desc: 'Transverse and longitudinal waves, speed of sound (Laplace correction), principle of superposition, standing waves in strings and pipes, beats.' }
      ]
    },
    {
      id: 'c11-chemistry',
      name: 'Chemistry',
      code: 'CHEM-11',
      color: '#10B981',
      bgLight: '#D1FAE5',
      icon: 'fa-solid fa-vial-circle-check',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      chapters: [
        { num: 1, title: 'Some Basic Concepts of Chemistry', code: 'kech101', p: 22, t: 28, desc: 'Nature of matter, Dalton\'s atomic theory, mole concept, molar mass, empirical and molecular formula, stoichiometry and limiting reagent.' },
        { num: 2, title: 'Structure of Atom', code: 'kech102', p: 28, t: 35, desc: 'Bohr’s model, dual nature of matter (de Broglie), Heisenberg uncertainty principle, quantum numbers, Aufbau, Hund\'s rule, Pauli exclusion.' },
        { num: 3, title: 'Classification of Elements and Periodicity in Properties', code: 'kech103', p: 20, t: 25, desc: 'Modern periodic law, s, p, d, f blocks, periodic trends: atomic radius, ionic radius, ionization enthalpy, electron gain enthalpy, electronegativity.' },
        { num: 4, title: 'Chemical Bonding and Molecular Structure', code: 'kech104', p: 30, t: 40, desc: 'Ionic and covalent bond, VSEPR theory, hybridization (sp, sp², sp³, dsp²), valence bond theory, molecular orbital theory (MOT), hydrogen bonding.' },
        { num: 5, title: 'Thermodynamics', code: 'kech105', p: 26, t: 35, desc: 'First law of thermodynamics, enthalpy, heat capacity, Hess’s law, entropy and spontaneity, Gibbs free energy ΔG = ΔH - TΔS.' },
        { num: 6, title: 'Equilibrium', code: 'kech201', p: 32, t: 40, desc: 'Law of mass action, Kc and Kp, Le Chatelier’s principle, ionic equilibrium, ionization of acids and bases, pH, buffer solutions, solubility product Ksp.' },
        { num: 7, title: 'Redox Reactions', code: 'kech202', p: 18, t: 24, desc: 'Oxidation and reduction, oxidation number rules, balancing redox reactions by ion-electron and oxidation number methods, electrochemical series.' },
        { num: 8, title: 'Organic Chemistry: Some Basic Principles and Techniques', code: 'kech203', p: 30, t: 38, desc: 'IUPAC nomenclature, inductive, electromeric, resonance and hyperconjugation effects, carbocations, carbanions, free radicals, purification techniques.' },
        { num: 9, title: 'Hydrocarbons', code: 'kech204', p: 28, t: 35, desc: 'Alkanes (conformations of ethane), Alkenes (Markovnikov’s addition), Alkynes (acidity), Aromatic hydrocarbons (benzene, electrophilic substitution, Huckel’s rule).' }
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
      chapters: [
        { num: 1, title: 'Sets', code: 'kemh101', p: 20, t: 25, desc: 'Sets and representations, empty, finite, infinite sets, subsets, power set, Venn diagrams, union and intersection.' },
        { num: 2, title: 'Relations and Functions', code: 'kemh102', p: 18, t: 24, desc: 'Cartesian product of sets, relations, domain, codomain, range, functions (identity, constant, polynomial, modulus, signum, greatest integer).' },
        { num: 3, title: 'Trigonometric Functions', code: 'kemh103', p: 28, t: 36, desc: 'Radian measure, trigonometric functions of sum and difference of angles, identities (cos(x±y), sin(x±y), tan(x±y)), graphs.' },
        { num: 4, title: 'Complex Numbers and Quadratic Equations', code: 'kemh104', p: 18, t: 24, desc: 'Algebra of complex numbers, modulus and conjugate, quadratic equations with complex roots.' },
        { num: 5, title: 'Linear Inequalities', code: 'kemh105', p: 16, t: 20, desc: 'Linear inequalities in one variable, algebraic solutions, graphical solutions of linear inequalities in two variables.' },
        { num: 6, title: 'Permutations and Combinations', code: 'kemh106', p: 20, t: 26, desc: 'Fundamental principle of counting, factorial notation, permutations nPr, combinations nCr, derivations and applications.' },
        { num: 7, title: 'Binomial Theorem', code: 'kemh107', p: 16, t: 22, desc: 'Binomial theorem for positive integral indices, Pascal’s triangle, general and middle terms in expansion.' },
        { num: 8, title: 'Sequences and Series', code: 'kemh108', p: 20, t: 26, desc: 'Geometric Progression (GP), general term of a GP, sum of n terms of a GP, infinite GP, arithmetic and geometric mean relation.' },
        { num: 9, title: 'Straight Lines', code: 'kemh109', p: 22, t: 28, desc: 'Slope of a line, various forms of equations of a line (slope-intercept, point-slope, two-point, intercept), distance of a point from a line.' },
        { num: 10, title: 'Conic Sections', code: 'kemh110', p: 24, t: 32, desc: 'Sections of a cone: circle, ellipse, parabola, hyperbola, standard equations and properties (eccentricity, foci, directrix).' },
        { num: 11, title: 'Introduction to Three Dimensional Geometry', code: 'kemh111', p: 14, t: 18, desc: 'Coordinate axes and coordinate planes in three dimensions, coordinates of a point, distance between two points, section formula.' },
        { num: 12, title: 'Limits and Derivatives', code: 'kemh112', p: 26, t: 35, desc: 'Intuitive idea of limit, limits of polynomials and trigonometric functions, derivative of functions using first principle, product and quotient rules.' },
        { num: 13, title: 'Statistics', code: 'kemh113', p: 20, t: 26, desc: 'Measures of dispersion: range, mean deviation about mean/median, variance and standard deviation of grouped and ungrouped data.' },
        { num: 14, title: 'Probability', code: 'kemh114', p: 18, t: 24, desc: 'Random experiments, outcomes, event types (mutually exclusive, exhaustive), axiomatic approach to probability.' }
      ]
    },
    {
      id: 'c11-biology',
      name: 'Biology',
      code: 'BIO-11',
      color: '#16A34A',
      bgLight: '#DCFCE7',
      icon: 'fa-solid fa-dna',
      gradient: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
      chapters: [
        { num: 1, title: 'The Living World', code: 'kebo101', p: 14, t: 18, desc: 'What is living? Biodiversity, need for classification, three domains of life, taxonomical hierarchy (Species to Kingdom), binomial nomenclature.' },
        { num: 2, title: 'Biological Classification', code: 'kebo102', p: 20, t: 26, desc: 'Five kingdom classification (Whittaker): Monera, Protista, Fungi, Plantae, Animalia, Viruses, Viroids, Prions, Lichens.' },
        { num: 3, title: 'Plant Kingdom', code: 'kebo103', p: 24, t: 30, desc: 'Classification into Algae, Bryophytes, Pteridophytes, Gymnosperms, and Angiosperms, alternation of generations.' },
        { num: 4, title: 'Animal Kingdom', code: 'kebo104', p: 28, t: 36, desc: 'Basis of classification (symmetry, coelom, germ layers), non-chordates (Porifera to Echinodermata) and Chordates classification.' },
        { num: 5, title: 'Morphology of Flowering Plants', code: 'kebo105', p: 22, t: 28, desc: 'Root, stem, leaf modifications, inflorescence, flower anatomy, fruit, seed, semi-technical description of family Solanaceae.' },
        { num: 6, title: 'Anatomy of Flowering Plants', code: 'kebo106', p: 20, t: 26, desc: 'Meristematic and permanent tissues, tissue systems (epidermal, ground, vascular), anatomy of dicot and monocot root, stem, leaf.' },
        { num: 7, title: 'Structural Organisation in Animals', code: 'kebo107', p: 16, t: 22, desc: 'Animal tissues: epithelial, connective, muscular, neural, morphology and anatomy of frog.' },
        { num: 8, title: 'Cell: The Unit of Life', code: 'kebo108', p: 24, t: 30, desc: 'Cell theory, prokaryotic vs eukaryotic cell, endomembrane system, mitochondria, chloroplasts, ribosomes, nucleus, chromosomes.' },
        { num: 9, title: 'Biomolecules', code: 'kebo109', p: 22, t: 28, desc: 'Structure of carbohydrates, amino acids, proteins, lipids, nucleic acids (DNA/RNA), enzymes (nature, kinetics, inhibition).' },
        { num: 10, title: 'Cell Cycle and Cell Division', code: 'kebo110', p: 18, t: 24, desc: 'Cell cycle phases (G1, S, G2, M), Mitosis stages and significance, Meiosis I and II, crossing over and recombination.' },
        { num: 11, title: 'Photosynthesis in Higher Plants', code: 'kebo111', p: 24, t: 30, desc: 'Chloroplast pigments, light reaction (Z-scheme, photophosphorylation), Calvin cycle (C3), Hatch-Slack pathway (C4), photorespiration.' },
        { num: 12, title: 'Respiration in Plants', code: 'kebo112', p: 20, t: 26, desc: 'Glycolysis, fermentation, aerobic respiration, Krebs cycle, electron transport system (ETS), oxidative phosphorylation, respiratory quotient.' },
        { num: 13, title: 'Plant Growth and Development', code: 'kebo113', p: 18, t: 24, desc: 'Growth phases, differentiation, dedifferentiation, plant growth regulators (auxins, gibberellins, cytokinins, ethylene, ABA).' },
        { num: 14, title: 'Breathing and Exchange of Gases', code: 'kebo114', p: 18, t: 24, desc: 'Respiratory organs, mechanism of breathing, respiratory volumes and capacities, gas exchange, oxygen dissociation curve.' },
        { num: 15, title: 'Body Fluids and Circulation', code: 'kebo115', p: 22, t: 28, desc: 'Blood composition, blood groups (ABO, Rh), lymph, human circulatory system, cardiac cycle, ECG, double circulation.' },
        { num: 16, title: 'Excretory Products and their Elimination', code: 'kebo116', p: 20, t: 26, desc: 'Human excretory system, urine formation (filtration, reabsorption, secretion), counter-current mechanism, regulation of kidney function (RAAS).' },
        { num: 17, title: 'Locomotion and Movement', code: 'kebo117', p: 20, t: 26, desc: 'Muscle types, sliding filament theory of muscle contraction, skeletal system (axial and appendicular), joints and disorders.' },
        { num: 18, title: 'Neural Control and Coordination', code: 'kebo118', p: 20, t: 26, desc: 'Neuron, generation and transmission of nerve impulse, human central and peripheral nervous systems, reflex arc.' },
        { num: 19, title: 'Chemical Coordination and Integration', code: 'kebo119', p: 20, t: 26, desc: 'Endocrine glands and hormones (hypothalamus, pituitary, thyroid, adrenal, pancreas, gonads), hormone action mechanism.' }
      ]
    },
    {
      id: 'c11-english',
      name: 'English Core',
      code: 'ENG-11',
      color: '#7C3AED',
      bgLight: '#EDE9FE',
      icon: 'fa-solid fa-book-open-reader',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
      chapters: [
        { num: 1, title: 'The Portrait of a Lady (Hornbill)', code: 'kehb101', p: 14, t: 18, desc: 'Khushwant Singh’s moving portrait of his devout grandmother: village school days, sparrows, silent passing.' },
        { num: 2, title: 'We\'re Not Afraid to Die... If We Can All Be Together', code: 'kehb102', p: 16, t: 22, desc: 'Gordon Cook maritime saga: Wavewalker voyage, battling gigantic waves in Southern Indian Ocean with heroic family courage.' },
        { num: 3, title: 'Discovering Tut: the Saga Continues', code: 'kehb103', p: 16, t: 22, desc: 'A.R. Williams archaeological exploration: CT scan of boy pharaoh Tutankhamun, Howard Carter discovery, mystery of early death.' },
        { num: 4, title: 'The Voice of the Rain (Poem)', code: 'kehb104', p: 10, t: 15, desc: 'Walt Whitman dialogue between poet and descending shower, eternal water cycle as nature’s poem of renewal.' },
        { num: 5, title: 'Childhood (Poem)', code: 'kehb105', p: 10, t: 15, desc: 'Markus Natten poetic quest on loss of innocence, realizing hypocrisy of adults and dawn of independent individuality.' },
        { num: 6, title: 'The Adventure', code: 'kehb106', p: 18, t: 24, desc: 'Jayant Narlikar sci-fi: Professor Gaitonde catapulted into alternate quantum history where Marathas won Battle of Panipat.' },
        { num: 7, title: 'Silk Road', code: 'kehb107', p: 16, t: 22, desc: 'Nick Middleton travelogue: arduous pilgrimage (Kora) to Mount Kailash across high Tibetan plateau, meeting Norbu at Darchen.' },
        { num: 8, title: 'Father to Son (Poem)', code: 'kehb108', p: 10, t: 15, desc: 'Elizabeth Jennings poem exploring painful generational gap, silence and longing for emotional reconciliation between father and son.' },
        { num: 9, title: 'The Summer of the Beautiful White Horse (Snapshots)', code: 'kesn101', p: 14, t: 20, desc: 'William Saroyan story: Armenian Garoghlanian boys Aram and Mourad borrowing John Byro’s stolen white horse.' },
        { num: 10, title: 'The Address (Snapshots)', code: 'kesn102', p: 14, t: 20, desc: 'Marga Minco poignant post-WWII narrative: daughter visiting 46 Marconi Street to reclaim mother\'s possessions from Mrs. Dorling.' }
      ]
    }
  ],
  commerce: [
    {
      id: 'c11-accounts',
      name: 'Accountancy',
      code: 'ACC-11',
      color: '#0891B2',
      bgLight: '#CFFAFE',
      icon: 'fa-solid fa-file-invoice-dollar',
      gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
      chapters: [
        { num: 1, title: 'Introduction to Accounting', code: 'keac101', p: 20, t: 25, desc: 'Meaning, objectives, accounting principles, concepts (accrual, going concern, money measurement), users of accounting info.' },
        { num: 2, title: 'Theory Base of Accounting', code: 'keac102', p: 22, t: 28, desc: 'GAAP, accounting standards, IFRS, cash vs accrual basis, dual aspect concept, revenue recognition, conservatism.' },
        { num: 3, title: 'Recording of Transactions - I', code: 'keac103', p: 28, t: 35, desc: 'Accounting equation (Assets = Liabilities + Capital), rules of debit and credit, Journal entries, ledger posting.' },
        { num: 4, title: 'Recording of Transactions - II', code: 'keac104', p: 26, t: 32, desc: 'Special purpose subsidiary books: Cash book (single, double column, petty cash), purchases and sales day books.' },
        { num: 5, title: 'Bank Reconciliation Statement', code: 'keac105', p: 22, t: 28, desc: 'Need for BRS, timing differences, errors, preparation of BRS from cash book and pass book balances.' },
        { num: 6, title: 'Trial Balance and Rectification of Errors', code: 'keac106', p: 24, t: 30, desc: 'Meaning of Trial Balance, types of accounting errors (omission, commission, principle, compensating), suspense account.' },
        { num: 7, title: 'Depreciation, Provisions and Reserves', code: 'keac107', p: 26, t: 32, desc: 'Causes of depreciation, Straight Line Method (SLM), Written Down Value (WDV), provisions vs reserves.' },
        { num: 8, title: 'Financial Statements - I', code: 'keac108', p: 26, t: 32, desc: 'Trading Account, Profit and Loss Account, Balance Sheet (marshalling of assets and liabilities), capital vs revenue expenditure.' },
        { num: 9, title: 'Financial Statements - II (Adjustments)', code: 'keac201', p: 28, t: 35, desc: 'Adjustments in final accounts: closing stock, outstanding/prepaid expenses, accrued income, bad debts and provision for doubtful debts.' }
      ]
    },
    {
      id: 'c11-bst',
      name: 'Business Studies',
      code: 'BST-11',
      color: '#D97706',
      bgLight: '#FEF3C7',
      icon: 'fa-solid fa-briefcase',
      gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      chapters: [
        { num: 1, title: 'Business, Trade and Commerce', code: 'kebs101', p: 20, t: 25, desc: 'Concept, characteristics of business, industry vs commerce, business risk, historical indigenous banking system in India.' },
        { num: 2, title: 'Forms of Business Organisation', code: 'kebs102', p: 28, t: 35, desc: 'Sole Proprietorship, Partnership, HUF, Cooperative Societies, Joint Stock Company (formation, MOA, AOA).' },
        { num: 3, title: 'Public, Private and Global Enterprises', code: 'kebs103', p: 20, t: 26, desc: 'Departmental undertakings, Statutory corporations, Government companies, Public Private Partnership (PPP), MNCs.' },
        { num: 4, title: 'Business Services', code: 'kebs104', p: 24, t: 30, desc: 'Banking services (RTGS, NEFT, e-banking), Insurance principles, types of insurance (life, fire, marine), warehousing and postal services.' },
        { num: 5, title: 'Emerging Modes of Business', code: 'kebs105', p: 18, t: 24, desc: 'e-Business vs traditional business, B2B, B2C, C2C transactions, online payment security, Outsourcing (BPO/KPO).' },
        { num: 6, title: 'Social Responsibilities of Business and Business Ethics', code: 'kebs106', p: 16, t: 22, desc: 'Concept of CSR, responsibilities towards shareholders, workers, consumers, and society, environmental protection, business ethics.' },
        { num: 7, title: 'Sources of Business Finance', code: 'kebs107', p: 24, t: 30, desc: 'Owner’s funds (Equity shares, preference shares, retained earnings, GDR/ADR) vs Borrowed funds (Debentures, bank loans, commercial papers).' },
        { num: 8, title: 'Small Business and Enterprises', code: 'kebs108', p: 18, t: 24, desc: 'MSMED Act classification (Micro, Small, Medium), role of small business in rural India, Start-up India, intellectual property rights.' },
        { num: 9, title: 'Internal Trade', code: 'kebs109', p: 22, t: 28, desc: 'Wholesale trade, retail trade, large-scale retailers (Departmental stores, multiple chain shops, mail order), GST concept and mechanism.' },
        { num: 10, title: 'International Business - I', code: 'kebs110', p: 20, t: 26, desc: 'Meaning, benefits of international business, export and import procedures, key export documents (Letter of Credit, Bill of Lading).' },
        { num: 11, title: 'International Business - II (Institutions)', code: 'kebs111', p: 16, t: 22, desc: 'World Trade Organization (WTO), International Monetary Fund (IMF), World Bank objectives and role in global economic trade.' }
      ]
    },
    {
      id: 'c11-economics',
      name: 'Economics',
      code: 'ECO-11',
      color: '#4F46E5',
      bgLight: '#EEF2FF',
      icon: 'fa-solid fa-chart-line',
      gradient: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
      chapters: [
        { num: 1, title: 'Introduction to Statistics', code: 'kest101', p: 14, t: 18, desc: 'Meaning, scope, and importance of statistics in economics, consumer, producer, service provider concepts.' },
        { num: 2, title: 'Collection of Data', code: 'kest102', p: 18, t: 24, desc: 'Primary vs secondary data, methods of collecting primary data, census vs sample surveys, NSSO, Census of India.' },
        { num: 3, title: 'Organisation of Data', code: 'kest103', p: 16, t: 22, desc: 'Classification of data, raw data, frequency distribution, continuous and discrete variables, bivariate frequency tables.' },
        { num: 4, title: 'Presentation of Data', code: 'kest104', p: 20, t: 26, desc: 'Geometric forms (bar diagrams, pie charts), frequency diagrams (histograms, frequency polygon, ogives), arithmetic line graphs.' },
        { num: 5, title: 'Measures of Central Tendency', code: 'kest105', p: 24, t: 32, desc: 'Arithmetic mean (direct, shortcut, step-deviation methods), Median, Quartiles, Mode, properties and comparisons.' },
        { num: 6, title: 'Correlation', code: 'kest106', p: 18, t: 24, desc: 'Concept, scatter diagrams, Karl Pearson’s coefficient of correlation (assumed mean, actual mean), Spearman’s rank correlation.' },
        { num: 7, title: 'Index Numbers', code: 'kest107', p: 18, t: 24, desc: 'Meaning, wholesale price index, consumer price index, Laspeyres, Paasche, and Fisher ideal index formulas, inflation.' },
        { num: 8, title: 'Introduction to Microeconomics', code: 'kemi101', p: 14, t: 18, desc: 'Central problems of an economy (what, how, for whom to produce), opportunity cost, Production Possibility Curve (PPC).' },
        { num: 9, title: 'Consumer\'s Equilibrium', code: 'kemi102', p: 24, t: 30, desc: 'Utility analysis (total & marginal utility, law of diminishing marginal utility), Indifference Curve analysis (budget line, MRS, equilibrium).' },
        { num: 10, title: 'Demand and Price Elasticity of Demand', code: 'kemi103', p: 22, t: 28, desc: 'Law of demand, demand schedule, shift vs movement along demand curve, price elasticity of demand measurement (percentage method).' },
        { num: 11, title: 'Production and Costs', code: 'kemi104', p: 24, t: 30, desc: 'Law of Variable Proportions (TP, MP, AP), short-run and long-run costs (TFC, TVC, TC, AFC, AVC, ATC, MC curves).' },
        { num: 12, title: 'Theory of Supply and Market Forms', code: 'kemi105', p: 22, t: 28, desc: 'Law of supply, elasticity of supply, Perfect Competition features, determination of market price equilibrium, excess demand/supply.' }
      ]
    }
  ],
  arts: [
    {
      id: 'c11-history',
      name: 'History',
      code: 'HIST-11',
      color: '#9333EA',
      bgLight: '#F3E8FF',
      icon: 'fa-solid fa-landmark',
      gradient: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
      chapters: [
        { num: 1, title: 'Writing and City Life (Mesopotamia)', code: 'keth101', p: 24, t: 30, desc: 'Mesopotamian civilisation, cuneiform script, city of Uruk, Ur, palace of Mari, urban economy and legacy of writing.' },
        { num: 2, title: 'An Empire Across Three Continents (Roman Empire)', code: 'keth102', p: 26, t: 32, desc: 'Roman Empire across Europe, West Asia, North Africa, Principate of Augustus, social hierarchies, slavery, third-century crisis.' },
        { num: 3, title: 'Nomadic Empires (The Mongols)', code: 'keth103', p: 22, t: 28, desc: 'Genghis Khan, Mongol conquests, military organisation, Yam postal communication system, Yasa legal code, trans-continental trade.' },
        { num: 4, title: 'The Three Orders (Feudal Society)', code: 'keth104', p: 24, t: 30, desc: 'Three orders in Western Europe (Clergy, Nobility, Peasantry), manorial estate, chivalry, Black Death plague, rise of monarchies.' },
        { num: 5, title: 'Changing Cultural Traditions (The Renaissance)', code: 'keth105', p: 24, t: 30, desc: 'Italian city-states, Humanism, art and architecture (Da Vinci, Michelangelo), printing press, scientific revolution, Copernicus.' },
        { num: 6, title: 'Displacing Indigenous Peoples', code: 'keth106', p: 22, t: 28, desc: 'European settlement in North America and Australia, dispossession of Native Americans, "Gold Rush", "Terra Nullius" myth.' },
        { num: 7, title: 'Paths to Modernisation (Japan & China)', code: 'keth107', p: 26, t: 32, desc: 'Meiji Restoration in Japan, militarisation, Sun Yat-sen\'s Three Principles, Chinese Communist Party, Mao Zedong 1949 revolution.' }
      ]
    },
    {
      id: 'c11-polsci',
      name: 'Political Science',
      code: 'POL-11',
      color: '#BE123C',
      bgLight: '#FFE4E6',
      icon: 'fa-solid fa-scale-balanced',
      gradient: 'linear-gradient(135deg, #BE123C 0%, #9F1239 100%)',
      chapters: [
        { num: 1, title: 'Constitution: Why and How?', code: 'keps101', p: 22, t: 28, desc: 'Need for constitution, authority of constitution, making of Indian Constitution, Constituent Assembly deliberations.' },
        { num: 2, title: 'Rights in the Indian Constitution', code: 'keps102', p: 24, t: 30, desc: 'Fundamental Rights, Directive Principles of State Policy (DPSP), relationship between Fundamental Rights and DPSPs, writs.' },
        { num: 3, title: 'Election and Representation', code: 'keps103', p: 22, t: 28, desc: 'First Past the Post (FPTP) system vs Proportional Representation, reservation of constituencies, free and fair elections, ECI.' },
        { num: 4, title: 'Executive', code: 'keps104', p: 20, t: 26, desc: 'Parliamentary executive in India, President powers, Prime Minister and Council of Ministers, permanent executive (civil services).' },
        { num: 5, title: 'Legislature', code: 'keps105', p: 22, t: 28, desc: 'Bicameral legislature, powers of Lok Sabha and Rajya Sabha, legislative procedure, parliamentary control over the executive.' },
        { num: 6, title: 'Judiciary', code: 'keps106', p: 22, t: 28, desc: 'Independence of judiciary, structure of courts in India, jurisdiction of Supreme Court, judicial activism, Public Interest Litigation.' },
        { num: 7, title: 'Federalism', code: 'keps107', p: 20, t: 26, desc: 'Federalism in Indian Constitution, strong central government features, Centre-State relations, interstate conflicts, special provisions.' },
        { num: 8, title: 'Local Governments', code: 'keps108', p: 18, t: 24, desc: '73rd and 74th Constitutional Amendment Acts, Panchayati Raj three-tier structure, urban local bodies, decentralisation in India.' },
        { num: 9, title: 'Political Theory: An Introduction', code: 'keps201', p: 14, t: 18, desc: 'What is politics? Scope of political theory, examining political values and principles in democratic societies.' },
        { num: 10, title: 'Freedom', code: 'keps202', p: 16, t: 22, desc: 'Ideal of freedom, positive vs negative liberty, harm principle of J.S. Mill, constraints on liberty, freedom of expression.' },
        { num: 11, title: 'Equality', code: 'keps203', p: 16, t: 22, desc: 'Significance of equality, dimensions of equality (political, economic, social), affirmative action and reservation policies.' },
        { num: 12, title: 'Social Justice', code: 'keps204', p: 16, t: 22, desc: 'What is justice? Equal treatment of equals, proportionate justice, John Rawls\'s theory of justice (Veil of Ignorance).' },
        { num: 13, title: 'Rights', code: 'keps205', p: 16, t: 22, desc: 'What are rights? Where do rights come from? Legal rights, human rights, rights and responsibilities.' },
        { num: 14, title: 'Citizenship', code: 'keps206', p: 16, t: 22, desc: 'Meaning of citizenship, full and equal membership, citizen and nation, universal citizenship and global citizenship.' }
      ]
    },
    {
      id: 'c11-geography',
      name: 'Geography',
      code: 'GEOG-11',
      color: '#059669',
      bgLight: '#E6F4EA',
      icon: 'fa-solid fa-mountain-sun',
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      chapters: [
        { num: 1, title: 'Geography as a Discipline', code: 'kegy101', p: 12, t: 16, desc: 'Geography as integrating discipline, branches: physical geography, human geography, biogeography.' },
        { num: 2, title: 'The Origin and Evolution of the Earth', code: 'kegy102', p: 16, t: 22, desc: 'Origin of earth, Big Bang theory, evolution of lithosphere, atmosphere and oceans, origin of life.' },
        { num: 3, title: 'Interior of the Earth', code: 'kegy103', p: 16, t: 22, desc: 'Sources of information (direct & indirect), earthquake waves (P and S waves, shadow zone), mantle, crust, core.' },
        { num: 4, title: 'Distribution of Oceans and Continents', code: 'kegy104', p: 18, t: 24, desc: 'Continental Drift theory (Alfred Wegener), sea floor spreading, plate tectonics, convergent, divergent, transform boundaries.' },
        { num: 5, title: 'Geomorphic Processes', code: 'kegy105', p: 20, t: 26, desc: 'Endogenic and exogenic processes, weathering (chemical, physical, biological), mass wasting, erosion and deposition.' },
        { num: 6, title: 'Landforms and their Evolution', code: 'kegy106', p: 22, t: 28, desc: 'Running water, groundwater (karst topography), glaciers, waves and currents, winds and desert landforms.' },
        { num: 7, title: 'Composition and Structure of Atmosphere', code: 'kegy107', p: 14, t: 18, desc: 'Atmospheric composition, structure: Troposphere, Stratosphere (ozone), Mesosphere, Thermosphere, Exosphere.' },
        { num: 8, title: 'Solar Radiation, Heat Balance and Temperature', code: 'kegy108', p: 16, t: 22, desc: 'Insolation, terrestrial radiation, heat budget of the earth, factors controlling temperature distribution, inversion of temperature.' },
        { num: 9, title: 'Atmospheric Circulation and Weather Systems', code: 'kegy109', p: 20, t: 26, desc: 'Atmospheric pressure, Coriolis force, planetary wind belts (Trade winds, Westerlies), Hadley and Ferrel cells, tropical cyclones.' },
        { num: 10, title: 'Water in the Atmosphere', code: 'kegy110', p: 14, t: 18, desc: 'Humidity (absolute, relative), condensation, dew, frost, fog, clouds classification, precipitation types (convectional, orographic, cyclonic).' },
        { num: 11, title: 'World Climate and Climate Change', code: 'kegy111', p: 16, t: 22, desc: 'Koeppen’s scheme of climatic classification, global warming, greenhouse gases, climate change evidence.' },
        { num: 12, title: 'Water (Oceans)', code: 'kegy112', p: 16, t: 22, desc: 'Relief of ocean floor (Continental shelf, slope, deep sea plain, oceanic trenches), temperature and salinity distribution of ocean water.' },
        { num: 13, title: 'Movements of Ocean Water', code: 'kegy113', p: 18, t: 24, desc: 'Waves, tides (spring & neap tides, semi-diurnal), ocean currents (Gulf Stream, Kuroshio, cold currents), effects on navigation.' },
        { num: 14, title: 'Biodiversity and Conservation', code: 'kegy114', p: 14, t: 18, desc: 'Levels of biodiversity (genetic, species, ecosystem), importance of biodiversity, threats, IUCN categories, conservation strategies.' },
        { num: 15, title: 'India - Location and Space Relations', code: 'kegy201', p: 12, t: 16, desc: 'Location, latitudinal/longitudinal extent, political boundaries, neighbours, coastlines, geopolitical significance of Indian Ocean.' },
        { num: 16, title: 'Structure and Physiography of India', code: 'kegy202', p: 20, t: 26, desc: 'Geological divisions: Peninsular block, Himalayas, Indo-Ganga-Brahmaputra plain, physiographic divisions.' },
        { num: 17, title: 'Drainage System of India', code: 'kegy203', p: 20, t: 26, desc: 'Drainage patterns, Himalayan rivers vs Peninsular rivers, river basins, water dispute issues, river pollution.' },
        { num: 18, title: 'Climate of India', code: 'kegy204', p: 22, t: 28, desc: 'Monsoon mechanism, onset, branches (Arabian Sea and Bay of Bengal), withdrawal, western disturbances, climatic regions of India.' },
        { num: 19, title: 'Natural Vegetation and Soils of India', code: 'kegy205', p: 20, t: 26, desc: 'Forest types of India, forest cover, conservation policies, major soil groups of India (Alluvial, Black, Red, Laterite).' }
      ]
    }
  ]
};

module.exports = { CLASS_11_DATA };
