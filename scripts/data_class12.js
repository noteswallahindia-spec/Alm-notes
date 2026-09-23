// CLASS 12 CURRICULUM DATA (NCERT 2026 EDITION)
const CLASS_12_DATA = {
  science: [
    {
      id: 'c12-physics',
      name: 'Physics',
      code: 'PHY-12',
      color: '#0284C7',
      bgLight: '#E0F2FE',
      icon: 'fa-solid fa-atom',
      gradient: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
      chapters: [
        { num: 1, title: 'Electric Charges and Fields', code: 'leph101', p: 26, t: 35, desc: 'Coulomb’s Law, electric field lines, electric dipole in external field, Gauss’s Law and applications to infinite wire, plane sheet, and shell.' },
        { num: 2, title: 'Electrostatic Potential and Capacitance', code: 'leph102', p: 28, t: 35, desc: 'Electric potential due to point charge and dipole, equipotential surfaces, potential energy, parallel plate capacitor, dielectric effect, capacitors combination.' },
        { num: 3, title: 'Current Electricity', code: 'leph103', p: 30, t: 40, desc: 'Ohm’s law, drift velocity, resistivity, temperature dependence, Kirchhoff’s rules, Wheatstone bridge, meter bridge.' },
        { num: 4, title: 'Moving Charges and Magnetism', code: 'leph104', p: 28, t: 38, desc: 'Biot-Savart Law, Ampere’s Circuital Law, magnetic field of circular coil and solenoid, Lorentz force, cyclotron, moving coil galvanometer.' },
        { num: 5, title: 'Magnetism and Matter', code: 'leph105', p: 18, t: 25, desc: 'Bar magnet as equivalent solenoid, magnetic dipole moment, Earth’s magnetism elements, dia, para, and ferromagnetic substances.' },
        { num: 6, title: 'Electromagnetic Induction', code: 'leph106', p: 22, t: 30, desc: 'Faraday’s laws of induction, Lenz’s Law and conservation of energy, motional EMF, eddy currents, self and mutual inductance.' },
        { num: 7, title: 'Alternating Current', code: 'leph107', p: 26, t: 35, desc: 'Peak and RMS value of AC, phasor diagrams, AC through LCR series circuit, resonance, power in AC circuit, power factor, transformers.' },
        { num: 8, title: 'Electromagnetic Waves', code: 'leph108', p: 14, t: 20, desc: 'Displacement current, Maxwell’s equations, characteristics of EM waves, electromagnetic spectrum (radio waves to gamma rays) and applications.' },
        { num: 9, title: 'Ray Optics and Optical Instruments', code: 'leph201', p: 32, t: 42, desc: 'Total internal reflection, refraction at spherical surfaces, Lens Maker’s Formula, prism dispersion, compound microscope, astronomical telescope.' },
        { num: 10, title: 'Wave Optics', code: 'leph202', p: 24, t: 32, desc: 'Huygens\' principle, reflection and refraction proof, Young\'s double slit experiment (YDSE), fringe width, single slit diffraction.' },
        { num: 11, title: 'Dual Nature of Radiation and Matter', code: 'leph203', p: 20, t: 28, desc: 'Photoelectric effect, Hertz and Lenard observations, Einstein’s photoelectric equation, de Broglie relation, Davisson-Germer experiment.' },
        { num: 12, title: 'Atoms', code: 'leph204', p: 18, t: 25, desc: 'Alpha-particle scattering experiment, Rutherford nuclear model, Bohr model of hydrogen atom, energy levels, hydrogen emission line spectra.' },
        { num: 13, title: 'Nuclei', code: 'leph205', p: 18, t: 24, desc: 'Atomic masses and composition of nucleus, mass defect, binding energy curve, nuclear fission, nuclear fusion in stars.' },
        { num: 14, title: 'Semiconductor Electronics: Materials, Devices and Simple Circuits', code: 'leph206', p: 28, t: 36, desc: 'Intrinsic and extrinsic semiconductors (p-type and n-type), p-n junction diode forward and reverse characteristics, half and full wave rectifiers.' }
      ]
    },
    {
      id: 'c12-chemistry',
      name: 'Chemistry',
      code: 'CHEM-12',
      color: '#10B981',
      bgLight: '#D1FAE5',
      icon: 'fa-solid fa-vial-circle-check',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      chapters: [
        { num: 1, title: 'Solutions', code: 'lech101', p: 24, t: 32, desc: 'Henry’s law, Raoult’s law for volatile solutes, ideal and non-ideal solutions, colligative properties (elevation of boiling point, osmotic pressure), van \'t Hoff factor.' },
        { num: 2, title: 'Electrochemistry', code: 'lech102', p: 28, t: 36, desc: 'Galvanic cells, Nernst equation, standard electrode potential, molar conductivity and Kohlrausch’s law, electrolysis, lead accumulator, fuel cells.' },
        { num: 3, title: 'Chemical Kinetics', code: 'lech103', p: 24, t: 32, desc: 'Rate of reaction, rate law and order of reaction, integrated rate equations for zero and first order reactions, half-life, Arrhenius equation.' },
        { num: 4, title: 'The d- and f-Block Elements', code: 'lech104', p: 26, t: 34, desc: 'Electronic configuration, variable oxidation states, catalytic properties, magnetic properties, Lanthanoid contraction, preparation of K2Cr2O7 and KMnO4.' },
        { num: 5, title: 'Coordination Compounds', code: 'lech105', p: 26, t: 34, desc: 'Werner\'s theory, IUPAC nomenclature of coordination compounds, isomerism, Valence Bond Theory, Crystal Field Theory (CFT) crystal field splitting.' },
        { num: 6, title: 'Haloalkanes and Haloarenes', code: 'lech201', p: 26, t: 34, desc: 'Nomenclature, preparation methods, SN1 and SN2 reaction mechanisms, optical isomerism, stereochemistry, electrophilic substitution in haloarenes.' },
        { num: 7, title: 'Alcohols, Phenols and Ethers', code: 'lech202', p: 28, t: 36, desc: 'Hydroboration-oxidation, acidity of phenols, Kolbe\'s reaction, Reimer-Tiemann reaction, Williamson ether synthesis, electrophilic substitution.' },
        { num: 8, title: 'Aldehydes, Ketones and Carboxylic Acids', code: 'lech203', p: 30, t: 40, desc: 'Nucleophilic addition reactions, Aldol condensation, Cannizzaro reaction, Tollens\' and Fehling\'s tests, Hell-Volhard-Zelinsky (HVZ) reaction.' },
        { num: 9, title: 'Amines', code: 'lech204', p: 22, t: 30, desc: 'Structure, basicity of amines in aqueous and gas phase, Gabriel phthalimide synthesis, Hoffmann bromamide degradation, diazotisation and coupling reactions.' },
        { num: 10, title: 'Biomolecules', code: 'lech205', p: 22, t: 30, desc: 'Monosaccharides (glucose structure, D/L configuration), proteins (peptide linkage, primary to quaternary structure, denaturation), nucleic acids (DNA/RNA).' }
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
      chapters: [
        { num: 1, title: 'Relations and Functions', code: 'lemh101', p: 20, t: 26, desc: 'Types of relations (reflexive, symmetric, transitive, equivalence relations), one-one (injective) and onto (surjective) functions, composite functions.' },
        { num: 2, title: 'Inverse Trigonometric Functions', code: 'lemh102', p: 18, t: 24, desc: 'Definition, principal value branches, domain and range of inverse trigonometric functions, graphs and basic algebraic properties.' },
        { num: 3, title: 'Matrices', code: 'lemh103', p: 22, t: 28, desc: 'Concept, types of matrices, matrix addition, scalar multiplication, matrix multiplication, transpose of matrix, symmetric and skew-symmetric matrices.' },
        { num: 4, title: 'Determinants', code: 'lemh104', p: 24, t: 30, desc: 'Determinant of square matrix, minors and cofactors, adjoint and inverse of a square matrix, solving system of linear equations using matrix method.' },
        { num: 5, title: 'Continuity and Differentiability', code: 'lemh105', p: 30, t: 40, desc: 'Continuity at a point, derivative of composite functions (chain rule), derivatives of implicit functions, logarithmic differentiation, parametric differentiation, second order derivative.' },
        { num: 6, title: 'Application of Derivatives', code: 'lemh106', p: 26, t: 35, desc: 'Rate of change of quantities, strictly increasing and decreasing functions, maxima and minima (first and second derivative tests, practical word problems).' },
        { num: 7, title: 'Integrals', code: 'lemh201', p: 36, t: 48, desc: 'Integration as inverse process of differentiation, substitution, partial fractions, integration by parts, definite integrals and fundamental theorem of calculus, properties of definite integrals.' },
        { num: 8, title: 'Application of Integrals', code: 'lemh202', p: 18, t: 24, desc: 'Area under simple curves, area between curves (circles, parabolas, ellipses in standard form) using definite integration.' },
        { num: 9, title: 'Differential Equations', code: 'lemh203', p: 22, t: 30, desc: 'Order and degree, general and particular solutions, separation of variables, homogeneous differential equations, first order linear differential equations (dy/dx + Py = Q).' },
        { num: 10, title: 'Vector Algebra', code: 'lemh204', p: 20, t: 26, desc: 'Vectors and scalars, magnitude and direction cosines, addition of vectors, dot (scalar) product and cross (vector) product of two vectors, projection of vector.' },
        { num: 11, title: 'Three Dimensional Geometry', code: 'lemh205', p: 24, t: 32, desc: 'Direction cosines and direction ratios of a line, vector and Cartesian equations of a line in 3D space, angle between two lines, shortest distance between two skew lines.' },
        { num: 12, title: 'Linear Programming', code: 'lemh206', p: 16, t: 22, desc: 'Mathematical formulation of LP problems, graphical solution method for linear inequalities, corner point method, bounded and unbounded feasible regions.' },
        { num: 13, title: 'Probability', code: 'lemh207', p: 22, t: 30, desc: 'Conditional probability, multiplication rule, independent events, total probability theorem, Bayes’ theorem, random variable and probability distribution.' }
      ]
    },
    {
      id: 'c12-biology',
      name: 'Biology',
      code: 'BIO-12',
      color: '#16A34A',
      bgLight: '#DCFCE7',
      icon: 'fa-solid fa-dna',
      gradient: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
      chapters: [
        { num: 1, title: 'Sexual Reproduction in Flowering Plants', code: 'lebo101', p: 24, t: 30, desc: 'Microsporogenesis, megasporogenesis, pollen-pistil interaction, double fertilization, triple fusion, endosperm and embryo development, apomixis.' },
        { num: 2, title: 'Human Reproduction', code: 'lebo102', p: 26, t: 32, desc: 'Male and female reproductive systems, spermatogenesis, oogenesis, menstrual cycle, fertilization, blastocyst implantation, pregnancy and parturition.' },
        { num: 3, title: 'Reproductive Health', code: 'lebo103', p: 16, t: 22, desc: 'Need for reproductive health, contraceptive methods (barrier, IUDs, pills, surgical), medical termination of pregnancy (MTP), STIs, Assisted Reproductive Technologies (ART, IVF, ZIFT).' },
        { num: 4, title: 'Principles of Inheritance and Variation', code: 'lebo104', p: 30, t: 38, desc: 'Mendelian inheritance, incomplete dominance, codominance (ABO blood), chromosomal theory of inheritance, linkage and recombination, sex-linked inheritance (haemophilia, color blindness), chromosomal disorders (Down’s, Turner’s, Klinefelter’s).' },
        { num: 5, title: 'Molecular Basis of Inheritance', code: 'lebo105', p: 32, t: 40, desc: 'DNA structure (Watson & Crick double helix), packaging of DNA, Hershey-Chase experiment, semi-conservative replication, transcription, genetic code, translation, Lac Operon.' },
        { num: 6, title: 'Evolution', code: 'lebo106', p: 22, t: 28, desc: 'Origin of life, biological evolution evidence (homologous/analogous organs), natural selection (industrial melanism), Hardy-Weinberg principle, adaptive radiation, human evolution.' },
        { num: 7, title: 'Human Health and Disease', code: 'lebo107', p: 26, t: 32, desc: 'Pathogens and diseases (Typhoid, Pneumonia, Malaria life cycle, Amoebiasis, Ringworm), innate and acquired immunity, vaccination, AIDS (HIV), Cancer causes and detection, drug abuse.' },
        { num: 8, title: 'Microbes in Human Welfare', code: 'lebo108', p: 18, t: 24, desc: 'Microbes in household food processing (LAB), industrial products (fermenters, antibiotics, statins, cyclosporin A), sewage treatment plants (STPs), biogas production, biofertilizers.' },
        { num: 9, title: 'Biotechnology: Principles and Processes', code: 'lebo109', p: 22, t: 28, desc: 'Genetic engineering, restriction endonucleases, cloning vectors (pBR322), competent host transformation, polymerase chain reaction (PCR), bioreactors, downstream processing.' },
        { num: 10, title: 'Biotechnology and its Applications', code: 'lebo110', p: 18, t: 24, desc: 'Applications in agriculture (Bt cotton, RNA interference), medicine (genetically engineered insulin, gene therapy for ADA deficiency), transgenic animals, ethical issues, biopiracy.' },
        { num: 11, title: 'Organisms and Populations', code: 'lebo111', p: 20, t: 26, desc: 'Organism and its environment, adaptations, population attributes (growth models: exponential and logistic), population interactions (mutualism, competition, predation, parasitism).' },
        { num: 12, title: 'Ecosystem', code: 'lebo112', p: 18, t: 24, desc: 'Ecosystem structure and function, primary and secondary productivity, decomposition steps, energy flow (10% law), ecological pyramids (number, biomass, energy).' },
        { num: 13, title: 'Biodiversity and Conservation', code: 'lebo113', p: 18, t: 24, desc: 'Patterns of biodiversity (latitudinal gradient, species-area relationship), importance of species diversity (Rivet popper hypothesis), loss of biodiversity ("Evil Quartet"), in-situ and ex-situ conservation.' }
      ]
    },
    {
      id: 'c12-english',
      name: 'English Core',
      code: 'ENG-12',
      color: '#7C3AED',
      bgLight: '#EDE9FE',
      icon: 'fa-solid fa-book-open-reader',
      gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
      chapters: [
        { num: 1, title: 'The Last Lesson (Flamingo)', code: 'lefl101', p: 14, t: 18, desc: 'Alphonse Daudet Franco-Prussian war story: M. Hamel’s final poignant French lesson in Alsace, patriotic dignity, linguistic chauvinism.' },
        { num: 2, title: 'Lost Spring (Flamingo)', code: 'lefl102', p: 16, t: 22, desc: 'Anees Jung narratives of stolen childhood: ragpicker Saheb in Seemapuri and bangle-maker Mukesh trapped in Firozabad glass furnace poverty.' },
        { num: 3, title: 'Deep Water (Flamingo)', code: 'lefl103', p: 14, t: 20, desc: 'William O. Douglas autobiographical account of overcoming childhood hydrophobia at YMCA pool through relentless willpower and instructor training.' },
        { num: 4, title: 'The Rattrap (Flamingo)', code: 'lefl104', p: 20, t: 26, desc: 'Selma Lagerlöf philosophical tale: peddler viewing world as a giant rattrap, transformed by Edla Willmansson’s selfless Christmas compassion.' },
        { num: 5, title: 'Indigo (Flamingo)', code: 'lefl105', p: 18, t: 24, desc: 'Louis Fischer account of Mahatma Gandhi’s historic 1917 Champaran satyagraha liberating oppressed sharecroppers from British landlords.' },
        { num: 6, title: 'Poets and Pancakes (Flamingo)', code: 'lefl106', p: 16, t: 22, desc: 'Asokamitran humorous memoirs of Gemini Studios in Madras: make-up department, pancake cosmetics, boss S.S. Vasan, Subbu, Stephen Spender visit.' },
        { num: 7, title: 'The Interview (Flamingo)', code: 'lefl107', p: 16, t: 22, desc: 'Christopher Silvester treatise on interview as journalistic art form, followed by Mukund Padmanabhan interview of Umberto Eco on "interstices".' },
        { num: 8, title: 'Going Places (Flamingo)', code: 'lefl108', p: 14, t: 20, desc: 'A.R. Barton adolescent psychology narrative: Sophie’s wild escapist romantic daydreams of meeting Irish football star Danny Casey.' },
        { num: 9, title: 'The Third Level (Vistas)', code: 'levi101', p: 14, t: 20, desc: 'Jack Finney psychological sci-fi: Charley discovering 1894 Grand Central station third level as an escapist refuge from modern war neurosis.' },
        { num: 10, title: 'The Tiger King (Vistas)', code: 'levi102', p: 18, t: 25, desc: 'Kalki political satire: Maharaja of Pratibandapuram attempting to defy astrologer’s death prophecy by hunting 100 tigers, killed by wooden toy tiger.' }
      ]
    }
  ],
  commerce: [
    {
      id: 'c12-accounts',
      name: 'Accountancy',
      code: 'ACC-12',
      color: '#0891B2',
      bgLight: '#CFFAFE',
      icon: 'fa-solid fa-file-invoice-dollar',
      gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
      chapters: [
        { num: 1, title: 'Accounting for Partnership: Basic Concepts', code: 'leac101', p: 26, t: 34, desc: 'Partnership deed provisions, Profit and Loss Appropriation Account, interest on capital/drawings, past adjustments, guarantee of profit.' },
        { num: 2, title: 'Reconstitution of a Partnership Firm - Admission of a Partner', code: 'leac102', p: 32, t: 40, desc: 'New profit-sharing ratio, sacrificing ratio, valuation and treatment of goodwill (AS 26), revaluation account, capital adjustments.' },
        { num: 3, title: 'Reconstitution of a Partnership Firm - Retirement/Death of a Partner', code: 'leac103', p: 30, t: 38, desc: 'Gaining ratio, treatment of goodwill, revaluation account, deceased partner\'s share of profit up to date of death, executor\'s loan account.' },
        { num: 4, title: 'Dissolution of a Partnership Firm', code: 'leac104', p: 28, t: 36, desc: 'Modes of dissolution, settlement of accounts (Sec 48), Realisation Account preparation, treatment of partner\'s loan and unrecorded assets/liabilities.' },
        { num: 5, title: 'Accounting for Share Capital', code: 'leac201', p: 32, t: 40, desc: 'Issue of shares at par/premium, pro-rata allotment, calls-in-arrears, calls-in-advance, forfeiture of shares, re-issue of forfeited shares, capital reserve.' },
        { num: 6, title: 'Issue and Redemption of Debentures', code: 'leac202', p: 24, t: 32, desc: 'Meaning, issue of debentures at par/premium/discount with redemption conditions, debentures as collateral security, writing off loss on issue.' },
        { num: 7, title: 'Financial Statements of a Company', code: 'leac203', p: 22, t: 30, desc: 'Format of Balance Sheet and Statement of Profit and Loss as per Schedule III of Companies Act 2013, major heads and sub-heads.' },
        { num: 8, title: 'Analysis of Financial Statements', code: 'leac204', p: 18, t: 24, desc: 'Meaning, significance, tools of financial analysis: Comparative statements, Common size statements, limitations of financial analysis.' },
        { num: 9, title: 'Accounting Ratios', code: 'leac205', p: 28, t: 36, desc: 'Liquidity ratios (Current, Quick), Solvency ratios (Debt-Equity, Total Assets to Debt), Turnover ratios (Inventory, Debtors), Profitability ratios (Gross, Net profit).' },
        { num: 10, title: 'Cash Flow Statement', code: 'leac206', p: 30, t: 40, desc: 'Preparation of Cash Flow Statement as per AS 3 (Revised) using indirect method: Operating, Investing, and Financing activities.' }
      ]
    },
    {
      id: 'c12-bst',
      name: 'Business Studies',
      code: 'BST-12',
      color: '#D97706',
      bgLight: '#FEF3C7',
      icon: 'fa-solid fa-briefcase',
      gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      chapters: [
        { num: 1, title: 'Nature and Significance of Management', code: 'lebs101', p: 22, t: 28, desc: 'Concept, objectives, importance, management as art, science, profession, levels of management, coordination as essence of management.' },
        { num: 2, title: 'Principles of Management', code: 'lebs102', p: 24, t: 30, desc: 'Henri Fayol’s 14 principles of management, F.W. Taylor’s scientific management principles and techniques (time study, motion study, functional foremanship).' },
        { num: 3, title: 'Business Environment', code: 'lebs103', p: 20, t: 26, desc: 'Dimensions of business environment (economic, social, technological, political, legal), Demonetisation, 1991 economic reforms (LPG).' },
        { num: 4, title: 'Planning', code: 'lebs104', p: 20, t: 26, desc: 'Concept, importance, limitations, planning process steps, types of plans (objectives, strategy, policy, procedure, rule, programme, budget).' },
        { num: 5, title: 'Organising', code: 'lebs105', p: 24, t: 30, desc: 'Organising process, organisational structure (functional vs divisional), formal vs informal organisation, delegation vs decentralisation.' },
        { num: 6, title: 'Staffing', code: 'lebs106', p: 26, t: 32, desc: 'Concept, staffing process steps, recruitment (internal vs external sources), selection process steps, training vs development methods.' },
        { num: 7, title: 'Directing', code: 'lebs107', p: 28, t: 35, desc: 'Elements of directing: Supervision, Motivation (Maslow\'s hierarchy, financial/non-financial incentives), Leadership styles, Communication barriers.' },
        { num: 8, title: 'Controlling', code: 'lebs108', p: 18, t: 24, desc: 'Concept, importance, relationship between planning and controlling, controlling process steps, management by exception.' },
        { num: 9, title: 'Financial Management', code: 'lebs201', p: 26, t: 34, desc: 'Role and objectives, financial decisions (investment/capital budgeting, financing/capital structure, dividend decisions), factors affecting working capital.' },
        { num: 10, title: 'Financial Markets', code: 'lebs202', p: 24, t: 30, desc: 'Money market instruments (Treasury bills, commercial paper, call money), Capital market (primary vs secondary), Stock Exchange, SEBI regulatory functions.' },
        { num: 11, title: 'Marketing', code: 'lebs203', p: 30, t: 38, desc: 'Marketing management philosophies, Marketing mix (4 Ps: Product, Price, Place, Promotion), branding, packaging, labelling, advertising vs personal selling.' },
        { num: 12, title: 'Consumer Protection', code: 'lebs204', p: 20, t: 26, desc: 'Consumer Protection Act 2019 provisions, consumer rights and responsibilities, three-tier quasi-judicial redressal machinery (District, State, National commissions).' }
      ]
    },
    {
      id: 'c12-economics',
      name: 'Economics',
      code: 'ECO-12',
      color: '#4F46E5',
      bgLight: '#EEF2FF',
      icon: 'fa-solid fa-chart-line',
      gradient: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
      chapters: [
        { num: 1, title: 'National Income Accounting', code: 'leec101', p: 26, t: 35, desc: 'Circular flow of income, GDP, GNP, NDP, NNP at MP and FC, Value Added, Income, and Expenditure methods, nominal vs real GDP, GDP deflator.' },
        { num: 2, title: 'Money and Banking', code: 'leec102', p: 22, t: 30, desc: 'Money functions, money supply measures (M1 to M4), commercial banking credit creation multiplier, Central Bank (RBI) functions, quantitative/qualitative tools.' },
        { num: 3, title: 'Determination of Income and Employment', code: 'leec103', p: 28, t: 36, desc: 'Aggregate demand, aggregate supply, propensity to consume (APC, MPC), investment multiplier (k = 1/MPS), inflationary and deflationary gaps.' },
        { num: 4, title: 'Government Budget and the Economy', code: 'leec104', p: 22, t: 28, desc: 'Objectives of budget, revenue and capital receipts/expenditure, fiscal deficit, revenue deficit, primary deficit and their economic implications.' },
        { num: 5, title: 'Foreign Exchange Rate', code: 'leec105', p: 18, t: 24, desc: 'Fixed, flexible, and managed floating exchange rates, demand and supply of foreign currency, depreciation vs devaluation, appreciation vs revaluation.' },
        { num: 6, title: 'Balance of Payments', code: 'leec106', p: 18, t: 24, desc: 'BOP meaning and components: Current account vs Capital account, autonomous vs accommodating transactions, BOP deficit/surplus.' },
        { num: 7, title: 'Indian Economy on the Eve of Independence', code: 'leec201', p: 18, t: 24, desc: 'Low level of economic development under colonial rule, agricultural stagnation (Zamindari system), de-industrialisation of handicrafts, demographic profile.' },
        { num: 8, title: 'Indian Economy (1950 - 1990)', code: 'leec202', p: 20, t: 26, desc: 'Goals of Five Year Plans (Growth, Modernisation, Self-reliance, Equity), Land reforms, Green Revolution, Industrial Policy Resolution 1956, import substitution.' },
        { num: 9, title: 'Economic Reforms Since 1991 (LPG)', code: 'leec203', p: 22, t: 28, desc: 'Background of 1991 crisis, Liberalisation (industrial, financial, tax reforms), Privatisation (disinvestment), Globalisation (outsourcing, WTO).' },
        { num: 10, title: 'Human Capital Formation in India', code: 'leec204', p: 18, t: 24, desc: 'Sources of human capital (education, health, on-the-job training, migration, information), role in economic growth, education sector in India.' },
        { num: 11, title: 'Rural Development', code: 'leec205', p: 20, t: 26, desc: 'Rural credit (NABARD, micro-finance SHGs), agricultural marketing system and reforms, diversification into non-farm productive activities, organic farming.' },
        { num: 12, title: 'Employment: Growth, Informalisation and Other Issues', code: 'leec206', p: 20, t: 26, desc: 'Workers and employment, labour force, informalisation of workforce, jobless growth, types of unemployment, government employment generation policies.' },
        { num: 13, title: 'Sustainable Economic Development', code: 'leec207', p: 18, t: 24, desc: 'Meaning of environment, functions, carrying capacity, environmental degradation, global warming, sustainable development strategies in India.' },
        { num: 14, title: 'Comparative Development Experiences of India and its Neighbours', code: 'leec208', p: 18, t: 24, desc: 'Development strategies of India, China, and Pakistan, Great Leap Forward, demographic indicators, GDP growth, sector structural transformation, HDI ranks.' }
      ]
    }
  ],
  arts: [
    {
      id: 'c12-history',
      name: 'History',
      code: 'HIST-12',
      color: '#9333EA',
      bgLight: '#F3E8FF',
      icon: 'fa-solid fa-landmark',
      gradient: 'linear-gradient(135deg, #9333EA 0%, #7E22CE 100%)',
      chapters: [
        { num: 1, title: 'Bricks, Beads and Bones (Harappan Civilisation)', code: 'lehs101', p: 26, t: 32, desc: 'Mature Harappan culture, town planning at Mohenjodaro, Citadel, Great Bath, drainage system, subsistence strategies, craft production, script, seals, decline theories.' },
        { num: 2, title: 'Kings, Farmers and Towns (Early States & Economies)', code: 'lehs102', p: 26, t: 32, desc: 'Sixteen Mahajanapadas, rise of Magadha, Mauryan Empire (Ashoka’s Dhamma, edicts deciphered by James Prinsep), land grants, numismatics.' },
        { num: 3, title: 'Kinship, Caste and Class (Early Societies)', code: 'lehs103', p: 24, t: 30, desc: 'Critical Edition of Mahabharata (V.S. Sukthankar), kinship norms, patriliny, rules of marriage (endogamy/exogamy), varna and jati, beyond varna (untouchables).' },
        { num: 4, title: 'Thinkers, Beliefs and Buildings (Cultural Developments)', code: 'lehs104', p: 28, t: 35, desc: 'Sanchi Stupa preservation by Begums of Bhopal, Vedic traditions, Jainism (Mahavira principles), Buddhism (Four Noble Truths, Eightfold Path, Hinayana vs Mahayana).' },
        { num: 5, title: 'Through the Eyes of Travellers (10th to 17th Century)', code: 'lehs201', p: 22, t: 28, desc: 'Al-Biruni’s Kitab-ul-Hind (caste barriers), Ibn Battuta’s Rihla (coconut, paan, Indian postal systems), Francois Bernier (Mughal private property critique).' },
        { num: 6, title: 'Bhakti-Sufi Traditions', code: 'lehs202', p: 28, t: 35, desc: 'Alvars and Nayanars of Tamil Nadu, Virashaiva movement of Basavanna, Chishti Sufi silsila (Khanqahs, Dargah of Ajmer), Kabir, Guru Nanak, Mirabai.' },
        { num: 7, title: 'An Imperial Capital: Vijayanagara', code: 'lehs203', p: 26, t: 32, desc: 'Discovery of Hampi (Colin Mackenzie), Krishnadeva Raya rule, Mahanavami Dibba, Lotus Mahal, Virupaksha temple, Hazara Rama temple, decline after Talikota 1565.' },
        { num: 8, title: 'Peasants, Zamindars and the State (Mughal Empire)', code: 'lehs204', p: 24, t: 30, desc: 'Agrarian relations in 16th-17th centuries, Ain-i-Akbari (Abu’l Fazl), classification of lands (Polaj, Parauti, Chachar, Banjar), village panchayats, revenue system.' },
        { num: 9, title: 'Colonialism and the Countryside', code: 'lehs301', p: 26, t: 32, desc: 'Permanent Settlement of Bengal 1793, Sunset Law, Fifth Report, Paharias vs Santhals (hoe vs plough) in Rajmahal hills, Deccan Riots Commission 1875.' },
        { num: 10, title: 'Rebels and the Raj (1857 Revolt)', code: 'lehs302', p: 26, t: 32, desc: 'Outbreak of 1857 Revolt, leaders (Bahadur Shah Zafar, Nana Sahib, Rani Lakshmibai, Kunwar Singh), Awadh annexation, rumors of greased cartridges, British suppression.' },
        { num: 11, title: 'Mahatma Gandhi and the Nationalist Movement', code: 'lehs303', p: 28, t: 35, desc: 'Gandhi\'s return from South Africa, Non-Cooperation 1920, Salt March and Civil Disobedience 1930, Round Table Conferences, Quit India 1942, Partition tragedy.' },
        { num: 12, title: 'Framing the Constitution (A New Era Begins)', code: 'lehs304', p: 24, t: 30, desc: 'Constituent Assembly of India, vision of Jawaharlal Nehru (Objectives Resolution), B.R. Ambedkar drafting chairman, debates on language, minority rights, federal powers.' }
      ]
    },
    {
      id: 'c12-polsci',
      name: 'Political Science',
      code: 'POL-12',
      color: '#BE123C',
      bgLight: '#FFE4E6',
      icon: 'fa-solid fa-scale-balanced',
      gradient: 'linear-gradient(135deg, #BE123C 0%, #9F1239 100%)',
      chapters: [
        { num: 1, title: 'The End of Bipolarity', code: 'leps101', p: 24, t: 30, desc: 'Soviet system, Mikhail Gorbachev’s Glasnost and Perestroika, fall of Berlin Wall 1989, disintegration of USSR, shock therapy, consequence for post-communist regimes.' },
        { num: 2, title: 'Contemporary Centres of Power', code: 'leps102', p: 24, t: 30, desc: 'European Union (Maastricht Treaty, euro currency), ASEAN (ASEAN Way, three pillars), Rise of China as economic superpower, India-China relations, BRICS.' },
        { num: 3, title: 'Contemporary South Asia', code: 'leps103', p: 22, t: 28, desc: 'Democracy in Pakistan and Bangladesh, monarchy and democracy in Nepal, ethnic conflict in Sri Lanka (LTTE), India-Pakistan conflicts (Kashmir, Siachen), SAARC.' },
        { num: 4, title: 'International Organisations', code: 'leps104', p: 24, t: 30, desc: 'United Nations restructuring, Security Council permanent seats reform debate, IMF, World Bank, WTO, Amnesty International, Human Rights Watch.' },
        { num: 5, title: 'Security in the Contemporary World', code: 'leps105', p: 20, t: 26, desc: 'Traditional security (external defense, balance of power, deterrence) vs Non-traditional security (human security, terrorism, pandemics, global warming).' },
        { num: 6, title: 'Environment and Natural Resources', code: 'leps106', p: 20, t: 26, desc: 'Global environmental concerns, Rio Earth Summit 1992, Common But Differentiated Responsibilities (CBDR), Kyoto Protocol, indigenous rights.' },
        { num: 7, title: 'Globalisation', code: 'leps107', p: 18, t: 24, desc: 'Concept, political, economic, and cultural dimensions of globalisation, anti-globalisation movements (World Social Forum - WSF), impact on India.' },
        { num: 8, title: 'Challenges of Nation Building', code: 'leps201', p: 24, t: 30, desc: 'Partition trauma and rehabilitation, integration of Princely States (Sardar Vallabhbhai Patel, Hyderabad and Junagadh accession), States Reorganisation Commission 1956.' },
        { num: 9, title: 'Era of One-Party Dominance', code: 'leps202', p: 20, t: 26, desc: 'Congress party dominance in first three general elections, democratic competitive nature, rainbow coalition character, opposition parties in formative years.' },
        { num: 10, title: 'Politics of Planned Development', code: 'leps203', p: 20, t: 26, desc: 'Planning Commission, First Five Year Plan (K.N. Raj agrarian focus) vs Second Plan (P.C. Mahalanobis heavy industry focus), Bombay Plan, Green Revolution.' },
        { num: 11, title: 'India’s External Relations', code: 'leps204', p: 22, t: 28, desc: 'Non-Alignment Policy (NAM, Nehru vision), Panchsheel agreement 1954, Sino-Indian war 1962, Indo-Pak wars of 1965 and 1971, Indian nuclear policy.' },
        { num: 12, title: 'Challenges to and Restoration of the Congress System', code: 'leps205', p: 22, t: 28, desc: 'Political succession after Nehru and Shastri, fourth general elections 1967 (non-Congressism), split in Congress 1969, Indira Gandhi\'s "Garibi Hatao", 1971 victory.' },
        { num: 13, title: 'The Crisis of Democratic Order', code: 'leps206', p: 24, t: 30, desc: 'Declaration of National Emergency (25 June 1975), Jayaprakash Narayan (Total Revolution), Railway Strike 1974, excesses, 1977 elections and Janata Party government.' },
        { num: 14, title: 'Regional Aspirations', code: 'leps207', p: 22, t: 28, desc: 'Jammu and Kashmir autonomy and Article 370 debates, Punjab crisis and Operation Blue Star 1984, Northeast conflicts and accords (Assam, Mizoram), accommodation model.' },
        { num: 15, title: 'Recent Developments in Indian Politics', code: 'leps208', p: 24, t: 30, desc: 'Era of coalition governments (1989-2014), Mandal Commission implementation, economic reforms 1991, demolition of Babri Masjid, rise of BJP, NDA majorities.' }
      ]
    },
    {
      id: 'c12-geography',
      name: 'Geography',
      code: 'GEOG-12',
      color: '#059669',
      bgLight: '#E6F4EA',
      icon: 'fa-solid fa-mountain-sun',
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      chapters: [
        { num: 1, title: 'Human Geography: Nature and Scope', code: 'legy101', p: 12, t: 16, desc: 'Nature of human geography, Environmental Determinism vs Possibilism, Neo-determinism (Stop-and-Go determinism by Griffith Taylor).' },
        { num: 2, title: 'The World Population Distribution, Density and Growth', code: 'legy102', p: 18, t: 24, desc: 'Patterns of population distribution, density calculation, factors influencing distribution, Demographic Transition Theory stages.' },
        { num: 3, title: 'Human Development', code: 'legy103', p: 14, t: 18, desc: 'Concept of human development (Dr. Mahbub-ul-Haq and Amartya Sen), four pillars (equity, sustainability, productivity, empowerment), HDI.' },
        { num: 4, title: 'Primary Activities', code: 'legy104', p: 22, t: 28, desc: 'Hunting and gathering, pastoral nomadism vs commercial livestock rearing, subsistence vs commercial agriculture, plantations, dairy farming, Mediterranean agriculture.' },
        { num: 5, title: 'Secondary Activities', code: 'legy105', p: 20, t: 26, desc: 'Manufacturing industries, classification by size, inputs/raw materials, ownership, footloose industries, high-tech industry technopoles.' },
        { num: 6, title: 'Tertiary and Quaternary Activities', code: 'legy106', p: 18, t: 24, desc: 'Services sector, trading and commerce, transport, communication, tourism, quaternary activities (knowledge-based), quinary activities (decision-makers).' },
        { num: 7, title: 'Transport and Communication', code: 'legy107', p: 24, t: 30, desc: 'Land transport (Trans-continental railways: Trans-Siberian, Canadian Pacific), water transport (Suez Canal, Panama Canal, Rhine waterways), air routes, pipelines.' },
        { num: 8, title: 'International Trade', code: 'legy108', p: 16, t: 22, desc: 'Basis of international trade, balance of trade (favourable vs unfavourable), types of ports (packet stations, entrepot ports, naval ports).' },
        { num: 9, title: 'Population: Distribution, Density, Growth and Composition (India)', code: 'legy201', p: 20, t: 26, desc: 'Census of India distribution, regional variations, four phases of population growth in India, occupational composition of Indian population.' },
        { num: 10, title: 'Human Settlements (India)', code: 'legy202', p: 16, t: 22, desc: 'Rural settlement types (clustered, semi-clustered, hamleted, dispersed), urbanisation in India, functional classification of towns (industrial, administrative, garrison).' },
        { num: 11, title: 'Land Resources and Agriculture (India)', code: 'legy203', p: 24, t: 30, desc: 'Land use categories, common property resources, cropping intensity, major food grains and commercial crops, agricultural challenges in India.' },
        { num: 12, title: 'Water Resources (India)', code: 'legy204', p: 18, t: 24, desc: 'Surface and groundwater resources, sectoral water consumption, water degradation, watershed management (Haryali, Neeru-Meeru, Arvary Pani Sansad).' },
        { num: 13, title: 'Mineral and Energy Resources (India)', code: 'legy205', p: 20, t: 26, desc: 'Metallic minerals (iron ore belts, bauxite, copper), non-metallic minerals, conventional energy (coal, petroleum), non-conventional (nuclear, solar, wind).' },
        { num: 14, title: 'Planning and Sustainable Development in Indian Context', code: 'legy206', p: 16, t: 22, desc: 'Target area planning vs target group planning, Hill Area Development Programme, Drought Prone Area Programme, Indira Gandhi Canal (Nahar) Command Area project.' },
        { num: 15, title: 'Transport and Communication (India)', code: 'legy207', p: 20, t: 26, desc: 'Road transport (NHDP, Golden Quadrilateral, North-South and East-West corridors), Indian Railways 16 zones, national waterways (NW-1, NW-2), oil and gas pipelines.' },
        { num: 16, title: 'International Trade (India)', code: 'legy208', p: 16, t: 22, desc: 'Changing patterns of India\'s foreign trade, export and import composition, sea ports of India as gateways of international trade (Kandla, Mumbai, JNPT, Chennai).' },
        { num: 17, title: 'Geographical Perspective on Selected Issues and Problems (India)', code: 'legy209', p: 16, t: 22, desc: 'Environmental pollution (air, water, noise, land), urban waste disposal, rural-urban migration, problems of slums (Dharavi case study), land degradation.' }
      ]
    }
  ]
};

module.exports = { CLASS_12_DATA };
