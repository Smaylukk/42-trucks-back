import { Router } from 'express'
import { body } from 'express-validator'
import todoController from '../controllers/carController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post(
  '/',
  [
    body('name').notEmpty().withMessage("Марка машини обов'язкова"),
    body('number').notEmpty().withMessage("Номер машини обов'язкова"),
  ],
  authMiddleware,
  todoController.create,
)
router.put('/:id', authMiddleware, todoController.update)
router.get('/', todoController.getAll)
router.get('/active', todoController.getAllActiveCar)
router.get('/:id', todoController.getOne)
router.delete('/:id', authMiddleware, todoController.delete)

export default router
