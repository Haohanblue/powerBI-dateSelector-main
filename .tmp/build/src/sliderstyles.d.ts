export declare const style: {
    readonly width: "98%";
    readonly "& .MuiSlider-rail": {
        readonly opacity: 0.28;
        readonly height: "1px";
    };
};
export declare const styleB: {
    readonly marginTop: -6;
    readonly "& .MuiSlider-thumb": {
        readonly width: 4;
        readonly height: 4;
        readonly "&:hover": {
            readonly boxShadow: "0 0 0 6px rgba(58, 133, 137, 0.16)";
        };
    };
    readonly "& .MuiSlider-markLabel": {
        readonly fontSize: "0.65rem";
        readonly top: 24;
    };
    readonly "& .MuiSlider-track": {
        readonly height: 3;
        readonly opacity: 0.38;
        readonly "&:hover": {
            readonly boxShadow: "0 0 0 2px rgba(58, 133, 137, 0.16)";
        };
        readonly color: "secondary";
    };
};
export declare const styleT: {
    readonly zIndex: 999;
    readonly marginTop: 0;
    readonly "& .MuiSlider-thumb": {
        readonly width: 11;
        readonly height: 11;
        readonly transition: "0.3s cubic-bezier(.47,1.64,.41,.8)";
        readonly "&:hover": {
            readonly boxShadow: "0 0 0 6px rgba(58, 133, 137, 0.16)";
        };
        readonly "&:before": {
            readonly boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)";
        };
    };
    readonly "& .MuiSlider-markLabel": {
        readonly fontSize: "0.65rem";
        readonly fontWeight: 500;
        readonly top: 0;
    };
};
export declare const styleTab: {
    readonly minHeight: "auto";
    readonly padding: 0;
    readonly top: -2;
    readonly minWidth: 15;
    readonly fontSize: 11;
    readonly fontWeight: 500;
    readonly "&.Mui-focusVisible": {
        readonly backgroundColor: "rgba(100, 95, 228, 0.32)";
    };
};
export declare const styleTabs: {
    readonly "& .MuiTabs-indicator": {
        readonly top: 13;
        readonly display: "flex";
        readonly justifyContent: "center";
    };
    readonly "& .MuiTabs-indicatorSpan": {
        readonly maxWidth: 10;
        readonly width: "10px";
    };
};
