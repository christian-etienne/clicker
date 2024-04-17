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





// Fonction pour multiplier le score de +10 à chaque clic avec le bonus
function clickWithBonus() {
    score += 10; // Ajoute 10 au score à chaque clic
    document.getElementById('score').textContent = score;
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
        let count = 20; // Initialiser le compte à rebours à 20 secondes
        bonusTimerDisplay.textContent = `Bonus actif: ${count}s`; // Afficher le temps restant
        bonusTimer = setInterval(() => {
            count--; // Décrémenter le compte à rebours
            if (count <= 0) {
                clearInterval(bonusTimer); // Arrêter le timer lorsque le compte à rebours atteint 0
                deactivateBonus(); // Désactiver le bonus
            } else {
                bonusTimerDisplay.textContent = `Bonus actif: ${count}s`; // Mettre à jour le temps restant
            }
        }, 1000); // Actualiser le timer toutes les secondes
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

// Fonction pour afficher le message insuffisant et le rendre rouge pendant 2 secondes
// function showInsufficientMessage() {
//     const insufficientMessage = document.getElementById('insufficientScoreMessage');
//     insufficientMessage.style.color = 'red'; // Mettre le texte en rouge
//     insufficientMessage.textContent = "Votre nombre de codes est insuffisant pour acheter ce personnage.";
//     // Réinitialiser le message après 2 secondes
//     setTimeout(() => {
//         insufficientMessage.textContent = ""; // Effacer le message
//     }, 2000); // Attendre 2 secondes avant de réinitialiser le message
// }

// Fonction pour afficher le message insuffisant sous forme d'alerte Bootstrap
function showInsufficientMessage() {
    const insufficientAlert = document.getElementById('insufficientAlert');
    insufficientAlert.classList.add('show'); // Afficher l'alerte
    insufficientAlert.classList.add('fade'); // Ajouter la classe fade pour l'animation
    insufficientAlert.style.display = 'block'; // Afficher l'alerte
    setTimeout(() => {
        insufficientAlert.classList.remove('show'); // Masquer l'alerte après 2 secondes
        insufficientAlert.style.display = 'none'; // Masquer l'alerte après 2 secondes
    }, 2000); // Attendre 2 secondes avant de masquer l'alerte
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
            activateBonus();
            // Mettre à jour l'affichage du score
            document.getElementById('score').textContent = score;
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
            // Activer le bonus et démarrer le timer de 20 secondes
            activateExpertBonus();
            // Mettre à jour l'affichage du score
            document.getElementById('score').textContent = score;
        } else {
            // Afficher un message insuffisant en rouge
            showInsufficientMessage();
        }
    });
}

// Fonction pour multiplier le score de +30 à chaque clic avec le bonus expert
function clickWithExpertBonus() {
    score += 30; // Ajoute 30 au score à chaque clic
    document.getElementById('score').textContent = score;
}

// Fonction pour activer le bonus expert
function activateExpertBonus() {
    // Vérifier si le bonus est déjà actif
    if (!bonusActive) {
        // Mettre à jour le statut du bonus
        bonusActive = true;
        // Mettre à jour le bouton pour multiplier le score par 30 (expert)
        clickButton.addEventListener('click', clickWithExpertBonus);
        // Afficher le message de bonus actif
        bonusTimerDisplay.style.display = 'inline'; // Afficher le timer dans la nav
        // Démarrer le timer de 20 secondes pour désactiver le bonus
        let count = 20; // Initialiser le compte à rebours à 20 secondes
        bonusTimerDisplay.textContent = `Bonus actif: ${count}s`; // Afficher le temps restant
        bonusTimer = setInterval(() => {
            count--; // Décrémenter le compte à rebours
            if (count <= 0) {
                clearInterval(bonusTimer); // Arrêter le timer lorsque le compte à rebours atteint 0
                deactivateBonus(); // Désactiver le bonus
            } else {
                bonusTimerDisplay.textContent = `Bonus actif: ${count}s`; // Mettre à jour le temps restant
            }
        }, 1000); // Actualiser le timer toutes les secondes
    }
}


// Fonction pour gérer l'achat du développeur master
function buyMasterDeveloper() {
    const masterButton = document.getElementById('devM');

    // Ajouter un écouteur d'événements sur le bouton du développeur master
    masterButton.addEventListener('click', () => {
        // Vérifier si le score est suffisant pour acheter le développeur master (3000 codes)
        if (score >= 3000) {
            // Mettre à jour le score et afficher un message
            score -= 3000; // Déduire le coût du développeur master du score
            document.getElementById('score').textContent = score;
            // Activer le bonus et démarrer le mode automatique pendant 20 secondes
            activateMasterBonus();
            // Mettre à jour l'affichage du score
            document.getElementById('score').textContent = score;
        } else {
            // Afficher un message insuffisant en rouge
            showInsufficientMessage();
        }
    });
}

// Fonction pour multiplier le score de +20 en mode automatique pendant 20 secondes avec le bonus master
function activateMasterBonus() {
    // Activer le mode automatique pour 20 secondes
    let count = 20; // Initialiser le compte à rebours à 20 secondes
    const autoClick = setInterval(() => {
        count--; // Décrémenter le compte à rebours
        if (count <= 0) {
            clearInterval(autoClick); // Arrêter le mode automatique lorsque le compte à rebours atteint 0
        } else {
            score += 20; // Ajouter 20 au score en mode automatique
            document.getElementById('score').textContent = score; // Mettre à jour l'affichage du score
        }
    }, 1000); // Actualiser le score toutes les secondes
}

// Appeler la fonction pour gérer l'achat du développeur master
buyMasterDeveloper();

// Appeler la fonction pour gérer l'achat du développeur expert
buyExpertDeveloper();



// Appeler la fonction pour gérer l'achat du développeur junior
buyJuniorDeveloper();
