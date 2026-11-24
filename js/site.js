(() => {
  "use strict";

  const translations = {
    ru: {
      navProfile:"ПРОФИЛЬ", navCosplay:"КОСПЛЕЙ", navVideos:"ВИДЕО", navFanFilms:"ФАН-ФИЛЬМЫ", navContact:"КОНТАКТЫ",
      heroEyebrow:"ПЕРСОНАЛЬНАЯ БАЗА ДАННЫХ // В СЕТИ",
      heroSubtitle:"Косплей. Саберфайтинг. Постановочные сцены.",
      heroDescription:"Персонажи из далёких галактик, костюмы и истории, которые оживают перед камерой.",
      heroButton:"ОТКРЫТЬ АРХИВ", heroStatus:"ПЕРЕДАЧА АКТИВНА", characterFile:"ДОСЬЕ ПЕРСОНАЖА",
      characterRole:"КОСПЛЕЕР / САБЕРФАЙТЕР", profileTitle:"Досье автора",
      profileTerminal:"КРАТКОЕ ДОСЬЕ",
      profileText:"Kraus_Bombit — автор косплей-образов и постановочных сцен. Интересуюсь вселенной Star Wars, саберфайтингом, созданием костюмов и съёмкой фанатских видео.",
      skillCosplay:"КОСПЛЕЙ И КОСТЮМЫ", skillSaber:"САБЕРФАЙТИНГ", skillFilms:"ФАН-ФИЛЬМЫ И СЦЕНА", skillGalaxy:"ВСЕЛЕННАЯ STAR WARS",
      cosplayTitle:"COSPLAY ARCHIVE", cosplayIntro:"Архив образов и перевоплощений. Новые фотографии появляются здесь автоматически.",
      archiveLoading:"ЗАГРУЗКА АРХИВА…", archiveHint:"", videosTitle:"VIDEO TERMINAL",
      videosIntro:"Записи из моей ленты TikTok.", videoOpen:"ОТКРЫТЬ В TIKTOK",
      fanFilmsTitle:"FAN FILMS", fanFilmsIntro:"Постановочные сцены и фанатские видео.", fanFilmLabel:"ИЗБРАННАЯ РАБОТА", fanFilmCaption:"Постановочный фанатский ролик",
      contactTitle:"Связь и координаты", vkCosplay:"Страница VK", vkVideo:"VK Видео", youtubeChannel:"YouTube канал", mapLink:"Где поесть",
      projectsButton:"МОИ ПРОЕКТЫ ↗", projectsEyebrow:"404 // ОБЪЕКТ НЕ ОБНАРУЖЕН", projectsTitle:"МОИ ПРОЕКТЫ",
      projectsDescription:"Здесь пока пусто. Сигнал уходит за горизонт событий.", projectsReturn:"ВЕРНУТЬСЯ В ГОЛОКРОН ↗"
    },
    en: {
      navProfile:"PROFILE", navCosplay:"COSPLAY", navVideos:"VIDEOS", navFanFilms:"FAN FILMS", navContact:"CONTACT",
      heroEyebrow:"PERSONAL CREATOR DATABASE // ONLINE",
      heroSubtitle:"Cosplay. Saberfighting. Staged scenes.",
      heroDescription:"Characters from distant galaxies, costumes and stories brought to life in front of the camera.",
      heroButton:"OPEN THE ARCHIVE", heroStatus:"TRANSMISSION ACTIVE", characterFile:"CHARACTER FILE",
      characterRole:"COSPLAYER / SABERFIGHTER", profileTitle:"Creator dossier",
      profileTerminal:"PERSONNEL RECORD",
      profileText:"Kraus_Bombit creates cosplay characters and staged scenes. Interested in the Star Wars universe, saberfighting, costume making and fan video production.",
      skillCosplay:"COSPLAY & COSTUMES", skillSaber:"SABERFIGHTING", skillFilms:"FAN FILMS & STAGE", skillGalaxy:"STAR WARS UNIVERSE",
      cosplayTitle:"COSPLAY ARCHIVE", cosplayIntro:"An archive of characters and transformations. New photos appear here automatically.",
      archiveLoading:"LOADING ARCHIVE…", archiveHint:"", videosTitle:"VIDEO TERMINAL",
      videosIntro:"Transmissions from my TikTok feed.", videoOpen:"OPEN ON TIKTOK",
      fanFilmsTitle:"FAN FILMS", fanFilmsIntro:"Fan films and staged scenes.", fanFilmLabel:"SELECTED WORK", fanFilmCaption:"Staged fan film",
      contactTitle:"Contact & coordinates", vkCosplay:"VK Page", vkVideo:"VK Video", youtubeChannel:"YouTube Channel", mapLink:"Food map",
      projectsButton:"MY PROJECTS ↗", projectsEyebrow:"404 // OBJECT NOT FOUND", projectsTitle:"MY PROJECTS",
      projectsDescription:"Nothing here yet. The signal is fading beyond the event horizon.", projectsReturn:"RETURN TO HOLOCRON ↗"
    }
  };

  let language = "ru";
  const switcher = document.getElementById("languageSwitch");

  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const translated = translations[language][key];
      if (typeof translated !== "string") return;

      if (key === "heroButton") {
        const arrow = element.querySelector("span");
        element.textContent = translated + " ";
        if (arrow) {
          arrow.textContent = "↘";
          element.appendChild(arrow);
        }
      } else {
        element.textContent = translated;
      }

      if (element.classList.contains("signal-label")) {
        element.dataset.text = translated;
      }
    });

    if (switcher) {
      switcher.textContent = language === "ru" ? "RU / EN" : "EN / RU";
      switcher.setAttribute("aria-label", language === "ru" ? "Switch to English" : "Переключить на русский");
    }
    document.dispatchEvent(new CustomEvent("site-language-change", { detail: { language } }));
  }

  if (switcher) {
    switcher.addEventListener("click", () => {
      language = language === "ru" ? "en" : "ru";
      applyLanguage();
    });
  }
  applyLanguage();
})();
