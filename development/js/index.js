const leftCarouselBtn = document.querySelector(".left-carousel-btn");
const rightCarouselBtn = document.querySelector(".right-carousel-btn");
const carousel = Array.from(document.querySelectorAll(".carousel > article"));

let articleChosen = 0;
const numsOfArticles = carousel.length;

leftCarouselBtn.addEventListener("click", () => {
  articleChosen--;
  checkArticles();
  hideArticle();
  carousel[articleChosen].classList.remove("hide");
});

rightCarouselBtn.addEventListener("click", () => {
  articleChosen++;
  checkArticles();
  hideArticle();
  carousel[articleChosen].classList.remove("hide");
});

const hideArticle = () =>
  carousel.map((article) => article.classList.add("hide"));

const checkArticles = () => {
  if (articleChosen < 0) articleChosen = numsOfArticles - 1;
  if (articleChosen > numsOfArticles - 1) articleChosen = 0;
};
