
test("le jeu se termine après 5 secondes", () => {
  jest.useFakeTimers();

  const { initDOM } = require('./script.js');

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

  initDOM();

  const btn = document.getElementById("btn");
  const compteur = document.getElementById("compteur");

  btn.click(); 

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


afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});