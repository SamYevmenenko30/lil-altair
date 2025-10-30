"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCSS = void 0;
const light_1 = __importDefault(require("./defaults/light"));
const dark_1 = __importDefault(require("./defaults/dark"));
const theme_1 = require("./theme");
const COLOR_VARS = {
    // Base colors
    'black-color': (t) => t.colors.black,
    'dark-grey-color': (t) => t.colors.darkGray,
    'grey-color': (t) => t.colors.gray,
    'light-grey-color': (t) => t.colors.lightGray,
    'white-color': (t) => t.colors.white,
    'green-color': (t) => t.colors.green,
    'blue-color': (t) => t.colors.blue,
    'cerise-color': (t) => t.colors.cerise,
    'red-color': (t) => t.colors.red,
    'rose-color': (t) => t.colors.rose,
    'orange-color': (t) => t.colors.orange,
    'yellow-color': (t) => t.colors.yellow,
    'light-red-color': (t) => t.colors.lightRed,
    'dark-purple-color': (t) => t.colors.darkPurple,
    'primary-color': (t) => t.colors.primary,
    'secondary-color': (t) => t.colors.secondary,
    'tertiary-color': (t) => t.colors.tertiary,
    'theme-bg-color': (t) => t.colors.bg,
    'theme-off-bg-color': (t) => t.colors.offBg,
    'theme-font-color': (t) => t.colors.font,
    'theme-off-font-color': (t) => t.colors.offFont,
    'theme-border-color': (t) => t.colors.border,
    'theme-off-border-color': (t) => t.colors.offBorder,
    'header-bg-color': (t) => t.colors.headerBg || t.colors.offBg,
    'editor-comment-color': (t) => t.editor.colors.comment,
    'editor-string-color': (t) => t.editor.colors.string,
    'editor-number-color': (t) => t.editor.colors.number,
    'editor-variable-color': (t) => t.editor.colors.variable,
    'editor-attribute-color': (t) => t.editor.colors.attribute,
    'editor-keyword-color': (t) => t.editor.colors.keyword,
    'editor-atom-color': (t) => t.editor.colors.atom,
    'editor-property-color': (t) => t.editor.colors.property,
    'editor-punctuation-color': (t) => t.editor.colors.punctuation,
    'editor-cursor-color': (t) => t.editor.colors.cursor,
    'editor-def-color': (t) => t.editor.colors.definition,
    'editor-builtin-color': (t) => t.editor.colors.builtin,
};
const RGB_VARS = {
    'rgb-black': (t) => (0, theme_1.hexToRgbStr)(t.colors.black),
    'rgb-dark-grey': (t) => (0, theme_1.hexToRgbStr)(t.colors.darkGray),
    'rgb-grey': (t) => (0, theme_1.hexToRgbStr)(t.colors.gray),
    'rgb-light-grey': (t) => (0, theme_1.hexToRgbStr)(t.colors.lightGray),
    'rgb-white': (t) => (0, theme_1.hexToRgbStr)(t.colors.white),
    'rgb-green': (t) => (0, theme_1.hexToRgbStr)(t.colors.green),
    'rgb-blue': (t) => (0, theme_1.hexToRgbStr)(t.colors.blue),
    'rgb-cerise': (t) => (0, theme_1.hexToRgbStr)(t.colors.cerise),
    'rgb-red': (t) => (0, theme_1.hexToRgbStr)(t.colors.red),
    'rgb-rose': (t) => (0, theme_1.hexToRgbStr)(t.colors.rose),
    'rgb-orange': (t) => (0, theme_1.hexToRgbStr)(t.colors.orange),
    'rgb-yellow': (t) => (0, theme_1.hexToRgbStr)(t.colors.yellow),
    'rgb-light-red': (t) => (0, theme_1.hexToRgbStr)(t.colors.lightRed),
    'rgb-dark-purple': (t) => (0, theme_1.hexToRgbStr)(t.colors.darkPurple),
    'rgb-primary': (t) => (0, theme_1.hexToRgbStr)(t.colors.primary),
    'rgb-secondary': (t) => (0, theme_1.hexToRgbStr)(t.colors.secondary),
    'rgb-tertiary': (t) => (0, theme_1.hexToRgbStr)(t.colors.tertiary),
    'rgb-theme-bg': (t) => (0, theme_1.hexToRgbStr)(t.colors.bg),
    'rgb-theme-off-bg': (t) => (0, theme_1.hexToRgbStr)(t.colors.offBg),
    'rgb-theme-font': (t) => (0, theme_1.hexToRgbStr)(t.colors.font),
    'rgb-theme-off-font': (t) => (0, theme_1.hexToRgbStr)(t.colors.offFont),
    'rgb-theme-border': (t) => (0, theme_1.hexToRgbStr)(t.colors.border),
    'rgb-theme-off-border': (t) => (0, theme_1.hexToRgbStr)(t.colors.offBorder),
    'rgb-header-bg': (t) => (0, theme_1.hexToRgbStr)(t.colors.headerBg || t.colors.offBg),
    // ... other rgb values
};
const createVars = (mapping, theme) => Object.entries(mapping)
    .map(([key, getValue]) => `--${key}: ${getValue(theme)};`)
    .join('\n    ');
const asCSSVariablesString = (theme) => {
    return `
  :root {
    --shadow-bg: rgba(${(0, theme_1.hexToRgbStr)(theme.shadow.color)}, ${theme.shadow.opacity});

    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 'Helvetica Neue', Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    --editor-font-family: ${theme.editor.fontFamily.default};
    --editor-font-size: ${theme.editor.fontSize};

    --baseline-size: ${theme.type.fontSize.base};
    --rem-base: ${theme.type.fontSize.remBase};
    --body-font-size: ${theme.type.fontSize.body};

    --app-easing: ${theme.easing};

    ${createVars(COLOR_VARS, theme)}
    ${createVars(RGB_VARS, theme)}
  }
  `;
};
const getCSS = (appTheme, appDarkTheme, accentColor) => {
    const extraTheme = accentColor ? { colors: { primary: accentColor } } : {};
    if (appTheme && appDarkTheme) {
        return `
      ${asCSSVariablesString((0, theme_1.createTheme)(appTheme, extraTheme))}
      @media (prefers-color-scheme: dark) {
        ${asCSSVariablesString((0, theme_1.createTheme)(appDarkTheme, extraTheme))}
      }
    `;
    }
    if (!appTheme || appTheme.isSystem) {
        return `
      ${asCSSVariablesString((0, theme_1.createTheme)(light_1.default, appTheme, extraTheme))}
      @media (prefers-color-scheme: dark) {
        ${asCSSVariablesString((0, theme_1.createTheme)(dark_1.default, appTheme, extraTheme))}
      }
    `;
    }
    return asCSSVariablesString((0, theme_1.createTheme)(appTheme, extraTheme));
};
exports.getCSS = getCSS;
//# sourceMappingURL=css.js.map