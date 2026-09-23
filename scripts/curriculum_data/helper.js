const pad2 = (n) => String(n).padStart(2, '0');

function createChapter(id, number, title, description, bookPrefix, chNumInBook, pages, time, status, progress, highlights, keyConcepts, tip, sampleQ, mistake) {
  const code = `${bookPrefix}${pad2(chNumInBook)}`;
  const ebookUrl = `https://ncert.nic.in/textbook/pdf/${code}.pdf`;

  const proNotesContent = `
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Core Concept & Formula Matrix</h5>
      <div class="pro-formula-card">
        ${(keyConcepts || []).map(c => `
          <div class="pro-formula-row">
            <span class="pro-formula-term">${c.t}:</span>
            <span class="pro-formula-val">${c.d}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-lightbulb"></i> Topper's Exam Strategy & Mnemonics</h5>
      <div class="pro-tip-box">
        <strong>High-Yield NCERT 2026 Revision:</strong>
        <p style="margin-top: 6px; line-height: 1.5;">${tip || 'Review all NCERT examples and in-text exercise solutions carefully before exams.'}</p>
      </div>
    </div>
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-star"></i> High-Frequency Board Questions (NCERT Pattern)</h5>
      <div class="pro-qa-card">
        <div class="pro-qa-q">${sampleQ ? sampleQ.q : `Explain the fundamental importance of ${title} in the NCERT syllabus.`}</div>
        <div class="pro-qa-a"><strong>Ans:</strong> ${sampleQ ? sampleQ.a : `Focus on key definitions, standard derivations, and solved NCERT textbook exemplar problems.`}</div>
      </div>
    </div>
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-triangle-exclamation"></i> Common Mistakes to Avoid</h5>
      <ul class="pro-warning-list">
        <li>${mistake || 'Avoid skipping NCERT summary points and check formula dimensional consistency.'}</li>
      </ul>
    </div>
  `;

  return {
    id,
    number,
    title,
    description,
    status: status || 'not_started',
    progress: progress || 0,
    pages: pages || 18,
    readTime: `${time || 25} mins`,
    ebookUrl,
    proNotesUrl: ebookUrl,
    proNotesContent,
    highlights: highlights || [
      `Key NCERT definitions and principles in ${title}`,
      'Step-by-step textbook derivations and proofs',
      'High-yield board examination practice problems'
    ]
  };
}

module.exports = { createChapter };
