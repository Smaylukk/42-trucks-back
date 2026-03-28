import express, { Express } from 'express'
import cors from 'cors'
import * as http from 'http'
import multer from 'multer'
import morgan from 'morgan'
import path from 'path'
import { createStream } from 'rotating-file-stream'
import { ServerConfig } from './config/config'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import thumbnailMiddleware from './middlewares/thumbnailMiddleware'
import { connectDb } from './services/dbConnector'

const app: Express = express()
const upload = multer({ dest: 'static' })

// Налаштування ротації логів: щоденна ротація, максимум 10 файлів
const accessLogStream = createStream('access.log', {
  size: '10M', // ротація при досягненні 10 МБ
  interval: '1d', // ротація щодня
  maxFiles: 10, // зберігати останні 10 файлів
  path: path.join('log'),
  compress: 'gzip', // стискати старі логи
})

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
      path.resolve(__dirname, '..', 'static'),
      { setHeaders: (res) => { res.setHeader('Content-type', 'image') } },
    ),
  )
  .use('/thumb/*', thumbnailMiddleware)
  .use(errorMiddleware)
export const server = http.createServer(app)

const start = async () => {
  await connectDb()

  server.listen(ServerConfig.port, () => console.log(`Server start on port ${ServerConfig.port}!`))
}

start().catch((error) => {
  console.error('start error - ', error)
})
