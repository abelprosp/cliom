(() => {
  const header = document.getElementById("header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const closeNav = document.querySelector(".close-nav");
  const year = document.getElementById("year");
  const form = document.getElementById("orcamento-form");
  const WHATSAPP = "5551997924611";

  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const openMenu = (open) => {
    if (!mobileNav) return;
    mobileNav.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle?.addEventListener("click", () => openMenu(true));
  closeNav?.addEventListener("click", () => openMenu(false));
  mobileNav?.addEventListener("click", (event) => {
    if (event.target === mobileNav) openMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") openMenu(false);
  });

  const items = document.querySelectorAll("[data-reveal]");
  const show = (el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      el.classList.add("is-visible");
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => {
      show(el);
      if (!el.classList.contains("is-visible")) observer.observe(el);
    });
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const texto = [
      "Olá, Cliom. Quero uma visita técnica.",
      `Nome: ${data.get("nome") || ""}`,
      `Telefone: ${data.get("telefone") || ""}`,
      `Cidade: ${data.get("cidade") || ""}`,
      `O que precisa: ${data.get("servico") || ""}`,
      `Ambiente: ${data.get("mensagem") || ""}`,
      "Posso mandar foto do ambiente nesta conversa.",
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank");
  });
})();
