"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var featureTestHtml = require("js-feature-test/dist/featureTestHtml");
var bodyParser = require("body-parser");
var js_build_by_feature_map_1 = require("js-build-by-feature-map");
function createBuild(webpackConfig, buildConfig, featureMap) {
    var _this = this;
    if (featureMap === void 0) { featureMap = {}; }
    return function (cookieFeatureMap) { return __awaiter(_this, void 0, void 0, function () {
        var allFeatureMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allFeatureMap = mergeFeatureMap(cookieFeatureMap, featureMap);
                    return [4 /*yield*/, js_build_by_feature_map_1.build(allFeatureMap, webpackConfig, buildConfig)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
}
exports.createBuild = createBuild;
// TODO: 目前webpack必须处于watch模式，否则每一个js的访问都会触发重新打包
function service(app, serviceConfig) {
    // serviceConfig serviceConfig 多个单文件模式
    // serviceConfig.configs.forEach(config => {
    //   const buildFn = createBuild(config.webpackConfig, serviceConfig.featureMap)
    //   app.use(config.route, (req: express.Request) => {
    //     buildFn(req)
    //   })
    // })
    var _this = this;
    serviceConfig = getServiceConfig(serviceConfig);
    var _build = createBuild(serviceConfig.webpackConfig, serviceConfig.buildConfig, serviceConfig.featureMap || {});
    var featureTestUrl = '/feature-test';
    app.use(bodyParser.json());
    app.use(serviceConfig.route, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var cookieFeatureMap, buildStatus, distPath, distHandle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cookieFeatureMap = getFeatureMapFromHeaders(req.headers);
                    return [4 /*yield*/, _build(cookieFeatureMap || {})];
                case 1:
                    buildStatus = _a.sent();
                    distPath = buildStatus.outputPath || path.resolve(__dirname, '../dist');
                    distHandle = express.static(distPath);
                    return [2 /*return*/, distHandle(req, res, next)];
            }
        });
    }); });
    app.get('*.html', function (req, res, next) {
        var cookieFeatureMap = getFeatureMapFromHeaders(req.headers);
        //如果cookie不存在，则自动跳转到feature-test页面
        if (!cookieFeatureMap && serviceConfig.autoTest && isHtml(req.originalUrl)) {
            return res.redirect(featureTestUrl + '?back=' + req.originalUrl);
        }
        return next();
    });
    app.get(featureTestUrl, function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.send(featureTestHtml);
    });
    app.post(featureTestUrl, function (req, res) {
        var featureMapString = JSON.stringify(req.body);
        res.cookie('jsFeatureTest', featureMapString, {
            //过期时间为15天
            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 15),
            path: '/',
            signed: false,
            sameSite: 'Strict'
        });
        res.send();
    });
}
exports.service = service;
function isHtml(requestUrl) {
    return /\.html\b/.test(requestUrl);
}
function getServiceConfig(serviceConfig) {
    var defaultConfig = {
        route: '',
        webpackConfig: null,
        buildConfig: null,
        autoTest: true,
        featureMap: {}
    };
    return __assign(__assign({}, defaultConfig), serviceConfig);
}
function mergeFeatureMap() {
    var featureMaps = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        featureMaps[_i] = arguments[_i];
    }
    var featureMap = {};
    featureMaps.forEach(function (_featureMap) {
        if (typeof _featureMap === 'object') {
            featureMap = __assign(__assign({}, featureMap), _featureMap);
        }
    });
    return featureMap;
}
function getFeatureMapFromHeaders(headers) {
    try {
        var cookie = parseCookie(headers.cookie || '');
        if (cookie && cookie['jsFeatureTest']) {
            return JSON.parse(decodeURIComponent(cookie['jsFeatureTest']));
        }
    }
    catch (e) {
        console.error(e);
    }
    return null;
}
function parseCookie(cookies) {
    var cookieMap = {};
    var cookieList = cookies.split(';');
    cookieList.forEach(function (cookie) {
        var _a = cookie.split('='), name = _a[0], value = _a[1];
        name && (cookieMap[name] = value);
    });
    return cookieMap;
}
