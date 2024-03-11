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
  projectsModifContainer.innerHTML = "";
  projects.forEach((project) => {
    const figureElementModif = document.createElement("figure");
    const trashElement = document.createElement("i");
    trashElement.addEventListener("click", deleteProject);
    trashElement.id = "trash-" + project.id;
    trashElement.classList.add("fa-solid", "fa-trash-can", "trash-position");
    let imageElementModif = document.createElement("img");
    imageElementModif.src = project.imageUrl;
    figureElementModif.classList.add("project-card-modif");
    figureElementModif.id = project.id;
    projectsModifContainer.appendChild(figureElementModif);
    figureElementModif.appendChild(imageElementModif);
    figureElementModif.appendChild(trashElement);
  });
}

const btnAddPhoto = document.getElementById("btn-add-1");
btnAddPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  modalContentGallery.style.display = "none";
  modalContentAddPhoto.style.display = null;
});

// Modale AddPhoto Display

const btnBackGallery = document.querySelector(".js-modal-back");

modalContentAddPhoto.innerHTML = `
<div class="btn-close-back">
<button class="js-modal-back">
<i class="fa-solid fa-arrow-left"></i></button>
  <button class=js-modal-close>
  <i class="fa-solid fa-xmark"></i></button>
</div>
<h4 id=titlemodal2>Ajout photo</h4>
<div class=form-container>

</div>
  `;

// ************************************ FORMULAIRE *****************************************

const containerForm = document.querySelector(".form-container");
const formProjects = document.createElement("form");
formProjects.id = "formAddProject";
formProjects.classList.add("form-ajout-photo");
formProjects.setAttribute("action", "#");
formProjects.setAttribute("method", "post");
containerForm.appendChild(formProjects);

// Partie ajout du fichier photo
const fileContainer = document.createElement("div");
const imageDisplay = document.createElement("div");
const formDisplay = document.createElement("div");
const imageForm = document.createElement("div");
const iForm = document.createElement("i");
const labelForm = document.createElement("label");
const btnUploadImage = document.createElement("input");
const paragrapheForm = document.createElement("p");
fileContainer.classList.add("file-container");
imageDisplay.classList.add("display-photo");
formDisplay.classList.add("ajouter-photo");
imageForm.classList.add("image-form");
iForm.classList.add("fa-solid", "fa-image");
labelForm.classList.add("btn-file");
labelForm.setAttribute("for", "fichier");
labelForm.textContent = "+ Ajouter photo";
imageDisplay.id = "form-result-image";
formDisplay.id = "form-add-photo";
btnUploadImage.id = "fichier";
btnUploadImage.setAttribute("type", "file");
btnUploadImage.setAttribute("name", "fichier");
btnUploadImage.setAttribute("accept", "image/*");
btnUploadImage.setAttribute("style", "display:none;");
btnUploadImage.required = true;
paragrapheForm.textContent = "jpg, png : 4mo max";
formProjects.appendChild(fileContainer);
fileContainer.appendChild(imageDisplay);
fileContainer.appendChild(formDisplay);
formDisplay.appendChild(imageForm);
imageForm.appendChild(iForm);
formDisplay.appendChild(labelForm);
formDisplay.appendChild(btnUploadImage);
formDisplay.appendChild(paragrapheForm);

// Upload image dynamique

imageDisplay.style.display = "none";

function loadedFile() {
  const fileRegExp = /\.(jpe?g|png)$/i;
  if (this.files.length === 0 || !fileRegExp.test(this.files[0].name)) {
    spanForm.style.color = "red";
    spanForm.textContent = "Erreur, veuillez charger une image";
    console.log("Ce fichier n'est pas accepté");
  } else {
    const image = this.files[0];
    const imageReader = new FileReader();
    imageReader.readAsDataURL(image);
    imageReader.addEventListener("load", (event) => {
      displayImage(event, image);
    });
    spanForm.textContent = "";
    console.log("Ce fichier est accepté");
  }
}

function displayImage(event, file) {
  const figureElement = document.createElement("figure");
  figureElement.id = "image-selected";
  const imageElement = document.createElement("img");
  imageElement.id = "image-added";
  imageElement.src = event.target.result;

  figureElement.appendChild(imageElement);
  imageDisplay.appendChild(figureElement);
  imageDisplay.style.display = "block";

  if (imageDisplay.style.display === "block") {
    formDisplay.style.display = "none";
  }
}

btnUploadImage.addEventListener("change", loadedFile);

// ajout de l'input Titre et Catégorie

const inputContainerTitle = document.createElement("div");
const inputContainerCategorie = document.createElement("div");
const labelTitle = document.createElement("label");
const labelCategorie = document.createElement("label");
const inputCategorie = document.createElement("select");
const optionCategorieBase = document.createElement("option");
const inputTitleTitre = document.createElement("input");
const spanForm = document.createElement("span");
inputContainerTitle.classList.add("text-form-container");
inputContainerCategorie.classList.add("text-form-container");
inputTitleTitre.classList.add("style-form");
inputTitleTitre.id = "titre";
inputTitleTitre.setAttribute("type", "text");
inputTitleTitre.setAttribute("name", "titre");
inputTitleTitre.required = true;
labelTitle.setAttribute("for", "titre");
labelCategorie.setAttribute("for", "choix-category");
labelTitle.textContent = "Titre";
labelCategorie.textContent = "Catégorie";
inputCategorie.id = "choix-category";
inputCategorie.setAttribute("name", "category-form");
inputCategorie.classList.add("style-form");
inputCategorie.required = true;
optionCategorieBase.textContent = "";
spanForm.id = "error-form";
formProjects.appendChild(inputContainerTitle);
formProjects.appendChild(inputContainerCategorie);
inputContainerTitle.appendChild(labelTitle);
inputContainerCategorie.appendChild(labelCategorie);
inputContainerCategorie.appendChild(inputCategorie);
inputCategorie.appendChild(optionCategorieBase);
inputContainerTitle.appendChild(inputTitleTitre);
formDisplay.appendChild(spanForm);

// option du formulaire dynamique, récupération des données category

function chooseCategory() {
  category.forEach((category) => {
    const optionCategorie = document.createElement("option");
    optionCategorie.setAttribute("value", category.name);
    optionCategorie.innerText = category.name;
    inputCategorie.appendChild(optionCategorie);
  });
}

// barre de séparation

const barreDiv2 = document.createElement("div");
barreDiv2.classList.add = "barre2";
const barreHr = document.createElement("hr");
barreHr.id = "b-color";
formProjects.appendChild(barreDiv2);
barreDiv2.appendChild(barreHr);

// bouton de validation du formulaire

const btnValidationAjout = document.createElement("input");
btnValidationAjout.id = "btn-valid";
btnValidationAjout.setAttribute("type", "submit");
btnValidationAjout.setAttribute("value", "Valider");
btnValidationAjout.classList.add("btn-ajout-photo");
formProjects.appendChild(btnValidationAjout);

// si une image est chargée, un titre est écrit, et une catégorie est choisie, alors le bouton de validation d
btnValidationAjout.addEventListener("change", (f) => {
  if (
    imageDisplay.style.display === "block" &&
    inputTitleTitre.value !== "" &&
    optionCategorie.value !== "Veuillez sélectionner une catégorie"
  ) {
    btnValidationAjout.style.backgroundColor = "#1D6154";
  }
});
formProjects.addEventListener("submit", function (e) {
  e.preventDefault();
  addProjects();
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

// récupération de l'id du bouton poubelle
// quand je clique dessus je veux qu'un projet soit supprimé

// ma fonction deleteProject
function deleteProject(event) {
  const elementId = event.target.id;
  console.log(elementId);
  const deleteId = elementId.split("-")[1];
  // je stocke mon id dans une variable
  // je sépare mon id trash d'un "-" pour récupérer ensuite que le numéro de la poubelle (index)

  // je crée donc la requete DELETE avec les informations suivantes
  let data = {
    id: deleteId,
  };

  let urlDelete = `http://localhost:5678/api/works/${data}`;

  // ma requête DELETE
  let fetchDelete = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  fetch(urlDelete, fetchDelete)
    .then((response) => {
      console.log("Server response: ", response);
      if (!response.ok) {
        throw new Error("Echec de la supression");
      } else {
        console.log("Projet supprimé avec succès");

        // dans mon tableau, je souhaite filtrer, conserver uniquement les éléments dont l'ID est différent de deleteId
        projects = projects.filter((e) => {
          // console.log(e.id, parseInt(deleteId));
          return e.id !== parseInt(deleteId);
        });
        console.log(projects);
        // je mets à jour mes affichages
        projectsDisplayModif();
        projectsDisplay();
      }
    })
    .catch((error) => {
      console.log("Echec de la supression", error);
    });
}

// ******************************* AJOUT D'UN PROJET ************************************

function addProjects() {
  let imgId = document.querySelector("#image-selected img").id;
  let titleImg = document.getElementById("titre").value;
  let categoryImg = document.getElementById("choix-category").value;
  console.log(imgId);
  console.log(titleImg);
  console.log(categoryImg);

  let dataAddProject = {
    image: imgId,
    title: titleImg,
    category: categoryImg,
  };

  let urlAdd = `http://localhost:5678/api/works`;

  let fetchAdd = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(dataAddProject),
  };

  fetch(urlAdd, fetchAdd)
    .then((response) => {
      console.log("Server response: ", response);
      if (!response.ok) {
        throw new Error("Echec de l'ajout");
      }
      return response.json();
    })
    .then((dataProjects) => {
      console.log(dataProjects);
      dataProjects.forEach((dataProjects) => {
        const figureElement = document.createElement("figure");
        let imageElement = document.createElement("img");
        let captionElement = document.createElement("figcaption");
        figureElement.classList.add("project-card");
        figureElement.id = dataProjects.id;
        imageElement.src = dataProjects.imageUrl;
        imageElement.alt = "image de " + dataProjects.titleImg;
        captionElement.textContent = dataProjects.titleImg;
        projectsContainer.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(captionElement);
      });
      projectsDisplayModif();
      projectsDisplay();
    })
    .catch((error) => {
      console.log("Echec de l'ajout", error);
    });
}
