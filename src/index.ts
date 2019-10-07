import { build } from 'js-build-by-feature-map'

interface config {
  route: string
  webpackConfig: any
}

interface serviceConfig {
  configs: config[]
  featureMap: any
}

export function service(app: any, serviceConfig: serviceConfig, express: any) {
  serviceConfig.configs.forEach(config => {
    app.use(config.route, async (req: any, res: any, next: any) => {
      await build(serviceConfig.featureMap, config.webpackConfig)
      const handler = express.static(config.webpackConfig.output.path)
      handler(req, res, next)
    })
  })
}