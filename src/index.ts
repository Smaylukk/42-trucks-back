import express, { Express } from 'express'
import cors from 'cors'
import * as http from 'http'
import multer from 'multer'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import { ServerConfig } from './config/config'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import { connectDb } from './services/dbConnector'

const app: Express = express()
const upload = multer({ dest: 'static' })
const accessLogStream = fs.createWriteStream(path.join('log', 'access.log'), { flags: 'a' })

// prettier-ignore
app
  .use(cors())
  .use(morgan('common', { stream: accessLogStream }))
  .use(express.json({ limit: '50mb' }))
  .use(express.urlencoded({ limit: '50mb' }))
  .use(upload.single('file'))
  .use(router)
  .use(
    '/static',
    express.static(
      'static',
      { setHeaders: (res) => { res.setHeader('Content-type', 'image') } },
    ),
  )
  .use(errorMiddleware)
export const server = http.createServer(app)

const start = async () => {
  await connectDb()

  server.listen(ServerConfig.port, () => console.log(`Server start on port ${ServerConfig.port}!`))
}

start().catch((error) => {
  console.error('start error - ', error)
})
