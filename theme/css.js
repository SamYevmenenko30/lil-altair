import lightTheme from './defaults/light';
import darkTheme from './defaults/dark';
import { createTheme, hexToRgbStr } from './theme';
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
    'rgb-black': (t) => hexToRgbStr(t.colors.black),
    'rgb-dark-grey': (t) => hexToRgbStr(t.colors.darkGray),
    'rgb-grey': (t) => hexToRgbStr(t.colors.gray),
    'rgb-light-grey': (t) => hexToRgbStr(t.colors.lightGray),
    'rgb-white': (t) => hexToRgbStr(t.colors.white),
    'rgb-green': (t) => hexToRgbStr(t.colors.green),
    'rgb-blue': (t) => hexToRgbStr(t.colors.blue),
    'rgb-cerise': (t) => hexToRgbStr(t.colors.cerise),
    'rgb-red': (t) => hexToRgbStr(t.colors.red),
    'rgb-rose': (t) => hexToRgbStr(t.colors.rose),
    'rgb-orange': (t) => hexToRgbStr(t.colors.orange),
    'rgb-yellow': (t) => hexToRgbStr(t.colors.yellow),
    'rgb-light-red': (t) => hexToRgbStr(t.colors.lightRed),
    'rgb-dark-purple': (t) => hexToRgbStr(t.colors.darkPurple),
    'rgb-primary': (t) => hexToRgbStr(t.colors.primary),
    'rgb-secondary': (t) => hexToRgbStr(t.colors.secondary),
    'rgb-tertiary': (t) => hexToRgbStr(t.colors.tertiary),
    'rgb-theme-bg': (t) => hexToRgbStr(t.colors.bg),
    'rgb-theme-off-bg': (t) => hexToRgbStr(t.colors.offBg),
    'rgb-theme-font': (t) => hexToRgbStr(t.colors.font),
    'rgb-theme-off-font': (t) => hexToRgbStr(t.colors.offFont),
    'rgb-theme-border': (t) => hexToRgbStr(t.colors.border),
    'rgb-theme-off-border': (t) => hexToRgbStr(t.colors.offBorder),
    'rgb-header-bg': (t) => hexToRgbStr(t.colors.headerBg || t.colors.offBg),
    // ... other rgb values
};
const createVars = (mapping, theme) => Object.entries(mapping)
    .map(([key, getValue]) => `--${key}: ${getValue(theme)};`)
    .join('\n    ');
const asCSSVariablesString = (theme) => {
    return `
  :root {
    --shadow-bg: rgba(${hexToRgbStr(theme.shadow.color)}, ${theme.shadow.opacity});

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
export const getCSS = (appTheme, appDarkTheme, accentColor) => {
    const extraTheme = accentColor ? { colors: { primary: accentColor } } : {};
    if (appTheme && appDarkTheme) {
        return `
      ${asCSSVariablesString(createTheme(appTheme, extraTheme))}
      @media (prefers-color-scheme: dark) {
        ${asCSSVariablesString(createTheme(appDarkTheme, extraTheme))}
      }
    `;
    }
    if (!appTheme || appTheme.isSystem) {
        return `
      ${asCSSVariablesString(createTheme(lightTheme, appTheme, extraTheme))}
      @media (prefers-color-scheme: dark) {
        ${asCSSVariablesString(createTheme(darkTheme, appTheme, extraTheme))}
      }
    `;
    }
    return asCSSVariablesString(createTheme(appTheme, extraTheme));
};
//# sourceMappingURL=css.js.map