/**
 * ==========================================================================
 * NOTES WALLAH - Navigation & Screen Management
 * ==========================================================================
 */

// Active screen identifiers: 'splash-screen' | 'auth-screen' | 'onboarding-screen' | 'main-app'
let currentScreen = 'splash-screen';

/**
 * Navigate to a specific top-level screen
 * @param {string} screenId
 */
function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    if (screen.id === screenId) {
      screen.classList.add('active');
      screen.style.display = 'flex';
      screen.style.pointerEvents = 'auto';
    } else {
      screen.classList.remove('active');
      screen.style.display = 'none';
      screen.style.pointerEvents = 'none';
    }
  });
  currentScreen = screenId;
}

/**
 * Switch Bottom Navigation Tab
 * @param {'home' | 'study' | 'test' | 'challenges' | 'shop' | 'account'} tabName
 */
function switchNavTab(tabName) {
  // Update nav buttons
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-tab') === tabName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update tab content pages
  const tabPages = document.querySelectorAll('.tab-page');
  tabPages.forEach(page => {
    if (page.id === `tab-content-${tabName}`) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  // Handle module-specific triggers
  if (tabName === 'study' && typeof initStudyModule === 'function') {
    const subjectsGrid = document.getElementById('study-subjects-grid');
    if (!subjectsGrid || subjectsGrid.children.length === 0) {
      initStudyModule();
    }
  }

  if (tabName === 'test' && typeof initTestModule === 'function') {
    const testList = document.getElementById('test-cards-list');
    if (!testList || testList.children.length === 0) {
      initTestModule();
    }
  }

  if (tabName === 'challenges' && typeof initChallengesModule === 'function') {
    initChallengesModule();
  }

  if (tabName === 'shop' && typeof loadShopPage === 'function') {
    loadShopPage();
  }

  // Scroll to top of the content area
  const mainContent = document.querySelector('.main-content-area');
  if (mainContent) {
    mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Handle Chip Selection in Onboarding and Modals
 * @param {string} containerId 
 * @param {HTMLElement} selectedChip 
 */
function selectChip(containerId, selectedChip) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const chips = container.querySelectorAll('.chip');
  chips.forEach(chip => chip.classList.remove('active'));
  selectedChip.classList.add('active');
}

/**
 * Handle Class Chip Selection with conditional Stream group toggle
 * Shows Stream selection (Science, Arts, Commerce) if class is 11 or 12
 * Hides Stream selection if class is 9 or 10
 * @param {'onboarding' | 'settings'} context 
 * @param {HTMLElement} chipEl 
 */
function selectClassChip(context, chipEl) {
  const containerId = context === 'settings' ? 'settings-class-chips' : 'class-chips';
  selectChip(containerId, chipEl);

  const classVal = chipEl.getAttribute('data-value') || '';
  const isSenior = classVal.includes('11') || classVal.includes('12');

  const streamGroup = document.getElementById(context === 'settings' ? 'settings-stream-group' : 'onboarding-stream-group');
  const streamSelect = document.getElementById(context === 'settings' ? 'settings-stream' : 'onboarding-stream');

  if (streamGroup) {
    if (isSenior) {
      streamGroup.classList.remove('hidden');
      if (streamSelect) {
        streamSelect.required = true;
      }
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
 * Helper to get currently active chip value
 * @param {string} containerId 
 * @returns {string}
 */
function getSelectedChipValue(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return '';
  const activeChip = container.querySelector('.chip.active');
  return activeChip ? activeChip.getAttribute('data-value') : '';
}

/**
 * Global Toast Notification
 * @param {string} message 
 * @param {'success' | 'error' | 'info'} type 
 */
function showToast(message, type = 'info') {
  const toast = document.getElementById('global-toast');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.className = `toast-popup toast-${type}`;

  if (toastIcon) {
    if (type === 'success') {
      toastIcon.className = 'fa-solid fa-circle-check';
    } else if (type === 'error') {
      toastIcon.className = 'fa-solid fa-circle-exclamation';
    } else {
      toastIcon.className = 'fa-solid fa-circle-info';
    }
  }

  // Auto dismiss after 3 seconds
  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.className = 'toast-popup hidden';
  }, 3200);
}
