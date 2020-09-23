import { ThemeProvider, createGlobalStyle } from "styled-components"
import * as brand from "./brandStyles"

export const GlobalStyles = createGlobalStyle`
.useHighVoltage {
  font-family: 'High Voltage', 'HighVoltage' !important;
}

:root {
  --brandBlack100: ${brand.colors.black.a100};
  --brandBlack90: ${brand.colors.black.a90};
  --brandBlack80: ${brand.colors.black.a80};
  --brandBlack70: ${brand.colors.black.a70};
  --brandBlack60: ${brand.colors.black.a60};
  --brandBlack50: ${brand.colors.black.a50};
  --brandBlack40: ${brand.colors.black.a40};
  --brandBlack30: ${brand.colors.black.a30};
  --brandBlack20: ${brand.colors.black.a20};
  --brandBlack10: ${brand.colors.black.a10};

  --brandGreen100: ${brand.colors.green.a100};
  --brandGreen90: ${brand.colors.green.a90};
  --brandGreen80: ${brand.colors.green.a80};
  --brandGreen70: ${brand.colors.green.a70};
  --brandGreen60: ${brand.colors.green.a60};
  --brandGreen50: ${brand.colors.green.a50};
  --brandGreen40: ${brand.colors.green.a40};
  --brandGreen30: ${brand.colors.green.a30};
  --brandGreen20: ${brand.colors.green.a20};
  --brandGreen10: ${brand.colors.green.a10};

  --brandSwampGreen100: ${brand.colors.swampGreen.a100};
  --brandSwampGreen90: ${brand.colors.swampGreen.a90};
  --brandSwampGreen80: ${brand.colors.swampGreen.a80};
  --brandSwampGreen70: ${brand.colors.swampGreen.a70};
  --brandSwampGreen60: ${brand.colors.swampGreen.a60};
  --brandSwampGreen50: ${brand.colors.swampGreen.a50};
  --brandSwampGreen40: ${brand.colors.swampGreen.a40};
  --brandSwampGreen30: ${brand.colors.swampGreen.a30};
  --brandSwampGreen20: ${brand.colors.swampGreen.a20};
  --brandSwampGreen10: ${brand.colors.swampGreen.a10};

  --brandLightGreen100: ${brand.colors.lightGreen.a100};
  --brandLightGreen90: ${brand.colors.lightGreen.a90};
  --brandLightGreen80: ${brand.colors.lightGreen.a80};
  --brandLightGreen70: ${brand.colors.lightGreen.a70};
  --brandLightGreen60: ${brand.colors.lightGreen.a60};
  --brandLightGreen50: ${brand.colors.lightGreen.a50};
  --brandLightGreen40: ${brand.colors.lightGreen.a40};
  --brandLightGreen30: ${brand.colors.lightGreen.a30};
  --brandLightGreen20: ${brand.colors.lightGreen.a20};
  --brandLightGreen10: ${brand.colors.lightGreen.a10};

  --brandDarkGreen100: ${brand.colors.darkGreen.a100};
  --brandDarkGreen90: ${brand.colors.darkGreen.a90};
  --brandDarkGreen80: ${brand.colors.darkGreen.a80};
  --brandDarkGreen70: ${brand.colors.darkGreen.a70};
  --brandDarkGreen60: ${brand.colors.darkGreen.a60};
  --brandDarkGreen50: ${brand.colors.darkGreen.a50};
  --brandDarkGreen40: ${brand.colors.darkGreen.a40};
  --brandDarkGreen30: ${brand.colors.darkGreen.a30};
  --brandDarkGreen20: ${brand.colors.darkGreen.a20};
  --brandDarkGreen10: ${brand.colors.darkGreen.a10};

  --brandGray100: ${brand.colors.gray.a100};
  --brandGray90: ${brand.colors.gray.a90};
  --brandGray80: ${brand.colors.gray.a80};
  --brandGray70: ${brand.colors.gray.a70};
  --brandGray60: ${brand.colors.gray.a60};
  --brandGray50: ${brand.colors.gray.a50};
  --brandGray40: ${brand.colors.gray.a40};
  --brandGray30: ${brand.colors.gray.a30};
  --brandGray20: ${brand.colors.gray.a20};
  --brandGray10: ${brand.colors.gray.a10};

  --brandPurple100: ${brand.colors.purple.a100};
  --brandPurple90: ${brand.colors.purple.a90};
  --brandPurple80: ${brand.colors.purple.a80};
  --brandPurple70: ${brand.colors.purple.a70};
  --brandPurple60: ${brand.colors.purple.a60};
  --brandPurple50: ${brand.colors.purple.a50};
  --brandPurple40: ${brand.colors.purple.a40};
  --brandPurple30: ${brand.colors.purple.a30};
  --brandPurple20: ${brand.colors.purple.a20};
  --brandPurple10: ${brand.colors.purple.a10};

  --brandYellow100: ${brand.colors.yellow.a100};
  --brandYellow90: ${brand.colors.yellow.a90};
  --brandYellow80: ${brand.colors.yellow.a80};
  --brandYellow70: ${brand.colors.yellow.a70};
  --brandYellow60: ${brand.colors.yellow.a60};
  --brandYellow50: ${brand.colors.yellow.a50};
  --brandYellow40: ${brand.colors.yellow.a40};
  --brandYellow30: ${brand.colors.yellow.a30};
  --brandYellow20: ${brand.colors.yellow.a20};
  --brandYellow10: ${brand.colors.yellow.a10};

  --brandRed100: ${brand.colors.red.a100};
  --brandRed90: ${brand.colors.red.a90};
  --brandRed80: ${brand.colors.red.a80};
  --brandRed70: ${brand.colors.red.a70};
  --brandRed60: ${brand.colors.red.a60};
  --brandRed50: ${brand.colors.red.a50};
  --brandRed40: ${brand.colors.red.a40};
  --brandRed30: ${brand.colors.red.a30};
  --brandRed20: ${brand.colors.red.a20};
  --brandRed10: ${brand.colors.red.a10};

  --brandWhite100: ${brand.colors.white.a100};
  --brandWhite90: ${brand.colors.white.a90};
  --brandWhite80: ${brand.colors.white.a80};
  --brandWhite70: ${brand.colors.white.a70};
  --brandWhite60: ${brand.colors.white.a60};
  --brandWhite50: ${brand.colors.white.a50};
  --brandWhite40: ${brand.colors.white.a40};
  --brandWhite30: ${brand.colors.white.a30};
  --brandWhite20: ${brand.colors.white.a20};
  --brandWhite10: ${brand.colors.white.a10};

  --brandOffWhite100: ${brand.colors.offWhite.a100};
  --brandOffWhite90: ${brand.colors.offWhite.a90};
  --brandOffWhite80: ${brand.colors.offWhite.a80};
  --brandOffWhite70: ${brand.colors.offWhite.a70};
  --brandOffWhite60: ${brand.colors.offWhite.a60};
  --brandOffWhite50: ${brand.colors.offWhite.a50};
  --brandOffWhite40: ${brand.colors.offWhite.a40};
  --brandOffWhite30: ${brand.colors.offWhite.a30};
  --brandOffWhite20: ${brand.colors.offWhite.a20};
  --brandOffWhite10: ${brand.colors.offWhite.a10};
}

* {
  font-family: ${brand.fontStack};
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

h1, h2, h3, h4, h5, h6, p {
  color: var(--brandGray100);
}

html {
  display: flex;
  overflow-x: hidden;
  overflow-y: unset;
  flex-direction: column;
  align-items: flex-start;

  &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background: var(--brandBlack10);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--brandDarkGreen50);
    }
}

body, .App {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  touch-action: pan-y;
}

pre code {
  padding: 16px 0px;
  white-space: pre-wrap;
  display: flex;
  font-family: monospace;
  color: var(--brandBlack70);
  font-weight: 500;
}

#mountPoint {
  width: 100%;
}

.bm-burger-button {
  display: none;
}

.CartView.bm-menu-wrap {
  top: 0px !important;
}

.CartView .bm-menu {
  padding: 32px 0px 0px 24px;
}

.CartView .bm-menu,
.SideNav .bm-menu {
  background: var(--brandWhite100) !important;
}

.QuickView .bm-menu {
  background: transparent !important;
}

a, :any-link {
  color: var(--brandGreen100);
}

.fade-in {
  animation: fadeIn ease 2s;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

.shopify-challenge__container {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
`
