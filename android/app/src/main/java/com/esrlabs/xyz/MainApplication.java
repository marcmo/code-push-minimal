package com.esrlabs.xyz;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.codepush.react.ReactInstanceHolder;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.smixx.fabric.FabricPackage;
import com.wix.interactable.Interactable;

import java.util.Arrays;
import java.util.List;

import io.fabric.sdk.android.Fabric;

public class MainApplication extends NavigationApplication implements ReactInstanceHolder {

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getReactPackages();
    }

    @NonNull
    protected List<ReactPackage> getReactPackages() {
        return Arrays.<ReactPackage>asList(
                new LottiePackage(),
                new MapsPackage(),
                new VectorIconsPackage(),
                new RNDeviceInfo(),
                new LinearGradientPackage(),
                new FabricPackage(),
                new Interactable(),
                new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG)
        );
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Fabric.with(this, new Crashlytics());
        SoLoader.init(this, /* native exopackage */ false);
    }

    @Override
    public String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }

    @Override
    public ReactInstanceManager getReactInstanceManager() {
        return getReactNativeHost().getReactInstanceManager();
    }
}
