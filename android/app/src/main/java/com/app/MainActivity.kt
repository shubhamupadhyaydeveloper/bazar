package com.app

import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "app"

  override fun onCreate(savedInstanceState: Bundle?) {
      SplashScreen.show(this)  // here
      super.onCreate(savedInstanceState)
  }

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
