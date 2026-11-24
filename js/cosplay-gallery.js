(() => {
  "use strict";
  const owner = "KnigaMichail";
  const repository = "my-bysness-card";
  const branch = "main";
  const folder = "img/cosplay";
  const containerId = "cosplay-archive";
  const api = `https://api.github.com/repos/${owner}/${repository}/contents/${folder}?ref=${branch}`;
  const extensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

  function status(container, message) {
    const node = document.createElement("p");
    node.className = "archive-status";
    node.textContent = message;
    container.replaceChildren(node);
  }
  function titleFromName(name) {
    return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
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
    status(container, "ЗАГРУЗКА АРХИВА…");
    try {
      const response = await fetch(api, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) {
        if (response.status === 404) throw new Error("Папка img/cosplay/ не найдена. Проверь, что она добавлена в репозиторий.");
        if (response.status === 403) throw new Error("GitHub временно ограничил запросы. Обнови страницу чуть позже.");
        throw new Error("Не удалось загрузить архив (HTTP " + response.status + ").");
      }
      const files = await response.json();
      if (!Array.isArray(files)) throw new Error("GitHub вернул неожиданный ответ.");
      const images = files.filter(file => file.type === "file" && extensions.some(ext => file.name.toLowerCase().endsWith(ext)))
        .sort((a,b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
      if (!images.length) {
        status(container, "АРХИВ ПОКА ПУСТ. Добавь фотографии в папку img/cosplay/.");
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
        image.src = file.download_url;
        image.alt = title;
        image.loading = "lazy";
        image.decoding = "async";
        const caption = document.createElement("span");
        caption.className = "cosplay-gallery__caption";
        caption.textContent = title || "COSPLAY ARCHIVE";
        button.append(image, caption);
        button.addEventListener("click", () => openImage(file.download_url, title));
        grid.append(button);
      });
      container.replaceChildren(grid);
    } catch (error) {
      console.error("[COSPLAY ARCHIVE]", error);
      status(container, error.message || "Не удалось загрузить фотографии.");
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();