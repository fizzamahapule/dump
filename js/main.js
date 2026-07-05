// ---------- shared behaviour across every page ----------

// nicknames used throughout the site — edit this list any time
const NICKNAMES = ["Pumpkin", "Peach", "Sugarplum", "Bubu", "Sweetums","Dumpling"];

function spawnHearts(container, count = 14) {
  if (!container) return;
  const symbols = ["🍑", "🎃", "💜", "🧁", "💗"];
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    h.style.left = Math.random() * 100 + "%";
    h.style.animationDuration = 9 + Math.random() * 10 + "s";
    h.style.animationDelay = Math.random() * 10 + "s";
    h.style.fontSize = 1 + Math.random() * 1.4 + "rem";
    container.appendChild(h);
  }
}

function rotateNicknames(el, intervalMs = 1800) {
  if (!el) return;
  let i = 0;
  el.textContent = NICKNAMES[0];
  setInterval(() => {
    el.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % NICKNAMES.length;
      el.textContent = NICKNAMES[i];
      el.style.opacity = 1;
    }, 350);
  }, intervalMs);
}

function highlightNav() {
  const current = document.body.dataset.page;
  document.querySelectorAll(".orchard-nav a").forEach((a) => {
    if (a.dataset.page === current) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  spawnHearts(document.querySelector(".hearts-bg"));
  rotateNicknames(document.querySelector(".nickname-rotator"));
  highlightNav();
});
