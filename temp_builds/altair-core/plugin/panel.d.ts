import { PluginParentEngine } from './v3/parent-engine';
import { SafeHtml } from '@angular/platform-browser';
export declare enum AltairPanelLocation {
    HEADER = "header",
    SIDEBAR = "sidebar",
    RESULT_PANE_BOTTOM = "result_pane_bottom"
}
/**
 * Used for dynamic panel elements. Can also be used for angular components in the future.
 */
export declare class AltairPanel {
    title: string;
    element: HTMLElement;
    location: AltairPanelLocation;
    engine?: PluginParentEngine | undefined;
    iconUrl?: string | undefined;
    iconSvg?: SafeHtml | undefined;
    id: string;
    isActive: boolean;
    constructor(title: string, element: HTMLElement, location: AltairPanelLocation, engine?: PluginParentEngine | undefined, iconUrl?: string | undefined, iconSvg?: SafeHtml | undefined);
    setActive(isActive: boolean): void;
    destroy(): void;
}
//# sourceMappingURL=panel.d.ts.map