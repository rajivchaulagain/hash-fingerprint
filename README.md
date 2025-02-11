# Unique Fingerprint

A simple library to generate a unique fingerprint based on browser and OS information, and custom data using hashing (SHA-256).

## Installation

To install the package, run:

```bash
npm install unique-fingerprintjs

## Usage

Import the library

import { generateFingerprint } from 'unique-fingerprintjs';

// Basic usage with browser and OS info
const fingerprint1 = generateFingerprint();
console.log(fingerprint1); // Outputs the hashed fingerprint

// Usage with custom data and no OS info
const fingerprint2 = generateFingerprint({
  useOSInfo: false,
  customData: { user_id: '12345', session_id: 'abcde' }
});

## options
interface FingerprintOptions {
    useBrowserInfo?: boolean; // Whether to include browser info
    useOSInfo?: boolean;      // Whether to include OS info
    customData?: Record<string, any>; // Additional custom data
}

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)# hash-fingerprint
