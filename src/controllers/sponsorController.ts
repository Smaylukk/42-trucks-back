import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import SponsorService from '../services/sponsorService'
import { checkValidationError } from '../validation/validation'

class SponsorController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const sponsors = await SponsorService.getAllSponsors()

      return res.status(200).json(sponsors)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getAllActive(req: Request, res: Response, next: NextFunction) {
    try {
      const sponsors = await SponsorService.getAllActiveSponsors()

      return res.status(200).json(sponsors)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const sponsor = await SponsorService.getOneSponsor(id)

      return res.status(200).json(sponsor)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { body } = req
      const sponsor = await SponsorService.createSponsor(req.body.user.id, body)
      return res.status(200).json(sponsor)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { id } = req.params
      const { body } = req
      const sponsor = await SponsorService.updateSponsor(req.body.user.id, id, body)
      return res.status(200).json(sponsor)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const sponsor = await SponsorService.deleteSponsor(req.body.user.id, id)

      return res.status(200).json(sponsor)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new SponsorController()
