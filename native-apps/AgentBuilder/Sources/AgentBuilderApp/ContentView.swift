import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            VStack(spacing:20) {
                Text("Agent Builder")
                    .font(.largeTitle)
                    .bold()
                Text("Create and configure agent workflows for iPhone/iPad/watchOS/tvOS")
                    .foregroundColor(.secondary)
                NavigationLink("Open Live Feeds", destination: Text("Live Feeds placeholder"))
                NavigationLink("Agent Templates", destination: Text("Templates placeholder"))
                Spacer()
            }
            .padding()
        }
    }
}
