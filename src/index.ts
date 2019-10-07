import * as webpack from 'webpack'
import * as express from 'express'
import { build } from 'js-build-by-feature-map'

interface config {
  route: string
  webpackConfig: webpack.Configuration
}

interface serviceConfig {
  configs: config[]
  featureMap: any
}

export function service(app: express.Express, serviceConfig: serviceConfig, express: any) {
  serviceConfig.configs.forEach(config => {
    app.use(config.route, async (req, res, next) => {
      await build(serviceConfig.featureMap, config.webpackConfig)
      const handler = express.static(config.webpackConfig.output.path)
      handler(req, res, next)
    })
  })
}
