"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFingerprint = void 0;
var sortObjectKeys = function (obj) {
    try {
        if (typeof obj !== 'object' || obj === null)
            return obj;
        if (Array.isArray(obj))
            return obj.map(sortObjectKeys);
        return Object.keys(obj).sort().reduce(function (sorted, key) {
            sorted[key] = sortObjectKeys(obj[key]);
            return sorted;
        }, {});
    }
    catch (error) {
        console.warn('Error sorting object keys:', error);
        return obj;
    }
};
var getScreenInfo = function () {
    try {
        return typeof screen !== 'undefined' ? {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth
        } : null;
    }
    catch (error) {
        console.warn('Error getting screen info:', error);
        return null;
    }
};
var getNavigatorInfo = function () {
    var _a;
    try {
        if (typeof navigator === 'undefined')
            return null;
        return {
            userAgent: navigator.userAgent || "Unknown",
            language: navigator.language || "Unknown",
            hardwareConcurrency: navigator.hardwareConcurrency || 0,
            deviceMemory: navigator.deviceMemory || null,
            maxTouchPoints: navigator.maxTouchPoints || 0,
            platform: ((_a = navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) || navigator.platform || "Unknown"
        };
    }
    catch (error) {
        console.warn('Error getting navigator info:', error);
        return null;
    }
};
var getTimeZone = function () {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    catch (error) {
        console.warn('Error getting time zone:', error);
        return "Unknown";
    }
};
var getCanvasFingerprint = function () {
    try {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return null;
        ctx.fillStyle = 'rgb(255,0,255)';
        ctx.fillRect(0, 0, 2, 2);
        ctx.fillStyle = 'rgb(0,255,255)';
        ctx.fillRect(0, 0, 1, 1);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        return Array.from(imageData).slice(0, 100).join('');
    }
    catch (error) {
        console.warn('Error getting canvas fingerprint:', error);
        return null;
    }
};
var getWebGLInfo = function () {
    try {
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl')
            || canvas.getContext('experimental-webgl');
        if (!gl)
            return null;
        var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return debugInfo ? {
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
            renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        } : null;
    }
    catch (error) {
        console.warn('Error getting WebGL info:', error);
        return null;
    }
};
var detectOS = function () {
    try {
        var ua = navigator.userAgent;
        if (/windows phone/i.test(ua))
            return 'Windows Phone';
        if (/win(dows|64|32)/i.test(ua))
            return 'Windows';
        if (/macintosh|mac os x/i.test(ua))
            return 'MacOS';
        if (/android/i.test(ua))
            return 'Android';
        if (/linux/i.test(ua))
            return 'Linux';
        if (/ipad|iphone|ipod/i.test(ua))
            return 'iOS';
        return 'Unknown OS';
    }
    catch (error) {
        console.warn('Error detecting OS:', error);
        return 'Unknown OS';
    }
};
var generateFingerprint = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (options) {
        var components, _a, useBrowserInfo, _b, useOSInfo, _c, useCanvas, _d, useWebGL, _e, usePlugins, _f, customData, sortedData, dataString, encoder, dataBuffer, hashBuffer, hashArray, error_1;
        var _g;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 2, , 3]);
                    components = {};
                    _a = options.useBrowserInfo, useBrowserInfo = _a === void 0 ? true : _a, _b = options.useOSInfo, useOSInfo = _b === void 0 ? true : _b, _c = options.useCanvas, useCanvas = _c === void 0 ? true : _c, _d = options.useWebGL, useWebGL = _d === void 0 ? true : _d, _e = options.usePlugins, usePlugins = _e === void 0 ? true : _e, _f = options.customData, customData = _f === void 0 ? {} : _f;
                    if (useBrowserInfo) {
                        components.screen = getScreenInfo();
                        components.navigator = getNavigatorInfo();
                        components.timeZone = getTimeZone();
                        if (useCanvas)
                            components.canvas = getCanvasFingerprint();
                        if (useWebGL)
                            components.webGL = getWebGLInfo();
                        if (usePlugins)
                            components.plugins = ((_g = getNavigatorInfo()) === null || _g === void 0 ? void 0 : _g.plugins) || null;
                    }
                    if (useOSInfo)
                        components.os = detectOS();
                    if (Object.keys(customData).length > 0)
                        components.customData = customData;
                    sortedData = sortObjectKeys(components);
                    dataString = JSON.stringify(sortedData);
                    encoder = new TextEncoder();
                    dataBuffer = encoder.encode(dataString);
                    return [4 /*yield*/, crypto.subtle.digest('SHA-256', dataBuffer)];
                case 1:
                    hashBuffer = _h.sent();
                    hashArray = Array.from(new Uint8Array(hashBuffer));
                    return [2 /*return*/, hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('')];
                case 2:
                    error_1 = _h.sent();
                    console.error('Error generating fingerprint:', error_1);
                    return [2 /*return*/, 'ErrorGeneratingFingerprint'];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.generateFingerprint = generateFingerprint;
