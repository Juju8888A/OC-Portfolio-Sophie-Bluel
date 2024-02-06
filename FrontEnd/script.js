// je crée une boite pour mettre à l'intérieur les données de l'API
const projectsContainer = document.querySelector(".gallery");
// récupération des boutons de la barre de filtres
const filterBtnAll = document.querySelectorAll(".btnFilter");
const buttonObjets = document.getElementById("btn-objets");
const buttonAppartements = document.getElementById("btn-appartements");
const buttonHotelResto = document.getElementById("btn-hotel-resto");
const buttonTous = document.getElementById("btn-tous");
console.log(buttonObjets);

let projects = [];
let category = [];

// je récupère les données de l'API avec un fetch
async function fetchProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (projects = data));

  console.log(projects);
  // une fois que le fetch est appliqué, on appelle la fonction d'affichage
  projectsDisplay();
}

// je crée ma fonction d'affichage
function projectsDisplay() {
  projectsContainer.innerHTML = projects
    .map(
      (work) => `
    <figure class="project-card">
    <img src="${work.imageUrl}" alt="photo ${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
    `
    )
    .join("");
}

// je récupère les données categorie pour réaliser les déifférents filtres
async function fetchCategory() {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => (category = data));
  console.log(category);
  filterDisplay();
}

function filterDisplay() {
  buttonObjets.addEventListener("click", function () {
    console.log("click");
  });
  buttonAppartements.addEventListener("click", function () {
    console.log("click");
  });
  buttonHotelResto.addEventListener("click", function () {
    console.log("click");
  });
  buttonTous.addEventListener("click", function () {
    console.log("click");
  });
}

// je veux que la fonction de fetch se joue dès l'ouverture de la page web
window.addEventListener("load", fetchProjects);
window.addEventListener("load", fetchCategory);
