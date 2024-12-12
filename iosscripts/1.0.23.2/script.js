"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from3, except, desc) => {
    if (from3 && typeof from3 === "object" || typeof from3 === "function") {
      for (let key of __getOwnPropNames(from3))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // script/node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "script/node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength2;
      exports.toByteArray = toByteArray2;
      exports.fromByteArray = fromByteArray2;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength2(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray2(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray2(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // script/node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "script/node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // script/node_modules/@frida/process/index.js
  function nextTick(callback, ...args) {
    Script.nextTick(callback, ...args);
  }
  function noop() {
  }
  function binding(name) {
    throw new Error("process.binding is not supported");
  }
  function cwd() {
    return Process.platform === "windows" ? "C:\\" : "/";
  }
  function chdir(dir) {
    throw new Error("process.chdir is not supported");
  }
  function umask() {
    return 0;
  }
  function detectPlatform() {
    const platform3 = Process.platform;
    return platform3 === "windows" ? "win32" : platform3;
  }
  var title, browser, platform, pid, env, argv, version, versions, on, addListener2, once2, off, removeListener2, removeAllListeners2, emit2, prependListener2, prependOnceListener2, listeners2, process_default;
  var init_process = __esm({
    "script/node_modules/@frida/process/index.js"() {
      title = "Frida";
      browser = false;
      platform = detectPlatform();
      pid = Process.id;
      env = {
        FRIDA_COMPILE: "1"
      };
      argv = [];
      version = Frida.version;
      versions = {};
      on = noop;
      addListener2 = noop;
      once2 = noop;
      off = noop;
      removeListener2 = noop;
      removeAllListeners2 = noop;
      emit2 = noop;
      prependListener2 = noop;
      prependOnceListener2 = noop;
      listeners2 = function(name) {
        return [];
      };
      process_default = {
        nextTick,
        title,
        browser,
        platform,
        pid,
        env,
        argv,
        version,
        versions,
        on,
        addListener: addListener2,
        once: once2,
        off,
        removeListener: removeListener2,
        removeAllListeners: removeAllListeners2,
        emit: emit2,
        prependListener: prependListener2,
        prependOnceListener: prependOnceListener2,
        listeners: listeners2,
        binding,
        cwd,
        chdir,
        umask
      };
    }
  });

  // script/node_modules/@frida/util/support/types.js
  var types_exports = {};
  __export(types_exports, {
    isAnyArrayBuffer: () => isAnyArrayBuffer,
    isArgumentsObject: () => isArgumentsObject,
    isArrayBuffer: () => isArrayBuffer,
    isArrayBufferView: () => isArrayBufferView,
    isAsyncFunction: () => isAsyncFunction,
    isBigInt64Array: () => isBigInt64Array,
    isBigIntObject: () => isBigIntObject,
    isBigUint64Array: () => isBigUint64Array,
    isBooleanObject: () => isBooleanObject,
    isBoxedPrimitive: () => isBoxedPrimitive,
    isDataView: () => isDataView,
    isExternal: () => isExternal,
    isFloat32Array: () => isFloat32Array,
    isFloat64Array: () => isFloat64Array,
    isGeneratorFunction: () => isGeneratorFunction,
    isGeneratorObject: () => isGeneratorObject,
    isInt16Array: () => isInt16Array,
    isInt32Array: () => isInt32Array,
    isInt8Array: () => isInt8Array,
    isMap: () => isMap,
    isMapIterator: () => isMapIterator,
    isModuleNamespaceObject: () => isModuleNamespaceObject,
    isNumberObject: () => isNumberObject,
    isPromise: () => isPromise,
    isProxy: () => isProxy,
    isSet: () => isSet,
    isSetIterator: () => isSetIterator,
    isSharedArrayBuffer: () => isSharedArrayBuffer,
    isStringObject: () => isStringObject,
    isSymbolObject: () => isSymbolObject,
    isTypedArray: () => isTypedArray,
    isUint16Array: () => isUint16Array,
    isUint32Array: () => isUint32Array,
    isUint8Array: () => isUint8Array,
    isUint8ClampedArray: () => isUint8ClampedArray,
    isWeakMap: () => isWeakMap,
    isWeakSet: () => isWeakSet,
    isWebAssemblyCompiledModule: () => isWebAssemblyCompiledModule
  });
  function isArgumentsObject(value) {
    if (value !== null && typeof value === "object" && Symbol.toStringTag in value) {
      return false;
    }
    return ObjectToString(value) === "[object Arguments]";
  }
  function isGeneratorFunction(value) {
    return Object.getPrototypeOf(value) === generatorPrototype;
  }
  function isTypedArray(value) {
    return value instanceof typedArrayPrototype;
  }
  function isPromise(input) {
    return input instanceof Promise;
  }
  function isArrayBufferView(value) {
    return ArrayBuffer.isView(value);
  }
  function isUint8Array(value) {
    return value instanceof Uint8Array;
  }
  function isUint8ClampedArray(value) {
    return value instanceof Uint8ClampedArray;
  }
  function isUint16Array(value) {
    return value instanceof Uint16Array;
  }
  function isUint32Array(value) {
    return value instanceof Uint32Array;
  }
  function isInt8Array(value) {
    return value instanceof Int8Array;
  }
  function isInt16Array(value) {
    return value instanceof Int16Array;
  }
  function isInt32Array(value) {
    return value instanceof Int32Array;
  }
  function isFloat32Array(value) {
    return value instanceof Float32Array;
  }
  function isFloat64Array(value) {
    return value instanceof Float64Array;
  }
  function isBigInt64Array(value) {
    return value instanceof BigInt64Array;
  }
  function isBigUint64Array(value) {
    return value instanceof BigUint64Array;
  }
  function isMap(value) {
    return ObjectToString(value) === "[object Map]";
  }
  function isSet(value) {
    return ObjectToString(value) === "[object Set]";
  }
  function isWeakMap(value) {
    return ObjectToString(value) === "[object WeakMap]";
  }
  function isWeakSet(value) {
    return ObjectToString(value) === "[object WeakSet]";
  }
  function isArrayBuffer(value) {
    return ObjectToString(value) === "[object ArrayBuffer]";
  }
  function isDataView(value) {
    return ObjectToString(value) === "[object DataView]";
  }
  function isSharedArrayBuffer(value) {
    return ObjectToString(value) === "[object SharedArrayBuffer]";
  }
  function isAsyncFunction(value) {
    return ObjectToString(value) === "[object AsyncFunction]";
  }
  function isMapIterator(value) {
    return ObjectToString(value) === "[object Map Iterator]";
  }
  function isSetIterator(value) {
    return ObjectToString(value) === "[object Set Iterator]";
  }
  function isGeneratorObject(value) {
    return ObjectToString(value) === "[object Generator]";
  }
  function isWebAssemblyCompiledModule(value) {
    return ObjectToString(value) === "[object WebAssembly.Module]";
  }
  function isNumberObject(value) {
    return checkBoxedPrimitive(value, numberValue);
  }
  function isStringObject(value) {
    return checkBoxedPrimitive(value, stringValue);
  }
  function isBooleanObject(value) {
    return checkBoxedPrimitive(value, booleanValue);
  }
  function isBigIntObject(value) {
    return checkBoxedPrimitive(value, bigIntValue);
  }
  function isSymbolObject(value) {
    return checkBoxedPrimitive(value, symbolValue);
  }
  function checkBoxedPrimitive(value, prototypeValueOf) {
    if (typeof value !== "object") {
      return false;
    }
    try {
      prototypeValueOf(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  function isBoxedPrimitive(value) {
    return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
  }
  function isAnyArrayBuffer(value) {
    return isArrayBuffer(value) || isSharedArrayBuffer(value);
  }
  function isProxy(value) {
    throwNotSupported("isProxy");
  }
  function isExternal(value) {
    throwNotSupported("isExternal");
  }
  function isModuleNamespaceObject(value) {
    throwNotSupported("isModuleNamespaceObject");
  }
  function throwNotSupported(method) {
    throw new Error(`${method} is not supported in userland`);
  }
  function uncurryThis(f) {
    return f.call.bind(f);
  }
  var ObjectToString, numberValue, stringValue, booleanValue, bigIntValue, symbolValue, generatorPrototype, typedArrayPrototype;
  var init_types = __esm({
    "script/node_modules/@frida/util/support/types.js"() {
      ObjectToString = uncurryThis(Object.prototype.toString);
      numberValue = uncurryThis(Number.prototype.valueOf);
      stringValue = uncurryThis(String.prototype.valueOf);
      booleanValue = uncurryThis(Boolean.prototype.valueOf);
      bigIntValue = uncurryThis(BigInt.prototype.valueOf);
      symbolValue = uncurryThis(Symbol.prototype.valueOf);
      generatorPrototype = Object.getPrototypeOf(function* () {
      });
      typedArrayPrototype = Object.getPrototypeOf(Int8Array);
    }
  });

  // script/node_modules/@frida/util/util.js
  function format(f) {
    if (!isString(f)) {
      const objects = [];
      for (let i2 = 0; i2 < arguments.length; i2++) {
        objects.push(inspect2(arguments[i2]));
      }
      return objects.join(" ");
    }
    let i = 1;
    const args = arguments;
    const len = args.length;
    let str = String(f).replace(formatRegExp, function(x) {
      if (x === "%%")
        return "%";
      if (i >= len)
        return x;
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
        default:
          return x;
      }
    });
    for (let x = args[i]; i < len; x = args[++i]) {
      if (isNull(x) || !isObject(x)) {
        str += " " + x;
      } else {
        str += " " + inspect2(x);
      }
    }
    return str;
  }
  function deprecate(fn, msg) {
    if (process_default.noDeprecation === true) {
      return fn;
    }
    let warned2 = false;
    function deprecated() {
      if (!warned2) {
        if (process_default.throwDeprecation) {
          throw new Error(msg);
        } else if (process_default.traceDeprecation) {
          console.trace(msg);
        } else {
          console.error(msg);
        }
        warned2 = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  }
  function debuglog(set) {
    set = set.toUpperCase();
    if (!debugs[set]) {
      if (debugEnvRegex.test(set)) {
        const pid2 = process_default.pid;
        debugs[set] = function() {
          const msg = format.apply(null, arguments);
          console.error("%s %d: %s", set, pid2, msg);
        };
      } else {
        debugs[set] = function() {
        };
      }
    }
    return debugs[set];
  }
  function inspect2(obj, opts) {
    const ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    if (arguments.length >= 3)
      ctx.depth = arguments[2];
    if (arguments.length >= 4)
      ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      ctx.showHidden = opts;
    } else if (opts) {
      _extend(ctx, opts);
    }
    if (isUndefined(ctx.showHidden))
      ctx.showHidden = false;
    if (isUndefined(ctx.depth))
      ctx.depth = 2;
    if (isUndefined(ctx.colors))
      ctx.colors = false;
    if (isUndefined(ctx.customInspect))
      ctx.customInspect = true;
    if (ctx.colors)
      ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  function stylizeWithColor(str, styleType) {
    const style = inspect2.styles[styleType];
    if (style) {
      return "\x1B[" + inspect2.colors[style][0] + "m" + str + "\x1B[" + inspect2.colors[style][1] + "m";
    } else {
      return str;
    }
  }
  function stylizeNoColor(str, styleType) {
    return str;
  }
  function arrayToHash(array) {
    const hash = {};
    array.forEach(function(val, idx) {
      hash[val] = true;
    });
    return hash;
  }
  function formatValue(ctx, value, recurseTimes) {
    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== inspect2 && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
      let ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
    const primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
    let keys = Object.keys(value);
    const visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }
    if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
      return formatError(value);
    }
    if (keys.length === 0) {
      if (isFunction(value)) {
        const name = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name + "]", "special");
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date");
      }
      if (isError(value)) {
        return formatError(value);
      }
    }
    let base2 = "", array = false, braces = ["{", "}"];
    if (isArray(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (isFunction(value)) {
      const n = value.name ? ": " + value.name : "";
      base2 = " [Function" + n + "]";
    }
    if (isRegExp(value)) {
      base2 = " " + RegExp.prototype.toString.call(value);
    }
    if (isDate(value)) {
      base2 = " " + Date.prototype.toUTCString.call(value);
    }
    if (isError(value)) {
      base2 = " " + formatError(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base2 + braces[1];
    }
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      } else {
        return ctx.stylize("[Object]", "special");
      }
    }
    ctx.seen.push(value);
    let output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base2, braces);
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize("undefined", "undefined");
    if (isString(value)) {
      const simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return ctx.stylize(simple, "string");
    }
    if (isNumber(value))
      return ctx.stylize("" + value, "number");
    if (isBoolean(value))
      return ctx.stylize("" + value, "boolean");
    if (isNull(value))
      return ctx.stylize("null", "null");
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    const output = [];
    for (let i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(
          ctx,
          value,
          recurseTimes,
          visibleKeys,
          String(i),
          true
        ));
      } else {
        output.push("");
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(
          ctx,
          value,
          recurseTimes,
          visibleKeys,
          key,
          true
        ));
      }
    });
    return output;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    let name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize("[Getter/Setter]", "special");
      } else {
        str = ctx.stylize("[Getter]", "special");
      }
    } else {
      if (desc.set) {
        str = ctx.stylize("[Setter]", "special");
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = "[" + key + "]";
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str.split("\n").map(function(line) {
              return "  " + line;
            }).join("\n").substr(2);
          } else {
            str = "\n" + str.split("\n").map(function(line) {
              return "   " + line;
            }).join("\n");
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special");
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify("" + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, "name");
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, "string");
      }
    }
    return name + ": " + str;
  }
  function reduceToSingleString(output, base2, braces) {
    let numLinesEst = 0;
    const length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf("\n") >= 0)
        numLinesEst++;
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) {
      return braces[0] + (base2 === "" ? "" : base2 + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    }
    return braces[0] + base2 + " " + output.join(", ") + " " + braces[1];
  }
  function isArray(ar) {
    return Array.isArray(ar);
  }
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  function isNull(arg) {
    return arg === null;
  }
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  function isNumber(arg) {
    return typeof arg === "number";
  }
  function isString(arg) {
    return typeof arg === "string";
  }
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === "[object RegExp]";
  }
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  function isDate(d) {
    return isObject(d) && objectToString(d) === "[object Date]";
  }
  function isError(e) {
    return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
  }
  function isFunction(arg) {
    return typeof arg === "function";
  }
  function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
    typeof arg === "undefined";
  }
  function isBuffer2(arg) {
    return arg instanceof Buffer;
  }
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  function pad(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
  }
  function timestamp() {
    const d = /* @__PURE__ */ new Date();
    const time = [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds())
    ].join(":");
    return [d.getDate(), months[d.getMonth()], time].join(" ");
  }
  function log() {
    console.log("%s - %s", timestamp(), format.apply(null, arguments));
  }
  function inherits(ctor, superCtor) {
    Object.defineProperty(ctor, "super_", {
      value: superCtor,
      writable: true,
      configurable: true
    });
    Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
  }
  function _extend(origin, add) {
    if (!add || !isObject(add))
      return origin;
    const keys = Object.keys(add);
    let i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  function promisify(original) {
    if (typeof original !== "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
      const fn2 = original[kCustomPromisifiedSymbol];
      if (typeof fn2 !== "function") {
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      }
      Object.defineProperty(fn2, kCustomPromisifiedSymbol, {
        value: fn2,
        enumerable: false,
        writable: false,
        configurable: true
      });
      return fn2;
    }
    function fn() {
      let promiseResolve, promiseReject;
      const promise = new Promise(function(resolve3, reject) {
        promiseResolve = resolve3;
        promiseReject = reject;
      });
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      args.push(function(err, value) {
        if (err) {
          promiseReject(err);
        } else {
          promiseResolve(value);
        }
      });
      try {
        original.apply(this, args);
      } catch (err) {
        promiseReject(err);
      }
      return promise;
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol)
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
    return Object.defineProperties(
      fn,
      Object.getOwnPropertyDescriptors(original)
    );
  }
  function callbackifyOnRejected(reason, cb) {
    if (!reason) {
      const newReason = new Error("Promise was rejected with a falsy value");
      newReason.reason = reason;
      reason = newReason;
    }
    return cb(reason);
  }
  function callbackify(original) {
    if (typeof original !== "function") {
      throw new TypeError('The "original" argument must be of type Function');
    }
    function callbackified() {
      const args = [];
      for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      const maybeCb = args.pop();
      if (typeof maybeCb !== "function") {
        throw new TypeError("The last argument must be of type Function");
      }
      const self = this;
      const cb = function() {
        return maybeCb.apply(self, arguments);
      };
      original.apply(this, args).then(
        function(ret) {
          process_default.nextTick(cb.bind(null, null, ret));
        },
        function(rej) {
          process_default.nextTick(callbackifyOnRejected.bind(null, rej, cb));
        }
      );
    }
    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(
      callbackified,
      Object.getOwnPropertyDescriptors(original)
    );
    return callbackified;
  }
  var types, util_default, formatRegExp, debugs, debugEnvRegex, months, kCustomPromisifiedSymbol;
  var init_util = __esm({
    "script/node_modules/@frida/util/util.js"() {
      init_types();
      init_process();
      types = {
        ...types_exports,
        isRegExp,
        isDate,
        isNativeError: isError
      };
      util_default = {
        format,
        deprecate,
        debuglog,
        inspect: inspect2,
        types,
        isArray,
        isBoolean,
        isNull,
        isNullOrUndefined,
        isNumber,
        isString,
        isSymbol,
        isUndefined,
        isRegExp,
        isObject,
        isDate,
        isError,
        isFunction,
        isPrimitive,
        isBuffer: isBuffer2,
        log,
        inherits,
        _extend,
        promisify,
        callbackify
      };
      formatRegExp = /%[sdj%]/g;
      debugs = {};
      debugEnvRegex = /^$/;
      if (process_default.env.NODE_DEBUG) {
        let debugEnv = process_default.env.NODE_DEBUG;
        debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
        debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
      }
      inspect2.custom = Symbol.for("nodejs.util.inspect.custom");
      inspect2.colors = {
        "bold": [1, 22],
        "italic": [3, 23],
        "underline": [4, 24],
        "inverse": [7, 27],
        "white": [37, 39],
        "grey": [90, 39],
        "black": [30, 39],
        "blue": [34, 39],
        "cyan": [36, 39],
        "green": [32, 39],
        "magenta": [35, 39],
        "red": [31, 39],
        "yellow": [33, 39]
      };
      inspect2.styles = {
        "special": "cyan",
        "number": "yellow",
        "boolean": "yellow",
        "undefined": "grey",
        "null": "bold",
        "string": "green",
        "date": "magenta",
        // "name": intentionally not styling
        "regexp": "red"
      };
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      kCustomPromisifiedSymbol = Symbol("util.promisify.custom");
      promisify.custom = kCustomPromisifiedSymbol;
    }
  });

  // script/node_modules/@frida/assert/internal/errors.js
  function createErrorType(code, message, Base) {
    if (!Base) {
      Base = Error;
    }
    function getMessage2(arg1, arg2, arg3) {
      if (typeof message === "string") {
        return message;
      } else {
        return message(arg1, arg2, arg3);
      }
    }
    class NodeError extends Base {
      constructor(arg1, arg2, arg3) {
        super(getMessage2(arg1, arg2, arg3));
        this.code = code;
      }
    }
    codes[code] = NodeError;
  }
  function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
      const len = expected.length;
      expected = expected.map((i) => String(i));
      if (len > 2) {
        return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
      } else if (len === 2) {
        return `one of ${thing} ${expected[0]} or ${expected[1]}`;
      } else {
        return `of ${thing} ${expected[0]}`;
      }
    } else {
      return `of ${thing} ${String(expected)}`;
    }
  }
  function startsWith(str, search2, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search2.length) === search2;
  }
  function endsWith(str, search2, this_len) {
    if (this_len === void 0 || this_len > str.length) {
      this_len = str.length;
    }
    return str.substring(this_len - search2.length, this_len) === search2;
  }
  function includes2(str, search2, start) {
    if (typeof start !== "number") {
      start = 0;
    }
    if (start + search2.length > str.length) {
      return false;
    } else {
      return str.indexOf(search2, start) !== -1;
    }
  }
  var codes;
  var init_errors = __esm({
    "script/node_modules/@frida/assert/internal/errors.js"() {
      init_util();
      codes = {};
      createErrorType("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
      createErrorType(
        "ERR_INVALID_ARG_TYPE",
        (name, expected, actual) => {
          let determiner;
          if (typeof expected === "string" && startsWith(expected, "not ")) {
            determiner = "must not be";
            expected = expected.replace(/^not /, "");
          } else {
            determiner = "must be";
          }
          let msg;
          if (endsWith(name, " argument")) {
            msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
          } else {
            const type = includes2(name, ".") ? "property" : "argument";
            msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
          }
          msg += `. Received type ${typeof actual}`;
          return msg;
        },
        TypeError
      );
      createErrorType("ERR_INVALID_ARG_VALUE", (name, value, reason = "is invalid") => {
        let inspected = util_default.inspect(value);
        if (inspected.length > 128) {
          inspected = `${inspected.slice(0, 128)}...`;
        }
        return `The argument '${name}' ${reason}. Received ${inspected}`;
      }, TypeError, RangeError);
      createErrorType("ERR_INVALID_RETURN_VALUE", (input, name, value) => {
        let type;
        if (value && value.constructor && value.constructor.name) {
          type = `instance of ${value.constructor.name}`;
        } else {
          type = `type ${typeof value}`;
        }
        return `Expected ${input} to be returned from the "${name}" function but got ${type}.`;
      }, TypeError);
      createErrorType(
        "ERR_MISSING_ARGS",
        (...args) => {
          let msg = "The ";
          const len = args.length;
          args = args.map((a) => `"${a}"`);
          switch (len) {
            case 1:
              msg += `${args[0]} argument`;
              break;
            case 2:
              msg += `${args[0]} and ${args[1]} arguments`;
              break;
            default:
              msg += args.slice(0, len - 1).join(", ");
              msg += `, and ${args[len - 1]} arguments`;
              break;
          }
          return `${msg} must be specified`;
        },
        TypeError
      );
    }
  });

  // script/node_modules/@frida/assert/internal/assert/assertion_error.js
  function endsWith2(str, search2, this_len) {
    if (this_len === void 0 || this_len > str.length) {
      this_len = str.length;
    }
    return str.substring(this_len - search2.length, this_len) === search2;
  }
  function repeat(str, count) {
    count = Math.floor(count);
    if (str.length == 0 || count == 0)
      return "";
    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
      str += str;
      count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  }
  function copyError(source) {
    const keys = Object.keys(source);
    const target = Object.create(Object.getPrototypeOf(source));
    keys.forEach((key) => {
      target[key] = source[key];
    });
    Object.defineProperty(target, "message", { value: source.message });
    return target;
  }
  function inspectValue(val) {
    return inspect2(
      val,
      {
        compact: false,
        customInspect: false,
        depth: 1e3,
        maxArrayLength: Infinity,
        // Assert compares only enumerable properties (with a few exceptions).
        showHidden: false,
        // Having a long line as error is better than wrapping the line for
        // comparison for now.
        // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
        // have meta information about the inspected properties (i.e., know where
        // in what line the property starts and ends).
        breakLength: Infinity,
        // Assert does not detect proxies currently.
        showProxy: false,
        sorted: true,
        // Inspect getters as we also check them when comparing entries.
        getters: true
      }
    );
  }
  function createErrDiff(actual, expected, operator) {
    let other = "";
    let res = "";
    let lastPos = 0;
    let end = "";
    let skipped = false;
    const actualInspected = inspectValue(actual);
    const actualLines = actualInspected.split("\n");
    const expectedLines = inspectValue(expected).split("\n");
    let i = 0;
    let indicator = "";
    if (operator === "strictEqual" && typeof actual === "object" && typeof expected === "object" && actual !== null && expected !== null) {
      operator = "strictEqualObject";
    }
    if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
      const inputLength = actualLines[0].length + expectedLines[0].length;
      if (inputLength <= kMaxShortLength) {
        if ((typeof actual !== "object" || actual === null) && (typeof expected !== "object" || expected === null) && (actual !== 0 || expected !== 0)) {
          return `${kReadableOperator[operator]}

${actualLines[0]} !== ${expectedLines[0]}
`;
        }
      } else if (operator !== "strictEqualObject") {
        const maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
        if (inputLength < maxLength) {
          while (actualLines[0][i] === expectedLines[0][i]) {
            i++;
          }
          if (i > 2) {
            indicator = `
  ${repeat(" ", i)}^`;
            i = 0;
          }
        }
      }
    }
    let a = actualLines[actualLines.length - 1];
    let b = expectedLines[expectedLines.length - 1];
    while (a === b) {
      if (i++ < 2) {
        end = `
  ${a}${end}`;
      } else {
        other = a;
      }
      actualLines.pop();
      expectedLines.pop();
      if (actualLines.length === 0 || expectedLines.length === 0)
        break;
      a = actualLines[actualLines.length - 1];
      b = expectedLines[expectedLines.length - 1];
    }
    const maxLines = Math.max(actualLines.length, expectedLines.length);
    if (maxLines === 0) {
      const actualLines2 = actualInspected.split("\n");
      if (actualLines2.length > 30) {
        actualLines2[26] = `${blue}...${white}`;
        while (actualLines2.length > 27) {
          actualLines2.pop();
        }
      }
      return `${kReadableOperator.notIdentical}

${actualLines2.join("\n")}
`;
    }
    if (i > 3) {
      end = `
${blue}...${white}${end}`;
      skipped = true;
    }
    if (other !== "") {
      end = `
  ${other}${end}`;
      other = "";
    }
    let printedLines = 0;
    const msg = kReadableOperator[operator] + `
${green}+ actual${white} ${red}- expected${white}`;
    const skippedMsg = ` ${blue}...${white} Lines skipped`;
    for (i = 0; i < maxLines; i++) {
      const cur = i - lastPos;
      if (actualLines.length < i + 1) {
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += `
${blue}...${white}`;
            skipped = true;
          } else if (cur > 3) {
            res += `
  ${expectedLines[i - 2]}`;
            printedLines++;
          }
          res += `
  ${expectedLines[i - 1]}`;
          printedLines++;
        }
        lastPos = i;
        other += `
${red}-${white} ${expectedLines[i]}`;
        printedLines++;
      } else if (expectedLines.length < i + 1) {
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += `
${blue}...${white}`;
            skipped = true;
          } else if (cur > 3) {
            res += `
  ${actualLines[i - 2]}`;
            printedLines++;
          }
          res += `
  ${actualLines[i - 1]}`;
          printedLines++;
        }
        lastPos = i;
        res += `
${green}+${white} ${actualLines[i]}`;
        printedLines++;
      } else {
        const expectedLine = expectedLines[i];
        let actualLine = actualLines[i];
        let divergingLines = actualLine !== expectedLine && (!endsWith2(actualLine, ",") || actualLine.slice(0, -1) !== expectedLine);
        if (divergingLines && endsWith2(expectedLine, ",") && expectedLine.slice(0, -1) === actualLine) {
          divergingLines = false;
          actualLine += ",";
        }
        if (divergingLines) {
          if (cur > 1 && i > 2) {
            if (cur > 4) {
              res += `
${blue}...${white}`;
              skipped = true;
            } else if (cur > 3) {
              res += `
  ${actualLines[i - 2]}`;
              printedLines++;
            }
            res += `
  ${actualLines[i - 1]}`;
            printedLines++;
          }
          lastPos = i;
          res += `
${green}+${white} ${actualLine}`;
          other += `
${red}-${white} ${expectedLine}`;
          printedLines += 2;
        } else {
          res += other;
          other = "";
          if (cur === 1 || i === 0) {
            res += `
  ${actualLine}`;
            printedLines++;
          }
        }
      }
      if (printedLines > 20 && i < maxLines - 2) {
        return `${msg}${skippedMsg}
${res}
${blue}...${white}${other}
${blue}...${white}`;
      }
    }
    return `${msg}${skipped ? skippedMsg : ""}
${res}${other}${end}${indicator}`;
  }
  var ERR_INVALID_ARG_TYPE, blue, green, red, white, kReadableOperator, kMaxShortLength, AssertionError;
  var init_assertion_error = __esm({
    "script/node_modules/@frida/assert/internal/assert/assertion_error.js"() {
      init_util();
      init_errors();
      ({
        ERR_INVALID_ARG_TYPE
      } = codes);
      blue = "";
      green = "";
      red = "";
      white = "";
      kReadableOperator = {
        deepStrictEqual: "Expected values to be strictly deep-equal:",
        strictEqual: "Expected values to be strictly equal:",
        strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
        deepEqual: "Expected values to be loosely deep-equal:",
        equal: "Expected values to be loosely equal:",
        notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
        notStrictEqual: 'Expected "actual" to be strictly unequal to:',
        notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
        notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
        notEqual: 'Expected "actual" to be loosely unequal to:',
        notIdentical: "Values identical but not reference-equal:"
      };
      kMaxShortLength = 10;
      AssertionError = class extends Error {
        constructor(options) {
          if (typeof options !== "object" || options === null) {
            throw new ERR_INVALID_ARG_TYPE("options", "Object", options);
          }
          const {
            message,
            operator,
            stackStartFn
          } = options;
          let {
            actual,
            expected
          } = options;
          const limit = Error.stackTraceLimit;
          Error.stackTraceLimit = 0;
          if (message != null) {
            super(String(message));
          } else {
            if (process.stderr && process.stderr.isTTY) {
              if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
                blue = "\x1B[34m";
                green = "\x1B[32m";
                white = "\x1B[39m";
                red = "\x1B[31m";
              } else {
                blue = "";
                green = "";
                white = "";
                red = "";
              }
            }
            if (typeof actual === "object" && actual !== null && typeof expected === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
              actual = copyError(actual);
              expected = copyError(expected);
            }
            if (operator === "deepStrictEqual" || operator === "strictEqual") {
              super(createErrDiff(actual, expected, operator));
            } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
              let base2 = kReadableOperator[operator];
              const res = inspectValue(actual).split("\n");
              if (operator === "notStrictEqual" && typeof actual === "object" && actual !== null) {
                base2 = kReadableOperator.notStrictEqualObject;
              }
              if (res.length > 30) {
                res[26] = `${blue}...${white}`;
                while (res.length > 27) {
                  res.pop();
                }
              }
              if (res.length === 1) {
                super(`${base2} ${res[0]}`);
              } else {
                super(`${base2}

${res.join("\n")}
`);
              }
            } else {
              let res = inspectValue(actual);
              let other = "";
              const knownOperators = kReadableOperator[operator];
              if (operator === "notDeepEqual" || operator === "notEqual") {
                res = `${kReadableOperator[operator]}

${res}`;
                if (res.length > 1024) {
                  res = `${res.slice(0, 1021)}...`;
                }
              } else {
                other = `${inspectValue(expected)}`;
                if (res.length > 512) {
                  res = `${res.slice(0, 509)}...`;
                }
                if (other.length > 512) {
                  other = `${other.slice(0, 509)}...`;
                }
                if (operator === "deepEqual" || operator === "equal") {
                  res = `${knownOperators}

${res}

should equal

`;
                } else {
                  other = ` ${operator} ${other}`;
                }
              }
              super(`${res}${other}`);
            }
          }
          Error.stackTraceLimit = limit;
          this.generatedMessage = !message;
          Object.defineProperty(this, "name", {
            value: "AssertionError [ERR_ASSERTION]",
            enumerable: false,
            writable: true,
            configurable: true
          });
          this.code = "ERR_ASSERTION";
          this.actual = actual;
          this.expected = expected;
          this.operator = operator;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, stackStartFn);
          }
          this.stack;
          this.name = "AssertionError";
        }
        toString() {
          return `${this.name} [${this.code}]: ${this.message}`;
        }
        [inspect2.custom](recurseTimes, ctx) {
          return inspect2(this, { ...ctx, customInspect: false, depth: 0 });
        }
      };
    }
  });

  // script/node_modules/@frida/assert/internal/util/comparisons.js
  function uncurryThis2(f) {
    return f.call.bind(f);
  }
  function isNonIndex(key) {
    if (key.length === 0 || key.length > 10)
      return true;
    for (var i = 0; i < key.length; i++) {
      const code = key.charCodeAt(i);
      if (code < 48 || code > 57)
        return true;
    }
    return key.length === 10 && key >= 2 ** 32;
  }
  function getOwnNonIndexProperties(value) {
    return Object.keys(value).filter(isNonIndex).concat(
      Object.getOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value))
    );
  }
  function compare3(a, b) {
    if (a === b) {
      return 0;
    }
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y) {
      return -1;
    }
    if (y < x) {
      return 1;
    }
    return 0;
  }
  function areSimilarRegExps(a, b) {
    return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
  }
  function areSimilarFloatArrays(a, b) {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    for (var offset = 0; offset < a.byteLength; offset++) {
      if (a[offset] !== b[offset]) {
        return false;
      }
    }
    return true;
  }
  function areSimilarTypedArrays(a, b) {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    return compare3(
      new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
      new Uint8Array(b.buffer, b.byteOffset, b.byteLength)
    ) === 0;
  }
  function areEqualArrayBuffers(buf1, buf2) {
    return buf1.byteLength === buf2.byteLength && compare3(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
  }
  function isEqualBoxedPrimitive(val1, val2) {
    if (isNumberObject2(val1)) {
      return isNumberObject2(val2) && Object.is(
        Number.prototype.valueOf.call(val1),
        Number.prototype.valueOf.call(val2)
      );
    }
    if (isStringObject2(val1)) {
      return isStringObject2(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
    }
    if (isBooleanObject2(val1)) {
      return isBooleanObject2(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
    }
    if (isBigIntObject2(val1)) {
      return isBigIntObject2(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
    }
    return isSymbolObject2(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
  }
  function innerDeepEqual(val1, val2, strict2, memos) {
    if (val1 === val2) {
      if (val1 !== 0)
        return true;
      return strict2 ? Object.is(val1, val2) : true;
    }
    if (strict2) {
      if (typeof val1 !== "object") {
        return typeof val1 === "number" && Number.isNaN(val1) && Number.isNaN(val2);
      }
      if (typeof val2 !== "object" || val1 === null || val2 === null) {
        return false;
      }
      if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
        return false;
      }
    } else {
      if (val1 === null || typeof val1 !== "object") {
        if (val2 === null || typeof val2 !== "object") {
          return val1 == val2;
        }
        return false;
      }
      if (val2 === null || typeof val2 !== "object") {
        return false;
      }
    }
    const val1Tag = objectToString2(val1);
    const val2Tag = objectToString2(val2);
    if (val1Tag !== val2Tag) {
      return false;
    }
    if (Array.isArray(val1)) {
      if (val1.length !== val2.length) {
        return false;
      }
      const keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
      const keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
      if (keys1.length !== keys2.length) {
        return false;
      }
      return keyCheck(val1, val2, strict2, memos, kIsArray, keys1);
    }
    if (val1Tag === "[object Object]") {
      if (!isMap2(val1) && isMap2(val2) || !isSet2(val1) && isSet2(val2)) {
        return false;
      }
    }
    if (isDate2(val1)) {
      if (!isDate2(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
        return false;
      }
    } else if (isRegExp2(val1)) {
      if (!isRegExp2(val2) || !areSimilarRegExps(val1, val2)) {
        return false;
      }
    } else if (isNativeError(val1) || val1 instanceof Error) {
      if (val1.message !== val2.message || val1.name !== val2.name) {
        return false;
      }
    } else if (isArrayBufferView2(val1)) {
      if (!strict2 && (isFloat32Array2(val1) || isFloat64Array2(val1))) {
        if (!areSimilarFloatArrays(val1, val2)) {
          return false;
        }
      } else if (!areSimilarTypedArrays(val1, val2)) {
        return false;
      }
      const keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
      const keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
      if (keys1.length !== keys2.length) {
        return false;
      }
      return keyCheck(val1, val2, strict2, memos, kNoIterator, keys1);
    } else if (isSet2(val1)) {
      if (!isSet2(val2) || val1.size !== val2.size) {
        return false;
      }
      return keyCheck(val1, val2, strict2, memos, kIsSet);
    } else if (isMap2(val1)) {
      if (!isMap2(val2) || val1.size !== val2.size) {
        return false;
      }
      return keyCheck(val1, val2, strict2, memos, kIsMap);
    } else if (isAnyArrayBuffer2(val1)) {
      if (!areEqualArrayBuffers(val1, val2)) {
        return false;
      }
    } else if (isBoxedPrimitive2(val1) && !isEqualBoxedPrimitive(val1, val2)) {
      return false;
    }
    return keyCheck(val1, val2, strict2, memos, kNoIterator);
  }
  function getEnumerables(val, keys) {
    return keys.filter((k) => propertyIsEnumerable(val, k));
  }
  function keyCheck(val1, val2, strict2, memos, iterationType, aKeys) {
    if (arguments.length === 5) {
      aKeys = Object.keys(val1);
      const bKeys = Object.keys(val2);
      if (aKeys.length !== bKeys.length) {
        return false;
      }
    }
    let i = 0;
    for (; i < aKeys.length; i++) {
      if (!hasOwnProperty2(val2, aKeys[i])) {
        return false;
      }
    }
    if (strict2 && arguments.length === 5) {
      const symbolKeysA = Object.getOwnPropertySymbols(val1);
      if (symbolKeysA.length !== 0) {
        let count = 0;
        for (i = 0; i < symbolKeysA.length; i++) {
          const key = symbolKeysA[i];
          if (propertyIsEnumerable(val1, key)) {
            if (!propertyIsEnumerable(val2, key)) {
              return false;
            }
            aKeys.push(key);
            count++;
          } else if (propertyIsEnumerable(val2, key)) {
            return false;
          }
        }
        const symbolKeysB = Object.getOwnPropertySymbols(val2);
        if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
          return false;
        }
      } else {
        const symbolKeysB = Object.getOwnPropertySymbols(val2);
        if (symbolKeysB.length !== 0 && getEnumerables(val2, symbolKeysB).length !== 0) {
          return false;
        }
      }
    }
    if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
      return true;
    }
    if (memos === void 0) {
      memos = {
        val1: /* @__PURE__ */ new Map(),
        val2: /* @__PURE__ */ new Map(),
        position: 0
      };
    } else {
      const val2MemoA = memos.val1.get(val1);
      if (val2MemoA !== void 0) {
        const val2MemoB = memos.val2.get(val2);
        if (val2MemoB !== void 0) {
          return val2MemoA === val2MemoB;
        }
      }
      memos.position++;
    }
    memos.val1.set(val1, memos.position);
    memos.val2.set(val2, memos.position);
    const areEq = objEquiv(val1, val2, strict2, aKeys, memos, iterationType);
    memos.val1.delete(val1);
    memos.val2.delete(val2);
    return areEq;
  }
  function setHasEqualElement(set, val1, strict2, memo) {
    const setValues = arrayFromSet(set);
    for (let i = 0; i < setValues.length; i++) {
      const val2 = setValues[i];
      if (innerDeepEqual(val1, val2, strict2, memo)) {
        set.delete(val2);
        return true;
      }
    }
    return false;
  }
  function findLooseMatchingPrimitives(prim) {
    switch (typeof prim) {
      case "undefined":
        return null;
      case "object":
        return void 0;
      case "symbol":
        return false;
      case "string":
        prim = +prim;
      case "number":
        if (Number.isNaN(prim)) {
          return false;
        }
    }
    return true;
  }
  function setMightHaveLoosePrim(a, b, prim) {
    const altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null)
      return altValue;
    return b.has(altValue) && !a.has(altValue);
  }
  function mapMightHaveLoosePrim(a, b, prim, item, memo) {
    const altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null) {
      return altValue;
    }
    const curB = b.get(altValue);
    if (curB === void 0 && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
      return false;
    }
    return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
  }
  function setEquiv(a, b, strict2, memo) {
    let set = null;
    const aValues = arrayFromSet(a);
    for (let i = 0; i < aValues.length; i++) {
      const val = aValues[i];
      if (typeof val === "object" && val !== null) {
        if (set === null) {
          set = /* @__PURE__ */ new Set();
        }
        set.add(val);
      } else if (!b.has(val)) {
        if (strict2)
          return false;
        if (!setMightHaveLoosePrim(a, b, val)) {
          return false;
        }
        if (set === null) {
          set = /* @__PURE__ */ new Set();
        }
        set.add(val);
      }
    }
    if (set !== null) {
      const bValues = arrayFromSet(b);
      for (let i = 0; i < bValues.length; i++) {
        const val = bValues[i];
        if (typeof val === "object" && val !== null) {
          if (!setHasEqualElement(set, val, strict2, memo))
            return false;
        } else if (!strict2 && !a.has(val) && !setHasEqualElement(set, val, strict2, memo)) {
          return false;
        }
      }
      return set.size === 0;
    }
    return true;
  }
  function mapHasEqualEntry(set, map2, key1, item1, strict2, memo) {
    const setValues = arrayFromSet(set);
    for (let i = 0; i < setValues.length; i++) {
      const key2 = setValues[i];
      if (innerDeepEqual(key1, key2, strict2, memo) && innerDeepEqual(item1, map2.get(key2), strict2, memo)) {
        set.delete(key2);
        return true;
      }
    }
    return false;
  }
  function mapEquiv(a, b, strict2, memo) {
    let set = null;
    const aEntries = arrayFromMap(a);
    for (let i = 0; i < aEntries.length; i++) {
      const [key, item1] = aEntries[i];
      if (typeof key === "object" && key !== null) {
        if (set === null) {
          set = /* @__PURE__ */ new Set();
        }
        set.add(key);
      } else {
        const item2 = b.get(key);
        if (item2 === void 0 && !b.has(key) || !innerDeepEqual(item1, item2, strict2, memo)) {
          if (strict2)
            return false;
          if (!mapMightHaveLoosePrim(a, b, key, item1, memo))
            return false;
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(key);
        }
      }
    }
    if (set !== null) {
      const bEntries = arrayFromMap(b);
      for (let i = 0; i < bEntries.length; i++) {
        const [key, item] = bEntries[i];
        if (typeof key === "object" && key !== null) {
          if (!mapHasEqualEntry(set, a, key, item, strict2, memo))
            return false;
        } else if (!strict2 && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
          return false;
        }
      }
      return set.size === 0;
    }
    return true;
  }
  function objEquiv(a, b, strict2, keys, memos, iterationType) {
    let i = 0;
    if (iterationType === kIsSet) {
      if (!setEquiv(a, b, strict2, memos)) {
        return false;
      }
    } else if (iterationType === kIsMap) {
      if (!mapEquiv(a, b, strict2, memos)) {
        return false;
      }
    } else if (iterationType === kIsArray) {
      for (; i < a.length; i++) {
        if (hasOwnProperty2(a, i)) {
          if (!hasOwnProperty2(b, i) || !innerDeepEqual(a[i], b[i], strict2, memos)) {
            return false;
          }
        } else if (hasOwnProperty2(b, i)) {
          return false;
        } else {
          const keysA = Object.keys(a);
          for (; i < keysA.length; i++) {
            const key = keysA[i];
            if (!hasOwnProperty2(b, key) || !innerDeepEqual(a[key], b[key], strict2, memos)) {
              return false;
            }
          }
          if (keysA.length !== Object.keys(b).length) {
            return false;
          }
          return true;
        }
      }
    }
    for (i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!innerDeepEqual(a[key], b[key], strict2, memos)) {
        return false;
      }
    }
    return true;
  }
  function isDeepEqual(val1, val2) {
    return innerDeepEqual(val1, val2, kLoose);
  }
  function isDeepStrictEqual(val1, val2) {
    return innerDeepEqual(val1, val2, kStrict);
  }
  var regexFlagsSupported, arrayFromSet, arrayFromMap, hasOwnProperty2, propertyIsEnumerable, objectToString2, isAnyArrayBuffer2, isArrayBufferView2, isDate2, isMap2, isRegExp2, isSet2, isNativeError, isBoxedPrimitive2, isNumberObject2, isStringObject2, isBooleanObject2, isBigIntObject2, isSymbolObject2, isFloat32Array2, isFloat64Array2, ONLY_ENUMERABLE, kStrict, kLoose, kNoIterator, kIsArray, kIsSet, kIsMap;
  var init_comparisons = __esm({
    "script/node_modules/@frida/assert/internal/util/comparisons.js"() {
      init_util();
      regexFlagsSupported = /a/g.flags !== void 0;
      arrayFromSet = (set) => {
        const array = [];
        set.forEach((value) => array.push(value));
        return array;
      };
      arrayFromMap = (map2) => {
        const array = [];
        map2.forEach((value, key) => array.push([key, value]));
        return array;
      };
      hasOwnProperty2 = uncurryThis2(Object.prototype.hasOwnProperty);
      propertyIsEnumerable = uncurryThis2(Object.prototype.propertyIsEnumerable);
      objectToString2 = uncurryThis2(Object.prototype.toString);
      ({
        isAnyArrayBuffer: isAnyArrayBuffer2,
        isArrayBufferView: isArrayBufferView2,
        isDate: isDate2,
        isMap: isMap2,
        isRegExp: isRegExp2,
        isSet: isSet2,
        isNativeError,
        isBoxedPrimitive: isBoxedPrimitive2,
        isNumberObject: isNumberObject2,
        isStringObject: isStringObject2,
        isBooleanObject: isBooleanObject2,
        isBigIntObject: isBigIntObject2,
        isSymbolObject: isSymbolObject2,
        isFloat32Array: isFloat32Array2,
        isFloat64Array: isFloat64Array2
      } = types);
      ONLY_ENUMERABLE = void 0;
      kStrict = true;
      kLoose = false;
      kNoIterator = 0;
      kIsArray = 1;
      kIsSet = 2;
      kIsMap = 3;
    }
  });

  // script/node_modules/@frida/assert/assert.js
  var assert_exports = {};
  __export(assert_exports, {
    default: () => assert_default
  });
  function innerFail(obj) {
    if (obj.message instanceof Error)
      throw obj.message;
    throw new AssertionError(obj);
  }
  function fail(actual, expected, message, operator, stackStartFn) {
    const argsLen = arguments.length;
    let internalMessage;
    if (argsLen === 0) {
      internalMessage = "Failed";
    } else if (argsLen === 1) {
      message = actual;
      actual = void 0;
    } else {
      if (warned === false) {
        warned = true;
        const warn2 = process.emitWarning ? process.emitWarning : console.warn.bind(console);
        warn2(
          "assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.",
          "DeprecationWarning",
          "DEP0094"
        );
      }
      if (argsLen === 2)
        operator = "!=";
    }
    if (message instanceof Error)
      throw message;
    const errArgs = {
      actual,
      expected,
      operator: operator === void 0 ? "fail" : operator,
      stackStartFn: stackStartFn || fail
    };
    if (message !== void 0) {
      errArgs.message = message;
    }
    const err = new AssertionError(errArgs);
    if (internalMessage) {
      err.message = internalMessage;
      err.generatedMessage = true;
    }
    throw err;
  }
  function innerOk(fn, argLen, value, message) {
    if (!value) {
      let generatedMessage = false;
      if (argLen === 0) {
        generatedMessage = true;
        message = "No value argument passed to `assert.ok()`";
      } else if (message instanceof Error) {
        throw message;
      }
      const err = new AssertionError({
        actual: value,
        expected: true,
        message,
        operator: "==",
        stackStartFn: fn
      });
      err.generatedMessage = generatedMessage;
      throw err;
    }
  }
  function ok2(...args) {
    innerOk(ok2, args.length, ...args);
  }
  function notDeepStrictEqual(actual, expected, message) {
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("actual", "expected");
    }
    if (isDeepStrictEqual(actual, expected)) {
      innerFail({
        actual,
        expected,
        message,
        operator: "notDeepStrictEqual",
        stackStartFn: notDeepStrictEqual
      });
    }
  }
  function compareExceptionKey(actual, expected, key, message, keys, fn) {
    if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
      if (!message) {
        const a = new Comparison(actual, keys);
        const b = new Comparison(expected, keys, actual);
        const err = new AssertionError({
          actual: a,
          expected: b,
          operator: "deepStrictEqual",
          stackStartFn: fn
        });
        err.actual = actual;
        err.expected = expected;
        err.operator = fn.name;
        throw err;
      }
      innerFail({
        actual,
        expected,
        message,
        operator: fn.name,
        stackStartFn: fn
      });
    }
  }
  function expectedException(actual, expected, msg, fn) {
    if (typeof expected !== "function") {
      if (isRegExp3(expected))
        return expected.test(actual);
      if (arguments.length === 2) {
        throw new ERR_INVALID_ARG_TYPE2(
          "expected",
          ["Function", "RegExp"],
          expected
        );
      }
      if (typeof actual !== "object" || actual === null) {
        const err = new AssertionError({
          actual,
          expected,
          message: msg,
          operator: "deepStrictEqual",
          stackStartFn: fn
        });
        err.operator = fn.name;
        throw err;
      }
      const keys = Object.keys(expected);
      if (expected instanceof Error) {
        keys.push("name", "message");
      } else if (keys.length === 0) {
        throw new ERR_INVALID_ARG_VALUE(
          "error",
          expected,
          "may not be an empty object"
        );
      }
      keys.forEach((key) => {
        if (typeof actual[key] === "string" && isRegExp3(expected[key]) && expected[key].test(actual[key])) {
          return;
        }
        compareExceptionKey(actual, expected, key, msg, keys, fn);
      });
      return true;
    }
    if (expected.prototype !== void 0 && actual instanceof expected) {
      return true;
    }
    if (Error.isPrototypeOf(expected)) {
      return false;
    }
    return expected.call({}, actual) === true;
  }
  function getActual(fn) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE2("fn", "Function", fn);
    }
    try {
      fn();
    } catch (e) {
      return e;
    }
    return NO_EXCEPTION_SENTINEL;
  }
  function checkIsPromise(obj) {
    return isPromise2(obj) || obj !== null && typeof obj === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
  }
  function waitForActual(promiseFn) {
    return Promise.resolve().then(() => {
      let resultPromise;
      if (typeof promiseFn === "function") {
        resultPromise = promiseFn();
        if (!checkIsPromise(resultPromise)) {
          throw new ERR_INVALID_RETURN_VALUE(
            "instance of Promise",
            "promiseFn",
            resultPromise
          );
        }
      } else if (checkIsPromise(promiseFn)) {
        resultPromise = promiseFn;
      } else {
        throw new ERR_INVALID_ARG_TYPE2("promiseFn", ["Function", "Promise"], promiseFn);
      }
      return Promise.resolve().then(() => resultPromise).then(() => NO_EXCEPTION_SENTINEL).catch((e) => e);
    });
  }
  function expectsError(stackStartFn, actual, error2, message) {
    if (typeof error2 === "string") {
      if (arguments.length === 4) {
        throw new ERR_INVALID_ARG_TYPE2(
          "error",
          ["Object", "Error", "Function", "RegExp"],
          error2
        );
      }
      if (typeof actual === "object" && actual !== null) {
        if (actual.message === error2) {
          throw new ERR_AMBIGUOUS_ARGUMENT(
            "error/message",
            `The error message "${actual.message}" is identical to the message.`
          );
        }
      } else if (actual === error2) {
        throw new ERR_AMBIGUOUS_ARGUMENT(
          "error/message",
          `The error "${actual}" is identical to the message.`
        );
      }
      message = error2;
      error2 = void 0;
    } else if (error2 != null && typeof error2 !== "object" && typeof error2 !== "function") {
      throw new ERR_INVALID_ARG_TYPE2(
        "error",
        ["Object", "Error", "Function", "RegExp"],
        error2
      );
    }
    if (actual === NO_EXCEPTION_SENTINEL) {
      let details = "";
      if (error2 && error2.name) {
        details += ` (${error2.name})`;
      }
      details += message ? `: ${message}` : ".";
      const fnType = stackStartFn.name === "rejects" ? "rejection" : "exception";
      innerFail({
        actual: void 0,
        expected: error2,
        operator: stackStartFn.name,
        message: `Missing expected ${fnType}${details}`,
        stackStartFn
      });
    }
    if (error2 && !expectedException(actual, error2, message, stackStartFn)) {
      throw actual;
    }
  }
  function expectsNoError(stackStartFn, actual, error2, message) {
    if (actual === NO_EXCEPTION_SENTINEL)
      return;
    if (typeof error2 === "string") {
      message = error2;
      error2 = void 0;
    }
    if (!error2 || expectedException(actual, error2)) {
      const details = message ? `: ${message}` : ".";
      const fnType = stackStartFn.name === "doesNotReject" ? "rejection" : "exception";
      innerFail({
        actual,
        expected: error2,
        operator: stackStartFn.name,
        message: `Got unwanted ${fnType}${details}
Actual message: "${actual && actual.message}"`,
        stackStartFn
      });
    }
    throw actual;
  }
  function strict(...args) {
    innerOk(strict, args.length, ...args);
  }
  var ERR_AMBIGUOUS_ARGUMENT, ERR_INVALID_ARG_TYPE2, ERR_INVALID_ARG_VALUE, ERR_INVALID_RETURN_VALUE, ERR_MISSING_ARGS, isPromise2, isRegExp3, warned, assert, assert_default, NO_EXCEPTION_SENTINEL, Comparison;
  var init_assert = __esm({
    "script/node_modules/@frida/assert/assert.js"() {
      init_errors();
      init_assertion_error();
      init_comparisons();
      init_util();
      ({
        ERR_AMBIGUOUS_ARGUMENT,
        ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE2,
        ERR_INVALID_ARG_VALUE,
        ERR_INVALID_RETURN_VALUE,
        ERR_MISSING_ARGS
      } = codes);
      ({ isPromise: isPromise2, isRegExp: isRegExp3 } = types);
      warned = false;
      assert = ok2;
      assert_default = assert;
      NO_EXCEPTION_SENTINEL = {};
      assert.fail = fail;
      assert.AssertionError = AssertionError;
      assert.ok = ok2;
      assert.equal = function equal(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (actual != expected) {
          innerFail({
            actual,
            expected,
            message,
            operator: "==",
            stackStartFn: equal
          });
        }
      };
      assert.notEqual = function notEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (actual == expected) {
          innerFail({
            actual,
            expected,
            message,
            operator: "!=",
            stackStartFn: notEqual
          });
        }
      };
      assert.deepEqual = function deepEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (!isDeepEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "deepEqual",
            stackStartFn: deepEqual
          });
        }
      };
      assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (isDeepEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "notDeepEqual",
            stackStartFn: notDeepEqual
          });
        }
      };
      assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (!isDeepStrictEqual(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "deepStrictEqual",
            stackStartFn: deepStrictEqual
          });
        }
      };
      assert.notDeepStrictEqual = notDeepStrictEqual;
      assert.strictEqual = function strictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (!Object.is(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "strictEqual",
            stackStartFn: strictEqual
          });
        }
      };
      assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
        if (arguments.length < 2) {
          throw new ERR_MISSING_ARGS("actual", "expected");
        }
        if (Object.is(actual, expected)) {
          innerFail({
            actual,
            expected,
            message,
            operator: "notStrictEqual",
            stackStartFn: notStrictEqual
          });
        }
      };
      Comparison = class {
        constructor(obj, keys, actual) {
          keys.forEach((key) => {
            if (key in obj) {
              if (actual !== void 0 && typeof actual[key] === "string" && isRegExp3(obj[key]) && obj[key].test(actual[key])) {
                this[key] = actual[key];
              } else {
                this[key] = obj[key];
              }
            }
          });
        }
      };
      assert.throws = function throws(promiseFn, ...args) {
        expectsError(throws, getActual(promiseFn), ...args);
      };
      assert.rejects = function rejects(promiseFn, ...args) {
        return waitForActual(promiseFn).then((result) => {
          return expectsError(rejects, result, ...args);
        });
      };
      assert.doesNotThrow = function doesNotThrow(fn, ...args) {
        expectsNoError(doesNotThrow, getActual(fn), ...args);
      };
      assert.doesNotReject = function doesNotReject(fn, ...args) {
        return waitForActual(fn).then((result) => {
          return expectsNoError(doesNotReject, result, ...args);
        });
      };
      assert.ifError = function ifError(err) {
        if (err !== null && err !== void 0) {
          let message = "ifError got unwanted exception: ";
          if (typeof err === "object" && typeof err.message === "string") {
            if (err.message.length === 0 && err.constructor) {
              message += err.constructor.name;
            } else {
              message += err.message;
            }
          } else {
            message += inspect2(err);
          }
          const newErr = new AssertionError({
            actual: err,
            expected: null,
            operator: "ifError",
            message,
            stackStartFn: ifError
          });
          const origStack = err.stack;
          if (typeof origStack === "string") {
            const tmp2 = origStack.split("\n");
            tmp2.shift();
            let tmp1 = newErr.stack.split("\n");
            for (var i = 0; i < tmp2.length; i++) {
              const pos = tmp1.indexOf(tmp2[i]);
              if (pos !== -1) {
                tmp1 = tmp1.slice(0, pos);
                break;
              }
            }
            newErr.stack = `${tmp1.join("\n")}
${tmp2.join("\n")}`;
          }
          throw newErr;
        }
      };
      assert.strict = Object.assign(strict, assert, {
        equal: assert.strictEqual,
        deepEqual: assert.deepStrictEqual,
        notEqual: assert.notStrictEqual,
        notDeepEqual: assert.notDeepStrictEqual
      });
      assert.strict.strict = assert.strict;
    }
  });

  // script/node_modules/http-parser-js/http-parser.js
  var require_http_parser = __commonJS({
    "script/node_modules/http-parser-js/http-parser.js"(exports) {
      var assert2 = (init_assert(), __toCommonJS(assert_exports));
assert2.ok=function(){return true;};assert2.equal=function(){return true;};exports.HTTPParser = HTTPParser2;
      function HTTPParser2(type) {
        assert2.ok(type === HTTPParser2.REQUEST || type === HTTPParser2.RESPONSE || type === void 0);
        if (type === void 0) {
        } else {
          this.initialize(type);
        }
        this.maxHeaderSize = HTTPParser2.maxHeaderSize;
      }
      HTTPParser2.prototype.initialize = function(type, async_resource) {
        assert2.ok(type === HTTPParser2.REQUEST || type === HTTPParser2.RESPONSE);
        this.type = type;
        this.state = type + "_LINE";
        this.info = {
          headers: [],
          upgrade: false
        };
        this.trailers = [];
        this.line = "";
        this.isChunked = false;
        this.connection = "";
        this.headerSize = 0;
        this.body_bytes = null;
        this.isUserCall = false;
        this.hadError = false;
      };
      HTTPParser2.encoding = "ascii";
      HTTPParser2.maxHeaderSize = 80 * 1024;
      HTTPParser2.REQUEST = "REQUEST";
      HTTPParser2.RESPONSE = "RESPONSE";
      var kOnHeaders2 = HTTPParser2.kOnHeaders = 1;
      var kOnHeadersComplete2 = HTTPParser2.kOnHeadersComplete = 2;
      var kOnBody2 = HTTPParser2.kOnBody = 3;
      var kOnMessageComplete2 = HTTPParser2.kOnMessageComplete = 4;
      HTTPParser2.prototype[kOnHeaders2] = HTTPParser2.prototype[kOnHeadersComplete2] = HTTPParser2.prototype[kOnBody2] = HTTPParser2.prototype[kOnMessageComplete2] = function() {
      };
      var compatMode0_12 = true;
      Object.defineProperty(HTTPParser2, "kOnExecute", {
        get: function() {
          compatMode0_12 = false;
          return 99;
        }
      });
      var methods2 = exports.methods = HTTPParser2.methods = [
        "DELETE",
        "GET",
        "HEAD",
        "POST",
        "PUT",
        "CONNECT",
        "OPTIONS",
        "TRACE",
        "COPY",
        "LOCK",
        "MKCOL",
        "MOVE",
        "PROPFIND",
        "PROPPATCH",
        "SEARCH",
        "UNLOCK",
        "BIND",
        "REBIND",
        "UNBIND",
        "ACL",
        "REPORT",
        "MKACTIVITY",
        "CHECKOUT",
        "MERGE",
        "M-SEARCH",
        "NOTIFY",
        "SUBSCRIBE",
        "UNSUBSCRIBE",
        "PATCH",
        "PURGE",
        "MKCALENDAR",
        "LINK",
        "UNLINK",
        "SOURCE"
      ];
      var method_connect = methods2.indexOf("CONNECT");
      HTTPParser2.prototype.reinitialize = HTTPParser2;
      HTTPParser2.prototype.close = HTTPParser2.prototype.pause = HTTPParser2.prototype.resume = HTTPParser2.prototype.free = function() {
      };
      HTTPParser2.prototype._compatMode0_11 = false;
      HTTPParser2.prototype.getAsyncId = function() {
        return 0;
      };
      var headerState = {
        REQUEST_LINE: true,
        RESPONSE_LINE: true,
        HEADER: true
      };
      HTTPParser2.prototype.execute = function(chunk, start, length) {
        if (!(this instanceof HTTPParser2)) {
          throw new TypeError("not a HTTPParser");
        }
        start = start || 0;
        length = typeof length === "number" ? length : chunk.length;
        this.chunk = chunk;
        this.offset = start;
        var end = this.end = start + length;
        try {
          while (this.offset < end) {
            if (this[this.state]()) {
              break;
            }
          }
        } catch (err) {
          if (this.isUserCall) {
            throw err;
          }
          this.hadError = true;
          return err;
        }
        this.chunk = null;
        length = this.offset - start;
        if (headerState[this.state]) {
          this.headerSize += length;
          if (this.headerSize > (this.maxHeaderSize || HTTPParser2.maxHeaderSize)) {
            return new Error("max header size exceeded");
          }
        }
        return length;
      };
      var stateFinishAllowed = {
        REQUEST_LINE: true,
        RESPONSE_LINE: true,
        BODY_RAW: true
      };
      HTTPParser2.prototype.finish = function() {
        if (this.hadError) {
          return;
        }
        if (!stateFinishAllowed[this.state]) {
          return new Error("invalid state for EOF");
        }
        if (this.state === "BODY_RAW") {
          this.userCall()(this[kOnMessageComplete2]());
        }
      };
      HTTPParser2.prototype.consume = HTTPParser2.prototype.unconsume = HTTPParser2.prototype.getCurrentBuffer = function() {
      };
      HTTPParser2.prototype.userCall = function() {
        this.isUserCall = true;
        var self = this;
        return function(ret) {
          self.isUserCall = false;
          return ret;
        };
      };
      HTTPParser2.prototype.nextRequest = function() {
        this.userCall()(this[kOnMessageComplete2]());
        this.reinitialize(this.type);
      };
      HTTPParser2.prototype.consumeLine = function() {
        var end = this.end, chunk = this.chunk;
        for (var i = this.offset; i < end; i++) {
          if (chunk[i] === 10) {
            var line = this.line + chunk.toString(HTTPParser2.encoding, this.offset, i);
            if (line.charAt(line.length - 1) === "\r") {
              line = line.substr(0, line.length - 1);
            }
            this.line = "";
            this.offset = i + 1;
            return line;
          }
        }
        this.line += chunk.toString(HTTPParser2.encoding, this.offset, this.end);
        this.offset = this.end;
      };
      var headerExp = /^([^: \t]+):[ \t]*((?:.*[^ \t])|)/;
      var headerContinueExp = /^[ \t]+(.*[^ \t])/;
      HTTPParser2.prototype.parseHeader = function(line, headers) {
        if (line.indexOf("\r") !== -1) {
          throw parseErrorCode("HPE_LF_EXPECTED");
        }
        var match = headerExp.exec(line);
        var k = match && match[1];
        if (k) {
          headers.push(k);
          headers.push(match[2]);
        } else {
          var matchContinue = headerContinueExp.exec(line);
          if (matchContinue && headers.length) {
            if (headers[headers.length - 1]) {
              headers[headers.length - 1] += " ";
            }
            headers[headers.length - 1] += matchContinue[1];
          }
        }
      };
      var requestExp = /^([A-Z-]+) ([^ ]+) HTTP\/(\d)\.(\d)$/;
      HTTPParser2.prototype.REQUEST_LINE = function() {
        var line = this.consumeLine();
        if (!line) {
          return;
        }
        var match = requestExp.exec(line);
        if (match === null) {
          throw parseErrorCode("HPE_INVALID_CONSTANT");
        }
        this.info.method = this._compatMode0_11 ? match[1] : methods2.indexOf(match[1]);
        if (this.info.method === -1) {
          throw new Error("invalid request method");
        }
        this.info.url = match[2];
        this.info.versionMajor = +match[3];
        this.info.versionMinor = +match[4];
        this.body_bytes = 0;
        this.state = "HEADER";
      };
      var responseExp = /^HTTP\/(\d)\.(\d) (\d{3}) ?(.*)$/;
      HTTPParser2.prototype.RESPONSE_LINE = function() {
        var line = this.consumeLine();
        if (!line) {
          return;
        }
        var match = responseExp.exec(line);
        if (match === null) {
          throw parseErrorCode("HPE_INVALID_CONSTANT");
        }
        this.info.versionMajor = +match[1];
        this.info.versionMinor = +match[2];
        var statusCode = this.info.statusCode = +match[3];
        this.info.statusMessage = match[4];
        if ((statusCode / 100 | 0) === 1 || statusCode === 204 || statusCode === 304) {
          this.body_bytes = 0;
        }
        this.state = "HEADER";
      };
      HTTPParser2.prototype.shouldKeepAlive = function() {
        if (this.info.versionMajor > 0 && this.info.versionMinor > 0) {
          if (this.connection.indexOf("close") !== -1) {
            return false;
          }
        } else if (this.connection.indexOf("keep-alive") === -1) {
          return false;
        }
        if (this.body_bytes !== null || this.isChunked) {
          return true;
        }
        return false;
      };
      HTTPParser2.prototype.HEADER = function() {
        var line = this.consumeLine();
        if (line === void 0) {
          return;
        }
        var info = this.info;
        if (line) {
          this.parseHeader(line, info.headers);
        } else {
          var headers = info.headers;
          var hasContentLength = false;
          var currentContentLengthValue;
          var hasUpgradeHeader = false;
          for (var i = 0; i < headers.length; i += 2) {
            switch (headers[i].toLowerCase()) {
              case "transfer-encoding":
                this.isChunked = headers[i + 1].toLowerCase() === "chunked";
                break;
              case "content-length":
                currentContentLengthValue = +headers[i + 1];
                if (hasContentLength) {
                  if (currentContentLengthValue !== this.body_bytes) {
                    throw parseErrorCode("HPE_UNEXPECTED_CONTENT_LENGTH");
                  }
                } else {
                  hasContentLength = true;
                  this.body_bytes = currentContentLengthValue;
                }
                break;
              case "connection":
                this.connection += headers[i + 1].toLowerCase();
                break;
              case "upgrade":
                hasUpgradeHeader = true;
                break;
            }
          }
          if (this.isChunked && hasContentLength) {
            hasContentLength = false;
            this.body_bytes = null;
          }
          if (hasUpgradeHeader && this.connection.indexOf("upgrade") != -1) {
            info.upgrade = this.type === HTTPParser2.REQUEST || info.statusCode === 101;
          } else {
            info.upgrade = info.method === method_connect;
          }
          if (this.isChunked && info.upgrade) {
            this.isChunked = false;
          }
          info.shouldKeepAlive = this.shouldKeepAlive();
          var skipBody;
          if (compatMode0_12) {
            skipBody = this.userCall()(this[kOnHeadersComplete2](info));
          } else {
            skipBody = this.userCall()(this[kOnHeadersComplete2](
              info.versionMajor,
              info.versionMinor,
              info.headers,
              info.method,
              info.url,
              info.statusCode,
              info.statusMessage,
              info.upgrade,
              info.shouldKeepAlive
            ));
          }
          if (skipBody === 2) {
            this.nextRequest();
            return true;
          } else if (this.isChunked && !skipBody) {
            this.state = "BODY_CHUNKHEAD";
          } else if (skipBody || this.body_bytes === 0) {
            this.nextRequest();
            return info.upgrade;
          } else if (this.body_bytes === null) {
            this.state = "BODY_RAW";
          } else {
            this.state = "BODY_SIZED";
          }
        }
      };
      HTTPParser2.prototype.BODY_CHUNKHEAD = function() {
        var line = this.consumeLine();
        if (line === void 0) {
          return;
        }
        this.body_bytes = parseInt(line, 16);
        if (!this.body_bytes) {
          this.state = "BODY_CHUNKTRAILERS";
        } else {
          this.state = "BODY_CHUNK";
        }
      };
      HTTPParser2.prototype.BODY_CHUNK = function() {
        var length = Math.min(this.end - this.offset, this.body_bytes);
        this.userCall()(this[kOnBody2](this.chunk, this.offset, length));
        this.offset += length;
        this.body_bytes -= length;
        if (!this.body_bytes) {
          this.state = "BODY_CHUNKEMPTYLINE";
        }
      };
      HTTPParser2.prototype.BODY_CHUNKEMPTYLINE = function() {
        var line = this.consumeLine();
        if (line === void 0) {
          return;
        }
        assert2.equal(line, "");
        this.state = "BODY_CHUNKHEAD";
      };
      HTTPParser2.prototype.BODY_CHUNKTRAILERS = function() {
        var line = this.consumeLine();
        if (line === void 0) {
          return;
        }
        if (line) {
          this.parseHeader(line, this.trailers);
        } else {
          if (this.trailers.length) {
            this.userCall()(this[kOnHeaders2](this.trailers, ""));
          }
          this.nextRequest();
        }
      };
      HTTPParser2.prototype.BODY_RAW = function() {
        var length = this.end - this.offset;
        this.userCall()(this[kOnBody2](this.chunk, this.offset, length));
        this.offset = this.end;
      };
      HTTPParser2.prototype.BODY_SIZED = function() {
        var length = Math.min(this.end - this.offset, this.body_bytes);
        this.userCall()(this[kOnBody2](this.chunk, this.offset, length));
        this.offset += length;
        this.body_bytes -= length;
        if (!this.body_bytes) {
          this.nextRequest();
        }
      };
      ["Headers", "HeadersComplete", "Body", "MessageComplete"].forEach(function(name) {
        var k = HTTPParser2["kOn" + name];
        Object.defineProperty(HTTPParser2.prototype, "on" + name, {
          get: function() {
            return this[k];
          },
          set: function(to) {
            this._compatMode0_11 = true;
            method_connect = "CONNECT";
            return this[k] = to;
          }
        });
      });
      function parseErrorCode(code) {
        var err = new Error("Parse Error");
        err.code = code;
        return err;
      }
    }
  });

  // script/node_modules/frida-il2cpp-bridge/dist/index.js
  var __decorate = function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var Android;
  (function(Android2) {
    getter(Android2, "apiLevel", () => {
      const value = getProperty("ro.build.version.sdk");
      return value ? parseInt(value) : null;
    }, lazy);
    function getProperty(name) {
      const handle = Module.findExportByName("libc.so", "__system_property_get");
      if (handle) {
        const __system_property_get = new NativeFunction(handle, "void", ["pointer", "pointer"]);
        const value = Memory.alloc(92).writePointer(NULL);
        __system_property_get(Memory.allocUtf8String(name), value);
        return value.readCString() ?? void 0;
      }
    }
  })(Android || (Android = {}));
  function raise(message) {
    const error2 = new Error(`\x1B[0m${message}`);
    error2.name = `\x1B[0m\x1B[38;5;9mil2cpp\x1B[0m`;
    error2.stack = error2.stack?.replace(/^Error/, error2.name)?.replace(/\n    at (.+) \((.+):(.+)\)/, "\x1B[3m\x1B[2m")?.concat("\x1B[0m");
    throw error2;
  }
  function warn(message) {
    globalThis.console.log(`\x1B[38;5;11mil2cpp\x1B[0m: ${message}`);
  }
  function ok(message) {
    globalThis.console.log(`\x1B[38;5;10mil2cpp\x1B[0m: ${message}`);
  }
  function inform(message) {
    globalThis.console.log(`\x1B[38;5;12mil2cpp\x1B[0m: ${message}`);
  }
  function decorate(target, decorator, descriptors = Object.getOwnPropertyDescriptors(target)) {
    for (const key in descriptors) {
      descriptors[key] = decorator(target, key, descriptors[key]);
    }
    Object.defineProperties(target, descriptors);
    return target;
  }
  function getter(target, key, get2, decorator) {
    globalThis.Object.defineProperty(target, key, decorator?.(target, key, { get: get2, configurable: true }) ?? { get: get2, configurable: true });
  }
  function lazy(_, propertyKey, descriptor) {
    const getter2 = descriptor.get;
    if (!getter2) {
      throw new Error("@lazy can only be applied to getter accessors");
    }
    descriptor.get = function() {
      const value = getter2.call(this);
      Object.defineProperty(this, propertyKey, {
        value,
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        writable: false
      });
      return value;
    };
    return descriptor;
  }
  var NativeStruct = class {
    handle;
    constructor(handleOrWrapper) {
      if (handleOrWrapper instanceof NativePointer) {
        this.handle = handleOrWrapper;
      } else {
        this.handle = handleOrWrapper.handle;
      }
    }
    equals(other) {
      return this.handle.equals(other.handle);
    }
    isNull() {
      return this.handle.isNull();
    }
    asNullable() {
      return this.isNull() ? null : this;
    }
  };
  function forModule(...moduleNames) {
    function find(moduleName, name, readString = (_) => _.readUtf8String()) {
      const handle = Module.findExportByName(moduleName, name) ?? NULL;
      if (!handle.isNull()) {
        return { handle, readString };
      }
    }
    return new Promise((resolve3) => {
      for (const moduleName of moduleNames) {
        const module2 = Process.findModuleByName(moduleName);
        if (module2 != null) {
          resolve3(module2);
          return;
        }
      }
      let targets = [];
      switch (Process.platform) {
        case "linux":
          if (Android.apiLevel == null) {
            targets = [find(null, "dlopen")];
            break;
          }
          targets = (Process.findModuleByName("linker64") ?? Process.getModuleByName("linker")).enumerateSymbols().filter((_) => ["__dl___loader_dlopen", "__dl__Z8__dlopenPKciPKv", "__dl_open"].includes(_.name)).map((_) => ({ handle: _.address, readString: (_2) => _2.readCString() }));
          break;
        case "darwin":
          targets = [find("libdyld.dylib", "dlopen")];
          break;
        case "windows":
          targets = [
            find("kernel32.dll", "LoadLibraryW", (_) => _.readUtf16String()),
            find("kernel32.dll", "LoadLibraryExW", (_) => _.readUtf16String()),
            find("kernel32.dll", "LoadLibraryA", (_) => _.readAnsiString()),
            find("kernel32.dll", "LoadLibraryExA", (_) => _.readAnsiString())
          ];
          break;
      }
      targets = targets.filter((_) => _);
      if (targets.length == 0) {
        raise(`there are no targets to hook the loading of \x1B[3m${moduleNames}\x1B[0m, please file a bug`);
      }
      const timeout = setTimeout(() => {
        for (const moduleName of moduleNames) {
          const module2 = Process.findModuleByName(moduleName);
          if (module2 != null) {
            warn(`\x1B[3m${module2.name}\x1B[0m has been loaded, but such event hasn't been detected - please file a bug`);
            clearTimeout(timeout);
            interceptors.forEach((_) => _.detach());
            resolve3(module2);
            return;
          }
        }
        warn(`10 seconds have passed and \x1B[3m${moduleNames}\x1B[0m has not been loaded yet, is the app running?`);
}, 3e3);
      const interceptors = targets.map((_) => Interceptor.attach(_.handle, {
        onEnter(args) {
          this.modulePath = _.readString(args[0]) ?? "";
        },
        onLeave(_2) {
          for (const moduleName of moduleNames) {
            if (this.modulePath.endsWith(moduleName)) {
              const module2 = Process.findModuleByName(this.modulePath);
              if (module2 != null) {
                setImmediate(() => {
                  clearTimeout(timeout);
                  interceptors.forEach((_3) => _3.detach());
                });
                resolve3(module2);
                break;
              }
            }
          }
        }
      }));
    });
  }
  NativePointer.prototype.offsetOf = function(condition, depth) {
    depth ??= 512;
    for (let i = 0; depth > 0 ? i < depth : i < -depth; i++) {
      if (condition(depth > 0 ? this.add(i) : this.sub(i))) {
        return i;
      }
    }
    return null;
  };
  function readNativeIterator(block) {
    const array = [];
    const iterator = Memory.alloc(Process.pointerSize);
    let handle = block(iterator);
    while (!handle.isNull()) {
      array.push(handle);
      handle = block(iterator);
    }
    return array;
  }
  function readNativeList(block) {
    const lengthPointer = Memory.alloc(Process.pointerSize);
    const startPointer = block(lengthPointer);
    if (startPointer.isNull()) {
      return [];
    }
    const array = new Array(lengthPointer.readInt());
    for (let i = 0; i < array.length; i++) {
      array[i] = startPointer.add(i * Process.pointerSize).readPointer();
    }
    return array;
  }
  function recycle(Class) {
    return new Proxy(Class, {
      cache: /* @__PURE__ */ new Map(),
      construct(Target, argArray) {
        const handle = argArray[0].toUInt32();
        if (!this.cache.has(handle)) {
          this.cache.set(handle, new Target(argArray[0]));
        }
        return this.cache.get(handle);
      }
    });
  }
  var UnityVersion;
  (function(UnityVersion2) {
    const pattern = /(20\d{2}|\d)\.(\d)\.(\d{1,2})(?:[abcfp]|rc){0,2}\d?/;
    function find(string) {
      return string?.match(pattern)?.[0];
    }
    UnityVersion2.find = find;
    function gte(a, b) {
      return compare4(a, b) >= 0;
    }
    UnityVersion2.gte = gte;
    function lt(a, b) {
      return compare4(a, b) < 0;
    }
    UnityVersion2.lt = lt;
    function compare4(a, b) {
      const aMatches = a.match(pattern);
      const bMatches = b.match(pattern);
      for (let i = 1; i <= 3; i++) {
        const a2 = Number(aMatches?.[i] ?? -1);
        const b2 = Number(bMatches?.[i] ?? -1);
        if (a2 > b2)
          return 1;
        else if (a2 < b2)
          return -1;
      }
      return 0;
    }
  })(UnityVersion || (UnityVersion = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    Il2Cpp3.api = {
      get alloc() {
        return r("il2cpp_alloc", "pointer", ["size_t"]);
      },
      get arrayGetLength() {
        return r("il2cpp_array_length", "uint32", ["pointer"]);
      },
      get arrayNew() {
        return r("il2cpp_array_new", "pointer", ["pointer", "uint32"]);
      },
      get assemblyGetImage() {
        return r("il2cpp_assembly_get_image", "pointer", ["pointer"]);
      },
      get classForEach() {
        return r("il2cpp_class_for_each", "void", ["pointer", "pointer"]);
      },
      get classFromName() {
        return r("il2cpp_class_from_name", "pointer", ["pointer", "pointer", "pointer"]);
      },
      get classFromObject() {
        return r("il2cpp_class_from_system_type", "pointer", ["pointer"]);
      },
      get classGetArrayClass() {
        return r("il2cpp_array_class_get", "pointer", ["pointer", "uint32"]);
      },
      get classGetArrayElementSize() {
        return r("il2cpp_class_array_element_size", "int", ["pointer"]);
      },
      get classGetAssemblyName() {
        return r("il2cpp_class_get_assemblyname", "pointer", ["pointer"]);
      },
      get classGetBaseType() {
        return r("il2cpp_class_enum_basetype", "pointer", ["pointer"]);
      },
      get classGetDeclaringType() {
        return r("il2cpp_class_get_declaring_type", "pointer", ["pointer"]);
      },
      get classGetElementClass() {
        return r("il2cpp_class_get_element_class", "pointer", ["pointer"]);
      },
      get classGetFieldFromName() {
        return r("il2cpp_class_get_field_from_name", "pointer", ["pointer", "pointer"]);
      },
      get classGetFields() {
        return r("il2cpp_class_get_fields", "pointer", ["pointer", "pointer"]);
      },
      get classGetFlags() {
        return r("il2cpp_class_get_flags", "int", ["pointer"]);
      },
      get classGetImage() {
        return r("il2cpp_class_get_image", "pointer", ["pointer"]);
      },
      get classGetInstanceSize() {
        return r("il2cpp_class_instance_size", "int32", ["pointer"]);
      },
      get classGetInterfaces() {
        return r("il2cpp_class_get_interfaces", "pointer", ["pointer", "pointer"]);
      },
      get classGetMethodFromName() {
        return r("il2cpp_class_get_method_from_name", "pointer", ["pointer", "pointer", "int"]);
      },
      get classGetMethods() {
        return r("il2cpp_class_get_methods", "pointer", ["pointer", "pointer"]);
      },
      get classGetName() {
        return r("il2cpp_class_get_name", "pointer", ["pointer"]);
      },
      get classGetNamespace() {
        return r("il2cpp_class_get_namespace", "pointer", ["pointer"]);
      },
      get classGetNestedClasses() {
        return r("il2cpp_class_get_nested_types", "pointer", ["pointer", "pointer"]);
      },
      get classGetParent() {
        return r("il2cpp_class_get_parent", "pointer", ["pointer"]);
      },
      get classGetStaticFieldData() {
        return r("il2cpp_class_get_static_field_data", "pointer", ["pointer"]);
      },
      get classGetValueTypeSize() {
        return r("il2cpp_class_value_size", "int32", ["pointer", "pointer"]);
      },
      get classGetType() {
        return r("il2cpp_class_get_type", "pointer", ["pointer"]);
      },
      get classHasReferences() {
        return r("il2cpp_class_has_references", "bool", ["pointer"]);
      },
      get classInitialize() {
        return r("il2cpp_runtime_class_init", "void", ["pointer"]);
      },
      get classIsAbstract() {
        return r("il2cpp_class_is_abstract", "bool", ["pointer"]);
      },
      get classIsAssignableFrom() {
        return r("il2cpp_class_is_assignable_from", "bool", ["pointer", "pointer"]);
      },
      get classIsBlittable() {
        return r("il2cpp_class_is_blittable", "bool", ["pointer"]);
      },
      get classIsEnum() {
        return r("il2cpp_class_is_enum", "bool", ["pointer"]);
      },
      get classIsGeneric() {
        return r("il2cpp_class_is_generic", "bool", ["pointer"]);
      },
      get classIsInflated() {
        return r("il2cpp_class_is_inflated", "bool", ["pointer"]);
      },
      get classIsInterface() {
        return r("il2cpp_class_is_interface", "bool", ["pointer"]);
      },
      get classIsSubclassOf() {
        return r("il2cpp_class_is_subclass_of", "bool", ["pointer", "pointer", "bool"]);
      },
      get classIsValueType() {
        return r("il2cpp_class_is_valuetype", "bool", ["pointer"]);
      },
      get domainGetAssemblyFromName() {
        return r("il2cpp_domain_assembly_open", "pointer", ["pointer", "pointer"]);
      },
      get domainGet() {
        return r("il2cpp_domain_get", "pointer", []);
      },
      get domainGetAssemblies() {
        return r("il2cpp_domain_get_assemblies", "pointer", ["pointer", "pointer"]);
      },
      get fieldGetClass() {
        return r("il2cpp_field_get_parent", "pointer", ["pointer"]);
      },
      get fieldGetFlags() {
        return r("il2cpp_field_get_flags", "int", ["pointer"]);
      },
      get fieldGetName() {
        return r("il2cpp_field_get_name", "pointer", ["pointer"]);
      },
      get fieldGetOffset() {
        return r("il2cpp_field_get_offset", "int32", ["pointer"]);
      },
      get fieldGetStaticValue() {
        return r("il2cpp_field_static_get_value", "void", ["pointer", "pointer"]);
      },
      get fieldGetType() {
        return r("il2cpp_field_get_type", "pointer", ["pointer"]);
      },
      get fieldSetStaticValue() {
        return r("il2cpp_field_static_set_value", "void", ["pointer", "pointer"]);
      },
      get free() {
        return r("il2cpp_free", "void", ["pointer"]);
      },
      get gcCollect() {
        return r("il2cpp_gc_collect", "void", ["int"]);
      },
      get gcCollectALittle() {
        return r("il2cpp_gc_collect_a_little", "void", []);
      },
      get gcDisable() {
        return r("il2cpp_gc_disable", "void", []);
      },
      get gcEnable() {
        return r("il2cpp_gc_enable", "void", []);
      },
      get gcGetHeapSize() {
        return r("il2cpp_gc_get_heap_size", "int64", []);
      },
      get gcGetMaxTimeSlice() {
        return r("il2cpp_gc_get_max_time_slice_ns", "int64", []);
      },
      get gcGetUsedSize() {
        return r("il2cpp_gc_get_used_size", "int64", []);
      },
      get gcHandleGetTarget() {
        return r("il2cpp_gchandle_get_target", "pointer", ["uint32"]);
      },
      get gcHandleFree() {
        return r("il2cpp_gchandle_free", "void", ["uint32"]);
      },
      get gcHandleNew() {
        return r("il2cpp_gchandle_new", "uint32", ["pointer", "bool"]);
      },
      get gcHandleNewWeakRef() {
        return r("il2cpp_gchandle_new_weakref", "uint32", ["pointer", "bool"]);
      },
      get gcIsDisabled() {
        return r("il2cpp_gc_is_disabled", "bool", []);
      },
      get gcIsIncremental() {
        return r("il2cpp_gc_is_incremental", "bool", []);
      },
      get gcSetMaxTimeSlice() {
        return r("il2cpp_gc_set_max_time_slice_ns", "void", ["int64"]);
      },
      get gcStartIncrementalCollection() {
        return r("il2cpp_gc_start_incremental_collection", "void", []);
      },
      get gcStartWorld() {
        return r("il2cpp_start_gc_world", "void", []);
      },
      get gcStopWorld() {
        return r("il2cpp_stop_gc_world", "void", []);
      },
      get getCorlib() {
        return r("il2cpp_get_corlib", "pointer", []);
      },
      get imageGetAssembly() {
        return r("il2cpp_image_get_assembly", "pointer", ["pointer"]);
      },
      get imageGetClass() {
        return r("il2cpp_image_get_class", "pointer", ["pointer", "uint"]);
      },
      get imageGetClassCount() {
        return r("il2cpp_image_get_class_count", "uint32", ["pointer"]);
      },
      get imageGetName() {
        return r("il2cpp_image_get_name", "pointer", ["pointer"]);
      },
      get initialize() {
        return r("il2cpp_init", "void", ["pointer"]);
      },
      get livenessAllocateStruct() {
        return r("il2cpp_unity_liveness_allocate_struct", "pointer", ["pointer", "int", "pointer", "pointer", "pointer"]);
      },
      get livenessCalculationBegin() {
        return r("il2cpp_unity_liveness_calculation_begin", "pointer", ["pointer", "int", "pointer", "pointer", "pointer", "pointer"]);
      },
      get livenessCalculationEnd() {
        return r("il2cpp_unity_liveness_calculation_end", "void", ["pointer"]);
      },
      get livenessCalculationFromStatics() {
        return r("il2cpp_unity_liveness_calculation_from_statics", "void", ["pointer"]);
      },
      get livenessFinalize() {
        return r("il2cpp_unity_liveness_finalize", "void", ["pointer"]);
      },
      get livenessFreeStruct() {
        return r("il2cpp_unity_liveness_free_struct", "void", ["pointer"]);
      },
      get memorySnapshotCapture() {
        return r("il2cpp_capture_memory_snapshot", "pointer", []);
      },
      get memorySnapshotFree() {
        return r("il2cpp_free_captured_memory_snapshot", "void", ["pointer"]);
      },
      get memorySnapshotGetClasses() {
        return r("il2cpp_memory_snapshot_get_classes", "pointer", ["pointer", "pointer"]);
      },
      get memorySnapshotGetObjects() {
        return r("il2cpp_memory_snapshot_get_objects", "pointer", ["pointer", "pointer"]);
      },
      get methodGetClass() {
        return r("il2cpp_method_get_class", "pointer", ["pointer"]);
      },
      get methodGetFlags() {
        return r("il2cpp_method_get_flags", "uint32", ["pointer", "pointer"]);
      },
      get methodGetName() {
        return r("il2cpp_method_get_name", "pointer", ["pointer"]);
      },
      get methodGetObject() {
        return r("il2cpp_method_get_object", "pointer", ["pointer", "pointer"]);
      },
      get methodGetParameterCount() {
        return r("il2cpp_method_get_param_count", "uint8", ["pointer"]);
      },
      get methodGetParameterName() {
        return r("il2cpp_method_get_param_name", "pointer", ["pointer", "uint32"]);
      },
      get methodGetParameters() {
        return r("il2cpp_method_get_parameters", "pointer", ["pointer", "pointer"]);
      },
      get methodGetParameterType() {
        return r("il2cpp_method_get_param", "pointer", ["pointer", "uint32"]);
      },
      get methodGetReturnType() {
        return r("il2cpp_method_get_return_type", "pointer", ["pointer"]);
      },
      get methodIsGeneric() {
        return r("il2cpp_method_is_generic", "bool", ["pointer"]);
      },
      get methodIsInflated() {
        return r("il2cpp_method_is_inflated", "bool", ["pointer"]);
      },
      get methodIsInstance() {
        return r("il2cpp_method_is_instance", "bool", ["pointer"]);
      },
      get monitorEnter() {
        return r("il2cpp_monitor_enter", "void", ["pointer"]);
      },
      get monitorExit() {
        return r("il2cpp_monitor_exit", "void", ["pointer"]);
      },
      get monitorPulse() {
        return r("il2cpp_monitor_pulse", "void", ["pointer"]);
      },
      get monitorPulseAll() {
        return r("il2cpp_monitor_pulse_all", "void", ["pointer"]);
      },
      get monitorTryEnter() {
        return r("il2cpp_monitor_try_enter", "bool", ["pointer", "uint32"]);
      },
      get monitorTryWait() {
        return r("il2cpp_monitor_try_wait", "bool", ["pointer", "uint32"]);
      },
      get monitorWait() {
        return r("il2cpp_monitor_wait", "void", ["pointer"]);
      },
      get objectGetClass() {
        return r("il2cpp_object_get_class", "pointer", ["pointer"]);
      },
      get objectGetVirtualMethod() {
        return r("il2cpp_object_get_virtual_method", "pointer", ["pointer", "pointer"]);
      },
      get objectInitialize() {
        return r("il2cpp_runtime_object_init_exception", "void", ["pointer", "pointer"]);
      },
      get objectNew() {
        return r("il2cpp_object_new", "pointer", ["pointer"]);
      },
      get objectGetSize() {
        return r("il2cpp_object_get_size", "uint32", ["pointer"]);
      },
      get objectUnbox() {
        return r("il2cpp_object_unbox", "pointer", ["pointer"]);
      },
      get resolveInternalCall() {
        return r("il2cpp_resolve_icall", "pointer", ["pointer"]);
      },
      get stringGetChars() {
        return r("il2cpp_string_chars", "pointer", ["pointer"]);
      },
      get stringGetLength() {
        return r("il2cpp_string_length", "int32", ["pointer"]);
      },
      get stringNew() {
        return r("il2cpp_string_new", "pointer", ["pointer"]);
      },
      get valueTypeBox() {
        return r("il2cpp_value_box", "pointer", ["pointer", "pointer"]);
      },
      get threadAttach() {
        return r("il2cpp_thread_attach", "pointer", ["pointer"]);
      },
      get threadDetach() {
        return r("il2cpp_thread_detach", "void", ["pointer"]);
      },
      get threadGetAttachedThreads() {
        return r("il2cpp_thread_get_all_attached_threads", "pointer", ["pointer"]);
      },
      get threadGetCurrent() {
        return r("il2cpp_thread_current", "pointer", []);
      },
      get threadIsVm() {
        return r("il2cpp_is_vm_thread", "bool", ["pointer"]);
      },
      get typeGetClass() {
        return r("il2cpp_class_from_type", "pointer", ["pointer"]);
      },
      get typeGetName() {
        return r("il2cpp_type_get_name", "pointer", ["pointer"]);
      },
      get typeGetObject() {
        return r("il2cpp_type_get_object", "pointer", ["pointer"]);
      },
      get typeGetTypeEnum() {
        return r("il2cpp_type_get_type", "int", ["pointer"]);
      }
    };
    decorate(Il2Cpp3.api, lazy);
    getter(Il2Cpp3, "memorySnapshotApi", () => new CModule("#include <stdint.h>\n#include <string.h>\n\ntypedef struct Il2CppManagedMemorySnapshot Il2CppManagedMemorySnapshot;\ntypedef struct Il2CppMetadataType Il2CppMetadataType;\n\nstruct Il2CppManagedMemorySnapshot\n{\n  struct Il2CppManagedHeap\n  {\n    uint32_t section_count;\n    void * sections;\n  } heap;\n  struct Il2CppStacks\n  {\n    uint32_t stack_count;\n    void * stacks;\n  } stacks;\n  struct Il2CppMetadataSnapshot\n  {\n    uint32_t type_count;\n    Il2CppMetadataType * types;\n  } metadata_snapshot;\n  struct Il2CppGCHandles\n  {\n    uint32_t tracked_object_count;\n    void ** pointers_to_objects;\n  } gc_handles;\n  struct Il2CppRuntimeInformation\n  {\n    uint32_t pointer_size;\n    uint32_t object_header_size;\n    uint32_t array_header_size;\n    uint32_t array_bounds_offset_in_header;\n    uint32_t array_size_offset_in_header;\n    uint32_t allocation_granularity;\n  } runtime_information;\n  void * additional_user_information;\n};\n\nstruct Il2CppMetadataType\n{\n  uint32_t flags;\n  void * fields;\n  uint32_t field_count;\n  uint32_t statics_size;\n  uint8_t * statics;\n  uint32_t base_or_element_type_index;\n  char * name;\n  const char * assembly_name;\n  uint64_t type_info_address;\n  uint32_t size;\n};\n\nuintptr_t\nil2cpp_memory_snapshot_get_classes (\n    const Il2CppManagedMemorySnapshot * snapshot, Il2CppMetadataType ** iter)\n{\n  const int zero = 0;\n  const void * null = 0;\n\n  if (iter != NULL && snapshot->metadata_snapshot.type_count > zero)\n  {\n    if (*iter == null)\n    {\n      *iter = snapshot->metadata_snapshot.types;\n      return (uintptr_t) (*iter)->type_info_address;\n    }\n    else\n    {\n      Il2CppMetadataType * metadata_type = *iter + 1;\n\n      if (metadata_type < snapshot->metadata_snapshot.types +\n                              snapshot->metadata_snapshot.type_count)\n      {\n        *iter = metadata_type;\n        return (uintptr_t) (*iter)->type_info_address;\n      }\n    }\n  }\n  return 0;\n}\n\nvoid **\nil2cpp_memory_snapshot_get_objects (\n    const Il2CppManagedMemorySnapshot * snapshot, uint32_t * size)\n{\n  *size = snapshot->gc_handles.tracked_object_count;\n  return snapshot->gc_handles.pointers_to_objects;\n}\n"), lazy);
    function r(exportName, retType, argTypes) {
      const handle = globalThis.IL2CPP_EXPORTS?.[exportName]?.() ?? Il2Cpp3.module.findExportByName(exportName) ?? Il2Cpp3.memorySnapshotApi[exportName];
      return new NativeFunction(handle ?? raise(`couldn't resolve export ${exportName}`), retType, argTypes);
    }
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    Il2Cpp3.application = {
      /** */
      get dataPath() {
        return unityEngineCall("get_persistentDataPath");
      },
      /** */
      get identifier() {
        return unityEngineCall("get_identifier") ?? unityEngineCall("get_bundleIdentifier");
      },
      /** Gets the version of the application */
      get version() {
        return unityEngineCall("get_version");
      }
    };
    getter(Il2Cpp3, "unityVersion", () => {
      try {
        const unityVersion = globalThis.IL2CPP_UNITY_VERSION ?? unityEngineCall("get_unityVersion");
        if (unityVersion != null) {
          return unityVersion;
        }
      } catch (_) {
      }
      const searchPattern = "69 6c 32 63 70 70";
      for (const range of Il2Cpp3.module.enumerateRanges("r--").concat(Process.getRangeByAddress(Il2Cpp3.module.base))) {
        for (let { address } of Memory.scanSync(range.base, range.size, searchPattern)) {
          while (address.readU8() != 0) {
            address = address.sub(1);
          }
          const match = UnityVersion.find(address.add(1).readCString());
          if (match != void 0) {
            return match;
          }
        }
      }
      raise("couldn't determine the Unity version, please specify it manually");
    }, lazy);
    getter(Il2Cpp3, "unityVersionIsBelow201830", () => {
      return UnityVersion.lt(Il2Cpp3.unityVersion, "2018.3.0");
    }, lazy);
    getter(Il2Cpp3, "unityVersionIsBelow202120", () => {
      return UnityVersion.lt(Il2Cpp3.unityVersion, "2021.2.0");
    }, lazy);
    function unityEngineCall(method) {
      const handle = Il2Cpp3.api.resolveInternalCall(Memory.allocUtf8String("UnityEngine.Application::" + method));
      const nativeFunction = new NativeFunction(handle, "pointer", []);
      return nativeFunction.isNull() ? null : new Il2Cpp3.String(nativeFunction()).asNullable()?.content ?? null;
    }
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    function dump(fileName, path) {
      fileName = fileName ?? `${Il2Cpp3.application.identifier ?? "unknown"}_${Il2Cpp3.application.version ?? "unknown"}.cs`;
      const destination = `${path ?? Il2Cpp3.application.dataPath}/${fileName}`;
      const file = new File(destination, "w");
      for (const assembly of Il2Cpp3.domain.assemblies) {
        inform(`dumping ${assembly.name}...`);
        for (const klass of assembly.image.classes) {
          file.write(`${klass}

`);
        }
      }
      file.flush();
      file.close();
      ok(`dump saved to ${destination}`);
    }
    Il2Cpp3.dump = dump;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    function installExceptionListener(targetThread = "current") {
      const currentThread = Il2Cpp3.api.threadGetCurrent();
      return Interceptor.attach(Il2Cpp3.module.getExportByName("__cxa_throw"), function(args) {
        if (targetThread == "current" && !Il2Cpp3.api.threadGetCurrent().equals(currentThread)) {
          return;
        }
        inform(new Il2Cpp3.Object(args[0].readPointer()));
      });
    }
    Il2Cpp3.installExceptionListener = installExceptionListener;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    function is(klass) {
      return (element) => {
        if (element instanceof Il2Cpp3.Class) {
          return klass.isAssignableFrom(element);
        } else {
          return klass.isAssignableFrom(element.class);
        }
      };
    }
    Il2Cpp3.is = is;
    function isExactly(klass) {
      return (element) => {
        if (element instanceof Il2Cpp3.Class) {
          return element.equals(klass);
        } else {
          return element.class.equals(klass);
        }
      };
    }
    Il2Cpp3.isExactly = isExactly;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    Il2Cpp3.gc = {
      /** Gets the heap size in bytes. */
      get heapSize() {
        return Il2Cpp3.api.gcGetHeapSize();
      },
      /** Determines whether the garbage collector is disabled. */
      get isEnabled() {
        return !Il2Cpp3.api.gcIsDisabled();
      },
      /** Determines whether the garbage collector is incremental. */
      get isIncremental() {
        return !!Il2Cpp3.api.gcIsIncremental();
      },
      /** Gets the number of nanoseconds the garbage collector can spend in a collection step. */
      get maxTimeSlice() {
        return Il2Cpp3.api.gcGetMaxTimeSlice();
      },
      /** Gets the used heap size in bytes. */
      get usedHeapSize() {
        return Il2Cpp3.api.gcGetUsedSize();
      },
      /** Enables or disables the garbage collector. */
      set isEnabled(value) {
        value ? Il2Cpp3.api.gcEnable() : Il2Cpp3.api.gcDisable();
      },
      /** Sets the number of nanoseconds the garbage collector can spend in a collection step. */
      set maxTimeSlice(nanoseconds) {
        Il2Cpp3.api.gcSetMaxTimeSlice(nanoseconds);
      },
      /** Returns the heap allocated objects of the specified class. This variant reads GC descriptors. */
      choose(klass) {
        const matches = [];
        const callback = (objects, size) => {
          for (let i = 0; i < size; i++) {
            matches.push(new Il2Cpp3.Object(objects.add(i * Process.pointerSize).readPointer()));
          }
        };
        const chooseCallback = new NativeCallback(callback, "void", ["pointer", "int", "pointer"]);
        if (Il2Cpp3.unityVersionIsBelow202120) {
          const onWorld = new NativeCallback(() => {
          }, "void", []);
          const state = Il2Cpp3.api.livenessCalculationBegin(klass, 0, chooseCallback, NULL, onWorld, onWorld);
          Il2Cpp3.api.livenessCalculationFromStatics(state);
          Il2Cpp3.api.livenessCalculationEnd(state);
        } else {
          const realloc = (handle, size) => {
            if (!handle.isNull() && size.compare(0) == 0) {
              Il2Cpp3.free(handle);
              return NULL;
            } else {
              return Il2Cpp3.alloc(size);
            }
          };
          const reallocCallback = new NativeCallback(realloc, "pointer", ["pointer", "size_t", "pointer"]);
          this.stopWorld();
          const state = Il2Cpp3.api.livenessAllocateStruct(klass, 0, chooseCallback, NULL, reallocCallback);
          Il2Cpp3.api.livenessCalculationFromStatics(state);
          Il2Cpp3.api.livenessFinalize(state);
          this.startWorld();
          Il2Cpp3.api.livenessFreeStruct(state);
        }
        return matches;
      },
      /** Forces a garbage collection of the specified generation. */
      collect(generation) {
        Il2Cpp3.api.gcCollect(generation < 0 ? 0 : generation > 2 ? 2 : generation);
      },
      /** Forces a garbage collection. */
      collectALittle() {
        Il2Cpp3.api.gcCollectALittle();
      },
      /** Resumes all the previously stopped threads. */
      startWorld() {
        return Il2Cpp3.api.gcStartWorld();
      },
      /** Performs an incremental garbage collection. */
      startIncrementalCollection() {
        return Il2Cpp3.api.gcStartIncrementalCollection();
      },
      /** Stops all threads which may access the garbage collected heap, other than the caller. */
      stopWorld() {
        return Il2Cpp3.api.gcStopWorld();
      }
    };
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    function alloc2(size = Process.pointerSize) {
      return Il2Cpp3.api.alloc(size);
    }
    Il2Cpp3.alloc = alloc2;
    function free(pointer) {
      return Il2Cpp3.api.free(pointer);
    }
    Il2Cpp3.free = free;
    function read2(pointer, type) {
      switch (type.typeEnum) {
        case Il2Cpp3.Type.enum.boolean:
          return !!pointer.readS8();
        case Il2Cpp3.Type.enum.byte:
          return pointer.readS8();
        case Il2Cpp3.Type.enum.unsignedByte:
          return pointer.readU8();
        case Il2Cpp3.Type.enum.short:
          return pointer.readS16();
        case Il2Cpp3.Type.enum.unsignedShort:
          return pointer.readU16();
        case Il2Cpp3.Type.enum.int:
          return pointer.readS32();
        case Il2Cpp3.Type.enum.unsignedInt:
          return pointer.readU32();
        case Il2Cpp3.Type.enum.char:
          return pointer.readU16();
        case Il2Cpp3.Type.enum.long:
          return pointer.readS64();
        case Il2Cpp3.Type.enum.unsignedLong:
          return pointer.readU64();
        case Il2Cpp3.Type.enum.float:
          return pointer.readFloat();
        case Il2Cpp3.Type.enum.double:
          return pointer.readDouble();
        case Il2Cpp3.Type.enum.nativePointer:
        case Il2Cpp3.Type.enum.unsignedNativePointer:
          return pointer.readPointer();
        case Il2Cpp3.Type.enum.pointer:
          return new Il2Cpp3.Pointer(pointer.readPointer(), type.class.baseType);
        case Il2Cpp3.Type.enum.valueType:
          return new Il2Cpp3.ValueType(pointer, type);
        case Il2Cpp3.Type.enum.object:
        case Il2Cpp3.Type.enum.class:
          return new Il2Cpp3.Object(pointer.readPointer());
        case Il2Cpp3.Type.enum.genericInstance:
          return type.class.isValueType ? new Il2Cpp3.ValueType(pointer, type) : new Il2Cpp3.Object(pointer.readPointer());
        case Il2Cpp3.Type.enum.string:
          return new Il2Cpp3.String(pointer.readPointer());
        case Il2Cpp3.Type.enum.array:
        case Il2Cpp3.Type.enum.multidimensionalArray:
          return new Il2Cpp3.Array(pointer.readPointer());
      }
      raise(`couldn't read the value from ${pointer} using an unhandled or unknown type ${type.name} (${type.typeEnum}), please file an issue`);
    }
    Il2Cpp3.read = read2;
    function write3(pointer, value, type) {
      switch (type.typeEnum) {
        case Il2Cpp3.Type.enum.boolean:
          return pointer.writeS8(+value);
        case Il2Cpp3.Type.enum.byte:
          return pointer.writeS8(value);
        case Il2Cpp3.Type.enum.unsignedByte:
          return pointer.writeU8(value);
        case Il2Cpp3.Type.enum.short:
          return pointer.writeS16(value);
        case Il2Cpp3.Type.enum.unsignedShort:
          return pointer.writeU16(value);
        case Il2Cpp3.Type.enum.int:
          return pointer.writeS32(value);
        case Il2Cpp3.Type.enum.unsignedInt:
          return pointer.writeU32(value);
        case Il2Cpp3.Type.enum.char:
          return pointer.writeU16(value);
        case Il2Cpp3.Type.enum.long:
          return pointer.writeS64(value);
        case Il2Cpp3.Type.enum.unsignedLong:
          return pointer.writeU64(value);
        case Il2Cpp3.Type.enum.float:
          return pointer.writeFloat(value);
        case Il2Cpp3.Type.enum.double:
          return pointer.writeDouble(value);
        case Il2Cpp3.Type.enum.nativePointer:
        case Il2Cpp3.Type.enum.unsignedNativePointer:
        case Il2Cpp3.Type.enum.pointer:
        case Il2Cpp3.Type.enum.string:
        case Il2Cpp3.Type.enum.array:
        case Il2Cpp3.Type.enum.multidimensionalArray:
          return pointer.writePointer(value);
        case Il2Cpp3.Type.enum.valueType:
          return Memory.copy(pointer, value, type.class.valueTypeSize), pointer;
        case Il2Cpp3.Type.enum.object:
        case Il2Cpp3.Type.enum.class:
        case Il2Cpp3.Type.enum.genericInstance:
          return value instanceof Il2Cpp3.ValueType ? (Memory.copy(pointer, value, type.class.valueTypeSize), pointer) : pointer.writePointer(value);
      }
      raise(`couldn't write value ${value} to ${pointer} using an unhandled or unknown type ${type.name} (${type.typeEnum}), please file an issue`);
    }
    Il2Cpp3.write = write3;
    function fromFridaValue(value, type) {
      if (globalThis.Array.isArray(value)) {
        const handle = Memory.alloc(type.class.valueTypeSize);
        const fields = type.class.fields.filter((_) => !_.isStatic);
        for (let i = 0; i < fields.length; i++) {
          const convertedValue = fromFridaValue(value[i], fields[i].type);
          write3(handle.add(fields[i].offset).sub(Il2Cpp3.Object.headerSize), convertedValue, fields[i].type);
        }
        return new Il2Cpp3.ValueType(handle, type);
      } else if (value instanceof NativePointer) {
        if (type.isByReference) {
          return new Il2Cpp3.Reference(value, type);
        }
        switch (type.typeEnum) {
          case Il2Cpp3.Type.enum.pointer:
            return new Il2Cpp3.Pointer(value, type.class.baseType);
          case Il2Cpp3.Type.enum.string:
            return new Il2Cpp3.String(value);
          case Il2Cpp3.Type.enum.class:
          case Il2Cpp3.Type.enum.genericInstance:
          case Il2Cpp3.Type.enum.object:
            return new Il2Cpp3.Object(value);
          case Il2Cpp3.Type.enum.array:
          case Il2Cpp3.Type.enum.multidimensionalArray:
            return new Il2Cpp3.Array(value);
          default:
            return value;
        }
      } else if (type.typeEnum == Il2Cpp3.Type.enum.boolean) {
        return !!value;
      } else if (type.typeEnum == Il2Cpp3.Type.enum.valueType && type.class.isEnum) {
        return fromFridaValue([value], type);
      } else {
        return value;
      }
    }
    Il2Cpp3.fromFridaValue = fromFridaValue;
    function toFridaValue(value) {
      if (typeof value == "boolean") {
        return +value;
      } else if (value instanceof Il2Cpp3.ValueType) {
        if (value.type.class.isEnum) {
          return value.field("value__").value;
        } else {
          const _ = value.type.class.fields.filter((_2) => !_2.isStatic).map((_2) => toFridaValue(_2.withHolder(value).value));
          return _.length == 0 ? [0] : _;
        }
      } else {
        return value;
      }
    }
    Il2Cpp3.toFridaValue = toFridaValue;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    getter(Il2Cpp3, "module", () => {
      const [moduleName, fallback] = getExpectedModuleNames();
      return Process.findModuleByName(moduleName) ?? Process.getModuleByName(fallback);
    });
    async function initialize(blocking = false) {
      Reflect.defineProperty(Il2Cpp3, "module", {
        // prettier-ignore
       value: await forModule(...getExpectedModuleNames())
      });
      if (Il2Cpp3.api.getCorlib().isNull()) {
        return await new Promise((resolve3) => {
          const interceptor = Interceptor.attach(Il2Cpp3.api.initialize, {
            onLeave() {
              interceptor.detach();
              blocking ? resolve3(true) : setImmediate(() => resolve3(false));
            }
          });
        });
      }
      return false;
    }
    Il2Cpp3.initialize = initialize;
    function getExpectedModuleNames() {
      if (globalThis.IL2CPP_MODULE_NAME) {
        return [globalThis.IL2CPP_MODULE_NAME];
      }
      switch (Process.platform) {
        case "linux":
          return [Android.apiLevel ? "libil2cpp.so" : "GameAssembly.so"];
        case "windows":
          return ["GameAssembly.dll"];
        case "darwin":
          return ["UnityFramework", "GameAssembly.dylib"];
      }
      raise(`${Process.platform} is not supported yet`);
    }
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    async function perform(block, flag = "bind") {
      try {
        const isInMainThread = await Il2Cpp3.initialize(flag == "main");
        if (flag == "main" && !isInMainThread) {
          return perform(() => Il2Cpp3.mainThread.schedule(block), "free");
        }
        let thread = Il2Cpp3.currentThread;
        const isForeignThread = thread == null;
        thread ??= Il2Cpp3.domain.attach();
        const result = block();
        if (isForeignThread) {
          if (flag == "free") {
            thread.detach();
          } else if (flag == "bind") {
            Script.bindWeak(globalThis, () => thread.detach());
          }
        }
        return result instanceof Promise ? await result : result;
      } catch (error2) {
        Script.nextTick((_) => {
          throw _;
        }, error2);
        return Promise.reject(error2);
      }
    }
    Il2Cpp3.perform = perform;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Tracer {
      /** @internal */
      #state = {
        depth: 0,
        buffer: [],
        history: /* @__PURE__ */ new Set(),
        flush: () => {
          if (this.#state.depth == 0) {
            const message = `
${this.#state.buffer.join("\n")}
`;
            if (this.#verbose) {
              inform(message);
            } else {
              const hash = cyrb53(message);
              if (!this.#state.history.has(hash)) {
                this.#state.history.add(hash);
                inform(message);
              }
            }
            this.#state.buffer.length = 0;
          }
        }
      };
      /** @internal */
      #threadId = Il2Cpp3.mainThread.id;
      /** @internal */
      #verbose = false;
      /** @internal */
      #applier;
      /** @internal */
      #targets = [];
      /** @internal */
      #domain;
      /** @internal */
      #assemblies;
      /** @internal */
      #classes;
      /** @internal */
      #methods;
      /** @internal */
      #assemblyFilter;
      /** @internal */
      #classFilter;
      /** @internal */
      #methodFilter;
      /** @internal */
      #parameterFilter;
      constructor(applier) {
        this.#applier = applier;
      }
      /** */
      thread(thread) {
        this.#threadId = thread.id;
        return this;
      }
      /** Determines whether print duplicate logs. */
      verbose(value) {
        this.#verbose = value;
        return this;
      }
      /** Sets the application domain as the place where to find the target methods. */
      domain() {
        this.#domain = Il2Cpp3.domain;
        return this;
      }
      /** Sets the passed `assemblies` as the place where to find the target methods. */
      assemblies(...assemblies) {
        this.#assemblies = assemblies;
        return this;
      }
      /** Sets the passed `classes` as the place where to find the target methods. */
      classes(...classes) {
        this.#classes = classes;
        return this;
      }
      /** Sets the passed `methods` as the target methods. */
      methods(...methods2) {
        this.#methods = methods2;
        return this;
      }
      /** Filters the assemblies where to find the target methods. */
      filterAssemblies(filter) {
        this.#assemblyFilter = filter;
        return this;
      }
      /** Filters the classes where to find the target methods. */
      filterClasses(filter) {
        this.#classFilter = filter;
        return this;
      }
      /** Filters the target methods. */
      filterMethods(filter) {
        this.#methodFilter = filter;
        return this;
      }
      /** Filters the target methods. */
      filterParameters(filter) {
        this.#parameterFilter = filter;
        return this;
      }
      /** Commits the current changes by finding the target methods. */
      and() {
        const filterMethod = (method) => {
          if (this.#parameterFilter == void 0) {
            this.#targets.push(method);
            return;
          }
          for (const parameter of method.parameters) {
            if (this.#parameterFilter(parameter)) {
              this.#targets.push(method);
              break;
            }
          }
        };
        const filterMethods = (values) => {
          for (const method of values) {
            filterMethod(method);
          }
        };
        const filterClass = (klass) => {
          if (this.#methodFilter == void 0) {
            filterMethods(klass.methods);
            return;
          }
          for (const method of klass.methods) {
            if (this.#methodFilter(method)) {
              filterMethod(method);
            }
          }
        };
        const filterClasses = (values) => {
          for (const klass of values) {
            filterClass(klass);
          }
        };
        const filterAssembly = (assembly) => {
          if (this.#classFilter == void 0) {
            filterClasses(assembly.image.classes);
            return;
          }
          for (const klass of assembly.image.classes) {
            if (this.#classFilter(klass)) {
              filterClass(klass);
            }
          }
        };
        const filterAssemblies = (assemblies) => {
          for (const assembly of assemblies) {
            filterAssembly(assembly);
          }
        };
        const filterDomain = (domain) => {
          if (this.#assemblyFilter == void 0) {
            filterAssemblies(domain.assemblies);
            return;
          }
          for (const assembly of domain.assemblies) {
            if (this.#assemblyFilter(assembly)) {
              filterAssembly(assembly);
            }
          }
        };
        this.#methods ? filterMethods(this.#methods) : this.#classes ? filterClasses(this.#classes) : this.#assemblies ? filterAssemblies(this.#assemblies) : this.#domain ? filterDomain(this.#domain) : void 0;
        this.#assemblies = void 0;
        this.#classes = void 0;
        this.#methods = void 0;
        this.#assemblyFilter = void 0;
        this.#classFilter = void 0;
        this.#methodFilter = void 0;
        this.#parameterFilter = void 0;
        return this;
      }
      /** Starts tracing. */
      attach() {
        for (const target of this.#targets) {
          if (!target.virtualAddress.isNull()) {
            try {
              this.#applier(target, this.#state, this.#threadId);
            } catch (e) {
              switch (e.message) {
                case /unable to intercept function at \w+; please file a bug/.exec(e.message)?.input:
                case "already replaced this function":
                  break;
                default:
                  throw e;
              }
            }
          }
        }
      }
    }
    Il2Cpp3.Tracer = Tracer;
    function trace(parameters = false) {
      const applier = () => (method, state, threadId) => {
        const paddedVirtualAddress = method.relativeVirtualAddress.toString(16).padStart(8, "0");
        Interceptor.attach(method.virtualAddress, {
          onEnter() {
            if (this.threadId == threadId) {
              state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(state.depth++)}\u250C\u2500\x1B[35m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m`);
            }
          },
          onLeave() {
            if (this.threadId == threadId) {
              state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(--state.depth)}\u2514\u2500\x1B[33m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m`);
              state.flush();
            }
          }
        });
      };
      const applierWithParameters = () => (method, state, threadId) => {
        const paddedVirtualAddress = method.relativeVirtualAddress.toString(16).padStart(8, "0");
        const startIndex = +!method.isStatic | +Il2Cpp3.unityVersionIsBelow201830;
        const callback = function(...args) {
          if (this.threadId == threadId) {
            const thisParameter = method.isStatic ? void 0 : new Il2Cpp3.Parameter("this", -1, method.class.type);
            const parameters2 = thisParameter ? [thisParameter].concat(method.parameters) : method.parameters;
            state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(state.depth++)}\u250C\u2500\x1B[35m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m(${parameters2.map((e) => `\x1B[32m${e.name}\x1B[0m = \x1B[31m${Il2Cpp3.fromFridaValue(args[e.position + startIndex], e.type)}\x1B[0m`).join(", ")})`);
          }
          const returnValue = method.nativeFunction(...args);
          if (this.threadId == threadId) {
            state.buffer.push(`\x1B[2m0x${paddedVirtualAddress}\x1B[0m ${`\u2502 `.repeat(--state.depth)}\u2514\u2500\x1B[33m${method.class.type.name}::\x1B[1m${method.name}\x1B[0m\x1B[0m${returnValue == void 0 ? "" : ` = \x1B[36m${Il2Cpp3.fromFridaValue(returnValue, method.returnType)}`}\x1B[0m`);
            state.flush();
          }
          return returnValue;
        };
        method.revert();
        const nativeCallback = new NativeCallback(callback, method.returnType.fridaAlias, method.fridaSignature);
        Interceptor.replace(method.virtualAddress, nativeCallback);
      };
      return new Il2Cpp3.Tracer(parameters ? applierWithParameters() : applier());
    }
    Il2Cpp3.trace = trace;
    function backtrace(mode) {
      const methods2 = Il2Cpp3.domain.assemblies.flatMap((_) => _.image.classes.flatMap((_2) => _2.methods.filter((_3) => !_3.virtualAddress.isNull()))).sort((_, __) => _.virtualAddress.compare(__.virtualAddress));
      const searchInsert = (target) => {
        let left = 0;
        let right = methods2.length - 1;
        while (left <= right) {
          const pivot = Math.floor((left + right) / 2);
          const comparison = methods2[pivot].virtualAddress.compare(target);
          if (comparison == 0) {
            return methods2[pivot];
          } else if (comparison > 0) {
            right = pivot - 1;
          } else {
            left = pivot + 1;
          }
        }
        return methods2[right];
      };
      const applier = () => (method, state, threadId) => {
        Interceptor.attach(method.virtualAddress, function() {
          if (this.threadId == threadId) {
            const handles = globalThis.Thread.backtrace(this.context, mode);
            handles.unshift(method.virtualAddress);
            for (const handle of handles) {
              if (handle.compare(Il2Cpp3.module.base) > 0 && handle.compare(Il2Cpp3.module.base.add(Il2Cpp3.module.size)) < 0) {
                const method2 = searchInsert(handle);
                if (method2) {
                  const offset = handle.sub(method2.virtualAddress);
                  if (offset.compare(4095) < 0) {
                    state.buffer.push(`\x1B[2m0x${method2.relativeVirtualAddress.toString(16).padStart(8, "0")}\x1B[0m\x1B[2m+0x${offset.toString(16).padStart(3, `0`)}\x1B[0m ${method2.class.type.name}::\x1B[1m${method2.name}\x1B[0m`);
                  }
                }
              }
            }
            state.flush();
          }
        });
      };
      return new Il2Cpp3.Tracer(applier());
    }
    Il2Cpp3.backtrace = backtrace;
    function cyrb53(str) {
      let h1 = 3735928559;
      let h2 = 1103547991;
      for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
      h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
      h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
      h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
      return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    }
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Array2 extends NativeStruct {
      /** Gets the Il2CppArray struct size, possibly equal to `Process.pointerSize * 4`. */
      static get headerSize() {
        return Il2Cpp3.corlib.class("System.Array").instanceSize;
      }
      /** @internal Gets a pointer to the first element of the current array. */
      get elements() {
        const array2 = Il2Cpp3.string("v").object.method("ToCharArray", 0).invoke();
        const offset = array2.handle.offsetOf((_) => _.readS16() == 118) ?? raise("couldn't find the elements offset in the native array struct");
        getter(Il2Cpp3.Array.prototype, "elements", function() {
          return new Il2Cpp3.Pointer(this.handle.add(offset), this.elementType);
        }, lazy);
        return this.elements;
      }
      /** Gets the size of the object encompassed by the current array. */
      get elementSize() {
        return this.elementType.class.arrayElementSize;
      }
      /** Gets the type of the object encompassed by the current array. */
      get elementType() {
        return this.object.class.type.class.baseType;
      }
      /** Gets the total number of elements in all the dimensions of the current array. */
      get length() {
        return Il2Cpp3.api.arrayGetLength(this);
      }
      /** Gets the encompassing object of the current array. */
      get object() {
        return new Il2Cpp3.Object(this);
      }
      /** Gets the element at the specified index of the current array. */
      get(index) {
        if (index < 0 || index >= this.length) {
          raise(`cannot get element at index ${index} as the array length is ${this.length}`);
        }
        return this.elements.get(index);
      }
      /** Sets the element at the specified index of the current array. */
      set(index, value) {
        if (index < 0 || index >= this.length) {
          raise(`cannot set element at index ${index} as the array length is ${this.length}`);
        }
        this.elements.set(index, value);
      }
      /** */
      toString() {
        return this.isNull() ? "null" : `[${this.elements.read(this.length, 0)}]`;
      }
      /** Iterable. */
      *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
          yield this.elements.get(i);
        }
      }
    }
    __decorate([
      lazy
    ], Array2.prototype, "elementSize", null);
    __decorate([
      lazy
    ], Array2.prototype, "elementType", null);
    __decorate([
      lazy
    ], Array2.prototype, "length", null);
    __decorate([
      lazy
    ], Array2.prototype, "object", null);
    __decorate([
      lazy
    ], Array2, "headerSize", null);
    Il2Cpp3.Array = Array2;
    function array(klass, lengthOrElements) {
      const length = typeof lengthOrElements == "number" ? lengthOrElements : lengthOrElements.length;
      const array2 = new Il2Cpp3.Array(Il2Cpp3.api.arrayNew(klass, length));
      if (globalThis.Array.isArray(lengthOrElements)) {
        array2.elements.write(lengthOrElements);
      }
      return array2;
    }
    Il2Cpp3.array = array;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    let Assembly = class Assembly extends NativeStruct {
      /** Gets the image of this assembly. */
      get image() {
        let get2 = function() {
          return new Il2Cpp3.Image(Il2Cpp3.api.assemblyGetImage(this));
        };
        try {
          Il2Cpp3.api.assemblyGetImage;
        } catch (_) {
          get2 = function() {
            return new Il2Cpp3.Image(this.object.method("GetType", 1).invoke(Il2Cpp3.string("<Module>")).method("get_Module").invoke().field("_impl").value);
          };
        }
        getter(Il2Cpp3.Assembly.prototype, "image", get2, lazy);
        return this.image;
      }
      /** Gets the name of this assembly. */
      get name() {
        return this.image.name.replace(".dll", "");
      }
      /** Gets the encompassing object of the current assembly. */
      get object() {
        for (const _ of Il2Cpp3.domain.object.method("GetAssemblies", 1).invoke(false)) {
          if (_.field("_mono_assembly").value.equals(this)) {
            return _;
          }
        }
        raise("couldn't find the object of the native assembly struct");
      }
    };
    __decorate([
      lazy
    ], Assembly.prototype, "name", null);
    __decorate([
      lazy
    ], Assembly.prototype, "object", null);
    Assembly = __decorate([
      recycle
    ], Assembly);
    Il2Cpp3.Assembly = Assembly;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    let Class = class Class extends NativeStruct {
      /** Gets the actual size of the instance of the current class. */
      get actualInstanceSize() {
        const SystemString = Il2Cpp3.corlib.class("System.String");
        const offset = SystemString.handle.offsetOf((_) => _.readInt() == SystemString.instanceSize - 2) ?? raise("couldn't find the actual instance size offset in the native class struct");
        getter(Il2Cpp3.Class.prototype, "actualInstanceSize", function() {
          return this.handle.add(offset).readS32();
        }, lazy);
        return this.actualInstanceSize;
      }
      /** Gets the array class which encompass the current class. */
      get arrayClass() {
        return new Il2Cpp3.Class(Il2Cpp3.api.classGetArrayClass(this, 1));
      }
      /** Gets the size of the object encompassed by the current array class. */
      get arrayElementSize() {
        return Il2Cpp3.api.classGetArrayElementSize(this);
      }
      /** Gets the name of the assembly in which the current class is defined. */
      get assemblyName() {
        return Il2Cpp3.api.classGetAssemblyName(this).readUtf8String().replace(".dll", "");
      }
      /** Gets the class that declares the current nested class. */
      get declaringClass() {
        return new Il2Cpp3.Class(Il2Cpp3.api.classGetDeclaringType(this)).asNullable();
      }
      /** Gets the encompassed type of this array, reference, pointer or enum type. */
      get baseType() {
        return new Il2Cpp3.Type(Il2Cpp3.api.classGetBaseType(this)).asNullable();
      }
      /** Gets the class of the object encompassed or referred to by the current array, pointer or reference class. */
      get elementClass() {
        return new Il2Cpp3.Class(Il2Cpp3.api.classGetElementClass(this)).asNullable();
      }
      /** Gets the fields of the current class. */
      get fields() {
        return readNativeIterator((_) => Il2Cpp3.api.classGetFields(this, _)).map((_) => new Il2Cpp3.Field(_));
      }
      /** Gets the flags of the current class. */
      get flags() {
        return Il2Cpp3.api.classGetFlags(this);
      }
      /** Gets the full name (namespace + name) of the current class. */
      get fullName() {
        return this.namespace ? `${this.namespace}.${this.name}` : this.name;
      }
      /** Gets the generics parameters of this generic class. */
      get generics() {
        if (!this.isGeneric && !this.isInflated) {
          return [];
        }
        const types2 = this.type.object.method("GetGenericArguments").invoke();
        return globalThis.Array.from(types2).map((_) => new Il2Cpp3.Class(Il2Cpp3.api.classFromObject(_)));
      }
      /** Determines whether the GC has tracking references to the current class instances. */
      get hasReferences() {
        return !!Il2Cpp3.api.classHasReferences(this);
      }
      /** Determines whether ther current class has a valid static constructor. */
      get hasStaticConstructor() {
        const staticConstructor = this.tryMethod(".cctor");
        return staticConstructor != null && !staticConstructor.virtualAddress.isNull();
      }
      /** Gets the image in which the current class is defined. */
      get image() {
        return new Il2Cpp3.Image(Il2Cpp3.api.classGetImage(this));
      }
      /** Gets the size of the instance of the current class. */
      get instanceSize() {
        return Il2Cpp3.api.classGetInstanceSize(this);
      }
      /** Determines whether the current class is abstract. */
      get isAbstract() {
        return !!Il2Cpp3.api.classIsAbstract(this);
      }
      /** Determines whether the current class is blittable. */
      get isBlittable() {
        return !!Il2Cpp3.api.classIsBlittable(this);
      }
      /** Determines whether the current class is an enumeration. */
      get isEnum() {
        return !!Il2Cpp3.api.classIsEnum(this);
      }
      /** Determines whether the current class is a generic one. */
      get isGeneric() {
        return !!Il2Cpp3.api.classIsGeneric(this);
      }
      /** Determines whether the current class is inflated. */
      get isInflated() {
        return !!Il2Cpp3.api.classIsInflated(this);
      }
      /** Determines whether the current class is an interface. */
      get isInterface() {
        return !!Il2Cpp3.api.classIsInterface(this);
      }
      /** Determines whether the current class is a struct. */
      get isStruct() {
        return this.isValueType && !this.isEnum;
      }
      /** Determines whether the current class is a value type. */
      get isValueType() {
        return !!Il2Cpp3.api.classIsValueType(this);
      }
      /** Gets the interfaces implemented or inherited by the current class. */
      get interfaces() {
        return readNativeIterator((_) => Il2Cpp3.api.classGetInterfaces(this, _)).map((_) => new Il2Cpp3.Class(_));
      }
      /** Gets the methods implemented by the current class. */
      get methods() {
        return readNativeIterator((_) => Il2Cpp3.api.classGetMethods(this, _)).map((_) => new Il2Cpp3.Method(_));
      }
      /** Gets the name of the current class. */
      get name() {
        return Il2Cpp3.api.classGetName(this).readUtf8String();
      }
      /** Gets the namespace of the current class. */
      get namespace() {
        return Il2Cpp3.api.classGetNamespace(this).readUtf8String();
      }
      /** Gets the classes nested inside the current class. */
      get nestedClasses() {
        return readNativeIterator((_) => Il2Cpp3.api.classGetNestedClasses(this, _)).map((_) => new Il2Cpp3.Class(_));
      }
      /** Gets the class from which the current class directly inherits. */
      get parent() {
        return new Il2Cpp3.Class(Il2Cpp3.api.classGetParent(this)).asNullable();
      }
      /** Gets the rank (number of dimensions) of the current array class. */
      get rank() {
        let rank = 0;
        const name = this.name;
        for (let i = this.name.length - 1; i > 0; i--) {
          const c = name[i];
          if (c == "]")
            rank++;
          else if (c == "[" || rank == 0)
            break;
          else if (c == ",")
            rank++;
          else
            break;
        }
        return rank;
      }
      /** Gets a pointer to the static fields of the current class. */
      get staticFieldsData() {
        return Il2Cpp3.api.classGetStaticFieldData(this);
      }
      /** Gets the size of the instance - as a value type - of the current class. */
      get valueTypeSize() {
        return Il2Cpp3.api.classGetValueTypeSize(this, NULL);
      }
      /** Gets the type of the current class. */
      get type() {
        return new Il2Cpp3.Type(Il2Cpp3.api.classGetType(this));
      }
      /** Allocates a new object of the current class. */
      alloc() {
        return new Il2Cpp3.Object(Il2Cpp3.api.objectNew(this));
      }
      /** Gets the field identified by the given name. */
      field(name) {
        return this.tryField(name) ?? raise(`couldn't find field ${name} in class ${this.type.name}`);
      }
      /** Builds a generic instance of the current generic class. */
      inflate(...classes) {
        if (!this.isGeneric) {
          raise(`cannot inflate class ${this.type.name} as it has no generic parameters`);
        }
        if (this.generics.length != classes.length) {
          raise(`cannot inflate class ${this.type.name} as it needs ${this.generics.length} generic parameter(s), not ${classes.length}`);
        }
        const types2 = classes.map((_) => _.type.object);
        const typeArray = Il2Cpp3.array(Il2Cpp3.corlib.class("System.Type"), types2);
        const inflatedType = this.type.object.method("MakeGenericType", 1).invoke(typeArray);
        return new Il2Cpp3.Class(Il2Cpp3.api.classFromObject(inflatedType));
      }
      /** Calls the static constructor of the current class. */
      initialize() {
        Il2Cpp3.api.classInitialize(this);
        return this;
      }
      /** Determines whether an instance of `other` class can be assigned to a variable of the current type. */
      isAssignableFrom(other) {
        return !!Il2Cpp3.api.classIsAssignableFrom(this, other);
      }
      /** Determines whether the current class derives from `other` class. */
      isSubclassOf(other, checkInterfaces) {
        return !!Il2Cpp3.api.classIsSubclassOf(this, other, +checkInterfaces);
      }
      /** Gets the method identified by the given name and parameter count. */
      method(name, parameterCount = -1) {
        return this.tryMethod(name, parameterCount) ?? raise(`couldn't find method ${name} in class ${this.type.name}`);
      }
      /** Gets the nested class with the given name. */
      nested(name) {
        return this.tryNested(name) ?? raise(`couldn't find nested class ${name} in class ${this.type.name}`);
      }
      /** Allocates a new object of the current class and calls its default constructor. */
      new() {
        const object = this.alloc();
        const exceptionArray = Memory.alloc(Process.pointerSize);
        Il2Cpp3.api.objectInitialize(object, exceptionArray);
        const exception = exceptionArray.readPointer();
        if (!exception.isNull()) {
          raise(new Il2Cpp3.Object(exception).toString());
        }
        return object;
      }
      /** Gets the field with the given name. */
      tryField(name) {
        return new Il2Cpp3.Field(Il2Cpp3.api.classGetFieldFromName(this, Memory.allocUtf8String(name))).asNullable();
      }
      /** Gets the method with the given name and parameter count. */
      tryMethod(name, parameterCount = -1) {
        return new Il2Cpp3.Method(Il2Cpp3.api.classGetMethodFromName(this, Memory.allocUtf8String(name), parameterCount)).asNullable();
      }
      /** Gets the nested class with the given name. */
      tryNested(name) {
        return this.nestedClasses.find((_) => _.name == name);
      }
      /** */
      toString() {
        const inherited = [this.parent].concat(this.interfaces);
        return `// ${this.assemblyName}
${this.isEnum ? `enum` : this.isStruct ? `struct` : this.isInterface ? `interface` : `class`} ${this.type.name}${inherited ? ` : ${inherited.map((_) => _?.type.name).join(`, `)}` : ``}
{
    ${this.fields.join(`
    `)}
    ${this.methods.join(`
    `)}
}`;
      }
      /** Executes a callback for every defined class. */
      static enumerate(block) {
        const callback = new NativeCallback((_) => block(new Il2Cpp3.Class(_)), "void", ["pointer", "pointer"]);
        return Il2Cpp3.api.classForEach(callback, NULL);
      }
    };
    __decorate([
      lazy
    ], Class.prototype, "arrayClass", null);
    __decorate([
      lazy
    ], Class.prototype, "arrayElementSize", null);
    __decorate([
      lazy
    ], Class.prototype, "assemblyName", null);
    __decorate([
      lazy
    ], Class.prototype, "declaringClass", null);
    __decorate([
      lazy
    ], Class.prototype, "baseType", null);
    __decorate([
      lazy
    ], Class.prototype, "elementClass", null);
    __decorate([
      lazy
    ], Class.prototype, "fields", null);
    __decorate([
      lazy
    ], Class.prototype, "flags", null);
    __decorate([
      lazy
    ], Class.prototype, "fullName", null);
    __decorate([
      lazy
    ], Class.prototype, "generics", null);
    __decorate([
      lazy
    ], Class.prototype, "hasReferences", null);
    __decorate([
      lazy
    ], Class.prototype, "hasStaticConstructor", null);
    __decorate([
      lazy
    ], Class.prototype, "image", null);
    __decorate([
      lazy
    ], Class.prototype, "instanceSize", null);
    __decorate([
      lazy
    ], Class.prototype, "isAbstract", null);
    __decorate([
      lazy
    ], Class.prototype, "isBlittable", null);
    __decorate([
      lazy
    ], Class.prototype, "isEnum", null);
    __decorate([
      lazy
    ], Class.prototype, "isGeneric", null);
    __decorate([
      lazy
    ], Class.prototype, "isInflated", null);
    __decorate([
      lazy
    ], Class.prototype, "isInterface", null);
    __decorate([
      lazy
    ], Class.prototype, "isValueType", null);
    __decorate([
      lazy
    ], Class.prototype, "interfaces", null);
    __decorate([
      lazy
    ], Class.prototype, "methods", null);
    __decorate([
      lazy
    ], Class.prototype, "name", null);
    __decorate([
      lazy
    ], Class.prototype, "namespace", null);
    __decorate([
      lazy
    ], Class.prototype, "nestedClasses", null);
    __decorate([
      lazy
    ], Class.prototype, "parent", null);
    __decorate([
      lazy
    ], Class.prototype, "rank", null);
    __decorate([
      lazy
    ], Class.prototype, "staticFieldsData", null);
    __decorate([
      lazy
    ], Class.prototype, "valueTypeSize", null);
    __decorate([
      lazy
    ], Class.prototype, "type", null);
    Class = __decorate([
      recycle
    ], Class);
    Il2Cpp3.Class = Class;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    function delegate(klass, block) {
      const SystemDelegate = Il2Cpp3.corlib.class("System.Delegate");
      const SystemMulticastDelegate = Il2Cpp3.corlib.class("System.MulticastDelegate");
      if (!SystemDelegate.isAssignableFrom(klass)) {
        raise(`cannot create a delegate for ${klass.type.name} as it's a non-delegate class`);
      }
      if (klass.equals(SystemDelegate) || klass.equals(SystemMulticastDelegate)) {
        raise(`cannot create a delegate for neither ${SystemDelegate.type.name} nor ${SystemMulticastDelegate.type.name}, use a subclass instead`);
      }
      const delegate2 = klass.alloc();
      const key = delegate2.handle.toString();
      const Invoke = delegate2.tryMethod("Invoke") ?? raise(`cannot create a delegate for ${klass.type.name}, there is no Invoke method`);
      delegate2.method(".ctor").invoke(delegate2, Invoke.handle);
      const callback = Invoke.wrap(block);
      delegate2.field("method_ptr").value = callback;
      delegate2.field("invoke_impl").value = callback;
      Il2Cpp3._callbacksToKeepAlive[key] = callback;
      return delegate2;
    }
    Il2Cpp3.delegate = delegate;
    Il2Cpp3._callbacksToKeepAlive = {};
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    let Domain = class Domain extends NativeStruct {
      /** Gets the assemblies that have been loaded into the execution context of the application domain. */
      get assemblies() {
        let handles = readNativeList((_) => Il2Cpp3.api.domainGetAssemblies(this, _));
        if (handles.length == 0) {
          const assemblyObjects = this.object.method("GetAssemblies").overload().invoke();
          handles = globalThis.Array.from(assemblyObjects).map((_) => _.field("_mono_assembly").value);
        }
        return handles.map((_) => new Il2Cpp3.Assembly(_));
      }
      /** Gets the encompassing object of the application domain. */
      get object() {
        return Il2Cpp3.corlib.class("System.AppDomain").method("get_CurrentDomain").invoke();
      }
      /** Opens and loads the assembly with the given name. */
      assembly(name) {
        return this.tryAssembly(name) ?? raise(`couldn't find assembly ${name}`);
      }
      /** Attached a new thread to the application domain. */
      attach() {
        return new Il2Cpp3.Thread(Il2Cpp3.api.threadAttach(this));
      }
      /** Opens and loads the assembly with the given name. */
      tryAssembly(name) {
        return new Il2Cpp3.Assembly(Il2Cpp3.api.domainGetAssemblyFromName(this, Memory.allocUtf8String(name))).asNullable();
      }
    };
    __decorate([
      lazy
    ], Domain.prototype, "assemblies", null);
    __decorate([
      lazy
    ], Domain.prototype, "object", null);
    Domain = __decorate([
      recycle
    ], Domain);
    Il2Cpp3.Domain = Domain;
    getter(Il2Cpp3, "domain", () => {
      return new Il2Cpp3.Domain(Il2Cpp3.api.domainGet());
    }, lazy);
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Field extends NativeStruct {
      /** Gets the class in which this field is defined. */
      get class() {
        return new Il2Cpp3.Class(Il2Cpp3.api.fieldGetClass(this));
      }
      /** Gets the flags of the current field. */
      get flags() {
        return Il2Cpp3.api.fieldGetFlags(this);
      }
      /** Determines whether this field value is known at compile time. */
      get isLiteral() {
        return (this.flags & 64) != 0;
      }
      /** Determines whether this field is static. */
      get isStatic() {
        return (this.flags & 16) != 0;
      }
      /** Determines whether this field is thread static. */
      get isThreadStatic() {
        const offset = Il2Cpp3.corlib.class("System.AppDomain").field("type_resolve_in_progress").offset;
        getter(Il2Cpp3.Field.prototype, "isThreadStatic", function() {
          return this.offset == offset;
        }, lazy);
        return this.isThreadStatic;
      }
      /** Gets the access modifier of this field. */
      get modifier() {
        switch (this.flags & 7) {
          case 1:
            return "private";
          case 2:
            return "private protected";
          case 3:
            return "internal";
          case 4:
            return "protected";
          case 5:
            return "protected internal";
          case 6:
            return "public";
        }
      }
      /** Gets the name of this field. */
      get name() {
        return Il2Cpp3.api.fieldGetName(this).readUtf8String();
      }
      /** Gets the offset of this field, calculated as the difference with its owner virtual address. */
      get offset() {
        return Il2Cpp3.api.fieldGetOffset(this);
      }
      /** Gets the type of this field. */
      get type() {
        return new Il2Cpp3.Type(Il2Cpp3.api.fieldGetType(this));
      }
      /** Gets the value of this field. */
      get value() {
        if (!this.isStatic) {
          raise(`cannot access instance field ${this.class.type.name}::${this.name} from a class, use an object instead`);
        }
        const handle = Memory.alloc(Process.pointerSize);
        Il2Cpp3.api.fieldGetStaticValue(this.handle, handle);
        return Il2Cpp3.read(handle, this.type);
      }
      /** Sets the value of this field. Thread static or literal values cannot be altered yet. */
      set value(value) {
        if (!this.isStatic) {
          raise(`cannot access instance field ${this.class.type.name}::${this.name} from a class, use an object instead`);
        }
        if (this.isThreadStatic || this.isLiteral) {
          raise(`cannot write the value of field ${this.name} as it's thread static or literal`);
        }
        const handle = (
          // pointer-like values should be passed as-is, but boxed
          // value types (primitives included) must be unboxed first
          value instanceof Il2Cpp3.Object && this.type.class.isValueType ? value.unbox() : value instanceof NativeStruct ? value.handle : value instanceof NativePointer ? value : Il2Cpp3.write(Memory.alloc(this.type.class.valueTypeSize), value, this.type)
        );
        Il2Cpp3.api.fieldSetStaticValue(this.handle, handle);
      }
      /** */
      toString() {
        return `${this.isThreadStatic ? `[ThreadStatic] ` : ``}${this.isStatic ? `static ` : ``}${this.type.name} ${this.name}${this.isLiteral ? ` = ${this.type.class.isEnum ? Il2Cpp3.read(this.value.handle, this.type.class.baseType) : this.value}` : ``};${this.isThreadStatic || this.isLiteral ? `` : ` // 0x${this.offset.toString(16)}`}`;
      }
      /** @internal */
      withHolder(instance) {
        if (this.isStatic) {
          raise(`cannot access static field ${this.class.type.name}::${this.name} from an object, use a class instead`);
        }
        const valueHandle = instance.handle.add(this.offset - (instance instanceof Il2Cpp3.ValueType ? Il2Cpp3.Object.headerSize : 0));
        return new Proxy(this, {
          get(target, property) {
            if (property == "value") {
              return Il2Cpp3.read(valueHandle, target.type);
            }
            return Reflect.get(target, property);
          },
          set(target, property, value) {
            if (property == "value") {
              Il2Cpp3.write(valueHandle, value, target.type);
              return true;
            }
            return Reflect.set(target, property, value);
          }
        });
      }
    }
    __decorate([
      lazy
    ], Field.prototype, "class", null);
    __decorate([
      lazy
    ], Field.prototype, "flags", null);
    __decorate([
      lazy
    ], Field.prototype, "isLiteral", null);
    __decorate([
      lazy
    ], Field.prototype, "isStatic", null);
    __decorate([
      lazy
    ], Field.prototype, "isThreadStatic", null);
    __decorate([
      lazy
    ], Field.prototype, "modifier", null);
    __decorate([
      lazy
    ], Field.prototype, "name", null);
    __decorate([
      lazy
    ], Field.prototype, "offset", null);
    __decorate([
      lazy
    ], Field.prototype, "type", null);
    Il2Cpp3.Field = Field;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class GCHandle {
      handle;
      /** @internal */
      constructor(handle) {
        this.handle = handle;
      }
      /** Gets the object associated to this handle. */
      get target() {
        return new Il2Cpp3.Object(Il2Cpp3.api.gcHandleGetTarget(this.handle)).asNullable();
      }
      /** Frees this handle. */
      free() {
        return Il2Cpp3.api.gcHandleFree(this.handle);
      }
    }
    Il2Cpp3.GCHandle = GCHandle;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    let Image = class Image extends NativeStruct {
      /** Gets the assembly in which the current image is defined. */
      get assembly() {
        return new Il2Cpp3.Assembly(Il2Cpp3.api.imageGetAssembly(this));
      }
      /** Gets the amount of classes defined in this image. */
      get classCount() {
        if (Il2Cpp3.unityVersionIsBelow201830) {
          return this.classes.length;
        } else {
          return Il2Cpp3.api.imageGetClassCount(this);
        }
      }
      /** Gets the classes defined in this image. */
      get classes() {
        if (Il2Cpp3.unityVersionIsBelow201830) {
          const types2 = this.assembly.object.method("GetTypes").invoke(false);
          const classes = globalThis.Array.from(types2, (_) => new Il2Cpp3.Class(Il2Cpp3.api.classFromObject(_)));
          classes.unshift(this.class("<Module>"));
          return classes;
        } else {
          return globalThis.Array.from(globalThis.Array(this.classCount), (_, i) => new Il2Cpp3.Class(Il2Cpp3.api.imageGetClass(this, i)));
        }
      }
      /** Gets the name of this image. */
      get name() {
        return Il2Cpp3.api.imageGetName(this).readUtf8String();
      }
      /** Gets the class with the specified name defined in this image. */
      class(name) {
        return this.tryClass(name) ?? raise(`couldn't find class ${name} in assembly ${this.name}`);
      }
      /** Gets the class with the specified name defined in this image. */
      tryClass(name) {
        const dotIndex = name.lastIndexOf(".");
        const classNamespace = Memory.allocUtf8String(dotIndex == -1 ? "" : name.slice(0, dotIndex));
        const className = Memory.allocUtf8String(name.slice(dotIndex + 1));
        return new Il2Cpp3.Class(Il2Cpp3.api.classFromName(this, classNamespace, className)).asNullable();
      }
    };
    __decorate([
      lazy
    ], Image.prototype, "assembly", null);
    __decorate([
      lazy
    ], Image.prototype, "classCount", null);
    __decorate([
      lazy
    ], Image.prototype, "classes", null);
    __decorate([
      lazy
    ], Image.prototype, "name", null);
    Image = __decorate([
      recycle
    ], Image);
    Il2Cpp3.Image = Image;
    getter(Il2Cpp3, "corlib", () => {
      return new Il2Cpp3.Image(Il2Cpp3.api.getCorlib());
    }, lazy);
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class MemorySnapshot extends NativeStruct {
      /** Captures a memory snapshot. */
      static capture() {
        return new Il2Cpp3.MemorySnapshot();
      }
      /** Creates a memory snapshot with the given handle. */
      constructor(handle = Il2Cpp3.api.memorySnapshotCapture()) {
        super(handle);
      }
      /** Gets any initialized class. */
      get classes() {
        return readNativeIterator((_) => Il2Cpp3.api.memorySnapshotGetClasses(this, _)).map((_) => new Il2Cpp3.Class(_));
      }
      /** Gets the objects tracked by this memory snapshot. */
      get objects() {
        return readNativeList((_) => Il2Cpp3.api.memorySnapshotGetObjects(this, _)).filter((_) => !_.isNull()).map((_) => new Il2Cpp3.Object(_));
      }
      /** Frees this memory snapshot. */
      free() {
        Il2Cpp3.api.memorySnapshotFree(this);
      }
    }
    __decorate([
      lazy
    ], MemorySnapshot.prototype, "classes", null);
    __decorate([
      lazy
    ], MemorySnapshot.prototype, "objects", null);
    Il2Cpp3.MemorySnapshot = MemorySnapshot;
    function memorySnapshot(block) {
      const memorySnapshot2 = Il2Cpp3.MemorySnapshot.capture();
      const result = block(memorySnapshot2);
      memorySnapshot2.free();
      return result;
    }
    Il2Cpp3.memorySnapshot = memorySnapshot;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Method extends NativeStruct {
      /** Gets the class in which this method is defined. */
      get class() {
        return new Il2Cpp3.Class(Il2Cpp3.api.methodGetClass(this));
      }
      /** Gets the flags of the current method. */
      get flags() {
        return Il2Cpp3.api.methodGetFlags(this, NULL);
      }
      /** Gets the implementation flags of the current method. */
      get implementationFlags() {
        const implementationFlagsPointer = Memory.alloc(Process.pointerSize);
        Il2Cpp3.api.methodGetFlags(this, implementationFlagsPointer);
        return implementationFlagsPointer.readU32();
      }
      /** */
      get fridaSignature() {
        const types2 = [];
        for (const parameter of this.parameters) {
          types2.push(parameter.type.fridaAlias);
        }
        if (!this.isStatic || Il2Cpp3.unityVersionIsBelow201830) {
          types2.unshift("pointer");
        }
        if (this.isInflated) {
          types2.push("pointer");
        }
        return types2;
      }
      /** Gets the generic parameters of this generic method. */
      get generics() {
        if (!this.isGeneric && !this.isInflated) {
          return [];
        }
        const types2 = this.object.method("GetGenericArguments").invoke();
        return globalThis.Array.from(types2).map((_) => new Il2Cpp3.Class(Il2Cpp3.api.classFromObject(_)));
      }
      /** Determines whether this method is external. */
      get isExternal() {
        return (this.implementationFlags & 4096) != 0;
      }
      /** Determines whether this method is generic. */
      get isGeneric() {
        return !!Il2Cpp3.api.methodIsGeneric(this);
      }
      /** Determines whether this method is inflated (generic with a concrete type parameter). */
      get isInflated() {
        return !!Il2Cpp3.api.methodIsInflated(this);
      }
      /** Determines whether this method is static. */
      get isStatic() {
        return !Il2Cpp3.api.methodIsInstance(this);
      }
      /** Determines whether this method is synchronized. */
      get isSynchronized() {
        return (this.implementationFlags & 32) != 0;
      }
      /** Gets the access modifier of this method. */
      get modifier() {
        switch (this.flags & 7) {
          case 1:
            return "private";
          case 2:
            return "private protected";
          case 3:
            return "internal";
          case 4:
            return "protected";
          case 5:
            return "protected internal";
          case 6:
            return "public";
        }
      }
      /** Gets the name of this method. */
      get name() {
        return Il2Cpp3.api.methodGetName(this).readUtf8String();
      }
      /** @internal */
      get nativeFunction() {
        return new NativeFunction(this.virtualAddress, this.returnType.fridaAlias, this.fridaSignature);
      }
      /** Gets the encompassing object of the current method. */
      get object() {
        return new Il2Cpp3.Object(Il2Cpp3.api.methodGetObject(this, NULL));
      }
      /** Gets the amount of parameters of this method. */
      get parameterCount() {
        return Il2Cpp3.api.methodGetParameterCount(this);
      }
      /** Gets the parameters of this method. */
      get parameters() {
        return globalThis.Array.from(globalThis.Array(this.parameterCount), (_, i) => {
          const parameterName = Il2Cpp3.api.methodGetParameterName(this, i).readUtf8String();
          const parameterType = Il2Cpp3.api.methodGetParameterType(this, i);
          return new Il2Cpp3.Parameter(parameterName, i, new Il2Cpp3.Type(parameterType));
        });
      }
      /** Gets the relative virtual address (RVA) of this method. */
      get relativeVirtualAddress() {
        return this.virtualAddress.sub(Il2Cpp3.module.base);
      }
      /** Gets the return type of this method. */
      get returnType() {
        return new Il2Cpp3.Type(Il2Cpp3.api.methodGetReturnType(this));
      }
      /** Gets the virtual address (VA) of this method. */
      get virtualAddress() {
        const FilterTypeName = Il2Cpp3.corlib.class("System.Reflection.Module").initialize().field("FilterTypeName").value;
        const FilterTypeNameMethodPointer = FilterTypeName.field("method_ptr").value;
        const FilterTypeNameMethod = FilterTypeName.field("method").value;
        const offset = FilterTypeNameMethod.offsetOf((_) => _.readPointer().equals(FilterTypeNameMethodPointer)) ?? raise("couldn't find the virtual address offset in the native method struct");
        getter(Il2Cpp3.Method.prototype, "virtualAddress", function() {
          return this.handle.add(offset).readPointer();
        }, lazy);
        Il2Cpp3.corlib.class("System.Reflection.Module").method(".cctor").invoke();
        return this.virtualAddress;
      }
      /** Replaces the body of this method. */
      set implementation(block) {
        try {
          Interceptor.replace(this.virtualAddress, this.wrap(block));
        } catch (e) {
          switch (e.message) {
            case "access violation accessing 0x0":
              raise(`couldn't set implementation for method ${this.name} as it has a NULL virtual address`);
            case /unable to intercept function at \w+; please file a bug/.exec(e.message)?.input:
              warn(`couldn't set implementation for method ${this.name} as it may be a thunk`);
              break;
            case "already replaced this function":
              warn(`couldn't set implementation for method ${this.name} as it has already been replaced by a thunk`);
              break;
            default:
              throw e;
          }
        }
      }
      /** Creates a generic instance of the current generic method. */
      inflate(...classes) {
        if (!this.isGeneric) {
          raise(`cannot inflate method ${this.name} as it has no generic parameters`);
        }
        if (this.generics.length != classes.length) {
          raise(`cannot inflate method ${this.name} as it needs ${this.generics.length} generic parameter(s), not ${classes.length}`);
        }
        const types2 = classes.map((_) => _.type.object);
        const typeArray = Il2Cpp3.array(Il2Cpp3.corlib.class("System.Type"), types2);
        const inflatedMethodObject = this.object.method("MakeGenericMethod", 1).invoke(typeArray);
        return new Il2Cpp3.Method(inflatedMethodObject.field("mhandle").value);
      }
      /** Invokes this method. */
      invoke(...parameters) {
        if (!this.isStatic) {
          raise(`cannot invoke non-static method ${this.name} as it must be invoked throught a Il2Cpp.Object, not a Il2Cpp.Class`);
        }
        return this.invokeRaw(NULL, ...parameters);
      }
      /** @internal */
      invokeRaw(instance, ...parameters) {
        const allocatedParameters = parameters.map(Il2Cpp3.toFridaValue);
        if (!this.isStatic || Il2Cpp3.unityVersionIsBelow201830) {
          allocatedParameters.unshift(instance);
        }
        if (this.isInflated) {
          allocatedParameters.push(this.handle);
        }
        try {
          const returnValue = this.nativeFunction(...allocatedParameters);
          return Il2Cpp3.fromFridaValue(returnValue, this.returnType);
        } catch (e) {
          if (e == null) {
            raise("an unexpected native invocation exception occurred, this is due to parameter types mismatch");
          }
          switch (e.message) {
            case "bad argument count":
              raise(`couldn't invoke method ${this.name} as it needs ${this.parameterCount} parameter(s), not ${parameters.length}`);
            case "expected a pointer":
            case "expected number":
            case "expected array with fields":
              raise(`couldn't invoke method ${this.name} using incorrect parameter types`);
          }
          throw e;
        }
      }
      /** Gets the overloaded method with the given parameter types. */
      overload(...parameterTypes) {
        const result = this.tryOverload(...parameterTypes);
        if (result != void 0)
          return result;
        raise(`couldn't find overloaded method ${this.name}(${parameterTypes})`);
      }
      /** Gets the parameter with the given name. */
      parameter(name) {
        return this.tryParameter(name) ?? raise(`couldn't find parameter ${name} in method ${this.name}`);
      }
      /** Restore the original method implementation. */
      revert() {
        Interceptor.revert(this.virtualAddress);
        Interceptor.flush();
      }
      /** Gets the overloaded method with the given parameter types. */
      tryOverload(...parameterTypes) {
        return this.class.methods.find((method) => {
          return method.name == this.name && method.parameterCount == parameterTypes.length && method.parameters.every((e, i) => e.type.name == parameterTypes[i]);
        });
      }
      /** Gets the parameter with the given name. */
      tryParameter(name) {
        return this.parameters.find((_) => _.name == name);
      }
      /** */
      toString() {
        return `${this.isStatic ? `static ` : ``}${this.returnType.name} ${this.name}(${this.parameters.join(`, `)});${this.virtualAddress.isNull() ? `` : ` // 0x${this.relativeVirtualAddress.toString(16).padStart(8, `0`)}`}`;
      }
      /** @internal */
      withHolder(instance) {
        if (this.isStatic) {
          raise(`cannot access static method ${this.class.type.name}::${this.name} from an object, use a class instead`);
        }
        return new Proxy(this, {
          get(target, property) {
            switch (property) {
              case "invoke":
                const handle = instance instanceof Il2Cpp3.ValueType ? target.class.isValueType ? instance.handle.add(maybeObjectHeaderSize() - Il2Cpp3.Object.headerSize) : raise(`cannot invoke method ${target.class.type.name}::${target.name} against a value type, you must box it first`) : target.class.isValueType ? instance.handle.add(maybeObjectHeaderSize()) : instance.handle;
                return target.invokeRaw.bind(target, handle);
              case "inflate":
              case "overload":
              case "tryOverload":
                return function(...args) {
                  return target[property](...args)?.withHolder(instance);
                };
            }
            return Reflect.get(target, property);
          }
        });
      }
      /** @internal */
      wrap(block) {
        const startIndex = +!this.isStatic | +Il2Cpp3.unityVersionIsBelow201830;
        return new NativeCallback((...args) => {
          const thisObject = this.isStatic ? this.class : this.class.isValueType ? new Il2Cpp3.ValueType(args[0].add(Il2Cpp3.Object.headerSize - maybeObjectHeaderSize()), this.class.type) : new Il2Cpp3.Object(args[0]);
          const parameters = this.parameters.map((_, i) => Il2Cpp3.fromFridaValue(args[i + startIndex], _.type));
          const result = block.call(thisObject, ...parameters);
          return Il2Cpp3.toFridaValue(result);
        }, this.returnType.fridaAlias, this.fridaSignature);
      }
    }
    __decorate([
      lazy
    ], Method.prototype, "class", null);
    __decorate([
      lazy
    ], Method.prototype, "flags", null);
    __decorate([
      lazy
    ], Method.prototype, "implementationFlags", null);
    __decorate([
      lazy
    ], Method.prototype, "fridaSignature", null);
    __decorate([
      lazy
    ], Method.prototype, "generics", null);
    __decorate([
      lazy
    ], Method.prototype, "isExternal", null);
    __decorate([
      lazy
    ], Method.prototype, "isGeneric", null);
    __decorate([
      lazy
    ], Method.prototype, "isInflated", null);
    __decorate([
      lazy
    ], Method.prototype, "isStatic", null);
    __decorate([
      lazy
    ], Method.prototype, "isSynchronized", null);
    __decorate([
      lazy
    ], Method.prototype, "modifier", null);
    __decorate([
      lazy
    ], Method.prototype, "name", null);
    __decorate([
      lazy
    ], Method.prototype, "nativeFunction", null);
    __decorate([
      lazy
    ], Method.prototype, "object", null);
    __decorate([
      lazy
    ], Method.prototype, "parameterCount", null);
    __decorate([
      lazy
    ], Method.prototype, "parameters", null);
    __decorate([
      lazy
    ], Method.prototype, "relativeVirtualAddress", null);
    __decorate([
      lazy
    ], Method.prototype, "returnType", null);
    Il2Cpp3.Method = Method;
    let maybeObjectHeaderSize = () => {
      const struct = Il2Cpp3.corlib.class("System.RuntimeTypeHandle").initialize().alloc();
      struct.method(".ctor").invokeRaw(struct, ptr(3735928559));
      const offset = struct.field("value").value.equals(ptr(3735928559)) ? 0 : Il2Cpp3.Object.headerSize;
      return (maybeObjectHeaderSize = () => offset)();
    };
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Object2 extends NativeStruct {
      /** Gets the Il2CppObject struct size, possibly equal to `Process.pointerSize * 2`. */
      static get headerSize() {
        return Il2Cpp3.corlib.class("System.Object").instanceSize;
      }
      /** Gets the class of this object. */
      get class() {
        return new Il2Cpp3.Class(Il2Cpp3.api.objectGetClass(this));
      }
      /** Returns a monitor for this object. */
      get monitor() {
        return new Il2Cpp3.Object.Monitor(this);
      }
      /** Gets the size of the current object. */
      get size() {
        return Il2Cpp3.api.objectGetSize(this);
      }
      /** Gets the field with the given name. */
      field(name) {
        return this.class.field(name).withHolder(this);
      }
      /** Gets the method with the given name. */
      method(name, parameterCount = -1) {
        return this.class.method(name, parameterCount).withHolder(this);
      }
      /** Creates a reference to this object. */
      ref(pin) {
        return new Il2Cpp3.GCHandle(Il2Cpp3.api.gcHandleNew(this, +pin));
      }
      /** Gets the correct virtual method from the given virtual method. */
      virtualMethod(method) {
        return new Il2Cpp3.Method(Il2Cpp3.api.objectGetVirtualMethod(this, method)).withHolder(this);
      }
      /** Gets the field with the given name. */
      tryField(name) {
        return this.class.tryField(name)?.withHolder(this);
      }
      /** Gets the field with the given name. */
      tryMethod(name, parameterCount = -1) {
        return this.class.tryMethod(name, parameterCount)?.withHolder(this);
      }
      /** */
      toString() {
        return this.isNull() ? "null" : this.method("ToString", 0).invoke().content ?? "null";
      }
      /** Unboxes the value type (either a primitive, a struct or an enum) out of this object. */
      unbox() {
        return this.class.isValueType ? new Il2Cpp3.ValueType(Il2Cpp3.api.objectUnbox(this), this.class.type) : raise(`couldn't unbox instances of ${this.class.type.name} as they are not value types`);
      }
      /** Creates a weak reference to this object. */
      weakRef(trackResurrection) {
        return new Il2Cpp3.GCHandle(Il2Cpp3.api.gcHandleNewWeakRef(this, +trackResurrection));
      }
    }
    __decorate([
      lazy
    ], Object2.prototype, "class", null);
    __decorate([
      lazy
    ], Object2.prototype, "size", null);
    __decorate([
      lazy
    ], Object2, "headerSize", null);
    Il2Cpp3.Object = Object2;
    (function(Object3) {
      class Monitor {
        handle;
        /** @internal */
        constructor(handle) {
          this.handle = handle;
        }
        /** Acquires an exclusive lock on the current object. */
        enter() {
          return Il2Cpp3.api.monitorEnter(this.handle);
        }
        /** Release an exclusive lock on the current object. */
        exit() {
          return Il2Cpp3.api.monitorExit(this.handle);
        }
        /** Notifies a thread in the waiting queue of a change in the locked object's state. */
        pulse() {
          return Il2Cpp3.api.monitorPulse(this.handle);
        }
        /** Notifies all waiting threads of a change in the object's state. */
        pulseAll() {
          return Il2Cpp3.api.monitorPulseAll(this.handle);
        }
        /** Attempts to acquire an exclusive lock on the current object. */
        tryEnter(timeout) {
          return !!Il2Cpp3.api.monitorTryEnter(this.handle, timeout);
        }
        /** Releases the lock on an object and attempts to block the current thread until it reacquires the lock. */
        tryWait(timeout) {
          return !!Il2Cpp3.api.monitorTryWait(this.handle, timeout);
        }
        /** Releases the lock on an object and blocks the current thread until it reacquires the lock. */
        wait() {
          return Il2Cpp3.api.monitorWait(this.handle);
        }
      }
      Object3.Monitor = Monitor;
    })(Object2 = Il2Cpp3.Object || (Il2Cpp3.Object = {}));
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Parameter {
      /** Name of this parameter. */
      name;
      /** Position of this parameter. */
      position;
      /** Type of this parameter. */
      type;
      constructor(name, position, type) {
        this.name = name;
        this.position = position;
        this.type = type;
      }
      /** */
      toString() {
        return `${this.type.name} ${this.name}`;
      }
    }
    Il2Cpp3.Parameter = Parameter;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Pointer extends NativeStruct {
      type;
      constructor(handle, type) {
        super(handle);
        this.type = type;
      }
      /** Gets the element at the given index. */
      get(index) {
        return Il2Cpp3.read(this.handle.add(index * this.type.class.arrayElementSize), this.type);
      }
      /** Reads the given amount of elements starting at the given offset. */
      read(length, offset = 0) {
        const values = new globalThis.Array(length);
        for (let i = 0; i < length; i++) {
          values[i] = this.get(i + offset);
        }
        return values;
      }
      /** Sets the given element at the given index */
      set(index, value) {
        Il2Cpp3.write(this.handle.add(index * this.type.class.arrayElementSize), value, this.type);
      }
      /** */
      toString() {
        return this.handle.toString();
      }
      /** Writes the given elements starting at the given index. */
      write(values, offset = 0) {
        for (let i = 0; i < values.length; i++) {
          this.set(i + offset, values[i]);
        }
      }
    }
    Il2Cpp3.Pointer = Pointer;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Reference extends NativeStruct {
      type;
      constructor(handle, type) {
        super(handle);
        this.type = type;
      }
      /** Gets the element referenced by the current reference. */
      get value() {
        return Il2Cpp3.read(this.handle, this.type);
      }
      /** Sets the element referenced by the current reference. */
      set value(value) {
        Il2Cpp3.write(this.handle, value, this.type);
      }
      /** */
      toString() {
        return this.isNull() ? "null" : `->${this.value}`;
      }
    }
    Il2Cpp3.Reference = Reference;
    function reference(value, type) {
      const handle = Memory.alloc(Process.pointerSize);
      switch (typeof value) {
        case "boolean":
          return new Il2Cpp3.Reference(handle.writeS8(+value), Il2Cpp3.corlib.class("System.Boolean").type);
        case "number":
          switch (type?.typeEnum) {
            case Il2Cpp3.Type.enum.unsignedByte:
              return new Il2Cpp3.Reference(handle.writeU8(value), type);
            case Il2Cpp3.Type.enum.byte:
              return new Il2Cpp3.Reference(handle.writeS8(value), type);
            case Il2Cpp3.Type.enum.char:
            case Il2Cpp3.Type.enum.unsignedShort:
              return new Il2Cpp3.Reference(handle.writeU16(value), type);
            case Il2Cpp3.Type.enum.short:
              return new Il2Cpp3.Reference(handle.writeS16(value), type);
            case Il2Cpp3.Type.enum.unsignedInt:
              return new Il2Cpp3.Reference(handle.writeU32(value), type);
            case Il2Cpp3.Type.enum.int:
              return new Il2Cpp3.Reference(handle.writeS32(value), type);
            case Il2Cpp3.Type.enum.unsignedLong:
              return new Il2Cpp3.Reference(handle.writeU64(value), type);
            case Il2Cpp3.Type.enum.long:
              return new Il2Cpp3.Reference(handle.writeS64(value), type);
            case Il2Cpp3.Type.enum.float:
              return new Il2Cpp3.Reference(handle.writeFloat(value), type);
            case Il2Cpp3.Type.enum.double:
              return new Il2Cpp3.Reference(handle.writeDouble(value), type);
          }
        case "object":
          if (value instanceof Il2Cpp3.ValueType || value instanceof Il2Cpp3.Pointer) {
            return new Il2Cpp3.Reference(handle.writePointer(value), value.type);
          } else if (value instanceof Il2Cpp3.Object) {
            return new Il2Cpp3.Reference(handle.writePointer(value), value.class.type);
          } else if (value instanceof Il2Cpp3.String || value instanceof Il2Cpp3.Array) {
            return new Il2Cpp3.Reference(handle.writePointer(value), value.object.class.type);
          } else if (value instanceof NativePointer) {
            switch (type?.typeEnum) {
              case Il2Cpp3.Type.enum.unsignedNativePointer:
              case Il2Cpp3.Type.enum.nativePointer:
                return new Il2Cpp3.Reference(handle.writePointer(value), type);
            }
          } else if (value instanceof Int64) {
            return new Il2Cpp3.Reference(handle.writeS64(value), Il2Cpp3.corlib.class("System.Int64").type);
          } else if (value instanceof UInt64) {
            return new Il2Cpp3.Reference(handle.writeU64(value), Il2Cpp3.corlib.class("System.UInt64").type);
          }
        default:
          raise(`couldn't create a reference to ${value} using an unhandled type ${type?.name}`);
      }
    }
    Il2Cpp3.reference = reference;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class String2 extends NativeStruct {
      /** Gets the content of this string. */
      get content() {
        return Il2Cpp3.api.stringGetChars(this).readUtf16String(this.length);
      }
      /** @unsafe Sets the content of this string - it may write out of bounds! */
      set content(value) {
        const offset = Il2Cpp3.string("vfsfitvnm").handle.offsetOf((_) => _.readInt() == 9) ?? raise("couldn't find the length offset in the native string struct");
        globalThis.Object.defineProperty(Il2Cpp3.String.prototype, "content", {
          set(value2) {
            Il2Cpp3.api.stringGetChars(this).writeUtf16String(value2 ?? "");
            this.handle.add(offset).writeS32(value2?.length ?? 0);
          }
        });
        this.content = value;
      }
      /** Gets the length of this string. */
      get length() {
        return Il2Cpp3.api.stringGetLength(this);
      }
      /** Gets the encompassing object of the current string. */
      get object() {
        return new Il2Cpp3.Object(this);
      }
      /** */
      toString() {
        return this.isNull() ? "null" : `"${this.content}"`;
      }
    }
    Il2Cpp3.String = String2;
    function string(content) {
      return new Il2Cpp3.String(Il2Cpp3.api.stringNew(Memory.allocUtf8String(content ?? "")));
    }
    Il2Cpp3.string = string;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class Thread extends NativeStruct {
      /** Gets the native id of the current thread. */
      get id() {
        let get2 = function() {
          return this.internal.field("thread_id").value.toNumber();
        };
        if (Process.platform != "windows") {
          const currentThreadId = Process.getCurrentThreadId();
          const currentPosixThread = ptr(get2.apply(Il2Cpp3.currentThread));
          const offset = currentPosixThread.offsetOf((_) => _.readS32() == currentThreadId, 1024) ?? raise(`couldn't find the offset for determining the kernel id of a posix thread`);
          const _get = get2;
          get2 = function() {
            return ptr(_get.apply(this)).add(offset).readS32();
          };
        }
        getter(Il2Cpp3.Thread.prototype, "id", get2, lazy);
        return this.id;
      }
      /** Gets the encompassing internal object (System.Threding.InternalThreead) of the current thread. */
      get internal() {
        return this.object.tryField("internal_thread")?.value ?? this.object;
      }
      /** Determines whether the current thread is the garbage collector finalizer one. */
      get isFinalizer() {
        return !Il2Cpp3.api.threadIsVm(this);
      }
      /** Gets the managed id of the current thread. */
      get managedId() {
        return this.object.method("get_ManagedThreadId").invoke();
      }
      /** Gets the encompassing object of the current thread. */
      get object() {
        return new Il2Cpp3.Object(this);
      }
      /** @internal */
      get staticData() {
        return this.internal.field("static_data").value;
      }
      /** @internal */
      get synchronizationContext() {
        const get_ExecutionContext = this.object.tryMethod("GetMutableExecutionContext") ?? this.object.method("get_ExecutionContext");
        const executionContext = get_ExecutionContext.invoke();
        let synchronizationContext = executionContext.tryField("_syncContext")?.value ?? executionContext.tryMethod("get_SynchronizationContext")?.invoke() ?? this.tryLocalValue(Il2Cpp3.corlib.class("System.Threading.SynchronizationContext"));
        if (synchronizationContext == null || synchronizationContext.isNull()) {
          if (this.handle.equals(Il2Cpp3.mainThread.handle)) {
            raise(`couldn't find the synchronization context of the main thread, perhaps this is early instrumentation?`);
          } else {
            raise(`couldn't find the synchronization context of thread #${this.managedId}, only the main thread is expected to have one`);
          }
        }
        return synchronizationContext;
      }
      /** Detaches the thread from the application domain. */
      detach() {
        return Il2Cpp3.api.threadDetach(this);
      }
      /** Schedules a callback on the current thread. */
      schedule(block) {
        const Post = this.synchronizationContext.method("Post");
        return new Promise((resolve3) => {
          const delegate = Il2Cpp3.delegate(Il2Cpp3.corlib.class("System.Threading.SendOrPostCallback"), () => {
            const result = block();
            setImmediate(() => resolve3(result));
          });
          Script.bindWeak(globalThis, () => {
            delegate.field("method_ptr").value = delegate.field("invoke_impl").value = Il2Cpp3.api.domainGet;
          });
          Post.invoke(delegate, NULL);
        });
      }
      /** @internal */
      tryLocalValue(klass) {
        for (let i = 0; i < 16; i++) {
          const base2 = this.staticData.add(i * Process.pointerSize).readPointer();
          if (!base2.isNull()) {
            const object = new Il2Cpp3.Object(base2.readPointer()).asNullable();
            if (object?.class?.isSubclassOf(klass, false)) {
              return object;
            }
          }
        }
      }
    }
    __decorate([
      lazy
    ], Thread.prototype, "internal", null);
    __decorate([
      lazy
    ], Thread.prototype, "isFinalizer", null);
    __decorate([
      lazy
    ], Thread.prototype, "managedId", null);
    __decorate([
      lazy
    ], Thread.prototype, "object", null);
    __decorate([
      lazy
    ], Thread.prototype, "staticData", null);
    __decorate([
      lazy
    ], Thread.prototype, "synchronizationContext", null);
    Il2Cpp3.Thread = Thread;
    getter(Il2Cpp3, "attachedThreads", () => {
      return readNativeList(Il2Cpp3.api.threadGetAttachedThreads).map((_) => new Il2Cpp3.Thread(_));
    });
    getter(Il2Cpp3, "currentThread", () => {
      return new Il2Cpp3.Thread(Il2Cpp3.api.threadGetCurrent()).asNullable();
    });
    getter(Il2Cpp3, "mainThread", () => {
      return Il2Cpp3.attachedThreads[0];
    });
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    let Type = class Type extends NativeStruct {
      /** */
      static get enum() {
        const _ = (_2, block = (_3) => _3) => block(Il2Cpp3.corlib.class(_2)).type.typeEnum;
        return {
          void: _("System.Void"),
          boolean: _("System.Boolean"),
          char: _("System.Char"),
          byte: _("System.SByte"),
          unsignedByte: _("System.Byte"),
          short: _("System.Int16"),
          unsignedShort: _("System.UInt16"),
          int: _("System.Int32"),
          unsignedInt: _("System.UInt32"),
          long: _("System.Int64"),
          unsignedLong: _("System.UInt64"),
          nativePointer: _("System.IntPtr"),
          unsignedNativePointer: _("System.UIntPtr"),
          float: _("System.Single"),
          double: _("System.Double"),
          pointer: _("System.IntPtr", (_2) => _2.field("m_value")),
          valueType: _("System.Decimal"),
          object: _("System.Object"),
          string: _("System.String"),
          class: _("System.Array"),
          array: _("System.Void", (_2) => _2.arrayClass),
          multidimensionalArray: _("System.Void", (_2) => new Il2Cpp3.Class(Il2Cpp3.api.classGetArrayClass(_2, 2))),
          genericInstance: _("System.Int32", (_2) => _2.interfaces.find((_3) => _3.name.endsWith("`1")))
        };
      }
      /** Gets the class of this type. */
      get class() {
        return new Il2Cpp3.Class(Il2Cpp3.api.typeGetClass(this));
      }
      /** */
      get fridaAlias() {
        function getValueTypeFields(type) {
          const instanceFields = type.class.fields.filter((_) => !_.isStatic);
          return instanceFields.length == 0 ? ["char"] : instanceFields.map((_) => _.type.fridaAlias);
        }
        if (this.isByReference) {
          return "pointer";
        }
        switch (this.typeEnum) {
          case Il2Cpp3.Type.enum.void:
            return "void";
          case Il2Cpp3.Type.enum.boolean:
            return "bool";
          case Il2Cpp3.Type.enum.char:
            return "uchar";
          case Il2Cpp3.Type.enum.byte:
            return "int8";
          case Il2Cpp3.Type.enum.unsignedByte:
            return "uint8";
          case Il2Cpp3.Type.enum.short:
            return "int16";
          case Il2Cpp3.Type.enum.unsignedShort:
            return "uint16";
          case Il2Cpp3.Type.enum.int:
            return "int32";
          case Il2Cpp3.Type.enum.unsignedInt:
            return "uint32";
          case Il2Cpp3.Type.enum.long:
            return "int64";
          case Il2Cpp3.Type.enum.unsignedLong:
            return "uint64";
          case Il2Cpp3.Type.enum.float:
            return "float";
          case Il2Cpp3.Type.enum.double:
            return "double";
          case Il2Cpp3.Type.enum.nativePointer:
          case Il2Cpp3.Type.enum.unsignedNativePointer:
          case Il2Cpp3.Type.enum.pointer:
          case Il2Cpp3.Type.enum.string:
          case Il2Cpp3.Type.enum.array:
          case Il2Cpp3.Type.enum.multidimensionalArray:
            return "pointer";
          case Il2Cpp3.Type.enum.valueType:
            return this.class.isEnum ? this.class.baseType.fridaAlias : getValueTypeFields(this);
          case Il2Cpp3.Type.enum.class:
          case Il2Cpp3.Type.enum.object:
          case Il2Cpp3.Type.enum.genericInstance:
            return this.class.isStruct ? getValueTypeFields(this) : this.class.isEnum ? this.class.baseType.fridaAlias : "pointer";
          default:
            return "pointer";
        }
      }
      /** Determines whether this type is passed by reference. */
      get isByReference() {
        return this.name.endsWith("&");
      }
      /** Determines whether this type is primitive. */
      get isPrimitive() {
        switch (this.typeEnum) {
          case Il2Cpp3.Type.enum.boolean:
          case Il2Cpp3.Type.enum.char:
          case Il2Cpp3.Type.enum.byte:
          case Il2Cpp3.Type.enum.unsignedByte:
          case Il2Cpp3.Type.enum.short:
          case Il2Cpp3.Type.enum.unsignedShort:
          case Il2Cpp3.Type.enum.int:
          case Il2Cpp3.Type.enum.unsignedInt:
          case Il2Cpp3.Type.enum.long:
          case Il2Cpp3.Type.enum.unsignedLong:
          case Il2Cpp3.Type.enum.float:
          case Il2Cpp3.Type.enum.double:
          case Il2Cpp3.Type.enum.nativePointer:
          case Il2Cpp3.Type.enum.unsignedNativePointer:
            return true;
          default:
            return false;
        }
      }
      /** Gets the name of this type. */
      get name() {
        const handle = Il2Cpp3.api.typeGetName(this);
        try {
          return handle.readUtf8String();
        } finally {
          Il2Cpp3.free(handle);
        }
      }
      /** Gets the encompassing object of the current type. */
      get object() {
        return new Il2Cpp3.Object(Il2Cpp3.api.typeGetObject(this));
      }
      /** Gets the type enum of the current type. */
      get typeEnum() {
        return Il2Cpp3.api.typeGetTypeEnum(this);
      }
      /** */
      toString() {
        return this.name;
      }
    };
    __decorate([
      lazy
    ], Type.prototype, "class", null);
    __decorate([
      lazy
    ], Type.prototype, "fridaAlias", null);
    __decorate([
      lazy
    ], Type.prototype, "isByReference", null);
    __decorate([
      lazy
    ], Type.prototype, "isPrimitive", null);
    __decorate([
      lazy
    ], Type.prototype, "name", null);
    __decorate([
      lazy
    ], Type.prototype, "object", null);
    __decorate([
      lazy
    ], Type.prototype, "typeEnum", null);
    __decorate([
      lazy
    ], Type, "enum", null);
    Type = __decorate([
      recycle
    ], Type);
    Il2Cpp3.Type = Type;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  var Il2Cpp2;
  (function(Il2Cpp3) {
    class ValueType extends NativeStruct {
      type;
      constructor(handle, type) {
        super(handle);
        this.type = type;
      }
      /** Boxes the current value type in a object. */
      box() {
        return new Il2Cpp3.Object(Il2Cpp3.api.valueTypeBox(this.type.class, this));
      }
      /** Gets the field with the given name. */
      field(name) {
        return this.type.class.field(name).withHolder(this);
      }
      /** Gets the method with the given name. */
      method(name, parameterCount = -1) {
        return this.type.class.method(name, parameterCount).withHolder(this);
      }
      /** Gets the field with the given name. */
      tryField(name) {
        return this.type.class.tryField(name)?.withHolder(this);
      }
      /** Gets the field with the given name. */
      tryMethod(name, parameterCount = -1) {
        return this.type.class.tryMethod(name, parameterCount)?.withHolder(this);
      }
      /** */
      toString() {
        const ToString = this.method("ToString", 0);
        return this.isNull() ? "null" : (
          // if ToString is defined within a value type class, we can
          // avoid a boxing operaion
          ToString.class.isValueType ? ToString.invoke().content ?? "null" : this.box().toString() ?? "null"
        );
      }
    }
    Il2Cpp3.ValueType = ValueType;
  })(Il2Cpp2 || (Il2Cpp2 = {}));
  globalThis.Il2Cpp = Il2Cpp2;

  // script/lib/Logger.ts
  var Logger = class {
    constructor() {
      this.createLogFile();
    }
    createLogFile() {
      var documentsFolder = ObjC.classes.NSProcessInfo.processInfo().environment().objectForKey_("HOME").toString() + "/Documents/log.txt";
      var fileManager = ObjC.classes.NSFileManager.defaultManager();
      if (fileManager.fileExistsAtPath_(documentsFolder)) {
        var errorPtr = Memory.alloc(Process.pointerSize);
        errorPtr.writePointer(NULL);
        try {
          fileManager.removeItemAtPath_error_(documentsFolder, errorPtr);
        } catch (error2) {
          console.log("Error deleting log.txt: " + error2);
        }
      }
      fileManager.createFileAtPath_contents_attributes_(
        documentsFolder,
        null,
        null
      );
    }
    log(message) {
      var documentsFolder = ObjC.classes.NSProcessInfo.processInfo().environment().objectForKey_("HOME").toString() + "/Documents/log.txt";
      var fileManager = ObjC.classes.NSFileManager.defaultManager();
      var fileHandle = ObjC.classes.NSFileHandle.fileHandleForUpdatingAtPath_(
        documentsFolder
      );
      fileHandle.seekToEndOfFile();
      var string = ObjC.classes.NSString.stringWithString_(message + "\n");
      var data = string.dataUsingEncoding_(4);
      fileHandle.writeData_(data);
      fileHandle.closeFile();
    }
  };
  var Logger_default = new Logger();

  // script/functions/lengthFixer.ts
  var lengthFixer = () => {
    const coreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
    const mscorlib = Il2Cpp.domain.assembly("mscorlib").image;
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    coreModule.class("UnityEngine.TextAsset").method("get_bytes").implementation = function() {
      let name = this.method("get_name").invoke();
      let data = this.method("get_bytes").invoke();
      if (name.toString() == '"music_metadata"') {
        try {
          let strr = mscorlib.class("System.BitConverter").method("ToString").overload("System.Byte[]").invoke(data);
          strr = strr.object.method("Replace").overload("System.String", "System.String").invoke(Il2Cpp.string("-"), Il2Cpp.string(""));
          let index1 = strr.object.method("IndexOf").overload("System.String").invoke(Il2Cpp.string("615555D547220041"));
          let index2 = strr.object.method("IndexOf").overload("System.String").invoke(Il2Cpp.string("565555D547220041"));
          strr = strr.object.method("Replace").overload("System.String", "System.String").invoke(
            Il2Cpp.string("615555D547220041"),
            Il2Cpp.string("00000000882A7141")
          );
          strr = strr.object.method("Replace").overload("System.String", "System.String").invoke(
            Il2Cpp.string("565555D547220041"),
            Il2Cpp.string("00000000882A7141")
          );
          index1 = strr.object.method("IndexOf").overload("System.String").invoke(Il2Cpp.string("615555D547220041"));
          index2 = strr.object.method("IndexOf").overload("System.String").invoke(Il2Cpp.string("565555D547220041"));
          if (!strr.content) {
            throw new Error("Null content");
          }
          const first = strr.content.slice(0, strr.content.length);
          const result = assembly.class("BeatStar.AppsFlyer.AppsFlyerSetup").method("StringToByteArray").invoke(Il2Cpp.string(first));
          return result;
        } catch (e) {
          const error2 = e;
          Logger_default.log(`[LengthFixer] Got an error replacing: ${error2.message}`);
          return data;
        }
      }
      return data;
    };
  };

  // script/lib/Globals.ts
  var customSongs = [];
  var dataCache;
  var scores;
  var setCustomSongs = (value) => {
    customSongs = value;
  };
  var setDataCache = (value) => {
    dataCache = value;
  };
  var setScores = (value) => {
    scores = value;
  };

  // script/node_modules/@frida/events/events.js
  var events_default = EventEmitter;
  function ProcessEmitWarning(warning) {
    console.warn(warning);
  }
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = void 0;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = void 0;
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== "function") {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
      }
      defaultMaxListeners = arg;
    }
  });
  EventEmitter.init = function() {
    if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || void 0;
  };
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    }
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === void 0)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter.prototype.emit = function emit(type) {
    const args = [];
    for (let i = 1; i < arguments.length; i++)
      args.push(arguments[i]);
    let doError = type === "error";
    const events = this._events;
    if (events !== void 0)
      doError = doError && events.error === void 0;
    else if (!doError)
      return false;
    if (doError) {
      let er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
      err.context = er;
      throw err;
    }
    const handler = events[type];
    if (handler === void 0)
      return false;
    if (typeof handler === "function") {
      Reflect.apply(handler, this, args);
    } else {
      const len = handler.length;
      const listeners3 = arrayClone(handler, len);
      for (let i = 0; i < len; ++i)
        Reflect.apply(listeners3[i], this, args);
    }
    return true;
  };
  function _addListener(target, type, listener, prepend) {
    let existing;
    checkListener(listener);
    let events = target._events;
    if (events === void 0) {
      events = target._events = /* @__PURE__ */ Object.create(null);
      target._eventsCount = 0;
    } else {
      if (events.newListener !== void 0) {
        target.emit(
          "newListener",
          type,
          listener.listener ? listener.listener : listener
        );
        events = target._events;
      }
      existing = events[type];
    }
    if (existing === void 0) {
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") {
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
      const m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        const w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type, listener) {
    const state = { fired: false, wrapFn: void 0, target, type, listener };
    const wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    checkListener(listener);
    const events = this._events;
    if (events === void 0)
      return this;
    const list2 = events[type];
    if (list2 === void 0)
      return this;
    if (list2 === listener || list2.listener === listener) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else {
        delete events[type];
        if (events.removeListener)
          this.emit("removeListener", type, list2.listener || listener);
      }
    } else if (typeof list2 !== "function") {
      let originalListener;
      let position = -1;
      for (let i = list2.length - 1; i >= 0; i--) {
        if (list2[i] === listener || list2[i].listener === listener) {
          originalListener = list2[i].listener;
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (position === 0)
        list2.shift();
      else {
        spliceOne(list2, position);
      }
      if (list2.length === 1)
        events[type] = list2[0];
      if (events.removeListener !== void 0)
        this.emit("removeListener", type, originalListener || listener);
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    const events = this._events;
    if (events === void 0)
      return this;
    if (events.removeListener === void 0) {
      if (arguments.length === 0) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      } else if (events[type] !== void 0) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else
          delete events[type];
      }
      return this;
    }
    if (arguments.length === 0) {
      const keys = Object.keys(events);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key === "removeListener")
          continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    const listeners3 = events[type];
    if (typeof listeners3 === "function") {
      this.removeListener(type, listeners3);
    } else if (listeners3 !== void 0) {
      for (let i = listeners3.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners3[i]);
      }
    }
    return this;
  };
  function _listeners(target, type, unwrap) {
    const events = target._events;
    if (events === void 0)
      return [];
    const evlistener = events[type];
    if (evlistener === void 0)
      return [];
    if (typeof evlistener === "function")
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    const events = this._events;
    if (events !== void 0) {
      const evlistener = events[type];
      if (typeof evlistener === "function") {
        return 1;
      } else if (evlistener !== void 0) {
        return evlistener.length;
      }
    }
    return 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    const copy2 = new Array(n);
    for (let i = 0; i < n; ++i)
      copy2[i] = arr[i];
    return copy2;
  }
  function spliceOne(list2, index) {
    for (; index + 1 < list2.length; index++)
      list2[index] = list2[index + 1];
    list2.pop();
  }
  function unwrapListeners(arr) {
    const ret = new Array(arr.length);
    for (let i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  // script/node_modules/@frida/buffer/index.js
  var base64 = __toESM(require_base64_js());
  var ieee754 = __toESM(require_ieee754());
  var config = {
    INSPECT_MAX_BYTES: 50
  };
  var K_MAX_LENGTH = 2147483647;
  Buffer2.TYPED_ARRAY_SUPPORT = true;
  Object.defineProperty(Buffer2.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this))
        return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer2.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this))
        return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    if (value instanceof ArrayBuffer || value && value.buffer instanceof ArrayBuffer) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (value instanceof SharedArrayBuffer || value && value.buffer instanceof SharedArrayBuffer) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer2.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b)
      return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
    );
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer2, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill2, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill2 !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill2, encoding) : createBuffer(size).fill(fill2);
    }
    return createBuffer(size);
  }
  Buffer2.alloc = function(size, fill2, encoding) {
    return alloc(size, fill2, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer2.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer2.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (arrayView instanceof Uint8Array) {
      const copy2 = new Uint8Array(arrayView);
      return fromArrayBuffer(copy2.buffer, copy2.byteOffset, copy2.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer2.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || Number.isNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  Buffer2.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer2.prototype;
  };
  Buffer2.compare = function compare(a, b) {
    if (a instanceof Uint8Array)
      a = Buffer2.from(a, a.offset, a.byteLength);
    if (b instanceof Uint8Array)
      b = Buffer2.from(b, b.offset, b.byteLength);
    if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    }
    if (a === b)
      return 0;
    let x = a.length;
    let y = b.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat(list2, length) {
    if (!Array.isArray(list2)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list2.length === 0) {
      return Buffer2.alloc(0);
    }
    let i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list2.length; ++i) {
        length += list2[i].length;
      }
    }
    const buffer = Buffer2.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list2.length; ++i) {
      let buf = list2[i];
      if (buf instanceof Uint8Array) {
        if (pos + buf.length > buffer.length) {
          if (!Buffer2.isBuffer(buf)) {
            buf = Buffer2.from(buf.buffer, buf.byteOffset, buf.byteLength);
          }
          buf.copy(buffer, pos);
        } else {
          Uint8Array.prototype.set.call(
            buffer,
            buf,
            pos
          );
        }
      } else if (!Buffer2.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer, pos);
      }
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer2.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || string instanceof ArrayBuffer) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
      );
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0)
      return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer2.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0)
      return "";
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
  Buffer2.prototype.equals = function equals(b) {
    if (!Buffer2.isBuffer(b))
      throw new TypeError("Argument must be a Buffer");
    if (this === b)
      return true;
    return Buffer2.compare(this, b) === 0;
  };
  Buffer2.prototype.inspect = function inspect() {
    let str = "";
    const max = config.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max)
      str += " ... ";
    return "<Buffer " + str + ">";
  };
  Buffer2.prototype[Symbol.for("nodejs.util.inspect.custom")] = Buffer2.prototype.inspect;
  Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
    if (target instanceof Uint8Array) {
      target = Buffer2.from(target, target.offset, target.byteLength);
    }
    if (!Buffer2.isBuffer(target)) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
      );
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
      return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (Number.isNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (Buffer2.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read2(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    let i;
    if (dir) {
      let foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read2(arr, i + j) !== read2(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i;
    for (i = 0; i < length; ++i) {
      const parsed = parseInt(string.substr(i * 2, 2), 16);
      if (Number.isNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer2.prototype.write = function write2(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0)
          encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining)
      length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding)
      encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer2.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while (i < end) {
      const firstByte = buf[i];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    let out = "";
    for (let i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer2.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer2.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength2, this.length);
    }
    let val = this[offset + --byteLength2];
    let mul = 1;
    while (byteLength2 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength2] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer2.prototype.readBigUInt64LE = function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  };
  Buffer2.prototype.readBigUInt64BE = function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  };
  Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let i = byteLength2;
    let mul = 1;
    let val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128))
      return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer2.prototype.readBigInt64LE = function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
  };
  Buffer2.prototype.readBigInt64BE = function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
  };
  Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer2.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer2.prototype.writeBigUInt64LE = function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  };
  Buffer2.prototype.writeBigUInt64BE = function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  };
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 127, -128);
    if (value < 0)
      value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0)
      value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeBigInt64LE = function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  };
  Buffer2.prototype.writeBigInt64BE = function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  };
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer2.isBuffer(target))
      throw new TypeError("argument should be a Buffer");
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("Index out of range");
    if (end < 0)
      throw new RangeError("sourceEnd out of bounds");
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target) {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, end),
        targetStart
      );
    }
    return len;
  };
  Buffer2.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code = val.charCodeAt(0);
        if (encoding === "utf8" && code < 128 || encoding === "latin1") {
          val = code;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val)
      val = 0;
    let i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  var errors = {};
  function E(sym, getMessage2, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage2.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    },
    RangeError
  );
  E(
    "ERR_INVALID_ARG_TYPE",
    function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    },
    TypeError
  );
  E(
    "ERR_OUT_OF_RANGE",
    function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    },
    RangeError
  );
  function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
  }
  function checkBounds(buf, offset, byteLength2) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
      boundsError(offset, buf.length - (byteLength2 + 1));
    }
  }
  function checkIntBI(value, min, max, buf, offset, byteLength2) {
    if (value > max || value < min) {
      const n = typeof min === "bigint" ? "n" : "";
      let range;
      if (byteLength2 > 3) {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
        } else {
          range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
        }
      } else {
        range = `>= ${min}${n} and <= ${max}${n}`;
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength2);
  }
  function validateNumber(value, name) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(
      type || "offset",
      `>= ${type ? 1 : 0} and <= ${length}`,
      value
    );
  }
  var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(
          codePoint >> 6 | 192,
          codePoint & 63 | 128
        );
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i;
    for (i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  var hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i = 0; i < 16; ++i) {
      const i16 = i * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table;
  }();

  // script/node_modules/@frida/net/lib/adapter.js
  init_process();
  var StreamHandle = class {
    constructor() {
      this.owner = null;
      this.onconnection = null;
      this.onread = null;
      this.closed = false;
      this.reading = false;
      this._listener = null;
      this._connection = null;
      this._reading = false;
      this._queuedRead = null;
    }
    close(callback) {
      if (this.closed) {
        onSuccess();
        return;
      }
      this.closed = true;
      const resource = this._listener || this._connection;
      if (resource === null) {
        onSuccess();
        return;
      }
      resource.close().then(onSuccess, onSuccess);
      function onSuccess() {
        if (callback)
          process_default.nextTick(callback);
      }
    }
    listen(address, port, backlog, callback) {
      let options;
      if (port === -1) {
        options = {
          path: address,
          backlog
        };
      } else {
        options = {
          host: address,
          port,
          backlog
        };
      }
      Socket.listen(options).then((listener) => {
        if (this.closed) {
          listener.close().then(noop2, noop2);
          callback(new Error("Handle is closed"));
          return;
        }
        this._listener = listener;
        this._acceptNext();
        callback(null);
      }).catch((error2) => {
        callback(error2);
      });
    }
    _acceptNext() {
      this._listener.accept().then((connection) => {
        this.onconnection(null, this._create(connection));
        process_default.nextTick(() => {
          if (!this.closed) {
            this._acceptNext();
          }
        });
      }).catch((error2) => {
        if (this.closed) {
          return;
        }
        this.onconnection(error2, null);
      });
    }
    getsockname(result) {
      if (this._listener !== null) {
        result.port = this._listener.port;
        result.family = "IPv4";
        result.address = "0.0.0.0";
      }
      if (this._connection !== null) {
        result.port = 1234;
        result.family = "IPv4";
        result.address = "127.0.0.1";
      }
    }
    connect(req, address, port) {
      Socket.connect({
        host: address,
        port
      }).then((connection) => {
        if (this.closed) {
          connection.close().then(noop2, noop2);
          req.oncomplete(new Error("Handle is closed"), this, req, false, false);
          return;
        }
        this._connection = connection;
        req.oncomplete(null, this, req, true, true);
      }).catch((error2) => {
        req.oncomplete(error2, this, req, false, false);
      });
    }
    readStart() {
      const read2 = this._queuedRead;
      if (read2 !== null) {
        const [error2, data] = read2;
        if (error2 !== null) {
          return error2;
        }
        this._queuedRead = null;
        process_default.nextTick(() => {
          this.onread(null, data.length, data);
        });
      }
      this._reading = true;
      this._readNext();
    }
    _readNext() {
      this._connection.input.read(512).then((rawData) => {
        const data = Buffer2.from(rawData);
        if (this._reading) {
          this.onread(null, data.length, data);
          const isEof = data.length === 0;
          if (!isEof) {
            process_default.nextTick(() => {
              if (this._reading) {
                this._readNext();
              }
            });
          }
        } else {
          this._queuedRead = [null, data];
        }
      }).catch((error2) => {
        if (this._reading) {
          this.onread(error2, -1, null);
        } else {
          this._queuedRead = [error2, null];
        }
      });
    }
    readStop() {
      this._reading = false;
    }
    writeBuffer(req, data) {
      req.bytes = data.length;
      this._connection.output.writeAll(data.buffer).then((connection) => {
        req.oncomplete(null, this, req);
      }).catch((error2) => {
        req.oncomplete(error2, this, req);
      });
    }
  };
  var TCP = class extends StreamHandle {
    _create(connection) {
      const handle = new TCP();
      handle._connection = connection;
      return handle;
    }
  };
  var Pipe = class extends StreamHandle {
    constructor() {
      super();
      throw new Error("Pipe not yet implemented");
    }
    _create(connection) {
      const handle = new Pipe();
      handle._connection = connection;
      return handle;
    }
  };
  var TCPConnectWrap = class {
    constructor() {
      this.address = "";
      this.port = 0;
      this.localAddress = null;
      this.localPort = null;
      this.oncomplete = null;
    }
  };
  var PipeConnectWrap = class {
    constructor() {
      this.address = "";
      this.oncomplete = null;
    }
  };
  var ShutdownWrap = class {
    constructor() {
      this.handle = null;
      this.oncomplete = null;
    }
  };
  var WriteWrap = class {
    constructor() {
      this.handle = null;
      this.oncomplete = null;
      this.bytes = 0;
      this.error = null;
    }
  };
  function noop2() {
  }

  // script/node_modules/@frida/net/index.js
  init_assert();
  init_process();

  // script/node_modules/@frida/readable-stream/errors.js
  init_util();
  var messages = /* @__PURE__ */ new Map();
  var codes2 = {};
  function aggregateTwoErrors(innerError, outerError) {
    if (innerError && outerError && innerError !== outerError) {
      if (Array.isArray(outerError.errors)) {
        outerError.errors.push(innerError);
        return outerError;
      }
      const err = new AggregateError([
        outerError,
        innerError
      ], outerError.message);
      err.code = outerError.code;
      return err;
    }
    return innerError || outerError;
  }
  function makeNodeErrorWithCode(Base, key) {
    return function NodeError(...args) {
      const error2 = new Base();
      const message = getMessage(key, args, error2);
      Object.defineProperties(error2, {
        message: {
          value: message,
          enumerable: false,
          writable: true,
          configurable: true
        },
        toString: {
          value() {
            return `${this.name} [${key}]: ${this.message}`;
          },
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      error2.code = key;
      return error2;
    };
  }
  function E2(sym, val, def, ...otherClasses) {
    messages.set(sym, val);
    def = makeNodeErrorWithCode(def, sym);
    if (otherClasses.length !== 0) {
      otherClasses.forEach((clazz) => {
        def[clazz.name] = makeNodeErrorWithCode(clazz, sym);
      });
    }
    codes2[sym] = def;
  }
  function getMessage(key, args, self) {
    const msg = messages.get(key);
    if (typeof msg === "function") {
      return Reflect.apply(msg, self, args);
    }
    const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
    if (args.length === 0)
      return msg;
    args.unshift(msg);
    return Reflect.apply(format, null, args);
  }
  var AbortError = class extends Error {
    constructor() {
      super("The operation was aborted");
      this.code = "ABORT_ERR";
      this.name = "AbortError";
    }
  };
  E2("ERR_EVENT_RECURSION", 'The event "%s" is already being dispatched', Error);
  E2("ERR_ILLEGAL_CONSTRUCTOR", "Illegal constructor", TypeError);
  E2("ERR_INVALID_ARG_TYPE", "Invalid argument type", TypeError);
  E2("ERR_INVALID_ARG_VALUE", "Invalid argument value", TypeError, RangeError);
  E2("ERR_INVALID_RETURN_VALUE", "Invalid return value", TypeError, RangeError);
  E2("ERR_INVALID_THIS", 'Value of "this" must be of type %s', TypeError);
  E2("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
  E2("ERR_MISSING_ARGS", "Missing argument", TypeError);
  E2("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
  E2("ERR_OUT_OF_RANGE", "Out of range", RangeError);
  E2(
    "ERR_STREAM_ALREADY_FINISHED",
    "Cannot call %s after a stream was finished",
    Error
  );
  E2("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
  E2("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
  E2("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  E2("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
  E2("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
  E2(
    "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
    "stream.unshift() after end event",
    Error
  );
  E2("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
  E2("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);

  // script/node_modules/@frida/readable-stream/lib/once.js
  function once3(callback) {
    let called = false;
    return function(...args) {
      if (called)
        return;
      called = true;
      Reflect.apply(callback, this, args);
    };
  }

  // script/node_modules/@frida/readable-stream/lib/utils.js
  var kDestroyed = Symbol("kDestroyed");
  var kIsDisturbed = Symbol("kIsDisturbed");
  function isReadableNodeStream(obj) {
    return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!obj._writableState || obj._readableState?.readable !== false) && // Duplex
    (!obj._writableState || obj._readableState));
  }
  function isWritableNodeStream(obj) {
    return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || obj._writableState?.writable !== false));
  }
  function isDuplexNodeStream(obj) {
    return !!(obj && (typeof obj.pipe === "function" && obj._readableState) && typeof obj.on === "function" && typeof obj.write === "function");
  }
  function isNodeStream(obj) {
    return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
  }
  function isIterable(obj, isAsync) {
    if (obj == null)
      return false;
    if (isAsync === true)
      return typeof obj[Symbol.asyncIterator] === "function";
    if (isAsync === false)
      return typeof obj[Symbol.iterator] === "function";
    return typeof obj[Symbol.asyncIterator] === "function" || typeof obj[Symbol.iterator] === "function";
  }
  function isDestroyed(stream) {
    if (!isNodeStream(stream))
      return null;
    const wState = stream._writableState;
    const rState = stream._readableState;
    const state = wState || rState;
    return !!(stream.destroyed || stream[kDestroyed] || state?.destroyed);
  }
  function isWritableEnded(stream) {
    if (!isWritableNodeStream(stream))
      return null;
    if (stream.writableEnded === true)
      return true;
    const wState = stream._writableState;
    if (wState?.errored)
      return false;
    if (typeof wState?.ended !== "boolean")
      return null;
    return wState.ended;
  }
  function isWritableFinished(stream, strict2) {
    if (!isWritableNodeStream(stream))
      return null;
    if (stream.writableFinished === true)
      return true;
    const wState = stream._writableState;
    if (wState?.errored)
      return false;
    if (typeof wState?.finished !== "boolean")
      return null;
    return !!(wState.finished || strict2 === false && wState.ended === true && wState.length === 0);
  }
  function isReadableFinished(stream, strict2) {
    if (!isReadableNodeStream(stream))
      return null;
    const rState = stream._readableState;
    if (rState?.errored)
      return false;
    if (typeof rState?.endEmitted !== "boolean")
      return null;
    return !!(rState.endEmitted || strict2 === false && rState.ended === true && rState.length === 0);
  }
  function isReadable(stream) {
    const r = isReadableNodeStream(stream);
    if (r === null || typeof stream?.readable !== "boolean")
      return null;
    if (isDestroyed(stream))
      return false;
    return r && stream.readable && !isReadableFinished(stream);
  }
  function isWritable(stream) {
    const r = isWritableNodeStream(stream);
    if (r === null || typeof stream?.writable !== "boolean")
      return null;
    if (isDestroyed(stream))
      return false;
    return r && stream.writable && !isWritableEnded(stream);
  }
  function isFinished(stream, opts) {
    if (!isNodeStream(stream)) {
      return null;
    }
    if (isDestroyed(stream)) {
      return true;
    }
    if (opts?.readable !== false && isReadable(stream)) {
      return false;
    }
    if (opts?.writable !== false && isWritable(stream)) {
      return false;
    }
    return true;
  }
  function isClosed(stream) {
    if (!isNodeStream(stream)) {
      return null;
    }
    const wState = stream._writableState;
    const rState = stream._readableState;
    if (typeof wState?.closed === "boolean" || typeof rState?.closed === "boolean") {
      return wState?.closed || rState?.closed;
    }
    if (typeof stream._closed === "boolean" && isOutgoingMessage(stream)) {
      return stream._closed;
    }
    return null;
  }
  function isOutgoingMessage(stream) {
    return typeof stream._closed === "boolean" && typeof stream._defaultKeepAlive === "boolean" && typeof stream._removedConnection === "boolean" && typeof stream._removedContLen === "boolean";
  }
  function isServerResponse(stream) {
    return typeof stream._sent100 === "boolean" && isOutgoingMessage(stream);
  }
  function isServerRequest(stream) {
    return typeof stream._consuming === "boolean" && typeof stream._dumped === "boolean" && stream.req?.upgradeOrConnect === void 0;
  }
  function willEmitClose(stream) {
    if (!isNodeStream(stream))
      return null;
    const wState = stream._writableState;
    const rState = stream._readableState;
    const state = wState || rState;
    return !state && isServerResponse(stream) || !!(state && state.autoDestroy && state.emitClose && state.closed === false);
  }
  function isDisturbed(stream) {
    return !!(stream && (stream.readableDidRead || stream.readableAborted || stream[kIsDisturbed]));
  }

  // script/node_modules/@frida/readable-stream/lib/end-of-stream.js
  init_process();
  var {
    ERR_STREAM_PREMATURE_CLOSE
  } = codes2;
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  var nop = () => {
  };
  function eos(stream, options, callback) {
    if (arguments.length === 2) {
      callback = options;
      options = {};
    } else if (options == null) {
      options = {};
    }
    callback = once3(callback);
    const readable = options.readable || options.readable !== false && isReadableNodeStream(stream);
    const writable = options.writable || options.writable !== false && isWritableNodeStream(stream);
    if (isNodeStream(stream)) {
    } else {
    }
    const wState = stream._writableState;
    const rState = stream._readableState;
    const onlegacyfinish = () => {
      if (!stream.writable)
        onfinish();
    };
    let willEmitClose2 = willEmitClose(stream) && isReadableNodeStream(stream) === readable && isWritableNodeStream(stream) === writable;
    let writableFinished = isWritableFinished(stream, false);
    const onfinish = () => {
      writableFinished = true;
      if (stream.destroyed)
        willEmitClose2 = false;
      if (willEmitClose2 && (!stream.readable || readable))
        return;
      if (!readable || readableFinished)
        callback.call(stream);
    };
    let readableFinished = isReadableFinished(stream, false);
    const onend = () => {
      readableFinished = true;
      if (stream.destroyed)
        willEmitClose2 = false;
      if (willEmitClose2 && (!stream.writable || writable))
        return;
      if (!writable || writableFinished)
        callback.call(stream);
    };
    const onerror = (err) => {
      callback.call(stream, err);
    };
    let closed = isClosed(stream);
    const onclose = () => {
      closed = true;
      const errored = wState?.errored || rState?.errored;
      if (errored && typeof errored !== "boolean") {
        return callback.call(stream, errored);
      }
      if (readable && !readableFinished) {
        if (!isReadableFinished(stream, false))
          return callback.call(
            stream,
            new ERR_STREAM_PREMATURE_CLOSE()
          );
      }
      if (writable && !writableFinished) {
        if (!isWritableFinished(stream, false))
          return callback.call(
            stream,
            new ERR_STREAM_PREMATURE_CLOSE()
          );
      }
      callback.call(stream);
    };
    const onrequest = () => {
      stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
      stream.on("complete", onfinish);
      if (!willEmitClose2) {
        stream.on("abort", onclose);
      }
      if (stream.req)
        onrequest();
      else
        stream.on("request", onrequest);
    } else if (writable && !wState) {
      stream.on("end", onlegacyfinish);
      stream.on("close", onlegacyfinish);
    }
    if (!willEmitClose2 && typeof stream.aborted === "boolean") {
      stream.on("aborted", onclose);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (options.error !== false)
      stream.on("error", onerror);
    stream.on("close", onclose);
    if (closed) {
      process_default.nextTick(onclose);
    } else if (wState?.errorEmitted || rState?.errorEmitted) {
      if (!willEmitClose2) {
        process_default.nextTick(onclose);
      }
    } else if (!readable && (!willEmitClose2 || isReadable(stream)) && (writableFinished || !isWritable(stream))) {
      process_default.nextTick(onclose);
    } else if (!writable && (!willEmitClose2 || isWritable(stream)) && (readableFinished || !isReadable(stream))) {
      process_default.nextTick(onclose);
    } else if (rState && stream.req && stream.aborted) {
      process_default.nextTick(onclose);
    }
    const cleanup = () => {
      callback = nop;
      stream.removeListener("aborted", onclose);
      stream.removeListener("complete", onfinish);
      stream.removeListener("abort", onclose);
      stream.removeListener("request", onrequest);
      if (stream.req)
        stream.req.removeListener("finish", onfinish);
      stream.removeListener("end", onlegacyfinish);
      stream.removeListener("close", onlegacyfinish);
      stream.removeListener("finish", onfinish);
      stream.removeListener("end", onend);
      stream.removeListener("error", onerror);
      stream.removeListener("close", onclose);
    };
    if (options.signal && !closed) {
      const abort = () => {
        const endCallback = callback;
        cleanup();
        endCallback.call(stream, new AbortError());
      };
      if (options.signal.aborted) {
        process_default.nextTick(abort);
      } else {
        const originalCallback = callback;
        callback = once3((...args) => {
          options.signal.removeEventListener("abort", abort);
          originalCallback.apply(stream, args);
        });
        options.signal.addEventListener("abort", abort);
      }
    }
    return cleanup;
  }

  // script/node_modules/@frida/readable-stream/lib/add-abort-signal.js
  var { ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE3 } = codes2;
  var validateAbortSignal = (signal, name) => {
    if (typeof signal !== "object" || !("aborted" in signal)) {
      throw new ERR_INVALID_ARG_TYPE3(name, "AbortSignal", signal);
    }
  };
  function isNodeStream2(obj) {
    return !!(obj && typeof obj.pipe === "function");
  }
  function addAbortSignal(signal, stream) {
    validateAbortSignal(signal, "signal");
    if (!isNodeStream2(stream)) {
      throw new ERR_INVALID_ARG_TYPE3("stream", "stream.Stream", stream);
    }
    return module.exports.addAbortSignalNoValidate(signal, stream);
  }

  // script/node_modules/@frida/readable-stream/lib/destroy.js
  var destroy_exports = {};
  __export(destroy_exports, {
    construct: () => construct,
    destroy: () => destroy,
    destroyer: () => destroyer,
    errorOrDestroy: () => errorOrDestroy,
    undestroy: () => undestroy
  });
  init_process();
  var {
    ERR_MULTIPLE_CALLBACK
  } = codes2;
  var kDestroy = Symbol("kDestroy");
  var kConstruct = Symbol("kConstruct");
  function checkError(err, w, r) {
    if (err) {
      err.stack;
      if (w && !w.errored) {
        w.errored = err;
      }
      if (r && !r.errored) {
        r.errored = err;
      }
    }
  }
  function destroy(err, cb) {
    const r = this._readableState;
    const w = this._writableState;
    const s = w || r;
    if (w && w.destroyed || r && r.destroyed) {
      if (typeof cb === "function") {
        cb();
      }
      return this;
    }
    checkError(err, w, r);
    if (w) {
      w.destroyed = true;
    }
    if (r) {
      r.destroyed = true;
    }
    if (!s.constructed) {
      this.once(kDestroy, function(er) {
        _destroy(this, aggregateTwoErrors(er, err), cb);
      });
    } else {
      _destroy(this, err, cb);
    }
    return this;
  }
  function _destroy(self, err, cb) {
    let called = false;
    function onDestroy(err2) {
      if (called) {
        return;
      }
      called = true;
      const r = self._readableState;
      const w = self._writableState;
      checkError(err2, w, r);
      if (w) {
        w.closed = true;
      }
      if (r) {
        r.closed = true;
      }
      if (typeof cb === "function") {
        cb(err2);
      }
      if (err2) {
        process_default.nextTick(emitErrorCloseNT, self, err2);
      } else {
        process_default.nextTick(emitCloseNT, self);
      }
    }
    try {
      const result = self._destroy(err || null, onDestroy);
      if (result != null) {
        const then = result.then;
        if (typeof then === "function") {
          then.call(
            result,
            function() {
              process_default.nextTick(onDestroy, null);
            },
            function(err2) {
              process_default.nextTick(onDestroy, err2);
            }
          );
        }
      }
    } catch (err2) {
      onDestroy(err2);
    }
  }
  function emitErrorCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
  }
  function emitCloseNT(self) {
    const r = self._readableState;
    const w = self._writableState;
    if (w) {
      w.closeEmitted = true;
    }
    if (r) {
      r.closeEmitted = true;
    }
    if (w && w.emitClose || r && r.emitClose) {
      self.emit("close");
    }
  }
  function emitErrorNT(self, err) {
    const r = self._readableState;
    const w = self._writableState;
    if (w && w.errorEmitted || r && r.errorEmitted) {
      return;
    }
    if (w) {
      w.errorEmitted = true;
    }
    if (r) {
      r.errorEmitted = true;
    }
    self.emit("error", err);
  }
  function undestroy() {
    const r = this._readableState;
    const w = this._writableState;
    if (r) {
      r.constructed = true;
      r.closed = false;
      r.closeEmitted = false;
      r.destroyed = false;
      r.errored = null;
      r.errorEmitted = false;
      r.reading = false;
      r.ended = r.readable === false;
      r.endEmitted = r.readable === false;
    }
    if (w) {
      w.constructed = true;
      w.destroyed = false;
      w.closed = false;
      w.closeEmitted = false;
      w.errored = null;
      w.errorEmitted = false;
      w.finalCalled = false;
      w.prefinished = false;
      w.ended = w.writable === false;
      w.ending = w.writable === false;
      w.finished = w.writable === false;
    }
  }
  function errorOrDestroy(stream, err, sync) {
    const r = stream._readableState;
    const w = stream._writableState;
    if (w && w.destroyed || r && r.destroyed) {
      return this;
    }
    if (r && r.autoDestroy || w && w.autoDestroy)
      stream.destroy(err);
    else if (err) {
      err.stack;
      if (w && !w.errored) {
        w.errored = err;
      }
      if (r && !r.errored) {
        r.errored = err;
      }
      if (sync) {
        process_default.nextTick(emitErrorNT, stream, err);
      } else {
        emitErrorNT(stream, err);
      }
    }
  }
  function construct(stream, cb) {
    if (typeof stream._construct !== "function") {
      return;
    }
    const r = stream._readableState;
    const w = stream._writableState;
    if (r) {
      r.constructed = false;
    }
    if (w) {
      w.constructed = false;
    }
    stream.once(kConstruct, cb);
    if (stream.listenerCount(kConstruct) > 1) {
      return;
    }
    process_default.nextTick(constructNT, stream);
  }
  function constructNT(stream) {
    let called = false;
    function onConstruct(err) {
      if (called) {
        errorOrDestroy(stream, err ?? new ERR_MULTIPLE_CALLBACK());
        return;
      }
      called = true;
      const r = stream._readableState;
      const w = stream._writableState;
      const s = w || r;
      if (r) {
        r.constructed = true;
      }
      if (w) {
        w.constructed = true;
      }
      if (s.destroyed) {
        stream.emit(kDestroy, err);
      } else if (err) {
        errorOrDestroy(stream, err, true);
      } else {
        process_default.nextTick(emitConstructNT, stream);
      }
    }
    try {
      const result = stream._construct(onConstruct);
      if (result != null) {
        const then = result.then;
        if (typeof then === "function") {
          then.call(
            result,
            function() {
              process_default.nextTick(onConstruct, null);
            },
            function(err) {
              process_default.nextTick(onConstruct, err);
            }
          );
        }
      }
    } catch (err) {
      onConstruct(err);
    }
  }
  function emitConstructNT(stream) {
    stream.emit(kConstruct);
  }
  function isRequest2(stream) {
    return stream && stream.setHeader && typeof stream.abort === "function";
  }
  function emitCloseLegacy(stream) {
    stream.emit("close");
  }
  function emitErrorCloseLegacy(stream, err) {
    stream.emit("error", err);
    process_default.nextTick(emitCloseLegacy, stream);
  }
  function destroyer(stream, err) {
    if (!stream || isDestroyed(stream)) {
      return;
    }
    if (!err && !isFinished(stream)) {
      err = new AbortError();
    }
    if (isServerRequest(stream)) {
      stream.socket = null;
      stream.destroy(err);
    } else if (isRequest2(stream)) {
      stream.abort();
    } else if (isRequest2(stream.req)) {
      stream.req.abort();
    } else if (typeof stream.destroy === "function") {
      stream.destroy(err);
    } else if (typeof stream.close === "function") {
      stream.close();
    } else if (err) {
      process_default.nextTick(emitErrorCloseLegacy, stream);
    } else {
      process_default.nextTick(emitCloseLegacy, stream);
    }
    if (!stream.destroyed) {
      stream[kDestroyed] = true;
    }
  }

  // script/node_modules/@frida/readable-stream/lib/event_target.js
  init_process();
  init_util();
  var {
    ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE4,
    ERR_EVENT_RECURSION,
    ERR_MISSING_ARGS: ERR_MISSING_ARGS2,
    ERR_INVALID_THIS
  } = codes2;
  var kIsEventTarget = Symbol.for("nodejs.event_target");
  var kIsNodeEventTarget = Symbol("kIsNodeEventTarget");
  var {
    kMaxEventTargetListeners,
    kMaxEventTargetListenersWarned
  } = events_default;
  var kEvents = Symbol("kEvents");
  var kIsBeingDispatched = Symbol("kIsBeingDispatched");
  var kStop = Symbol("kStop");
  var kTarget = Symbol("kTarget");
  var kHandlers = Symbol("khandlers");
  var kWeakHandler = Symbol("kWeak");
  var kHybridDispatch = Symbol.for("nodejs.internal.kHybridDispatch");
  var kCreateEvent = Symbol("kCreateEvent");
  var kNewListener = Symbol("kNewListener");
  var kRemoveListener = Symbol("kRemoveListener");
  var kIsNodeStyleListener = Symbol("kIsNodeStyleListener");
  var kTrustEvent = Symbol("kTrustEvent");
  var kType = Symbol("type");
  var kDefaultPrevented = Symbol("defaultPrevented");
  var kCancelable = Symbol("cancelable");
  var kTimestamp = Symbol("timestamp");
  var kBubbles = Symbol("bubbles");
  var kComposed = Symbol("composed");
  var kPropagationStopped = Symbol("propagationStopped");
  var isTrustedSet = /* @__PURE__ */ new WeakSet();
  var isTrusted = Object.getOwnPropertyDescriptor({
    get isTrusted() {
      return isTrustedSet.has(this);
    }
  }, "isTrusted").get;
  function isEvent(value) {
    return typeof value?.[kType] === "string";
  }
  var _Event = class {
    constructor(type, options = null) {
      if (arguments.length === 0)
        throw new ERR_MISSING_ARGS2("type");
      const { cancelable, bubbles, composed } = { ...options };
      this[kCancelable] = !!cancelable;
      this[kBubbles] = !!bubbles;
      this[kComposed] = !!composed;
      this[kType] = `${type}`;
      this[kDefaultPrevented] = false;
      this[kTimestamp] = Date.now();
      this[kPropagationStopped] = false;
      if (options?.[kTrustEvent]) {
        isTrustedSet.add(this);
      }
      Object.defineProperty(this, "isTrusted", {
        get: isTrusted,
        enumerable: true,
        configurable: false
      });
      this[kTarget] = null;
      this[kIsBeingDispatched] = false;
    }
    [inspect2.custom](depth, options) {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      const name = this.constructor.name;
      if (depth < 0)
        return name;
      const opts = Object.assign({}, options, {
        depth: Number.isInteger(options.depth) ? options.depth - 1 : options.depth
      });
      return `${name} ${inspect2({
        type: this[kType],
        defaultPrevented: this[kDefaultPrevented],
        cancelable: this[kCancelable],
        timeStamp: this[kTimestamp]
      }, opts)}`;
    }
    stopImmediatePropagation() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      this[kStop] = true;
    }
    preventDefault() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      this[kDefaultPrevented] = true;
    }
    get target() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kTarget];
    }
    get currentTarget() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kTarget];
    }
    get srcElement() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kTarget];
    }
    get type() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kType];
    }
    get cancelable() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kCancelable];
    }
    get defaultPrevented() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kCancelable] && this[kDefaultPrevented];
    }
    get timeStamp() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kTimestamp];
    }
    // The following are non-op and unused properties/methods from Web API Event.
    // These are not supported in Node.js and are provided purely for
    // API completeness.
    composedPath() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kIsBeingDispatched] ? [this[kTarget]] : [];
    }
    get returnValue() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return !this.defaultPrevented;
    }
    get bubbles() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kBubbles];
    }
    get composed() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kComposed];
    }
    get eventPhase() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kIsBeingDispatched] ? _Event.AT_TARGET : _Event.NONE;
    }
    get cancelBubble() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      return this[kPropagationStopped];
    }
    set cancelBubble(value) {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      if (value) {
        this.stopPropagation();
      }
    }
    stopPropagation() {
      if (!isEvent(this))
        throw new ERR_INVALID_THIS("Event");
      this[kPropagationStopped] = true;
    }
  };
  var Event = _Event;
  __publicField(Event, "NONE", 0);
  __publicField(Event, "CAPTURING_PHASE", 1);
  __publicField(Event, "AT_TARGET", 2);
  __publicField(Event, "BUBBLING_PHASE", 3);
  var kEnumerableProperty = /* @__PURE__ */ Object.create(null);
  kEnumerableProperty.enumerable = true;
  Object.defineProperties(
    Event.prototype,
    {
      [Symbol.toStringTag]: {
        writable: false,
        enumerable: false,
        configurable: true,
        value: "Event"
      },
      stopImmediatePropagation: kEnumerableProperty,
      preventDefault: kEnumerableProperty,
      target: kEnumerableProperty,
      currentTarget: kEnumerableProperty,
      srcElement: kEnumerableProperty,
      type: kEnumerableProperty,
      cancelable: kEnumerableProperty,
      defaultPrevented: kEnumerableProperty,
      timeStamp: kEnumerableProperty,
      composedPath: kEnumerableProperty,
      returnValue: kEnumerableProperty,
      bubbles: kEnumerableProperty,
      composed: kEnumerableProperty,
      eventPhase: kEnumerableProperty,
      cancelBubble: kEnumerableProperty,
      stopPropagation: kEnumerableProperty
    }
  );
  var NodeCustomEvent = class extends Event {
    constructor(type, options) {
      super(type, options);
      if (options?.detail) {
        this.detail = options.detail;
      }
    }
  };
  var weakListenersState = null;
  var objectToWeakListenerMap = null;
  function weakListeners() {
    if (weakListenersState === null) {
      weakListenersState = new FinalizationRegistry(
        (listener) => listener.remove()
      );
    }
    if (objectToWeakListenerMap === null) {
      objectToWeakListenerMap = /* @__PURE__ */ new WeakMap();
    }
    return { registry: weakListenersState, map: objectToWeakListenerMap };
  }
  var Listener = class {
    constructor(previous, listener, once4, capture, passive, isNodeStyleListener, weak) {
      this.next = void 0;
      if (previous !== void 0)
        previous.next = this;
      this.previous = previous;
      this.listener = listener;
      this.once = once4;
      this.capture = capture;
      this.passive = passive;
      this.isNodeStyleListener = isNodeStyleListener;
      this.removed = false;
      this.weak = Boolean(weak);
      if (this.weak) {
        this.callback = new WeakRef(listener);
        weakListeners().registry.register(listener, this, this);
        weakListeners().map.set(weak, listener);
        this.listener = this.callback;
      } else if (typeof listener === "function") {
        this.callback = listener;
        this.listener = listener;
      } else {
        this.callback = listener.handleEvent.bind(listener);
        this.listener = listener;
      }
    }
    same(listener, capture) {
      const myListener = this.weak ? this.listener.deref() : this.listener;
      return myListener === listener && this.capture === capture;
    }
    remove() {
      if (this.previous !== void 0)
        this.previous.next = this.next;
      if (this.next !== void 0)
        this.next.previous = this.previous;
      this.removed = true;
      if (this.weak)
        weakListeners().registry.unregister(this);
    }
  };
  function initEventTarget(self) {
    self[kEvents] = /* @__PURE__ */ new Map();
    self[kMaxEventTargetListeners] = events_default.defaultMaxListeners;
    self[kMaxEventTargetListenersWarned] = false;
  }
  var _a;
  var EventTarget = class {
    constructor() {
      initEventTarget(this);
    }
    [(_a = kIsEventTarget, kNewListener)](size, type, listener, once4, capture, passive) {
      if (this[kMaxEventTargetListeners] > 0 && size > this[kMaxEventTargetListeners] && !this[kMaxEventTargetListenersWarned]) {
        this[kMaxEventTargetListenersWarned] = true;
        const w = new Error(`Possible EventTarget memory leak detected. ${size} ${type} listeners added to ${inspect2(this, { depth: -1 })}. Use events.setMaxListeners() to increase limit`);
        w.name = "MaxListenersExceededWarning";
        w.target = this;
        w.type = type;
        w.count = size;
        process_default.emitWarning(w);
      }
    }
    [kRemoveListener](size, type, listener, capture) {
    }
    addEventListener(type, listener, options = {}) {
      if (!isEventTarget(this))
        throw new ERR_INVALID_THIS("EventTarget");
      if (arguments.length < 2)
        throw new ERR_MISSING_ARGS2("type", "listener");
      const {
        once: once4,
        capture,
        passive,
        signal,
        isNodeStyleListener,
        weak
      } = validateEventListenerOptions(options);
      if (!shouldAddListener(listener)) {
        const w = new Error(`addEventListener called with ${listener} which has no effect.`);
        w.name = "AddEventListenerArgumentTypeWarning";
        w.target = this;
        w.type = type;
        process_default.emitWarning(w);
        return;
      }
      type = String(type);
      if (signal) {
        if (signal.aborted) {
          return;
        }
        signal.addEventListener("abort", () => {
          this.removeEventListener(type, listener, options);
        }, { once: true, [kWeakHandler]: this });
      }
      let root = this[kEvents].get(type);
      if (root === void 0) {
        root = { size: 1, next: void 0 };
        new Listener(
          root,
          listener,
          once4,
          capture,
          passive,
          isNodeStyleListener,
          weak
        );
        this[kNewListener](root.size, type, listener, once4, capture, passive);
        this[kEvents].set(type, root);
        return;
      }
      let handler = root.next;
      let previous = root;
      while (handler !== void 0 && !handler.same(listener, capture)) {
        previous = handler;
        handler = handler.next;
      }
      if (handler !== void 0) {
        return;
      }
      new Listener(
        previous,
        listener,
        once4,
        capture,
        passive,
        isNodeStyleListener,
        weak
      );
      root.size++;
      this[kNewListener](root.size, type, listener, once4, capture, passive);
    }
    removeEventListener(type, listener, options = {}) {
      if (!isEventTarget(this))
        throw new ERR_INVALID_THIS("EventTarget");
      if (!shouldAddListener(listener))
        return;
      type = String(type);
      const capture = options?.capture === true;
      const root = this[kEvents].get(type);
      if (root === void 0 || root.next === void 0)
        return;
      let handler = root.next;
      while (handler !== void 0) {
        if (handler.same(listener, capture)) {
          handler.remove();
          root.size--;
          if (root.size === 0)
            this[kEvents].delete(type);
          this[kRemoveListener](root.size, type, listener, capture);
          break;
        }
        handler = handler.next;
      }
    }
    dispatchEvent(event) {
      if (!isEventTarget(this))
        throw new ERR_INVALID_THIS("EventTarget");
      if (!(event instanceof Event))
        throw new ERR_INVALID_ARG_TYPE4("event", "Event", event);
      if (event[kIsBeingDispatched])
        throw new ERR_EVENT_RECURSION(event.type);
      this[kHybridDispatch](event, event.type, event);
      return event.defaultPrevented !== true;
    }
    [kHybridDispatch](nodeValue, type, event) {
      const createEvent = () => {
        if (event === void 0) {
          event = this[kCreateEvent](nodeValue, type);
          event[kTarget] = this;
          event[kIsBeingDispatched] = true;
        }
        return event;
      };
      if (event !== void 0) {
        event[kTarget] = this;
        event[kIsBeingDispatched] = true;
      }
      const root = this[kEvents].get(type);
      if (root === void 0 || root.next === void 0) {
        if (event !== void 0)
          event[kIsBeingDispatched] = false;
        return true;
      }
      let handler = root.next;
      let next;
      while (handler !== void 0 && (handler.passive || event?.[kStop] !== true)) {
        next = handler.next;
        if (handler.removed) {
          handler = next;
          continue;
        }
        if (handler.once) {
          handler.remove();
          root.size--;
          const { listener, capture } = handler;
          this[kRemoveListener](root.size, type, listener, capture);
        }
        try {
          let arg;
          if (handler.isNodeStyleListener) {
            arg = nodeValue;
          } else {
            arg = createEvent();
          }
          const callback = handler.weak ? handler.callback.deref() : handler.callback;
          let result;
          if (callback) {
            result = callback.call(this, arg);
            if (!handler.isNodeStyleListener) {
              arg[kIsBeingDispatched] = false;
            }
          }
          if (result !== void 0 && result !== null)
            addCatch(result);
        } catch (err) {
          emitUncaughtException(err);
        }
        handler = next;
      }
      if (event !== void 0)
        event[kIsBeingDispatched] = false;
    }
    [kCreateEvent](nodeValue, type) {
      return new NodeCustomEvent(type, { detail: nodeValue });
    }
    [inspect2.custom](depth, options) {
      if (!isEventTarget(this))
        throw new ERR_INVALID_THIS("EventTarget");
      const name = this.constructor.name;
      if (depth < 0)
        return name;
      const opts = Object.assign({}, options, {
        depth: Number.isInteger(options.depth) ? options.depth - 1 : options.depth
      });
      return `${name} ${inspect2({}, opts)}`;
    }
  };
  // Used in checking whether an object is an EventTarget. This is a well-known
  // symbol as EventTarget may be used cross-realm.
  // Ref: https://github.com/nodejs/node/pull/33661
  __publicField(EventTarget, _a, true);
  Object.defineProperties(EventTarget.prototype, {
    addEventListener: kEnumerableProperty,
    removeEventListener: kEnumerableProperty,
    dispatchEvent: kEnumerableProperty,
    [Symbol.toStringTag]: {
      writable: false,
      enumerable: false,
      configurable: true,
      value: "EventTarget"
    }
  });
  function initNodeEventTarget(self) {
    initEventTarget(self);
  }
  var _a2;
  var NodeEventTarget = class extends EventTarget {
    constructor() {
      super();
      initNodeEventTarget(this);
    }
    setMaxListeners(n) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      events_default.setMaxListeners(n, this);
    }
    getMaxListeners() {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      return this[kMaxEventTargetListeners];
    }
    eventNames() {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      return Array.from(this[kEvents].keys());
    }
    listenerCount(type) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      const root = this[kEvents].get(String(type));
      return root !== void 0 ? root.size : 0;
    }
    off(type, listener, options) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      this.removeEventListener(type, listener, options);
      return this;
    }
    removeListener(type, listener, options) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      this.removeEventListener(type, listener, options);
      return this;
    }
    on(type, listener) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      this.addEventListener(type, listener, { [kIsNodeStyleListener]: true });
      return this;
    }
    addListener(type, listener) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      this.addEventListener(type, listener, { [kIsNodeStyleListener]: true });
      return this;
    }
    emit(type, arg) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      const hadListeners = this.listenerCount(type) > 0;
      this[kHybridDispatch](arg, type);
      return hadListeners;
    }
    once(type, listener) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      this.addEventListener(
        type,
        listener,
        { once: true, [kIsNodeStyleListener]: true }
      );
      return this;
    }
    removeAllListeners(type) {
      if (!isNodeEventTarget(this))
        throw new ERR_INVALID_THIS("NodeEventTarget");
      if (type !== void 0) {
        this[kEvents].delete(String(type));
      } else {
        this[kEvents].clear();
      }
      return this;
    }
  };
  _a2 = kIsNodeEventTarget;
  __publicField(NodeEventTarget, _a2, true);
  __publicField(NodeEventTarget, "defaultMaxListeners", 10);
  Object.defineProperties(NodeEventTarget.prototype, {
    setMaxListeners: kEnumerableProperty,
    getMaxListeners: kEnumerableProperty,
    eventNames: kEnumerableProperty,
    listenerCount: kEnumerableProperty,
    off: kEnumerableProperty,
    removeListener: kEnumerableProperty,
    on: kEnumerableProperty,
    addListener: kEnumerableProperty,
    once: kEnumerableProperty,
    emit: kEnumerableProperty,
    removeAllListeners: kEnumerableProperty
  });
  function shouldAddListener(listener) {
    if (typeof listener === "function" || typeof listener?.handleEvent === "function") {
      return true;
    }
    if (listener == null)
      return false;
    throw new ERR_INVALID_ARG_TYPE4("listener", "EventListener", listener);
  }
  function validateEventListenerOptions(options) {
    if (typeof options === "boolean")
      return { capture: options };
    if (options === null)
      return {};
    return {
      once: Boolean(options.once),
      capture: Boolean(options.capture),
      passive: Boolean(options.passive),
      signal: options.signal,
      weak: options[kWeakHandler],
      isNodeStyleListener: Boolean(options[kIsNodeStyleListener])
    };
  }
  function isEventTarget(obj) {
    return obj?.constructor?.[kIsEventTarget];
  }
  function isNodeEventTarget(obj) {
    return obj?.constructor?.[kIsNodeEventTarget];
  }
  function addCatch(promise) {
    const then = promise.then;
    if (typeof then === "function") {
      then.call(promise, void 0, function(err) {
        emitUncaughtException(err);
      });
    }
  }
  function emitUncaughtException(err) {
    process_default.nextTick(() => {
      throw err;
    });
  }
  function makeEventHandler(handler) {
    function eventHandler(...args) {
      if (typeof eventHandler.handler !== "function") {
        return;
      }
      return Reflect.apply(eventHandler.handler, this, args);
    }
    eventHandler.handler = handler;
    return eventHandler;
  }
  function defineEventHandler(emitter, name) {
    Object.defineProperty(emitter, `on${name}`, {
      get() {
        return this[kHandlers]?.get(name)?.handler;
      },
      set(value) {
        if (!this[kHandlers]) {
          this[kHandlers] = /* @__PURE__ */ new Map();
        }
        let wrappedHandler = this[kHandlers]?.get(name);
        if (wrappedHandler) {
          if (typeof wrappedHandler.handler === "function") {
            this[kEvents].get(name).size--;
            const size = this[kEvents].get(name).size;
            this[kRemoveListener](size, name, wrappedHandler.handler, false);
          }
          wrappedHandler.handler = value;
          if (typeof wrappedHandler.handler === "function") {
            this[kEvents].get(name).size++;
            const size = this[kEvents].get(name).size;
            this[kNewListener](size, name, value, false, false, false);
          }
        } else {
          wrappedHandler = makeEventHandler(value);
          this.addEventListener(name, wrappedHandler);
        }
        this[kHandlers].set(name, wrappedHandler);
      },
      configurable: true,
      enumerable: true
    });
  }

  // script/node_modules/@frida/readable-stream/lib/abort_controller.js
  init_util();
  var {
    ERR_ILLEGAL_CONSTRUCTOR,
    ERR_INVALID_THIS: ERR_INVALID_THIS2
  } = codes2;
  var kAborted = Symbol("kAborted");
  function customInspect(self, obj, depth, options) {
    if (depth < 0)
      return self;
    const opts = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1
    });
    return `${self.constructor.name} ${inspect2(obj, opts)}`;
  }
  function validateAbortSignal2(obj) {
    if (obj?.[kAborted] === void 0)
      throw new ERR_INVALID_THIS2("AbortSignal");
  }
  var AbortSignal = class extends EventTarget {
    constructor() {
      throw new ERR_ILLEGAL_CONSTRUCTOR();
    }
    get aborted() {
      validateAbortSignal2(this);
      return !!this[kAborted];
    }
    [inspect2.custom](depth, options) {
      return customInspect(this, {
        aborted: this.aborted
      }, depth, options);
    }
    static abort() {
      return createAbortSignal(true);
    }
  };
  Object.defineProperties(AbortSignal.prototype, {
    aborted: { enumerable: true }
  });
  Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
    writable: false,
    enumerable: false,
    configurable: true,
    value: "AbortSignal"
  });
  defineEventHandler(AbortSignal.prototype, "abort");
  function createAbortSignal(aborted = false) {
    const signal = new EventTarget();
    Object.setPrototypeOf(signal, AbortSignal.prototype);
    signal[kAborted] = aborted;
    return signal;
  }
  function abortSignal(signal) {
    if (signal[kAborted])
      return;
    signal[kAborted] = true;
    const event = new Event("abort", {
      [kTrustEvent]: true
    });
    signal.dispatchEvent(event);
  }
  var kSignal = Symbol("signal");
  function validateAbortController(obj) {
    if (obj?.[kSignal] === void 0)
      throw new ERR_INVALID_THIS2("AbortController");
  }
  var AbortController = class {
    constructor() {
      this[kSignal] = createAbortSignal();
    }
    get signal() {
      validateAbortController(this);
      return this[kSignal];
    }
    abort() {
      validateAbortController(this);
      abortSignal(this[kSignal]);
    }
    [inspect2.custom](depth, options) {
      return customInspect(this, {
        signal: this.signal
      }, depth, options);
    }
  };
  Object.defineProperties(AbortController.prototype, {
    signal: { enumerable: true },
    abort: { enumerable: true }
  });
  Object.defineProperty(AbortController.prototype, Symbol.toStringTag, {
    writable: false,
    enumerable: false,
    configurable: true,
    value: "AbortController"
  });

  // script/node_modules/@frida/readable-stream/lib/from.js
  init_process();
  var {
    ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE5,
    ERR_STREAM_NULL_VALUES
  } = codes2;
  function from2(Readable2, iterable, opts) {
    let iterator;
    if (typeof iterable === "string" || iterable instanceof Buffer2) {
      return new Readable2({
        objectMode: true,
        ...opts,
        read() {
          this.push(iterable);
          this.push(null);
        }
      });
    }
    let isAsync;
    if (iterable && iterable[Symbol.asyncIterator]) {
      isAsync = true;
      iterator = iterable[Symbol.asyncIterator]();
    } else if (iterable && iterable[Symbol.iterator]) {
      isAsync = false;
      iterator = iterable[Symbol.iterator]();
    } else {
      throw new ERR_INVALID_ARG_TYPE5("iterable", ["Iterable"], iterable);
    }
    const readable = new Readable2({
      objectMode: true,
      highWaterMark: 1,
      // TODO(ronag): What options should be allowed?
      ...opts
    });
    let reading = false;
    readable._read = function() {
      if (!reading) {
        reading = true;
        next();
      }
    };
    readable._destroy = function(error2, cb) {
      close(error2).then(
        () => process_default.nextTick(cb, error2),
        // nextTick is here in case cb throws
        (e) => process_default.nextTick(cb, e || error2)
      );
    };
    async function close(error2) {
      const hadError = error2 !== void 0 && error2 !== null;
      const hasThrow = typeof iterator.throw === "function";
      if (hadError && hasThrow) {
        const { value, done } = await iterator.throw(error2);
        await value;
        if (done) {
          return;
        }
      }
      if (typeof iterator.return === "function") {
        const { value } = await iterator.return();
        await value;
      }
    }
    async function next() {
      for (; ; ) {
        try {
          const { value, done } = isAsync ? await iterator.next() : iterator.next();
          if (done) {
            readable.push(null);
          } else {
            const res = value && typeof value.then === "function" ? await value : value;
            if (res === null) {
              reading = false;
              throw new ERR_STREAM_NULL_VALUES();
            } else if (readable.push(res)) {
              continue;
            } else {
              reading = false;
            }
          }
        } catch (err) {
          readable.destroy(err);
        }
        break;
      }
    }
    return readable;
  }

  // script/node_modules/@frida/readable-stream/lib/buffer_list.js
  init_util();
  var BufferList = class {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    push(v) {
      const entry = { data: v, next: null };
      if (this.length > 0)
        this.tail.next = entry;
      else
        this.head = entry;
      this.tail = entry;
      ++this.length;
    }
    unshift(v) {
      const entry = { data: v, next: this.head };
      if (this.length === 0)
        this.tail = entry;
      this.head = entry;
      ++this.length;
    }
    shift() {
      if (this.length === 0)
        return;
      const ret = this.head.data;
      if (this.length === 1)
        this.head = this.tail = null;
      else
        this.head = this.head.next;
      --this.length;
      return ret;
    }
    clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
    join(s) {
      if (this.length === 0)
        return "";
      let p = this.head;
      let ret = "" + p.data;
      while (p = p.next)
        ret += s + p.data;
      return ret;
    }
    concat(n) {
      if (this.length === 0)
        return Buffer2.alloc(0);
      const ret = Buffer2.allocUnsafe(n >>> 0);
      let p = this.head;
      let i = 0;
      while (p) {
        ret.set(p.data, i);
        i += p.data.length;
        p = p.next;
      }
      return ret;
    }
    // Consumes a specified amount of bytes or characters from the buffered data.
    consume(n, hasStrings) {
      const data = this.head.data;
      if (n < data.length) {
        const slice2 = data.slice(0, n);
        this.head.data = data.slice(n);
        return slice2;
      }
      if (n === data.length) {
        return this.shift();
      }
      return hasStrings ? this._getString(n) : this._getBuffer(n);
    }
    first() {
      return this.head.data;
    }
    *[Symbol.iterator]() {
      for (let p = this.head; p; p = p.next) {
        yield p.data;
      }
    }
    // Consumes a specified amount of characters from the buffered data.
    _getString(n) {
      let ret = "";
      let p = this.head;
      let c = 0;
      do {
        const str = p.data;
        if (n > str.length) {
          ret += str;
          n -= str.length;
        } else {
          if (n === str.length) {
            ret += str;
            ++c;
            if (p.next)
              this.head = p.next;
            else
              this.head = this.tail = null;
          } else {
            ret += str.slice(0, n);
            this.head = p;
            p.data = str.slice(n);
          }
          break;
        }
        ++c;
      } while (p = p.next);
      this.length -= c;
      return ret;
    }
    // Consumes a specified amount of bytes from the buffered data.
    _getBuffer(n) {
      const ret = Buffer2.allocUnsafe(n);
      const retLen = n;
      let p = this.head;
      let c = 0;
      do {
        const buf = p.data;
        if (n > buf.length) {
          ret.set(buf, retLen - n);
          n -= buf.length;
        } else {
          if (n === buf.length) {
            ret.set(buf, retLen - n);
            ++c;
            if (p.next)
              this.head = p.next;
            else
              this.head = this.tail = null;
          } else {
            ret.set(
              new Uint8Array(buf.buffer, buf.byteOffset, n),
              retLen - n
            );
            this.head = p;
            p.data = buf.slice(n);
          }
          break;
        }
        ++c;
      } while (p = p.next);
      this.length -= c;
      return ret;
    }
    // Make sure the linked list only shows the minimal necessary information.
    [inspect2.custom](_, options) {
      return inspect2(this, {
        ...options,
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      });
    }
  };

  // script/node_modules/@frida/readable-stream/lib/legacy.js
  function Stream(opts) {
    events_default.call(this, opts);
  }
  Object.setPrototypeOf(Stream.prototype, events_default.prototype);
  Object.setPrototypeOf(Stream, events_default);
  Stream.prototype.pipe = function(dest, options) {
    const source = this;
    function ondata(chunk) {
      if (dest.writable && dest.write(chunk) === false && source.pause) {
        source.pause();
      }
    }
    source.on("data", ondata);
    function ondrain2() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }
    dest.on("drain", ondrain2);
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on("end", onend);
      source.on("close", onclose);
    }
    let didOnEnd = false;
    function onend() {
      if (didOnEnd)
        return;
      didOnEnd = true;
      dest.end();
    }
    function onclose() {
      if (didOnEnd)
        return;
      didOnEnd = true;
      if (typeof dest.destroy === "function")
        dest.destroy();
    }
    function onerror(er) {
      cleanup();
      if (events_default.listenerCount(this, "error") === 0) {
        this.emit("error", er);
      }
    }
    prependListener3(source, "error", onerror);
    prependListener3(dest, "error", onerror);
    function cleanup() {
      source.removeListener("data", ondata);
      dest.removeListener("drain", ondrain2);
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
  };
  function prependListener3(emitter, event, fn) {
    if (typeof emitter.prependListener === "function")
      return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }

  // script/node_modules/@frida/readable-stream/lib/state.js
  var { ERR_INVALID_ARG_VALUE: ERR_INVALID_ARG_VALUE2 } = codes2;
  function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
  }
  function getDefaultHighWaterMark(objectMode) {
    return objectMode ? 16 : 16 * 1024;
  }
  function getHighWaterMark(state, options, duplexKey, isDuplex) {
    const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
      if (!Number.isInteger(hwm) || hwm < 0) {
        const name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
        throw new ERR_INVALID_ARG_VALUE2(name, hwm);
      }
      return Math.floor(hwm);
    }
    return getDefaultHighWaterMark(state.objectMode);
  }

  // script/node_modules/@frida/readable-stream/lib/readable.js
  init_process();

  // script/node_modules/@frida/string_decoder/lib/string_decoder.js
  var isEncoding2 = Buffer2.isEncoding;
  function _normalizeEncoding(enc) {
    if (!enc)
      return "utf8";
    let retried = false;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried)
            return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    const nenc = _normalizeEncoding(enc);
    if (nenc === void 0 && (Buffer2.isEncoding === isEncoding2 || !isEncoding2(enc)))
      throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    let nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0)
      return "";
    let r;
    let i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === void 0)
        return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i = 0;
    }
    if (i < buf.length)
      return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127)
      return 0;
    else if (byte >> 5 === 6)
      return 2;
    else if (byte >> 4 === 14)
      return 3;
    else if (byte >> 3 === 30)
      return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self, buf, i) {
    let j = buf.length - 1;
    if (j < i)
      return 0;
    let nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2)
          nb = 0;
        else
          self.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self.lastNeed = 0;
      return "\uFFFD";
    }
    if (self.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self.lastNeed = 1;
        return "\uFFFD";
      }
      if (self.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self.lastNeed = 2;
          return "\uFFFD";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    const p = this.lastTotal - this.lastNeed;
    const r = utf8CheckExtraBytes(this, buf, p);
    if (r !== void 0)
      return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    const total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed)
      return buf.toString("utf8", i);
    this.lastTotal = total;
    const end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
  }
  function utf8End(buf) {
    const r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + "\uFFFD";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      const r = buf.toString("utf16le", i);
      if (r) {
        const c = r.charCodeAt(r.length - 1);
        if (c >= 55296 && c <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    const r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      const end = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
  }
  function base64Text(buf, i) {
    const n = (buf.length - i) % 3;
    if (n === 0)
      return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    const r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }

  // script/node_modules/@frida/readable-stream/lib/readable.js
  var readable_default = Readable;
  var {
    ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE6,
    ERR_METHOD_NOT_IMPLEMENTED,
    ERR_OUT_OF_RANGE,
    ERR_STREAM_PUSH_AFTER_EOF,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT
  } = codes2;
  var kPaused = Symbol("kPaused");
  Object.setPrototypeOf(Readable.prototype, Stream.prototype);
  Object.setPrototypeOf(Readable, Stream);
  var nop2 = () => {
  };
  var { errorOrDestroy: errorOrDestroy2 } = destroy_exports;
  function ReadableState(options, stream, isDuplex) {
    if (typeof isDuplex !== "boolean")
      isDuplex = stream instanceof Stream.Duplex;
    this.objectMode = !!(options && options.objectMode);
    if (isDuplex)
      this.objectMode = this.objectMode || !!(options && options.readableObjectMode);
    this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = [];
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.constructed = true;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this[kPaused] = null;
    this.errorEmitted = false;
    this.emitClose = !options || options.emitClose !== false;
    this.autoDestroy = !options || options.autoDestroy !== false;
    this.destroyed = false;
    this.errored = null;
    this.closed = false;
    this.closeEmitted = false;
    this.defaultEncoding = options && options.defaultEncoding || "utf8";
    this.awaitDrainWriters = null;
    this.multiAwaitDrain = false;
    this.readingMore = false;
    this.dataEmitted = false;
    this.decoder = null;
    this.encoding = null;
    if (options && options.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    if (!(this instanceof Readable))
      return new Readable(options);
    const isDuplex = this instanceof Stream.Duplex;
    this._readableState = new ReadableState(options, this, isDuplex);
    if (options) {
      if (typeof options.read === "function")
        this._read = options.read;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.construct === "function")
        this._construct = options.construct;
      if (options.signal && !isDuplex)
        addAbortSignal(options.signal, this);
    }
    Stream.call(this, options);
    construct(this, () => {
      if (this._readableState.needReadable) {
        maybeReadMore(this, this._readableState);
      }
    });
  }
  Readable.prototype.destroy = destroy;
  Readable.prototype._undestroy = undestroy;
  Readable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Readable.prototype[events_default.captureRejectionSymbol] = function(err) {
    this.destroy(err);
  };
  Readable.prototype.push = function(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, false);
  };
  Readable.prototype.unshift = function(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, true);
  };
  function readableAddChunk(stream, chunk, encoding, addToFront) {
    const state = stream._readableState;
    let err;
    if (!state.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (state.encoding !== encoding) {
          if (addToFront && state.encoding) {
            chunk = Buffer2.from(chunk, encoding).toString(state.encoding);
          } else {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
        }
      } else if (chunk instanceof Buffer2) {
        encoding = "";
      } else if (Stream._isUint8Array(chunk)) {
        chunk = Stream._uint8ArrayToBuffer(chunk);
        encoding = "";
      } else if (chunk != null) {
        err = new ERR_INVALID_ARG_TYPE6(
          "chunk",
          ["string", "Buffer", "Uint8Array"],
          chunk
        );
      }
    }
    if (err) {
      errorOrDestroy2(stream, err);
    } else if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (addToFront) {
        if (state.endEmitted)
          errorOrDestroy2(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
        else if (state.destroyed || state.errored)
          return false;
        else
          addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy2(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed || state.errored) {
        return false;
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0)
            addChunk(stream, state, chunk, false);
          else
            maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
  }
  function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync && stream.listenerCount("data") > 0) {
      if (state.multiAwaitDrain) {
        state.awaitDrainWriters.clear();
      } else {
        state.awaitDrainWriters = null;
      }
      state.dataEmitted = true;
      stream.emit("data", chunk);
    } else {
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront)
        state.buffer.unshift(chunk);
      else
        state.buffer.push(chunk);
      if (state.needReadable)
        emitReadable(stream);
    }
    maybeReadMore(stream, state);
  }
  Readable.prototype.isPaused = function() {
    const state = this._readableState;
    return state[kPaused] === true || state.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    const decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    const buffer = this._readableState.buffer;
    let content = "";
    for (const data of buffer) {
      content += decoder.write(data);
    }
    buffer.clear();
    if (content !== "")
      buffer.push(content);
    this._readableState.length = content.length;
    return this;
  };
  var MAX_HWM = 1073741824;
  function computeNewHighWaterMark(n) {
    if (n > MAX_HWM) {
      throw new ERR_OUT_OF_RANGE("size", "<= 1GiB", n);
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended)
      return 0;
    if (state.objectMode)
      return 1;
    if (Number.isNaN(n)) {
      if (state.flowing && state.length)
        return state.buffer.first().length;
      return state.length;
    }
    if (n <= state.length)
      return n;
    return state.ended ? state.length : 0;
  }
  Readable.prototype.read = function(n) {
    if (n === void 0) {
      n = NaN;
    } else if (!Number.isInteger(n)) {
      n = Number.parseInt(n, 10);
    }
    const state = this._readableState;
    const nOrig = n;
    if (n > state.highWaterMark)
      state.highWaterMark = computeNewHighWaterMark(n);
    if (n !== 0)
      state.emittedReadable = false;
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
      if (state.length === 0 && state.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
      if (state.length === 0)
        endReadable(this);
      return null;
    }
    let doRead = state.needReadable;
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
    }
    if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
      doRead = false;
    } else if (doRead) {
      state.reading = true;
      state.sync = true;
      if (state.length === 0)
        state.needReadable = true;
      try {
        const result = this._read(state.highWaterMark);
        if (result != null) {
          const then = result.then;
          if (typeof then === "function") {
            then.call(
              result,
              nop2,
              function(err) {
                errorOrDestroy2(this, err);
              }
            );
          }
        }
      } catch (err) {
        errorOrDestroy2(this, err);
      }
      state.sync = false;
      if (!state.reading)
        n = howMuchToRead(nOrig, state);
    }
    let ret;
    if (n > 0)
      ret = fromList(n, state);
    else
      ret = null;
    if (ret === null) {
      state.needReadable = state.length <= state.highWaterMark;
      n = 0;
    } else {
      state.length -= n;
      if (state.multiAwaitDrain) {
        state.awaitDrainWriters.clear();
      } else {
        state.awaitDrainWriters = null;
      }
    }
    if (state.length === 0) {
      if (!state.ended)
        state.needReadable = true;
      if (nOrig !== n && state.ended)
        endReadable(this);
    }
    if (ret !== null && !state.errorEmitted && !state.closeEmitted) {
      state.dataEmitted = true;
      this.emit("data", ret);
    }
    return ret;
  };
  function onEofChunk(stream, state) {
    if (state.ended)
      return;
    if (state.decoder) {
      const chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    if (state.sync) {
      emitReadable(stream);
    } else {
      state.needReadable = false;
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
  function emitReadable(stream) {
    const state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      state.emittedReadable = true;
      process_default.nextTick(emitReadable_, stream);
    }
  }
  function emitReadable_(stream) {
    const state = stream._readableState;
    if (!state.destroyed && !state.errored && (state.length || state.ended)) {
      stream.emit("readable");
      state.emittedReadable = false;
    }
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    flow(stream);
  }
  function maybeReadMore(stream, state) {
    if (!state.readingMore && state.constructed) {
      state.readingMore = true;
      process_default.nextTick(maybeReadMore_, stream, state);
    }
  }
  function maybeReadMore_(stream, state) {
    while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
      const len = state.length;
      stream.read(0);
      if (len === state.length)
        break;
    }
    state.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    const src = this;
    const state = this._readableState;
    if (state.pipes.length === 1) {
      if (!state.multiAwaitDrain) {
        state.multiAwaitDrain = true;
        state.awaitDrainWriters = new Set(
          state.awaitDrainWriters ? [state.awaitDrainWriters] : []
        );
      }
    }
    state.pipes.push(dest);
    const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process_default.stdout && dest !== process_default.stderr;
    const endFn = doEnd ? onend : unpipe;
    if (state.endEmitted)
      process_default.nextTick(endFn);
    else
      src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
      if (readable === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      dest.end();
    }
    let ondrain2;
    let cleanedUp = false;
    function cleanup() {
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      if (ondrain2) {
        dest.removeListener("drain", ondrain2);
      }
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (ondrain2 && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain))
        ondrain2();
    }
    function pause() {
      if (!cleanedUp) {
        if (state.pipes.length === 1 && state.pipes[0] === dest) {
          state.awaitDrainWriters = dest;
          state.multiAwaitDrain = false;
        } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
          state.awaitDrainWriters.add(dest);
        }
        src.pause();
      }
      if (!ondrain2) {
        ondrain2 = pipeOnDrain(src, dest);
        dest.on("drain", ondrain2);
      }
    }
    src.on("data", ondata);
    function ondata(chunk) {
      const ret = dest.write(chunk);
      if (ret === false) {
        pause();
      }
    }
    function onerror(er) {
      unpipe();
      dest.removeListener("error", onerror);
      if (events_default.listenerCount(dest, "error") === 0) {
        const s = dest._writableState || dest._readableState;
        if (s && !s.errorEmitted) {
          errorOrDestroy2(dest, er);
        } else {
          dest.emit("error", er);
        }
      }
    }
    prependListener3(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (dest.writableNeedDrain === true) {
      if (state.flowing) {
        pause();
      }
    } else if (!state.flowing) {
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src, dest) {
    return function pipeOnDrainFunctionResult() {
      const state = src._readableState;
      if (state.awaitDrainWriters === dest) {
        state.awaitDrainWriters = null;
      } else if (state.multiAwaitDrain) {
        state.awaitDrainWriters.delete(dest);
      }
      if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && events_default.listenerCount(src, "data")) {
        state.flowing = true;
        flow(src);
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    const state = this._readableState;
    const unpipeInfo = { hasUnpiped: false };
    if (state.pipes.length === 0)
      return this;
    if (!dest) {
      const dests = state.pipes;
      state.pipes = [];
      this.pause();
      for (let i = 0; i < dests.length; i++)
        dests[i].emit("unpipe", this, { hasUnpiped: false });
      return this;
    }
    const index = state.pipes.indexOf(dest);
    if (index === -1)
      return this;
    state.pipes.splice(index, 1);
    if (state.pipes.length === 0)
      this.pause();
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    const res = Stream.prototype.on.call(this, ev, fn);
    const state = this._readableState;
    if (ev === "data") {
      state.readableListening = this.listenerCount("readable") > 0;
      if (state.flowing !== false)
        this.resume();
    } else if (ev === "readable") {
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.flowing = false;
        state.emittedReadable = false;
        if (state.length) {
          emitReadable(this);
        } else if (!state.reading) {
          process_default.nextTick(nReadingNextTick, this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.removeListener = function(ev, fn) {
    const res = Stream.prototype.removeListener.call(
      this,
      ev,
      fn
    );
    if (ev === "readable") {
      process_default.nextTick(updateReadableListening, this);
    }
    return res;
  };
  Readable.prototype.off = Readable.prototype.removeListener;
  Readable.prototype.removeAllListeners = function(ev) {
    const res = Stream.prototype.removeAllListeners.apply(
      this,
      arguments
    );
    if (ev === "readable" || ev === void 0) {
      process_default.nextTick(updateReadableListening, this);
    }
    return res;
  };
  function updateReadableListening(self) {
    const state = self._readableState;
    state.readableListening = self.listenerCount("readable") > 0;
    if (state.resumeScheduled && state[kPaused] === false) {
      state.flowing = true;
    } else if (self.listenerCount("data") > 0) {
      self.resume();
    } else if (!state.readableListening) {
      state.flowing = null;
    }
  }
  function nReadingNextTick(self) {
    self.read(0);
  }
  Readable.prototype.resume = function() {
    const state = this._readableState;
    if (!state.flowing) {
      state.flowing = !state.readableListening;
      resume(this, state);
    }
    state[kPaused] = false;
    return this;
  };
  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      process_default.nextTick(resume_, stream, state);
    }
  }
  function resume_(stream, state) {
    if (!state.reading) {
      stream.read(0);
    }
    state.resumeScheduled = false;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading)
      stream.read(0);
  }
  Readable.prototype.pause = function() {
    if (this._readableState.flowing !== false) {
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState[kPaused] = true;
    return this;
  };
  function flow(stream) {
    const state = stream._readableState;
    while (state.flowing && stream.read() !== null)
      ;
  }
  Readable.prototype.wrap = function(stream) {
    let paused = false;
    stream.on("data", (chunk) => {
      if (!this.push(chunk) && stream.pause) {
        paused = true;
        stream.pause();
      }
    });
    stream.on("end", () => {
      this.push(null);
    });
    stream.on("error", (err) => {
      errorOrDestroy2(this, err);
    });
    stream.on("close", () => {
      this.destroy();
    });
    stream.on("destroy", () => {
      this.destroy();
    });
    this._read = () => {
      if (paused && stream.resume) {
        paused = false;
        stream.resume();
      }
    };
    const streamKeys = Object.keys(stream);
    for (let j = 1; j < streamKeys.length; j++) {
      const i = streamKeys[j];
      if (this[i] === void 0 && typeof stream[i] === "function") {
        this[i] = stream[i].bind(stream);
      }
    }
    return this;
  };
  Readable.prototype[Symbol.asyncIterator] = function() {
    return streamToAsyncIterator(this);
  };
  Readable.prototype.iterator = function(options) {
    return streamToAsyncIterator(this, options);
  };
  function streamToAsyncIterator(stream, options) {
    if (typeof stream.read !== "function") {
      stream = Readable.wrap(stream, { objectMode: true });
    }
    const iter = createAsyncIterator(stream, options);
    iter.stream = stream;
    return iter;
  }
  async function* createAsyncIterator(stream, options) {
    let callback = nop2;
    function next(resolve3) {
      if (this === stream) {
        callback();
        callback = nop2;
      } else {
        callback = resolve3;
      }
    }
    stream.on("readable", next);
    let error2;
    eos(stream, { writable: false }, (err) => {
      error2 = err ? aggregateTwoErrors(error2, err) : null;
      callback();
      callback = nop2;
    });
    try {
      while (true) {
        const chunk = stream.destroyed ? null : stream.read();
        if (chunk !== null) {
          yield chunk;
        } else if (error2) {
          throw error2;
        } else if (error2 === null) {
          return;
        } else {
          await new Promise(next);
        }
      }
    } catch (err) {
      error2 = aggregateTwoErrors(error2, err);
      throw error2;
    } finally {
      if ((error2 || options?.destroyOnReturn !== false) && (error2 === void 0 || stream._readableState.autoDestroy)) {
        destroyer(stream, null);
      }
    }
  }
  Object.defineProperties(Readable.prototype, {
    readable: {
      get() {
        const r = this._readableState;
        return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
      },
      set(val) {
        if (this._readableState) {
          this._readableState.readable = !!val;
        }
      }
    },
    readableDidRead: {
      enumerable: false,
      get: function() {
        return this._readableState.dataEmitted;
      }
    },
    readableAborted: {
      enumerable: false,
      get: function() {
        return !!(this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted;
      }
    },
    readableHighWaterMark: {
      enumerable: false,
      get: function() {
        return this._readableState.highWaterMark;
      }
    },
    readableBuffer: {
      enumerable: false,
      get: function() {
        return this._readableState && this._readableState.buffer;
      }
    },
    readableFlowing: {
      enumerable: false,
      get: function() {
        return this._readableState.flowing;
      },
      set: function(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    },
    readableLength: {
      enumerable: false,
      get() {
        return this._readableState.length;
      }
    },
    readableObjectMode: {
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.objectMode : false;
      }
    },
    readableEncoding: {
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.encoding : null;
      }
    },
    destroyed: {
      enumerable: false,
      get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    },
    readableEnded: {
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.endEmitted : false;
      }
    }
  });
  Object.defineProperties(ReadableState.prototype, {
    // Legacy getter for `pipesCount`.
    pipesCount: {
      get() {
        return this.pipes.length;
      }
    },
    // Legacy property for `paused`.
    paused: {
      get() {
        return this[kPaused] !== false;
      },
      set(value) {
        this[kPaused] = !!value;
      }
    }
  });
  Readable._fromList = fromList;
  function fromList(n, state) {
    if (state.length === 0)
      return null;
    let ret;
    if (state.objectMode)
      ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      if (state.decoder)
        ret = state.buffer.join("");
      else if (state.buffer.length === 1)
        ret = state.buffer.first();
      else
        ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      ret = state.buffer.consume(n, state.decoder);
    }
    return ret;
  }
  function endReadable(stream) {
    const state = stream._readableState;
    if (!state.endEmitted) {
      state.ended = true;
      process_default.nextTick(endReadableNT, state, stream);
    }
  }
  function endReadableNT(state, stream) {
    if (!state.errored && !state.closeEmitted && !state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.emit("end");
      if (stream.writable && stream.allowHalfOpen === false) {
        process_default.nextTick(endWritableNT, stream);
      } else if (state.autoDestroy) {
        const wState = stream._writableState;
        const autoDestroy = !wState || wState.autoDestroy && // We don't expect the writable to ever 'finish'
        // if writable is explicitly set to false.
        (wState.finished || wState.writable === false);
        if (autoDestroy) {
          stream.destroy();
        }
      }
    }
  }
  function endWritableNT(stream) {
    const writable = stream.writable && !stream.writableEnded && !stream.destroyed;
    if (writable) {
      stream.end();
    }
  }
  Readable.from = function(iterable, opts) {
    return from2(Readable, iterable, opts);
  };
  Readable.wrap = function(src, options) {
    return new Readable({
      objectMode: src.readableObjectMode ?? src.objectMode ?? true,
      ...options,
      destroy(err, callback) {
        destroyer(src, err);
        callback(err);
      }
    }).wrap(src);
  };

  // script/node_modules/@frida/readable-stream/lib/writable.js
  init_process();
  var writable_default = Writable;
  var {
    ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE7,
    ERR_METHOD_NOT_IMPLEMENTED: ERR_METHOD_NOT_IMPLEMENTED2,
    ERR_MULTIPLE_CALLBACK: ERR_MULTIPLE_CALLBACK2,
    ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED,
    ERR_STREAM_ALREADY_FINISHED,
    ERR_STREAM_NULL_VALUES: ERR_STREAM_NULL_VALUES2,
    ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING
  } = codes2;
  var { errorOrDestroy: errorOrDestroy3 } = destroy_exports;
  Object.setPrototypeOf(Writable.prototype, Stream.prototype);
  Object.setPrototypeOf(Writable, Stream);
  function nop3() {
  }
  var kOnFinished = Symbol("kOnFinished");
  function WritableState(options, stream, isDuplex) {
    if (typeof isDuplex !== "boolean")
      isDuplex = stream instanceof Stream.Duplex;
    this.objectMode = !!(options && options.objectMode);
    if (isDuplex)
      this.objectMode = this.objectMode || !!(options && options.writableObjectMode);
    this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    const noDecode = !!(options && options.decodeStrings === false);
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options && options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = onwrite.bind(void 0, stream);
    this.writecb = null;
    this.writelen = 0;
    this.afterWriteTickInfo = null;
    resetBuffer(this);
    this.pendingcb = 0;
    this.constructed = true;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = !options || options.emitClose !== false;
    this.autoDestroy = !options || options.autoDestroy !== false;
    this.errored = null;
    this.closed = false;
    this.closeEmitted = false;
    this[kOnFinished] = [];
  }
  function resetBuffer(state) {
    state.buffered = [];
    state.bufferedIndex = 0;
    state.allBuffers = true;
    state.allNoop = true;
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    return this.buffered.slice(this.bufferedIndex);
  };
  Object.defineProperty(WritableState.prototype, "bufferedRequestCount", {
    get() {
      return this.buffered.length - this.bufferedIndex;
    }
  });
  var realHasInstance = Function.prototype[Symbol.hasInstance];
  function Writable(options) {
    const isDuplex = this instanceof Stream.Duplex;
    if (!isDuplex && !realHasInstance.call(Writable, this))
      return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex);
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.final === "function")
        this._final = options.final;
      if (typeof options.construct === "function")
        this._construct = options.construct;
      if (options.signal)
        addAbortSignal(options.signal, this);
    }
    Stream.call(this, options);
    construct(this, () => {
      const state = this._writableState;
      if (!state.writing) {
        clearBuffer(this, state);
      }
      finishMaybe(this, state);
    });
  }
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function(object) {
      if (realHasInstance.call(this, object))
        return true;
      if (this !== Writable)
        return false;
      return object && object._writableState instanceof WritableState;
    }
  });
  Writable.prototype.pipe = function() {
    errorOrDestroy3(this, new ERR_STREAM_CANNOT_PIPE());
  };
  function _write(stream, chunk, encoding, cb) {
    const state = stream._writableState;
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = state.defaultEncoding;
    } else {
      if (!encoding)
        encoding = state.defaultEncoding;
      else if (encoding !== "buffer" && !Buffer2.isEncoding(encoding))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      if (typeof cb !== "function")
        cb = nop3;
    }
    if (chunk === null) {
      throw new ERR_STREAM_NULL_VALUES2();
    } else if (!state.objectMode) {
      if (typeof chunk === "string") {
        if (state.decodeStrings !== false) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "buffer";
        }
      } else if (chunk instanceof Buffer2) {
        encoding = "buffer";
      } else if (Stream._isUint8Array(chunk)) {
        chunk = Stream._uint8ArrayToBuffer(chunk);
        encoding = "buffer";
      } else {
        throw new ERR_INVALID_ARG_TYPE7(
          "chunk",
          ["string", "Buffer", "Uint8Array"],
          chunk
        );
      }
    }
    let err;
    if (state.ending) {
      err = new ERR_STREAM_WRITE_AFTER_END();
    } else if (state.destroyed) {
      err = new ERR_STREAM_DESTROYED("write");
    }
    if (err) {
      process_default.nextTick(cb, err);
      errorOrDestroy3(stream, err, true);
      return err;
    }
    state.pendingcb++;
    return writeOrBuffer(stream, state, chunk, encoding, cb);
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    return _write(this, chunk, encoding, cb) === true;
  };
  Writable.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable.prototype.uncork = function() {
    const state = this._writableState;
    if (state.corked) {
      state.corked--;
      if (!state.writing)
        clearBuffer(this, state);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string")
      encoding = encoding.toLowerCase();
    if (!Buffer2.isEncoding(encoding))
      throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  function writeOrBuffer(stream, state, chunk, encoding, callback) {
    const len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    const ret = state.length < state.highWaterMark;
    if (!ret)
      state.needDrain = true;
    if (state.writing || state.corked || state.errored || !state.constructed) {
      state.buffered.push({ chunk, encoding, callback });
      if (state.allBuffers && encoding !== "buffer") {
        state.allBuffers = false;
      }
      if (state.allNoop && callback !== nop3) {
        state.allNoop = false;
      }
    } else {
      state.writelen = len;
      state.writecb = callback;
      state.writing = true;
      state.sync = true;
      stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    return ret && !state.errored && !state.destroyed;
  }
  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed)
      state.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev)
      stream._writev(chunk, state.onwrite);
    else
      stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream, state, er, cb) {
    --state.pendingcb;
    cb(er);
    errorBuffer(state);
    errorOrDestroy3(stream, er);
  }
  function onwrite(stream, er) {
    const state = stream._writableState;
    const sync = state.sync;
    const cb = state.writecb;
    if (typeof cb !== "function") {
      errorOrDestroy3(stream, new ERR_MULTIPLE_CALLBACK2());
      return;
    }
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
    if (er) {
      er.stack;
      if (!state.errored) {
        state.errored = er;
      }
      if (stream._readableState && !stream._readableState.errored) {
        stream._readableState.errored = er;
      }
      if (sync) {
        process_default.nextTick(onwriteError, stream, state, er, cb);
      } else {
        onwriteError(stream, state, er, cb);
      }
    } else {
      if (state.buffered.length > state.bufferedIndex) {
        clearBuffer(stream, state);
      }
      if (sync) {
        if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
          state.afterWriteTickInfo.count++;
        } else {
          state.afterWriteTickInfo = { count: 1, cb, stream, state };
          process_default.nextTick(afterWriteTick, state.afterWriteTickInfo);
        }
      } else {
        afterWrite(stream, state, 1, cb);
      }
    }
  }
  function afterWriteTick({ stream, state, count, cb }) {
    state.afterWriteTickInfo = null;
    return afterWrite(stream, state, count, cb);
  }
  function afterWrite(stream, state, count, cb) {
    const needDrain = !state.ending && !stream.destroyed && state.length === 0 && state.needDrain;
    if (needDrain) {
      state.needDrain = false;
      stream.emit("drain");
    }
    while (count-- > 0) {
      state.pendingcb--;
      cb();
    }
    if (state.destroyed) {
      errorBuffer(state);
    }
    finishMaybe(stream, state);
  }
  function errorBuffer(state) {
    if (state.writing) {
      return;
    }
    for (let n = state.bufferedIndex; n < state.buffered.length; ++n) {
      const { chunk, callback } = state.buffered[n];
      const len = state.objectMode ? 1 : chunk.length;
      state.length -= len;
      callback(state.errored ?? new ERR_STREAM_DESTROYED("write"));
    }
    const onfinishCallbacks = state[kOnFinished].splice(0);
    for (let i = 0; i < onfinishCallbacks.length; i++) {
      onfinishCallbacks[i](state.errored ?? new ERR_STREAM_DESTROYED("end"));
    }
    resetBuffer(state);
  }
  function clearBuffer(stream, state) {
    if (state.corked || state.bufferProcessing || state.destroyed || !state.constructed) {
      return;
    }
    const { buffered, bufferedIndex, objectMode } = state;
    const bufferedLength = buffered.length - bufferedIndex;
    if (!bufferedLength) {
      return;
    }
    let i = bufferedIndex;
    state.bufferProcessing = true;
    if (bufferedLength > 1 && stream._writev) {
      state.pendingcb -= bufferedLength - 1;
      const callback = state.allNoop ? nop3 : (err) => {
        for (let n = i; n < buffered.length; ++n) {
          buffered[n].callback(err);
        }
      };
      const chunks = state.allNoop && i === 0 ? buffered : buffered.slice(i);
      chunks.allBuffers = state.allBuffers;
      doWrite(stream, state, true, state.length, chunks, "", callback);
      resetBuffer(state);
    } else {
      do {
        const { chunk, encoding, callback } = buffered[i];
        buffered[i++] = null;
        const len = objectMode ? 1 : chunk.length;
        doWrite(stream, state, false, len, chunk, encoding, callback);
      } while (i < buffered.length && !state.writing);
      if (i === buffered.length) {
        resetBuffer(state);
      } else if (i > 256) {
        buffered.splice(0, i);
        state.bufferedIndex = 0;
      } else {
        state.bufferedIndex = i;
      }
    }
    state.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    if (this._writev) {
      this._writev([{ chunk, encoding }], cb);
    } else {
      throw new ERR_METHOD_NOT_IMPLEMENTED2("_write()");
    }
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    const state = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    let err;
    if (chunk !== null && chunk !== void 0) {
      const ret = _write(this, chunk, encoding);
      if (ret instanceof Error) {
        err = ret;
      }
    }
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }
    if (err) {
    } else if (!state.errored && !state.ending) {
      state.ending = true;
      finishMaybe(this, state, true);
      state.ended = true;
    } else if (state.finished) {
      err = new ERR_STREAM_ALREADY_FINISHED("end");
    } else if (state.destroyed) {
      err = new ERR_STREAM_DESTROYED("end");
    }
    if (typeof cb === "function") {
      if (err || state.finished) {
        process_default.nextTick(cb, err);
      } else {
        state[kOnFinished].push(cb);
      }
    }
    return this;
  };
  function needFinish(state) {
    return state.ending && state.constructed && state.length === 0 && !state.errored && state.buffered.length === 0 && !state.finished && !state.writing && !state.errorEmitted && !state.closeEmitted;
  }
  function callFinal(stream, state) {
    let called = false;
    function onFinish(err) {
      if (called) {
        errorOrDestroy3(stream, err ?? ERR_MULTIPLE_CALLBACK2());
        return;
      }
      called = true;
      state.pendingcb--;
      if (err) {
        const onfinishCallbacks = state[kOnFinished].splice(0);
        for (let i = 0; i < onfinishCallbacks.length; i++) {
          onfinishCallbacks[i](err);
        }
        errorOrDestroy3(stream, err, state.sync);
      } else if (needFinish(state)) {
        state.prefinished = true;
        stream.emit("prefinish");
        state.pendingcb++;
        process_default.nextTick(finish, stream, state);
      }
    }
    state.sync = true;
    state.pendingcb++;
    try {
      const result = stream._final(onFinish);
      if (result != null) {
        const then = result.then;
        if (typeof then === "function") {
          then.call(
            result,
            function() {
              process_default.nextTick(onFinish, null);
            },
            function(err) {
              process_default.nextTick(onFinish, err);
            }
          );
        }
      }
    } catch (err) {
      onFinish(stream, state, err);
    }
    state.sync = false;
  }
  function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
      if (typeof stream._final === "function" && !state.destroyed) {
        state.finalCalled = true;
        callFinal(stream, state);
      } else {
        state.prefinished = true;
        stream.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream, state, sync) {
    if (needFinish(state)) {
      prefinish(stream, state);
      if (state.pendingcb === 0 && needFinish(state)) {
        state.pendingcb++;
        if (sync) {
          process_default.nextTick(finish, stream, state);
        } else {
          finish(stream, state);
        }
      }
    }
  }
  function finish(stream, state) {
    state.pendingcb--;
    state.finished = true;
    const onfinishCallbacks = state[kOnFinished].splice(0);
    for (let i = 0; i < onfinishCallbacks.length; i++) {
      onfinishCallbacks[i]();
    }
    stream.emit("finish");
    if (state.autoDestroy) {
      const rState = stream._readableState;
      const autoDestroy = !rState || rState.autoDestroy && // We don't expect the readable to ever 'end'
      // if readable is explicitly set to false.
      (rState.endEmitted || rState.readable === false);
      if (autoDestroy) {
        stream.destroy();
      }
    }
  }
  Object.defineProperties(Writable.prototype, {
    destroyed: {
      get() {
        return this._writableState ? this._writableState.destroyed : false;
      },
      set(value) {
        if (this._writableState) {
          this._writableState.destroyed = value;
        }
      }
    },
    writable: {
      get() {
        const w = this._writableState;
        return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended;
      },
      set(val) {
        if (this._writableState) {
          this._writableState.writable = !!val;
        }
      }
    },
    writableFinished: {
      get() {
        return this._writableState ? this._writableState.finished : false;
      }
    },
    writableObjectMode: {
      get() {
        return this._writableState ? this._writableState.objectMode : false;
      }
    },
    writableBuffer: {
      get() {
        return this._writableState && this._writableState.getBuffer();
      }
    },
    writableEnded: {
      get() {
        return this._writableState ? this._writableState.ending : false;
      }
    },
    writableNeedDrain: {
      get() {
        const wState = this._writableState;
        if (!wState)
          return false;
        return !wState.destroyed && !wState.ending && wState.needDrain;
      }
    },
    writableHighWaterMark: {
      get() {
        return this._writableState && this._writableState.highWaterMark;
      }
    },
    writableCorked: {
      get() {
        return this._writableState ? this._writableState.corked : 0;
      }
    },
    writableLength: {
      get() {
        return this._writableState && this._writableState.length;
      }
    }
  });
  var destroy2 = destroy;
  Writable.prototype.destroy = function(err, cb) {
    const state = this._writableState;
    if (!state.destroyed && (state.bufferedIndex < state.buffered.length || state[kOnFinished].length)) {
      process_default.nextTick(errorBuffer, state);
    }
    destroy2.call(this, err, cb);
    return this;
  };
  Writable.prototype._undestroy = undestroy;
  Writable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Writable.prototype[events_default.captureRejectionSymbol] = function(err) {
    this.destroy(err);
  };

  // script/node_modules/@frida/readable-stream/lib/duplex.js
  init_process();
  var {
    ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE8,
    ERR_INVALID_RETURN_VALUE: ERR_INVALID_RETURN_VALUE2
  } = codes2;
  Object.setPrototypeOf(Duplex.prototype, readable_default.prototype);
  Object.setPrototypeOf(Duplex, readable_default);
  {
    for (const method of Object.keys(writable_default.prototype)) {
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = writable_default.prototype[method];
    }
  }
  function Duplex(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    readable_default.call(this, options);
    writable_default.call(this, options);
    if (options) {
      this.allowHalfOpen = options.allowHalfOpen !== false;
      if (options.readable === false) {
        this._readableState.readable = false;
        this._readableState.ended = true;
        this._readableState.endEmitted = true;
      }
      if (options.writable === false) {
        this._writableState.writable = false;
        this._writableState.ending = true;
        this._writableState.ended = true;
        this._writableState.finished = true;
      }
    } else {
      this.allowHalfOpen = true;
    }
  }
  Object.defineProperties(Duplex.prototype, {
    writable: Object.getOwnPropertyDescriptor(writable_default.prototype, "writable"),
    writableHighWaterMark: Object.getOwnPropertyDescriptor(writable_default.prototype, "writableHighWaterMark"),
    writableObjectMode: Object.getOwnPropertyDescriptor(writable_default.prototype, "writableObjectMode"),
    writableBuffer: Object.getOwnPropertyDescriptor(writable_default.prototype, "writableBuffer"),
    writableLength: Object.getOwnPropertyDescriptor(writable_default.prototype, "writableLength"),
    writableFinished: Object.getOwnPropertyDescriptor(writable_default.prototype, "writableFinished"),
    writableCorked: Object.getOwnPropertyDescriptor(writable_default.prototype, "writableCorked"),
    writableEnded: Object.getOwnPropertyDescriptor(writable_default.prototype, "writableEnded"),
    writableNeedDrain: Object.getOwnPropertyDescriptor(writable_default.prototype, "writableNeedDrain"),
    destroyed: {
      get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set(value) {
        if (this._readableState && this._writableState) {
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      }
    }
  });
  Duplex.from = function(body) {
    return duplexify(body, "body");
  };
  var Duplexify = class extends Duplex {
    constructor(options) {
      super(options);
      if (options?.readable === false) {
        this._readableState.readable = false;
        this._readableState.ended = true;
        this._readableState.endEmitted = true;
      }
      if (options?.writable === false) {
        this._writableState.writable = false;
        this._writableState.ending = true;
        this._writableState.ended = true;
        this._writableState.finished = true;
      }
    }
  };
  function duplexify(body, name) {
    if (isDuplexNodeStream(body)) {
      return body;
    }
    if (isReadableNodeStream(body)) {
      return _duplexify({ readable: body });
    }
    if (isWritableNodeStream(body)) {
      return _duplexify({ writable: body });
    }
    if (isNodeStream(body)) {
      return _duplexify({ writable: false, readable: false });
    }
    if (typeof body === "function") {
      const { value, write: write3, final: final2, destroy: destroy3 } = fromAsyncGen(body);
      if (isIterable(value)) {
        return from2(Duplexify, value, {
          // TODO (ronag): highWaterMark?
          objectMode: true,
          write: write3,
          final: final2,
          destroy: destroy3
        });
      }
      const then2 = value?.then;
      if (typeof then2 === "function") {
        let d;
        const promise = then2.call(
          value,
          (val) => {
            if (val != null) {
              throw new ERR_INVALID_RETURN_VALUE2("nully", "body", val);
            }
          },
          (err) => {
            destroyer(d, err);
          }
        );
        return d = new Duplexify({
          // TODO (ronag): highWaterMark?
          objectMode: true,
          readable: false,
          write: write3,
          final(cb) {
            final2(async () => {
              try {
                await promise;
                process_default.nextTick(cb, null);
              } catch (err) {
                process_default.nextTick(cb, err);
              }
            });
          },
          destroy: destroy3
        });
      }
      throw new ERR_INVALID_RETURN_VALUE2(
        "Iterable, AsyncIterable or AsyncFunction",
        name,
        value
      );
    }
    if (isIterable(body)) {
      return from2(Duplexify, body, {
        // TODO (ronag): highWaterMark?
        objectMode: true,
        writable: false
      });
    }
    if (typeof body?.writable === "object" || typeof body?.readable === "object") {
      const readable = body?.readable ? isReadableNodeStream(body?.readable) ? body?.readable : duplexify(body.readable) : void 0;
      const writable = body?.writable ? isWritableNodeStream(body?.writable) ? body?.writable : duplexify(body.writable) : void 0;
      return _duplexify({ readable, writable });
    }
    const then = body?.then;
    if (typeof then === "function") {
      let d;
      then.call(
        body,
        (val) => {
          if (val != null) {
            d.push(val);
          }
          d.push(null);
        },
        (err) => {
          destroyer(d, err);
        }
      );
      return d = new Duplexify({
        objectMode: true,
        writable: false,
        read() {
        }
      });
    }
    throw new ERR_INVALID_ARG_TYPE8(
      name,
      [
        "Blob",
        "ReadableStream",
        "WritableStream",
        "Stream",
        "Iterable",
        "AsyncIterable",
        "Function",
        "{ readable, writable } pair",
        "Promise"
      ],
      body
    );
  }
  function fromAsyncGen(fn) {
    let { promise, resolve: resolve3 } = createDeferredPromise();
    const ac = new AbortController();
    const signal = ac.signal;
    const value = fn(async function* () {
      while (true) {
        const { chunk, done, cb } = await promise;
        process_default.nextTick(cb);
        if (done)
          return;
        if (signal.aborted)
          throw new AbortError();
        yield chunk;
        ({ promise, resolve: resolve3 } = createDeferredPromise());
      }
    }(), { signal });
    return {
      value,
      write(chunk, encoding, cb) {
        resolve3({ chunk, done: false, cb });
      },
      final(cb) {
        resolve3({ done: true, cb });
      },
      destroy(err, cb) {
        ac.abort();
        cb(err);
      }
    };
  }
  function _duplexify(pair) {
    const r = pair.readable && typeof pair.readable.read !== "function" ? readable_default.wrap(pair.readable) : pair.readable;
    const w = pair.writable;
    let readable = !!isReadable(r);
    let writable = !!isWritable(w);
    let ondrain2;
    let onfinish;
    let onreadable;
    let onclose;
    let d;
    function onfinished(err) {
      const cb = onclose;
      onclose = null;
      if (cb) {
        cb(err);
      } else if (err) {
        d.destroy(err);
      } else if (!readable && !writable) {
        d.destroy();
      }
    }
    d = new Duplexify({
      // TODO (ronag): highWaterMark?
      readableObjectMode: !!r?.readableObjectMode,
      writableObjectMode: !!w?.writableObjectMode,
      readable,
      writable
    });
    if (writable) {
      eos(w, (err) => {
        writable = false;
        if (err) {
          destroyer(r, err);
        }
        onfinished(err);
      });
      d._write = function(chunk, encoding, callback) {
        if (w.write(chunk, encoding)) {
          callback();
        } else {
          ondrain2 = callback;
        }
      };
      d._final = function(callback) {
        w.end();
        onfinish = callback;
      };
      w.on("drain", function() {
        if (ondrain2) {
          const cb = ondrain2;
          ondrain2 = null;
          cb();
        }
      });
      w.on("finish", function() {
        if (onfinish) {
          const cb = onfinish;
          onfinish = null;
          cb();
        }
      });
    }
    if (readable) {
      eos(r, (err) => {
        readable = false;
        if (err) {
          destroyer(r, err);
        }
        onfinished(err);
      });
      r.on("readable", function() {
        if (onreadable) {
          const cb = onreadable;
          onreadable = null;
          cb();
        }
      });
      r.on("end", function() {
        d.push(null);
      });
      d._read = function() {
        while (true) {
          const buf = r.read();
          if (buf === null) {
            onreadable = d._read;
            return;
          }
          if (!d.push(buf)) {
            return;
          }
        }
      };
    }
    d._destroy = function(err, callback) {
      if (!err && onclose !== null) {
        err = new AbortError();
      }
      onreadable = null;
      ondrain2 = null;
      onfinish = null;
      if (onclose === null) {
        callback(err);
      } else {
        onclose = callback;
        destroyer(w, err);
        destroyer(r, err);
      }
    };
    return d;
  }
  function createDeferredPromise() {
    let resolve3;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve3 = res;
      reject = rej;
    });
    return { promise, resolve: resolve3, reject };
  }

  // script/node_modules/@frida/readable-stream/lib/transform.js
  init_process();
  var {
    ERR_METHOD_NOT_IMPLEMENTED: ERR_METHOD_NOT_IMPLEMENTED3
  } = codes2;
  Object.setPrototypeOf(Transform.prototype, Duplex.prototype);
  Object.setPrototypeOf(Transform, Duplex);
  var kCallback = Symbol("kCallback");
  function Transform(options) {
    if (!(this instanceof Transform))
      return new Transform(options);
    Duplex.call(this, options);
    this._readableState.sync = false;
    this[kCallback] = null;
    if (options) {
      if (typeof options.transform === "function")
        this._transform = options.transform;
      if (typeof options.flush === "function")
        this._flush = options.flush;
    }
    this.on("prefinish", prefinish2);
  }
  function final(cb) {
    let called = false;
    if (typeof this._flush === "function" && !this.destroyed) {
      const result = this._flush((er, data) => {
        called = true;
        if (er) {
          if (cb) {
            cb(er);
          } else {
            this.destroy(er);
          }
          return;
        }
        if (data != null) {
          this.push(data);
        }
        this.push(null);
        if (cb) {
          cb();
        }
      });
      if (result !== void 0 && result !== null) {
        try {
          const then = result.then;
          if (typeof then === "function") {
            then.call(
              result,
              (data) => {
                if (called)
                  return;
                if (data != null)
                  this.push(data);
                this.push(null);
                if (cb)
                  process_default.nextTick(cb);
              },
              (err) => {
                if (cb) {
                  process_default.nextTick(cb, err);
                } else {
                  process_default.nextTick(() => this.destroy(err));
                }
              }
            );
          }
        } catch (err) {
          process_default.nextTick(() => this.destroy(err));
        }
      }
    } else {
      this.push(null);
      if (cb) {
        cb();
      }
    }
  }
  function prefinish2() {
    if (this._final !== final) {
      final.call(this);
    }
  }
  Transform.prototype._final = final;
  Transform.prototype._transform = function(chunk, encoding, callback) {
    throw new ERR_METHOD_NOT_IMPLEMENTED3("_transform()");
  };
  Transform.prototype._write = function(chunk, encoding, callback) {
    const rState = this._readableState;
    const wState = this._writableState;
    const length = rState.length;
    let called = false;
    const result = this._transform(chunk, encoding, (err, val) => {
      called = true;
      if (err) {
        callback(err);
        return;
      }
      if (val != null) {
        this.push(val);
      }
      if (wState.ended || // Backwards compat.
      length === rState.length || // Backwards compat.
      rState.length < rState.highWaterMark || rState.length === 0) {
        callback();
      } else {
        this[kCallback] = callback;
      }
    });
    if (result !== void 0 && result != null) {
      try {
        const then = result.then;
        if (typeof then === "function") {
          then.call(
            result,
            (val) => {
              if (called)
                return;
              if (val != null) {
                this.push(val);
              }
              if (wState.ended || length === rState.length || rState.length < rState.highWaterMark || rState.length === 0) {
                process_default.nextTick(callback);
              } else {
                this[kCallback] = callback;
              }
            },
            (err) => {
              process_default.nextTick(callback, err);
            }
          );
        }
      } catch (err) {
        process_default.nextTick(callback, err);
      }
    }
  };
  Transform.prototype._read = function() {
    if (this[kCallback]) {
      const callback = this[kCallback];
      this[kCallback] = null;
      callback();
    }
  };

  // script/node_modules/@frida/readable-stream/lib/passthrough.js
  Object.setPrototypeOf(PassThrough.prototype, Transform.prototype);
  Object.setPrototypeOf(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };

  // script/node_modules/@frida/readable-stream/lib/pipeline.js
  init_process();
  var {
    ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE9,
    ERR_INVALID_RETURN_VALUE: ERR_INVALID_RETURN_VALUE3,
    ERR_MISSING_ARGS: ERR_MISSING_ARGS3,
    ERR_STREAM_DESTROYED: ERR_STREAM_DESTROYED2
  } = codes2;
  function destroyer2(stream, reading, writing, callback) {
    callback = once3(callback);
    let finished2 = false;
    stream.on("close", () => {
      finished2 = true;
    });
    eos(stream, { readable: reading, writable: writing }, (err) => {
      finished2 = !err;
      const rState = stream._readableState;
      if (err && err.code === "ERR_STREAM_PREMATURE_CLOSE" && reading && (rState && rState.ended && !rState.errored && !rState.errorEmitted)) {
        stream.once("end", callback).once("error", callback);
      } else {
        callback(err);
      }
    });
    return (err) => {
      if (finished2)
        return;
      finished2 = true;
      destroyer(stream, err);
      callback(err || new ERR_STREAM_DESTROYED2("pipe"));
    };
  }
  function popCallback(streams) {
    return streams.pop();
  }
  function makeAsyncIterable(val) {
    if (isIterable(val)) {
      return val;
    } else if (isReadableNodeStream(val)) {
      return fromReadable(val);
    }
    throw new ERR_INVALID_ARG_TYPE9(
      "val",
      ["Readable", "Iterable", "AsyncIterable"],
      val
    );
  }
  async function* fromReadable(val) {
    yield* readable_default.prototype[Symbol.asyncIterator].call(val);
  }
  async function pump(iterable, writable, finish2) {
    let error2;
    let onresolve = null;
    const resume2 = (err) => {
      if (err) {
        error2 = err;
      }
      if (onresolve) {
        const callback = onresolve;
        onresolve = null;
        callback();
      }
    };
    const wait = () => new Promise((resolve3, reject) => {
      if (error2) {
        reject(error2);
      } else {
        onresolve = () => {
          if (error2) {
            reject(error2);
          } else {
            resolve3();
          }
        };
      }
    });
    writable.on("drain", resume2);
    const cleanup = eos(writable, { readable: false }, resume2);
    try {
      if (writable.writableNeedDrain) {
        await wait();
      }
      for await (const chunk of iterable) {
        if (!writable.write(chunk)) {
          await wait();
        }
      }
      writable.end();
      await wait();
      finish2();
    } catch (err) {
      finish2(error2 !== err ? aggregateTwoErrors(error2, err) : err);
    } finally {
      cleanup();
      writable.off("drain", resume2);
    }
  }
  var pipeline_default = pipeline;
  function pipeline(...streams) {
    const callback = once3(popCallback(streams));
    if (Array.isArray(streams[0]) && streams.length === 1) {
      streams = streams[0];
    }
    return pipelineImpl(streams, callback);
  }
  function pipelineImpl(streams, callback, opts) {
    if (streams.length < 2) {
      throw new ERR_MISSING_ARGS3("streams");
    }
    const ac = new AbortController();
    const signal = ac.signal;
    const outerSignal = opts?.signal;
    function abort() {
      finishImpl(new AbortError());
    }
    outerSignal?.addEventListener("abort", abort);
    let error2;
    let value;
    const destroys = [];
    let finishCount = 0;
    function finish2(err) {
      finishImpl(err, --finishCount === 0);
    }
    function finishImpl(err, final2) {
      if (err && (!error2 || error2.code === "ERR_STREAM_PREMATURE_CLOSE")) {
        error2 = err;
      }
      if (!error2 && !final2) {
        return;
      }
      while (destroys.length) {
        destroys.shift()(error2);
      }
      outerSignal?.removeEventListener("abort", abort);
      ac.abort();
      if (final2) {
        callback(error2, value);
      }
    }
    let ret;
    for (let i = 0; i < streams.length; i++) {
      const stream = streams[i];
      const reading = i < streams.length - 1;
      const writing = i > 0;
      if (isNodeStream(stream)) {
        finishCount++;
        destroys.push(destroyer2(stream, reading, writing, finish2));
      }
      if (i === 0) {
        if (typeof stream === "function") {
          ret = stream({ signal });
          if (!isIterable(ret)) {
            throw new ERR_INVALID_RETURN_VALUE3(
              "Iterable, AsyncIterable or Stream",
              "source",
              ret
            );
          }
        } else if (isIterable(stream) || isReadableNodeStream(stream)) {
          ret = stream;
        } else {
          ret = Duplex.from(stream);
        }
      } else if (typeof stream === "function") {
        ret = makeAsyncIterable(ret);
        ret = stream(ret, { signal });
        if (reading) {
          if (!isIterable(ret, true)) {
            throw new ERR_INVALID_RETURN_VALUE3(
              "AsyncIterable",
              `transform[${i - 1}]`,
              ret
            );
          }
        } else {
          if (!PassThrough) {
          }
          const pt = new PassThrough({
            objectMode: true
          });
          const then = ret?.then;
          if (typeof then === "function") {
            then.call(
              ret,
              (val) => {
                value = val;
                pt.end(val);
              },
              (err) => {
                pt.destroy(err);
              }
            );
          } else if (isIterable(ret, true)) {
            finishCount++;
            pump(ret, pt, finish2);
          } else {
            throw new ERR_INVALID_RETURN_VALUE3(
              "AsyncIterable or Promise",
              "destination",
              ret
            );
          }
          ret = pt;
          finishCount++;
          destroys.push(destroyer2(ret, false, true, finish2));
        }
      } else if (isNodeStream(stream)) {
        if (isReadableNodeStream(ret)) {
          ret.pipe(stream);
          if (stream === process_default.stdout || stream === process_default.stderr) {
            ret.on("end", () => stream.end());
          }
        } else {
          ret = makeAsyncIterable(ret);
          finishCount++;
          pump(ret, stream, finish2);
        }
        ret = stream;
      } else {
        ret = Duplex.from(stream);
      }
    }
    if (signal?.aborted || outerSignal?.aborted) {
      process_default.nextTick(abort);
    }
    return ret;
  }

  // script/node_modules/@frida/readable-stream/lib/compose.js
  var {
    ERR_INVALID_ARG_VALUE: ERR_INVALID_ARG_VALUE3,
    ERR_MISSING_ARGS: ERR_MISSING_ARGS4
  } = codes2;
  var ComposeDuplex = class extends Duplex {
    constructor(options) {
      super(options);
      if (options?.readable === false) {
        this._readableState.readable = false;
        this._readableState.ended = true;
        this._readableState.endEmitted = true;
      }
      if (options?.writable === false) {
        this._writableState.writable = false;
        this._writableState.ending = true;
        this._writableState.ended = true;
        this._writableState.finished = true;
      }
    }
  };
  function compose(...streams) {
    if (streams.length === 0) {
      throw new ERR_MISSING_ARGS4("streams");
    }
    if (streams.length === 1) {
      return Duplex.from(streams[0]);
    }
    const orgStreams = [...streams];
    if (typeof streams[0] === "function") {
      streams[0] = Duplex.from(streams[0]);
    }
    if (typeof streams[streams.length - 1] === "function") {
      const idx = streams.length - 1;
      streams[idx] = Duplex.from(streams[idx]);
    }
    for (let n = 0; n < streams.length; ++n) {
      if (!isNodeStream(streams[n])) {
        continue;
      }
      if (n < streams.length - 1 && !isReadable(streams[n])) {
        throw new ERR_INVALID_ARG_VALUE3(
          `streams[${n}]`,
          orgStreams[n],
          "must be readable"
        );
      }
      if (n > 0 && !isWritable(streams[n])) {
        throw new ERR_INVALID_ARG_VALUE3(
          `streams[${n}]`,
          orgStreams[n],
          "must be writable"
        );
      }
    }
    let ondrain2;
    let onfinish;
    let onreadable;
    let onclose;
    let d;
    function onfinished(err) {
      const cb = onclose;
      onclose = null;
      if (cb) {
        cb(err);
      } else if (err) {
        d.destroy(err);
      } else if (!readable && !writable) {
        d.destroy();
      }
    }
    const head = streams[0];
    const tail = pipeline(streams, onfinished);
    const writable = !!isWritable(head);
    const readable = !!isReadable(tail);
    d = new ComposeDuplex({
      // TODO (ronag): highWaterMark?
      writableObjectMode: !!head?.writableObjectMode,
      readableObjectMode: !!tail?.writableObjectMode,
      writable,
      readable
    });
    if (writable) {
      d._write = function(chunk, encoding, callback) {
        if (head.write(chunk, encoding)) {
          callback();
        } else {
          ondrain2 = callback;
        }
      };
      d._final = function(callback) {
        head.end();
        onfinish = callback;
      };
      head.on("drain", function() {
        if (ondrain2) {
          const cb = ondrain2;
          ondrain2 = null;
          cb();
        }
      });
      tail.on("finish", function() {
        if (onfinish) {
          const cb = onfinish;
          onfinish = null;
          cb();
        }
      });
    }
    if (readable) {
      tail.on("readable", function() {
        if (onreadable) {
          const cb = onreadable;
          onreadable = null;
          cb();
        }
      });
      tail.on("end", function() {
        d.push(null);
      });
      d._read = function() {
        while (true) {
          const buf = tail.read();
          if (buf === null) {
            onreadable = d._read;
            return;
          }
          if (!d.push(buf)) {
            return;
          }
        }
      };
    }
    d._destroy = function(err, callback) {
      if (!err && onclose !== null) {
        err = new AbortError();
      }
      onreadable = null;
      ondrain2 = null;
      onfinish = null;
      if (onclose === null) {
        callback(err);
      } else {
        onclose = callback;
        destroyer(tail, err);
      }
    };
    return d;
  }

  // script/node_modules/@frida/readable-stream/lib/promises.js
  var promises_exports = {};
  __export(promises_exports, {
    finished: () => finished,
    pipeline: () => pipeline2
  });
  function pipeline2(...streams) {
    return new Promise((resolve3, reject) => {
      let signal;
      const lastArg = streams[streams.length - 1];
      if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg)) {
        const options = streams.pop();
        signal = options.signal;
      }
      pipelineImpl(streams, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve3(value);
        }
      }, { signal });
    });
  }
  function finished(stream, opts) {
    return new Promise((resolve3, reject) => {
      eos(stream, opts, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve3();
        }
      });
    });
  }

  // script/node_modules/@frida/readable-stream/readable.js
  init_util();
  Stream.isDisturbed = isDisturbed;
  Stream.Readable = readable_default;
  Stream.Writable = writable_default;
  Stream.Duplex = Duplex;
  Stream.Transform = Transform;
  Stream.PassThrough = PassThrough;
  Stream.pipeline = pipeline_default;
  Stream.addAbortSignal = addAbortSignal;
  Stream.finished = eos;
  Stream.destroy = destroyer;
  Stream.compose = compose;
  Object.defineProperty(Stream, "promises", {
    configurable: true,
    enumerable: true,
    get() {
      return promises_exports;
    }
  });
  Object.defineProperty(pipeline_default, promisify.custom, {
    enumerable: true,
    get() {
      return pipeline2;
    }
  });
  Object.defineProperty(eos, promisify.custom, {
    enumerable: true,
    get() {
      return finished;
    }
  });
  Stream.Stream = Stream;
  Stream._isUint8Array = types.isUint8Array;
  Stream._uint8ArrayToBuffer = Buffer2.from;

  // script/node_modules/@frida/stream/index.js
  var stream_default = Stream;

  // script/node_modules/@frida/timers/index.js
  var Timeout = class {
    constructor(id, clearFn) {
      this._id = id;
      this._clearFn = clearFn;
    }
    ref() {
    }
    unref() {
    }
    close() {
      this._clearFn(this._id);
      this._id = null;
    }
  };
  function setTimeout2(...args) {
    return new Timeout(globalThis.setTimeout(...args), globalThis.clearTimeout);
  }
  function setInterval(...args) {
    return new Timeout(globalThis.setInterval(...args), globalThis.clearInterval);
  }
  function clearTimeout2(timeout) {
    timeout?.close();
  }
  var clearInterval = clearTimeout2;
  function enroll(item, msecs) {
    globalThis.clearTimeout(item._idleTimeoutId);
    item._idleTimeoutId = null;
    item._idleTimeout = msecs;
  }
  function unenroll(item) {
    globalThis.clearTimeout(item._idleTimeoutId);
    item._idleTimeoutId = null;
    item._idleTimeout = -1;
  }
  function active(item) {
    globalThis.clearTimeout(item._idleTimeoutId);
    item._idleTimeoutId = null;
    const msecs = item._idleTimeout;
    if (msecs >= 0) {
      item._idleTimeoutId = globalThis.setTimeout(() => {
        item._onTimeout();
      }, msecs);
    }
  }
  var _unrefActive = active;
  var setImmediate2 = globalThis.setImmediate;
  var clearImmediate = globalThis.clearImmediate;
  var timers_default = {
    setTimeout: setTimeout2,
    setInterval,
    clearTimeout: clearTimeout2,
    clearInterval,
    enroll,
    unenroll,
    active,
    _unrefActive,
    setImmediate: setImmediate2,
    clearImmediate
  };

  // script/node_modules/@frida/net/index.js
  init_util();
  var FridaSocket = global.Socket;
  var net_default = {
    createServer,
    createConnection,
    connect: createConnection,
    _normalizeArgs: normalizeArgs,
    Socket: Socket2,
    Stream: Socket2,
    Server,
    isIP,
    isIPv4,
    isIPv6,
    _setSimultaneousAccepts
  };
  function noop3() {
  }
  function createHandle(fd) {
    var type = FridaSocket.type(fd);
    if (type === "unix:stream")
      return new Pipe();
    if (type === "tcp" || type === "tcp6")
      return new TCP();
    throw new TypeError("Unsupported fd type: " + type);
  }
  function isPipeName(s) {
    return typeof s === "string" && toNumber(s) === false;
  }
  function createServer(options, connectionListener) {
    return new Server(options, connectionListener);
  }
  function createConnection() {
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++)
      args[i] = arguments[i];
    args = normalizeArgs(args);
    var s = new Socket2(args[0]);
    if (args[0].timeout) {
      s.setTimeout(args[0].timeout);
    }
    return Socket2.prototype.connect.apply(s, args);
  }
  function normalizeArgs(args) {
    var options = {};
    if (args.length === 0) {
      return [options];
    } else if (args[0] !== null && typeof args[0] === "object") {
      options = args[0];
    } else if (isPipeName(args[0])) {
      options.path = args[0];
    } else {
      options.port = args[0];
      if (args.length > 1 && typeof args[1] === "string") {
        options.host = args[1];
      }
    }
    var cb = args[args.length - 1];
    if (typeof cb !== "function")
      cb = null;
    return [options, cb];
  }
  function initSocketHandle(self) {
    self.destroyed = false;
    self._bytesDispatched = 0;
    self._sockname = null;
    if (self._handle) {
      self._handle.owner = self;
      self._handle.onread = onread;
      if (!self._handle.writev)
        self._writev = null;
    }
  }
  var BYTES_READ = Symbol("bytesRead");
  function Socket2(options) {
    if (!(this instanceof Socket2))
      return new Socket2(options);
    this.connecting = false;
    this._hadError = false;
    this._handle = null;
    this._parent = null;
    this._host = null;
    if (typeof options === "number")
      options = { fd: options };
    else if (options === void 0)
      options = {};
    stream_default.Duplex.call(this, options);
    if (options.handle) {
      this._handle = options.handle;
    } else if (options.fd !== void 0) {
      this._handle = createHandle(options.fd);
      this._handle.open(options.fd);
      if ((options.fd == 1 || options.fd == 2) && this._handle instanceof Pipe && process_default.platform === "win32") {
        var err = this._handle.setBlocking(true);
        if (err)
          throw errnoException(err, "setBlocking");
      }
      this.readable = options.readable !== false;
      this.writable = options.writable !== false;
    } else {
      this.readable = this.writable = false;
    }
    this.on("finish", onSocketFinish);
    this.on("_socketEnd", onSocketEnd);
    initSocketHandle(this);
    this._pendingData = null;
    this._pendingEncoding = "";
    this.allowHalfOpen = options && options.allowHalfOpen || false;
    if (this._handle && options.readable !== false) {
      if (options.pauseOnCreate) {
        this._handle.reading = false;
        this._handle.readStop();
        this._readableState.flowing = false;
      } else {
        this.read(0);
      }
    }
    this.server = null;
    this._server = null;
    this[BYTES_READ] = 0;
  }
  util_default.inherits(Socket2, stream_default.Duplex);
  Socket2.prototype._unrefTimer = function unrefTimer() {
    for (var s = this; s !== null; s = s._parent)
      timers_default._unrefActive(s);
  };
  function onSocketFinish() {
    if (this.connecting) {
      return this.once("connect", onSocketFinish);
    }
    if (!this.readable || this._readableState.ended) {
      return this.destroy();
    }
    if (!this._handle || !this._handle.shutdown)
      return this.destroy();
    var req = new ShutdownWrap();
    req.oncomplete = afterShutdown;
    req.handle = this._handle;
    var err = this._handle.shutdown(req);
    if (err)
      return this._destroy(errnoException(err, "shutdown"));
  }
  function afterShutdown(error2, handle, req) {
    var self = handle.owner;
    if (self.destroyed)
      return;
    if (self._readableState.ended) {
      self.destroy();
    } else {
      self.once("_socketEnd", self.destroy);
    }
  }
  function onSocketEnd() {
    this._readableState.ended = true;
    if (this._readableState.endEmitted) {
      this.readable = false;
      maybeDestroy(this);
    } else {
      this.once("end", function() {
        this.readable = false;
        maybeDestroy(this);
      });
      this.read(0);
    }
    if (!this.allowHalfOpen) {
      this.write = writeAfterFIN;
      this.destroySoon();
    }
  }
  function writeAfterFIN(chunk, encoding, cb) {
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    var er = new Error("This socket has been ended by the other party");
    er.code = "EPIPE";
    this.emit("error", er);
    if (typeof cb === "function") {
      process_default.nextTick(cb, er);
    }
  }
  Socket2.prototype.read = function(n) {
    if (n === 0)
      return stream_default.Readable.prototype.read.call(this, n);
    this.read = stream_default.Readable.prototype.read;
    this._consuming = true;
    return this.read(n);
  };
  Socket2.prototype.listen = function() {
    this.on("connection", arguments[0]);
    listen(this, null, null, null);
  };
  Socket2.prototype.setTimeout = function(msecs, callback) {
    if (msecs === 0) {
      timers_default.unenroll(this);
      if (callback) {
        this.removeListener("timeout", callback);
      }
    } else {
      timers_default.enroll(this, msecs);
      timers_default._unrefActive(this);
      if (callback) {
        this.once("timeout", callback);
      }
    }
    return this;
  };
  Socket2.prototype._onTimeout = function() {
    this.emit("timeout");
  };
  Socket2.prototype.setNoDelay = function(enable) {
    if (!this._handle) {
      this.once(
        "connect",
        enable ? this.setNoDelay : () => this.setNoDelay(enable)
      );
      return this;
    }
    if (this._handle.setNoDelay)
      this._handle.setNoDelay(enable === void 0 ? true : !!enable);
    return this;
  };
  Socket2.prototype.setKeepAlive = function(setting, msecs) {
    if (!this._handle) {
      this.once("connect", () => this.setKeepAlive(setting, msecs));
      return this;
    }
    if (this._handle.setKeepAlive)
      this._handle.setKeepAlive(setting, ~~(msecs / 1e3));
    return this;
  };
  Socket2.prototype.address = function() {
    return this._getsockname();
  };
  Object.defineProperty(Socket2.prototype, "_connecting", {
    get: function() {
      return this.connecting;
    }
  });
  Object.defineProperty(Socket2.prototype, "readyState", {
    get: function() {
      if (this.connecting) {
        return "opening";
      } else if (this.readable && this.writable) {
        return "open";
      } else if (this.readable && !this.writable) {
        return "readOnly";
      } else if (!this.readable && this.writable) {
        return "writeOnly";
      } else {
        return "closed";
      }
    }
  });
  Object.defineProperty(Socket2.prototype, "bufferSize", {
    get: function() {
      if (this._handle) {
        return this._handle.writeQueueSize + this._writableState.length;
      }
    }
  });
  Socket2.prototype._read = function(n) {
    if (this.connecting || !this._handle) {
      this.once("connect", () => this._read(n));
    } else if (!this._handle.reading) {
      this._handle.reading = true;
      var err = this._handle.readStart();
      if (err)
        this._destroy(errnoException(err, "read"));
    }
  };
  Socket2.prototype.end = function(data, encoding) {
    stream_default.Duplex.prototype.end.call(this, data, encoding);
    this.writable = false;
    if (this.readable && !this._readableState.endEmitted)
      this.read(0);
    else
      maybeDestroy(this);
  };
  function maybeDestroy(socket) {
    if (!socket.readable && !socket.writable && !socket.destroyed && !socket.connecting && !socket._writableState.length) {
      socket.destroy();
    }
  }
  Socket2.prototype.destroySoon = function() {
    if (this.writable)
      this.end();
    if (this._writableState.finished)
      this.destroy();
    else
      this.once("finish", this.destroy);
  };
  Socket2.prototype._destroy = function(exception, cb) {
    function fireErrorCallbacks(self) {
      if (cb)
        cb(exception);
      if (exception && !self._writableState.errorEmitted) {
        process_default.nextTick(emitErrorNT2, self, exception);
        self._writableState.errorEmitted = true;
      }
    }
    if (this.destroyed) {
      fireErrorCallbacks(this);
      return;
    }
    this.connecting = false;
    this.readable = this.writable = false;
    for (var s = this; s !== null; s = s._parent)
      timers_default.unenroll(s);
    if (this._handle) {
      var isException = exception ? true : false;
      this[BYTES_READ] = this._handle.bytesRead;
      this._handle.close(() => {
        this.emit("close", isException);
      });
      this._handle.onread = noop3;
      this._handle = null;
      this._sockname = null;
    }
    this.destroyed = true;
    fireErrorCallbacks(this);
    if (this._server) {
      this._server._connections--;
      if (this._server._emitCloseIfDrained) {
        this._server._emitCloseIfDrained();
      }
    }
  };
  Socket2.prototype.destroy = function(exception) {
    this._destroy(exception);
  };
  function onread(error2, nread, buffer) {
    var handle = this;
    var self = handle.owner;
    assert_default(handle === self._handle, "handle != self._handle");
    self._unrefTimer();
    if (nread > 0) {
      var ret = self.push(buffer);
      if (handle.reading && !ret) {
        handle.reading = false;
        var err = handle.readStop();
        if (err)
          self._destroy(errnoException(err, "read"));
      }
      return;
    }
    if (error2 !== null) {
      return self._destroy(errnoException(error2, "read"));
    }
    if (self._readableState.length === 0) {
      self.readable = false;
      maybeDestroy(self);
    }
    self.push(null);
    self.emit("_socketEnd");
  }
  Socket2.prototype._getpeername = function() {
    if (!this._peername) {
      if (!this._handle || !this._handle.getpeername) {
        return {};
      }
      var out = {};
      var err = this._handle.getpeername(out);
      if (err)
        return {};
      this._peername = out;
    }
    return this._peername;
  };
  function protoGetter(name, callback) {
    Object.defineProperty(Socket2.prototype, name, {
      configurable: false,
      enumerable: true,
      get: callback
    });
  }
  protoGetter("bytesRead", function bytesRead() {
    return this._handle ? this._handle.bytesRead : this[BYTES_READ];
  });
  protoGetter("remoteAddress", function remoteAddress() {
    return this._getpeername().address;
  });
  protoGetter("remoteFamily", function remoteFamily() {
    return this._getpeername().family;
  });
  protoGetter("remotePort", function remotePort() {
    return this._getpeername().port;
  });
  Socket2.prototype._getsockname = function() {
    if (!this._handle || !this._handle.getsockname) {
      return {};
    }
    if (!this._sockname) {
      var out = {};
      var err = this._handle.getsockname(out);
      if (err)
        return {};
      this._sockname = out;
    }
    return this._sockname;
  };
  protoGetter("localAddress", function localAddress() {
    return this._getsockname().address;
  });
  protoGetter("localPort", function localPort() {
    return this._getsockname().port;
  });
  Socket2.prototype.write = function(chunk, encoding, cb) {
    if (typeof chunk !== "string" && !(chunk instanceof Buffer2)) {
      throw new TypeError(
        "Invalid data, chunk must be a string or buffer, not " + typeof chunk
      );
    }
    return stream_default.Duplex.prototype.write.apply(this, arguments);
  };
  Socket2.prototype._writeGeneric = function(writev, data, encoding, cb) {
    if (this.connecting) {
      this._pendingData = data;
      this._pendingEncoding = encoding;
      this.once("connect", function() {
        this._writeGeneric(writev, data, encoding, cb);
      });
      return;
    }
    this._pendingData = null;
    this._pendingEncoding = "";
    this._unrefTimer();
    if (!this._handle) {
      this._destroy(new Error("This socket is closed"), cb);
      return false;
    }
    var req = new WriteWrap();
    req.handle = this._handle;
    req.oncomplete = afterWrite2;
    req.cb = cb;
    var err;
    if (writev) {
      var chunks = new Array(data.length << 1);
      for (var i = 0; i < data.length; i++) {
        var entry = data[i];
        chunks[i * 2] = entry.chunk;
        chunks[i * 2 + 1] = entry.encoding;
      }
      err = this._handle.writev(req, chunks);
      if (!err)
        req._chunks = chunks;
    } else {
      var enc;
      if (data instanceof Buffer2) {
        enc = "buffer";
      } else {
        enc = encoding;
      }
      err = createWriteReq(req, this._handle, data, enc);
    }
    if (err)
      return this._destroy(errnoException(err, "write", req.error), cb);
    this._bytesDispatched += req.bytes;
  };
  Socket2.prototype._writev = function(chunks, cb) {
    this._writeGeneric(true, chunks, "", cb);
  };
  Socket2.prototype._write = function(data, encoding, cb) {
    this._writeGeneric(false, data, encoding, cb);
  };
  function createWriteReq(req, handle, data, encoding) {
    switch (encoding) {
      case "latin1":
      case "binary":
        return handle.writeLatin1String(req, data);
      case "buffer":
        return handle.writeBuffer(req, data);
      case "utf8":
      case "utf-8":
        return handle.writeUtf8String(req, data);
      case "ascii":
        return handle.writeAsciiString(req, data);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return handle.writeUcs2String(req, data);
      default:
        return handle.writeBuffer(req, Buffer2.from(data, encoding));
    }
  }
  protoGetter("bytesWritten", function bytesWritten() {
    var bytes = this._bytesDispatched;
    const state = this._writableState;
    const data = this._pendingData;
    const encoding = this._pendingEncoding;
    if (!state)
      return void 0;
    state.getBuffer().forEach(function(el) {
      if (el.chunk instanceof Buffer2)
        bytes += el.chunk.length;
      else
        bytes += Buffer2.byteLength(el.chunk, el.encoding);
    });
    if (data) {
      if (data instanceof Buffer2)
        bytes += data.length;
      else
        bytes += Buffer2.byteLength(data, encoding);
    }
    return bytes;
  });
  function afterWrite2(error2, handle, req) {
    var self = handle.owner;
    if (self.destroyed) {
      return;
    }
    if (error2 !== null) {
      var ex = errnoException(error2, "write", req.error);
      self._destroy(ex, req.cb);
      return;
    }
    self._unrefTimer();
    if (req.cb)
      req.cb.call(self);
  }
  function connect(self, address, port, addressType, localAddress2, localPort2) {
    assert_default.ok(self.connecting);
    var err;
    if (localAddress2 || localPort2) {
      throw new Error("Local address/port is not yet supported");
    }
    if (addressType === 6 || addressType === 4) {
      const req = new TCPConnectWrap();
      req.oncomplete = afterConnect;
      req.address = address;
      req.port = port;
      req.localAddress = localAddress2;
      req.localPort = localPort2;
      err = self._handle.connect(req, address, port);
    } else {
      const req = new PipeConnectWrap();
      req.address = address;
      req.oncomplete = afterConnect;
      err = self._handle.connect(req, address, afterConnect);
    }
    if (err) {
      var sockname = self._getsockname();
      var details;
      if (sockname) {
        details = sockname.address + ":" + sockname.port;
      }
      const ex = exceptionWithHostPort(err, "connect", address, port, details);
      self._destroy(ex);
    }
  }
  Socket2.prototype.connect = function(options, cb) {
    if (this.write !== Socket2.prototype.write)
      this.write = Socket2.prototype.write;
    if (options === null || typeof options !== "object") {
      var args = new Array(arguments.length);
      for (var i = 0; i < arguments.length; i++)
        args[i] = arguments[i];
      args = normalizeArgs(args);
      return Socket2.prototype.connect.apply(this, args);
    }
    if (this.destroyed) {
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
      this.destroyed = false;
      this._handle = null;
      this._peername = null;
      this._sockname = null;
    }
    var pipe = !!options.path;
    if (!this._handle) {
      this._handle = pipe ? new Pipe() : new TCP();
      initSocketHandle(this);
    }
    if (typeof cb === "function") {
      this.once("connect", cb);
    }
    this._unrefTimer();
    this.connecting = true;
    this.writable = true;
    if (pipe) {
      connect(this, options.path);
    } else {
      lookupAndConnect(this, options);
    }
    return this;
  };
  function lookupAndConnect(self, options) {
    var host = options.host || "localhost";
    var port = options.port;
    var localAddress2 = options.localAddress;
    var localPort2 = options.localPort;
    if (localAddress2 && !isIP(localAddress2))
      throw new TypeError('"localAddress" option must be a valid IP: ' + localAddress2);
    if (localPort2 && typeof localPort2 !== "number")
      throw new TypeError('"localPort" option should be a number: ' + localPort2);
    if (typeof port !== "undefined") {
      if (typeof port !== "number" && typeof port !== "string")
        throw new TypeError('"port" option should be a number or string: ' + port);
      if (!isLegalPort(port))
        throw new RangeError('"port" option should be >= 0 and < 65536: ' + port);
    }
    port |= 0;
    if (options.lookup)
      throw new TypeError('"lookup" option is not yet supported');
    var addressType = isIP(host);
    if (addressType === 0)
      addressType = 4;
    process_default.nextTick(function() {
      if (self.connecting)
        connect(self, host, port, addressType, localAddress2, localPort2);
    });
  }
  Socket2.prototype.ref = function() {
    if (!this._handle) {
      this.once("connect", this.ref);
      return this;
    }
    this._handle.ref();
    return this;
  };
  Socket2.prototype.unref = function() {
    if (!this._handle) {
      this.once("connect", this.unref);
      return this;
    }
    this._handle.unref();
    return this;
  };
  function afterConnect(error2, handle, req, readable, writable) {
    var self = handle.owner;
    if (self.destroyed) {
      return;
    }
    handle = self._handle;
    assert_default.ok(self.connecting);
    self.connecting = false;
    self._sockname = null;
    if (error2 === null) {
      self.readable = readable;
      self.writable = writable;
      self._unrefTimer();
      self.emit("connect");
      if (readable && !self.isPaused())
        self.read(0);
    } else {
      self.connecting = false;
      var details;
      if (req.localAddress && req.localPort) {
        details = req.localAddress + ":" + req.localPort;
      }
      var ex = exceptionWithHostPort(
        error2,
        "connect",
        req.address,
        req.port,
        details
      );
      if (details) {
        ex.localAddress = req.localAddress;
        ex.localPort = req.localPort;
      }
      self._destroy(ex);
    }
  }
  function Server(options, connectionListener) {
    if (!(this instanceof Server))
      return new Server(options, connectionListener);
    events_default.call(this);
    if (typeof options === "function") {
      connectionListener = options;
      options = {};
      this.on("connection", connectionListener);
    } else if (options == null || typeof options === "object") {
      options = options || {};
      if (typeof connectionListener === "function") {
        this.on("connection", connectionListener);
      }
    } else {
      throw new TypeError("options must be an object");
    }
    this._connections = 0;
    Object.defineProperty(this, "connections", {
      get: () => {
        if (this._usingSlaves) {
          return null;
        }
        return this._connections;
      },
      set: (val) => {
        return this._connections = val;
      },
      configurable: true,
      enumerable: false
    });
    this._handle = null;
    this._usingSlaves = false;
    this._slaves = [];
    this._unref = false;
    this.allowHalfOpen = options.allowHalfOpen || false;
    this.pauseOnConnect = !!options.pauseOnConnect;
  }
  util_default.inherits(Server, events_default);
  function toNumber(x) {
    return (x = Number(x)) >= 0 ? x : false;
  }
  Server.prototype._listen2 = function(address, port, addressType, backlog, fd) {
    if (!this._handle) {
      let handle;
      if (typeof fd === "number" && fd >= 0) {
        try {
          handle = createHandle(fd);
        } catch (e) {
          const error2 = exceptionWithHostPort(e, "listen", address, port);
          process_default.nextTick(emitErrorNT2, this, error2);
          return;
        }
        handle.open(fd);
        handle.readable = true;
        handle.writable = true;
        assert_default(!address && !port);
      } else if (port === -1 && addressType === -1) {
        handle = new Pipe();
      } else {
        handle = new TCP();
      }
      this._handle = handle;
    }
    this._handle.onconnection = onconnection;
    this._handle.owner = this;
    this._handle.listen(address, port, backlog || 511, (err) => {
      if (err) {
        var ex = exceptionWithHostPort(err, "listen", address, port);
        this._handle.close();
        this._handle = null;
        process_default.nextTick(emitErrorNT2, this, ex);
        return;
      }
      this._connectionKey = addressType + ":" + address + ":" + port;
      if (this._unref)
        this.unref();
      process_default.nextTick(emitListeningNT, this);
    });
  };
  function emitErrorNT2(self, err) {
    self.emit("error", err);
  }
  function emitListeningNT(self) {
    if (self._handle)
      self.emit("listening");
  }
  function listen(self, address, port, addressType, backlog, fd, exclusive) {
    self._listen2(address, port, addressType, backlog, fd);
  }
  Server.prototype.listen = function() {
    var args = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++)
      args[i] = arguments[i];
    var [options, cb] = normalizeArgs(args);
    if (typeof cb === "function") {
      this.once("listening", cb);
    }
    if (args.length === 0 || typeof args[0] === "function") {
      options.port = 0;
    }
    var backlog = toNumber(args.length > 1 && args[1]) || toNumber(args.length > 2 && args[2]);
    options = options._handle || options.handle || options;
    if (options instanceof TCP) {
      this._handle = options;
      listen(this, null, -1, -1, backlog);
    } else if (typeof options.fd === "number" && options.fd >= 0) {
      listen(this, null, null, null, backlog, options.fd);
    } else {
      backlog = options.backlog || backlog;
      if (typeof options.port === "number" || typeof options.port === "string" || typeof options.port === "undefined" && "port" in options) {
        assertPort(options.port);
        listen(
          this,
          options.host ?? null,
          options.port ?? 0,
          4,
          backlog,
          void 0,
          options.exclusive
        );
      } else if (options.path && isPipeName(options.path)) {
        const pipeName = this._pipeName = options.path;
        listen(this, pipeName, -1, -1, backlog, void 0, options.exclusive);
      } else {
        throw new Error("Invalid listen argument: " + options);
      }
    }
    return this;
  };
  Object.defineProperty(Server.prototype, "listening", {
    get: function() {
      return !!(this._handle && this._connectionKey);
    },
    configurable: true,
    enumerable: true
  });
  Server.prototype.address = function() {
    if (this._handle && this._handle.getsockname) {
      var out = {};
      this._handle.getsockname(out);
      return out;
    } else if (this._pipeName) {
      return this._pipeName;
    } else {
      return null;
    }
  };
  function onconnection(err, clientHandle) {
    var handle = this;
    var self = handle.owner;
    if (err) {
      self.emit("error", errnoException(err, "accept"));
      return;
    }
    if (self.maxConnections && self._connections >= self.maxConnections) {
      clientHandle.close();
      return;
    }
    var socket = new Socket2({
      handle: clientHandle,
      allowHalfOpen: self.allowHalfOpen,
      pauseOnCreate: self.pauseOnConnect
    });
    socket.readable = socket.writable = true;
    self._connections++;
    socket.server = self;
    socket._server = self;
    self.emit("connection", socket);
  }
  Server.prototype.getConnections = function(cb) {
    function end(err, connections) {
      process_default.nextTick(cb, err, connections);
    }
    if (!this._usingSlaves) {
      return end(null, this._connections);
    }
    var left = this._slaves.length;
    var total = this._connections;
    function oncount(err, count) {
      if (err) {
        left = -1;
        return end(err);
      }
      total += count;
      if (--left === 0)
        return end(null, total);
    }
    this._slaves.forEach(function(slave) {
      slave.getConnections(oncount);
    });
  };
  Server.prototype.close = function(cb) {
    function onSlaveClose() {
      if (--left !== 0)
        return;
      self._connections = 0;
      self._emitCloseIfDrained();
    }
    if (typeof cb === "function") {
      if (!this._handle) {
        this.once("close", function() {
          cb(new Error("Not running"));
        });
      } else {
        this.once("close", cb);
      }
    }
    if (this._handle) {
      this._handle.close();
      this._handle = null;
    }
    if (this._usingSlaves) {
      var self = this;
      var left = this._slaves.length;
      this._connections++;
      this._slaves.forEach(function(slave) {
        slave.close(onSlaveClose);
      });
    } else {
      this._emitCloseIfDrained();
    }
    return this;
  };
  Server.prototype._emitCloseIfDrained = function() {
    if (this._handle || this._connections) {
      return;
    }
    process_default.nextTick(emitCloseNT2, this);
  };
  function emitCloseNT2(self) {
    self.emit("close");
  }
  Server.prototype.listenFD = function(fd, type) {
    return this.listen({ fd });
  };
  Server.prototype._setupSlave = function(socketList) {
    this._usingSlaves = true;
    this._slaves.push(socketList);
  };
  Server.prototype.ref = function() {
    this._unref = false;
    if (this._handle)
      this._handle.ref();
    return this;
  };
  Server.prototype.unref = function() {
    this._unref = true;
    if (this._handle)
      this._handle.unref();
    return this;
  };
  var v4Seg = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
  var v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
  var IPv4Reg = new RegExp(`^${v4Str}$`);
  var v6Seg = "(?:[0-9a-fA-F]{1,4})";
  var IPv6Reg = new RegExp(`^((?:${v6Seg}:){7}(?:${v6Seg}|:)|(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:)))(%[0-9a-zA-Z-.:]{1,})?$`);
  function isIPv4(s) {
    return IPv4Reg.test(s);
  }
  function isIPv6(s) {
    return IPv6Reg.test(s);
  }
  function isIP(s) {
    if (isIPv4(s))
      return 4;
    if (isIPv6(s))
      return 6;
    return 0;
  }
  function _setSimultaneousAccepts(handle) {
  }
  function isLegalPort(port) {
    if (typeof port !== "number" && typeof port !== "string" || typeof port === "string" && port.trim().length === 0)
      return false;
    return +port === +port >>> 0 && port <= 65535;
  }
  function assertPort(port) {
    if (typeof port !== "undefined" && !isLegalPort(port))
      throw new RangeError('"port" argument must be >= 0 and < 65536');
  }
  function errnoException(err, syscall, original) {
    var errname = err.message;
    var message = syscall + " " + errname;
    if (original)
      message += " " + original;
    var e = new Error(message);
    e.code = errname;
    e.errno = errname;
    e.syscall = syscall;
    return e;
  }
  function exceptionWithHostPort(err, syscall, address, port, additional) {
    var details;
    if (port && port > 0) {
      details = address + ":" + port;
    } else {
      details = address;
    }
    if (additional) {
      details += " - Local (" + additional + ")";
    }
    var ex = errnoException(err, syscall, details);
    ex.address = address;
    if (port) {
      ex.port = port;
    }
    return ex;
  }

  // script/node_modules/@frida/http/lib/_http_agent.js
  init_process();
  init_util();
  function Agent(options) {
    if (!(this instanceof Agent))
      return new Agent(options);
    events_default.call(this);
    var self = this;
    self.defaultPort = 80;
    self.protocol = "http:";
    self.options = util_default._extend({}, options);
    self.options.path = null;
    self.requests = {};
    self.sockets = {};
    self.freeSockets = {};
    self.keepAliveMsecs = self.options.keepAliveMsecs || 1e3;
    self.keepAlive = self.options.keepAlive || false;
    self.maxSockets = self.options.maxSockets || Agent.defaultMaxSockets;
    self.maxFreeSockets = self.options.maxFreeSockets || 256;
    self.on("free", function(socket, options2) {
      var name = self.getName(options2);
      if (socket.writable && self.requests[name] && self.requests[name].length) {
        self.requests[name].shift().onSocket(socket);
        if (self.requests[name].length === 0) {
          delete self.requests[name];
        }
      } else {
        var req = socket._httpMessage;
        if (req && req.shouldKeepAlive && socket.writable && self.keepAlive) {
          var freeSockets = self.freeSockets[name];
          var freeLen = freeSockets ? freeSockets.length : 0;
          var count = freeLen;
          if (self.sockets[name])
            count += self.sockets[name].length;
          if (count > self.maxSockets || freeLen >= self.maxFreeSockets) {
            socket.destroy();
          } else {
            freeSockets = freeSockets || [];
            self.freeSockets[name] = freeSockets;
            socket.setKeepAlive(true, self.keepAliveMsecs);
            socket.unref();
            socket._httpMessage = null;
            self.removeSocket(socket, options2);
            freeSockets.push(socket);
          }
        } else {
          socket.destroy();
        }
      }
    });
  }
  util_default.inherits(Agent, events_default);
  Agent.defaultMaxSockets = Infinity;
  Agent.prototype.createConnection = net_default.createConnection;
  Agent.prototype.getName = function(options) {
    var name = options.host || "localhost";
    name += ":";
    if (options.port)
      name += options.port;
    name += ":";
    if (options.localAddress)
      name += options.localAddress;
    if (options.family === 4 || options.family === 6)
      name += ":" + options.family;
    return name;
  };
  Agent.prototype.addRequest = function(req, options) {
    if (typeof options === "string") {
      options = {
        host: options,
        port: arguments[2],
        localAddress: arguments[3]
      };
    }
    options = util_default._extend({}, options);
    options = util_default._extend(options, this.options);
    if (!options.servername) {
      options.servername = options.host;
      const hostHeader = req.getHeader("host");
      if (hostHeader) {
        options.servername = hostHeader.replace(/:.*$/, "");
      }
    }
    var name = this.getName(options);
    if (!this.sockets[name]) {
      this.sockets[name] = [];
    }
    var freeLen = this.freeSockets[name] ? this.freeSockets[name].length : 0;
    var sockLen = freeLen + this.sockets[name].length;
    if (freeLen) {
      var socket = this.freeSockets[name].shift();
      if (!this.freeSockets[name].length)
        delete this.freeSockets[name];
      socket.ref();
      req.onSocket(socket);
      this.sockets[name].push(socket);
    } else if (sockLen < this.maxSockets) {
      this.createSocket(req, options, function(err, newSocket) {
        if (err) {
          process_default.nextTick(function() {
            req.emit("error", err);
          });
          return;
        }
        req.onSocket(newSocket);
      });
    } else {
      if (!this.requests[name]) {
        this.requests[name] = [];
      }
      this.requests[name].push(req);
    }
  };
  Agent.prototype.createSocket = function(req, options, cb) {
    var self = this;
    options = util_default._extend({}, options);
    options = util_default._extend(options, self.options);
    if (!options.servername) {
      options.servername = options.host;
      const hostHeader = req.getHeader("host");
      if (hostHeader) {
        options.servername = hostHeader.replace(/:.*$/, "");
      }
    }
    var name = self.getName(options);
    options._agentKey = name;
    options.encoding = null;
    var called = false;
    const newSocket = self.createConnection(options, oncreate);
    if (newSocket)
      oncreate(null, newSocket);
    function oncreate(err, s) {
      if (called)
        return;
      called = true;
      if (err)
        return cb(err);
      if (!self.sockets[name]) {
        self.sockets[name] = [];
      }
      self.sockets[name].push(s);
      function onFree() {
        self.emit("free", s, options);
      }
      s.on("free", onFree);
      function onClose(err2) {
        self.removeSocket(s, options);
      }
      s.on("close", onClose);
      function onRemove() {
        self.removeSocket(s, options);
        s.removeListener("close", onClose);
        s.removeListener("free", onFree);
        s.removeListener("agentRemove", onRemove);
      }
      s.on("agentRemove", onRemove);
      cb(null, s);
    }
  };
  Agent.prototype.removeSocket = function(s, options) {
    var name = this.getName(options);
    var sets = [this.sockets];
    if (!s.writable)
      sets.push(this.freeSockets);
    for (var sk = 0; sk < sets.length; sk++) {
      var sockets = sets[sk];
      if (sockets[name]) {
        var index = sockets[name].indexOf(s);
        if (index !== -1) {
          sockets[name].splice(index, 1);
          if (sockets[name].length === 0)
            delete sockets[name];
        }
      }
    }
    if (this.requests[name] && this.requests[name].length) {
      var req = this.requests[name][0];
      this.createSocket(req, options, function(err, newSocket) {
        if (err) {
          process_default.nextTick(function() {
            req.emit("error", err);
          });
          return;
        }
        newSocket.emit("free");
      });
    }
  };
  Agent.prototype.destroy = function() {
    var sets = [this.freeSockets, this.sockets];
    for (var s = 0; s < sets.length; s++) {
      var set = sets[s];
      var keys = Object.keys(set);
      for (var v = 0; v < keys.length; v++) {
        var setName = set[keys[v]];
        for (var n = 0; n < setName.length; n++) {
          setName[n].destroy();
        }
      }
    }
  };
  var globalAgent = new Agent();

  // script/node_modules/@frida/http/lib/_http_incoming.js
  init_util();
  function readStart(socket) {
    if (socket && !socket._paused && socket.readable)
      socket.resume();
  }
  function readStop(socket) {
    if (socket)
      socket.pause();
  }
  function IncomingMessage(socket) {
    readable_default.call(this);
    this._readableState.readingMore = true;
    this.socket = socket;
    this.connection = socket;
    this.httpVersionMajor = null;
    this.httpVersionMinor = null;
    this.httpVersion = null;
    this.complete = false;
    this.headers = {};
    this.rawHeaders = [];
    this.trailers = {};
    this.rawTrailers = [];
    this.readable = true;
    this.upgrade = null;
    this.url = "";
    this.method = null;
    this.statusCode = null;
    this.statusMessage = null;
    this.client = socket;
    this._consuming = false;
    this._dumped = false;
  }
  util_default.inherits(IncomingMessage, readable_default);
  IncomingMessage.prototype.setTimeout = function(msecs, callback) {
    if (callback)
      this.on("timeout", callback);
    this.socket.setTimeout(msecs);
    return this;
  };
  IncomingMessage.prototype.read = function(n) {
    if (!this._consuming)
      this._readableState.readingMore = false;
    this._consuming = true;
    this.read = readable_default.prototype.read;
    return this.read(n);
  };
  IncomingMessage.prototype._read = function(n) {
    if (this.socket.readable)
      readStart(this.socket);
  };
  IncomingMessage.prototype.destroy = function(error2) {
    if (this.socket)
      this.socket.destroy(error2);
  };
  IncomingMessage.prototype._addHeaderLines = function(headers, n) {
    if (headers && headers.length) {
      var raw, dest;
      if (this.complete) {
        raw = this.rawTrailers;
        dest = this.trailers;
      } else {
        raw = this.rawHeaders;
        dest = this.headers;
      }
      for (var i = 0; i < n; i += 2) {
        var k = headers[i];
        var v = headers[i + 1];
        raw.push(k);
        raw.push(v);
        this._addHeaderLine(k, v, dest);
      }
    }
  };
  IncomingMessage.prototype._addHeaderLine = function(field, value, dest) {
    field = field.toLowerCase();
    switch (field) {
      case "set-cookie":
        if (dest[field] !== void 0) {
          dest[field].push(value);
        } else {
          dest[field] = [value];
        }
        break;
      case "content-type":
      case "content-length":
      case "user-agent":
      case "referer":
      case "host":
      case "authorization":
      case "proxy-authorization":
      case "if-modified-since":
      case "if-unmodified-since":
      case "from":
      case "location":
      case "max-forwards":
      case "retry-after":
      case "etag":
      case "last-modified":
      case "server":
      case "age":
      case "expires":
        if (dest[field] === void 0)
          dest[field] = value;
        break;
      default:
        if (typeof dest[field] === "string") {
          dest[field] += ", " + value;
        } else {
          dest[field] = value;
        }
    }
  };
  IncomingMessage.prototype._dump = function() {
    if (!this._dumped) {
      this._dumped = true;
      this.resume();
    }
  };

  // script/node_modules/@frida/http/lib/http_parser.js
  var import_http_parser_js = __toESM(require_http_parser(), 1);
  var methods = [
    "DELETE",
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "CONNECT",
    "OPTIONS",
    "TRACE",
    "COPY",
    "LOCK",
    "MKCOL",
    "MOVE",
    "PROPFIND",
    "PROPPATCH",
    "SEARCH",
    "UNLOCK",
    "BIND",
    "REBIND",
    "UNBIND",
    "ACL",
    "REPORT",
    "MKACTIVITY",
    "CHECKOUT",
    "MERGE",
    "M-SEARCH",
    "NOTIFY",
    "SUBSCRIBE",
    "UNSUBSCRIBE",
    "PATCH",
    "PURGE",
    "MKCALENDAR",
    "LINK",
    "UNLINK"
  ];

  // script/node_modules/@frida/http/lib/internal/freelist.js
  function FreeList(name, max, constructor) {
    this.name = name;
    this.constructor = constructor;
    this.max = max;
    this.list = [];
  }
  FreeList.prototype.alloc = function() {
    return this.list.length ? this.list.pop() : this.constructor.apply(this, arguments);
  };
  FreeList.prototype.free = function(obj) {
    if (this.list.length < this.max) {
      this.list.push(obj);
      return true;
    }
    return false;
  };

  // script/node_modules/@frida/http/lib/_http_common.js
  var CRLF = "\r\n";
  var chunkExpression = /chunk/i;
  var continueExpression = /100-continue/i;
  var kOnHeaders = import_http_parser_js.HTTPParser.kOnHeaders | 0;
  var kOnHeadersComplete = import_http_parser_js.HTTPParser.kOnHeadersComplete | 0;
  var kOnBody = import_http_parser_js.HTTPParser.kOnBody | 0;
  var kOnMessageComplete = import_http_parser_js.HTTPParser.kOnMessageComplete | 0;
  var kOnExecute = import_http_parser_js.HTTPParser.kOnExecute | 0;
  function parserOnHeaders(headers, url) {
    if (this.maxHeaderPairs <= 0 || this._headers.length < this.maxHeaderPairs) {
      this._headers = this._headers.concat(headers);
    }
    this._url += url;
  }
  function parserOnHeadersComplete(versionMajor, versionMinor, headers, method, url, statusCode, statusMessage, upgrade, shouldKeepAlive) {
    var parser = this;
    if (!headers) {
      headers = parser._headers;
      parser._headers = [];
    }
    if (!url) {
      url = parser._url;
      parser._url = "";
    }
    parser.incoming = new IncomingMessage(parser.socket);
    parser.incoming.httpVersionMajor = versionMajor;
    parser.incoming.httpVersionMinor = versionMinor;
    parser.incoming.httpVersion = versionMajor + "." + versionMinor;
    parser.incoming.url = url;
    var n = headers.length;
    if (parser.maxHeaderPairs > 0)
      n = Math.min(n, parser.maxHeaderPairs);
    parser.incoming._addHeaderLines(headers, n);
    if (typeof method === "number") {
      parser.incoming.method = methods[method];
    } else {
      parser.incoming.statusCode = statusCode;
      parser.incoming.statusMessage = statusMessage;
    }
    if (upgrade && parser.outgoing !== null && !parser.outgoing.upgrading) {
      upgrade = false;
    }
    parser.incoming.upgrade = upgrade;
    var skipBody = 0;
    if (!upgrade) {
      skipBody = parser.onIncoming(parser.incoming, shouldKeepAlive);
    }
    if (typeof skipBody !== "number")
      return skipBody ? 1 : 0;
    else
      return skipBody;
  }
  function parserOnBody(b, start, len) {
    var parser = this;
    var stream = parser.incoming;
    if (!stream)
      return;
    var socket = stream.socket;
    if (len > 0 && !stream._dumped) {
      var slice2 = b.slice(start, start + len);
      var ret = stream.push(slice2);
      if (!ret)
        readStop(socket);
    }
  }
  function parserOnMessageComplete() {
    var parser = this;
    var stream = parser.incoming;
    if (stream) {
      stream.complete = true;
      var headers = parser._headers;
      if (headers) {
        parser.incoming._addHeaderLines(headers, headers.length);
        parser._headers = [];
        parser._url = "";
      }
      stream.push(null);
    }
    readStart(parser.socket);
  }
  var parsers = new FreeList("parsers", 1e3, function() {
    var parser = new import_http_parser_js.HTTPParser(import_http_parser_js.HTTPParser.REQUEST);
    parser._headers = [];
    parser._url = "";
    parser._consumed = false;
    parser.socket = null;
    parser.incoming = null;
    parser.outgoing = null;
    parser[kOnHeaders] = parserOnHeaders;
    parser[kOnHeadersComplete] = parserOnHeadersComplete;
    parser[kOnBody] = parserOnBody;
    parser[kOnMessageComplete] = parserOnMessageComplete;
    parser[kOnExecute] = null;
    return parser;
  });
  function freeParser(parser, req, socket) {
    if (parser) {
      parser._headers = [];
      parser.onIncoming = null;
      if (parser._consumed)
        parser.unconsume();
      parser._consumed = false;
      if (parser.socket)
        parser.socket.parser = null;
      parser.socket = null;
      parser.incoming = null;
      parser.outgoing = null;
      parser[kOnExecute] = null;
      if (parsers.free(parser) === false)
        parser.close();
      parser = null;
    }
    if (req) {
      req.parser = null;
    }
    if (socket) {
      socket.parser = null;
    }
  }
  function ondrain() {
    if (this._httpMessage)
      this._httpMessage.emit("drain");
  }
  function httpSocketSetup(socket) {
    socket.removeListener("drain", ondrain);
    socket.on("drain", ondrain);
  }
  function isValidTokenChar(ch) {
    if (ch >= 94 && ch <= 122)
      return true;
    if (ch >= 65 && ch <= 90)
      return true;
    if (ch === 45)
      return true;
    if (ch >= 48 && ch <= 57)
      return true;
    if (ch === 34 || ch === 40 || ch === 41 || ch === 44)
      return false;
    if (ch >= 33 && ch <= 46)
      return true;
    if (ch === 124 || ch === 126)
      return true;
    return false;
  }
  function checkIsHttpToken(val) {
    if (typeof val !== "string" || val.length === 0)
      return false;
    if (!isValidTokenChar(val.charCodeAt(0)))
      return false;
    const len = val.length;
    if (len > 1) {
      if (!isValidTokenChar(val.charCodeAt(1)))
        return false;
      if (len > 2) {
        if (!isValidTokenChar(val.charCodeAt(2)))
          return false;
        if (len > 3) {
          if (!isValidTokenChar(val.charCodeAt(3)))
            return false;
          for (var i = 4; i < len; i++) {
            if (!isValidTokenChar(val.charCodeAt(i)))
              return false;
          }
        }
      }
    }
    return true;
  }
  function checkInvalidHeaderChar(val) {
    val += "";
    if (val.length < 1)
      return false;
    var c = val.charCodeAt(0);
    if (c <= 31 && c !== 9 || c > 255 || c === 127)
      return true;
    if (val.length < 2)
      return false;
    c = val.charCodeAt(1);
    if (c <= 31 && c !== 9 || c > 255 || c === 127)
      return true;
    if (val.length < 3)
      return false;
    c = val.charCodeAt(2);
    if (c <= 31 && c !== 9 || c > 255 || c === 127)
      return true;
    for (var i = 3; i < val.length; ++i) {
      c = val.charCodeAt(i);
      if (c <= 31 && c !== 9 || c > 255 || c === 127)
        return true;
    }
    return false;
  }

  // script/node_modules/@frida/http/lib/_http_outgoing.js
  init_process();
  init_util();
  var upgradeExpression = /^Upgrade$/i;
  var transferEncodingExpression = /^Transfer-Encoding$/i;
  var contentLengthExpression = /^Content-Length$/i;
  var dateExpression = /^Date$/i;
  var expectExpression = /^Expect$/i;
  var trailerExpression = /^Trailer$/i;
  var connectionExpression = /^Connection$/i;
  var connCloseExpression = /(^|\W)close(\W|$)/i;
  var connUpgradeExpression = /(^|\W)upgrade(\W|$)/i;
  var automaticHeaders = {
    connection: true,
    "content-length": true,
    "transfer-encoding": true,
    date: true
  };
  var dateCache;
  function utcDate() {
    if (!dateCache) {
      var d = /* @__PURE__ */ new Date();
      dateCache = d.toUTCString();
      timers_default.enroll(utcDate, 1e3 - d.getMilliseconds());
      timers_default._unrefActive(utcDate);
    }
    return dateCache;
  }
  utcDate._onTimeout = function() {
    dateCache = void 0;
  };
  function OutgoingMessage() {
    stream_default.call(this);
    this.output = [];
    this.outputEncodings = [];
    this.outputCallbacks = [];
    this.outputSize = 0;
    this.writable = true;
    this._last = false;
    this.upgrading = false;
    this.chunkedEncoding = false;
    this.shouldKeepAlive = true;
    this.useChunkedEncodingByDefault = true;
    this.sendDate = false;
    this._removedHeader = {};
    this._contentLength = null;
    this._hasBody = true;
    this._trailer = "";
    this.finished = false;
    this._headerSent = false;
    this.socket = null;
    this.connection = null;
    this._header = null;
    this._headers = null;
    this._headerNames = {};
    this._onPendingData = null;
  }
  util_default.inherits(OutgoingMessage, stream_default);
  OutgoingMessage.prototype.setTimeout = function(msecs, callback) {
    if (callback) {
      this.on("timeout", callback);
    }
    if (!this.socket) {
      this.once("socket", function(socket) {
        socket.setTimeout(msecs);
      });
    } else {
      this.socket.setTimeout(msecs);
    }
    return this;
  };
  OutgoingMessage.prototype.destroy = function(error2) {
    if (this.socket)
      this.socket.destroy(error2);
    else
      this.once("socket", function(socket) {
        socket.destroy(error2);
      });
  };
  OutgoingMessage.prototype._send = function(data, encoding, callback) {
    if (!this._headerSent) {
      if (typeof data === "string" && encoding !== "hex" && encoding !== "base64") {
        data = this._header + data;
      } else {
        this.output.unshift(this._header);
        this.outputEncodings.unshift("latin1");
        this.outputCallbacks.unshift(null);
        this.outputSize += this._header.length;
        if (typeof this._onPendingData === "function")
          this._onPendingData(this._header.length);
      }
      this._headerSent = true;
    }
    return this._writeRaw(data, encoding, callback);
  };
  OutgoingMessage.prototype._writeRaw = function(data, encoding, callback) {
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    var connection = this.connection;
    if (connection && connection._httpMessage === this && connection.writable && !connection.destroyed) {
      var outputLength = this.output.length;
      if (outputLength > 0) {
        this._flushOutput(connection);
      } else if (data.length === 0) {
        if (typeof callback === "function")
          process_default.nextTick(callback);
        return true;
      }
      return connection.write(data, encoding, callback);
    } else if (connection && connection.destroyed) {
      return false;
    } else {
      return this._buffer(data, encoding, callback);
    }
  };
  OutgoingMessage.prototype._buffer = function(data, encoding, callback) {
    this.output.push(data);
    this.outputEncodings.push(encoding);
    this.outputCallbacks.push(callback);
    this.outputSize += data.length;
    if (typeof this._onPendingData === "function")
      this._onPendingData(data.length);
    return false;
  };
  OutgoingMessage.prototype._storeHeader = function(firstLine, headers) {
    var state = {
      sentConnectionHeader: false,
      sentConnectionUpgrade: false,
      sentContentLengthHeader: false,
      sentTransferEncodingHeader: false,
      sentDateHeader: false,
      sentExpect: false,
      sentTrailer: false,
      sentUpgrade: false,
      messageHeader: firstLine
    };
    if (headers) {
      var keys = Object.keys(headers);
      var isArray2 = Array.isArray(headers);
      var field, value;
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        if (isArray2) {
          field = headers[key][0];
          value = headers[key][1];
        } else {
          field = key;
          value = headers[key];
        }
        if (Array.isArray(value)) {
          for (var j = 0; j < value.length; j++) {
            storeHeader(this, state, field, value[j]);
          }
        } else {
          storeHeader(this, state, field, value);
        }
      }
    }
    if (state.sentConnectionUpgrade && state.sentUpgrade)
      this.upgrading = true;
    if (this.sendDate === true && state.sentDateHeader === false) {
      state.messageHeader += "Date: " + utcDate() + CRLF;
    }
    var statusCode = this.statusCode;
    if ((statusCode === 204 || statusCode === 304) && this.chunkedEncoding === true) {
      this.chunkedEncoding = false;
      this.shouldKeepAlive = false;
    }
    if (this._removedHeader.connection) {
      this._last = true;
      this.shouldKeepAlive = false;
    } else if (state.sentConnectionHeader === false) {
      var shouldSendKeepAlive = this.shouldKeepAlive && (state.sentContentLengthHeader || this.useChunkedEncodingByDefault || this.agent);
      if (shouldSendKeepAlive) {
        state.messageHeader += "Connection: keep-alive\r\n";
      } else {
        this._last = true;
        state.messageHeader += "Connection: close\r\n";
      }
    }
    if (state.sentContentLengthHeader === false && state.sentTransferEncodingHeader === false) {
      if (!this._hasBody) {
        this.chunkedEncoding = false;
      } else if (!this.useChunkedEncodingByDefault) {
        this._last = true;
      } else {
        if (!state.sentTrailer && !this._removedHeader["content-length"] && typeof this._contentLength === "number") {
          state.messageHeader += "Content-Length: " + this._contentLength + "\r\n";
        } else if (!this._removedHeader["transfer-encoding"]) {
          state.messageHeader += "Transfer-Encoding: chunked\r\n";
          this.chunkedEncoding = true;
        } else {
        }
      }
    }
    this._header = state.messageHeader + CRLF;
    this._headerSent = false;
    if (state.sentExpect)
      this._send("");
  };
  function storeHeader(self, state, field, value) {
    if (!checkIsHttpToken(field)) {
      throw new TypeError(
        'Header name must be a valid HTTP Token ["' + field + '"]'
      );
    }
    if (checkInvalidHeaderChar(value) === true) {
      throw new TypeError("The header content contains invalid characters");
    }
    state.messageHeader += field + ": " + escapeHeaderValue(value) + CRLF;
    if (connectionExpression.test(field)) {
      state.sentConnectionHeader = true;
      if (connCloseExpression.test(value)) {
        self._last = true;
      } else {
        self.shouldKeepAlive = true;
      }
      if (connUpgradeExpression.test(value))
        state.sentConnectionUpgrade = true;
    } else if (transferEncodingExpression.test(field)) {
      state.sentTransferEncodingHeader = true;
      if (chunkExpression.test(value))
        self.chunkedEncoding = true;
    } else if (contentLengthExpression.test(field)) {
      state.sentContentLengthHeader = true;
    } else if (dateExpression.test(field)) {
      state.sentDateHeader = true;
    } else if (expectExpression.test(field)) {
      state.sentExpect = true;
    } else if (trailerExpression.test(field)) {
      state.sentTrailer = true;
    } else if (upgradeExpression.test(field)) {
      state.sentUpgrade = true;
    }
  }
  OutgoingMessage.prototype.setHeader = function(name, value) {
    if (!checkIsHttpToken(name))
      throw new TypeError(
        'Header name must be a valid HTTP Token ["' + name + '"]'
      );
    if (value === void 0)
      throw new Error('"value" required in setHeader("' + name + '", value)');
    if (this._header)
      throw new Error("Can't set headers after they are sent.");
    if (checkInvalidHeaderChar(value) === true) {
      throw new TypeError("The header content contains invalid characters");
    }
    if (this._headers === null)
      this._headers = {};
    var key = name.toLowerCase();
    this._headers[key] = value;
    this._headerNames[key] = name;
    if (automaticHeaders[key])
      this._removedHeader[key] = false;
  };
  OutgoingMessage.prototype.getHeader = function(name) {
    if (arguments.length < 1) {
      throw new Error('"name" argument is required for getHeader(name)');
    }
    if (!this._headers)
      return;
    var key = name.toLowerCase();
    return this._headers[key];
  };
  OutgoingMessage.prototype.removeHeader = function(name) {
    if (arguments.length < 1) {
      throw new Error('"name" argument is required for removeHeader(name)');
    }
    if (this._header) {
      throw new Error("Can't remove headers after they are sent");
    }
    var key = name.toLowerCase();
    if (key === "date")
      this.sendDate = false;
    else if (automaticHeaders[key])
      this._removedHeader[key] = true;
    if (this._headers) {
      delete this._headers[key];
      delete this._headerNames[key];
    }
  };
  OutgoingMessage.prototype._renderHeaders = function() {
    if (this._header) {
      throw new Error("Can't render headers after they are sent to the client");
    }
    var headersMap = this._headers;
    if (!headersMap)
      return {};
    var headers = {};
    var keys = Object.keys(headersMap);
    var headerNames = this._headerNames;
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      headers[headerNames[key]] = headersMap[key];
    }
    return headers;
  };
  OutgoingMessage.prototype._implicitHeader = function() {
    throw new Error("_implicitHeader() method is not implemented");
  };
  Object.defineProperty(OutgoingMessage.prototype, "headersSent", {
    configurable: true,
    enumerable: true,
    get: function() {
      return !!this._header;
    }
  });
  OutgoingMessage.prototype.write = function(chunk, encoding, callback) {
    if (this.finished) {
      var err = new Error("write after end");
      process_default.nextTick(writeAfterEndNT, this, err, callback);
      return true;
    }
    if (!this._header) {
      this._implicitHeader();
    }
    if (!this._hasBody) {
      return true;
    }
    if (typeof chunk !== "string" && !(chunk instanceof Buffer2)) {
      throw new TypeError("First argument must be a string or Buffer");
    }
    if (chunk.length === 0)
      return true;
    var len, ret;
    if (this.chunkedEncoding) {
      if (typeof chunk === "string" && encoding !== "hex" && encoding !== "base64" && encoding !== "latin1") {
        len = Buffer2.byteLength(chunk, encoding);
        chunk = len.toString(16) + CRLF + chunk + CRLF;
        ret = this._send(chunk, encoding, callback);
      } else {
        if (typeof chunk === "string")
          len = Buffer2.byteLength(chunk, encoding);
        else
          len = chunk.length;
        if (this.connection && !this.connection.corked) {
          this.connection.cork();
          process_default.nextTick(connectionCorkNT, this.connection);
        }
        this._send(len.toString(16), "latin1", null);
        this._send(crlf_buf, null, null);
        this._send(chunk, encoding, null);
        ret = this._send(crlf_buf, null, callback);
      }
    } else {
      ret = this._send(chunk, encoding, callback);
    }
    return ret;
  };
  function writeAfterEndNT(self, err, callback) {
    self.emit("error", err);
    if (callback)
      callback(err);
  }
  function connectionCorkNT(conn) {
    conn.uncork();
  }
  function escapeHeaderValue(value) {
    return /[\r\n]/.test(value) ? value.replace(/[\r\n]+[ \t]*/g, "") : value;
  }
  OutgoingMessage.prototype.addTrailers = function(headers) {
    this._trailer = "";
    var keys = Object.keys(headers);
    var isArray2 = Array.isArray(headers);
    var field, value;
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      if (isArray2) {
        field = headers[key][0];
        value = headers[key][1];
      } else {
        field = key;
        value = headers[key];
      }
      if (!checkIsHttpToken(field)) {
        throw new TypeError(
          'Trailer name must be a valid HTTP Token ["' + field + '"]'
        );
      }
      if (checkInvalidHeaderChar(value) === true) {
        throw new TypeError("The trailer content contains invalid characters");
      }
      this._trailer += field + ": " + escapeHeaderValue(value) + CRLF;
    }
  };
  var crlf_buf = Buffer2.from("\r\n");
  OutgoingMessage.prototype.end = function(data, encoding, callback) {
    if (typeof data === "function") {
      callback = data;
      data = null;
    } else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }
    if (data && typeof data !== "string" && !(data instanceof Buffer2)) {
      throw new TypeError("First argument must be a string or Buffer");
    }
    if (this.finished) {
      return false;
    }
    if (!this._header) {
      if (data) {
        if (typeof data === "string")
          this._contentLength = Buffer2.byteLength(data, encoding);
        else
          this._contentLength = data.length;
      } else {
        this._contentLength = 0;
      }
      this._implicitHeader();
    }
    if (data && !this._hasBody) {
      data = null;
    }
    if (this.connection && data)
      this.connection.cork();
    var ret;
    if (data) {
      this.write(data, encoding);
    }
    if (typeof callback === "function")
      this.once("finish", callback);
    const finish2 = () => {
      this.emit("finish");
    };
    if (this._hasBody && this.chunkedEncoding) {
      ret = this._send("0\r\n" + this._trailer + "\r\n", "latin1", finish2);
    } else {
      ret = this._send("", "latin1", finish2);
    }
    if (this.connection && data)
      this.connection.uncork();
    this.finished = true;
    if (this.output.length === 0 && this.connection && this.connection._httpMessage === this) {
      this._finish();
    }
    return ret;
  };
  OutgoingMessage.prototype._finish = function() {
    this.emit("prefinish");
  };
  OutgoingMessage.prototype._flush = function() {
    var socket = this.socket;
    var ret;
    if (socket && socket.writable) {
      ret = this._flushOutput(socket);
      if (this.finished) {
        this._finish();
      } else if (ret) {
        this.emit("drain");
      }
    }
  };
  OutgoingMessage.prototype._flushOutput = function _flushOutput(socket) {
    var ret;
    var outputLength = this.output.length;
    if (outputLength <= 0)
      return ret;
    var output = this.output;
    var outputEncodings = this.outputEncodings;
    var outputCallbacks = this.outputCallbacks;
    socket.cork();
    for (var i = 0; i < outputLength; i++) {
      ret = socket.write(
        output[i],
        outputEncodings[i],
        outputCallbacks[i]
      );
    }
    socket.uncork();
    this.output = [];
    this.outputEncodings = [];
    this.outputCallbacks = [];
    if (typeof this._onPendingData === "function")
      this._onPendingData(-this.outputSize);
    this.outputSize = 0;
    return ret;
  };
  OutgoingMessage.prototype.flushHeaders = function() {
    if (!this._header) {
      this._implicitHeader();
    }
    this._send("");
  };
  OutgoingMessage.prototype.flush = function() {
    this.flushHeaders();
  };

  // script/node_modules/@frida/http/lib/_http_client.js
  init_process();

  // script/node_modules/@frida/punycode/punycode.js
  var maxInt = 2147483647;
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128;
  var delimiter = "-";
  var regexNonASCII = /[^\0-\x7E]/;
  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
  var errors2 = {
    "overflow": "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
  };
  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;
  function error(type) {
    throw new RangeError(errors2[type]);
  }
  function map(array, fn) {
    const result = [];
    let length = array.length;
    while (length--) {
      result[length] = fn(array[length]);
    }
    return result;
  }
  function mapDomain(string, fn) {
    const parts = string.split("@");
    let result = "";
    if (parts.length > 1) {
      result = parts[0] + "@";
      string = parts[1];
    }
    string = string.replace(regexSeparators, ".");
    const labels = string.split(".");
    const encoded = map(labels, fn).join(".");
    return result + encoded;
  }
  function ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length = string.length;
    while (counter < length) {
      const value = string.charCodeAt(counter++);
      if (value >= 55296 && value <= 56319 && counter < length) {
        const extra = string.charCodeAt(counter++);
        if ((extra & 64512) == 56320) {
          output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  var digitToBasic = function(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  };
  var adapt = function(delta, numPoints, firstTime) {
    let k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };
  function encode(input) {
    const output = [];
    input = ucs2decode(input);
    let inputLength = input.length;
    let n = initialN;
    let delta = 0;
    let bias = initialBias;
    for (const currentValue of input) {
      if (currentValue < 128) {
        output.push(stringFromCharCode(currentValue));
      }
    }
    let basicLength = output.length;
    let handledCPCount = basicLength;
    if (basicLength) {
      output.push(delimiter);
    }
    while (handledCPCount < inputLength) {
      let m = maxInt;
      for (const currentValue of input) {
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }
      const handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error("overflow");
      }
      delta += (m - n) * handledCPCountPlusOne;
      n = m;
      for (const currentValue of input) {
        if (currentValue < n && ++delta > maxInt) {
          error("overflow");
        }
        if (currentValue == n) {
          let q = delta;
          for (let k = base; ; k += base) {
            const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) {
              break;
            }
            const qMinusT = q - t;
            const baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
            );
            q = floor(qMinusT / baseMinusT);
          }
          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }
      ++delta;
      ++n;
    }
    return output.join("");
  }
  function toASCII(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
    });
  }

  // script/node_modules/@frida/querystring/index.js
  function stringify(obj, sep2, eq, name) {
    sep2 = sep2 || "&";
    eq = eq || "=";
    if (obj === null) {
      obj = void 0;
    }
    if (typeof obj === "object") {
      return Object.keys(obj).map((k) => {
        const ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k].map(function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep2);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).filter(Boolean).join(sep2);
    }
    if (!name)
      return "";
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
  }
  function stringifyPrimitive(v) {
    switch (typeof v) {
      case "string":
        return v;
      case "boolean":
        return v ? "true" : "false";
      case "number":
        return isFinite(v) ? v : "";
      default:
        return "";
    }
  }
  function parse(qs, sep2, eq, options) {
    sep2 = sep2 || "&";
    eq = eq || "=";
    const obj = {};
    if (typeof qs !== "string" || qs.length === 0) {
      return obj;
    }
    const regexp = /\+/g;
    qs = qs.split(sep2);
    let maxKeys = 1e3;
    if (options && typeof options.maxKeys === "number") {
      maxKeys = options.maxKeys;
    }
    let len = qs.length;
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }
    for (let i = 0; i < len; i++) {
      const x = qs[i].replace(regexp, "%20");
      let kstr, vstr;
      const idx = x.indexOf(eq);
      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = "";
      }
      const k = decodeURIComponent(kstr);
      const v = decodeURIComponent(vstr);
      if (!Object.prototype.hasOwnProperty.call(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }
    return obj;
  }
  var querystring_default = {
    stringify,
    encode: stringify,
    parse,
    decode: parse
  };

  // script/node_modules/@frida/url/url.js
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }
  var protocolPattern = /^[a-z0-9.+-]+:/i;
  var portPattern = /:[0-9]*$/;
  var hostPattern = /^\/\/[^@/]+@[^@/]+/;
  var simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/;
  var hostnameMaxLen = 255;
  var unsafeProtocol = /* @__PURE__ */ new Set([
    "javascript",
    "javascript:"
  ]);
  var hostlessProtocol = /* @__PURE__ */ new Set([
    "javascript",
    "javascript:"
  ]);
  var slashedProtocol = /* @__PURE__ */ new Set([
    "http",
    "http:",
    "https",
    "https:",
    "ftp",
    "ftp:",
    "gopher",
    "gopher:",
    "file",
    "file:",
    "ws",
    "ws:",
    "wss",
    "wss:"
  ]);
  var CHAR_SPACE = 32;
  var CHAR_TAB = 9;
  var CHAR_CARRIAGE_RETURN = 13;
  var CHAR_LINE_FEED = 10;
  var CHAR_FORM_FEED = 12;
  var CHAR_NO_BREAK_SPACE = 160;
  var CHAR_ZERO_WIDTH_NOBREAK_SPACE = 65279;
  var CHAR_HASH = 35;
  var CHAR_FORWARD_SLASH = 47;
  var CHAR_LEFT_SQUARE_BRACKET = 91;
  var CHAR_RIGHT_SQUARE_BRACKET = 93;
  var CHAR_LEFT_ANGLE_BRACKET = 60;
  var CHAR_RIGHT_ANGLE_BRACKET = 62;
  var CHAR_LEFT_CURLY_BRACKET = 123;
  var CHAR_RIGHT_CURLY_BRACKET = 125;
  var CHAR_QUESTION_MARK = 63;
  var CHAR_LOWERCASE_A = 97;
  var CHAR_LOWERCASE_Z = 122;
  var CHAR_UPPERCASE_A = 65;
  var CHAR_UPPERCASE_Z = 90;
  var CHAR_DOT = 46;
  var CHAR_0 = 48;
  var CHAR_9 = 57;
  var CHAR_HYPHEN_MINUS = 45;
  var CHAR_PLUS = 43;
  var CHAR_UNDERSCORE = 95;
  var CHAR_DOUBLE_QUOTE = 34;
  var CHAR_SINGLE_QUOTE = 39;
  var CHAR_PERCENT = 37;
  var CHAR_SEMICOLON = 59;
  var CHAR_BACKWARD_SLASH = 92;
  var CHAR_CIRCUMFLEX_ACCENT = 94;
  var CHAR_GRAVE_ACCENT = 96;
  var CHAR_VERTICAL_LINE = 124;
  var CHAR_AT = 64;
  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url instanceof Url)
      return url;
    const urlObject = new Url();
    urlObject.parse(url, parseQueryString, slashesDenoteHost);
    return urlObject;
  }
  function isIpv6Hostname(hostname) {
    return hostname.charCodeAt(0) === CHAR_LEFT_SQUARE_BRACKET && hostname.charCodeAt(hostname.length - 1) === CHAR_RIGHT_SQUARE_BRACKET;
  }
  var forbiddenHostChars = /[\t\n\r #%/:<>?@[\\\]^|]/;
  Url.prototype.parse = function parse2(url, parseQueryString, slashesDenoteHost) {
    let hasHash = false;
    let start = -1;
    let end = -1;
    let rest = "";
    let lastPos = 0;
    for (let i = 0, inWs = false, split = false; i < url.length; ++i) {
      const code = url.charCodeAt(i);
      const isWs = code === CHAR_SPACE || code === CHAR_TAB || code === CHAR_CARRIAGE_RETURN || code === CHAR_LINE_FEED || code === CHAR_FORM_FEED || code === CHAR_NO_BREAK_SPACE || code === CHAR_ZERO_WIDTH_NOBREAK_SPACE;
      if (start === -1) {
        if (isWs)
          continue;
        lastPos = start = i;
      } else if (inWs) {
        if (!isWs) {
          end = -1;
          inWs = false;
        }
      } else if (isWs) {
        end = i;
        inWs = true;
      }
      if (!split) {
        switch (code) {
          case CHAR_HASH:
            hasHash = true;
          case CHAR_QUESTION_MARK:
            split = true;
            break;
          case CHAR_BACKWARD_SLASH:
            if (i - lastPos > 0)
              rest += url.slice(lastPos, i);
            rest += "/";
            lastPos = i + 1;
            break;
        }
      } else if (!hasHash && code === CHAR_HASH) {
        hasHash = true;
      }
    }
    if (start !== -1) {
      if (lastPos === start) {
        if (end === -1) {
          if (start === 0)
            rest = url;
          else
            rest = url.slice(start);
        } else {
          rest = url.slice(start, end);
        }
      } else if (end === -1 && lastPos < url.length) {
        rest += url.slice(lastPos);
      } else if (end !== -1 && lastPos < end) {
        rest += url.slice(lastPos, end);
      }
    }
    if (!slashesDenoteHost && !hasHash) {
      const simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
          if (parseQueryString) {
            this.query = querystring_default.parse(this.search.slice(1));
          } else {
            this.query = this.search.slice(1);
          }
        } else if (parseQueryString) {
          this.search = null;
          this.query = /* @__PURE__ */ Object.create(null);
        }
        return this;
      }
    }
    let proto = protocolPattern.exec(rest);
    let lowerProto;
    if (proto) {
      proto = proto[0];
      lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.slice(proto.length);
    }
    let slashes;
    if (slashesDenoteHost || proto || hostPattern.test(rest)) {
      slashes = rest.charCodeAt(0) === CHAR_FORWARD_SLASH && rest.charCodeAt(1) === CHAR_FORWARD_SLASH;
      if (slashes && !(proto && hostlessProtocol.has(lowerProto))) {
        rest = rest.slice(2);
        this.slashes = true;
      }
    }
    if (!hostlessProtocol.has(lowerProto) && (slashes || proto && !slashedProtocol.has(proto))) {
      let hostEnd = -1;
      let atSign = -1;
      let nonHost = -1;
      for (let i = 0; i < rest.length; ++i) {
        switch (rest.charCodeAt(i)) {
          case CHAR_TAB:
          case CHAR_LINE_FEED:
          case CHAR_CARRIAGE_RETURN:
          case CHAR_SPACE:
          case CHAR_DOUBLE_QUOTE:
          case CHAR_PERCENT:
          case CHAR_SINGLE_QUOTE:
          case CHAR_SEMICOLON:
          case CHAR_LEFT_ANGLE_BRACKET:
          case CHAR_RIGHT_ANGLE_BRACKET:
          case CHAR_BACKWARD_SLASH:
          case CHAR_CIRCUMFLEX_ACCENT:
          case CHAR_GRAVE_ACCENT:
          case CHAR_LEFT_CURLY_BRACKET:
          case CHAR_VERTICAL_LINE:
          case CHAR_RIGHT_CURLY_BRACKET:
            if (nonHost === -1)
              nonHost = i;
            break;
          case CHAR_HASH:
          case CHAR_FORWARD_SLASH:
          case CHAR_QUESTION_MARK:
            if (nonHost === -1)
              nonHost = i;
            hostEnd = i;
            break;
          case CHAR_AT:
            atSign = i;
            nonHost = -1;
            break;
        }
        if (hostEnd !== -1)
          break;
      }
      start = 0;
      if (atSign !== -1) {
        this.auth = decodeURIComponent(rest.slice(0, atSign));
        start = atSign + 1;
      }
      if (nonHost === -1) {
        this.host = rest.slice(start);
        rest = "";
      } else {
        this.host = rest.slice(start, nonHost);
        rest = rest.slice(nonHost);
      }
      this.parseHost();
      if (typeof this.hostname !== "string")
        this.hostname = "";
      const hostname = this.hostname;
      const ipv6Hostname = isIpv6Hostname(hostname);
      if (!ipv6Hostname) {
        rest = getHostname(this, rest, hostname);
      }
      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = "";
      } else {
        this.hostname = this.hostname.toLowerCase();
      }
      if (!ipv6Hostname && this.hostname !== "") {
        this.hostname = toASCII(this.hostname, true);
        if (this.hostname === "" || forbiddenHostChars.test(this.hostname)) {
          throw new Error("invalid URL");
        }
      }
      const p = this.port ? ":" + this.port : "";
      const h = this.hostname || "";
      this.host = h + p;
      if (ipv6Hostname) {
        this.hostname = this.hostname.slice(1, -1);
        if (rest[0] !== "/") {
          rest = "/" + rest;
        }
      }
    }
    if (!unsafeProtocol.has(lowerProto)) {
      rest = autoEscapeStr(rest);
    }
    let questionIdx = -1;
    let hashIdx = -1;
    for (let i = 0; i < rest.length; ++i) {
      const code = rest.charCodeAt(i);
      if (code === CHAR_HASH) {
        this.hash = rest.slice(i);
        hashIdx = i;
        break;
      } else if (code === CHAR_QUESTION_MARK && questionIdx === -1) {
        questionIdx = i;
      }
    }
    if (questionIdx !== -1) {
      if (hashIdx === -1) {
        this.search = rest.slice(questionIdx);
        this.query = rest.slice(questionIdx + 1);
      } else {
        this.search = rest.slice(questionIdx, hashIdx);
        this.query = rest.slice(questionIdx + 1, hashIdx);
      }
      if (parseQueryString) {
        this.query = querystring_default.parse(this.query);
      }
    } else if (parseQueryString) {
      this.search = null;
      this.query = /* @__PURE__ */ Object.create(null);
    }
    const useQuestionIdx = questionIdx !== -1 && (hashIdx === -1 || questionIdx < hashIdx);
    const firstIdx = useQuestionIdx ? questionIdx : hashIdx;
    if (firstIdx === -1) {
      if (rest.length > 0)
        this.pathname = rest;
    } else if (firstIdx > 0) {
      this.pathname = rest.slice(0, firstIdx);
    }
    if (slashedProtocol.has(lowerProto) && this.hostname && !this.pathname) {
      this.pathname = "/";
    }
    if (this.pathname || this.search) {
      const p = this.pathname || "";
      const s = this.search || "";
      this.path = p + s;
    }
    this.href = this.format();
    return this;
  };
  function getHostname(self, rest, hostname) {
    for (let i = 0; i < hostname.length; ++i) {
      const code = hostname.charCodeAt(i);
      const isValid = code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z || code === CHAR_DOT || code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z || code >= CHAR_0 && code <= CHAR_9 || code === CHAR_HYPHEN_MINUS || code === CHAR_PLUS || code === CHAR_UNDERSCORE || code > 127;
      if (!isValid) {
        self.hostname = hostname.slice(0, i);
        return `/${hostname.slice(i)}${rest}`;
      }
    }
    return rest;
  }
  var escapedCodes = [
    /* 0 - 9 */
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%09",
    /* 10 - 19 */
    "%0A",
    "",
    "",
    "%0D",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 20 - 29 */
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 30 - 39 */
    "",
    "",
    "%20",
    "",
    "%22",
    "",
    "",
    "",
    "",
    "%27",
    /* 40 - 49 */
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 50 - 59 */
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 60 - 69 */
    "%3C",
    "",
    "%3E",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 70 - 79 */
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 80 - 89 */
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 90 - 99 */
    "",
    "",
    "%5C",
    "",
    "%5E",
    "",
    "%60",
    "",
    "",
    "",
    /* 100 - 109 */
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 110 - 119 */
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    /* 120 - 125 */
    "",
    "",
    "",
    "%7B",
    "%7C",
    "%7D"
  ];
  function autoEscapeStr(rest) {
    let escaped = "";
    let lastEscapedPos = 0;
    for (let i = 0; i < rest.length; ++i) {
      const escapedChar = escapedCodes[rest.charCodeAt(i)];
      if (escapedChar) {
        if (i > lastEscapedPos)
          escaped += rest.slice(lastEscapedPos, i);
        escaped += escapedChar;
        lastEscapedPos = i + 1;
      }
    }
    if (lastEscapedPos === 0)
      return rest;
    if (lastEscapedPos < rest.length)
      escaped += rest.slice(lastEscapedPos);
    return escaped;
  }
  function urlFormat(urlObject, options) {
    if (typeof urlObject === "string") {
      urlObject = urlParse(urlObject);
    } else if (typeof urlObject !== "object" || urlObject === null) {
      throw new Error("invalid argument type");
    } else if (!(urlObject instanceof Url)) {
      return Url.prototype.format.call(urlObject);
    }
    return urlObject.format();
  }
  var noEscapeAuth = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    // 0x00 - 0x0F
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    // 0x10 - 0x1F
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    // 0x20 - 0x2F
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    // 0x30 - 0x3F
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 0x40 - 0x4F
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    // 0x50 - 0x5F
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    // 0x60 - 0x6F
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
    // 0x70 - 0x7F
  ]);
  Url.prototype.format = function format2() {
    let auth = this.auth || "";
    if (auth) {
      auth = encodeStr(auth, noEscapeAuth, hexTable);
      auth += "@";
    }
    let protocol = this.protocol || "";
    let pathname = this.pathname || "";
    let hash = this.hash || "";
    let host = "";
    let query = "";
    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.includes(":") && !isIpv6Hostname(this.hostname) ? "[" + this.hostname + "]" : this.hostname);
      if (this.port) {
        host += ":" + this.port;
      }
    }
    if (this.query !== null && typeof this.query === "object") {
      query = querystring_default.stringify(this.query);
    }
    let search2 = this.search || query && "?" + query || "";
    if (protocol && protocol.charCodeAt(protocol.length - 1) !== 58)
      protocol += ":";
    let newPathname = "";
    let lastPos = 0;
    for (let i = 0; i < pathname.length; ++i) {
      switch (pathname.charCodeAt(i)) {
        case CHAR_HASH:
          if (i - lastPos > 0)
            newPathname += pathname.slice(lastPos, i);
          newPathname += "%23";
          lastPos = i + 1;
          break;
        case CHAR_QUESTION_MARK:
          if (i - lastPos > 0)
            newPathname += pathname.slice(lastPos, i);
          newPathname += "%3F";
          lastPos = i + 1;
          break;
      }
    }
    if (lastPos > 0) {
      if (lastPos !== pathname.length)
        pathname = newPathname + pathname.slice(lastPos);
      else
        pathname = newPathname;
    }
    if (this.slashes || slashedProtocol.has(protocol)) {
      if (this.slashes || host) {
        if (pathname && pathname.charCodeAt(0) !== CHAR_FORWARD_SLASH)
          pathname = "/" + pathname;
        host = "//" + host;
      } else if (protocol.length >= 4 && protocol.charCodeAt(0) === 102 && protocol.charCodeAt(1) === 105 && protocol.charCodeAt(2) === 108 && protocol.charCodeAt(3) === 101) {
        host = "//";
      }
    }
    search2 = search2.replace(/#/g, "%23");
    if (hash && hash.charCodeAt(0) !== CHAR_HASH)
      hash = "#" + hash;
    if (search2 && search2.charCodeAt(0) !== CHAR_QUESTION_MARK)
      search2 = "?" + search2;
    return protocol + host + pathname + search2 + hash;
  };
  function urlResolve(source, relative2) {
    return urlParse(source, false, true).resolve(relative2);
  }
  Url.prototype.resolve = function resolve(relative2) {
    return this.resolveObject(urlParse(relative2, false, true)).format();
  };
  function urlResolveObject(source, relative2) {
    if (!source)
      return relative2;
    return urlParse(source, false, true).resolveObject(relative2);
  }
  Url.prototype.resolveObject = function resolveObject(relative2) {
    if (typeof relative2 === "string") {
      const rel = new Url();
      rel.parse(relative2, false, true);
      relative2 = rel;
    }
    const result = new Url();
    const tkeys = Object.keys(this);
    for (let tk = 0; tk < tkeys.length; tk++) {
      const tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }
    result.hash = relative2.hash;
    if (relative2.href === "") {
      result.href = result.format();
      return result;
    }
    if (relative2.slashes && !relative2.protocol) {
      const rkeys = Object.keys(relative2);
      for (let rk = 0; rk < rkeys.length; rk++) {
        const rkey = rkeys[rk];
        if (rkey !== "protocol")
          result[rkey] = relative2[rkey];
      }
      if (slashedProtocol.has(result.protocol) && result.hostname && !result.pathname) {
        result.path = result.pathname = "/";
      }
      result.href = result.format();
      return result;
    }
    if (relative2.protocol && relative2.protocol !== result.protocol) {
      if (!slashedProtocol.has(relative2.protocol)) {
        const keys = Object.keys(relative2);
        for (let v = 0; v < keys.length; v++) {
          const k = keys[v];
          result[k] = relative2[k];
        }
        result.href = result.format();
        return result;
      }
      result.protocol = relative2.protocol;
      if (!relative2.host && !/^file:?$/.test(relative2.protocol) && !hostlessProtocol.has(relative2.protocol)) {
        const relPath2 = (relative2.pathname || "").split("/");
        while (relPath2.length && !(relative2.host = relPath2.shift()))
          ;
        if (!relative2.host)
          relative2.host = "";
        if (!relative2.hostname)
          relative2.hostname = "";
        if (relPath2[0] !== "")
          relPath2.unshift("");
        if (relPath2.length < 2)
          relPath2.unshift("");
        result.pathname = relPath2.join("/");
      } else {
        result.pathname = relative2.pathname;
      }
      result.search = relative2.search;
      result.query = relative2.query;
      result.host = relative2.host || "";
      result.auth = relative2.auth;
      result.hostname = relative2.hostname || relative2.host;
      result.port = relative2.port;
      if (result.pathname || result.search) {
        const p = result.pathname || "";
        const s = result.search || "";
        result.path = p + s;
      }
      result.slashes = result.slashes || relative2.slashes;
      result.href = result.format();
      return result;
    }
    const isSourceAbs = result.pathname && result.pathname.charAt(0) === "/";
    const isRelAbs = relative2.host || relative2.pathname && relative2.pathname.charAt(0) === "/";
    let mustEndAbs = isRelAbs || isSourceAbs || result.host && relative2.pathname;
    const removeAllDots = mustEndAbs;
    let srcPath = result.pathname && result.pathname.split("/") || [];
    const relPath = relative2.pathname && relative2.pathname.split("/") || [];
    const noLeadingSlashes = result.protocol && !slashedProtocol.has(result.protocol);
    if (noLeadingSlashes) {
      result.hostname = "";
      result.port = null;
      if (result.host) {
        if (srcPath[0] === "")
          srcPath[0] = result.host;
        else
          srcPath.unshift(result.host);
      }
      result.host = "";
      if (relative2.protocol) {
        relative2.hostname = null;
        relative2.port = null;
        result.auth = null;
        if (relative2.host) {
          if (relPath[0] === "")
            relPath[0] = relative2.host;
          else
            relPath.unshift(relative2.host);
        }
        relative2.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
    }
    if (isRelAbs) {
      if (relative2.host || relative2.host === "") {
        if (result.host !== relative2.host)
          result.auth = null;
        result.host = relative2.host;
        result.port = relative2.port;
      }
      if (relative2.hostname || relative2.hostname === "") {
        if (result.hostname !== relative2.hostname)
          result.auth = null;
        result.hostname = relative2.hostname;
      }
      result.search = relative2.search;
      result.query = relative2.query;
      srcPath = relPath;
    } else if (relPath.length) {
      if (!srcPath)
        srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative2.search;
      result.query = relative2.query;
    } else if (relative2.search !== null && relative2.search !== void 0) {
      if (noLeadingSlashes) {
        result.hostname = result.host = srcPath.shift();
        const authInHost = result.host && result.host.indexOf("@") > 0 && result.host.split("@");
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative2.search;
      result.query = relative2.query;
      if (result.pathname !== null || result.search !== null) {
        result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
      }
      result.href = result.format();
      return result;
    }
    if (!srcPath.length) {
      result.pathname = null;
      if (result.search) {
        result.path = "/" + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }
    let last = srcPath.slice(-1)[0];
    const hasTrailingSlash = (result.host || relative2.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
    let up = 0;
    for (let i = srcPath.length - 1; i >= 0; i--) {
      last = srcPath[i];
      if (last === ".") {
        spliceOne2(srcPath, i);
      } else if (last === "..") {
        spliceOne2(srcPath, i);
        up++;
      } else if (up) {
        spliceOne2(srcPath, i);
        up--;
      }
    }
    if (!mustEndAbs && !removeAllDots) {
      while (up--) {
        srcPath.unshift("..");
      }
    }
    if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
      srcPath.unshift("");
    }
    if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
      srcPath.push("");
    }
    const isAbsolute2 = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
    if (noLeadingSlashes) {
      result.hostname = result.host = isAbsolute2 ? "" : srcPath.length ? srcPath.shift() : "";
      const authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    mustEndAbs = mustEndAbs || result.host && srcPath.length;
    if (mustEndAbs && !isAbsolute2) {
      srcPath.unshift("");
    }
    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join("/");
    }
    if (result.pathname !== null || result.search !== null) {
      result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
    }
    result.auth = relative2.auth || result.auth;
    result.slashes = result.slashes || relative2.slashes;
    result.href = result.format();
    return result;
  };
  Url.prototype.parseHost = function parseHost() {
    let host = this.host;
    let port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ":") {
        this.port = port.slice(1);
      }
      host = host.slice(0, host.length - port.length);
    }
    if (host)
      this.hostname = host;
  };
  function spliceOne2(list2, index) {
    for (; index + 1 < list2.length; index++)
      list2[index] = list2[index + 1];
    list2.pop();
  }
  var url_default = {
    Url,
    parse: urlParse,
    resolve: urlResolve,
    resolveObject: urlResolveObject,
    format: urlFormat
  };

  // script/node_modules/@frida/http/lib/_http_client.js
  init_util();
  function ClientRequest(options, cb) {
    var self = this;
    OutgoingMessage.call(self);
    if (typeof options === "string") {
      options = url_default.parse(options);
      if (!options.hostname) {
        throw new Error("Unable to determine the domain name");
      }
    } else {
      options = util_default._extend({}, options);
    }
    var agent = options.agent;
    var defaultAgent = options._defaultAgent || globalAgent;
    if (agent === false) {
      agent = new defaultAgent.constructor();
    } else if ((agent === null || agent === void 0) && typeof options.createConnection !== "function") {
      agent = defaultAgent;
    }
    self.agent = agent;
    var protocol = options.protocol || defaultAgent.protocol;
    var expectedProtocol = defaultAgent.protocol;
    if (self.agent && self.agent.protocol)
      expectedProtocol = self.agent.protocol;
    if (options.path && / /.test(options.path)) {
      throw new TypeError("Request path contains unescaped characters");
    } else if (protocol !== expectedProtocol) {
      throw new Error('Protocol "' + protocol + '" not supported. Expected "' + expectedProtocol + '"');
    }
    const defaultPort = options.defaultPort || self.agent && self.agent.defaultPort;
    var port = options.port = options.port || defaultPort || 80;
    var host = options.host = options.hostname || options.host || "localhost";
    if (options.setHost === void 0) {
      var setHost = true;
    }
    self.socketPath = options.socketPath;
    self.timeout = options.timeout;
    var method = self.method = (options.method || "GET").toUpperCase();
    if (!checkIsHttpToken(method)) {
      throw new TypeError("Method must be a valid HTTP token");
    }
    self.path = options.path || "/";
    if (cb) {
      self.once("response", cb);
    }
    if (!Array.isArray(options.headers)) {
      if (options.headers) {
        var keys = Object.keys(options.headers);
        for (var i = 0, l = keys.length; i < l; i++) {
          var key = keys[i];
          self.setHeader(key, options.headers[key]);
        }
      }
      if (host && !this.getHeader("host") && setHost) {
        var hostHeader = host;
        var posColon = -1;
        if (-1 !== (posColon = hostHeader.indexOf(":")) && -1 !== (posColon = hostHeader.indexOf(":", posColon)) && "[" !== hostHeader[0]) {
          hostHeader = `[${hostHeader}]`;
        }
        if (port && +port !== defaultPort) {
          hostHeader += ":" + port;
        }
        this.setHeader("Host", hostHeader);
      }
    }
    if (options.auth && !this.getHeader("Authorization")) {
      this.setHeader("Authorization", "Basic " + Buffer2.from(options.auth).toString("base64"));
    }
    if (method === "GET" || method === "HEAD" || method === "DELETE" || method === "OPTIONS" || method === "CONNECT") {
      self.useChunkedEncodingByDefault = false;
    } else {
      self.useChunkedEncodingByDefault = true;
    }
    if (Array.isArray(options.headers)) {
      self._storeHeader(
        self.method + " " + self.path + " HTTP/1.1\r\n",
        options.headers
      );
    } else if (self.getHeader("expect")) {
      self._storeHeader(
        self.method + " " + self.path + " HTTP/1.1\r\n",
        self._renderHeaders()
      );
    }
    var called = false;
    if (self.socketPath) {
      self._last = true;
      self.shouldKeepAlive = false;
      const optionsPath = {
        path: self.socketPath,
        timeout: self.timeout
      };
      const newSocket = self.agent.createConnection(optionsPath, oncreate);
      if (newSocket && !called) {
        called = true;
        self.onSocket(newSocket);
      } else {
        return;
      }
    } else if (self.agent) {
      if (!self.agent.keepAlive && !Number.isFinite(self.agent.maxSockets)) {
        self._last = true;
        self.shouldKeepAlive = false;
      } else {
        self._last = false;
        self.shouldKeepAlive = true;
      }
      self.agent.addRequest(self, options);
    } else {
      self._last = true;
      self.shouldKeepAlive = false;
      if (typeof options.createConnection === "function") {
        const newSocket = options.createConnection(options, oncreate);
        if (newSocket && !called) {
          called = true;
          self.onSocket(newSocket);
        } else {
          return;
        }
      } else {
        self.onSocket(net_default.createConnection(options));
      }
    }
    function oncreate(err, socket) {
      if (called)
        return;
      called = true;
      if (err) {
        process_default.nextTick(function() {
          self.emit("error", err);
        });
        return;
      }
      self.onSocket(socket);
      self._deferToConnect(null, null, function() {
        self._flush();
        self = null;
      });
    }
    self._deferToConnect(null, null, function() {
      self._flush();
      self = null;
    });
    this._ended = false;
  }
  util_default.inherits(ClientRequest, OutgoingMessage);
  ClientRequest.prototype.aborted = void 0;
  ClientRequest.prototype._finish = function() {
    OutgoingMessage.prototype._finish.call(this);
  };
  ClientRequest.prototype._implicitHeader = function() {
    this._storeHeader(
      this.method + " " + this.path + " HTTP/1.1\r\n",
      this._renderHeaders()
    );
  };
  ClientRequest.prototype.abort = function() {
    if (this.aborted === void 0) {
      process_default.nextTick(emitAbortNT, this);
    }
    this.aborted = Date.now();
    if (this.res)
      this.res._dump();
    else
      this.once("response", function(res) {
        res._dump();
      });
    if (this.socket) {
      this.socket.destroy();
    }
  };
  function emitAbortNT(self) {
    self.emit("abort");
  }
  function createHangUpError() {
    var error2 = new Error("socket hang up");
    error2.code = "ECONNRESET";
    return error2;
  }
  function socketCloseListener() {
    var socket = this;
    var req = socket._httpMessage;
    socket.read();
    var parser = socket.parser;
    req.emit("close");
    if (req.res && req.res.readable) {
      req.res.emit("aborted");
      var res = req.res;
      res.on("end", function() {
        res.emit("close");
      });
      res.push(null);
    } else if (!req.res && !req.socket._hadError) {
      req.emit("error", createHangUpError());
      req.socket._hadError = true;
    }
    if (req.output)
      req.output.length = 0;
    if (req.outputEncodings)
      req.outputEncodings.length = 0;
    if (parser) {
      parser.finish();
      freeParser(parser, req, socket);
    }
  }
  function socketErrorListener(err) {
    var socket = this;
    var req = socket._httpMessage;
    if (req) {
      req.emit("error", err);
      req.socket._hadError = true;
    }
    socket.read();
    var parser = socket.parser;
    if (parser) {
      parser.finish();
      freeParser(parser, req, socket);
    }
    socket.removeListener("data", socketOnData);
    socket.removeListener("end", socketOnEnd);
    socket.destroy();
  }
  function freeSocketErrorListener(err) {
    var socket = this;
    socket.destroy();
    socket.emit("agentRemove");
  }
  function socketOnEnd() {
    var socket = this;
    var req = this._httpMessage;
    var parser = this.parser;
    if (!req.res && !req.socket._hadError) {
      req.emit("error", createHangUpError());
      req.socket._hadError = true;
    }
    if (parser) {
      parser.finish();
      freeParser(parser, req, socket);
    }
    socket.destroy();
  }
  function socketOnData(d) {
    var socket = this;
    var req = this._httpMessage;
    var parser = this.parser;
    var ret = parser.execute(d);
    if (ret instanceof Error) {
      freeParser(parser, req, socket);
      socket.destroy();
      req.emit("error", ret);
      req.socket._hadError = true;
    } else if (parser.incoming && parser.incoming.upgrade) {
      var bytesParsed = ret;
      var res = parser.incoming;
      req.res = res;
      socket.removeListener("data", socketOnData);
      socket.removeListener("end", socketOnEnd);
      parser.finish();
      var bodyHead = d.slice(bytesParsed, d.length);
      var eventName = req.method === "CONNECT" ? "connect" : "upgrade";
      if (req.listenerCount(eventName) > 0) {
        req.upgradeOrConnect = true;
        socket.emit("agentRemove");
        socket.removeListener("close", socketCloseListener);
        socket.removeListener("error", socketErrorListener);
        socket._readableState.flowing = null;
        req.emit(eventName, res, socket, bodyHead);
        req.emit("close");
      } else {
        socket.destroy();
      }
      freeParser(parser, req, socket);
    } else if (parser.incoming && parser.incoming.complete && // When the status code is 100 (Continue), the server will
    // send a final response after this client sends a request
    // body. So, we must not free the parser.
    parser.incoming.statusCode !== 100) {
      socket.removeListener("data", socketOnData);
      socket.removeListener("end", socketOnEnd);
      freeParser(parser, req, socket);
    }
  }
  function parserOnIncomingClient(res, shouldKeepAlive) {
    var socket = this.socket;
    var req = socket._httpMessage;
    if (req.domain && !res.domain) {
      res.domain = req.domain;
    }
    if (req.res) {
      socket.destroy();
      return;
    }
    req.res = res;
    if (req.method === "CONNECT") {
      res.upgrade = true;
      return 2;
    }
    var isHeadResponse = req.method === "HEAD";
    if (res.statusCode === 100) {
      delete req.res;
      req.emit("continue");
      return true;
    }
    if (req.shouldKeepAlive && !shouldKeepAlive && !req.upgradeOrConnect) {
      req.shouldKeepAlive = false;
    }
    req.res = res;
    res.req = req;
    res.on("end", responseOnEnd);
    req.on("prefinish", requestOnPrefinish);
    var handled = req.emit("response", res);
    if (!handled)
      res._dump();
    return isHeadResponse;
  }
  function responseKeepAlive(res, req) {
    var socket = req.socket;
    if (!req.shouldKeepAlive) {
      if (socket.writable) {
        socket.destroySoon();
      }
    } else {
      if (req.timeoutCb) {
        socket.setTimeout(0, req.timeoutCb);
        req.timeoutCb = null;
      }
      socket.removeListener("close", socketCloseListener);
      socket.removeListener("error", socketErrorListener);
      socket.once("error", freeSocketErrorListener);
      process_default.nextTick(emitFreeNT, socket);
    }
  }
  function responseOnEnd() {
    const res = this;
    const req = this.req;
    req._ended = true;
    if (!req.shouldKeepAlive || req.finished)
      responseKeepAlive(res, req);
  }
  function requestOnPrefinish() {
    const req = this;
    const res = this.res;
    if (!req.shouldKeepAlive)
      return;
    if (req._ended)
      responseKeepAlive(res, req);
  }
  function emitFreeNT(socket) {
    socket.emit("free");
  }
  function tickOnSocket(req, socket) {
    var parser = parsers.alloc();
    req.socket = socket;
    req.connection = socket;
    parser.reinitialize(import_http_parser_js.HTTPParser.RESPONSE);
    parser.socket = socket;
    parser.incoming = null;
    parser.outgoing = req;
    req.parser = parser;
    socket.parser = parser;
    socket._httpMessage = req;
    httpSocketSetup(socket);
    if (typeof req.maxHeadersCount === "number") {
      parser.maxHeaderPairs = req.maxHeadersCount << 1;
    } else {
      parser.maxHeaderPairs = 2e3;
    }
    parser.onIncoming = parserOnIncomingClient;
    socket.removeListener("error", freeSocketErrorListener);
    socket.on("error", socketErrorListener);
    socket.on("data", socketOnData);
    socket.on("end", socketOnEnd);
    socket.on("close", socketCloseListener);
    if (req.timeout) {
      socket.once("timeout", () => req.emit("timeout"));
    }
    req.emit("socket", socket);
  }
  ClientRequest.prototype.onSocket = function(socket) {
    process_default.nextTick(onSocketNT, this, socket);
  };
  function onSocketNT(req, socket) {
    if (req.aborted) {
      socket.emit("free");
    } else {
      tickOnSocket(req, socket);
    }
  }
  ClientRequest.prototype._deferToConnect = function(method, arguments_, cb) {
    var self = this;
    function callSocketMethod() {
      if (method)
        self.socket[method].apply(self.socket, arguments_);
      if (typeof cb === "function")
        cb();
    }
    var onSocket = function() {
      if (self.socket.writable) {
        callSocketMethod();
      } else {
        self.socket.once("connect", callSocketMethod);
      }
    };
    if (!self.socket) {
      self.once("socket", onSocket);
    } else {
      onSocket();
    }
  };
  ClientRequest.prototype.setTimeout = function(msecs, callback) {
    if (callback)
      this.once("timeout", callback);
    var self = this;
    function emitTimeout() {
      self.emit("timeout");
    }
    if (this.socket && this.socket.writable) {
      if (this.timeoutCb)
        this.socket.setTimeout(0, this.timeoutCb);
      this.timeoutCb = emitTimeout;
      this.socket.setTimeout(msecs, emitTimeout);
      return this;
    }
    this.timeoutCb = emitTimeout;
    if (this.socket) {
      var sock = this.socket;
      this.socket.once("connect", function() {
        sock.setTimeout(msecs, emitTimeout);
      });
      return this;
    }
    this.once("socket", function(sock2) {
      sock2.setTimeout(msecs, emitTimeout);
    });
    return this;
  };
  ClientRequest.prototype.setNoDelay = function() {
    const argsLen = arguments.length;
    const args = new Array(argsLen);
    for (var i = 0; i < argsLen; i++)
      args[i] = arguments[i];
    this._deferToConnect("setNoDelay", args);
  };
  ClientRequest.prototype.setSocketKeepAlive = function() {
    const argsLen = arguments.length;
    const args = new Array(argsLen);
    for (var i = 0; i < argsLen; i++)
      args[i] = arguments[i];
    this._deferToConnect("setKeepAlive", args);
  };
  ClientRequest.prototype.clearTimeout = function(cb) {
    this.setTimeout(0, cb);
  };

  // script/node_modules/@frida/http/lib/_http_server.js
  init_util();
  var STATUS_CODES = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    // RFC 2518, obsoleted by RFC 4918
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    // RFC 4918
    208: "Already Reported",
    226: "IM Used",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    // RFC 7238
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    // RFC 2324
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    // RFC 4918
    423: "Locked",
    // RFC 4918
    424: "Failed Dependency",
    // RFC 4918
    425: "Unordered Collection",
    // RFC 4918
    426: "Upgrade Required",
    // RFC 2817
    428: "Precondition Required",
    // RFC 6585
    429: "Too Many Requests",
    // RFC 6585
    431: "Request Header Fields Too Large",
    // RFC 6585
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    // RFC 2295
    507: "Insufficient Storage",
    // RFC 4918
    508: "Loop Detected",
    509: "Bandwidth Limit Exceeded",
    510: "Not Extended",
    // RFC 2774
    511: "Network Authentication Required"
    // RFC 6585
  };
  var kOnExecute2 = import_http_parser_js.HTTPParser.kOnExecute | 0;
  function ServerResponse(req) {
    OutgoingMessage.call(this);
    if (req.method === "HEAD")
      this._hasBody = false;
    this.sendDate = true;
    if (req.httpVersionMajor < 1 || req.httpVersionMinor < 1) {
      this.useChunkedEncodingByDefault = chunkExpression.test(req.headers.te);
      this.shouldKeepAlive = false;
    }
  }
  util_default.inherits(ServerResponse, OutgoingMessage);
  ServerResponse.prototype._finish = function() {
    OutgoingMessage.prototype._finish.call(this);
  };
  ServerResponse.prototype.statusCode = 200;
  ServerResponse.prototype.statusMessage = void 0;
  function onServerResponseClose() {
    if (this._httpMessage)
      this._httpMessage.emit("close");
  }
  ServerResponse.prototype.assignSocket = function(socket) {
    socket._httpMessage = this;
    socket.on("close", onServerResponseClose);
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  };
  ServerResponse.prototype.detachSocket = function(socket) {
    socket.removeListener("close", onServerResponseClose);
    socket._httpMessage = null;
    this.socket = this.connection = null;
  };
  ServerResponse.prototype.writeContinue = function(cb) {
    this._writeRaw("HTTP/1.1 100 Continue" + CRLF + CRLF, "ascii", cb);
    this._sent100 = true;
  };
  ServerResponse.prototype._implicitHeader = function() {
    this.writeHead(this.statusCode);
  };
  ServerResponse.prototype.writeHead = function(statusCode, reason, obj) {
    var headers;
    if (typeof reason === "string") {
      this.statusMessage = reason;
    } else {
      this.statusMessage = this.statusMessage || STATUS_CODES[statusCode] || "unknown";
      obj = reason;
    }
    this.statusCode = statusCode;
    if (this._headers) {
      if (obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          if (k)
            this.setHeader(k, obj[k]);
        }
      }
      headers = this._renderHeaders();
    } else {
      headers = obj;
    }
    statusCode |= 0;
    if (statusCode < 100 || statusCode > 999)
      throw new RangeError(`Invalid status code: ${statusCode}`);
    if (checkInvalidHeaderChar(this.statusMessage))
      throw new Error("Invalid character in statusMessage.");
    var statusLine = "HTTP/1.1 " + statusCode.toString() + " " + this.statusMessage + CRLF;
    if (statusCode === 204 || statusCode === 304 || 100 <= statusCode && statusCode <= 199) {
      this._hasBody = false;
    }
    if (this._expect_continue && !this._sent100) {
      this.shouldKeepAlive = false;
    }
    this._storeHeader(statusLine, headers);
  };
  ServerResponse.prototype.writeHeader = function() {
    this.writeHead.apply(this, arguments);
  };
  function Server2(requestListener) {
    if (!(this instanceof Server2))
      return new Server2(requestListener);
    net_default.Server.call(this, { allowHalfOpen: true });
    if (requestListener) {
      this.addListener("request", requestListener);
    }
    this.httpAllowHalfOpen = false;
    this.addListener("connection", _connectionListener);
    this.timeout = 2 * 60 * 1e3;
    this._pendingResponseData = 0;
  }
  util_default.inherits(Server2, net_default.Server);
  Server2.prototype.setTimeout = function(msecs, callback) {
    this.timeout = msecs;
    if (callback)
      this.on("timeout", callback);
    return this;
  };
  function _connectionListener(socket) {
    var self = this;
    var outgoing = [];
    var incoming = [];
    var outgoingData = 0;
    function updateOutgoingData(delta) {
      outgoingData += delta;
      if (socket._paused && outgoingData < socket._writableState.highWaterMark)
        return socketOnDrain();
    }
    function abortIncoming() {
      while (incoming.length) {
        var req = incoming.shift();
        req.emit("aborted");
        req.emit("close");
      }
    }
    function serverSocketCloseListener() {
      if (this.parser) {
        freeParser(this.parser, null, this);
      }
      abortIncoming();
    }
    httpSocketSetup(socket);
    if (self.timeout)
      socket.setTimeout(self.timeout);
    socket.on("timeout", function() {
      var req = socket.parser && socket.parser.incoming;
      var reqTimeout = req && !req.complete && req.emit("timeout", socket);
      var res = socket._httpMessage;
      var resTimeout = res && res.emit("timeout", socket);
      var serverTimeout = self.emit("timeout", socket);
      if (!reqTimeout && !resTimeout && !serverTimeout)
        socket.destroy();
    });
    var parser = parsers.alloc();
    parser.reinitialize(import_http_parser_js.HTTPParser.REQUEST);
    parser.socket = socket;
    socket.parser = parser;
    parser.incoming = null;
    if (typeof this.maxHeadersCount === "number") {
      parser.maxHeaderPairs = this.maxHeadersCount << 1;
    } else {
      parser.maxHeaderPairs = 2e3;
    }
    socket.addListener("error", socketOnError);
    socket.addListener("close", serverSocketCloseListener);
    parser.onIncoming = parserOnIncoming;
    socket.on("end", socketOnEnd2);
    socket.on("data", socketOnData2);
    socket.on("resume", onSocketResume);
    socket.on("pause", onSocketPause);
    socket.on("drain", socketOnDrain);
    socket.on = socketOnWrap;
    parser[kOnExecute2] = onParserExecute;
    function socketOnError(e) {
      this.removeListener("error", socketOnError);
      this.on("error", () => {
      });
      if (!self.emit("clientError", e, this))
        this.destroy(e);
    }
    function socketOnData2(d) {
      var ret = parser.execute(d);
      onParserExecuteCommon(ret, d);
    }
    function onParserExecute(ret, d) {
      socket._unrefTimer();
      onParserExecuteCommon(ret, void 0);
    }
    function onParserExecuteCommon(ret, d) {
      if (ret instanceof Error) {
        socketOnError.call(socket, ret);
      } else if (parser.incoming && parser.incoming.upgrade) {
        var bytesParsed = ret;
        var req = parser.incoming;
        if (!d)
          d = parser.getCurrentBuffer();
        socket.removeListener("data", socketOnData2);
        socket.removeListener("end", socketOnEnd2);
        socket.removeListener("close", serverSocketCloseListener);
        parser.finish();
        freeParser(parser, req, null);
        parser = null;
        var eventName = req.method === "CONNECT" ? "connect" : "upgrade";
        if (self.listenerCount(eventName) > 0) {
          var bodyHead = d.slice(bytesParsed, d.length);
          socket._readableState.flowing = null;
          self.emit(eventName, req, socket, bodyHead);
        } else {
          socket.destroy();
        }
      }
      if (socket._paused && socket.parser) {
        socket.parser.pause();
      }
    }
    function socketOnEnd2() {
      var socket2 = this;
      var ret = parser.finish();
      if (ret instanceof Error) {
        socketOnError.call(socket2, ret);
        return;
      }
      if (!self.httpAllowHalfOpen) {
        abortIncoming();
        if (socket2.writable)
          socket2.end();
      } else if (outgoing.length) {
        outgoing[outgoing.length - 1]._last = true;
      } else if (socket2._httpMessage) {
        socket2._httpMessage._last = true;
      } else {
        if (socket2.writable)
          socket2.end();
      }
    }
    socket._paused = false;
    function socketOnDrain() {
      var needPause = outgoingData > socket._writableState.highWaterMark;
      if (socket._paused && !needPause) {
        socket._paused = false;
        if (socket.parser)
          socket.parser.resume();
        socket.resume();
      }
    }
    function parserOnIncoming(req, shouldKeepAlive) {
      incoming.push(req);
      if (!socket._paused) {
        var needPause = socket._writableState.needDrain || outgoingData >= socket._writableState.highWaterMark;
        if (needPause) {
          socket._paused = true;
          socket.pause();
        }
      }
      var res = new ServerResponse(req);
      res._onPendingData = updateOutgoingData;
      res.shouldKeepAlive = shouldKeepAlive;
      if (socket._httpMessage) {
        outgoing.push(res);
      } else {
        res.assignSocket(socket);
      }
      res.on("finish", resOnFinish);
      function resOnFinish() {
        incoming.shift();
        if (!req._consuming && !req._readableState.resumeScheduled)
          req._dump();
        res.detachSocket(socket);
        if (res._last) {
          socket.destroySoon();
        } else {
          var m = outgoing.shift();
          if (m) {
            m.assignSocket(socket);
          }
        }
      }
      if (req.headers.expect !== void 0 && (req.httpVersionMajor == 1 && req.httpVersionMinor == 1)) {
        if (continueExpression.test(req.headers.expect)) {
          res._expect_continue = true;
          if (self.listenerCount("checkContinue") > 0) {
            self.emit("checkContinue", req, res);
          } else {
            res.writeContinue();
            self.emit("request", req, res);
          }
        } else {
          if (self.listenerCount("checkExpectation") > 0) {
            self.emit("checkExpectation", req, res);
          } else {
            res.writeHead(417);
            res.end();
          }
        }
      } else {
        self.emit("request", req, res);
      }
      return false;
    }
  }
  function onSocketResume() {
    if (this._paused) {
      this.pause();
      return;
    }
    if (this._handle && !this._handle.reading) {
      this._handle.reading = true;
      this._handle.readStart();
    }
  }
  function onSocketPause() {
    if (this._handle && this._handle.reading) {
      this._handle.reading = false;
      this._handle.readStop();
    }
  }
  function socketOnWrap(ev, fn) {
    var res = net_default.Socket.prototype.on.call(this, ev, fn);
    if (!this.parser) {
      this.on = net_default.Socket.prototype.on;
      return res;
    }
    return res;
  }

  // script/node_modules/@frida/http/index.js
  var METHODS = methods.slice().sort();
  var http_default = {
    IncomingMessage,
    OutgoingMessage,
    METHODS,
    Agent,
    globalAgent,
    Server: Server2,
    ServerResponse,
    STATUS_CODES,
    _connectionListener,
    createServer: createServer2,
    ClientRequest,
    request,
    get
  };
  function createServer2(requestListener) {
    return new Server2(requestListener);
  }
  function request(options, cb) {
    return new ClientRequest(options, cb);
  }
  function get(options, cb) {
    const req = request(options, cb);
    req.end();
    return req;
  }

  // script/lib/Device.ts
  var Device = class {
    static alert(options) {
      const config2 = typeof options === "string" ? { message: options } : options;
      const handler = new ObjC.Block({
        retType: "void",
        argTypes: ["object"],
        implementation() {
        }
      });
      ObjC.schedule(ObjC.mainQueue, () => {
        const UIApplication = ObjC.classes.UIApplication;
        const UIWindowScene = ObjC.classes.UIWindowScene;
        const UIAlertController = ObjC.classes.UIAlertController;
        const UIAlertAction = ObjC.classes.UIAlertAction;
        const windowScene = UIApplication.sharedApplication().connectedScenes().allObjects().objectAtIndex_(0);
        const keyWindow = windowScene.windows().firstObject();
        let viewController = keyWindow.rootViewController();
        while (viewController.presentedViewController()) {
          viewController = viewController.presentedViewController();
        }
        const alert = UIAlertController.alertControllerWithTitle_message_preferredStyle_(
          config2.title || null,
          config2.message,
          1
        );
        const defaultAction = UIAlertAction.actionWithTitle_style_handler_(
          config2.buttonTitle || "OK",
          config2.style || 0,
          handler
        );
        alert.addAction_(defaultAction);
        viewController.presentViewController_animated_completion_(
          alert,
          true,
          null
        );
      });
    }
    static documents(path) {
      const basePath = ObjC.classes.NSProcessInfo.processInfo().environment().objectForKey_("HOME").toString() + "/Documents/";
      return path ? basePath + path : basePath;
    }
    static getDeviceLanguage() {
      try {
        const NSLocale = ObjC.classes.NSLocale;
        const currentLocale = NSLocale.currentLocale();
        const languageCode = currentLocale.languageCode();
        return languageCode.toString();
      } catch (error2) {
        return "en";
      }
    }
    static getDeviceID() {
      try {
        const Security = Module.load("/System/Library/Frameworks/Security.framework/Security");
        const SecItemCopyMatching = new NativeFunction(
          Module.getExportByName("Security", "SecItemCopyMatching"),
          "int",
          ["pointer", "pointer"]
        );
        const SecItemAdd = new NativeFunction(
          Module.getExportByName("Security", "SecItemAdd"),
          "int",
          ["pointer", "pointer"]
        );
        const SecItemDelete = new NativeFunction(
          Module.getExportByName("Security", "SecItemDelete"),
          "int",
          ["pointer"]
        );
        const searchQuerySync = ObjC.classes.NSMutableDictionary.alloc().init();
        searchQuerySync.setObject_forKey_(ObjC.classes.NSNumber.numberWithBool_(true), "r_Data");
        searchQuerySync.setObject_forKey_("genp", "class");
        searchQuerySync.setObject_forKey_("beatclone", "svce");
        searchQuerySync.setObject_forKey_("deviceID", "acct");
        searchQuerySync.setObject_forKey_(ObjC.classes.NSNumber.numberWithBool_(true), "sync");
        const resultPtr = Memory.alloc(Process.pointerSize);
        Memory.writePointer(resultPtr, NULL);
        const searchStatusSync = SecItemCopyMatching(searchQuerySync, resultPtr);
        if (searchStatusSync === 0) {
          const resultRef = new ObjC.Object(Memory.readPointer(resultPtr));
          Logger_default.log("Using existing iCloud Device ID");
          return ObjC.classes.NSString.alloc().initWithData_encoding_(resultRef, 4).toString();
        }
        const searchQueryLocal = ObjC.classes.NSMutableDictionary.alloc().init();
        searchQueryLocal.setObject_forKey_(ObjC.classes.NSNumber.numberWithBool_(true), "r_Data");
        searchQueryLocal.setObject_forKey_("genp", "class");
        searchQueryLocal.setObject_forKey_("beatclone", "svce");
        searchQueryLocal.setObject_forKey_("deviceID", "acct");
        const localSearchStatus = SecItemCopyMatching(searchQueryLocal, resultPtr);
        if (localSearchStatus === 0) {
          const resultRef = new ObjC.Object(Memory.readPointer(resultPtr));
          const localId = ObjC.classes.NSString.alloc().initWithData_encoding_(resultRef, 4).toString();
          const saveQuery2 = ObjC.classes.NSMutableDictionary.alloc().init();
          saveQuery2.setObject_forKey_("genp", "class");
          saveQuery2.setObject_forKey_("beatclone", "svce");
          saveQuery2.setObject_forKey_("deviceID", "acct");
          saveQuery2.setObject_forKey_(resultRef, "v_Data");
          saveQuery2.setObject_forKey_("ck", "pdmn");
          saveQuery2.setObject_forKey_(ObjC.classes.NSNumber.numberWithBool_(true), "sync");
          const saveStatus = SecItemAdd(saveQuery2, NULL);
          if (saveStatus === 0) {
            SecItemDelete(searchQueryLocal);
            Logger_default.log("Migrated local Device ID to iCloud");
          }
          return localId;
        }
        Logger_default.log("Creating new Device ID");
        const uuid = ObjC.classes.NSUUID.UUID().UUIDString();
        const uuidData = ObjC.classes.NSString.stringWithString_(uuid).dataUsingEncoding_(4);
        const saveQuery = ObjC.classes.NSMutableDictionary.alloc().init();
        saveQuery.setObject_forKey_("genp", "class");
        saveQuery.setObject_forKey_("beatclone", "svce");
        saveQuery.setObject_forKey_("deviceID", "acct");
        saveQuery.setObject_forKey_(uuidData, "v_Data");
        saveQuery.setObject_forKey_("ck", "pdmn");
        saveQuery.setObject_forKey_(ObjC.classes.NSNumber.numberWithBool_(true), "sync");
        SecItemAdd(saveQuery, NULL);
        return uuid;
      } catch (error2) {
        Logger_default.log("[Keychain] Error getting Device ID");
        return "";
      }
    }
  };
  var Device_default = Device;

  // script/lib/Utilities.ts
  var networkRequest = (path, data = {}) => {
    const options = {
      hostname: "143.110.226.4",
      port: 5e3,
      path,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        data: JSON.stringify(data)
      }
    };
    let result = "";
    return new Promise(function(resolve3) {
      try {
        const req = http_default.request(options, (res) => {
          res.on("data", (d) => {
            result += d;
          });
          res.on("end", (d) => {
            resolve3(result);
          });
        });
        req.write(JSON.stringify(data));
        req.end();
      } catch (e) {
      }
    });
  };
  var scoreToMedal = (score, difficulty) => {
    const normal = {
      star_1: 0,
      star_2: 1e4,
      star_3: 17500,
      star_4: 35e3,
      star_5: 47500,
      medal_gold: 48500,
      medal_platinum: 49e3,
      medal_diamond: 49500
    };
    const hard = {
      star_1: 0,
      star_2: 15e3,
      star_3: 37500,
      star_4: 6e4,
      star_5: 71250,
      medal_gold: 72750,
      medal_platinum: 73500,
      medal_diamond: 74250
    };
    const extreme = {
      star_1: 0,
      star_2: 2e4,
      star_3: 5e4,
      star_4: 8e4,
      star_5: 95e3,
      medal_gold: 97e3,
      medal_platinum: 98e3,
      medal_diamond: 99e3
    };
    switch (difficulty) {
      case 1:
        return Object.entries(extreme).reverse().find((el) => el[1] <= score)[0];
      case 3:
        return Object.entries(hard).reverse().find((el) => el[1] <= score)[0];
      default:
        return Object.entries(normal).reverse().find((el) => el[1] <= score)[0];
    }
  };

  // script/utilities/killErrorHandler.ts
  var killErrorHandler = () => {
    const spaceape = Il2Cpp.domain.assembly("SpaceApe.Rpc").image;
    const sharplaModel = Il2Cpp.domain.assembly("SharplaModel").image;
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    Logger_default.log("Killing error handler...");
    spaceape.class("com.spaceape.rpc.RpcServices").method("NotifyErrorAndDisconnectNetwork").implementation = function() {
      Logger_default.log("Killed NotifyErrorAndDisconnectNetwork");
      return;
    };
    sharplaModel.class("com.spaceape.sharpla.rpcs.SharplaCmdAudit").method("Write").implementation = function() {
      Logger_default.log("Killed Write");
      return;
    };
    assembly.class("SharplaToRpcExecuter").method("OnLocalExecutionFailure").implementation = function() {
      Logger_default.log("Killed OnLocalExecutionFailure");
      return;
    };
  };

  // script/hacks/disableChecksum.ts
  function disableChecksum() {
    const assembly = Il2Cpp.domain.assembly("RakshaUnity").image;
    assembly.class("ChecksumCalculator").method("Calc").implementation = function() {
      return Il2Cpp.string("");
    };
  }

  // script/node_modules/@frida/path/index.js
  init_process();
  var CHAR_UPPERCASE_A2 = 65;
  var CHAR_LOWERCASE_A2 = 97;
  var CHAR_UPPERCASE_Z2 = 90;
  var CHAR_LOWERCASE_Z2 = 122;
  var CHAR_DOT2 = 46;
  var CHAR_FORWARD_SLASH2 = 47;
  var CHAR_BACKWARD_SLASH2 = 92;
  var CHAR_COLON = 58;
  var CHAR_QUESTION_MARK2 = 63;
  var platformIsWin32 = process_default.platform === "win32";
  function isPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH2 || code === CHAR_BACKWARD_SLASH2;
  }
  function isPosixPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH2;
  }
  function isWindowsDeviceRoot(code) {
    return code >= CHAR_UPPERCASE_A2 && code <= CHAR_UPPERCASE_Z2 || code >= CHAR_LOWERCASE_A2 && code <= CHAR_LOWERCASE_Z2;
  }
  function normalizeString(path, allowAboveRoot, separator, isPathSeparator2) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code = 0;
    for (let i = 0; i <= path.length; ++i) {
      if (i < path.length)
        code = path.charCodeAt(i);
      else if (isPathSeparator2(code))
        break;
      else
        code = CHAR_FORWARD_SLASH2;
      if (isPathSeparator2(code)) {
        if (lastSlash === i - 1 || dots === 1) {
        } else if (dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== CHAR_DOT2 || res.charCodeAt(res.length - 2) !== CHAR_DOT2) {
            if (res.length > 2) {
              const lastSlashIndex = res.lastIndexOf(separator);
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
              }
              lastSlash = i;
              dots = 0;
              continue;
            } else if (res.length !== 0) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            res += res.length > 0 ? `${separator}..` : "..";
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0)
            res += `${separator}${path.slice(lastSlash + 1, i)}`;
          else
            res = path.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === CHAR_DOT2 && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  function _format(sep2, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base2 = pathObject.base || `${pathObject.name || ""}${pathObject.ext || ""}`;
    if (!dir) {
      return base2;
    }
    return dir === pathObject.root ? `${dir}${base2}` : `${dir}${sep2}${base2}`;
  }
  var _win32 = {
    /**
     * path.resolve([from ...], to)
     * @param {...string} args
     * @returns {string}
     */
    resolve(...args) {
      let resolvedDevice = "";
      let resolvedTail = "";
      let resolvedAbsolute = false;
      for (let i = args.length - 1; i >= -1; i--) {
        let path;
        if (i >= 0) {
          path = args[i];
          if (path.length === 0) {
            continue;
          }
        } else if (resolvedDevice.length === 0) {
          path = process_default.cwd();
        } else {
          path = process_default.env[`=${resolvedDevice}`] || process_default.cwd();
          if (path === void 0 || path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() && path.charCodeAt(2) === CHAR_BACKWARD_SLASH2) {
            path = `${resolvedDevice}\\`;
          }
        }
        const len = path.length;
        let rootEnd = 0;
        let device = "";
        let isAbsolute2 = false;
        const code = path.charCodeAt(0);
        if (len === 1) {
          if (isPathSeparator(code)) {
            rootEnd = 1;
            isAbsolute2 = true;
          }
        } else if (isPathSeparator(code)) {
          isAbsolute2 = true;
          if (isPathSeparator(path.charCodeAt(1))) {
            let j = 2;
            let last = j;
            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              const firstPart = path.slice(last, j);
              last = j;
              while (j < len && isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j < len && j !== last) {
                last = j;
                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                  j++;
                }
                if (j === len || j !== last) {
                  device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                  rootEnd = j;
                }
              }
            }
          } else {
            rootEnd = 1;
          }
        } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
          device = path.slice(0, 2);
          rootEnd = 2;
          if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
            isAbsolute2 = true;
            rootEnd = 3;
          }
        }
        if (device.length > 0) {
          if (resolvedDevice.length > 0) {
            if (device.toLowerCase() !== resolvedDevice.toLowerCase())
              continue;
          } else {
            resolvedDevice = device;
          }
        }
        if (resolvedAbsolute) {
          if (resolvedDevice.length > 0)
            break;
        } else {
          resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
          resolvedAbsolute = isAbsolute2;
          if (isAbsolute2 && resolvedDevice.length > 0) {
            break;
          }
        }
      }
      resolvedTail = normalizeString(
        resolvedTail,
        !resolvedAbsolute,
        "\\",
        isPathSeparator
      );
      return resolvedAbsolute ? `${resolvedDevice}\\${resolvedTail}` : `${resolvedDevice}${resolvedTail}` || ".";
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    normalize(path) {
      const len = path.length;
      if (len === 0)
        return ".";
      let rootEnd = 0;
      let device;
      let isAbsolute2 = false;
      const code = path.charCodeAt(0);
      if (len === 1) {
        return isPosixPathSeparator(code) ? "\\" : path;
      }
      if (isPathSeparator(code)) {
        isAbsolute2 = true;
        if (isPathSeparator(path.charCodeAt(1))) {
          let j = 2;
          let last = j;
          while (j < len && !isPathSeparator(path.charCodeAt(j))) {
            j++;
          }
          if (j < len && j !== last) {
            const firstPart = path.slice(last, j);
            last = j;
            while (j < len && isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              last = j;
              while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j === len) {
                return `\\\\${firstPart}\\${path.slice(last)}\\`;
              }
              if (j !== last) {
                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
        device = path.slice(0, 2);
        rootEnd = 2;
        if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
          isAbsolute2 = true;
          rootEnd = 3;
        }
      }
      let tail = rootEnd < len ? normalizeString(
        path.slice(rootEnd),
        !isAbsolute2,
        "\\",
        isPathSeparator
      ) : "";
      if (tail.length === 0 && !isAbsolute2)
        tail = ".";
      if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1)))
        tail += "\\";
      if (device === void 0) {
        return isAbsolute2 ? `\\${tail}` : tail;
      }
      return isAbsolute2 ? `${device}\\${tail}` : `${device}${tail}`;
    },
    /**
     * @param {string} path
     * @returns {boolean}
     */
    isAbsolute(path) {
      const len = path.length;
      if (len === 0)
        return false;
      const code = path.charCodeAt(0);
      return isPathSeparator(code) || // Possible device root
      len > 2 && isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON && isPathSeparator(path.charCodeAt(2));
    },
    /**
     * @param {...string} args
     * @returns {string}
     */
    join(...args) {
      if (args.length === 0)
        return ".";
      let joined;
      let firstPart;
      for (let i = 0; i < args.length; ++i) {
        const arg = args[i];
        if (arg.length > 0) {
          if (joined === void 0)
            joined = firstPart = arg;
          else
            joined += `\\${arg}`;
        }
      }
      if (joined === void 0)
        return ".";
      let needsReplace = true;
      let slashCount = 0;
      if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1 && isPathSeparator(firstPart.charCodeAt(1))) {
          ++slashCount;
          if (firstLen > 2) {
            if (isPathSeparator(firstPart.charCodeAt(2)))
              ++slashCount;
            else {
              needsReplace = false;
            }
          }
        }
      }
      if (needsReplace) {
        while (slashCount < joined.length && isPathSeparator(joined.charCodeAt(slashCount))) {
          slashCount++;
        }
        if (slashCount >= 2)
          joined = `\\${joined.slice(slashCount)}`;
      }
      return _win32.normalize(joined);
    },
    /**
     * It will solve the relative path from `from` to `to`, for instancee
     * from = 'C:\\orandea\\test\\aaa'
     * to = 'C:\\orandea\\impl\\bbb'
     * The output of the function should be: '..\\..\\impl\\bbb'
     * @param {string} from
     * @param {string} to
     * @returns {string}
     */
    relative(from3, to) {
      if (from3 === to)
        return "";
      const fromOrig = _win32.resolve(from3);
      const toOrig = _win32.resolve(to);
      if (fromOrig === toOrig)
        return "";
      from3 = fromOrig.toLowerCase();
      to = toOrig.toLowerCase();
      if (from3 === to)
        return "";
      let fromStart = 0;
      while (fromStart < from3.length && from3.charCodeAt(fromStart) === CHAR_BACKWARD_SLASH2) {
        fromStart++;
      }
      let fromEnd = from3.length;
      while (fromEnd - 1 > fromStart && from3.charCodeAt(fromEnd - 1) === CHAR_BACKWARD_SLASH2) {
        fromEnd--;
      }
      const fromLen = fromEnd - fromStart;
      let toStart = 0;
      while (toStart < to.length && to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH2) {
        toStart++;
      }
      let toEnd = to.length;
      while (toEnd - 1 > toStart && to.charCodeAt(toEnd - 1) === CHAR_BACKWARD_SLASH2) {
        toEnd--;
      }
      const toLen = toEnd - toStart;
      const length = fromLen < toLen ? fromLen : toLen;
      let lastCommonSep = -1;
      let i = 0;
      for (; i < length; i++) {
        const fromCode = from3.charCodeAt(fromStart + i);
        if (fromCode !== to.charCodeAt(toStart + i))
          break;
        else if (fromCode === CHAR_BACKWARD_SLASH2)
          lastCommonSep = i;
      }
      if (i !== length) {
        if (lastCommonSep === -1)
          return toOrig;
      } else {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH2) {
            return toOrig.slice(toStart + i + 1);
          }
          if (i === 2) {
            return toOrig.slice(toStart + i);
          }
        }
        if (fromLen > length) {
          if (from3.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH2) {
            lastCommonSep = i;
          } else if (i === 2) {
            lastCommonSep = 3;
          }
        }
        if (lastCommonSep === -1)
          lastCommonSep = 0;
      }
      let out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from3.charCodeAt(i) === CHAR_BACKWARD_SLASH2) {
          out += out.length === 0 ? ".." : "\\..";
        }
      }
      toStart += lastCommonSep;
      if (out.length > 0)
        return `${out}${toOrig.slice(toStart, toEnd)}`;
      if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH2)
        ++toStart;
      return toOrig.slice(toStart, toEnd);
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    toNamespacedPath(path) {
      if (typeof path !== "string" || path.length === 0)
        return path;
      const resolvedPath = _win32.resolve(path);
      if (resolvedPath.length <= 2)
        return path;
      if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH2) {
        if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH2) {
          const code = resolvedPath.charCodeAt(2);
          if (code !== CHAR_QUESTION_MARK2 && code !== CHAR_DOT2) {
            return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
          }
        }
      } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0)) && resolvedPath.charCodeAt(1) === CHAR_COLON && resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH2) {
        return `\\\\?\\${resolvedPath}`;
      }
      return path;
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    dirname(path) {
      const len = path.length;
      if (len === 0)
        return ".";
      let rootEnd = -1;
      let offset = 0;
      const code = path.charCodeAt(0);
      if (len === 1) {
        return isPathSeparator(code) ? path : ".";
      }
      if (isPathSeparator(code)) {
        rootEnd = offset = 1;
        if (isPathSeparator(path.charCodeAt(1))) {
          let j = 2;
          let last = j;
          while (j < len && !isPathSeparator(path.charCodeAt(j))) {
            j++;
          }
          if (j < len && j !== last) {
            last = j;
            while (j < len && isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              last = j;
              while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j === len) {
                return path;
              }
              if (j !== last) {
                rootEnd = offset = j + 1;
              }
            }
          }
        }
      } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
        rootEnd = len > 2 && isPathSeparator(path.charCodeAt(2)) ? 3 : 2;
        offset = rootEnd;
      }
      let end = -1;
      let matchedSlash = true;
      for (let i = len - 1; i >= offset; --i) {
        if (isPathSeparator(path.charCodeAt(i))) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) {
        if (rootEnd === -1)
          return ".";
        end = rootEnd;
      }
      return path.slice(0, end);
    },
    /**
     * @param {string} path
     * @param {string} [ext]
     * @returns {string}
     */
    basename(path, ext) {
      let start = 0;
      let end = -1;
      let matchedSlash = true;
      if (path.length >= 2 && isWindowsDeviceRoot(path.charCodeAt(0)) && path.charCodeAt(1) === CHAR_COLON) {
        start = 2;
      }
      if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
        if (ext === path)
          return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for (let i = path.length - 1; i >= start; --i) {
          const code = path.charCodeAt(i);
          if (isPathSeparator(code)) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end)
          end = firstNonSlashEnd;
        else if (end === -1)
          end = path.length;
        return path.slice(start, end);
      }
      for (let i = path.length - 1; i >= start; --i) {
        if (isPathSeparator(path.charCodeAt(i))) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1)
        return "";
      return path.slice(start, end);
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    extname(path) {
      let start = 0;
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let preDotState = 0;
      if (path.length >= 2 && path.charCodeAt(1) === CHAR_COLON && isWindowsDeviceRoot(path.charCodeAt(0))) {
        start = startPart = 2;
      }
      for (let i = path.length - 1; i >= start; --i) {
        const code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === CHAR_DOT2) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path.slice(startDot, end);
    },
    format: _format.bind(null, "\\"),
    /**
     * @param {string} path
     * @returns {{
     *  dir: string;
     *  root: string;
     *  base: string;
     *  name: string;
     *  ext: string;
     *  }}
     */
    parse(path) {
      const ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path.length === 0)
        return ret;
      const len = path.length;
      let rootEnd = 0;
      let code = path.charCodeAt(0);
      if (len === 1) {
        if (isPathSeparator(code)) {
          ret.root = ret.dir = path;
          return ret;
        }
        ret.base = ret.name = path;
        return ret;
      }
      if (isPathSeparator(code)) {
        rootEnd = 1;
        if (isPathSeparator(path.charCodeAt(1))) {
          let j = 2;
          let last = j;
          while (j < len && !isPathSeparator(path.charCodeAt(j))) {
            j++;
          }
          if (j < len && j !== last) {
            last = j;
            while (j < len && isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              last = j;
              while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j === len) {
                rootEnd = j;
              } else if (j !== last) {
                rootEnd = j + 1;
              }
            }
          }
        }
      } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
        if (len <= 2) {
          ret.root = ret.dir = path;
          return ret;
        }
        rootEnd = 2;
        if (isPathSeparator(path.charCodeAt(2))) {
          if (len === 3) {
            ret.root = ret.dir = path;
            return ret;
          }
          rootEnd = 3;
        }
      }
      if (rootEnd > 0)
        ret.root = path.slice(0, rootEnd);
      let startDot = -1;
      let startPart = rootEnd;
      let end = -1;
      let matchedSlash = true;
      let i = path.length - 1;
      let preDotState = 0;
      for (; i >= rootEnd; --i) {
        code = path.charCodeAt(i);
        if (isPathSeparator(code)) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === CHAR_DOT2) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (end !== -1) {
        if (startDot === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          ret.base = ret.name = path.slice(startPart, end);
        } else {
          ret.name = path.slice(startPart, startDot);
          ret.base = path.slice(startPart, end);
          ret.ext = path.slice(startDot, end);
        }
      }
      if (startPart > 0 && startPart !== rootEnd)
        ret.dir = path.slice(0, startPart - 1);
      else
        ret.dir = ret.root;
      return ret;
    },
    sep: "\\",
    delimiter: ";",
    win32: null,
    posix: null
  };
  var posixCwd = (() => {
    if (platformIsWin32) {
      const regexp = /\\/g;
      return () => {
        const cwd2 = process_default.cwd().replace(regexp, "/");
        return cwd2.slice(cwd2.indexOf("/"));
      };
    }
    return () => process_default.cwd();
  })();
  var _posix = {
    /**
     * path.resolve([from ...], to)
     * @param {...string} args
     * @returns {string}
     */
    resolve(...args) {
      let resolvedPath = "";
      let resolvedAbsolute = false;
      for (let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        const path = i >= 0 ? args[i] : posixCwd();
        if (path.length === 0) {
          continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH2;
      }
      resolvedPath = normalizeString(
        resolvedPath,
        !resolvedAbsolute,
        "/",
        isPosixPathSeparator
      );
      if (resolvedAbsolute) {
        return `/${resolvedPath}`;
      }
      return resolvedPath.length > 0 ? resolvedPath : ".";
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    normalize(path) {
      if (path.length === 0)
        return ".";
      const isAbsolute2 = path.charCodeAt(0) === CHAR_FORWARD_SLASH2;
      const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH2;
      path = normalizeString(path, !isAbsolute2, "/", isPosixPathSeparator);
      if (path.length === 0) {
        if (isAbsolute2)
          return "/";
        return trailingSeparator ? "./" : ".";
      }
      if (trailingSeparator)
        path += "/";
      return isAbsolute2 ? `/${path}` : path;
    },
    /**
     * @param {string} path
     * @returns {boolean}
     */
    isAbsolute(path) {
      return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH2;
    },
    /**
     * @param {...string} args
     * @returns {string}
     */
    join(...args) {
      if (args.length === 0)
        return ".";
      let joined;
      for (let i = 0; i < args.length; ++i) {
        const arg = args[i];
        if (arg.length > 0) {
          if (joined === void 0)
            joined = arg;
          else
            joined += `/${arg}`;
        }
      }
      if (joined === void 0)
        return ".";
      return _posix.normalize(joined);
    },
    /**
     * @param {string} from
     * @param {string} to
     * @returns {string}
     */
    relative(from3, to) {
      if (from3 === to)
        return "";
      from3 = _posix.resolve(from3);
      to = _posix.resolve(to);
      if (from3 === to)
        return "";
      const fromStart = 1;
      const fromEnd = from3.length;
      const fromLen = fromEnd - fromStart;
      const toStart = 1;
      const toLen = to.length - toStart;
      const length = fromLen < toLen ? fromLen : toLen;
      let lastCommonSep = -1;
      let i = 0;
      for (; i < length; i++) {
        const fromCode = from3.charCodeAt(fromStart + i);
        if (fromCode !== to.charCodeAt(toStart + i))
          break;
        else if (fromCode === CHAR_FORWARD_SLASH2)
          lastCommonSep = i;
      }
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH2) {
            return to.slice(toStart + i + 1);
          }
          if (i === 0) {
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from3.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH2) {
            lastCommonSep = i;
          } else if (i === 0) {
            lastCommonSep = 0;
          }
        }
      }
      let out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from3.charCodeAt(i) === CHAR_FORWARD_SLASH2) {
          out += out.length === 0 ? ".." : "/..";
        }
      }
      return `${out}${to.slice(toStart + lastCommonSep)}`;
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    toNamespacedPath(path) {
      return path;
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    dirname(path) {
      if (path.length === 0)
        return ".";
      const hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH2;
      let end = -1;
      let matchedSlash = true;
      for (let i = path.length - 1; i >= 1; --i) {
        if (path.charCodeAt(i) === CHAR_FORWARD_SLASH2) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1)
        return hasRoot ? "/" : ".";
      if (hasRoot && end === 1)
        return "//";
      return path.slice(0, end);
    },
    /**
     * @param {string} path
     * @param {string} [ext]
     * @returns {string}
     */
    basename(path, ext) {
      let start = 0;
      let end = -1;
      let matchedSlash = true;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
        if (ext === path)
          return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for (let i = path.length - 1; i >= 0; --i) {
          const code = path.charCodeAt(i);
          if (code === CHAR_FORWARD_SLASH2) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end)
          end = firstNonSlashEnd;
        else if (end === -1)
          end = path.length;
        return path.slice(start, end);
      }
      for (let i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === CHAR_FORWARD_SLASH2) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1)
        return "";
      return path.slice(start, end);
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    extname(path) {
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let preDotState = 0;
      for (let i = path.length - 1; i >= 0; --i) {
        const code = path.charCodeAt(i);
        if (code === CHAR_FORWARD_SLASH2) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === CHAR_DOT2) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path.slice(startDot, end);
    },
    format: _format.bind(null, "/"),
    /**
     * @param {string} path
     * @returns {{
     *   dir: string;
     *   root: string;
     *   base: string;
     *   name: string;
     *   ext: string;
     *   }}
     */
    parse(path) {
      const ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path.length === 0)
        return ret;
      const isAbsolute2 = path.charCodeAt(0) === CHAR_FORWARD_SLASH2;
      let start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let i = path.length - 1;
      let preDotState = 0;
      for (; i >= start; --i) {
        const code = path.charCodeAt(i);
        if (code === CHAR_FORWARD_SLASH2) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === CHAR_DOT2) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (end !== -1) {
        const start2 = startPart === 0 && isAbsolute2 ? 1 : startPart;
        if (startDot === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
          ret.base = ret.name = path.slice(start2, end);
        } else {
          ret.name = path.slice(start2, startDot);
          ret.base = path.slice(start2, end);
          ret.ext = path.slice(startDot, end);
        }
      }
      if (startPart > 0)
        ret.dir = path.slice(0, startPart - 1);
      else if (isAbsolute2)
        ret.dir = "/";
      return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  _posix.win32 = _win32.win32 = _win32;
  _posix.posix = _win32.posix = _posix;
  var impl = platformIsWin32 ? _win32 : _posix;
  var path_default = impl;
  var {
    resolve: resolve2,
    normalize,
    isAbsolute,
    join,
    relative,
    toNamespacedPath,
    dirname,
    basename,
    extname,
    format: format3,
    parse: parse3,
    sep,
    delimiter: delimiter2,
    win32,
    posix
  } = impl;

  // script/node_modules/frida-fs/dist/index.js
  init_process();
  var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _ReadStream_input;
  var _ReadStream_readRequest;
  var _WriteStream_output;
  var _WriteStream_writeRequest;
  var getWindowsApi = memoize(_getWindowsApi);
  var getPosixApi = memoize(_getPosixApi);
  var platform2 = Process.platform;
  var pointerSize = Process.pointerSize;
  var isWindows = platform2 === "windows";
  var S_IFMT = 61440;
  var S_IFREG = 32768;
  var S_IFDIR = 16384;
  var S_IFCHR = 8192;
  var S_IFBLK = 24576;
  var S_IFIFO = 4096;
  var S_IFLNK = 40960;
  var S_IFSOCK = 49152;
  var universalConstants = {
    S_IFMT,
    S_IFREG,
    S_IFDIR,
    S_IFCHR,
    S_IFBLK,
    S_IFIFO,
    S_IFLNK,
    S_IFSOCK,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    DT_UNKNOWN: 0,
    DT_FIFO: 1,
    DT_CHR: 2,
    DT_DIR: 4,
    DT_BLK: 6,
    DT_REG: 8,
    DT_LNK: 10,
    DT_SOCK: 12,
    DT_WHT: 14
  };
  var platformConstants = {
    darwin: {
      O_RDONLY: 0,
      O_WRONLY: 1,
      O_RDWR: 2,
      O_CREAT: 512,
      O_EXCL: 2048,
      O_NOCTTY: 131072,
      O_TRUNC: 1024,
      O_APPEND: 8,
      O_DIRECTORY: 1048576,
      O_NOFOLLOW: 256,
      O_SYNC: 128,
      O_DSYNC: 4194304,
      O_SYMLINK: 2097152,
      O_NONBLOCK: 4
    },
    linux: {
      O_RDONLY: 0,
      O_WRONLY: 1,
      O_RDWR: 2,
      O_CREAT: 64,
      O_EXCL: 128,
      O_NOCTTY: 256,
      O_TRUNC: 512,
      O_APPEND: 1024,
      O_DIRECTORY: 65536,
      O_NOATIME: 262144,
      O_NOFOLLOW: 131072,
      O_SYNC: 1052672,
      O_DSYNC: 4096,
      O_DIRECT: 16384,
      O_NONBLOCK: 2048
    }
  };
  var constants = {
    ...universalConstants,
    ...platformConstants[platform2]
  };
  var INVALID_HANDLE_VALUE = -1;
  var GENERIC_READ = 2147483648;
  var GENERIC_WRITE = 1073741824;
  var FILE_SHARE_READ = 1;
  var FILE_SHARE_WRITE = 2;
  var FILE_SHARE_DELETE = 4;
  var CREATE_ALWAYS = 2;
  var OPEN_EXISTING = 3;
  var FILE_ATTRIBUTE_NORMAL = 128;
  var FILE_ATTRIBUTE_DIRECTORY = 16;
  var FILE_ATTRIBUTE_REPARSE_POINT = 1024;
  var IO_REPARSE_TAG_MOUNT_POINT = 2684354563;
  var IO_REPARSE_TAG_SYMLINK = 2684354572;
  var FILE_FLAG_OVERLAPPED = 1073741824;
  var FILE_FLAG_BACKUP_SEMANTICS = 33554432;
  var ERROR_NOT_ENOUGH_MEMORY = 8;
  var ERROR_SHARING_VIOLATION = 32;
  var SEEK_SET = 0;
  var SEEK_END = 2;
  var EINTR = 4;
  var ReadStream = class extends stream_default.Readable {
    constructor(path) {
      super({
        highWaterMark: 4 * 1024 * 1024
      });
      _ReadStream_input.set(this, null);
      _ReadStream_readRequest.set(this, null);
      if (isWindows) {
        const api = getWindowsApi();
        const result = api.CreateFileW(Memory.allocUtf16String(path), GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_FLAG_OVERLAPPED, NULL);
        const handle = result.value;
        if (handle.equals(INVALID_HANDLE_VALUE)) {
          process_default.nextTick(() => {
            this.destroy(makeWindowsError(result.lastError));
          });
          return;
        }
        __classPrivateFieldSet(this, _ReadStream_input, new Win32InputStream(handle, { autoClose: true }), "f");
      } else {
        const api = getPosixApi();
        const result = api.open(Memory.allocUtf8String(path), constants.O_RDONLY, 0);
        const fd = result.value;
        if (fd === -1) {
          process_default.nextTick(() => {
            this.destroy(makePosixError(result.errno));
          });
          return;
        }
        __classPrivateFieldSet(this, _ReadStream_input, new UnixInputStream(fd, { autoClose: true }), "f");
      }
    }
    _destroy(error2, callback) {
      __classPrivateFieldGet(this, _ReadStream_input, "f")?.close();
      __classPrivateFieldSet(this, _ReadStream_input, null, "f");
      callback(error2);
    }
    _read(size) {
      if (__classPrivateFieldGet(this, _ReadStream_readRequest, "f") !== null)
        return;
      __classPrivateFieldSet(this, _ReadStream_readRequest, __classPrivateFieldGet(this, _ReadStream_input, "f").read(size).then((buffer) => {
        __classPrivateFieldSet(this, _ReadStream_readRequest, null, "f");
        if (buffer.byteLength === 0) {
          this.push(null);
          return;
        }
        if (this.push(Buffer2.from(buffer)))
          this._read(size);
      }).catch((error2) => {
        __classPrivateFieldSet(this, _ReadStream_readRequest, null, "f");
        this.destroy(error2);
      }), "f");
    }
  };
  _ReadStream_input = /* @__PURE__ */ new WeakMap(), _ReadStream_readRequest = /* @__PURE__ */ new WeakMap();
  var WriteStream = class extends stream_default.Writable {
    constructor(path) {
      super({
        highWaterMark: 4 * 1024 * 1024
      });
      _WriteStream_output.set(this, null);
      _WriteStream_writeRequest.set(this, null);
      if (isWindows) {
        const api = getWindowsApi();
        const result = api.CreateFileW(Memory.allocUtf16String(path), GENERIC_WRITE, 0, NULL, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL | FILE_FLAG_OVERLAPPED, NULL);
        const handle = result.value;
        if (handle.equals(INVALID_HANDLE_VALUE)) {
          process_default.nextTick(() => {
            this.destroy(makeWindowsError(result.lastError));
          });
          return;
        }
        __classPrivateFieldSet(this, _WriteStream_output, new Win32OutputStream(handle, { autoClose: true }), "f");
      } else {
        const api = getPosixApi();
        const pathStr = Memory.allocUtf8String(path);
        const flags = constants.O_WRONLY | constants.O_CREAT | constants.O_TRUNC;
        const mode = constants.S_IRUSR | constants.S_IWUSR | constants.S_IRGRP | constants.S_IROTH;
        const result = api.open(pathStr, flags, mode);
        const fd = result.value;
        if (fd === -1) {
          process_default.nextTick(() => {
            this.destroy(makePosixError(result.errno));
          });
          return;
        }
        __classPrivateFieldSet(this, _WriteStream_output, new UnixOutputStream(fd, { autoClose: true }), "f");
      }
    }
    _destroy(error2, callback) {
      __classPrivateFieldGet(this, _WriteStream_output, "f")?.close();
      __classPrivateFieldSet(this, _WriteStream_output, null, "f");
      callback(error2);
    }
    _write(chunk, encoding, callback) {
      if (__classPrivateFieldGet(this, _WriteStream_writeRequest, "f") !== null)
        return;
      __classPrivateFieldSet(this, _WriteStream_writeRequest, __classPrivateFieldGet(this, _WriteStream_output, "f").writeAll(chunk).then((size) => {
        __classPrivateFieldSet(this, _WriteStream_writeRequest, null, "f");
        callback();
      }).catch((error2) => {
        __classPrivateFieldSet(this, _WriteStream_writeRequest, null, "f");
        callback(error2);
      }), "f");
    }
  };
  _WriteStream_output = /* @__PURE__ */ new WeakMap(), _WriteStream_writeRequest = /* @__PURE__ */ new WeakMap();
  var windowsBackend = {
    enumerateDirectoryEntries(path, callback) {
      enumerateWindowsDirectoryEntriesMatching(path + "\\*", callback);
    },
    readFileSync(path, options = {}) {
      if (typeof options === "string")
        options = { encoding: options };
      const { encoding = null } = options;
      const { CreateFileW, GetFileSizeEx, ReadFile, CloseHandle } = getWindowsApi();
      const createRes = CreateFileW(Memory.allocUtf16String(path), GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, 0, NULL);
      const handle = createRes.value;
      if (handle.equals(INVALID_HANDLE_VALUE))
        throwWindowsError(createRes.lastError);
      try {
        const scratchBuf = Memory.alloc(8);
        const fileSizeBuf = scratchBuf;
        const getRes = GetFileSizeEx(handle, fileSizeBuf);
        if (getRes.value === 0)
          throwWindowsError(getRes.lastError);
        const fileSize = fileSizeBuf.readU64().valueOf();
        const buf = Memory.alloc(fileSize);
        const numBytesReadBuf = scratchBuf;
        const readRes = ReadFile(handle, buf, fileSize, numBytesReadBuf, NULL);
        if (readRes.value === 0)
          throwWindowsError(readRes.lastError);
        const n = numBytesReadBuf.readU32();
        if (n !== fileSize)
          throw new Error("Short read");
        return parseReadFileResult(buf, fileSize, encoding);
      } finally {
        CloseHandle(handle);
      }
    },
    readlinkSync(path) {
      const { CreateFileW, GetFinalPathNameByHandleW, CloseHandle } = getWindowsApi();
      const createRes = CreateFileW(Memory.allocUtf16String(path), 0, FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE, NULL, OPEN_EXISTING, FILE_FLAG_BACKUP_SEMANTICS, NULL);
      const handle = createRes.value;
      if (handle.equals(INVALID_HANDLE_VALUE))
        throwWindowsError(createRes.lastError);
      try {
        let maxLength = 256;
        while (true) {
          const buf = Memory.alloc(maxLength * 2);
          const { value, lastError } = GetFinalPathNameByHandleW(handle, buf, maxLength, 0);
          if (value === 0)
            throwWindowsError(lastError);
          if (lastError === ERROR_NOT_ENOUGH_MEMORY) {
            maxLength *= 2;
            continue;
          }
          return buf.readUtf16String().substring(4);
        }
      } finally {
        CloseHandle(handle);
      }
    },
    rmdirSync(path) {
      const result = getWindowsApi().RemoveDirectoryW(Memory.allocUtf16String(path));
      if (result.value === 0)
        throwWindowsError(result.lastError);
    },
    unlinkSync(path) {
      const result = getWindowsApi().DeleteFileW(Memory.allocUtf16String(path));
      if (result.value === 0)
        throwWindowsError(result.lastError);
    },
    statSync(path) {
      const s = windowsBackend.lstatSync(path);
      if (!s.isSymbolicLink())
        return s;
      const target = windowsBackend.readlinkSync(path);
      return windowsBackend.lstatSync(target);
    },
    lstatSync(path) {
      const getFileExInfoStandard = 0;
      const buf = Memory.alloc(36);
      const result = getWindowsApi().GetFileAttributesExW(Memory.allocUtf16String(path), getFileExInfoStandard, buf);
      if (result.value === 0) {
        if (result.lastError === ERROR_SHARING_VIOLATION) {
          let fileAttrData;
          enumerateWindowsDirectoryEntriesMatching(path, (data) => {
            fileAttrData = Memory.dup(data, 36);
          });
          return makeStatsProxy(path, fileAttrData);
        }
        throwWindowsError(result.lastError);
      }
      return makeStatsProxy(path, buf);
    }
  };
  function enumerateWindowsDirectoryEntriesMatching(filename, callback) {
    const { FindFirstFileW, FindNextFileW, FindClose } = getWindowsApi();
    const data = Memory.alloc(592);
    const result = FindFirstFileW(Memory.allocUtf16String(filename), data);
    const handle = result.value;
    if (handle.equals(INVALID_HANDLE_VALUE))
      throwWindowsError(result.lastError);
    try {
      do {
        callback(data);
      } while (FindNextFileW(handle, data) !== 0);
    } finally {
      FindClose(handle);
    }
  }
  var posixBackend = {
    enumerateDirectoryEntries(path, callback) {
      const { opendir, opendir$INODE64, closedir, readdir: readdir2, readdir$INODE64 } = getPosixApi();
      const opendirImpl = opendir$INODE64 || opendir;
      const readdirImpl = readdir$INODE64 || readdir2;
      const dir = opendirImpl(Memory.allocUtf8String(path));
      const dirHandle = dir.value;
      if (dirHandle.isNull())
        throwPosixError(dir.errno);
      try {
        let entry;
        while (!(entry = readdirImpl(dirHandle)).isNull()) {
          callback(entry);
        }
      } finally {
        closedir(dirHandle);
      }
    },
    readFileSync(path, options = {}) {
      if (typeof options === "string")
        options = { encoding: options };
      const { encoding = null } = options;
      const { open, close, lseek, read: read2 } = getPosixApi();
      const openResult = open(Memory.allocUtf8String(path), constants.O_RDONLY, 0);
      const fd = openResult.value;
      if (fd === -1)
        throwPosixError(openResult.errno);
      try {
        const fileSize = lseek(fd, 0, SEEK_END).valueOf();
        lseek(fd, 0, SEEK_SET);
        const buf = Memory.alloc(fileSize);
        let readResult, n, readFailed;
        do {
          readResult = read2(fd, buf, fileSize);
          n = readResult.value.valueOf();
          readFailed = n === -1;
        } while (readFailed && readResult.errno === EINTR);
        if (readFailed)
          throwPosixError(readResult.errno);
        if (n !== fileSize.valueOf())
          throw new Error("Short read");
        return parseReadFileResult(buf, fileSize, encoding);
      } finally {
        close(fd);
      }
    },
    readlinkSync(path) {
      const pathStr = Memory.allocUtf8String(path);
      const linkSize = posixBackend.lstatSync(path).size.valueOf();
      const buf = Memory.alloc(linkSize);
      const result = getPosixApi().readlink(pathStr, buf, linkSize);
      const n = result.value.valueOf();
      if (n === -1)
        throwPosixError(result.errno);
      return buf.readUtf8String(n);
    },
    rmdirSync(path) {
      const result = getPosixApi().rmdir(Memory.allocUtf8String(path));
      if (result.value === -1)
        throwPosixError(result.errno);
    },
    unlinkSync(path) {
      const result = getPosixApi().unlink(Memory.allocUtf8String(path));
      if (result.value === -1)
        throwPosixError(result.errno);
    },
    statSync(path) {
      return performStatPosix(getStatSpec()._stat, path);
    },
    lstatSync(path) {
      return performStatPosix(getStatSpec()._lstat, path);
    }
  };
  function writeFileSync(path, data, options = {}) {
    if (typeof options === "string")
      options = { encoding: options };
    const { encoding = null } = options;
    let rawData;
    if (typeof data === "string") {
      if (encoding !== null && !encodingIsUtf8(encoding))
        rawData = Buffer2.from(data, encoding).buffer;
      else
        rawData = data;
    } else {
      rawData = data.buffer;
    }
    const file = new File(path, "wb");
    try {
      file.write(rawData);
    } finally {
      file.close();
    }
  }
  function performStatPosix(impl2, path) {
    const buf = Memory.alloc(statBufSize);
    const result = impl2(Memory.allocUtf8String(path), buf);
    if (result.value !== 0)
      throwPosixError(result.errno);
    return makeStatsProxy(path, buf);
  }
  function parseReadFileResult(buf, fileSize, encoding) {
    if (encodingIsUtf8(encoding))
      return buf.readUtf8String(fileSize);
    const value = Buffer2.from(buf.readByteArray(fileSize));
    if (encoding !== null)
      return value.toString(encoding);
    return value;
  }
  function encodingIsUtf8(encoding) {
    return encoding === "utf8" || encoding === "utf-8";
  }
  var backend = isWindows ? windowsBackend : posixBackend;
  var { enumerateDirectoryEntries, readFileSync, readlinkSync, rmdirSync, unlinkSync, statSync, lstatSync } = backend;
  var direntSpecs = {
    "windows": {
      "d_name": [44, "Utf16String"],
      "d_type": [0, readWindowsFileAttributes],
      "atime": [12, readWindowsFileTime],
      "mtime": [20, readWindowsFileTime],
      "ctime": [4, readWindowsFileTime],
      "size": [28, readWindowsFileSize]
    },
    "linux-32": {
      "d_name": [11, "Utf8String"],
      "d_type": [10, "U8"]
    },
    "linux-64": {
      "d_name": [19, "Utf8String"],
      "d_type": [18, "U8"]
    },
    "darwin-32": {
      "d_name": [21, "Utf8String"],
      "d_type": [20, "U8"]
    },
    "darwin-64": {
      "d_name": [21, "Utf8String"],
      "d_type": [20, "U8"]
    }
  };
  var direntSpec = isWindows ? direntSpecs.windows : direntSpecs[`${platform2}-${pointerSize * 8}`];
  function readdirSync(path) {
    const entries = [];
    enumerateDirectoryEntries(path, (entry) => {
      const name = readDirentField(entry, "d_name");
      entries.push(name);
    });
    return entries;
  }
  function list(path) {
    const extraFieldNames = Object.keys(direntSpec).filter((k) => !k.startsWith("d_"));
    const entries = [];
    enumerateDirectoryEntries(path, (entry) => {
      const name = readDirentField(entry, "d_name");
      const type = readDirentField(entry, "d_type", path_default.join(path, name));
      const extras = {};
      for (const f of extraFieldNames)
        extras[f] = readDirentField(entry, f);
      entries.push({
        name,
        type,
        ...extras
      });
    });
    return entries;
  }
  function readDirentField(entry, name, ...args) {
    const fieldSpec = direntSpec[name];
    const [offset, type] = fieldSpec;
    const read2 = typeof type === "string" ? NativePointer.prototype["read" + type] : type;
    const value = read2.call(entry.add(offset), ...args);
    if (value instanceof Int64 || value instanceof UInt64)
      return value.valueOf();
    return value;
  }
  var statFields = /* @__PURE__ */ new Set([
    "dev",
    "mode",
    "nlink",
    "uid",
    "gid",
    "rdev",
    "blksize",
    "ino",
    "size",
    "blocks",
    "atimeMs",
    "mtimeMs",
    "ctimeMs",
    "birthtimeMs",
    "atime",
    "mtime",
    "ctime",
    "birthtime"
  ]);
  var statSpecGenericLinux32 = {
    size: 88,
    fields: {
      "dev": [0, "U64"],
      "mode": [16, "U32"],
      "nlink": [20, "U32"],
      "ino": [12, "U32"],
      "uid": [24, "U32"],
      "gid": [28, "U32"],
      "rdev": [32, "U64"],
      "atime": [56, readTimespec32],
      "mtime": [64, readTimespec32],
      "ctime": [72, readTimespec32],
      "size": [44, "S32"],
      "blocks": [52, "S32"],
      "blksize": [48, "S32"]
    }
  };
  var statSpecs = {
    "windows": {
      size: 36,
      fields: {
        "dev": [0, returnZero],
        "mode": [0, readWindowsFileAttributes],
        "nlink": [0, returnOne],
        "ino": [0, returnZero],
        "uid": [0, returnZero],
        "gid": [0, returnZero],
        "rdev": [0, returnZero],
        "atime": [12, readWindowsFileTime],
        "mtime": [20, readWindowsFileTime],
        "ctime": [20, readWindowsFileTime],
        "birthtime": [4, readWindowsFileTime],
        "size": [28, readWindowsFileSize],
        "blocks": [28, readWindowsFileSize],
        "blksize": [0, returnOne]
      }
    },
    "darwin-32": {
      size: 108,
      fields: {
        "dev": [0, "S32"],
        "mode": [4, "U16"],
        "nlink": [6, "U16"],
        "ino": [8, "U64"],
        "uid": [16, "U32"],
        "gid": [20, "U32"],
        "rdev": [24, "S32"],
        "atime": [28, readTimespec32],
        "mtime": [36, readTimespec32],
        "ctime": [44, readTimespec32],
        "birthtime": [52, readTimespec32],
        "size": [60, "S64"],
        "blocks": [68, "S64"],
        "blksize": [76, "S32"]
      }
    },
    "darwin-64": {
      size: 144,
      fields: {
        "dev": [0, "S32"],
        "mode": [4, "U16"],
        "nlink": [6, "U16"],
        "ino": [8, "U64"],
        "uid": [16, "U32"],
        "gid": [20, "U32"],
        "rdev": [24, "S32"],
        "atime": [32, readTimespec64],
        "mtime": [48, readTimespec64],
        "ctime": [64, readTimespec64],
        "birthtime": [80, readTimespec64],
        "size": [96, "S64"],
        "blocks": [104, "S64"],
        "blksize": [112, "S32"]
      }
    },
    "linux-ia32": statSpecGenericLinux32,
    "linux-ia32-stat64": {
      size: 96,
      fields: {
        "dev": [0, "U64"],
        "mode": [16, "U32"],
        "nlink": [20, "U32"],
        "ino": [88, "U64"],
        "uid": [24, "U32"],
        "gid": [28, "U32"],
        "rdev": [32, "U64"],
        "atime": [64, readTimespec32],
        "mtime": [72, readTimespec32],
        "ctime": [80, readTimespec32],
        "size": [44, "S64"],
        "blocks": [56, "S64"],
        "blksize": [52, "S32"]
      }
    },
    "linux-x64": {
      size: 144,
      fields: {
        "dev": [0, "U64"],
        "mode": [24, "U32"],
        "nlink": [16, "U64"],
        "ino": [8, "U64"],
        "uid": [28, "U32"],
        "gid": [32, "U32"],
        "rdev": [40, "U64"],
        "atime": [72, readTimespec64],
        "mtime": [88, readTimespec64],
        "ctime": [104, readTimespec64],
        "size": [48, "S64"],
        "blocks": [64, "S64"],
        "blksize": [56, "S64"]
      }
    },
    "linux-arm": statSpecGenericLinux32,
    "linux-arm-stat64": {
      size: 104,
      fields: {
        "dev": [0, "U64"],
        "mode": [16, "U32"],
        "nlink": [20, "U32"],
        "ino": [96, "U64"],
        "uid": [24, "U32"],
        "gid": [28, "U32"],
        "rdev": [32, "U64"],
        "atime": [72, readTimespec32],
        "mtime": [80, readTimespec32],
        "ctime": [88, readTimespec32],
        "size": [48, "S64"],
        "blocks": [64, "S64"],
        "blksize": [56, "S32"]
      }
    },
    "linux-arm64": {
      size: 128,
      fields: {
        "dev": [0, "U64"],
        "mode": [16, "U32"],
        "nlink": [20, "U32"],
        "ino": [8, "U64"],
        "uid": [24, "U32"],
        "gid": [28, "U32"],
        "rdev": [32, "U64"],
        "atime": [72, readTimespec64],
        "mtime": [88, readTimespec64],
        "ctime": [104, readTimespec64],
        "size": [48, "S64"],
        "blocks": [64, "S64"],
        "blksize": [56, "S32"]
      }
    }
  };
  var linuxStatVersions = {
    ia32: 3,
    x64: 1,
    arm: 3,
    arm64: 0,
    mips: 3
  };
  var STAT_VER_LINUX = linuxStatVersions[Process.arch];
  var cachedStatSpec = null;
  var statBufSize = 256;
  function getStatSpec() {
    if (cachedStatSpec !== null)
      return cachedStatSpec;
    let statSpec;
    if (isWindows) {
      statSpec = statSpecs.windows;
    } else {
      const api = getPosixApi();
      const stat64Impl = api.stat64 ?? api.__xstat64;
      let platformId;
      if (platform2 === "darwin") {
        platformId = `darwin-${pointerSize * 8}`;
      } else {
        platformId = `${platform2}-${Process.arch}`;
        if (pointerSize === 4 && stat64Impl !== void 0) {
          platformId += "-stat64";
        }
      }
      statSpec = statSpecs[platformId];
      if (statSpec === void 0)
        throw new Error("Current OS/arch combo is not yet supported; please open a PR");
      statSpec._stat = stat64Impl ?? api.stat;
      statSpec._lstat = api.lstat64 ?? api.__lxstat64 ?? api.lstat;
    }
    cachedStatSpec = statSpec;
    return statSpec;
  }
  var Stats = class {
    isFile() {
      return (this.mode & S_IFMT) === S_IFREG;
    }
    isDirectory() {
      return (this.mode & S_IFMT) === S_IFDIR;
    }
    isCharacterDevice() {
      return (this.mode & S_IFMT) === S_IFCHR;
    }
    isBlockDevice() {
      return (this.mode & S_IFMT) === S_IFBLK;
    }
    isFIFO() {
      return (this.mode & S_IFMT) === S_IFIFO;
    }
    isSymbolicLink() {
      return (this.mode & S_IFMT) === S_IFLNK;
    }
    isSocket() {
      return (this.mode & S_IFMT) === S_IFSOCK;
    }
  };
  function makeStatsProxy(path, buf) {
    return new Proxy(new Stats(), {
      has(target, property) {
        if (typeof property === "symbol")
          return property in target;
        return statsHasField(property);
      },
      get(target, property, receiver) {
        switch (property) {
          case "prototype":
            return void 0;
          case "constructor":
          case "toString":
            return target[property];
          case "hasOwnProperty":
            return statsHasField;
          case "valueOf":
            return receiver;
          case "buffer":
            return buf;
          default:
            if (typeof property === "symbol" || property in target)
              return target[property];
            return statsReadField.call(receiver, property, path);
        }
      },
      set(target, property, value, receiver) {
        return false;
      },
      ownKeys(target) {
        return Array.from(statFields);
      },
      getOwnPropertyDescriptor(target, property) {
        return {
          writable: false,
          configurable: true,
          enumerable: true
        };
      }
    });
  }
  function statsHasField(name) {
    return statFields.has(name);
  }
  function statsReadField(name, path) {
    let field = getStatSpec().fields[name];
    if (field === void 0) {
      if (name === "birthtime") {
        return statsReadField.call(this, "ctime", path);
      }
      const msPos = name.lastIndexOf("Ms");
      if (msPos === name.length - 2) {
        return statsReadField.call(this, name.substring(0, msPos), path).getTime();
      }
      return void 0;
    }
    const [offset, type] = field;
    const read2 = typeof type === "string" ? NativePointer.prototype["read" + type] : type;
    const value = read2.call(this.buffer.add(offset), path);
    if (value instanceof Int64 || value instanceof UInt64)
      return value.valueOf();
    return value;
  }
  function readWindowsFileAttributes(path) {
    const attributes = this.readU32();
    let isLink = false;
    if ((attributes & FILE_ATTRIBUTE_REPARSE_POINT) !== 0) {
      enumerateWindowsDirectoryEntriesMatching(path, (data) => {
        const reserved0 = data.add(36).readU32();
        isLink = reserved0 === IO_REPARSE_TAG_MOUNT_POINT || reserved0 === IO_REPARSE_TAG_SYMLINK;
      });
    }
    const isDir = (attributes & FILE_ATTRIBUTE_DIRECTORY) !== 0;
    let mode;
    if (isLink)
      mode = S_IFLNK;
    else if (isDir)
      mode = S_IFDIR;
    else
      mode = S_IFREG;
    if (isDir)
      mode |= 493;
    else
      mode |= 420;
    return mode;
  }
  function readWindowsFileTime() {
    const fileTime = BigInt(this.readU64().toString()).valueOf();
    const ticksPerMsec = 10000n;
    const msecToUnixEpoch = 11644473600000n;
    const unixTime = fileTime / ticksPerMsec - msecToUnixEpoch;
    return new Date(parseInt(unixTime.toString()));
  }
  function readWindowsFileSize() {
    const high = this.readU32();
    const low = this.add(4).readU32();
    return uint64(high).shl(32).or(low);
  }
  function readTimespec32() {
    const sec = this.readU32();
    const nsec = this.add(4).readU32();
    const msec = nsec / 1e6;
    return new Date(sec * 1e3 + msec);
  }
  function readTimespec64() {
    const sec = this.readU64().valueOf();
    const nsec = this.add(8).readU64().valueOf();
    const msec = nsec / 1e6;
    return new Date(sec * 1e3 + msec);
  }
  function returnZero() {
    return 0;
  }
  function returnOne() {
    return 1;
  }
  function throwWindowsError(lastError) {
    throw makeWindowsError(lastError);
  }
  function throwPosixError(errno) {
    throw makePosixError(errno);
  }
  function makeWindowsError(lastError) {
    const maxLength = 256;
    const FORMAT_MESSAGE_FROM_SYSTEM = 4096;
    const FORMAT_MESSAGE_IGNORE_INSERTS = 512;
    const buf = Memory.alloc(maxLength * 2);
    getWindowsApi().FormatMessageW(FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS, NULL, lastError, 0, buf, maxLength, NULL);
    return new Error(buf.readUtf16String());
  }
  function makePosixError(errno) {
    const message = getPosixApi().strerror(errno).readUtf8String();
    return new Error(message);
  }
  function callbackify2(original) {
    return function(...args) {
      const numArgsMinusOne = args.length - 1;
      const implArgs = args.slice(0, numArgsMinusOne);
      const callback = args[numArgsMinusOne];
      process_default.nextTick(function() {
        try {
          const result = original(...implArgs);
          callback(null, result);
        } catch (e) {
          callback(e);
        }
      });
    };
  }
  var ssizeType = pointerSize === 8 ? "int64" : "int32";
  var sizeType = "u" + ssizeType;
  var offsetType = platform2 === "darwin" || pointerSize === 8 ? "int64" : "int32";
  function _getWindowsApi() {
    const SF = SystemFunction;
    const NF = NativeFunction;
    return makeApi([
      ["CreateFileW", SF, "pointer", ["pointer", "uint", "uint", "pointer", "uint", "uint", "pointer"]],
      ["DeleteFileW", SF, "uint", ["pointer"]],
      ["GetFileSizeEx", SF, "uint", ["pointer", "pointer"]],
      ["ReadFile", SF, "uint", ["pointer", "pointer", "uint", "pointer", "pointer"]],
      ["RemoveDirectoryW", SF, "uint", ["pointer"]],
      ["CloseHandle", NF, "uint", ["pointer"]],
      ["FindFirstFileW", SF, "pointer", ["pointer", "pointer"]],
      ["FindNextFileW", NF, "uint", ["pointer", "pointer"]],
      ["FindClose", NF, "uint", ["pointer"]],
      ["GetFileAttributesExW", SF, "uint", ["pointer", "uint", "pointer"]],
      ["GetFinalPathNameByHandleW", SF, "uint", ["pointer", "pointer", "uint", "uint"]],
      ["FormatMessageW", NF, "uint", ["uint", "pointer", "uint", "uint", "pointer", "uint", "pointer"]]
    ]);
  }
  function _getPosixApi() {
    const SF = SystemFunction;
    const NF = NativeFunction;
    return makeApi([
      ["open", SF, "int", ["pointer", "int", "...", "int"]],
      ["close", NF, "int", ["int"]],
      ["lseek", NF, offsetType, ["int", offsetType, "int"]],
      ["read", SF, ssizeType, ["int", "pointer", sizeType]],
      ["opendir", SF, "pointer", ["pointer"]],
      ["opendir$INODE64", SF, "pointer", ["pointer"]],
      ["closedir", NF, "int", ["pointer"]],
      ["readdir", NF, "pointer", ["pointer"]],
      ["readdir$INODE64", NF, "pointer", ["pointer"]],
      ["readlink", SF, ssizeType, ["pointer", "pointer", sizeType]],
      ["rmdir", SF, "int", ["pointer"]],
      ["unlink", SF, "int", ["pointer"]],
      ["stat", SF, "int", ["pointer", "pointer"]],
      ["stat64", SF, "int", ["pointer", "pointer"]],
      ["__xstat64", SF, "int", ["int", "pointer", "pointer"], invokeXstat],
      ["lstat", SF, "int", ["pointer", "pointer"]],
      ["lstat64", SF, "int", ["pointer", "pointer"]],
      ["__lxstat64", SF, "int", ["int", "pointer", "pointer"], invokeXstat],
      ["strerror", NF, "pointer", ["int"]]
    ]);
  }
  function invokeXstat(impl2, path, buf) {
    return impl2(STAT_VER_LINUX, path, buf);
  }
  function makeApi(spec) {
    return spec.reduce((api, entry) => {
      addApiPlaceholder(api, entry);
      return api;
    }, {});
  }
  var nativeOpts = isWindows && pointerSize === 4 ? { abi: "stdcall" } : {};
  function addApiPlaceholder(api, entry) {
    const [name] = entry;
    Object.defineProperty(api, name, {
      configurable: true,
      get() {
        const [, Ctor, retType, argTypes, wrapper] = entry;
        let impl2 = null;
        const address = isWindows ? Module.findExportByName("kernel32.dll", name) : Module.findExportByName(null, name);
        if (address !== null)
          impl2 = new Ctor(address, retType, argTypes, nativeOpts);
        if (wrapper !== void 0)
          impl2 = wrapper.bind(null, impl2);
        Object.defineProperty(api, name, { value: impl2 });
        return impl2;
      }
    });
  }
  function createReadStream(path) {
    return new ReadStream(path);
  }
  function createWriteStream(path) {
    return new WriteStream(path);
  }
  var readdir = callbackify2(readdirSync);
  var readFile = callbackify2(readFileSync);
  var writeFile = callbackify2(writeFileSync);
  var readlink = callbackify2(readlinkSync);
  var rmdir = callbackify2(rmdirSync);
  var unlink = callbackify2(unlinkSync);
  var stat = callbackify2(statSync);
  var lstat = callbackify2(lstatSync);
  function memoize(compute) {
    let value;
    let computed = false;
    return function(...args) {
      if (!computed) {
        value = compute(...args);
        computed = true;
      }
      return value;
    };
  }
  var dist_default = {
    constants,
    createReadStream,
    createWriteStream,
    readdir,
    readdirSync,
    list,
    readFile,
    readFileSync,
    writeFile,
    writeFileSync,
    readlink,
    readlinkSync,
    rmdir,
    rmdirSync,
    unlink,
    unlinkSync,
    stat,
    statSync,
    lstat,
    lstatSync,
    Stats
  };

  // script/lib/SettingsReader.ts
  var SettingsReader = class {
    settings = null;
    constructor() {
      try {
        if (Logger_default) {
          Logger_default.log("Reading settings file");
        }
        const settings = dist_default.readFileSync(Device_default.documents("settings.json")).toString();
        this.settings = JSON.parse(settings);
      } catch (e) {
        const error2 = e;
        if (Logger_default) {
          Logger_default.log(`Error reading settings file: ${error2.message}`);
        }
      }
      Logger_default.log("Ended reading settings file");
    }
    getSetting(setting) {
      if (!this.settings) {
        return null;
      }
      return this.settings[setting];
    }
  };
  var SettingsReader_default = new SettingsReader();

  // script/functions/customColors.ts
  var convertColor = (color) => {
    const a = Math.round(color.a * 255);
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    let finalColor = r << 24 | g << 16 | b << 8 | a;
    if (finalColor > 2147483647) {
      finalColor = finalColor - 4294967296;
    }
    return finalColor;
  };
  var customColors = () => {
    const raksha = Il2Cpp.domain.assembly("RakshaModel").image;
    const colors = Il2Cpp.gc.choose(
      raksha.class("com.spaceape.config.RhythmGameScoreColourCollection")
    );
    for (const color of colors) {
      let newColor = null;
      const idLabel = color.field("idLabel").value.toString().slice(1, -1);
      if (idLabel === "APLUS") {
        newColor = SettingsReader_default.getSetting("aPlusColor") ?? {
          r: 1,
          g: 0,
          b: 1,
          a: 1
        };
      }
      if (idLabel === "A") {
        newColor = SettingsReader_default.getSetting("aColor");
      }
      if (idLabel === "B") {
        newColor = SettingsReader_default.getSetting("bColor");
      }
      if (newColor) {
        color.field("LaneFeedbackColour").value = convertColor(newColor);
        color.field("FeedbackTextColour").value = convertColor(newColor);
      }
    }
  };

  // script/hacks/freeUnlimitedPlay.ts
  function freeUnlimitedPlay() {
    const assembly = Il2Cpp.domain.assembly("RakshaModel").image;
    let cases = Il2Cpp.gc.choose(
      assembly.class("com.spaceape.flamingo.model.CampaignGachaBoxSlotsTO")
    )[0];
    let list2 = cases.field("slots").value;
    list2.method("Clear").invoke();
  }

  // script/hacks/freeRestarts.ts
  function freeRestarts() {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    assembly.class("RhythmGameContinueScreen").method("SetCostToContinue").implementation = function(currency) {
      currency.field("amount").value = 0;
      this.method("SetCostToContinue").invoke(currency);
    };
  }

  // script/functions/autoplay.ts
  var enabled = false;
  var autoplay = () => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    assembly.class("BeatStar.RhythmGame.GameController").method("InteractionVisibleStart").implementation = function(interaction) {
      if (!enabled) {
        return this.method("InteractionVisibleStart").invoke(interaction);
      }
      const time = this.field("musicPlayerPlaybackTime").value;
      const currentTime = time.field("musicPlaybackTimeSecs").value;
      const type = interaction.class.name;
      const back = interaction.ref(true);
      if (type == "TapInteraction") {
        const timeForPerfect = interaction.field("timeForPerfect").value;
        const difference = timeForPerfect - currentTime;
        if (difference < 0) {
          return;
        }
        setTimeout(() => {
          const note = back.target;
          note?.method("HandleComplete").invoke(true, timeForPerfect);
          back.free();
        }, difference * 1e3);
      } else if (type == "HoldInteraction") {
        const timeForPerfect = interaction.field("timeForStartPerfect").value;
        const difference = timeForPerfect - currentTime;
        setTimeout(() => {
          const note = back.target;
          note?.method("HandleTouchStarted").invoke(timeForPerfect, timeForPerfect, 1);
          back.free();
        }, difference * 1e3);
      } else if (type == "FlickInteraction") {
        const timeForPerfect = interaction.field("timeForPerfect").value;
        const difference = timeForPerfect - currentTime;
        setTimeout(() => {
          const note = back.target;
          note?.method("HandleComplete").invoke(true, timeForPerfect);
          back.free();
        }, difference * 1e3);
      } else if (type == "HoldFlickInteraction") {
        const info = assembly.class("DanceInput.TouchInput").alloc();
        info.method(".ctor").invoke(1);
        const timeForPerfect = interaction.field("timeForStartPerfect").value;
        const flickPerfect = interaction.field("timeForFlickPerfect").value;
        const difference = timeForPerfect - currentTime;
        const flickDifference = flickPerfect - currentTime;
        setTimeout(() => {
          interaction.method("HandleTouchStarted").invoke(info, timeForPerfect, timeForPerfect);
        }, difference * 1e3);
        setTimeout(() => {
          interaction.method("HandleFlickComplete").invoke(flickDifference);
        }, flickDifference * 1e3);
      } else if (type == "SwitchHoldInteraction") {
        const timeForPerfect = interaction.field("timeForStartPerfect").value;
        const difference = timeForPerfect - currentTime;
        setTimeout(() => {
          interaction.method("HandleTouchStarted").invoke(
            timeForPerfect,
            timeForPerfect,
            1,
            RakshaModel.class("com.spaceape.config.ScoreType").field("APLUS").value
          );
        }, difference * 1e3);
      } else if (type == "SwitchHoldFlickInteraction") {
        const info = assembly.class("DanceInput.TouchInput").alloc();
        info.method(".ctor").invoke(1);
        const timeForPerfect = interaction.field("timeForStartPerfect").value;
        const difference = timeForPerfect - currentTime;
        const flickPerfect = interaction.field("timeForFlickPerfect").value;
        const flickDifference = flickPerfect - currentTime;
        setTimeout(() => {
          interaction.method("HandleTouchStarted").invoke(
            info,
            timeForPerfect,
            timeForPerfect,
            RakshaModel.class("com.spaceape.config.ScoreType").field("APLUS").value
          );
        }, difference * 1e3);
        setTimeout(() => {
          interaction.method("HandleFlickComplete").invoke(flickDifference);
        }, flickDifference * 1e3);
      }
      this.method("InteractionVisibleStart").invoke(interaction);
    };
  };
  var toggle = () => {
    enabled = !enabled;
  };
  var getStatus = () => {
    return enabled ? "Autoplay enabled" : "Autoplay disabled";
  };

  // script/server/saveScores.ts
  var saveScores = () => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    const mscorlib = Il2Cpp.domain.assembly("mscorlib").image;
    assembly.class("BeatStarRhythmGameFlowListener").method("HandleResultsComplete").implementation = function(result) {
      const score = result.field("Score").value;
      const gameResult = result.field("GameResult").value;
      const beatmap = gameResult.field("Beatmap").value;
      const beatmapId = beatmap.field("id").value;
      let scoreCounts = gameResult.field("ScoreTypeCounts").value;
      const SystemInt32 = mscorlib.class("System.Int32");
      const values = scoreCounts.method("get_Values").invoke();
      const count = values.method("get_Count").invoke();
      const array = Il2Cpp.array(SystemInt32, count);
      values.method("CopyTo").invoke(array, 0);
      let shouldSave = getStatus() === "Autoplay enabled" ? false : true;
      const absoluteScore = score.field("absoluteScore").value;
      if (shouldSave) {
        networkRequest("/saveScore", {
          androidId: Device_default.getDeviceID(),
          score: absoluteScore,
          beatmapId
        });
      }
      return this.method("HandleResultsComplete").invoke(result);
    };
  };

  // script/hacks/unlockAllSkins.ts
  var unlockAllSkins = () => {
    const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
    const rakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const userSkins = Il2Cpp.gc.choose(
      metalogic.class("com.spaceape.flamingo.model.UserTrackSkins")
    )[0];
    const skins = Il2Cpp.gc.choose(
      rakshaModel.class(
        "com.spaceape.liveopstrackskinconfig.LiveOpsTrackSkinTemplate"
      )
    );
    for (const skin of skins) {
      userSkins.method("Cmd_AddUnlockedTrackSkin").invoke(skin);
    }
  };

  // script/functions/noFail.ts
  var enabled2 = false;
  var noFail = () => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    assembly.class("RhythmGame.GameBehaviours.GameBehaviourController").method("SetupGameBehaviours").implementation = function() {
      this.method("SetupGameBehaviours").invoke();
      if (enabled2) {
        const behaviours = this.field("gameBehaviourOptions").value;
        behaviours.field("BlockAndStop").value = false;
        behaviours.field("FailOnMiss").value = false;
        behaviours.field("RewindOnMiss").value = false;
        behaviours.field("FailOnWrongTap").value = false;
      }
    };
  };
  var toggle2 = () => {
    enabled2 = !enabled2;
  };
  var getStatus2 = () => {
    return enabled2 ? "No fail enabled" : "No fail disabled";
  };

  // script/functions/search.ts
  var search = () => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    assembly.class("SongCollection_SearchElement").method("UpdateInputFilledState").implementation = function() {
      const input = this.field("inputField").value;
      const text = input.field("m_Text").value;
      const searchTerm = text.toString().slice(1, -1);
      if (searchTerm == "nofail") {
        toggle2();
        Device_default.alert(getStatus2());
      } else if (searchTerm == "autoplay") {
        toggle();
        Device_default.alert(getStatus());
      }
    };
  };

  // script/hacks/forcePlayableSongs.ts
  function forcePlayableSongs() {
    const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
    metalogic.class("CampaignSongsSystem").method("IsUserPlayable").implementation = function(t) {
      return true;
    };
  }

  // script/functions/disableTutorial.ts
  var disableTutorial = () => {
    const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
    const tutorialFlagIds = [1, 2, 3, 4, 16, 55, 87, 89];
    metalogic.class("com.spaceape.flamingo.model.UserFtueFlags").method("IsFlagSet").implementation = function(flag) {
      const id = flag.field("id").value;
      if (tutorialFlagIds.includes(id)) {
        return true;
      }
      return this.method("IsFlagSet").invoke(flag);
    };
  };

  // script/functions/disableNews.ts
  var disableNews = () => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    assembly.class("BeatStar.News.LiveopsNewsFeedStoryInfo").method("get_ShouldPopup").implementation = function() {
      return false;
    };
  };

  // script/utilities/activateMod.ts
  var activateMod = () => {
    Logger_default.log("Activating mod...");
    killErrorHandler();
    Logger_default.log("Killed error handler");
    disableChecksum();
    Logger_default.log("Disabled checksum");
    customColors();
    Logger_default.log("Custom colors");
    freeUnlimitedPlay();
    Logger_default.log("Free unlimited play");
    freeRestarts();
    Logger_default.log("Free restarts");
    saveScores();
    Logger_default.log("Saved scores");
    unlockAllSkins();
    Logger_default.log("Unlocked all skins");
    noFail();
    Logger_default.log("No fail");
    autoplay();
    Logger_default.log("Autoplay");
    search();
    Logger_default.log("Search");
    forcePlayableSongs();
    Logger_default.log("Force playable songs");
    disableTutorial();
    Logger_default.log("Disabled tutorial");
    disableNews();
    Logger_default.log("Disabled news");
    Logger_default.log("Mod activated");
  };

  // script/hacks/unlockAllSongs.ts
  var unlockAllSongs = () => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    const root = assembly.class("Config").field("Root").value;
    assembly.class("OptionsDialog").method("SettingsButtonPressed").implementation = function() {
      const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      activateMod();
      this.method("SettingsButtonPressed").invoke();
      let unlockSongProcess = Il2Cpp.gc.choose(
        metalogic.class("UnlockSongProcess")
      )[0];
      let userBeatmaps = Il2Cpp.gc.choose(
        metalogic.class("com.spaceape.flamingo.model.UserBeatmaps")
      )[0];
      let transaction = userBeatmaps.method("CreateTransaction").invoke(
        RakshaModel.class(
          "com.spaceape.flamingo.model.BeatmapRewardSource"
        ).field("CardCase").value
      );
      Il2Cpp.gc.choose(RakshaModel.class("com.spaceape.config.BeatmapTemplate")).forEach((beatmap) => {
        if (beatmap.field("BeatmapVariantReference_id").value.toString() != "null") {
          unlockSongProcess.method("Cmd_UnlockSong").invoke(
            beatmap,
            RakshaModel.class(
              "com.spaceape.flamingo.model.BeatmapRewardSource"
            ).field("CardCase").value,
            transaction,
            transaction
          );
        }
      });
      const gradingSystem = Il2Cpp.gc.choose(metalogic.class("GradingSystem"))[0];
      const beatmaps = Il2Cpp.gc.choose(
        RakshaModel.class("com.spaceape.flamingo.model.BeatmapTO")
      );
      const gameConfig = gradingSystem.field("gameConfig").value;
      const grades = gameConfig.field("Grades").value;
      for (const instance of beatmaps) {
        let template = instance.field("_template").value;
        if (template.toString() == "null") {
          continue;
        }
        for (const score of scores) {
          if (score.beatmapId == template.field("id").value) {
            try {
              const BeatmapScore = RakshaModel.class(
                "com.spaceape.config.BeatmapScore"
              ).alloc();
              BeatmapScore.method(".ctor").invoke(root);
              BeatmapScore.field("absoluteScore").value = score.score;
              instance.field("HighestScore").value = BeatmapScore;
              let variant = template.field("_BeatmapVariantReference").value;
              const difficultyId = variant.method("get_Difficulty").invoke().field("id").value;
              let medal = scoreToMedal(score.score, difficultyId);
              if (variant.field("BeatmapType").value.toString() == "Promode" && medal.includes("medal")) {
                medal = "deluxe_" + medal;
              }
              for (var i = 0; i < 11; i++) {
                const grade = grades.get(i);
                const idLabel = grade.field("idLabel").value;
                if (idLabel.toString().slice(1, -1) === medal) {
                  instance.method("set_HighestGrade").invoke(grade);
                  break;
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
      const newStarCount = gradingSystem.method("CalculateTotalStarsFromSongs").invoke();
      let currencies = Il2Cpp.gc.choose(metalogic.class("UserCurrencies"))[0];
      let starDefinition = currencies.method("get_StarCurrencyDefinition").invoke();
      currencies.method("Set").overload("com.spaceape.config.CurrencyDefinition", "System.Int32").invoke(starDefinition, newStarCount);
    };
  };

  // script/lib/Location.ts
  var Location = class {
    state;
    constructor(state) {
      this.state = state;
    }
    build() {
      const unity = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;
      return unity.class("com.spaceape.assets.BundleLocation").field(this.state).value;
    }
  };

  // script/lib/UnityAssetBundle.ts
  var UnityAssetBundle = class {
    id;
    Dependencies_id;
    _Dependencies;
    Location;
    Hash;
    SizeInBytes;
    CRC;
    constructor(id) {
      this.id = id.toString();
      this.Location = new Location("Remote");
      this.Hash = "cc891c481b3c6e50e8506a717aa5746e";
      this.SizeInBytes = 0;
      this.CRC = 0;
    }
    build() {
      const unity = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let bundle = unity.class("com.spaceape.assets.UnityAssetBundle").alloc();
      bundle.method(".ctor").invoke(root);
      bundle.field("id").value = Il2Cpp.string(this.id);
      bundle.field("Location").value = this.Location.build();
      bundle.field("Hash").value = Il2Cpp.string(this.Hash);
      bundle.field("SizeInBytes").value = this.SizeInBytes;
      bundle.field("CRC").value = this.CRC;
      return bundle;
    }
  };

  // script/lib/UnityAsset.ts
  var UnityAsset = class {
    id;
    name;
    bundle_id;
    _bundle;
    constructor(id, name, bundle_id) {
      this.id = id;
      this.name = name;
      this.bundle_id = bundle_id;
      this._bundle = null;
    }
    build() {
      const unity = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;
      let asset = unity.class("com.spaceape.assets.UnityAsset").alloc();
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      asset.method(".ctor").invoke(root);
      asset.field("id").value = Il2Cpp.string(this.id);
      asset.field("name").value = Il2Cpp.string(this.name);
      asset.field("bundle_id").value = Il2Cpp.string(this.bundle_id);
      asset.field("_bundle").value = new UnityAssetBundle(this.bundle_id).build();
      return asset;
    }
  };

  // script/lib/GradientTO.ts
  var GradientTO = class {
    Mode;
    AlphaKeys = [];
    ColorKeys = [];
    constructor(gradients) {
      this.Mode = 0 /* Blend */;
      for (var x = 0; x < 2; x++) {
        let alphaKey = new GradientAlphaKey(1, x * 1);
        this.AlphaKeys.push(alphaKey);
      }
      for (var x = 0; x < gradients.length; x++) {
        let gradient = gradients[x];
        let colorKey = new GradientColorKey(gradient.color, gradient.time);
        this.ColorKeys.push(colorKey);
      }
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let gradient = RakshaModel.class("com.spaceape.config.GradientTO").alloc();
      gradient.method(".ctor").invoke(root);
      gradient.field("AlphaKeys").value = Il2Cpp.array(
        RakshaModel.class("com.spaceape.config.GradientAlphaKeyTO"),
        this.AlphaKeys.map((el) => el.build())
      );
      gradient.field("ColorKeys").value = Il2Cpp.array(
        RakshaModel.class("com.spaceape.config.GradientColorKeyTO"),
        this.ColorKeys.map((el) => el.build())
      );
      return gradient;
    }
  };
  var GradientAlphaKey = class {
    Alpha;
    Time;
    constructor(alpha, time) {
      this.Alpha = alpha;
      this.Time = time;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let alphaKey = RakshaModel.class(
        "com.spaceape.config.GradientAlphaKeyTO"
      ).alloc();
      alphaKey.method(".ctor").invoke(root);
      alphaKey.field("Alpha").value = this.Alpha;
      alphaKey.field("Time").value = this.Time;
      return alphaKey;
    }
  };
  var GradientColorKey = class {
    Color;
    Time;
    constructor(color, time) {
      this.Color = color;
      this.Time = time;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let gradientKey = RakshaModel.class(
        "com.spaceape.config.GradientColorKeyTO"
      ).alloc();
      gradientKey.method(".ctor").invoke(root);
      gradientKey.field("Color").value = Il2Cpp.string(this.Color);
      gradientKey.field("Time").value = this.Time;
      return gradientKey;
    }
  };

  // script/lib/LegalState.ts
  var LegalState = class {
    state;
    constructor(state) {
      this.state = state;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      return RakshaModel.class("com.spaceape.config.LegalState").field(this.state).value;
    }
  };

  // script/lib/SongContentState.ts
  var SongContentState = class {
    state;
    constructor(state) {
      this.state = state;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      return RakshaModel.class("com.spaceape.config.SongContentState").field(
        this.state
      ).value;
    }
  };

  // script/lib/SongTag.ts
  var SongTag = class {
    id;
    idLabel;
    constructor() {
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let songTag = RakshaModel.class("com.spaceape.config.SongTag").alloc();
      songTag.method(".ctor").invoke(root);
      songTag.field("id").value = this.id;
      songTag.field("idLabel").value = Il2Cpp.string(this.idLabel);
      return songTag;
    }
    test() {
      this.id = 12;
      this.idLabel = "rock";
    }
  };

  // script/lib/WwiseSwitch.ts
  var WwiseSwitch = class {
    switchId;
    switchState;
    constructor(switchId, switchState) {
      this.switchId = switchId;
      this.switchState = switchState;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let template = RakshaModel.class(
        "com.spaceape.apeaudio.WwiseSwitch"
      ).alloc();
      template.method(".ctor").invoke(root);
      template.field("switchId").value = this.switchId;
      template.field("switchState").value = this.switchState;
      return template;
    }
  };

  // script/lib/SongStreakColorTemplate.ts
  var SongStreakColorTemplate = class {
    GlowColor;
    PerfectBarColor;
    InvertPerfectBar;
    VFXColor;
    constructor(glowColor, perfectBarColor, invertPerfectBar, vfxColor) {
      this.GlowColor = glowColor;
      this.PerfectBarColor = perfectBarColor;
      this.InvertPerfectBar = invertPerfectBar;
      this.VFXColor = vfxColor;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      let obj = RakshaModel.class(
        "com.spaceape.config.SongStreakColorTemplate"
      ).alloc();
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      obj.method(".ctor").invoke(root);
      obj.field("GlowColor").value = Il2Cpp.string(this.GlowColor);
      obj.field("PerfectBarColor").value = Il2Cpp.string(this.PerfectBarColor);
      obj.field("InvertPerfectBar").value = this.InvertPerfectBar;
      obj.field("VFXColor").value = Il2Cpp.string(this.VFXColor);
      return obj;
    }
  };

  // script/lib/SongMetaTemplate.ts
  var SongMetaTemplate = class {
    id;
    idLabel;
    constructor(id, idLabel) {
      this.id = id;
      this.idLabel = idLabel;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let meta = RakshaModel.class(
        "com.spaceape.config.SongMetaTemplate"
      ).alloc();
      meta.method(".ctor").invoke(root);
      meta.field("id").value = this.id;
      meta.field("idLabel").value = Il2Cpp.string(this.idLabel);
      return meta;
    }
  };

  // script/lib/SongTemplate.ts
  var SongTemplate = class {
    id;
    BPM;
    //weighting tags
    CoverArtAsset_id;
    _CoverArtAsset;
    TimeSignature;
    BaseColor;
    DarkColor;
    ColorGradient;
    GenreTags_id;
    _GenreTags;
    WwiseSwitch;
    CheckpointOutlineColour;
    ColorGradientInGame;
    StreakConfig;
    TrackIntensityGlow;
    VFXColor;
    VFXAlternativeColor;
    BibleId;
    idLabel;
    ISRC;
    LegalState;
    SongContentState;
    LegalAttribution;
    SilentBeats;
    MusicFileSourceID;
    SongTitleLoc_id;
    _SongTitleLoc;
    SongArtistLoc_id;
    _SongArtistLoc;
    MusicKitData_id;
    _MusicKitData;
    //groups_id
    //goroups
    //HoldHapticTypeOverride
    //HoldScoringBeatTypeOverride
    //bangroup_id
    //SongMeta_id
    SongMeta;
    //sku_id
    //sku
    audioAsset_id;
    _audioAsset;
    path;
    constructor(id, path) {
      this.id = id;
      this.path = path;
    }
    from(object) {
      this.id = object.id;
      this.BPM = object.BPM;
      this.CoverArtAsset_id = object.CoverArtAsset_id;
      this._CoverArtAsset = object._CoverArtAsset;
      this.TimeSignature = object.TimeSignature;
      this.BaseColor = object.BaseColor;
      this.DarkColor = object.DarkColor;
      this.ColorGradient = object.ColorGradient;
      this.GenreTags_id = object.GenreTags_id;
      this._GenreTags = object._GenreTags;
      this.WwiseSwitch = new WwiseSwitch(
        object.WwiseSwitch.switchId,
        object.WwiseSwitch.switchState
      );
      this.CheckpointOutlineColour = object.CheckpointOutlineColour;
      this.ColorGradientInGame = object.ColorGradientInGame;
      this.StreakConfig = object.StreakConfig.map(
        (el) => new SongStreakColorTemplate(
          el.glowColor,
          el.perfectBarColor,
          el.invertPerfectBar,
          el.VFXColor
        )
      );
      this.TrackIntensityGlow = object.TrackIntensityGlow;
      this.VFXColor = object.VFXColor;
      this.VFXAlternativeColor = object.VFXAlternativeColor;
      this.BibleId = object.BibleId;
      this.idLabel = object.idLabel;
      this.ISRC = object.ISRC;
      this.LegalState = new LegalState(object.LegalState);
      this.SongContentState = new SongContentState(object.SongContentState);
      this.LegalAttribution = object.LegalAttribution;
      this.SilentBeats = object.SilentBeats;
      this.MusicFileSourceID = object.MusicFileSourceID;
      this.SongTitleLoc_id = object.SongTitleLoc_id;
      this._SongTitleLoc = object._SongTitleLoc;
      this.SongArtistLoc_id = object.SongArtistLoc_id;
      this._SongArtistLoc = object._SongArtistLoc;
      this.MusicKitData_id = object.MusicKitData_id;
      this._MusicKitData = object._MusicKitData;
      this.SongMeta = object.SongMeta;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const mscorlib = Il2Cpp.domain.assembly("mscorlib").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let template = RakshaModel.class(
        "com.spaceape.config.SongTemplate"
      ).alloc();
      template.method(".ctor").invoke(root);
      if (this.id)
        template.field("id").value = this.id;
      if (this.BPM)
        template.field("BPM").value = this.BPM;
      if (this.CoverArtAsset_id)
        template.field("CoverArtAsset_id").value = Il2Cpp.string(
          this.CoverArtAsset_id
        );
      if (this._CoverArtAsset)
        template.field("_CoverArtAsset").value = this._CoverArtAsset.build();
      if (this.TimeSignature)
        template.field("TimeSignature").value = this.TimeSignature;
      if (this.BaseColor)
        template.field("BaseColor").value = Il2Cpp.string(this.BaseColor);
      if (this.DarkColor)
        template.field("DarkColor").value = Il2Cpp.string(this.DarkColor);
      if (this.ColorGradient)
        template.field("ColorGradient").value = new GradientTO(
          this.ColorGradient
        ).build();
      if (this.GenreTags_id)
        template.field("GenreTags_id").value = Il2Cpp.array(
          mscorlib.class("System.UInt32"),
          this.GenreTags_id
        );
      if (this._GenreTags)
        template.field("_GenreTags").value = Il2Cpp.array(
          RakshaModel.class("com.spaceape.config.SongTag"),
          this._GenreTags.map((el) => el.build())
        );
      if (this.WwiseSwitch)
        template.field("WwiseSwitch").value = this.WwiseSwitch.build();
      if (this.CheckpointOutlineColour)
        template.field("CheckpointOutlineColour").value = Il2Cpp.string(
          this.CheckpointOutlineColour
        );
      if (this.ColorGradientInGame)
        template.field("ColorGradientInGame").value = new GradientTO(
          this.ColorGradientInGame
        ).build();
      if (this.StreakConfig) {
        const streaks = this.StreakConfig.map(
          (el) => new SongStreakColorTemplate(
            el.glowColor,
            el.perfectBarColor,
            el.invertPerfectBar,
            el.VFXColor
          )
        );
        template.field("StreakConfig").value = Il2Cpp.array(
          RakshaModel.class("com.spaceape.config.SongStreakColorTemplate"),
          streaks.map((el) => el.build())
        );
      }
      if (this.TrackIntensityGlow)
        template.field("TrackIntensityGlow").value = Il2Cpp.string(
          this.TrackIntensityGlow
        );
      if (this.VFXColor)
        template.field("VFXColor").value = Il2Cpp.string(this.VFXColor);
      if (this.VFXAlternativeColor)
        template.field("VFXAlternativeColor").value = Il2Cpp.string(
          this.VFXAlternativeColor
        );
      if (this.BibleId)
        template.field("BibleId").value = Il2Cpp.string(this.BibleId);
      if (this.idLabel)
        template.field("idLabel").value = Il2Cpp.string(this.idLabel);
      if (this.ISRC)
        template.field("ISRC").value = Il2Cpp.string(this.ISRC);
      if (this.LegalState)
        template.field("LegalState").value = new LegalState("Approved").build();
      if (this.SongContentState)
        template.field("SongContentState").value = new SongContentState(
          "Master"
        ).build();
      if (this.LegalAttribution)
        template.field("LegalAttribution").value = Il2Cpp.string(
          this.LegalAttribution
        );
      if (this.SilentBeats)
        template.field("SilentBeats").value = this.SilentBeats;
      if (this.MusicFileSourceID)
        template.field("MusicFileSourceID").value = this.MusicFileSourceID;
      if (this.SongTitleLoc_id)
        template.field("SongTitleLoc_id").value = Il2Cpp.string(
          this.SongTitleLoc_id
        );
      if (this._SongTitleLoc)
        template.field("_SongTitleLoc").value = this._SongTitleLoc.build();
      if (this.SongArtistLoc_id)
        template.field("SongArtistLoc_id").value = Il2Cpp.string(
          this.SongArtistLoc_id
        );
      if (this._SongArtistLoc)
        template.field("_SongArtistLoc").value = this._SongArtistLoc.build();
      if (this.SongMeta) {
        this.SongMeta = new SongMetaTemplate(this.id, this.idLabel);
      }
      template.field("_audioAsset").value = this._audioAsset.build();
      return template;
    }
    test() {
      this.BPM = 140;
      this.CoverArtAsset_id = "292f1a28f6388794f87eae271f91692b";
      this._CoverArtAsset = new UnityAsset(
        "292f1a28f6388794f87eae271f91692b",
        "Assets/Textures/AlbumArtwork/FooFighter_Everlong.png",
        this.path + "artwork.bundle"
      );
      this.TimeSignature = 4;
      this.BaseColor = "1467A1";
      this.DarkColor = "00254C";
      this.ColorGradient = [
        { color: "2282B3", time: 0 },
        { color: "00356C", time: 0.5000076293945312 },
        { color: "000C25", time: 1 }
      ];
      this.GenreTags_id = [12];
      this._GenreTags = [new SongTag()];
      this._GenreTags[0].test();
      this.WwiseSwitch = new WwiseSwitch(39444145, 542719590);
      this.CheckpointOutlineColour = "1467A1";
      this.ColorGradientInGame = [
        //background colors
        { color: "C5192D", time: 0 },
        { color: "F24928", time: 1 }
      ];
      this.StreakConfig = [
        {
          glowColor: "0A1926",
          perfectBarColor: "",
          invertPerfectBar: false,
          VFXColor: "006795"
        },
        {
          glowColor: "0E2539",
          perfectBarColor: "",
          invertPerfectBar: false,
          VFXColor: "006992"
        },
        {
          glowColor: "11314c",
          perfectBarColor: "",
          invertPerfectBar: false,
          VFXColor: "006A8F"
        },
        {
          glowColor: "143D60",
          perfectBarColor: "",
          invertPerfectBar: true,
          VFXColor: "0E82AF"
        }
      ];
      this.TrackIntensityGlow = "145F95";
      this.VFXColor = "003B6C";
      this.VFXAlternativeColor = "005F8E";
      this.BibleId = "TST00025";
      this.idLabel = this.path;
      this.ISRC = "";
      this.LegalState = new LegalState("Approved");
      this.SongContentState = new SongContentState("Master");
      this.LegalAttribution = "";
      this.SilentBeats = 0;
      this.MusicFileSourceID = 0;
      this.SongTitleLoc_id = `Song-${this.id}-title`;
      this.SongArtistLoc_id = `Song-${this.id}-artist`;
      this.MusicKitData_id = null;
      this._MusicKitData = null;
      this.SongMeta = new SongMetaTemplate(this.id, this.idLabel);
      this._audioAsset = new UnityAsset(
        "292f1a28f6388794f87eae271f91692c",
        "Assets/Audio/Banks/TST00026.bytes",
        this.path + "audio.bundle"
      );
    }
    changeDetails(name, artist, bpm) {
      this.BPM = bpm;
    }
  };

  // script/lib/SongDifficulty.ts
  var SongDifficulty = class {
    id;
    difficulty;
    idLabel;
    constructor() {
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let difficulty = RakshaModel.class(
        "com.spaceape.config.SongDifficulty"
      ).alloc();
      difficulty.method(".ctor").invoke(root);
      difficulty.field("id").value = this.id;
      difficulty.field("difficulty").value = this.difficulty;
      difficulty.field("idLabel").value = Il2Cpp.string(this.idLabel);
      return difficulty;
    }
    test() {
      this.id = 3;
      this.difficulty = 10;
      this.idLabel = "normal";
    }
  };

  // script/lib/BeatmapType.ts
  var BeatmapType = class {
    type;
    constructor(type) {
      this.type = type;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      return RakshaModel.class("com.spaceape.config.BeatmapVariantType").field(
        this.type
      ).value;
    }
  };

  // script/lib/BeatmapVariant.ts
  var BeatmapVariant = class {
    id;
    idLabel;
    Song_id;
    _Song;
    MaxNumLanes;
    MaxScore;
    Difficulty_id;
    _Difficulty;
    Version;
    IsComplete;
    InteractionsReference_id;
    _InteractionsReference;
    NumStars;
    //sections
    InteractionsAsset_id;
    _InteractionsAsset;
    botScoreCurve;
    Description;
    BeatmapType;
    path;
    constructor(id, path) {
      this.Song_id = id;
      this.path = path;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let template = RakshaModel.class(
        "com.spaceape.config.BeatmapVariant"
      ).alloc();
      template.method(".ctor").invoke(root);
      template.field("id").value = this.id;
      template.field("idLabel").value = Il2Cpp.string(this.idLabel);
      template.field("Song_id").value = this.Song_id;
      template.field("_Song").value = this._Song.build();
      template.field("MaxNumLanes").value = this.MaxNumLanes;
      template.field("MaxScore").value = this.MaxScore;
      template.field("Difficulty_id").value = this.Difficulty_id;
      template.field("_Difficulty").value = this._Difficulty.build();
      template.field("Version").value = this.Version;
      template.field("IsComplete").value = this.IsComplete;
      template.field("InteractionsReference_id").value = this.InteractionsReference_id;
      if (this._InteractionsReference) {
        template.field("_InteractionsReference").value = this._InteractionsReference;
      }
      template.field("NumStars").value = this.NumStars;
      template.field("InteractionsAsset_id").value = Il2Cpp.string(
        this.InteractionsAsset_id
      );
      if (this._InteractionsAsset) {
        template.field("_InteractionsAsset").value = this._InteractionsAsset.build();
      }
      if (this.botScoreCurve) {
        template.field("botScoreCurve").value = null;
      }
      template.field("Description").value = Il2Cpp.string(this.Description);
      template.field("BeatmapType").value = this.BeatmapType.build();
      return template;
    }
    test() {
      this.id = 2223;
      this.idLabel = "77-1";
      this._Song = new SongTemplate(this.Song_id, this.path);
      this._Song.test();
      this.MaxNumLanes = 3;
      this.MaxScore = 935200;
      this.Difficulty_id = 3;
      this._Difficulty = new SongDifficulty();
      this._Difficulty.test();
      this.Version = 1;
      this.IsComplete = true;
      this.InteractionsReference_id = 2223;
      this._InteractionsReference = null;
      this.NumStars = 5;
      this.InteractionsAsset_id = "5f2e85c4a16fd491c9527e2c25764141";
      this._InteractionsAsset = new UnityAsset(
        "5f2e85c4a16fd491c9527e2c25764141",
        "Assets/beatmapInteractions/508.bytes",
        this.path + "chart.bundle"
      );
      this.Description = "Hard";
    }
    changeDetails(name, artist, bpm, sections, maxScore, numberOfLanes, type) {
      this._Song.changeDetails(name, artist, bpm);
      this.NumStars = sections;
      this.MaxScore = maxScore;
      this.MaxNumLanes = numberOfLanes;
      this.BeatmapType = type ? new BeatmapType(type) : new BeatmapType("Regular");
    }
  };

  // script/lib/BeatmapTemplate.ts
  var BeatmapTemplate = class {
    id;
    availability;
    Song_id;
    _Song;
    idLabel;
    BeatmapVariantReference_id;
    _BeatmapVariantReference;
    path;
    constructor(id, path) {
      this.id = id;
      this.Song_id = id;
      this.availability = 2 /* OUTSIDE_CAMPAIGN */;
      this.path = path;
    }
    build() {
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
      const root = assembly.class("Config").field("Root").value;
      let template = RakshaModel.class(
        "com.spaceape.config.BeatmapTemplate"
      ).alloc();
      template.method(".ctor").invoke(root);
      template.field("id").value = this.id;
      template.field("availability").value = RakshaModel.class(
        "com.spaceape.config.BeatmapAvailability"
      ).field("OutsideCampaign").value;
      template.field("Song_id").value = this.Song_id;
      template.field("_Song").value = this._Song.build();
      template.field("idLabel").value = Il2Cpp.string(this.idLabel);
      template.field("BeatmapVariantReference_id").value = this.BeatmapVariantReference_id;
      template.field("_BeatmapVariantReference").value = this._BeatmapVariantReference.build();
      return template;
    }
    test() {
      this._Song = new SongTemplate(this.id, this.path);
      this._Song.test();
      this.idLabel = this.path;
      this.BeatmapVariantReference_id = 508;
      this._BeatmapVariantReference = new BeatmapVariant(this.id, this.path);
      this._BeatmapVariantReference.test();
    }
    changeDetails(name, artist, bpm, sections = 5, maxScore, numberOfLanes = 3, type) {
      this._Song.changeDetails(name, artist, bpm);
      this._BeatmapVariantReference.changeDetails(
        name,
        artist,
        bpm,
        sections,
        maxScore,
        numberOfLanes,
        type
      );
    }
    getDifficultyId() {
      return this._BeatmapVariantReference.Difficulty_id;
    }
  };

  // script/lib/CustomSongReader.ts
  var patchFile = (path, offset) => {
    const mscorlib = Il2Cpp.domain.assembly("mscorlib").image;
    const stream = mscorlib.class("System.IO.FileStream").alloc();
    stream.method(".ctor").overload("System.String", "System.IO.FileMode", "System.IO.FileAccess").invoke(
      Il2Cpp.string(path),
      mscorlib.class("System.IO.FileMode").field("Open").value,
      mscorlib.class("System.IO.FileAccess").field("ReadWrite").value
    );
    stream.method("set_Position").invoke(new Int64(offset));
    const deviceByte = stream.method("ReadByte").invoke();
    if (deviceByte === 9) {
      stream.method("Dispose").invoke(false);
      return;
    }
    if (deviceByte !== 13) {
      Logger_default.log("Failed to patch bundle: ", path);
      stream.method("Dispose").invoke(false);
      return;
    }
    stream.method("set_Position").invoke(new Int64(offset));
    stream.method("WriteByte").invoke(9);
    stream.method("Flush").invoke();
    stream.method("Dispose").invoke(false);
  };
  var CustomSongReader = class {
    dataCache;
    constructor(dataCache2) {
      this.dataCache = dataCache2;
      Logger_default.log("[CustomSongReader] Initialized with DataCache");
    }
    async readCustomSongsOnDevice() {
      Logger_default.log("[readCustomSongsOnDevice] Starting to read custom songs");
      try {
        const mscorlib = Il2Cpp.domain.assembly("mscorlib").image;
        const directory = Device_default.documents("songs/");
        const moddedFiles = [];
        const promises = [];
        const brokenSongs = [];
        Logger_default.log("[readCustomSongsOnDevice] Getting directory listing");
        const files = mscorlib.class("System.IO.Directory").method("GetDirectories").invoke(Il2Cpp.string(directory));
        Logger_default.log(`[readCustomSongsOnDevice] Found ${files.length} directories`);
        for (const file of files) {
          const path = file.toString().slice(1, -1);
          Logger_default.log(`[readCustomSongsOnDevice] Processing directory: ${path}`);
          promises.push(
            new Promise((resolve3) => {
              try {
                Logger_default.log(
                  `[readCustomSongsOnDevice] Patching bundles for: ${path}`
                );
                patchFile(path + "/artwork.bundle", 249);
                patchFile(path + "/audio.bundle", 187);
                patchFile(path + "/chart.bundle", 187);
                Logger_default.log(
                  `[readCustomSongsOnDevice] Reading info.json from: ${path}`
                );
                let data = mscorlib.class("System.IO.File").method("ReadAllText").invoke(Il2Cpp.string(`${path}/info.json`));
                data = JSON.parse(data.toString().slice(1, -1));
                Logger_default.log(
                  `[readCustomSongsOnDevice] Parsed song data: ${data.title}`
                );
                data.path = `file:///${path}/`;
                let t = new BeatmapTemplate(parseInt(data.id), data.path);
                let score = data.maxScore ? parseInt(data.maxScore) : 5e5;
                let difficultyId = data.difficulty;
                Logger_default.log(
                  `[readCustomSongsOnDevice] Processing difficulty for: ${data.title}`
                );
                if (data.difficulty) {
                  difficultyId = difficultyId.toString();
                  if (difficultyId == "extreme") {
                    difficultyId = 1;
                  } else if (difficultyId == "hard") {
                    difficultyId = 3;
                  } else if (difficultyId == "normal") {
                    difficultyId = 4;
                  } else {
                    difficultyId = parseInt(difficultyId);
                  }
                } else {
                  difficultyId = 1;
                }
                t.test();
                let config2;
                if (mscorlib.class("System.IO.File").method("Exists").invoke(Il2Cpp.string(`${path}/config.json`))) {
                  try {
                    config2 = mscorlib.class("System.IO.File").method("ReadAllText").invoke(Il2Cpp.string(`${path}/config.json`));
                    if (config2) {
                      config2 = JSON.parse(config2.toString().slice(1, -1));
                      const keys = Object.keys(config2);
                      for (const key of keys) {
                        let subKeys = Object.keys(config2[key]);
                        for (const subKey of subKeys) {
                          t._Song[subKey] = config2[key][subKey];
                          t._BeatmapVariantReference._Song[subKey] = config2[key][subKey];
                        }
                      }
                    }
                  } catch (e) {
                  }
                }
                Logger_default.log(
                  `[readCustomSongsOnDevice] Building template for: ${data.title}`
                );
                t.changeDetails(
                  data.title,
                  data.artist,
                  parseFloat(data.bpm),
                  parseInt(data.sections),
                  score,
                  data.numLanes,
                  data.type
                );
                let template;
                try {
                  template = t.build();
                  Logger_default.log(
                    `[readCustomSongsOnDevice] Template built successfully for: ${data.title}`
                  );
                } catch (e) {
                  Logger_default.log(
                    `[readCustomSongsOnDevice] Failed to build template for: ${data.title}`
                  );
                  brokenSongs.push(data.title);
                  return resolve3();
                }
                let variantReference = template.field("_BeatmapVariantReference").value;
                variantReference.field("_Difficulty").value = this.dataCache.getDifficultyById(difficultyId);
                moddedFiles.push({
                  id: data.id,
                  title: data.title,
                  artist: data.artist,
                  template
                });
                Logger_default.log(
                  `[readCustomSongsOnDevice] Successfully processed: ${data.title}`
                );
                resolve3();
              } catch (e) {
                Logger_default.log(
                  `[readCustomSongsOnDevice] Error processing ${path}: ${e.message}`
                );
                resolve3();
              }
            })
          );
        }
        await Promise.all(promises);
        if (brokenSongs.length) {
          Logger_default.log(
            `[readCustomSongsOnDevice] Broken songs detected: ${brokenSongs.join(
              ", "
            )}`
          );
          Device_default.alert(
            `${brokenSongs.length} broken song${brokenSongs.length === 1 ? "" : "s"} detected. See log for names.`
          );
        }
        Logger_default.log(
          `[readCustomSongsOnDevice] Successfully processed ${moddedFiles.length} songs`
        );
        return moddedFiles;
      } catch (e) {
        Logger_default.log(`[readCustomSongsOnDevice] Critical error: ${e.message}`);
        Logger_default.log(`[readCustomSongsOnDevice] Stack trace: ${e.stack}`);
        return [];
      }
    }
  };

  // script/lib/DataCache.ts
  var DataCache = class {
    rakshaModel;
    difficulties;
    constructor(rakshaModel) {
      this.rakshaModel = rakshaModel;
      this.difficulties = Il2Cpp.gc.choose(
        this.rakshaModel.class("com.spaceape.config.SongDifficulty")
      );
    }
    getDifficultyById(id) {
      for (var x = 0; x < this.difficulties.length; x++) {
        let difficulty = this.difficulties[x];
        if (difficulty.field("id").value == id) {
          return difficulty;
        }
      }
    }
  };

  // script/lib/Translation.ts
  var Translation = class {
    id;
    translations = [];
    oldDoNotTranslateForBinaryCompatibility;
    translationFlags;
    maxCharacters;
    comment;
    context;
    constructor(id, value, locale = "en") {
      this.id = id;
      this.oldDoNotTranslateForBinaryCompatibility = false;
      this.translations.push(new LangStrings(locale, value));
      this.translationFlags = 0;
    }
    build() {
      const lang = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let translation = lang.class("com.spaceape.sharedlang.Translation").alloc();
      translation.method(".ctor").invoke(root);
      translation.field("id").value = Il2Cpp.string(this.id);
      translation.field("oldDoNotTranslateForBinaryCompatibility").value = this.oldDoNotTranslateForBinaryCompatibility;
      translation.field("translations").value = Il2Cpp.array(
        lang.class("com.spaceape.sharedlang.LangStrings"),
        this.translations.map((el) => el.build())
      );
      translation.field("translationFlags").value = this.translationFlags;
      translation.field("maxCharacters").value = 32;
      translation.field("comment").value = Il2Cpp.string("");
      translation.field("context").value = Il2Cpp.string("");
      return translation;
    }
  };
  var LangStrings = class {
    key;
    value;
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }
    build() {
      const lang = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
      const root = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("Config").field("Root").value;
      let langStrings = lang.class("com.spaceape.sharedlang.LangStrings").alloc();
      langStrings.method(".ctor").invoke(root);
      langStrings.field("key").value = Il2Cpp.string(this.key);
      langStrings.field("value").value = Il2Cpp.string(this.value);
      return langStrings;
    }
  };

  // script/hacks/songName.ts
  function songNameHack() {
    const assembly = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
    assembly.class("com.spaceape.sharedlang.LangConfig").method("GetTranslationById").implementation = function(id) {
      let res = this.method("GetTranslationById").invoke(id);
      if (res.toString() == "null") {
        let name = id.toString();
        name = name.substring(1, name.length - 1);
        let translation = new Translation(name, name);
        return translation.build();
      }
      return res;
    };
  }

  // script/customs/hookOnDeviceBundles.ts
  var hookOnDeviceBundles = () => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    const assets = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;
    assembly.class("BeatStar.GameAssets.AppAssetBundleQueue").method("IsAssetBundleOnDevice").implementation = function(unityAssetBundle) {
      if (unityAssetBundle.field("SizeInBytes").value == 0) {
        return true;
      }
      return this.method("IsAssetBundleOnDevice").invoke(unityAssetBundle);
    };
    assets.class("com.spaceape.assetstreaming.AssetBundleManager").method("HasAssetBundleBeenDownloaded").implementation = function(bundle, includeDependencies) {
      if (bundle.field("SizeInBytes").value == 0) {
        return true;
      }
      return this.method("HasAssetBundleBeenDownloaded").invoke(
        bundle,
        includeDependencies
      );
    };
  };

  // script/customs/ignoreBundleHash.ts
  var ignoreBundleHash = () => {
    const assembly = Il2Cpp.domain.assembly(
      "UnityEngine.UnityWebRequestAssetBundleModule"
    ).image;
    const core = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;
    assembly.class("UnityEngine.Networking.UnityWebRequestAssetBundle").method("GetAssetBundle").overload(
      "System.String",
      "UnityEngine.Hash128",
      "System.UInt32"
    ).implementation = function(uri) {
      const genHash = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
      const hash = Il2Cpp.string(genHash(36));
      let res = this.method("GetAssetBundle").overload("System.String", "UnityEngine.Hash128", "System.UInt32").invoke(
        uri,
        core.class("UnityEngine.Hash128").method("Parse").invoke(hash),
        0
      );
      return res;
    };
  };

  // script/customs/hookRemoteBundles.ts
  var hookRemoteBundles = () => {
    const assembly = Il2Cpp.domain.assembly("SpaceApe.UnityAssets").image;
    assembly.class("com.spaceape.assetstreaming.AssetBundleDownloader").method("DownloadRemoteBundle").implementation = function(bundle, url, onComplete) {
      for (var x = 0; x < customSongs.length; x++) {
        let str = url.toString();
        let path = str.substring(str.indexOf("file"), str.indexOf(".bundle") + 7).replace(/\s+/g, "_");
        if (str.includes("audio.bundle") || str.includes("artwork.bundle") || str.includes("chart.bundle")) {
          url = Il2Cpp.string(path);
        }
      }
      return this.method("DownloadRemoteBundle").invoke(bundle, url, onComplete);
    };
  };

  // script/hacks/unlockCustomSongs.ts
  var unlockCustomSongs = async () => {
    Logger_default.log("[unlockCustomSongs] Setting up custom songs hook...");
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    assembly.class("OptionsDialog").method("SupportButtonPressed").implementation = async function() {
      Logger_default.log("[SupportButtonPressed] Support button pressed");
      try {
        const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
        const lang = Il2Cpp.domain.assembly("SpaceApe.Lang").image;
        const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
        Logger_default.log("[SupportButtonPressed] Assemblies loaded");
        activateMod();
        Logger_default.log("[SupportButtonPressed] Mod activated");
        setDataCache(new DataCache(RakshaModel));
        Logger_default.log("[SupportButtonPressed] DataCache initialized");
        songNameHack();
        Logger_default.log("[SupportButtonPressed] Song names hacked");
        hookOnDeviceBundles();
        ignoreBundleHash();
        hookRemoteBundles();
        Logger_default.log("[SupportButtonPressed] Bundles hooked");
        const translations = Il2Cpp.gc.choose(
          lang.class("com.spaceape.sharedlang.LangConfig")
        )[0];
        const tr = translations.field("translations").value;
        const locale = tr.get(0).field("translations").value.get(0).field("key").value.toString().slice(1, -1);
        Logger_default.log(`[SupportButtonPressed] Locale: ${locale}`);
        let reader = new CustomSongReader(dataCache);
        setCustomSongs(await reader.readCustomSongsOnDevice());
        Logger_default.log(`[SupportButtonPressed] Loaded ${customSongs.length} custom songs`);
        const newLength = tr.length + customSongs.length * 2;
        const newTranslations = Il2Cpp.array(
          lang.class("com.spaceape.sharedlang.Translation"),
          newLength
        );
        for (var i = 0; i < tr.length; i++) {
          newTranslations.set(i, tr.get(i));
        }
        let index = tr.length;
        Logger_default.log("[SupportButtonPressed] Preparing to unlock songs");
        let unlockSongProcess = Il2Cpp.gc.choose(
          metalogic.class("UnlockSongProcess")
        )[0];
        let userBeatmaps = Il2Cpp.gc.choose(
          metalogic.class("com.spaceape.flamingo.model.UserBeatmaps")
        )[0];
        let transaction = userBeatmaps.method("CreateTransaction").invoke(
          RakshaModel.class(
            "com.spaceape.flamingo.model.BeatmapRewardSource"
          ).field("CardCase").value
        );
        const promises = [];
        for (var x = 0; x < customSongs.length; x++) {
          Logger_default.log(`[SupportButtonPressed] Processing song ${x + 1}/${customSongs.length}: ${customSongs[x].title}`);
          promises.push(
            new Promise((resolve3, reject) => {
              try {
                unlockSongProcess.method("Cmd_UnlockSong").invoke(
                  customSongs[x].template,
                  RakshaModel.class(
                    "com.spaceape.flamingo.model.BeatmapRewardSource"
                  ).field("CardCase").value,
                  transaction,
                  transaction
                );
                const nameTranslation = new Translation(
                  customSongs[x].template.field("_Song").value.field("SongTitleLoc_id").value.toString().slice(1, -1),
                  customSongs[x].title,
                  locale
                );
                const artistTranslation = new Translation(
                  customSongs[x].template.field("_Song").value.field("SongArtistLoc_id").value.toString().slice(1, -1),
                  customSongs[x].artist,
                  locale
                );
                newTranslations.set(index++, nameTranslation.build());
                newTranslations.set(index++, artistTranslation.build());
                Logger_default.log(`[SupportButtonPressed] Successfully processed: ${customSongs[x].title}`);
                resolve3();
              } catch (err) {
                Logger_default.log(`[SupportButtonPressed] Error processing song: ${customSongs[x].title}`, err);
                resolve3();
              }
            })
          );
        }
        await Promise.all(promises);
        Logger_default.log("[SupportButtonPressed] All songs processed");
        translations.field("translations").value = newTranslations;
        Logger_default.log("[SupportButtonPressed] Translations updated");
        applyCustomSongScores();
        Logger_default.log("[SupportButtonPressed] Custom songs hook completed successfully");
      } catch (e) {
        Logger_default.log("[SupportButtonPressed] Error in setup:", e);
        Logger_default.log("[SupportButtonPressed] Stack trace:", e.stack);
      }
    };
  };
  var applyCustomSongScores = () => {
    try {
      Logger_default.log("[applyCustomSongScores] Starting to apply custom song scores...");
      const RakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
      const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
      const metalogic = Il2Cpp.domain.assembly("MetaLogic").image;
      const root = assembly.class("Config").field("Root").value;
      const gradingSystem = Il2Cpp.gc.choose(metalogic.class("GradingSystem"))[0];
      if (!gradingSystem) {
        throw new Error("GradingSystem not found");
      }
      const gameConfig = gradingSystem.field("gameConfig").value;
      const grades = gameConfig.field("Grades").value;
      const beatmaps = Il2Cpp.gc.choose(RakshaModel.class("com.spaceape.flamingo.model.BeatmapTO")).filter(function(beatmap) {
        const template = beatmap.field("_template").value;
        if (template.toString() == "null") {
          return false;
        }
        const idLabel = template.field("idLabel").value;
        return idLabel.toString().includes("file://");
      });
      Logger_default.log(`[applyCustomSongScores] Found ${beatmaps.length} custom beatmaps`);
      for (const score of scores) {
        const beatmap = beatmaps.find((beatmap2) => {
          const template = beatmap2.field("_template").value;
          if (template.field("id").value === score.beatmapId) {
            return true;
          }
        });
        if (!beatmap) {
          Logger_default.log(`[applyCustomSongScores] WARNING: Beatmap not found for id ${score.beatmapId}`);
          continue;
        }
        try {
          const BeatmapScore = RakshaModel.class(
            "com.spaceape.config.BeatmapScore"
          ).alloc();
          BeatmapScore.method(".ctor").invoke(root);
          BeatmapScore.field("absoluteScore").value = score.score;
          beatmap.field("HighestScore").value = BeatmapScore;
          const template = beatmap.field("_template").value;
          let variant = template.field("_BeatmapVariantReference").value;
          const difficultyId = variant.method("get_Difficulty").invoke().field("id").value;
          let medal = scoreToMedal(score.score, difficultyId);
          if (variant.field("BeatmapType").value.toString() == "Promode" && medal.includes("medal")) {
            medal = "deluxe_" + medal;
          }
          let medalFound = false;
          for (var i = 0; i < 11; i++) {
            const grade = grades.get(i);
            const idLabel = grade.field("idLabel").value;
            if (idLabel.toString().slice(1, -1) === medal) {
              beatmap.method("set_HighestGrade").invoke(grade);
              medalFound = true;
              break;
            }
          }
          if (!medalFound) {
            Logger_default.log(`[applyCustomSongScores] WARNING: Medal ${medal} not found in grades`);
          }
        } catch (err) {
          Logger_default.log(`[applyCustomSongScores] Error applying score for beatmap ${score.beatmapId}: ${err.message}`);
          Logger_default.log(err.stack);
        }
      }
      const newStarCount = gradingSystem.method("CalculateTotalStarsFromSongs").invoke();
      let currencies = Il2Cpp.gc.choose(metalogic.class("UserCurrencies"))[0];
      if (!currencies) {
        throw new Error("UserCurrencies not found");
      }
      let starDefinition = currencies.method("get_StarCurrencyDefinition").invoke();
      currencies.method("Set").overload("com.spaceape.config.CurrencyDefinition", "System.Int32").invoke(starDefinition, newStarCount);
      Logger_default.log("[applyCustomSongScores] Custom song scores applied successfully");
    } catch (error2) {
      Logger_default.log(`[applyCustomSongScores] CRITICAL ERROR: ${error2.message}`);
      Logger_default.log(`[applyCustomSongScores] Stack trace: ${error2.stack}`);
    }
  };

  // script/utilities/getScores.ts
  var getScores = () => {
    return new Promise(async function(resolve3, reject) {
      try {
        const scores2 = await networkRequest("/getScores", {
          androidId: Device_default.getDeviceID()
        });
        Logger_default.log(`Scores: ${scores2}`);
        const parsedScores = JSON.parse(scores2);
        setScores(parsedScores);
        resolve3(parsedScores);
      } catch (e) {
        Logger_default.log(`Error fetching scores: ${e}`);
        resolve3([]);
      }
    });
  };

  // script/hacks/graphics.ts
  function hookGraphics() {
    const assembly = Il2Cpp.domain.assembly("SpaceApe.Scaling.Runtime").image;
    const rakshaModel = Il2Cpp.domain.assembly("RakshaModel").image;
    const setting = SettingsReader_default.getSetting("graphics");
    const fps = SettingsReader_default.getSetting("fps");
    if (setting) {
      Logger_default.log("Settings graphics to " + setting);
      assembly.class("com.spaceape.scaling.ScalingConfig").method("GetLevelById").implementation = function() {
        return this.method("GetLevelById").invoke(
          Il2Cpp.string("android_" + setting)
        );
      };
    }
    if (fps) {
      Logger_default.log("Setting FPS to " + fps);
      Il2Cpp.gc.choose(
        rakshaModel.class("com.spaceape.config.FlamingoScalingModuleTemplate")
      ).forEach((instance) => {
        instance.field("Fps").value = fps;
        instance.field("MenuFps").value = fps;
      });
    }
  }

  // script/utilities/ignoreNotificationErrors.ts
  var ignoreNotificationErrors = () => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    assembly.class("ErrorHandling").method("Throw").implementation = function(incident) {
      if (incident.toString().includes("988853616")) {
        return;
      }
      return this.method("Throw").invoke(incident);
    };
  };

  // script/device/device.ts
  Logger_default.log("Starting mod...");
  Il2Cpp.perform(async () => {
    try {
      const scores2 = await getScores();
      let messageString = "mod loaded";
      if (scores2 && scores2.length > 0) {
        messageString += ` with ${scores2.length} ${scores2.length === 1 ? "score" : "scores"}`;
      }
      Logger_default.log(messageString);
      Device_default.alert(messageString);
      ignoreNotificationErrors();
      unlockAllSongs();
      Logger_default.log("Unlocked all songs");
      unlockCustomSongs();
      Logger_default.log("Unlocked custom songs");
      lengthFixer();
      Logger_default.log("Fixed length");
      hookGraphics();
      Logger_default.log("Hooked graphics");
    } catch (error2) {
      Logger_default.log(`Main initialization error: ${error2}`);
      setTimeout(() => {
        Device_default.alert(`Main initialization error: ${error2}`);
      }, 3e3);
    }
  });
})();
