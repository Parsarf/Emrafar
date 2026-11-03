# Emrafar Co.

A responsive, dependency-free website built with HTML, CSS, and JavaScript.

## Local preview

Run from this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Deploy the repository as a static site; no build step is required.

## Editing

- `index.html`: company copy, products, contact details, form.
- `assets/css/styles.css`: layout, responsive styles, motion, component states.
- `assets/js/script.js`: mobile menu, active navigation, product disclosure, inquiry submission.
- `DESIGN.md`: visual system; `PRODUCT.md`: business facts and constraints.

Manrope is self-hosted under the SIL Open Font License in `assets/fonts/OFL.txt`. Existing photographs and the Emrafar logo are retained from the original repository.

## Inquiry delivery

The site retains FormSubmit and the existing `info@emrafar.com` recipient. The recipient must activate FormSubmit if not already activated. Local checks cover validation, pending state, duplicate protection, successful provider responses, rejected responses, and network failure using mocked responses. Actual delivery has not been verified, and no test emails were sent. Without JavaScript, the form posts to FormSubmit's standard endpoint. Failed asynchronous submissions preserve the message and offer a prefilled email link.

## Verification

Checked in Chromium at 320, 390, 768, 1024, and 1440px: no horizontal overflow, headings fit, form fields fit. Mobile navigation opens and closes on selection and Escape; focus returns to the toggle on Escape. Product disclosures remain mutually exclusive. JavaScript syntax and Git whitespace checks pass.
