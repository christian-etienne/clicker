// Initialisation des variables
let score = 0;
let clickPower = 1;
let autoClickerCost = 10;
let autoClickers = 0;

// Fonction pour incrémenter le score lorsque le bouton est cliqué
function clickButton() {
    score += clickPower;
    updateScore();
}

// Fonction pour mettre à jour l'affichage du score
function updateScore() {
    document.getElementById('score').innerText = score;
}

// Fonction pour acheter un auto-clicker
function buyAutoClicker() {
    if (score >= autoClickerCost) {
        autoClickers++;
        score -= autoClickerCost;
        autoClickerCost *= 2; // Augmenter le coût pour le prochain auto-clicker
        updateScore();
        updateAutoClicker();
    } else {
        alert("Not enough score!");
    }
}

// Fonction pour mettre à jour l'affichage des auto-clickers
function updateAutoClicker() {
    document.getElementById('autoClickers').innerText = autoClickers;
}

// Fonction qui fait cliquer automatiquement les auto-clickers
function autoClick() {
    score += autoClickers * clickPower;
    updateScore();
}

// Appel de la fonction autoClick() toutes les secondes
setInterval(autoClick, 1000);