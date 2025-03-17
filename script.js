// Home button: mostrar launcher y ocultar news
document.getElementById("homeBtn").addEventListener("click", function() {
    document.getElementById("launcher").classList.remove("hidden");
    document.getElementById("newsSection").classList.add("hidden");
});

// News button: mostrar news y ocultar launcher
document.getElementById("newsBtn").addEventListener("click", function() {
    document.getElementById("launcher").classList.add("hidden");
    document.getElementById("newsSection").classList.remove("hidden");
});

// Servers button: abrir sitio de servidores
document.getElementById("serversBtn").addEventListener("click", function() {
    window.open("https://servers.eaglercraft.com/", "_blank");
});

// Launch button: abrir la versión seleccionada
document.getElementById("launchBtn").addEventListener("click", function() {
    var selectedVersion = document.getElementById("versionSelect").value;
    var filePath = "version/" + selectedVersion + ".html";  
    window.open(filePath, "_blank");
});

// Fireflies effect
document.addEventListener("mousemove", (event) => {
    createFirefly(event.clientX, event.clientY);
});

function createFirefly(x, y) {
    const firefly = document.createElement("div");
    firefly.classList.add("firefly");
    document.body.appendChild(firefly);

    firefly.style.left = `${x}px`;
    firefly.style.top = `${y}px`;

    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;

    firefly.animate(
        [{ transform: "translate(0, 0)", opacity: 1 },
         { transform: `translate(${randomX}px, ${randomY}px)`, opacity: 0 }],
        { duration: 1000 + Math.random() * 1000, easing: "ease-out", fill: "forwards" }
    );

    setTimeout(() => { firefly.remove(); }, 2000);
}

// 🎵 Reproductor de música
document.getElementById("musicBtn").addEventListener("click", function() {
    document.getElementById("musicPlayer").classList.toggle("hidden");
});

const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");

playPauseBtn.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
});

document.getElementById("volumeSlider").addEventListener("input", function(event) {
    audio.volume = event.target.value;
});
