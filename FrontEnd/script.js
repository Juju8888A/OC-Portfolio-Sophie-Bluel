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

// je crée ma barre d'étition en haut de page
let modeEdition = document.createElement("div");
modeEdition.id = "edition-bar";
modeEdition.innerHTML = "<p>Mode édition</p>";
// je l'insère au dessus du header
let header = document.querySelector("header");
document.body.insertBefore(modeEdition, header);

// je crée mon bouton modifier
let titleSection2 = document.getElementById("title-projects");
titleSection2.innerHTML +=
  "<button class=btn-modif><i class=`fa-solid fa-pen-to-square`></i>modifier</button>";

// je fais disparaitre ma barre
let filterBar = document.querySelector(".filter-bar");
filterBar.style.display = "none";

// je change login en logout quand l'utilisateur est connecté
let logBtn = document.getElementById("login-btn");
logBtn.innerHTML = "logout";

// ************* MODALE *********************

// const openModal = function (e) {
//   e.preventDefault();
//   const target = document.querySelector(e.target.getAttribute("href"));
//   target.style.display = null;
//   target.removeAttribute("aria-hidden");
//   target.setAttribute("aria-modal", "true");
// };
// document.querySelectorAll(".js-modal").forEach((a) => {
//   a.addEventListener("click", openModal);
// });

{
  /* <div class="edition-bar"><i class="fa-solid fa-pen-to-square" id="icone"></i>Mode édition</div> */
}

{
  /* <a href="#modal1" class="js-modal"><button type="text" id="button-modify"><i
						class="fa-solid fa-pen-to-square" id="icone"></i>modifier</button></a>
			<aside id="modal1" class="modal" role="dialog" aria-modal="false" aria-labelledby="title-modal">      
				<div class="modal-wrapper">
					<h4 id="title-modal">Galerie photo</h4>
					<p>Hello, little man. I will destroy you! Calculon is gonna kill us and it's all everybody else's
						fault! You mean while I'm sleeping in it? Eeeee! Now say "nuclear wessels"! I videotape every
						customer that comes in here, so that I may blackmail them later.</p>
					<p>It doesn't look so shiny to me. Shut up and get to the point! Professor, make a woman out of me.  
						Bender, we're trying our best. <strong> Fry!</strong> <em> Stay back!</em> He's too powerful!
					</p>  
					<input type="text">
					<a href="#">coucou</a>

					<h3>I was all of history's great robot actors - Acting Unit 0.8; Thespomat; David Duchovny!</h3>
					<p>Then throw her in the laundry room, which will hereafter be referred to as "the brig". I'm sure
						those windmills will keep them cool. In your time, yes, but nowadays shut up! Besides, these are
						adult stemcells, harvested from perfectly healthy adults whom I killed for their stemcells.</p>
					<ul>  
						<li>Are you crazy? I can't swallow that.</li>
						<li>You can see how I lived before I met you.</li>
						<li>Eeeee! Now say "nuclear wessels"!</li>
					</ul>  
				</div>  
			</aside> */
}
