// Home: mostrar launcher, ocultar noticias
document.getElementById("homeBtn").addEventListener("click", function() {
    document.getElementById("launcher").classList.remove("hidden");
    document.getElementById("newsSection").classList.add("hidden");
});

// News: mostrar noticias, ocultar launcher
document.getElementById("newsBtn").addEventListener("click", function() {
    document.getElementById("launcher").classList.add("hidden");
    document.getElementById("newsSection").classList.remove("hidden");
});

// Servers: abrir en nueva pestaña
document.getElementById("serversBtn").addEventListener("click", function() {
    window.open("https://servers.eaglercraft.com/", "_blank");
});

// Launch: abrir la versión seleccionada
document.getElementById("launchBtn").addEventListener("click", function() {
    var selectedVersion = document.getElementById("versionSelect").value;
    var filePath = "version/" + selectedVersion + ".html";
    window.open(filePath, "_blank");
});

// 🔥 Generar luciérnagas
const firefliesContainer = document.getElementById("fireflies-container");

for (let i = 0; i < 15; i++) {
    let firefly = document.createElement("div");
    firefly.classList.add("firefly");
    firefliesContainer.appendChild(firefly);
}

// Mover luciérnagas con el cursor
document.addEventListener("mousemove", (e) => {
    let fireflies = document.querySelectorAll(".firefly");
    fireflies.forEach(firefly => {
        let x = e.clientX + (Math.random() * 50 - 25);
        let y = e.clientY + (Math.random() * 50 - 25);
        firefly.style.transform = `translate(${x}px, ${y}px)`;
    });
});
