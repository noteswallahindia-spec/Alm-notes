/**
 * ==========================================================================
 * NOTES WALLAH - Supabase Client Initialization (Part 1)
 * ==========================================================================
 * Backend: Supabase only (Auth + Database + Storage)
 * Pattern: window.sb = window.supabase.createClient(URL, KEY)
 * Note: Variable MUST be window.sb (not "supabase") to avoid CDN collision.
 */

// Supabase Configuration Credentials
const SUPABASE_URL = "https://lieruaybbivvrwuklvcc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_5qL2DOYjZ04vYrlvh0xCMw_LAZGWN5y";

// Initialize client on window.sb
(function initSupabase() {
  try {
    if (window.supabase && typeof window.supabase.createClient === "function") {
      window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      console.log("Notes Wallah: Supabase client initialized successfully.");
    } else {
      console.warn("Notes Wallah: Supabase CDN not loaded yet, will retry...");
      window.addEventListener("load", () => {
        if (window.supabase && typeof window.supabase.createClient === "function") {
          window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true
            }
          });
          console.log("Notes Wallah: Supabase client initialized on window load.");
        } else {
          console.error("Notes Wallah: Supabase library failed to load.");
        }
      });
    }
  } catch (err) {
    console.error("Notes Wallah: Failed to initialize Supabase client:", err);
  }
})();
