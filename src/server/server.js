import express from 'express'
import path from 'path'
import compression from 'compression'
import dotenv from 'dotenv'
const env = dotenv.config().parsed

const app = express()

app.use(compression())
app.use('/', express.static(path.join(__dirname, '../../dist')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.listen(env.PORT, env.HOST, () => {
  console.log(`server is listening on port ${env.PORT}`)
})
