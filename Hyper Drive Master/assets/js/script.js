// Définition des constantes du jeu
const Constants = {
  priceMultiplier: 1.15 // Multiplicateur de prix pour les améliorations
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

// Initialisation du jeu
const initGame = () => {
  parsecs = parseFloat(localStorage.getItem("parsecs")) || 0;
  parsecsPerSecond = parseFloat(localStorage.getItem("parsecsPerSecond")) || 0;
  updateUI();
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
  parsecs += 0.00000001;
  localStorage.setItem("parsecs", parsecs);
  updateParsecsDisplay();
};

// Fonction appelée à chaque seconde pour mettre à jour le nombre de Parsecs
const updateParsecs = () => {
  parsecs += parsecsPerSecond;
  localStorage.setItem("parsecs", parsecs);
  updateParsecsDisplay();
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