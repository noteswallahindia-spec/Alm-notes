const fs = require('fs');

// Helper to format 2 digits
const pad2 = (n) => String(n).padStart(2, '0');

function ch(id, number, title, description, bookPrefix, chNumInBook, pages, time, status, progress, highlights, keyConcepts, tip, sampleQ, mistake) {
  const code = `${bookPrefix}${pad2(chNumInBook)}`;
  const ebookUrl = `https://ncert.nic.in/textbook/pdf/${code}.pdf`;
  
  const proNotesContent = `
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Core Concept & Formula Matrix</h5>
      <div class="pro-formula-card">
        ${keyConcepts.map(c => `
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
        <p style="margin-top: 6px; line-height: 1.5;">${tip}</p>
      </div>
    </div>
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-star"></i> High-Frequency Board Questions (NCERT Pattern)</h5>
      <div class="pro-qa-card">
        <div class="pro-qa-q">${sampleQ.q}</div>
        <div class="pro-qa-a"><strong>Ans:</strong> ${sampleQ.a}</div>
      </div>
    </div>
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-triangle-exclamation"></i> Common Mistakes to Avoid</h5>
      <ul class="pro-warning-list">
        <li>${mistake}</li>
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
    pages,
    readTime: `${time} mins`,
    ebookUrl,
    proNotesUrl: ebookUrl,
    proNotesContent,
    highlights
  };
}

console.log('Builder module ready');
