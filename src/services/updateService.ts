import CarRepository from '../repositories/carRepository'
import HtmlTextRepository from '../repositories/htmlTextRepository'

export class UpdateService {
  static async updateDb() {
    await CarRepository.updateDatabase()

    await HtmlTextRepository.updateDatabase()
  }
}
