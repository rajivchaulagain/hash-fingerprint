import * as os from "os";
import { createHash } from "crypto";

interface FingerprintOptions {
    useBrowserInfo?: boolean; // Whether to include browser info
    useOSInfo?: boolean;      // Whether to include OS info
    customData?: Record<string, any>; // Additional custom data
}

// Function to collect browser information
const getBrowserInfo = (): string => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        return `${navigator.userAgent} ${navigator.language}`;
    }

    return "Browser info unavailable";
};

// Function to collect OS information
const getOSInfo = (): string => {
    try {
        return `${os.platform()} ${os.release()} ${os.arch()}`;
    } catch (error) {
        return "OS info unavailable (non-Node.js environment)";
    }
};

// Function to hash data using SHA-256
const hashData = (data: string): string => {
    return createHash("sha256").update(data).digest("hex");
};

// Main fingerprint generation function
const generateFingerprint = (options: FingerprintOptions = {}): string => {
    const {
        useBrowserInfo = true,
        useOSInfo = true,
        customData = {},
    } = options;

    let data = "";

    if (useBrowserInfo) {
        data += getBrowserInfo();
    }

    if (useOSInfo) {
        data += getOSInfo();
    }

    if (customData) {
        data += JSON.stringify(customData);
    }


    return hashData(data);
};

// Export the main function
export { generateFingerprint, getBrowserInfo, getOSInfo, hashData };

