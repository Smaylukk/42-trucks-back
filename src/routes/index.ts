import { Router } from 'express'
import userRouter from './userRouter'
import carRouter from './carRouter'
import sponsorRouter from './sponsorRouter'
import pictureRouter from './pictureRouter'
import gratitudeRouter from './gratitudeRouter'

const router = Router()

router.use('/api/user', userRouter)
router.use('/api/car', carRouter)
router.use('/api/sponsor', sponsorRouter)
router.use('/api', pictureRouter)
router.use('/api/gratitude', gratitudeRouter)
router.get('/', (req, res) => {
  res.status(200).send('It work!')
})

export default router
