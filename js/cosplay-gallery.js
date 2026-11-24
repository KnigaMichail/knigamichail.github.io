(() => {
  "use strict";
  const manifestUrl = "./img/cosplay/manifest.json";
  const containerId = "cosplay-archive";
  const extensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

  function showStatus(container, message) {
    const node = document.createElement("p");
    node.className = "archive-status";
    node.textContent = message;
    container.replaceChildren(node);
  }

  function titleFromName(name) {
    return name.replace(/\\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
  }

  function makeLightbox() {
    const overlay = document.createElement("div");
    overlay.className = "cosplay-gallery-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    const image = document.createElement("img");
    const close = document.createElement("button");
    close.type = "button";
    close.className = "cosplay-gallery-lightbox__close";
    close.textContent = "×";
    close.setAttribute("aria-label", "Close");

    const hide = () => {
      overlay.classList.remove("is-open");
      image.removeAttribute("src");
      document.body.style.overflow = "";
    };
    close.addEventListener("click", hide);
    overlay.addEventListener("click", event => { if (event.target === overlay) hide(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") hide(); });
    overlay.append(image, close);
    document.body.appendChild(overlay);

    return (src, alt) => {
      image.src = src;
      image.alt = alt;
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      close.focus();
    };
  }

  async function init() {
    const container = document.getElementById(containerId);
    if (!container) return;

    showStatus(container, "ЗАГРУЗКА АРХИВА…");
    try {
      const response = await fetch(manifestUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const manifest = await response.json();
      const entries = Array.isArray(manifest) ? manifest : manifest.images;
      if (!Array.isArray(entries)) throw new Error("Invalid archive manifest");

      const images = entries
        .filter(item => item && typeof item.name === "string" && typeof item.url === "string")
        .filter(item => extensions.some(ext => item.name.toLowerCase().endsWith(ext)))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));

      if (!images.length) {
        showStatus(container, "АРХИВ ПОКА ПУСТ.");
        return;
      }

      const grid = document.createElement("div");
      grid.className = "cosplay-gallery__grid";
      const openImage = makeLightbox();

      images.forEach(file => {
        const title = titleFromName(file.name);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "cosplay-gallery__item";
        button.setAttribute("aria-label", "Open photo: " + title);

        const image = document.createElement("img");
        image.src = file.url;
        image.alt = title;
        image.loading = "lazy";
        image.decoding = "async";

        const caption = document.createElement("span");
        caption.className = "cosplay-gallery__caption";
        caption.textContent = title || "COSPLAY ARCHIVE";
        button.append(image, caption);
        button.addEventListener("click", () => openImage(file.url, title));
        grid.append(button);
      });

      container.replaceChildren(grid);
    } catch (error) {
      console.error("[COSPLAY ARCHIVE]", error);
      showStatus(container, "НЕ УДАЛОСЬ ЗАГРУЗИТЬ АРХИВ. ПОПРОБУЙ ОБНОВИТЬ СТРАНИЦУ ПОЗЖЕ.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
