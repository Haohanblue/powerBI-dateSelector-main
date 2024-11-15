import * as React from "react";
import 'antd/dist/reset.css';
interface DateFieldProps {
    id: "start" | "end";
    value: Date | null;
    error?: boolean;
    onChange: (date: Date | null, dateString: string) => void;
    onFocus: () => void;
}
export declare const DateField: React.FC<DateFieldProps>;
export {};
