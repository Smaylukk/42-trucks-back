import { SponsorDocument, SponsorModel } from '../models/model'

class SponsorRepository {
  async create(sponsorData: Partial<SponsorDocument>): Promise<SponsorDocument> {
    const sponsor = new SponsorModel(sponsorData)
    return sponsor.save()
  }

  // Знайти всі автомобілі
  async getAll(): Promise<SponsorDocument[]> {
    return SponsorModel.find().exec()
  }

  // Знайти автомобіль за ідентифікатором
  async getOne(id: string): Promise<SponsorDocument | null> {
    return SponsorModel.findById(id).exec()
  }

  // Оновити інформацію про автомобіль
  async update(id: string, sponsorData: Partial<SponsorDocument>): Promise<SponsorDocument | null> {
    return SponsorModel.findByIdAndUpdate(id, sponsorData, { new: true }).exec()
  }

  // Видалити автомобіль за ідентифікатором
  async delete(id: string): Promise<SponsorDocument | null> {
    return SponsorModel.findByIdAndDelete(id).exec()
  }
}

export default new SponsorRepository()
