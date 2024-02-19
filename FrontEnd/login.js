// je récupère mes éléments du formulaire
const myForm = document.getElementById("myForm");
const mail = document.getElementById("mail");
const mdp = document.getElementById("mdp");
const validBtn = document.getElementById("btn-envoi");
// récupération des span error
let mailMsg = document.getElementById("mail_comment");
let mdpMsg = document.getElementById("mdp_comment");
let errorLogin = document.getElementById("error_comment");

// **************************** E-MAIL*****************************************

// pour vérifier l'email je vérifie son contenu, que c'est bien une adressse mail avec regExp
const mailValid = function (inputEmail) {
  let emailRegExp = new RegExp(`^[a-z._-]+@[a-z._-]+\\.[a-z._-]+$`);
  // je teste le regExp
  let testEmail = emailRegExp.test(inputEmail.value);
  console.log(testEmail);

  // si mon adresse est bien écrite, résultat vert sinon résultat rouge
  if (testEmail) {
    mailMsg.innerHTML = "Adresse Valide";
    mailMsg.style.color = "green";
    // je renvoie true pour dire que c'est correct
    return true;
  } else {
    mailMsg.innerHTML = "Veuillez entrer un e-mail valide";
    mailMsg.style.color = "red";
    // je renvoie false pour dire que c'est incorrect
    return false;
  }
};

// **************************** MOT DE PASSE *****************************************

const mdpValid = function (inputPassword) {
  // quelles sont les erreurs possibles de mot de passe? Je souhaite que le mot de passe ait au moins 1 minuscule, 1 majuscule et 1 chiffre et qu'il fasse minimum 3 caractères.
  // j'utilise ! pour demander si il n'y a pas de majuscule, est ce que tout ça me renvoie faux?
  let messageMdp;
  // je mets la validation du mot de passe à faux et au fur et a mesure des tests il passera à vrai
  let valid = false;

  if (inputPassword.value.length < 3) {
    messageMdp = "Le mot de passe doit contenir au moins 3 caractères.";
  } else if (!/[A-Z]/.test(inputPassword.value)) {
    messageMdp = "Le mot de passe doit contenir au moins 1 majuscule";
  } else if (!/[a-z]/.test(inputPassword.value)) {
    messageMdp = "Le mot de passe doit contenir au moins 1 minuscule";
  } else if (!/[0-9]/.test(inputPassword.value)) {
    messageMdp = "Le mot de passe doit contenir au moins 1 chiffre";
  } else {
    messageMdp = "Mot de passe valide";
    valid = true;
  }
  // console.log(messageMdp);

  // affichage résultat mot de passe valide ou non

  if (valid) {
    mdpMsg.innerHTML = "Mot de passe valide";
    mdpMsg.style.color = "green";
    return true;
  } else {
    mdpMsg.innerHTML = "Veuillez entrer un mot de passe valide";
    mdpMsg.style.color = "red";
    return false;
  }
};

// ****************** EVENEMENTS **************************

// au changement de valeurs dans l'input email, je souhaite que le mailValid s'active
mail.addEventListener("change", function () {
  mailValid(this);
});

// au changement de valeurs dans l'input password, je souhaite que le mdpValid s'active
mdp.addEventListener("change", function () {
  mdpValid(this);
});

myForm.addEventListener("submit", function (e) {
  // par defaut le formulaire s'envoie, j'utilise e.preventDefault pour contrer l'envoi, je recupère l'evenement (e)
  e.preventDefault();
  if (mailValid(mail) && mdpValid(mdp)) {
    window.location.href = "index.html";
    console.log("valide");
  } else {
    errorLogin.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    errorLogin.style.color = "red";
    console.log("non valide");
  }
});

// ************* API POST ***************

// je crée un objet data avec les informations de l'utilisateur
let dataUser = {
  mail:"sophie.bluel@test.tld",
  password="S0phie"};

// je récupère l'url de l'api login
let urlLogin = "http://localhost:5678/api/users/login";

// je créer une variable avec POST
let fetchLogin = {
  method: "POST",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(dataUser),
};

fetch(urlLogin, fetchLogin)
  .then((response) => response.json())
  .then((dataUser) => {
    console.log(dataUser);
  })
  .catch((error) => {
    console.log("Une erreur est survenue", error);
  });

// // ************ ID et TOKEN **************

let id = 1;
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNzcyNjMyMSwiZXhwIjoxNzA3ODEyNzIxfQ.i_LR6LCkFbQBKLig6bO7krWxeQuLT5D77kkXiQf1kmg";

localStorage.setItem("id", id);
localStorage.setItem("token", token);
