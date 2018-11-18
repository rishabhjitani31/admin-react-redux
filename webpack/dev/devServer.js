import path from 'path'
import dotenv from 'dotenv'
const env = dotenv.config().parsed

const devServer = () => {
  return {
    contentBase: [path.join(__dirname, '../../dist/')],
    historyApiFallback: true,
    host: env.HOST,
    port: env.PORT,
    hot: true,
    quiet: true,
    watchContentBase: true
  }
}
export default devServer()
