(() => {
  const STORAGE_KEY = "site-language";
  const DEFAULT_LANG = "pt";
  const SUPPORTED_LANGS = ["pt", "en"];

  const translations = {
    pt: {
      currentLabel: "Português",
      currentFlag: "",
      toggleAria: "Abrir seleção de idioma",
      pageTitles: {
        index: "Página Principal - Formas CSS",
        carro: "Carro Esportivo com Formas Geométricas",
        grafico: "Gráfico de Barras CSS Animado",
        music: "Interface de Música com Animação CSS",
        padrao: "Padrão Decorativo CSS - Fundo Base Destacado",
        robo: "Robô Futurista",
      },
      index: {
        headerTitle: "Formas com CSS",
        headerDesc: "Explore uma coleção de designs feitos puramente com CSS, demonstrando as mais diversas possibilidades visuais!",
        cards: {
          car: { title: "Carro", desc: "Design minimalista de um veículo criado somente com CSS, utilizando propriedades de transformação e gradientes." },
          robot: { title: "Robô", desc: "Composição de um robô com elementos geométricos e detalhes criados através de pseudo-elementos e box-shadows." },
          player: { title: "Player", desc: "Interface de player de música estilizada com CSS moderno, incluindo controles e indicadores visuais." },
          chart: { title: "Gráfico", desc: "Visualização de dados em formato de barras animadas, implementada sem JavaScript." },
          pattern: { title: "Padrão Decorativo", desc: "Composição complexa utilizando gradientes, padrões de fundo e polígonos CSS para criar texturas visuais." },
        },
      },
      chart: {
        legend: {
          grossRevenue: "Receita Bruta",
          netRevenue: "Receita Líquida",
          sales: "Vendas",
          expenses: "Despesas",
          clients: "Clientes",
          profit: "Lucro",
        },
      },
      music: {
        controls: {
          previous: "Anterior",
          playPause: "Play/Pause",
          next: "Próxima",
        },
        playlist: {
          title: "Playlist",
          m1: "Música 1 - Artista A",
          m2: "Música 2 - Artista B",
          m3: "Música 3 - Artista C",
          m4: "Música 4 - Artista D",
        },
      },
    },
    en: {
      currentLabel: "English",
      currentFlag: "",
      toggleAria: "Open language selection",
      pageTitles: {
        index: "Home Page - CSS Shapes",
        carro: "Sports Car with Geometric Shapes",
        grafico: "Animated CSS Bar Chart",
        music: "Music Interface with CSS Animation",
        padrao: "Decorative CSS Pattern - Highlighted Base Background",
        robo: "Futuristic Robot",
      },
      index: {
        headerTitle: "Shapes with CSS",
        headerDesc: "Explore a collection of designs made purely with CSS, showcasing a wide range of visual possibilities!",
        cards: {
          car: { title: "Car", desc: "Minimalist vehicle design created only with CSS, using transform properties and gradients." },
          robot: { title: "Robot", desc: "Robot composition with geometric elements and details created through pseudo-elements and box-shadows." },
          player: { title: "Player", desc: "Stylized music player interface with modern CSS, including controls and visual indicators." },
          chart: { title: "Chart", desc: "Data visualization in animated bar format, implemented without JavaScript." },
          pattern: { title: "Decorative Pattern", desc: "Complex composition using gradients, background patterns, and CSS polygons to create visual textures." },
        },
      },
      chart: {
        legend: {
          grossRevenue: "Gross Revenue",
          netRevenue: "Net Revenue",
          sales: "Sales",
          expenses: "Expenses",
          clients: "Clients",
          profit: "Profit",
        },
      },
      music: {
        controls: {
          previous: "Previous",
          playPause: "Play/Pause",
          next: "Next",
        },
        playlist: {
          title: "Playlist",
          m1: "Song 1 - Artist A",
          m2: "Song 2 - Artist B",
          m3: "Song 3 - Artist C",
          m4: "Song 4 - Artist D",
        },
      },
    },
  };

  function getPageKey() {
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith("index.html") || path.endsWith("/formascss/")) return "index";
    if (path.includes("carro")) return "carro";
    if (path.includes("grafico")) return "grafico";
    if (path.includes("music")) return "music";
    if (path.includes("padrao")) return "padrao";
    if (path.includes("rob")) return "robo";
    return "index";
  }

  function applyLanguage(lang) {
    const t = translations[lang] || translations[DEFAULT_LANG];
    const pageKey = getPageKey();
    document.documentElement.lang = lang === "pt" ? "pt-br" : "en";
    document.title = t.pageTitles[pageKey] || t.pageTitles.index;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const keyPath = el.getAttribute("data-i18n");
      const value = keyPath.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), t);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const [keyPath, attr] = el.getAttribute("data-i18n-attr").split(":");
      const value = keyPath.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), t);
      if (typeof value === "string" && attr) el.setAttribute(attr, value);
    });

    const currentFlag = document.getElementById("language-current-flag");
    const currentLabel = document.getElementById("language-current-label");
    if (currentFlag) currentFlag.textContent = t.currentFlag;
    if (currentLabel) currentLabel.textContent = t.currentLabel;
  }

  function getInitialLanguage() {
    const persisted = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(persisted) ? persisted : DEFAULT_LANG;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const switcher = document.querySelector(".language-switcher");
    const menuToggle = document.getElementById("language-menu-toggle");
    const altOption = document.getElementById("language-alt-option");
    const altFlag = document.getElementById("language-alt-flag");
    const altLabel = document.getElementById("language-alt-label");
    if (!switcher || !menuToggle || !altOption || !altFlag || !altLabel) return;

    function closeMenu() {
      switcher.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    function updateMenu(lang) {
      const altLang = lang === "pt" ? "en" : "pt";
      const current = translations[lang];
      const alt = translations[altLang];
      menuToggle.setAttribute("aria-label", current.toggleAria);
      altFlag.textContent = alt.currentFlag;
      altLabel.textContent = alt.currentLabel;
      altOption.dataset.lang = altLang;
    }

    const initialLang = getInitialLanguage();
    applyLanguage(initialLang);
    updateMenu(initialLang);

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = switcher.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    altOption.addEventListener("click", () => {
      const selected = altOption.dataset.lang;
      if (!SUPPORTED_LANGS.includes(selected)) return;
      localStorage.setItem(STORAGE_KEY, selected);
      applyLanguage(selected);
      updateMenu(selected);
      closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!switcher.contains(event.target)) closeMenu();
    });
  });
})();
