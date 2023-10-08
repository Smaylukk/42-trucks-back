import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import { checkValidationError } from '../validation/validation'
import AuthService from '../services/authService'
import { UserDocument } from '../models/model';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      checkValidationError(req)

      const { email, name, password } = req.body
      const tokens = await AuthService.registration(email, name, password)
      return res.status(200).json(tokens)
    } catch (error) {
      console.log(error)
      next(ApiError.badRequestError(error.message))
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      checkValidationError(req)

      const { email, password } = req.body
      const tokens = await AuthService.login(email, password)
      return res.status(200).json(tokens)
    } catch (error) {
      console.log(error)
      next(ApiError.badRequestError(error.message))
    }
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      checkValidationError(req)

      const user = req.body.user as UserDocument
      const accessToken = await AuthService.check(user)
      return res.status(200).json({ accessToken })
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new UserController()
