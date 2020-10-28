import { createGlobalStyle } from "styled-components"
import * as brand from "./brandStyles"

const base64 =
  "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"

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'High Voltage';
  font-weight: normal;
  font-style: normal;
  src: url(data:font/truetype;charset=utf-8;base64,${base64}) format('woff'), /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'); /* Safari, Android, iOS */
}

.useHighVoltage {
  font-family: 'High Voltage', 'HighVoltage' !important;
}

@media screen and (max-width: 768px) {
  .useHighVoltage {
    font-family: 'Lato' !important;
  }
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

h1 {
  font-size: 54px !important;
  font-weight: 800;
}

html, body, #mountPoint, .App {
  height: 100%;
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
.App > div > .bm-overlay {
  top: 0px;

}

.App > div > .bm-menu-wrap {
  top: 0px;
}

.App > div > .bm-overlay {
  z-index: 5555 !important;
}

.App > div > .bm-menu-wrap {
  z-index: 5556 !important;
}

.App > div > .bm-menu-wrap .bm-menu {
  background: #fff;

  .warningText {
    margin-bottom: 24px;
  }
}

.App > div > .bm-item-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

  .pnf-column {
    display: flex;
    flex-direction: column;
  }

  .pnf-input-container {
    display: flex;
    flex-direction: column;
  }

  .pnf-input-container .pnf-label {
  }

  .pnf-input-container .pnf-input, .pnf-input, input[type="text"], input[type="password"], input[type="email"]  {
    margin-top: 8px;
  }

  .pnf-horizontal-input-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .pnf-input, input[type="text"], input[type="password"], input[type="email"] {
    width: 100%;
    min-width: 160px;
    height: 32px;
    border-radius: 2px;
    padding: 0px 8px;
    font-size: 14px;
    border: 1px solid var(--brandBlack70);

    @media (min-width: 530px) {
      margin-right: 40px;
    }

    @media (min-width: 760px) {
      margin-right: 48px;
    }
  }

  .pnf-input::placeholder {
    opacity: 0.5;
  }

  #create_customer, div#recover {
    display: flex;
    flex-direction: column;
    padding: 48px;

    input[type="submit"] {
      margin-top: 24px;
      height: 32px;
    }
  }

  div#recover {
    padding-left: 0px;
    padding-right: 0px;
  }

  input[type="submit"] {
    height: 39px !important;
    display: flex;
    align-items: center;
    padding-bottom: 12px;
  }

  button, input[type="submit"] {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 10px 16px 10px;
    font-size: 16px;
    font-weight: 700;
    -webkit-letter-spacing: 2px;
    -moz-letter-spacing: 2px;
    -ms-letter-spacing: 2px;
    letter-spacing: 2px;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-transform: uppercase;
    background: var(--brandGreen100);
    color: var(--brandWhite100);
    border: none;
    font-weight: 500;
  }

  [action="/account/activate"] {
    padding: 48px 0;
  }

  .password_confirm {
    margin: 24px 0;
  }
`
