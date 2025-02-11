
export const sortObjectKeys = (obj: any): any => {
    try {
        if (typeof obj !== 'object' || obj === null) return obj;
        if (Array.isArray(obj)) return obj.map(sortObjectKeys);
        return Object.keys(obj).sort().reduce((sorted: any, key) => {
            sorted[key] = sortObjectKeys(obj[key]);
            return sorted;
        }, {});
    } catch (error) {
        console.warn('Error sorting object keys:', error);
        return obj;
    }
};

export const getScreenInfo = (): Record<string, number> | null => {
    try {
        return typeof screen !== 'undefined' ? {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth
        } : null;
    } catch (error) {
        console.warn('Error getting screen info:', error);
        return null;
    }
};

export const getNavigatorInfo = (): Record<string, any> | null => {
    try {
        if (typeof navigator === 'undefined') return null;
        return {
            userAgent: navigator.userAgent || "Unknown",
            language: navigator.language || "Unknown",
            hardwareConcurrency: navigator.hardwareConcurrency || 0,
            deviceMemory: (navigator as any).deviceMemory || null,
            maxTouchPoints: navigator.maxTouchPoints || 0,
            platform: (navigator as any).userAgentData?.platform || navigator.platform || "Unknown"
        };
    } catch (error) {
        console.warn('Error getting navigator info:', error);
        return null;
    }
};

export const getTimeZone = (): string => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
        console.warn('Error getting time zone:', error);
        return "Unknown";
    }
};

export const getCanvasFingerprint = (): string | null => {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.fillStyle = 'rgb(255,0,255)';
        ctx.fillRect(0, 0, 2, 2);
        ctx.fillStyle = 'rgb(0,255,255)';
        ctx.fillRect(0, 0, 1, 1);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        return Array.from(imageData).slice(0, 100).join('');
    } catch (error) {
        console.warn('Error getting canvas fingerprint:', error);
        return null;
    }
};

export const getWebGLInfo = (): Record<string, string> | null => {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') as WebGLRenderingContext | null 
            || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
        if (!gl) return null;

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return debugInfo ? {
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string,
            renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string
        } : null;
    } catch (error) {
        console.warn('Error getting WebGL info:', error);
        return null;
    }
};

export const detectOS = (): string => {
    try {
        const ua = navigator.userAgent;
        if (/windows phone/i.test(ua)) return 'Windows Phone';
        if (/win(dows|64|32)/i.test(ua)) return 'Windows';
        if (/macintosh|mac os x/i.test(ua)) return 'MacOS';
        if (/android/i.test(ua)) return 'Android';
        if (/linux/i.test(ua)) return 'Linux';
        if (/ipad|iphone|ipod/i.test(ua)) return 'iOS';
        return 'Unknown OS';
    } catch (error) {
        console.warn('Error detecting OS:', error);
        return 'Unknown OS';
    }
};
