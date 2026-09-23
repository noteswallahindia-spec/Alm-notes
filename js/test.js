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
 * Load last saved result from localStorage
 * Rule 4: Guest progress stored locally with nw_guest_ prefix
 */
function loadSavedTestResult() {
  try {
    const isGuest = (typeof AppState !== 'undefined' && AppState.isGuest);
    const key = isGuest ? 'nw_guest_last_test_result' : 'noteswallah_last_test_result';
    const saved = localStorage.getItem(key);
    if (saved) {
      lastTestResult = JSON.parse(saved);
    } else {
      lastTestResult = null;
    }
  } catch (e) {
    console.warn('Could not read saved test result from localStorage', e);
  }
}

/**
 * Save test result to localStorage
 * Rule 4: Guest progress stored locally with nw_guest_ prefix
 */
function saveTestResult(result) {
  try {
    const isGuest = (typeof AppState !== 'undefined' && AppState.isGuest);
    const key = isGuest ? 'nw_guest_last_test_result' : 'noteswallah_last_test_result';
    localStorage.setItem(key, JSON.stringify(result));
    lastTestResult = result;
  } catch (e) {
    console.warn('Could not save test result to localStorage', e);
  }
}

/**
 * Render Test Home with list of tests & recent result banner
 */
function renderTestHome() {
  const container = document.getElementById('test-cards-list');
  const recentContainer = document.getElementById('test-recent-banner');
  if (!container) return;

  initTestStartFlow();

  // 1) Render Recent Result banner if exists
  if (recentContainer) {
    if (lastTestResult) {
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

  // 2) Filter tests
  const filtered = TEST_BANK.filter(t => {
    if (activeSubjectFilter === 'all') return true;
    return t.subject.toLowerCase() === activeSubjectFilter.toLowerCase();
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="card" style="padding: 32px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 12px 0;">
        <div class="empty-icon-circle" style="width: 52px; height: 52px; border-radius: 50%; background: var(--primary-blue-light); color: var(--primary-blue); display: flex; align-items: center; justify-content: center; font-size: 22px;">
          <i class="fa-solid fa-clipboard-question"></i>
        </div>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-top: 4px;">No Tests Found</h4>
        <p style="font-size: 13px; color: var(--text-secondary); max-width: 260px;">No mock tests match this filter. Try selecting "All Subjects".</p>
        <button type="button" class="btn btn-secondary-outline btn-sm" onclick="filterTestsBySubject('all')" style="margin-top: 6px; border-radius: var(--radius-full); padding: 8px 18px;">
          Show All Tests
        </button>
      </div>
    `;
    return;
  }

  // 3) Render Test Cards
  container.innerHTML = filtered.map(test => {
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

/**
 * Start a Test session (Accepts testId or custom test object)
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

  activeTest = test;
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
 * Initialize or sync the Test Start Flow UI
 */
function initTestStartFlow() {
  const userClass = (typeof AppState !== 'undefined' && AppState.user && AppState.user.class)
    ? AppState.user.class
    : (typeof currentProfile !== 'undefined' && currentProfile?.class ? currentProfile.class : 'Class 10');
  const userStream = (typeof AppState !== 'undefined' && AppState.user && AppState.user.stream)
    ? AppState.user.stream
    : (typeof currentProfile !== 'undefined' && currentProfile?.stream ? currentProfile.stream : 'Science');

  if (['Class 9', 'Class 10', 'Class 11', 'Class 12'].includes(userClass)) {
    selectedTestClass = userClass;
  }
  if (userStream) {
    selectedTestStream = userStream;
  }

  // Update Class chip selection
  const classChips = document.querySelectorAll('#test-class-chips .flow-chip');
  classChips.forEach(chip => {
    if (chip.getAttribute('data-class') === selectedTestClass) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  // Toggle Stream group visibility for Class 11/12
  const streamGroup = document.getElementById('test-stream-group');
  if (streamGroup) {
    if (selectedTestClass === 'Class 11' || selectedTestClass === 'Class 12') {
      streamGroup.classList.remove('hidden');
    } else {
      streamGroup.classList.add('hidden');
    }
  }

  // Update Stream chips UI
  const streamChips = document.querySelectorAll('#test-stream-chips .flow-chip');
  streamChips.forEach(chip => {
    if (chip.getAttribute('data-stream') === selectedTestStream) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  // Populate subjects & chapters
  renderTestSubjects();
}

/**
 * User selects Class in Test Start Flow
 */
function selectTestClass(className) {
  selectedTestClass = className;
  const classChips = document.querySelectorAll('#test-class-chips .flow-chip');
  classChips.forEach(chip => {
    if (chip.getAttribute('data-class') === className) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  const streamGroup = document.getElementById('test-stream-group');
  if (streamGroup) {
    if (className === 'Class 11' || className === 'Class 12') {
      streamGroup.classList.remove('hidden');
    } else {
      streamGroup.classList.add('hidden');
    }
  }

  renderTestSubjects();
}

/**
 * User selects Stream in Test Start Flow (Class 11/12)
 */
function selectTestStream(streamName) {
  selectedTestStream = streamName;
  const streamChips = document.querySelectorAll('#test-stream-chips .flow-chip');
  streamChips.forEach(chip => {
    if (chip.getAttribute('data-stream') === streamName) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  renderTestSubjects();
}

/**
 * Retrieve curriculum subjects for given Class and Stream
 */
function getSubjectsForClassAndStream(className, streamName) {
  if (className === 'Class 9' && typeof CLASS_9_SUBJECTS !== 'undefined') {
    return CLASS_9_SUBJECTS;
  }
  if (className === 'Class 11') {
    const s = (streamName || '').toLowerCase();
    if (s.includes('comm') && typeof CLASS_11_COMMERCE_SUBJECTS !== 'undefined') return CLASS_11_COMMERCE_SUBJECTS;
    if ((s.includes('art') || s.includes('human')) && typeof CLASS_11_ARTS_SUBJECTS !== 'undefined') return CLASS_11_ARTS_SUBJECTS;
    if (typeof CLASS_11_SCIENCE_SUBJECTS !== 'undefined') return CLASS_11_SCIENCE_SUBJECTS;
  }
  if (className === 'Class 12') {
    const s = (streamName || '').toLowerCase();
    if (s.includes('comm') && typeof CLASS_12_COMMERCE_SUBJECTS !== 'undefined') return CLASS_12_COMMERCE_SUBJECTS;
    if ((s.includes('art') || s.includes('human')) && typeof CLASS_12_ARTS_SUBJECTS !== 'undefined') return CLASS_12_ARTS_SUBJECTS;
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
 */
function buildMockQuestionsForChapters(subject, chapters, targetCount) {
  const result = [];
  let qId = 1;

  // High-yield NCERT question builder per chapter
  chapters.forEach((ch, chIdx) => {
    const chTitle = ch.title || `Chapter ${ch.number || chIdx + 1}`;
    const highlights = ch.highlights || [];
    
    const chapterQuestions = [
      {
        text: `In "${chTitle}", which of the following statements represents the core fundamental concept?`,
        options: [
          highlights[0] ? `It primarily focuses on: ${highlights[0]}` : `It establishes the fundamental theoretical framework of ${chTitle}.`,
          `It contradicts the standard NCERT curriculum guidelines.`,
          `It is solely applicable to non-standard lab experiments.`,
          `None of the standard empirical assertions apply.`
        ],
        correctIndex: 0,
        explanation: `As detailed in the NCERT curriculum, ${highlights[0] || chTitle} forms the primary conceptual basis for this chapter.`
      },
      {
        text: `Which principle or formula application is central to solving questions in "${chTitle}"?`,
        options: [
          `Classical approximation without experimental validity`,
          highlights[1] ? `Application of: ${highlights[1]}` : `Analytical derivation and systematic problem solving in ${chTitle}`,
          `Random statistical sampling without mathematical formulation`,
          `Arbitrary constant assumptions`
        ],
        correctIndex: 1,
        explanation: `${highlights[1] || 'Analytical derivation'} is heavily emphasized in board examinations for ${chTitle}.`
      },
      {
        text: `What is a common pitfall that students must avoid in "${chTitle}" board examination questions?`,
        options: [
          `Writing proper units and showing intermediate calculation steps`,
          `Applying formulas outside their specific boundary conditions`,
          `Drawing labeled schematics or diagrams where applicable`,
          `Stating standard NCERT definitions clearly`
        ],
        correctIndex: 1,
        explanation: `Applying formulas outside their domain or boundary conditions without verifying assumptions is the most frequent source of mark deductions.`
      },
      {
        text: `In the context of "${chTitle}", which relation or law is most frequently tested?`,
        options: [
          highlights[2] ? `The principles underlying: ${highlights[2]}` : `The standard governing law and dimensional consistency of ${chTitle}`,
          `Inverse proportional deviation under non-standard conditions`,
          `Static qualitative conjecture without quantitative basis`,
          `None of the above`
        ],
        correctIndex: 0,
        explanation: `Board papers frequently assess ${highlights[2] || 'standard governing relations'} through direct numericals and conceptual assertions.`
      },
      {
        text: `When solving numerical problems or case studies in "${chTitle}", what is the recommended starting step?`,
        options: [
          `Directly guess the approximate final answer`,
          `Identify given data, write the applicable standard formula, and substitute in SI units`,
          `Skip formula representation and write only the final value`,
          `Substitute values in mixed non-standard units`
        ],
        correctIndex: 1,
        explanation: `CBSE marking schemes allocate dedicated marks for writing the correct formula and converting variables into consistent SI units.`
      },
      {
        text: `Assertion (A): Concepts in "${chTitle}" are strictly verified by empirical observations. Reason (R): The NCERT curriculum relies on repeatable scientific experiments and logical deductions.`,
        options: [
          `Both (A) and (R) are true and (R) is the correct explanation of (A).`,
          `Both (A) and (R) are true but (R) is NOT the correct explanation of (A).`,
          `(A) is true but (R) is false.`,
          `(A) is false but (R) is true.`
        ],
        correctIndex: 0,
        explanation: `Both assertion and reason are factual, and logical deduction is the exact foundational reason for empirical verification in ${chTitle}.`
      },
      {
        text: `Which of the following is an essential requirement for obtaining full credit in descriptive questions of "${chTitle}"?`,
        options: [
          `Using colloquial language instead of standard scientific/mathematical terminology`,
          `Precise technical keywords, structured bullet points, and neat diagrams`,
          `Writing excessively long paragraphs with redundant repetitions`,
          `Omitting the conclusion or final unit`
        ],
        correctIndex: 1,
        explanation: `Examiners reward concise answers containing exact textbook keywords, clear steps, and properly labeled diagrams.`
      },
      {
        text: `How does mastering "${chTitle}" support performance in higher-level competitive examinations?`,
        options: [
          `It has no relevance beyond class school tests`,
          `It serves as the prerequisite foundation for advanced multi-concept problem solving`,
          `It only provides historical dates without conceptual application`,
          `It teaches memorization without logical reasoning`
        ],
        correctIndex: 1,
        explanation: `Topics in ${chTitle} build core analytical and problem-solving skills tested across all national competitive examinations.`
      },
      {
        text: `In "${chTitle}", if a question asks for a formal definition, what ensures maximum marks?`,
        options: [
          `A general vague statement in student's own colloquial terms`,
          `Exact NCERT wording or equivalent scientific precision with standard conditions`,
          `Only giving an example without defining the term`,
          `Leaving out the key operative words`
        ],
        correctIndex: 1,
        explanation: `Scientific and mathematical definitions require explicit inclusion of governing conditions and standard terminology.`
      },
      {
        text: `Which graphical or diagrammatic representation is commonly associated with "${chTitle}"?`,
        options: [
          `Linear or non-linear trend curves with properly marked axes and origin`,
          `Unlabeled sketches without directional arrows`,
          `Arbitrary freehand shapes without scale`,
          `None of the above`
        ],
        correctIndex: 0,
        explanation: `Graphs must clearly indicate physical quantities, scale, units on both axes, and proper trend curvature.`
      }
    ];

    chapterQuestions.forEach(cq => {
      if (result.length < targetCount) {
        result.push({
          id: qId++,
          text: cq.text,
          options: cq.options,
          correctIndex: cq.correctIndex,
          explanation: cq.explanation
        });
      }
    });
  });

  // If more questions needed to reach targetCount (e.g. 100 Qs for full syllabus), generate variations
  while (result.length < targetCount) {
    const ch = chapters[result.length % chapters.length];
    const chTitle = ch.title || `Chapter ${ch.number || 1}`;
    const num = result.length + 1;
    result.push({
      id: num,
      text: `[Q${num}] For "${chTitle}", evaluate: Which option correctly identifies a key exam property or definition?`,
      options: [
        `Standard property verified by NCERT syllabus guidelines`,
        `Non-standard arbitrary formulation`,
        `Empirically disproven hypothesis`,
        `Outdated historical misconception`
      ],
      correctIndex: 0,
      explanation: `Detailed in NCERT syllabus for ${chTitle}: standard principles must be observed for valid solutions.`
    });
  }

  return result.slice(0, targetCount);
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
