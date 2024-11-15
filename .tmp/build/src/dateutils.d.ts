import addDays from "date-fns/addDays";
import { stepBool, dateRange, SliderProps } from "./interface";
type MoveParms = {
    isBack: boolean;
    placement: "left" | "right" | "bottom";
    iconLabel: string;
    reduceExpand: string;
    iconT: JSX.Element;
    iconB: JSX.Element;
    topRow1: string;
    detailRow1: string;
    topRow2: string;
    detailRow2: string;
};
export declare const moveParms: (bf: string, vert: boolean, ctrl: boolean, stepValue: string) => MoveParms;
export declare const getIntervalFunction: (stepValue: string) => typeof addDays;
/** Initial Range set up **/
export declare const day: (i: number, startBaseDate?: Date, endBaseDate?: Date) => dateRange;
export declare const week: (i: number, w: 0 | 1 | 2 | 3 | 4 | 5 | 6, startBaseDate?: Date, full?: boolean) => dateRange;
export declare const month: (i: number, startBaseDate?: Date, endBaseDate?: Date) => dateRange;
export declare const quarter: (i: number) => dateRange;
export declare const year: (i: number, yearStartMonth: number) => dateRange;
export declare const getInitRange: (startRange: string, weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6, yearStartMonth?: number, rangeScope?: dateRange, rtn?: string) => any;
export declare const getRange: (fn: string, step: string, dates: any) => any;
/** Current Period Parameters */
export declare const Increment: (stepViz: stepBool, weekStartDay: 0 | 1 | 2 | 3 | 4 | 5 | 6, yearStartMonth: number, payProps?: any, vizOpt?: boolean, scope?: Interval) => {
    tip: string;
    step: string;
    show: boolean;
    thisPeriod: string;
    thisRange: any;
    icon: JSX.Element;
}[];
export declare const sliderMarkNumber: (val: Date, min: Date) => number;
export declare const sliderMarkDate: (val: number, min: Date) => Date;
export declare const sliderMarkText: (num: number, min: Date, fmt?: string) => string;
type StepMinor = "day" | "week" | "pay" | "month" | "quarter" | "year";
type StepMajor = "day" | "week" | "pay" | "month" | "quarter" | "year";
export declare const stepMinor: Record<StepMinor, StepMajor>;
export declare const stepMajor: Record<StepMajor, StepMajor>;
export declare function closest(needle: any, haystack: any): any;
export declare const createMarks: (period: string, range: dateRange, weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6, yearStart: number, pay: any) => any;
export declare const doMarks: (_val: any, _fmt: any, _min: Date, _skip: number, _offset: number) => any;
export declare const buildMarks: (period: string, props: SliderProps) => any;
export declare const mainMarks: (props: SliderProps) => any;
export declare const superMarks: (props: SliderProps) => any;
export declare const uniqueDate: (_array: Date[]) => Date[];
/** Date field input parameters and checks */
export declare const inputParms: (dates: dateRange, rangeScope: dateRange) => {
    string: string;
    duration: string;
    fmDoW: string;
    toDoW: string;
    fmValid: boolean;
    toValid: boolean;
};
export {};
