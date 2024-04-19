// Cette ligne de code définit une fonction qui sera appelée après le chargement complet de l'ensemble de l'arbre DOM.
document.addEventListener('DOMContentLoaded', function() {

  var score = 0;
  var bucksperclick = 10;
  var totalItemsbought = 0;
  var autoClickerInterval

  // Cette fonction ajoute des points au score en utilisant la valeur de bucksperclick,
  // puis elle affiche le score mis à jour en appelant la fonction displayscore().
  function addbucks() {
    score += bucksperclick; 
    displayscore(score);
    localStorage.setItem('clickerScore', score);
  }
  // Cette fonction a pour but d'afficher le score actuel
  function displayscore(score) {
     var scoreDisplay = document.querySelector(".affichage");
    scoreDisplay.innerHTML = "Here your bucks : <br>" + score.toLocaleString("en-EN") + "$";
    localStorage.setItem('clickerScore', score);
  }
  // Cette ligne de code ajoute un écouteur d'événements à l'élément ayant l'ID "click".
  // Lorsque l'événement de clic se produit sur cet élément, cela appelle la fonction addbucks()
  // puis la fonction createRandomImage()
  document.getElementById("click").addEventListener("click", function() {
    addbucks();
    createRandomImage();
    highlightAffordableProducts();
   
  });
 // Cette fonction a pour but d'afficher les images aléatoires
  function createRandomImage() {
  
  }
  function highlightAffordableProducts() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
      const itemPrice = parseInt(button.dataset.price);
      const productImage = button.previousElementSibling; // Wybierz obraz produktu
      if (score < itemPrice) {
        
        productImage.classList.add('affordable'); // Dodaj klasę "affordable", aby podświetlić obraz
        productImage.classList.remove('non-style');
      }else if (score >= itemPrice){
        productImage.classList.remove('affordable'); // Dodaj klasę "affordable", aby podświetlić obraz
        productImage.classList.add('non-style');
        localStorage.setItem('clickerScore', score);

        
      }
    });
  }
  
  // Wywołaj funkcję, aby zaktualizować wygląd obrazów na podstawie dostępności pieniędzy gracza
 
  // Ici se deroule la gestion d'achat, affichage des messages
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(button => {
  button.addEventListener('click', function() {
    const itemPrice = parseInt(this.dataset.price);
    if (score >= itemPrice) {
      score -= itemPrice;
      updateScore();
      handlePurchase(this);
      showMessage(`You bought ${this.dataset.item}!`, itemPrice);
      totalItemsbought ++;
      if(totalItemsbought ===4){
        showMatrixBooster();
      }
      document.getElementById('message').style.backgroundColor = 'green';
    }else {
      showMessage('Not enough money to buy this item.', itemPrice);
      document.getElementById('message').style.backgroundColor = 'red';
    }

    const messageDiv = document.getElementById('message');
    messageDiv.classList.add('show');

    setTimeout(function() {
      messageDiv.classList.remove('show');
      messageDiv.style.backgroundColor = ''; 
      messageDiv.innerHTML = '';
    }, 3000);
  });
});
  
function showMessage(message) {
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = message;
  messageDiv.classList.add('show');
  
}
  function updateScore() {
    displayscore(score);
  }
  function showMatrixBooster(){
    const MatrixBooster = document.querySelector('.item3')
    MatrixBooster.style.display = 'block';
  } // Cette fonction a pour le but de multiplier les valeurs de clicks

  // Cette fonction modifie le style des images des produits pour lesquels il y a suffisamment d'argent
 

  // Appelle la fonction pour mettre en surbrillance les produits pour lesquels il y a suffisamment d'argent



  function handlePurchase(button) {
    updateScore()
    button.parentNode.remove();
    if (button.dataset.item === 'Software') {
      bucksperclick *= 2; 
      updateScore()
      displayscore(score);
    } else if (button.dataset.item === 'i-core12') {
      bucksperclick *= 3; 
      displayscore(score);
    } else if (button.dataset.item === 'Tech. AI') {
      bucksperclick *= 4; 
      displayscore(score);
    } else if (button.dataset.item === 'AI-Glasses') {
      bucksperclick *= 5;
      displayscore(score);
    } else if (button.dataset.item === 'Support'){
      bucksperclick *= 6;
      displayscore(score);
    } else if (button.dataset.item === 'Algorithmcrasher'){
      document.getElementById('second_container').style.backgroundImage = 'url("images/div.gif")';
      bucksperclick *= 7;
      displayscore(score);
    } else if (button.dataset.item === 'MatrixBooster'){
      
      bucksperclick *= 10;
      displayscore(score);
     
    }
    
  }
  if (localStorage.getItem('clickerScore')) {
    score = parseInt(localStorage.getItem('clickerScore'));
    displayscore(score);
 }
});

// La gestion des chiffre binaires
var tableNumbers = ["one.jpg", "zero.jpg"];
  var numberofNumbers = 0;
  document.getElementById("click").addEventListener("click", function() {
    numberofNumbers++;
    var elem = document.querySelector("#click").appendChild(document.createElement("img"));
    elem.setAttribute("style", "user-select: none");
    elem.style.position = "absolute";
    elem.style.width = "20px";
    elem.style.height = "20px";
    elem.style.borderRadius = "10%";
    elem.style.zIndex = "1";
    elem.style.left = Math.random() * 95 + "%";
    elem.setAttribute("src", "images/" + tableNumbers[Math.floor(tableNumbers.length * Math.random())]);
    var pos = -15;
    var id = setInterval(frame, 20);
    function frame() {
      if (pos >= 200 || numberofNumbers > 200) {
        clearInterval(id);
        elem.parentNode.removeChild(elem);
        numberofNumbers--;
        if (numberofNumbers > 200) {
          clearInterval(id);
          const images = document.querySelectorAll('#second_container img');
          images.forEach(img => {
            img.style.animationPlayState = 'paused';
          });
        }
      } else {
        pos++;
        elem.style.top = pos + 'px';
      }
    }
    
  });
 

