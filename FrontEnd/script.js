// je crée une boite pour mettre à l'intérieur les données de l'API
const projectsContainer = document.querySelector(".gallery");
// récupération des boutons de la barre de filtres
const buttonObjets = document.getElementById("btn-objets");
const buttonAppartements = document.getElementById("btn-appartements");
const buttonHotelResto = document.getElementById("btn-hotel-resto");
const buttonTous = document.getElementById("btn-tous");

let projects = [];
let category = [];

// je récupère les données de l'API avec un fetch
async function fetchProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (projects = data));
  console.log(projects);
  // une fois que le fetch est appliqué, j'appelle la fonction d'affichage
  projectsDisplay();
}

// je récupère également les données categorie
async function fetchCategory() {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => (category = data));
  console.log(category);
}

// je crée ma fonction d'affichage
function projectsDisplay() {
  projectsContainer.innerHTML = projects
    .filter((work) => work.category.name)
    .map(
      (work) => `
    <figure class="project-card active" data-"${work.category.name}">
    <img src="${work.imageUrl}" alt="photo ${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
    `
    )
    .join("");
}

// je crée mes différents filtres en utilisant filter relié au click du bouton correspondant
function projectsDisplayObjets() {
  projectsContainer.innerHTML = projects
    .filter((work) => work.category.name.includes("Objets"))
    .map(
      (work) => `
    <figure class="project-card active" data-"${work.category.name}">
    <img src="${work.imageUrl}" alt="photo ${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
    `
    )
    .join("");
}

function projectsDisplayAppartements() {
  projectsContainer.innerHTML = projects
    .filter((work) => work.category.name.includes("Appartements"))
    .map(
      (work) => `
    <figure class="project-card active" data-"${work.category.name}">
    <img src="${work.imageUrl}" alt="photo ${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
    `
    )
    .join("");
}

function projectsDisplayHotelResto() {
  projectsContainer.innerHTML = projects
    .filter((work) => work.category.name.includes("Hotels & restaurants"))
    .map(
      (work) => `
    <figure class="project-card active" data-"${work.category.name}">
    <img src="${work.imageUrl}" alt="photo ${work.title}">
    <figcaption>${work.title}</figcaption>
    </figure>
    `
    )
    .join("");
}

buttonTous.addEventListener("click", projectsDisplay);
buttonObjets.addEventListener("click", projectsDisplayObjets);
buttonAppartements.addEventListener("click", projectsDisplayAppartements);
buttonHotelResto.addEventListener("click", projectsDisplayHotelResto);

// je load les fetch dès l'ouverture de la page
window.addEventListener("load", fetchProjects);
window.addEventListener("load", fetchCategory);
