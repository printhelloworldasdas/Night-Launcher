document.addEventListener("mousemove", (event) => {
    createFirefly(event.clientX, event.clientY);
});

function createFirefly(x, y) {
    const firefly = document.createElement("div");
    firefly.classList.add("firefly");
    document.body.appendChild(firefly);

    firefly.style.left = `${x}px`;
    firefly.style.top = `${y}px`;

    // Movimiento aleatorio de la luciérnaga
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;

    firefly.animate(
        [
            { transform: "translate(0, 0)", opacity: 1 },
            { transform: `translate(${randomX}px, ${randomY}px)`, opacity: 0 }
        ],
        {
            duration: 1000 + Math.random() * 1000, // Entre 1 y 2 segundos
            easing: "ease-out",
            fill: "forwards"
        }
    );

    // Eliminar la luciérnaga después de la animación
    setTimeout(() => {
        firefly.remove();
    }, 2000);
}
