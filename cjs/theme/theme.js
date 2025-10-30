"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = exports.mergeThemes = exports.hexToRgbStr = exports.foundations = void 0;
const deepmerge_1 = __importDefault(require("deepmerge"));
const color_name_1 = __importDefault(require("color-name"));
/*
Some theming ideas:
#1a1c24 - A deep charcoal gray with a subtle blue undertone.
#181a1f - A very dark gray with a cool, slightly bluish tint.
#212529 - A dark cool gray with a hint of blue.
#232931 - A rich, deep blue-gray shade that pairs well with greens.
#2d2f33 - A slightly lighter dark gray with a subtle blue cast.

If the background color is #1a1c24 (deep charcoal gray), you could use #2d3138 for borders.
For a #181a1f (very dark gray) background, consider #262a2e for borders.
With a #212529 (dark cool gray) background, #343a40 would make a good border color.
If you choose #232931 (rich blue-gray) as the background, #3a4149 would be a suitable border shade.
For a #2d2f33 (slightly lighter dark gray) background, #404448 could work well for borders.
*/
exports.foundations = {
    easing: 'ease',
    colors: {
        black: '#201e1f',
        darkGray: '#a6a6a6',
        gray: '#eaeaea',
        lightGray: '#fafafa',
        white: '#ffffff',
        green: '#64CB29',
        blue: '#2d9ee0',
        rose: '#f45b69',
        cerise: '#f00faa',
        red: '#ed6a5a',
        orange: '#edae49',
        yellow: '#e4ce44',
        lightRed: '#cc998d',
        darkPurple: '#303965',
    },
    type: {
        fontSize: {
            base: 24,
            remBase: 24,
            body: 13,
            bodySmaller: 12,
        },
        fontFamily: {
            default: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
    },
};
const theme = (0, deepmerge_1.default)(exports.foundations, {
    isSystem: false,
    colors: {
        primary: exports.foundations.colors.green,
        secondary: exports.foundations.colors.blue,
        tertiary: exports.foundations.colors.rose,
        bg: exports.foundations.colors.lightGray,
        offBg: exports.foundations.colors.white,
        font: exports.foundations.colors.black,
        offFont: exports.foundations.colors.darkGray,
        border: exports.foundations.colors.darkGray,
        offBorder: exports.foundations.colors.gray,
        headerBg: exports.foundations.colors.white,
    },
    shadow: {
        color: exports.foundations.colors.black,
        opacity: 0.1,
    },
    editor: {
        fontFamily: {
            default: 'JetBrains Mono',
        },
        fontSize: exports.foundations.type.fontSize.bodySmaller,
        colors: {
            comment: exports.foundations.colors.darkGray,
            string: exports.foundations.colors.orange,
            number: exports.foundations.colors.orange,
            variable: exports.foundations.colors.black,
            keyword: exports.foundations.colors.blue,
            atom: exports.foundations.colors.black,
            attribute: exports.foundations.colors.green,
            property: exports.foundations.colors.blue,
            punctuation: exports.foundations.colors.blue,
            definition: exports.foundations.colors.orange,
            builtin: exports.foundations.colors.orange,
            cursor: exports.foundations.colors.blue,
        },
    },
});
const colorOrHexToRgb = (hex) => {
    const rgb = color_name_1.default[hex];
    if (rgb) {
        return {
            r: rgb[0],
            g: rgb[1],
            b: rgb[2],
        };
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result || result.length < 4) {
        return;
    }
    return {
        r: parseInt(result[1] ?? '', 16),
        g: parseInt(result[2] ?? '', 16),
        b: parseInt(result[3] ?? '', 16),
    };
};
const hexToRgbStr = (hex) => {
    if (!hex) {
        return '';
    }
    const rgb = colorOrHexToRgb(hex);
    if (!rgb) {
        return '';
    }
    const { r, g, b } = rgb;
    return `${r}, ${g}, ${b}`;
};
exports.hexToRgbStr = hexToRgbStr;
// shade one of our rgb color objects to a distance of i*10%
// ({ red: 80, green: 18, blue: 20 }, 1) => { red: 72, green: 16, blue: 18 }
const rgbShade = (rgb, i) => {
    return {
        r: rgb.r * (1 - 0.1 * i),
        g: rgb.g * (1 - 0.1 * i),
        b: rgb.b * (1 - 0.1 * i),
    };
};
// tint one of our rgb color objects to a distance of i*10%
// ({ red: 80, green: 18, blue: 20 }, 1) => { red: 98, green: 42, blue: 44 }
const rgbTint = (rgb, i) => {
    return {
        r: rgb.r + (255 - rgb.r) * i * 0.1,
        g: rgb.g + (255 - rgb.g) * i * 0.1,
        b: rgb.b + (255 - rgb.b) * i * 0.1,
    };
};
const mergeThemes = (...customThemes) => {
    return deepmerge_1.default.all(customThemes);
};
exports.mergeThemes = mergeThemes;
const createTheme = (customTheme, ...extraThemes) => {
    return deepmerge_1.default.all([theme, customTheme, ...extraThemes]);
};
exports.createTheme = createTheme;
//# sourceMappingURL=theme.js.map