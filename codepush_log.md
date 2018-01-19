# running with rake android:runfresh

01-19 12:59:38.399  5141  5201 I ReactNativeJS: [CodePush] Reporting binary update (0.1.0)
01-19 12:59:39.703  5141  5201 I ReactNativeJS: [CodePush] Awaiting user action.
01-19 12:59:42.779  5141  5201 I ReactNativeJS: [CodePush] Downloading package.
01-19 12:59:43.764  5141  5418 D ReactNative: [CodePush] Applying full update.
01-19 12:59:43.784  5141  5201 I ReactNativeJS: [CodePush] Installing update.
01-19 12:59:43.861  5141  5202 D ReactNative: [CodePush] Loading JS bundle from "/data/user/0/com.esrlabs.xyz/files/CodePush/e7e95c1f1e16fd1ca2de569f6e42e6ac0311ba7041b1d673ef2d3d484ebfb6d0/CodePush/index.android.bundle"
01-19 12:59:43.863  5141  5201 I ReactNativeJS: [CodePush] Restarting app
01-19 12:59:45.527  5141  5201 I ReactNativeJS: [minimal:app] next app state: background
01-19 12:59:46.499  5141  5560 I ReactNativeJS: [minimal:reactotron] in reactotron config
01-19 12:59:46.499  5141  5560 I ReactNativeJS: [minimal:reactotron] in reactotron config
01-19 12:59:46.524  5141  5560 I ReactNativeJS: [minimal:reactotron] in reactotron config...connected
01-19 12:59:46.526  5141  5560 I ReactNativeJS: [minimal:reactotron] in reactotron config...cleared
01-19 12:59:46.707  5141  5560 I ReactNativeJS: [minimal:app] starting...............
01-19 12:59:46.830  5141  5560 I ReactNativeJS: [minimal:app] the persisted store was loaded!
01-19 12:59:46.851  5141  5560 I ReactNativeJS: [minimal:storage] loaded value for onboarding: done
01-19 12:59:46.871  5141  5560 I ReactNativeJS: [minimal:storage] loaded value for loginStored: null
01-19 12:59:46.873  5141  5560 I ReactNativeJS: [minimal:navigation] starting with tab 1
01-19 12:59:46.949  5141  5560 I ReactNativeJS: [minimal:app] next app state: background
01-19 12:59:47.371  5141  5560 I ReactNativeJS: [minimal:app] next app state: active


# running with rake android:reinstall

01-19 13:06:14.339  6252  6297 I ReactNativeJS: [minimal:DevOpts] DevOpts, componentDidMount, codepush sync
01-19 13:06:14.388  6252  6297 I ReactNativeJS: [CodePush] Checking for update.
01-19 13:06:14.392  6252  6297 I ReactNativeJS: [CodePush] Reporting binary update (0.1.0)
01-19 13:06:15.659  6252  6297 I ReactNativeJS: [CodePush] Awaiting user action.
01-19 13:06:17.790  6252  6297 I ReactNativeJS: [CodePush] Downloading package.
01-19 13:06:18.817  6252  6296 D ReactNative: [CodePush] Applying full update.
01-19 13:06:18.842  6252  6297 I ReactNativeJS: [CodePush] Installing update.
01-19 13:06:18.892  6252  6298 D ReactNative: [CodePush] Loading JS bundle from "/data/user/0/com.esrlabs.xyz/files/CodePush/e7e95c1f1e16fd1ca2de569f6e42e6ac0311ba7041b1d673ef2d3d484ebfb6d0/CodePush/index.android.bundle"
01-19 13:06:18.893  6252  6297 I ReactNativeJS: [CodePush] Restarting app
01-19 13:06:18.895  6252  6297 I ReactNativeJS: [minimal:app] next app state: background
01-19 13:06:19.597  6252  6449 I ReactNativeJS: [minimal:app] starting...............
01-19 13:06:19.615  6252  6449 E ReactNativeJS: Module AppRegistry is not a registered callable module (calling runApplication)
01-19 13:06:19.620  6252  6449 E ReactNativeJS: Module AppRegistry is not a registered callable module (calling runApplication)
01-19 13:06:19.628  6252  6450 E AndroidRuntime: FATAL EXCEPTION: mqt_native_modules
01-19 13:06:19.628  6252  6450 E AndroidRuntime: Process: com.esrlabs.xyz, PID: 6252
01-19 13:06:19.628  6252  6450 E AndroidRuntime: com.facebook.react.common.JavascriptException: Module AppRegistry is not a registered callable module (calling runApplication), stack:
01-19 13:06:19.628  6252  6450 E AndroidRuntime: value@60:3082
01-19 13:06:19.628  6252  6450 E AndroidRuntime: <unknown>@60:957
01-19 13:06:19.628  6252  6450 E AndroidRuntime: value@60:2652
01-19 13:06:19.628  6252  6450 E AndroidRuntime: value@60:929
01-19 13:06:19.628  6252  6450 E AndroidRuntime:
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at com.facebook.react.modules.core.ExceptionsManagerModule.showOrThrowError(ExceptionsManagerModule.java:56)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at com.facebook.react.modules.core.ExceptionsManagerModule.reportFatalException(ExceptionsManagerModule.java:40)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at java.lang.reflect.Method.invoke(Native Method)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at com.facebook.react.bridge.JavaMethodWrapper.invoke(JavaMethodWrapper.java:363)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at com.facebook.react.bridge.JavaModuleWrapper.invoke(JavaModuleWrapper.java:162)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at com.facebook.react.bridge.queue.NativeRunnable.run(Native Method)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at android.os.Handler.handleCallback(Handler.java:790)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at android.os.Handler.dispatchMessage(Handler.java:99)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at com.facebook.react.bridge.queue.MessageQueueThreadHandler.dispatchMessage(MessageQueueThreadHandler.java:31)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at android.os.Looper.loop(Looper.java:164)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at com.facebook.react.bridge.queue.MessageQueueThreadImpl$3.run(MessageQueueThreadImpl.java:194)
01-19 13:06:19.628  6252  6450 E AndroidRuntime:  at java.lang.Thread.run(Thread.java:764)
01-19 13:06:19.630  6252  6449 I ReactNativeJS: [minimal:app] the persisted store was loaded!
