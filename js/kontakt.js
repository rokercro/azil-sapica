/*
  kontakt.js je povezan SAMO na kontakt.html.
  (vidi <script src="js/kontakt.js" defer> u kontakt.html)

  Ovdje radimo:
  - validaciju forme (početnički)
  - spremanje upita u localStorage
  - prikaz zadnjeg upita na stranici
*/

document.addEventListener("DOMContentLoaded", () => {
  // 1) Uhvati elemente iz HTML-a preko njihovih ID-eva
  const form = document.getElementById("contactForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const type = document.getElementById("type");
  const message = document.getElementById("message");

  const formMsg = document.getElementById("formMsg");
  const lastRequestBox = document.getElementById("lastRequest");

  // 2) Funkcija za prikaz poruke (uspjeh/greška)
  function showMessage(text, isOk) {
    formMsg.hidden = false;
    formMsg.textContent = text;

    // Makni obje klase pa dodaj ispravnu
    formMsg.classList.remove("ok", "bad");
    formMsg.classList.add(isOk ? "ok" : "bad");
  }

  // 3) Jednostavna provjera emaila (osnovno)
  function isValidEmail(value) {
    // Vrlo jednostavan regex za početnike:
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // 4) Učitaj zadnji spremljeni upit (ako postoji) i prikaži ga
  function renderLastRequest() {
    const saved = localStorage.getItem("sapica_last_request");

    if (!saved) return; // ako nema ništa, ostavi default tekst

    const data = JSON.parse(saved);

    lastRequestBox.innerHTML = `
      <h2>Zadnji spremljeni upit</h2>
      <p><strong>Ime:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Vrsta upita:</strong> ${data.type}</p>
      <p><strong>Poruka:</strong> ${data.message}</p>
      <p class="muted"><small>Spremljeno: ${data.savedAt}</small></p>
    `;
  }

  renderLastRequest();

  // 5) Što se dogodi kad korisnik klikne “Pošalji upit”
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // sprječava refresh stranice

    // Trim = makni razmake na početku/kraju
    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const typeValue = type.value;
    const messageValue = message.value.trim();

    // VALIDACIJA (pravila po tvojoj potrebi)
    if (nameValue.length < 3) {
      showMessage("Unesi ime i prezime (barem 3 znaka).", false);
      return;
    }

    if (!isValidEmail(emailValue)) {
      showMessage("Unesi ispravan email (npr. ana@email.com).", false);
      return;
    }

    if (typeValue === "") {
      showMessage("Odaberi vrstu upita.", false);
      return;
    }

    if (messageValue.length < 10) {
      showMessage("Poruka je prekratka (barem 10 znakova).", false);
      return;
    }

    // Ako je sve OK, spremi u localStorage
    const dataToSave = {
      fullName: nameValue,
      email: emailValue,
      type: typeValue,
      message: messageValue,
      savedAt: new Date().toLocaleString("hr-HR")
    };

    localStorage.setItem("sapica_last_request", JSON.stringify(dataToSave));

    showMessage("✅ Upit je uspješno spremljen u localStorage!", true);

    // Očisti formu
    form.reset();

    // Osvježi prikaz zadnjeg upita
    renderLastRequest();
  });
});
