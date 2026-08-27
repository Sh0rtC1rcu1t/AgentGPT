// Package.swift — minimal Swift package manifest for AgentBuilder (PoC)
// swift-tools-version:5.9
import PackageDescription
let package = Package(
    name: "AgentBuilder",
    platforms: [
        .iOS(.v17),
        .tvOS(.v17),
        .watchOS(.v10),
        .macOS(.v14)
    ],
    products: [
        .library(name: "AgentBuilder", targets: ["AgentBuilderApp"]),
    ],
    targets: [
        .target(name: "AgentBuilderApp", path: "Sources/AgentBuilderApp")
    ]
)
