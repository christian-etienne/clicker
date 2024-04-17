// Sélectionner l'élément du bouton
const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const bonusTimerDisplay = document.getElementById('bonusTimerDisplay');
let bonusTimer; // Variable pour stocker le timer du bonus

// Initialiser le score
let score = 0;
let bonusActive = false;

// Fonction pour gérer l'achat du développeur junior
function buyJuniorDeveloper() {
    const juniorButton = document.getElementById('devJ');

    // Ajouter un écouteur d'événements sur le bouton du développeur junior
    juniorButton.addEventListener('click', () => {
        // Vérifier si le score est suffisant pour acheter le développeur junior (25 codes)
        if (score >= 25) {
            // Mettre à jour le score et afficher un message
            score -= 25; // Déduire le coût du développeur junior du score
            document.getElementById('score').textContent = score;
            // Activer le bonus et démarrer le timer de 20 secondes
            activateBonus();
            // Mettre à jour l'affichage du score
            document.getElementById('score').textContent = score;
        } else {
            // Afficher un message si le score est insuffisant
            document.getElementById('insufficientScoreMessage').textContent = "Votre nombre de codes est insuffisant pour acheter ce personnage.";
        }
    });
}

// Fonction pour activer le bonus
function activateBonus() {
    // Vérifier si le bonus est déjà actif
    if (!bonusActive) {
        // Mettre à jour le statut du bonus
        bonusActive = true;
        // Mettre à jour le bouton pour multiplier le score par 10
        clickButton.addEventListener('click', clickWithBonus);
        // Afficher le message de bonus actif
        bonusTimerDisplay.style.display = 'inline'; // Afficher le timer dans la nav
        // Démarrer le timer de 20 secondes pour désactiver le bonus
        bonusTimer = setTimeout(deactivateBonus, 20000);
    }
}

// Fonction pour désactiver le bonus
function deactivateBonus() {
    // Mettre à jour le statut du bonus
    bonusActive = false;
    // Retirer l'événement click avec le bonus
    clickButton.removeEventListener('click', clickWithBonus);
    // Masquer le message de bonus actif
    bonusTimerDisplay.style.display = 'none'; // Masquer le timer dans la nav
}

// Fonction pour multiplier le score par 10 avec le bonus
function clickWithBonus() {
    score *= 10;
    document.getElementById('score').textContent = score;
}

// Mettre à jour le score lors du clic sur le bouton
clickButton.addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = score;
});

// Appeler la fonction pour gérer l'achat du développeur junior
buyJuniorDeveloper();
