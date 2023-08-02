const userNameOnPage = document.querySelector(".user-name");
const form = document.querySelector(".form__name");
const mainWindow = document.querySelector(".first_entry_box");
const secondWindow = document.querySelector(".second_box");
const navItems = document.querySelector(".nav-bar__list");

console.log(navItems.children[0].children[0]["href"]);
console.log(document.location.href);

const hideWindow = () => {
  mainWindow.classList.remove("main-window");
  mainWindow.classList.add("hide");
};

const showWindow = () => {
  secondWindow.classList.add("not_first_entry_box");
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
