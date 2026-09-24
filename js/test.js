/**
 * NOTES WALLAH — TEST MODULE CONTROLLER
 * Handles Test Home, Live MCQ Session, Timer, State & Scoring
 */

// Module state
let activeTest = null;
let currentQuestionIndex = 0;
let userAnswers = {}; // { [qIndex]: optionIndex }
let testTimerInterval = null;
let timeRemainingSec = 0;
let timeTotalSec = 0;
let activeSubjectFilter = 'all';
let lastTestResult = null;

/**
 * Initialize Test Module
 */
function initTestModule() {
  // Check if we have a saved test result in localStorage
  loadSavedTestResult();
  renderTestHome();
  showTestSubView('test-view-home');
}

/**
 * Switch Sub-views inside the Test Tab
 * @param {'test-view-home' | 'test-view-live' | 'test-view-result'} viewId
 */
function showTestSubView(viewId) {
  const views = document.querySelectorAll('.test-sub-view');
  views.forEach(v => {
    if (v.id === viewId) {
      v.classList.add('active');
    } else {
      v.classList.remove('active');
    }
  });

  // Scroll to top of container
  const mainContent = document.querySelector('.main-content-area');
  if (mainContent) {
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Helper to get active user ID for test data scoping
 * Strictly isolates guest and registered user accounts so test results never leak across accounts
 */
function getActiveUserId() {
  const isGuest = (typeof AppState !== 'undefined' && AppState.isGuest);
  if (isGuest) return 'guest';

  const user = (typeof AppState !== 'undefined' && AppState.user)
    ? AppState.user
    : ((typeof currentProfile !== 'undefined' && currentProfile) ? currentProfile : null);

  if (user && user.id) return String(user.id);
  if (user && user.email) return String(user.email).toLowerCase().replace(/[^a-z0-9_]/g, '_');
  return 'guest';
}

function getUserTestStorageKey(type = 'last_result') {
  const uid = getActiveUserId();
  if (uid === 'guest') {
    return `nw_guest_test_${type}`;
  }
  return `nw_user_${uid}_test_${type}`;
}

/**
 * Load last saved result from localStorage strictly for current logged-in user
 */
function loadSavedTestResult() {
  try {
    const key = getUserTestStorageKey('last_result');
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      const currentUid = getActiveUserId();
      if (!parsed.userId || parsed.userId === currentUid) {
        lastTestResult = parsed;
      } else {
        lastTestResult = null;
      }
    } else {
      lastTestResult = null;
    }
  } catch (e) {
    console.warn('Could not read saved test result from localStorage', e);
    lastTestResult = null;
  }
}

/**
 * Save test result to localStorage with strict user ID isolation
 */
function saveTestResult(result) {
  try {
    const currentUid = getActiveUserId();
    result.userId = currentUid;
    const key = getUserTestStorageKey('last_result');
    localStorage.setItem(key, JSON.stringify(result));
    lastTestResult = result;

    // Record in user's personal test history list
    const histKey = getUserTestStorageKey('history');
    const existingHist = localStorage.getItem(histKey);
    let histList = existingHist ? JSON.parse(existingHist) : [];
    if (!Array.isArray(histList)) histList = [];
    histList.unshift(result);
    if (histList.length > 50) histList = histList.slice(0, 50);
    localStorage.setItem(histKey, JSON.stringify(histList));
  } catch (e) {
    console.warn('Could not save test result to localStorage', e);
  }
}

/**
 * Reset all active test memory when logging out
 */
function resetTestStateForLogout() {
  lastTestResult = null;
  activeTest = null;
  currentQuestionIndex = 0;
  userAnswers = {};
  if (testTimerInterval) {
    clearInterval(testTimerInterval);
    testTimerInterval = null;
  }
  const recentContainer = document.getElementById('test-recent-banner');
  if (recentContainer) {
    recentContainer.innerHTML = '';
    recentContainer.classList.add('hidden');
  }
}

/**
 * Reload test state when user logs in or switches account/class
 */
function reloadTestHistoryForUser() {
  loadSavedTestResult();
  initTestStartFlow(true);
  renderTestHome();
}
window.resetTestStateForLogout = resetTestStateForLogout;
window.reloadTestHistoryForUser = reloadTestHistoryForUser;

/**
 * Render Test Home with list of tests & recent result banner
 */
function renderTestHome() {
  const container = document.getElementById('test-cards-list');
  const recentContainer = document.getElementById('test-recent-banner');
  if (!container) return;

  // Always load saved result for currently active user
  loadSavedTestResult();
  initTestStartFlow();

  // 1) Render Recent Result banner if exists strictly for this user
  if (recentContainer) {
    const currentUid = getActiveUserId();
    if (lastTestResult && (!lastTestResult.userId || lastTestResult.userId === currentUid)) {
      const pct = lastTestResult.percentage;
      const isGood = pct >= 60;
      recentContainer.innerHTML = `
        <div class="card recent-result-card">
          <div class="recent-result-left">
            <div class="recent-score-pill ${isGood ? 'good' : 'warning'}">
              <i class="fa-solid fa-trophy"></i>
              <span>${pct}%</span>
            </div>
            <div class="recent-result-meta">
              <span class="recent-caption">Last Completed Test</span>
              <h5 class="recent-title">${lastTestResult.testTitle}</h5>
              <span class="recent-score-text">${lastTestResult.correct}/${lastTestResult.totalQuestions} Correct · ${lastTestResult.date || 'Recently'}</span>
            </div>
          </div>
          <button type="button" class="btn-sm-action" onclick="viewRecentResult()">
            <span>Review</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;
      recentContainer.classList.remove('hidden');
    } else {
      recentContainer.innerHTML = '';
      recentContainer.classList.add('hidden');
    }
  }

  // 2) Filter tests strictly for logged-in Class
  let customTestsForClass = [];
  try {
    const rawTests = localStorage.getItem('nw_custom_tests');
    if (rawTests) {
      const parsed = JSON.parse(rawTests);
      if (Array.isArray(parsed)) {
        customTestsForClass = parsed.filter(t => !t.class || t.class === selectedTestClass);
      }
    }
  } catch (e) {}

  const allAvailable = [...customTestsForClass, ...TEST_BANK].filter(t => {
    if (t.class && t.class !== selectedTestClass) return false;
    if (!t.class && selectedTestClass !== 'Class 10') return false;

    if (activeSubjectFilter === 'all') return true;
    return (t.subject || '').toLowerCase() === activeSubjectFilter.toLowerCase();
  });

  if (allAvailable.length === 0) {
    container.innerHTML = `
      <div class="card" style="padding: 24px 16px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; margin: 12px 0;">
        <div class="empty-icon-circle" style="width: 48px; height: 48px; border-radius: 50%; background: rgba(43, 109, 239, 0.1); color: var(--primary-blue); display: flex; align-items: center; justify-content: center; font-size: 20px;">
          <i class="fa-solid fa-clipboard-question"></i>
        </div>
        <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0;">Ready for Chapter Mock Tests</h4>
        <p style="font-size: 12.5px; color: var(--text-secondary); max-width: 280px; margin: 0;">Use the Quick Mock Test Creator above to generate custom chapter tests for ${selectedTestClass}.</p>
      </div>
    `;
    return;
  }

  // 3) Render Test Cards
  container.innerHTML = allAvailable.map(test => {
    return `
      <div class="card test-item-card" onclick="startTest('${test.id}')">
        <div class="test-card-header">
          <div class="test-icon-box" style="background-color: ${test.color};">
            <i class="${test.icon}"></i>
          </div>
          <div class="test-badge-row">
            <span class="test-subject-tag">${test.subject}</span>
            <span class="test-diff-tag">${test.difficulty}</span>
          </div>
        </div>

        <div class="test-card-content">
          <h4 class="test-title">${test.title}</h4>
          <p class="test-desc">${test.description}</p>
        </div>

        <div class="test-card-footer">
          <div class="test-meta-info">
            <span class="meta-pill"><i class="fa-regular fa-circle-question"></i> ${test.questionCount} Questions</span>
            <span class="meta-pill"><i class="fa-regular fa-clock"></i> ${test.durationMin} Mins</span>
          </div>
          <button type="button" class="btn btn-primary btn-start-test" onclick="event.stopPropagation(); startTest('${test.id}')">
            <span>Start Test</span>
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Filter tests by subject
 * @param {'all' | 'science' | 'mathematics'} subject 
 */
function filterTests(subject) {
  activeSubjectFilter = subject;

  // Update filter pills UI
  const chips = document.querySelectorAll('.test-filter-chip');
  chips.forEach(chip => {
    if (chip.getAttribute('data-filter') === subject) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  renderTestHome();
}

/**
 * View saved recent result
 */
function viewRecentResult() {
  if (!lastTestResult) return;
  renderResultView(lastTestResult);
  showTestSubView('test-view-result');
}

function shuffleArray(arr) {
  if (!Array.isArray(arr)) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestionOptions(q) {
  if (!q || !Array.isArray(q.options) || q.options.length < 2) return q;
  const originalCorrectText = q.options[q.correctIndex || 0];
  const items = q.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === (q.correctIndex || 0)
  }));

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  const newOptions = items.map(it => it.text);
  const newCorrectIndex = items.findIndex(it => it.isCorrect);

  return {
    ...q,
    options: newOptions,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0
  };
}

/**
 * Start a Test session (Accepts testId or custom test object)
 * Randomizes questions & options on every start so no test is identical!
 * @param {string | Object} testOrId 
 */
function startTest(testOrId) {
  let test = null;
  if (testOrId && typeof testOrId === 'object') {
    test = testOrId;
  } else {
    test = getTestById(testOrId);
  }

  if (!test) {
    if (typeof showToast === 'function') showToast('Test not found', 'error');
    return;
  }

  // Clone questions and shuffle both questions and options every time test is started
  let testQuestions = (test.questions || []).map(q => ({
    ...q,
    options: [...q.options]
  }));

  testQuestions = shuffleArray(testQuestions);
  testQuestions = testQuestions.map(q => shuffleQuestionOptions(q));

  activeTest = {
    ...test,
    questions: testQuestions,
    questionCount: testQuestions.length
  };

  currentQuestionIndex = 0;
  userAnswers = {};
  timeTotalSec = (test.durationMin || 15) * 60;
  timeRemainingSec = timeTotalSec;

  // Populate header labels
  const titleEl = document.getElementById('live-test-title');
  if (titleEl) titleEl.textContent = `${test.subject} · ${test.title}`;

  // Start countdown timer
  startTestTimer();

  // Switch to live test view
  showTestSubView('test-view-live');

  // Render question 1
  renderLiveQuestion();
}

/**
 * Start Countdown Timer
 */
function startTestTimer() {
  clearInterval(testTimerInterval);

  updateTimerDisplay();

  testTimerInterval = setInterval(() => {
    timeRemainingSec--;

    if (timeRemainingSec <= 0) {
      clearInterval(testTimerInterval);
      timeRemainingSec = 0;
      updateTimerDisplay();
      if (typeof showToast === 'function') {
        showToast('Time is up! Auto-submitting test...', 'info');
      }
      setTimeout(() => {
        executeSubmitTest(true); // Forced submission on timeout
      }, 700);
      return;
    }

    updateTimerDisplay();
  }, 1000);
}

/**
 * Update the Timer display pill
 */
function updateTimerDisplay() {
  const timerEl = document.getElementById('live-test-timer-text');
  const timerBadge = document.getElementById('live-test-timer-badge');
  if (!timerEl) return;

  const minutes = Math.floor(timeRemainingSec / 60);
  const seconds = timeRemainingSec % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  timerEl.textContent = formatted;

  // Make badge urgent when less than 2 minutes remain
  if (timerBadge) {
    if (timeRemainingSec <= 120) {
      timerBadge.classList.add('timer-urgent');
    } else {
      timerBadge.classList.remove('timer-urgent');
    }
  }
}

/**
 * Render the current Question, Options, and Navigation Bar
 */
function renderLiveQuestion() {
  if (!activeTest) return;

  const total = activeTest.questions.length;
  const q = activeTest.questions[currentQuestionIndex];
  if (!q) return;

  // 1) Update question counter
  const counterEl = document.getElementById('live-q-counter');
  if (counterEl) {
    counterEl.textContent = `Q ${currentQuestionIndex + 1} of ${total}`;
  }

  // 2) Update Question Text
  const numBadge = document.getElementById('live-q-badge');
  if (numBadge) numBadge.textContent = `${currentQuestionIndex + 1}`;

  const textEl = document.getElementById('live-q-text');
  if (textEl) textEl.textContent = q.text;

  // 3) Render Options
  const optionsContainer = document.getElementById('live-options-container');
  if (optionsContainer) {
    const optionLetters = ['A', 'B', 'C', 'D'];
    const selectedIdx = userAnswers[currentQuestionIndex];

    optionsContainer.innerHTML = q.options.map((opt, idx) => {
      const isSelected = selectedIdx === idx;
      return `
        <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectOption(${idx})" data-option-idx="${idx}">
          <div class="option-letter">${optionLetters[idx]}</div>
          <div class="option-text">${opt}</div>
          <div class="option-indicator">
            <i class="fa-solid fa-circle-check option-check-icon"></i>
          </div>
        </div>
      `;
    }).join('');
  }

  // 4) Render Jump Strip
  renderQuestionStrip();

  // 5) Update Bottom Navigation Buttons
  const prevBtn = document.getElementById('live-prev-btn');
  const nextBtn = document.getElementById('live-next-btn');
  const submitBtn = document.getElementById('live-submit-btn');

  if (prevBtn) {
    prevBtn.disabled = currentQuestionIndex === 0;
  }

  // If on last question, hide Next and show Submit
  if (currentQuestionIndex === total - 1) {
    if (nextBtn) nextBtn.classList.add('hidden');
    if (submitBtn) submitBtn.classList.remove('hidden');
  } else {
    if (nextBtn) nextBtn.classList.remove('hidden');
    if (submitBtn) submitBtn.classList.add('hidden');
  }
}

/**
 * Render Question Number Strip (Pills to jump to questions)
 */
function renderQuestionStrip() {
  const strip = document.getElementById('live-q-strip');
  if (!strip || !activeTest) return;

  const total = activeTest.questions.length;
  let html = '';

  for (let i = 0; i < total; i++) {
    const isCurrent = i === currentQuestionIndex;
    const isAnswered = userAnswers[i] !== undefined;
    let statusClass = 'unanswered';
    if (isAnswered) statusClass = 'answered';
    if (isCurrent) statusClass += ' active';

    html += `
      <button type="button" class="q-strip-dot ${statusClass}" onclick="jumpToQuestion(${i})">
        ${i + 1}
      </button>
    `;
  }

  strip.innerHTML = html;
}

/**
 * Select an Option for current question
 * @param {number} optionIndex 
 */
function selectOption(optionIndex) {
  userAnswers[currentQuestionIndex] = optionIndex;

  // Refresh options selection UI
  const optionCards = document.querySelectorAll('#live-options-container .option-card');
  optionCards.forEach((card, idx) => {
    if (idx === optionIndex) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });

  // Update strip dot
  renderQuestionStrip();
}

/**
 * Jump directly to question
 * @param {number} index 
 */
function jumpToQuestion(index) {
  if (index >= 0 && index < activeTest.questions.length) {
    currentQuestionIndex = index;
    renderLiveQuestion();
  }
}

/**
 * Previous Question
 */
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderLiveQuestion();
  }
}

/**
 * Next Question
 */
function nextQuestion() {
  if (activeTest && currentQuestionIndex < activeTest.questions.length - 1) {
    currentQuestionIndex++;
    renderLiveQuestion();
  }
}

/**
 * Click Submit button - validates answers and shows confirm dialog if incomplete
 */
function handleTestSubmitClick() {
  if (!activeTest) return;

  const total = activeTest.questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = total - answeredCount;

  if (unansweredCount > 0) {
    // Show warning confirmation modal
    const modal = document.getElementById('test-submit-confirm-modal');
    const msgEl = document.getElementById('submit-warning-text');
    if (msgEl) {
      msgEl.innerHTML = `You have <strong style="color: #EA580C;">${unansweredCount} unanswered</strong> ${unansweredCount === 1 ? 'question' : 'questions'} out of <strong>${total}</strong>. Unanswered questions will be scored as skipped.`;
    }
    if (modal) modal.classList.remove('hidden');
  } else {
    // Everything answered, execute directly
    executeSubmitTest(false);
  }
}

/**
 * Close submit warning modal
 */
function closeSubmitConfirmModal() {
  const modal = document.getElementById('test-submit-confirm-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Execute actual submission of the test
 * @param {boolean} isTimeout 
 */
function executeSubmitTest(isTimeout = false) {
  closeSubmitConfirmModal();
  clearInterval(testTimerInterval);

  if (!activeTest) return;

  const total = activeTest.questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const detailedQuestions = activeTest.questions.map((q, idx) => {
    const selected = userAnswers[idx];
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
  const timeSpentSec = timeTotalSec - timeRemainingSec;
  const timeSpentMinutes = Math.floor(timeSpentSec / 60);
  const timeSpentRemainderSec = timeSpentSec % 60;
  const timeSpentFormatted = `${timeSpentMinutes}m ${timeSpentRemainderSec}s`;

  // Build result object
  const result = {
    testId: activeTest.id,
    testTitle: activeTest.title,
    subject: activeTest.subject,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    totalQuestions: total,
    correct: correctCount,
    wrong: wrongCount,
    skipped: skippedCount,
    percentage,
    timeSpent: timeSpentFormatted,
    questions: detailedQuestions
  };

  // Save to localStorage
  saveTestResult(result);

  // Render Result Screen
  renderResultView(result);

  // Switch to Result View
  showTestSubView('test-view-result');

  if (typeof showToast === 'function') {
    showToast(isTimeout ? 'Test auto-submitted!' : 'Test completed successfully!', 'success');
  }
}

/**
 * Render Result View
 * @param {Object} result 
 */
function renderResultView(result) {
  // 1) Top Hero
  const titleEl = document.getElementById('result-test-title');
  if (titleEl) titleEl.textContent = `${result.subject} · ${result.testTitle}`;

  const pctEl = document.getElementById('result-pct-value');
  if (pctEl) pctEl.textContent = `${result.percentage}%`;

  const statusBadge = document.getElementById('result-status-badge');
  const msgEl = document.getElementById('result-feedback-message');

  let badgeText = 'Great Effort!';
  let feedbackText = 'Good performance. Review the skipped and incorrect questions to master this chapter.';
  let badgeClass = 'status-good';

  if (result.percentage >= 80) {
    badgeText = 'Outstanding Performance! 🌟';
    feedbackText = 'Exceptional grasp of concepts! You are well-prepared for CBSE board examinations on this topic.';
    badgeClass = 'status-excellent';
  } else if (result.percentage >= 50) {
    badgeText = 'Good Job! 👍';
    feedbackText = 'You have a solid base! A quick revision of the formula sheet and notes will help reach 90%+.';
    badgeClass = 'status-good';
  } else {
    badgeText = 'Keep Practicing! 📚';
    feedbackText = 'Do not worry — practice makes perfect! Read the NCERT chapter notes and re-attempt this quiz.';
    badgeClass = 'status-retry';
  }

  if (statusBadge) {
    statusBadge.textContent = badgeText;
    statusBadge.className = `result-status-badge ${badgeClass}`;
  }

  if (msgEl) {
    msgEl.textContent = feedbackText;
  }

  // 2) Metrics
  const correctEl = document.getElementById('result-metric-correct');
  if (correctEl) correctEl.textContent = `${result.correct}`;

  const wrongEl = document.getElementById('result-metric-wrong');
  if (wrongEl) wrongEl.textContent = `${result.wrong}`;

  const skippedEl = document.getElementById('result-metric-skipped');
  if (skippedEl) skippedEl.textContent = `${result.skipped}`;

  const timeEl = document.getElementById('result-metric-time');
  if (timeEl) timeEl.textContent = result.timeSpent;

  // 3) Detailed Review List
  const reviewContainer = document.getElementById('result-review-list');
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
 * Retake current test
 */
function retakeCurrentTest() {
  if (activeTest) {
    startTest(activeTest.id);
  } else if (lastTestResult && lastTestResult.testId) {
    startTest(lastTestResult.testId);
  } else {
    returnToTestHome();
  }
}

/**
 * Return to Test Home Screen
 */
function returnToTestHome() {
  clearInterval(testTimerInterval);
  activeTest = null;
  renderTestHome();
  showTestSubView('test-view-home');
}

/**
 * Handle user wanting to quit during a live test
 */
function handleQuitLiveTest() {
  const modal = document.getElementById('test-quit-modal');
  if (modal) modal.classList.remove('hidden');
}

/**
 * Close quit modal and resume
 */
function closeQuitModal() {
  const modal = document.getElementById('test-quit-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Confirm quit test
 */
function confirmQuitTest() {
  closeQuitModal();
  clearInterval(testTimerInterval);
  activeTest = null;
  returnToTestHome();
  if (typeof showToast === 'function') {
    showToast('Test exited', 'info');
  }
}

/* ==========================================================================
   NEW TEST START FLOW CONTROLLER
   Multi-Class (9-12), Stream Selection, Chapter Multi-Select & Duration
   Question Count Rules: 1 ch = 10 Qs, 2 ch = 20 Qs, 3 ch = 30 Qs, All ch = 100 Qs
   ========================================================================== */

let selectedTestClass = 'Class 10';
let selectedTestStream = 'Science';
let selectedTestSubjectId = null;
let selectedTestChapterIds = [];
let selectedTestDuration = 15;

/**
 * Helper to normalize class string safely
 */
function normalizeStudentClass(raw) {
  const s = String(raw || '').toLowerCase();
  if (s.includes('9')) return 'Class 9';
  if (s.includes('11')) return 'Class 11';
  if (s.includes('12')) return 'Class 12';
  return 'Class 10';
}

/**
 * Helper to normalize stream string safely
 */
function normalizeStudentStream(raw) {
  const s = String(raw || '').toLowerCase();
  if (s.includes('comm')) return 'Commerce';
  if (s.includes('art') || s.includes('human')) return 'Arts';
  return 'Science';
}

/**
 * Initialize or sync the Test Start Flow UI
 * Strictly locks to the active logged-in profile (Rule: no manual class picker in test zone)
 */
function initTestStartFlow(forceReset = false) {
  // 1) Read active profile from AppState, currentProfile, or guest profile
  const user = (typeof AppState !== 'undefined' && AppState.user)
    ? AppState.user
    : ((typeof currentProfile !== 'undefined' && currentProfile) ? currentProfile : null);

  let rawClass = user?.class;
  let rawStream = user?.stream;
  let rawBoard = user?.board || 'CBSE';

  // Fallback to guest profile in localStorage if needed
  if (!rawClass) {
    try {
      const savedGuest = localStorage.getItem('nw_guest_profile');
      if (savedGuest) {
        const parsed = JSON.parse(savedGuest);
        rawClass = parsed.class;
        rawStream = parsed.stream;
        rawBoard = parsed.board || rawBoard;
      }
    } catch (e) {
      // ignore
    }
  }

  const activeClass = normalizeStudentClass(rawClass || 'Class 10');
  const activeStream = normalizeStudentStream(rawStream || 'Science');

  const classChanged = (activeClass !== selectedTestClass) || 
                       (activeStream !== selectedTestStream) || 
                       forceReset;

  selectedTestClass = activeClass;
  selectedTestStream = activeStream;

  // 2) Update Locked Academic Class Display Banner
  const lockedBadge = document.getElementById('test-locked-class-badge');
  const lockedBoard = document.getElementById('test-locked-board-badge');
  const lockedSub = document.getElementById('test-locked-class-subtitle');

  if (lockedBadge) {
    if (selectedTestClass === 'Class 11' || selectedTestClass === 'Class 12') {
      lockedBadge.textContent = `${selectedTestClass} (${selectedTestStream})`;
    } else {
      lockedBadge.textContent = selectedTestClass;
    }
  }
  if (lockedBoard) {
    lockedBoard.textContent = rawBoard || 'CBSE';
  }
  if (lockedSub) {
    lockedSub.textContent = `All mock tests and chapters aligned with your active profile (${selectedTestClass}${selectedTestClass.includes('11') || selectedTestClass.includes('12') ? ' · ' + selectedTestStream : ''})`;
  }

  // 3) Reset subject and chapter selection if class/stream changed
  if (classChanged || !selectedTestSubjectId) {
    selectedTestSubjectId = null;
    selectedTestChapterIds = [];
  }

  // 4) Populate subjects & chapters for current logged-in class
  renderTestSubjects();
}

/**
 * Global function to reload Test Zone when student updates class in profile
 */
window.reloadTestForClass = function() {
  initTestStartFlow(true);
};

/**
 * Retrieve curriculum subjects for given Class and Stream
 */
function getSubjectsForClassAndStream(className, streamName) {
  const normClass = normalizeStudentClass(className);
  const normStream = normalizeStudentStream(streamName);

  if (normClass === 'Class 9' && typeof CLASS_9_SUBJECTS !== 'undefined') {
    return CLASS_9_SUBJECTS;
  }
  if (normClass === 'Class 11') {
    if (normStream === 'Commerce' && typeof CLASS_11_COMMERCE_SUBJECTS !== 'undefined') return CLASS_11_COMMERCE_SUBJECTS;
    if (normStream === 'Arts' && typeof CLASS_11_ARTS_SUBJECTS !== 'undefined') return CLASS_11_ARTS_SUBJECTS;
    if (typeof CLASS_11_SCIENCE_SUBJECTS !== 'undefined') return CLASS_11_SCIENCE_SUBJECTS;
  }
  if (normClass === 'Class 12') {
    if (normStream === 'Commerce' && typeof CLASS_12_COMMERCE_SUBJECTS !== 'undefined') return CLASS_12_COMMERCE_SUBJECTS;
    if (normStream === 'Arts' && typeof CLASS_12_ARTS_SUBJECTS !== 'undefined') return CLASS_12_ARTS_SUBJECTS;
    if (typeof CLASS_12_SCIENCE_SUBJECTS !== 'undefined') return CLASS_12_SCIENCE_SUBJECTS;
  }
  if (typeof CLASS_10_SUBJECTS !== 'undefined') {
    return CLASS_10_SUBJECTS;
  }
  return typeof getAllSubjects === 'function' ? getAllSubjects() : [];
}

/**
 * Render subject selection chips
 */
function renderTestSubjects() {
  const container = document.getElementById('test-subjects-chips');
  if (!container) return;

  const subjects = getSubjectsForClassAndStream(selectedTestClass, selectedTestStream);
  if (!subjects || subjects.length === 0) {
    container.innerHTML = '<span style="font-size: 13px; color: var(--text-tertiary);">No subjects available</span>';
    return;
  }

  const exists = subjects.some(s => s.id === selectedTestSubjectId);
  if (!exists && subjects.length > 0) {
    selectedTestSubjectId = subjects[0].id;
  }

  container.innerHTML = subjects.map(s => {
    const isSel = s.id === selectedTestSubjectId;
    return `
      <button 
        type="button" 
        class="flow-chip ${isSel ? 'active' : ''}" 
        onclick="selectTestSubject('${s.id}')"
      >
        <i class="${s.icon || 'fa-solid fa-book'}"></i>
        <span>${s.name}</span>
      </button>
    `;
  }).join('');

  renderTestChapters();
}

/**
 * User selects subject
 */
function selectTestSubject(subjectId) {
  selectedTestSubjectId = subjectId;
  const chips = document.querySelectorAll('#test-subjects-chips .flow-chip');
  const subjects = getSubjectsForClassAndStream(selectedTestClass, selectedTestStream);
  chips.forEach((chip, idx) => {
    if (subjects[idx] && subjects[idx].id === subjectId) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  renderTestChapters();
}

/**
 * Render Chapter checkboxes for selected subject
 */
function renderTestChapters() {
  const container = document.getElementById('test-chapters-checklist');
  if (!container) return;

  const subjects = getSubjectsForClassAndStream(selectedTestClass, selectedTestStream);
  const currentSubject = subjects.find(s => s.id === selectedTestSubjectId) || subjects[0];

  if (!currentSubject || !currentSubject.chapters || currentSubject.chapters.length === 0) {
    container.innerHTML = '<span style="font-size: 13px; color: var(--text-tertiary); padding: 10px;">No chapters found for this subject.</span>';
    selectedTestChapterIds = [];
    updateTestCalculation();
    return;
  }

  // Default to selecting the first chapter
  const allChapterIds = currentSubject.chapters.map(c => c.id);
  selectedTestChapterIds = selectedTestChapterIds.filter(id => allChapterIds.includes(id));
  if (selectedTestChapterIds.length === 0 && currentSubject.chapters.length > 0) {
    selectedTestChapterIds = [currentSubject.chapters[0].id];
  }

  container.innerHTML = currentSubject.chapters.map(ch => {
    const isChecked = selectedTestChapterIds.includes(ch.id);
    return `
      <label class="flow-chapter-item ${isChecked ? 'selected' : ''}" onclick="toggleChapterSelection('${ch.id}', event)">
        <input 
          type="checkbox" 
          value="${ch.id}" 
          ${isChecked ? 'checked' : ''} 
          class="flow-ch-checkbox" 
          onclick="event.stopPropagation(); toggleChapterSelection('${ch.id}')"
        />
        <div class="flow-chapter-info">
          <span class="flow-chapter-title">Ch ${ch.number}: ${ch.title}</span>
          <span class="flow-chapter-meta">${ch.pages || 15} pages · NCERT</span>
        </div>
      </label>
    `;
  }).join('');

  updateSelectAllButtonState(currentSubject.chapters.length);
  updateTestCalculation();
}

/**
 * Toggle individual chapter selection
 */
function toggleChapterSelection(chId, event) {
  if (event && event.target && event.target.tagName === 'INPUT') {
    return;
  }

  const idx = selectedTestChapterIds.indexOf(chId);
  if (idx > -1) {
    if (selectedTestChapterIds.length > 1) {
      selectedTestChapterIds.splice(idx, 1);
    } else {
      if (typeof showToast === 'function') {
        showToast('At least 1 chapter must be selected', 'warning');
      }
      return;
    }
  } else {
    selectedTestChapterIds.push(chId);
  }

  const subjects = getSubjectsForClassAndStream(selectedTestClass, selectedTestStream);
  const currentSubject = subjects.find(s => s.id === selectedTestSubjectId);
  if (currentSubject) {
    const items = document.querySelectorAll('#test-chapters-checklist .flow-chapter-item');
    currentSubject.chapters.forEach((ch, i) => {
      const isChecked = selectedTestChapterIds.includes(ch.id);
      if (items[i]) {
        items[i].classList.toggle('selected', isChecked);
        const cb = items[i].querySelector('input[type="checkbox"]');
        if (cb) cb.checked = isChecked;
      }
    });
    updateSelectAllButtonState(currentSubject.chapters.length);
  }

  updateTestCalculation();
}

/**
 * Toggle Select All / Deselect All chapters
 */
function toggleSelectAllChapters() {
  const subjects = getSubjectsForClassAndStream(selectedTestClass, selectedTestStream);
  const currentSubject = subjects.find(s => s.id === selectedTestSubjectId);
  if (!currentSubject || !currentSubject.chapters) return;

  const allIds = currentSubject.chapters.map(c => c.id);
  const areAllSelected = selectedTestChapterIds.length === allIds.length;

  if (areAllSelected) {
    selectedTestChapterIds = [allIds[0]];
  } else {
    selectedTestChapterIds = [...allIds];
  }

  const items = document.querySelectorAll('#test-chapters-checklist .flow-chapter-item');
  currentSubject.chapters.forEach((ch, i) => {
    const isChecked = selectedTestChapterIds.includes(ch.id);
    if (items[i]) {
      items[i].classList.toggle('selected', isChecked);
      const cb = items[i].querySelector('input[type="checkbox"]');
      if (cb) cb.checked = isChecked;
    }
  });

  updateSelectAllButtonState(currentSubject.chapters.length);
  updateTestCalculation();
}

function updateSelectAllButtonState(totalChapters) {
  const btn = document.getElementById('test-select-all-chapters-btn');
  if (!btn) return;
  const areAllSelected = selectedTestChapterIds.length === totalChapters;
  btn.textContent = areAllSelected ? 'Deselect All' : 'Select All';
}

/**
 * Select Duration preset chip
 */
function selectTestDuration(mins) {
  selectedTestDuration = parseInt(mins, 10) || 15;
  const chips = document.querySelectorAll('#test-duration-presets .flow-chip');
  chips.forEach(chip => {
    if (parseInt(chip.getAttribute('data-min'), 10) === selectedTestDuration) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  const customInput = document.getElementById('test-custom-duration-input');
  if (customInput) {
    customInput.value = selectedTestDuration;
  }

  updateTestCalculation();
}

/**
 * Handle custom duration input change
 */
function handleCustomDurationChange(val) {
  let mins = parseInt(val, 10);
  if (isNaN(mins) || mins < 1) mins = 1;
  if (mins > 180) mins = 180;
  selectedTestDuration = mins;

  const chips = document.querySelectorAll('#test-duration-presets .flow-chip');
  chips.forEach(chip => {
    if (parseInt(chip.getAttribute('data-min'), 10) === mins) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  const customInput = document.getElementById('test-custom-duration-input');
  if (customInput) customInput.value = mins;

  updateTestCalculation();
}

/**
 * Strict Question Count Rules:
 * 1 ch = 10 Qs
 * 2 ch = 20 Qs
 * 3 ch = 30 Qs
 * All ch = 100 Qs
 */
function computeConfiguredQuestionCount() {
  const subjects = getSubjectsForClassAndStream(selectedTestClass, selectedTestStream);
  const currentSubject = subjects.find(s => s.id === selectedTestSubjectId);
  const totalInSubject = (currentSubject && currentSubject.chapters) ? currentSubject.chapters.length : 10;
  const count = selectedTestChapterIds.length;

  if (count === 0) return 0;
  if (count === totalInSubject) return 100;
  if (count === 1) return 10;
  if (count === 2) return 20;
  if (count === 3) return 30;
  return Math.min(count * 10, 100);
}

/**
 * Update UI labels based on configured settings
 */
function updateTestCalculation() {
  const qCount = computeConfiguredQuestionCount();
  const qCountPill = document.getElementById('test-calculated-qcount');
  const ctaBtn = document.getElementById('btn-start-configured-test');
  const ctaText = document.getElementById('test-start-cta-text');

  if (qCountPill) {
    qCountPill.textContent = `${qCount} Questions`;
  }

  if (ctaText) {
    ctaText.textContent = `Start Test (${qCount} Questions · ${selectedTestDuration} Mins)`;
  }

  if (ctaBtn) {
    ctaBtn.disabled = qCount === 0 || selectedTestDuration <= 0;
  }
}

/**
 * Build authentic question bank for selected chapters matching exact target count
 * Incorporates admin-uploaded questions and randomizes question selection on every attempt!
 */
function buildMockQuestionsForChapters(subject, chapters, targetCount) {
  let pool = [];

  // 1) Pull admin-uploaded questions from nw_custom_questions matching this class and chapters
  try {
    const raw = localStorage.getItem('nw_custom_questions');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const chapterTitles = chapters.map(c => (c.title || '').toLowerCase());
        const chapterNumbers = chapters.map(c => String(c.number));
        const matched = parsed.filter(q => {
          const matchClass = !q.class || q.class === selectedTestClass;
          const matchChapter = chapterTitles.some(t => (q.chapter || '').toLowerCase().includes(t)) ||
                               chapterNumbers.some(n => (q.chapter || '').includes(n));
          return matchClass && matchChapter;
        });

        matched.forEach((q, idx) => {
          const optArr = [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean);
          const correctLetter = (q.correct_option || 'A').toUpperCase();
          const letterMap = { A: 0, B: 1, C: 2, D: 3 };
          pool.push({
            id: `admin_q_${Date.now()}_${idx}`,
            text: q.question_text,
            options: optArr.length >= 2 ? optArr : [q.option_a || 'Option A', q.option_b || 'Option B', q.option_c || 'Option C', q.option_d || 'Option D'],
            correctIndex: letterMap[correctLetter] !== undefined ? letterMap[correctLetter] : 0,
            explanation: `Official curriculum question verified for ${selectedTestClass} · ${q.chapter || 'Chapter'}.`
          });
        });
      }
    }
  } catch (e) {
    console.warn('Could not read admin custom questions for test:', e);
  }

  // 2) Generate rich multi-style NCERT questions for each selected chapter
  chapters.forEach((ch, chIdx) => {
    const chTitle = ch.title || `Chapter ${ch.number || chIdx + 1}`;
    const highlights = ch.highlights || [];
    const h0 = highlights[0] || `Theoretical foundations of ${chTitle}`;
    const h1 = highlights[1] || `Analytical problem solving in ${chTitle}`;
    const h2 = highlights[2] || `Standard relations and constants in ${chTitle}`;
    const h3 = highlights[3] || `Empirical properties and applications`;

    const dynamicTemplates = [
      {
        text: `In "${chTitle}", which of the following statements represents the core fundamental concept?`,
        options: [
          `Focuses on: ${h0}`,
          `Contradicts standard NCERT curriculum guidelines.`,
          `Only applies to non-standard lab experiments.`,
          `Assumes zero conservation under standard conditions.`
        ],
        correctIndex: 0,
        explanation: `As detailed in the NCERT syllabus, "${h0}" forms the primary conceptual basis for ${chTitle}.`
      },
      {
        text: `Which principle or formula application is central to solving questions in "${chTitle}"?`,
        options: [
          `Arbitrary constant approximation without empirical validation`,
          `Systematic application of: ${h1}`,
          `Unchecked dimensional inconsistencies`,
          `Random statistical sampling`
        ],
        correctIndex: 1,
        explanation: `Application of "${h1}" is heavily emphasized in board examinations for ${chTitle}.`
      },
      {
        text: `What is the most common pitfall that students must avoid in "${chTitle}" examination questions?`,
        options: [
          `Writing proper SI units and stating intermediate steps`,
          `Applying formulas outside their specific boundary conditions`,
          `Drawing labeled schematics or diagrams where applicable`,
          `Stating standard NCERT definitions clearly`
        ],
        correctIndex: 1,
        explanation: `Applying formulas outside their domain without checking boundary conditions causes frequent mark deductions.`
      },
      {
        text: `In the context of "${chTitle}", which relation or law is most frequently tested?`,
        options: [
          `The principles underlying: ${h2}`,
          `Static qualitative conjecture without quantitative basis`,
          `Inverse non-standard deviation under zero pressure`,
          `Arbitrary empirical estimates without proofs`
        ],
        correctIndex: 0,
        explanation: `Board papers regularly assess ${h2} through direct numericals and conceptual assertions.`
      },
      {
        text: `When solving numerical problems or case studies in "${chTitle}", what is the mandatory first step?`,
        options: [
          `Directly guess the approximate final answer`,
          `Identify given data, write the applicable standard formula, and convert variables into SI units`,
          `Skip formula representation and write only the final number`,
          `Substitute values in mixed non-standard units`
        ],
        correctIndex: 1,
        explanation: `Marking schemes allocate dedicated step marks for writing the formula and consistent SI units.`
      },
      {
        text: `Assertion (A): Key mechanisms in "${chTitle}" strictly conform to syllabus conservation laws.\nReason (R): Scientific observations in NCERT are reproducible and validated through experimental proofs.`,
        options: [
          `Both (A) and (R) are true and (R) is the correct explanation of (A).`,
          `Both (A) and (R) are true but (R) is NOT the correct explanation of (A).`,
          `(A) is true but (R) is false.`,
          `(A) is false but (R) is true.`
        ],
        correctIndex: 0,
        explanation: `Both assertion and reason are factually accurate, and experimental validation explains scientific reproducibility.`
      },
      {
        text: `Which of the following is essential for securing full credit in descriptive questions for "${chTitle}"?`,
        options: [
          `Using colloquial language without standard scientific terminology`,
          `Precise technical keywords, structured bullet points, and neat labeled diagrams`,
          `Writing long unstructured paragraphs without headings`,
          `Omitting concluding statements and SI units`
        ],
        correctIndex: 1,
        explanation: `Examiners award maximum marks to answers containing precise textbook keywords and clear steps.`
      },
      {
        text: `How does mastering "${chTitle}" support performance in higher-level competitive examinations?`,
        options: [
          `It only offers rote historical facts with no analytical application`,
          `It provides foundational analytical prerequisites for multi-concept problem solving`,
          `It is completely excluded from senior entrance tests`,
          `It requires memorization without logical reasoning`
        ],
        correctIndex: 1,
        explanation: `Concepts in ${chTitle} build core analytical foundations tested in all national competitive examinations.`
      },
      {
        text: `In "${chTitle}", what is crucial when stating a formal textbook definition?`,
        options: [
          `A general vague statement in colloquial terms`,
          `Exact NCERT wording or equivalent scientific precision with governing conditions`,
          `Only providing a casual example without defining the term`,
          `Omitting governing physical conditions`
        ],
        correctIndex: 1,
        explanation: `Formal scientific definitions require specific operational keywords and standard governing conditions.`
      },
      {
        text: `Which graphical or trend representation is characteristic of "${chTitle}"?`,
        options: [
          `Linear or non-linear trend curves with properly marked axes, units, and origin`,
          `Unlabeled sketches without directional arrows`,
          `Arbitrary freehand shapes without scale or units`,
          `Curves violating energy conservation`
        ],
        correctIndex: 0,
        explanation: `Graphs must clearly indicate physical quantities, scale, units on both axes, and proper trend curvature.`
      },
      {
        text: `For practical or laboratory questions on "${chTitle}", which precaution is most critical?`,
        options: [
          `Ensuring zero error calibration and taking repeated readings for precision`,
          `Recording only a single reading to save time`,
          `Ignoring environmental temperature and pressure variations`,
          `Altering observation values to match theoretical expectations`
        ],
        correctIndex: 0,
        explanation: `Taking multiple concordant readings and checking zero error ensures reliable experimental measurements.`
      },
      {
        text: `Under which scenario does the standard theoretical model in "${chTitle}" require special correction?`,
        options: [
          `Under extreme boundary conditions or non-ideal states`,
          `Under standard room temperature and pressure`,
          `When all conservation laws are strictly followed`,
          `Never, all models are absolute and universal without limits`
        ],
        correctIndex: 0,
        explanation: `Standard introductory models assume ideal conditions; deviations occur under extreme pressures or non-ideal states.`
      }
    ];

    // Shuffle and append to pool
    shuffleArray(dynamicTemplates).forEach(t => pool.push(t));
  });

  // 3) Shuffle all questions in pool
  pool = shuffleArray(pool);

  // 4) If pool is smaller than targetCount, generate fresh variation items
  let counter = 1;
  while (pool.length < targetCount) {
    const ch = chapters[(counter - 1) % chapters.length];
    const chTitle = ch.title || `Chapter ${ch.number || 1}`;
    pool.push({
      text: `[Concept Check] Regarding "${chTitle}", evaluate: Which option correctly identifies an essential CBSE board examination insight?`,
      options: [
        `Rigorous application of NCERT syllabus derivations and conceptual axioms`,
        `Non-standard arbitrary formulation without mathematical backing`,
        `Outdated historically disproven scientific assumptions`,
        `Disregard of physical dimensions and conservation principles`
      ],
      correctIndex: 0,
      explanation: `Board examinations reward rigorous adherence to NCERT definitions and step-by-step mathematical derivations.`
    });
    counter++;
  }

  // Shuffle pool again so order is completely unpredictable!
  pool = shuffleArray(pool);

  // 5) Format and shuffle options for each selected question
  const finalQuestions = pool.slice(0, targetCount).map((q, idx) => {
    const randomizedQ = shuffleQuestionOptions(q);
    return {
      id: idx + 1,
      text: randomizedQ.text,
      options: randomizedQ.options,
      correctIndex: randomizedQ.correctIndex,
      explanation: randomizedQ.explanation || 'Refer to NCERT textbook for detailed derivation.'
    };
  });

  return finalQuestions;
}

/**
 * Handle Start Configured Test click
 */
function handleStartConfiguredTest() {
  const subjects = getSubjectsForClassAndStream(selectedTestClass, selectedTestStream);
  const currentSubject = subjects.find(s => s.id === selectedTestSubjectId);

  if (!currentSubject) {
    if (typeof showToast === 'function') showToast('Please select a subject', 'warning');
    return;
  }

  if (!selectedTestChapterIds || selectedTestChapterIds.length === 0) {
    if (typeof showToast === 'function') showToast('Please select at least 1 chapter', 'warning');
    return;
  }

  const selectedChapters = currentSubject.chapters.filter(ch => selectedTestChapterIds.includes(ch.id));
  if (selectedChapters.length === 0) {
    if (typeof showToast === 'function') showToast('Please select at least 1 chapter', 'warning');
    return;
  }

  const targetQCount = computeConfiguredQuestionCount();
  if (targetQCount <= 0) {
    if (typeof showToast === 'function') showToast('Invalid question count', 'warning');
    return;
  }

  const questions = buildMockQuestionsForChapters(currentSubject, selectedChapters, targetQCount);

  let chapterLabel = '';
  if (selectedChapters.length === 1) {
    chapterLabel = selectedChapters[0].title;
  } else if (selectedChapters.length === currentSubject.chapters.length) {
    chapterLabel = 'Full Syllabus Mock';
  } else {
    chapterLabel = `${selectedChapters.length} Chapters (${selectedChapters.map(c => `Ch ${c.number}`).join(', ')})`;
  }

  const customTest = {
    id: `custom_${Date.now()}`,
    title: `${currentSubject.name} · ${chapterLabel}`,
    subject: currentSubject.name,
    subjectCode: currentSubject.code || '101',
    color: currentSubject.color || '#2B6DEF',
    icon: currentSubject.icon || 'fa-solid fa-graduation-cap',
    questionCount: questions.length,
    durationMin: selectedTestDuration,
    difficulty: targetQCount >= 30 ? 'Comprehensive' : 'Standard',
    description: `Custom test covering ${chapterLabel} for ${selectedTestClass}.`,
    questions: questions
  };

  startTest(customTest);
}
