import React from "react";
import { Interval } from "date-fns";
interface DateIntervalPickerProps {
    children: React.ReactNode;
    baseDate?: Date;
    stepValue: string;
    handleVal?: (interval: Interval) => void;
}
declare const DateIntervalPicker: React.FC<DateIntervalPickerProps>;
export default DateIntervalPicker;
