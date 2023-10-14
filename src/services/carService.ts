import CarRepository from '../repositories/carRepository'
import { CarDocument } from '../models/model'
import userRepository from '../repositories/userRepository'

class CarService {
  async getAllCars() {
    return CarRepository.getAll()
  }

  async getAllActiveCar() {
    return CarRepository.getAllActiveCar()
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
}

export default new CarService()
