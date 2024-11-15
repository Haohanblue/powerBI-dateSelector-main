import * as React from "react";
import { dateCardProps } from "./interface";
export default class DateCardClass extends React.Component<{
    onChanged: (arg0: any) => void;
}, dateCardProps> {
    private static updateCallback?;
    datesLoaded: boolean;
    static update(newState: dateCardProps): void;
    state: dateCardProps;
    constructor(props: any);
    onDateChanged: (e: Date[]) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
