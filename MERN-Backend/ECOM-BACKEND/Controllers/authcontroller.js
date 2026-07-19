const jwt = require('jsonwebtoken');
let users = require('../models/usermodel');
let bcrypt = require('bcrypt');
let mail;
try { mail = require('../../Utils/gmail'); } catch(e) { mail = () => {}; }
const dotenv = require('dotenv');

exports.register = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role)
      return res.json({ msg: 'missing fields' });

    let checkuser = await users.findOne({ username });
    if (checkuser) return res.json({ msg: 'user already exist' });

    let hashedpassword = await bcrypt.hash(password, 10);
    await users.create({ username, password: hashedpassword, email, role });

    let payload = { username: username };
    let secretkey = 'rohan123';
    let token = jwt.sign(payload, secretkey, { expiresIn: '1hr' });
    res.json({ msg: 'Registraion Sucessfull', token });
    mail(email, username);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.json({ msg: 'missing fields' });

    let userdetails = await users.findOne({ username });
    if (!userdetails) return res.json({ msg: 'invalid credentials' });

    let checkpassword = await bcrypt.compare(password, userdetails.password);
    if (!checkpassword) return res.json({ msg: 'invalid credentials' });

    let currentlocation = req.headers.location;
    res.json({ msg: 'login successful', currentlocation });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
