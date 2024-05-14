import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import CarService from '../services/carService'
import { checkValidationError } from '../validation/validation'

class CarController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarService.getAllCars(false)

      return res.status(200).json(cars)
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      next(ApiError.badRequestError(mes))
    }
  }

  async getAllActiveCar(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarService.getAllActiveCar(false)

      return res.status(200).json(cars)
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      next(ApiError.badRequestError(mes))
    }
  }

  async getAllRepair(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarService.getAllCars(true)

      return res.status(200).json(cars)
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      next(ApiError.badRequestError(mes))
    }
  }

  async getAllActiveRepairCar(req: Request, res: Response, next: NextFunction) {
    try {
      const cars = await CarService.getAllActiveCar(true)

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

  async getOneAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const car = await CarService.getOneCarAdmin(id)

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

  async getPrev(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const prevCar = await CarService.getPrevCar(id)

      if (prevCar) {
        return res.status(200).json({ id: prevCar.id, number: prevCar.number })
      }
      return res.status(200).json({ id: null, number: null })
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async getNext(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const nextCar = await CarService.getNextCar(id)

      if (nextCar) {
        return res.status(200).json({ id: nextCar.id, number: nextCar.number })
      }
      return res.status(200).json({ id: null, number: null })
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new CarController()
