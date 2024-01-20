import { CarDocument, CarModel } from '../models/model'

class CarRepository {
  async create(carData: Partial<CarDocument>): Promise<CarDocument> {
    const car = new CarModel(carData)
    return car.save()
  }

  // Знайти всі автомобілі
  async getAll(isRepair: boolean): Promise<CarDocument[]> {
    return CarModel.find({ isRepair }).sort({ numberSort: 1 }).exec()
  }

  // Знайти всі активні автомобілі
  async getAllActiveCar(isRepair: boolean): Promise<CarDocument[]> {
    return CarModel.find({ active: true, isRepair }).sort({ numberSort: 1 }).exec()
  }

  // Знайти автомобіль за ідентифікатором
  async getOne(id: string): Promise<CarDocument | null> {
    return CarModel.findById(id).exec()
  }

  // Оновити інформацію про автомобіль
  async update(id: string, carData: Partial<CarDocument>): Promise<CarDocument | null> {
    return CarModel.findByIdAndUpdate(id, carData, { new: true }).exec()
  }

  // Видалити автомобіль за ідентифікатором
  async delete(id: string): Promise<CarDocument | null> {
    return CarModel.findByIdAndDelete(id).exec()
  }

  // Знайти попередній автомобіль за ідентифікатором
  async getPrevCarByNumber(number: number): Promise<CarDocument | null> {
    return CarModel.findOne({ numberSort: { $lt: number } })
      .sort({ numberSort: -1 })
      .exec()
  }

  // Знайти наступний автомобіль за ідентифікатором
  async getNextCarByNumber(number: number): Promise<CarDocument | null> {
    return CarModel.findOne({ numberSort: { $gt: number } })
      .sort({ numberSort: 1 })
      .exec()
  }

  async updateDatabase() {
    const result = await CarModel.updateMany({ isRepair: { $exists: false } }, { isRepair: false }).exec()
    console.log(`Set "isRepair" in ${result.modifiedCount}`)

    const resultColor = await CarModel.updateMany({ color: { $exists: false } }, { color: '' }).exec()
    console.log(`Set "color" in ${resultColor.modifiedCount}`)
  }
}

export default new CarRepository()
