import { Router } from 'express'
import gratitudeController from '../controllers/gratitudeController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post('/', authMiddleware, gratitudeController.create)
router.put('/:id', authMiddleware, gratitudeController.update)
router.get('/', gratitudeController.getAll)
router.get('/:id', gratitudeController.getOne)
router.delete('/:id', authMiddleware, gratitudeController.delete)

export default router
