/**
 * NOTES WALLAH — CHALLENGES MODULE CONTROLLER
 * Handles Challenges Home, Rank Strip, Live Challenge Quiz, and Scoring
 */

// Module state
let activeChallenge = null;
let currentChallengeQIndex = 0;
let challengeAnswers = {}; // { [qIdx]: optionIdx }
let challengeTimerInterval = null;
let challengeTimeRemainingSec = 0;
let challengeTimeTotalSec = 0;
let lastChallengeResult = null;

/**
 * Initialize Challenges Module
 */
function initChallengesModule() {
  loadSavedChallengeResult();
  updateRankStrip();
  renderChallengesHome();
  showChallengeSubView('chal-view-home');
}

/**
 * Switch Sub-views inside the Challenges Tab
 * @param {'chal-view-home' | 'chal-view-live' | 'chal-view-result'} viewId
 */
function showChallengeSubView(viewId) {
  const views = document.querySelectorAll('.chal-sub-view');
  views.forEach(v => {
    if (v.id === viewId) {
      v.classList.add('active');
    } else {
      v.classList.remove('active');
    }
  });

  const mainContent = document.querySelector('.main-content-area');
  if (mainContent) {
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Load last saved challenge result from localStorage
 */
function loadSavedChallengeResult() {
  try {
    const saved = localStorage.getItem('noteswallah_last_challenge_result');
    if (saved) {
      lastChallengeResult = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read saved challenge result', e);
  }
}

/**
 * Save challenge result to localStorage
 */
function saveChallengeResult(result) {
  try {
    localStorage.setItem('noteswallah_last_challenge_result', JSON.stringify(result));
    lastChallengeResult = result;
  } catch (e) {
    console.warn('Could not save challenge result', e);
  }
}

/**
 * Update Rank Strip with student profile
 */
function updateRankStrip() {
  const nameEl = document.getElementById('chal-student-name');
  const avatarEl = document.getElementById('chal-student-avatar');

  // Try reading from AppState or localStorage
  let studentName = 'Student';
  if (typeof AppState !== 'undefined' && AppState.profile && AppState.profile.name) {
    studentName = AppState.profile.name;
  } else {
    try {
      const savedProfile = localStorage.getItem('noteswallah_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) studentName = parsed.name;
      }
    } catch (e) {
      // ignore
    }
  }

  if (nameEl) nameEl.textContent = studentName;

  if (avatarEl) {
    const initials = studentName
      .split(' ')
      .filter(Boolean)
      .map(p => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'NW';
    avatarEl.textContent = initials;
  }
}

/**
 * Render Challenges Home view
 */
function renderChallengesHome() {
  // 1) Render Daily Challenge Card
  const dailyContainer = document.getElementById('chal-daily-card-container');
  if (dailyContainer && CHALLENGES_DATA.daily) {
    const daily = CHALLENGES_DATA.daily;
    dailyContainer.innerHTML = `
      <div class="card chal-daily-card" onclick="startDailyChallenge()">
        <div class="daily-card-header">
          <div class="daily-badge-row">
            <span class="chal-badge-pill daily-badge"><i class="fa-solid fa-fire"></i> Daily Sprint</span>
            <span class="chal-badge-tag">${daily.tag}</span>
          </div>
          <div class="daily-timer-hint">
            <i class="fa-regular fa-clock"></i> 5 Mins
          </div>
        </div>

        <div class="daily-card-body">
          <h3 class="daily-title">${daily.title}</h3>
          <p class="daily-desc">5 High-yield questions to sharpen your daily concepts. Takes just 5 minutes!</p>
        </div>

        <div class="daily-card-footer">
          <div class="daily-meta-info">
            <span><i class="fa-regular fa-circle-question"></i> ${daily.questionsCount} Questions</span>
            <span><i class="fa-solid fa-bolt"></i> ${daily.subject}</span>
          </div>
          <button type="button" class="btn btn-primary btn-start-daily" onclick="event.stopPropagation(); startDailyChallenge()">
            <span>Start Daily</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  // 2) Render Weekly Challenge Card
  const weeklyContainer = document.getElementById('chal-weekly-card-container');
  if (weeklyContainer && CHALLENGES_DATA.weekly) {
    const weekly = CHALLENGES_DATA.weekly;
    const pct = Math.round((weekly.done / weekly.total) * 100);
    weeklyContainer.innerHTML = `
      <div class="card chal-weekly-card">
        <div class="weekly-card-top">
          <div class="weekly-icon-box">
            <i class="fa-solid fa-bullseye"></i>
          </div>
          <div class="weekly-info">
            <div class="weekly-badge-row">
              <span class="chal-badge-pill weekly-badge">Weekly Goal</span>
              <span class="weekly-tag">${weekly.tag}</span>
            </div>
            <h4 class="weekly-title">${weekly.title}</h4>
            <span class="weekly-subtitle">${weekly.subtitle}</span>
          </div>
        </div>

        <div class="weekly-progress-wrap">
          <div class="weekly-progress-bar">
            <div class="weekly-progress-fill" style="width: ${pct}%;"></div>
          </div>
          <div class="weekly-progress-meta">
            <span>${weekly.done} of ${weekly.total} Completed</span>
            <span>${pct}% Done</span>
          </div>
        </div>

        <div class="weekly-card-bottom">
          <button type="button" class="btn btn-secondary-outline btn-block btn-weekly-continue" onclick="switchNavTab('test')">
            <i class="fa-solid fa-clipboard-check"></i>
            <span>Continue Chapter Tests</span>
          </button>
        </div>
      </div>
    `;
  }

  // 3) Render More Challenges List
  const listContainer = document.getElementById('chal-more-list');
  if (listContainer && CHALLENGES_DATA.list) {
    listContainer.innerHTML = CHALLENGES_DATA.list.map(chal => {
      return `
        <div class="card chal-item-card" onclick="startChallenge('${chal.id}')">
          <div class="chal-item-left">
            <div class="chal-icon-box" style="background-color: ${chal.color};">
              <i class="${chal.icon}"></i>
            </div>
            <div class="chal-item-details">
              <div class="chal-item-badge-row">
                <span class="chal-mini-badge">${chal.badge}</span>
                <span class="chal-subj-text">${chal.subject}</span>
              </div>
              <h4 class="chal-item-title">${chal.title}</h4>
              <p class="chal-item-desc">${chal.description}</p>
              <div class="chal-item-meta">
                <span><i class="fa-regular fa-circle-question"></i> ${chal.questionsCount} Qs</span>
                <span><i class="fa-regular fa-clock"></i> ${chal.durationMin} Mins</span>
              </div>
            </div>
          </div>
          <div class="chal-item-right">
            <button type="button" class="btn-chal-start" onclick="event.stopPropagation(); startChallenge('${chal.id}')" title="Start Challenge">
              <i class="fa-solid fa-play"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}

/**
 * Start the Daily Challenge
 */
function startDailyChallenge() {
  if (CHALLENGES_DATA.daily) {
    startChallenge(CHALLENGES_DATA.daily.id);
  }
}

/**
 * Start any challenge by ID
 * @param {string} chalId 
 */
function startChallenge(chalId) {
  const chal = getChallengeById(chalId);
  if (!chal) {
    if (typeof showToast === 'function') showToast('Challenge not found', 'error');
    return;
  }

  activeChallenge = chal;
  currentChallengeQIndex = 0;
  challengeAnswers = {};
  challengeTimeTotalSec = chal.durationMin * 60;
  challengeTimeRemainingSec = challengeTimeTotalSec;

  // Header Title
  const titleEl = document.getElementById('live-chal-title');
  if (titleEl) titleEl.textContent = chal.title;

  // Start countdown timer
  startChallengeTimer();

  // Show live quiz view
  showChallengeSubView('chal-view-live');

  // Render first question
  renderLiveChallengeQuestion();
}

/**
 * Start Countdown Timer
 */
function startChallengeTimer() {
  clearInterval(challengeTimerInterval);
  updateChallengeTimerDisplay();

  challengeTimerInterval = setInterval(() => {
    challengeTimeRemainingSec--;

    if (challengeTimeRemainingSec <= 0) {
      clearInterval(challengeTimerInterval);
      challengeTimeRemainingSec = 0;
      updateChallengeTimerDisplay();
      if (typeof showToast === 'function') {
        showToast('Time is up! Auto-submitting challenge...', 'info');
      }
      setTimeout(() => {
        executeSubmitChallenge();
      }, 700);
      return;
    }

    updateChallengeTimerDisplay();
  }, 1000);
}

/**
 * Update challenge timer badge
 */
function updateChallengeTimerDisplay() {
  const textEl = document.getElementById('live-chal-timer-text');
  const badgeEl = document.getElementById('live-chal-timer-badge');
  if (!textEl) return;

  const m = Math.floor(challengeTimeRemainingSec / 60);
  const s = challengeTimeRemainingSec % 60;
  textEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  if (badgeEl) {
    if (challengeTimeRemainingSec <= 60) {
      badgeEl.classList.add('timer-urgent');
    } else {
      badgeEl.classList.remove('timer-urgent');
    }
  }
}

/**
 * Render current live question
 */
function renderLiveChallengeQuestion() {
  if (!activeChallenge) return;

  const total = activeChallenge.questions.length;
  const q = activeChallenge.questions[currentChallengeQIndex];
  if (!q) return;

  // Counter
  const counterEl = document.getElementById('live-chal-q-counter');
  if (counterEl) {
    counterEl.textContent = `Q ${currentChallengeQIndex + 1} of ${total}`;
  }

  // Question Badge & Text
  const badgeEl = document.getElementById('live-chal-q-badge');
  if (badgeEl) badgeEl.textContent = `${currentChallengeQIndex + 1}`;

  const textEl = document.getElementById('live-chal-q-text');
  if (textEl) textEl.textContent = q.text;

  // Options
  const container = document.getElementById('live-chal-options-container');
  if (container) {
    const letters = ['A', 'B', 'C', 'D'];
    const chosenIdx = challengeAnswers[currentChallengeQIndex];

    container.innerHTML = q.options.map((opt, idx) => {
      const isSelected = chosenIdx === idx;
      return `
        <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectChallengeOption(${idx})">
          <div class="option-letter">${letters[idx]}</div>
          <div class="option-text">${opt}</div>
          <div class="option-indicator">
            <i class="fa-solid fa-circle-check option-check-icon"></i>
          </div>
        </div>
      `;
    }).join('');
  }

  // Question Strip
  renderChallengeStrip();

  // Navigation Buttons
  const prevBtn = document.getElementById('chal-prev-btn');
  const nextBtn = document.getElementById('chal-next-btn');
  const submitBtn = document.getElementById('chal-submit-btn');

  if (prevBtn) prevBtn.disabled = currentChallengeQIndex === 0;

  if (currentChallengeQIndex === total - 1) {
    if (nextBtn) nextBtn.classList.add('hidden');
    if (submitBtn) submitBtn.classList.remove('hidden');
  } else {
    if (nextBtn) nextBtn.classList.remove('hidden');
    if (submitBtn) submitBtn.classList.add('hidden');
  }
}

/**
 * Render Jump Strip
 */
function renderChallengeStrip() {
  const strip = document.getElementById('live-chal-q-strip');
  if (!strip || !activeChallenge) return;

  const total = activeChallenge.questions.length;
  let html = '';

  for (let i = 0; i < total; i++) {
    const isCurrent = i === currentChallengeQIndex;
    const isAnswered = challengeAnswers[i] !== undefined;
    let statusClass = 'unanswered';
    if (isAnswered) statusClass = 'answered';
    if (isCurrent) statusClass += ' active';

    html += `
      <button type="button" class="q-strip-dot ${statusClass}" onclick="jumpToChallengeQuestion(${i})">
        ${i + 1}
      </button>
    `;
  }

  strip.innerHTML = html;
}

/**
 * Select an option
 */
function selectChallengeOption(optionIdx) {
  challengeAnswers[currentChallengeQIndex] = optionIdx;

  const cards = document.querySelectorAll('#live-chal-options-container .option-card');
  cards.forEach((card, idx) => {
    if (idx === optionIdx) card.classList.add('selected');
    else card.classList.remove('selected');
  });

  renderChallengeStrip();
}

/**
 * Jump directly to question
 */
function jumpToChallengeQuestion(idx) {
  if (idx >= 0 && idx < activeChallenge.questions.length) {
    currentChallengeQIndex = idx;
    renderLiveChallengeQuestion();
  }
}

/**
 * Previous Question
 */
function prevChallengeQuestion() {
  if (currentChallengeQIndex > 0) {
    currentChallengeQIndex--;
    renderLiveChallengeQuestion();
  }
}

/**
 * Next Question
 */
function nextChallengeQuestion() {
  if (activeChallenge && currentChallengeQIndex < activeChallenge.questions.length - 1) {
    currentChallengeQIndex++;
    renderLiveChallengeQuestion();
  }
}

/**
 * Prompt Submit
 */
function handleChallengeSubmitClick() {
  if (!activeChallenge) return;

  const total = activeChallenge.questions.length;
  const answeredCount = Object.keys(challengeAnswers).length;
  const unansweredCount = total - answeredCount;

  if (unansweredCount > 0) {
    const modal = document.getElementById('chal-submit-modal');
    const textEl = document.getElementById('chal-submit-warning-text');
    if (textEl) {
      textEl.innerHTML = `You have <strong style="color: #EA580C;">${unansweredCount} unanswered</strong> ${unansweredCount === 1 ? 'question' : 'questions'} out of <strong>${total}</strong>. Unanswered questions will be scored as skipped.`;
    }
    if (modal) modal.classList.remove('hidden');
  } else {
    executeSubmitChallenge();
  }
}

/**
 * Close submit modal
 */
function closeChallengeSubmitModal() {
  const modal = document.getElementById('chal-submit-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Execute actual submission
 */
function executeSubmitChallenge() {
  closeChallengeSubmitModal();
  clearInterval(challengeTimerInterval);

  if (!activeChallenge) return;

  const total = activeChallenge.questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const detailedQuestions = activeChallenge.questions.map((q, idx) => {
    const selected = challengeAnswers[idx];
    const isSkipped = selected === undefined;
    const isCorrect = !isSkipped && selected === q.correctIndex;

    if (isCorrect) correctCount++;
    else if (isSkipped) skippedCount++;
    else wrongCount++;

    return {
      id: q.id,
      text: q.text,
      options: q.options,
      correctIndex: q.correctIndex,
      selectedIndex: selected,
      isCorrect,
      isSkipped,
      explanation: q.explanation || ''
    };
  });

  const percentage = Math.round((correctCount / total) * 100);
  const timeSpentSec = challengeTimeTotalSec - challengeTimeRemainingSec;
  const timeSpentMins = Math.floor(timeSpentSec / 60);
  const timeSpentRemSec = timeSpentSec % 60;
  const timeSpentFormatted = `${timeSpentMins}m ${timeSpentRemSec}s`;

  const result = {
    challengeId: activeChallenge.id,
    title: activeChallenge.title,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    total,
    correct: correctCount,
    wrong: wrongCount,
    skipped: skippedCount,
    percentage,
    timeSpent: timeSpentFormatted,
    questions: detailedQuestions
  };

  saveChallengeResult(result);
  renderChallengeResultView(result);
  showChallengeSubView('chal-view-result');

  if (typeof showToast === 'function') {
    showToast('Challenge completed! Well done.', 'success');
  }
}

/**
 * Render Result View
 */
function renderChallengeResultView(result) {
  const titleEl = document.getElementById('chal-result-title');
  if (titleEl) titleEl.textContent = result.title;

  const scoreEl = document.getElementById('chal-result-score-val');
  if (scoreEl) scoreEl.textContent = `${result.correct} / ${result.total}`;

  const pctEl = document.getElementById('chal-result-pct-badge');
  if (pctEl) pctEl.textContent = `${result.percentage}% Accuracy`;

  const msgEl = document.getElementById('chal-result-message');
  if (msgEl) {
    if (result.percentage >= 80) {
      msgEl.textContent = 'Awesome sprint! You nailed this daily practice challenge.';
    } else if (result.percentage >= 50) {
      msgEl.textContent = 'Great effort! Consistent daily practice will take you to the top rank.';
    } else {
      msgEl.textContent = 'Good start! Review the explanations below and try another sprint.';
    }
  }

  // Metrics
  const correctMetric = document.getElementById('chal-metric-correct');
  if (correctMetric) correctMetric.textContent = `${result.correct}`;

  const wrongMetric = document.getElementById('chal-metric-wrong');
  if (wrongMetric) wrongMetric.textContent = `${result.wrong}`;

  const skippedMetric = document.getElementById('chal-metric-skipped');
  if (skippedMetric) skippedMetric.textContent = `${result.skipped}`;

  const timeMetric = document.getElementById('chal-metric-time');
  if (timeMetric) timeMetric.textContent = result.timeSpent;

  // Review list
  const reviewContainer = document.getElementById('chal-review-list');
  if (reviewContainer && result.questions) {
    const letters = ['A', 'B', 'C', 'D'];
    reviewContainer.innerHTML = result.questions.map((q, idx) => {
      let icon = '<i class="fa-solid fa-circle-check text-success"></i>';
      let tag = '<span class="review-tag tag-correct">Correct</span>';

      if (q.isSkipped) {
        icon = '<i class="fa-regular fa-circle-pause text-muted"></i>';
        tag = '<span class="review-tag tag-skipped">Skipped</span>';
      } else if (!q.isCorrect) {
        icon = '<i class="fa-solid fa-circle-xmark text-danger"></i>';
        tag = '<span class="review-tag tag-wrong">Incorrect</span>';
      }

      return `
        <div class="card review-item-card">
          <div class="review-item-header">
            <div class="review-q-num">
              ${icon}
              <span>Question ${idx + 1}</span>
            </div>
            ${tag}
          </div>

          <p class="review-q-text">${q.text}</p>

          <div class="review-options-list">
            ${q.options.map((opt, optIdx) => {
              const isCorrectOpt = optIdx === q.correctIndex;
              const isUserChoice = optIdx === q.selectedIndex;
              let optClass = '';

              if (isCorrectOpt) optClass = 'correct-opt';
              else if (isUserChoice && !q.isCorrect) optClass = 'wrong-opt';

              return `
                <div class="review-opt-row ${optClass}">
                  <span class="review-opt-letter">${letters[optIdx]}</span>
                  <span class="review-opt-text">${opt}</span>
                  ${isCorrectOpt ? '<span class="review-opt-badge"><i class="fa-solid fa-check"></i> Correct</span>' : ''}
                  ${isUserChoice && !q.isCorrect ? '<span class="review-opt-badge wrong"><i class="fa-solid fa-xmark"></i> Your answer</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>

          ${q.explanation ? `
            <div class="review-explanation-box">
              <div class="explanation-title"><i class="fa-regular fa-lightbulb"></i> Concept Explanation</div>
              <p class="explanation-text">${q.explanation}</p>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }
}

/**
 * Retake current challenge
 */
function retakeCurrentChallenge() {
  if (activeChallenge) {
    startChallenge(activeChallenge.id);
  } else {
    returnToChallengesHome();
  }
}

/**
 * Return to Challenges Home
 */
function returnToChallengesHome() {
  clearInterval(challengeTimerInterval);
  activeChallenge = null;
  renderChallengesHome();
  showChallengeSubView('chal-view-home');
}

/**
 * Quit challenge prompt
 */
function handleQuitLiveChallenge() {
  const modal = document.getElementById('chal-quit-modal');
  if (modal) modal.classList.remove('hidden');
}

/**
 * Close quit modal
 */
function closeChallengeQuitModal() {
  const modal = document.getElementById('chal-quit-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Confirm quit challenge
 */
function confirmQuitChallenge() {
  closeChallengeQuitModal();
  clearInterval(challengeTimerInterval);
  activeChallenge = null;
  returnToChallengesHome();
  if (typeof showToast === 'function') {
    showToast('Challenge exited', 'info');
  }
}
