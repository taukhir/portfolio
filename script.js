const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const dialog = document.querySelector(".diagram-dialog");
const architectureButton = document.querySelector(".architecture-button");
const closeDialogButton = document.querySelector(".dialog-close");
const appearancePicker = document.querySelector(".appearance-picker");
const appearanceToggle = document.querySelector(".appearance-toggle");
const appearanceMenu = document.querySelector(".appearance-menu");
const themeOptions = [...document.querySelectorAll("[data-theme-option]")];
const fontOptions = [...document.querySelectorAll("[data-font-option]")];
const metricValues = [...document.querySelectorAll("[data-count]")];
const engineeringTabs = [...document.querySelectorAll("[data-engineering-mode]")];
const copyEmailButton = document.querySelector("[data-copy-email]");
const copyStatus = document.querySelector(".copy-status");

const themes = {
  ember: { label: "Ember", browserColor: "#0b0f14" },
  arctic: { label: "Arctic", browserColor: "#071419" },
  cobalt: { label: "Cobalt", browserColor: "#0c1020" },
  terminal: { label: "Terminal", browserColor: "#07110c" }
};

const fonts = {
  modern: "Modern",
  humanist: "Humanist",
  editorial: "Editorial"
};

const engineeringModes = {
  design: {
    kicker: "Architecture / discovery",
    title: "Make complexity visible before writing code.",
    copy: "I map business workflows, ownership boundaries, failure paths, and non-functional requirements before choosing service boundaries.",
    points: [
      "Domain and API boundary definition",
      "Trade-off and feasibility evaluation",
      "Security, scale, and failure-mode planning"
    ],
    code: `$ discover --domain commerce
✓ map business capabilities
✓ define service ownership
✓ model sync + async flows
→ architecture ready for review`
  },
  build: {
    kicker: "Implementation / evolution",
    title: "Build the simplest system that can evolve safely.",
    copy: "I keep services cohesive, contracts explicit, and delivery automated so teams can add capability without increasing operational friction.",
    points: [
      "Spring Boot services with explicit contracts",
      "Kafka workflows for decoupled processing",
      "Automated tests, reviews, and CI/CD quality gates"
    ],
    code: `$ build --service order
✓ contract tests passing
✓ kafka events versioned
✓ quality gates approved
→ artifact ready to deploy`
  },
  operate: {
    kicker: "Reliability / production",
    title: "Treat production behavior as part of the design.",
    copy: "I design for diagnosis as well as delivery, using meaningful telemetry, controlled failure handling, and secure deployment practices.",
    points: [
      "Metrics, logs, and distributed tracing",
      "Retry, compensation, and incident workflows",
      "Security remediation and production readiness"
    ],
    code: `$ observe --environment prod
✓ critical CVEs: 0
✓ service health: stable
✓ traces + metrics connected
→ system ready for traffic`
  }
};

document.querySelector("[data-year]").textContent = new Date().getFullYear();
document.querySelectorAll(".hero .reveal").forEach((element) => {
  element.classList.add("visible");
});

const closeAppearanceMenu = () => {
  appearanceMenu.hidden = true;
  appearanceToggle.setAttribute("aria-expanded", "false");
};

const applyTheme = (themeName) => {
  const selectedTheme = themes[themeName] ? themeName : "ember";
  document.documentElement.dataset.theme = selectedTheme;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", themes[selectedTheme].browserColor);
  appearanceToggle.dataset.themeLabel = themes[selectedTheme].label;

  themeOptions.forEach((option) => {
    const isActive = option.dataset.themeOption === selectedTheme;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("portfolio-theme", selectedTheme);
  } catch (error) {
    // The visual theme still works when storage is unavailable.
  }
};

applyTheme(document.documentElement.dataset.theme);

const applyFont = (fontName) => {
  const selectedFont = fonts[fontName] ? fontName : "modern";
  document.documentElement.dataset.font = selectedFont;
  appearanceToggle.dataset.fontLabel = fonts[selectedFont];

  fontOptions.forEach((option) => {
    const isActive = option.dataset.fontOption === selectedFont;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("portfolio-font", selectedFont);
  } catch (error) {
    // The typography still changes when storage is unavailable.
  }
};

applyFont(document.documentElement.dataset.font);

const updateAppearanceLabel = () => {
  appearanceToggle.setAttribute(
    "aria-label",
    `Open appearance settings. Theme: ${appearanceToggle.dataset.themeLabel}. Font: ${appearanceToggle.dataset.fontLabel}.`
  );
};

updateAppearanceLabel();

appearanceToggle.addEventListener("click", () => {
  const willOpen = appearanceMenu.hidden;
  appearanceMenu.hidden = !willOpen;
  appearanceToggle.setAttribute("aria-expanded", String(willOpen));
});

themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyTheme(option.dataset.themeOption);
    updateAppearanceLabel();
  });
});

fontOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyFont(option.dataset.fontOption);
    updateAppearanceLabel();
  });
});

document.addEventListener("click", (event) => {
  if (!appearancePicker.contains(event.target)) closeAppearanceMenu();
});

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  closeAppearanceMenu();
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    closeAppearanceMenu();
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  metricValues.forEach((value) => {
    value.textContent = "0";
  });

  const metricObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        const value = card.querySelector("[data-count]");
        const target = Number(value.dataset.count);
        const duration = 1050;
        const startTime = performance.now();

        const animateCount = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          value.textContent = String(Math.round(target * easedProgress));

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };

        card.classList.add("metric-animated");
        requestAnimationFrame(animateCount);
        metricObserver.unobserve(card);
      });
    },
    { threshold: 0.45 }
  );

  document.querySelectorAll(".metric-card").forEach((card) => metricObserver.observe(card));
} else {
  document.querySelectorAll(".metric-card").forEach((card) => card.classList.add("metric-animated"));
}

const renderEngineeringMode = (modeName) => {
  const mode = engineeringModes[modeName];
  if (!mode) return;

  document.querySelector("[data-mode-kicker]").textContent = mode.kicker;
  document.querySelector("[data-mode-title]").textContent = mode.title;
  document.querySelector("[data-mode-copy]").textContent = mode.copy;
  document.querySelector("[data-mode-code]").textContent = mode.code;

  const points = document.querySelector("[data-mode-points]");
  points.replaceChildren(...mode.points.map((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    return item;
  }));

  engineeringTabs.forEach((tab) => {
    const isActive = tab.dataset.engineeringMode === modeName;
    tab.setAttribute("aria-selected", String(isActive));
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  document.querySelector(".playbook-panel").setAttribute(
    "aria-labelledby",
    engineeringTabs.find((tab) => tab.dataset.engineeringMode === modeName).id
  );
};

engineeringTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => renderEngineeringMode(tab.dataset.engineeringMode));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
    const nextTab = engineeringTabs[(index + direction + engineeringTabs.length) % engineeringTabs.length];
    nextTab.focus();
    renderEngineeringMode(nextTab.dataset.engineeringMode);
  });
});

copyEmailButton.addEventListener("click", async () => {
  const email = "ahmedtaukhir@gmail.com";

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    copyStatus.textContent = "Copied";
  } catch (error) {
    copyStatus.textContent = "Use email above";
  }

  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 2200);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("pending");
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal:not(.visible)").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  if (element.getBoundingClientRect().top > window.innerHeight * 0.9) {
    element.classList.add("pending");
    revealObserver.observe(element);
  } else {
    element.classList.add("visible");
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const target = link.getAttribute("href");
        link.classList.toggle("active", target === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

architectureButton.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !appearanceMenu.hidden) {
    closeAppearanceMenu();
    appearanceToggle.focus();
  }

  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});
