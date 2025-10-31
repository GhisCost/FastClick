

const btn = document.getElementById("btn");
const compteur = document.getElementById("compteur");
const result = document.getElementById("result");

let count = 0;
let temps = 5;
let timer = null;
let isPlaying = false;

btn.addEventListener("click", function () {
  if (!isPlaying) {
    isPlaying = true;
    count = 0;
    temps = 5;
    result.textContent = count;
    compteur.textContent = "Il vous reste " + temps + " secondes";

    timer = setInterval(() => {
      temps--;
      compteur.textContent = "Il vous reste " + temps + " secondes";

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
    }, 1000);
  }

  if (isPlaying && temps > 0) {
    count++;
    result.textContent = "Votre resultats: " + count;
  }
});

btn.addEventListener('mouseover', function(){
    btn.textContent="Bah si faut cliquer";
})

btn.addEventListener('mouseleave',function(){
    btn.textContent='Ne pas cliquer';
})
