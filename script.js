document.getElementById("homeBtn").addEventListener("click", function() {
    // Show the launcher and hide other sections
    document.getElementById("launcher").style.display = "flex";
    document.getElementById("newsSection").classList.add("hidden");
    document.getElementById("serversSection").classList.add("hidden");
});

document.getElementById("newsBtn").addEventListener("click", function() {
    // Show the news section and hide the launcher
    document.getElementById("launcher").style.display = "none";
    document.getElementById("newsSection").classList.remove("hidden");
    document.getElementById("serversSection").classList.add("hidden");
});

document.getElementById("serversBtn").addEventListener("click", function() {
    // Open the website when the servers button is clicked
    window.open("https://servers.eaglercraft.com/", "_blank");
});

document.getElementById("backToLauncherBtn").addEventListener("click", function() {
    // Go back to the launcher from the news section
    document.getElementById("launcher").style.display = "flex";
    document.getElementById("newsSection").classList.add("hidden");
    document.getElementById("serversSection").classList.add("hidden");
});

// Launch Button functionality
document.getElementById("launchBtn").addEventListener("click", function() {
    var selectedVersion = document.getElementById("versionSelect").value;
    alert("Launching version " + selectedVersion + "...");
    // Here you can add the logic to actually launch the selected version of the game
    // For now, it just shows an alert
});
