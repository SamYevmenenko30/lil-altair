export default !!((window &&
    window.process &&
    window.process.versions.electron) ||
    !!window.navigator.userAgent.match(/Electron/));
//# sourceMappingURL=is_electron.js.map