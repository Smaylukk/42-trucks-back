import CarRepository from '../repositories/carRepository'

export class UpdateService {
  static async updateDb() {
    await CarRepository.updateDatabase()
  }
}
