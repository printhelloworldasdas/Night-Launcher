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

// Launch button: open the selected version's HTML file
document.getElementById("launchBtn").addEventListener("click", function() {
    var selectedVersion = document.getElementById("versionSelect").value;
    var filePath = "Versions/" + selectedVersion + ".html";  // Construct file path

    // Open the corresponding version HTML file in a new tab
    window.open(filePath, "_blank");
});

// Fireflies effect following cursor
document.addEventListener("mousemove", (event) => {
    createFirefly(event.clientX, event.clientY);
});

function createFirefly(x, y) {
    const firefly = document.createElement("div");
    firefly.classList.add("firefly");
    document.body.appendChild(firefly);

    firefly.style.left = `${x}px`;
    firefly.style.top = `${y}px`;

    // Random movement for fireflies
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;

    firefly.animate(
        [
            { transform: "translate(0, 0)", opacity: 1 },
            { transform: `translate(${randomX}px, ${randomY}px)`, opacity: 0 }
        ],
        {
            duration: 1000 + Math.random() * 1000,
            easing: "ease-out",
            fill: "forwards"
        }
    );

    // Remove firefly after animation
    setTimeout(() => {
        firefly.remove();
    }, 2000);
}

// ✨ Click Effect - Particle Explosion ✨
document.addEventListener("click", (event) => {
    createClickEffect(event.clientX, event.clientY);
});

function createClickEffect(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        document.body.appendChild(particle);

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 5 + 2;
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;

        particle.animate(
            [
                { transform: "translate(0, 0)", opacity: 1 },
                { transform: `translate(${velocityX * 10}px, ${velocityY * 10}px)`, opacity: 0 }
            ],
            {
                duration: 800 + Math.random() * 500,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}
