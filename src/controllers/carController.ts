import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import CarService from '../services/carService'
import { checkValidationError } from '../validation/validation'

class CarController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarService.getAllCars()

      return res.status(200).json(cars)
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      next(ApiError.badRequestError(mes))
    }
  }

  async getAllActiveCar(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarService.getAllActiveCar()

      return res.status(200).json(cars)
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      next(ApiError.badRequestError(mes))
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const car = await CarService.getOneCar(id)

      return res.status(200).json(car)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { body } = req
      const car = await CarService.createCar(req.body.user.id, body)
      return res.status(200).json(car)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { id } = req.params
      const { body } = req
      const car = await CarService.updateCar(req.body.user.id, id, body)
      return res.status(200).json(car)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const car = await CarService.deleteCar(req.body.user.id, id)

      return res.status(200).json(car)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new CarController()
