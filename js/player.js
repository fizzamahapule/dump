/*
  Floating music player, shared on every page.

  HOW TO ADD YOUR SONGS:
  1. Drop your mp3 files inside the /music folder
     (e.g. music/track1.mp3, music/track2.mp3 ...)
  2. Rename / add entries in the PLAYLIST array below.
     "title" is just the label shown in the little player pill.
  Because of copyright, actual song files aren't included —
  you'll need to add your own (songs you've purchased/downloaded
  legally, or royalty-free love-song covers).
*/
const PLAYLIST = [
  { title: "Wanna Be Yours 🎵", src: "music/track1.mp3" },
  { title: "❤️", src: "music/track2.mp3" },
  { title: "I Miss You 💕", src: "music/track3.mp3" },
  { title: "Forever ✨", src: "music/track4.mp3" },
  { title: "Till The End 💖", src: "music/track5.mp3" },

];

(function initPlayer() {
  const audio = new Audio();
  audio.loop = true;
  audio.volume = 0.55;

  let trackIndex =
    typeof window.PAGE_TRACK === "number"
        ? window.PAGE_TRACK
        : 0;
  let wantsPlaying = sessionStorage.getItem("bb_playing") === "1";
  const savedTime = parseFloat(sessionStorage.getItem("bb_time") || "0");

  function loadTrack(i, resumeTime) {
    trackIndex = (i + PLAYLIST.length) % PLAYLIST.length;
    const t = PLAYLIST[trackIndex];
    audio.src = t.src;
    if (resumeTime) audio.currentTime = resumeTime;
    const label = document.querySelector(".player-track");
    if (label) label.textContent = t.title;
  }

  function persist() {
    sessionStorage.setItem("bb_track", trackIndex);
    sessionStorage.setItem("bb_time", audio.currentTime || 0);
    sessionStorage.setItem("bb_playing", audio.paused ? "0" : "1");
  }

  function showToast(msg) {
    const toast = document.querySelector(".music-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function tryPlay() {
    audio.play().then(() => {
      const btn = document.querySelector(".player-toggle");
      if (btn) btn.textContent = "⏸";
    }).catch(() => {
      showToast("🎵 tap the button to start our music");
    });
  }

  audio.addEventListener("timeupdate", persist);
  

  document.addEventListener("DOMContentLoaded", () => {
    const pageTrack =
    typeof window.PAGE_TRACK === "number"
        ? window.PAGE_TRACK
        : trackIndex;

loadTrack(pageTrack, 0);

    const toggleBtn = document.querySelector(".player-toggle");
    const nextBtn = document.querySelector(".player-next");

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (audio.paused) {
          tryPlay();
          wantsPlaying = true;
        } else {
          audio.pause();
          toggleBtn.textContent = "▶";
        }
        persist();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const wasPlaying = !audio.paused;
        loadTrack(trackIndex + 1, 0);
        if (wasPlaying) tryPlay();
        persist();
      });
    }

    // entry overlay button (only present on index.html)
    const entryBtn = document.querySelector(".entry-start");
    if (entryBtn) {
      entryBtn.addEventListener("click", () => {
        document.querySelector(".entry-overlay").classList.add("hide");
        wantsPlaying = true;
        tryPlay();
        persist();
      });
    } else if (wantsPlaying) {
      // returning visitor / navigated from another page — resume automatically
      tryPlay();
    }

    window.addEventListener("beforeunload", persist);
  });
})();
