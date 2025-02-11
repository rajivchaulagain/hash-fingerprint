# Unique Fingerprint

A simple library to generate a unique fingerprint based on browser and OS information, and custom data using hashing (SHA-256).

## Installation

To install the package, run:

```bash
npm install unique-fingerprintjs
```

## Usage

Import the library:

```typescript
import { generateFingerprint } from 'unique-fingerprintjs';
```

### Basic usage with browser and OS info:

```typescript
const fingerprint1 = await generateFingerprint();
console.log(fingerprint1); // Outputs the hashed fingerprint
```

### Usage with custom data and no OS info:

```typescript
const fingerprint2 = await generateFingerprint({
  useOSInfo: false,
  customData: { user_id: '12345', session_id: 'abcde' }
});
console.log(fingerprint2);
```

## Options

The `generateFingerprint` function accepts an options object:

```typescript
interface FingerprintOptions {
    useBrowserInfo?: boolean; // Whether to include browser info. default value is true
    useOSInfo?: boolean;      // Whether to include OS info. default value is true
    useCanvas?: boolean;      // Whether to use Canvas fingerprinting. default value is true
    useWebGL?: boolean;       // Whether to use WebGL fingerprinting. default value is true
    usePlugins?: boolean;     // Whether to include browser plugins info. default value is true
    customData?: Record<string, any>; // Additional custom data
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
