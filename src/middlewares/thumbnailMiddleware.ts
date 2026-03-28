import { Request, Response } from 'express'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

// Middleware для генерації thumbnail зображень
const thumbnailMiddleware = async (req: Request, res: Response) => {
  try {
    // Витягуємо ім'я файлу з originalUrl (оскільки req.path може бути змінений)
    const filename = req.originalUrl.split('?')[0].replace('/thumb/', '')
    const staticPath = path.resolve(__dirname, '..', '..', 'static')
    const imagePath = path.join(staticPath, filename)

    // Перевіряємо чи існує файл
    if (!fs.existsSync(imagePath)) {
      return res.status(404).send('Image not found')
    }

    // Перевіряємо, що це файл, а не директорія
    const stats = fs.statSync(imagePath)
    if (!stats.isFile()) {
      return res.status(400).send(`Path ${imagePath} is not a file`)
    }

    // Читаємо файл як буфер (для файлів без розширення)
    const fileBuffer = fs.readFileSync(imagePath)

    // Отримуємо параметри з query (width, height, quality)
    const width = req.query.width ? parseInt(req.query.width as string, 10) : 300
    const height = req.query.height ? parseInt(req.query.height as string, 10) : undefined
    const quality = req.query.quality ? parseInt(req.query.quality as string, 10) : 80

    // Перевіряємо, чи це зображення та отримуємо метадані
    let metadata: sharp.Metadata
    try {
      metadata = await sharp(fileBuffer).metadata()
    } catch {
      return res.status(400).send('File is not a valid image')
    }

    const format = metadata.format || 'jpeg'

    // Генерація thumbnail
    let image = sharp(fileBuffer)

    // Resize зображення
    if (height) {
      image = image.resize(width, height, { fit: 'cover' })
    } else {
      image = image.resize(width, null, { fit: 'inside' })
    }

    // Встановлюємо якість та формат
    if (format === 'jpeg' || format === 'jpg') {
      image = image.jpeg({ quality })
    } else if (format === 'png') {
      image = image.png({ quality })
    } else if (format === 'webp') {
      image = image.webp({ quality })
    } else {
      // Для інших форматів конвертуємо в jpeg
      image = image.jpeg({ quality })
    }

    // Відправляємо зображення
    res.setHeader('Content-Type', `image/${format}`)
    res.setHeader('Cache-Control', 'public, max-age=31536000')

    const buffer = await image.toBuffer()
    res.send(buffer)
  } catch (error) {
    console.error('Thumbnail generation error:', error)
    return res.status(500).send('Error generating thumbnail')
  }
}

export default thumbnailMiddleware

