// Home button: show the launcher and hide the news section
document.getElementById("homeBtn").addEventListener("click", function() {
    document.getElementById("launcher").classList.remove("hidden");
    document.getElementById("newsSection").classList.add("hidden");
});

// News button: show the news section and hide the launcher
document.getElementById("newsBtn").addEventListener("click", function() {
    document.getElementById("launcher").classList.add("hidden");
    document.getElementById("newsSection").classList.remove("hidden");
});

// Servers button: open the server website in a new tab
document.getElementById("serversBtn").addEventListener("click", function() {
    window.open("https://servers.eaglercraft.com/", "_blank");
});

// Back to Launcher button (from the news section): go back to the launcher
document.getElementById("backToLauncherBtn").addEventListener("click", function() {
    document.getElementById("launcher").classList.remove("hidden");
    document.getElementById("newsSection").classList.add("hidden");
});

// Launch button: open the selected version's HTML file
document.getElementById("launchBtn").addEventListener("click", function() {
    var selectedVersion = document.getElementById("versionSelect").value;
    var filePath = "Versions/" + selectedVersion + ".html";  // Construct file path

    // Open the corresponding version HTML file in a new tab
    window.open(filePath, "_blank");
});
