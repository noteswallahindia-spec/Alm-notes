package com.noteswallah.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.annotation.NonNull;

// AdMob SDK Imports
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;
import com.google.android.gms.ads.LoadAdError;

public class MainActivity extends Activity {

    private WebView webView;
    private AdView bannerTop, bannerMiddle, bannerBottom;
    private RewardedAd mRewardedAd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        // 1. Initialize AdMob SDK
        MobileAds.initialize(this);

        // 2. Load 3 Banner Ads
        bannerTop = findViewById(R.id.bannerTop);
        bannerMiddle = findViewById(R.id.bannerMiddle);
        bannerBottom = findViewById(R.id.bannerBottom);

        AdRequest adRequest = new AdRequest.Builder().build();
        bannerTop.loadAd(adRequest);
        bannerMiddle.loadAd(adRequest);
        bannerBottom.loadAd(adRequest);

        // 3. Load Rewarded Video Ad
        loadRewardedAd();

        // 4. Setup Website WebView
        webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        
        // Notes Wallah Website URL
        webView.loadUrl("https://noteswallahindia-spec.github.io/Alm-notes/");
    }

    private void loadRewardedAd() {
        AdRequest adRequest = new AdRequest.Builder().build();
        RewardedAd.load(this, "ca-app-pub-9901882669030871/4288400182", adRequest,
            new RewardedAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull RewardedAd rewardedAd) {
                    mRewardedAd = rewardedAd;
                }

                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                    mRewardedAd = null;
                }
            });
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
