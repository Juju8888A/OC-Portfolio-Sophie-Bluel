// je récupère mon bouton d'envoi du formulaire
const validBtn = document.getElementById("btn-envoi");
const mail = document.getElementById("mail");
const mdp = document.getElementById("mdp");
// récupération du formulaire pour l'envoi à la fin en POST
const myForm = document.getElementById("myForm");
// récupération des inputs du formulaire
let mailM = document.getElementById("mail_missing");
let mailValid = /[a-z._-]+@[a-z._-]+\.[a-z._-]+/;
// console.log(mailValid);
let mdpM = document.getElementById("mdp_missing");
// console.log(mdp);

function formValid(e) {
  // si il n'y a rien écrit dans mon champ, je mets un message d'erreur
  if (mail.value === "") {
    // je n'oublie pas de bloquer le renvoi du formulaire
    e.preventDefault;
    mailM.textContent =
      "Veuillez remplir ce champ avec votre adresse e-mail valide.";
    mailM.style.color = "red";
    // si l'adresse mail écrite ne correspond pas au RegExp, il y a un message d'erreur également
  } else if (mailValid.test(mail.value) == false) {
    e.preventDefault();
    mailM.textContent = "Format incorrect";
    mailM.style.color = "red";
  }
  if (mdp.value === "") {
    e.preventDefault;
    mdpM.textContent =
      "Veuillez remplir ce champ avec votre mot de passe valide.";
    mdpM.style.color = "red";
  }
}

// je crée un evenement click sur mon bouton de validation, au clic, j'appelle la fonction formValid pour vérifier que mes champs sont bien remplis
validBtn.addEventListener("click", formValid);
