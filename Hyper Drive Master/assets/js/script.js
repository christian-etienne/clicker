// Définition des constantes du jeu
const Constants = {
  priceMultiplier: 1.30 // Multiplicateur de prix pour les améliorations
};

// Définition des items disponibles à l'achat
const items = [
  { name: "item_oldCalculator", price: 0.0000001, bitsPerSecond: 0.00000001 },
  { name: "item_oldCpu", price: 0.00000125, bitsPerSecond: 0.0000001 },
  { name: "item_oldComputerFromGrandpa", price: 0.00003, bitsPerSecond: 0.000005 },
  { name: "item_rapsberrypy", price: 0.00005, bitsPerSecond: 0.0000075 },
  { name: "item_smartphone", price: 0.0005, bitsPerSecond: 0.000075 },
  { name: "item_middleClassPC", price: 0.0015, bitsPerSecond: 0.000175 },
  { name: "item_cheapServer", price: 0.004, bitsPerSecond: 0.000375 },
  { name: "item_gamingPC", price: 0.015, bitsPerSecond: 0.00175 },
  { name: "item_cheapMiner", price: 0.05, bitsPerSecond: 0.007 },
  { name: "item_highEndUltraPC", price: 0.15, bitsPerSecond: 0.021 },
  { name: "item_bigMiner", price: 1.5, bitsPerSecond: 0.2 },
  { name: "item_miningFarm", price: 250, bitsPerSecond: 25 },
  { name: "item_nasaPC", price: 5000, bitsPerSecond: 500 },
  { name: "item_quantumRig", price: 245000, bitsPerSecond: 24000 },
  { name: "item_miningFarmSpace", price: 2000000, bitsPerSecond: 95000 },
  { name: "item_miningFarmMoon", price: 37500000, bitsPerSecond: 6750 },
  { name: "item_ParsecsTimeMachine", price: 500000000, bitsPerSecond: 80000000 },
  { name: "item_blackHolePoweredMiner", price: 75000000000, bitsPerSecond: 1750000000 }
];

// Déclaration des variables globales
let parsecs = 0;
let parsecsPerSecond = 0;
let pSec = null; // Interval pour la mise à jour des parsecs
let parsecsPerClick = 0.00000001; // Valeur par défaut, ajustez selon vos besoins
let moonClicks = 0;
let level = 0;


// Initialisation du jeu
const initGame = () => {
  parsecs = parseFloat(localStorage.getItem("parsecs")) || 0;
  level = parseInt(localStorage.getItem("level")) || 1;
  parsecsPerSecond = parseFloat(localStorage.getItem("parsecsPerSecond")) || 0;
  parsecsPerClick = parseFloat(localStorage.getItem("parsecsPerClick")) || 0.00000001; // Ajout de cette ligne pour récupérer le nombre de parsecs par clic
  moonClicks = parseFloat(localStorage.getItem("moonClicks")) || 0; // Ajout de cette ligne pour récupérer le nombre de clics sur la lune
  updateUI();
  updateLevelDisplay(); // Appel de la fonction pour mettre à jour l'affichage du niveau lors de l'initialisation du jeu
}

// Mise à jour de l'affichage du niveau
const updateLevelDisplay = () => {
  const levelDisplay = document.getElementById('level');
  levelDisplay.textContent = level; // Met à jour l'affichage du niveau
};

// Mise à jour de l'interface utilisateur
const updateUI = () => {
  updateParsecsDisplay();
  updateParsecsPerSecondDisplay();
  updateItemsDisplay();
};

// Mise à jour de l'affichage du nombre de Parsecs
const updateParsecsDisplay = () => {
  $(".parsecsAmount").text(parsecs.toFixed(8));
};

// Mise à jour de l'affichage du taux de production de Parsecs/sec
const updateParsecsPerSecondDisplay = () => {
  $(".pSecRateNumber").text(parsecsPerSecond.toFixed(8));
};

// Mise à jour de l'affichage des items
const updateItemsDisplay = () => {
  items.forEach(updateItemDisplay);
};

// Mise à jour de l'affichage d'un item spécifique
const updateItemDisplay = (item) => {
  const $item = $(`#${item.name}`);
  $item.find(".amountOfItem").text(localStorage.getItem(item.name) || 0);
  $item.find(".itemPrice").text(`${item.price.toFixed(8)} Parsecs`);
};

// Calcul du nouveau prix d'un item
const getNewItemPrice = (item) => {
  const itemCount = localStorage.getItem(item.name) || 0;
  return (item.price * Constants.priceMultiplier ** itemCount);
};

// Vérification si un item peut être acheté
const canBuyItem = (item) => {
  return parsecs >= item.price;
};

// Ajout d'un item au panier
const addItemToCart = (item) => {
  const itemCount = (parseFloat(localStorage.getItem(item.name)) || 0) + 1;
  localStorage.setItem(item.name, itemCount);
  parsecs -= item.price;
  localStorage.setItem("parsecs", parsecs);
  parsecsPerSecond += item.bitsPerSecond;
  localStorage.setItem("parsecsPerSecond", parsecsPerSecond);
};

// Achat d'un item
const buyItem = (item) => {
  if (canBuyItem(item)) {
    addItemToCart(item);
    item.price = getNewItemPrice(item);
    updateUI();
  }
};

// Fonction appelée à chaque clic sur le bouton principal
const onClickMainButton = () => {
  moonClicks++; // Augmente le nombre de clics sur la lune
  parsecs += parsecsPerClick; // Ajoute le nombre de parsecs générés par clic au total de parsecs
  localStorage.setItem("parsecs", parsecs); // Enregistre le total de parsecs dans le local storage
  updateParsecsDisplay(); // Met à jour l'affichage du nombre de parsecs
  updateProgressBar(); // Met à jour la barre de progression
  updateLevel(); // Met à jour le niveau
};

// Fonction appelée à chaque seconde pour mettre à jour le nombre de Parsecs
const updateParsecs = () => {
  parsecs += parsecsPerSecond;
  localStorage.setItem("parsecs", parsecs);
  updateParsecsDisplay();
  // Vérifie si le score du joueur dépasse les seuils pour les badges et affiche le badge correspondant si c'est le cas
  if (parsecs > 0.001 && !badge1Affiche) {
    afficherBadgeEtAlerte(parsecs, 1);
    badge1Affiche = true;
  } else if (parsecs > 1 && !badge2Affiche) {
    afficherBadgeEtAlerte(parsecs, 2);
    badge2Affiche = true;
  } else if (parsecs > 100000 && !badge3Affiche) {
    afficherBadgeEtAlerte(parsecs, 3);
    badge3Affiche = true;
  }
};

// Fonction appelée à chaque clic sur un item
const onClickItem = (event) => {
  const itemName = $(event.target).closest(".purchaseItem").attr("id");
  const item = items.find((item) => item.name === itemName);
  buyItem(item);
};

// Fonction appelée lors du reset du jeu
const onResetGame = () => {
  localStorage.clear();
  location.reload();
};

// Gestion des événements
$(document).ready(() => {
  initGame();
  pSec = setInterval(updateParsecs, 1000);

  $(".lune").on("click", onClickMainButton);
  $(".purchaseList").on("click", ".purchaseItem", onClickItem);
  $(".resetButton").on("click", onResetGame);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Pluie d'asteroides

document.querySelector('.lune').addEventListener('click', function() {
  var asteroidContainer = document.getElementById('mainGameContainer'); // Changer le conteneur d'astéroïdes
  var asteroidImage = document.createElement('img');
  var asteroidImages = [
      'assets/images/asteroide1.png',
      'assets/images/asteroide2.png',
      'assets/images/asteroide3.png'
  ];
  var randomIndex = Math.floor(Math.random() * asteroidImages.length);
  var randomAsteroid = asteroidImages[randomIndex];
  
  asteroidImage.src = randomAsteroid;
  asteroidImage.classList.add('falling-asteroid');
  
  // Positionnement aléatoire dans le mainGameContainer
  var containerRect = asteroidContainer.getBoundingClientRect();
  var randomLeft = Math.random() * (containerRect.width - 50); // Largeur de l'astéroïde
  asteroidImage.style.left = randomLeft + 'px';
  asteroidImage.style.top = '0';
  
  asteroidContainer.appendChild(asteroidImage);
  
  setTimeout(function() {
      asteroidContainer.removeChild(asteroidImage);
  }, 2000);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Variable pour suivre l'état de la musique
let isMusicPlaying = false;

// Fonction pour gérer le clic sur le bouton de lecture/arrêt de la musique
const toggleMusic = () => {
    const music = document.getElementById('backgroundMusic');
    const playMusicButton = document.getElementById('playMusicButton');
    if (isMusicPlaying) {
        // Mettre en pause la musique
        music.pause();
        isMusicPlaying = false;
        // Modifier le texte du bouton
        playMusicButton.textContent = 'Play Music';
    } else {
        // Lancer la musique
        music.play();
        isMusicPlaying = true;
        // Modifier le texte du bouton
        playMusicButton.textContent = 'Stop Music';
    }
};

// Ajouter un écouteur d'événements sur le bouton
document.getElementById('playMusicButton').addEventListener('click', toggleMusic);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour afficher une alerte
const afficherAlerte = (message) => {
  // Crée un élément div pour l'alerte
  const alerteDiv = $('<div></div>').text(message).addClass('alerte');

  // Ajoute l'alerte à la page
  $('body').append(alerteDiv);

  // Supprime l'alerte après 5 secondes
  setTimeout(() => {
    alerteDiv.fadeOut(1000, () => {
      alerteDiv.remove();
    });
  }, 5000);
};

// Variables pour suivre si chaque badge a déjà été affiché
let badge1Affiche = false;
let badge2Affiche = false;
let badge3Affiche = false;

// Fonction pour afficher le badge et l'alerte correspondante
const afficherBadgeEtAlerte = (score, badgeNumber) => {
  // Sélectionne l'élément HTML du conteneur de badge
  const badgeContainer = $('#badgeContainer');

  // Crée un élément image pour le badge
  const badgeImage = $('<img>').attr('alt', 'Badge de réalisation');

  // Efface le contenu précédent du conteneur de badge
  badgeContainer.empty();

  // Ajoute un élément div vide avec une classe CSS spécifique dans le conteneur de badge
  const badgeDiv = $('<div>').addClass('badge-container');
  badgeContainer.append(badgeDiv);

  // Détermine quel badge afficher en fonction du score
  let badgeSrc = '';
  let alertMessage = '';
  if (badgeNumber === 1) {
    badgeSrc = "assets/images/badge-1.png";
    alertMessage = "Félicitations ! Vous êtes maintenant un Observateur !";
  } else if (badgeNumber === 2) {
    badgeSrc = "assets/images/badge-2.png";
    alertMessage = "Félicitations ! Vous êtes maintenant un Explorateur !";
  } else if (badgeNumber === 3) {
    badgeSrc = "assets/images/badge-3.png";
    alertMessage = "Félicitations ! Vous êtes maintenant un Aventurier !";
  } else {
    // Aucun badge n'a été obtenu
    return;
  }

  // Définit la source de l'image et ajoute la classe CSS pour le badge
  badgeImage.attr('src', badgeSrc).addClass('bottomBadge');

  // Ajoute l'image du badge dans le conteneur de badge
  badgeDiv.append(badgeImage);

  // Affiche l'alerte pendant 5 secondes
  afficherAlerte(alertMessage);
};
// Appelle la fonction pour vérifier et afficher le badge lorsque le score est mis à jour
const scoreMaj = () => {
  const scoreJoueur = parsecs; // Utilise la variable 'parsecs' définie dans ton code
  afficherBadgeEtAlerte(scoreJoueur);
};

// Appelle la fonction initiale pour vérifier et afficher le badge au chargement de la page
scoreMaj();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Tableau contenant les chemins d'accès aux images d'astronautes
const astronautImages = [
  'assets/images/astro-1.png',
  'assets/images/astro-2.png',
  'assets/images/astro-3.png',
  'assets/images/astro-4.png',
  'assets/images/astro-5.png'
];

// Fonction pour sélectionner une image aléatoire et l'afficher à l'écran
const displayRandomAstronaut = () => {
  // Sélectionne une image aléatoire dans le tableau
  const randomIndex = Math.floor(Math.random() * astronautImages.length);
  const randomImage = astronautImages[randomIndex];

  // Crée un élément image pour l'astronaute
  const astronautImage = $('<img></img>').attr('src', randomImage).addClass('astronaut');

  // Définit la position de l'image de manière aléatoire
  const maxLeft = $(window).width() - astronautImage.width();
  const maxTop = $(window).height() - astronautImage.height();
  const left = Math.random() * maxLeft;
  const top = Math.random() * maxTop;

  astronautImage.css({
    position: 'absolute',
    left: left + 'px',
    top: top + 'px',
    cursor: 'pointer'
  });

  // Ajoute l'image à la page et la supprime après 5 secondes
  $('body').append(astronautImage);
  setTimeout(() => {
    astronautImage.remove();
  }, 5000);
};

// Fonction pour doubler les parsecs lorsque l'utilisateur clique sur l'image d'astronaute
const doubleParsecs = () => {
  parsecs *= 2;
  localStorage.setItem("parsecs", parsecs);
  updateParsecsDisplay();
};

// Écoute l'événement de clic sur l'image d'astronaute
$(document).on('click', '.astronaut', function() {
  doubleParsecs();
  $(this).remove();
});

// Appelle la fonction de sélection d'image aléatoire toutes les 30 secondes
setInterval(displayRandomAstronaut, 20000);

/////////////////////////////////////////////////////////////////////
// Fonction pour mettre à jour la barre de progression
const updateProgressBar = () => {
  const progress = (moonClicks % 100) / 100;
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = progress * 100 + '%';
  if (progress === 0 && moonClicks >= 100) { // Vérifier si la barre est à 100% et que le nombre de clics est supérieur ou égal à 100
    updateLevel(); // Mettre à jour le niveau
  }
};

const updateLevel = () => {
  level = Math.floor(moonClicks / 100);
  localStorage.setItem("level", level + 1);
  updateLevelDisplay(); // Supprimez level + 1 comme argument
  increaseParsPerClick();
};

const increaseParsPerClick = () => {
  if ((moonClicks + 1) % 100 === 0 && moonClicks > 0) { // Vérifier si le nombre de clics est un multiple de 100 (en tenant compte du clic actuel) et que le niveau est supérieur à 0
    parsecsPerClick *= 2; // Doubler le nombre de parsecs par clic
    localStorage.setItem("parsecsPerClick", parsecsPerClick); // Sauvegarder le nouveau nombre de parsecs par clic dans le stockage local
  }
};

updateLevel();
