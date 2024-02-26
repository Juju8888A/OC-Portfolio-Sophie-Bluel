// je crée une boite pour mettre à l'intérieur les données de l'API
const projectsContainer = document.querySelector(".gallery");
// récupération des boutons de la barre de filtres
const buttonObjets = document.getElementById("btn-objets");
const buttonAppartements = document.getElementById("btn-appartements");
const buttonHotelResto = document.getElementById("btn-hotel-resto");
const buttonTous = document.getElementById("btn-tous");

const myForm = document.getElementById("myForm");

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

// je crée ma fonction d'affichage / categorie : tous / grace aux méthodes filter et map
function projectsDisplay() {
  projectsContainer.innerHTML = projects
    .filter((work) => work.category.name)
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

// je crée ma fonction d'affichage / categorie : objets
function projectsDisplayObjets() {
  projectsContainer.innerHTML = projects
    .filter((work) => work.category.name.includes("Objets"))
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

// je crée ma fonction d'affichage / categorie : appartements
function projectsDisplayAppartements() {
  projectsContainer.innerHTML = projects
    .filter((work) => work.category.name.includes("Appartements"))
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

// je crée ma fonction d'affichage / categorie : hotels et restaurants
function projectsDisplayHotelResto() {
  projectsContainer.innerHTML = projects
    .filter((work) => work.category.name.includes("Hotels & restaurants"))
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

buttonTous.addEventListener("click", projectsDisplay);
buttonObjets.addEventListener("click", projectsDisplayObjets);
buttonAppartements.addEventListener("click", projectsDisplayAppartements);
buttonHotelResto.addEventListener("click", projectsDisplayHotelResto);

// je load les fetch dès l'ouverture de la page
window.addEventListener("load", fetchProjects);
window.addEventListener("load", fetchCategory);
console.log(localStorage.getItem("token"));

// *********************** MODE EDITION *****************************

if (localStorage.getItem("token")) {
  // je crée ma barre d'édition en haut de page
  let modeEdition = document.createElement("div");
  modeEdition.id = "edition-bar";
  modeEdition.innerHTML = "<p>Mode édition</p>";
  // je l'insère au dessus du header
  let header = document.querySelector("header");
  document.body.insertBefore(modeEdition, header);

  // je crée mon lien "modifier"
  let titleSection2 = document.getElementById("title-projects");
  titleSection2.innerHTML += `<a class=lien-modif href=#modal1><i class="fa-solid fa-pen-to-square"></i>modifier</a>`;
  let lienModif = document.querySelector(".lien-modif");
  lienModif.classList.add("js-modal");

  // je fais disparaitre ma barre
  let filterBar = document.querySelector(".filter-bar");
  filterBar.style.display = "none";

  // je change login en logout quand l'utilisateur est connecté
  let logBtn = document.getElementById("login-btn");
  logBtn.innerHTML = "logout";
  logBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
  });
}

// ****************************** MODALE ************************************

let modalContainer = document.createElement("aside");
modalContainer.id = "modal1";
modalContainer.classList.add("modal");
modalContainer.setAttribute("aria-hidden", true);
modalContainer.setAttribute("role", "dialog");
modalContainer.setAttribute("aria-labelledby", "titlemodal");
modalContainer.setAttribute("style", "display:none;");
// modalContainer.setAttribute("aria-modal", false);
document.body.appendChild(modalContainer);
modalContainer.innerHTML +=
  "<div class=modal-wrapper><button class=js-modal-close>Fermer</button><h4 id=titlemodal>Galerie Photo</h4><div class=photos></div><hr id=barre><button>Ajouter une photo</div></div>";
// pour gérer l'accessibilité, on utilise aria(améliore l'accessibilité)
// par défaut la boite modal est caché "aria-hidden",
// role dialog c'est pour indiquer une fenetre en dehors du contenu principal
// aria modal empeche l'interaction avec les elements sous la modal
let modalContent = document.querySelector(".modal-wrapper");
modalContent.classList.add("js-modal-stop");

// ***************** OUVERTURE ET FERMETURE DE LA MODALE *******************
let modal = null;
const focusableSelector = `button, a, input, textarea`;
let focusablesElements = [];

// OUVERTURE
const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusablesElements = Array.from(modal.querySelectorAll(focusableSelector));
  modal.style.display = null;
  // retire le display none sur modal1
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

// FERMETURE
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  // retire le display none sur modal1
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
  // empeche la propagation de l'evenement sur les parents
};
const focusInModal = function (e) {
  e.preventDefault();
  let index = focusablesElements.findIndex(
    (f) => f === modal.querySelector(":focus")
  );
  index++;
  if (index >= focusablesElements.length) {
    index = 0;
  }
  focusablesElements[index].focus();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// FERMER LA FENETRE AVEC LA TOUCHE ESCAPE
// FOCUS

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});
