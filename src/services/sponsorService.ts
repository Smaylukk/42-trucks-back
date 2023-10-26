import * as path from 'path'
import * as fs from 'fs'
import SponsorRepository from '../repositories/sponsorRepository'
import { SponsorDocument } from '../models/model'
import userRepository from '../repositories/userRepository'

class SponsorService {
  async getAllSponsors() {
    return SponsorRepository.getAll()
  }

  async getAllActiveSponsors() {
    return SponsorRepository.getAllActive()
  }

  async getOneSponsor(id: string) {
    return SponsorRepository.getOne(id)
  }

  async createSponsor(userId: string, data: SponsorDocument) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      return SponsorRepository.create(data)
    }
    return null
  }

  async updateSponsor(userId: string, id: string, data: Partial<SponsorDocument>) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      return SponsorRepository.update(id, data)
    }
    return null
  }

  async deleteSponsor(userId: string, id: string) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      const sponsor = await this.getOneSponsor(id)
      if (sponsor.picture) {
        this.deletePicture(sponsor.picture)
      }
      return SponsorRepository.delete(id)
    }
    return null
  }

  deletePicture = (id: string) => {
    const filePath = path.resolve('static', id)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }
}

export default new SponsorService()
