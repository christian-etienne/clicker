// Sélectionner l'élément du bouton
const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const bonusTimerDisplay = document.getElementById('bonusTimerDisplay');
let bonusTimer; // Variable pour stocker le timer du bonus

// Initialiser le score
let score = 0;
let bonusActive = false;

// Mettre à jour le score lors du clic sur le bouton
clickButton.addEventListener('click', () => {
    score++;
    document.getElementById('score').textContent = score;
});

function clickWithNormalBonus() {
    score++;
    document.getElementById('score').textContent = score;
}





// Fonction pour afficher le message insuffisant sous forme d'alerte Bootstrap
function showInsufficientMessage() {
    alert("Votre nombre de codes est insuffisant pour acheter ce personnage.");
}

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
            activateBonus(10); // Le bonus du développeur junior est de +10 par clic
            // Mettre à jour l'affichage du score
            document.getElementById('score').textContent = score;
            bonusActive = false; // Réinitialiser bonusActive
        } else {
            // Afficher un message insuffisant en rouge
            showInsufficientMessage();
        }
    });
}

// Fonction pour gérer l'achat du développeur expert
function buyExpertDeveloper() {
    const expertButton = document.getElementById('devE');

    // Ajouter un écouteur d'événements sur le bouton du développeur expert
    expertButton.addEventListener('click', () => {
        // Vérifier si le score est suffisant pour acheter le développeur expert (1000 codes)
        if (score >= 1000) {
            // Mettre à jour le score et afficher un message
            score -= 1000; // Déduire le coût du développeur expert du score
            document.getElementById('score').textContent = score;
            // Activer le bonus expert et démarrer le timer de 20 secondes
            activateBonus(30); // Le bonus du développeur expert est de +30 par clic
            // Mettre à jour l'affichage du score
            document.getElementById('score').textContent = score;
            bonusActive = false; // Réinitialiser bonusActive
        } else {
            // Afficher un message insuffisant en rouge
            showInsufficientMessage();
        }
    });
}

// Fonction pour gérer l'achat du développeur master
function buyMasterDeveloper() {
    const masterButton = document.getElementById('devM');
  
    masterButton.addEventListener('click', () => {
      if (score >= 3000) {
        score -= 3000;
        document.getElementById('score').textContent = score;
  
        // Activer le bonus automatique et démarrer le timer de 20 secondes
        activateAutoBonus(100);
      } else {
        showInsufficientMessage();
      }
    });

}
  



function autoClickWithBonus(bonusValue) {
    score += bonusValue;
    document.getElementById('score').textContent = score;
}

function activateAutoBonus(bonusValue) {
    bonusActive = true;
    let count = 20;
  
    bonusTimerDisplay.style.display = 'inline';
    bonusTimerDisplay.textContent = `Bonus actif: ${count}s`;
  
    let autoClickInterval = setInterval(() => {
      autoClickWithBonus(bonusValue);
    }, 100); // Générer un clic automatique toutes les 100 millisecondes
  
    bonusTimer = setInterval(() => {
      count--;
  
      if (count <= 0) {
        clearInterval(bonusTimer);
        clearInterval(autoClickInterval);
        bonusTimerDisplay.style.display = 'none';
        bonusActive = false;
      } else {
        bonusTimerDisplay.textContent = `Bonus actif: ${count}s`;
      }
    }, 1000);


}
  


// Fonction pour multiplier le score de manière spécifique avec le bonus actif
function clickWithBonus(bonusValue) {
    score += bonusValue; // Ajoute la valeur du bonus au score à chaque clic
    document.getElementById('score').textContent = score;
}

function activateBonus(bonusValue) {
    // Stocker l'événement de clic actuel
    const currentClickEvent = clickButton.onclick;

    // Mettre à jour le statut du bonus
    bonusActive = true;
    // Mettre à jour le bouton pour multiplier le score par la valeur spécifiée
    clickButton.onclick = () => clickWithBonus(bonusValue);
    // Afficher le message de bonus actif
    bonusTimerDisplay.style.display = 'inline'; // Afficher le timer dans la nav
    // Démarrer le timer de 20 secondes pour désactiver le bonus
    let count = 20; // Initialiser le compte à rebours à 20 secondes
    bonusTimerDisplay.textContent = `Bonus actif: ${count}s`; // Afficher le temps restant
    bonusTimer = setInterval(() => {
        count--; // Décrémenter le compte à rebours
        if (count <= 0) {
            clearInterval(bonusTimer); // Arrêter le timer lorsque le compte à rebours atteint 0
            bonusTimerDisplay.style.display = 'none'; // Cacher le timer
            bonusActive = false; // Désactiver le bonus

            // Réinitialiser l'événement de clic du bouton
            clickButton.onclick = currentClickEvent || clickWithNormalBonus;
        } else {
            bonusTimerDisplay.textContent = `Bonus actif: ${count}s`; // Mettre à jour le temps restant
        }
    }, 1000); // Actualiser le timer toutes les secondes
}

// Appeler la fonction pour gérer l'achat du développeur master
buyMasterDeveloper();

// Appeler la fonction pour gérer l'achat du développeur expert
buyExpertDeveloper();

// Appeler la fonction pour gérer l'achat du développeur junior
buyJuniorDeveloper();
