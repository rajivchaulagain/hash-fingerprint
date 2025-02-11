import { generateFingerprint } from "../index";

describe("Fingerprint Generation Tests", () => {
  test("Test 1 - Default Options", async () => {
    const fingerprint = await generateFingerprint();
    console.log("Default Fingerprint:", fingerprint);
    expect(typeof fingerprint).toBe("string");
    expect(fingerprint.length).toBeGreaterThan(0);
  });

  test("Test 2 - Browser Info Only", async () => {
    const fingerprint = await generateFingerprint({
      useBrowserInfo: true,
      useOSInfo: false,
    });
    console.log("Browser Only Fingerprint:", fingerprint);
    expect(typeof fingerprint).toBe("string");
    expect(fingerprint.length).toBeGreaterThan(0);
  });

  test("Test 3 - OS Info Only", async () => {
    const fingerprint = await generateFingerprint({
      useBrowserInfo: false,
      useOSInfo: true,
    });
    console.log("OS Only Fingerprint:", fingerprint);
    expect(typeof fingerprint).toBe("string");
    expect(fingerprint.length).toBeGreaterThan(0);
  });

  test("Test 4 - Custom Data Fingerprint", async () => {
    const fingerprint = await generateFingerprint({
      customData: { userId: 12345, sessionId: "abc123" },
    });
    console.log("Custom Data Fingerprint:", fingerprint);
    expect(typeof fingerprint).toBe("string");
    expect(fingerprint.length).toBeGreaterThan(0);
  });

  test("Test 5 - Consistency Check", async () => {
    const fingerprint1 = await generateFingerprint();
    const fingerprint2 = await generateFingerprint();
    console.log("Fingerprint Consistency Check:", fingerprint1, fingerprint2);
    expect(fingerprint1).toBe(fingerprint2);
  });

  test("Test 6 - Different Custom Data Should Yield Different Hashes", async () => {
    const fingerprint1 = await generateFingerprint({ customData: { userId: 1 } });
    const fingerprint2 = await generateFingerprint({ customData: { userId: 2 } });
    console.log("Different Custom Data Check:", fingerprint1, fingerprint2);
    expect(fingerprint1).not.toBe(fingerprint2);
  });
});
