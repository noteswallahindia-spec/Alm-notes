// ==========================================================================
// NOTES WALLAH – AdMob Configuration
// These IDs are for AdMob. Real ads need Android APK + Google Mobile Ads SDK.
// Web build only stores config and shows placeholders/mock.
// ==========================================================================

const ADMOB = {
  appId: "ca-app-pub-9901882669030871~4037033022",

  notesInterstitial: "ca-app-pub-9901882669030871/4288400182",
  homeBanner: "ca-app-pub-9901882669030871/5711050659",
  shopBanner: "ca-app-pub-9901882669030871/7619028697",
  testBanner: "ca-app-pub-9901882669030871/9943965825"
};

// Expose globally on window for app-wide access
window.ADMOB = ADMOB;

/**
 * Wire AdMob IDs to existing HTML placeholder slots:
 * 1) Pro Notes se pehle wala long ad (#ad-gate-modal) -> ADMOB.notesInterstitial (+ appId comment)
 * 2) Home banner (#ad-home-banner) -> ADMOB.homeBanner
 * 3) Shop top (#ad-shop-banner) -> ADMOB.shopBanner
 * 4) Test bottom (#ad-test-banner) -> ADMOB.testBanner
 */
function wireAdMobSlots() {
  // 1) Pro Notes long ad slot (App ID: ca-app-pub-9901882669030871~4037033022)
  const notesSlot = document.getElementById('ad-gate-modal');
  if (notesSlot) {
    notesSlot.setAttribute('data-ad-unit-id', ADMOB.notesInterstitial);
    notesSlot.setAttribute('data-ad-app-id', ADMOB.appId);
    notesSlot.setAttribute('data-ad-type', 'interstitial');
  }

  // 2) Home bottom banner
  const homeBanner = document.getElementById('ad-home-banner');
  if (homeBanner) {
    homeBanner.setAttribute('data-ad-unit-id', ADMOB.homeBanner);
    homeBanner.setAttribute('data-ad-type', 'banner');
  }

  // 3) Shop top banner
  const shopBanner = document.getElementById('ad-shop-banner');
  if (shopBanner) {
    shopBanner.setAttribute('data-ad-unit-id', ADMOB.shopBanner);
    shopBanner.setAttribute('data-ad-type', 'banner');
  }

  // 4) Test bottom banner
  const testBanner = document.getElementById('ad-test-banner');
  if (testBanner) {
    testBanner.setAttribute('data-ad-unit-id', ADMOB.testBanner);
    testBanner.setAttribute('data-ad-type', 'banner');
  }
}

// Auto-wire as soon as DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', wireAdMobSlots);
} else {
  wireAdMobSlots();
}
