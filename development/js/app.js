const userNameOnPage = document.querySelector(".user-name");
const form = document.querySelector(".form__name");
const mainWindow = document.querySelector(".first_entry_box");
const secondWindow = document.querySelector(".not_first_entry_box");
const navItems = document.querySelector(".nav-bar__list");

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

const instructionBtn = document.querySelector(".instruction_btn");
const instructionsList = document.querySelector(".instructions__list");
const instructionToCopy = document.querySelector(".instructions__list-item");
const instructionsInput = document.querySelector(".instructions__input");

const ingredientsBtn = document.querySelector(".ingredients_btn");
const ingredientsList = document.querySelector(".ingredients__list");
const ingredientToCopy = document.querySelector(".ingredients__list-item");
const ingredientsInput = document.querySelector(".ingredients__input");

const addNewInstruction = () => {
  const newLi = instructionToCopy.cloneNode(true);
  newLi.children[0].innerText = instructionsInput.value;
  newLi.classList.remove("hide");
  instructionsList.append(newLi);
  instructionsInput.value = "";
};

const addNewIngredient = () => {
  const newLi = ingredientToCopy.cloneNode(true);
  newLi.children[0].innerText = ingredientsInput.value;
  newLi.classList.remove("hide");
  ingredientsList.append(newLi);
  ingredientsInput.value = "";
};

instructionBtn.addEventListener("click", addNewInstruction);
ingredientsBtn.addEventListener("click", addNewIngredient);

//ADD RECIPE 4.2 TOMEK, PRÓBA ZAPISU PRZEPISU DO LOCAL STORAGE

const recipeSaveButton = document.querySelector(
  ".schedule_recipe_header .save_btn"
);

let allRecipies = [];

class Recipe {
  constructor(id, title, description) {
    this.id = id; // id przepisu
    this.title = title; // nazwa przepisu
    this.description = description; // opis przepisu
    this.instructions = []; // instrukcje przepisu
    this.ingredients = []; // składniki przepisu
  }
}

const saveToLocalStorageRecipe = (newObject) => {
  if (localStorage.getItem("recipes") != null) {
    allRecipies = JSON.parse(localStorage.getItem("recipes"));
    allRecipies.push(newObject);
    localStorage.setItem("recipes", JSON.stringify(allRecipies));
  } else {
    allRecipies.push(newObject);
    localStorage.setItem("recipes", JSON.stringify(allRecipies));
  }
  alert("Przepis zapisany do localStorage");
};

recipeSaveButton.addEventListener("click", function () {
  const recipeName = document.querySelector(
    'input[placeholder="Wpisz nazwę przepisu"]'
  );
  const recipeDescription = document.querySelector(
    'textarea[placeholder="Opisz swój przepis"]'
  );
  const instructions = document.querySelectorAll(".instructions__list li");
  const ingredients = document.querySelectorAll(".ingredients__list li");
  const instructionsArray = Array.from(instructions).map(
    (li) => li.firstElementChild.innerText
  );
  const ingredientsArray = Array.from(ingredients).map(
    (li) => li.firstElementChild.innerText
  );

  const newRecipe = new Recipe(
    allRecipies.length + 1,
    recipeName.value,
    recipeDescription.value
  );
  newRecipe.instructions = [...instructionsArray].slice(1);
  newRecipe.ingredients = [...ingredientsArray].slice(1);

  saveToLocalStorageRecipe(newRecipe);

  recipeName.value = "";
  recipeDescription.value = "";
  instructions[0].parentElement.innerHTML = "";
  instructionsList.appendChild(instructionToCopy);
  ingredients[0].parentElement.innerHTML = "";
  ingredientsList.appendChild(ingredientToCopy);
});

//ADD SCHEDULE

const ScheduleBox = document.querySelector(".add_new_schedule");
const addScheduleBtn = document.querySelector(".new_schedule_btn");
const tableSelects = Array.from(
  document.querySelectorAll(".table__schedules select")
);

const scheduleSaveButton = document.querySelector(
  ".add_new_schedule .save_btn"
);

const recipesFromLocaleStage = JSON.parse(localStorage.getItem("recipes"));
const recipesNumbers = document.querySelector(".recipes_numbers");
recipesNumbers.innerText = recipesFromLocaleStage.length;

tableSelects.forEach((select) => {
  recipesFromLocaleStage.forEach((el) => {
    const newOption = document.createElement("option");
    newOption.innerText = el.title;
    select.appendChild(newOption);
  });
});

let allPlanns = [];

class Schedule {
  constructor(id, title, description, weekNumber) {
    this.id = id; // id przepisu
    this.title = title; // nazwa planu
    this.description = description; // opis planu
    this.weekNumber = weekNumber; // numer tygodnia do którego przypisany jest plan
    this.monday = []; // plan na poniedzialek
    this.tuesday = []; // plan na wtorek
    this.wednesday = []; // plan na środę
    this.thursday = []; // plan na czwartek
    this.friday = []; // plan na piątek
    this.saturday = []; // plan na sobotę
    this.sunday = []; // plan na niedzielę
  }
}

const saveToLocalStorageSchedule = (newObject) => {
  if (localStorage.getItem("schedules") != null) {
    allPlanns = JSON.parse(localStorage.getItem("schedules"));
    allPlanns.push(newObject);
    localStorage.setItem("schedules", JSON.stringify(allPlanns));
  } else {
    allPlanns.push(newObject);
    localStorage.setItem("schedules", JSON.stringify(allPlanns));
  }
  alert("Plan zapisany do localStorage");
};

let error = 0;

scheduleSaveButton.addEventListener("click", function () {
  const scheduleName = document.querySelector(".plan_title");
  const scheduleDescription = document.querySelector(".plan_description");
  const weekNumber = document.querySelector(".weekNumber");

  if (localStorage.getItem("schedules") != null) {
    JSON.parse(localStorage.getItem("schedules")).forEach((el) => {
      if (el.id === weekNumber.value) {
        error++;
      }
    });
  }

  if (error === 1) {
    alert("Już istenieje plan na dany tydzień");
    error = 0;
    return;
  }
  const newSchedule = new Schedule(
    weekNumber.value,
    scheduleName.value,
    scheduleDescription.value,
    weekNumber.value
  );

  const mondayMeals = document.querySelectorAll(".monday td select");
  mondayMeals.forEach((meal) => newSchedule.monday.push(meal.value));

  const tuesdayMeals = document.querySelectorAll(".tuesday td select");
  tuesdayMeals.forEach((meal) => newSchedule.tuesday.push(meal.value));

  const wednesdayMeals = document.querySelectorAll(".wednesday td select");
  wednesdayMeals.forEach((meal) => newSchedule.wednesday.push(meal.value));

  const thursdayMeals = document.querySelectorAll(".thursday td select");
  thursdayMeals.forEach((meal) => newSchedule.thursday.push(meal.value));

  const fridayMeals = document.querySelectorAll(".friday td select");
  fridayMeals.forEach((meal) => newSchedule.friday.push(meal.value));

  const saturdayMeals = document.querySelectorAll(".saturday td select");
  saturdayMeals.forEach((meal) => newSchedule.saturday.push(meal.value));

  const sundayMeals = document.querySelectorAll(".sunday td select");
  sundayMeals.forEach((meal) => newSchedule.sunday.push(meal.value));

  saveToLocalStorageSchedule(newSchedule);

  scheduleName.value = "";
  scheduleDescription.value = "";
  weekNumber.value = "";
});

addScheduleBtn.addEventListener("click", () => {
  ScheduleBox.classList.remove("hide");
  secondWindow.classList.add("hide");
});

// ENTRY PAGE

const currentDate = new Date();
const startDate = new Date(currentDate.getFullYear(), 0, 1);
const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
const weekNumber = Math.ceil(days / 7);

const week = document.querySelector(".week_number");
const week_meals = document.querySelector(".week_meals");

let chosenSchedule;
let ids;
const renderSchedulesOnPage = (num = weekNumber) => {
  if (localStorage.getItem("schedules") != null) {
    const allSchedules = JSON.parse(localStorage.getItem("schedules")).sort(
      (a, b) => a.id - b.id
    );

    ids = allSchedules.map((el) => el.id);
    const goal = num;
    const closestID = ids.reduce(function (prev, curr) {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });

    chosenSchedule = ids.indexOf(closestID);

    const actualSchedule = allSchedules.filter((el) => el.id === closestID)[0];
    week.innerText = closestID;

    for (let i = 0; i < week_meals.children.length; i++) {
      week_meals.children[i].children[0].innerText = actualSchedule.monday[i];
    }

    for (let i = 0; i < week_meals.children.length; i++) {
      week_meals.children[i].children[1].innerText = actualSchedule.tuesday[i];
    }

    for (let i = 0; i < week_meals.children.length; i++) {
      week_meals.children[i].children[2].innerText =
        actualSchedule.wednesday[i];
    }

    for (let i = 0; i < week_meals.children.length; i++) {
      week_meals.children[i].children[3].innerText = actualSchedule.thursday[i];
    }

    for (let i = 0; i < week_meals.children.length; i++) {
      week_meals.children[i].children[4].innerText = actualSchedule.friday[i];
    }

    for (let i = 0; i < week_meals.children.length; i++) {
      week_meals.children[i].children[5].innerText = actualSchedule.saturday[i];
    }

    for (let i = 0; i < week_meals.children.length; i++) {
      week_meals.children[i].children[6].innerText = actualSchedule.sunday[i];
    }
  }
};

renderSchedulesOnPage();

const previous__btn = document.querySelector(".previous__btn");

previous__btn.addEventListener("click", () => {
  chosenSchedule--;
  if (chosenSchedule < 0) {
    chosenSchedule = 0;
  }
  const prevId = ids[chosenSchedule];
  renderSchedulesOnPage(prevId);
});

const next__btn = document.querySelector(".next__btn");

next__btn.addEventListener("click", () => {
  chosenSchedule++;
  const nextId = ids[chosenSchedule];
  renderSchedulesOnPage(nextId);
});
