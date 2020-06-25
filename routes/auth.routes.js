const {Router, response} = require('express')
const bcript = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Неверно введена почта').isEmail(),
    check('password', 'Некорректный пароль')
    .isLength({min: 6}),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect input data'
        })
      }

      const {email, password} = req.body
      const candidate = await User.findOne({email})
      if (candidate) {
        return res.status(400).json({message: 'User already exist'})
      }

      const hashedPassword = await bcript.hash(password, 12)
      const user = new User({email, password: hashedPassword})

      await user.save()

      res.status(201).json.message('User created')

    } catch (error) {
      res.status(500).json({message: 'Oops... Something went wrong...'})
    }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введи мыло').normalizeEmail().isEmail(),
    check('password', 'Введи пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if(!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect input data'
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({ email })

      if(!user) {
        return res.status(400).json({
          message: 'Пользователь не найден'
        })
      }

      const isMatch = await bcript.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: 'Неверный пароль'})
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({
        token,
        userId: user.id
      })

    } catch (error) {
      res.status(500).json({message: 'Oops... Something went wrong...'})
    }
  }
)

module.exports = router