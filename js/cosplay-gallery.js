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

  const photoDetails = {
    "photo_2026-11-24_09-48-46.jpg": {
      title: { ru: "Деревня Дураков", en: "Village of Fools" },
      event: { ru: "Kitsune-Con · 03.05", en: "Kitsune-Con · 03 May" },
      year: "2025"
    },
    "photo_2026-11-24_09-49-12.jpg": {
      title: { ru: "Ночь Музыки", en: "Night of Music" },
      event: { ru: "UralMusicNight", en: "Ural Music Night" },
      year: "2025"
    },
    "photo_2026-11-24_09-49-18.jpg": {
      title: { ru: "Darth Vindican", en: "Darth Vindican" },
      event: { ru: "Фотосет", en: "Photo shoot" },
      year: null
    },
    "photo_2026-11-24_09-49-44.jpg": {
      title: { ru: "Астерикс и Обеликс", en: "Asterix and Obelix" },
      event: { ru: "Kitsune-Con · 04.10", en: "Kitsune-Con · 04 Oct" },
      year: "2025"
    },
    "photo_2026-11-24_09-49-59.jpg": {
      title: { ru: "Кот в Сапогах", en: "Puss in Boots" },
      event: { ru: "Kitsune-Con · 31.10", en: "Kitsune-Con · 31 Oct" },
      year: "2026"
    },
    "photo_2026-11-24_09-52-17.jpg": {
      title: { ru: "Darth Nihilus", en: "Darth Nihilus" },
      event: { ru: "Kanico · 02.05", en: "Kanico · 02 May" },
      year: "2026"
    }
  };

  function localized(value, language, fallback = "—") {
    if (value && typeof value === "object") {
      return value[language] || value.ru || fallback;
    }
    return value || fallback;
  }

  function titleFromName(name) {
    return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
  }

  function createMetaLine(label, value) {
    const line = document.createElement("span");
    line.className = "cosplay-gallery__meta";
    const labelNode = document.createElement("span");
    labelNode.className = "cosplay-gallery__meta-label";
    labelNode.textContent = label;
    const valueNode = document.createElement("strong");
    valueNode.className = "cosplay-gallery__meta-value";
    valueNode.textContent = value;
    line.append(labelNode, valueNode);
    return line;
  }

  function updateGalleryLanguage() {
    const language = document.documentElement.lang === "en" ? "en" : "ru";
    document.querySelectorAll(".cosplay-gallery__item").forEach((button) => {
      const details = photoDetails[button.dataset.filename];
      if (!details) return;
      const caption = button.querySelector(".cosplay-gallery__caption");
      if (!caption) return;
      const title = localized(details.title, language, titleFromName(button.dataset.filename));
      caption.querySelector(".cosplay-gallery__caption-title").textContent = title;
      const labels = language === "en"
        ? ["Character", "Event", "Year"]
        : ["Образ", "Мероприятие", "Год"];
      const rows = caption.querySelectorAll(".cosplay-gallery__meta-label");
      rows.forEach((row, index) => { row.textContent = labels[index]; });
      const values = caption.querySelectorAll(".cosplay-gallery__meta-value");
      values[0].textContent = title;
      values[1].textContent = localized(details.event, language);
      values[2].textContent = details.year || (language === "en" ? "Not specified" : "Не указан");
    });
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
        const details = photoDetails[file.name];
        const title = details ? localized(details.title, document.documentElement.lang) : titleFromName(file.name);
        const eventName = details ? localized(details.event, document.documentElement.lang) : "—";
        const year = details?.year || (document.documentElement.lang === "en" ? "Not specified" : "Не указан");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "cosplay-gallery__item";
        button.dataset.filename = file.name;
        button.setAttribute("aria-label", "Open photo: " + title);

        const image = document.createElement("img");
        image.src = file.url;
        image.alt = title;
        image.loading = "lazy";
        image.decoding = "async";

        const caption = document.createElement("span");
        caption.className = "cosplay-gallery__caption";
        const captionTitle = document.createElement("strong");
        captionTitle.className = "cosplay-gallery__caption-title";
        captionTitle.textContent = title;
        caption.append(
          captionTitle,
          createMetaLine(document.documentElement.lang === "en" ? "Character" : "Образ", title),
          createMetaLine(document.documentElement.lang === "en" ? "Event" : "Мероприятие", eventName),
          createMetaLine(document.documentElement.lang === "en" ? "Year" : "Год", year)
        );
        button.append(image, caption);
        button.addEventListener("click", () => openImage(file.url, title));
        grid.append(button);
      });

      container.replaceChildren(grid);
      updateGalleryLanguage();
    } catch (error) {
      console.error("[COSPLAY ARCHIVE]", error);
      showStatus(container, "НЕ УДАЛОСЬ ЗАГРУЗИТЬ АРХИВ. ПОПРОБУЙ ОБНОВИТЬ СТРАНИЦУ ПОЗЖЕ.");
    }
  }

  document.addEventListener("site-language-change", updateGalleryLanguage);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
