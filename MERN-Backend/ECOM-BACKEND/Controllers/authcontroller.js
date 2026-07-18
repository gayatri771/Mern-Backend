let users = require('../models/usermodel')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
const mail = require('../utils/gmail')

const SECRET_KEY = process.env.JWT_SECRET

exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body
    // 1) check the fields
    if (!username || !password || !email || !role)
      return res.json({ "msg": "missing fields" })
    // 2) check if user already exists
    let checkuser = await users.findOne({ username })
    if (checkuser) return res.json({ msg: "user already exists" })
    // 3) store user data in db
    let hashedpassword = await bcrypt.hash(password, 10)

    await users.create({ username, password: hashedpassword, email, role })

    // generate a token
    let payload = { username: username }
    let token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

    res.json({ "msg": "Registration successful", token })

    mail(email, username).catch(err => console.log("Email failed:", err.message))
  } catch (error) {
    res.json({ "msg": error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password)
      return res.json({ "msg": "missing fields" })

    let userdetails = await users.findOne({ username })
    if (!userdetails) return res.json({ "msg": "invalid credentials" })

    let checkpassword = await bcrypt.compare(password, userdetails.password)
    if (!checkpassword) return res.json({ "msg": "invalid credentials" })

    let payload = { username: userdetails.username }
    let token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

    res.json({ "msg": "login successful", token })
  } catch (error) {
    res.json({ "msg": error.message })
  }
}
