const navItems = document.querySelector(".nav-bar__list");

if (document.location.href === navItems.children[1].children[0]["href"]) {
  navItems.children[1].classList.add("chosen_item");
}