

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

validerNom();