const userNameOnPage = document.querySelector(".user-name");
const navItems = document.querySelector(".nav-bar__list");

if (document.location.href === navItems.children[2].children[0]["href"]) {
  navItems.children[2].classList.add("chosen_item");
}

if (localStorage.hasOwnProperty("name")) {
  userNameOnPage.innerText = localStorage.getItem("name");
}
