import { GratitudeDocument, GratitudeModel } from '../models/model'

class GratitudeRepository {
  async create(gratitudeData: Partial<GratitudeDocument>): Promise<GratitudeDocument> {
    const gratitude = new GratitudeModel(gratitudeData)
    return gratitude.save()
  }

  // Знайти всі подяки
  async getAll(): Promise<GratitudeDocument[]> {
    return GratitudeModel.find().exec()
  }

  // Знайти подяку за ідентифікатором
  async getOne(id: string): Promise<GratitudeDocument | null> {
    return GratitudeModel.findById(id).exec()
  }

  // Оновити інформацію про подяку
  async update(id: string, gratitudeData: Partial<GratitudeDocument>): Promise<GratitudeDocument | null> {
    return GratitudeModel.findByIdAndUpdate(id, gratitudeData, { new: true }).exec()
  }

  // Видалити подяку за ідентифікатором
  async delete(id: string): Promise<GratitudeDocument | null> {
    return GratitudeModel.findByIdAndDelete(id).exec()
  }
}

export default new GratitudeRepository()
