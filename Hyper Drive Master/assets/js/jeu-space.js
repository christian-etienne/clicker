const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Charger l'image du vaisseau spatial et de l'astéroïde
const spaceshipImg = new Image();
spaceshipImg.src = 'assets/images/vaisseau-jeu.png';
const asteroidImg = new Image();
asteroidImg.src = 'assets/images/asteroide-jeu.png';

// Player
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5
};

// Asteroids
const asteroids = [];
const asteroidSize = 30;
const asteroidSpeed = 2;

function drawPlayer() {
    ctx.drawImage(spaceshipImg, player.x, player.y, player.width, player.height);
}

function drawAsteroids() {
    for (let asteroid of asteroids) {
        ctx.drawImage(asteroidImg, asteroid.x, asteroid.y, asteroidSize, asteroidSize);
    }
}

function updateAsteroids() {
    for (let asteroid of asteroids) {
        asteroid.y += asteroidSpeed;
        if (asteroid.y > canvas.height) {
            // L'astéroïde a atteint le bas, réinitialisez sa position
            asteroid.y = 0;
            asteroid.x = Math.random() * canvas.width;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawAsteroids();
    updateAsteroids();
    checkCollisions(); // Ajout de la détection de collision à chaque trame
    requestAnimationFrame(draw);
}

function movePlayer(e) {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

document.addEventListener('keydown', movePlayer);

// Vérifie les collisions entre le joueur et les astéroïdes
function checkCollisions() {
    for (let asteroid of asteroids) {
        if (player.x < asteroid.x + asteroidSize &&
            player.x + player.width > asteroid.x &&
            player.y < asteroid.y + asteroidSize &&
            player.y + player.height > asteroid.y) {
            // Collision détectée, joueur perd
            gameOver();
        }
    }
}

function gameOver() {
    // Afficher un message de fin de partie
    alert('Game Over! Vous avez touché un astéroïde.');
    // Recharger la page pour redémarrer le jeu
    location.reload();
}

// Initialisation des astéroïdes
for (let i = 0; i < 5; i++) {
    asteroids.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    });
}

// Ajouter un gestionnaire d'événements pour le bouton "Jouer"
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

function startGame() {
    // Démarrer le jeu lorsque le bouton est cliqué
    draw();
}