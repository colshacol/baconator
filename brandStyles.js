import hexAlpha from "hex-alpha"

const createColor = (hexCode) => {
  return {
    a10: hexAlpha(hexCode, "0.1"),
    a20: hexAlpha(hexCode, "0.2"),
    a30: hexAlpha(hexCode, "0.3"),
    a40: hexAlpha(hexCode, "0.4"),
    a50: hexAlpha(hexCode, "0.5"),
    a60: hexAlpha(hexCode, "0.6"),
    a70: hexAlpha(hexCode, "0.7"),
    a80: hexAlpha(hexCode, "0.8"),
    a90: hexAlpha(hexCode, "0.9"),
    a100: hexAlpha(hexCode, "1.0"),
  }
}

export const colors = {
  black: createColor("#010e0f"),
  gray: createColor("#333333"),
  darkGreen: createColor("#033739"),
  green: createColor("#00938F"),
  lightGreen: createColor("#26aeab"),
  swampGreen: createColor("#446263"),
  yellow: createColor("#FDB308"),
  purple: createColor("#6A3792"),
  red: createColor("#AF2223"),
  white: createColor("#ffffff"),
  offWhite: createColor("#F4F8F8"),
}

export const fontStack = [
  "Lato",
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
