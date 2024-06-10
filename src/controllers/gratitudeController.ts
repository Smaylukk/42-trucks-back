import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import GratitudeService from '../services/gratitudeService'
import { checkValidationError } from '../validation/validation'

class GratitudeController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const gratitudes = await GratitudeService.getAllGratitudes()

      return res.status(200).json(gratitudes)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getAllActive(req: Request, res: Response, next: NextFunction) {
    try {
      const gratitudes = await GratitudeService.getAllGratitudes()

      return res.status(200).json(gratitudes)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const gratitude = await GratitudeService.getOneGratitude(id)

      return res.status(200).json(gratitude)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { body } = req
      const gratitude = await GratitudeService.createGratitude(req.body.user.id, body)
      return res.status(200).json(gratitude)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { id } = req.params
      const { body } = req
      const gratitude = await GratitudeService.updateGratitude(req.body.user.id, id, body)
      return res.status(200).json(gratitude)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const gratitude = await GratitudeService.deleteGratitude(req.body.user.id, id)

      return res.status(200).json(gratitude)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new GratitudeController()
