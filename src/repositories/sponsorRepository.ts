import { Types } from 'mongoose'
import { SponsorDocument, SponsorModel } from '../models/model'

const { ObjectId } = Types

class SponsorRepository {
  async create(sponsorData: Partial<SponsorDocument>): Promise<SponsorDocument> {
    const sponsor = new SponsorModel(sponsorData)
    return sponsor.save()
  }

  // Знайти всіх спонсорів
  async getAll(): Promise<SponsorDocument[]> {
    return SponsorModel.find().exec()
  }

  // Знайти всіх активних споносорів
  async getAllActive(): Promise<SponsorDocument[]> {
    return SponsorModel.aggregate()
      .match({ active: true })
      .lookup({
        from: 'cars',
        localField: '_id',
        foreignField: 'sponsors',
        as: 'cars',
        pipeline: [{ $project: { name: 1, carName: 1, number: 1, _id: 0, id: '$_id' } }],
      })
      .project({ _id: 0, id: '$_id', name: 1, description: 1, picture: 1, url: 1, active: 1, cars: 1 })
      .exec()
  }

  // Знайти спонсора за ідентифікатором
  async getOne(id: string): Promise<SponsorDocument | null> {
    const sponsors = await SponsorModel.aggregate()
      .match({ _id: new ObjectId(id) })
      .lookup({
        from: 'cars',
        localField: '_id',
        foreignField: 'sponsors',
        as: 'cars',
        pipeline: [{ $project: { name: 1, carName: 1, number: 1, _id: 0, id: '$_id' } }],
      })
      .project({ _id: 0, id: '$_id', name: 1, description: 1, picture: 1, url: 1, active: 1, cars: 1 })
      .exec()
    console.log(sponsors)
    return sponsors[0] ?? null
  }

  // Оновити інформацію про спонсора
  async update(id: string, sponsorData: Partial<SponsorDocument>): Promise<SponsorDocument | null> {
    return SponsorModel.findByIdAndUpdate(id, sponsorData, { new: true }).exec()
  }

  // Видалити спонсора за ідентифікатором
  async delete(id: string): Promise<SponsorDocument | null> {
    return SponsorModel.findByIdAndDelete(id).exec()
  }
}

export default new SponsorRepository()
