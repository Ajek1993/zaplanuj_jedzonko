const userNameOnPage = document.querySelector(".user-name");
const form = document.querySelector(".form__name");
const mainWindow = document.querySelector(".main-window");

const hideWindow = () => {
  mainWindow.classList.remove("main-window");
  mainWindow.classList.add("hide");
};

if (localStorage.hasOwnProperty("name")) {
  hideWindow();
  userNameOnPage.innerText = localStorage.getItem("name");
}

form.addEventListener("submit", (e) => {
  const userName = document.querySelector(".input__name").value;
  e.preventDefault();
  localStorage.setItem("name", userName);
  userNameOnPage.innerText = localStorage.getItem("name");
  hideWindow();
});
