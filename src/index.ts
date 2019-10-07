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

export function service(app: express.Express, serviceConfig: serviceConfig, express: any) {
  serviceConfig.configs.forEach(config => {
    app.use(config.route, async (req, res, next) => {
      const cookieFeatureMap = getFeatureMapFromHeaders(req.headers)
      const featureMap = mergeFeatureMap(cookieFeatureMap, serviceConfig.featureMap)

      await build(featureMap, config.webpackConfig)
      const handler = express.static(config.webpackConfig.output.path)
      handler(req, res, next)
    })
  })
}

function mergeFeatureMap(...featureMaps: featureMap[]): featureMap {
  let featureMap: featureMap = {}
  featureMaps.forEach(_featureMap => {
    if (typeof _featureMap === 'object') {
      featureMaps = {
        ...featureMap,
        ..._featureMap
      }
    }
  })

  return featureMaps
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