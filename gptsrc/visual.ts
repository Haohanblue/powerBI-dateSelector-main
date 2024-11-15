/*
 * Power BI Visual CLI
 *
 * 日期范围筛选器自定义视觉的实现代码
 * 使用 React 作为前端框架，并集成了 Power BI 的高级筛选功能
 */

"use strict";

import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import VisualUpdateType = powerbi.VisualUpdateType;

// 引入 Power BI 筛选模型和实用工具
import { AdvancedFilter, IFilterColumnTarget } from "powerbi-models";
import { interactivityFilterService } from "powerbi-visuals-utils-interactivityutils";
import extractFilterColumnTarget = interactivityFilterService.extractFilterColumnTarget;

// 引入格式设置服务和模型
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualSettingsModel } from "./settings";

// React 相关
import * as React from "react";
import { render } from "react-dom";
import DateCardClass from "./dateRangeSelector";
import { getInitRange } from "./dateutils";

export class Visual implements IVisual {
  // 定义必要的属性
  private target: HTMLElement;  // 目标 HTML 元素
  private reactRoot: React.ComponentElement<any, any>;  // React 根元素
  private formattingSettings: VisualSettingsModel;  // 格式化设置模型
  private previousSettings: VisualSettingsModel | null = null;  // 上一次的格式设置
  private formattingSettingsService: FormattingSettingsService;  // 格式化服务实例
  private static filterObjectProperty = { objectName: "general", propertyName: "filter" };  // 过滤对象属性
  private filterTarget!: IFilterColumnTarget;  // 筛选目标
  private initialized: boolean = false;  // 是否已初始化
  private dateInitRange: string;  // 初始日期范围
  public start: Date | null = null;  // 起始日期
  public end: Date | null = null;  // 结束日期
  private rangeScope = { start: null, end: null };  // 日期范围
  private dateRangeFilter = { start: null, end: null };  // 日期范围筛选器
  private prevFilteredStartDate: Date | null = null;  // 上次筛选的起始日期
  private prevFilteredEndDate: Date | null = null;  // 上次筛选的结束日期
  private host: powerbi.extensibility.visual.IVisualHost;  // Power BI 主机

  constructor(options: VisualConstructorOptions) {
    // 初始化格式化设置服务
    this.formattingSettingsService = new FormattingSettingsService();
    // 初始化 React 组件，设置事件监听器
    this.reactRoot = React.createElement(DateCardClass, {
      onChanged: this.handleVal,  // 日期更改事件处理函数
    });
    this.target = options.element;  // 获取目标元素
    this.host = options.host;  // 获取主机对象
    render(this.reactRoot, this.target);  // 渲染 React 组件到目标元素
  }

  // 当数据更新时被调用
  public update(options: VisualUpdateOptions) {
    if (!Visual.areOptionsValid(options)) {
      this.clearData();  // 清除数据
      return null;
    }

    // 获取格式设置
    this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
      VisualSettingsModel,
      options.dataViews
    );

    const isDataUpdate = options.type === VisualUpdateType.Data || this.rangeScope.start === null;
    const isSettingsUpdate = this.previousSettings !== this.formattingSettings;

    const dataView: DataView = options.dataViews[0];

    if (Visual.isDataViewValid(dataView)) {
      this.clearData();
      return null;
    }

    // 设置滑动条的日期范围
    if (isDataUpdate || !this.initialized) {
      const cat: powerbi.DataViewCategoryColumn = dataView.categorical.categories[0];
      const len: number = cat.values.length - 1;

      // 初始化筛选器目标
      this.filterTarget = extractFilterColumnTarget(cat);
      this.setFilterValues(options.jsonFilters as AdvancedFilter[]);

      // 获取最小和最大日期
      const minDate: Date = this.parseDate(cat.values[0]);
      const maxDate: Date = this.parseDate(cat.values[len]);
      this.rangeScope = { start: minDate, end: maxDate };

      DateCardClass.update({ rangeScope: this.rangeScope });
    }

    this.initializeValues(isSettingsUpdate);
  }

  // 初始化值
  private initializeValues = (isSettingsUpdate: boolean) => {
    const calendar = this.formattingSettings.calendarCard;
    const startRange = calendar.startRange.value.toString();

    // 检查是否需要同步初始范围
    if (
      startRange === "sync" ||
      (this.dateInitRange === startRange && this.start) 
    ) {
      this.dateRangeFilter = {
        start: this.start === null ? this.rangeScope.start : this.start,
        end: this.end === null ? this.rangeScope.end : this.end,
      };
    } else {
      this.dateRangeFilter = getInitRange(
        startRange,
        this.getDayNum(calendar.weekStartDay.value.valueOf()),
        this.getNum(calendar.yearStartMonth.value.valueOf()),
        this.rangeScope
      );
      this.dateInitRange = startRange;
    }

    DateCardClass.update({ dates: this.dateRangeFilter });
    this.handleVal([this.dateRangeFilter.start, this.dateRangeFilter.end]);

    this.initialized = true;

    if (isSettingsUpdate) {
      this.previousSettings = this.formattingSettings;
      const style = this.formattingSettings.styleCard;
      const config = this.formattingSettings.configCard;

      DateCardClass.update({
        weekStartDay: this.getDayNum(calendar.weekStartDay.value.valueOf()),
        yearStartMonth: this.getNum(calendar.yearStartMonth.value.valueOf()),
        themeColor: style.themeColor.value.value,
        themeFont: style.themeFont.value,
        themeMode: style.themeMode.value,
        showHelpIcon: config.showHelpIcon.value,
        showSlider: !config.showSlider.value,
      });
    }
  };

  // 清除数据
  private clearData(): void {
    this.initialized = false;
    this.dateInitRange = "";
  }

  // 获取数字
  private getNum = (n: number | string) => {
    return typeof n === "number" ? n : parseInt(n, 10);
  };

  // 获取星期数字
  private getDayNum = (n: number | string): 0 | 1 | 2 | 3 | 4 | 5 | 6 => {
    const num = typeof n === "number" ? n : parseInt(n, 10);
    const dayIndex = num % 7;
    return dayIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  };

  /**
   * React 日期更改事件监听器
   */
  private handleVal = (value: [Date, Date]) => {
    this.start = value[0];
    this.end = value[1];
    this.dateRangeFilter = { start: this.start, end: this.end };
    this.updatePrevFilterState(this.start, this.end, this.filterTarget);
  };

  // 设置筛选器值
  private setFilterValues = (jsonFilters: AdvancedFilter[]) => {
    if (
      jsonFilters &&
      jsonFilters[0] &&
      jsonFilters[0].conditions &&
      jsonFilters[0].conditions[0] &&
      jsonFilters[0].conditions[1]
    ) {
      const startDate: Date = new Date(${jsonFilters[0].conditions[0].value});
      const endDate: Date = new Date(${jsonFilters[0].conditions[1].value});

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        this.start = startDate;
        this.end = endDate;
      } else {
        this.start = null;
      }
    } else {
      this.start = null;
    }
  };

  // 应用日期筛选
  public applyDatePeriod(
    startDate: Date,
    endDate: Date,
    filterTarget: IFilterColumnTarget
  ): void {
    this.host.applyJsonFilter(
      this.createFilter(startDate, endDate, filterTarget),
      Visual.filterObjectProperty.objectName,
      Visual.filterObjectProperty.propertyName,
      this.getFilterAction(startDate, endDate)
    );
  }

  // 创建筛选器
  public createFilter(
    startDate: Date,
    endDate: Date,
    filterTarget: IFilterColumnTarget
  ): AdvancedFilter {
    if (startDate == null || endDate == null || !filterTarget) {
      return null;
    }

    return new AdvancedFilter(
      filterTarget,
      "And",
      {
        operator: "GreaterThanOrEqual",
        value: startDate.toJSON(),
      },
      {
        operator: "LessThanOrEqual",
        value: endDate.toJSON(),
      }
    );
  }

  // 清除筛选
  public clearSelection(target: IFilterColumnTarget): void {
    this.prevFilteredStartDate = null;
    this.prevFilteredEndDate = null;
    this.applyDatePeriod(null, null, target);
  }

  // 更新之前的筛选状态
  private updatePrevFilterState(
    startDate: Date,
    endDate: Date,
    target: IFilterColumnTarget
  ): void {
    const isFilterChanged: boolean =
      String(this.prevFilteredStartDate) !== String(startDate) ||
      String(this.prevFilteredEndDate) !== String(endDate);

    if (isFilterChanged) {
      this.applyDatePeriod(startDate, endDate, target);
    }

    this.prevFilteredStartDate = startDate;
    this.prevFilteredEndDate = endDate;
  }

  // 获取筛选操作类型
  public getFilterAction(startDate: Date, endDate: Date): powerbi.FilterAction {
    return startDate !== null && endDate !== null
      ? powerbi.FilterAction.merge
      : powerbi.FilterAction.remove;
  }

  // 验证更新选项是否有效
  private static areOptionsValid(
    options: powerbi.extensibility.visual.VisualUpdateOptions
  ): boolean {
    return (
      !options ||
      !options.dataViews ||
      !options.dataViews[0] ||
      !options.dataViews[0].metadata ||
      !Visual.isDataViewCategoricalValid(options.dataViews[0].categorical)
    );
  }

  // 验证分类数据视图是否有效
  private static isDataViewCategoricalValid(
    dataViewCategorical: powerbi.DataViewCategorical
  ): boolean {
    return (
      !dataViewCategorical ||
      !dataViewCategorical.categories ||
      dataViewCategorical.categories.length !== 1 ||
      !dataViewCategorical.categories[0].values ||
      dataViewCategorical.categories[0].values.length === 0 ||
      !dataViewCategorical.categories[0].source ||
      !dataViewCategorical.categories[0].source.type.dateTime
    );
  }

  // 验证数据视图是否有效
  private static isDataViewValid(dataView: powerbi.DataView): boolean {
    return (
      !dataView ||
      !dataView.categorical ||
      !dataView.metadata ||
      dataView.categorical.categories.length <= 0 ||
      !dataView.categorical.categories[0] ||
      !dataView.categorical.categories[0].identityFields ||
      dataView.categorical.categories[0].identityFields.length <= 0
    );
  }

  // 解析日期
  private parseDate(value: any): Date | null {
    const typeOfValue: string = typeof value;
    let date: Date = value;

    if (typeOfValue === "number") {
      date = new Date(value, 0);
    }

    if (typeOfValue === "string") {
      date = new Date(value);
    }

    if (date && date instanceof Date && date.toString() !== "Invalid Date") {
      return this.getYmd(date);
    }

    return null;
  }

  // 获取日期的年、月、日
  private getYmd(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /**
   * 返回属性窗格格式化模型内容
   */
  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
