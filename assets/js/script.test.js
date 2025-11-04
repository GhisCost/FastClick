let script;

beforeEach(() => {
  document.body.innerHTML = `
    <div id="main">
      <div id="container">
        <h1 class="titre">ClickFast</h1>
        <p class="catchphrase">Etes vous un cliqueur fou ? A vous de tester ! ⚡</p>
      </div>
      <div class="div-btn">
        <button id="btn">Ne pas cliquer</button>
      </div>
    </div>
    <div class="resul_compteur">
        <p id="compteur"></p>
        <p id="result"></p>
    </div>
  `;

  jest.resetModules();
  script = require("./script.js");
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

test("le jeu démarre et compte le nombre de clics", () => {
  const { initDOM, clickCompteur } = script;
  initDOM();

  const result = document.getElementById("result");

  clickCompteur();
  expect(result.textContent).toBe("Votre resultats: 0");

  clickCompteur();
  expect(result.textContent).toBe("Votre resultats: 1");

  clickCompteur();
  expect(result.textContent).toBe("Votre resultats: 2");
});

test("le jeu se termine après 5 secondes", () => {
  jest.useFakeTimers();

  const { initDOM, clickCompteur } = script;

  const { btn, compteur } = initDOM();

  clickCompteur();
  expect(compteur.textContent).toBe("Il vous reste 5 secondes");

  jest.advanceTimersByTime(1000);
  expect(compteur.textContent).toBe("Il vous reste 4 secondes");

  jest.advanceTimersByTime(4000);
  expect(compteur.textContent).toBe("Temps écoulé !");
  expect(btn.disabled).toBe(true);

  jest.advanceTimersByTime(1500);
  expect(btn.disabled).toBe(false);
  expect(compteur.textContent).toBe("Clique pour rejouer !");
});
