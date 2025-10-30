import { v4 as uuid } from 'uuid';
export var AltairPanelLocation;
(function (AltairPanelLocation) {
    AltairPanelLocation["HEADER"] = "header";
    AltairPanelLocation["SIDEBAR"] = "sidebar";
    AltairPanelLocation["RESULT_PANE_BOTTOM"] = "result_pane_bottom";
})(AltairPanelLocation || (AltairPanelLocation = {}));
/**
 * Used for dynamic panel elements. Can also be used for angular components in the future.
 */
export class AltairPanel {
    constructor(title, element, location, 
    // TODO: Making this optional for now for backward compatibility. This should be required for v3 plugins.
    engine, iconUrl, iconSvg) {
        this.title = title;
        this.element = element;
        this.location = location;
        this.engine = engine;
        this.iconUrl = iconUrl;
        this.iconSvg = iconSvg;
        this.id = uuid();
        this.isActive = false;
    }
    setActive(isActive) {
        this.isActive = isActive;
    }
    destroy() {
        this.element = null;
    }
}
//# sourceMappingURL=panel.js.map