// Variables pour suivre le score et le taux de production de Parsecs
let parsecs = 0;
let parsecsPerSecond = 0;

let items = [
    { "name": "item_oldCalculator", "price": "0.0000001" },
    { "name": "item_oldCpu", "price": "0.00000125" },
    { "name": "item_oldComputerFromGrandpa", "price": "0.00003" },
    { "name": "item_rapsberrypy", "price": "0.00005" },
    { "name": "item_smartphone", "price": "0.0005" },
    { "name": "item_middleClassPC", "price": "0.0015" },
    { "name": "item_cheapServer", "price": "0.004" },
    { "name": "item_gamingPC", "price": "0.015" },
    { "name": "item_cheapMiner", "price": "0.05" },
    { "name": "item_highEndUltraPC", "price": "0.15" },
    { "name": "item_bigMiner", "price": "1.5" },
    { "name": "item_miningFarm", "price": "250" },
    { "name": "item_nasaPC", "price": "5000" },
    { "name": "item_quantumRig", "price": "245000" },
    { "name": "item_miningFarmSpace", "price": "2000000" },
    { "name": "item_miningFarmMoon", "price": "75500000" },
    { "name": "item_ParsecsTimeMachine", "price": "975000000" },
    { "name": "item_blackHolePoweredMiner", "price": "750000000000" }
  ]
  
// Rate is null (at the beginning)
let pSec = null;

if(localStorage.getItem("parsecs") === null){

  parsecs = 0

  // Set the localStorage Item for the first time
  localStorage.setItem("parsecs", "0");

  // Write the current amount of Parsecs on the page
  $(".parsecsAmount").text(parsecs.toFixed(8))

}else{

  // Get the amount of Parsecs and parse them to a float number
  parsecs = parseFloat(localStorage.getItem("parsecs"))

  $(".parsecsAmount").text("loading...")
}


let Game = {}

Game.GameConst = {
    "priceMultiplier": 1.15
}
Game.units = [
    "Million",
    "Milliard",
    "Trilliard",
    "Quadrilliard",
    "Quintilliard",
    "Sextilliard",
    "Septilliard",
    "Octilliard",
    "Nonilliard",
    "Decilliard",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quattuordecillion",
    "Quindecillion",
    "Sexdecillion",
    "Septdecillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
    "Unvigintillion",
    "Duovigintillion",
    "Trevigintillion",
    "Quattuorvigintillion",
    "Quinvigintillion",
    "Sexvigintillion",
    "Septvigintillion",
    "Octovigintillion",
    "Novemvigintillion",
    "Trigintillion"
]

/**
 * Calculating every price for the items when the game was started (and if there are any items).
 *
 * @param element {HTMLElement} - The HTML element of the item on the game page
 * @param price {Number} - The price of the item, got from the items Object
 * @param itemAmount {Number} - The current amount of the item, saved in the localStorage
 */
Game.setPriceAtGameBeginning = function (element, price, itemAmount) {

    // Calculation of the price
    let multiplier = Game.GameConst.priceMultiplier
  
    // Calculate the new price -> price * multiplier^itemAmount
    var calculation = (parseFloat(price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8)
  
    // Showing the actual price
    element.children()[2].textContent = calculation + " Parsecs"
  
    // Set the data-price attribute with the new price
    element.attr("data-price", calculation.toString())
  
  }

  /**
 * Function to increase the amount of the item (in the localStorage) with the specific identifier.
 *
 * @param id - The identifier of the item (the id from the list element)
 */
Game.itemAction = function (id) {

    var item = id
    var itemAmount = 0;
  
    if(localStorage.getItem(item) === null){
      localStorage.setItem(item, "1");
    }else{
      itemAmount = parseInt(localStorage.getItem(item))
  
      localStorage.setItem(item, "" + (itemAmount + 1) + "");
  
    }
  
  }
  
/**
 * Calculating the Parsecs per Second - rate when the page was opened.
 *
 */
Game.setParsecsPerSecondRateAtBeginning = function () {

    for(var i = 0; i < items.length; i++){
      if(localStorage.getItem(items[i].name) === null){
        localStorage.setItem(items[i].name, "0")
      }else{
        // HTML element on the game page
        var $element = $("#" + items[i].name)
  
        // Amnount of the item
        var itemAmount = localStorage.getItem(items[i].name)
  
        // Writing the amount on the page at the item´s element
        $element.children()[0].textContent = itemAmount

        // Only calculate the new price if there is more than 0 items.
        // If there are not enough items, it will just continue, and if there are,
        // it will execute the function and continue after it as well.
        if(itemAmount > 0) {
          Game.setPriceAtGameBeginning($element, parseFloat(items[i].price), parseInt(itemAmount))
        }
  
        // Getting the data-bits-per-sec attribute, needed for calculating the bitcoin/sec rate
        var bits_per_sec = $element.attr("data-bits-per-sec")
        itemAmount = parseInt(itemAmount)
  
        // The rate before
        var before = parsecsPerSecond
  
        // Calculating the rate
        parsecsPerSecond = parsecsPerSecond + (itemAmount * bits_per_sec)
  
        // Logging the calculation in the console
        console.log("i = " + i + " | B/sec before: " + before.toFixed(8) +
          " - Calculation made: " + before.toFixed(8) + " + (" + itemAmount + " * " + bits_per_sec + ") = " +  parsecsPerSecond.toFixed(8) +
          " | New B/sec at " + parsecsPerSecond.toFixed(8))
      }
    }
  
  }

/**
 * Function which sets a new "parsecs per Second" rate
 *
 * @param rate - The number which must be added to the current Bitcoin per Second - rate
 * @returns {Number} - Returning the new parsecs per Second - rate
 */
Game.setNewparsecsPerSecond = function (rate) {

    // Logging the new parsecs per second rate
    console.log("setNewparsecsPerSecond -> New rate: " + (parsecsPerSecond + rate).toFixed(8) )
  
    // Showing the new rate on the page
    // Rounding at specific values
    if((parsecsPerSecond + rate) >= 1000000) {
      $(".pSecRateNumber").text((parsecsPerSecond + rate).toFixed(0).optimizeNumber())
    }else if((parsecsPerSecond + rate) >= 1000 ){
      $(".pSecRateNumber").text((parsecsPerSecond + rate).toFixed(0))
    }else if((parsecsPerSecond + rate) >= 1 ){
      $(".pSecRateNumber").text((parsecsPerSecond + rate).toFixed(2))
    }else{
      $(".pSecRateNumber").text((parsecsPerSecond + rate).toFixed(8))
    }
  
    // Returning the new rate
    return parsecsPerSecond = parsecsPerSecond + rate;
  
  }

/**
 * This function will check if there is any change in the localStorage,
 * especially looking at the item amount. So it will actually calculate every price again and
 * again. (This function should be recoded)
 *
 * TODO: Find a better way for setting the price after an item was bought.
 */
Game.setNewPrice = function()
{
  // for-loop for getting the price multiplier and to calculate the new price
  for(var i = 0; i < items.length; i++){
    if(localStorage.getItem(items[i].name) === null){
      localStorage.setItem(items[i].name, "0")
    }else{
      var $element = $("#" + items[i].name)
      var itemAmount = localStorage.getItem(items[i].name)

      $element.children()[0].textContent = itemAmount

      // Only calculate if there is more than 0 items
      if(itemAmount > 0) {

        // Calculation of the price
        var multiplier = Game.GameConst.priceMultiplier
        var calculation = (parseFloat(items[i].price) * Math.pow(multiplier, parseInt(itemAmount))).toFixed(8)

        // Showing the actual price
        $element.children()[2].textContent = calculation + " Parsecs"

        // Set the data-price attribute with the new price
        $element.attr("data-price", calculation.toString())

      }
    }
  }
  // End of the for-loop
}

/**
 * The function which adds new generated parsecs to the current parsecs amount.
 *
 * @param rate - The parsecs per second rate; Needed for adding the generated parsecs every second
 */
Game.pSecFunction = function (rate) {

    parsecs = parsecs + rate

  // Show both values on the page
  // Rounding the parsecs number at specific set values
  if(parsecs > 1000000){

    let parsecsUnitNumber = parsecs.optimizeNumber()

    $(".parsecsAmount").text(parsecsUnitNumber)
  }else if(parsecs >= 1000){
    $(".parsecsAmount").text(parsecs.toFixed(0))
  }else if(parsecs >= 1){
    $(".parsecsAmount").text(parsecs.toFixed(2))
  }else{
    $(".parsecsAmount").text(parsecs.toFixed(8))
  }

  // Save parsecs amount in the storage
  localStorage.setItem("parsecs", "" + parsecs + "")

  console.log("pSec -> P/sec at " + rate.toFixed(8))

}

/**
 * Stops the B/sec interval.
 */
Game.stopPsec = function () {
  clearInterval(pSec)
}

/**
 * Function for optimizing the number with an unit for displaying it on the screen.
 *
 * @returns {string} An optimized number as a string with its unit
 */
Game.optimizeNumber = function () {
  if(this >= 1e6){
    let number = parseFloat(this)
    let unit = Math.floor(parseFloat(number.toExponential(0).toString().replace("+", "").slice(2)) / 3) * 3

    // let test = this.toExponential(0).toString().replace("+", "").slice(2)
    // console.log(test)

    var num = (this / ('1e'+(unit))).toFixed(2)

    var unitname = Game.units[Math.floor(unit / 3) - 1]

    return num + " " + unitname
  }

  return this.toLocaleString()
}

Number.prototype.optimizeNumber = Game.optimizeNumber
String.prototype.optimizeNumber = Game.optimizeNumber

/**
 * Resets the game
 */
Game.resetGame = function () {
  Game.stopPsec()
  localStorage.setItem("parsecs", "0")
  localStorage.clear()
  location.reload()
}

// --------------------------------------------------- //

/**
 * <-- Now doing everything -->
 */


// Calculates the Bitcoin/sec rate with the amount of every item multiplied with their given parsecs/second rate.
Game.setParsecsPerSecondRateAtBeginning()

// Stating the interval with the calculated Bitcoin/second rate.
pSec = setInterval(function () {
  Game.pSecFunction(parsecsPerSecond);
}, 1000)


// Doing everything here when the game is ready to be used.
$(document).ready(function () {

  // Write the version into the .version span element
  $(".version").text("Version " + Game.GameConst.VERSION)

  // Write the parsecs per second rate into the .pSecRateNumber span element
  if(parsecsPerSecond >= 1000){
    $(".pSecRateNumber").text(parsecsPerSecond.toFixed(0))
  }else if(parsecsPerSecond >= 1 ){
    $(".pSecRateNumber").text(parsecsPerSecond.toFixed(2))
  }else{
    $(".pSecRateNumber").text(parsecsPerSecond.toFixed(8))
  }


  // If clicked on the big parsecs
  $(".parsecs").click(function () {

    // Add 1^-8 parsecs (equal to 1 satoshi)
    parsecs = parsecs + 0.00000001

    // Show the new number on the page
    if(parsecs > 1000000){

      let parsecsUnitNumber = parsecs.optimizeNumber()
      $(".parsecsAmount").text(parsecsUnitNumber)

    }else if(parsecs >= 1000){
      $(".parsecsAmount").text(parsecs.toFixed(0))
    }else if(parsecs >= 1){
      $(".parsecsAmount").text(parsecs.toFixed(2))
    }else{
      $(".parsecsAmount").text(parsecs.toFixed(8))
    }
    // Save the new amount of parsecs in the localStorage storage
    localStorage.setItem("parsecs", "" + parsecs + "")

  });


  // If any item from the list was clicked...
  $(".purchaseItem").click(function () {

    // Get following attributes and children elements

    // id of the item
    var id = $(this).attr("id")

    // The price attribute as a float number
    var price = parseFloat($(this).attr("data-price"))

    // The b/sec attribute from the item as a float number
    var parsecsPerSecond = parseFloat($(this).attr("data-bits-per-sec"))

    // The element which shows how many of the item is existing
    var amountDisplay = $(this).children()[0]
    var amountDisplayAmount = parseInt(localStorage.getItem(id))

    var priceDisplay = $(this).children()[2]

    // If you have enough parsecs, it´ll buy one item
    if(parseFloat(parsecs.toFixed(8)) >= price){

      // Substract the price from the current parsecs number and set it to the parsecs variable.
      parsecs = parseFloat(parsecs.toFixed(8)) - price

      // Save the new amount of parsecs in the localStorage storage
      localStorage.setItem("parsecs", "" + parsecs + "")

      // Changing amount number on the right of the item
      amountDisplayAmount = amountDisplayAmount + 1
      amountDisplay.textContent = amountDisplayAmount.toString()

      // Changing the parsecs amount
      // Rounding the parsecs number at specific values
      if(parsecs > 1e6){

        let parsecsUnitNumber = parsecs.optimizeNumber()
        $(".parsecsAmount").text(parsecsUnitNumber)

      }else if(parsecs >= 1000){
        $(".parsecsAmount").text(parsecs.toFixed(0))
      }else if(parsecs >= 1){
        $(".parsecsAmount").text(parsecs.toFixed(2))
      }else{
        $(".parsecsAmount").text(parsecs.toFixed(8))
      }

      // Increasing the amount of the specific item
      Game.itemAction(id)

      // Stops the interval
      Game.stopPsec()

      // Setting a new price and show it
      Game.setNewPrice()

      // Saving the new calculated parsecs/second rate in a variable
      var newRate = Game.setNewparsecsPerSecond(parsecsPerSecond)

      // Restarting the interval with the new rate
      bSec = setInterval(function () {
        Game.pSecFunction(newRate);
      }, 1000)

    }

  })

  //
  // If the reset button was pressed, do following thing
  $(".resetButton").click(function () {
    Game.resetGame()
  })

});

  