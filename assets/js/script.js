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
    postData();
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
    changerBtnPasClic,
  };
}


const postData = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  const data = {
    createdAt: new Date().toISOString(),
    username: "Ghislain",
    avatar:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
    score: count,
    website_url: "https://ghiscost.github.io/FastClick/",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Data posted successfully:", result);
  } catch (error) {
    console.error("Error posting data:", error);
  }
};



const getData = async () => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    
  let listScore = document.getElementById('listScore');
  data.forEach(element => {
    
  });

  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

getData();

const usernameToDelete = "Ghislain";

const deleteUserByUsername = async (username) => {
  const url = "https://672e1217229a881691eed80f.mockapi.io/scores";

  try {
    // Étape 1 : Récupérer les utilisateurs avec le même username
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    const usersToDelete = users.filter(
      (user) => user.username === username
    );

    // Étape 2 : Supprimer chaque utilisateur trouvé
    for (const user of usersToDelete) {
      const deleteResponse = await fetch(`${url}/${user.id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) {
        console.error(
          `Error deleting user with ID ${user.id}:`,
          deleteResponse.statusText
        );
      } else {
        console.log(`User with ID ${user.id} deleted successfully.`);
      }
    }

    // Étape 3 : Ajouter un nouvel utilisateur
    const newUserData = {
      createdAt: new Date().toISOString(),
      username: "Ghislain", 
      avatar:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg&f=1&nofb=1&ipt=ce88f4f6a1f2aee8e614210b05c3d89497b10763c7fd4ff1651ce821f5b3cd8d&ipo=images",
      score: count,
      website_url: "https://ghiscost.github.io/FastClick/",
    };

    const postResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!postResponse.ok) {
      throw new Error("Network response was not ok");
    }

    const newUserResult = await postResponse.json();
    console.log("New user posted successfully:", newUserResult);
  } catch (error) {
    console.error("Error:", error);
  }
};


// deleteUserByUsername(usernameToDelete);