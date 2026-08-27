# Agent Builder (Native) README

This folder contains a minimal SwiftUI Agent Builder app scaffold with targets intended for iPhone, iPad, watchOS (companion), and tvOS.

How to open
1) Open Xcode and add the AgentBuilder package/folder to a workspace or open the native-apps directory.
2) Configure bundle IDs using the prefix `com.seaglasslabs.agentgpt` and add CloudKit containers and entitlements as needed.

Notes
- This is a scaffolding/demo. To build for devices or TestFlight you must add Apple signing credentials and App Store Connect API keys to CI or Xcode.
- Do not commit signing keys or private certificates to the repo.
