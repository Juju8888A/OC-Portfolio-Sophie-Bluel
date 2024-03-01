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
  projectsModifDisplay();
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
  modeEdition.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p>`;
  // je l'insère au dessus du header
  let header = document.querySelector("header");
  document.body.insertBefore(modeEdition, header);

  // je crée mon lien "modifier"
  let titleSection2 = document.getElementById("title-projects");
  titleSection2.innerHTML += `<a class=lien-modif href=#modal1><span class="i-modif"><i class="fa-solid fa-pen-to-square"></span></i>modifier</a>`;
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

let btnModifier = document.querySelector(".lien-modif");
let modalContainer = document.createElement("aside");
let modalWrapper = document.createElement("div");
let modalContentGallery = document.createElement("div");
let modalContentAddPhoto = document.createElement("div");

// Modale Attribute
modalContainer.id = "modal1";
modalContainer.classList.add("modal");
modalContainer.setAttribute("aria-hidden", true);
modalContainer.setAttribute("role", "dialog");
modalContainer.setAttribute("aria-labelledby", "titlemodal");
modalContainer.setAttribute("style", "display:none;");
document.body.appendChild(modalContainer);

// Modale Wrapper Attribute
modalWrapper.classList.add("modal-wrapper");
modalWrapper.classList.add("js-modal-stop");
modalContainer.appendChild(modalWrapper);

// Modale Gallery et AddPhoto Attribute

modalContentGallery.classList.add("modal-content1");
modalWrapper.appendChild(modalContentGallery);
modalContentAddPhoto.classList.add("modal-content2");
modalWrapper.appendChild(modalContentAddPhoto);

// Modale Gallery Display

modalContentGallery.innerHTML = `
<div class="btn-close">
  <button class=js-modal-close>
  <i class="fa-solid fa-xmark"></i></button>
</div>

<h4 id=titlemodal>Galerie Photo</h4>
<div class=photos-container>
  <div class=photos-content>
  </div>
</div>
<div class=barre>
<hr id=b-color>
</div>
<div class="btn-ajout-photo">
<button id="btn-add-1">Ajouter une photo</button>
</div>
  `;
modalContentAddPhoto.style.display = "none";

const projectsModifContainer = document.querySelector(".photos-content");

function projectsModifDisplay() {
  projectsModifContainer.innerHTML = projects
    .map(
      (work) => `
    <figure class="project-card-modif">
    <i id=trash class="fa-solid fa-trash-can"></i>
    <img src="${work.imageUrl}" alt="photo ${work.title}">
    </figure>
    `
    )
    .join("");
}

// Modale AddPhoto Display

const btnAddPhoto = document.getElementById("btn-add-1");
const btnBackGallery = document.querySelector(".js-modal-back");
console.log(btnBackGallery);

modalContentAddPhoto.innerHTML = `
<div class="btn-close-back">
<button class="js-modal-back">
<i class="fa-solid fa-arrow-left"></i></button>
  <button class=js-modal-close>
  <i class="fa-solid fa-xmark"></i></button>
</div>
<h4 id=titlemodal2>Ajout photo</h4>
<div class=form-container>
<form class=form-ajout-photo action="#" method="post">
<div class=file-container>
      <div class="image-form"><i class="fa-solid fa-image"></i></div>
      <label for="fichier" class="btn-file">+ Ajouter photo</label>
      <input type="file" name="fichier" id="fichier" accept="image/*" style="display:none;">
      <p>jpg, png : 4mo max</p></div>
    <div class="text-form-container">
      <label for="titre">Titre</label>
      <input type="text" name="titre" id="titre" class="style-form">
    </div>
    <div class="text-form-container">
      <label for="choix-category">Categorie</label>
        <select name="category-form" id="choix-category" class="style-form">
          
        </select>
    </div>
    <div class=barre2><hr id=b-color></div>
      <input type="submit" id="btn-valid" value="Valider" class="btn-ajout-photo"></form>
    </div>

</form>
</div>
  `;

// Formulaire dynamique

let categorie = category.name;
// Objets
const formCategory = document.getElementById("choix-category");
const optionObjets = document.createElement("option");
optionObjets.setAttribute("value", categorie);
optionObjets.innerText = "Objets";
formCategory.appendChild(optionObjets);
// Appartements
const optionAppartements = document.createElement("option");
optionAppartements.setAttribute("value", categorie);
optionAppartements.innerText = "Appartements";
formCategory.appendChild(optionAppartements);
// Hotels et restaurants
const optionHotelResto = document.createElement("option");
optionHotelResto.setAttribute("value", categorie);
optionHotelResto.innerText = "Hotels & restaurants";
formCategory.appendChild(optionHotelResto);

btnAddPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  modalContentGallery.style.display = "none";
  modalContentAddPhoto.style.display = null;
});

// **************************** OUVERTURE DE LA MODALE *********************************

let modal = null;
const focusableSelector = `button, a, input, textarea`;
let focusables = [];
let previouslyFocusedElement = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = null;
  focusables[0].focus();
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

// **************************** FERMETURE DE LA MODALE *********************************

const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  window.setTimeout(function () {
    modal.style.display = "none";
    modal = null;
  }, 500);
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};

document.querySelectorAll(".js-modal-back").forEach((a) => {
  a.addEventListener("click", (f) => {
    modalContentGallery.style.display = "";
    modalContentAddPhoto.style.display = "none";
  });
});
document.querySelectorAll(".js-modal-close").forEach((a) => {
  a.addEventListener("click", closeModal);
});
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

const stopPropagation = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});

// ***************************** SUPPRESSION D'UN PROJET ************************************

// récupération du bouton poubelle
// quand je clique dessus je veux que le projet soit supprimé
const projectsToDelete = document
  .querySelectorAll(".project-card-modif")
  .forEach((trash) => {
    trash = document.getElementById("trash");
    trash.addEventListener("click", deleteProjects);
  });

function deleteProjects() {
  let dataId = {
    id: projects.id,
  };

  let urlDelete = "http://localhost:5678/api/works/{dataId}";

  let fetchDelete = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${dataUser.token}`,
    },
    body: JSON.stringify(dataId),
  };

  fetch(urlDelete, fetchDelete)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Echec de la supression");
      }
    })
    .catch((error) => {
      console.log("Echec de la supression", error);
    });
}

// ******************************* AJOUT D'UN PROJET ************************************
const btnValidationAjout = document.getElementById("btn-valid");
btnValidationAjout.addEventListener("click", AddProjects);

function AddProjects() {
  let dataProjects = {
    image: projects.imageUrl,
    title: projects.title,
    category: category.name,
  };

  let urlAdd = "http://localhost:5678/api/works/{dataProjects}";

  let fetchAdd = {
    method: "PUT",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${dataUser.token}`,
    },
    body: JSON.stringify(dataProjects),
  };

  fetch(urlAdd, fetchAdd)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Echec de l'ajout");
      }
    })
    .catch((error) => {
      console.log("Echec de l'ajout", error);
    });
}
