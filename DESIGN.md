---
name: Emrafar
description: Healthcare distribution with personal commitment
colors:
  ink: "#143547"
  muted: "#536a76"
  blue: "#1677a9"
  sky: "#eaf5fb"
  sky-strong: "#c9e8f6"
  line: "#d8e3e8"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(52px, 6.2vw, 88px)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 49px)"
    fontWeight: 500
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  control: "3px"
  image: "4px"
spacing:
  container-inset: "clamp(24px, 5vw, 80px)"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
---

## Overview
Quiet editorial composition with large statements, flat pale-blue surfaces, real laboratory photography, and open space. The logo remains the brand anchor. Copy centers on people and relationships.

## Colors
Ink carries headings and controls. Blue emphasizes a small number of words and active states. Sky defines broad sections; white keeps reading areas clear. Muted blue-gray carries supporting copy.

## Typography
Self-hosted variable Manrope. Medium-weight display type; compact semibold controls. Avoid heavy headings and tightly tracked body text. Mobile typography scales down explicitly in the stylesheet.

## Layout
1320px maximum container with fluid gutters. Two-column compositions have different proportions by section. At 760px, navigation becomes a disclosure and content stacks. At 390px, paired fields and about copy also stack. Section spacing reduces to 85px on tablet and 65px on mobile.

## Elevation & Depth
Flat surfaces and fine rules carry hierarchy. Only sticky and expanded navigation use a subtle shadow. No floating cards.

## Shapes
Small 3–4px corners, restrained 1px borders, open rows, and consistent 1.5px SVG strokes.

## Components
Product categories use native details/summary, one open at a time. Supported browsers animate intrinsic content height; others use normal disclosure behavior. Links and buttons have clear focus and hover states. Mobile navigation closes on selection, outside click, Escape, and desktop resize. Form states include pending, success, and recoverable failure; failures retain content and expose a prefilled email link. Reduced-motion preferences disable animation and smooth scrolling.

## Do's and Don'ts
Use authentic company content and existing photography. Keep the logo intact. Avoid invented statistics, generic icon-card grids, decorative gradients, floating badges, and unrelated imagery. Keep all content visible without scroll-triggered animation.
