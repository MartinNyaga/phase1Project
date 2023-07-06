//Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


//Event listener for the search button
searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-search").value;
  if (userInp.length == 0) {
    //To verify the search meal field is not empty
    result.innerHTML = `<h3>Please enter a Meal to be served</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        

        result.innerHTML = `
    <img src=${myMeal.strMealThumb}>
    <div class="details">
        <h2>${myMeal.strMeal}</h2>
        <h4>${myMeal.strArea}</h4>
    </div>

    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>

    <div id="payslip">
        <button id="removeSlip">X</button>
        <pre id="receipt"></pre>
    </div>
    
    <button id="payUp">Pay For Meal</button>
    <button id="show-recipe"></button>

    <div id="purchase-form" style="display: none;">
    <h3>Enter your purchase details:</h3>
    <input type="text" id="name" placeholder="Name" required>
    <input type="number" id="order" placeholder="How many plates?" required>
    <input type="email" id="email" placeholder="Email" required>
    <input type="text" id="address" placeholder="Address" required>
    <button id="submit-purchase">Submit</button>
  </div>
    `;
  
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");
        let removeSlip = document.getElementById("removeSlip");
        let payUp = document.getElementById("payUp");
        let purchaseForm = document.getElementById("purchase-form");

        let submitPurchase = document.getElementById("submit-purchase");

submitPurchase.addEventListener("click", () => {
  let name = document.getElementById("name").value;
  let order = document.getElementById("order").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;

  // Perform actions with the purchase details

  //Display receipt in the payslip section
  let receipt = document.getElementById("receipt");
  receipt.innerText = `Name: ${name}\n Orderd plates: ${order}\nEmail: ${email}\nAddress: ${address}`;
  payslip.style.display = "block";


  // Reset form fields
  document.getElementById("name").value = "";
  document.getElementById("order").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address").value = "";
});


       

        payUp.addEventListener("click", () => {
          purchaseForm.style.display = "block";
        });

        removeSlip.addEventListener("click", () => {
          payslip.style.display = "none";
          alert("Thank You for dining with Us!!!\n Your meal shall be with you shortly")
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
      });
  }
});