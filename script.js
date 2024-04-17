var score = 0;
var bucksperclick = 10;
var multiplicateur = 10;
var mult_price = 500;
var softwareBought = false;

(function() {
  function addbucks() {
    if (softwareBought) {
      score += bucksperclick * 2;
    } else {
      score += bucksperclick;
    }
    displayscore(score);
  }

  setInterval(function() {
    displayscore(score);
  }, 10);

  function displayscore(score) {
    document.querySelector(".affichage").innerHTML = "Here your bucks : <br>" + score.toLocaleString("en-EN") + "$";
  }

  document.getElementById("click").addEventListener("click", function() {
    addbucks();
  });

  function augmenterMultiplicateur() {
    multiplicateur += 10;
  }

  document.getElementById("multiplier").addEventListener("click", function() {
    if (score >= mult_price) {
      bucksperclick += multiplicateur;
      augmenterMultiplicateur();
      document.getElementById("multiplier").innerHTML = "<h2>Multiplier x" + multiplicateur + "</h2> <h4>[Price: " + mult_price.toLocaleString("en-EN") + "]</h4>";
      score -= mult_price;
      mult_price = make_price(mult_price); 
    }
  });

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

  document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemPrice = parseInt(this.dataset.price);

        if (score >= itemPrice) {
          score -= itemPrice;
          updateScore();
          handlePurchase(this);
          showMessage(`You bought ${this.dataset.item}!`, itemPrice);
        } else {
          showMessage('Not enough money to buy this item.', itemPrice);
        }
      });
    });

    function updateScore() {
    
    }

    function handlePurchase(button) {
      button.parentNode.remove();
      if (button.dataset.item === 'clickBoost') {
        softwareBought = true;
      }
    }

    function showMessage(message, itemPrice) {
      const messageDiv = document.getElementById('message');
      messageDiv.innerHTML = message;
      messageDiv.classList.add('show');
      setTimeout(function() {
        messageDiv.classList.remove('show');
        messageDiv.style.backgroundColor = ''; 
      }, 3000);
      if (score >= itemPrice) {
        messageDiv.style.backgroundColor = 'green';
      } else {
        messageDiv.style.backgroundColor = 'red';
      }
    }
  });
})();
