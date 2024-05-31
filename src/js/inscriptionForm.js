
function validerForm(event){
    //Empecher le rechargement de la page par default à la validation du formulaire
    event.preventDefault();

    //appeler les fonctions de validation et stocker leur resultat (booléens)
    const nomValide = validerNom();
    const emailValide = validerEmail();
    const mdpValide = validerMotDePasse();
    const mdpConfirmValide = confirmerMdp();

    //Verfier SI  toutes les validations sont reussies
    if(nomValide && emailValide && mdpValide && mdpConfirmValide){
        //si toutes les validations sont réussies, soumettre le formulaire
        //WORK IN PROGRESS, pop up pour confirmer pour l'instant
        alert('le formulaire semble valide, pret à être soumis!');
    }else{
        //SI  au moins une validation echoue, afficher mesage d'erreur
        alert('Veuillez remplir correctement tous les champs du formulaire!');
    }
}

//Lier la fonction ValiderForm à l'evenement submit du formulaire
const formulaire = document.getElementById('inscriptionForm');
//associer l'evenement du submit du formulaire a la fonction validerForm
formulaire.addEventListener('submit', validerForm);




//Validation du nom
function validerNom(){
    //recupere l'element input du nom d'utilisateur
    const elementNomInput = document.getElementById('nom');
    //recupere la valeur de l'input nom
    let nomInput = elementNomInput.value;
    //nettoie la valeur de nomInput en supprimant les espaces
    nomInput = nomInput.trim();
    //recupere l'element #nomMessage pour afficher les erreurs 
    const nomMessage = document.getElementById('nomMessage');
    

    //SI   il y a moins de 3 caractères
    if(nomInput.length < 3) {
     //Affichage dans #nomMessage les consignes
        nomMessage.textContent = "Le nom d'utilisateur doit avoir au moins 3 caractères!";
        //indiquer que la validation a échoué
    return false;
    }

    //effacer le message d'erreur si existant
    nomMessage.textContent = '';
    //indiquer que la validation a réussi
    return true;
}



//validation Email
function validerEmail(){
    //Récupère l'élément input de l'email
    const elementEmailInput = document.getElementById('email');
    //recupere la valeur de l'input email
    let emailInput = elementEmailInput.value;
    // Nettoie la valeur de emailInput en supprimant les espaces vides au début et à la fin
    emailInput = emailInput.trim();
    // Récupère l'élément #emailMessage pour afficher les erreurs
    const emailMessage = document.getElementById('emailMessage');


    //expression reguliere pour valider le format email
    const emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";


    //verifie  SI  l'email  NE correspond PAS  au format defini dans emailRegex
    if (!verifierRegexEmail){
        //affiche un message d'erreur dans #emailMessage
        emailMessage.textContent = "Veuillez saisir une adresse email valide!";
        //indique que la validation a échoué
        return false;
    }

    function verifierRegexEmail(){
        emailRegex.test(emailInput);
    }

    //efface le message d'erreur s'il existait
    emailMessage.textContent = '';
    //indique que la validation a reussi
    return true;


}


//valider le mot de passe
function validerMotDePasse(){
    //recupere l'element input du mot de passe
    const elementMdpInput = document.getElementById('mdp');
    //recupere la valeur de l'input mot de passe
    const mdpInput = elementMdpInput.value;
    //recupere l'e;ement #mdpMessage pour afficher erreur
    const mdpMessage = document.getElementById('mdpMessage');

    // Expression régulière pour vérifier le format du mot de passe
    const mdpRegex = "/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}/";
    //verifie  SI  le mdp  NE  correspond  PAS  aux criteres
    if(!verifierRegexMdp){
        //affiche message d'erreur dans #mdpMessage
        mdpMessage.textContent = 'Le mod de passe doit contenir au moins 1 symbole, un chiffre et 6 caractères minimum!';
        //indique que la validation a echoue
        return false;
    }

    function verifierRegexMdp(){
        mdpRegex.test(mdpInput)
    }

    //Efface le message d'erreur s'il existait
    mdpMessage.textContent = '';
    //indique que la validation a reussi
    return true;

}

//Confirmation mdp
function confirmerMdp(){
    // Récupération des éléments input des champs mot de passe et  confirmation
    //#mdp
    const elementMdpInput = document.getElementById('mdp');
    //#mdpConfirm
    const elementMdpConfirmInput = document.getElementById('mdpConfirm');

    //recuperation des valeurs des inputs #mdp et #mdpConfirm
    //#mdp
    const mdpInput = elementMdpInput.value;
    //#mdpConfirm
    const mdpConfirmInput = elementMdpConfirmInput.value

    //recuperation de l'element #mdpConfirmMessage
    const mdpConfirmMessage = document.getElementById('mdpConfirmMessage');


    //Verification si valeurs de #mdp et #mdpConfirm sont identiques
    if(mdpInput !== mdpConfirmInput){
        //affichage message d'erreur
        mdpConfirmMessage.textContent = 'La confirmation du mot de passe ne correspond pas.';
        //indique que la validation a échoué
        return false;
    }

    //effacer message d'erreur s'il existait
    mdpConfirmMessage.textContent = '';
    //indique que la validation a reussi
    return true;
}

function evaluerForceMdp(motDePasse){
    //verifier longueur mdp
    if(motDePasse.length <6){
        return "Faible";
    }


    //Verifier la presence de caracteres spéciaux et de chiffres
    const contientSymbole = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(motDePasse);
    const contientChiffre = /\d/.test(motDePasse);

    if(motDePasse.length > 9 && contientSymbole && contientChiffre){
        return "Fort";
    }else if(motDePasse.length > 6 && (contientSymbole || contientChiffre)){
        return "Moyen";
    }

    // Si le mot de passe ne satisfait aucune des conditions ci-dessus,
    // cela signifie qu'il a une longueur supérieure à 6 mais n'est pas moyen ni fort
        return "Faible";
}


