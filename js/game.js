document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".game-board");
  if (!board) return;

  const ICONS = ["🎃", "🍑", "🍇", "🧸", "🧁", "💜"]; // pumpkin, peach, sugarplum, bubu, sweetums, love
  let deck = [...ICONS, ...ICONS]
    .sort(() => Math.random() - 0.5)
    .map((icon, i) => ({ icon, id: i }));

  let flipped = [];
  let matched = 0;
  let moves = 0;
  let lock = false;

  const movesEl = document.querySelector(".moves-count");
  const timeEl = document.querySelector(".time-count");
  let seconds = 0;
  const timer = setInterval(() => {
    seconds++;
    if (timeEl) timeEl.textContent = seconds + "s";
  }, 1000);

  deck.forEach((cardData) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.icon = cardData.icon;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">💌</div>
        <div class="card-face card-back">${cardData.icon}</div>
      </div>`;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });

  function flipCard(card) {
    if (lock || card.classList.contains("flipped") || card.classList.contains("matched")) return;
    card.classList.add("flipped");
    flipped.push(card);

    if (flipped.length === 2) {
      moves++;
      if (movesEl) movesEl.textContent = moves;
      lock = true;
      const [a, b] = flipped;
      if (a.dataset.icon === b.dataset.icon) {
        a.classList.add("matched");
        b.classList.add("matched");
        matched++;
        flipped = [];
        lock = false;
        if (matched === ICONS.length) {
          clearInterval(timer);
          setTimeout(showWin, 500);
        }
      } else {
        setTimeout(() => {
          a.classList.remove("flipped");
          b.classList.remove("flipped");
          flipped = [];
          lock = false;
        }, 800);
      }
    }
  }

  function showWin() {
    const modal = document.querySelector(".win-modal");
    const summary = document.querySelector(".win-summary");
    if (summary) summary.textContent = `You matched every pair in ${moves} moves and ${seconds}s 💕`;
    if (modal) modal.classList.add("show");
  }
});
