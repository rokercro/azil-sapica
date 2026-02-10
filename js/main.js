/*
  main.js je povezan na SVE stranice (vidi <script src="js/main.js" defer> u HTML-u).

  "defer" znači: učitaj JS nakon parsiranja HTML-a
  (da elementi već postoje kad ih tražimo u JS-u).
*/

document.addEventListener("DOMContentLoaded", () => {
  // Primjer interaktivnosti: klik na brand pokaže mali alert (možeš i maknuti)
  const brand = document.querySelector(".brand");

  if (brand) {
    brand.addEventListener("click", () => {
      // Ovo je samo demonstracija da JS radi na svakoj stranici
      alert("Dobrodošao/la u Azil Šapica!");
    });
  }
});

//local storage clear

document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearStorageBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("sapica_last_request");
      alert("Podaci iz localStorage obrisani.");
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Tražimo slideshow samo na stranici gdje postoji
  const root = document.getElementById("homeSlideshow");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll(".slide"));
  const btnNext = root.querySelector(".slide-btn.next");
  const btnPrev = root.querySelector(".slide-btn.prev");

  // Ako nešto fali, nema smisla nastavljati
  if (!slides.length || !btnNext || !btnPrev) return;

  let current = slides.findIndex(s => s.classList.contains("is-active"));
  if (current === -1) (current = 0);

  function show(index){
    slides.forEach(s => s.classList.remove("is-active"));
    slides[index].classList.add("is-active");
  }

  btnNext.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    show(current);
  });

  btnPrev.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    show(current);
  });

  // Automatski prelazak svake 4 sekunde
  setInterval(() => {
    current = (current + 1) % slides.length;
    show(current);
  }, 4000);
});



