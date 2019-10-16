import * as webpack from 'webpack'
import * as express from 'express'
import * as http from 'http'
import { build, featureMap } from 'js-build-by-feature-map'

interface config {
  route: string
  webpackConfig: webpack.Configuration
}

interface serviceConfig {
  configs: config[]
  featureMap: featureMap
}

interface dynamicProperty {
  [key: string]: any
}

export function createBuild(webpackConfig: webpack.Configuration, featureMap: featureMap = {}) {
  return async function toBuild(req: express.Request) {
    const cookieFeatureMap = getFeatureMapFromHeaders(req.headers)
    const allFeatureMap = mergeFeatureMap(cookieFeatureMap, featureMap)
  
    return await build(allFeatureMap, webpackConfig)
  }
}

export function service(app: express.Express, serviceConfig: serviceConfig) {
  serviceConfig.configs.forEach(config => {
    const buildFn = createBuild(config.webpackConfig, serviceConfig.featureMap)
    app.use(config.route, (req: express.Request) => {
      buildFn(req)
    })
  })
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
  const cookie = parseCookie(headers.cookie)
  return JSON.parse(cookie['jsFeatureTest'] || '{}')
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