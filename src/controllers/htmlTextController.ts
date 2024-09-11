import { NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import ApiError from '../errors/ApiError'
import GratitudeService from '../services/gratitudeService'
import HtmlTextService from '../services/htmlTextService'

class HtmlTextController {
  async getHtmlText(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name } = req.params
      const htmlText = await HtmlTextService.getOne(name)
      return res.status(200).json(htmlText)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async saveHtmlText(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name } = req.body
      if (name) {
        await HtmlTextService.update(req.body.user.id, name, req.body)
      }
      return res.status(200).json('OK')
    } catch (error) {
      console.log(error)
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new HtmlTextController()
