//creation du tableau contenant les images
const imagesTab = [
    "/ressources/animaux/1.webp",
    "/ressources/animaux/2.webp",
    "/ressources/animaux/3.webp",
    "/ressources/animaux/4.webp",
    "/ressources/animaux/5.webp",
    "/ressources/animaux/6.webp",
    "/ressources/animaux/7.webp",
    "/ressources/animaux/8.webp",
    "/ressources/animaux/9.webp",
    "/ressources/animaux/10.webp",
    "/ressources/animaux/11.webp",
    "/ressources/animaux/12.webp",
    "/ressources/animaux/13.webp",
    "/ressources/animaux/14.webp",
    "/ressources/animaux/15.webp",
    "/ressources/animaux/16.webp",
    "/ressources/animaux/17.webp",
    "/ressources/animaux/18.webp",
    "/ressources/animaux/19.webp",
    "/ressources/animaux/20.webp",
    "/ressources/animaux/21.webp",
    "/ressources/animaux/22.webp",
    "/ressources/animaux/23.webp",
    "/ressources/animaux/24.webp",
    "/ressources/animaux/25.webp",
    "/ressources/animaux/26.webp",
    "/ressources/animaux/27.webp",
    "/ressources/animaux/28.webp",

];

//Crée une variable pour stocker le nombre total de cases
const nombreTotalDeCases = document.querySelectorAll('#jeu td').length;

//Calcule le nombre d’images uniques nécessaires 
const nombreImagesUniques = nombreTotalDeCases / 2;

//obtenir les premières images du tableau imagesTab 
const imagesSelectionnees = imagesTab.slice(0, nombreImagesUniques);

//Duplique ce sous-ensemble pour que chaque image ait sa paire
const imagesPourLeJeu = [...imagesSelectionnees, ...imagesSelectionnees];

let premiereCarteRetournee = null;

let secondeCarteRetournee = null;

let estEnCoursDeVerification = false;

let nombreDeCoups = 0;

let pairesTrouvees = 0;


function melangerTableau(tab) {
    for (let i = tab.length - 1; i > 0; i--) {
      // Génère un index aléatoire entre 0 et i (inclus)
      const j = Math.floor(Math.random() * (i + 1));
    
      // Échange les éléments à l'index i et j
        [tab[i], tab[j]] = [tab[j], tab[i]];
    }
}

//melange les images avant de les repartir sur le plateau
melangerTableau(imagesPourLeJeu);


function associerImagesALaGrille() {
    
    // Sélectionne la div avec l'id "jeu"
    const divJeu = document.getElementById('jeu');

    // Sélectionne les cellules de la grille à l'intérieur de cette div
    const cartes = divJeu.querySelectorAll('td'); 


    for (let i = 0; i < imagesPourLeJeu.length; i++) {

        // Récupere la cellule correspondante à l'indice i
        const carte = cartes[i];
        
        const image = document.createElement('img');

        // Associe l'image mélangée à la cellule
        image.src = imagesPourLeJeu[i]; 

        // Ajoute l'image à la cellule
        carte.appendChild(image); 
    }
}
associerImagesALaGrille();

const cartes = document.querySelectorAll('#jeu td');

// pour chaque carte 
cartes.forEach(carte => {

    //on ajoute un eventListener, qui au clic, execute la fonction
    carte.addEventListener('click', function() {

        //empeche de retourner deux fois la même carte ou retourner plus de deux cartes à la fois si verif en cours ou si identique a la premiere carte retournee
        if (estEnCoursDeVerification || carte === premiereCarteRetournee) {
            return;
        }

        //afficher l’image à deviner (côté recto) de la carte.
        retournerCarte(carte);

        //si c'est la première carte retournée, définir sur la carte actuelle
        if (!premiereCarteRetournee) {
            premiereCarteRetournee = carte;

        } else {

            //sinon definir sur secondeCarteRetournee
            secondeCarteRetournee = carte;
            estEnCoursDeVerification = true;
            verifierCorrespondance();
        }
    });
});

//change l’apparence de la carte pour montrer l’image à deviner
function retournerCarte(carte) {

//on definit une variable pour le verso, et le recto/a Deviner
        const imgVerso = carte.querySelector('img:first-child');
        const imgADeviner = carte.querySelector('img:last-child');


        // Vérifie si l'image est déjà affichée avant de la retourner
    if (imgADeviner.style.display === 'block') {
        imgVerso.style.display = 'block';
        imgADeviner.style.display = 'none';
    } else {
        imgVerso.style.display = 'none';
        imgADeviner.style.display = 'block';
    }
}
    
        
function verifierCorrespondance() {
    let imgPremiereCarte = premiereCarteRetournee.lastElementChild.src;
    let imgSecondeCarte = secondeCarteRetournee.lastElementChild.src;

    if (imgPremiereCarte === imgSecondeCarte) {
        premiereCarteRetournee.removeEventListener('click', retournerCarte);
        secondeCarteRetournee.removeEventListener('click', retournerCarte);
        reinitialiserVerification();
        pairesTrouvees++;
        if (pairesTrouvees === nombreImagesUniques) {
            // Toutes les paires ont été trouvées, le jeu est terminé
            console.log('Bravo ! Vous avez gagné !');
        }
    } else {
        setTimeout(() => {
            retournerCarte(premiereCarteRetournee);
            retournerCarte(secondeCarteRetournee);
            reinitialiserVerification();
        }, 3000);
    }
    nombreDeCoups++;
    document.getElementById('affichageNbCoups').textContent = `Nombre de coups : ${nombreDeCoups}`;
}

//réinitialiser les variables premiereCarteRetournee, secondeCarteRetournee et estEnCoursDeVerification après chaque tentative
    function reinitialiserVerification() {
        premiereCarteRetournee = null;
        secondeCarteRetournee = null;
        estEnCoursDeVerification = false;
    }











// function reinitialiserJeu() {
//     // Code pour réinitialiser le jeu
// }

// document.addEventListener('keydown', function(event) {
//     if (event.key === ' ') {
//         reinitialiserJeu();
//     }
// });

