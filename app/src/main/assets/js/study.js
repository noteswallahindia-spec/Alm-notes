/**
 * ==========================================================================
 * NOTES WALLAH - Study Flow Controller (Part 2)
 * Subjects -> Chapters -> Chapter Detail -> Read / Pro Notes
 * ==========================================================================
 */

let currentStudySubjectId = null;
let currentStudyChapterId = null;

/**
 * Initialize Study module when app starts or Study tab is selected
 */
function initStudyModule() {
  if (typeof syncCustomChaptersToMemory === 'function') {
    syncCustomChaptersToMemory();
  }
  updateStudyHeaderInfo();
  renderStudySubjects();

  // Asynchronously fetch chapters from Supabase if connected
  if (window.sb && typeof window.sb.from === 'function') {
    window.sb.from('chapters').select('*').eq('is_active', true).then(({ data, error }) => {
      if (!error && Array.isArray(data) && data.length > 0) {
        try {
          const raw = localStorage.getItem('nw_custom_chapters');
          let localList = raw ? JSON.parse(raw) : [];
          if (!Array.isArray(localList)) localList = [];
          data.forEach(remote => {
            const idx = localList.findIndex(l => l.id === remote.id || (l.class === remote.class && l.subject === remote.subject && String(l.chapter_no) === String(remote.chapter_no)));
            if (idx >= 0) {
              localList[idx] = { ...localList[idx], ...remote };
            } else {
              localList.push(remote);
            }
          });
          localStorage.setItem('nw_custom_chapters', JSON.stringify(localList));
          if (typeof syncCustomChaptersToMemory === 'function') {
            syncCustomChaptersToMemory();
          }
        } catch (e) {
          console.warn('Supabase chapters sync cache note:', e);
        }
      }
    }).catch(err => {
      console.warn('Remote chapter fetch note:', err);
    });
  }
}

/**
 * Reload Study subjects when user changes class in Settings or Onboarding
 */
function reloadStudyForClass() {
  currentStudySubjectId = null;
  currentStudyChapterId = null;
  updateStudyHeaderInfo();
  showStudySubView('subjects');
  renderStudySubjects();
}

/**
 * Update the study screen subtitle to reflect current class, stream and board
 */
function updateStudyHeaderInfo() {
  const userClass = (typeof AppState !== 'undefined' && AppState.user && AppState.user.class)
    ? AppState.user.class
    : (typeof currentProfile !== 'undefined' && currentProfile?.class ? currentProfile.class : 'Class 10');
  const userStream = (typeof AppState !== 'undefined' && AppState.user && AppState.user.stream)
    ? AppState.user.stream
    : (typeof currentProfile !== 'undefined' && currentProfile?.stream ? currentProfile.stream : '');
  const userBoard = (typeof AppState !== 'undefined' && AppState.user && AppState.user.board)
    ? AppState.user.board
    : (typeof currentProfile !== 'undefined' && currentProfile?.board ? currentProfile.board : 'CBSE');

  const subtitleEl = document.getElementById('study-screen-subtitle');
  if (subtitleEl) {
    if (userStream) {
      subtitleEl.textContent = `${userClass} · ${userStream} · ${userBoard} Syllabus`;
    } else {
      subtitleEl.textContent = `${userClass} ${userBoard} · Curriculum Notes & Books`;
    }
  }
}

/**
 * 1) RENDER SUBJECTS SCREEN
 */
function renderStudySubjects() {
  updateStudyHeaderInfo();
  const container = document.getElementById('study-subjects-grid');
  if (!container) return;

  const subjects = getAllSubjects();
  if (!subjects || subjects.length === 0) {
    container.innerHTML = `
      <div class="card study-empty-state" style="grid-column: span 2; padding: 36px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div class="empty-icon-circle" style="width: 56px; height: 56px; border-radius: 50%; background: var(--primary-blue-light); color: var(--primary-blue); display: flex; align-items: center; justify-content: center; font-size: 22px;">
          <i class="fa-solid fa-book-open"></i>
        </div>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-top: 4px;">No Subjects Found</h4>
        <p style="font-size: 13px; color: var(--text-secondary); max-width: 260px;">NCERT syllabus materials are loading. Tap to refresh.</p>
        <button type="button" class="btn btn-secondary-outline btn-sm" onclick="initStudyModule()" style="margin-top: 6px; border-radius: var(--radius-full); padding: 8px 18px;">
          <i class="fa-solid fa-rotate-right"></i> Refresh
        </button>
      </div>
    `;
    showStudySubView('subjects');
    return;
  }

  container.innerHTML = subjects.map(subject => {
    return `
      <article class="study-subject-card" onclick="openSubjectChapters('${subject.id}')">
        <div class="subject-card-header">
          <div class="subject-icon-box" style="background: ${subject.gradient};">
            <i class="${subject.icon}"></i>
          </div>
          <span class="subject-code-badge">${subject.code}</span>
        </div>
        <div class="subject-card-body">
          <h4 class="subject-name">${subject.name}</h4>
          <p class="subject-chapter-count">${subject.chaptersCount} Chapters</p>
        </div>
        <div class="subject-card-footer">
          <div class="subject-mini-progress">
            <div class="mini-progress-track">
              <div class="mini-progress-fill" style="width: ${Math.round((subject.completedCount / subject.chaptersCount) * 100)}%; background: ${subject.color};"></div>
            </div>
            <span class="mini-progress-text">${subject.completedCount}/${subject.chaptersCount}</span>
          </div>
          <i class="fa-solid fa-chevron-right subject-arrow"></i>
        </div>
      </article>
    `;
  }).join('');

  // Show subjects view, hide others
  showStudySubView('subjects');
}

/**
 * 2) OPEN SUBJECT CHAPTERS SCREEN
 * @param {string} subjectId 
 */
function openSubjectChapters(subjectId) {
  currentStudySubjectId = subjectId;
  const subject = getSubjectById(subjectId);
  if (!subject) return;

  // Set subject header info
  const titleEl = document.getElementById('chapters-subject-title');
  const badgeEl = document.getElementById('chapters-subject-badge');
  const countEl = document.getElementById('chapters-progress-text');
  const percentEl = document.getElementById('chapters-progress-percent');
  const fillEl = document.getElementById('chapters-progress-fill');
  const iconBox = document.getElementById('chapters-subject-icon');

  const completionPct = Math.round((subject.completedCount / subject.chaptersCount) * 100);

  const userClass = (typeof AppState !== 'undefined' && AppState.user && AppState.user.class)
    ? AppState.user.class
    : (typeof currentProfile !== 'undefined' && currentProfile?.class ? currentProfile.class : 'Class 10');

  if (titleEl) titleEl.textContent = subject.name;
  if (badgeEl) badgeEl.textContent = `${userClass} · ${subject.code}`;
  if (countEl) countEl.textContent = `${subject.completedCount} of ${subject.chaptersCount} Completed`;
  if (percentEl) percentEl.textContent = `${completionPct}%`;
  if (fillEl) {
    fillEl.style.width = `${completionPct}%`;
    fillEl.style.background = subject.color;
  }
  if (iconBox) {
    iconBox.className = 'chapters-header-icon';
    iconBox.style.background = subject.gradient;
    iconBox.innerHTML = `<i class="${subject.icon}"></i>`;
  }

  // Render chapters list
  const listContainer = document.getElementById('chapters-list-container');
  if (listContainer) {
    if (!subject.chapters || subject.chapters.length === 0) {
      listContainer.innerHTML = `
        <div class="card" style="padding: 32px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 12px 0;">
          <div class="empty-icon-circle" style="width: 50px; height: 50px; border-radius: 50%; background: var(--primary-blue-light); color: var(--primary-blue); display: flex; align-items: center; justify-content: center; font-size: 20px;">
            <i class="fa-solid fa-file-lines"></i>
          </div>
          <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main);">No Chapters Yet</h4>
          <p style="font-size: 13px; color: var(--text-secondary); max-width: 250px;">Chapters for this syllabus are being prepared according to the board exam blueprint.</p>
          <button type="button" class="btn btn-secondary-outline btn-sm" onclick="backToSubjects()" style="margin-top: 6px; border-radius: var(--radius-full); padding: 7px 16px;">
            <i class="fa-solid fa-arrow-left"></i> Back to Subjects
          </button>
        </div>
      `;
    } else {
      listContainer.innerHTML = subject.chapters.map(chapter => {
      let statusBadgeClass = 'status-not-started';
      let statusText = 'Not Started';
      let statusIcon = 'fa-regular fa-circle';

      if (chapter.status === 'completed') {
        statusBadgeClass = 'status-completed';
        statusText = 'Completed';
        statusIcon = 'fa-solid fa-circle-check';
      } else if (chapter.status === 'in_progress') {
        statusBadgeClass = 'status-in-progress';
        statusText = 'In Progress';
        statusIcon = 'fa-solid fa-spinner fa-spin-pulse';
      }

      const chapterNumberStr = chapter.number < 10 ? `0${chapter.number}` : `${chapter.number}`;

      return `
        <article class="chapter-row-card" onclick="openChapterDetail('${subject.id}', '${chapter.id}')">
          <div class="chapter-num-badge">${chapterNumberStr}</div>
          <div class="chapter-row-info">
            <h5 class="chapter-row-title">${chapter.title}</h5>
            <div class="chapter-row-meta">
              <span class="chapter-status-chip ${statusBadgeClass}">
                <i class="${statusIcon}"></i> ${statusText}
              </span>
              <span class="chapter-meta-time"><i class="fa-regular fa-clock"></i> ${chapter.readTime}</span>
            </div>
          </div>
          <div class="chapter-row-arrow">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </article>
      `;
    }).join('');
    }
  }

  showStudySubView('chapters');
}

/**
 * 3) OPEN CHAPTER DETAIL SCREEN
 * @param {string} subjectId 
 * @param {string} chapterId 
 */
function openChapterDetail(subjectId, chapterId) {
  currentStudySubjectId = subjectId;
  currentStudyChapterId = chapterId;

  const subject = getSubjectById(subjectId);
  const chapter = getChapterById(subjectId, chapterId);
  if (!chapter || !subject) return;

  // Track last study progress in localStorage (Rule 4: localStorage only)
  try {
    const isGuest = (typeof AppState !== 'undefined' && AppState.isGuest);
    const key = isGuest ? 'nw_guest_last_study' : 'noteswallah_last_study';
    localStorage.setItem(key, JSON.stringify({
      subjectId: subjectId,
      subjectName: subject.name,
      chapterId: chapterId,
      chapterTitle: chapter.title,
      chapterNumber: chapter.number,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Could not record last study:', e);
  }

  // Populate Details
  const breadcrumbEl = document.getElementById('detail-subject-breadcrumb');
  const titleEl = document.getElementById('detail-chapter-title');
  const numBadge = document.getElementById('detail-chapter-number');
  const descEl = document.getElementById('detail-chapter-desc');
  const statusChip = document.getElementById('detail-status-chip');
  const pagesEl = document.getElementById('detail-meta-pages');
  const timeEl = document.getElementById('detail-meta-time');
  const highlightsContainer = document.getElementById('detail-highlights-list');

  if (breadcrumbEl) breadcrumbEl.textContent = `${subject.name} · Chapter ${chapter.number}`;
  if (numBadge) numBadge.textContent = `Chapter ${chapter.number}`;
  if (titleEl) titleEl.textContent = chapter.title;
  if (descEl) descEl.textContent = chapter.description;
  if (pagesEl) pagesEl.textContent = `${chapter.pages} Pages`;
  if (timeEl) timeEl.textContent = chapter.readTime;

  if (statusChip) {
    if (chapter.status === 'completed') {
      statusChip.className = 'chapter-status-chip status-completed';
      statusChip.innerHTML = '<i class="fa-solid fa-circle-check"></i> Completed';
    } else if (chapter.status === 'in_progress') {
      statusChip.className = 'chapter-status-chip status-in-progress';
      statusChip.innerHTML = '<i class="fa-solid fa-spinner fa-spin-pulse"></i> In Progress';
    } else {
      statusChip.className = 'chapter-status-chip status-not-started';
      statusChip.innerHTML = '<i class="fa-regular fa-circle"></i> Not Started';
    }
  }

  // Key highlights
  if (highlightsContainer) {
    if (chapter.highlights && chapter.highlights.length > 0) {
      highlightsContainer.innerHTML = chapter.highlights.map(h => `
        <li class="highlight-item">
          <i class="fa-solid fa-check highlight-bullet"></i>
          <span>${h}</span>
        </li>
      `).join('');
    } else {
      highlightsContainer.innerHTML = `
        <li class="highlight-item">
          <i class="fa-solid fa-check highlight-bullet"></i>
          <span>NCERT syllabus guidelines and key formula derivations included</span>
        </li>
      `;
    }
  }

  // Bind Buttons
  const readBtn = document.getElementById('detail-read-btn');
  const proBtn = document.getElementById('detail-pro-btn');

  if (readBtn) {
    readBtn.onclick = () => handleReadChapter(chapter);
  }

  if (proBtn) {
    proBtn.onclick = () => handleProNotesClick(chapter);
  }

  showStudySubView('detail');
}

/**
 * PART 8: CHAPTER ACTIONS
 * 1) Button "Read": Opens ebookUrl in new tab directly (no ad required)
 * 2) Button "Pro Notes": Triggers Rewarded Ad Gate flow every time
 */

/**
 * Handle "Read" Action -> Opens e-book link directly in external Chrome browser page.
 * Strictly no ad required.
 * @param {Object} chapter 
 */
function handleReadChapter(chapter) {
  if (!chapter) {
    chapter = getChapterById(currentStudySubjectId, currentStudyChapterId);
  }

  const ebookUrl = (chapter && (chapter.ebookUrl || chapter.ebook_url)) ? (chapter.ebookUrl || chapter.ebook_url).trim() : '';

  if (!ebookUrl) {
    if (typeof showToast === 'function') {
      showToast('E-book link coming soon for this chapter.', 'info');
    } else {
      alert('E-book link coming soon for this chapter.');
    }
    return;
  }

  if (typeof showToast === 'function') {
    showToast('Opening NCERT E-book in Chrome...', 'info');
  }

  // Open e-book directly in Chrome / external browser page
  try {
    const a = document.createElement('a');
    a.href = ebookUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    window.location.href = ebookUrl;
  }
}

/**
 * Close Ebook Modal (maintained for backward compatibility if ever called)
 */
function closeEbookModal() {
  const modal = document.getElementById('ebook-modal');
  const iframe = document.getElementById('ebook-iframe');
  if (modal) modal.classList.add('hidden');
  if (iframe) iframe.src = 'about:blank';
  document.body.classList.remove('modal-open');
}

/* ==========================================================================
   PART 8: PRO NOTES ENGINE (DIRECT IN-APP ACCESS)
   ========================================================================== */

// Internal state tracking for the active viewer session
let currentAdChapter = null;
let adCountdownTimer = null;
let isAdWatching = false;
let currentProNotesMode = 'pdf';
let activeProNotesChapter = null;

/**
 * Handle "Pro Notes" Button Click
 * Opens Pro Notes directly inside the app!
 * @param {Object} chapter 
 */
function handleProNotesClick(chapter) {
  if (!chapter) {
    chapter = getChapterById(currentStudySubjectId, currentStudyChapterId);
  }
  if (!chapter) {
    if (typeof showToast === 'function') {
      showToast('Please select a chapter first.', 'warning');
    }
    return;
  }
  activeProNotesChapter = chapter;
  openProNotesViewer(chapter);
}

/**
 * Starts the Pro Notes Ad Gate flow:
 * 1) Displays the clean loading interstitial ("Loading Pro Notes", "Please wait a moment")
 * 2) Transitions smoothly to the rewarded ad modal
 * @param {Object} chapter 
 */
function showProNotesAd(chapter) {
  currentAdChapter = chapter;
  resetAdGateState();

  const adModal = document.getElementById('ad-gate-modal');
  const loadingPhase = document.getElementById('ad-interstitial-loading');
  const rewardedPhase = document.getElementById('ad-rewarded-phase');

  if (!adModal) return;

  // Show Loading Interstitial phase first
  if (loadingPhase) loadingPhase.classList.remove('hidden');
  if (rewardedPhase) rewardedPhase.classList.add('hidden');
  adModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Smoothly transition from interstitial to rewarded ad card
  setTimeout(() => {
    if (loadingPhase) loadingPhase.classList.add('hidden');
    if (rewardedPhase) rewardedPhase.classList.remove('hidden');
  }, 400);
}

/**
 * Reset Ad Gate UI to initial un-watched state
 */
function resetAdGateState() {
  if (adCountdownTimer) {
    clearInterval(adCountdownTimer);
    adCountdownTimer = null;
  }
  isAdWatching = false;

  const watchBtn = document.getElementById('ad-watch-btn');
  const runningBtn = document.getElementById('ad-running-btn');
  const continueBtn = document.getElementById('ad-continue-btn');
  const progressWrapper = document.getElementById('ad-progress-wrapper');
  const progressFill = document.getElementById('ad-progress-fill');
  const countdownText = document.getElementById('ad-timer-countdown');
  const errorBox = document.getElementById('ad-error-container');

  if (watchBtn) watchBtn.classList.remove('hidden');
  if (runningBtn) runningBtn.classList.add('hidden');
  if (continueBtn) continueBtn.classList.add('hidden');
  if (progressWrapper) progressWrapper.classList.add('hidden');
  if (progressFill) progressFill.style.width = '0%';
  if (countdownText) countdownText.textContent = '5s';
  if (errorBox) errorBox.classList.add('hidden');
}

/**
 * User taps "Watch" button:
 * Starts the 5-second progress mock rewarded ad.
 */
function startRewardedAdWatch() {
  if (isAdWatching) return;
  isAdWatching = true;

  const watchBtn = document.getElementById('ad-watch-btn');
  const runningBtn = document.getElementById('ad-running-btn');
  const runningText = document.getElementById('ad-running-text');
  const progressWrapper = document.getElementById('ad-progress-wrapper');
  const progressFill = document.getElementById('ad-progress-fill');
  const countdownText = document.getElementById('ad-timer-countdown');

  if (watchBtn) watchBtn.classList.add('hidden');
  if (runningBtn) runningBtn.classList.remove('hidden');
  if (progressWrapper) progressWrapper.classList.remove('hidden');

  let secondsLeft = 5;
  if (countdownText) countdownText.textContent = `${secondsLeft}s`;
  if (runningText) runningText.textContent = `Playing Sponsor Message (${secondsLeft}s)...`;
  if (progressFill) progressFill.style.width = '0%';

  const startTime = Date.now();
  const totalDurationMs = 5000;

  adCountdownTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.min(100, Math.round((elapsed / totalDurationMs) * 100));
    const remaining = Math.max(0, Math.ceil((totalDurationMs - elapsed) / 1000));

    if (progressFill) progressFill.style.width = `${pct}%`;
    if (countdownText) countdownText.textContent = `${remaining}s`;
    if (runningText) runningText.textContent = `Playing Sponsor Message (${remaining}s)...`;

    if (elapsed >= totalDurationMs) {
      clearInterval(adCountdownTimer);
      adCountdownTimer = null;
      isAdWatching = false;

      // Ad completed: reveal Continue button
      if (runningBtn) runningBtn.classList.add('hidden');
      const continueBtn = document.getElementById('ad-continue-btn');
      if (continueBtn) continueBtn.classList.remove('hidden');
      if (countdownText) countdownText.textContent = 'Ready';
    }
  }, 100);
}

/**
 * Triggered when user taps the "Continue" button after ad finishes
 */
function onAdContinueClick() {
  onAdRewarded(currentAdChapter);
}

/**
 * --- REAL ADMOB REWARDED CALLBACK INTEGRATION POINT ---
 * This callback is invoked when the rewarded ad completes successfully.
 * Opens the Pro Notes viewer for the requested chapter.
 * @param {Object} chapter 
 */
function onAdRewarded(chapter) {
  closeAdGateModal();
  const targetChapter = chapter || currentAdChapter;
  openProNotesViewer(targetChapter);
}

/**
 * --- REAL ADMOB AD FAILED CALLBACK INTEGRATION POINT ---
 * Invoked if ad playback encounters an error or network drop.
 * Displays a non-blocking error container offering Retry or direct Soft Fallback.
 * @param {Object} chapter 
 * @param {string} [errorReason] 
 */
function onAdFailed(chapter, errorReason) {
  if (adCountdownTimer) {
    clearInterval(adCountdownTimer);
    adCountdownTimer = null;
  }
  isAdWatching = false;

  const errorBox = document.getElementById('ad-error-container');
  const watchBtn = document.getElementById('ad-watch-btn');
  const runningBtn = document.getElementById('ad-running-btn');

  if (watchBtn) watchBtn.classList.add('hidden');
  if (runningBtn) runningBtn.classList.add('hidden');
  if (errorBox) errorBox.classList.remove('hidden');

  console.warn('AdMob Rewarded Ad failed:', errorReason || 'Unknown error');
}

/**
 * Retry loading the ad
 */
function retryProNotesAd() {
  resetAdGateState();
}

/**
 * Soft fallback allowing user to access Pro Notes if an ad fails
 */
function softFallbackToProNotes() {
  onAdRewarded(currentAdChapter);
}

/**
 * Test Skip Simulation for fast review/development
 */
function simulateAdSkip() {
  if (adCountdownTimer) {
    clearInterval(adCountdownTimer);
    adCountdownTimer = null;
  }
  isAdWatching = false;
  onAdRewarded(currentAdChapter);
}

/**
 * Close Ad Gate Modal
 */
function closeAdGateModal() {
  if (adCountdownTimer) {
    clearInterval(adCountdownTimer);
    adCountdownTimer = null;
  }
  isAdWatching = false;

  const adModal = document.getElementById('ad-gate-modal');
  if (adModal) adModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

/**
 * Convert URL into an in-app embeddable PDF viewer URL
 * @param {string} url 
 * @returns {string}
 */
function formatPdfEmbedUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const u = url.trim();

  // Google Drive URL format conversion
  const driveMatch = u.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i) || u.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  // Base64 Data URL or Blob URL (can be embedded directly)
  if (u.startsWith('data:') || u.startsWith('blob:')) {
    return u;
  }

  // Standard web PDF: Use Google Docs Viewer to guarantee mobile/WebView in-app rendering
  return `https://docs.google.com/viewer?url=${encodeURIComponent(u)}&embedded=true`;
}

/**
 * Sync custom chapters from localStorage and Supabase into memory
 */
function syncCustomChaptersToMemory() {
  try {
    const raw = localStorage.getItem('nw_custom_chapters');
    if (!raw) return;
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) return;

    const allCatalogs = [
      typeof CLASS_9_SUBJECTS !== 'undefined' ? CLASS_9_SUBJECTS : [],
      typeof CLASS_10_SUBJECTS !== 'undefined' ? CLASS_10_SUBJECTS : [],
      typeof CLASS_11_SCIENCE_SUBJECTS !== 'undefined' ? CLASS_11_SCIENCE_SUBJECTS : [],
      typeof CLASS_11_COMMERCE_SUBJECTS !== 'undefined' ? CLASS_11_COMMERCE_SUBJECTS : [],
      typeof CLASS_11_ARTS_SUBJECTS !== 'undefined' ? CLASS_11_ARTS_SUBJECTS : [],
      typeof CLASS_12_SCIENCE_SUBJECTS !== 'undefined' ? CLASS_12_SCIENCE_SUBJECTS : [],
      typeof CLASS_12_COMMERCE_SUBJECTS !== 'undefined' ? CLASS_12_COMMERCE_SUBJECTS : [],
      typeof CLASS_12_ARTS_SUBJECTS !== 'undefined' ? CLASS_12_ARTS_SUBJECTS : []
    ];

    list.forEach(custom => {
      allCatalogs.forEach(cat => {
        cat.forEach(subj => {
          const matchSubj = (subj.name || '').toLowerCase().includes((custom.subject || '').toLowerCase()) ||
                            (custom.subject || '').toLowerCase().includes((subj.name || '').toLowerCase());
          if (matchSubj && subj.chapters) {
            const ch = subj.chapters.find(c => String(c.number) === String(custom.chapter_no) || c.id === custom.id);
            if (ch) {
              if (custom.pro_notes_url) ch.proNotesUrl = custom.pro_notes_url;
              if (custom.pro_notes_text) ch.proNotesText = custom.pro_notes_text;
              if (custom.title) ch.title = custom.title;
              if (custom.ebook_url) ch.ebookUrl = custom.ebook_url;
            }
          }
        });
      });
    });
  } catch (e) {
    console.warn('syncCustomChaptersToMemory note:', e);
  }
}

// Attach to window so admin.js can notify study on change
window.syncStudyWithCustomChapters = syncCustomChaptersToMemory;

/**
 * Render the Pro Notes body: ONLY the uploaded note in clean full screen.
 * Strictly no save, no download, no clutter.
 * @param {Object} chapter 
 */
function renderProNotesViewerBody(chapter) {
  const bodyEl = document.getElementById('pro-notes-viewer-body');
  if (!bodyEl) return;

  const rawPdfUrl = (chapter.proNotesUrl || chapter.pro_notes_url || '').trim();
  const customText = (chapter.proNotesText || chapter.pro_notes_text || '').trim();

  // If PDF was uploaded: show full-screen embedded PDF (no save button, no download button)
  if (rawPdfUrl) {
    const embedUrl = formatPdfEmbedUrl(rawPdfUrl);
    bodyEl.innerHTML = `
      <div class="pronotes-fullscreen-pdf-box">
        <iframe 
          src="${embedUrl}" 
          class="pronotes-fullscreen-iframe" 
          allowfullscreen 
          title="${chapter.title || 'Pro Notes'} PDF">
        </iframe>
      </div>
    `;
    return;
  }

  // If text note was uploaded: show clean full-screen reading text
  if (customText) {
    bodyEl.innerHTML = `
      <div class="pronotes-fullscreen-text-box">
        <div class="pronotes-text-content">
          ${escapeStudyHtml(customText)}
        </div>
      </div>
    `;
    return;
  }

  // If no note has been uploaded yet:
  bodyEl.innerHTML = `
    <div class="pronotes-fullscreen-empty-box">
      <div class="pronotes-empty-icon">
        <i class="fa-solid fa-file-circle-question"></i>
      </div>
      <h3 class="pronotes-empty-title">No Pro Notes Uploaded Yet</h3>
      <p class="pronotes-empty-desc">Pro Notes for <strong>${chapter.title || 'this chapter'}</strong> have not been uploaded by the admin yet.</p>
    </div>
  `;
}

/**
 * Open Pro Notes Viewer Screen:
 * Opens a clean dedicated full page displaying only the uploaded note in full screen (no save, no download).
 * @param {Object} chapter 
 */
function openProNotesViewer(chapter) {
  if (!chapter) {
    chapter = getChapterById(currentStudySubjectId, currentStudyChapterId);
  }
  if (!chapter) return;

  // Sync latest custom chapters from memory
  syncCustomChaptersToMemory();

  // Check if this chapter has custom local overrides
  try {
    const raw = localStorage.getItem('nw_custom_chapters');
    if (raw) {
      const customList = JSON.parse(raw);
      const match = customList.find(c => String(c.chapter_no) === String(chapter.number) || c.id === chapter.id);
      if (match) {
        if (match.pro_notes_url) chapter.proNotesUrl = match.pro_notes_url;
        if (match.pro_notes_text) chapter.proNotesText = match.pro_notes_text;
      }
    }
  } catch (e) {}

  activeProNotesChapter = chapter;

  const viewerModal = document.getElementById('pro-notes-viewer-modal');
  const titleEl = document.getElementById('pro-notes-viewer-title');
  const codeTag = document.getElementById('pro-notes-subject-code');

  if (!viewerModal) return;

  const subject = getSubjectById(currentStudySubjectId);
  const userClass = (typeof AppState !== 'undefined' && AppState.user && AppState.user.class)
    ? AppState.user.class
    : (typeof currentProfile !== 'undefined' && currentProfile?.class ? currentProfile.class : 'Class 10');

  if (titleEl) titleEl.textContent = chapter.title ? `${chapter.title} · Pro Notes` : 'Pro Notes';
  if (codeTag) {
    codeTag.textContent = subject ? `${subject.name} · Chapter ${chapter.number}` : `${userClass} · Chapter ${chapter.number}`;
  }

  // Render only the uploaded note in full screen
  renderProNotesViewerBody(chapter);

  viewerModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

/**
 * Close Pro Notes Viewer
 */
function closeProNotesViewer() {
  const viewerModal = document.getElementById('pro-notes-viewer-modal');
  if (viewerModal) viewerModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function escapeStudyHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Alias for backward compatibility
 */
function closeProNotesModal() {
  closeProNotesViewer();
}

/**
 * Navigation helpers within Study tab
 */
function backToSubjects() {
  showStudySubView('subjects');
}

function backToChapters() {
  if (currentStudySubjectId) {
    openSubjectChapters(currentStudySubjectId);
  } else {
    showStudySubView('subjects');
  }
}

/**
 * Switch sub-view within Study Tab: 'subjects' | 'chapters' | 'detail'
 * @param {'subjects' | 'chapters' | 'detail'} viewName 
 */
function showStudySubView(viewName) {
  const viewSubjects = document.getElementById('study-view-subjects');
  const viewChapters = document.getElementById('study-view-chapters');
  const viewDetail = document.getElementById('study-view-detail');

  if (viewSubjects) viewSubjects.classList.toggle('active', viewName === 'subjects');
  if (viewChapters) viewChapters.classList.toggle('active', viewName === 'chapters');
  if (viewDetail) viewDetail.classList.toggle('active', viewName === 'detail');

  // Scroll to top of content container
  const mainContent = document.querySelector('.main-content-area');
  if (mainContent) {
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
