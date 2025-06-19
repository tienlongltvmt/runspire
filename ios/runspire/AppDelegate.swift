import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider


import FBSDKCoreKit
import GoogleSignIn
import Firebase
import GoogleMaps

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    FirebaseApp.configure()
    self.moduleName = "runspire"
    self.dependencyProvider = RCTAppDependencyProvider()
        // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  
  // ⬇️ Add this method
  override func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    // Add any other URL handlers you're using (e.g. Facebook SDK)
    return ApplicationDelegate.shared.application(app, open: url, options: options) ||
           GIDSignIn.sharedInstance.handle(url)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
