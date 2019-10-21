(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express = __webpack_require__(/*! express */ \"express\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar featureTestHtml = __webpack_require__(/*! js-feature-test/dist/featureTestHtml */ \"js-feature-test/dist/featureTestHtml\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar js_build_by_feature_map_1 = __webpack_require__(/*! js-build-by-feature-map */ \"js-build-by-feature-map\");\nfunction createBuild(webpackConfig, buildConfig, featureMap) {\n    var _this = this;\n    if (featureMap === void 0) { featureMap = {}; }\n    return function (cookieFeatureMap) { return __awaiter(_this, void 0, void 0, function () {\n        var allFeatureMap;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    allFeatureMap = mergeFeatureMap(cookieFeatureMap, featureMap);\n                    return [4 /*yield*/, js_build_by_feature_map_1.build(allFeatureMap, webpackConfig, buildConfig)];\n                case 1: return [2 /*return*/, _a.sent()];\n            }\n        });\n    }); };\n}\nexports.createBuild = createBuild;\n// TODO: 目前webpack必须处于watch模式，否则每一个js的访问都会触发重新打包\nfunction service(app, serviceConfig) {\n    // serviceConfig serviceConfig 多个单文件模式\n    // serviceConfig.configs.forEach(config => {\n    //   const buildFn = createBuild(config.webpackConfig, serviceConfig.featureMap)\n    //   app.use(config.route, (req: express.Request) => {\n    //     buildFn(req)\n    //   })\n    // })\n    var _this = this;\n    serviceConfig = getServiceConfig(serviceConfig);\n    var _build = createBuild(serviceConfig.webpackConfig, serviceConfig.buildConfig, serviceConfig.featureMap || {});\n    var featureTestUrl = '/feature-test';\n    app.use(bodyParser.json());\n    app.use(serviceConfig.route, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {\n        var cookieFeatureMap, buildStatus, distPath, distHandle;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    cookieFeatureMap = getFeatureMapFromHeaders(req.headers);\n                    return [4 /*yield*/, _build(cookieFeatureMap || {})];\n                case 1:\n                    buildStatus = _a.sent();\n                    distPath = buildStatus.outputPath || path.resolve(__dirname, '../dist');\n                    distHandle = express.static(distPath);\n                    return [2 /*return*/, distHandle(req, res, next)];\n            }\n        });\n    }); });\n    app.get('*.html', function (req, res, next) {\n        var cookieFeatureMap = getFeatureMapFromHeaders(req.headers);\n        //如果cookie不存在，则自动跳转到feature-test页面\n        if (!cookieFeatureMap && serviceConfig.autoTest && isHtml(req.originalUrl)) {\n            return res.redirect(featureTestUrl + '?back=' + req.originalUrl);\n        }\n        return next();\n    });\n    app.get(featureTestUrl, function (req, res) {\n        res.setHeader('Content-Type', 'text/html');\n        res.send(featureTestHtml);\n    });\n    app.post(featureTestUrl, function (req, res) {\n        var featureMapString = JSON.stringify(req.body);\n        res.cookie('jsFeatureTest', featureMapString, {\n            //过期时间为15天\n            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 15),\n            path: '/',\n            signed: false\n        });\n        res.send();\n    });\n}\nexports.service = service;\nfunction isHtml(requestUrl) {\n    return /\\.html\\b/.test(requestUrl);\n}\nfunction getServiceConfig(serviceConfig) {\n    var defaultConfig = {\n        route: '',\n        webpackConfig: null,\n        buildConfig: null,\n        autoTest: true,\n        featureMap: {}\n    };\n    return __assign(__assign({}, defaultConfig), serviceConfig);\n}\nfunction mergeFeatureMap() {\n    var featureMaps = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        featureMaps[_i] = arguments[_i];\n    }\n    var featureMap = {};\n    featureMaps.forEach(function (_featureMap) {\n        if (typeof _featureMap === 'object') {\n            featureMap = __assign(__assign({}, featureMap), _featureMap);\n        }\n    });\n    return featureMap;\n}\nfunction getFeatureMapFromHeaders(headers) {\n    try {\n        var cookie = parseCookie(headers.cookie || '');\n        if (cookie && cookie['jsFeatureTest']) {\n            return JSON.parse(decodeURIComponent(cookie['jsFeatureTest']));\n        }\n    }\n    catch (e) {\n        console.error(e);\n    }\n    return null;\n}\nfunction parseCookie(cookies) {\n    var cookieMap = {};\n    var cookieList = cookies.split(';');\n    cookieList.forEach(function (cookie) {\n        var _a = cookie.split('='), name = _a[0], value = _a[1];\n        name && (cookieMap[name] = value);\n    });\n    return cookieMap;\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "js-build-by-feature-map":
/*!******************************************!*\
  !*** external "js-build-by-feature-map" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"js-build-by-feature-map\");\n\n//# sourceURL=webpack:///external_%22js-build-by-feature-map%22?");

/***/ }),

/***/ "js-feature-test/dist/featureTestHtml":
/*!*******************************************************!*\
  !*** external "js-feature-test/dist/featureTestHtml" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"js-feature-test/dist/featureTestHtml\");\n\n//# sourceURL=webpack:///external_%22js-feature-test/dist/featureTestHtml%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });
});