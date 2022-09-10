const {Router} = require('express')
const router = Router()
const User = require('../modules/user')
const {check, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Dmodel = require("../modules/dbase")
const Articles = require("../modules/article")

//GET User:ID
router.get("/single/:id", async (req, res) => {
    await User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

//DELETE User
router.delete("/users/:id",
    async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
            .then(() => res.json("User DELETED!!"))
            .catch(err => res.status(400).json(`Error: ${err}`))
    })

//GET ALL Users
router.get("/users",
    async (req, res) => {
        await User.find()
            .then(user => res.json(user))
            .catch(err => res.status(400).res.json(`my Error: ${err}`))
    }
)

//POST User
router.post('/registration',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({message: 'Не корректные данные при регистрации'
                })
            }

            const {email, password, login} = req.body

            const isUsed = await User.findOne({email})

            if (isUsed) {
                return res.status(200).json({message: 'Данный Email уже занят, попробуйте другой.'})
            }

            const hashPassword = await bcrypt.hash(password, 12)

            const user = await new User({
                email, password: hashPassword, login
            })

            await user.save()

            res.status(201).json({message: 'Пользователь создан'})

        } catch (error) {
            console.log('MyError', error)
        }
    })

router.post('/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Некорректный пароль').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Не корректные данные при авторизации'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Такого пользователя не существует'})
            }

            const isMatch = bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Пароли не совпадают'})
            }

            const jwtSecret = 'olkjhpshdpgiusdhfp[giuhsp[dfihgsdhgs[odfhgdsofi'

            const token = jwt.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            res.json({token, message: 'Выполнен успешный вход', userId: user.id, loginUser: user.login})

        } catch (error) {
            console.log(error)
        }
    })

module.exports = router