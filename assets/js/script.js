/*
=========================================================
RF FILTERS WEBSITE
Main JavaScript
Version 1.0
=========================================================
*/
// import filters from "../products.json";
// const liste = filters;
// const response = await fetch("../products.json");
// const filters = await response.json();
import filters from "../../products.json" with { type: "json" };
const grilleHTML = document.querySelector(".grid-product");
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling();
  initStickyHeader();
  initFadeAnimations();
  initDarkMode();
  initAnimatedCounters();
  initProductSearch();
  afficherListe(filters);
});

function afficherListe(filters) {
  filters.forEach((element) => {
    const elementActuel = element;
    if(grilleHTML) injecterElement(elementActuel);
  });
}

function injecterElement(filters) {
  //   const image = infos.images[0] === undefined ? "" : infos.images[0].url;
  let gabarit = `
          <div class="card product-card">
            <img
              src="${filters.image}"
              style="width: 100%; border-radius: 10px; margin-bottom: 20px"
            />
            <h3>${filters.partNumber}</h3>
            <table>
              <tr>
                <td>Type</td>
                <td>${filters.type}</td>
              </tr>
              <tr>
                <td>Frequency</td>
                <td>${filters.centerFrequency}</td>
              </tr>
              <tr>
                <td>Bandwidth</td>
                <td>${filters.bandwidth}</td>
              </tr>
              <tr>
                <td>Insertion Loss</td>
                <td>${filters.insertionLoss}</td>
              </tr>
              <tr>
                <td>Return Loss</td>
                <td>${filters.returnLoss}</td>
              </tr>
              <tr>
                <td>Power</td>
                <td>${filters.power}</td>
              </tr>
              <tr>
                <td>Connector</td>
                <td>${filters.connector}</td>
              </tr>
            </table>
            <br />
            <a class="btn" href="${filters.datasheet}"> Datasheet </a>
          </div>
      `;
  grilleHTML.insertAdjacentHTML("beforeend", gabarit);
}

/* =====================================================
   Smooth Scrolling
===================================================== */

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

/* =====================================================
   Sticky Header Shadow
===================================================== */

function initStickyHeader() {
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";
    } else {
      header.style.boxShadow = "0 3px 12px rgba(0,0,0,.05)";
    }
  });
}

/* =====================================================
   Fade In Animation
===================================================== */

function initFadeAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  document.querySelectorAll(".card,.feature,section h2").forEach((el) => {
    el.classList.add("fade-in");

    observer.observe(el);
  });
}

/* =====================================================
   Dark Mode
===================================================== */

function initDarkMode() {
  const button = document.createElement("button");

  button.innerHTML = "🌙";

  button.id = "themeButton";

  Object.assign(button.style, {
    position: "fixed",
    right: "25px",
    bottom: "25px",
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    border: "none",
    background: "#0D6EFD",
    color: "#fff",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: "0 8px 18px rgba(0,0,0,.2)",
    zIndex: 9999,
  });

  document.body.appendChild(button);

  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
    enableDarkMode();
  }

  button.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
}

function enableDarkMode() {
  document.body.classList.add("dark");

  localStorage.setItem("theme", "dark");

  document.documentElement.style.setProperty("--background", "#111827");
  document.documentElement.style.setProperty("--surface", "#1F2937");
  document.documentElement.style.setProperty("--text", "#F3F4F6");
  document.documentElement.style.setProperty("--textLight", "#C7CBD1");
  document.documentElement.style.setProperty("--border", "#374151");

  document.querySelectorAll(".card,.feature").forEach((card) => {
    card.style.background = "#1F2937";
  });

  document.querySelector("header").style.background = "#111827";
}

function disableDarkMode() {
  document.body.classList.remove("dark");

  localStorage.setItem("theme", "light");

  document.documentElement.style.setProperty("--background", "#F4F7FA");
  document.documentElement.style.setProperty("--surface", "#FFFFFF");
  document.documentElement.style.setProperty("--text", "#222");
  document.documentElement.style.setProperty("--textLight", "#666");
  document.documentElement.style.setProperty("--border", "#E5E7EB");

  document.querySelectorAll(".card,.feature").forEach((card) => {
    card.style.background = "#FFFFFF";
  });

  document.querySelector("header").style.background = "#FFFFFF";
}

/* =====================================================
   Animated Statistics
===================================================== */

function initAnimatedCounters() {
  const counters = document.querySelectorAll("[data-counter]");

  counters.forEach((counter) => {
    let target = parseInt(counter.dataset.counter);

    let value = 0;

    let speed = target / 100;

    function update() {
      value += speed;

      if (value < target) {
        counter.innerText = Math.round(value);

        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        update();

        observer.disconnect();
      }
    });

    observer.observe(counter);
  });
}

/* =====================================================
   Product Search
===================================================== */

function initProductSearch() {
  const input = document.getElementById("productSearch");

  if (!input) return;

  input.addEventListener("keyup", () => {
    const search = input.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach((card) => {
      const text = card.innerText.toLowerCase();

      card.style.display = text.includes(search) ? "block" : "none";
    });
  });
}

/* =====================================================
   Utility
===================================================== */

function showNotification(message) {
  const note = document.createElement("div");

  note.innerText = message;

  Object.assign(note.style, {
    position: "fixed",
    top: "30px",
    right: "30px",
    background: "#0D6EFD",
    color: "#fff",
    padding: "15px 25px",
    borderRadius: "8px",
    boxShadow: "0 8px 18px rgba(0,0,0,.2)",
    zIndex: 99999,
    opacity: "0",
  });

  document.body.appendChild(note);

  requestAnimationFrame(() => {
    note.style.transition = "0.3s";
    note.style.opacity = "1";
  });

  setTimeout(() => {
    note.style.opacity = "0";

    setTimeout(() => {
      note.remove();
    }, 400);
  }, 2500);
}

/* =====================================================
   Future API
===================================================== */

const RFSite = {
  version: "1.0",

  notify: showNotification,

  search: initProductSearch,
};

window.RFSite = RFSite;
