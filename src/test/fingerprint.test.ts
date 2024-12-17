import { generateFingerprint, getBrowserInfo, getOSInfo, hashData } from '../index';

function runTests() {
  console.log("=== Functional Fingerprint Library Tests ===");

  // Test Case 1: Default options
  console.log("Test 1 - Default Options:");
  const defaultFingerprint = generateFingerprint();
  console.log("Fingerprint:", defaultFingerprint);

  // Test Case 2: Only Browser Info
  console.log("\nTest 2 - Browser Info Only:");
  const browserOnlyFingerprint = generateFingerprint({
    useBrowserInfo: true,
    useOSInfo: false,
  });
  console.log("Fingerprint:", browserOnlyFingerprint);

  // Test Case 3: Only OS Info
  console.log("\nTest 3 - OS Info Only:");
  const osOnlyFingerprint = generateFingerprint({
    useBrowserInfo: false,
    useOSInfo: true,
  });
  console.log("Fingerprint:", osOnlyFingerprint);

  // Test Case 4: Custom Data
  console.log("\nTest 4 - Custom Data:");
  const customDataFingerprint = generateFingerprint({
    customData: { userId: 12345, sessionId: "abc123" },
  });
  console.log("Fingerprint:", customDataFingerprint);

  // Test Case 5: Individual Function Tests
  console.log("\nTest 5 - Individual Functions:");
  const browserInfo = getBrowserInfo();
  const osInfo = getOSInfo();
  const hashedData = hashData("Test Data");
  console.log("Browser Info:", browserInfo);
  console.log("OS Info:", osInfo);
  console.log("Hashed Data:", hashedData);
}

// Run all tests
runTests();
