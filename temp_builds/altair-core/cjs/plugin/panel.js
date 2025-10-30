"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AltairPanel = exports.AltairPanelLocation = void 0;
const uuid_1 = require("uuid");
var AltairPanelLocation;
(function (AltairPanelLocation) {
    AltairPanelLocation["HEADER"] = "header";
    AltairPanelLocation["SIDEBAR"] = "sidebar";
    AltairPanelLocation["RESULT_PANE_BOTTOM"] = "result_pane_bottom";
})(AltairPanelLocation || (exports.AltairPanelLocation = AltairPanelLocation = {}));
/**
 * Used for dynamic panel elements. Can also be used for angular components in the future.
 */
class AltairPanel {
    constructor(title, element, location, 
    // TODO: Making this optional for now for backward compatibility. This should be required for v3 plugins.
    engine, iconUrl, iconSvg) {
        this.title = title;
        this.element = element;
        this.location = location;
        this.engine = engine;
        this.iconUrl = iconUrl;
        this.iconSvg = iconSvg;
        this.id = (0, uuid_1.v4)();
        this.isActive = false;
    }
    setActive(isActive) {
        this.isActive = isActive;
    }
    destroy() {
        this.element = null;
    }
}
exports.AltairPanel = AltairPanel;
//# sourceMappingURL=panel.js.map