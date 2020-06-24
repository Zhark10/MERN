const {Router, response} = require('express')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({'User already exist'})
        }
    } catch (error) {
        res.status(500).json({message: 'Oops... Something went wrong...'})
    }
})

// /api/auth/login
router.post('/login', async (req, res) => {

})

module.exports = router