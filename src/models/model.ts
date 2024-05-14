import { Schema, model, Document } from 'mongoose'

// USER
export interface UserDocument extends Document {
  name: string
  email: string
  password: string
}
const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})
userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    // Перетворити _id в id
    /* eslint-disable */
    ret.id = ret._id
    delete ret._id
    /* eslint-enable */
    return ret
  },
})
const UserModel = model<UserDocument>('User', userSchema)

// CAR
export interface CarDocument extends Document {
  name: string
  number: string
  numberSort: number
  militaryBase: string
  carName: string
  status: string
  amountTires: number
  amountDyeing: number
  amountRepair: number
  addEquip: string
  description: string
  active: boolean
  color: string
  isRepair: boolean
  contactName: string
  contactPhone: string
  contactEmail: string
  pictures: string[]
  sponsors: string[]
}
const carSchema = new Schema<CarDocument>({
  name: { type: String, required: true },
  number: { type: String, required: true },
  numberSort: { type: Number, required: true, min: 0 },
  militaryBase: { type: String },
  carName: { type: String },
  status: { type: String },
  amountTires: { type: Number },
  amountDyeing: { type: Number },
  amountRepair: { type: Number },
  addEquip: { type: String },
  active: { type: Boolean },
  description: { type: String },
  color: { type: String },
  isRepair: { type: Boolean },
  contactName: { type: String },
  contactPhone: { type: String },
  contactEmail: { type: String },
  pictures: [{ type: String }],
  sponsors: [{ type: Schema.Types.ObjectId, ref: 'Sponsor' }],
})
carSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    // Перетворити _id в id
    /* eslint-disable */
    ret.id = ret._id
    delete ret._id
    /* eslint-enable */
    return ret
  },
})
const CarModel = model<CarDocument>('Car', carSchema)

// SPONSOR
export interface SponsorDocument extends Document {
  name: string
  description: string
  picture: string
  url: string
  active: boolean
}
const sponsorSchema = new Schema<SponsorDocument>({
  name: { type: String, required: true },
  description: { type: String },
  picture: { type: String },
  url: { type: String },
  active: { type: Boolean },
})
sponsorSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    // Перетворити _id в id
    /* eslint-disable */
    ret.id = ret._id
    delete ret._id
    /* eslint-enable */
    return ret
  },
})
const SponsorModel = model<SponsorDocument>('Sponsor', sponsorSchema)

export { UserModel, CarModel, SponsorModel }
