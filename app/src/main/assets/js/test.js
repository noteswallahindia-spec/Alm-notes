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
 */
function loadSavedTestResult() {
  try {
    const saved = localStorage.getItem('noteswallah_last_test_result');
    if (saved) {
      lastTestResult = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read saved test result from localStorage', e);
  }
}

/**
 * Save test result to localStorage
 */
function saveTestResult(result) {
  try {
    localStorage.setItem('noteswallah_last_test_result', JSON.stringify(result));
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
 * Start a Test session
 * @param {string} testId 
 */
function startTest(testId) {
  const test = getTestById(testId);
  if (!test) {
    if (typeof showToast === 'function') showToast('Test not found', 'error');
    return;
  }

  activeTest = test;
  currentQuestionIndex = 0;
  userAnswers = {};
  timeTotalSec = test.durationMin * 60;
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
