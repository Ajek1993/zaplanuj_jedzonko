const userNameOnPage = document.querySelector(".user-name");
const form = document.querySelector(".form__name");
const mainWindow = document.querySelector(".first_entry_box");
const secondWindow = document.querySelector(".not_first_entry_box");
const navItems = document.querySelector(".nav-bar__list");

console.log(navItems.children[0].children[0]["href"]);
console.log(document.location.href);

const hideWindow = () => {
  mainWindow.classList.add("hide");
};

const showWindow = () => {
  secondWindow.classList.remove("hide");
};

if (localStorage.hasOwnProperty("name")) {
  hideWindow();
  showWindow();
  userNameOnPage.innerText = localStorage.getItem("name");
}

form.addEventListener("submit", (e) => {
  const userName = document.querySelector(".input__name").value;
  e.preventDefault();
  localStorage.setItem("name", userName);
  userNameOnPage.innerText = localStorage.getItem("name");
  hideWindow();
  showWindow();
});

if (document.location.href === navItems.children[0].children[0]["href"]) {
  navItems.children[0].classList.add("chosen_item");
}

//ADD RECIPE

const RecipeBox = document.querySelector(".add_new_recipe");
const addRecipeBtn = document.querySelector(".new_recipe_btn");

addRecipeBtn.addEventListener("click", () => {
  RecipeBox.classList.remove("hide");
  secondWindow.classList.add("hide");
});

//ADD RECIPE 4.2 TOMEK, PRÓBA ZAPISU PRZEPISU DO LOCAL STORAGE

const recipeSaveButton = document.querySelector(".schedule_recipe_header .save_btn")
let allRecipies = []
function Recipe(id, title, description) {
  this.id = id; // id przepisu
  this.title = title; // nazwa przepisu
  this.description = description; // opis przepisu
  this.instructions = []; // instrukcje przepisu
  this.ingredients = []; // składniki przepisu
}

const saveToLocalStorage = newObject => {
  if (localStorage.getItem("recipes") != null) {
    allRecipies  = JSON.parse(localStorage.getItem("recipes"));
    allRecipies.push(newObject);
    localStorage.setItem("recipes", JSON.stringify(allRecipies));
  } else {
    allRecipies .push(newObject);
    localStorage.setItem("recipes", JSON.stringify(allRecipies));
  }
  alert("Przepis zapisany do localStorage");
}

recipeSaveButton.addEventListener("click", function (){
  const recipeName = document.querySelector("input[placeholder=\"Wpisz nazwę przepisu\"]")
  const recipeDescription = document.querySelector("textarea[placeholder=\"Opisz swój przepis\"]")
  const instructions = document.querySelectorAll(".instructions__list li")
  const ingredients = document.querySelectorAll(".recipes__list li")
  const instructionsArray = Array.from(instructions).map(li => li.innerText)
  const ingredientsArray = Array.from(ingredients).map(li => li.innerText)

  const newRecipe = new Recipe(allRecipies.length + 1, recipeName.value, recipeDescription.value)
  newRecipe.instructions = [...instructionsArray]
  newRecipe.ingredients = [...ingredientsArray]

  saveToLocalStorage(newRecipe)

  recipeName.value = "";
  recipeDescription.value = "";
  instructions[0].parentElement.innerHTML = "";
  ingredients[0].parentElement.innerHTML = "";
})


//ADD SCHEDULE

const ScheduleBox = document.querySelector(".add_new_schedule");
const addScheduleBtn = document.querySelector(".new_schedule_btn");

addScheduleBtn.addEventListener("click", () => {
  ScheduleBox.classList.remove("hide");
  secondWindow.classList.add("hide");
});
