const header = document.querySelector("[data-header]");
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...nav.querySelectorAll("a")];
const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

function closeMenu({ restoreFocus = false } = {}) {
  nav.classList.remove("is-open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
  if (restoreFocus) menu.focus();
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  nav.classList.toggle("is-open", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
navLinks.forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true")
    closeMenu({ restoreFocus: true });
});
document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) closeMenu();
});
const desktop = window.matchMedia("(min-width: 761px)");
desktop.addEventListener("change", () => closeMenu());
let scrollPending = false;
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
  scrollPending = false;
}
updateHeader();
window.addEventListener(
  "scroll",
  () => {
    if (!scrollPending) {
      requestAnimationFrame(updateHeader);
      scrollPending = true;
    }
  },
  { passive: true },
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            if (link.hash === `#${entry.target.id}`)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      }
    },
    { rootMargin: "-15% 0px -55% 0px" },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => observer.observe(section));
}

// Only one product panel stays open, including browsers without details[name] support.
const products = [...document.querySelectorAll('details[name="products"]')];
products.forEach((panel) =>
  panel.addEventListener("toggle", () => {
    if (panel.open)
      products.forEach((other) => {
        if (other !== panel) other.open = false;
      });
  }),
);

const form = document.querySelector("[data-contact-form]");
const status = document.querySelector("[data-form-status]");
const submit = document.querySelector("[data-submit-button]");
const submitLabel = submit.querySelector("span");
const fallback = document.querySelector(".form-fallback");
let sending = false;
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;
  sending = true;
  submit.disabled = true;
  form.setAttribute("aria-busy", "true");
  submitLabel.textContent = "Sending…";
  status.textContent = "Sending your inquiry…";
  delete status.dataset.state;
  fallback.hidden = true;
  const values = Object.fromEntries(new FormData(form));
  const subject = `Emrafar inquiry from ${values.name}`;
  const body = [
    `Name: ${values.name}`,
    `Company: ${values.company || "Not provided"}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || "Not provided"}`,
    `Interest: ${values.interest}`,
    "",
    values.message,
  ].join("\n");
  fallback.href = `mailto:info@emrafar.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/info@emrafar.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...values,
          _subject: subject,
          _template: "table",
        }),
        signal: controller.signal,
      },
    );
    const result = await response.json();
    if (!response.ok || (result.success !== true && result.success !== "true"))
      throw new Error("Inquiry was not accepted");
    status.textContent =
      "Thank you. Your inquiry has been sent. Our team will reply to the email you provided.";
    status.dataset.state = "success";
    form.reset();
  } catch {
    status.textContent =
      "Your inquiry could not be sent. Please try again or email us directly using the link below. Your message is still here.";
    status.dataset.state = "error";
    fallback.hidden = false;
  } finally {
    clearTimeout(timeout);
    sending = false;
    submit.disabled = false;
    form.removeAttribute("aria-busy");
    submitLabel.textContent = "Send inquiry";
  }
});
