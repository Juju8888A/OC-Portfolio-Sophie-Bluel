const projectsContainer = document.querySelector(".gallery");
// récupération des boutons de la barre de filtres
const buttonObjets = document.getElementById("btn-objets");
const buttonAppartements = document.getElementById("btn-appartements");
const buttonHotelResto = document.getElementById("btn-hotel-resto");
const buttonTous = document.getElementById("btn-tous");

// je range les données reçues dans 2 tableaux
let projects = [];
let category = [];

// je récupère les données works de l'API avec un fetch
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

// je récupère également les données category
async function fetchCategory() {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => (category = data));
  console.log(category);
  chooseCategory();
}

// je crée les éléments figure qui contiendront les projets de l'architecte grâce aux données de l'API
// je crée une première fonction d'affichage pour tous les projets
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

// J'utilise FILTER pour filtrer les différentes catégories
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

buttonTous.addEventListener("click", projectsDisplay);
buttonObjets.addEventListener("click", projectsDisplayObjets);
buttonAppartements.addEventListener("click", projectsDisplayAppartements);
buttonHotelResto.addEventListener("click", projectsDisplayHotelResto);

// je load les données dès l'ouverture de la page
window.addEventListener("load", fetchProjects);
window.addEventListener("load", fetchCategory);
console.log(localStorage.getItem("token"));

// ************************************************* MODE EDITION ***************************************************

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

  // je fais disparaitre ma barre de filtres
  let filterBar = document.querySelector(".filter-bar");
  filterBar.style.display = "none";

  // je change login en logout quand l'utilisateur est connecté
  let logBtn = document.getElementById("login-btn");
  logBtn.innerHTML = "logout";
  logBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
  });
}

// *************************************************** MODALE ********************************************************

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

// MODALE GALERIE PHOTO

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
<div class="btn-ajouter-photo">
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

// MODALE AJOUT PHOTO

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

// ************************************************ FORMULAIRE **************************************************

const containerForm = document.querySelector(".form-container");
const formProjects = document.createElement("form");
formProjects.id = "formAddProject";
formProjects.classList.add("form-ajout-photo");
formProjects.setAttribute("action", "");
formProjects.setAttribute("method", "POST");

// Partie ajout du fichier photo
const fileContainer = document.createElement("div");

const iForm = document.createElement("i");
const labelForm = document.createElement("label");
const btnUploadImage = document.createElement("input");

const paragrapheForm = document.createElement("p");
fileContainer.classList.add("file-container");

iForm.classList.add("fa-regular", "fa-image", "display-i");
iForm.setAttribute("style", "display:block;");
labelForm.classList.add("btn-file");
labelForm.setAttribute("for", "fichier");
labelForm.setAttribute("style", "display:block;");
labelForm.textContent = "+ Ajouter photo";

btnUploadImage.id = "fichier";
btnUploadImage.setAttribute("type", "file");
btnUploadImage.setAttribute("name", "fichier");
btnUploadImage.setAttribute("accept", "image/*");
btnUploadImage.setAttribute("style", "display:none;");
btnUploadImage.required = true;

paragrapheForm.textContent = "jpg, png : 4mo max";
paragrapheForm.setAttribute("style", "display:block;");
formProjects.appendChild(fileContainer);

containerForm.appendChild(formProjects);
formProjects.appendChild(fileContainer);
fileContainer.appendChild(iForm);
fileContainer.appendChild(labelForm);
fileContainer.appendChild(btnUploadImage);
fileContainer.appendChild(paragrapheForm);

// Upload image dynamique

// je crée une fonction permettant la récupération de l'image chargée
function loadedFile() {
  const fileRegExp = /\.(jpe?g|png)$/i;
  if (this.files.length === 0 || !fileRegExp.test(this.files[0].name)) {
    spanErrorImage.style.color = "red";
    spanErrorImage.textContent = "Erreur, veuillez charger une image";
    console.log("Ce fichier n'est pas accepté");
    console.log(spanErrorImage);
  } else {
    const image = this.files[0];
    const imageReader = new FileReader();
    imageReader.readAsDataURL(image);
    imageReader.addEventListener("load", (event) => {
      displayImage(event, image);
    });
    spanErrorImage.textContent = "";
    console.log("Ce fichier est accepté");
  }
}

// je crée une fonction pour afficher l'image chargée
function displayImage(event, file) {
  const imageElement = document.createElement("img");
  imageElement.id = "image-added";
  imageElement.alt = "Nouveau projet";
  imageElement.src = event.target.result;
  imageElement.setAttribute("style", "display:block");
  fileContainer.appendChild(imageElement);

  if ((imageElement.style.display = "block")) {
    iForm.setAttribute("style", "display:none;");
    labelForm.setAttribute("style", "display:none;");
    paragrapheForm.setAttribute("style", "display:none;");
  }
}
btnUploadImage.addEventListener("change", loadedFile);

// ajout de l'input Titre et Catégorie

const labelTitle = document.createElement("label");
const labelCategorie = document.createElement("label");
const inputCategorie = document.createElement("select");
const optionCategorieBase = document.createElement("option");
const inputTitleTitre = document.createElement("input");
const spanErrorImage = document.createElement("span");

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
spanErrorImage.id = "spanErrorImage";

formProjects.appendChild(labelTitle);
formProjects.appendChild(inputTitleTitre);
formProjects.appendChild(labelCategorie);
formProjects.appendChild(inputCategorie);
inputCategorie.appendChild(optionCategorieBase);
formProjects.appendChild(spanErrorImage);

// option du formulaire dynamique, récupération des données category

function chooseCategory() {
  console.log("categories: ", category);

  category.forEach((category) => {
    const optionCategorie = document.createElement("option");
    optionCategorie.setAttribute("value", category.id);
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
btnValidationAjout.classList.add("grey");
formProjects.appendChild(btnValidationAjout);

// si une image est chargée, un titre est écrit, et une catégorie est choisie, alors le bouton de validation devient vert avant la soumission du formulaire
formProjects.addEventListener("change", () => {
  console.log("Change event");
  const imgContenu = document.getElementById("fichier");

  if (
    imgContenu.files[0] &&
    inputTitleTitre.value !== "" &&
    inputCategorie.value !== ""
  ) {
    btnValidationAjout.classList.add("green");
    btnValidationAjout.classList.remove("grey");
  } else {
    btnValidationAjout.classList.add("grey");
    btnValidationAjout.classList.remove("green");
  }
});

// ********************************************** OUVERTURE DE LA MODALE **************************************************

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

// ********************************************* FERMETURE DE LA MODALE ***************************************************

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

// ******************************************* SUPPRESSION D'UN PROJET **************************************************

// récupération de l'id du bouton poubelle
// quand je clique dessus, je veux que le projet visé soit supprimé et que l'affichage des projets se fassent sur la page d'accueil et dans la modale

// ma fonction deleteProject
function deleteProject(event) {
  const elementId = event.target.id;
  console.log(elementId);
  const deleteId = elementId.split("-")[1];
  // je stocke mon id dans une variable
  // je sépare mon id trash d'un "-" pour que chaque corbeille ait un numéro associé
  console.log(deleteId);

  // je crée la requete DELETE avec les informations suivantes

  let urlDelete = `http://localhost:5678/api/works/${deleteId}`;

  // la requête DELETE
  let fetchDelete = {
    method: "DELETE",
    headers: {
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

// ***************************************************** AJOUT D'UN PROJET ************************************************************

formProjects.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e);
  addProjects();
});

// je crée ma fonction addProjects qui sera appelé en cliquant sur le bouton Valider du formulaire Ajout Photo
function addProjects() {
  // je récupère le fichier, la valeur du titre et de la catégorie, pour ensuite envoyer ces données à l'API
  const formData = new FormData();
  const imgContent = document.getElementById("fichier");
  const titleImg = document.getElementById("titre");
  const categoryImg = document.getElementById("choix-category");

  console.log(imgContent);
  console.log(titleImg);
  console.log(categoryImg);

  formData.append("image", imgContent.files[0], "restaurant-mj-ny.png");
  formData.append("title", titleImg.value);
  formData.append("category", categoryImg.value);
  for (const item of formData) {
    console.log(item);
  }

  let urlAdd = `http://localhost:5678/api/works`;

  let fetchAdd = {
    method: "POST",
    headers: {
      accept: "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  };

  fetch(urlAdd, fetchAdd)
    .then((response) => {
      if (response.ok) {
        console.log("Server response: ", response);
        console.log("Projet ajouté avec succès");
        return response.json();
      } else {
        throw new Error("Echec de la supression");
      }
    })
    .then((dataProject) => {
      // je récupère les données que j'ajoute au tableau projects avec push, puis j'appelle la fonction d'affichage pour mettre à jour
      projects.push(dataProject);
      updatedProjectsDisplay();
    })
    .catch((error) => {
      console.log("Erreur, projet non envoyé", error);
    });
}

// je crée une fonction d'affichage mise à jour avec l'ajout d'un nouveau projet
// je demande à fermer la modale suite à l'ajout du nouveau projet et met à jour l'affichage des projets sur la page d'accueil et dans la modale
function updatedProjectsDisplay() {
  projectsContainer.innerHTML = "";
  projects.forEach((dataProject) => {
    const figureElement = document.createElement("figure");
    let imageElement = document.createElement("img");
    let captionElement = document.createElement("figcaption");
    figureElement.classList.add("project-card");
    figureElement.id = dataProject.id;
    imageElement.src = dataProject.imageUrl;
    imageElement.alt = "image de " + dataProject.title;
    captionElement.textContent = dataProject.title;
    projectsContainer.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(captionElement);
  });
  projectsDisplayModif();
  projectsDisplay();
}
