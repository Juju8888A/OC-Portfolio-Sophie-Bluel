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
    .then((data) => {
      projects = data;
      console.log(projects);
      projectsDisplay();
      projectsDisplayModif();
    });
}

// je récupère également les données categorie
async function fetchCategory() {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => (category = data));
  console.log(category);
  chooseCategory();
}

// je crée les éléments figure qui contiendront les projets de l'architecte grâce aux données de l'API

function projectsDisplay() {
  projectsContainer.innerHTML = "";
  projects.forEach((project) => {
    const figureElement = document.createElement("figure");
    let imageElement = document.createElement("img");
    let captionElement = document.createElement("figcaption");
    figureElement.classList.add("project-card");
    figureElement.id = project.id;
    imageElement.src = project.imageUrl;
    imageElement.alt = "image de " + project.title;
    captionElement.textContent = project.title;
    projectsContainer.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(captionElement);
  });
}

// je crée l'affichage de mes projets filtrés

function projectsDisplayFiltered(filteredProjects) {
  projectsContainer.innerHTML = "";
  filteredProjects.forEach((project) => {
    const figureElement = document.createElement("figure");
    let imageElement = document.createElement("img");
    let captionElement = document.createElement("figcaption");
    figureElement.classList.add("project-card");
    figureElement.id = project.id;
    imageElement.src = project.imageUrl;
    imageElement.alt = "image de " + project.title;
    captionElement.textContent = project.title;
    projectsContainer.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(captionElement);
  });
}

// Affichage objets

function projectsDisplayObjets() {
  const filteredProjects = projects.filter(
    (project) => project.category.name === "Objets"
  );
  projectsDisplayFiltered(filteredProjects);
}

// Affichage appartements

function projectsDisplayAppartements() {
  filteredProjects = projects.filter(
    (project) => project.category.name === "Appartements"
  );
  projectsDisplayFiltered(filteredProjects);
}

// Affichage hotels et restaurants

function projectsDisplayHotelResto() {
  filteredProjects = projects.filter(
    (project) => project.category.name === "Hotels & restaurants"
  );
  projectsDisplayFiltered(filteredProjects);
}

buttonTous.addEventListener("click", (e) => {
  e.preventDefault();
  projectsDisplay();
});
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

function projectsDisplayModif() {
  projects.forEach((project) => {
    const figureElementModif = document.createElement("figure");
    const trashElement = document.createElement("i");
    trashElement.id = "trash";
    trashElement.classList.add("fa-solid", "fa-trash-can");
    let imageElementModif = document.createElement("img");
    imageElementModif.src = project.imageUrl;
    figureElementModif.classList.add("project-card-modif");
    figureElementModif.id = project.id;
    projectsModifContainer.appendChild(figureElementModif);
    figureElementModif.appendChild(imageElementModif);
    figureElementModif.appendChild(trashElement);
  });
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
<div class=display-photo></div>
<div class=ajouter-photo>
      <div class="image-form"><i class="fa-solid fa-image"></i></div>
      <label for="fichier" class="btn-file">+ Ajouter photo</label>
      <input type="file" name="fichier" id="fichier" accept="image/*" style="display:none;">
      <p>jpg, png : 4mo max</p></div>
      </div>
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

// Upload image dynamique

const btnUploadImage = document.getElementById("fichier");
const imageDisplay = document.querySelector(".display-photo");
const formDisplay = document.querySelector(".form-photo");
imageDisplay.style.display = "none";

function loadedFile() {
  const fileRegExp = /\.(jpe?g|png|gif)$/i;
  if (this.files.length === 0 || !fileRegExp.test(this.files[0].name)) {
    return;
  }
  console.log("Ce fichier est accepté");

  const image = this.files[0];
  const imageReader = new FileReader();
  imageReader.readAsDataURL(image);
  imageReader.addEventListener("load", (event) => {
    displayImage(event, image);
  });
}

function displayImage(event, file) {
  const figureElement = document.createElement("figure");
  figureElement.id = "image-selected";
  const imageElement = document.createElement("img");
  imageElement.src = event.target.result;

  figureElement.appendChild(imageElement);
  imageDisplay.appendChild(figureElement);
  imageDisplay.style.display = "block";

  if (imageDisplay.style.display === "block") {
    formDisplay.style.display = "none";
  }
}

btnUploadImage.addEventListener("change", loadedFile);

// Formulaire dynamique
const formCategory = document.getElementById("choix-category");

// Objets
function chooseCategory() {
  category.forEach((category) => {
    const optionObjets = document.createElement("option");
    optionObjets.setAttribute("value", category.name);
    optionObjets.innerText = category.name;
    formCategory.appendChild(optionObjets);
  });
}

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
// quand je clique dessus je veux qu'un projet soit supprimé

const projectsModified = document.querySelectorAll(
  "project-card-modif, project-card"
);
console.log(projectsModified);

const trash = document.getElementById("trash");
trash.addEventListener("click", deleteProjects);

function deleteProjects() {
  projectsModified.forEach((project) => {
    let dataId = {
      id: project.id,
    };

    let urlDelete = `http://localhost:5678/api/works/${dataId}`;

    let fetchDelete = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dataUser.token}`,
      },
      body: JSON.stringify(dataId),
    };

    fetch(urlDelete, fetchDelete)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Echec de la supression");
        } else {
          console.log("Projet supprimé avec succès");
        }
      })
      .catch((error) => {
        console.log("Echec de la supression", error);
      });
  });
}

// ******************************* AJOUT D'UN PROJET ************************************
const btnValidationAjout = document.getElementById("btn-valid");
const inputTitre = document.getElementById("titre");

btnValidationAjout.addEventListener("change", (f) => {
  if (
    imageDisplay.style.display === "block" &&
    !inputTitre === "" &&
    !formCategory === ""
  ) {
    btnValidationAjout.style.backgroundColor = "#1D6154";
  }
});

btnValidationAjout.addEventListener("click", AddProjects);

function AddProjects() {
  projectsModified.forEach((project) => {
    let dataProjects = {
      image: project.imageUrl,
      title: project.title,
      category: project.category.name,
    };

    let urlAdd = `http://localhost:5678/api/works/${dataProjects}`;

    let fetchAdd = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dataUser.token}`,
      },
      body: JSON.stringify(dataProjects),
    };

    fetch(urlAdd, fetchAdd)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Echec de l'ajout");
        } else {
          console.log("Projet ajouté avec succès");
        }
      })
      .catch((error) => {
        console.log("Echec de l'ajout", error);
      });
  });
}
