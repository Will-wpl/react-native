package com.rankele;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.qiuxiang.react.amap3d.AMap3DPackage;
import com.reactnativecomponent.barcode.RCTCapturePackage;
import com.cmcewen.blurview.BlurViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rusel.RCTBluetoothSerial.*;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AMap3DPackage(),
            new RCTCapturePackage(),
            new BlurViewPackage(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
            new RCTBluetoothSerialPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  public void setReactNativeHost(ReactNativeHost reactNativeHost) {
    mReactNativeHost = reactNativeHost;
  }
  
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
