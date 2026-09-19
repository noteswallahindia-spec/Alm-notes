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
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
  private var activeWebView: WebView? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    try {
      val webViewCache = java.io.File(cacheDir, "WebView/Default/HTTP Cache/Code Cache")
      java.io.File(webViewCache, "js").mkdirs()
      java.io.File(webViewCache, "wasm").mkdirs()
      val legacyCache = java.io.File(cacheDir, "org.chromium.android_webview")
      legacyCache.mkdirs()
    } catch (e: Exception) {
      Log.w("NotesWallah", "Cache dir init: ${e.message}")
    }
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        Surface(
          modifier = Modifier
            .fillMaxSize()
            .systemBarsPadding()
            .imePadding(),
          color = MaterialTheme.colorScheme.background
        ) {
          NotesWallahApp { webView ->
            activeWebView = webView
          }
        }
      }
    }
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

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun NotesWallahApp(onWebViewCreated: (WebView) -> Unit = {}) {
  var webViewRef by remember { mutableStateOf<WebView?>(null) }

  BackHandler(enabled = webViewRef?.canGoBack() == true) {
    webViewRef?.goBack()
  }

  AndroidView(
    modifier = Modifier.fillMaxSize(),
    factory = { context ->
      WebView(context).apply {
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
        }

        setLayerType(View.LAYER_TYPE_HARDWARE, null)
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
        webViewRef = this
        onWebViewCreated(this)
      }
    },
    update = { webView ->
      webViewRef = webView
      onWebViewCreated(webView)
    }
  )
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
  Text(text = "Hello $name!", modifier = modifier)
}

