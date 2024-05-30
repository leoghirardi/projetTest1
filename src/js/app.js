
//declaration variables
let premiereCarteRetournee = null;

let secondeCarteRetournee = null;

let estEnCoursDeVerification = false;

let nombreDeCoups = 0;

let pairesTrouvees = 0;


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

//Création variable pour stocker le nombre total de cases
const nombreTotalDeCases = document.querySelectorAll('#jeu td').length;

//Calcul nombre d’images uniques nécessaires 
const nombreImagesUniques = nombreTotalDeCases / 2;

//selection premières images du tableau imagesTab 
const imagesSelectionnees = imagesTab.slice(0, nombreImagesUniques);

//creation d'un tableau dans lequel on double les images selectionnées pour avoir des paires
const imagesPourLeJeu = [...imagesSelectionnees, ...imagesSelectionnees];


//melange les images avant de les repartir sur le plateau
melangerTableau(imagesPourLeJeu);

//associe chaque image du tableau contenant les paires, a une case du tableau HTML
associerImagesALaGrille();

//declaration de cartes, nodelist contenant l'id de chaque case du tableau html
const cartes = document.querySelectorAll('#jeu td');

// pour chaque carte 
cartes.forEach(carte => {

    //on ajoute un eventListener, au clic
    carte.addEventListener('click', function() {

        //empeche de retourner deux fois la même carte ou retourner plus de deux cartes à la fois SI   verif en cours    OU     SI    identique a la premiere carte retournee
        if (estEnCoursDeVerification || carte === premiereCarteRetournee || carte === secondeCarteRetournee) {
            return;
        }

        //afficher l’image à deviner (côté recto) de la carte.
        retournerCarte(carte);

        //SI   c'est la première carte retournée, définir sur la carte actuelle
        if (!premiereCarteRetournee) {
            premiereCarteRetournee = carte;

        } else {

            //SINON   definir sur secondeCarteRetournee
            secondeCarteRetournee = carte;
            estEnCoursDeVerification = true;

            // Désactiver l'écoute des événements de clic, pour empecher de jouer d'autres cartes
            cartes.forEach(carte => {
                carte.removeEventListener('click', retournerCarte);
            });

            //lancer fonction de verification de paire ou non
            verifierCorrespondance();
        }
    });
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        reinitialiserJeu();
    }
});



function melangerTableau(tab) {
    for (let i = tab.length - 1; i > 0; i--) {
      // Génère un index aléatoire entre 0 et i (inclus)
      const j = Math.floor(Math.random() * (i + 1));
    
      // Échange les éléments à l'index i et j
        [tab[i], tab[j]] = [tab[j], tab[i]];
    }
}

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

function retournerCarte(carte) {
    // Ajoute la classe pour déclencher l'animation 3D
    carte.classList.add('carte-retournee');
    

    // Attend un court délai avant de changer la visibilité des images
    setTimeout(() => {
        // Sélectionne l'image recto et verso de la carte
        const imgVerso = carte.querySelector('img:first-child');
        const imgADeviner = carte.querySelector('img:last-child');

        // Change la visibilité des images
        imgVerso.style.display = 'none';
        imgADeviner.style.display = 'block';
    }, 150); // Délai pour permettre à l'animation de démarrer avant de changer la visibilité, (sinon animation pas coherente)
}



function cacherCarte(carte) {
    // Sélectionne l'image recto et verso de la carte
    const imgVerso = carte.querySelector('img:first-child');
    const imgADeviner = carte.querySelector('img:last-child');



    
        // Change la visibilité des images
        imgVerso.style.display = 'block';
        imgADeviner.style.display = 'none';

        // Retire la transformation 3D de la carte
        carte.classList.remove('carte-retournee');
    
}




function verifierCorrespondance() {
    //pour definir si deux images sont identiques, on compare leur url

    //creation de deux variables correspondant aux url des images de la premiere, et de la seconde carte
    let imgPremiereCarte = premiereCarteRetournee.lastElementChild.src;
    let imgSecondeCarte = secondeCarteRetournee.lastElementChild.src;
    
    
    // Si les cartes correspondent, on les laisse retournées, on desactive le clic dessus
    if (imgPremiereCarte === imgSecondeCarte) {
        premiereCarteRetournee.removeEventListener('click', retournerCarte);
        secondeCarteRetournee.removeEventListener('click', retournerCarte);

        //on reinitialise les variables de premiere et seconde cartes retournees, et le booléen indiquant la verification en cours.
        reinitialiserVerification();

        //on implémente le compteur de paires trouvées
        pairesTrouvees++;

        //on met l'affichage du compteur de paires à jour
        document.getElementById('compteurPaires').textContent = "Paires découvertes : " + pairesTrouvees;



        //  SI  toutes les paires trouvées
        if (pairesTrouvees === nombreImagesUniques) {

            //on met a jour l'affichage du compteur pour inquer la victoire
            document.getElementById('compteurPaires').textContent = "Vous avez trouvé toutes les paires ! Félicitations !";
        }


// SINON   (si les cartes ne correspondent pas)
    } else {
        
        // On les retourne après un délai 
        setTimeout(() => {
            // Vérifie que les deux cartes soient bien retournées
            if (premiereCarteRetournee && secondeCarteRetournee) {

                //retourne les cartes
                cacherCarte(premiereCarteRetournee);
                cacherCarte(secondeCarteRetournee);

                reinitialiserVerification();
            }

            // Réactiver l'écoute des clics après le délai
            cartes.forEach(carte => {
                carte.addEventListener('click', retournerCarte);
            });
        }, 1500); // 1000 ms (1 secondes) de délai
    }

    nombreDeCoups++;
    document.getElementById('affichageNbCoups').textContent = "Nombre de coups : " + nombreDeCoups;
}


function reinitialiserVerification() {
    premiereCarteRetournee = null;
    secondeCarteRetournee = null;
    estEnCoursDeVerification = false;
}


function reinitialiserJeu() {
    // Remettre toutes les cartes face verso
    cartes.forEach(carte => {
        const imgVerso = carte.querySelector('img:first-child');
        const imgADeviner = carte.querySelector('img:last-child');

        imgVerso.style.display = 'block';
        imgADeviner.style.display = 'none';

       // Supprimer la classe de rotation 3D si elle est présente
        carte.classList.remove('carte-retournee');
    });
    
    // Mélanger les images pour une nouvelle partie
    melangerTableau(imagesPourLeJeu);
    
    // Réinitialiser les variables de jeu
    reinitialiserVerification();
    nombreDeCoups = 0;
    pairesTrouvees = 0;

    // Mettre à jour l'affichage du nombre de coups
    document.getElementById('affichageNbCoups').textContent = "Nombre de coups : " + nombreDeCoups;

// Mettre à jour l'affichage du compteur de paires
document.getElementById('compteurPaires').textContent = "Paires découvertes : " + pairesTrouvees;
}

















