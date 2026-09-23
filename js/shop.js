/**
 * NOTES WALLAH — SHOP MODULE CONTROLLER (Part 6)
 * Handles live Supabase products, user shopping UI, and Shop Admin console.
 * Client instance: window.sb ONLY (never name client 'supabase').
 * STRICT RULES: No prices, no Buy Now, marketplace referral links only.
 */

// State
let currentShopCategory = 'all';
let currentShopSearch = '';
let selectedProduct = null;
let liveProductsList = [];
let adminProductsList = [];
let adminCurrentCategory = 'all';
let adminCurrentSearch = '';
let editingProductId = null;
let isUploadingImage = false;

// Part 7: Top Banners & Automatic Sale State
let shopBannersList = [];
let currentBannerIndex = 0;
let bannerAutoSlideTimer = null;
let activeSaleState = { isActive: false, type: 'none', title: '', subtitle: '' };
let adminBannersList = [];

// Authorized Admin Emails
const ADMIN_EMAILS = [
  'noteswallahindia@gmail.com',
  'admin@noteswallah.in',
  'aamir.demo@noteswallah.in'
];

// Category Metadata
const CATEGORY_META = {
  books: { label: 'Books & Notes', icon: 'fa-solid fa-book-bookmark', color: '#2B6DEF' },
  tshirts: { label: 'Apparel', icon: 'fa-solid fa-shirt', color: '#1D4ED8' },
  mugs: { label: 'Cups & Mugs', icon: 'fa-solid fa-mug-hot', color: '#B45309' },
  stationery: { label: 'Stationery', icon: 'fa-solid fa-pen-nib', color: '#059669' },
  accessories: { label: 'Accessories', icon: 'fa-solid fa-backpack', color: '#7C3AED' }
};

/**
 * Check if the current logged in user has admin privileges
 * Rule: profiles.is_admin === true OR email in ADMIN_EMAILS (Guest is NEVER admin)
 */
function isCurrentUserAdmin() {
  if (typeof AppState !== 'undefined' && AppState.isGuest) {
    return false;
  }

  const profile = (typeof currentProfile !== 'undefined' && currentProfile) ? currentProfile : null;
  const user = (typeof currentUser !== 'undefined' && currentUser) ? currentUser : null;
  const email = (profile?.email || user?.email || '').toLowerCase().trim();

  if (profile && profile.is_admin === true) return true;
  if (email && ADMIN_EMAILS.includes(email)) return true;
  return false;
}

/**
 * Normalize raw Supabase record / fallback item into standard product model
 */
function normalizeProduct(raw) {
  const catKey = (raw.category || 'books').toLowerCase();
  const meta = CATEGORY_META[catKey] || { label: 'General', icon: 'fa-solid fa-box', color: '#2B6DEF' };

  const img1 = raw.image_url || raw.imageUrl || '';
  const img2 = raw.image_url_2 || raw.imageUrl2 || '';
  const img3 = raw.image_url_3 || raw.imageUrl3 || '';
  const images = [img1, img2, img3].filter(Boolean);

  return {
    id: String(raw.id || 'p_' + Math.random().toString(36).substring(2, 9)),
    name: raw.name || 'Untitled Product',
    category: catKey,
    categoryLabel: meta.label,
    description: raw.description || '',
    imageUrl: img1,
    imageUrl2: img2,
    imageUrl3: img3,
    images: images,
    icon: meta.icon,
    iconBg: meta.color,
    isFeatured: !!(raw.is_featured ?? raw.isFeatured),
    isPinned: !!(raw.is_pinned ?? raw.isPinned),
    isActive: raw.is_active !== undefined ? !!raw.is_active : (raw.isActive !== undefined ? !!raw.isActive : true),
    flipkartUrl: raw.flipkart_url || raw.flipkartUrl || '',
    amazonUrl: raw.amazon_url || raw.amazonUrl || '',
    meeshoUrl: raw.meesho_url || raw.meeshoUrl || '',
    otherStoreName: raw.other_store_name || raw.otherStoreName || '',
    otherStoreUrl: raw.other_store_url || raw.otherStoreUrl || '',
    createdAt: raw.created_at || raw.createdAt || new Date().toISOString()
  };
}

/**
 * Initialize / Load Shop Tab (Called from navigation.js switchNavTab)
 */
async function loadShopPage() {
  updateAdminPillVisibility();
  currentShopCategory = 'all';
  currentShopSearch = '';
  renderShopCategories();
  showShopSubView('shop-view-home');

  // 1. Detect and render automatic sale (Festival > Sunday > None)
  const saleInfo = await checkAutomaticSale();
  renderSaleStrip(saleInfo);

  // 2. Load and render top promotional banners
  await loadShopBanners();

  // 3. Pre-seed fallback products if initial list is empty
  if (!liveProductsList || liveProductsList.length === 0) {
    if (typeof SHOP_PRODUCTS !== 'undefined' && Array.isArray(SHOP_PRODUCTS)) {
      liveProductsList = SHOP_PRODUCTS.map(normalizeProduct);
    }
  }

  // 4. Sort products: pinned always first, then featured, then rest
  sortProducts(liveProductsList, saleInfo.isActive);
  renderShopProducts();

  // 5. Fetch live active products from Supabase
  try {
    if (window.sb) {
      const { data, error } = await window.sb
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (!error && Array.isArray(data) && data.length > 0) {
        liveProductsList = data.map(normalizeProduct);
        sortProducts(liveProductsList, saleInfo.isActive);
        renderShopProducts();
      }
    }
  } catch (err) {
    console.warn('Supabase public shop fetch notice:', err);
  }
}

/**
 * Sort products: Pinned first, then Featured, then Rest
 * During Sunday Sale or Festival Sale: still keep pinned first!
 */
function sortProducts(list, isSale = false) {
  list.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
    return (a.name || '').localeCompare(b.name || '');
  });
}

/**
 * Show/Hide the Shop Admin hero pill and slider pill based on user permissions
 */
function updateAdminPillVisibility() {
  const isAdmin = isCurrentUserAdmin();
  const heroPill = document.getElementById('shop-admin-hero-pill');
  const sliderPill = document.getElementById('shop-admin-slider-pill');
  if (heroPill) {
    if (isAdmin) heroPill.classList.remove('hidden');
    else heroPill.classList.add('hidden');
  }
  if (sliderPill) {
    if (isAdmin) sliderPill.classList.remove('hidden');
    else sliderPill.classList.add('hidden');
  }
}

/**
 * Switch sub-views inside the Shop tab
 */
function showShopSubView(viewId) {
  const views = document.querySelectorAll('.shop-sub-view');
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
 * Render Category Filter Chips for user shop
 */
function renderShopCategories() {
  const container = document.getElementById('shop-categories-row');
  if (!container || typeof SHOP_CATEGORIES === 'undefined') return;

  container.innerHTML = SHOP_CATEGORIES.map(cat => {
    const isActive = cat.id === currentShopCategory;
    return `
      <button 
        type="button" 
        class="shop-cat-chip ${isActive ? 'active' : ''}" 
        onclick="setShopCategory('${cat.id}')"
      >
        <i class="${cat.icon}"></i>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
}

/**
 * Set active category filter in user shop
 */
function setShopCategory(catId) {
  currentShopCategory = catId;
  renderShopCategories();
  renderShopProducts();
}

/**
 * Handle live search in user shop
 */
function handleShopSearch(query) {
  currentShopSearch = (query || '').trim().toLowerCase();
  renderShopProducts();
}

/**
 * Reset all shop filters
 */
function resetShopFilters() {
  currentShopCategory = 'all';
  currentShopSearch = '';
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = '';
  renderShopCategories();
  renderShopProducts();
}

/**
 * Render Marketplace referral buttons for product card (compact)
 * STRICT RULE: Hide button if URL is empty or whitespace.
 */
function renderCardMarketplaceButtons(product) {
  let buttonsHtml = '';
  const flipkartUrl = (product.flipkartUrl || product.flipkart_url || '').trim();
  const amazonUrl = (product.amazonUrl || product.amazon_url || '').trim();
  const meeshoUrl = (product.meeshoUrl || product.meesho_url || '').trim();
  const otherUrl = (product.otherStoreUrl || product.other_store_url || '').trim();

  if (flipkartUrl) {
    buttonsHtml += `
      <a 
        href="${flipkartUrl}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-mkt-card btn-flipkart" 
        onclick="event.stopPropagation();"
        title="View on Flipkart"
      >
        <i class="fa-solid fa-bolt"></i>
        <span>Flipkart</span>
      </a>
    `;
  }

  if (amazonUrl) {
    buttonsHtml += `
      <a 
        href="${amazonUrl}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-mkt-card btn-amazon" 
        onclick="event.stopPropagation();"
        title="View on Amazon"
      >
        <i class="fa-brands fa-amazon"></i>
        <span>Amazon</span>
      </a>
    `;
  }

  if (meeshoUrl) {
    buttonsHtml += `
      <a 
        href="${meeshoUrl}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-mkt-card btn-meesho" 
        onclick="event.stopPropagation();"
        title="View on Meesho"
      >
        <i class="fa-solid fa-bag-shopping"></i>
        <span>Meesho</span>
      </a>
    `;
  }

  if (otherUrl) {
    const storeLabel = (product.otherStoreName || product.other_store_name || 'Store').trim();
    buttonsHtml += `
      <a 
        href="${otherUrl}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-mkt-card btn-other" 
        onclick="event.stopPropagation();"
        title="View on ${storeLabel}"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        <span>${storeLabel}</span>
      </a>
    `;
  }

  return buttonsHtml;
}

function renderProductCardHtml(product) {
  const mktButtons = renderCardMarketplaceButtons(product);
  const hasImage = !!product.imageUrl;

  // In Part 7, users must NEVER see the word "Pinned" or a pin icon
  const badgesHtml = product.isFeatured ? `
    <div class="product-badges-corner" style="position: absolute; top: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 2;">
      <span class="product-featured-badge" style="position: static;"><i class="fa-solid fa-star"></i> Featured</span>
    </div>
  ` : '';

  return `
    <div class="card product-card" onclick="openProductDetail('${product.id}')">
      <div class="product-card-visual" style="--card-accent: ${product.iconBg || '#2B6DEF'}; position: relative;">
        ${badgesHtml}
        ${hasImage ? `
          <img 
            src="${product.imageUrl}" 
            alt="${product.name}" 
            class="product-card-img" 
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
        ` : ''}
        <div class="product-icon-wrap" style="background-color: ${product.iconBg || '#2B6DEF'}; ${hasImage ? 'display: none;' : ''}">
          <i class="${product.icon || 'fa-solid fa-box'}"></i>
        </div>
      </div>

      <div class="product-card-info">
        <span class="product-cat-label">${product.categoryLabel}</span>
        <h4 class="product-card-title">${product.name}</h4>
        <p class="product-card-snippet">${product.description}</p>
      </div>

      <div class="product-card-footer">
        <div class="product-mkt-label">
          <span>Available on:</span>
        </div>
        <div class="product-mkt-row">
          ${mktButtons}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Products Grid (User Shop)
 */
function renderShopProducts() {
  const container = document.getElementById('shop-products-grid');
  const countBadge = document.getElementById('shop-products-count');
  const recSection = document.getElementById('shop-recommended-section');
  const recGrid = document.getElementById('shop-recommended-grid');
  if (!container) return;

  const dataset = liveProductsList || [];

  // Filter
  const filtered = dataset.filter(item => {
    const matchCategory = currentShopCategory === 'all' || item.category === currentShopCategory;
    const matchSearch = !currentShopSearch || 
      item.name.toLowerCase().includes(currentShopSearch) || 
      item.description.toLowerCase().includes(currentShopSearch) ||
      item.categoryLabel.toLowerCase().includes(currentShopSearch);
    return matchCategory && matchSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Items`;
  }

  // Recommended Section: Show is_featured OR is_pinned products first (no "Pinned" text to users)
  const isBrowsingAll = currentShopCategory === 'all' && !currentShopSearch;
  if (recSection && recGrid) {
    if (isBrowsingAll) {
      const recommendedList = filtered.filter(p => p.isFeatured || p.isPinned);
      if (recommendedList.length > 0) {
        recSection.classList.remove('hidden');
        recGrid.innerHTML = recommendedList.map(renderProductCardHtml).join('');
      } else {
        recSection.classList.add('hidden');
      }
    } else {
      recSection.classList.add('hidden');
    }
  }

  // Handle empty state
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="shop-empty-state">
        <div class="empty-icon-circle">
          <i class="fa-solid fa-box-open"></i>
        </div>
        <h4 class="empty-title">Nothing here yet</h4>
        <p class="empty-desc">No study items match your search. Try another keyword or browse all categories.</p>
        <button type="button" class="btn btn-primary btn-sm-action" onclick="resetShopFilters()">
          <i class="fa-solid fa-rotate-left"></i>
          <span>Show All Products</span>
        </button>
      </div>
    `;
    return;
  }

  // Render cards
  container.innerHTML = filtered.map(renderProductCardHtml).join('');
}

// Global state for detail gallery
let currentDetailImageIdx = 0;
let currentDetailImages = [];

/**
 * Open Product Detail View with 1:1 Image Gallery & Lightbox
 */
function openProductDetail(productId) {
  const product = liveProductsList.find(p => p.id === productId) || 
    adminProductsList.find(p => p.id === productId) || 
    (typeof SHOP_PRODUCTS !== 'undefined' ? SHOP_PRODUCTS.find(p => p.id === productId) : null);

  if (!product) return;
  const normalized = normalizeProduct(product);
  selectedProduct = normalized;

  // Title & Info
  const titleEl = document.getElementById('detail-product-name');
  const catEl = document.getElementById('detail-product-category');
  const descEl = document.getElementById('detail-product-desc');
  const featuredBadge = document.getElementById('detail-featured-badge');

  if (titleEl) titleEl.textContent = normalized.name;
  if (catEl) catEl.textContent = normalized.categoryLabel;
  if (descEl) descEl.textContent = normalized.description;

  if (featuredBadge) {
    if (normalized.isFeatured) {
      featuredBadge.classList.remove('hidden');
      featuredBadge.innerHTML = '<i class="fa-solid fa-star"></i> Featured';
    } else {
      featuredBadge.classList.add('hidden');
    }
  }

  // Visual 1:1 Image Gallery (1-3 images)
  const galleryTrack = document.getElementById('detail-gallery-track');
  const galleryDots = document.getElementById('detail-gallery-dots');
  const images = (normalized.images && normalized.images.length > 0) ? normalized.images : [normalized.imageUrl].filter(Boolean);

  currentDetailImages = images;
  currentDetailImageIdx = 0;

  if (galleryTrack) {
    if (images.length === 0) {
      galleryTrack.innerHTML = `
        <div class="detail-gallery-slide" style="background-color: ${normalized.iconBg || '#2B6DEF'};">
          <i class="${normalized.icon || 'fa-solid fa-box'}" style="font-size: 64px; color: #FFFFFF;"></i>
        </div>
      `;
      if (galleryDots) galleryDots.classList.add('hidden');
    } else {
      galleryTrack.innerHTML = images.map((imgUrl, idx) => `
        <div class="detail-gallery-slide" onclick="openLightboxImage(${idx})" title="Tap to zoom">
          <img src="${imgUrl}" alt="${normalized.name} image ${idx + 1}" onerror="this.src='https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&auto=format&fit=crop&q=80'" />
        </div>
      `).join('');

      if (galleryDots) {
        if (images.length > 1) {
          galleryDots.classList.remove('hidden');
          galleryDots.innerHTML = images.map((_, idx) => `
            <div class="gallery-dot ${idx === 0 ? 'active' : ''}" onclick="goToDetailGallerySlide(${idx})"></div>
          `).join('');
        } else {
          galleryDots.classList.add('hidden');
        }
      }
      setupDetailGallerySwipe();
    }
    updateDetailGallerySlidePosition();
  }

  // Large Branded Marketplace Referral Links
  const mktContainer = document.getElementById('detail-marketplace-buttons');
  if (mktContainer) {
    let linksHtml = '';
    const flipkartUrl = (normalized.flipkartUrl || '').trim();
    const amazonUrl = (normalized.amazonUrl || '').trim();
    const meeshoUrl = (normalized.meeshoUrl || '').trim();
    const otherUrl = (normalized.otherStoreUrl || '').trim();

    if (flipkartUrl) {
      linksHtml += `
        <a 
          href="${flipkartUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-mkt-large btn-mkt-flipkart"
        >
          <div class="mkt-logo-box flipkart-box">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <div class="mkt-text-group">
            <span class="mkt-pre-text">Order on</span>
            <span class="mkt-name">Flipkart</span>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square mkt-arrow"></i>
        </a>
      `;
    }

    if (amazonUrl) {
      linksHtml += `
        <a 
          href="${amazonUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-mkt-large btn-mkt-amazon"
        >
          <div class="mkt-logo-box amazon-box">
            <i class="fa-brands fa-amazon"></i>
          </div>
          <div class="mkt-text-group">
            <span class="mkt-pre-text">Order on</span>
            <span class="mkt-name">Amazon India</span>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square mkt-arrow"></i>
        </a>
      `;
    }

    if (meeshoUrl) {
      linksHtml += `
        <a 
          href="${meeshoUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-mkt-large btn-mkt-meesho"
        >
          <div class="mkt-logo-box meesho-box">
            <i class="fa-solid fa-bag-shopping"></i>
          </div>
          <div class="mkt-text-group">
            <span class="mkt-pre-text">Order on</span>
            <span class="mkt-name">Meesho</span>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square mkt-arrow"></i>
        </a>
      `;
    }

    if (otherUrl) {
      const storeName = (normalized.otherStoreName || 'Official Store').trim();
      linksHtml += `
        <a 
          href="${otherUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-mkt-large btn-mkt-other"
        >
          <div class="mkt-logo-box other-box">
            <i class="fa-solid fa-store"></i>
          </div>
          <div class="mkt-text-group">
            <span class="mkt-pre-text">Order on</span>
            <span class="mkt-name">${storeName}</span>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square mkt-arrow"></i>
        </a>
      `;
    }

    if (!linksHtml) {
      linksHtml = `
        <div class="card" style="padding: 16px 20px; text-align: center; color: var(--text-secondary); font-size: 13px; border-radius: var(--radius-md);">
          <i class="fa-solid fa-circle-info" style="color: var(--primary-blue); margin-right: 6px;"></i>
          Online purchase links for this product will be available soon.
        </div>
      `;
    }

    mktContainer.innerHTML = linksHtml;
  }

  showShopSubView('shop-view-detail');
}

function updateDetailGallerySlidePosition() {
  const track = document.getElementById('detail-gallery-track');
  if (track) {
    track.style.transform = `translateX(-${currentDetailImageIdx * 100}%)`;
  }
  const dots = document.querySelectorAll('.gallery-dot');
  dots.forEach((dot, idx) => {
    if (idx === currentDetailImageIdx) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function goToDetailGallerySlide(idx) {
  if (idx >= 0 && idx < currentDetailImages.length) {
    currentDetailImageIdx = idx;
    updateDetailGallerySlidePosition();
  }
}

function setupDetailGallerySwipe() {
  const container = document.getElementById('detail-gallery-container');
  if (!container) return;
  let startX = 0;
  let endX = 0;

  container.ontouchstart = (e) => {
    startX = e.changedTouches[0].screenX;
  };
  container.ontouchend = (e) => {
    endX = e.changedTouches[0].screenX;
    const diff = endX - startX;
    if (Math.abs(diff) > 35 && currentDetailImages.length > 1) {
      if (diff < 0) {
        if (currentDetailImageIdx < currentDetailImages.length - 1) {
          currentDetailImageIdx++;
          updateDetailGallerySlidePosition();
        }
      } else {
        if (currentDetailImageIdx > 0) {
          currentDetailImageIdx--;
          updateDetailGallerySlidePosition();
        }
      }
    }
  };
}

/* Lightbox Functions */
function openLightboxImage(idx) {
  if (!currentDetailImages || currentDetailImages.length === 0) return;
  const modal = document.getElementById('product-lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const counterEl = document.getElementById('lightbox-counter');

  currentDetailImageIdx = idx;
  if (imgEl) {
    imgEl.src = currentDetailImages[idx];
    imgEl.classList.remove('zoomed');
  }
  if (counterEl) {
    if (currentDetailImages.length > 1) {
      counterEl.classList.remove('hidden');
      counterEl.textContent = `${idx + 1} / ${currentDetailImages.length}`;
    } else {
      counterEl.classList.add('hidden');
    }
  }
  if (modal) modal.classList.remove('hidden');
}

function openLightboxFromDetail() {
  openLightboxImage(currentDetailImageIdx || 0);
}

function closeProductLightbox(e) {
  const modal = document.getElementById('product-lightbox-modal');
  if (modal) modal.classList.add('hidden');
}

function toggleLightboxZoom() {
  const imgEl = document.getElementById('lightbox-img');
  if (imgEl) {
    imgEl.classList.toggle('zoomed');
  }
}

/**
 * Close Product Detail and Return to Shop Home
 */
function closeProductDetail() {
  selectedProduct = null;
  showShopSubView('shop-view-home');
}

/* ==========================================================================
   SHOP ADMIN CONSOLE CONTROLLER
   ========================================================================== */

/**
 * Open Admin Dashboard (Security Checked)
 */
async function openShopAdminDashboard() {
  if (typeof AppState !== 'undefined' && AppState.isGuest) {
    if (typeof showToast === 'function') {
      showToast('Shop Manager is not available in Guest mode.', 'error');
    } else {
      alert('Shop Manager is not available in Guest mode.');
    }
    return;
  }

  if (!isCurrentUserAdmin()) {
    alert('Admin only: You do not have permission to access the Shop Admin.');
    return;
  }

  // Switch to Shop tab if triggered from Account
  if (typeof switchNavTab === 'function') {
    switchNavTab('shop');
  }

  showShopSubView('shop-view-admin-dashboard');
  await loadAllAdminProducts();
  renderAdminDashboardMetrics();
  renderAdminRecentList();
}

/**
 * Return from Admin view to user Shop Home
 */
function closeShopAdmin() {
  showShopSubView('shop-view-home');
  loadShopPage();
}

/**
 * Fetch all products (including inactive) for Admin
 */
async function loadAllAdminProducts() {
  try {
    if (window.sb) {
      const { data, error } = await window.sb
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        adminProductsList = data.map(normalizeProduct);
        return;
      }
    }
  } catch (err) {
    console.warn('Admin products fetch notice:', err);
  }

  // Fallback to local or sample list if table is empty or connection fails
  if (!adminProductsList || adminProductsList.length === 0) {
    adminProductsList = (liveProductsList.length > 0 ? liveProductsList : (typeof SHOP_PRODUCTS !== 'undefined' ? SHOP_PRODUCTS.map(normalizeProduct) : []));
  }
}

/**
 * Render Admin Dashboard Metrics (Total / Active / Pinned)
 */
function renderAdminDashboardMetrics() {
  const total = adminProductsList.length;
  const active = adminProductsList.filter(p => p.isActive).length;
  const pinned = adminProductsList.filter(p => p.isPinned).length;

  const totalEl = document.getElementById('admin-metric-total');
  const activeEl = document.getElementById('admin-metric-active');
  const pinnedEl = document.getElementById('admin-metric-pinned');
  const btnCount = document.getElementById('admin-btn-product-count');

  if (totalEl) totalEl.textContent = total;
  if (activeEl) activeEl.textContent = active;
  if (pinnedEl) pinnedEl.textContent = pinned;
  if (btnCount) btnCount.textContent = total;
}

/**
 * Render recent products preview on Admin Dashboard
 */
function renderAdminRecentList() {
  const container = document.getElementById('admin-recent-products-list');
  if (!container) return;

  const recent = adminProductsList.slice(0, 3);
  if (recent.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card" style="padding: 16px; text-align: center; color: var(--text-tertiary); font-size: 13px;">
        No products in catalog yet. Click "+ Add New Product" to create one.
      </div>
    `;
    return;
  }

  container.innerHTML = recent.map(prod => `
    <div class="admin-product-item-card">
      <div class="admin-prod-thumb-wrap">
        ${prod.imageUrl ? 
          `<img src="${prod.imageUrl}" alt="${prod.name}" class="admin-prod-thumb-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` : ''}
        <i class="${prod.icon}" style="${prod.imageUrl ? 'display:none;' : ''}"></i>
      </div>
      <div class="admin-prod-info">
        <span class="admin-prod-title">${prod.name}</span>
        <div class="admin-prod-meta-row">
          <span class="admin-cat-tag">${prod.categoryLabel}</span>
          ${prod.isPinned ? '<span class="badge-pinned-pill"><i class="fa-solid fa-thumbtack"></i> Pinned</span>' : ''}
          ${prod.isFeatured ? '<span class="badge-featured-pill"><i class="fa-solid fa-star"></i> Featured</span>' : ''}
          <span class="status-chip ${prod.isActive ? 'active' : 'inactive'}" style="font-size: 10px; font-weight: 700; color: ${prod.isActive ? '#10B981' : '#94A3B8'};">
            ${prod.isActive ? '● Live' : '○ Inactive'}
          </span>
        </div>
      </div>
      <button type="button" class="btn-icon-admin" onclick="openEditProductForm('${prod.id}')" title="Edit product">
        <i class="fa-solid fa-pen"></i>
      </button>
    </div>
  `).join('');
}

/**
 * Open Admin All Products List Screen
 */
function openAdminProductsList() {
  if (!isCurrentUserAdmin()) {
    alert('Admin only');
    return;
  }
  adminCurrentCategory = 'all';
  adminCurrentSearch = '';
  const searchInput = document.getElementById('admin-product-search-input');
  if (searchInput) searchInput.value = '';

  renderAdminCategoryFilters();
  renderAdminProductsFullList();
  showShopSubView('shop-view-admin-products');
}

/**
 * Render category filter chips for Admin List
 */
function renderAdminCategoryFilters() {
  const container = document.getElementById('admin-category-filter-row');
  if (!container || typeof SHOP_CATEGORIES === 'undefined') return;

  container.innerHTML = SHOP_CATEGORIES.map(cat => {
    const isActive = cat.id === adminCurrentCategory;
    return `
      <button 
        type="button" 
        class="shop-cat-chip ${isActive ? 'active' : ''}" 
        onclick="setAdminCategoryFilter('${cat.id}')"
      >
        <i class="${cat.icon}"></i>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
}

function setAdminCategoryFilter(catId) {
  adminCurrentCategory = catId;
  renderAdminCategoryFilters();
  renderAdminProductsFullList();
}

function handleAdminProductSearch(query) {
  adminCurrentSearch = (query || '').trim().toLowerCase();
  renderAdminProductsFullList();
}

/**
 * Render Full Product List in Admin
 */
function renderAdminProductsFullList() {
  const container = document.getElementById('admin-products-full-list');
  if (!container) return;

  const filtered = adminProductsList.filter(item => {
    const matchCategory = adminCurrentCategory === 'all' || item.category === adminCurrentCategory;
    const matchSearch = !adminCurrentSearch || 
      item.name.toLowerCase().includes(adminCurrentSearch) || 
      item.description.toLowerCase().includes(adminCurrentSearch) ||
      item.categoryLabel.toLowerCase().includes(adminCurrentSearch);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="shop-empty-state" style="grid-column: span 1; padding: 24px 10px;">
        <div class="empty-icon-circle"><i class="fa-solid fa-boxes-stacked"></i></div>
        <h4 class="empty-title">No products found</h4>
        <p class="empty-desc">Try clearing your filters or create a new product.</p>
        <button type="button" class="btn btn-primary btn-sm-action" onclick="openAddProductForm()">
          <i class="fa-solid fa-plus"></i>
          <span>Add New Product</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => `
    <div class="admin-product-item-card">
      <div class="admin-prod-thumb-wrap">
        ${prod.imageUrl ? 
          `<img src="${prod.imageUrl}" alt="${prod.name}" class="admin-prod-thumb-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` : ''}
        <i class="${prod.icon}" style="${prod.imageUrl ? 'display:none;' : ''}"></i>
      </div>
      <div class="admin-prod-info">
        <span class="admin-prod-title">${prod.name}</span>
        <div class="admin-prod-meta-row">
          <span class="admin-cat-tag">${prod.categoryLabel}</span>
          ${prod.isPinned ? '<span class="badge-pinned-pill"><i class="fa-solid fa-thumbtack"></i> Pinned</span>' : ''}
          ${prod.isFeatured ? '<span class="badge-featured-pill"><i class="fa-solid fa-star"></i> Featured</span>' : ''}
        </div>
      </div>
      <div class="admin-prod-actions">
        <!-- Active Toggle Switch -->
        <label class="switch" title="Toggle active status in public shop">
          <input 
            type="checkbox" 
            ${prod.isActive ? 'checked' : ''} 
            onchange="toggleProductActiveState('${prod.id}', this.checked)"
          />
          <span class="slider round"></span>
        </label>
        <!-- Edit Button -->
        <button type="button" class="btn-icon-admin" onclick="openEditProductForm('${prod.id}')" title="Edit product">
          <i class="fa-solid fa-pen"></i>
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Open Form to Add New Product
 */
function openAddProductForm() {
  if (!isCurrentUserAdmin()) {
    alert('Admin only');
    return;
  }

  editingProductId = null;
  const formTitle = document.getElementById('admin-form-title');
  const submitBtn = document.getElementById('prod-form-submit-btn');
  const deleteBtn = document.getElementById('prod-form-delete-btn');
  const statusBox = document.getElementById('prod-upload-status');

  if (formTitle) formTitle.textContent = 'Add New Product';
  if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> <span>Save Product to Supabase</span>';
  if (deleteBtn) deleteBtn.classList.add('hidden');
  if (statusBox) statusBox.className = 'upload-status-box hidden';

  // Reset fields
  document.getElementById('prod-form-id').value = '';
  document.getElementById('prod-form-name').value = '';
  document.getElementById('prod-form-category').value = 'books';
  document.getElementById('prod-form-desc').value = '';
  
  // Reset all 3 image inputs
  for (let i = 1; i <= 3; i++) {
    const urlInput = document.getElementById(`prod-form-image-url-${i}`) || (i === 1 ? document.getElementById('prod-form-image-url') : null);
    const statusEl = document.getElementById(`prod-upload-status-${i}`) || (i === 1 ? document.getElementById('prod-upload-status') : null);
    if (urlInput) urlInput.value = '';
    if (statusEl) statusEl.className = 'upload-status-box hidden';
    handleImagePreviewInput('', i);
  }

  document.getElementById('prod-form-flipkart').value = '';
  document.getElementById('prod-form-amazon').value = '';
  document.getElementById('prod-form-meesho').value = '';
  document.getElementById('prod-form-other-name').value = '';
  document.getElementById('prod-form-other-url').value = '';
  document.getElementById('prod-form-featured').checked = false;
  document.getElementById('prod-form-pinned').checked = false;
  document.getElementById('prod-form-active').checked = true;

  showShopSubView('shop-view-admin-form');
}

/**
 * Open Form to Edit Existing Product
 */
function openEditProductForm(productId) {
  if (!isCurrentUserAdmin()) {
    alert('Admin only');
    return;
  }

  const product = adminProductsList.find(p => p.id === productId);
  if (!product) return;

  editingProductId = product.id;
  const formTitle = document.getElementById('admin-form-title');
  const submitBtn = document.getElementById('prod-form-submit-btn');
  const deleteBtn = document.getElementById('prod-form-delete-btn');

  if (formTitle) formTitle.textContent = 'Edit Product';
  if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> <span>Update Product</span>';
  if (deleteBtn) deleteBtn.classList.remove('hidden');

  // Populate fields
  document.getElementById('prod-form-id').value = product.id;
  document.getElementById('prod-form-name').value = product.name;
  document.getElementById('prod-form-category').value = product.category || 'books';
  document.getElementById('prod-form-desc').value = product.description;

  // Populate up to 3 image inputs
  const img1 = product.imageUrl || '';
  const img2 = product.imageUrl2 || '';
  const img3 = product.imageUrl3 || '';

  const el1 = document.getElementById('prod-form-image-url-1') || document.getElementById('prod-form-image-url');
  const el2 = document.getElementById('prod-form-image-url-2');
  const el3 = document.getElementById('prod-form-image-url-3');

  if (el1) el1.value = img1;
  if (el2) el2.value = img2;
  if (el3) el3.value = img3;

  handleImagePreviewInput(img1, 1);
  handleImagePreviewInput(img2, 2);
  handleImagePreviewInput(img3, 3);

  for (let i = 1; i <= 3; i++) {
    const statusEl = document.getElementById(`prod-upload-status-${i}`) || (i === 1 ? document.getElementById('prod-upload-status') : null);
    if (statusEl) statusEl.className = 'upload-status-box hidden';
  }

  document.getElementById('prod-form-flipkart').value = product.flipkartUrl || '';
  document.getElementById('prod-form-amazon').value = product.amazonUrl || '';
  document.getElementById('prod-form-meesho').value = product.meeshoUrl || '';
  document.getElementById('prod-form-other-name').value = product.otherStoreName || '';
  document.getElementById('prod-form-other-url').value = product.otherStoreUrl || '';
  document.getElementById('prod-form-featured').checked = !!product.isFeatured;
  document.getElementById('prod-form-pinned').checked = !!product.isPinned;
  document.getElementById('prod-form-active').checked = !!product.isActive;

  showShopSubView('shop-view-admin-form');
}

/**
 * Live Image Preview Update for Image 1, 2, or 3
 */
function handleImagePreviewInput(url, num = 1) {
  const previewBox = document.getElementById(`prod-form-image-preview-${num}`) || document.getElementById('prod-form-image-preview');
  if (!previewBox) return;

  const cleanUrl = (url || '').trim();
  if (cleanUrl) {
    previewBox.innerHTML = `
      <img 
        src="${cleanUrl}" 
        alt="Preview ${num}" 
        onerror="this.parentElement.innerHTML='<div class=\\'preview-empty-state\\'><i class=\\'fa-solid fa-circle-exclamation\\'></i><span>Invalid image URL</span></div>';" 
      />
    `;
  } else {
    previewBox.innerHTML = `
      <div class="preview-empty-state">
        <i class="fa-regular fa-image"></i>
        <span>No image ${num} yet</span>
      </div>
    `;
  }
}

/**
 * Handle image file selection and upload to Supabase Storage bucket 'shop'
 */
async function handleProductImageFileChange(input, num = 1) {
  const file = input?.files?.[0];
  if (!file) return;

  const statusBox = document.getElementById(`prod-upload-status-${num}`) || document.getElementById('prod-upload-status');
  const urlInput = document.getElementById(`prod-form-image-url-${num}`) || document.getElementById('prod-form-image-url');

  if (file.size > 5 * 1024 * 1024) {
    if (statusBox) {
      statusBox.className = 'upload-status-box error';
      statusBox.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> File is too large. Maximum size is 5MB.';
    }
    input.value = '';
    return;
  }

  if (!file.type.startsWith('image/')) {
    if (statusBox) {
      statusBox.className = 'upload-status-box error';
      statusBox.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please select a valid image file (PNG, JPG, WebP).';
    }
    input.value = '';
    return;
  }

  try {
    if (statusBox) {
      statusBox.className = 'upload-status-box loading';
      statusBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading to Supabase Storage bucket "shop"...';
    }

    const publicUrl = await uploadProductImageToSupabase(file);

    if (urlInput) {
      urlInput.value = publicUrl;
      handleImagePreviewInput(publicUrl, num);
    }

    if (statusBox) {
      statusBox.className = 'upload-status-box success';
      statusBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Image uploaded successfully!';
    }
  } catch (err) {
    console.error('Storage upload exception:', err);
    if (statusBox) {
      statusBox.className = 'upload-status-box error';
      statusBox.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Upload note: ${err.message || 'Bucket not found or permission error. You can also paste an image URL directly.'}`;
    }
  } finally {
    input.value = '';
  }
}

/**
 * Upload image helper for Supabase Storage
 */
async function uploadProductImageToSupabase(file) {
  if (!window.sb || !window.sb.storage) {
    throw new Error('Supabase client not initialized');
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const filePath = `products/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

  const { data, error } = await window.sb.storage
    .from('shop')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = window.sb.storage
    .from('shop')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Handle Save Product (Insert or Update with up to 3 images)
 */
async function handleSaveProduct(event) {
  event.preventDefault();
  if (!isCurrentUserAdmin()) {
    alert('Admin only');
    return;
  }

  const name = document.getElementById('prod-form-name').value.trim();
  const category = document.getElementById('prod-form-category').value;
  const description = document.getElementById('prod-form-desc').value.trim();

  // 3 Images
  const el1 = document.getElementById('prod-form-image-url-1') || document.getElementById('prod-form-image-url');
  const el2 = document.getElementById('prod-form-image-url-2');
  const el3 = document.getElementById('prod-form-image-url-3');

  const imageUrl1 = (el1?.value || '').trim();
  const imageUrl2 = (el2?.value || '').trim();
  const imageUrl3 = (el3?.value || '').trim();

  const flipkartUrl = document.getElementById('prod-form-flipkart').value.trim();
  const amazonUrl = document.getElementById('prod-form-amazon').value.trim();
  const meeshoUrl = document.getElementById('prod-form-meesho').value.trim();
  const otherStoreName = document.getElementById('prod-form-other-name').value.trim();
  const otherStoreUrl = document.getElementById('prod-form-other-url').value.trim();
  const isFeatured = document.getElementById('prod-form-featured').checked;
  const isPinned = document.getElementById('prod-form-pinned').checked;
  const isActive = document.getElementById('prod-form-active').checked;

  if (!name) {
    alert('Please enter a product name');
    return;
  }

  const submitBtn = document.getElementById('prod-form-submit-btn');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

  const record = {
    name: name,
    category: category,
    description: description,
    image_url: imageUrl1,
    image_url_2: imageUrl2,
    image_url_3: imageUrl3,
    flipkart_url: flipkartUrl,
    amazon_url: amazonUrl,
    meesho_url: meeshoUrl,
    other_store_name: otherStoreName,
    other_store_url: otherStoreUrl,
    is_featured: isFeatured,
    is_pinned: isPinned,
    is_active: isActive
  };

  try {
    let savedData = null;

    if (window.sb) {
      if (editingProductId) {
        const { data, error } = await window.sb
          .from('products')
          .update(record)
          .eq('id', editingProductId)
          .select();

        if (error) {
          console.warn('Supabase update notice:', error.message);
        } else if (data && data[0]) {
          savedData = data[0];
        }
      } else {
        const { data, error } = await window.sb
          .from('products')
          .insert([record])
          .select();

        if (error) {
          console.warn('Supabase insert notice:', error.message);
        } else if (data && data[0]) {
          savedData = data[0];
        }
      }
    }

    // Update local state smoothly
    if (editingProductId) {
      const idx = adminProductsList.findIndex(p => p.id === editingProductId);
      const updatedItem = normalizeProduct(savedData || { ...record, id: editingProductId });
      if (idx !== -1) {
        adminProductsList[idx] = updatedItem;
      }
      if (typeof showToast === 'function') {
        showToast('Product updated successfully!', 'success');
      }
    } else {
      const newItem = normalizeProduct(savedData || { ...record, id: 'prod_' + Date.now() });
      adminProductsList.unshift(newItem);
      if (typeof showToast === 'function') {
        showToast('Product created and published!', 'success');
      }
    }

    // Refresh metrics & public shop list
    await loadAllAdminProducts();
    renderAdminDashboardMetrics();
    openAdminProductsList();

  } catch (err) {
    console.error('Error saving product:', err);
    alert('Error saving product: ' + (err.message || 'Unknown error'));
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

/**
 * Toggle Product Active status directly from table switch
 */
async function toggleProductActiveState(productId, newStatus) {
  if (!isCurrentUserAdmin()) {
    alert('Admin only');
    return;
  }

  const prod = adminProductsList.find(p => p.id === productId);
  if (prod) {
    prod.isActive = newStatus;
  }

  try {
    if (window.sb) {
      await window.sb
        .from('products')
        .update({ is_active: newStatus })
        .eq('id', productId);
    }
  } catch (err) {
    console.warn('Notice toggling active status in Supabase:', err);
  }

  renderAdminDashboardMetrics();
  renderAdminProductsFullList();
  if (typeof showToast === 'function') {
    showToast(`Product is now ${newStatus ? 'Active in Shop' : 'Inactive'}`, 'info');
  }
}

/**
 * Delete product with confirmation
 */
async function handleDeleteProduct() {
  if (!isCurrentUserAdmin() || !editingProductId) {
    alert('Admin only');
    return;
  }

  if (!confirm('Are you sure you want to permanently delete this product?')) {
    return;
  }

  const deleteBtn = document.getElementById('prod-form-delete-btn');
  if (deleteBtn) {
    deleteBtn.disabled = true;
    deleteBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Deleting...';
  }

  try {
    if (window.sb) {
      await window.sb
        .from('products')
        .delete()
        .eq('id', editingProductId);
    }

    adminProductsList = adminProductsList.filter(p => p.id !== editingProductId);
    liveProductsList = liveProductsList.filter(p => p.id !== editingProductId);

    if (typeof showToast === 'function') {
      showToast('Product deleted from catalog', 'info');
    }

    await loadAllAdminProducts();
    renderAdminDashboardMetrics();
    openAdminProductsList();
  } catch (err) {
    console.error('Error deleting product:', err);
    alert('Failed to delete product: ' + err.message);
  }
}

/* ==========================================================================
   PART 7: AUTOMATIC SALE ENGINE
   ========================================================================== */

/**
 * Detect active sale:
 * 1. Festival sale from app_settings ('shop_sales' -> value.festivals[])
 * 2. Sunday Special Sale (if today is Sunday)
 * Festival has priority over Sunday.
 * When neither is active, normal shop mode runs automatically.
 */
async function checkAutomaticSale() {
  let festivals = [
    { name: "Diwali Mahasale", start: "2026-10-30", end: "2026-11-06" },
    { name: "Dussehra Special Sale", start: "2026-10-18", end: "2026-10-23" },
    { name: "Independence Day Sale", start: "2026-08-14", end: "2026-08-16" },
    { name: "Republic Day Sale", start: "2026-01-25", end: "2026-01-27" },
    { name: "Holi Festival Sale", start: "2026-03-02", end: "2026-03-05" }
  ];

  try {
    if (window.sb) {
      const { data, error } = await window.sb
        .from('app_settings')
        .select('*')
        .eq('id', 'shop_sales')
        .maybeSingle();

      if (!error && data && data.value && Array.isArray(data.value.festivals)) {
        festivals = data.value.festivals;
      }
    }
  } catch (err) {
    console.warn('Notice reading app_settings shop_sales:', err);
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  // 1. Festival Check (Priority 1)
  for (const f of festivals) {
    if (f && f.start && f.end) {
      const startStr = String(f.start).split('T')[0];
      const endStr = String(f.end).split('T')[0];
      if (todayStr >= startStr && todayStr <= endStr) {
        return {
          isActive: true,
          type: 'festival',
          title: f.name || 'Festival Special Sale',
          subtitle: 'Exclusive festival book sets, stationery & apparel offers'
        };
      }
    }
  }

  // 2. Sunday Check (Priority 2)
  if (now.getDay() === 0) {
    return {
      isActive: true,
      type: 'sunday',
      title: 'Sunday Special Sale',
      subtitle: 'Weekend special: curated student packs & verified marketplace links'
    };
  }

  // Normal shop
  return {
    isActive: false,
    type: 'none',
    title: '',
    subtitle: ''
  };
}

/**
 * Render or hide the automatic sale strip in the student shop
 */
function renderSaleStrip(saleInfo) {
  activeSaleState = saleInfo || { isActive: false, type: 'none', title: '', subtitle: '' };
  const strip = document.getElementById('shop-sale-strip');
  const titleEl = document.getElementById('shop-sale-title');
  const subEl = document.getElementById('shop-sale-subtitle');

  if (!strip) return;

  if (activeSaleState.isActive) {
    strip.classList.remove('hidden');
    if (titleEl) titleEl.textContent = activeSaleState.title;
    if (subEl) subEl.textContent = activeSaleState.subtitle;
  } else {
    strip.classList.add('hidden');
  }
}

/* ==========================================================================
   PART 7: TOP BANNER SLIDER CONTROLLER
   ========================================================================== */

/**
 * Load shop banners from Supabase table shop_banners with Daily logic:
 * - Prefer banners where is_active = true AND show_date = today's date (YYYY-MM-DD)
 * - If none for today, show is_active banners ordered by sort_order
 */
async function loadShopBanners() {
  const todayStr = new Date().toISOString().split('T')[0];

  try {
    if (window.sb) {
      // 1. Check for today's daily banners
      const { data: dailyBanners, error: dailyErr } = await window.sb
        .from('shop_banners')
        .select('*')
        .eq('is_active', true)
        .eq('show_date', todayStr)
        .order('sort_order', { ascending: true });

      if (!dailyErr && Array.isArray(dailyBanners) && dailyBanners.length > 0) {
        shopBannersList = dailyBanners;
        renderBannerSlider();
        return;
      }

      // 2. Fall back to all active banners ordered by sort_order
      const { data: allBanners, error: allErr } = await window.sb
        .from('shop_banners')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!allErr && Array.isArray(allBanners) && allBanners.length > 0) {
        shopBannersList = allBanners;
        renderBannerSlider();
        return;
      }
    }
  } catch (err) {
    console.warn('Supabase shop_banners fetch notice:', err);
  }

  // Fallback to default educational banners
  shopBannersList = [
    {
      id: 'default_b1',
      image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&auto=format&fit=crop&q=80',
      title: 'NCERT & Board Exam Special Books',
      link_url: '',
      sort_order: 1,
      is_active: true
    },
    {
      id: 'default_b2',
      image_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1000&auto=format&fit=crop&q=80',
      title: 'Top Handwritten Formula Books & Kits',
      link_url: '',
      sort_order: 2,
      is_active: true
    }
  ];
  renderBannerSlider();
}

/**
 * Render the banner slider track & dots, with touch swipe support
 */
function renderBannerSlider() {
  const sliderContainer = document.getElementById('shop-banner-slider-container');
  const defaultHero = document.getElementById('shop-default-hero');
  const track = document.getElementById('shop-banner-slider-track');
  const dotsContainer = document.getElementById('shop-banner-dots');

  stopBannerAutoSlide();

  if (!sliderContainer || !defaultHero) return;

  if (!shopBannersList || shopBannersList.length === 0) {
    sliderContainer.classList.add('hidden');
    defaultHero.classList.remove('hidden');
    return;
  }

  // Active banners exist: show slider, hide default hero
  sliderContainer.classList.remove('hidden');
  defaultHero.classList.add('hidden');

  currentBannerIndex = 0;

  // Render slides into track
  if (track) {
    track.innerHTML = shopBannersList.map((banner, index) => {
      const hasLink = !!banner.link_url;
      return `
        <div 
          class="shop-banner-slide" 
          onclick="handleBannerSlideClick(${index})"
          title="${banner.title || 'Notes Wallah Banner'}"
        >
          <img 
            src="${banner.image_url}" 
            alt="${banner.title || 'Promotional Banner'}"
            onerror="this.src='https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1000&auto=format&fit=crop&q=80'"
          />
          ${banner.title ? `
            <div class="slide-overlay">
              <span class="slide-title">${banner.title}</span>
              ${hasLink ? '<span class="slide-sub">Explore collection <i class="fa-solid fa-arrow-right"></i></span>' : ''}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  // Render dots
  if (dotsContainer) {
    if (shopBannersList.length > 1) {
      dotsContainer.classList.remove('hidden');
      dotsContainer.innerHTML = shopBannersList.map((_, idx) => `
        <div 
          class="banner-dot ${idx === 0 ? 'active' : ''}" 
          onclick="goToBannerSlide(${idx})"
          title="Slide ${idx + 1}"
        ></div>
      `).join('');
    } else {
      dotsContainer.classList.add('hidden');
    }
  }

  setupBannerTouchSwipe();
  updateBannerSlidePosition();
  startBannerAutoSlide();
  updateAdminPillVisibility();
}

/**
 * Mobile Touch Swipe left/right for banner carousel
 */
function setupBannerTouchSwipe() {
  const container = document.getElementById('shop-banner-slider-container');
  if (!container) return;

  let startX = 0;
  let endX = 0;

  container.ontouchstart = (e) => {
    startX = e.changedTouches[0].screenX;
    stopBannerAutoSlide();
  };

  container.ontouchend = (e) => {
    endX = e.changedTouches[0].screenX;
    const diff = endX - startX;
    if (Math.abs(diff) > 35 && shopBannersList.length > 1) {
      if (diff < 0) {
        // Swipe left -> next
        currentBannerIndex = (currentBannerIndex + 1) % shopBannersList.length;
      } else {
        // Swipe right -> prev
        currentBannerIndex = (currentBannerIndex - 1 + shopBannersList.length) % shopBannersList.length;
      }
      updateBannerSlidePosition();
    }
    startBannerAutoSlide();
  };
}

/**
 * Update the transform position of the track and active dot
 */
function updateBannerSlidePosition() {
  const track = document.getElementById('shop-banner-slider-track');
  if (track) {
    track.style.transform = `translateX(-${currentBannerIndex * 100}%)`;
  }

  const dots = document.querySelectorAll('.banner-dot');
  dots.forEach((dot, idx) => {
    if (idx === currentBannerIndex) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

/**
 * Jump to a specific slide (from user tap on dot)
 */
function goToBannerSlide(idx) {
  if (idx >= 0 && idx < shopBannersList.length) {
    currentBannerIndex = idx;
    updateBannerSlidePosition();
    startBannerAutoSlide(); // Reset 4s timer
  }
}

/**
 * Handle tap on a banner slide
 */
function handleBannerSlideClick(idx) {
  const banner = shopBannersList[idx];
  if (banner && banner.link_url) {
    window.open(banner.link_url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Auto-slide timer: rotates every 4 seconds, loops back to first
 */
function startBannerAutoSlide() {
  stopBannerAutoSlide();
  if (!shopBannersList || shopBannersList.length <= 1) return;

  bannerAutoSlideTimer = setInterval(() => {
    currentBannerIndex = (currentBannerIndex + 1) % shopBannersList.length;
    updateBannerSlidePosition();
  }, 4000);
}

function stopBannerAutoSlide() {
  if (bannerAutoSlideTimer) {
    clearInterval(bannerAutoSlideTimer);
    bannerAutoSlideTimer = null;
  }
}

/* ==========================================================================
   PART 7: SHOP ADMIN BANNERS MANAGEMENT
   ========================================================================== */

/**
 * Open Banners Management (Admin only)
 */
async function openAdminBanners() {
  if (!isCurrentUserAdmin()) {
    alert('Admin only: You do not have permission to access Shop Banners.');
    return;
  }

  showShopSubView('shop-view-admin-banners');
  renderAdminSaleStatusPanel();
  await loadAdminBannersList();
  renderAdminBannersList();
}

/**
 * Display current automatic sale status in Admin panel
 */
function renderAdminSaleStatusPanel() {
  const pill = document.getElementById('admin-sale-status-pill');
  const title = document.getElementById('admin-sale-status-title');
  const desc = document.getElementById('admin-sale-status-desc');

  if (activeSaleState && activeSaleState.isActive) {
    if (pill) {
      pill.className = 'status-chip active';
      pill.innerHTML = '<i class="fa-solid fa-circle-dot"></i> SALE LIVE';
    }
    if (title) title.textContent = activeSaleState.title;
    if (desc) {
      desc.textContent = activeSaleState.type === 'festival' ?
        'Festival Sale is currently active based on configured date range.' :
        'Sunday Special Sale is automatically active today because it is Sunday.';
    }
  } else {
    if (pill) {
      pill.className = 'status-chip inactive';
      pill.innerHTML = '<i class="fa-solid fa-pause"></i> No Sale Active';
    }
    if (title) title.textContent = 'Normal Shop Mode';
    if (desc) {
      desc.textContent = 'No festival currently matches today\'s date and today is not Sunday. Sunday Special Sale will trigger automatically on Sunday.';
    }
  }
}

/**
 * Load all banners (active + inactive) for admin
 */
async function loadAdminBannersList() {
  try {
    if (window.sb) {
      const { data, error } = await window.sb
        .from('shop_banners')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && Array.isArray(data)) {
        adminBannersList = data;
        return;
      }
    }
  } catch (err) {
    console.warn('Admin banners fetch notice:', err);
  }

  adminBannersList = [...shopBannersList];
}

/**
 * Render Admin Banners Vertical List
 */
function renderAdminBannersList() {
  const container = document.getElementById('admin-banners-list-container');
  const countBadge = document.getElementById('admin-banners-count');
  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${adminBannersList.length} Banners`;
  }

  if (adminBannersList.length === 0) {
    container.innerHTML = `
      <div class="shop-empty-state" style="padding: 24px 16px;">
        <i class="fa-regular fa-images" style="font-size: 28px; color: var(--text-secondary); margin-bottom: 8px;"></i>
        <h4 class="empty-title" style="font-size: 14px;">No Carousel Banners</h4>
        <p class="empty-desc" style="font-size: 12px;">Add your first banner using the form above to display the top carousel in the student shop.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = adminBannersList.map(b => `
    <div class="admin-banner-item-card">
      <div class="admin-banner-thumb">
        <img src="${b.image_url}" alt="${b.title || 'Banner'}" onerror="this.src='https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200'" />
      </div>
      <div class="admin-banner-info">
        <span class="admin-banner-order-tag">Order #${b.sort_order || 1}</span>
        <h5 class="admin-banner-title">${b.title || 'Untitled Banner'}</h5>
        <span class="admin-banner-link">${b.link_url ? '<i class="fa-solid fa-link"></i> ' + b.link_url : '<i class="fa-solid fa-ban"></i> No link'}</span>
      </div>
      <div class="admin-banner-actions">
        <label class="switch" title="Toggle active status">
          <input 
            type="checkbox" 
            ${b.is_active ? 'checked' : ''} 
            onchange="toggleBannerActiveState('${b.id}', this.checked)"
          />
          <span class="slider round"></span>
        </label>
        <button 
          type="button" 
          class="btn-banner-delete" 
          onclick="handleDeleteBanner('${b.id}')"
          title="Delete banner"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Handle Banner Image File Selection & Supabase Storage Upload
 * Bucket: 'shop', Path: 'banners/...'
 */
async function handleBannerImageFileChange(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  const statusBox = document.getElementById('banner-upload-status');
  const urlInput = document.getElementById('banner-form-image-url');

  if (statusBox) {
    statusBox.classList.remove('hidden');
    statusBox.className = 'upload-status-box loading';
    statusBox.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading to Supabase Storage bucket "shop" (banners/...)...';
  }

  try {
    const publicUrl = await uploadBannerImageToSupabase(file);
    if (urlInput) {
      urlInput.value = publicUrl;
      handleBannerPreviewInput(publicUrl);
    }
    if (statusBox) {
      statusBox.className = 'upload-status-box success';
      statusBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Banner image uploaded successfully!';
    }
  } catch (err) {
    console.error('Banner upload notice:', err);
    if (statusBox) {
      statusBox.className = 'upload-status-box error';
      statusBox.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Upload note: ${err.message || 'Bucket error. You can also paste an image URL directly.'}`;
    }
  } finally {
    input.value = '';
  }
}

/**
 * Upload banner image to Supabase Storage
 */
async function uploadBannerImageToSupabase(file) {
  if (!window.sb || !window.sb.storage) {
    throw new Error('Supabase client not initialized');
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const filePath = `banners/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

  const { data, error } = await window.sb.storage
    .from('shop')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  const { data: urlData } = window.sb.storage
    .from('shop')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

/**
 * Banner Live Image Preview
 */
function handleBannerPreviewInput(url) {
  const previewBox = document.getElementById('banner-form-image-preview');
  if (!previewBox) return;

  const trimmed = (url || '').trim();
  if (!trimmed) {
    previewBox.innerHTML = `
      <div class="preview-empty-state">
        <i class="fa-regular fa-image"></i>
        <span>No banner image URL yet</span>
      </div>
    `;
    return;
  }

  previewBox.innerHTML = `
    <img 
      src="${trimmed}" 
      alt="Banner preview" 
      class="prod-image-preview-img" 
      onerror="this.parentElement.innerHTML='<div class=\\'preview-empty-state error\\'><i class=\\'fa-solid fa-triangle-exclamation\\'></i><span>Failed to load preview image</span></div>';"
    />
  `;
}

/**
 * Save New Banner to Supabase
 */
async function handleSaveBanner(event) {
  event.preventDefault();
  if (!isCurrentUserAdmin()) {
    alert('Admin only');
    return;
  }

  const imageUrl = document.getElementById('banner-form-image-url').value.trim();
  const title = document.getElementById('banner-form-title').value.trim();
  const linkUrl = document.getElementById('banner-form-link-url').value.trim();
  const showDate = document.getElementById('banner-form-show-date')?.value?.trim() || null;
  const sortOrder = parseInt(document.getElementById('banner-form-order').value, 10) || 1;
  const isActive = document.getElementById('banner-form-active').checked;

  if (!imageUrl) {
    alert('Please provide or upload a banner image URL');
    return;
  }

  const submitBtn = document.getElementById('banner-form-submit-btn');
  const originalHtml = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

  const newBannerRecord = {
    image_url: imageUrl,
    title: title,
    link_url: linkUrl,
    show_date: showDate,
    sort_order: sortOrder,
    is_active: isActive
  };

  try {
    let savedBanner = null;

    if (window.sb) {
      const { data, error } = await window.sb
        .from('shop_banners')
        .insert([newBannerRecord])
        .select();

      if (error) {
        console.warn('Supabase banner insert notice:', error.message);
      } else if (data && data[0]) {
        savedBanner = data[0];
      }
    }

    const created = savedBanner || { ...newBannerRecord, id: 'b_' + Date.now() };
    adminBannersList.push(created);
    adminBannersList.sort((a, b) => (a.sort_order || 1) - (b.sort_order || 1));

    // Reset form
    document.getElementById('admin-banner-form').reset();
    document.getElementById('banner-form-order').value = (adminBannersList.length + 1).toString();
    handleBannerPreviewInput('');
    const statusBox = document.getElementById('banner-upload-status');
    if (statusBox) statusBox.classList.add('hidden');

    if (typeof showToast === 'function') {
      showToast('Banner added to carousel successfully!', 'success');
    }

    // Refresh admin list and public slider
    renderAdminBannersList();
    await loadShopBanners();

  } catch (err) {
    console.error('Error saving banner:', err);
    alert('Failed to save banner: ' + err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHtml;
  }
}

/**
 * Toggle Banner Active State directly from list switch
 */
async function toggleBannerActiveState(bannerId, newStatus) {
  if (!isCurrentUserAdmin()) {
    alert('Admin only');
    return;
  }

  const b = adminBannersList.find(item => String(item.id) === String(bannerId));
  if (b) b.is_active = newStatus;

  try {
    if (window.sb) {
      await window.sb
        .from('shop_banners')
        .update({ is_active: newStatus })
        .eq('id', bannerId);
    }
  } catch (err) {
    console.warn('Notice updating banner active state:', err);
  }

  await loadShopBanners();
  if (typeof showToast === 'function') {
    showToast(`Banner is now ${newStatus ? 'Active' : 'Inactive'}`, 'info');
  }
}

/**
 * Delete Banner
 */
async function handleDeleteBanner(bannerId) {
  if (!isCurrentUserAdmin()) {
    alert('Admin only');
    return;
  }

  if (!confirm('Are you sure you want to remove this banner from the carousel?')) {
    return;
  }

  try {
    if (window.sb) {
      await window.sb
        .from('shop_banners')
        .delete()
        .eq('id', bannerId);
    }

    adminBannersList = adminBannersList.filter(b => String(b.id) !== String(bannerId));
    renderAdminBannersList();
    await loadShopBanners();

    if (typeof showToast === 'function') {
      showToast('Banner deleted successfully', 'info');
    }
  } catch (err) {
    console.error('Error deleting banner:', err);
    alert('Failed to delete banner: ' + err.message);
  }
}
