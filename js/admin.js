/**
 * ==========================================================================
 * NOTES WALLAH — UNIFIED ADMIN PANEL CONTROLLER
 * ==========================================================================
 * Tables Managed:
 *  1) products (Shop Manager)
 *  2) chapters (Notes & Ebooks Manager)
 *  3) tests + questions (Test Manager)
 * Storage Buckets:
 *  - 'shop'  -> shop/products/{timestamp}-{random}.ext
 *  - 'notes' -> notes/pro/{timestamp}-{random}.pdf
 * Note: Ebook has NO file upload; link/URL only.
 * Client variable: window.sb ONLY (never name the client variable "supabase").
 */

// Admin State
let currentAdminView = 'admin-view-hub';
let adminActiveChapterClass = 'Class 10';
let adminActiveChapterStream = 'all';
let adminActiveChapterSubject = 'all';
let adminChaptersList = [];
let editingChapterId = null;

let adminActiveTestClass = 'Class 10';
let adminActiveTestSubject = 'all';
let adminTestsList = [];
let editingTestId = null;

let currentManagingTest = null;
let currentTestQuestions = [];
let editingQuestionId = null;

/**
 * Check if the user is an admin
 * Rule: profiles.is_admin === true (Guest is NEVER admin)
 */
function checkIsUserAdmin() {
  if (typeof AppState !== 'undefined' && AppState.isGuest) {
    return false;
  }

  const profile = (typeof currentProfile !== 'undefined' && currentProfile) 
    ? currentProfile 
    : ((typeof AppState !== 'undefined' && AppState.user) ? AppState.user : null);

  if (profile && profile.is_admin === true) {
    return true;
  }

  // Fallback check against known admin emails if profile flag not updated in local state yet
  const user = (typeof currentUser !== 'undefined' && currentUser) ? currentUser : null;
  const email = (profile?.email || user?.email || '').toLowerCase().trim();
  if (typeof ADMIN_EMAILS !== 'undefined' && ADMIN_EMAILS.includes(email)) {
    return true;
  }
  return false;
}

/**
 * Load total anonymous guest accounts count in Admin Hub (Rule 5)
 */
async function loadAdminGuestCount() {
  const el = document.getElementById('admin-guest-count-label');
  if (!el) return;

  try {
    if (window.sb) {
      const { data, error } = await window.sb
        .from('app_analytics')
        .select('counter_value')
        .eq('id', 'guest_accounts')
        .maybeSingle();

      if (!error && data && typeof data.counter_value !== 'undefined') {
        el.textContent = `${data.counter_value} Guest Accounts`;
        return;
      }
    }
  } catch (err) {
    console.warn('Notice loading guest count:', err);
  }
  el.textContent = 'Active Guest Mode Supported';
}

/**
 * Open the Unified Admin Panel
 * Entry point from Account menu item "Admin Panel"
 */
function openAdminPanel() {
  if (typeof AppState !== 'undefined' && AppState.isGuest) {
    if (typeof showToast === 'function') {
      showToast('Admin Panel is not available in Guest mode.', 'error');
    }
    return;
  }

  if (!checkIsUserAdmin()) {
    alert('Admin only');
    return;
  }

  showScreen('admin-screen');
  showAdminSubView('admin-view-hub');
  loadAdminGuestCount();
}

/**
 * Exit Admin Panel back to the student application
 */
function exitAdminPanel() {
  showScreen('main-app');
  switchNavTab('account');
}

/**
 * Open Shop Manager directly from Admin Panel
 */
function openShopManagerFromAdmin() {
  showScreen('main-app');
  if (typeof openShopAdminDashboard === 'function') {
    openShopAdminDashboard();
  } else {
    switchNavTab('shop');
  }
}

/**
 * Switch sub-views inside Admin
 * @param {string} viewId 
 */
function showAdminSubView(viewId) {
  currentAdminView = viewId;
  const views = document.querySelectorAll('.admin-view');
  views.forEach(v => {
    if (v.id === viewId) {
      v.classList.add('active');
    } else {
      v.classList.remove('active');
    }
  });

  const scrollContainer = document.getElementById('admin-body-scroll');
  if (scrollContainer) {
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Lazy load data for specific views
  if (viewId === 'admin-view-notes') {
    loadAdminChapters();
  } else if (viewId === 'admin-view-tests') {
    loadAdminTests();
  }
}

/* ==========================================================================
   STORAGE UPLOAD HELPERS
   shop  -> shop/products/{timestamp}-{random}.ext
   notes -> notes/pro/{timestamp}-{random}.pdf
   ========================================================================== */

/**
 * Upload helper for Pro Notes PDF into bucket 'notes'
 * @param {File} file
 * @returns {Promise<string>} publicUrl
 */
async function uploadProNotesPdfToSupabase(file) {
  if (!window.sb || !window.sb.storage) {
    throw new Error('Supabase client not initialized');
  }

  const ext = (file.name.split('.').pop() || 'pdf').toLowerCase();
  const filePath = `notes/pro/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

  const { data, error } = await window.sb.storage
    .from('notes')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'application/pdf'
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = window.sb.storage
    .from('notes')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/* ==========================================================================
   SECTION 2: NOTES & EBOOKS MANAGER (Table: chapters)
   ========================================================================== */

/**
 * Fetch chapters from Supabase
 */
async function loadAdminChapters() {
  const container = document.getElementById('admin-chapters-list');
  if (container) {
    container.innerHTML = `
      <div style="text-align:center; padding: 30px; color: var(--text-secondary);">
        <i class="fa-solid fa-spinner fa-spin" style="font-size:24px; color:var(--primary-blue);"></i>
        <p style="margin-top:8px; font-size:13px;">Loading chapters from Supabase...</p>
      </div>
    `;
  }

  try {
    if (window.sb) {
      let query = window.sb.from('chapters').select('*').order('chapter_no', { ascending: true });

      if (adminActiveChapterClass && adminActiveChapterClass !== 'all') {
        query = query.eq('class', adminActiveChapterClass);
      }
      if (adminActiveChapterStream && adminActiveChapterStream !== 'all') {
        query = query.eq('stream', adminActiveChapterStream);
      }
      if (adminActiveChapterSubject && adminActiveChapterSubject !== 'all') {
        query = query.ilike('subject', `%${adminActiveChapterSubject}%`);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data)) {
        adminChaptersList = data;
        renderAdminChaptersList();
        return;
      } else if (error) {
        console.warn('Chapters query note:', error.message);
      }
    }
  } catch (err) {
    console.warn('loadAdminChapters error:', err);
  }

  // Fallback to sample data if table doesn't exist yet or connection empty
  if (typeof CHAPTERS_DATA !== 'undefined' && (!adminChaptersList || adminChaptersList.length === 0)) {
    const rawClass = adminActiveChapterClass.toLowerCase().replace(/\s+/g, '');
    const classData = CHAPTERS_DATA[rawClass] || CHAPTERS_DATA['class10'] || {};
    const list = [];
    Object.keys(classData).forEach(subjKey => {
      const subj = classData[subjKey];
      if (subj && subj.chapters) {
        subj.chapters.forEach(ch => {
          list.push({
            id: ch.id,
            class: adminActiveChapterClass,
            stream: (adminActiveChapterClass.includes('11') || adminActiveChapterClass.includes('12')) ? 'Science' : '',
            subject: subj.name,
            chapter_no: ch.number,
            title: ch.title,
            ebook_url: ch.ebookUrl || '',
            pro_notes_url: ch.proNotesUrl || '',
            pro_notes_text: ch.description || '',
            is_active: true
          });
        });
      }
    });
    adminChaptersList = list;
  }

  renderAdminChaptersList();
}

/**
 * Filter chapters by Class, Stream, Subject
 */
function handleChapterFilterChange() {
  const classSelect = document.getElementById('admin-chap-filter-class');
  const streamSelect = document.getElementById('admin-chap-filter-stream');
  const subjectInput = document.getElementById('admin-chap-filter-subject');
  const streamGroup = document.getElementById('admin-chap-stream-filter-group');

  if (classSelect) {
    adminActiveChapterClass = classSelect.value;
    const isSenior = adminActiveChapterClass.includes('11') || adminActiveChapterClass.includes('12');
    if (streamGroup) {
      if (isSenior) {
        streamGroup.classList.remove('hidden');
      } else {
        streamGroup.classList.add('hidden');
        adminActiveChapterStream = 'all';
        if (streamSelect) streamSelect.value = 'all';
      }
    }
  }

  if (streamSelect && streamGroup && !streamGroup.classList.contains('hidden')) {
    adminActiveChapterStream = streamSelect.value;
  }

  if (subjectInput) {
    adminActiveChapterSubject = subjectInput.value.trim() || 'all';
  }

  loadAdminChapters();
}

/**
 * Render chapters list in Admin
 */
function renderAdminChaptersList() {
  const container = document.getElementById('admin-chapters-list');
  const countEl = document.getElementById('admin-chapters-count-badge');
  if (!container) return;

  if (countEl) countEl.textContent = `${adminChaptersList.length} Chapters`;

  if (adminChaptersList.length === 0) {
    container.innerHTML = `
      <div class="admin-empty-state">
        <div class="admin-empty-icon"><i class="fa-solid fa-book-open"></i></div>
        <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">No Chapters Found</h4>
        <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 12px;">Add a new chapter for this class and subject syllabus.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="openAddChapterForm()" style="display:inline-flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-plus"></i> Add First Chapter
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = adminChaptersList.map(item => {
    const streamPill = item.stream ? `<span class="admin-item-pill purple">${item.stream}</span>` : '';
    const activePill = item.is_active !== false 
      ? `<span class="admin-item-pill green">Active</span>` 
      : `<span class="admin-item-pill inactive">Inactive</span>`;

    const ebookPill = item.ebook_url 
      ? `<span class="admin-item-pill blue"><i class="fa-solid fa-link"></i> Ebook Link</span>` 
      : '';
    const proPill = item.pro_notes_url 
      ? `<span class="admin-item-pill green"><i class="fa-solid fa-file-pdf"></i> Pro PDF</span>` 
      : '';

    return `
      <div class="admin-item-card">
        <div class="admin-item-header">
          <div style="flex:1; min-width:0;">
            <div class="admin-item-meta">
              <span class="admin-item-pill blue">${item.class || 'Class 10'}</span>
              ${streamPill}
              <span class="admin-item-pill">${item.subject || 'General'}</span>
              <span class="admin-item-pill">Ch. ${item.chapter_no || 1}</span>
              ${activePill}
            </div>
            <h4 class="admin-item-title">${escapeAdminHtml(item.title || 'Untitled Chapter')}</h4>
            <div style="display:flex; gap:6px; margin-top:4px;">
              ${ebookPill}
              ${proPill}
            </div>
          </div>
        </div>

        <div class="admin-item-actions">
          <button type="button" class="btn-admin-action" onclick="openEditChapterForm('${item.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button type="button" class="btn-admin-action" onclick="toggleChapterActive('${item.id}', ${item.is_active !== false})">
            <i class="fa-solid ${item.is_active !== false ? 'fa-eye-slash' : 'fa-eye'}"></i> 
            ${item.is_active !== false ? 'Deactivate' : 'Activate'}
          </button>
          ${item.ebook_url ? `
            <a href="${item.ebook_url}" target="_blank" rel="noopener noreferrer" class="btn-admin-action" title="Test Ebook Link">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Read
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Open Form to Add Chapter
 */
function openAddChapterForm() {
  editingChapterId = null;
  const form = document.getElementById('admin-chapter-form');
  if (form) form.reset();

  const titleEl = document.getElementById('admin-chap-form-header-title');
  if (titleEl) titleEl.textContent = 'Add Chapter / Ebook';

  const classSelect = document.getElementById('chap-form-class');
  if (classSelect) {
    classSelect.value = adminActiveChapterClass || 'Class 10';
    handleChapFormClassChange(classSelect.value);
  }

  const deleteBtn = document.getElementById('chap-form-delete-btn');
  if (deleteBtn) deleteBtn.classList.add('hidden');

  showAdminSubView('admin-view-chapter-form');
}

/**
 * Open Form to Edit Chapter
 */
function openEditChapterForm(chapterId) {
  const item = adminChaptersList.find(c => String(c.id) === String(chapterId));
  if (!item) return;

  editingChapterId = item.id;
  const titleEl = document.getElementById('admin-chap-form-header-title');
  if (titleEl) titleEl.textContent = 'Edit Chapter';

  document.getElementById('chap-form-class').value = item.class || 'Class 10';
  handleChapFormClassChange(item.class || 'Class 10');

  if (item.stream) {
    const streamSelect = document.getElementById('chap-form-stream');
    if (streamSelect) streamSelect.value = item.stream;
  }

  document.getElementById('chap-form-subject').value = item.subject || '';
  document.getElementById('chap-form-no').value = item.chapter_no || 1;
  document.getElementById('chap-form-title').value = item.title || '';
  document.getElementById('chap-form-ebook-url').value = item.ebook_url || '';
  document.getElementById('chap-form-pro-notes-url').value = item.pro_notes_url || '';
  document.getElementById('chap-form-pro-text').value = item.pro_notes_text || '';
  document.getElementById('chap-form-active').checked = item.is_active !== false;

  const deleteBtn = document.getElementById('chap-form-delete-btn');
  if (deleteBtn) deleteBtn.classList.remove('hidden');

  showAdminSubView('admin-view-chapter-form');
}

/**
 * Handle conditional stream display in Chapter form
 */
function handleChapFormClassChange(val) {
  const isSenior = val.includes('11') || val.includes('12');
  const streamGroup = document.getElementById('chap-form-stream-group');
  const streamSelect = document.getElementById('chap-form-stream');

  if (streamGroup) {
    if (isSenior) {
      streamGroup.classList.remove('hidden');
      if (streamSelect) streamSelect.required = true;
    } else {
      streamGroup.classList.add('hidden');
      if (streamSelect) {
        streamSelect.required = false;
        streamSelect.value = '';
      }
    }
  }
}

/**
 * Upload Pro Notes PDF to Storage bucket "notes"
 */
async function handleProNotesPdfFileChange(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const statusBox = document.getElementById('chap-pro-pdf-status');
  if (statusBox) {
    statusBox.className = 'upload-status-box loading';
    statusBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading PDF to notes bucket...';
    statusBox.classList.remove('hidden');
  }

  try {
    const publicUrl = await uploadProNotesPdfToSupabase(file);
    const urlInput = document.getElementById('chap-form-pro-notes-url');
    if (urlInput) urlInput.value = publicUrl;

    if (statusBox) {
      statusBox.className = 'upload-status-box success';
      statusBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> PDF uploaded to notes bucket!';
    }
    if (typeof showToast === 'function') {
      showToast('Pro Notes PDF uploaded successfully!', 'success');
    }
  } catch (err) {
    console.error('Pro Notes PDF upload failed:', err);
    if (statusBox) {
      statusBox.className = 'upload-status-box';
      statusBox.style.color = '#EF4444';
      statusBox.style.background = 'rgba(239, 68, 68, 0.1)';
      statusBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Upload failed: ${err.message || 'Error'}`;
    }
    alert('Upload failed: ' + (err.message || 'Please verify Supabase bucket "notes" is public.'));
  }
}

/**
 * Handle Chapter Form Save
 */
async function handleSaveChapter(event) {
  event.preventDefault();
  if (!checkIsUserAdmin()) {
    alert('Admin only');
    return;
  }

  const cls = document.getElementById('chap-form-class').value;
  const isSenior = cls.includes('11') || cls.includes('12');
  const stream = isSenior ? document.getElementById('chap-form-stream').value : '';
  const subject = document.getElementById('chap-form-subject').value.trim();
  const chapterNo = parseInt(document.getElementById('chap-form-no').value, 10) || 1;
  const title = document.getElementById('chap-form-title').value.trim();
  const ebookUrl = document.getElementById('chap-form-ebook-url').value.trim();
  const proNotesUrl = document.getElementById('chap-form-pro-notes-url').value.trim();
  const proNotesText = document.getElementById('chap-form-pro-text').value.trim();
  const isActive = document.getElementById('chap-form-active').checked;

  if (!title) {
    alert('Chapter Title is required');
    return;
  }

  const submitBtn = document.getElementById('chap-form-submit-btn');
  const originalHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving to Supabase...';

  const record = {
    class: cls,
    stream: stream,
    subject: subject,
    chapter_no: chapterNo,
    title: title,
    ebook_url: ebookUrl,
    pro_notes_url: proNotesUrl,
    pro_notes_text: proNotesText,
    is_active: isActive
  };

  try {
    if (window.sb) {
      if (editingChapterId) {
        const { error } = await window.sb
          .from('chapters')
          .update(record)
          .eq('id', editingChapterId);

        if (error) throw error;
      } else {
        const { error } = await window.sb
          .from('chapters')
          .insert([record]);

        if (error) throw error;
      }
    }

    if (typeof showToast === 'function') {
      showToast(editingChapterId ? 'Chapter updated successfully!' : 'Chapter added successfully!', 'success');
    }
    showAdminSubView('admin-view-notes');
  } catch (err) {
    console.error('Save chapter failed:', err);
    alert('Error saving chapter: ' + (err.message || 'Check database permissions'));
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;
  }
}

/**
 * Toggle chapter is_active flag
 */
async function toggleChapterActive(chapterId, currentlyActive) {
  if (!checkIsUserAdmin()) {
    alert('Admin only');
    return;
  }

  try {
    if (window.sb) {
      const { error } = await window.sb
        .from('chapters')
        .update({ is_active: !currentlyActive })
        .eq('id', chapterId);
      if (error) throw error;
    }

    const item = adminChaptersList.find(c => String(c.id) === String(chapterId));
    if (item) item.is_active = !currentlyActive;
    renderAdminChaptersList();
    if (typeof showToast === 'function') {
      showToast(`Chapter ${!currentlyActive ? 'activated' : 'deactivated'}`, 'info');
    }
  } catch (err) {
    alert('Could not update status: ' + err.message);
  }
}

/**
 * Delete Chapter
 */
async function handleDeleteChapter() {
  if (!editingChapterId) return;
  if (!confirm('Are you sure you want to delete this chapter? This action cannot be undone.')) return;

  try {
    if (window.sb) {
      const { error } = await window.sb
        .from('chapters')
        .delete()
        .eq('id', editingChapterId);
      if (error) throw error;
    }

    adminChaptersList = adminChaptersList.filter(c => String(c.id) !== String(editingChapterId));
    if (typeof showToast === 'function') {
      showToast('Chapter deleted', 'info');
    }
    showAdminSubView('admin-view-notes');
  } catch (err) {
    alert('Delete failed: ' + err.message);
  }
}

/* ==========================================================================
   SECTION 3: TEST MANAGER (Tables: tests + questions)
   ========================================================================== */

/**
 * Load tests from Supabase
 */
async function loadAdminTests() {
  const container = document.getElementById('admin-tests-list');
  if (container) {
    container.innerHTML = `
      <div style="text-align:center; padding: 30px; color: var(--text-secondary);">
        <i class="fa-solid fa-spinner fa-spin" style="font-size:24px; color:var(--primary-blue);"></i>
        <p style="margin-top:8px; font-size:13px;">Loading mock tests...</p>
      </div>
    `;
  }

  try {
    if (window.sb) {
      let query = window.sb.from('tests').select('*').order('created_at', { ascending: false });

      if (adminActiveTestClass && adminActiveTestClass !== 'all') {
        query = query.eq('class', adminActiveTestClass);
      }
      if (adminActiveTestSubject && adminActiveTestSubject !== 'all') {
        query = query.ilike('subject', `%${adminActiveTestSubject}%`);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data)) {
        adminTestsList = data;
        renderAdminTestsList();
        return;
      } else if (error) {
        console.warn('Tests query note:', error.message);
      }
    }
  } catch (err) {
    console.warn('loadAdminTests error:', err);
  }

  // Fallback to TEST_BANK if available
  if (typeof TEST_BANK !== 'undefined' && (!adminTestsList || adminTestsList.length === 0)) {
    adminTestsList = TEST_BANK.map(t => ({
      id: t.id,
      class: 'Class 10',
      stream: '',
      subject: t.subject,
      title: t.title,
      duration_min: t.durationMin || 15,
      is_active: true
    }));
  }

  renderAdminTestsList();
}

/**
 * Filter tests
 */
function handleTestFilterChange() {
  const classSelect = document.getElementById('admin-test-filter-class');
  const subjectInput = document.getElementById('admin-test-filter-subject');

  if (classSelect) adminActiveTestClass = classSelect.value;
  if (subjectInput) adminActiveTestSubject = subjectInput.value.trim() || 'all';

  loadAdminTests();
}

/**
 * Render Tests list in Admin
 */
function renderAdminTestsList() {
  const container = document.getElementById('admin-tests-list');
  const countEl = document.getElementById('admin-tests-count-badge');
  if (!container) return;

  if (countEl) countEl.textContent = `${adminTestsList.length} Tests`;

  if (adminTestsList.length === 0) {
    container.innerHTML = `
      <div class="admin-empty-state">
        <div class="admin-empty-icon"><i class="fa-solid fa-clipboard-check"></i></div>
        <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">No Tests Found</h4>
        <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 12px;">Create a new mock test and add MCQ questions.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="openAddTestForm()" style="display:inline-flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-plus"></i> Create First Test
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = adminTestsList.map(item => {
    const streamPill = item.stream ? `<span class="admin-item-pill purple">${item.stream}</span>` : '';
    const activePill = item.is_active !== false 
      ? `<span class="admin-item-pill green">Active</span>` 
      : `<span class="admin-item-pill inactive">Inactive</span>`;

    return `
      <div class="admin-item-card">
        <div class="admin-item-header">
          <div style="flex:1; min-width:0;">
            <div class="admin-item-meta">
              <span class="admin-item-pill blue">${item.class || 'Class 10'}</span>
              ${streamPill}
              <span class="admin-item-pill">${item.subject || 'General'}</span>
              <span class="admin-item-pill"><i class="fa-regular fa-clock"></i> ${item.duration_min || 15} min</span>
              ${activePill}
            </div>
            <h4 class="admin-item-title">${escapeAdminHtml(item.title || 'Mock Test')}</h4>
          </div>
        </div>

        <div class="admin-item-actions">
          <button type="button" class="btn-admin-action primary" onclick="manageTestQuestions('${item.id}')">
            <i class="fa-solid fa-list-check"></i> Manage Questions
          </button>
          <button type="button" class="btn-admin-action" onclick="openEditTestForm('${item.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Edit
          </button>
          <button type="button" class="btn-admin-action" onclick="toggleTestActive('${item.id}', ${item.is_active !== false})">
            <i class="fa-solid ${item.is_active !== false ? 'fa-eye-slash' : 'fa-eye'}"></i> 
            ${item.is_active !== false ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Open Form to Create Test
 */
function openAddTestForm() {
  editingTestId = null;
  const form = document.getElementById('admin-test-form');
  if (form) form.reset();

  const titleEl = document.getElementById('admin-test-form-header-title');
  if (titleEl) titleEl.textContent = 'Create New Test';

  const classSelect = document.getElementById('test-form-class');
  if (classSelect) {
    classSelect.value = adminActiveTestClass || 'Class 10';
    handleTestFormClassChange(classSelect.value);
  }

  const deleteBtn = document.getElementById('test-form-delete-btn');
  if (deleteBtn) deleteBtn.classList.add('hidden');

  showAdminSubView('admin-view-test-form');
}

/**
 * Open Form to Edit Test
 */
function openEditTestForm(testId) {
  const item = adminTestsList.find(t => String(t.id) === String(testId));
  if (!item) return;

  editingTestId = item.id;
  const titleEl = document.getElementById('admin-test-form-header-title');
  if (titleEl) titleEl.textContent = 'Edit Test Details';

  document.getElementById('test-form-class').value = item.class || 'Class 10';
  handleTestFormClassChange(item.class || 'Class 10');

  if (item.stream) {
    const streamSelect = document.getElementById('test-form-stream');
    if (streamSelect) streamSelect.value = item.stream;
  }

  document.getElementById('test-form-subject').value = item.subject || '';
  document.getElementById('test-form-title').value = item.title || '';
  document.getElementById('test-form-duration').value = item.duration_min || 15;
  document.getElementById('test-form-active').checked = item.is_active !== false;

  const deleteBtn = document.getElementById('test-form-delete-btn');
  if (deleteBtn) deleteBtn.classList.remove('hidden');

  showAdminSubView('admin-view-test-form');
}

function handleTestFormClassChange(val) {
  const isSenior = val.includes('11') || val.includes('12');
  const streamGroup = document.getElementById('test-form-stream-group');
  if (streamGroup) {
    if (isSenior) streamGroup.classList.remove('hidden');
    else streamGroup.classList.add('hidden');
  }
}

/**
 * Handle Test Save
 */
async function handleSaveTest(event) {
  event.preventDefault();
  if (!checkIsUserAdmin()) {
    alert('Admin only');
    return;
  }

  const cls = document.getElementById('test-form-class').value;
  const isSenior = cls.includes('11') || cls.includes('12');
  const stream = isSenior ? document.getElementById('test-form-stream').value : '';
  const subject = document.getElementById('test-form-subject').value.trim();
  const title = document.getElementById('test-form-title').value.trim();
  const duration = parseInt(document.getElementById('test-form-duration').value, 10) || 15;
  const isActive = document.getElementById('test-form-active').checked;

  if (!title) {
    alert('Test title is required');
    return;
  }

  const submitBtn = document.getElementById('test-form-submit-btn');
  const originalHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

  const record = {
    class: cls,
    stream: stream,
    subject: subject,
    title: title,
    duration_min: duration,
    is_active: isActive
  };

  try {
    if (window.sb) {
      if (editingTestId) {
        const { error } = await window.sb
          .from('tests')
          .update(record)
          .eq('id', editingTestId);
        if (error) throw error;
      } else {
        const { error } = await window.sb
          .from('tests')
          .insert([record]);
        if (error) throw error;
      }
    }

    if (typeof showToast === 'function') {
      showToast('Test saved successfully!', 'success');
    }
    showAdminSubView('admin-view-tests');
  } catch (err) {
    console.error('Save test error:', err);
    alert('Error saving test: ' + err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;
  }
}

/**
 * Toggle Test is_active
 */
async function toggleTestActive(testId, currentlyActive) {
  if (!checkIsUserAdmin()) {
    alert('Admin only');
    return;
  }

  try {
    if (window.sb) {
      const { error } = await window.sb
        .from('tests')
        .update({ is_active: !currentlyActive })
        .eq('id', testId);
      if (error) throw error;
    }

    const item = adminTestsList.find(t => String(t.id) === String(testId));
    if (item) item.is_active = !currentlyActive;
    renderAdminTestsList();
    if (typeof showToast === 'function') {
      showToast(`Test ${!currentlyActive ? 'activated' : 'deactivated'}`, 'info');
    }
  } catch (err) {
    alert('Could not update status: ' + err.message);
  }
}

/**
 * Delete Test
 */
async function handleDeleteTest() {
  if (!editingTestId) return;
  if (!confirm('Are you sure you want to delete this test and its questions?')) return;

  try {
    if (window.sb) {
      // First delete associated questions
      await window.sb.from('questions').delete().eq('test_id', editingTestId);
      const { error } = await window.sb.from('tests').delete().eq('id', editingTestId);
      if (error) throw error;
    }

    adminTestsList = adminTestsList.filter(t => String(t.id) !== String(editingTestId));
    if (typeof showToast === 'function') {
      showToast('Test deleted', 'info');
    }
    showAdminSubView('admin-view-tests');
  } catch (err) {
    alert('Delete test failed: ' + err.message);
  }
}

/* ==========================================================================
   SECTION 3.2: QUESTIONS MANAGER FOR A TEST
   Table: questions
   Fields: test_id, question_text, option_a, option_b, option_c, option_d,
           correct_option (A|B|C|D), sort_order
   ========================================================================== */

/**
 * Open questions manager for a test
 */
async function manageTestQuestions(testId) {
  const test = adminTestsList.find(t => String(t.id) === String(testId));
  currentManagingTest = test || { id: testId, title: 'Mock Test' };

  const testTitleEl = document.getElementById('admin-questions-test-title');
  if (testTitleEl) testTitleEl.textContent = currentManagingTest.title;

  showAdminSubView('admin-view-questions');
  await loadTestQuestions(testId);
}

/**
 * Load questions for current test
 */
async function loadTestQuestions(testId) {
  const container = document.getElementById('admin-questions-list');
  if (container) {
    container.innerHTML = `
      <div style="text-align:center; padding: 24px; color: var(--text-secondary);">
        <i class="fa-solid fa-spinner fa-spin" style="font-size:22px; color:var(--primary-blue);"></i>
        <p style="margin-top:8px; font-size:13px;">Loading questions...</p>
      </div>
    `;
  }

  try {
    if (window.sb) {
      const { data, error } = await window.sb
        .from('questions')
        .select('*')
        .eq('test_id', testId)
        .order('sort_order', { ascending: true });

      if (!error && Array.isArray(data)) {
        currentTestQuestions = data;
        renderTestQuestionsList();
        return;
      }
    }
  } catch (err) {
    console.warn('loadTestQuestions error:', err);
  }

  // Fallback to sample bank if matching test id in TEST_BANK
  if (typeof TEST_BANK !== 'undefined') {
    const sample = TEST_BANK.find(t => String(t.id) === String(testId));
    if (sample && sample.questions) {
      currentTestQuestions = sample.questions.map((q, idx) => ({
        id: 'q_' + idx,
        test_id: testId,
        question_text: q.text,
        option_a: q.options[0] || '',
        option_b: q.options[1] || '',
        option_c: q.options[2] || '',
        option_d: q.options[3] || '',
        correct_option: ['A', 'B', 'C', 'D'][q.correctIndex || 0],
        sort_order: idx + 1
      }));
    } else {
      currentTestQuestions = [];
    }
  }

  renderTestQuestionsList();
}

/**
 * Render question cards
 */
function renderTestQuestionsList() {
  const container = document.getElementById('admin-questions-list');
  const countEl = document.getElementById('admin-questions-count-badge');
  if (!container) return;

  if (countEl) countEl.textContent = `${currentTestQuestions.length} Questions`;

  if (currentTestQuestions.length === 0) {
    container.innerHTML = `
      <div class="admin-empty-state">
        <div class="admin-empty-icon"><i class="fa-solid fa-circle-question"></i></div>
        <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">No Questions Added Yet</h4>
        <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 12px;">Add multiple choice text questions (Option A, B, C, D) for this test.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="openAddQuestionForm()" style="display:inline-flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-plus"></i> Add First Question
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = currentTestQuestions.map((q, idx) => {
    return `
      <div class="admin-question-card">
        <div class="admin-q-header">
          <span class="admin-q-badge">Question ${idx + 1}</span>
          <div style="display:flex; gap:6px;">
            <button type="button" class="btn-icon-admin" onclick="openEditQuestionForm('${q.id}')" title="Edit Question">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="btn-icon-admin text-danger" onclick="deleteQuestion('${q.id}')" title="Delete Question">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="admin-q-text">${escapeAdminHtml(q.question_text || '')}</div>

        <div class="admin-q-options">
          <div class="admin-q-opt ${q.correct_option === 'A' ? 'correct' : ''}">
            <strong>A:</strong> <span>${escapeAdminHtml(q.option_a || '')}</span>
            ${q.correct_option === 'A' ? '<i class="fa-solid fa-circle-check" style="margin-left:auto;"></i>' : ''}
          </div>
          <div class="admin-q-opt ${q.correct_option === 'B' ? 'correct' : ''}">
            <strong>B:</strong> <span>${escapeAdminHtml(q.option_b || '')}</span>
            ${q.correct_option === 'B' ? '<i class="fa-solid fa-circle-check" style="margin-left:auto;"></i>' : ''}
          </div>
          <div class="admin-q-opt ${q.correct_option === 'C' ? 'correct' : ''}">
            <strong>C:</strong> <span>${escapeAdminHtml(q.option_c || '')}</span>
            ${q.correct_option === 'C' ? '<i class="fa-solid fa-circle-check" style="margin-left:auto;"></i>' : ''}
          </div>
          <div class="admin-q-opt ${q.correct_option === 'D' ? 'correct' : ''}">
            <strong>D:</strong> <span>${escapeAdminHtml(q.option_d || '')}</span>
            ${q.correct_option === 'D' ? '<i class="fa-solid fa-circle-check" style="margin-left:auto;"></i>' : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Open Form to Add Question
 */
function openAddQuestionForm() {
  editingQuestionId = null;
  const form = document.getElementById('admin-question-form');
  if (form) form.reset();

  const titleEl = document.getElementById('admin-q-form-title');
  if (titleEl) titleEl.textContent = 'Add Question';

  const orderInput = document.getElementById('q-form-order');
  if (orderInput) orderInput.value = currentTestQuestions.length + 1;

  showAdminSubView('admin-view-question-form');
}

/**
 * Open Form to Edit Question
 */
function openEditQuestionForm(qId) {
  const q = currentTestQuestions.find(item => String(item.id) === String(qId));
  if (!q) return;

  editingQuestionId = q.id;
  const titleEl = document.getElementById('admin-q-form-title');
  if (titleEl) titleEl.textContent = 'Edit Question';

  document.getElementById('q-form-text').value = q.question_text || '';
  document.getElementById('q-form-opt-a').value = q.option_a || '';
  document.getElementById('q-form-opt-b').value = q.option_b || '';
  document.getElementById('q-form-opt-c').value = q.option_c || '';
  document.getElementById('q-form-opt-d').value = q.option_d || '';
  document.getElementById('q-form-correct').value = q.correct_option || 'A';
  document.getElementById('q-form-order').value = q.sort_order || 1;

  showAdminSubView('admin-view-question-form');
}

/**
 * Save Question to Supabase
 */
async function handleSaveQuestion(event) {
  event.preventDefault();
  if (!checkIsUserAdmin()) {
    alert('Admin only');
    return;
  }
  if (!currentManagingTest || !currentManagingTest.id) {
    alert('No active test selected');
    return;
  }

  const qText = document.getElementById('q-form-text').value.trim();
  const optA = document.getElementById('q-form-opt-a').value.trim();
  const optB = document.getElementById('q-form-opt-b').value.trim();
  const optC = document.getElementById('q-form-opt-c').value.trim();
  const optD = document.getElementById('q-form-opt-d').value.trim();
  const correct = document.getElementById('q-form-correct').value;
  const sortOrder = parseInt(document.getElementById('q-form-order').value, 10) || 1;

  if (!qText || !optA || !optB) {
    alert('Please fill question text and at least Options A and B.');
    return;
  }

  const submitBtn = document.getElementById('q-form-submit-btn');
  const originalHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

  const record = {
    test_id: currentManagingTest.id,
    question_text: qText,
    option_a: optA,
    option_b: optB,
    option_c: optC,
    option_d: optD,
    correct_option: correct,
    sort_order: sortOrder
  };

  try {
    if (window.sb) {
      if (editingQuestionId) {
        const { error } = await window.sb
          .from('questions')
          .update(record)
          .eq('id', editingQuestionId);
        if (error) throw error;
      } else {
        const { error } = await window.sb
          .from('questions')
          .insert([record]);
        if (error) throw error;
      }
    }

    if (typeof showToast === 'function') {
      showToast('Question saved successfully!', 'success');
    }
    showAdminSubView('admin-view-questions');
    await loadTestQuestions(currentManagingTest.id);
  } catch (err) {
    console.error('Save question error:', err);
    alert('Error saving question: ' + err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;
  }
}

/**
 * Delete Question
 */
async function deleteQuestion(qId) {
  if (!confirm('Are you sure you want to delete this question?')) return;

  try {
    if (window.sb) {
      const { error } = await window.sb
        .from('questions')
        .delete()
        .eq('id', qId);
      if (error) throw error;
    }

    currentTestQuestions = currentTestQuestions.filter(q => String(q.id) !== String(qId));
    renderTestQuestionsList();
    if (typeof showToast === 'function') {
      showToast('Question deleted', 'info');
    }
  } catch (err) {
    alert('Delete question failed: ' + err.message);
  }
}

/**
 * HTML Escaping helper to prevent injection
 */
function escapeAdminHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   BULK QUESTION IMPORTER LOGIC
   ========================================================================== */

let parsedBulkQuestions = [];
let bulkDebounceTimer = null;

/**
 * Open Bulk Questions Import Form
 */
function openBulkQuestionsForm() {
  if (!checkIsUserAdmin()) {
    alert('Access restricted to administrators.');
    return;
  }
  if (!currentManagingTest || !currentManagingTest.id) {
    alert('Please select a mock test first.');
    return;
  }

  const titleEl = document.getElementById('admin-bulk-test-title');
  if (titleEl) {
    titleEl.textContent = `${currentManagingTest.title} (${currentManagingTest.class || ''})`;
  }

  parsedBulkQuestions = [];
  const previewContainer = document.getElementById('admin-bulk-preview-container');
  if (previewContainer) previewContainer.innerHTML = '';

  const saveBtn = document.getElementById('btn-save-bulk-questions');
  if (saveBtn) saveBtn.disabled = true;
  const saveBtnText = document.getElementById('bulk-save-btn-text');
  if (saveBtnText) saveBtnText.textContent = 'Import Questions (0)';

  showAdminSubView('admin-view-bulk-questions');
}

/**
 * Debounced auto-parse as user types/pastes
 */
function handleBulkInputDebounced() {
  clearTimeout(bulkDebounceTimer);
  bulkDebounceTimer = setTimeout(() => {
    parseBulkQuestionsInput(false);
  }, 600);
}

/**
 * Clear the input textarea
 */
function clearBulkInput() {
  const inputEl = document.getElementById('admin-bulk-questions-input');
  if (inputEl) inputEl.value = '';
  parsedBulkQuestions = [];
  renderBulkQuestionsPreview();
}

/**
 * Load realistic sample template for demonstration
 */
function loadBulkSampleTemplate() {
  const sample = `Q1: What is the SI unit of electric potential difference?
A) Ampere
B) Volt
C) Ohm
D) Joule
Ans: B

Q2: Which acid is naturally present in curd/yogurt?
A) Citric acid
B) Acetic acid
C) Lactic acid
D) Tartaric acid
Ans: C

Q3: Which part of the human brain controls involuntary actions like breathing and heartbeat?
A) Cerebrum
B) Cerebellum
C) Medulla Oblongata
D) Hypothalamus
Ans: C

Q4: If the focal length of a spherical mirror is 20 cm, its radius of curvature will be:
A) 10 cm
B) 20 cm
C) 40 cm
D) 80 cm
Ans: C

Q5: In which year did the French Revolution begin?
A) 1789
B) 1799
C) 1776
D) 1804
Ans: A`;

  const inputEl = document.getElementById('admin-bulk-questions-input');
  if (inputEl) {
    inputEl.value = sample;
    parseBulkQuestionsInput(true);
  }
}

/**
 * Copy AI prompt ready to paste into ChatGPT or Gemini
 */
function copyAIPromptTemplate() {
  const subjectName = currentManagingTest ? currentManagingTest.subject_name || currentManagingTest.title : 'Science';
  const prompt = `Act as an expert high school teacher for CBSE NCERT. 
Generate 20 multiple choice questions (MCQs) for "${subjectName}" in this EXACT format without bold markdown or conversational text:

Q1: [Question text]
A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]
Ans: [A, B, C, or D]

Q2: [Question text]
A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]
Ans: [A, B, C, or D]`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(prompt)
      .then(() => {
        if (typeof showToast === 'function') {
          showToast('AI Prompt copied! Paste in ChatGPT or Gemini.', 'success');
        } else {
          alert('AI Prompt copied to clipboard!');
        }
      })
      .catch(() => alert(prompt));
  } else {
    alert(prompt);
  }
}

/**
 * Parse bulk text input into structured questions array
 */
function parseBulkQuestionsInput(showAlertOnEmpty = true) {
  const inputEl = document.getElementById('admin-bulk-questions-input');
  if (!inputEl) return;
  const rawText = inputEl.value.trim();

  if (!rawText) {
    parsedBulkQuestions = [];
    renderBulkQuestionsPreview();
    if (showAlertOnEmpty && typeof showToast === 'function') {
      showToast('Please paste some questions first.', 'warning');
    }
    return;
  }

  const results = [];

  // Check if rawText is JSON
  if (rawText.startsWith('[') && rawText.endsWith(']')) {
    try {
      const jsonArr = JSON.parse(rawText);
      if (Array.isArray(jsonArr)) {
        jsonArr.forEach((item, idx) => {
          const qText = item.question || item.question_text || item.text || '';
          const optA = item.option_a || item.a || item.options?.[0] || '';
          const optB = item.option_b || item.b || item.options?.[1] || '';
          const optC = item.option_c || item.c || item.options?.[2] || '';
          const optD = item.option_d || item.d || item.options?.[3] || '';
          let correct = (item.correct_option || item.correct || item.ans || item.answer || 'A').toUpperCase().trim();
          if (correct === '1') correct = 'A';
          if (correct === '2') correct = 'B';
          if (correct === '3') correct = 'C';
          if (correct === '4') correct = 'D';

          if (qText && optA && optB) {
            results.push({
              index: idx + 1,
              question_text: qText,
              option_a: optA,
              option_b: optB,
              option_c: optC || 'None of the above',
              option_d: optD || 'All of the above',
              correct_option: ['A','B','C','D'].includes(correct) ? correct : 'A',
              valid: true
            });
          }
        });
        if (results.length > 0) {
          parsedBulkQuestions = results;
          renderBulkQuestionsPreview();
          return;
        }
      }
    } catch (e) {
      // not valid JSON, proceed with text parsing
    }
  }

  // Text-based parsing
  // Split into chunks by question number indicators or double newlines
  const lines = rawText.split('\n');
  let currentChunk = [];
  const chunks = [];

  const isQuestionStart = (line) => {
    const l = line.trim();
    return /^(?:q(?:uestion)?\s*\d+[\.\:\)\-]?|\d+[\.\)\-]\s+)/i.test(l) && !/^[A-D][\.\)\-]/i.test(l);
  };

  lines.forEach(line => {
    if (isQuestionStart(line) && currentChunk.length > 0) {
      chunks.push(currentChunk.join('\n'));
      currentChunk = [line];
    } else {
      currentChunk.push(line);
    }
  });
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join('\n'));
  }

  // If couldn't split by question starts, try splitting by blank lines
  const finalChunks = (chunks.length > 1) ? chunks : rawText.split(/\n\s*\n+/);

  finalChunks.forEach((chunk, idx) => {
    const trimmedChunk = chunk.trim();
    if (!trimmedChunk) return;

    // Check for pipe-separated format: Question | Option A | Option B | Option C | Option D | Answer
    if (trimmedChunk.includes('|')) {
      const parts = trimmedChunk.split('|').map(s => s.trim());
      if (parts.length >= 6) {
        let correct = (parts[5] || 'A').toUpperCase().trim();
        if (correct.length > 1) correct = correct.charAt(0);
        results.push({
          index: idx + 1,
          question_text: parts[0].replace(/^(?:Q\d+[:.]?|\d+[:.]?)\s*/i, ''),
          option_a: parts[1],
          option_b: parts[2],
          option_c: parts[3],
          option_d: parts[4],
          correct_option: ['A', 'B', 'C', 'D'].includes(correct) ? correct : 'A',
          valid: true
        });
        return;
      }
    }

    // Standard block format
    const chunkLines = trimmedChunk.split('\n').map(l => l.trim()).filter(Boolean);
    let qLines = [];
    let optA = '', optB = '', optC = '', optD = '';
    let correct = 'A';

    chunkLines.forEach(line => {
      // Check for Option A
      if (/^(?:\(?A\)?[\.\:\)\-]|A[\.\:\)\-])\s*(.+)/i.test(line)) {
        optA = line.replace(/^(?:\(?A\)?[\.\:\)\-]|A[\.\:\)\-])\s*/i, '').trim();
      }
      // Check for Option B
      else if (/^(?:\(?B\)?[\.\:\)\-]|B[\.\:\)\-])\s*(.+)/i.test(line)) {
        optB = line.replace(/^(?:\(?B\)?[\.\:\)\-]|B[\.\:\)\-])\s*/i, '').trim();
      }
      // Check for Option C
      else if (/^(?:\(?C\)?[\.\:\)\-]|C[\.\:\)\-])\s*(.+)/i.test(line)) {
        optC = line.replace(/^(?:\(?C\)?[\.\:\)\-]|C[\.\:\)\-])\s*/i, '').trim();
      }
      // Check for Option D
      else if (/^(?:\(?D\)?[\.\:\)\-]|D[\.\:\)\-])\s*(.+)/i.test(line)) {
        optD = line.replace(/^(?:\(?D\)?[\.\:\)\-]|D[\.\:\)\-])\s*/i, '').trim();
      }
      // Check for Answer line
      else if (/^(?:ans(?:wer)?|correct(?:\s*option)?|right(?:\s*ans)?)\s*[:=.\-]?\s*([A-D1-4])/i.test(line)) {
        const match = line.match(/^(?:ans(?:wer)?|correct(?:\s*option)?|right(?:\s*ans)?)\s*[:=.\-]?\s*([A-D1-4])/i);
        if (match && match[1]) {
          let ansChar = match[1].toUpperCase();
          if (ansChar === '1') ansChar = 'A';
          else if (ansChar === '2') ansChar = 'B';
          else if (ansChar === '3') ansChar = 'C';
          else if (ansChar === '4') ansChar = 'D';
          correct = ansChar;
        }
      }
      // Otherwise it's part of the question text if we haven't hit options yet
      else if (!optA && !optB) {
        qLines.push(line);
      }
    });

    let qText = qLines.join(' ').replace(/^(?:Q(?:uestion)?\s*\d+[\.\:\)\-]?|\d+[\.\)\-])\s*/i, '').trim();

    const isValid = Boolean(qText && optA && optB);

    if (qText) {
      results.push({
        index: results.length + 1,
        question_text: qText,
        option_a: optA || 'Option A',
        option_b: optB || 'Option B',
        option_c: optC || 'Option C',
        option_d: optD || 'Option D',
        correct_option: ['A', 'B', 'C', 'D'].includes(correct) ? correct : 'A',
        valid: isValid
      });
    }
  });

  parsedBulkQuestions = results;
  renderBulkQuestionsPreview();

  if (results.length > 0 && typeof showToast === 'function') {
    showToast(`Found ${results.length} questions ready to preview!`, 'success');
  }
}

/**
 * Render preview of parsed questions
 */
function renderBulkQuestionsPreview() {
  const container = document.getElementById('admin-bulk-preview-container');
  const saveBtn = document.getElementById('btn-save-bulk-questions');
  const saveBtnText = document.getElementById('bulk-save-btn-text');

  if (!container) return;

  if (parsedBulkQuestions.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px 16px; color:var(--text-tertiary); background:var(--bg-card-subtle); border-radius:12px; border:1px dashed var(--border-color);">
        <i class="fa-solid fa-list-check" style="font-size:28px; margin-bottom:8px; opacity:0.5;"></i>
        <p style="margin:0; font-size:13px; font-weight:600;">No questions parsed yet</p>
        <p style="margin:4px 0 0; font-size:11.5px;">Click "Load Sample Questions" or paste text above and click Parse</p>
      </div>
    `;
    if (saveBtn) saveBtn.disabled = true;
    if (saveBtnText) saveBtnText.textContent = 'Import Questions (0)';
    return;
  }

  const validCount = parsedBulkQuestions.filter(q => q.valid).length;
  if (saveBtn) saveBtn.disabled = validCount === 0;
  if (saveBtnText) saveBtnText.textContent = `Import ${validCount} Questions`;

  const html = `
    <div class="bulk-preview-summary">
      <span style="color:var(--status-success-text);"><i class="fa-solid fa-circle-check"></i> ${validCount} Valid Questions Ready</span>
      <span style="font-size:11.5px; color:var(--text-secondary);">${parsedBulkQuestions.length} Total Parsed</span>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px; max-height:420px; overflow-y:auto; padding-right:4px;">
      ${parsedBulkQuestions.map(q => `
        <div class="card" style="padding:12px; border:1px solid ${q.valid ? 'var(--border-color)' : '#EF4444'}; border-radius:10px;">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:8px;">
            <div style="font-weight:700; font-size:13px; color:var(--text-main); line-height:1.35;">
              <span style="color:var(--primary-blue); font-weight:800; margin-right:4px;">Q${q.index}.</span>
              ${escapeAdminHtml(q.question_text)}
            </div>
            <span class="admin-item-pill ${q.valid ? 'green' : 'red'}" style="font-size:10px; flex-shrink:0;">
              ${q.valid ? `Ans: ${q.correct_option}` : 'Incomplete'}
            </span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-top:8px; font-size:12px;">
            <div style="padding:4px 8px; border-radius:6px; background:${q.correct_option === 'A' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card-subtle)'}; border:${q.correct_option === 'A' ? '1px solid #10B981' : '1px solid var(--border-subtle)'};">
              <strong>A)</strong> ${escapeAdminHtml(q.option_a)} ${q.correct_option === 'A' ? '✓' : ''}
            </div>
            <div style="padding:4px 8px; border-radius:6px; background:${q.correct_option === 'B' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card-subtle)'}; border:${q.correct_option === 'B' ? '1px solid #10B981' : '1px solid var(--border-subtle)'};">
              <strong>B)</strong> ${escapeAdminHtml(q.option_b)} ${q.correct_option === 'B' ? '✓' : ''}
            </div>
            <div style="padding:4px 8px; border-radius:6px; background:${q.correct_option === 'C' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card-subtle)'}; border:${q.correct_option === 'C' ? '1px solid #10B981' : '1px solid var(--border-subtle)'};">
              <strong>C)</strong> ${escapeAdminHtml(q.option_c)} ${q.correct_option === 'C' ? '✓' : ''}
            </div>
            <div style="padding:4px 8px; border-radius:6px; background:${q.correct_option === 'D' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card-subtle)'}; border:${q.correct_option === 'D' ? '1px solid #10B981' : '1px solid var(--border-subtle)'};">
              <strong>D)</strong> ${escapeAdminHtml(q.option_d)} ${q.correct_option === 'D' ? '✓' : ''}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.innerHTML = html;
}

/**
 * Save all valid parsed questions into Supabase / local bank in bulk
 */
async function handleSaveBulkQuestions() {
  if (!currentManagingTest || !currentManagingTest.id) {
    alert('No test selected to import questions into.');
    return;
  }

  const validQuestions = parsedBulkQuestions.filter(q => q.valid);
  if (validQuestions.length === 0) {
    alert('No valid questions to import.');
    return;
  }

  const saveBtn = document.getElementById('btn-save-bulk-questions');
  const originalHtml = saveBtn ? saveBtn.innerHTML : '';
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Importing...';
  }

  try {
    const startOrder = (currentTestQuestions ? currentTestQuestions.length : 0) + 1;
    const records = validQuestions.map((q, idx) => ({
      test_id: currentManagingTest.id,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c || '',
      option_d: q.option_d || '',
      correct_option: q.correct_option,
      sort_order: startOrder + idx
    }));

    if (window.sb) {
      // Chunk insertions to prevent request payload size overflow
      const chunkSize = 50;
      for (let i = 0; i < records.length; i += chunkSize) {
        const slice = records.slice(i, i + chunkSize);
        const { error } = await window.sb.from('questions').insert(slice);
        if (error) {
          console.warn('Supabase bulk insert notice:', error);
          throw error;
        }
      }
    } else {
      // Fallback local simulation
      records.forEach((r, idx) => {
        currentTestQuestions.push({
          ...r,
          id: 'local_q_' + Date.now() + '_' + idx
        });
      });
    }

    if (typeof showToast === 'function') {
      showToast(`Success! Imported ${records.length} questions.`, 'success');
    }

    // Clear input & return to questions list
    const inputEl = document.getElementById('admin-bulk-questions-input');
    if (inputEl) inputEl.value = '';
    parsedBulkQuestions = [];

    showAdminSubView('admin-view-questions');
    await loadTestQuestions(currentManagingTest.id);

  } catch (err) {
    console.error('Bulk save error:', err);
    alert('Error saving questions: ' + err.message);
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = originalHtml;
    }
  }
}

