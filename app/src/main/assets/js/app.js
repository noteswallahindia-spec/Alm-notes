/**
 * ==========================================================================
 * NOTES WALLAH - Main Application Controller (Part 1)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initAppTheme();
  initNetworkMonitoring();
  initAppSession();
});

/**
 * Global Network Status & Offline Monitor
 * Detects offline state (navigator.onLine + window events) and displays clean overlay.
 */
function initNetworkMonitoring() {
  window.addEventListener('offline', () => {
    handleNetworkChange(false);
  });

  window.addEventListener('online', () => {
    handleNetworkChange(true);
  });

  // Initial check on boot
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    handleNetworkChange(false);
  }
}

/**
 * Handle network transition
 * @param {boolean} isOnline 
 */
function handleNetworkChange(isOnline) {
  const overlay = document.getElementById('offline-overlay');
  if (isOnline) {
    if (overlay) overlay.classList.add('hidden');
    showToast('Back online! Connection restored.', 'success');
    
    // Resume / refresh active tab data if needed
    resumeActiveTabData();
  } else {
    if (overlay) overlay.classList.remove('hidden');
    showToast("You're currently offline. Saved resources remain available.", 'info');
  }
}

/**
 * Manually trigger network check (e.g. from "Try again" button in offline overlay)
 */
function checkNetworkStatus() {
  const retryBtn = document.getElementById('offline-retry-btn');
  const originalHtml = retryBtn ? retryBtn.innerHTML : '';
  
  if (retryBtn) {
    retryBtn.disabled = true;
    retryBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking connection...';
  }

  setTimeout(() => {
    if (retryBtn) {
      retryBtn.disabled = false;
      retryBtn.innerHTML = originalHtml;
    }

    if (navigator.onLine) {
      handleNetworkChange(true);
    } else {
      showToast('Still offline. Please check your WiFi or mobile network.', 'error');
    }
  }, 700);
}

/**
 * Dismiss the offline overlay to let user continue reading cached notes
 */
function dismissOfflineOverlay() {
  const overlay = document.getElementById('offline-overlay');
  if (overlay) overlay.classList.add('hidden');
  showToast('Continuing offline with saved resources', 'info');
}

/**
 * Resume active tab data when returning online
 */
function resumeActiveTabData() {
  // Re-fetch shop products or banners if on shop tab
  const activeTab = document.querySelector('.tab-page.active');
  if (activeTab && activeTab.id === 'tab-content-shop') {
    if (typeof loadShopPage === 'function') {
      loadShopPage();
    }
  }
}

/**
 * Initialize Dark / Light theme from storage
 */
function initAppTheme() {
  const savedTheme = localStorage.getItem('nw_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    themeSwitch.checked = (savedTheme === 'dark');
  }
}

/**
 * Handle Dark Mode Switch Toggle
 * @param {HTMLInputElement} checkbox 
 */
function handleThemeToggle(checkbox) {
  const newTheme = checkbox.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('nw_theme', newTheme);
  showToast(`${newTheme === 'dark' ? 'Dark' : 'Light'} theme enabled`, 'info');
}

/**
 * App Startup & Session Check (Splash Screen Management)
 * Splash auto-hides after ~1.4 - 1.8s, force hide after max 3.0s.
 */
function initAppSession() {
  let hasResolved = false;
  const splashStartTime = Date.now();
  const MIN_SPLASH_TIME = 1400; // smooth branding duration
  const MAX_SPLASH_TIME = 2800; // safety ceiling: never stuck

  // Safety hard-timer: NEVER get stuck on splash
  const safetyTimeout = setTimeout(() => {
    if (!hasResolved) {
      console.warn('Notes Wallah: Safety splash timeout triggered.');
      resolveStartup(null);
    }
  }, MAX_SPLASH_TIME);

  // Absolute hard failsafe: unconditionally hide splash screen after 3.5s
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash && splash.classList.contains('active')) {
      console.warn('Notes Wallah: Unconditional failsafe force-dismissed splash screen.');
      splash.classList.remove('active');
      const authScreen = document.getElementById('auth-screen');
      const mainApp = document.getElementById('main-app');
      if (currentUser || localStorage.getItem('nw_local_profile')) {
        if (mainApp) mainApp.classList.add('active');
      } else {
        if (authScreen) authScreen.classList.add('active');
      }
    }
  }, 3500);

  // Check Supabase session
  async function checkSession() {
    try {
      if (window.sb && window.sb.auth) {
        const { data, error } = await window.sb.auth.getSession();
        if (!error && data?.session?.user) {
          resolveStartup(data.session.user);
          return;
        }
      }
    } catch (err) {
      console.warn('Notes Wallah: Session check note:', err);
    }

    // Check local demo profile if present
    const localProfileRaw = localStorage.getItem('nw_local_profile');
    if (localProfileRaw) {
      try {
        const localProfile = JSON.parse(localProfileRaw);
        if (localProfile && localProfile.onboarded) {
          currentUser = { id: localProfile.id, email: localProfile.email };
          currentProfile = localProfile;
          resolveStartup(currentUser);
          return;
        }
      } catch (e) {}
    }

    resolveStartup(null);
  }

  // Handle resolution with minimum splash display time
  function resolveStartup(user) {
    if (hasResolved) return;
    hasResolved = true;
    clearTimeout(safetyTimeout);

    const elapsed = Date.now() - splashStartTime;
    const remainingDelay = Math.max(0, MIN_SPLASH_TIME - elapsed);

    setTimeout(async () => {
      try {
        if (user) {
          await processUserSession(user);
        } else {
          showScreen('auth-screen');
        }
      } catch (e) {
        console.warn('Startup session error fallback:', e);
        showScreen('auth-screen');
      }
    }, remainingDelay);
  }

  // If supabase is initialized immediately, check session, else wait a tick
  if (window.sb) {
    checkSession();
  } else {
    setTimeout(checkSession, 250);
  }
}

/**
 * Dynamic Greeting based on time of day
 * @returns {string}
 */
function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return 'Good Morning,';
  if (hour >= 12 && hour < 17) return 'Good Afternoon,';
  return 'Good Evening,';
}

/**
 * Compute initials from a name (e.g. "Aamir Khan" -> "AK")
 * @param {string} name 
 * @returns {string}
 */
function getInitials(name) {
  if (!name) return 'NW';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Render Profile Data across Home and Account screens
 * @param {Object} profile 
 */
function renderAppProfileData(profile) {
  if (!profile) return;

  const firstName = profile.name ? profile.name.split(' ')[0] : 'Student';
  const initials = getInitials(profile.name);
  const classText = profile.class || 'Class 10';
  const streamText = profile.stream || '';
  const boardText = profile.board || 'CBSE';
  const mediumText = profile.medium || profile.language || 'English';
  const isSenior = classText.includes('11') || classText.includes('12');

  // Format academic line:
  // Senior with stream: "Class 11 · Science · CBSE"
  // Junior without stream: "Class 10 · CBSE · English"
  let academicLine = '';
  if (isSenior && streamText) {
    academicLine = `${classText} · ${streamText} · ${boardText}`;
  } else {
    academicLine = `${classText} · ${boardText} · ${mediumText}`;
  }

  // Home Screen Elements
  const greetingPrefix = document.getElementById('home-greeting-prefix');
  const greetingName = document.getElementById('home-user-name');
  const infoBadge = document.getElementById('home-user-badge');
  const headerAvatarInitials = document.getElementById('header-avatar-initials');

  if (greetingPrefix) greetingPrefix.textContent = getTimeGreeting();
  if (greetingName) greetingName.textContent = firstName;
  if (infoBadge) infoBadge.textContent = academicLine;
  if (headerAvatarInitials) headerAvatarInitials.textContent = initials;

  // Account Screen Elements
  const accountAvatarInitials = document.getElementById('account-avatar-initials');
  const accountName = document.getElementById('account-user-name');
  const accountEmail = document.getElementById('account-user-email');
  const accountAcademicLine = document.getElementById('account-user-academic-line');
  const accountClass = document.getElementById('account-class-chip');
  const accountStream = document.getElementById('account-stream-chip');
  const accountBoard = document.getElementById('account-board-chip');
  const accountMedium = document.getElementById('account-medium-chip');
  const accountMenuSub = document.getElementById('account-menu-academic-sub');
  const shopAdminRow = document.getElementById('shop-admin-row');

  if (accountAvatarInitials) accountAvatarInitials.textContent = initials;
  if (accountName) accountName.textContent = profile.name || 'Student';
  if (accountEmail) accountEmail.textContent = profile.email || 'student@noteswallah.in';
  if (accountAcademicLine) accountAcademicLine.textContent = academicLine;
  if (accountClass) accountClass.textContent = classText;

  if (accountStream) {
    if (isSenior && streamText) {
      accountStream.textContent = streamText;
      accountStream.classList.remove('hidden');
    } else {
      accountStream.classList.add('hidden');
    }
  }

  if (accountBoard) accountBoard.textContent = boardText;
  if (accountMedium) accountMedium.textContent = mediumText;
  if (accountMenuSub) {
    accountMenuSub.textContent = `${classText}${streamText ? ' (' + streamText + ')' : ''} · Update class, stream, or board`;
  }

  // Show/Hide Shop Admin menu row based on is_admin flag or email in ADMIN_EMAILS
  if (shopAdminRow) {
    const isAdmin = (profile.is_admin === true) || 
      (typeof isCurrentUserAdmin === 'function' && isCurrentUserAdmin());
    if (isAdmin) {
      shopAdminRow.classList.remove('hidden');
    } else {
      shopAdminRow.classList.add('hidden');
    }
  }
}

/**
 * Open Academic Settings Modal (Settings / Account)
 */
function openAcademicSettingsModal() {
  const profile = (typeof AppState !== 'undefined' && AppState.user) 
    ? AppState.user 
    : (currentProfile || {});

  const nameInput = document.getElementById('settings-name');
  if (nameInput) nameInput.value = profile.name || '';

  const classVal = profile.class || 'Class 10';
  const classChip = document.querySelector(`#settings-class-chips .chip[data-value="${classVal}"]`);
  if (classChip && typeof selectClassChip === 'function') {
    selectClassChip('settings', classChip);
  }

  const streamSelect = document.getElementById('settings-stream');
  if (streamSelect) {
    streamSelect.value = profile.stream || '';
  }

  const boardVal = profile.board || 'CBSE';
  const boardChip = document.querySelector(`#settings-board-chips .chip[data-value="${boardVal}"]`);
  if (boardChip && typeof selectChip === 'function') {
    selectChip('settings-board-chips', boardChip);
  }

  const medVal = profile.medium || profile.language || 'English';
  const medChip = document.querySelector(`#settings-medium-chips .chip[data-value="${medVal}"]`);
  if (medChip && typeof selectChip === 'function') {
    selectChip('settings-medium-chips', medChip);
  }

  const modal = document.getElementById('academic-settings-modal');
  if (modal) modal.classList.remove('hidden');
}

/**
 * Close Academic Settings Modal
 */
function closeAcademicSettingsModal() {
  const modal = document.getElementById('academic-settings-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Save Academic Settings: Updates AppState.user, Supabase profiles table,
 * refreshes Home, Account, and reloads Study subjects from selected class.
 * @param {Event} event 
 */
async function handleSettingsSave(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById('settings-name');
  const name = nameInput ? nameInput.value.trim() : (AppState.user?.name || 'Student');

  const selectedClass = getSelectedChipValue('settings-class-chips') || 'Class 10';
  const isSenior = selectedClass.includes('11') || selectedClass.includes('12');
  const streamSelect = document.getElementById('settings-stream');
  const selectedStream = (isSenior && streamSelect) ? streamSelect.value.trim() : '';

  // Stream is required for Class 11 and 12
  if (isSenior && !selectedStream) {
    showToast('Please select your Stream (Science, Arts, or Commerce) for Class 11/12.', 'error');
    if (streamSelect) streamSelect.focus();
    return;
  }

  const selectedBoard = getSelectedChipValue('settings-board-chips') || 'CBSE';
  const selectedMedium = getSelectedChipValue('settings-medium-chips') || 'English';

  const saveBtn = document.getElementById('settings-save-btn');
  const origHtml = saveBtn ? saveBtn.innerHTML : '';
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
  }

  // Ensure AppState exists
  if (typeof AppState === 'undefined') {
    window.AppState = { user: {}, get profile() { return this.user; }, set profile(v) { this.user = v; } };
  }

  const currentUserId = (currentUser && currentUser.id) 
    ? currentUser.id 
    : (AppState.user?.id || 'local_student');
  const currentUserEmail = (currentUser && currentUser.email) 
    ? currentUser.email 
    : (AppState.user?.email || 'student@noteswallah.in');

  const updatedProfile = {
    ...AppState.user,
    id: currentUserId,
    email: currentUserEmail,
    name: name || AppState.user.name || 'Student',
    class: selectedClass,
    stream: selectedStream || null,
    board: selectedBoard,
    medium: selectedMedium,
    language: selectedMedium,
    onboarded: true,
    is_admin: AppState.user.is_admin || false
  };

  // 1. Update AppState.user and currentProfile
  AppState.user = updatedProfile;
  currentProfile = updatedProfile;
  localStorage.setItem('nw_local_profile', JSON.stringify(updatedProfile));
  localStorage.setItem('noteswallah_profile', JSON.stringify(updatedProfile));

  // 2. Save to Supabase profiles table (class, stream, board, medium, etc.)
  try {
    if (window.sb) {
      const { error } = await window.sb
        .from('profiles')
        .upsert([{
          id: updatedProfile.id,
          name: updatedProfile.name,
          email: updatedProfile.email,
          class: updatedProfile.class,
          stream: updatedProfile.stream,
          board: updatedProfile.board,
          medium: updatedProfile.medium,
          language: updatedProfile.language,
          onboarded: true,
          is_admin: updatedProfile.is_admin || false
        }]);

      if (error) {
        console.warn('Notice while saving profile to Supabase:', error.message);
      }
    }
  } catch (err) {
    console.warn('Profile save exception:', err);
  }

  // 3. After save: refresh Home, Account, and reload Study subjects from selected class
  renderAppProfileData(updatedProfile);

  if (typeof reloadStudyForClass === 'function') {
    reloadStudyForClass();
  }

  // Close modal
  closeAcademicSettingsModal();

  if (saveBtn) {
    saveBtn.disabled = false;
    saveBtn.innerHTML = origHtml;
  }

  showToast(`Updated to ${selectedClass}${selectedStream ? ' · ' + selectedStream : ''}! Syllabus reloaded.`, 'success');
}

/**
 * Handle opening a note preview
 * @param {string} title 
 */
function handleOpenNote(title) {
  switchNavTab('study');

  if (typeof initStudyModule === 'function') {
    initStudyModule();
  }

  // Route to corresponding chapter if matched
  if (title.toLowerCase().includes('chemical')) {
    openChapterDetail('science', 'sci-ch1');
  } else if (title.toLowerCase().includes('real numbers')) {
    openChapterDetail('math', 'math-ch1');
  } else if (title.toLowerCase().includes('federalism') || title.toLowerCase().includes('power sharing')) {
    openChapterDetail('social', 'sst-ch3');
  } else {
    showToast(`Viewing ${title}`, 'info');
  }
}

/**
 * Handle Shop Admin click
 */
function handleShopAdminClick() {
  if (typeof openShopAdminDashboard === 'function') {
    openShopAdminDashboard();
  } else {
    showToast('Shop Admin loading...', 'info');
  }
}

/**
 * Allow student to edit academic info directly from Account (opens Academic Settings modal)
 */
function handleEditAcademicInfo() {
  openAcademicSettingsModal();
}

/**
 * About Modal Information
 */
function showAboutModal() {
  showToast('Notes Wallah v1.0 • Part 1 Architecture', 'info');
}
