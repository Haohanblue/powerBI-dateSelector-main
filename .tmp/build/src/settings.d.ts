import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
import { StyleSettings, CalendarSettings, ConfigSettings, DaySettings, WeekSettings, PaySettings, MonthSettings, QuarterSettings, YearSettings } from "./initsettings";
export declare class VisualSettingsModel extends FormattingSettingsModel {
    styleCard: styleSettings;
    calendarCard: calendarSettings;
    configCard: configSettings;
    dayCard: daySettings;
    weekCard: weekSettings;
    payCard: paySettings;
    monthCard: monthSettings;
    quarterCard: quarterSettings;
    yearCard: yearSettings;
    cards: Array<FormattingSettingsCard>;
}
declare class styleSettings extends FormattingSettingsCard {
    style: StyleSettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    themeFont: formattingSettings.AutoDropdown;
    themeMode: formattingSettings.AutoDropdown;
    themeColor: formattingSettings.ColorPicker;
    fmtDate: formattingSettings.AutoDropdown;
    slices: Array<FormattingSettingsSlice>;
}
declare class calendarSettings extends FormattingSettingsCard {
    calendar: CalendarSettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    startRange: formattingSettings.AutoDropdown;
    stepInit: formattingSettings.AutoDropdown;
    yearStartMonth: formattingSettings.AutoDropdown;
    weekStartDay: formattingSettings.AutoDropdown;
    slices: Array<FormattingSettingsSlice>;
}
declare class configSettings extends FormattingSettingsCard {
    config: ConfigSettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    showSlider: formattingSettings.ToggleSwitch;
    show2ndSlider: formattingSettings.ToggleSwitch;
    showCurrent: formattingSettings.ToggleSwitch;
    showIconText: formattingSettings.ToggleSwitch;
    showHelpIcon: formattingSettings.ToggleSwitch;
    showMore: formattingSettings.ToggleSwitch;
    slices: Array<FormattingSettingsSlice>;
}
declare class daySettings extends FormattingSettingsCard {
    day: DaySettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    showDay: formattingSettings.ToggleSwitch;
    fmtDay: formattingSettings.AutoDropdown;
    slices: Array<FormattingSettingsSlice>;
}
declare class weekSettings extends FormattingSettingsCard {
    week: WeekSettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    showWeek: formattingSettings.ToggleSwitch;
    fmtWeek: formattingSettings.AutoDropdown;
    weekSkip: formattingSettings.NumUpDown;
    slices: Array<FormattingSettingsSlice>;
}
declare class paySettings extends FormattingSettingsCard {
    pay: PaySettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    showPay: formattingSettings.ToggleSwitch;
    fmtPay: formattingSettings.AutoDropdown;
    paySkip: formattingSettings.NumUpDown;
    payLength: formattingSettings.NumUpDown;
    payRefDay: formattingSettings.NumUpDown;
    payRefMonth: formattingSettings.AutoDropdown;
    payRefYear: formattingSettings.NumUpDown;
    payRefDate: formattingSettings.DatePicker;
    slices: Array<FormattingSettingsSlice>;
}
declare class monthSettings extends FormattingSettingsCard {
    month: MonthSettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    showMonth: formattingSettings.ToggleSwitch;
    fmtMonth: formattingSettings.AutoDropdown;
    monthSkip: formattingSettings.NumUpDown;
    slices: Array<FormattingSettingsSlice>;
}
declare class quarterSettings extends FormattingSettingsCard {
    quarter: QuarterSettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    showQuarter: formattingSettings.ToggleSwitch;
    fmtQuarter: formattingSettings.AutoDropdown;
    quarterSkip: formattingSettings.NumUpDown;
    slices: Array<FormattingSettingsSlice>;
}
declare class yearSettings extends FormattingSettingsCard {
    year: YearSettings;
    name: string;
    description: string;
    displayName: string;
    analyticsPane: boolean;
    uid: string;
    showYear: formattingSettings.ToggleSwitch;
    fmtYear: formattingSettings.AutoDropdown;
    yearSkip: formattingSettings.NumUpDown;
    slices: Array<FormattingSettingsSlice>;
}
export {};
