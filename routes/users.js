const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { auth, TOKEN_SECRET, tokenArr } = require('../public/javascripts/auth')

/* GET users listing. */
router.post('/login', function (req, res) {
	if (!req.body.username || !req.body.password) {
		return res.json({
			code: 1,
			msg: '非法参数',
			data: null
		})
	}

	const { username, password } = req.body

	if (username !== '123123' || password !== '123123') {
		res.json({
			code: 1,
			msg: '账号或密码错误',
			data: null
		})
	} else {
		const userAccount = Object.values(req.body).join('&')

		const token = jwt.sign(userAccount, TOKEN_SECRET)

		tokenArr.add(userAccount + '@' + token)

		res.json({
			code: 200,
			msg: 'success',
			data: {
				token,
				role: 1
			}
		})
	}
})

router.get('/info', auth, (req, res) => {
	const account = jwt.decode(req.headers.authorization, TOKEN_SECRET)

	const [ username ] = account.split('&')

	res.json({
		code: 200,
		msg: 'success',
		data: {
			username,
			role: 1,
			age: 25,
			male: 'Female',
			job: 'FrontEnd Developer'
		}
	})
})

router.post('/modify', auth, (req, res) => {

})

router.get('/validToken', auth, (req, res) => {
	res.json({
		code: 200,
		msg: 'success',
		data: {
			auth: 1
		}
	})
})

module.exports = router
