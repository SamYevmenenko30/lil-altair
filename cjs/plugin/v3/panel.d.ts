import { ICustomTheme } from '../../theme';
import { PluginV3Context } from './context';
interface StylesData {
    styleUrls: string[];
    styles: string[];
    htmlClasses: string[];
    theme?: ICustomTheme;
}
export declare abstract class AltairV3Panel {
    abstract create(ctx: PluginV3Context, container: HTMLElement): void;
    /**
     * Initialize the panel with the provided data
     * @internal
     */
    initialize(ctx: PluginV3Context, data?: StylesData): void;
    private setupStyles;
    private injectCSS;
}
export {};
//# sourceMappingURL=panel.d.ts.map