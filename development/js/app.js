const userNameOnPage = document.querySelector(".user-name");
const form = document.querySelector(".form__name");
const mainWindow = document.querySelector(".first_entry_box");
const secondWindow = document.querySelector(".not_first_entry_box");

console.log(mainWindow);
console.log(secondWindow);

const hideWindow = () => {
  mainWindow.classList.remove("main-window");
  mainWindow.classList.add("hide");
};

const showWindow = () => {
  // secondWindow.classList.add("main-window");
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
