import { FingerprintOptions } from "./types";
import { detectOS, getCanvasFingerprint, getNavigatorInfo, getScreenInfo, getTimeZone, getWebGLInfo, sortObjectKeys } from "./utils";

export const generateFingerprint = async (options: FingerprintOptions = {}): Promise<string> => {
    try {
        const components: Record<string, any> = {};
        const {
            useBrowserInfo = true,
            useOSInfo = true,
            useCanvas = true,
            useWebGL = true,
            usePlugins = true,
            customData = {}
        } = options;

        if (useBrowserInfo) {
            components.screen = getScreenInfo();
            components.navigator = getNavigatorInfo();
            components.timeZone = getTimeZone();

            if (useCanvas) components.canvas = getCanvasFingerprint();
            if (useWebGL) components.webGL = getWebGLInfo();
            if (usePlugins) components.plugins = getNavigatorInfo()?.plugins || null;
        }

        if (useOSInfo) components.os = detectOS();
        if (Object.keys(customData).length > 0) components.customData = customData;

        const sortedData = sortObjectKeys(components);
        const dataString = JSON.stringify(sortedData);

        // Hash using SHA-256
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(dataString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        console.error('Error generating fingerprint:', error);
        return 'ErrorGeneratingFingerprint';
    }
};
