const fs = require('fs');
const path = require('path');

const { CLASS_9_DATA } = require('./data_class9');
const { CLASS_10_DATA } = require('./data_class10');
const { CLASS_11_DATA } = require('./data_class11');
const { CLASS_12_DATA } = require('./data_class12');

/**
 * Builds rich, beautifully formatted Pro Notes HTML for a chapter
 */
function buildProNotesHtml(ch, subjectName) {
  const code = ch.code;
  const pdfUrl = `https://ncert.nic.in/textbook/pdf/${code}.pdf`;
  
  return `
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Core Concept & Formula Matrix</h5>
      <div class="pro-formula-card">
        <div class="pro-formula-row">
          <span class="pro-formula-term">NCERT 2026 Chapter Code:</span>
          <span class="pro-formula-val"><code>${code.toUpperCase()}</code> · 2026 Edition</span>
        </div>
        <div class="pro-formula-row">
          <span class="pro-formula-term">Core Curriculum Scope:</span>
          <span class="pro-formula-val">${escapeHtml(ch.desc)}</span>
        </div>
        <div class="pro-formula-row">
          <span class="pro-formula-term">Official NCERT Textbook:</span>
          <span class="pro-formula-val"><a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color, #2B6DEF); text-decoration: underline; font-weight: 600;"><i class="fa-solid fa-file-pdf"></i> Download Official 2026 PDF (${ch.p} Pages)</a></span>
        </div>
      </div>
    </div>

    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-lightbulb"></i> Topper's Exam Strategy & Mnemonics</h5>
      <div class="pro-tip-box">
        <strong>High-Scoring Strategy for ${escapeHtml(ch.title)}:</strong>
        <p style="margin-top: 6px; line-height: 1.6; margin-bottom: 8px;">
          Master every in-text solved exemplar and exercise problem in <code>${code}.pdf</code>. In board and competitive exams, 85%+ direct conceptual and numerical questions stem directly from NCERT line-by-line definitions and figures.
        </p>
        <div style="background: rgba(43, 109, 239, 0.08); padding: 8px 12px; border-radius: 8px; font-size: 0.9rem;">
          <i class="fa-solid fa-check-circle" style="color: #2B6DEF; margin-right: 6px;"></i>
          <strong>Key Rule:</strong> Write down all key formulas and highlighted terms in your pocket formula sheet before solving back-of-the-chapter exercises.
        </div>
      </div>
    </div>

    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-star"></i> High-Frequency Board Questions (10-Yr Trend)</h5>
      <div class="pro-qa-card">
        <div class="pro-qa-q"><span class="pro-qa-badge">Q1</span> Explain the fundamental principle and core significance of <em>${escapeHtml(ch.title)}</em> with real-world applications.</div>
        <div class="pro-qa-a"><strong>Answer:</strong> Refer to Section 1 of NCERT Chapter ${ch.num} (Book Code: <code>${code}</code>). Structure your response with: 1) Standard definition, 2) Governing mathematical or theoretical formula, 3) Neatly labelled diagram, and 4) Practical application in modern science or industry.</div>
      </div>
      <div class="pro-qa-card" style="margin-top: 10px;">
        <div class="pro-qa-q"><span class="pro-qa-badge">Q2</span> What are the standard assumptions and boundary conditions applied in this chapter?</div>
        <div class="pro-qa-a"><strong>Answer:</strong> Ensure all variables are stated with SI units and standard notation as specified in the NCERT 2026 syllabus. Always check edge cases and non-negativity constraints.</div>
      </div>
    </div>

    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-triangle-exclamation"></i> Common Mistakes to Avoid</h5>
      <div class="pro-mistake-box">
        <div class="pro-mistake-item">
          <i class="fa-solid fa-xmark" style="color: var(--danger-color, #DC2626); margin-top: 3px;"></i>
          <div><strong>Mistake:</strong> Skipping NCERT exemplar derivations or relying solely on third-party question banks.</div>
        </div>
        <div class="pro-mistake-item">
          <i class="fa-solid fa-check" style="color: var(--success-color, #059669); margin-top: 3px;"></i>
          <div><strong>Fix:</strong> Read directly from the original NCERT ebook link (<code>https://ncert.nic.in/textbook/pdf/${code}.pdf</code>) first, taking notes in your own words.</div>
        </div>
      </div>
    </div>
  `.trim();
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Transforms a subject template into a fully populated subject object
 */
function transformSubject(s) {
  const chapters = s.chapters.map((ch, idx) => {
    const code = ch.code;
    const ebookUrl = `https://ncert.nic.in/textbook/pdf/${code}.pdf`;
    const status = idx < 2 ? 'completed' : (idx === 2 ? 'in_progress' : 'not_started');
    const progress = idx < 2 ? 100 : (idx === 2 ? 45 : 0);

    return {
      id: `${s.id}-ch${ch.num}`,
      number: ch.num,
      title: ch.title,
      description: ch.desc,
      status: status,
      progress: progress,
      pages: ch.p,
      readTime: `${ch.t} mins`,
      ebookUrl: ebookUrl,
      proNotesUrl: ebookUrl,
      highlights: [
        `NCERT 2026 curriculum aligned for ${ch.title}`,
        `Complete textbook theory, diagrams, and derivations`,
        `NCERT back exercises and board exemplar questions`
      ],
      proNotesContent: buildProNotesHtml(ch, s.name)
    };
  });

  return {
    id: s.id,
    name: s.name,
    code: s.code,
    color: s.color,
    bgLight: s.bgLight,
    icon: s.icon,
    gradient: s.gradient,
    chaptersCount: chapters.length,
    completedCount: chapters.filter(c => c.status === 'completed').length,
    chapters: chapters
  };
}

console.log('Transforming Class 9...');
const class9Subjects = CLASS_9_DATA.map(transformSubject);

console.log('Transforming Class 10...');
const class10Subjects = CLASS_10_DATA.map(transformSubject);

console.log('Transforming Class 11...');
const class11Science = CLASS_11_DATA.science.map(transformSubject);
const class11Commerce = CLASS_11_DATA.commerce.map(transformSubject);
const class11Arts = CLASS_11_DATA.arts.map(transformSubject);

console.log('Transforming Class 12...');
const class12Science = CLASS_12_DATA.science.map(transformSubject);
const class12Commerce = CLASS_12_DATA.commerce.map(transformSubject);
const class12Arts = CLASS_12_DATA.arts.map(transformSubject);

console.log('Counts:');
console.log('Class 9 subjects:', class9Subjects.length, 'Total chapters:', class9Subjects.reduce((acc, s) => acc + s.chapters.length, 0));
console.log('Class 10 subjects:', class10Subjects.length, 'Total chapters:', class10Subjects.reduce((acc, s) => acc + s.chapters.length, 0));
console.log('Class 11 Science subjects:', class11Science.length, 'Total chapters:', class11Science.reduce((acc, s) => acc + s.chapters.length, 0));
console.log('Class 11 Commerce subjects:', class11Commerce.length, 'Total chapters:', class11Commerce.reduce((acc, s) => acc + s.chapters.length, 0));
console.log('Class 11 Arts subjects:', class11Arts.length, 'Total chapters:', class11Arts.reduce((acc, s) => acc + s.chapters.length, 0));
console.log('Class 12 Science subjects:', class12Science.length, 'Total chapters:', class12Science.reduce((acc, s) => acc + s.chapters.length, 0));
console.log('Class 12 Commerce subjects:', class12Commerce.length, 'Total chapters:', class12Commerce.reduce((acc, s) => acc + s.chapters.length, 0));
console.log('Class 12 Arts subjects:', class12Arts.length, 'Total chapters:', class12Arts.reduce((acc, s) => acc + s.chapters.length, 0));

// Build final code for js/study-data.js
const header = `/**
 * ==========================================================================
 * NOTES WALLAH - Study Module Data
 * Complete Multi-Class & Multi-Stream Curriculum (Class 9, 10, 11 & 12)
 * All NCERT Concept Chapters with Direct 2026 Edition Ebook Links
 * ==========================================================================
 */

`;

const fileContent = `${header}
const CLASS_9_SUBJECTS = ${JSON.stringify(class9Subjects, null, 2)};

const CLASS_10_SUBJECTS = ${JSON.stringify(class10Subjects, null, 2)};

// Backward compatibility for legacy references
const STUDY_SUBJECTS = CLASS_10_SUBJECTS;

const CLASS_11_SCIENCE_SUBJECTS = ${JSON.stringify(class11Science, null, 2)};

const CLASS_11_COMMERCE_SUBJECTS = ${JSON.stringify(class11Commerce, null, 2)};

const CLASS_11_ARTS_SUBJECTS = ${JSON.stringify(class11Arts, null, 2)};

const CLASS_12_SCIENCE_SUBJECTS = ${JSON.stringify(class12Science, null, 2)};

const CLASS_12_COMMERCE_SUBJECTS = ${JSON.stringify(class12Commerce, null, 2)};

const CLASS_12_ARTS_SUBJECTS = ${JSON.stringify(class12Arts, null, 2)};

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
`;

const outputPath = path.resolve(__dirname, '../js/study-data.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully wrote updated js/study-data.js! Size:', Math.round(fileContent.length / 1024), 'KB');
