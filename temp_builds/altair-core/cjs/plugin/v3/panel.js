"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AltairV3Panel = void 0;
const theme_1 = require("../../theme");
class AltairV3Panel {
    /**
     * Initialize the panel with the provided data
     * @internal
     */
    initialize(ctx, data) {
        if (data) {
            this.setupStyles(data);
        }
        // Initialize the panel
        const div = document.createElement('div');
        div.id = 'altair-plugin-panel';
        document.body.appendChild(div);
        this.create(ctx, div);
    }
    setupStyles(data) {
        // Get the CSS style URL from the app and apply it to the panel
        data.styleUrls.forEach((styleUrl) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            // link.crossOrigin = 'anonymous';
            link.href = styleUrl;
            document.head.appendChild(link);
        });
        if (data.styles.length) {
            this.injectCSS(data.styles.join('\n'));
        }
        else if (data.theme) {
            this.injectCSS((0, theme_1.getCSS)(data.theme));
        }
        // set the background color of the panel to the theme background color
        this.injectCSS(`
      body {
        background: transparent;
      }
    `);
        data.htmlClasses.forEach((htmlClass) => {
            document.documentElement.classList.add(htmlClass);
        });
    }
    injectCSS(css) {
        const el = document.createElement('style');
        el.innerText = css.replace(/[\n\r]/g, '');
        document.head.appendChild(el);
        return el;
    }
}
exports.AltairV3Panel = AltairV3Panel;
//# sourceMappingURL=panel.js.map