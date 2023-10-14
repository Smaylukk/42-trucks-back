import { Router } from 'express'
import { body } from 'express-validator'
import authMiddleware from '../middlewares/authMiddleware'
import userController from '../controllers/userController'

const router = Router()

router.post(
  '/reg',
  [
    body('email').notEmpty().withMessage('Email обовязковий').isEmail().withMessage('Email має бути email-формат'),
    body('name').notEmpty().withMessage('Найменування обовязкове'),
    body('password')
      .notEmpty()
      .withMessage('Пароль обовязковий')
      .isLength({ min: 4 })
      .withMessage('Довжина паролю від 4 символів'),
  ],
  userController.registration,
)
router.post(
  '/login',
  // eslint-disable-next-line newline-per-chained-call
  [body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be in email-format')],
  userController.login,
)
router.get('/auth', authMiddleware, userController.check)

router.post('/', authMiddleware, userController.create)
router.put('/:id', authMiddleware, userController.update)
router.get('/', authMiddleware, userController.getAll)
router.get('/:id', authMiddleware, userController.getOne)
router.delete('/:id', authMiddleware, userController.delete)

export default router
