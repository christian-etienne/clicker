
      // Sélectionner l'élément du bouton
      const clickButton = document.getElementById('clickButton');

      // Initialiser le score
      let score = 0;

      // Mettre à jour le score lors du clic sur le bouton
      clickButton.addEventListener('click', () => {
          score++;
          document.getElementById('score').textContent = score;
      });
    
      