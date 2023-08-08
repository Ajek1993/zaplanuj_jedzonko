const userNameOnPage = document.querySelector(".user-name");
const navItems = document.querySelector(".nav-bar__list");

if (document.location.href === navItems.children[1].children[0]["href"]) {
  navItems.children[1].classList.add("chosen_item");
}

if (localStorage.hasOwnProperty("name")) {
  userNameOnPage.innerText = localStorage.getItem("name");
}

if (localStorage.getItem("recipes") != null) {
  const allRecipies = JSON.parse(localStorage.getItem("recipes"));
  console.log(allRecipies);
  const tableRecipeRow = document.querySelector(".table-recipe-row");

  allRecipies.forEach((recipe) => {
    const newLi = tableRecipeRow.cloneNode(true);
    newLi.classList.remove("hide");
    newLi.children[0].innerText = recipe.id;
    newLi.children[1].innerText = recipe.title;
    newLi.children[2].innerText = recipe.description;
    tableRecipeRow.parentElement.appendChild(newLi);
  });
}
