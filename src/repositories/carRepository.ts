import { CarDocument, CarModel, ECarType } from '../models/model'

class CarRepository {
  async create(carData: Partial<CarDocument>): Promise<CarDocument> {
    const car = new CarModel(carData)
    return car.save()
  }

  // Знайти всі автомобілі
  async getAll(): Promise<CarDocument[]> {
    return CarModel.find().sort({ numberSort: 1 }).exec()
  }

  // Знайти всі активні автомобілі
  async getAllActiveCar(carType: number): Promise<CarDocument[]> {
    return CarModel.find({ active: true, carType })
      .select('-contactName -contactPhone -contactEmail')
      .sort({ numberSort: 1 })
      .exec()
  }

  // Знайти автомобіль за ідентифікатором
  async getOne(id: string): Promise<CarDocument | null> {
    return CarModel.findById(id).select('-contactName -contactPhone -contactEmail').exec()
  }

  // Знайти автомобіль за ідентифікатором
  async getOneAdmin(id: string): Promise<CarDocument | null> {
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
    await this.updateCarProps()

    await this.updateCarType()
  }

  async updateCarProps() {
    const result = await CarModel.updateMany({ isRepair: { $exists: false } }, { isRepair: false }).exec()
    if (result.modifiedCount) {
      console.log(`Set "isRepair" in ${result.modifiedCount}`)
    }

    const resultColor = await CarModel.updateMany({ color: { $exists: false } }, { color: '' }).exec()
    if (resultColor.modifiedCount) {
      console.log(`Set "color" in ${resultColor.modifiedCount}`)
    }

    const resultContactName = await CarModel.updateMany({ contactName: { $exists: false } }, { contactName: '' }).exec()
    if (resultContactName.modifiedCount) {
      console.log(`Set "Contact name" in ${resultContactName.modifiedCount}`)
    }

    const resultContactPhone = await CarModel.updateMany(
      { contactPhone: { $exists: false } },
      { contactPhone: '' },
    ).exec()
    if (resultContactPhone.modifiedCount) {
      console.log(`Set "Contact phone" in ${resultContactPhone.modifiedCount}`)
    }

    const resultContactEmail = await CarModel.updateMany(
      { contactEmail: { $exists: false } },
      { contactEmail: '' },
    ).exec()
    if (resultContactEmail.modifiedCount) {
      console.log(`Set "Contact name" in ${resultContactEmail.modifiedCount}`)
    }
  }

  async updateCarType() {
    const result = await CarModel.updateMany({ isRepair: true }, { carType: ECarType.repair }).exec()
    if (result.modifiedCount) {
      console.log(`Set "Car type = Repair" in ${result.modifiedCount}`)
    }

    const resultCars = await CarModel.updateMany({ carType: { $exists: false } }, { carType: ECarType.car }).exec()
    if (resultCars.modifiedCount) {
      console.log(`Set "Car type = Car" in ${resultCars.modifiedCount}`)
    }
  }
}

export default new CarRepository()
