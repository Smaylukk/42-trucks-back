import { NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import ApiError from '../errors/ApiError'

class PictureController {
  async uploadPicture(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      return res.status(200).json({ fileId: req.file.filename })
    } catch (error) {
      console.log(error)
      next(ApiError.badRequestError(error.message))
    }
  }

  async deletePicture(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { pictureId } = req.body
      if (pictureId) {
        const filePath = path.resolve('static', pictureId)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
      return res.status(200).json('OK')
    } catch (error) {
      console.log(error)
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new PictureController()
