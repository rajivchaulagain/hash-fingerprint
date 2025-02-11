export type FingerprintOptions =  {
    useBrowserInfo?: boolean;
    useOSInfo?: boolean;
    useCanvas?: boolean;
    useWebGL?: boolean;
    usePlugins?: boolean;
    customData?: Record<string, any>;
}