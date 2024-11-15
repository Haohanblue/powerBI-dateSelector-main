import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import { AdvancedFilter, IFilterColumnTarget } from "powerbi-models";
export declare class Visual implements IVisual {
    private target;
    private reactRoot;
    private formattingSettings;
    private previousSettings;
    private formattingSettingsService;
    private static filterObjectProperty;
    private filterTarget;
    private initialized;
    private dateInitRange;
    start: Date | null;
    end: Date | null;
    private rangeScope;
    private dateRangeFilter;
    private prevFilteredStartDate;
    private prevFilteredEndDate;
    private host;
    private isUpdating;
    private isInitializing;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): any;
    private initializeValues;
    private clearData;
    private getNum;
    private getDayNum;
    /**
     * Event listener for React date changes
     */
    private handleVal;
    private setFilterValues;
    applyDatePeriod(startDate: Date, endDate: Date, filterTarget: IFilterColumnTarget): void;
    createFilter(startDate: Date, endDate: Date, filterTarget: IFilterColumnTarget): AdvancedFilter;
    clearSelection(target: IFilterColumnTarget): void;
    private updatePrevFilterState;
    getFilterAction(startDate: Date, endDate: Date): powerbi.FilterAction;
    private static areOptionsValid;
    private static isDataViewCategoricalValid;
    private static isDataViewValid;
    private parseDate;
    private getYmd;
    /**
     * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
     * This method is called once every time we open properties pane or when the user edit any format property.
     */
    getFormattingModel(): powerbi.visuals.FormattingModel;
}
