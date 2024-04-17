
      // Sélectionner l'élément du bouton
      const clickButton = document.getElementById('clickButton');

      // Initialiser le score
      let score = 0;

      // Mettre à jour le score lors du clic sur le bouton
      clickButton.addEventListener('click', () => {
          score++;
          document.getElementById('score').textContent = score;
      });
    

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
            // Multiplier le nombre de codes par 10
            score *= 10;
            // Mettre à jour l'affichage du score
            document.getElementById('score').textContent = score;
        } else {
            // Afficher un message si le score est insuffisant
            document.getElementById('insufficientScoreMessage').textContent = "Votre nombre de codes est insuffisant pour acheter ce personnage.";
        }
    });
}

// Appeler la fonction pour gérer l'achat du développeur junior
buyJuniorDeveloper();