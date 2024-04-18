// Cette ligne de code définit une fonction qui sera appelée après le chargement complet de l'ensemble de l'arbre DOM.
document.addEventListener('DOMContentLoaded', function() {
  var score = 0;
  var bucksperclick = 10;
  var numberofNumbers = 0;
  // Cette fonction ajoute des points au score en utilisant la valeur de bucksperclick,
  // puis elle affiche le score mis à jour en appelant la fonction displayscore().
  function addbucks() {
    score += bucksperclick; 
    displayscore(score);
  }
  // Cette fonction a pour but d'afficher le score actuel
  function displayscore(score) {
    document.querySelector(".affichage").innerHTML = "Here your bucks : <br>" + score.toLocaleString("en-EN") + "$";
  }
  // Cette ligne de code ajoute un écouteur d'événements à l'élément ayant l'ID "click".
  // Lorsque l'événement de clic se produit sur cet élément, cela appelle la fonction addbucks()
  // puis la fonction createRandomImage()
  document.getElementById("click").addEventListener("click", function() {
    addbucks();
    createRandomImage();
  });
 // Cette fonction a pour but d'afficher les images aléatoires
  function createRandomImage() {
  
  }
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
      document.getElementById('message').style.backgroundColor = 'green';
    } else {
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
  
  }
 // Cette fonction a pour le but de multiplier les valeurs de clicks
  function handlePurchase(button) {
    button.parentNode.remove();
    if (button.dataset.item === 'Software') {
      bucksperclick *= 2; 
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

    }
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
