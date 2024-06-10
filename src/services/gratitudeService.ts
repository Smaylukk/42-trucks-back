import { GratitudeDocument } from '../models/model'
import gratitudeRepository from '../repositories/gratitudeRepository'

class GratitudeService {
  async getAllGratitudes() {
    return gratitudeRepository.getAll()
  }

  async getOneGratitude(id: string) {
    return gratitudeRepository.getOne(id)
  }

  async createGratitude(gratitudeId: string, data: GratitudeDocument) {
    const gratitude = gratitudeRepository.getOne(gratitudeId)
    if (gratitude) {
      return gratitudeRepository.create(data)
    }
    return null
  }

  async updateGratitude(gratitudeId: string, id: string, data: Partial<GratitudeDocument>) {
    const gratitude = gratitudeRepository.getOne(gratitudeId)
    if (gratitude) {
      return gratitudeRepository.update(id, data)
    }
    return null
  }

  async deleteGratitude(gratitudeId: string, id: string) {
    const gratitude = gratitudeRepository.getOne(gratitudeId)
    if (gratitude) {
      return gratitudeRepository.delete(id)
    }
    return null
  }
}

export default new GratitudeService()
