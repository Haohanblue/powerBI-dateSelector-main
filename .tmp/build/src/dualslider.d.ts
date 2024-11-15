import * as React from "react";
interface DualSliderProps {
    value: number[];
    step: number | null;
    showBottomSlider: boolean;
    mainMarks: Array<{
        value: number;
        label: string;
    }>;
    superMarks: Array<{
        value: number;
        label: string;
    }>;
    max: number;
    valueLabelFormat: (value: number) => string;
    handleTopCommit: (e: Event, val: number[]) => void;
    handleBottomCommit: (e: Event, val: number[]) => void;
    onChange: (event: Event, value: number | number[], activeThumb?: number) => void;
    onClick?: (event: React.SyntheticEvent) => void;
}
declare function DualSlider(props: DualSliderProps): JSX.Element;
export default DualSlider;
