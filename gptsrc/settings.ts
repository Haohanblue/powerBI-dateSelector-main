/*
 *  Power BI Visualization Settings
 *  Date Range Selector
 */

"use strict";

// 引入 Power BI 可视化工具的格式化模型模块
import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

// 格式化设置的别名
import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

// 从 initsettings 模块导入各类特定设置
import {
    StyleSettings,
    CalendarSettings,
    ConfigSettings,
    DaySettings,
    WeekSettings,
    PaySettings,
    MonthSettings,
    QuarterSettings,
    YearSettings
} from "./initsettings"

// 定义 VisualSettingsModel 类，继承 FormattingSettingsModel，表示整个可视化对象的格式化设置模型
export class VisualSettingsModel extends FormattingSettingsModel {
    // 各种自定义设置卡片
    styleCard = new styleSettings();
    calendarCard = new calendarSettings();
    configCard = new configSettings();
    dayCard = new daySettings();
    weekCard = new weekSettings();
    payCard = new paySettings();
    monthCard = new monthSettings();
    quarterCard = new quarterSettings();
    yearCard = new yearSettings();

    // 将所有设置卡片添加到模型的卡片数组中
    cards: Array<FormattingSettingsCard> = [
        this.styleCard, this.calendarCard, this.configCard,
        this.dayCard, this.weekCard, this.payCard, this.monthCard, this.quarterCard, this.yearCard
    ];
}

// 定义样式设置卡片类，用于设置视觉样式
class styleSettings extends FormattingSettingsCard {
    style: StyleSettings = new StyleSettings();

    name: string = "style"; // 设置卡片的标识名称
    description: string = "Visual look and feel"; // 设置卡片的描述
    displayName: string = "Style"; // 显示名称
    analyticsPane: boolean = false;
    uid: string = "styleUid"; // 唯一标识符

    // 定义各项样式设置的切片
    themeFont = new formattingSettings.AutoDropdown({
        name: "themeFont",
        description: "Font for text on this slicer",
        displayName: "Theme Font",
        value: this.style.themeFont
    });
    themeMode = new formattingSettings.AutoDropdown({
        name: "themeMode",
        description: "Theme mode dark background",
        displayName: "Mode",
        value: this.style.themeMode
    });
    themeColor = new formattingSettings.ColorPicker({
        name: "themeColor",
        displayName: "Theme color",
        value: { value: this.style.themeColor }
    });

    // 日期格式设置，但未实现功能
    fmtDate = new formattingSettings.AutoDropdown({ 
        name: "fmtDate",
        description: "Date format of the input fields",
        displayName: "Date Input Format",
        value: this.style.fmtDate
    });

    // 将所有切片添加到切片数组中
    slices: Array<FormattingSettingsSlice> = [this.themeFont, this.themeMode, this.themeColor];
}

// 定义日历设置卡片类，控制日历和时间范围的相关选项
class calendarSettings extends FormattingSettingsCard {
    calendar: CalendarSettings = new CalendarSettings();

    name: string = "calendar";
    description: string = "Calendar stuff like Year Setup (Financial/Calendar), Week start day, etc.";
    displayName: string = "Range options";
    analyticsPane: boolean = false;
    uid: string = "calendarUid";

    // 定义日历相关设置的切片
    startRange = new formattingSettings.AutoDropdown({
        name: "startRange",
        description: "Default date range when a page is loaded - predominant unless 'Sync'",
        displayName: "Start Range",
        value: this.calendar.startRange
    });
    stepInit = new formattingSettings.AutoDropdown({
        name: "stepInit",
        description: "Slider and increment step intervals when a page is loaded",
        displayName: "Step Level",
        value: this.calendar.stepInit
    });
    yearStartMonth = new formattingSettings.AutoDropdown({
        name: "yearStartMonth",
        description: "Set the start month for the [Fiscal] year",
        displayName: "Fiscal Year Start",
        value: this.calendar.yearStartMonth
    });
    weekStartDay = new formattingSettings.AutoDropdown({
        name: "weekStartDay",
        description: "The start day for each week step",
        displayName: "Week Start Day",
        value: this.calendar.weekStartDay
    });

    slices: Array<FormattingSettingsSlice> = [this.startRange, this.stepInit, this.yearStartMonth, this.weekStartDay];
}

// 定义布局配置卡片类，用于控制时间线元素的显示
class configSettings extends FormattingSettingsCard {
    public config: ConfigSettings = new ConfigSettings();

    name: string = "config";
    description: string = "Timeline controls to show or hide";
    displayName: string = "Layout";
    analyticsPane: boolean = false;
    uid: string = "timelineUid";

    // 定义配置相关设置的切片
    showSlider = new formattingSettings.ToggleSwitch({
        name: "showSlider",
        description: "Show the timeline by default",
        displayName: "Timeline",
        value: this.config.showSlider
    });
    show2ndSlider = new formattingSettings.ToggleSwitch({
        name: "show2ndSlider",
        description: "Show 2 sliders for mixed granularity & clarification of year for months, month for weeks, etc.",
        displayName: "2 timeline sliders",
        value: this.config.show2ndSlider
    });
    showCurrent = new formattingSettings.ToggleSwitch({
        name: "showCurrent",
        description: "Show the Current Action Bar selector for Today, this week, this month, this year, etc.",
        displayName: "Current Periods",
        value: this.config.showCurrent
    });
    showIconText = new formattingSettings.ToggleSwitch({
        name: "showIconText",
        description: "Show the Current Period selector icon text",
        displayName: "Current Icon Text",
        value: this.config.showIconText
    });
    showHelpIcon = new formattingSettings.ToggleSwitch({
        name: "showHelpIcon",
        description: "Show help button for optional extended tooltip help.",
        displayName: "Help Icon",
        value: this.config.showHelpIcon
    });
    showMore = new formattingSettings.ToggleSwitch({
        name: "showMore",
        description: "Show the Extended Period selector for YTD, YT last nonth, etc.",
        displayName: "Extended Periods",
        value: this.config.showMore
    });

    slices: Array<FormattingSettingsSlice> = [this.showSlider, this.show2ndSlider, this.showCurrent, this.showIconText, this.showHelpIcon, this.showMore];
}

// 定义日期设置卡片类，控制“天”级别的选项
class daySettings extends FormattingSettingsCard {
    public day: DaySettings = new DaySettings();

    name: string = "day";
    description: string = "Show the Today button on the Step Bar & Current Action Bar";
    displayName: string = "Day steps";
    analyticsPane: boolean = false;
    uid: string = "dayUid";

    // 定义日期相关设置的切片
    showDay = new formattingSettings.ToggleSwitch({
        name: "showDay",
        displayName: undefined,
        topLevelToggle: true,
        value: this.day.showDay
    });
    fmtDay = new formattingSettings.AutoDropdown({
        name: "fmtDay",
        displayName: "Day format (Today)",
        description: "The timeline format for day step level",
        value: this.day.fmtDay
    });

    slices: Array<FormattingSettingsSlice> = [this.showDay, this.fmtDay];
}

// 定义周设置卡片类，控制“周”级别的选项
class weekSettings extends FormattingSettingsCard {
    public week: WeekSettings = new WeekSettings();

    name: string = "week";
    description: string = "Show the Week buttons on the Step Bar & Current Action Bar";
    displayName: string = "Week steps";
    analyticsPane: boolean = false;
    uid: string = "weekUid";

    // 定义周相关设置的切片
    showWeek = new formattingSettings.ToggleSwitch({
        name: "showWeek",
        displayName: undefined,
        topLevelToggle: true,
        value: this.week.showWeek
    });
    fmtWeek = new formattingSettings.AutoDropdown({
        name: "fmtWeek",
        displayName: "Week format",
        description: "The timeline format for week step level",
        value: this.week.fmtWeek
    });
    weekSkip = new formattingSettings.NumUpDown({
        name: "weekSkip",
        displayName: "# Week labels to skip",
        description: "Timeline skips the number of week marker labels specified",
        value: this.week.weekSkip
    });

    slices: Array<FormattingSettingsSlice> = [this.showWeek, this.weekSkip, this.fmtWeek];
}

// 定义支付期设置卡片类，控制支付周期的相关选项
class paySettings extends FormattingSettingsCard {
    public pay: PaySettings = new PaySettings();

    name: string = "pay";
    description: string = "Show the Pay buttons on the Step Bar & Current Action Bar";
    displayName: string = "Pay steps";
    analyticsPane: boolean = false;
    uid: string = "payUid";

    // 定义支付期相关设置的切片
    showPay = new formattingSettings.ToggleSwitch({
        name: "showPay",
        displayName: undefined,
        topLevelToggle: true,
        value: this.pay.showPay
    });
    fmtPay = new formattingSettings.AutoDropdown({
        name: "fmtPay",
        displayName: "Pay Period format",
        description: "The timeline format for pay step level",
        value: this.pay.fmtPay
    });
    paySkip = new formattingSettings.NumUpDown({
        name: "paySkip",
        displayName: "# Pay labels to skip",
        description: "Timeline skips the number of pay marker labels specified",
        value: this.pay.paySkip
    });
    payLength = new formattingSettings.NumUpDown({
        name: "payLength",
        displayName: "Pay period length",
        description: "Pay period length in days",
        value: this.pay.payLength
    });
    payRefDay = new formattingSettings.NumUpDown({
        name: "payRefDay",
        displayName: "Reference date DAY",
        description: "Pay period seed reference date from which to start the repeating period",
        value: this.pay.payRefDay
    });
    payRefMonth = new formattingSettings.AutoDropdown({
        name: "payRefMonth",
        displayName: "Reference date MONTH",
        description: "Pay period seed reference date's month from which to start the repeating period",
        value: this.pay.payRefMonth
    });
    payRefYear = new formattingSettings.NumUpDown({
        name: "payRefYear",
        displayName: "Reference date YEAR",
        description: "Pay period seed reference date's year from which to start the repeating period",
        value: this.pay.payRefYear
    });
    // 该功能未实现
    payRefDate = new formattingSettings.DatePicker({
        placeholder: "Pay Period Reference Date",
        name: "payRefDate",
        displayName: "Pay period start",
        description: "Pay period seed reference date from which to start the repeating period",
        value: this.pay.payRefDate
    });

    slices: Array<FormattingSettingsSlice> = [this.showPay, this.paySkip, this.fmtPay, this.payLength, this.payRefYear, this.payRefMonth, this.payRefDay];
}

// 定义月设置卡片类，控制“月”级别的选项
class monthSettings extends FormattingSettingsCard {
    public month: MonthSettings = new MonthSettings();

    name: string = "month";
    description: string = "Show the Month buttons on the Step Bar & Current Action Bar";
    displayName: string = "Month steps";
    analyticsPane: boolean = false;
    uid: string = "monthUid";

    // 定义月相关设置的切片
    showMonth = new formattingSettings.ToggleSwitch({
        name: "showMonth",
        displayName: undefined,
        topLevelToggle: true,
        value: this.month.showMonth
    });
    fmtMonth = new formattingSettings.AutoDropdown({
        name: "fmtMonth",
        displayName: "Month Period format",
        description: "The timeline format for month step level",
        value: this.month.fmtMonth
    });
    monthSkip = new formattingSettings.NumUpDown({
        name: "monthSkip",
        displayName: "# Month labels to skip",
        description: "Timeline skips the number of month marker labels specified",
        value: this.month.monthSkip
    });

    slices: Array<FormattingSettingsSlice> = [this.showMonth, this.monthSkip, this.fmtMonth];
}

// 定义季度设置卡片类，控制“季度”级别的选项
class quarterSettings extends FormattingSettingsCard {
    public quarter: QuarterSettings = new QuarterSettings();

    name: string = "quarter";
    description: string = "Show the Quarter buttons on the Step Bar & Current Action Bar";
    displayName: string = "Quarter steps";
    analyticsPane: boolean = false;
    uid: string = "quarterUid";

    // 定义季度相关设置的切片
    showQuarter = new formattingSettings.ToggleSwitch({
        name: "showQuarter",
        displayName: undefined,
        topLevelToggle: true,
        value: this.quarter.showQuarter
    });
    fmtQuarter = new formattingSettings.AutoDropdown({
        name: "fmtQuarter",
        displayName: "Quarter Period format",
        description: "The timeline format for quarter step level",
        value: this.quarter.fmtQuarter
    });
    quarterSkip = new formattingSettings.NumUpDown({
        name: "quarterSkip",
        displayName: "# Quarter labels to skip",
        description: "Timeline skips the number of quarter marker labels specified",
        value: this.quarter.quarterSkip
    });

    slices: Array<FormattingSettingsSlice> = [this.showQuarter, this.quarterSkip, this.fmtQuarter];
}

// 定义年设置卡片类，控制“年”级别的选项
class yearSettings extends FormattingSettingsCard {
    public year: YearSettings = new YearSettings();

    name: string = "year";
    description: string = "Show the Year buttons on the Step Bar & Current Action Bar";
    displayName: string = "Year steps";
    analyticsPane: boolean = false;
    uid: string = "yearUid";

    // 定义年相关设置的切片
    showYear = new formattingSettings.ToggleSwitch({
        name: "showYear",
        displayName: undefined,
        topLevelToggle: true,
        value: this.year.showYear
    });
    fmtYear = new formattingSettings.AutoDropdown({
        name: "fmtYear",
        displayName: "Year Period format",
        description: "The timeline format for year step level",
        value: this.year.fmtYear
    });
    yearSkip = new formattingSettings.NumUpDown({
        name: "yearSkip",
        displayName: "# Year labels to skip",
        description: "Timeline skips the number of year marker labels specified",
        value: this.year.yearSkip
    });

    slices: Array<FormattingSettingsSlice> = [this.showYear, this.yearSkip, this.fmtYear];
}
