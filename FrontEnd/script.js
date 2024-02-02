const projectsContainer = document.querySelector(".gallery");
let projects = [];
// je crée une boite pour mettre à l'intérieur les données de l'API

// console.log(projectsContainer);

// je récupère les données de l'API avec un fetch
async function fetchProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (projects = data));

  console.log(projects);
  // une fois que le fetch est appliqué, on appelle la fonction d'affichage
  projectsDisplay();
}

// je créer ma fonction d'affichage
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

// je veux que la fonction de fetch se joue dès l'ouverture de la page web
window.addEventListener("load", fetchProjects);
