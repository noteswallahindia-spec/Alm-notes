package com.example

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback

class MainActivity : ComponentActivity() {
  private var activeWebView: WebView? = null

  @SuppressLint("SetJavaScriptEnabled")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val webView = WebView(this).apply {
      layoutParams = ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT
      )

      settings.apply {
        javaScriptEnabled = true
        domStorageEnabled = true
        databaseEnabled = true
        allowFileAccess = true
        allowContentAccess = true
        cacheMode = WebSettings.LOAD_NO_CACHE
        useWideViewPort = true
        loadWithOverviewMode = true
        mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
      }

      setLayerType(View.LAYER_TYPE_SOFTWARE, null)
      isVerticalScrollBarEnabled = false
      isHorizontalScrollBarEnabled = false

      webViewClient = object : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
          val url = request?.url?.toString() ?: return false
          if (url.startsWith("file://") || url.startsWith("about:")) {
            return false
          }
          try {
            val intent = Intent(Intent.ACTION_VIEW, request.url)
            view?.context?.startActivity(intent)
            return true
          } catch (e: Exception) {
            return false
          }
        }

        override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
          Log.e("NotesWallahWeb", "Error loading ${request?.url}: ${error?.description}")
        }
      }

      webChromeClient = object : WebChromeClient() {
        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
          Log.d("NotesWallahJS", "${consoleMessage?.message()} [${consoleMessage?.sourceId()}:${consoleMessage?.lineNumber()}]")
          return true
        }
      }

      loadUrl("file:///android_asset/index.html")
    }

    activeWebView = webView
    setContentView(webView)

    onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
      override fun handleOnBackPressed() {
        if (activeWebView?.canGoBack() == true) {
          activeWebView?.goBack()
        } else {
          isEnabled = false
          onBackPressedDispatcher.onBackPressed()
        }
      }
    })
  }

  override fun onResume() {
    super.onResume()
    activeWebView?.onResume()
  }

  override fun onPause() {
    activeWebView?.onPause()
    super.onPause()
  }

  override fun onDestroy() {
    activeWebView?.stopLoading()
    activeWebView = null
    super.onDestroy()
  }
}

