/**
 * ==========================================================================
 * NOTES WALLAH - Authentication & Profile Management (Supabase)
 * ==========================================================================
 * Profiles fields schema:
 * - id (uuid)
 * - name (text)
 * - email (text)
 * - class (text)
 * - board (text)
 * - medium (text)
 * - language (text)
 * - onboarded (bool)
 * - is_admin (bool)
 */

// Global AppState object for single source of truth across modules
window.AppState = window.AppState || {
  isGuest: false,
  user: {
    id: null,
    name: 'Student',
    email: '',
    class: 'Class 10',
    stream: '',
    board: 'CBSE',
    medium: 'English',
    language: 'English',
    onboarded: false,
    is_admin: false
  },
  get profile() { return this.user; },
  set profile(v) { this.user = v; }
};

// Current authenticated user state
let currentUser = null;
let currentProfile = null;

/**
 * Switch between Login and Sign Up tabs
 * @param {'login' | 'signup'} tab 
 */
function switchAuthTab(tab) {
  clearAuthAlert();
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const formLogin = document.getElementById('login-form');
  const formSignup = document.getElementById('signup-form');
  const authTitle = document.getElementById('auth-main-title');
  const authSubtitle = document.getElementById('auth-sub-title');

  if (tab === 'signup') {
    tabSignup.classList.add('active');
    tabLogin.classList.remove('active');
    formSignup.classList.remove('hidden');
    formLogin.classList.add('hidden');
    if (authTitle) authTitle.textContent = 'Create your account 🚀';
    if (authSubtitle) authSubtitle.textContent = 'Join thousands of Class 9–12 students';
  } else {
    tabLogin.classList.add('active');
    tabSignup.classList.remove('active');
    formLogin.classList.remove('hidden');
    formSignup.classList.add('hidden');
    if (authTitle) authTitle.textContent = 'Welcome back! 👋';
    if (authSubtitle) authSubtitle.textContent = 'Login to access your Class 10 study materials';
  }
}

/**
 * Toggle password field visibility
 * @param {string} inputId 
 * @param {HTMLElement} btn 
 */
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.className = 'fa-regular fa-eye-slash';
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.className = 'fa-regular fa-eye';
    }
  }
}

/**
 * Set an alert message on the auth form
 * @param {string} message 
 * @param {'error' | 'success' | 'info'} type 
 */
function setAuthAlert(message, type = 'error') {
  const alert = document.getElementById('auth-alert');
  if (!alert) return;
  const msgSpan = alert.querySelector('.alert-msg');
  const icon = alert.querySelector('.alert-icon');

  if (msgSpan) msgSpan.textContent = message;
  alert.className = `alert-banner alert-${type}`;

  if (icon) {
    if (type === 'error') {
      icon.className = 'alert-icon fa-solid fa-circle-exclamation';
    } else if (type === 'success') {
      icon.className = 'alert-icon fa-solid fa-circle-check';
    } else {
      icon.className = 'alert-icon fa-solid fa-circle-info';
    }
  }
}

function clearAuthAlert() {
  const alert = document.getElementById('auth-alert');
  if (alert) alert.className = 'alert-banner hidden';
}

/**
 * Formats Supabase and network errors into clean, friendly plain language
 * @param {Error|Object|string} err 
 * @returns {string}
 */
function formatAuthError(err) {
  if (!err) return 'An unexpected error occurred. Please try again.';
  const msg = (err.message || String(err)).toLowerCase();
  
  if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
    return 'Incorrect email or password. Please verify your details and try again.';
  }
  if (msg.includes('user already registered') || msg.includes('already registered')) {
    return 'An account with this email already exists. Please log in.';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests')) {
    return 'Too many login attempts. Please wait a few moments and try again.';
  }
  if (msg.includes('password') && (msg.includes('least 6') || msg.includes('short'))) {
    return 'Password must be at least 6 characters long.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Please check your email and confirm your account before logging in.';
  }
  if (msg.includes('failed to fetch') || msg.includes('network') || (typeof navigator !== 'undefined' && !navigator.onLine)) {
    return 'Network connection error. Please check your internet connection and try again.';
  }
  if (msg.includes('client is not ready')) {
    return 'Connecting to secure server. Please wait a moment and try again.';
  }
  return err.message || 'Unable to complete request. Please try again.';
}

/**
 * Handle Student Login with Supabase
 */
async function handleLogin(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('login-submit-btn');
  // Prevent double-submit while loading
  if (submitBtn && submitBtn.disabled) return;

  clearAuthAlert();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const originalText = submitBtn.innerHTML;

  if (!email || !password) {
    setAuthAlert('Please enter both email and password.', 'error');
    return;
  }

  // Set loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

  try {
    if (!window.sb) {
      throw new Error('Supabase client is not ready. Please verify connection.');
    }

    const { data, error } = await window.sb.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data && data.user) {
      AppState.isGuest = false;
      localStorage.removeItem('nw_guest_session');
      currentUser = data.user;
      await processUserSession(data.user);
    } else {
      throw new Error('No user returned from login.');
    }

  } catch (err) {
    console.error('Login error:', err);
    setAuthAlert(formatAuthError(err), 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

/**
 * Handle Student Sign Up with Supabase
 */
async function handleSignup(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('signup-submit-btn');
  // Prevent double-submit while loading
  if (submitBtn && submitBtn.disabled) return;

  clearAuthAlert();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const originalText = submitBtn.innerHTML;

  if (!name || !email || !password) {
    setAuthAlert('Please fill in all fields.', 'error');
    return;
  }

  if (password.length < 6) {
    setAuthAlert('Password must be at least 6 characters.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

  try {
    if (!window.sb) {
      throw new Error('Supabase client is not ready. Please verify connection.');
    }

    // 1. Sign up user
    const { data, error } = await window.sb.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) {
      throw error;
    }

    const user = data.user;
    if (!user) {
      throw new Error('Signup failed: user record could not be established.');
    }

    AppState.isGuest = false;
    localStorage.removeItem('nw_guest_session');
    currentUser = user;

    // 2. Insert initial row in profiles table
    const initialProfile = {
      id: user.id,
      name: name,
      email: email,
      class: 'Class 10',
      board: 'CBSE',
      medium: 'English',
      language: 'English',
      onboarded: false,
      is_admin: false
    };

    try {
      const { error: profileError } = await window.sb
        .from('profiles')
        .upsert([initialProfile]);

      if (profileError) {
        console.warn('Profile table insert notice:', profileError.message);
      }
    } catch (profileCatch) {
      console.warn('Profile upsert note:', profileCatch);
    }

    // Cache fallback profile locally
    localStorage.setItem('nw_local_profile', JSON.stringify(initialProfile));

    // Check if session exists or email confirmation required
    if (data.session) {
      // Direct session granted → proceed to onboarding
      currentProfile = initialProfile;
      prefillOnboarding(name);
      showScreen('onboarding-screen');
      showToast('Account created! Complete your profile.', 'success');
    } else {
      // Confirmation link was sent by Supabase
      setAuthAlert('Account created! Please check your email inbox to verify your address.', 'success');
    }

  } catch (err) {
    console.error('Signup error:', err);
    setAuthAlert(formatAuthError(err), 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

/**
 * Handle Google OAuth Sign In
 */
async function handleGoogleSignIn() {
  clearAuthAlert();
  AppState.isGuest = false;
  localStorage.removeItem('nw_guest_session');
  try {
    if (!window.sb) {
      throw new Error('Supabase client not ready.');
    }
    const { data, error } = await window.sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    });
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error('Google Sign In error:', err);
    setAuthAlert('Google Sign-In: ' + (err.message || 'Provider not configured yet in Supabase dashboard.'), 'info');
  }
}

/**
 * Basic Forgot Password Trigger
 */
async function handleForgotPassword(event) {
  event.preventDefault();
  const emailInput = document.getElementById('login-email');
  const email = emailInput ? emailInput.value.trim() : '';

  if (!email) {
    setAuthAlert('Enter your email in the box above and click "Forgot?" again.', 'info');
    if (emailInput) emailInput.focus();
    return;
  }

  try {
    if (window.sb) {
      const { error } = await window.sb.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setAuthAlert(`Password reset instructions sent to ${email}`, 'success');
    } else {
      setAuthAlert(`Password reset request noted for ${email}`, 'info');
    }
  } catch (err) {
    setAuthAlert(err.message || 'Unable to send password reset email.', 'error');
  }
}

/**
 * Process authenticated user session, load profile and decide routing
 */
async function processUserSession(user) {
  AppState.isGuest = false;
  localStorage.removeItem('nw_guest_session');
  currentUser = user;
  let profile = null;

  try {
    if (window.sb) {
      const { data, error } = await window.sb
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!error && data) {
        profile = data;
      }
    }
  } catch (err) {
    console.warn('Error fetching profile from Supabase:', err);
  }

  // Fallback to local profile cache if database table is fresh or unreachable
  if (!profile) {
    const cached = localStorage.getItem('nw_local_profile');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && (parsed.id === user.id || !parsed.id)) {
          profile = parsed;
        }
      } catch (e) {}
    }
  }

  // If still no profile, initialize default
  if (!profile) {
    profile = {
      id: user.id,
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'Student',
      email: user.email,
      class: 'Class 10',
      stream: '',
      board: 'CBSE',
      medium: 'English',
      language: 'English',
      onboarded: false,
      is_admin: false
    };
  }

  // Synchronize AppState.user and currentProfile
  AppState.user = { ...AppState.user, ...profile };
  currentProfile = AppState.user;
  localStorage.setItem('nw_local_profile', JSON.stringify(AppState.user));
  localStorage.setItem('noteswallah_profile', JSON.stringify(AppState.user));

  // Determine screen transition
  if (profile.onboarded) {
    renderAppProfileData(AppState.user);
    if (typeof reloadStudyForClass === 'function') {
      reloadStudyForClass();
    }
    if (typeof reloadTestForClass === 'function') {
      reloadTestForClass();
    }
    showScreen('main-app');
    switchNavTab('home');
  } else {
    prefillOnboarding(profile.name);
    showScreen('onboarding-screen');
  }
}

/**
 * Pre-fill onboarding fields and configure conditional stream visibility
 */
function prefillOnboarding(name) {
  const nameInput = document.getElementById('onboarding-name');
  if (nameInput) {
    nameInput.value = name || '';
  }

  // Pre-select class chip and set stream visibility
  const classVal = (AppState.user && AppState.user.class) || 'Class 10';
  const classChip = document.querySelector(`#class-chips .chip[data-value="${classVal}"]`);
  if (classChip && typeof selectClassChip === 'function') {
    selectClassChip('onboarding', classChip);
  }

  const streamVal = (AppState.user && AppState.user.stream) || '';
  const streamSelect = document.getElementById('onboarding-stream');
  if (streamSelect && streamVal) {
    streamSelect.value = streamVal;
  }
}

/**
 * Handle Onboarding Submission
 */
async function handleOnboardingSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('onboarding-name');
  const name = nameInput ? nameInput.value.trim() : '';

  const selectedClass = getSelectedChipValue('class-chips') || 'Class 10';
  const isSenior = selectedClass.includes('11') || selectedClass.includes('12');
  const streamSelect = document.getElementById('onboarding-stream');
  const selectedStream = (isSenior && streamSelect) ? streamSelect.value.trim() : '';

  // Stream is required for Class 11 & 12
  if (isSenior && !selectedStream) {
    showToast('Please select your Stream (Science, Arts, or Commerce) for Class 11/12.', 'error');
    if (streamSelect) streamSelect.focus();
    return;
  }

  const submitBtn = document.getElementById('onboarding-submit-btn');
  const originalText = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving Profile...';
  }

  const selectedBoard = getSelectedChipValue('board-chips') || 'CBSE';
  const selectedMedium = getSelectedChipValue('medium-chips') || 'English';

  // ==========================================================================
  // GUEST ONBOARDING FLOW (Rules 2, 3, 4: Never written to Supabase)
  // ==========================================================================
  if (AppState && AppState.isGuest) {
    const guestProfile = {
      id: 'guest_student',
      name: name || 'Guest Student',
      email: '',
      class: selectedClass,
      stream: selectedStream || null,
      board: selectedBoard,
      medium: selectedMedium,
      language: selectedMedium,
      onboarded: true,
      is_admin: false
    };

    AppState.user = guestProfile;
    currentProfile = guestProfile;
    localStorage.setItem('nw_guest_profile', JSON.stringify(guestProfile));
    localStorage.setItem('nw_guest_session', 'true');

    // Render profile and reload curriculum (No Supabase writes)
    renderAppProfileData(guestProfile);
    if (typeof reloadStudyForClass === 'function') {
      reloadStudyForClass();
    }
    if (typeof reloadTestForClass === 'function') {
      reloadTestForClass();
    }
    showScreen('main-app');
    switchNavTab('home');
    showToast(`Setup complete! Welcome Guest (${selectedClass}).`, 'success');

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
    return;
  }

  const updatedProfile = {
    id: currentUser ? currentUser.id : (AppState.user?.id || 'local_student'),
    name: name || 'Student',
    email: currentUser ? currentUser.email : (AppState.user?.email || 'student@noteswallah.in'),
    class: selectedClass,
    stream: selectedStream || null,
    board: selectedBoard,
    medium: selectedMedium,
    language: selectedMedium,
    onboarded: true,
    is_admin: currentProfile?.is_admin || false
  };

  AppState.user = updatedProfile;
  currentProfile = updatedProfile;
  localStorage.setItem('nw_local_profile', JSON.stringify(updatedProfile));
  localStorage.setItem('noteswallah_profile', JSON.stringify(updatedProfile));

  // Attempt to save to Supabase profiles table
  try {
    if (window.sb && currentUser) {
      const { error } = await window.sb
        .from('profiles')
        .upsert([updatedProfile]);

      if (error) {
        console.warn('Notice while saving profile to Supabase:', error.message);
      }
    }
  } catch (err) {
    console.warn('Profile save exception:', err);
  }

  // Update UI, reload curriculum, and transition to Home
  renderAppProfileData(updatedProfile);
  if (typeof reloadStudyForClass === 'function') {
    reloadStudyForClass();
  }
  if (typeof reloadTestForClass === 'function') {
    reloadTestForClass();
  }
  showScreen('main-app');
  switchNavTab('home');
  showToast(`Profile setup complete! Welcome to Notes Wallah (${selectedClass}).`, 'success');

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

/**
 * Track Anonymous Guest Account in Supabase (Rule 5)
 * Increments anonymous guest counter via RPC once per device.
 * Stores nw_guest_counted=1 in localStorage so it does not increment every launch.
 * Guest personal/progress data is NEVER written to Supabase.
 */
async function trackGuestAccountCount() {
  const isAlreadyCounted = localStorage.getItem('nw_guest_counted') === '1' || localStorage.getItem('guest_counted') === '1';
  if (isAlreadyCounted) return;

  try {
    if (window.sb && typeof window.sb.rpc === 'function') {
      const { error } = await window.sb.rpc('increment_guest_count');
      if (!error) {
        localStorage.setItem('nw_guest_counted', '1');
        localStorage.setItem('guest_counted', '1');
      } else {
        console.warn('Anonymous guest count RPC note:', error.message);
      }
    }
  } catch (err) {
    console.warn('Guest counter exception:', err);
  }
}

/**
 * Handle Guest Login Flow (Rules 1, 2, 3, 4)
 * Allows students to browse Notes Wallah without account creation.
 * Progress is kept strictly in localStorage with nw_guest_ prefix.
 */
async function handleGuestLogin() {
  clearAuthAlert();
  AppState.isGuest = true;
  currentUser = null;

  // Track anonymous guest counter once per device (Rule 5)
  trackGuestAccountCount();

  // Mark active session as guest
  localStorage.setItem('nw_guest_session', 'true');

  // Check if guest profile already exists locally
  const savedGuestProfileRaw = localStorage.getItem('nw_guest_profile');
  let guestProfile = null;
  if (savedGuestProfileRaw) {
    try {
      guestProfile = JSON.parse(savedGuestProfileRaw);
    } catch (e) {
      guestProfile = null;
    }
  }

  if (guestProfile && guestProfile.onboarded) {
    // Guest already configured class/board/stream previously
    const activeGuest = {
      id: 'guest_student',
      name: guestProfile.name || 'Guest Student',
      email: '',
      class: guestProfile.class || 'Class 10',
      stream: guestProfile.stream || '',
      board: guestProfile.board || 'CBSE',
      medium: guestProfile.medium || 'English',
      language: guestProfile.language || 'English',
      onboarded: true,
      is_admin: false
    };
    AppState.user = activeGuest;
    currentProfile = activeGuest;
    renderAppProfileData(activeGuest);
    if (typeof reloadStudyForClass === 'function') {
      reloadStudyForClass();
    }
    if (typeof reloadTestForClass === 'function') {
      reloadTestForClass();
    }
    showScreen('main-app');
    switchNavTab('home');
    showToast('Browsing as Guest. Your progress is saved locally.', 'info');
  } else {
    // New guest -> go to onboarding to pick class & syllabus
    const newGuest = {
      id: 'guest_student',
      name: 'Guest Student',
      email: '',
      class: guestProfile?.class || 'Class 10',
      stream: guestProfile?.stream || '',
      board: guestProfile?.board || 'CBSE',
      medium: guestProfile?.medium || 'English',
      language: guestProfile?.language || 'English',
      onboarded: false,
      is_admin: false
    };
    AppState.user = newGuest;
    currentProfile = newGuest;
    prefillOnboarding('Guest Student');
    showScreen('onboarding-screen');
    showToast('Welcome Guest! Select your Class and Syllabus.', 'info');
  }
}

/**
 * Open Login screen from Guest mode to sync progress
 */
function openLoginFromGuest() {
  localStorage.removeItem('nw_guest_session');
  if (window.AppState) {
    window.AppState.isGuest = false;
  }
  clearAuthAlert();
  switchAuthTab('login');
  setAuthAlert('Login or create an account to save and sync your study notes across devices.', 'info');
  showScreen('auth-screen');
}

/**
 * Quick Demo Login (Allows immediate preview without manual credentials)
 */
function handleDemoLogin() {
  AppState.isGuest = false;
  localStorage.removeItem('nw_guest_session');

  const demoUser = {
    id: 'demo-student-id-101',
    email: 'aamir.demo@noteswallah.in',
    user_metadata: { name: 'Aamir Khan' }
  };

  currentUser = demoUser;
  const demoProfile = {
    id: demoUser.id,
    name: 'Aamir Khan',
    email: demoUser.email,
    class: 'Class 10',
    stream: '',
    board: 'CBSE',
    medium: 'English',
    language: 'English',
    onboarded: true,
    is_admin: true // Enables Shop Admin for exploration
  };

  AppState.user = demoProfile;
  currentProfile = demoProfile;

  localStorage.setItem('nw_local_profile', JSON.stringify(demoProfile));
  localStorage.setItem('noteswallah_profile', JSON.stringify(demoProfile));
  renderAppProfileData(demoProfile);
  if (typeof reloadStudyForClass === 'function') {
    reloadStudyForClass();
  }
  if (typeof reloadTestForClass === 'function') {
    reloadTestForClass();
  }
  showScreen('main-app');
  switchNavTab('home');
  showToast('Logged in as Demo Student (Aamir Khan)', 'success');
}

/**
 * Handle Logout / Exit Guest
 */
async function handleLogout() {
  const wasGuest = AppState && AppState.isGuest;

  try {
    if (window.sb && !wasGuest) {
      await window.sb.auth.signOut();
    }
  } catch (err) {
    console.warn('SignOut exception:', err);
  }

  // Clear guest active session (preserves nw_guest_profile class prefs if user comes back)
  localStorage.removeItem('nw_guest_session');
  localStorage.removeItem('nw_local_profile');

  currentUser = null;
  currentProfile = null;
  if (window.AppState) {
    window.AppState.isGuest = false;
    window.AppState.user = {
      id: null,
      name: 'Student',
      email: '',
      class: 'Class 10',
      stream: '',
      board: 'CBSE',
      medium: 'English',
      language: 'English',
      onboarded: false,
      is_admin: false
    };
  }

  // Reset inputs
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (loginForm) loginForm.reset();
  if (signupForm) signupForm.reset();

  clearAuthAlert();
  switchAuthTab('login');
  showScreen('auth-screen');
  showToast(wasGuest ? 'Exited Guest Mode' : 'Logged out successfully.', 'info');
}
