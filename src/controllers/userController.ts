import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import { checkValidationError } from '../validation/validation'
import AuthService from '../services/authService'
import { UserDocument } from '../models/model'
import UserService from '../services/userService'

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

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers()

      return res.status(200).json(users)
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      next(ApiError.badRequestError(mes))
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const user = await UserService.getOneUser(id)

      return res.status(200).json(user)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { body } = req
      const user = await UserService.createUser(req.body.user.id, body)
      return res.status(200).json(user)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { id } = req.params
      const { body } = req
      const user = await UserService.updateUser(req.body.user.id, id, body)
      return res.status(200).json(user)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const user = await UserService.deleteUser(req.body.user.id, id)

      return res.status(200).json(user)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new UserController()
