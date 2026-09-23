/**
 * Script to generate complete, authentic 2026 edition NCERT chapters
 * for all classes (Class 9, 10, 11 Sci/Comm/Arts, 12 Sci/Comm/Arts)
 * and all subjects with exact textbook ebook URLs and comprehensive Pro Notes.
 */

const fs = require('fs');

function makeProNotes(title, subjectName, concepts, examTips, sampleQ, commonMistake) {
  return `
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-compass"></i> Core Concept & Formula Matrix</h5>
      <div class="pro-formula-card">
        ${concepts.map(c => `
          <div class="pro-formula-row">
            <span class="pro-formula-term">${c.term}:</span>
            <span class="pro-formula-val">${c.def}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="pro-notes-section">
      <h5 class="pro-section-heading"><i class="fa-solid fa-lightbulb"></i> Topper's Exam Strategy & Mnemonics</h5>
      <div class="pro-tip-box">
        <strong>High-Yield NCERT 2026 Revision Note:</strong>
        <p style="margin-top: 6px; line-height: 1.5;">${examTips}</p>
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
        <li>${commonMistake}</li>
      </ul>
    </div>
  `;
}

console.log('Helper defined');
