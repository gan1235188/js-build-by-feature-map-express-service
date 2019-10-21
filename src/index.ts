import * as webpack from 'webpack'
import * as express from 'express'
import * as http from 'http'
import * as path from 'path'
import * as featureTestHtml from 'js-feature-test/dist/featureTestHtml'
import * as bodyParser from 'body-parser'
import { build, featureMap, builderConfig } from 'js-build-by-feature-map'

export interface config {
  route: string
  webpackConfig: webpack.Configuration
}

export interface singleConfig {
  route: string
  webpackConfig: webpack.Configuration
  buildConfig: builderConfig
  autoTest?: boolean
  featureMap?: featureMap
}

export interface serviceConfig {
  configs: config[]
  featureMap: featureMap
}

export interface dynamicProperty {
  [key: string]: any
}

export function createBuild(
  webpackConfig: webpack.Configuration,
  buildConfig: builderConfig,
  featureMap: featureMap = {},)
{
  return async (cookieFeatureMap: featureMap) => {
    const allFeatureMap = mergeFeatureMap(cookieFeatureMap, featureMap)
    return await build(allFeatureMap, webpackConfig, buildConfig)
  }
}

// TODO: 目前webpack必须处于watch模式，否则每一个js的访问都会触发重新打包
export function service(app: express.Express, serviceConfig: singleConfig) {
  // serviceConfig serviceConfig 多个单文件模式
  // serviceConfig.configs.forEach(config => {
  //   const buildFn = createBuild(config.webpackConfig, serviceConfig.featureMap)
  //   app.use(config.route, (req: express.Request) => {
  //     buildFn(req)
  //   })
  // })

  serviceConfig = getServiceConfig(serviceConfig)
  const _build = createBuild(serviceConfig.webpackConfig, serviceConfig.buildConfig, serviceConfig.featureMap || {})
  const featureTestUrl = '/feature-test'
  app.use(bodyParser.json())
  app.use(serviceConfig.route, async (req, res, next) => {
    // if(/\/workflow\.js$/ig.test(req.originalUrl)) {
      // await build(req)
    // }
    const cookieFeatureMap = getFeatureMapFromHeaders(req.headers)
    const buildStatus = await _build(cookieFeatureMap || {})
    const distPath = buildStatus.outputPath || path.resolve(__dirname, '../dist')
    const distHandle = express.static(distPath)
    return distHandle(req, res, next)
  })

  app.get('*.html', (req, res, next) => {
    const cookieFeatureMap = getFeatureMapFromHeaders(req.headers)
    //如果cookie不存在，则自动跳转到feature-test页面
    if(!cookieFeatureMap && serviceConfig.autoTest && isHtml(req.originalUrl)) {
      return res.redirect(featureTestUrl + '?back=' + req.originalUrl)
    }

    return next()
  })
  
  app.get(featureTestUrl, (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(featureTestHtml)
  })

  app.post(featureTestUrl, (req, res) => {
    const featureMapString = JSON.stringify(req.body)
    res.cookie('jsFeatureTest', featureMapString, {
      //过期时间为15天
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 15),
      path: '/',
      signed: false,
      sameSite: 'Strict'
    })
    res.send()
  })
}

function isHtml(requestUrl: string): boolean {
  return /\.html\b/.test(requestUrl)
}

function getServiceConfig(serviceConfig: singleConfig) {
  const defaultConfig: singleConfig = {
    route: '',
    webpackConfig: null,
    buildConfig: null,
    autoTest: true,
    featureMap: {}
  }

  return {
    ...defaultConfig,
    ...serviceConfig
  }
}

function mergeFeatureMap(...featureMaps: featureMap[]): featureMap {
  let featureMap: featureMap = {}
  featureMaps.forEach(_featureMap => {
    if (typeof _featureMap === 'object') {
      featureMap = {
        ...featureMap,
        ..._featureMap
      }
    }
  })

  return featureMap
}


function getFeatureMapFromHeaders(headers: http.IncomingHttpHeaders) {
  try{
    const cookie = parseCookie(headers.cookie || '')

    if(cookie && cookie['jsFeatureTest']) {
      return JSON.parse(decodeURIComponent(cookie['jsFeatureTest']))
    }
  }catch(e) {console.error(e)}
  
  return null
}

function parseCookie(cookies: string) {
  const cookieMap: dynamicProperty = {}
  const cookieList = cookies.split(';')
  cookieList.forEach((cookie) => {
      const [name, value] = cookie.split('=')
      name && (cookieMap[name] = value)
  })

  return cookieMap
}