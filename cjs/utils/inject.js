"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectStylesheet = exports.injectScript = void 0;
const injectScript = (url) => {
    return new Promise((resolve, reject) => {
        const head = document.getElementsByTagName('head')[0];
        if (!head) {
            return reject(new Error('No head found!'));
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        // script.crossOrigin = 'anonymous';
        script.onload = () => resolve(null);
        script.onerror = (err) => reject(err);
        head.appendChild(script);
    });
};
exports.injectScript = injectScript;
const injectStylesheet = (url) => {
    return new Promise((resolve, reject) => {
        const head = document.getElementsByTagName('head')[0];
        if (!head) {
            return reject(new Error('No head found!'));
        }
        const style = document.createElement('link');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        // style.crossOrigin = 'anonymous';
        style.href = url;
        style.onload = () => resolve(null);
        style.onerror = (err) => reject(err);
        head.appendChild(style);
    });
};
exports.injectStylesheet = injectStylesheet;
//# sourceMappingURL=inject.js.map