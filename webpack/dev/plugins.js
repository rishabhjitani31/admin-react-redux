import path from 'path'
import webpack from 'webpack'
import OpenBrowserPlugin from 'open-browser-webpack-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import dotenv from 'dotenv'
const env = dotenv.config().parsed

const plugins = () => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  return [
    new webpack.DefinePlugin(envKeys),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: `http://${env.HOST}:${env.PORT}`
    }),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../public/index.html'),
      filename: './index.html'
    })
  ]
}
export default plugins()
