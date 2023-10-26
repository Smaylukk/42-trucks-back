import { Router } from 'express'
import sponsorController from '../controllers/sponsorController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post('/', authMiddleware, sponsorController.create)
router.put('/:id', authMiddleware, sponsorController.update)
router.get('/', sponsorController.getAll)
router.get('/active', sponsorController.getAllActive)
router.get('/:id', sponsorController.getOne)
router.delete('/:id', authMiddleware, sponsorController.delete)

export default router
