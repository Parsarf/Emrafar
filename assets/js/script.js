const header = document.querySelector("[data-header]");
const headerInner = document.querySelector(".site-header__inner");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-site-nav]");
const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
const revealItems = [...document.querySelectorAll(".reveal")];
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const submitButton = document.querySelector("[data-submit-button]");
const yearNode = document.querySelector("[data-year]");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuToggle && headerInner) {
  menuToggle.addEventListener("click", () => {
    const isOpen = headerInner.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      headerInner.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

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
    {
      threshold: 0.16,
      rootMargin: "0px 0px -32px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (contactForm && formStatus && submitButton) {
  const endpoint = "https://formsubmit.co/ajax/info@emrafar.com";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    formStatus.textContent = "Sending your inquiry...";
    submitButton.disabled = true;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
          _subject: `New website inquiry from ${payload.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      formStatus.textContent = "Thanks. Your inquiry has been sent.";
      contactForm.reset();
    } catch (error) {
      const subject = encodeURIComponent(`Website inquiry from ${payload.name}`);
      const body = encodeURIComponent(
        [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone || "Not provided"}`,
          "",
          "Message:",
          payload.message,
        ].join("\n")
      );

      window.location.href = `mailto:info@emrafar.com?subject=${subject}&body=${body}`;
      formStatus.textContent = "Your mail app is opening as a fallback.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
