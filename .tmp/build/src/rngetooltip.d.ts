import * as React from "react";
import { TooltipProps } from "@mui/material/Tooltip";
declare const RngeTooltip: import("@emotion/styled").StyledComponent<TooltipProps & {
    shortCut?: string;
    topRow?: string;
    detailRow?: string;
    detailFlag?: boolean;
} & import("@mui/system").MUIStyledCommonProps<import("@mui/system").Theme>, {}, {}>;
export default RngeTooltip;
interface valueProps {
    children: React.ReactElement;
    value: number;
    index: number;
}
export declare function ValueLabel(props: valueProps): JSX.Element;
