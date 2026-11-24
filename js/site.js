(() => {
  const translations = {
    ru: {
      navProfile:"ПРОФИЛЬ",navCosplay:"КОСПЛЕЙ",navVideos:"ВИДЕО",navContact:"КОНТАКТЫ",
      heroEyebrow:"ПЕРСОНАЛЬНАЯ БАЗА ДАННЫХ // В СЕТИ",
      heroSubtitle:"Косплей. Саберфайтинг. Постановочные сцены.",
      heroDescription:"Персонажи из далёких галактик, костюмы и истории, которые оживают перед камерой.",
      heroButton:"ОТКРЫТЬ АРХИВ",heroStatus:"ПЕРЕДАЧА АКТИВНА",characterFile:"ДОСЬЕ ПЕРСОНАЖА",
      characterRole:"КОСПЛЕЕР / САБЕРФАЙТЕР",profileTitle:"Профиль персонажа",
      profileTerminal:"КРАТКОЕ ДОСЬЕ",
      profileText:"Kraus_Bombit — автор косплей-образов и постановочных сцен. Интересуюсь вселенной Star Wars, саберфайтингом, созданием костюмов и съёмкой фанатских видео.",
      skillCosplay:"КОСПЛЕЙ И КОСТЮМЫ",skillSaber:"САБЕРФАЙТИНГ",skillFilms:"ФАН-ФИЛЬМЫ И СЦЕНА",skillGalaxy:"ВСЕЛЕННАЯ STAR WARS",
      cosplayTitle:"COSPLAY ARCHIVE",cosplayIntro:"Архив образов и перевоплощений. Новые фотографии появляются здесь автоматически.",
      archiveLoading:"ЗАГРУЗКА АРХИВА…",archiveHint:"Добавляй фотографии в папку img/cosplay/ в репозитории GitHub.",
      videosTitle:"VIDEO TERMINAL",videosIntro:"Записи из моей ленты TikTok.",videoOpen:"ОТКРЫТЬ В TIKTOK",
      contactTitle:"Связь и координаты",vkCosplay:"Косплей",vkVideo:"Канал",mapLink:"Где поесть",vkButton:"СТРАНИЦА VK"
    },
    en: {
      navProfile:"PROFILE",navCosplay:"COSPLAY",navVideos:"VIDEOS",navContact:"CONTACT",
      heroEyebrow:"PERSONAL CREATOR DATABASE // ONLINE",
      heroSubtitle:"Cosplay. Saberfighting. Staged scenes.",
      heroDescription:"Characters from distant galaxies, costumes and stories brought to life in front of the camera.",
      heroButton:"OPEN THE ARCHIVE",heroStatus:"TRANSMISSION ACTIVE",characterFile:"CHARACTER FILE",
      characterRole:"COSPLAYER / SABERFIGHTER",profileTitle:"Character profile",
      profileTerminal:"PERSONNEL RECORD",
      profileText:"Kraus_Bombit creates cosplay characters and staged scenes. Interested in the Star Wars universe, saberfighting, costume making and fan video production.",
      skillCosplay:"COSPLAY & COSTUMES",skillSaber:"SABERFIGHTING",skillFilms:"FAN FILMS & STAGE",skillGalaxy:"STAR WARS UNIVERSE",
      cosplayTitle:"COSPLAY ARCHIVE",cosplayIntro:"An archive of characters and transformations. New photos appear here automatically.",
      archiveLoading:"LOADING ARCHIVE…",archiveHint:"Add photos to the img/cosplay/ folder in the GitHub repository.",
      videosTitle:"VIDEO TERMINAL",videosIntro:"Transmissions from my TikTok feed.",videoOpen:"OPEN ON TIKTOK",
      contactTitle:"Contact & coordinates",vkCosplay:"Cosplay",vkVideo:"Channel",mapLink:"Food map",vkButton:"VK PROFILE"
    }
  };
  let language = "ru";
  const switcher = document.getElementById("languageSwitch");
  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (translations[language][key]) element.textContent = translations[language][key];
    });
    switcher.textContent = language === "ru" ? "RU / EN" : "EN / RU";
    switcher.setAttribute("aria-label", language === "ru" ? "Switch to English" : "Переключить на русский");
  }
  switcher.addEventListener("click", () => {
    language = language === "ru" ? "en" : "ru";
    applyLanguage();
  });
  applyLanguage();
})();