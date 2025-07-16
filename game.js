const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: canvas.width / 2 - 10,
  y: canvas.height - 50,
  width: 20,
  height: 20,
  speed: 5,
};

const bullets = [];

function spawnBullet() {
  bullets.push({
    x: Math.random() * (canvas.width - 10),
    y: -10,
    width: 10,
    height: 10,
    speed: 3 + Math.random() * 2,
  });
}

function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function moveBullets() {
  bullets.forEach(bullet => {
    bullet.y += bullet.speed;
  });
}

function detectCollision() {
  for (let bullet of bullets) {
    if (
      bullet.x < player.x + player.width &&
      bullet.x + bullet.width > player.x &&
      bullet.y < player.y + player.height &&
      bullet.y + bullet.height > player.y
    ) {
      alert("Game Over!");
      document.location.reload();
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  moveBullets();
  detectCollision();
  requestAnimationFrame(update);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  }
  if (e.key === "ArrowRight" && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
});

setInterval(spawnBullet, 500);
update();
