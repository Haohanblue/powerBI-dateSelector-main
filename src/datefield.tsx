import * as React from "react";
import { DatePicker } from "antd";
import 'antd/dist/reset.css'; // 更新引入路径
import dayjs from "dayjs";

interface DateFieldProps {
  id: "start" | "end";
  value: Date | null;
  error?: boolean;
  onChange: (date: Date | null, dateString: string) => void;
  onFocus: () => void;
}

export const DateField: React.FC<DateFieldProps> = ({
  id,
  value,
  error,
  onChange,
  onFocus,
}) => {
  return (
    <DatePicker
      id={id}
      showTime
      onChange={(dateDayjs, dateString: string) => {
        const date = dateDayjs ? dateDayjs.toDate() : null;
        onChange(date, dateString);
      }}
      onFocus={onFocus}
      value={value ? dayjs(value) : null}
      placeholder="选择日期和时间"
      status={error ? 'error' : undefined}
      style={{ width: 200 }}
    />
  );
};
