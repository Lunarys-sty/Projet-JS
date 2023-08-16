// Variables pour les scores et l'état du jeu
let scores, roundScore, activePlayer, gamePlaying;

// Initialisation du jeu
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Joueur 1';
    document.getElementById('name-1').textContent = 'Joueur 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Changement de joueur
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

// Initialisation du jeu
init();

// Gestion du bouton "Lancer"
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Génération d'un nombre aléatoire entre 1 et 6
        let dice = Math.floor(Math.random() * 6) + 1;

        // Affichage du résultat du dé
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';

        // Mise à jour du score temporaire si le résultat n'est pas un 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Passage au joueur suivant
            nextPlayer();
        }
    }
});

// Gestion du bouton "prendre"
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Ajout du score temporaire au score global du joueur actif
        scores[activePlayer] += roundScore;

        // Mise à jour de l'affichage
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Vérification si le joueur a gagné
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Gagnant!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Passage au joueur suivant
            nextPlayer();
        }
    }
});

// Gestion du bouton "Nouveau jeu"
document.querySelector('.btn-new').addEventListener('click', init);
