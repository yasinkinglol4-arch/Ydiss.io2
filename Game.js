const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const player = {
    x: 0,
    y: 0,
    size: 25,
    speed: 4
};

const keys = {};

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

document.getElementById("fullscreen").onclick = () => {
    document.documentElement.requestFullscreen?.();
};

function update() {
    if (keys["w"] || keys["arrowup"]) player.y -= player.speed;
    if (keys["s"] || keys["arrowdown"]) player.y += player.speed;
    if (keys["a"] || keys["arrowleft"]) player.x -= player.speed;
    if (keys["d"] || keys["arrowright"]) player.x += player.speed;
}

function drawGrid() {
    ctx.strokeStyle = "#c8d8e8";
    ctx.lineWidth = 1;

    for (let x = -2000; x <= 2000; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, -2000);
        ctx.lineTo(x, 2000);
        ctx.stroke();
    }

    for (let y = -2000; y <= 2000; y += 50) {
        ctx.beginPath();
        ctx.moveTo(-2000, y);
        ctx.lineTo(2000, y);
        ctx.stroke();
    }
}

function drawTank() {
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.arc(0, 0, player.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#666";
    ctx.fillRect(player.size - 5, -6, 35, 12);
}

function loop() {
    update();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(
        canvas.width / 2 - player.x,
        canvas.height / 2 - player.y
    );

    drawGrid();

    ctx.save();
    ctx.translate(player.x, player.y);
    drawTank();
    ctx.restore();

    ctx.restore();

    requestAnimationFrame(loop);
}

loop();
