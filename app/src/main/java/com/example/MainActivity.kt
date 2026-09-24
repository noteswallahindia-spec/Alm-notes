package com.example

import android.annotation.SuppressLint
import android.content.Intent
import android.net.Uri
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
import java.io.File

class MainActivity : ComponentActivity() {
  private var activeWebView: WebView? = null

  @SuppressLint("SetJavaScriptEnabled")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Pre-initialize WebView HTTP Code Cache directories so chromium simple_file_enumerator
    // does not log missing directory errors when inspecting disk cache
    try {
      val baseDirs = listOfNotNull(
        cacheDir,
        filesDir?.parentFile?.let { File(it, "cache") }
      )
      for (base in baseDirs) {
        val codeCacheDir = File(base, "WebView/Default/HTTP Cache/Code Cache")
        File(codeCacheDir, "js").mkdirs()
        File(codeCacheDir, "wasm").mkdirs()
      }
    } catch (e: Exception) {
      Log.d("NotesWallah", "Cache directory init: ${e.message}")
    }

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
        cacheMode = WebSettings.LOAD_DEFAULT
        useWideViewPort = true
        loadWithOverviewMode = true
        mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        mediaPlaybackRequiresUserGesture = false
        setSupportZoom(true)
        builtInZoomControls = true
        displayZoomControls = false
        setSupportMultipleWindows(true)
        javaScriptCanOpenWindowsAutomatically = true
      }

      isVerticalScrollBarEnabled = false
      isHorizontalScrollBarEnabled = false
      isClickable = true
      isFocusable = true
      isFocusableInTouchMode = true
      requestFocus(View.FOCUS_DOWN)

      webViewClient = object : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
          val url = request?.url?.toString() ?: return false
          
          // Never intercept sub-frames (iframes such as In-App PDF Reader)
          if (request.isForMainFrame == false) {
            return false
          }

          // Allow local assets and in-app embedded services inside the WebView
          if (url.startsWith("file://") || 
              url.startsWith("about:") || 
              url.startsWith("data:") || 
              url.startsWith("blob:") ||
              url.contains("docs.google.com/viewer") ||
              url.contains("drive.google.com/file") ||
              url.contains("supabase.co")) {
            return false
          }

          // External web links can be opened in default browser (Chrome preferred)
          try {
            val context = view?.context ?: this@MainActivity
            val chromeIntent = Intent(Intent.ACTION_VIEW, request.url).apply {
              setPackage("com.android.chrome")
              addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            if (chromeIntent.resolveActivity(context.packageManager) != null) {
              context.startActivity(chromeIntent)
              return true
            }

            val fallbackIntent = Intent(Intent.ACTION_VIEW, request.url).apply {
              addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            context.startActivity(fallbackIntent)
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
        override fun onCreateWindow(view: WebView?, isDialog: Boolean, isUserGesture: Boolean, resultMsg: android.os.Message?): Boolean {
          val href = view?.handler?.obtainMessage()
          view?.requestFocusNodeHref(href)
          val url = href?.data?.getString("url")
          if (!url.isNullOrEmpty()) {
            try {
              val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
              }
              startActivity(intent)
              return true
            } catch (e: Exception) {
              Log.w("NotesWallahWeb", "Could not open window for URL: $url", e)
            }
          }
          return super.onCreateWindow(view, isDialog, isUserGesture, resultMsg)
        }

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

