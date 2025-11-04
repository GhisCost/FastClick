

let btn;
let compteur;
let result;
let count = 0;
let temps = 5;
let timer = null;
let isPlaying = false;

function initDOM() {
  btn = document.getElementById("btn");
  compteur = document.getElementById("compteur");
  result = document.getElementById("result");

  if (!btn || !compteur || !result) return;

  btn.addEventListener("click", clickCompteur);
  btn.addEventListener("mouseover", changerBtnClic);
  btn.addEventListener("mouseleave", changerBtnPasClic);

  return { btn, compteur, result };
}

function clickCompteur() {
  if (!isPlaying) {
    isPlaying = true;
    count = 0;
    temps = 5;
    result.textContent = "Votre resultats: " + count;
    compteur.textContent = "Il vous reste " + temps + " secondes";
    compteRebourd();
  } else {
    if (temps > 0) {
      count++;
      result.textContent = "Votre resultats: " + count;
    }
  }
}

function compteRebourd() {
  timer = setInterval(() => {
    temps--;
    compteur.textContent = "Il vous reste " + temps + " secondes";
    finJeu();
  }, 1000);
}

function finJeu() {
  if (temps <= 0) {
    clearInterval(timer);
    compteur.textContent = "Temps écoulé !";
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
      compteur.textContent = "Clique pour rejouer !";
      isPlaying = false;
    }, 1500);
  }
}

function changerBtnClic() {
  btn.textContent = "Bah si faut cliquer";
}

function changerBtnPasClic() {
  btn.textContent = "Ne pas cliquer";
}

if (typeof window !== "undefined" && typeof module === "undefined") {
  window.addEventListener("DOMContentLoaded", initDOM);
}



if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initDOM,
    clickCompteur,
    compteRebourd,
    finJeu,
    changerBtnClic,
    changerBtnPasClic
  };
}