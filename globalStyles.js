import { ThemeProvider, createGlobalStyle } from "styled-components"

const FONT_STACK = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Open Sans",
  "Helvetica Neue",
  "sans-serif",
].join(", ")

export const GlobalStyles = createGlobalStyle`
:root {
  --white: #ffffff;
  --offWhite: #f0f8f7;
  --yellow: #fec31d;
  --purple: #6a3793;
  --ghostGreen: #e3f2f1;
  --grayGreen: #8d9d9c;
  --brightGreen: #1fffd7;
  --vibrantGreen: #14c9c5;
  --flatGreen: #46aba9;
  --lightBrandGreen: #26aeab;
  --brandGreen: rgba(18, 147, 144, 1);
  --brandGreen75: rgba(18, 147, 144, 0.75);
  --brandGreen50: rgba(18, 147, 144, 0.50);
  --brandGreen25: rgba(18, 147, 144, 0.25);
  --brandGreen10: rgba(18, 147, 144, 0.10);
  --darkBrandGreen: #446263;
  --darkGreen: rgba(2, 56, 58, 1);
  --darkGreen75: rgba(2, 56, 58, 0.75);
  --darkGreen50: rgba(2, 56, 58, 0.50);
  --darkGreen25: rgba(2, 56, 58, 0.25);
  --darkGreen10: rgba(2, 56, 58, 0.10);
  --deepGreen: #212f30;
  --blackGreen: #010e0f;
}

* {
  font-family: ${FONT_STACK};
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

html {
  display: flex;
  overflow-x: hidden;
  overflow-y: unset;
  flex-direction: column;
  align-items: flex-start;
}

body, .App {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  touch-action: pan-y;
}

#mountPoint {
  width: 100%;
}

.bm-burger-button {
  display: none;
}

.CartView .bm-menu {
  background: #ffffff !important;
}

.QuickView .bm-menu {
  background: transparent !important;
}

.fade-in {
  animation: fadeIn ease 2s;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
`
