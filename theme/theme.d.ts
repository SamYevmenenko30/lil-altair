export declare const foundations: {
    easing: string;
    colors: {
        black: string;
        darkGray: string;
        gray: string;
        lightGray: string;
        white: string;
        green: string;
        blue: string;
        rose: string;
        cerise: string;
        red: string;
        orange: string;
        yellow: string;
        lightRed: string;
        darkPurple: string;
    };
    type: {
        fontSize: {
            base: number;
            remBase: number;
            body: number;
            bodySmaller: number;
        };
        fontFamily: {
            default: string;
        };
    };
};
export interface ITheme {
    /** CSS transition easing function for smooth animations */
    easing: string;
    colors: {
        /** Black color used for high contrast elements */
        black: string;
        /** Dark gray color for muted text and secondary elements */
        darkGray: string;
        /** Medium gray color for neutral backgrounds and borders */
        gray: string;
        /** Light gray color for subtle backgrounds and dividers */
        lightGray: string;
        /** White color for light backgrounds and text */
        white: string;
        /** Green color typically used for success states and positive actions */
        green: string;
        /** Blue color for informational elements and links */
        blue: string;
        /** Rose/pink color for accent elements and highlights */
        rose: string;
        /** Bright magenta/cerise color for special emphasis */
        cerise: string;
        /** Red color for error states and destructive actions */
        red: string;
        /** Orange color for warning states and secondary actions */
        orange: string;
        /** Yellow color for caution states and highlights */
        yellow: string;
        /** Light red/salmon color for subtle error indicators */
        lightRed: string;
        /** Dark purple color for premium features or special elements */
        darkPurple: string;
        /** Primary brand color used for main interactive elements */
        primary: string;
        /** Secondary brand color used for supporting interactive elements */
        secondary: string;
        /** Tertiary brand color used for accent and decorative elements */
        tertiary: string;
        /** Main background color for the application */
        bg: string;
        /** Alternative background color for cards, panels, and sections */
        offBg: string;
        /** Primary text color for readable content */
        font: string;
        /** Secondary text color for less emphasized content */
        offFont: string;
        /** Primary border color for main UI elements */
        border: string;
        /** Secondary border color for subtle divisions */
        offBorder: string;
        /** Background color specifically for the header section */
        headerBg: string;
    };
    type: {
        fontSize: {
            /** Base font size in pixels used for calculations */
            base: number;
            /** Root em base size in pixels for responsive typography */
            remBase: number;
            /** Standard body text font size */
            body: number;
            /** Smaller body text font size for secondary content */
            bodySmaller: number;
        };
        fontFamily: {
            /** Default system font stack for UI elements */
            default: string;
        };
    };
    /** Whether this theme follows system preferences (light/dark mode) */
    isSystem: boolean;
    shadow: {
        /** Color used for drop shadows and elevation effects */
        color: string;
        /** Opacity level for shadow effects (0.0 to 1.0) */
        opacity: number;
    };
    editor: {
        fontFamily: {
            /** Font family specifically for code editor and monospace content */
            default: string;
        };
        /** Font size for code editor text */
        fontSize: number;
        colors: {
            /** Color for code comments and documentation */
            comment: string;
            /** Color for string literals in code */
            string: string;
            /** Color for numeric literals in code */
            number: string;
            /** Color for variable names and identifiers */
            variable: string;
            /** Color for programming language keywords */
            keyword: string;
            /** Color for atomic values like boolean literals */
            atom: string;
            /** Color for HTML/XML/GraphQL attributes */
            attribute: string;
            /** Color for properties */
            property: string;
            /** Color for punctuation marks like brackets and commas */
            punctuation: string;
            /** Color for function, class, type definitions */
            definition: string;
            /** Color for built-in functions and types */
            builtin: string;
            /** Color for the text cursor in the editor */
            cursor: string;
        };
    };
}
type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P];
};
export type ICustomTheme = RecursivePartial<ITheme>;
export declare const hexToRgbStr: (hex: string) => string;
export declare const mergeThemes: (...customThemes: ICustomTheme[]) => ICustomTheme;
export declare const createTheme: (customTheme: ICustomTheme, ...extraThemes: ICustomTheme[]) => ITheme;
export {};
//# sourceMappingURL=theme.d.ts.map