import CarRepository from '../repositories/carRepository'
import { CarDocument } from '../models/model'
import userRepository from '../repositories/userRepository'

class CarService {
  async getAllCars(isRepair: boolean) {
    return CarRepository.getAll(isRepair)
  }

  async getAllActiveCar(isRepair: boolean) {
    return CarRepository.getAllActiveCar(isRepair)
  }

  async getOneCar(id: string) {
    return CarRepository.getOne(id)
  }

  async createCar(userId: string, data: CarDocument) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      return CarRepository.create(data)
    }
    return null
  }

  async updateCar(userId: string, id: string, data: Partial<CarDocument>) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      return CarRepository.update(id, data)
    }
    return null
  }

  async deleteCar(userId: string, id: string) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      return CarRepository.delete(id)
    }
    return null
  }

  async getPrevCar(id: string) {
    const car = await CarRepository.getOne(id)

    return CarRepository.getPrevCarByNumber(car.numberSort)
  }

  async getNextCar(id: string) {
    const car = await CarRepository.getOne(id)

    return CarRepository.getNextCarByNumber(car.numberSort)
  }

  async updateDatabase() {
    await CarRepository.updateDatabase()
  }
}

export default new CarService()
